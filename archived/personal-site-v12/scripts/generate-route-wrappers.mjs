import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distRoot = path.join(root, "dist");
const routesPath = path.join(root, "public", "content", "routes.json");
const sitePath = path.join(root, "public", "content", "site.json");
const cnamePath = path.join(root, "public", "CNAME");
const siteName = "Gabriel Ong";
const defaultOrigin = "https://gabrielongzm.com";
const seoStart = "generated:seo:start";
const seoEnd = "generated:seo:end";

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

const collectionConfig = {
  work: {
    title: "Work",
    plural: "projects",
    description: (count) => `Selected software, product, and legal technology projects by ${siteName}.`,
  },
  blog: {
    title: "Writing",
    plural: "posts",
    description: (count) => `${count} notes, reviews, essays, and project writeups by ${siteName}.`,
  },
  wiki: {
    title: "Personal Wiki",
    plural: "notes",
    description: (count) => `${count} personal wiki notes by ${siteName} on software, systems, tools, and learning.`,
  },
  papers: {
    title: "Papers",
    plural: "papers",
    description: (count) => `Research papers and technical publications by ${siteName}.`,
  },
  awards: {
    title: "Awards",
    plural: "awards",
    description: (count) => `Awards, scholarships, and competition results earned by ${siteName}.`,
  },
  certifications: {
    title: "Certifications",
    plural: "certifications",
    description: (count) => `Professional certifications and credentials earned by ${siteName}.`,
  },
};

function outputPathForRoute(route) {
  const clean = route.replace(/^\/+/, "").replace(/\/+$/, "");
  if (!clean) return null;
  if (clean.endsWith(".html")) return path.join(distRoot, clean);
  return path.join(distRoot, clean, "index.html");
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function siteOrigin() {
  try {
    const cname = (await fs.readFile(cnamePath, "utf8")).trim();
    if (cname) return `https://${cname}`;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  return defaultOrigin;
}

function asText(value, fallback = "") {
  if (value === undefined || value === null) return fallback;
  return String(value);
}

function escapeHtml(value) {
  return asText(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeXml(value) {
  return escapeHtml(value).replace(/'/g, "&apos;");
}

function decodeEntities(value) {
  return asText(value)
    .replace(/&#x([0-9a-f]+);/gi, (_match, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_match, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(html) {
  return decodeEntities(
    asText(html)
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  );
}

function compactText(value) {
  return asText(value)
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\s+'(s|t|re|ve|ll|d|m)\b/gi, "'$1")
    .replace(/"\s*([^"]*?)\s*"/g, (_match, inner) => `"${inner.trim()}"`)
    .trim();
}

function truncate(value, maxLength = 158) {
  const text = compactText(value);
  if (text.length <= maxLength) return text;
  const softLimit = Math.floor(maxLength * 0.72);
  const slice = text.slice(0, maxLength - 3);
  const breakpoint = slice.lastIndexOf(" ");
  return `${slice.slice(0, breakpoint > softLimit ? breakpoint : slice.length).trim()}...`;
}

function metaValue(detail, label) {
  return detail?.meta?.find((item) => item.label === label)?.value ?? "";
}

function metaHref(detail, label) {
  return detail?.meta?.find((item) => item.label === label)?.href ?? "";
}

function routeFor(pathname) {
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

function canonicalPath(route) {
  if (route === "/") return "/";
  if (route.endsWith(".html")) return route;
  return `${route.replace(/\/+$/, "")}/`;
}

function absoluteUrl(origin, value) {
  const text = asText(value).trim();
  if (!text || /^(?:mailto:|data:)/i.test(text)) return "";
  return new URL(text, origin).href;
}

function pageTitle(title) {
  const clean = compactText(title);
  return clean === siteName ? siteName : `${clean} | ${siteName}`;
}

function findItem(site, collection, slug) {
  return (site.collections[collection] ?? []).find((item) => item.slug === slug);
}

async function loadDetail(item) {
  if (!item?.detail) return null;
  return readJson(path.join(root, "public", item.detail.replace(/^\/+/, "")));
}

function parseDate(value) {
  let text = compactText(value);
  if (!text) return null;
  if (text.includes(" to ")) text = text.split(" to ", 1)[0].trim();
  if (text.includes(" - ")) text = text.split(" - ", 1)[0].trim();

  let match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));

  match = text.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (match) {
    const month = monthIndex.get(match[2].toLowerCase());
    if (month !== undefined) return new Date(Date.UTC(Number(match[3]), month, Number(match[1])));
  }

  match = text.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (match) {
    const month = monthIndex.get(match[1].toLowerCase());
    if (month !== undefined) return new Date(Date.UTC(Number(match[3]), month, Number(match[2])));
  }

  match = text.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (match) {
    const month = monthIndex.get(match[1].toLowerCase());
    if (month !== undefined) return new Date(Date.UTC(Number(match[2]), month, 1));
  }

  match = text.match(/^(\d{4})$/);
  if (match) return new Date(Date.UTC(Number(match[1]), 0, 1));

  return null;
}

function isoDate(value, { allowFuture = true } = {}) {
  const date = parseDate(value);
  if (!date || Number.isNaN(date.valueOf())) return "";
  if (!allowFuture) {
    const tomorrow = Date.now() + 86_400_000;
    if (date.valueOf() > tomorrow) return "";
  }
  return date.toISOString().slice(0, 10);
}

function latestCollectionDate(site, collection) {
  const timestamps = (site.collections[collection] ?? [])
    .map((item) => parseDate(item.date))
    .filter((date) => date && date.valueOf() <= Date.now() + 86_400_000)
    .map((date) => date.valueOf());
  if (!timestamps.length) return "";
  return new Date(Math.max(...timestamps)).toISOString().slice(0, 10);
}

function personJsonLd(site, origin) {
  const profile = site.home.profile;
  const accounts = (site.home.links.accounts ?? [])
    .map((link) => absoluteUrl(origin, link.href))
    .filter(Boolean);
  const email = site.home.links.mail?.[0]?.href?.replace(/^mailto:/, "");

  return {
    "@type": "Person",
    "@id": `${origin}/#person`,
    name: profile.name,
    alternateName: profile.alternateName,
    url: `${origin}/`,
    email,
    jobTitle: profile.role,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    sameAs: accounts,
  };
}

function jsonWithoutEmpty(value) {
  if (Array.isArray(value)) {
    const items = value.map(jsonWithoutEmpty).filter((item) => item !== undefined);
    return items.length ? items : undefined;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value)
      .map(([key, item]) => [key, jsonWithoutEmpty(item)])
      .filter(([, item]) => item !== undefined);
    return entries.length ? Object.fromEntries(entries) : undefined;
  }
  if (value === "" || value === undefined || value === null) return undefined;
  return value;
}

function detailDescription(detail, item) {
  return truncate(stripHtml(detail?.html) || item?.summary || `${detail?.title ?? item?.title} by ${siteName}.`);
}

function schemaForDetail(site, origin, route, item, detail, canonical, description) {
  const image = absoluteUrl(origin, detail.image || item.image);
  const datePublished = isoDate(detail.date || item.date);
  const person = {
    "@type": "Person",
    "@id": `${origin}/#person`,
    name: siteName,
    url: `${origin}/`,
  };
  const base = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: detail.title,
    name: detail.title,
    url: canonical,
    mainEntityOfPage: canonical,
    description,
    author: person,
    publisher: person,
    datePublished,
    image,
  };

  if (detail.kind === "blog") {
    return { ...base, "@type": "BlogPosting", articleSection: detail.category || detail.type };
  }

  if (detail.kind === "wiki") {
    return { ...base, articleSection: detail.category || "Personal wiki" };
  }

  if (detail.kind === "paper") {
    const authors = compactText(metaValue(detail, "Authors"))
      .split(/\s*,\s*|\s+and\s+/)
      .map((name) => name.trim())
      .filter(Boolean)
      .map((name) => ({ "@type": "Person", name }));
    return {
      ...base,
      "@type": "ScholarlyArticle",
      author: authors.length ? authors : person,
      publisher: person,
      identifier: metaValue(detail, "DOI"),
      sameAs: [...new Set([metaHref(detail, "DOI"), metaHref(detail, "Zenodo"), item.href, item.github].filter(Boolean))],
    };
  }

  if (detail.kind === "work") {
    return {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: detail.title,
      headline: detail.title,
      url: canonical,
      description,
      creator: person,
      dateCreated: datePublished,
      image,
    };
  }

  return base;
}

async function metadataForRoute(site, origin, route) {
  const parsedRoute = routeFor(route);
  const canonical = absoluteUrl(origin, canonicalPath(route));
  const homeDescription = truncate(
    `${site.home.profile.name} is a ${site.home.profile.role} based in ${site.home.profile.location}. ${site.home.profile.intro}`,
  );

  if (parsedRoute.view === "home") {
    const person = personJsonLd(site, origin);
    return {
      route,
      canonical,
      title: siteName,
      description: homeDescription,
      ogType: "profile",
      image: "",
      lastmod: isoDate(site.home.updated, { allowFuture: false }),
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: siteName,
        url: canonical,
        description: homeDescription,
        dateModified: isoDate(site.home.updated, { allowFuture: false }),
        mainEntity: person,
      },
    };
  }

  if (parsedRoute.view === "list") {
    const config = collectionConfig[parsedRoute.collection];
    const count = site.counts[parsedRoute.collection] ?? 0;
    const description = truncate(config.description(count));
    return {
      route,
      canonical,
      title: pageTitle(config.title),
      description,
      ogType: "website",
      image: "",
      lastmod: latestCollectionDate(site, parsedRoute.collection) || isoDate(site.home.updated, { allowFuture: false }),
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: config.title,
        url: canonical,
        description,
        isPartOf: {
          "@type": "WebSite",
          name: siteName,
          url: `${origin}/`,
        },
        author: {
          "@type": "Person",
          "@id": `${origin}/#person`,
          name: siteName,
          url: `${origin}/`,
        },
      },
    };
  }

  if (parsedRoute.view === "detail") {
    const item = findItem(site, parsedRoute.collection, parsedRoute.slug);
    const detail = await loadDetail(item);
    if (item && detail) {
      const description = detailDescription(detail, item);
      const image = absoluteUrl(origin, detail.image || item.image);
      return {
        route,
        canonical,
        title: pageTitle(detail.title),
        description,
        ogType: detail.kind === "work" ? "website" : "article",
        image,
        lastmod: isoDate(detail.date || item.date, { allowFuture: false }),
        jsonLd: schemaForDetail(site, origin, parsedRoute, item, detail, canonical, description),
      };
    }
  }

  return {
    route,
    canonical,
    title: pageTitle("Not found"),
    description: homeDescription,
    ogType: "website",
    image: "",
    lastmod: "",
    jsonLd: null,
  };
}

function tag(name, attrs) {
  if (Object.prototype.hasOwnProperty.call(attrs, "content") && !attrs.content) return "";
  if (Object.prototype.hasOwnProperty.call(attrs, "href") && !attrs.href) return "";

  const renderedAttrs = Object.entries(attrs)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
    .join(" ");
  return renderedAttrs ? `    <${name} ${renderedAttrs} />` : "";
}

function seoBlock(meta) {
  const image = meta.image || "";
  const card = image ? "summary_large_image" : "summary";
  const jsonLd = jsonWithoutEmpty(meta.jsonLd);
  const lines = [
    `    <!-- ${seoStart} -->`,
    tag("meta", { name: "description", content: meta.description }),
    tag("meta", { name: "author", content: siteName }),
    tag("meta", { name: "robots", content: "index,follow,max-image-preview:large" }),
    tag("link", { rel: "canonical", href: meta.canonical }),
    tag("meta", { property: "og:site_name", content: siteName }),
    tag("meta", { property: "og:type", content: meta.ogType }),
    tag("meta", { property: "og:title", content: meta.title }),
    tag("meta", { property: "og:description", content: meta.description }),
    tag("meta", { property: "og:url", content: meta.canonical }),
    tag("meta", { property: "og:image", content: image }),
    tag("meta", { name: "twitter:card", content: card }),
    tag("meta", { name: "twitter:title", content: meta.title }),
    tag("meta", { name: "twitter:description", content: meta.description }),
    tag("meta", { name: "twitter:image", content: image }),
    jsonLd
      ? `    <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`
      : "",
    `    <!-- ${seoEnd} -->`,
  ].filter(Boolean);

  return lines.join("\n");
}

function withoutGeneratedSeo(html) {
  const markerPattern = new RegExp(`\\n?\\s*<!-- ${seoStart} -->[\\s\\S]*?<!-- ${seoEnd} -->\\n?`, "g");
  return html.replace(markerPattern, "\n");
}

function htmlWithSeo(html, meta) {
  const cleanHtml = withoutGeneratedSeo(html);
  const titleTag = `    <title>${escapeHtml(meta.title)}</title>`;
  const titledHtml = /<title>[\s\S]*?<\/title>/.test(cleanHtml)
    ? cleanHtml.replace(/<title>[\s\S]*?<\/title>/, titleTag.trim())
    : cleanHtml.replace(/<head>/, `<head>\n${titleTag}`);

  return titledHtml.replace(/\n\s*<\/head>/, `\n${seoBlock(meta)}\n  </head>`);
}

function sitemapXml(metadata) {
  const seen = new Set();
  const urls = metadata
    .filter((meta) => {
      if (seen.has(meta.canonical)) return false;
      seen.add(meta.canonical);
      return true;
    })
    .map((meta) => {
      const lastmod = meta.lastmod ? `\n    <lastmod>${escapeXml(meta.lastmod)}</lastmod>` : "";
      return `  <url>\n    <loc>${escapeXml(meta.canonical)}</loc>${lastmod}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
  const [indexHtml, routesRaw, site, origin] = await Promise.all([
    fs.readFile(path.join(distRoot, "index.html"), "utf8"),
    fs.readFile(routesPath, "utf8"),
    readJson(sitePath),
    siteOrigin(),
  ]);
  const routes = JSON.parse(routesRaw);
  const metadata = await Promise.all(routes.map((route) => metadataForRoute(site, origin, route)));
  const metadataByRoute = new Map(metadata.map((meta) => [meta.route, meta]));
  let written = 0;

  await fs.writeFile(path.join(distRoot, "index.html"), htmlWithSeo(indexHtml, metadataByRoute.get("/")), "utf8");

  for (const route of routes) {
    const target = outputPathForRoute(route);
    if (!target) continue;
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, htmlWithSeo(indexHtml, metadataByRoute.get(route)), "utf8");
    written += 1;
  }

  await fs.writeFile(path.join(distRoot, "sitemap.xml"), sitemapXml(metadata), "utf8");

  console.log(`generated ${written} static route wrappers and ${metadata.length} sitemap entries`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
