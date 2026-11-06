# Mission: Know the Cadence codebase before building on it

> **Status: draft, not yet confirmed.** Written by Claude on 2026-11-06 from the first `/teach` prompt and from what the course lessons ask of students. The learner has not confirmed it yet. Correct anything that is wrong.

## Why

I am taking Matt Pocock's AI Coding Crash Course, which has me use Claude Code to build real features on Cadence, the course platform in `~/projects/others/ai-coding-crash-course/`. The course says to pause at the `/teach` lesson and learn the codebase first, because the very next lessons build star ratings, lesson comments and an instructor analytics dashboard on top of it. I want to direct the agent and judge what it produces with understanding, rather than accept changes I cannot read.

## Success looks like

- Shown any file in `app/`, I can say where its code runs (browser, server, or both) and what it is for.
- I can trace a page from its URL through the route table, loader, service and database to the component, and trace a form submission back the other way.
- Before the agent builds a feature, I can predict which layers it must touch (schema, migration and seed; service; route; component), then check its diff against my prediction.
- I can read a React component in this repo: its JSX, its props and its state.
- I can read `app/db/schema.ts` and explain a table, a foreign key and a migration, and I know what to do when the app says `no such column`.
- I can spot a client/server boundary mistake in a diff, such as a component importing from a service.

## Constraints

- Starting point: basic TypeScript and a little vibe coding. New to React, to client and server, and to databases.
- Learn through this repo's real code, in short lessons, not through generic tutorials.
- Windows with WSL2. Lessons open in the Windows browser.

## Out of scope

- `request-logger/`, the second app in the repo.
- The AI-coding techniques themselves (context, skills, specs, tickets). The course teaches those.
- Writing React, SQL or a web app from scratch. The goal is to read and navigate Cadence, not to become a React developer.
- Styling in depth (Tailwind, shadcn/ui) and deployment.
