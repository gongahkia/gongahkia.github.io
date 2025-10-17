"use strict";

// --- actual running code ---

const theButton = document.getElementById("infinityButton");
let isDarkMode = false; 

theButton?.addEventListener("click", pressTheButton);

function pressTheButton() {
    isDarkMode = !isDarkMode; 
    const newColor = isDarkMode ? generateDarkColor() : generateLightColor();
    console.log(newColor, isDarkMode); 
    document.body.style.backgroundColor = newColor;
    const articleTag = document.getElementsByClassName("overallArticleTags")[0];
    const footerTag = document.getElementsByTagName("footer")[0];
    const imageTag = document.getElementById("gongImage");
    if (isDarkMode) {
        theButton.setAttribute("style", "filter:invert(1);");
        articleTag.setAttribute("style", "filter:invert(1);");
        footerTag.setAttribute("style", "filter:invert(1);");
        imageTag.style.filter = "invert(1)";
    } else {
        theButton.style.filter = "none";
        articleTag.style.filter = "none";
        footerTag.style.filter = "none";
        imageTag.style.filter = "none";
    }
    const clickTextColor = isDarkMode ? '#CCCCCC' : '#363636';
    document.documentElement.style.setProperty('--click-text-color', clickTextColor);
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
    const clickContainer = document.getElementById('click-container');
    const clickElement = document.createElement('div');
    clickElement.textContent = 'click';
    clickElement.classList.add('click-animation');
    clickElement.style.left = (event.clientX - 20) + 'px';
    clickElement.style.top = (event.clientY - 10) + 'px';
    clickElement.style.color = getComputedStyle(document.documentElement).getPropertyValue('--click-text-color');
    clickContainer.appendChild(clickElement);
    setTimeout(() => {
        clickContainer.removeChild(clickElement);
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
            if (d) attachTooltip(cell, `${d.count} contributions on ${new Date(d.date).toDateString()}`);
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

function attachTooltip(el, text) {
    let tip;
    el.addEventListener('mouseenter', (e) => {
        tip = document.createElement('div');
        tip.className = 'contrib-tooltip';
        tip.textContent = text;
        document.body.appendChild(tip);
        positionTooltip(tip, e.clientX, e.clientY);
    });
    el.addEventListener('mousemove', (e) => {
        if (tip) positionTooltip(tip, e.clientX, e.clientY);
    });
    el.addEventListener('mouseleave', () => {
        if (tip) document.body.removeChild(tip);
        tip = null;
    });
}

function positionTooltip(tip, x, y) {
    tip.style.left = `${x}px`;
    tip.style.top = `${y}px`;
}

window.addEventListener('DOMContentLoaded', loadContributions);