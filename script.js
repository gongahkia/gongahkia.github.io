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

function assignLinkHighlightTilt() {
    document.querySelectorAll('a').forEach((anchor) => {
        anchor.style.setProperty('--link-highlight-tilt', `${((Math.random() - 0.5) * 1.6).toFixed(2)}deg`);
    });
}

assignLinkHighlightTilt();

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
    let metricOutput = null;
    const showMetric = day => {
        if (!metricOutput) return;
        metricOutput.textContent = day ? formatContributionMetrics(day) : '';
        metricOutput.classList.toggle('is-visible', Boolean(day));
    };

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
    let activeCell = null;
    const setActiveCell = (cell, day) => {
        if (activeCell && activeCell !== cell) {
            activeCell.classList.remove('is-active');
        }
        if (day) {
            activeCell = cell;
            cell.classList.add('is-active');
            grid.classList.add('has-active');
        } else {
            cell.classList.remove('is-active');
            if (activeCell === cell) activeCell = null;
            if (!activeCell) grid.classList.remove('has-active');
        }
        showMetric(day);
    };

    weeks.forEach(week => {
        const col = document.createElement('div');
        col.className = 'contrib-week';
        for (let i = 0; i < 7; i++) {
            const d = week.days[i];
            const cell = document.createElement('div');
            cell.className = 'contrib-day';
            const intensity = d ? intensityLevel(d.count, max) : 0;
            cell.classList.add(`intensity-${intensity}`);
            if (d) {
                const metricText = formatContributionMetrics(d);
                cell.dataset.date = d.date;
                cell.dataset.count = d.count;
                cell.setAttribute('aria-label', metricText);
                cell.tabIndex = 0;
                cell.addEventListener('mouseenter', () => setActiveCell(cell, d));
                cell.addEventListener('focus', () => setActiveCell(cell, d));
                cell.addEventListener('mouseleave', () => setActiveCell(cell, null));
                cell.addEventListener('blur', () => setActiveCell(cell, null));
            }
            col.appendChild(cell);
        }
        grid.appendChild(col);
    });

    container.appendChild(grid);

    // Render legend in separate container
    const legendContainer = document.getElementById('contrib-legend-container');
    if (legendContainer) {
        legendContainer.innerHTML = '';
        const legend = document.createElement('div');
        legend.className = 'contrib-legend';
        legend.innerHTML = 'Less ' + [0,1,2,3,4].map(i => `<span class="legend-swatch intensity-${i}"></span>`).join(' ') + ' More';
        metricOutput = document.createElement('span');
        metricOutput.className = 'contrib-hover-details';
        metricOutput.setAttribute('aria-live', 'polite');
        legend.appendChild(metricOutput);
        legendContainer.appendChild(legend);
    }
}

function formatContributionMetrics(day) {
    const count = Number(day?.count || 0);
    const total = `${count.toLocaleString()} ${pluralize(count, 'contribution')}`;
    const breakdown = [
        metricPart(day, 'commits', 'commit'),
        metricPart(day, 'pullRequests', 'PR'),
        metricPart(day, 'issues', 'issue'),
        metricPart(day, 'reviews', 'review')
    ].filter(Boolean);

    const detail = breakdown.length ? `: ${breakdown.join(', ')}` : '';
    return `${total} on ${formatContributionDate(day?.date)}${detail}`;
}

function metricPart(day, key, label) {
    if (!Object.prototype.hasOwnProperty.call(day || {}, key)) return '';
    const value = Number(day[key] || 0);
    if (value <= 0) return '';
    return `${value.toLocaleString()} ${pluralize(value, label)}`;
}

function pluralize(count, label) {
    if (label === 'PR') return count === 1 ? 'PR' : 'PRs';
    return `${label}${count === 1 ? '' : 's'}`;
}

function formatContributionDate(dateText) {
    if (!dateText) return 'unknown date';
    const parts = dateText.split('-').map(Number);
    if (parts.length !== 3 || parts.some(Number.isNaN)) return dateText;
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(date);
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
