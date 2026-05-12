import { readFileSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const force = process.env.FORCE === "1";

const target = process.argv[2];
const scriptedAnswers = input.isTTY ? null : readFileSync(0, "utf8").split(/\r?\n/);
const rl = input.isTTY ? readline.createInterface({ input, output }) : null;

function today() {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Singapore",
  }).format(new Date()).replace(/,/g, "");
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function yamlString(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function normalizeSitePath(value) {
  const text = String(value).trim();
  if (!text) return "";
  if (/^(?:https?:|data:|\/)/i.test(text)) return text;
  if (text.startsWith("public/")) return `/${text.slice("public/".length)}`;
  return `/${text.replace(/^\.?\//, "")}`;
}

function optionalImageLine(key, value) {
  const image = normalizeSitePath(value);
  return image ? `${key}: ${yamlString(image)}\n` : "";
}

async function readLine(prompt) {
  if (scriptedAnswers) {
    output.write(prompt);
    if (scriptedAnswers.length === 0) throw new Error(`Missing scripted answer for prompt: ${prompt}`);
    return scriptedAnswers.shift();
  }
  return rl.question(prompt);
}

async function ask(label, fallback = "") {
  const suffix = fallback ? ` (default: ${fallback})` : "";
  const answer = (await readLine(`${label}${suffix}: `)).trim();
  return answer || fallback;
}

async function askRequired(label) {
  let answer = "";
  while (!answer) {
    answer = (await readLine(`${label} (required): `)).trim();
    if (!answer) console.log(`${label} is required.`);
  }
  return answer;
}

async function askChoice(label, allowed) {
  const normalized = new Map(allowed.map((choice) => [choice.toLowerCase(), choice]));
  let answer = "";
  while (!normalized.has(answer.toLowerCase())) {
    answer = (await readLine(`${label} (${allowed.join("/")}): `)).trim();
    if (!normalized.has(answer.toLowerCase())) console.log(`Enter one of: ${allowed.join(", ")}.`);
  }
  return normalized.get(answer.toLowerCase());
}

async function askRating() {
  let rating = "";
  while (!/^(?:[0-4](?:\.\d+)?|5(?:\.0+)?)$/.test(rating)) {
    rating = (await readLine("Rating (0-5, can be decimal): ")).trim();
    if (!/^(?:[0-4](?:\.\d+)?|5(?:\.0+)?)$/.test(rating)) console.log("Rating must be a number from 0 to 5.");
  }
  return rating;
}

async function writeNewFile(relativePath, contents) {
  const absolutePath = path.join(root, relativePath);
  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  if (!force) {
    try {
      await fs.access(absolutePath);
      throw new Error(`${relativePath} already exists. Re-run with FORCE=1 to overwrite.`);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  await fs.writeFile(absolutePath, contents, "utf8");
  console.log(`Created ${relativePath}`);
  console.log("Run `make build` or `npm run dev` after editing to refresh generated pages.");
}

async function createBlog() {
  const date = await ask("Date", today());
  const title = await askRequired("Blog post title");
  const slug = slugify(title);
  await writeNewFile(
    `blog/posts/${slug}.md`,
    `---\ntitle: ${yamlString(title)}\ndate: ${date}\ntype: blog\n---\n\nAdd post content here.\n`,
  );
}

async function createBook() {
  const date = await ask("Date", today());
  const title = await askRequired("Book name");
  const author = await askRequired("Author name");
  const isbn = await askRequired("ISBN number");
  const categoryChoice = await askChoice("Category", ["F", "N"]);
  const category = categoryChoice === "F" ? "Fiction" : "Non-Fiction";
  const rating = await askRating();
  const slug = slugify(title);
  await writeNewFile(
    `blog/posts/${slug}.md`,
    `---\ntitle: ${yamlString(title)}\nauthor: ${yamlString(author)}\nisbn: ${yamlString(isbn)}\ncategory: ${category}\nrating: ${rating}\ndate: ${date}\ntype: book\n---\n\nAdd book review content here.\n`,
  );
}

async function createFilm() {
  const date = await ask("Date", today());
  const title = await askRequired("Film title");
  const director = await askRequired("Director name");
  let year = "";
  while (!/^\d{4}$/.test(year)) {
    year = (await readLine("Release year (required): ")).trim();
    if (!/^\d{4}$/.test(year)) console.log("Release year must be a 4-digit number.");
  }
  const rating = await askRating();
  const image = await ask("Image path");
  const slug = slugify(title);
  await writeNewFile(
    `blog/posts/${slug}.md`,
    `---\ntitle: ${yamlString(title)}\ndate: ${date}\ntype: film\ndirector: ${yamlString(director)}\nyear: ${year}\nrating: ${rating}\n${optionalImageLine("image", image)}---\n\nAdd film review content here.\n`,
  );
}

async function createProjectWriteup() {
  const currentDate = today();
  const startDate = await ask("Start date", currentDate);
  const ongoing = await askChoice("Is this ongoing?", ["Y", "N"]);
  const endDefault = ongoing === "Y" ? "Present" : currentDate;
  let endDate = startDate;
  while (endDate === startDate && endDate !== "Present") {
    endDate = await ask("End date", endDefault);
    if (endDate === startDate) console.log("Start and end date cannot be the same.");
  }
  const title = await askRequired("Title");
  const techStack = await ask("Tech stack");
  const status = await ask("Status", "Active");
  const github = await ask("GitHub URL");
  const demo = await ask("Demo URL");
  const slug = slugify(title);
  await writeNewFile(
    `blog/posts/${slug}.md`,
    `---\ntitle: ${yamlString(title)}\ndate: ${currentDate}\ntype: tech-writeup\ntech_stack: ${yamlString(techStack)}\ndate_range: ${yamlString(`${startDate} to ${endDate}`)}\nstatus: ${yamlString(status)}\ngithub: ${yamlString(github)}\ndemo: ${yamlString(demo)}\n---\n\nAdd writeup content here.\n`,
  );
}

async function createPaper() {
  const sourceChoice = await askChoice("Source", ["a", "z"]);
  const source = sourceChoice === "a" ? "arxiv" : "zenodo";
  const date = await ask("Date", today());
  const title = await askRequired("Paper title");
  const authors = await ask("Authors", "Gabriel Ong Zhe Mian");
  const cover = await ask("Cover PNG path");
  const github = await ask("GitHub URL");
  const slug = slugify(title);

  if (source === "arxiv") {
    const arxiv = await askRequired("arXiv URL");
    const arxivId = await ask("arXiv ID");
    const arxivCategory = await ask("arXiv category");
    await writeNewFile(
      `papers/sources/${slug}.md`,
      `---\ntitle: ${yamlString(title)}\ndate: ${date}\ntype: paper\nsource: arxiv\nauthors: ${yamlString(authors)}\n${optionalImageLine("cover", cover)}arxiv: ${yamlString(arxiv)}\narxiv_id: ${yamlString(arxivId)}\narxiv_category: ${yamlString(arxivCategory)}\ngithub: ${yamlString(github)}\n---\n\n## Abstract\n\nAdd abstract here.\n\n## Notes\n\nThoughts and experiences on this paper.\n`,
    );
    return;
  }

  const zenodo = await askRequired("Zenodo URL");
  const doi = await askRequired("DOI");
  const resourceType = await askRequired("Resource type");
  const version = await ask("Version", "v1");
  const license = await ask("License", "CC-BY-4.0");
  await writeNewFile(
    `papers/sources/${slug}.md`,
    `---\ntitle: ${yamlString(title)}\ndate: ${date}\ntype: paper\nsource: zenodo\nauthors: ${yamlString(authors)}\n${optionalImageLine("cover", cover)}zenodo: ${yamlString(zenodo)}\ndoi: ${yamlString(doi)}\nresource_type: ${yamlString(resourceType)}\nversion: ${yamlString(version)}\nlicense: ${yamlString(license)}\ngithub: ${yamlString(github)}\n---\n\n## Abstract\n\nAdd abstract here.\n\n## Notes\n\nThoughts and experiences on this paper.\n`,
  );
}

async function createWiki(category) {
  const title = await askRequired("Subject");
  const language = await ask("Language extension");
  const slug = slugify(title);
  const codeFence = "```";
  const sections = [
    "Comments",
    "Printing",
    "Quickstart",
    "Types",
    "Operators",
    "Control structures",
    "Data structures",
    "Functions",
  ]
    .map((section) => `## ${section}\n\n${codeFence}${language}\n\n${codeFence}`)
    .join("\n\n");
  await writeNewFile(
    `personal-wiki/notes/${slug}.md`,
    `---\ncategory: ${category}\n---\n# \`${title}\`\n\n${sections}\n\n## More on\n\n*\n`,
  );
}

try {
  switch (target) {
    case "blog":
      await createBlog();
      break;
    case "book":
      await createBook();
      break;
    case "film":
      await createFilm();
      break;
    case "project":
      await createProjectWriteup();
      break;
    case "paper":
      await createPaper();
      break;
    case "wiki":
      await createWiki("General");
      break;
    case "tech":
      await createWiki("Tech");
      break;
    default:
      throw new Error("Usage: node scripts/new-content.mjs blog|book|film|project|paper|wiki|tech");
  }
} finally {
  rl?.close();
}
