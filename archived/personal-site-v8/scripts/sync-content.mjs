import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { marked } from "marked";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicRoot = path.join(root, "public");
const contentRoot = path.join(publicRoot, "content");
const homePath = path.join(root, "content", "home.json");
const blogSourceDir = path.join(root, "blog", "posts");
const wikiSourceDir = path.join(root, "personal-wiki", "notes");
const papersSourceDir = path.join(root, "papers", "sources");
const assetSourceDir = path.join(root, "asset");
const resumeSourceDir = path.join(root, "resume");
const writingImagesPath = path.join(root, "content", "writing-images.json");

marked.setOptions({
  async: false,
  breaks: false,
  gfm: true,
  mangle: false,
});

const monthIndex = new Map([
  ["jan", 0],
  ["january", 0],
  ["feb", 1],
  ["february", 1],
  ["mar", 2],
  ["march", 2],
  ["apr", 3],
  ["april", 3],
  ["may", 4],
  ["jun", 5],
  ["june", 5],
  ["jul", 6],
  ["july", 6],
  ["aug", 7],
  ["august", 7],
  ["sep", 8],
  ["sept", 8],
  ["september", 8],
  ["oct", 9],
  ["october", 9],
  ["nov", 10],
  ["november", 10],
  ["dec", 11],
  ["december", 11],
]);

const workPalettes = [
  ["#255f85", "#9cc6df", "#f8f2e9"],
  ["#6f3b2f", "#e2a477", "#fff4e4"],
  ["#365f46", "#9cc8a5", "#f6f1e9"],
  ["#4d426f", "#b6abd8", "#fbf5eb"],
  ["#6a5533", "#dfc071", "#fff7e8"],
  ["#364b63", "#9fb9ce", "#f7f2ec"],
];

const certificationImageAliases = new Map([
  ["google-ai-specialization", "google-ai"],
  ["google-ai-essentials-specialization", "google-ai-essentials"],
  ["google-cybersecurity-specialization", "cybersecurity"],
  ["google-advanced-data-analytics-specialization", "advanced-data-analytics"],
  ["google-data-analytics-specialization", "data-analytics"],
  ["google-digital-marketing-and-e-commerce-specialization", "digital-marketing-and-ecommerce"],
  ["google-project-management-specialization", "project-management"],
  ["google-ux-design-specialization", "ux-design"],
  ["arm-cortex-m-architecture-and-software-development-specialization", "arm-cortexm-architecture-and-software-development"],
]);

const awardImageAliases = new Map([
  ["champion-of-smu-lit-hackathon-2025-minlaw-track-2", "smu-lit-hackathon-2025"],
  ["second-place-for-vibe-building-hackathon-2025", "vibe-building-hackathon-2025"],
  ["geekshacking-choice-award-for-hackomania-2025", "hackomania-2025"],
  ["champion-of-youthxhack-2024-digital-defence", "youth-x-hack-2024"],
  ["global-impact-scholarship", "global-impact-scholarship"],
]);

function asText(value, fallback = "") {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10);
  }
  if (value === undefined || value === null) return fallback;
  return String(value);
}

function slugify(value) {
  return asText(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseDateValue(value) {
  let text = asText(value).trim();
  if (!text) return 0;
  if (text.includes(" to ")) text = text.split(" to ", 1)[0].trim();

  const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) return Date.UTC(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));

  const named = text.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (named) {
    const month = monthIndex.get(named[2].toLowerCase());
    if (month !== undefined) {
      return Date.UTC(Number(named[3]), month, Number(named[1]));
    }
  }

  const namedMonthOnly = text.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (namedMonthOnly) {
    const month = monthIndex.get(namedMonthOnly[1].toLowerCase());
    if (month !== undefined) return Date.UTC(Number(namedMonthOnly[2]), month, 1);
  }

  const year = text.match(/^(\d{4})$/);
  if (year) return Date.UTC(Number(year[1]), 0, 1);

  return 0;
}

function sortByDateDesc(items) {
  return items.sort((a, b) => {
    const byDate = parseDateValue(b.date) - parseDateValue(a.date);
    if (byDate !== 0) return byDate;
    return a.title.localeCompare(b.title);
  });
}

async function ensureCleanDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
}

async function copyDir(source, destination) {
  await fs.rm(destination, { recursive: true, force: true });
  await fs.cp(source, destination, { recursive: true });
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function readOptionalJson(filePath, fallback = {}) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}

async function listMarkdown(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md") && !entry.name.startsWith("."))
    .map((entry) => path.join(dir, entry.name))
    .sort((a, b) => a.localeCompare(b));
}

async function listImageAssets(dir, publicPrefix) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return new Map(
      entries
        .filter((entry) => entry.isFile() && /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(entry.name))
        .map((entry) => [path.basename(entry.name, path.extname(entry.name)).toLowerCase(), `${publicPrefix}/${entry.name}`]),
    );
  } catch (error) {
    if (error.code === "ENOENT") return new Map();
    throw error;
  }
}

function firstToken(value) {
  return asText(value).split(/[-_\s:]+/).filter(Boolean)[0]?.toLowerCase() ?? "";
}

function resolvePaperCover(explicitImage, coverMap, slug, title) {
  const explicit = normalizeSiteImagePath(explicitImage);
  if (explicit) return explicit;

  const titleSlug = slugify(title);
  const candidates = [slug, firstToken(slug), titleSlug, firstToken(titleSlug)];
  for (const candidate of candidates) {
    if (candidate && coverMap.has(candidate)) return coverMap.get(candidate);
  }
  return "";
}

function normalizeSiteImagePath(value) {
  const text = asText(value).trim();
  if (!text) return "";
  if (/^(?:https?:|data:|\/)/i.test(text)) return text;
  if (text.startsWith("public/")) return `/${text.slice("public/".length)}`;
  return `/${text.replace(/^\.?\//, "")}`;
}

function resolveWorkImage(imageMap, slug, title) {
  const titleSlug = slugify(title);
  const candidates = [slug, firstToken(slug), titleSlug, firstToken(titleSlug)];
  for (const candidate of candidates) {
    if (candidate && imageMap.has(candidate)) return imageMap.get(candidate);
  }
  return "";
}

function resolveCertificationImage(imageMap, title) {
  const titleSlug = slugify(title);
  const candidates = [
    titleSlug,
    certificationImageAliases.get(titleSlug),
    titleSlug.replace(/^google-/, "").replace(/-specialization$/, ""),
    titleSlug.replace(/-specialization$/, ""),
  ];

  for (const candidate of candidates) {
    if (candidate && imageMap.has(candidate)) return imageMap.get(candidate);
  }
  return "";
}

function resolveAwardImage(imageMap, title) {
  const titleSlug = slugify(title);
  const candidates = [
    titleSlug,
    awardImageAliases.get(titleSlug),
    titleSlug.replace(/^champion-of-/, "").replace(/^second-place-for-/, ""),
  ];

  for (const candidate of candidates) {
    if (candidate && imageMap.has(candidate)) return imageMap.get(candidate);
  }
  return "";
}

function splitMarkdownTitle(markdown) {
  const lines = markdown.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].trim().match(/^#\s+`?([^`\n]+)`?\s*$/);
    if (match) {
      return {
        title: match[1].trim(),
        body: lines.slice(index + 1).join("\n").replace(/^\n+/, ""),
      };
    }
  }
  return { title: "Untitled", body: markdown };
}

function normalizeInternalLinks(html) {
  return html
    .replace(/href="https:\/\/(?:www\.)?gabrielongzm\.com\/?([^"]*)"/g, (_match, suffix) => {
      const clean = suffix ? `/${suffix.replace(/^\/+/, "")}` : "/";
      return `href="${clean}"`;
    })
    .replace(/href="https:\/\/gongahkia\.github\.io\/?([^"]*)"/g, (_match, suffix) => {
      const clean = suffix ? `/${suffix.replace(/^\/+/, "")}` : "/";
      return `href="${clean}"`;
    })
    .replace(/href="\/blog\/posts\/([^"#]+)\.html"/g, 'href="/blog/posts/$1.html"')
    .replace(/href="\/personal-wiki\/pages\/([^"#]+)\.html"/g, 'href="/personal-wiki/pages/$1.html"');
}

function renderMarkdown(markdown) {
  return normalizeInternalLinks(marked.parse(markdown));
}

function noteTitleMap(files) {
  return new Map(
    files.map((file) => {
      const stem = path.basename(file, ".md").toLowerCase();
      return [stem, `${stem}.html`];
    }),
  );
}

async function buildWiki() {
  const detailDir = path.join(contentRoot, "details", "wiki");
  await ensureCleanDir(detailDir);

  const mdFiles = await listMarkdown(wikiSourceDir);
  const byTitle = new Map();
  for (const file of mdFiles) {
    const raw = await fs.readFile(file, "utf8");
    const parsed = matter(raw);
    const { title } = splitMarkdownTitle(parsed.content);
    byTitle.set(title.toLowerCase(), `${path.basename(file, ".md").toLowerCase()}.html`);
  }

  const notes = [];
  for (const file of mdFiles) {
    const raw = await fs.readFile(file, "utf8");
    const parsed = matter(raw);
    const { title, body } = splitMarkdownTitle(parsed.content);
    const slug = path.basename(file, ".md").toLowerCase();
    const filename = `${slug}.html`;
    const processedBody = body.replace(/\[\[([^\]]+)\]\]/g, (_match, name) => {
      const target = byTitle.get(name.trim().toLowerCase());
      return target ? `[${name}](/personal-wiki/pages/${target})` : name;
    });
    const html = renderMarkdown(processedBody);
    const category = ["general", "tech"].includes(asText(parsed.data.category, "general").toLowerCase())
      ? asText(parsed.data.category, "general").toLowerCase()
      : "general";
    const detail = {
      kind: "wiki",
      title,
      slug,
      date: "2 Feb 2026",
      category,
      html,
      source: `personal-wiki/notes/${path.basename(file)}`,
      meta: [
        { label: "Category", value: category === "tech" ? "Tech" : "General" },
        { label: "Source", value: `${path.basename(file)}` },
      ],
    };

    await fs.writeFile(path.join(detailDir, `${slug}.json`), JSON.stringify(detail), "utf8");
    notes.push({
      kind: "wiki",
      title,
      slug,
      filename,
      date: detail.date,
      category,
      path: `/personal-wiki/pages/${filename}`,
      detail: `/content/details/wiki/${slug}.json`,
      source: detail.source,
      lines: raw.split(/\r?\n/).length,
    });
  }

  return notes.sort((a, b) => a.title.localeCompare(b.title));
}

async function buildBlog() {
  const detailDir = path.join(contentRoot, "details", "blog");
  await ensureCleanDir(detailDir);
  const imageManifest = await readOptionalJson(writingImagesPath);
  const imageMap = imageManifest.items && typeof imageManifest.items === "object" ? imageManifest.items : imageManifest;

  const categoryMap = new Map([
    ["blog", "general"],
    ["book", "book"],
    ["film", "film"],
    ["tech-writeup", "project"],
  ]);
  const posts = [];

  for (const file of await listMarkdown(blogSourceDir)) {
    const raw = await fs.readFile(file, "utf8");
    const parsed = matter(raw);
    const type = asText(parsed.data.type, "blog").replace(/^"|"$/g, "");
    const category = categoryMap.get(type) ?? "general";
    const slug = path.basename(file, ".md");
    const filename = `${slug}.html`;
    const title = asText(parsed.data.title, slug);
    const date = asText(parsed.data.date);
    const image = normalizeSiteImagePath(parsed.data.image || parsed.data.cover) || asText(imageMap[slug]).trim();
    const meta = [];
    if (type === "book") {
      meta.push(
        { label: "Author", value: asText(parsed.data.author) },
        { label: "ISBN", value: asText(parsed.data.isbn) },
        { label: "Category", value: asText(parsed.data.category) },
        { label: "Rating", value: `${asText(parsed.data.rating)}/5` },
      );
    } else if (type === "film") {
      meta.push(
        { label: "Director", value: asText(parsed.data.director) },
        { label: "Release Year", value: asText(parsed.data.year) },
        { label: "Rating", value: `${asText(parsed.data.rating)}/5` },
      );
    } else if (type === "tech-writeup") {
      meta.push(
        { label: "Timeline", value: asText(parsed.data.date_range) },
        { label: "Tech Stack", value: asText(parsed.data.tech_stack) },
        { label: "Status", value: asText(parsed.data.status) },
      );
      if (parsed.data.github) meta.push({ label: "GitHub", value: asText(parsed.data.github), href: asText(parsed.data.github) });
      if (parsed.data.demo) meta.push({ label: "Demo", value: asText(parsed.data.demo), href: asText(parsed.data.demo) });
    }
    meta.push({ label: "Date", value: date });

    const detail = {
      kind: "blog",
      type,
      category,
      title,
      slug,
      date,
      html: renderMarkdown(parsed.content),
      image,
      source: `blog/posts/${path.basename(file)}`,
      meta: meta.filter((item) => item.value),
    };

    await fs.writeFile(path.join(detailDir, `${slug}.json`), JSON.stringify(detail), "utf8");
    posts.push({
      kind: "blog",
      title,
      slug,
      filename,
      date,
      category,
      path: `/blog/posts/${filename}`,
      detail: `/content/details/blog/${slug}.json`,
      image,
      author: asText(parsed.data.author),
      director: asText(parsed.data.director),
      year: asText(parsed.data.year),
      rating: asText(parsed.data.rating),
      status: asText(parsed.data.status),
      dateRange: asText(parsed.data.date_range),
      source: detail.source,
    });
  }

  return sortByDateDesc(posts);
}

async function buildPapers() {
  const detailDir = path.join(contentRoot, "details", "papers");
  await ensureCleanDir(detailDir);

  const coverMap = await listImageAssets(path.join(publicRoot, "assets", "papers"), "/assets/papers");
  const papers = [];
  for (const file of await listMarkdown(papersSourceDir)) {
    const raw = await fs.readFile(file, "utf8");
    const parsed = matter(raw);
    const slug = path.basename(file, ".md").toLowerCase();
    const filename = `${slug}.html`;
    const title = asText(parsed.data.title, slug);
    const date = asText(parsed.data.date);
    const source = asText(parsed.data.source, "arxiv").toLowerCase();
    const image = resolvePaperCover(parsed.data.cover || parsed.data.image, coverMap, slug, title);
    const meta = [
      { label: "Date", value: date },
      { label: "Authors", value: asText(parsed.data.authors) },
    ];

    if (source === "zenodo") {
      meta.push(
        { label: "DOI", value: asText(parsed.data.doi), href: parsed.data.doi ? `https://doi.org/${parsed.data.doi}` : "" },
        { label: "Zenodo", value: asText(parsed.data.zenodo), href: asText(parsed.data.zenodo) },
        { label: "Resource type", value: asText(parsed.data.resource_type) },
        { label: "Version", value: asText(parsed.data.version) },
        { label: "License", value: asText(parsed.data.license) },
      );
    } else {
      meta.push({ label: "arXiv", value: asText(parsed.data.arxiv), href: asText(parsed.data.arxiv) });
    }
    if (parsed.data.github) meta.push({ label: "GitHub Repository", value: asText(parsed.data.github), href: asText(parsed.data.github) });

    const detail = {
      kind: "paper",
      title,
      slug,
      date,
      source,
      image,
      html: renderMarkdown(parsed.content),
      sourcePath: `papers/sources/${path.basename(file)}`,
      meta: meta.filter((item) => item.value),
    };

    await fs.writeFile(path.join(detailDir, `${slug}.json`), JSON.stringify(detail), "utf8");
    papers.push({
      kind: "paper",
      title,
      slug,
      filename,
      date,
      source,
      image,
      authors: asText(parsed.data.authors),
      path: `/papers/pages/${filename}`,
      detail: `/content/details/papers/${slug}.json`,
      href: source === "zenodo" ? asText(parsed.data.zenodo) : asText(parsed.data.arxiv),
      github: asText(parsed.data.github),
      sourcePath: detail.sourcePath,
    });
  }

  return sortByDateDesc(papers);
}

async function writeWorkCovers(works) {
  const coverDir = path.join(contentRoot, "work-covers");
  await ensureCleanDir(coverDir);
  await Promise.all(
    works.map(async (work, index) => {
      const [ink, accent, paper] = workPalettes[index % workPalettes.length];
      const label = work.title.length > 14 ? `${work.title.slice(0, 13)}.` : work.title;
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" role="img" aria-label="${escapeXml(work.title)}">
  <rect width="960" height="540" fill="${paper}"/>
  <rect x="64" y="64" width="832" height="412" rx="24" fill="none" stroke="${ink}" stroke-width="10" opacity=".18"/>
  <circle cx="780" cy="138" r="74" fill="${accent}" opacity=".72"/>
  <path d="M112 394 C232 286, 330 456, 456 336 S696 244, 848 332" fill="none" stroke="${accent}" stroke-width="28" stroke-linecap="round" opacity=".78"/>
  <text x="112" y="220" fill="${ink}" font-family="Georgia, serif" font-size="86" font-style="italic">${escapeXml(label)}</text>
  <text x="116" y="286" fill="${ink}" opacity=".72" font-family="Inter, Arial, sans-serif" font-size="28">${escapeXml(work.summary)}</text>
</svg>`;
      await fs.writeFile(path.join(coverDir, `${work.slug}.svg`), svg, "utf8");
    }),
  );
}

function escapeXml(value) {
  return asText(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function buildWork(home) {
  const detailDir = path.join(contentRoot, "details", "work");
  await ensureCleanDir(detailDir);
  const projectImageMap = await listImageAssets(path.join(publicRoot, "assets", "projects"), "/assets/projects");

  const works = home.works.map((work) => ({
    kind: "work",
    ...work,
    slug: work.slug || slugify(work.title),
    body: Array.isArray(work.detail) ? work.detail : [],
    path: `/work/${work.slug || slugify(work.title)}`,
    detail: `/content/details/work/${work.slug || slugify(work.title)}.json`,
    image:
      resolveWorkImage(projectImageMap, work.slug || slugify(work.title), work.title) ||
      `/content/work-covers/${work.slug || slugify(work.title)}.svg`,
  }));
  await writeWorkCovers(works);

  await Promise.all(
    works.map(async (work) => {
      const html = renderMarkdown(work.body.map((paragraph) => paragraph).join("\n\n"));
      const detail = {
        kind: "work",
        title: work.title,
        slug: work.slug,
        date: work.date,
        summary: work.summary,
        html,
        image: work.image,
        links: [],
        meta: [],
      };
      await fs.writeFile(path.join(detailDir, `${work.slug}.json`), JSON.stringify(detail), "utf8");
    }),
  );

  return works;
}

function buildInfoCollection(entries, kind, imageMap = new Map()) {
  return entries.map((entry, index) => {
    const slug = slugify(`${entry.date}-${entry.title}`) || `${kind}-${index + 1}`;
    const image =
      kind === "certifications"
        ? resolveCertificationImage(imageMap, entry.title)
        : kind === "awards"
          ? resolveAwardImage(imageMap, entry.title)
          : "";
    return {
      kind,
      title: entry.title,
      slug,
      date: entry.date,
      href: entry.href,
      path: entry.href,
      meta: entry.meta,
      note: entry.note,
      image,
      category: "all",
    };
  });
}

function buildRoutes(collections) {
  return [
    "/",
    "/work/",
    "/blog/",
    "/personal-wiki/",
    "/papers/",
    "/awards/",
    "/certifications/",
    ...collections.work.map((item) => item.path),
    ...collections.blog.map((item) => item.path),
    ...collections.wiki.map((item) => item.path),
    ...collections.papers.map((item) => item.path),
  ];
}

async function main() {
  const home = await readJson(homePath);
  const contributions = await readJson(path.join(assetSourceDir, "contributions.json"));
  let contributionTotal = 0;
  let contributionMax = 0;
  for (const week of contributions.weeks ?? []) {
    for (const day of week.days ?? []) {
      contributionTotal += Number(day.count ?? 0);
      contributionMax = Math.max(contributionMax, Number(day.count ?? 0));
    }
  }

  await ensureCleanDir(contentRoot);
  await copyDir(path.join(root, "assets"), path.join(publicRoot, "assets"));
  await copyDir(assetSourceDir, path.join(publicRoot, "asset"));
  await copyDir(resumeSourceDir, path.join(publicRoot, "resume"));

  const certificationImageMap = await listImageAssets(
    path.join(publicRoot, "assets", "certifications"),
    "/assets/certifications",
  );
  const awardImageMap = await listImageAssets(path.join(publicRoot, "assets", "awards"), "/assets/awards");

  const collections = {
    work: await buildWork(home),
    blog: await buildBlog(),
    wiki: await buildWiki(),
    papers: await buildPapers(),
    awards: buildInfoCollection(home.awards, "awards", awardImageMap),
    certifications: buildInfoCollection(home.certifications, "certifications", certificationImageMap),
  };

  const routes = buildRoutes(collections);
  const manifest = {
    generatedAt: new Date().toISOString(),
    home: {
      updated: home.updated,
      profile: home.profile,
      links: home.links,
      skills: home.skills,
      education: home.education,
      experience: home.experience,
      awards: home.awards,
      certifications: home.certifications,
      contributions: {
        total: contributionTotal,
        max: contributionMax,
        weeks: contributions.weeks ?? [],
      },
    },
    collections,
    counts: {
      work: collections.work.length,
      blog: collections.blog.length,
      wiki: collections.wiki.length,
      papers: collections.papers.length,
      awards: collections.awards.length,
      certifications: collections.certifications.length,
    },
    routes,
  };

  await fs.writeFile(path.join(contentRoot, "site.json"), JSON.stringify(manifest), "utf8");
  await fs.writeFile(path.join(contentRoot, "routes.json"), JSON.stringify(routes, null, 2), "utf8");

  console.log(
    `synced content: ${manifest.counts.work} works, ${manifest.counts.blog} blog posts, ${manifest.counts.wiki} wiki notes, ${manifest.counts.papers} papers`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
