"use strict";

(() => {
    const diagrams = Array.from(document.querySelectorAll(".mermaid"));
    if (!diagrams.length) return;

    const MERMAID_MODULE_URL = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
    const root = document.documentElement;
    let mermaidApi = null;
    let renderInFlight = false;
    let renderQueued = false;
    let renderStarted = false;
    let themeTimer = null;

    diagrams.forEach((diagram) => {
        if (!diagram.dataset.mermaidSource) {
            diagram.dataset.mermaidSource = diagram.textContent.trim();
        }
    });

    function clampByte(value) {
        return Math.max(0, Math.min(255, Math.round(value)));
    }

    function rgbString(channels) {
        return `rgb(${channels.map(clampByte).join(", ")})`;
    }

    function parseCssNumber(value, percentScale = 1) {
        const trimmed = value.trim();
        if (trimmed.endsWith("%")) {
            return (Number(trimmed.slice(0, -1)) / 100) * percentScale;
        }
        return Number(trimmed);
    }

    function linearToSrgb(value) {
        const channel = Math.max(0, Math.min(1, value));
        return channel <= 0.0031308
            ? channel * 12.92
            : 1.055 * Math.pow(channel, 1 / 2.4) - 0.055;
    }

    function oklabToRgb(l, a, b) {
        const lPrime = l + 0.3963377774 * a + 0.2158037573 * b;
        const mPrime = l - 0.1055613458 * a - 0.0638541728 * b;
        const sPrime = l - 0.0894841775 * a - 1.2914855480 * b;
        const lCube = lPrime ** 3;
        const mCube = mPrime ** 3;
        const sCube = sPrime ** 3;

        return [
            linearToSrgb(+4.0767416621 * lCube - 3.3077115913 * mCube + 0.2309699292 * sCube) * 255,
            linearToSrgb(-1.2684380046 * lCube + 2.6097574011 * mCube - 0.3413193965 * sCube) * 255,
            linearToSrgb(-0.0041960863 * lCube - 0.7034186147 * mCube + 1.7076147010 * sCube) * 255,
        ].map(clampByte);
    }

    function parseRgb(color) {
        const rgb = color?.match(/rgba?\(([^)]+)\)/i);
        if (rgb) {
            const parts = rgb[1].split(/[,\s/]+/).filter(Boolean).slice(0, 3).map(Number);
            if (parts.length === 3 && parts.every(Number.isFinite)) {
                return parts.map(clampByte);
            }
        }

        const srgb = color?.match(/color\(srgb\s+([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)/i);
        if (srgb) {
            return srgb.slice(1, 4).map((value) => clampByte(Number(value) * 255));
        }

        const oklab = color?.match(/oklab\(([^)]+)\)/i);
        if (oklab) {
            const parts = oklab[1].split(/[,\s/]+/).filter(Boolean).slice(0, 3);
            if (parts.length === 3) {
                const l = parseCssNumber(parts[0], 1);
                const a = parseCssNumber(parts[1], 0.4);
                const b = parseCssNumber(parts[2], 0.4);
                if ([l, a, b].every(Number.isFinite)) {
                    return oklabToRgb(l, a, b);
                }
            }
        }

        return null;
    }

    function normalizeColor(color, fallback) {
        const parsed = parseRgb(color) || parseRgb(fallback);
        return parsed ? rgbString(parsed) : fallback;
    }

    function mixColor(baseColor, tintColor, tintWeight) {
        const base = parseRgb(baseColor);
        const tint = parseRgb(tintColor);
        if (!base || !tint) return normalizeColor(tintColor, "#101010");

        const weight = Math.max(0, Math.min(1, tintWeight));
        const mixed = base.map((channel, index) => Math.round(channel * (1 - weight) + tint[index] * weight));
        return rgbString(mixed);
    }

    function currentThemeConfig() {
        const bodyStyle = getComputedStyle(document.body);
        const background = normalizeColor(bodyStyle.backgroundColor, "#ffffff");
        const foreground = normalizeColor(bodyStyle.color, "#101010");
        const isDark = root.dataset.theme === "dark";
        const nodeFill = mixColor(background, foreground, isDark ? 0.09 : 0.035);
        const secondaryFill = mixColor(background, foreground, isDark ? 0.16 : 0.08);
        const edgeLabelBackground = mixColor(background, foreground, isDark ? 0.05 : 0.025);

        return {
            startOnLoad: false,
            securityLevel: "strict",
            theme: "base",
            flowchart: {
                curve: "basis",
                htmlLabels: false,
            },
            themeVariables: {
                background,
                mainBkg: background,
                fontFamily: bodyStyle.fontFamily || "SuisseIntl, Helvetica, Arial, sans-serif",
                fontSize: bodyStyle.fontSize || "16px",
                primaryColor: nodeFill,
                primaryBorderColor: foreground,
                primaryTextColor: foreground,
                secondaryColor: secondaryFill,
                tertiaryColor: background,
                lineColor: foreground,
                textColor: foreground,
                nodeTextColor: foreground,
                titleColor: foreground,
                clusterBkg: nodeFill,
                clusterBorder: foreground,
                edgeLabelBackground,
                noteBkgColor: nodeFill,
                noteBorderColor: foreground,
                noteTextColor: foreground,
            },
        };
    }

    async function loadMermaid() {
        if (!mermaidApi) {
            const module = await import(MERMAID_MODULE_URL);
            mermaidApi = module.default;
        }
        return mermaidApi;
    }

    function resetDiagramSources() {
        diagrams.forEach((diagram) => {
            diagram.classList.remove("mermaid-error", "mermaid-rendered");
            diagram.removeAttribute("data-processed");
            diagram.textContent = diagram.dataset.mermaidSource || "";
        });
    }

    async function renderDiagrams() {
        if (renderInFlight) {
            renderQueued = true;
            return;
        }

        renderStarted = true;
        renderInFlight = true;
        try {
            const mermaid = await loadMermaid();
            mermaid.initialize(currentThemeConfig());
            resetDiagramSources();
            await mermaid.run({ nodes: diagrams });
            diagrams.forEach((diagram) => diagram.classList.add("mermaid-rendered"));
        } catch (error) {
            console.error("Failed to render Mermaid diagram", error);
            resetDiagramSources();
            diagrams.forEach((diagram) => diagram.classList.add("mermaid-error"));
        } finally {
            renderInFlight = false;
            if (renderQueued) {
                renderQueued = false;
                window.requestAnimationFrame(renderDiagrams);
            }
        }
    }

    function scheduleRender() {
        if (!renderStarted) return;
        window.clearTimeout(themeTimer);
        themeTimer = window.setTimeout(renderDiagrams, 80);
    }

    function startRendering() {
        renderDiagrams();
    }

    function initLazyRender() {
        if (!("IntersectionObserver" in window)) {
            startRendering();
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) return;
                observer.disconnect();
                startRendering();
            },
            { rootMargin: "360px 0px" },
        );

        diagrams.forEach((diagram) => observer.observe(diagram));
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLazyRender, { once: true });
    } else {
        initLazyRender();
    }

    new MutationObserver(scheduleRender).observe(root, {
        attributes: true,
        attributeFilter: ["class", "data-theme", "style"],
    });
})();
