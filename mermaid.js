"use strict";

(() => {
    const diagrams = Array.from(document.querySelectorAll(".mermaid"));
    if (!diagrams.length) return;

    const MERMAID_MODULE_URL = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
    const root = document.documentElement;
    let mermaidApi = null;
    let renderInFlight = false;
    let renderQueued = false;
    let themeTimer = null;

    diagrams.forEach((diagram) => {
        if (!diagram.dataset.mermaidSource) {
            diagram.dataset.mermaidSource = diagram.textContent.trim();
        }
    });

    function parseRgb(color) {
        const rgb = color?.match(/rgba?\(([^)]+)\)/i);
        if (rgb) {
            const parts = rgb[1].split(/[,\s/]+/).filter(Boolean).slice(0, 3).map(Number);
            if (parts.length === 3 && parts.every(Number.isFinite)) {
                return parts.map((value) => Math.max(0, Math.min(255, Math.round(value))));
            }
        }

        const srgb = color?.match(/color\(srgb\s+([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)/i);
        if (srgb) {
            return srgb.slice(1, 4).map((value) => Math.max(0, Math.min(255, Math.round(Number(value) * 255))));
        }

        return null;
    }

    function mixColor(baseColor, tintColor, tintWeight) {
        const base = parseRgb(baseColor);
        const tint = parseRgb(tintColor);
        if (!base || !tint) return tintColor;

        const weight = Math.max(0, Math.min(1, tintWeight));
        const mixed = base.map((channel, index) => Math.round(channel * (1 - weight) + tint[index] * weight));
        return `rgb(${mixed[0]}, ${mixed[1]}, ${mixed[2]})`;
    }

    function currentThemeConfig() {
        const bodyStyle = getComputedStyle(document.body);
        const background = bodyStyle.backgroundColor || "#ffffff";
        const foreground = bodyStyle.color || "#101010";
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
        window.clearTimeout(themeTimer);
        themeTimer = window.setTimeout(renderDiagrams, 80);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", renderDiagrams, { once: true });
    } else {
        renderDiagrams();
    }

    new MutationObserver(scheduleRender).observe(root, {
        attributes: true,
        attributeFilter: ["class", "data-theme", "style"],
    });
})();
