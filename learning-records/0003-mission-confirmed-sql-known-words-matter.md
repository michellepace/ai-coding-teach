# Mission confirmed: the goal is vocabulary and how the parts fit, SQL is known, JavaScript is not wanted

On 2026-11-07 the learner confirmed the draft mission in a five-question interview and sharpened it: they will never write the code themselves (Claude Code will), so the goal is to understand how the parts of Cadence fit and work together and to **use the right words** when directing Claude and giving it feedback. They know some SQL. They have no JavaScript and only ever use TypeScript, and do not want JavaScript taught for its own sake. React, client/server and the web are new, as the draft said.

## Evidence

The learner's own answers, in their words: "the former, not the later" (direct and judge, not write), "yes for react thats it, no javascript either. yes sql I have", and "so I can use the right words to give claude better direction and feedback".

## Implications

- Start the glossary now rather than later, and make every lesson's new words explicit. The words should be the ones the React Router docs, the Drizzle docs and the course use, since those are the words Claude responds to.
- Database lessons can lean on SQL. Read Drizzle calls as the SQL they stand for (`db.insert(categories).values(…)` is `INSERT INTO categories …`). SQLBolt and CS50 SQL become optional, not primary reading.
- Never explain JavaScript-the-language. When browser behaviour matters (events, `console.log`, the Network tab), explain the behaviour, not the language.
- Each lesson should end with a "words to use with Claude" list: the terms the learner can now put in a prompt or a review comment.
