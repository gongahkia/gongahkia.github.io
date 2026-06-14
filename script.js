"use strict";

// --- homepage clock ---

const timeFormatter = new Intl.DateTimeFormat([], {
    timeZone: "Asia/Singapore",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
});

function updateCurrentTime() {
    const timeElement = document.querySelector("#time");
    if (timeElement) timeElement.innerText = timeFormatter.format(new Date());
}

updateCurrentTime();
setInterval(updateCurrentTime, 1000);

// --- GitHub contributions calendar ---

async function loadContributions() {
    const container = document.getElementById("github-contrib-calendar");
    if (!container) return;

    try {
        const resp = await fetch("/asset/contributions.json");
        if (!resp.ok) return;
        const data = await resp.json();
        renderContribCalendar(data, container);
    } catch (_) {
        // fail silently if file absent
    }
}

function renderContribCalendar(data, container = document.getElementById("github-contrib-calendar")) {
    if (!container) return;
    container.innerHTML = "";

    const weeks = data.weeks;
    const max = data.max || 20;

    let totalContributions = 0;
    weeks.forEach((week) => {
        week.days.forEach((day) => {
            if (day) totalContributions += day.count;
        });
    });

    const titleElement = document.getElementById("contrib-title");
    if (titleElement) {
        titleElement.textContent = `${totalContributions} contributions in the last year`;
    }

    const grid = document.createElement("div");
    grid.className = "contrib-grid";

    weeks.forEach((week) => {
        const col = document.createElement("div");
        col.className = "contrib-week";
        for (let i = 0; i < 7; i++) {
            const day = week.days[i];
            const cell = document.createElement("div");
            cell.className = "contrib-day";
            const intensity = day ? intensityLevel(day.count, max) : 0;
            cell.classList.add(`intensity-${intensity}`);
            col.appendChild(cell);
        }
        grid.appendChild(col);
    });

    container.appendChild(grid);

    const legendContainer = document.getElementById("contrib-legend-container");
    if (legendContainer) {
        const legend = document.createElement("div");
        legend.className = "contrib-legend";
        legend.innerHTML = "Less " + [0, 1, 2, 3, 4].map((i) => `<span class="legend-swatch intensity-${i}"></span>`).join(" ") + " More";
        legendContainer.appendChild(legend);
    }
}

function intensityLevel(count, max) {
    if (count <= 0) return 0;
    const q = Math.ceil((count / Math.max(max, 1)) * 4);
    return Math.max(1, Math.min(4, q));
}

window.addEventListener("DOMContentLoaded", loadContributions);
