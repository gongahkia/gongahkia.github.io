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
    if (bgColor) {
        document.body.style.backgroundColor = bgColor;
    } else {
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
    const r = Math.floor(Math.random() * 128) + 128;
    const g = Math.floor(Math.random() * 128) + 128;
    const b = Math.floor(Math.random() * 128) + 128;
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

function assignLinkHighlightTilt() {
    document.querySelectorAll('a').forEach((anchor) => {
        anchor.style.setProperty('--link-highlight-tilt', `${((Math.random() - 0.5) * 1.6).toFixed(2)}deg`);
    });
}

assignLinkHighlightTilt();

// ----- execution code for current time -----

const currentYear = new Date().getFullYear();
document.querySelector("#current-year").innerText = currentYear;

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

// ----- wiki category filter -----

const WIKI_CATEGORIES = ['general', 'tech'];

(function initWikiCategoryFilter() {
    const filterBar = document.querySelector('.blogFilterBar');
    if (!filterBar) return; // only on wiki index

    let state = loadWikiCategoryState();

    filterBar.querySelectorAll('.filter-link').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const cat = link.dataset.filter;
            state[cat] = !state[cat];
            saveWikiCategoryState(state);
            applyWikiCategoryState(state);
        });
    });

    applyWikiCategoryState(state);
})();

function loadWikiCategoryState() {
    const defaults = WIKI_CATEGORIES.reduce((acc, c) => (acc[c] = true, acc), {});
    try {
        const saved = JSON.parse(localStorage.getItem('wiki_category_filters'));
        if (saved && typeof saved === 'object') {
            return WIKI_CATEGORIES.reduce((acc, c) => (acc[c] = c in saved ? !!saved[c] : true, acc), {});
        }
    } catch (_) {}
    return defaults;
}

function saveWikiCategoryState(state) {
    try {
        localStorage.setItem('wiki_category_filters', JSON.stringify(state));
    } catch (_) {}
}

function applyWikiCategoryState(state) {
    document.querySelectorAll('.filter-link').forEach((link) => {
        const cat = link.dataset.filter;
        link.classList.toggle('inactive', !state[cat]);
        link.setAttribute('aria-pressed', String(!!state[cat]));
    });

    const counts = WIKI_CATEGORIES.reduce((acc, c) => (acc[c] = 0, acc), {});
    document.querySelectorAll('.booksAndBlog dl[data-filter-category]').forEach((dl) => {
        const cat = dl.dataset.filterCategory;
        counts[cat] = (counts[cat] || 0) + 1;
        const show = !!state[cat];
        dl.classList.toggle('filter-hidden', !show);
    });

    const noneSelected = WIKI_CATEGORIES.every((c) => !state[c]);

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
