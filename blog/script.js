"use strict";

// --- actual running code ---

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

function applyThemeState(nextMode, bgColor) {
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
}

function pressTheButton(event) {
    event?.preventDefault();
    const nextMode = !isDarkMode;
    const newColor = nextMode ? generateDarkColor() : generateLightColor();
    applyThemeState(nextMode, newColor);
    localStorage.setItem('theme_isDarkMode', isDarkMode);
    localStorage.setItem('theme_bgColor', newColor);
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

function restoreTheme() { // apply saved theme from localStorage
    const saved = localStorage.getItem('theme_isDarkMode');
    const bgColor = localStorage.getItem('theme_bgColor');
    if (saved === null) {
        applyThemeState(false, null);
        return;
    }
    const savedMode = saved === 'true';
    const inferredMode = isDarkBackground(bgColor);
    const restoredMode = inferredMode ?? savedMode;
    applyThemeState(restoredMode, bgColor);
    localStorage.setItem('theme_isDarkMode', String(restoredMode));
}
restoreTheme();
window.addEventListener('pageshow', (e) => { if (e.persisted) restoreTheme(); });

(() => {
    const LINE_HIGHLIGHT_STEP_MS = 180;
    const LINE_HIGHLIGHT_PAD_X = 2;
    const LINE_HIGHLIGHT_PAD_Y = 1;
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
        link.classList.add("line-highlight-active");

        lineRects.forEach((rect, index) => {
            const segment = document.createElement("span");
            segment.className = "link-highlight-segment";
            segment.style.left = `${rect.left - LINE_HIGHLIGHT_PAD_X}px`;
            segment.style.top = `${rect.top - LINE_HIGHLIGHT_PAD_Y}px`;
            segment.style.width = `${rect.width + LINE_HIGHLIGHT_PAD_X * 2}px`;
            segment.style.height = `${rect.height + LINE_HIGHLIGHT_PAD_Y * 2}px`;
            segment.style.animationDelay = reducedMotion ? "0ms" : `${index * LINE_HIGHLIGHT_STEP_MS}ms`;
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

// ----- execution code for current time -----

const currentYear = new Date().getFullYear();
const currentYearElement = document.querySelector("#current-year");
if (currentYearElement) currentYearElement.innerText = currentYear;

// ----- click animation -----

document.addEventListener('click', function(event) {
    if (event.button !== 0 || event.detail === 0) return;
    const clickContainer = document.getElementById('click-container');
    if (!clickContainer) return;
    const clickElement = document.createElement('div');
    const sounds = ['click', 'clack', 'thock', 'thonk', 'thup', 'pop', 'whump', 'thud', 'plip', 'clonk', 'snap', 'tck', 'tak', 'bonk', 'klak', 'tik'];
    clickElement.textContent = sounds[Math.floor(Math.random() * sounds.length)];
    clickElement.classList.add('click-animation');
    clickElement.style.left = event.clientX + 'px';
    clickElement.style.top = event.clientY + 'px';
    clickElement.style.setProperty('--click-drift', `${Math.round((Math.random() - 0.5) * 20)}px`);
    clickElement.style.setProperty('--click-tilt', `${((Math.random() - 0.5) * 10).toFixed(2)}deg`);
    clickElement.style.color = getComputedStyle(document.documentElement).getPropertyValue('--click-text-color');
    clickContainer.appendChild(clickElement);
    setTimeout(() => {
        if (clickElement.parentNode === clickContainer) {
            clickContainer.removeChild(clickElement);
        }
    }, 1000);
});

// ----- filter system -----

const FILTERS = ['none', 'vhs'];
let currentFilter = 'none';

(function initFilterSystem() {
    const overlay = document.createElement('div');
    overlay.id = 'filter-overlay';
    document.body.appendChild(overlay);

    const btn = document.createElement('button');
    btn.id = 'filter-toggle';
    btn.title = 'Visual filter: none';
    const roller = document.getElementById('infinityButton');
    const assetBase = roller ? roller.src.replace('roller.png', '') : 'asset/';
    btn.innerHTML = '<img id="filterButton" src="' + assetBase + 'vhs.png" width="24" height="24"/>';
    btn.addEventListener('click', function() {
        const idx = FILTERS.indexOf(currentFilter);
        currentFilter = FILTERS[(idx + 1) % FILTERS.length];
        applyFilter(currentFilter);
        localStorage.setItem('filter_mode', currentFilter);
    });
    const darkLabel = document.querySelector('label[for="dark-mode"]');
    if (darkLabel && darkLabel.parentNode) {
        darkLabel.after(btn);
    }
    restoreFilter();
})();

function restoreFilter() {
    const saved = localStorage.getItem('filter_mode');
    if (saved && FILTERS.includes(saved) && saved !== 'none') {
        applyFilter(saved);
    } else {
        applyFilter('none');
    }
}
window.addEventListener('pageshow', (e) => { if (e.persisted) restoreFilter(); });

function applyFilter(filter) {
    currentFilter = filter;
    if (filter === 'none') {
        document.documentElement.removeAttribute('data-filter');
    } else {
        document.documentElement.dataset.filter = filter;
    }
    const btn = document.getElementById('filter-toggle');
    if (btn) btn.title = 'Visual filter: ' + filter;
}

// ----- blog category filter -----

const BLOG_CATEGORIES = ['general', 'film', 'book', 'project'];

(function initBlogCategoryFilter() {
    const filterBar = document.querySelector('.blogFilterBar');
    if (!filterBar) return; // only on blog index

    let state = loadCategoryState();

    filterBar.querySelectorAll('.filter-link').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const cat = link.dataset.filter;
            state[cat] = !state[cat];
            saveCategoryState(state);
            applyCategoryState(state);
        });
    });

    applyCategoryState(state);
})();

function loadCategoryState() {
    const defaults = BLOG_CATEGORIES.reduce((acc, c) => (acc[c] = true, acc), {});
    try {
        const saved = JSON.parse(localStorage.getItem('blog_category_filters'));
        if (saved && typeof saved === 'object') {
            return BLOG_CATEGORIES.reduce((acc, c) => (acc[c] = c in saved ? !!saved[c] : true, acc), {});
        }
    } catch (_) {}
    return defaults;
}

function saveCategoryState(state) {
    try {
        localStorage.setItem('blog_category_filters', JSON.stringify(state));
    } catch (_) {}
}

function applyCategoryState(state) {
    document.querySelectorAll('.filter-link').forEach((link) => {
        const cat = link.dataset.filter;
        link.classList.toggle('inactive', !state[cat]);
        link.setAttribute('aria-pressed', String(!!state[cat]));
    });

    const counts = BLOG_CATEGORIES.reduce((acc, c) => (acc[c] = 0, acc), {});
    document.querySelectorAll('.booksAndBlog dl[data-filter-category]').forEach((dl) => {
        const cat = dl.dataset.filterCategory;
        counts[cat] = (counts[cat] || 0) + 1;
        const show = !!state[cat];
        dl.classList.toggle('filter-hidden', !show);
    });

    const noneSelected = BLOG_CATEGORIES.every((c) => !state[c]);

    document.querySelectorAll('.filter-empty-message').forEach((msg) => {
        const cat = msg.dataset.filterEmpty;
        let show;
        if (cat === 'none') {
            show = noneSelected;
        } else {
            show = !noneSelected && !!state[cat] && (counts[cat] || 0) === 0;
        }
        msg.classList.toggle('show', show);
    });
}
