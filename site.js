"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const year = document.querySelector("#current-year");
    if (year) year.textContent = new Date().getFullYear();

    const time = document.querySelector("#time");
    if (time) {
        const formatter = new Intl.DateTimeFormat([], {
            timeZone: "Asia/Singapore",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
        });
        const updateTime = () => { time.textContent = formatter.format(new Date()); };
        updateTime();
        window.setInterval(updateTime, 1000);
    }

    const filterLinks = Array.from(document.querySelectorAll(".filter-link[data-filter]"));
    const entries = Array.from(document.querySelectorAll("[data-filter-list] [data-filter-category]"));
    const emptyMessages = Array.from(document.querySelectorAll(".filter-empty[data-filter-empty]"));
    if (filterLinks.length) {
        const state = Object.fromEntries(filterLinks.map((link) => [link.dataset.filter, true]));
        const apply = () => {
            const counts = Object.fromEntries(filterLinks.map((link) => [link.dataset.filter, 0]));
            let visible = 0;
            entries.forEach((entry) => {
                const category = entry.dataset.filterCategory;
                counts[category] = (counts[category] || 0) + 1;
                const show = state[category] !== false;
                entry.hidden = !show;
                if (show) visible += 1;
            });
            filterLinks.forEach((link) => {
                const selected = state[link.dataset.filter] !== false;
                link.setAttribute("aria-pressed", String(selected));
                link.classList.toggle("is-inactive", !selected);
            });
            const noneSelected = filterLinks.every((link) => state[link.dataset.filter] === false);
            emptyMessages.forEach((message) => {
                const category = message.dataset.filterEmpty;
                const show = category === "none"
                    ? noneSelected
                    : !noneSelected && visible === 0 && state[category] === true && counts[category] === 0;
                message.hidden = !show;
            });
        };
        filterLinks.forEach((link) => {
            link.addEventListener("click", () => {
                const category = link.dataset.filter;
                state[category] = !state[category];
                apply();
            });
        });
        apply();
    }

    const calendar = document.querySelector("#github-contrib-calendar");
    if (calendar) {
        fetch("asset/contributions.json")
            .then((response) => response.ok ? response.json() : null)
            .then((data) => data && renderContributions(data, calendar))
            .catch(() => {});
    }
});

function renderContributions(data, container) {
    const weeks = Array.isArray(data.weeks) ? data.weeks : [];
    const max = Math.max(data.max || 1, 1);
    let total = 0;
    const grid = document.createElement("div");
    grid.className = "contrib-grid";

    weeks.forEach((week) => {
        const column = document.createElement("div");
        column.className = "contrib-week";
        for (let day = 0; day < 7; day += 1) {
            const value = week.days?.[day];
            const count = value?.count || 0;
            total += count;
            const cell = document.createElement("span");
            cell.className = "contrib-day intensity-" + (count ? Math.min(4, Math.ceil(count / max * 4)) : 0);
            cell.title = value ? count + " contributions on " + value.date : "";
            column.appendChild(cell);
        }
        grid.appendChild(column);
    });
    container.replaceChildren(grid);
    const title = document.querySelector("#contrib-title");
    if (title) title.textContent = total + " contributions in the last year";
}
