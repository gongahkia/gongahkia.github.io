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
        document.querySelector("#time").innerText = formatter.format(new Date());
    }
, 1000)

document.querySelector("#current-year").innerText = currentYear;

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
        const resp = await fetch('asset/contributions.json', { cache: 'no-store' });
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
