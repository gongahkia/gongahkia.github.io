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

// ----- setup code -----

const config = {
    timeZone: 'Asia/Singapore',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
},
formatter = new Intl.DateTimeFormat([], config);

// ----- execution code for current time -----

const currentYear = new Date().getFullYear();

setInterval(
    () => {
        const timeElement = document.querySelector("#time");
        if (timeElement) timeElement.innerText = formatter.format(new Date());
    }
, 1000)

const currentYearElement = document.querySelector("#current-year");
if (currentYearElement) currentYearElement.innerText = currentYear;

// ----- click animation -----

document.addEventListener('click', function(event) {
    if (event.button !== 0 || event.detail === 0) return;
    const clickContainer = document.getElementById('click-container');
    if (!clickContainer) return;
    const clickElement = document.createElement('div');
    const sounds = ['click', 'clack', 'thock', 'thonk', 'thup', 'pop', 'whump', 'thud', 'plip', 'clonk', 'snap', 'tck', 'tak', 'bonk', 'klak', 'tik', 'tock', 'plink', 'clunk', 'thwack', 'bop', 'klik', 'plonk', 'tunk', 'pok', 'ping', 'thwick', 'blip', 'clop', 'klock', 'thwump', 'tnk'];
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

// ----- GitHub contributions calendar -----

async function loadContributions() {
    try {
        const resp = await fetch('/asset/contributions.json', { cache: 'no-store' });
        if (!resp.ok) return;
        const data = await resp.json();
        renderContribCalendar(data);
    } catch (_) {
        // fail silently if file absent
    }
}

function renderContribCalendar(data) {
    const container = document.getElementById('github-contrib-calendar');
    if (!container) return;
    container.innerHTML = '';

    const weeks = data.weeks; // [{days:[{date,count}]}, ...]
    const max = data.max || 20;

    // Calculate total contributions
    let totalContributions = 0;
    weeks.forEach(week => {
        week.days.forEach(day => {
            if (day) totalContributions += day.count;
        });
    });

    // Update the title with total contributions
    const titleElement = document.getElementById('contrib-title');
    if (titleElement) {
        titleElement.textContent = `${totalContributions} contributions in the last year`;
    }

    const grid = document.createElement('div');
    grid.className = 'contrib-grid';

    weeks.forEach(week => {
        const col = document.createElement('div');
        col.className = 'contrib-week';
        for (let i = 0; i < 7; i++) {
            const d = week.days[i];
            const cell = document.createElement('div');
            cell.className = 'contrib-day';
            const intensity = d ? intensityLevel(d.count, max) : 0;
            cell.classList.add(`intensity-${intensity}`);
            col.appendChild(cell);
        }
        grid.appendChild(col);
    });

    container.appendChild(grid);

    // Render legend in separate container
    const legendContainer = document.getElementById('contrib-legend-container');
    if (legendContainer) {
        const legend = document.createElement('div');
        legend.className = 'contrib-legend';
        legend.innerHTML = 'Less ' + [0,1,2,3,4].map(i => `<span class="legend-swatch intensity-${i}"></span>`).join(' ') + ' More';
        legendContainer.appendChild(legend);
    }
}

function intensityLevel(count, max) {
    if (count <= 0) return 0;
    const q = Math.ceil((count / Math.max(max, 1)) * 4);
    return Math.max(1, Math.min(4, q));
}

window.addEventListener('DOMContentLoaded', loadContributions);

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
