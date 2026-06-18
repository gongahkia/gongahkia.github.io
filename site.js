"use strict";

// --- theme ---

const themeLabel = document.querySelector('label[for="dark-mode"]');
let isDarkMode = false;

themeLabel?.addEventListener("click", pressTheButton);

function parseStoredRgb(color) {
    const match = color?.match(/\d+/g);
    if (!match || match.length < 3) return null;
    return match.slice(0, 3).map(Number);
}

function isDarkBackground(color) {
    const rgb = parseStoredRgb(color);
    if (!rgb) return null;
    const [r, g, b] = rgb;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
}

function applyThemeState(nextMode, bgColor, focal) {
    isDarkMode = nextMode;
    document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? "dark" : "light";
    if (bgColor) {
        document.documentElement.style.setProperty("--active-background-color", bgColor);
        document.body.style.backgroundColor = bgColor;
    } else {
        document.documentElement.style.removeProperty("--active-background-color");
        document.body.style.removeProperty("background-color");
    }
    updateFavicon(bgColor, focal);
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h, s;
    if (max === min) { h = 0; s = 0; }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }
    return [h, s * 100, l * 100];
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function hslCss(h, s, l) {
    return `hsl(${h.toFixed(1)}, ${clamp(s, 0, 100).toFixed(1)}%, ${clamp(l, 0, 100).toFixed(1)}%)`;
}

function parseFocal(focal) {
    if (!focal) return null;
    const parts = focal.split(",").map(Number);
    if (parts.length !== 2 || parts.some(Number.isNaN)) return null;
    return parts;
}

function randomFocal() {
    const cx = 30 + Math.random() * 40; // 30-70% horizontal
    const cy = 26 + Math.random() * 28; // 26-54% vertical, bias upward feels natural
    return `${cx.toFixed(1)},${cy.toFixed(1)}`;
}

function buildFaviconDataUri(bgColor, focal) {
    let center, body, edge;
    const rgb = parseStoredRgb(bgColor);
    if (!rgb) {
        center = "#f7f7f7"; body = "#ececec"; edge = "#d8d8d8";
    } else {
        const [h, s, l] = rgbToHsl(rgb[0], rgb[1], rgb[2]);
        center = hslCss(h, s * 0.85, l + 12);  // gentle highlight, not a specular hotspot
        body = hslCss(h, s, l);                // dominant disc tone matches bg
        edge = hslCss(h + 45, s + 4, l - 10);  // soft vignette, hue-shifted for iridescence
    }
    const f = parseFocal(focal) || [48, 44];
    const [cx, cy] = f;
    const fx = clamp(cx - 2, 0, 100);
    const fy = clamp(cy - 2, 0, 100);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><radialGradient id="g" cx="${cx}%" cy="${cy}%" r="62%" fx="${fx}%" fy="${fy}%"><stop offset="0%" stop-color="${center}"/><stop offset="70%" stop-color="${body}"/><stop offset="100%" stop-color="${edge}"/></radialGradient></defs><circle cx="32" cy="32" r="30" fill="url(#g)"/></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function updateFavicon(bgColor, focal) {
    const old = document.getElementById("favicon");
    if (!old) return;
    const link = document.createElement("link");
    link.id = "favicon";
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = buildFaviconDataUri(bgColor, focal); // chrome refreshes favicon only on element replace, not href mutation
    old.replaceWith(link);
}

function pressTheButton(event) {
    event?.preventDefault();
    const nextMode = !isDarkMode;
    const newColor = nextMode ? generateDarkColor() : generateLightColor();
    const newFocal = randomFocal();
    applyThemeState(nextMode, newColor, newFocal);
    localStorage.setItem("theme_isDarkMode", isDarkMode);
    localStorage.setItem("theme_bgColor", newColor);
    localStorage.setItem("theme_focal", newFocal);
}

function generateDarkColor() {
    const r = Math.floor(Math.random() * 128);
    const g = Math.floor(Math.random() * 128);
    const b = Math.floor(Math.random() * 128);
    return `rgb(${r}, ${g}, ${b})`;
}

function generateLightColor() {
    const r = Math.floor(Math.random() * 120) + 128;
    const g = Math.floor(Math.random() * 120) + 128;
    const b = Math.floor(Math.random() * 120) + 128;
    return `rgb(${r}, ${g}, ${b})`;
}

function restoreTheme() {
    const saved = localStorage.getItem("theme_isDarkMode");
    const bgColor = localStorage.getItem("theme_bgColor");
    const focal = localStorage.getItem("theme_focal");
    if (saved === null) {
        applyThemeState(false, null, null);
        return;
    }
    const savedMode = saved === "true";
    const inferredMode = isDarkBackground(bgColor);
    const restoredMode = inferredMode ?? savedMode;
    applyThemeState(restoredMode, bgColor, focal);
    localStorage.setItem("theme_isDarkMode", String(restoredMode));
}
restoreTheme();
window.addEventListener("pageshow", (event) => {
    if (event.persisted) restoreTheme();
});

// --- sequential link highlight ---

(() => {
    const LINE_HIGHLIGHT_STEP_MS = 180;
    const LINE_HIGHLIGHT_PAD_X_EM = 0.16;
    const LINE_HIGHLIGHT_PAD_Y_EM = 0.06;
    const LINE_HIGHLIGHT_OFFSET_X_EM = -0.03;
    const LINE_HIGHLIGHT_OFFSET_Y_EM = 0.02;
    const LINE_HIGHLIGHT_MAX_TILT_DEG = 0.8;
    const LINE_GROUP_TOLERANCE = 3;
    let activeHighlight = null;
    let overlayLayer = null;

    function prefersReducedMotion() {
        return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    }

    function getOverlayLayer() {
        if (overlayLayer?.isConnected) return overlayLayer;
        overlayLayer = document.createElement("div");
        overlayLayer.className = "link-highlight-overlay-layer";
        overlayLayer.setAttribute("aria-hidden", "true");
        document.body.appendChild(overlayLayer);
        return overlayLayer;
    }

    function clearSequentialLinkHighlight(link = activeHighlight?.link) {
        if (activeHighlight?.layer) activeHighlight.layer.replaceChildren();
        link?.classList.remove("line-highlight-active");
        activeHighlight = null;
    }

    function groupedLineRects(link) {
        const range = document.createRange();
        range.selectNodeContents(link);
        const rects = Array.from(range.getClientRects()).filter((rect) => rect.width > 0.5 && rect.height > 0.5);
        range.detach();

        const groups = [];
        rects
            .sort((a, b) => (a.top - b.top) || (a.left - b.left))
            .forEach((rect) => {
                const centerY = rect.top + rect.height / 2;
                let group = groups.find((candidate) => Math.abs(candidate.centerY - centerY) <= LINE_GROUP_TOLERANCE);
                if (!group) {
                    group = {
                        top: rect.top,
                        right: rect.right,
                        bottom: rect.bottom,
                        left: rect.left,
                        centerY,
                    };
                    groups.push(group);
                    return;
                }
                group.top = Math.min(group.top, rect.top);
                group.right = Math.max(group.right, rect.right);
                group.bottom = Math.max(group.bottom, rect.bottom);
                group.left = Math.min(group.left, rect.left);
                group.centerY = (group.top + group.bottom) / 2;
            });

        return groups
            .sort((a, b) => (a.top - b.top) || (a.left - b.left))
            .map((group) => ({
                left: group.left,
                top: group.top,
                width: group.right - group.left,
                height: group.bottom - group.top,
            }));
    }

    function renderSequentialLinkHighlight(link) {
        if (!link.isConnected || !link.textContent.trim()) return;
        const lineRects = groupedLineRects(link);
        if (!lineRects.length) return;

        clearSequentialLinkHighlight();
        const layer = getOverlayLayer();
        const reducedMotion = prefersReducedMotion();
        const fontSize = parseFloat(getComputedStyle(link).fontSize) || 16;
        const padX = fontSize * LINE_HIGHLIGHT_PAD_X_EM;
        const padY = fontSize * LINE_HIGHLIGHT_PAD_Y_EM;
        const offsetX = fontSize * LINE_HIGHLIGHT_OFFSET_X_EM;
        const offsetY = fontSize * LINE_HIGHLIGHT_OFFSET_Y_EM;
        const tilt = reducedMotion ? 0 : (Math.random() * 2 - 1) * LINE_HIGHLIGHT_MAX_TILT_DEG;
        link.classList.add("line-highlight-active");

        lineRects.forEach((rect, index) => {
            const segment = document.createElement("span");
            segment.className = "link-highlight-segment";
            segment.style.left = `${rect.left - padX + offsetX}px`;
            segment.style.top = `${rect.top - padY + offsetY}px`;
            segment.style.width = `${rect.width + padX * 2}px`;
            segment.style.height = `${rect.height + padY * 2}px`;
            segment.style.animationDelay = reducedMotion ? "0ms" : `${index * LINE_HIGHLIGHT_STEP_MS}ms`;
            segment.style.setProperty("--line-highlight-tilt", `${tilt.toFixed(2)}deg`);
            segment.style.setProperty("--line-highlight-duration", reducedMotion ? "1ms" : `${LINE_HIGHLIGHT_STEP_MS}ms`);
            layer.appendChild(segment);
        });

        activeHighlight = { link, layer };
    }

    document.querySelectorAll("a").forEach((link) => {
        if (!link.textContent.trim()) return;
        link.addEventListener("pointerenter", () => renderSequentialLinkHighlight(link));
        link.addEventListener("pointerleave", () => {
            if (document.activeElement !== link) clearSequentialLinkHighlight(link);
        });
        link.addEventListener("focus", () => renderSequentialLinkHighlight(link));
        link.addEventListener("blur", () => {
            if (!link.matches(":hover")) clearSequentialLinkHighlight(link);
        });
    });

    window.addEventListener("resize", () => {
        if (activeHighlight?.link) renderSequentialLinkHighlight(activeHighlight.link);
    });
    window.addEventListener("scroll", () => clearSequentialLinkHighlight(), { passive: true });
})();

// --- year ---

const currentYear = new Date().getFullYear();
const currentYearElement = document.querySelector("#current-year");
if (currentYearElement) currentYearElement.innerText = currentYear;

// --- click animation ---

document.addEventListener("click", function(event) {
    if (event.button !== 0 || event.detail === 0) return;
    const clickContainer = document.getElementById("click-container");
    if (!clickContainer) return;
    const clickElement = document.createElement("div");
    const sounds = ["click", "clack", "thock", "thonk", "thup", "pop", "whump", "thud", "plip", "clonk", "snap", "tck", "tak", "bonk", "klak", "tik", "tock", "plink", "clunk", "thwack", "bop", "klik", "plonk", "tunk", "pok", "ping", "thwick", "blip", "clop", "klock", "thwump", "tnk"];
    clickElement.textContent = sounds[Math.floor(Math.random() * sounds.length)];
    clickElement.classList.add("click-animation");
    clickElement.style.left = event.clientX + "px";
    clickElement.style.top = event.clientY + "px";
    clickElement.style.setProperty("--click-drift", `${Math.round((Math.random() - 0.5) * 20)}px`);
    clickElement.style.setProperty("--click-tilt", `${((Math.random() - 0.5) * 10).toFixed(2)}deg`);
    clickElement.style.color = getComputedStyle(document.documentElement).getPropertyValue("--click-text-color");
    clickContainer.appendChild(clickElement);
    setTimeout(() => {
        if (clickElement.parentNode === clickContainer) {
            clickContainer.removeChild(clickElement);
        }
    }, 1000);
});

// --- filter system ---

const FILTERS = ["none", "vhs"];
let currentFilter = "none";

(function initFilterSystem() {
    const overlay = document.createElement("div");
    overlay.id = "filter-overlay";
    document.body.appendChild(overlay);

    const btn = document.createElement("button");
    btn.id = "filter-toggle";
    btn.title = "Visual filter: none";
    const roller = document.getElementById("infinityButton");
    const assetBase = roller ? roller.src.replace("roller.png", "") : "asset/";
    btn.innerHTML = `<img id="filterButton" src="${assetBase}vhs.png" width="24" height="24"/>`;
    btn.addEventListener("click", function() {
        const idx = FILTERS.indexOf(currentFilter);
        currentFilter = FILTERS[(idx + 1) % FILTERS.length];
        applyFilter(currentFilter);
        localStorage.setItem("filter_mode", currentFilter);
    });
    const darkLabel = document.querySelector('label[for="dark-mode"]');
    if (darkLabel && darkLabel.parentNode) {
        darkLabel.after(btn);
    }
    restoreFilter();
})();

function restoreFilter() {
    const saved = localStorage.getItem("filter_mode");
    if (saved && FILTERS.includes(saved) && saved !== "none") {
        applyFilter(saved);
    } else {
        applyFilter("none");
    }
}
window.addEventListener("pageshow", (event) => {
    if (event.persisted) restoreFilter();
});

function applyFilter(filter) {
    currentFilter = filter;
    if (filter === "none") {
        document.documentElement.removeAttribute("data-filter");
    } else {
        document.documentElement.dataset.filter = filter;
    }
    const btn = document.getElementById("filter-toggle");
    if (btn) btn.title = "Visual filter: " + filter;
}
