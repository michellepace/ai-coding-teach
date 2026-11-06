# Cadence Codebase Resources

Every link below was fetched and checked on 2026-11-06 by a research subagent. The full report, with verbatim quotes for citing, is in `research/2026-11-06-web-resources.txt`.

Three version facts decide which pages to trust:

- **React Router**: the course repo uses 8.3.0. The docs are versioned, so the links here are pinned to `reactrouter.com/8.3.0/…`. Tutorials written for v7 still apply. Anything importing from `react-router-dom` is out of date.
- **Drizzle**: the repo uses drizzle-orm 0.45 and drizzle-kit 0.31, but the live docs now describe the v1 release candidate. Query and schema pages still fit. Migration pages show a different folder layout from the repo's.
- **Vitest**: the repo uses v3, so use `v3.vitest.dev`, not the main site.

## Knowledge

### Browser, server and the web

- [MDN: How the web works](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works)
  Clients, servers, requests and responses in plain language, about 15 minutes. Use for: the basic definitions.
- [MDN: Introduction to the server side](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction)
  What runs in a browser, what runs on a server, and why sites keep data in a database. Use for: the primary reading behind lesson 1.
- [MDN: Client-server overview](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview)
  Real GET and POST requests and responses, denser than the two above. Use for: forms and the write path.
- [web.dev: Rendering on the web, by Addy Osmani and Jason Miller](https://web.dev/articles/rendering-on-the-web)
  Defines server-side rendering and hydration. Intermediate, so assign only the "Terminology" and server-side rendering sections. Use for: why a component runs in two places.
- [React: hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)
  A reference page with a clear one-line definition of hydration. Use for: citing what hydration is.
- [MDN: Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies)
  How a server recognises a returning browser. Use for: the lesson on who the current user is.

### React Router 8.3.0

- [Route Module](https://reactrouter.com/8.3.0/start/framework/route-module)
  The most important page for this repo: every special name a route file can export (`loader`, `action`, the component, `meta`, `ErrorBoundary`) and where each runs. Use for: any lesson about a file in `app/routes/`.
- [Routing](https://reactrouter.com/8.3.0/start/framework/routing)
  How `app/routes.ts` maps addresses to files, plus layouts, `<Outlet />` and `:params`. Use for: the route table and layout lessons.
- [Data Loading](https://reactrouter.com/8.3.0/start/framework/data-loading)
  Loaders, and the statement that they are removed from the code sent to browsers. Use for: the read path.
- [Actions](https://reactrouter.com/8.3.0/start/framework/actions)
  Saving changes with `action` and `<Form>`, and how loaders re-run afterwards. Use for: the write path.
- [.server modules](https://reactrouter.com/8.3.0/api/framework-conventions/server-modules) and [Automatic Code Splitting](https://reactrouter.com/8.3.0/explanation/code-splitting)
  How server-only code is kept out of the browser, and what makes the build fail. Use for: the client/server boundary and the star-ratings bug.
- [Form vs. fetcher](https://reactrouter.com/8.3.0/explanation/form-vs-fetcher) and [Using Fetchers](https://reactrouter.com/8.3.0/how-to/fetchers)
  When a change should move you to a new page and when it should not. Use for: `useFetcher`, which the course's features rely on.
- [Pending UI](https://reactrouter.com/8.3.0/start/framework/pending-ui)
  Showing that something is loading or saving. Use for: `useNavigation` and skeletons.
- [Type Safety](https://reactrouter.com/8.3.0/explanation/type-safety)
  Where the `./+types/…` imports come from. Use for: reading the `Route.LoaderArgs` and `Route.ComponentProps` types.
- [Sessions and Cookies](https://reactrouter.com/8.3.0/explanation/sessions-and-cookies)
  React Router's own account of sessions. Use for: `app/lib/session.ts`.
- [Tutorial: Address Book](https://reactrouter.com/8.3.0/tutorials/address-book)
  The official hands-on tutorial, 30 to 45 minutes by its own estimate. Use for: optional practice once loaders and actions make sense.

### React

- [React: Quick Start](https://react.dev/learn)
  The official introduction to "80% of the React concepts that you will use on a daily basis". Use for: the first read before any component lesson.
- React's Learn pages, in this order: [Your First Component](https://react.dev/learn/your-first-component), [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx), [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component), [Conditional Rendering](https://react.dev/learn/conditional-rendering), [Rendering Lists](https://react.dev/learn/rendering-lists), [Responding to Events](https://react.dev/learn/responding-to-events), [State: A Component's Memory](https://react.dev/learn/state-a-components-memory), [Thinking in React](https://react.dev/learn/thinking-in-react)
  Written for first-timers, with exercises in the browser, 15 to 25 minutes each. Use for: the primary source of each matching component lesson.
- [React: StrictMode](https://react.dev/reference/react/StrictMode)
  Explains why components run an extra time in development. Use for: any experiment that counts how often something runs.

### Databases, SQL and SQLite

- [SQLBolt](https://sqlbolt.com/)
  Interactive SQL lessons in the browser, the most beginner-friendly option found. No named author. Use for: tables, rows, `SELECT` and joins (lessons 1 to 6 and 13 to 16).
- [CS50's Introduction to Databases with SQL: notes for week 0](https://cs50.harvard.edu/sql/notes/0/) and [week 1](https://cs50.harvard.edu/sql/notes/1/)
  Harvard's free course, which uses SQLite. Use for: primary keys, foreign keys and how tables relate.
- [SQLite: About SQLite](https://www.sqlite.org/about.html) and [SQLite Is Serverless](https://www.sqlite.org/serverless.html)
  Short official pages. Use for: why the database in this repo is a file rather than a separate program.
- [SQLite: Temporary Files, sections 2.2 and 2.3](https://www.sqlite.org/tempfiles.html) and [Write-Ahead Logging](https://www.sqlite.org/wal.html)
  What the `data.db-wal` and `data.db-shm` files are. Use for: the database lesson, when the learner notices three files.

### Drizzle

- [Drizzle: Schema](https://orm.drizzle.team/docs/sqlite/sql-schema-declaration)
  Declaring tables in TypeScript. Use for: reading `app/db/schema.ts`. Always use the `/docs/sqlite/` pages, since the unprefixed ones show PostgreSQL.
- [Drizzle: Select](https://orm.drizzle.team/docs/sqlite/select), [Insert](https://orm.drizzle.team/docs/sqlite/insert), [Update](https://orm.drizzle.team/docs/sqlite/update), [Delete](https://orm.drizzle.team/docs/sqlite/delete), [Joins](https://orm.drizzle.team/docs/sqlite/joins)
  The query builder the services use. Use for: reading any function in `app/services/`.
- [Drizzle: Migrations](https://orm.drizzle.team/docs/sqlite/migrations), [`drizzle-kit generate`](https://orm.drizzle.team/docs/sqlite/drizzle-kit-generate), [`drizzle-kit migrate`](https://orm.drizzle.team/docs/sqlite/drizzle-kit-migrate)
  The idea of migrations, and what the repo's `db:generate` and `db:migrate` scripts run. Use for: the concept only. The folder layout shown is v1's and does not match the repo.

### Styling and tests

- [Tailwind CSS: Styling with utility classes](https://tailwindcss.com/docs/styling-with-utility-classes)
  Use for: making sense of the long `className` strings.
- [shadcn/ui: Introduction](https://ui.shadcn.com/docs)
  Use for: why `app/components/ui/` holds copied source code and not an installed library.
- [Vitest v3: Getting Started](https://v3.vitest.dev/guide/)
  Use for: the `*.test.ts` files beside the services.

### Local

- `research/2026-11-06-web-resources.txt` in this workspace
  The research report behind this file, with verbatim quotes from each source. Use for: citing a source in a lesson without fetching it again.
- `git show b3d6228:AGENTS.md`, run in the course repo
  A 172-line architecture summary from a later course checkpoint, describing the code after star ratings and comments are built. Use for: a preview of where the codebase is heading.
- The course's own lessons, in the course repo's `lessons/` folder
  Use for: what the course will ask next. `01-before-we-start/06-database-migrations.md` is its introduction to the database.

## Wisdom (Communities)

The learner does not want to join any communities (stated 2026-11-06). Do not propose them.

## Gaps

- **Drizzle 0.45 migrations**: no official documentation matches the repo's `drizzle/meta/_journal.json` layout. The closest sources are a maintainer's [GitHub discussion](https://github.com/drizzle-team/drizzle-orm/discussions/2832) and the [0.45.2 source](https://raw.githubusercontent.com/drizzle-team/drizzle-orm/0.45.2/drizzle-orm/src/migrator.ts).
- **Server render, then hydrate**: no single sentence in the React Router docs says that a route component runs on the server and again in the browser. Lesson 1 pairs React's `hydrateRoot` page with a test run on the app itself.
- **`localhost`**: no checked source yet for what the word means. The MDN glossary address that was tried returned a 404.
- **Effects run only in the browser**: confirmed by a test on the app, but not yet checked against react.dev. Do that before the lesson on `useEffect`.
- **Not verified, so left out**: Khan Academy's SQL course could not be fetched.
