// PreToolUse hook for Bash: playwright-cli may only open .html pages inside
// this repo. .playwright/cli.config.json sets allowUnrestrictedFileAccess so
// pages can be checked from disk, the way a reader opens them, but that lets
// the browser open any file on the machine. Every file: URL in the command
// is checked. Exit 2 blocks the command, and stderr tells Claude why.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = fs.realpathSync(path.join(import.meta.dirname, "../.."));

function block(reason) {
  process.stderr.write(`${reason}\n`);
  process.exit(2);
}

// Follows symlinks and "..". A path that does not exist yet is resolved
// through its nearest existing parent.
function realPath(target) {
  let existing = path.resolve(target);
  const rest = [];
  while (!fs.existsSync(existing) && path.dirname(existing) !== existing) {
    rest.unshift(path.basename(existing));
    existing = path.dirname(existing);
  }
  return path.join(fs.realpathSync(existing), ...rest);
}

function isInsideRepo(target) {
  const real = realPath(target);
  return real === repoRoot || real.startsWith(repoRoot + path.sep);
}

const command = JSON.parse(fs.readFileSync(0, "utf8")).tool_input?.command;
if (!/playwright/i.test(command ?? "")) process.exit(0);

// \b so a selector such as .profile:hover is not read as file:hover.
for (const [raw] of command.matchAll(/\bfile:[^\s'"`<>()]+/gi)) {
  if (/[$`~]/.test(raw)) {
    block(
      `"${raw}" uses a shell variable or "~", so it cannot be checked. Write the absolute path, such as file://${repoRoot}/index.html.`,
    );
  }

  let filePath;
  try {
    const url = new URL(raw);
    if (url.host && url.host !== "localhost") {
      block(
        `"${raw}" names a host. Only files inside ${repoRoot} are allowed.`,
      );
    }
    filePath = fileURLToPath(url);
  } catch {
    block(`"${raw}" is not a valid file: URL.`);
  }

  if (!isInsideRepo(filePath)) {
    block(
      `"${raw}" is outside this repo. playwright-cli may only open files inside ${repoRoot}.`,
    );
  }

  if (path.extname(filePath).toLowerCase() !== ".html") {
    block(`"${raw}" is not an .html page. playwright-cli may only open pages.`);
  }
}
