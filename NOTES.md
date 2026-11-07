# Notes

Working notes for the teacher (Claude). Read this before planning a session.

## The learner's preferences (stated 2026-11-06)

- Use subagents to explore the course repo. Read code directly only when their reports fall short.
- Use a subagent for anything online too, to save the main context window.
- Do not save subagent reports on the code into this repo. Explore afresh for each lesson.
- Focus on the course platform (the React app in `app/`, called "Cadence"). Ignore `request-logger/`. The scraped course lessons in `lessons/` are optional and "likely not useful" as teaching material.

## Confirmed on 2026-11-07 (see learning record 0003)

- The learner will not write code; Claude Code will. Teach how the parts fit and the words for them. End each lesson with the words they can now use with Claude.
- They know some SQL. Read Drizzle as the SQL it stands for.
- Only TypeScript. Docs examples (react.dev, MDN) are often JavaScript: show the TypeScript from Cadence instead. Explain browser behaviour over syntax.
- Lesson length of about 30 minutes including hands-on is right.

## Where the learner is in the course (as of 2026-11-06)

- At the course's own `/teach` lesson (`04-fundamentals/05.1`). The course tells students to pause there and learn the codebase before building on it.
- The course lessons that follow change Cadence in this order: star ratings (schema, migration, service, components, two routes), lesson comments with an instructor questions page (adds a route and a sidebar link), two small schema changes, then an instructor analytics dashboard built from a spec and tickets.
- The star-ratings build hits a client/server bug: a component imports a constant from a service, which pulls the database driver into the browser. Lesson 1 prepares for exactly this.
- The workflow the course repeats most: edit `app/db/schema.ts`, generate a migration, update `scripts/seed.ts`, reseed. Its recurring error is `no such column`, which means the schema and `data.db` are out of step.
- Routes are registered by hand in `app/routes.ts`. A route file that is not registered there gives a 404.
- The course repo is on `main` at commit `90e09a1`, with only migrations `0000` to `0002` applied. The learner keeps `main` clean and does course work on a `dev` branch.

## Words to use

The course says "browser" and "server" far more often than "client". Use these consistently, and name the alternative once when a term first appears.

- **browser** (the docs say "client"), **server**, **database**
- **route table** for `app/routes.ts`; **route file** for a file in `app/routes/`
- **loader**, **action**, **component**: React Router's and React's own names
- **service** for a file in `app/services/`
- **table**, **row**, **column** for the database; **schema** for `app/db/schema.ts`

A glossary page comes later. The skill's rule is to add a term only once the learner has shown they understand it.

## The course repo

- Path: `~/projects/others/ai-coding-crash-course/`. Never edit it on the learner's behalf. Lessons may ask the learner to make a small temporary edit, and must then tell them how to undo it.
- The learner often has their own dev server running on port 5173. Leave it alone.
- To check a claim by running the app, copy the repo to a scratch directory and run that copy on another port:
  `rsync -a --exclude .git --exclude lessons --exclude request-logger ./ /tmp/cadence-scratch-teach/` then `npx react-router dev --port 5199 --strictPort` from inside the copy. Delete the copy afterwards.
- `/usr/bin/google-chrome` exists in WSL and runs headless. Use it to screenshot a lesson (`--headless=new --screenshot=…`) or to capture a page's browser console (`--enable-logging=stderr --dump-dom`).
- There is no `sqlite3` command on this machine. To look inside `data.db`, use a one-line Node script with `better-sqlite3` in read-only mode, run from the repo root.

## This workspace is pushed to GitHub

- Remote: `github.com/michellepace/ai-coding-teach`. Assume anything written here may become public.
- Do not paste the paid course's lesson text into this repo. Paraphrase it and point to the file in the learner's own `lessons/` folder.
- `research/2026-11-06-web-resources.txt` is the subagent report behind `RESOURCES.md`, with verbatim quotes for citing. It is kept because it cannot be rebuilt from the code.

## Authoring conventions for this workspace

- Every page links `assets/course.css`. Lessons use `<main class="page">`. Reference sheets use `<main class="page sheet">`.
- Load the scripts with a plain `<script src="…" defer>`, never `type="module"`: module scripts are blocked when a page is opened from disk.
- Biome lints HTML, CSS and JS here, and `noUndeclaredClasses` is an error: every class used in HTML must exist in `assets/course.css`. Run `npx biome check lessons reference assets` before finishing.
- Markdown files must pass `npx markdownlint-cli2`.
- When a code excerpt skips lines, show line numbers (`<span class="ln">`) so the gaps are honest. Check every excerpt and line number against the real file.
- Open a page for the learner with `explorer.exe 'lessons\<file>.html'` (it exits 1 even on success).

## Components in `assets/`

- `course.css`: typography, layout, margin notes (`.sidenote`), place tags (`.lane` with `data-lane`), code figures (`.code`), callouts, predict-then-reveal (`details.reveal`), numbered hands-on steps (`.checklist`), reference-sheet layout (`.sheet`), print rules.
- `quiz.js`: multiple-choice quiz. First answer counts, options shuffle on each load, and the result can be copied as text for the learner to paste back.
- `trace.js`: steps through a journey across browser, server and database, one hop at a time. Reuse it for every request-flow lesson.
- `img/home-stats.jpg`: the stats band of the home page, cropped from `images/course-platform.jpg`.

## Quiz rules (from the skill)

- Every option in a question has the same number of words, and as near as possible the same number of characters.
- No clues from formatting or order.
