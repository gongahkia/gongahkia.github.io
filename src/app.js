const root = document.querySelector("#root");
const clickContainer = document.querySelector("#click-container");

const clickSounds = [
  "click",
  "clack",
  "thock",
  "thonk",
  "thup",
  "pop",
  "whump",
  "thud",
  "plip",
  "clonk",
  "snap",
  "tck",
  "tak",
  "bonk",
  "klak",
  "tik",
  "tock",
  "plink",
  "clunk",
  "thwack",
  "bop",
  "klik",
  "plonk",
  "tunk",
  "pok",
  "ping",
  "thwick",
  "blip",
  "clop",
  "klock",
  "thwump",
  "tnk",
];

const signatureBubblePortrait = new URL(
  "../archived/personal-site-v11/asset/portrait/gong-2.png",
  import.meta.url,
).href;
const signatureBubbleMessages = ["hi", "click me", "i'm here", "um", "interact with me pls", "hellooo", "anyone there?", ":("];
const signatureBubbleInitialDelay = [1000, 2500];
const signatureBubbleInterval = [2600, 4200];
const signatureBubbleLifetime = 2600;

const state = {
  site: null,
  details: new Map(),
  lastListRoute: "/",
  renderId: 0,
  signatureClockTimer: null,
  signatureAffordanceDone: false,
  signatureAffordanceController: null,
  signatureBubbleStartTimer: null,
  signatureBubbleNextTimer: null,
  signatureBubbleSpawnCount: 0,
  marqueeResizeTimer: null,
};

const contributionGridCache = new WeakMap();
const marqueeScrollSpeed = 82;
const marqueeTravelRatio = 0.72;
const marqueeMinimumDuration = 1.35;

const singaporeTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Singapore",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const collectionConfig = {
  work: {
    title: "work",
    plural: "works",
    listPath: "/work/",
    detailPrefix: "/work/",
  },
  blog: {
    title: "writing",
    plural: "posts",
    listPath: "/blog/",
    detailPrefix: "/blog/posts/",
    tools: {
      search: "Search posts",
      filters: [
        ["all", "All"],
        ["general", "General"],
        ["film", "Film"],
        ["book", "Book"],
        ["project", "Project"],
      ],
    },
  },
  wiki: {
    title: "personal wiki",
    plural: "notes",
    listPath: "/personal-wiki/",
    detailPrefix: "/personal-wiki/pages/",
    tools: {
      search: "Search notes",
      filters: [
        ["all", "All"],
        ["tech", "Tech"],
        ["general", "General"],
      ],
    },
  },
  papers: {
    title: "papers",
    plural: "papers",
    listPath: "/papers/",
    detailPrefix: "/papers/pages/",
    tools: {
      search: "Search papers",
    },
  },
  awards: {
    title: "awards",
    plural: "awards",
    listPath: "/awards/",
  },
  certifications: {
    title: "certifications",
    plural: "certifications",
    listPath: "/certifications/",
  },
};

function postItColor(stagger) {
  const hue = Math.round((stagger * 137.508 + 28) % 360);
  const saturation = 46 + ((stagger * 7) % 14);
  const lightness = 80 + ((stagger * 5) % 6);
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

function postItCard(entry, stagger) {
  const background = postItColor(stagger);
  return `
    <span class="post-it-card" style="--post-it-bg:${background};--rot-from:${0.9 - stagger * 0.03}deg;--rot-to:${(stagger % 5) * 0.28 - 0.56}deg;--hover-tilt:${stagger % 2 ? 1.25 : -1.25}deg;--stagger:${stagger}"></span>`;
}

function paperCoverCard(entry, stagger) {
  const image = entry.cover || entry.image;
  const style = `--rot-from:${0.7 - stagger * 0.02}deg;--rot-to:${(stagger % 4) * 0.24 - 0.36}deg;--hover-tilt:${stagger % 2 ? 1.1 : -1.1}deg;--stagger:${stagger}`;
  const imageMarkup = image
    ? `<img src="${escapeHtml(image)}" alt="" draggable="false" loading="lazy" decoding="async">`
    : "";
  return `<span class="paper-cover-card ${image ? "has-cover" : ""}" style="${style}">${imageMarkup}</span>`;
}

const detailKindToCollection = {
  work: "work",
  blog: "blog",
  wiki: "wiki",
  paper: "papers",
};

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const monthNames = new Map(
  [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].map((month, index) => [month, index]),
);

const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

function parseDisplayDate(value) {
  const match = String(value)
    .trim()
    .match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (!match) return null;

  const [, monthName, day, year] = match;
  if (!monthNames.has(monthName)) return null;
  return new Date(Number(year), monthNames.get(monthName), Number(day));
}

function formatUpdatedLabel(value) {
  const updatedDate = parseDisplayDate(value);
  if (!updatedDate) return `Updated ${value}`;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const elapsedDays = Math.floor((today - updatedDate) / 86_400_000);

  if (elapsedDays < 0 || elapsedDays > 9) {
    return `Updated ${longDateFormatter.format(updatedDate)}`;
  }

  if (elapsedDays === 0) return "Updated today.";

  return `Updated ${elapsedDays} ${elapsedDays === 1 ? "day" : "days"} ago`;
}

function formatSingaporeClock() {
  return singaporeTimeFormatter.format(new Date());
}

function signatureMetaMarkup(profile) {
  const items = [profile.alternateName, profile.location].filter(Boolean).map(escapeHtml);
  items.push(
    `<span data-singapore-clock>${escapeHtml(formatSingaporeClock())}</span> <a href="https://24timezones.com/time-zone/gmt+8">GMT+8</a>`,
  );
  return items.join(" · ");
}

function signatureWord(word, className = "signature") {
  return `
    <svg class="${className}" viewBox="0 0 180 60" aria-hidden="true" focusable="false">
      <text class="signature-outline" x="4" y="39" font-family="Snell Roundhand, Apple Chancery, cursive" font-size="42">${word}</text>
      <text class="signature-fill" x="4" y="39" font-family="Snell Roundhand, Apple Chancery, cursive" font-size="42">${word}</text>
    </svg>`;
}

function signature() {
  return `
    <span class="signature-wordmark" aria-hidden="true">
      <span class="signature-gabriel">${signatureWord("Gabriel")}</span>
      <span class="signature-ong-frame">${signatureWord("Ong", "signature signature-ong")}</span>
    </span>
    <span class="visually-hidden">Gabriel Ong</span>`;
}

function backButton(mode = "list") {
  return `
    <button class="back-button stagger-in" data-back data-mode="${mode}" aria-label="Go back" style="--stagger:0">
      <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M11.25 4.5 6.75 9l4.5 4.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>`;
}

function layout(content, { list = false, routeFade = false, detail = false } = {}) {
  return `
    <div class="skip-link-frame">
      <a class="skip-link-pill" href="#main">Skip to content</a>
    </div>
    <main id="main" class="page-shell ${routeFade ? "route-fade-in" : ""}" data-page-wrapper>
      <div class="${detail ? "detail-content" : "page-content"} ${list ? "is-list" : ""}">
        ${content}
        ${siteFooter()}
      </div>
    </main>`;
}

function siteFooter() {
  return `
    <footer class="site-footer">
      <p>&copy; 2023-2026 Gabriel Ong. All rights reserved.</p>
    </footer>`;
}

async function loadSite() {
  if (state.site) return state.site;
  const response = await fetch("/content/site.json");
  if (!response.ok) throw new Error("Unable to load generated content manifest.");
  state.site = await response.json();
  primeContributionGraph();
  return state.site;
}

function routeFor(pathname = location.pathname) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (clean === "/") return { view: "home" };
  if (clean === "/work") return { view: "list", collection: "work" };
  if (clean === "/blog") return { view: "list", collection: "blog" };
  if (clean === "/personal-wiki") return { view: "list", collection: "wiki" };
  if (clean === "/papers") return { view: "list", collection: "papers" };
  if (clean === "/awards") return { view: "list", collection: "awards" };
  if (clean === "/certifications") return { view: "list", collection: "certifications" };

  const work = clean.match(/^\/work\/([^/]+)$/);
  if (work) return { view: "detail", collection: "work", slug: decodeURIComponent(work[1]) };

  const blog = clean.match(/^\/blog\/posts\/([^/]+)\.html$/);
  if (blog) return { view: "detail", collection: "blog", slug: decodeURIComponent(blog[1]) };

  const wiki = clean.match(/^\/personal-wiki\/pages\/([^/]+)\.html$/);
  if (wiki) return { view: "detail", collection: "wiki", slug: decodeURIComponent(wiki[1]) };

  const paper = clean.match(/^\/papers\/pages\/([^/]+)\.html$/);
  if (paper) return { view: "detail", collection: "papers", slug: decodeURIComponent(paper[1]) };

  return { view: "not-found" };
}

function documentTitleFor(route, detail) {
  if (route.view === "home") return "Gabriel Ong";
  if (route.view === "list") return titleCase(collectionConfig[route.collection].title);
  if (route.view === "detail" && detail) return detail.title;
  return "Not found";
}

function titleCase(value = "") {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function getCollectionItems(collection) {
  return state.site.collections[collection] ?? [];
}

function findItem(collection, slug) {
  return getCollectionItems(collection).find((item) => item.slug === slug);
}

async function loadDetail(item) {
  if (!item) return null;
  if (state.details.has(item.detail)) return state.details.get(item.detail);
  const response = await fetch(item.detail);
  if (!response.ok) throw new Error(`Unable to load ${item.detail}`);
  const detail = await response.json();
  state.details.set(item.detail, detail);
  return detail;
}

function renderHome() {
  const { home, collections, counts } = state.site;
  const signatureMeta = signatureMetaMarkup(home.profile);
  const intro = `
    <div class="intro">
      <div class="stagger-in" style="--stagger:0">
        <header class="intro-header">
          <div class="signature-menu">
            <h1 class="signature-title">
              <button class="signature-trigger" type="button" aria-label="Show contact links for Gabriel Ong">
                ${signature()}
              </button>
            </h1>
            <span class="signature-hover-zone" aria-hidden="true"></span>
            <span class="signature-bubbles" aria-hidden="true"></span>
            <div class="signature-reveal" role="group" aria-label="Contact links">
              <div class="signature-reveal-inner">
                ${signatureMeta ? `<p class="signature-meta">${signatureMeta}</p>` : ""}
                ${linkGroups(home.links, { omit: ["writing"] })}
              </div>
            </div>
          </div>
          <div class="updated">${escapeHtml(formatUpdatedLabel(home.updated))}</div>
        </header>
      </div>
      <p class="intro-copy stagger-in" style="--stagger:1">${escapeHtml(home.profile.intro)}</p>
    </div>`;

  return layout(`
    ${intro}
    <div class="home-sections">
      ${previewSection("work", collections.work, { count: previewCount(collections.work), moreLabel: `${counts.work} works` })}
      ${definitionSection("skills", home.skills)}
      ${infoSection("experience", home.experience)}
      ${infoSection("education", home.education)}
      ${previewSection("awards", collections.awards, { count: previewCount(collections.awards), moreLabel: `${counts.awards} awards` })}
      ${previewSection("certifications", collections.certifications, { count: previewCount(collections.certifications), moreLabel: `${counts.certifications} certifications` })}
      ${previewSection("blog", collections.blog, { title: "writing", count: previewCount(collections.blog), moreLabel: `${counts.blog} posts` })}
      ${previewSection("papers", collections.papers, { count: previewCount(collections.papers), moreLabel: `${counts.papers} papers` })}
      ${previewSection("wiki", collections.wiki, { title: "wiki", count: previewCount(collections.wiki), moreLabel: `${counts.wiki} notes` })}
    </div>`);
}

function previewCount(entries = []) {
  return entries.length >= 4 ? 3 : entries.length;
}

function contributionsSection(contributions, options = {}) {
  if (!contributions?.weeks?.length) return "";
  const sectionClass = ["section", options.className].filter(Boolean).join(" ");
  const sectionAttrs = options.attr ? ` ${options.attr}` : "";
  const showTitle = options.showTitle !== false;
  const titleStagger = options.stagger ?? 0;
  const panelStagger = showTitle ? titleStagger + 1 : titleStagger;
  const weeks = contributionGridMarkup(contributions);

  return `
    <section class="${sectionClass}"${sectionAttrs}>
      ${showTitle ? `<h2 class="section-title stagger-in" style="--stagger:${titleStagger}">github</h2>` : ""}
      <div class="contrib-panel stagger-in" style="--stagger:${panelStagger}">
        <a href="https://github.com/gongahkia">${escapeHtml(contributions.total)} contributions in the past year</a>
        <div class="contrib-scroll" aria-label="GitHub contribution calendar" role="img">
          <span class="contrib-grid">${weeks}</span>
        </div>
      </div>
    </section>`;
}

function contributionGridMarkup(contributions) {
  const cached = contributionGridCache.get(contributions);
  if (cached) return cached;

  const max = Math.max(1, contributions.max ?? 1);
  const weeks = contributions.weeks
    .map(
      (week) => `
        <span class="contrib-week">
          ${(week.days ?? [])
            .map((day) => {
              const level = day.count <= 0 ? 0 : Math.max(1, Math.min(4, Math.ceil((day.count / max) * 4)));
              return `<span class="contrib-day intensity-${level}" title="${escapeHtml(day.date)}: ${escapeHtml(day.count)}"></span>`;
            })
            .join("")}
        </span>`,
    )
    .join("");

  contributionGridCache.set(contributions, weeks);
  return weeks;
}

function primeContributionGraph() {
  const contributions = state.site?.home?.contributions;
  if (contributions?.weeks?.length) contributionGridMarkup(contributions);
}

function workContributionsSection(stagger = 0) {
  return contributionsSection(state.site.home.contributions, {
    attr: "data-work-contributions",
    className: "work-contributions",
    showTitle: false,
    stagger,
  });
}

function linkGroups(groups, options = {}) {
  const omitted = new Set(options.omit ?? []);
  return Object.entries(groups)
    .filter(([label]) => !omitted.has(label))
    .map(([label, links], index) => {
      const renderedLinks = links
        .map((link) => {
          return `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`;
        })
        .join(", ");
      return `
        <div class="link-group" style="--contact-stagger:${index}">
          <span>${escapeHtml(label)}</span>
          <p>${renderedLinks}</p>
        </div>`;
    })
    .join("");
}

function previewSection(collection, entries, options = {}) {
  const config = collectionConfig[collection];
  const source = options.source ?? entries;
  const visible = entries.slice(0, options.count ?? entries.length);
  const rows = visible
    .map((entry, index) => entryRow(entry, collection, index + 1))
    .join("");
  const needsMore = source.length > visible.length;
  const hiddenEntries = stackPreviewEntries(source.slice(visible.length), collection);
  const more = needsMore
    ? moreRow(config.listPath, visible.length + 1, options.moreLabel, collection, hiddenEntries, { expandable: true })
    : "";

  return `
    <section class="section" data-section="${collection}" data-preview-count="${visible.length}" data-expanded="false">
      <h2 class="section-title stagger-in" style="--stagger:0">${escapeHtml(options.title ?? config.title)}</h2>
      <div class="entries">
        ${rows}
        ${more}
      </div>
    </section>`;
}

function stackPreviewEntries(entries, collection) {
  if (collection === "blog") {
    return entries.filter((entry) => hasVisualThumbnail(entry, collection)).slice(0, 3);
  }
  return entries.slice(0, 3);
}

function definitionSection(title, entries) {
  const rows = entries
    .map(
      (entry, index) => `
        <div class="info-row stagger-in" style="--stagger:${index + 1}">
          <span class="info-date">${escapeHtml(entry.label)}</span>
          <span class="info-main">${escapeHtml(entry.value)}</span>
        </div>`,
    )
    .join("");

  return `
    <section class="section">
      <h2 class="section-title stagger-in" style="--stagger:0">${escapeHtml(title)}</h2>
      <div class="info-rows">${rows}</div>
    </section>`;
}

function infoSection(title, entries) {
  const rows = entries
    .map(
      (entry, index) => `
        <div class="info-row stagger-in" style="--stagger:${index + 1}">
          <span class="info-date">${escapeHtml(entry.date)}</span>
          <span class="info-main">
            ${entry.href ? `<a href="${escapeHtml(entry.href)}">${escapeHtml(entry.title)}</a>` : escapeHtml(entry.title)}
            ${entry.meta ? `<small>${escapeHtml(entry.meta)}</small>` : ""}
            ${entry.note ? `<small>${escapeHtml(entry.note)}</small>` : ""}
          </span>
        </div>`,
    )
    .join("");

  return `
    <section class="section">
      <h2 class="section-title stagger-in" style="--stagger:0">${escapeHtml(title)}</h2>
      <div class="info-rows">${rows}</div>
    </section>`;
}

function entryRow(entry, collection, stagger, options = {}) {
  const date = entry.dateRange || entry.date || entry.year || "";
  const subtitle = subtitleFor(entry, collection);
  const shellClass = collection === "work" ? "has-single" : "";
  const animationClass = options.expanding ? "is-expanding-row" : "stagger-in";
  const animationStagger = options.expanding ? Math.min(stagger, 8) : stagger;
  const searchableText = [entry.title, subtitle, date].filter(Boolean).join(" ").toLowerCase();
  return `
    <div class="entry-shell ${shellClass} ${animationClass}" style="--stagger:${animationStagger}" data-entry-shell data-search-text="${escapeHtml(searchableText)}" data-filter-value="${escapeHtml(entry.category ?? "all")}">
      <div class="entry-divider">
        <a class="entry-link" href="${escapeHtml(entry.path)}" data-route data-collection="${collection}" data-slug="${escapeHtml(entry.slug)}">
          ${thumbnail(entry, collection, stagger)}
          <span class="row-copy">
            ${marqueeText(entry.title, "row-title")}
            ${subtitle ? marqueeText(subtitle, "row-subtitle") : ""}
          </span>
          <span class="row-date">${escapeHtml(date)}</span>
        </a>
      </div>
    </div>`;
}

function moreRow(path, stagger, label = "More", collection = "", hiddenEntries = [], options = {}) {
  const stack = hiddenEntries.length
    ? stackThumbnail(hiddenEntries, collection, stagger)
    : `<div class="thumb-slot" aria-hidden="true"><span class="text-thumb">+</span></div>`;
  const expandAttrs = options.expandable ? ` data-expand-section="${escapeHtml(collection)}" aria-expanded="false"` : "";

  return `
    <div class="entry-shell ${hiddenEntries.length ? "has-stack" : ""} stagger-in" style="--stagger:${stagger}" data-entry-shell>
      <div class="entry-divider more-row">
        <a class="entry-link" href="${escapeHtml(path)}" data-route${expandAttrs}>
          ${stack}
          <span class="row-copy">
            ${marqueeText("More", "row-title")}
            ${marqueeText(label, "row-subtitle")}
          </span>
          <span class="row-date">${chevron()}</span>
        </a>
      </div>
    </div>`;
}

function marqueeText(value, className) {
  return `<span class="${className} marquee-field" data-marquee><span class="marquee-text">${escapeHtml(value)}</span></span>`;
}

function stackThumbnail(entries, collection, stagger) {
  const stackEntries = collection === "blog" ? entries.filter((entry) => hasVisualThumbnail(entry, collection)) : entries;
  if (!stackEntries.length) {
    return `<div class="thumb-slot thumb-slot-empty" aria-hidden="true"></div>`;
  }

  const fan = [
    [-17, -12, -8.5, -7, -5, -4.8],
    [15, -11, 7.5, 7, -5, 4.8],
    [0, 7, -1.5, 0, 1, -1.2],
  ];
  return `
    <div class="image-stack ${collection}" aria-hidden="true">
      ${stackEntries
        .map((entry, index) => {
          const [fanTx, fanTy, fanRot, restTx, restTy, restRot] = fan[index] ?? [0, 0, 0, 0, 0, 0];
          return `
            <span class="image-stack-card" style="--fan-tx:${fanTx}px;--fan-ty:${fanTy}px;--fan-rot:${fanRot}deg;--rest-tx:${restTx}px;--rest-ty:${restTy}px;--rest-rot:${restRot}deg;--stack-index:${index}">
              ${stackCard(entry, collection, stagger + index)}
            </span>`;
        })
        .join("")}
    </div>`;
}

function stackCard(entry, collection, stagger) {
  if (collection === "wiki") {
    return postItCard(entry, stagger);
  }

  if (collection === "papers") {
    return paperCoverCard(entry, stagger);
  }

  if (hasVisualThumbnail(entry, collection)) {
    return `
      <span class="polaroid-card" style="--rot-from:${0.9 - stagger * 0.03}deg;--rot-to:${(stagger % 4) * 0.34 - 0.58}deg;--hover-tilt:${stagger % 2 ? 1.4 : -1.4}deg;--stagger:${stagger}">
        <img src="${escapeHtml(entry.image)}" alt="" draggable="false" loading="lazy" decoding="async">
      </span>`;
  }

  const label = collection === "blog" ? (entry.category ?? "post").slice(0, 2) : collection.slice(0, 2);
  return `<span class="text-thumb ${collection}">${escapeHtml(label)}</span>`;
}

function hasVisualThumbnail(entry, collection) {
  if (collection === "blog") return entry.category === "film" && Boolean(entry.image);
  return Boolean(entry.image);
}

function subtitleFor(entry, collection) {
  if (collection === "work") return entry.summary;
  if (collection === "blog") {
    if (entry.author) return entry.author;
    if (entry.director) return `${entry.director}${entry.rating ? ` · ${entry.rating}/5` : ""}`;
    if (entry.status) return entry.status;
    return entry.category;
  }
  if (collection === "wiki") return `${entry.category} · ${entry.lines} lines`;
  if (collection === "papers") return entry.authors;
  if (collection === "awards" || collection === "certifications") return entry.meta;
  return "";
}

function thumbnail(entry, collection, stagger) {
  if (collection === "blog" && entry.category !== "film") {
    return `<div class="thumb-slot thumb-slot-empty" aria-hidden="true"></div>`;
  }

  if (collection === "wiki") {
    return `
      <div class="thumb-slot" aria-hidden="true">
        ${postItCard(entry, stagger)}
      </div>`;
  }

  if (collection === "papers") {
    return `
      <div class="thumb-slot thumb-slot-cover" aria-hidden="true">
        ${paperCoverCard(entry, stagger)}
      </div>`;
  }

  if (hasVisualThumbnail(entry, collection)) {
    return `
      <div class="thumb-slot" aria-hidden="true">
        <span class="polaroid-card" style="--rot-from:${1.2 - stagger * 0.04}deg;--rot-to:${(stagger % 4) * 0.35 - 0.55}deg;--hover-tilt:${stagger % 2 ? 1.4 : -1.4}deg;--stagger:${stagger}">
          <img src="${escapeHtml(entry.image)}" alt="" draggable="false" loading="lazy" decoding="async">
        </span>
      </div>`;
  }

  const label = collection === "blog" ? (entry.category ?? "post").slice(0, 2) : collection.slice(0, 2);
  return `
    <div class="thumb-slot" aria-hidden="true">
      <span class="text-thumb ${collection}">${escapeHtml(label)}</span>
    </div>`;
}

function chevron() {
  return `
    <svg class="chevron" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M5.625 3.75 9.375 7.5l-3.75 3.75" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
}

function assignLinkHighlightTilt() {
  const targets = root.querySelectorAll(
    "a:not(.entry-link):not(.skip-link-pill)",
  );
  targets.forEach((target) => {
    target.style.setProperty(
      "--link-highlight-tilt",
      `${((Math.random() - 0.5) * 1.6).toFixed(2)}deg`,
    );
  });
}

function refreshMarquees(scope = root) {
  scope.querySelectorAll?.("[data-marquee]").forEach((field) => {
    const text = field.querySelector(".marquee-text");
    if (!text || field.offsetParent === null) return;

    field.classList.remove("is-overflowing");
    field.style.removeProperty("--marquee-distance");
    field.style.removeProperty("--marquee-hover-duration");

    const overflow = Math.ceil(text.scrollWidth - field.clientWidth);
    if (overflow <= 2) return;

    const distance = overflow + 18;
    const duration = Math.max(
      marqueeMinimumDuration,
      distance / (marqueeScrollSpeed * marqueeTravelRatio),
    );

    field.classList.add("is-overflowing");
    field.style.setProperty("--marquee-distance", `${distance}px`);
    field.style.setProperty("--marquee-hover-duration", `${duration.toFixed(2)}s`);
  });
}

function queueMarqueeRefresh(scope = root) {
  requestAnimationFrame(() => {
    refreshMarquees(scope);
    document.fonts?.ready.then(() => refreshMarquees(scope));
  });
}

function spawnClickSound(event) {
  if (!clickContainer || event.button !== 0 || event.detail === 0) return;

  const clickElement = document.createElement("div");
  clickElement.className = "click-animation";
  clickElement.textContent = clickSounds[Math.floor(Math.random() * clickSounds.length)];
  clickElement.style.left = `${event.clientX}px`;
  clickElement.style.top = `${event.clientY}px`;
  clickElement.style.setProperty("--click-drift", `${Math.round((Math.random() - 0.5) * 20)}px`);
  clickElement.style.setProperty("--click-tilt", `${((Math.random() - 0.5) * 10).toFixed(2)}deg`);

  clickContainer.append(clickElement);
  window.setTimeout(() => clickElement.remove(), 1000);
}

function isNearPageTop() {
  return window.scrollY <= 12;
}

function isSignatureActive(menu) {
  return menu.matches(":hover") || menu.contains(document.activeElement);
}

function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= window.innerHeight &&
    rect.left <= window.innerWidth
  );
}

function isSignatureAffordanceVisible(menu, layer) {
  return isElementInViewport(menu) && isElementInViewport(layer);
}

function clearSignatureAffordance({ done = false, removeBubbles = true } = {}) {
  window.clearTimeout(state.signatureBubbleStartTimer);
  window.clearTimeout(state.signatureBubbleNextTimer);
  state.signatureBubbleStartTimer = null;
  state.signatureBubbleNextTimer = null;
  state.signatureBubbleSpawnCount = 0;
  state.signatureAffordanceController?.abort();
  state.signatureAffordanceController = null;
  if (removeBubbles) {
    root
      .querySelectorAll(".signature-bubble")
      .forEach((bubble) => bubble.remove());
  }

  if (done) state.signatureAffordanceDone = true;
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function spawnSignatureBubble(layer) {
  const bubble = document.createElement("span");
  const isPortrait = state.signatureBubbleSpawnCount > 0 && Math.random() < 0.2;
  bubble.className = `signature-bubble${isPortrait ? " is-portrait" : ""}`;
  bubble.style.setProperty("--bubble-left", `${randomBetween(-6, 28).toFixed(1)}px`);
  bubble.style.setProperty("--bubble-top", `${randomBetween(-2, 14).toFixed(1)}px`);
  bubble.style.setProperty("--bubble-drift", `${randomBetween(-10, 13).toFixed(1)}px`);
  bubble.style.setProperty("--bubble-lift", `${randomBetween(18, 28).toFixed(1)}px`);
  bubble.style.setProperty("--bubble-tilt", `${randomBetween(-8, 7).toFixed(2)}deg`);
  bubble.style.setProperty("--bubble-tail-tilt", `${randomBetween(-12, 16).toFixed(2)}deg`);

  if (isPortrait) {
    const image = document.createElement("img");
    image.src = signatureBubblePortrait;
    image.alt = "";
    image.decoding = "async";
    bubble.append(image);
  } else {
    const index = state.signatureBubbleSpawnCount % signatureBubbleMessages.length;
    bubble.textContent = signatureBubbleMessages[index];
  }

  layer.append(bubble);
  state.signatureBubbleSpawnCount += 1;
  window.setTimeout(() => bubble.remove(), signatureBubbleLifetime);
}

function scheduleSignatureBubble(menu, layer, signal) {
  if (state.signatureBubbleSpawnCount >= 7) {
    clearSignatureAffordance({ done: true, removeBubbles: false });
    return;
  }

  state.signatureBubbleNextTimer = window.setTimeout(
    () => {
      if (
        signal.aborted ||
        state.signatureAffordanceDone ||
        !isNearPageTop() ||
        !isSignatureAffordanceVisible(menu, layer) ||
        isSignatureActive(menu)
      ) {
        clearSignatureAffordance({ done: true });
        return;
      }

      spawnSignatureBubble(layer);
      scheduleSignatureBubble(menu, layer, signal);
    },
    randomBetween(signatureBubbleInterval[0], signatureBubbleInterval[1]),
  );
}

function bindSignatureAffordance(route) {
  clearSignatureAffordance();
  if (route.view !== "home" || state.signatureAffordanceDone || !isNearPageTop()) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const menu = root.querySelector(".signature-menu");
  const layer = root.querySelector(".signature-bubbles");
  if (!menu || !layer) return;
  if (!isSignatureAffordanceVisible(menu, layer)) return;

  const controller = new AbortController();
  const { signal } = controller;
  state.signatureAffordanceController = controller;

  const finish = () => clearSignatureAffordance({ done: true });
  const finishIfNotVisible = () => {
    if (!isNearPageTop() || !isSignatureAffordanceVisible(menu, layer)) finish();
  };

  menu.addEventListener("pointerenter", finish, { once: true, signal });
  menu.addEventListener("pointerdown", finish, { once: true, signal });
  menu.addEventListener("focusin", finish, { once: true, signal });
  window.addEventListener("scroll", finishIfNotVisible, { passive: true, signal });
  window.addEventListener("resize", finishIfNotVisible, { passive: true, signal });

  state.signatureBubbleStartTimer = window.setTimeout(() => {
    if (
      signal.aborted ||
      state.signatureAffordanceDone ||
      !isNearPageTop() ||
      !isSignatureAffordanceVisible(menu, layer) ||
      isSignatureActive(menu)
    ) {
      finish();
      return;
    }

    spawnSignatureBubble(layer);
    scheduleSignatureBubble(menu, layer, signal);
  }, randomBetween(signatureBubbleInitialDelay[0], signatureBubbleInitialDelay[1]));
}

function clearInfoRowFocus(container = root) {
  if (container.matches?.(".info-row")) container.classList.remove("is-focused");
  if (container.matches?.(".info-rows")) container.classList.remove("is-row-focused");
  container.querySelectorAll?.(".info-row.is-focused").forEach((row) => row.classList.remove("is-focused"));
  container.querySelectorAll?.(".info-rows.is-row-focused").forEach((rows) => rows.classList.remove("is-row-focused"));
}

function focusInfoRow(row) {
  const rows = row?.closest(".info-rows");
  if (!rows) return;
  if (rows.classList.contains("is-row-focused") && row.classList.contains("is-focused")) return;
  rows.querySelector(".info-row.is-focused")?.classList.remove("is-focused");
  rows.classList.add("is-row-focused");
  row.classList.add("is-focused");
}

function openCollectionFromMore(collection) {
  const config = collectionConfig[collection];
  const section = root.querySelector(`[data-section="${collection}"]`);
  if (!config?.listPath || !section) return;

  const items = getCollectionItems(collection);
  const storedPreviewCount = Number(section.dataset.previewCount);
  const previewCountValue =
    Number.isFinite(storedPreviewCount) && storedPreviewCount > 0
      ? storedPreviewCount
      : previewCount(items);
  navigate(config.listPath, {
    expandFromHome: {
      collection,
      previewCount: previewCountValue,
    },
  });
}

function renderListTools(config) {
  if (!config.tools) return "";

  const filters = config.tools.filters?.length
    ? `
      <div class="filter-bar" role="group" aria-label="${escapeHtml(config.title)} filters">
        ${config.tools.filters
          .map(
            ([value, label], index) => `
              <button class="filter-pill ${index === 0 ? "is-active" : ""}" type="button" data-filter="${escapeHtml(value)}">
                ${escapeHtml(label)}
              </button>`,
          )
          .join("")}
      </div>`
    : "";

  return `
    <div class="collection-tools stagger-in" style="--stagger:1" data-list-tools>
      <label class="search-field">
        <span class="visually-hidden">${escapeHtml(config.tools.search)}</span>
        <input type="search" data-search autocomplete="off" placeholder="${escapeHtml(config.tools.search)}">
      </label>
      ${filters}
    </div>`;
}

function renderList(collection, options = {}) {
  const config = collectionConfig[collection];
  const entries = getCollectionItems(collection);
  const expandOptions = options.expandFromHome;
  const expandFromHome = expandOptions?.collection === collection;
  const requestedPreviewCount = Number(expandOptions?.previewCount);
  const initialCount = expandFromHome
    ? Math.min(
        Number.isFinite(requestedPreviewCount) && requestedPreviewCount > 0
          ? requestedPreviewCount
          : previewCount(entries),
        entries.length,
      )
    : entries.length;
  const visibleEntries = entries.slice(0, initialCount);
  const rows = visibleEntries.map((entry, index) => entryRow(entry, collection, index + 2)).join("");
  const contributionGraph =
    collection === "work" && !expandFromHome ? workContributionsSection(initialCount + 1) : "";

  return `
    ${backButton("list")}
    ${layout(
      `
        <header class="collection-header stagger-in" style="--stagger:0">
          <h1 class="detail-title">${escapeHtml(config.title)}</h1>
          ${collection === "work" ? `<p class="collection-description">I put most of my projects on <a href="https://github.com/gongahkia">Github</a>.</p>` : ""}
          ${renderListTools(config)}
        </header>
        <section class="section collection-list" data-collection-list data-collection="${escapeHtml(collection)}" data-preview-count="${initialCount}">
          <div class="entries">${rows}</div>
          ${contributionGraph}
          <p class="empty-state" data-empty hidden>No matching ${escapeHtml(config.plural)}.</p>
        </section>
      `,
      { list: true, routeFade: true },
    )}`;
}

function appendWorkContributions(list, stagger = 0) {
  if (!list || root.querySelector("[data-work-contributions]")) return;
  const html = workContributionsSection(stagger);
  if (!html) return;
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  const emptyState = list.querySelector("[data-empty]");
  list.insertBefore(template.content, emptyState);
  assignLinkHighlightTilt();
  queueMarqueeRefresh(list);
}

function expandRouteList(collection, previewCountValue) {
  const list = root.querySelector(`[data-collection-list][data-collection="${collection}"]`);
  const entries = list?.querySelector(".entries");
  if (!list || !entries || list.dataset.expanded === "true") return;

  const items = getCollectionItems(collection);
  const startCount =
    Number.isFinite(Number(previewCountValue)) && Number(previewCountValue) > 0
      ? Number(previewCountValue)
      : previewCount(items);
  const remaining = items.slice(startCount);
  if (!remaining.length) return;

  const startHeight = entries.getBoundingClientRect().height;
  const template = document.createElement("template");
  template.innerHTML = remaining
    .map((entry, index) => entryRow(entry, collection, startCount + index + 2, { expanding: true }))
    .join("");

  entries.style.height = `${startHeight}px`;
  entries.classList.add("is-expanding");
  entries.append(template.content);
  list.dataset.expanded = "true";
  if (collection === "work") appendWorkContributions(list, startCount + 1);
  queueMarqueeRefresh(list);

  const endHeight = entries.scrollHeight;
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    entries.classList.remove("is-expanding");
    entries.style.height = "";
    entries.removeEventListener("transitionend", onTransitionEnd);
  };
  const onTransitionEnd = (event) => {
    if (event.propertyName === "height") finish();
  };

  entries.addEventListener("transitionend", onTransitionEnd);
  requestAnimationFrame(() => {
    entries.style.height = `${endHeight}px`;
  });
  window.setTimeout(finish, 850);
}

function renderDetail(detail) {
  const collection = detailKindToCollection[detail.kind] ?? detail.kind;
  const config = collectionConfig[collection];
  const showHeroImage = detail.image && detail.kind !== "wiki" && (detail.kind !== "blog" || detail.category === "film");
  const hero =
    showHeroImage
      ? `
        <figure class="hero-polaroid ${detail.kind === "paper" ? "is-paper-cover" : ""}">
          <img src="${escapeHtml(detail.image)}" alt="${escapeHtml(detail.title)}">
        </figure>`
      : "";
  const links = detail.links?.length
    ? `<div class="detail-links">${detail.links.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join("")}</div>`
    : "";
  const meta = detail.meta?.length
    ? `
      <dl class="detail-meta">
        ${detail.meta
          .map(
            (item) => `
              <dt>${escapeHtml(item.label)}</dt>
              <dd>${item.href ? `<a href="${escapeHtml(item.href)}">${escapeHtml(item.value)}</a>` : escapeHtml(item.value)}</dd>`,
          )
          .join("")}
      </dl>`
    : "";

  return `
    ${backButton("detail")}
    ${layout(
      `
        <article data-detail="${escapeHtml(detail.slug)}">
          ${hero}
          <header class="detail-header stagger-in" style="--stagger:1">
            <p class="detail-kicker">${escapeHtml(config.title)}</p>
            <h1 class="detail-title">${escapeHtml(detail.title)}</h1>
            <div class="detail-year">${escapeHtml(detail.date ?? "")}</div>
            ${links}
          </header>
          <div class="entry-body stagger-in" style="--stagger:2">
            ${meta}
            ${detail.summary ? `<p class="detail-summary">${escapeHtml(detail.summary)}</p>` : ""}
            <div class="markdown-body">${detail.html}</div>
          </div>
        </article>
      `,
      { routeFade: true, detail: true },
    )}`;
}

function renderNotFound() {
  return layout(
    `
      <div class="intro">
        <header class="detail-header stagger-in" style="--stagger:0">
          <h1 class="detail-title">Not found</h1>
          <p class="intro-copy">This route does not map to migrated content.</p>
        </header>
      </div>
      ${moreRow("/", 1, "Home")}
    `,
    { routeFade: true },
  );
}

async function render(pathname = location.pathname, options = {}) {
  const renderId = ++state.renderId;
  if (!state.site) {
    root.innerHTML = `<main class="page-shell" aria-busy="true"><div class="page-content"></div></main>`;
  }

  try {
    await loadSite();
    if (renderId !== state.renderId) return;

    const route = routeFor(pathname);
    let html = "";
    let detail = null;

    if (route.view === "home") {
      html = renderHome();
    } else if (route.view === "list") {
      state.lastListRoute = collectionConfig[route.collection].listPath;
      html = renderList(route.collection, options);
    } else if (route.view === "detail") {
      const item = findItem(route.collection, route.slug);
      detail = await loadDetail(item);
      html = detail ? renderDetail(detail) : renderNotFound();
    } else {
      html = renderNotFound();
    }

    if (renderId !== state.renderId) return;
    root.innerHTML = html;
    document.title = documentTitleFor(route, detail);
    assignLinkHighlightTilt();
    queueMarqueeRefresh();
    bindSignatureClock();
    if (!options.keepScroll) window.scrollTo({ top: 0, behavior: "instant" });
    bindSignatureAffordance(route);
    const expandOptions = options.expandFromHome;
    if (expandOptions && route.view === "list" && expandOptions.collection === route.collection) {
      requestAnimationFrame(() => {
        expandRouteList(route.collection, expandOptions.previewCount);
      });
    }
    if (detail?.kind === "wiki" || detail?.kind === "paper") ensureMathJax();
  } catch (error) {
    root.innerHTML = layout(`<p class="loading">Content failed to load.</p><pre class="error-output">${escapeHtml(error.message)}</pre>`);
    console.error(error);
  }
}

function navigate(href, options = {}) {
  if (options.replace) history.replaceState({}, "", href);
  else history.pushState({}, "", href);
  render(location.pathname, options);
}

function navigateWithExit(href, options = {}) {
  const shell = root.querySelector("[data-page-wrapper]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!shell || reduceMotion) {
    navigate(href, options);
    return;
  }

  shell.classList.add("route-exit");
  window.setTimeout(() => navigate(href, options), 180);
}

function isAppPath(pathname) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return (
    clean === "/" ||
    clean === "/work" ||
    clean.startsWith("/work/") ||
    clean === "/blog" ||
    clean.startsWith("/blog/posts/") ||
    clean === "/personal-wiki" ||
    clean.startsWith("/personal-wiki/pages/") ||
    clean === "/papers" ||
    clean.startsWith("/papers/pages/") ||
    clean === "/awards" ||
    clean === "/certifications"
  );
}

function applyCollectionFilter(scope) {
  const tools = scope.querySelector("[data-list-tools]");
  if (!tools) return;

  const search = tools.querySelector("[data-search]")?.value.trim().toLowerCase() ?? "";
  const active = tools.querySelector(".filter-pill.is-active")?.dataset.filter ?? "all";
  const rows = [...scope.querySelectorAll("[data-entry-shell][data-search-text]")];
  let visible = 0;

  for (const row of rows) {
    const matchesSearch = !search || row.dataset.searchText.includes(search);
    const matchesFilter = active === "all" || row.dataset.filterValue === active;
    const show = matchesSearch && matchesFilter;
    row.hidden = !show;
    if (show) visible += 1;
  }

  const empty = scope.querySelector("[data-empty]");
  if (empty) empty.hidden = visible !== 0;
}

function ensureMathJax() {
  window.MathJax = window.MathJax ?? {
    tex: { inlineMath: [["\\(", "\\)"]], displayMath: [["\\[", "\\]"]] },
  };
  if (document.querySelector("script[data-mathjax]")) {
    window.MathJax.typesetPromise?.();
    return;
  }
  const script = document.createElement("script");
  script.dataset.mathjax = "true";
  script.async = true;
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js";
  document.head.appendChild(script);
}

function bindSignatureClock() {
  window.clearInterval(state.signatureClockTimer);
  state.signatureClockTimer = null;

  const clock = root.querySelector("[data-singapore-clock]");
  if (!clock) return;

  const updateClock = () => {
    clock.textContent = formatSingaporeClock();
  };
  updateClock();
  state.signatureClockTimer = window.setInterval(updateClock, 1000);
}

document.addEventListener("click", (event) => {
  spawnClickSound(event);

  const back = event.target.closest("[data-back]");
  if (back) {
    event.preventDefault();
    const route = routeFor();
    if (route.view === "detail") {
      navigate(state.lastListRoute || collectionConfig[route.collection].listPath);
      return;
    }
    navigateWithExit("/");
    return;
  }

  const expandLink = event.target.closest("[data-expand-section]");
  if (expandLink) {
    event.preventDefault();
    openCollectionFromMore(expandLink.dataset.expandSection);
    return;
  }

  const filter = event.target.closest("[data-filter]");
  if (filter) {
    event.preventDefault();
    const tools = filter.closest("[data-list-tools]");
    tools?.querySelectorAll("[data-filter]").forEach((button) => button.classList.toggle("is-active", button === filter));
    applyCollectionFilter(document);
    queueMarqueeRefresh();
    return;
  }

  const link = event.target.closest("a[href]");
  if (!link) return;
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;
  const url = new URL(href, location.origin);
  if (url.origin !== location.origin || !isAppPath(url.pathname)) return;
  event.preventDefault();
  navigate(url.pathname + url.search + url.hash);
});

document.addEventListener("input", (event) => {
  if (!event.target.matches("[data-search]")) return;
  applyCollectionFilter(document);
  queueMarqueeRefresh();
});

window.addEventListener("resize", () => {
  window.clearTimeout(state.marqueeResizeTimer);
  state.marqueeResizeTimer = window.setTimeout(() => queueMarqueeRefresh(), 120);
});

document.addEventListener("focusin", (event) => {
  const row = event.target.closest?.(".info-row");
  if (!row || !root.contains(row)) return;
  focusInfoRow(row);
});

document.addEventListener("focusout", (event) => {
  const rows = event.target.closest?.(".info-rows");
  if (!rows || !root.contains(rows)) return;
  window.setTimeout(() => {
    if (!rows.contains(document.activeElement)) clearInfoRowFocus(rows);
  }, 0);
});

window.addEventListener("popstate", () => {
  render(location.pathname, { keepScroll: false });
});

render();
