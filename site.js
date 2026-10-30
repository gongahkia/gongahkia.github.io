"use strict";

(() => {
  // keep the navbar separate from the page fade, including returns from a scrolled page.
  const headerStateKey = "gabriel-v11-header-hidden";
  window.addEventListener("pageswap", event => {
    if (!event.viewTransition) return;
    const header = document.querySelector(".site-nav");
    try {
      sessionStorage.setItem(headerStateKey, String(header.getBoundingClientRect().bottom <= 0));
    } catch (_) { /* the page transition still works when storage is disabled. */ }
  });
  window.addEventListener("pagereveal", event => {
    try {
      const hidden = sessionStorage.getItem(headerStateKey) === "true";
      sessionStorage.removeItem(headerStateKey);
      if (hidden) event.viewTransition?.types?.add("header-enter");
    } catch (_) { /* use the normal navbar transition when storage is disabled. */ }
  });

  document.addEventListener("DOMContentLoaded", () => {
    if (document.body.hasAttribute("data-heading-anchors")) {
      // preserve existing fragment URLs without the floating TOC or progress UI.
      const usedIds = new Set([...document.querySelectorAll("[id]")].map(node => node.id));
      const headings = [...document.querySelectorAll(".prose h2, .prose h3, .prose h4, [data-toc]")]
        .filter(node => !node.hasAttribute("data-toc-ignore"));
      headings.forEach((heading, index) => {
        if (heading.id) return;
        const text = (heading.getAttribute("data-toc-title") || heading.textContent || "Section").trim();
        if (!text) return;
        const base = text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || `toc-heading-${index}`;
        let id = base;
        let suffix = 2;
        while (usedIds.has(id)) id = `${base}-${suffix++}`;
        heading.id = id;
        usedIds.add(id);
      });
      let target;
      try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); }
      catch (_) { /* malformed fragments do not affect the article. */ }
      if (target) document.fonts.ready.then(() => target.scrollIntoView());
    }

    const currentPage = new URL(window.location.href);
    for (const link of document.querySelectorAll("a[href]")) {
      const destination = new URL(link.href);
      const external = ["http:", "https:"].includes(destination.protocol)
        && destination.origin !== currentPage.origin;
      link.toggleAttribute("data-external", external);
    }

    function updateNavigation() {
      const current = new URL(window.location.href);
      const path = current.pathname.replace(/index\.html$/, "");
      let activeSection = false;
      for (const link of document.querySelectorAll(".site-nav nav a")) {
        const target = new URL(link.href);
        const active = path.startsWith(target.pathname);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
        activeSection ||= active;
      }
      const home = document.querySelector(".wordmark");
      if (path === new URL(home.href).pathname && !activeSection) home.setAttribute("aria-current", "page");
      else home.removeAttribute("aria-current");
    }
    updateNavigation();
    window.addEventListener("hashchange", updateNavigation);

    const year = document.querySelector("#current-year");
    if (year) year.textContent = new Date().getFullYear();
  });
})();
