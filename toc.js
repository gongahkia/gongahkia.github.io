"use strict";

(function initDynamicIslandToc() {
    const body = document.body;
    if (!body || !body.hasAttribute("data-toc-enabled")) return;

    const headingSelector = [
        ".blog-details > h2",
        ".writeup-details > h2",
        ".note-header > h2",
        ".blog-content h2",
        ".blog-content h3",
        ".blog-content h4",
        ".writeup-content h2",
        ".writeup-content h3",
        ".writeup-content h4",
        ".note-content h2",
        ".note-content h3",
        ".note-content h4",
        "[data-toc]",
    ].join(", ");

    const headings = collectHeadings(headingSelector);
    if (headings.length < 1) return;

    const island = buildIsland(headings);
    document.body.appendChild(island.root);

    let activeId = null;
    let ticking = false;

    function update() {
        ticking = false;
        const nextActive = getActiveHeading(headings);
        if (nextActive && nextActive.id !== activeId) {
            activeId = nextActive.id;
            island.activeTitle.textContent = nextActive.text;
            island.items.forEach((item) => {
                const active = item.dataset.targetId === activeId;
                item.classList.toggle("is-active", active);
                item.setAttribute("aria-current", active ? "true" : "false");
            });
        }

        const total = document.documentElement.scrollHeight - window.innerHeight;
        const progress = total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 0;
        island.progressCircle.style.strokeDashoffset = String(island.circumference - (progress / 100) * island.circumference);
    }

    function requestUpdate() {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
    }

    function setExpanded(expanded) {
        island.root.classList.toggle("is-expanded", expanded);
        island.pill.setAttribute("aria-expanded", String(expanded));
        island.backdrop.hidden = !expanded;
        island.menu.hidden = !expanded;
        if (expanded) {
            const activeItem = island.items.find((item) => item.dataset.targetId === activeId);
            activeItem?.scrollIntoView({ block: "nearest" });
        }
    }

    island.pill.addEventListener("click", () => setExpanded(true));
    island.backdrop.addEventListener("click", () => setExpanded(false));
    island.closeButton.addEventListener("click", () => setExpanded(false));
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setExpanded(false);
    });

    island.items.forEach((item) => {
        item.addEventListener("click", () => {
            const heading = headings.find((candidate) => candidate.id === item.dataset.targetId);
            if (!heading) return;
            const y = heading.element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
            setExpanded(false);
        });
    });

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();
})();

function collectHeadings(selector) {
    const usedIds = new Set(Array.from(document.querySelectorAll("[id]")).map((el) => el.id));
    const elements = Array.from(document.querySelectorAll(selector))
        .filter((el) => !el.closest("#dynamic-island-toc"))
        .filter((el) => !el.hasAttribute("data-toc-ignore"));

    return elements
        .map((element, index) => {
            const text = (element.getAttribute("data-toc-title") || element.textContent || "Section").trim();
            if (!text) return null;

            if (!element.id) {
                element.id = uniqueId(slugify(text) || `toc-heading-${index}`, usedIds);
            } else {
                usedIds.add(element.id);
            }

            const depth = Number.parseInt(element.getAttribute("data-toc-depth") || "", 10);
            const tagLevel = /^H[1-6]$/.test(element.tagName) ? Number.parseInt(element.tagName.slice(1), 10) : 2;

            return {
                id: element.id,
                text,
                level: Number.isFinite(depth) ? depth : tagLevel,
                element,
            };
        })
        .filter(Boolean)
        .sort((a, b) => (a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
}

function buildIsland(headings) {
    const minLevel = Math.min(...headings.map((heading) => heading.level));
    const size = 24;
    const strokeWidth = 2.5;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const backdrop = document.createElement("button");
    backdrop.type = "button";
    backdrop.className = "toc-island-backdrop";
    backdrop.setAttribute("aria-label", "Close table of contents");
    backdrop.hidden = true;

    const root = document.createElement("div");
    root.id = "dynamic-island-toc";
    root.className = "toc-island";

    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = "toc-island-pill";
    pill.setAttribute("aria-label", "Open table of contents");
    pill.setAttribute("aria-expanded", "false");

    const marker = document.createElement("span");
    marker.className = "toc-island-marker";
    marker.setAttribute("aria-hidden", "true");

    const activeTitle = document.createElement("span");
    activeTitle.className = "toc-island-active";
    activeTitle.textContent = headings[0]?.text || "Contents";

    const progress = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    progress.setAttribute("class", "toc-island-progress");
    progress.setAttribute("width", String(size));
    progress.setAttribute("height", String(size));
    progress.setAttribute("viewBox", `0 0 ${size} ${size}`);
    progress.setAttribute("aria-hidden", "true");

    const progressTrack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    progressTrack.setAttribute("cx", String(size / 2));
    progressTrack.setAttribute("cy", String(size / 2));
    progressTrack.setAttribute("r", String(radius));
    progressTrack.setAttribute("fill", "none");
    progressTrack.setAttribute("stroke-width", String(strokeWidth));
    progressTrack.setAttribute("class", "toc-island-progress-track");

    const progressCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    progressCircle.setAttribute("cx", String(size / 2));
    progressCircle.setAttribute("cy", String(size / 2));
    progressCircle.setAttribute("r", String(radius));
    progressCircle.setAttribute("fill", "none");
    progressCircle.setAttribute("stroke-width", String(strokeWidth));
    progressCircle.setAttribute("stroke-linecap", "round");
    progressCircle.setAttribute("stroke-dasharray", String(circumference));
    progressCircle.setAttribute("stroke-dashoffset", String(circumference));
    progressCircle.setAttribute("class", "toc-island-progress-value");

    progress.append(progressTrack, progressCircle);
    pill.append(marker, activeTitle, progress);

    const menu = document.createElement("nav");
    menu.className = "toc-island-menu";
    menu.setAttribute("aria-label", "Table of contents");
    menu.hidden = true;

    const menuHeader = document.createElement("div");
    menuHeader.className = "toc-island-menu-header";

    const menuTitle = document.createElement("span");
    menuTitle.textContent = "Contents";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "toc-island-close";
    closeButton.setAttribute("aria-label", "Close table of contents");
    closeButton.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"/></svg>';

    menuHeader.append(menuTitle, closeButton);

    const list = document.createElement("div");
    list.className = "toc-island-list";

    const items = headings.map((heading) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "toc-island-item";
        item.dataset.targetId = heading.id;
        item.style.setProperty("--toc-indent", `${Math.max(0, heading.level - minLevel) * 14}px`);

        const label = document.createElement("span");
        label.textContent = heading.text;

        const bullet = document.createElement("span");
        bullet.className = "toc-island-item-bullet";
        bullet.setAttribute("aria-hidden", "true");

        item.append(label, bullet);
        list.appendChild(item);
        return item;
    });

    menu.append(menuHeader, list);
    root.append(backdrop, pill, menu);

    return {
        root,
        backdrop,
        pill,
        menu,
        closeButton,
        activeTitle,
        progressCircle,
        circumference,
        items,
    };
}

function getActiveHeading(headings) {
    let active = headings[0] || null;
    for (const heading of headings) {
        if (heading.element.getBoundingClientRect().top <= 120) {
            active = heading;
        } else {
            break;
        }
    }
    return active;
}

function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

function uniqueId(base, usedIds) {
    let id = base;
    let suffix = 2;
    while (usedIds.has(id)) {
        id = `${base}-${suffix}`;
        suffix += 1;
    }
    usedIds.add(id);
    return id;
}
