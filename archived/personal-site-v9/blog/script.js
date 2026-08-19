"use strict";

const BLOG_CATEGORIES = ["general", "project"];

(function initBlogCategoryFilter() {
    const filterBar = document.querySelector(".blogFilterBar");
    if (!filterBar) return;

    let state = loadCategoryState();

    filterBar.querySelectorAll(".filter-link").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const cat = link.dataset.filter;
            state[cat] = !state[cat];
            saveCategoryState(state);
            applyCategoryState(state);
        });
    });

    applyCategoryState(state);
})();

function loadCategoryState() {
    const defaults = BLOG_CATEGORIES.reduce((acc, cat) => (acc[cat] = true, acc), {});
    try {
        const saved = JSON.parse(localStorage.getItem("blog_category_filters"));
        if (saved && typeof saved === "object") {
            return BLOG_CATEGORIES.reduce((acc, cat) => (acc[cat] = cat in saved ? !!saved[cat] : true, acc), {});
        }
    } catch (_) {}
    return defaults;
}

function saveCategoryState(state) {
    try {
        localStorage.setItem("blog_category_filters", JSON.stringify(state));
    } catch (_) {}
}

function applyCategoryState(state) {
    document.querySelectorAll(".filter-link").forEach((link) => {
        const cat = link.dataset.filter;
        link.classList.toggle("inactive", !state[cat]);
        link.setAttribute("aria-pressed", String(!!state[cat]));
    });

    const counts = BLOG_CATEGORIES.reduce((acc, cat) => (acc[cat] = 0, acc), {});
    let visibleCount = 0;
    document.querySelectorAll(".booksAndBlog dl[data-filter-category]").forEach((dl) => {
        const cat = dl.dataset.filterCategory;
        counts[cat] = (counts[cat] || 0) + 1;
        const show = !!state[cat];
        if (show) visibleCount += 1;
        dl.classList.toggle("filter-hidden", !show);
    });

    const noneSelected = BLOG_CATEGORIES.every((cat) => !state[cat]);
    const hasVisiblePosts = visibleCount > 0;

    document.querySelectorAll(".filter-empty-message").forEach((msg) => {
        const cat = msg.dataset.filterEmpty;
        let show;
        if (cat === "none") {
            show = noneSelected;
        } else {
            show = !noneSelected && !hasVisiblePosts && !!state[cat] && (counts[cat] || 0) === 0;
        }
        msg.classList.toggle("show", show);
    });
}
