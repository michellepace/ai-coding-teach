# Lesson 1 quiz: the read path is solid, the "component runs in the browser too" consequence is not yet automatic

On 2026-11-07 the learner scored 4/5 on the lesson 1 quiz at first attempt. They correctly placed a loader's `console.log` in the terminal, a data change in `data.db` rather than in code, the `Home` component on both server and browser, and a stopped server as "page fails to load". The one miss was the application question: asked why calling a service from inside `Home` is a mistake, they chose "Home runs before the loader, so the table looks empty" instead of "Home also runs in the browser, which cannot open data.db".

## Evidence

Quiz result pasted back by the learner. Q3 (where does `Home` run) was correct, so the fact is known. Q5 shows it is not yet applied: when reasoning about a diff, the learner reached for an ordering explanation rather than a place explanation. The chosen answer also suggests the order "loader first, then component" is not fully settled.

## Implications

- Treat lesson 1's knowledge as acquired: browser, server, database; route table, loader, service, component; `data.db` as data not code. Lessons can use these words without re-introducing them.
- The client/server boundary mistake (mission item 6, and the course's star-ratings bug) needs more practice. Each of the next few lessons should include one retrieval question of the form "here is a line of code; where does it run, and so is it allowed here?", until the learner gets it right twice without prompting.
- Say "the loader runs, then the component" explicitly whenever a trace is shown, until the order is automatic.
- This is the first real evidence for the starting point in record 0001. It fits the self-report: TypeScript reading was no obstacle, and the web ideas were new but took.
