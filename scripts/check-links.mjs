// Checks that every local link in the pages resolves. lefthook.yml runs it
// on every commit.
//
// The navigation is drawn at run time by assets/nav.js from assets/toc.js,
// so an off-the-shelf link checker would never see it; this reads toc.js
// directly instead. External URLs are skipped: checking them needs the
// network, so do that by hand, not in a hook.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { runInNewContext } from "node:vm";

process.chdir(fileURLToPath(new URL("..", import.meta.url))); // repo root

const TOC = "assets/toc.js";
const problems = [];
const report = (page, text) => problems.push(`${page}: ${text}`);

// toc.js is a classic browser script that assigns window.COURSE_TOC.
function loadToc() {
  const window = {};
  runInNewContext(readFileSync(TOC, "utf8"), { window });
  return window.COURSE_TOC;
}

function htmlFiles(dir) {
  return readdirSync(dir)
    .filter((name) => name.endsWith(".html"))
    .map((name) => join(dir, name));
}

const hasId = (file, id) => readFileSync(file, "utf8").includes(` id="${id}"`);

function checkToc(toc) {
  for (const lesson of toc.lessons) {
    if (!existsSync(join("lessons", lesson.file))) {
      report(TOC, `lesson ${lesson.number}: no file lessons/${lesson.file}`);
    }
    for (const key of lesson.sheets) {
      if (!toc.sheets[key]) {
        report(TOC, `lesson ${lesson.number} names unknown sheet "${key}"`);
      }
    }
  }
  for (const [key, sheet] of Object.entries(toc.sheets)) {
    if (!existsSync(join("reference", sheet.file))) {
      report(TOC, `sheet "${key}": no file reference/${sheet.file}`);
    }
  }
}

function checkPage(page, toc) {
  const html = readFileSync(page, "utf8");
  const body = html.match(/<body[^>]*>/)?.[0] ?? "";

  const lesson = body.match(/data-lesson="([^"]*)"/)?.[1];
  if (lesson && !toc.lessons.some((l) => String(l.number) === lesson)) {
    report(page, `data-lesson="${lesson}" is not in ${TOC}`);
  }
  const sheet = body.match(/data-sheet="([^"]*)"/)?.[1];
  if (sheet && !toc.sheets[sheet]) {
    report(page, `data-sheet="${sheet}" is not in ${TOC}`);
  }

  // Markup inside <pre> and <code> is a sample, not a link.
  const prose = html.replace(/<(pre|code)\b[\s\S]*?<\/\1>/g, "");
  for (const [, target] of prose.matchAll(/\s(?:href|src)="([^"]+)"/gi)) {
    const url = new URL(target, pathToFileURL(page));
    if (url.protocol !== "file:" || url.host) continue; // https:, mailto:, //cdn
    const file = fileURLToPath(url);
    const anchor = decodeURIComponent(url.hash.slice(1));
    if (!existsSync(file)) {
      report(page, `broken link ${target}`);
    } else if (anchor && !hasId(file, anchor)) {
      report(page, `no id="${anchor}" for link ${target}`);
    }
  }
}

const toc = loadToc();
const pages = [
  "index.html",
  ...htmlFiles("lessons"),
  ...htmlFiles("reference"),
];

checkToc(toc);
for (const page of pages) checkPage(page, toc);

if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`check-links: ${pages.length} pages, every local link resolves`);
