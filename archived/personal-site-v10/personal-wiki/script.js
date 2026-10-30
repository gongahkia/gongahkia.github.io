"use strict";

const WIKI_CATEGORIES = ["general", "tech"];

(function initWikiCategoryFilter() {
    const filterBar = document.querySelector(".blogFilterBar");
    if (!filterBar) return;

    let state = loadWikiCategoryState();

    filterBar.querySelectorAll(".filter-link").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const cat = link.dataset.filter;
            state[cat] = !state[cat];
            saveWikiCategoryState(state);
            applyWikiCategoryState(state);
        });
    });

    applyWikiCategoryState(state);
})();

function loadWikiCategoryState() {
    const defaults = WIKI_CATEGORIES.reduce((acc, cat) => (acc[cat] = true, acc), {});
    try {
        const saved = JSON.parse(localStorage.getItem("wiki_category_filters"));
        if (saved && typeof saved === "object") {
            return WIKI_CATEGORIES.reduce((acc, cat) => (acc[cat] = cat in saved ? !!saved[cat] : true, acc), {});
        }
    } catch (_) {}
    return defaults;
}

function saveWikiCategoryState(state) {
    try {
        localStorage.setItem("wiki_category_filters", JSON.stringify(state));
    } catch (_) {}
}

function applyWikiCategoryState(state) {
    document.querySelectorAll(".filter-link").forEach((link) => {
        const cat = link.dataset.filter;
        link.classList.toggle("inactive", !state[cat]);
        link.setAttribute("aria-pressed", String(!!state[cat]));
    });

    const counts = WIKI_CATEGORIES.reduce((acc, cat) => (acc[cat] = 0, acc), {});
    let visibleCount = 0;
    document.querySelectorAll(".booksAndBlog dl[data-filter-category]").forEach((dl) => {
        const cat = dl.dataset.filterCategory;
        counts[cat] = (counts[cat] || 0) + 1;
        const show = !!state[cat];
        if (show) visibleCount += 1;
        dl.classList.toggle("filter-hidden", !show);
    });

    const noneSelected = WIKI_CATEGORIES.every((cat) => !state[cat]);
    const hasVisibleNotes = visibleCount > 0;

    document.querySelectorAll(".filter-empty-message").forEach((msg) => {
        const cat = msg.dataset.filterEmpty;
        let show;
        if (cat === "none") {
            show = noneSelected;
        } else {
            show = !noneSelected && !hasVisibleNotes && !!state[cat] && (counts[cat] || 0) === 0;
        }
        msg.classList.toggle("show", show);
    });
}
