// Table of contents: the one place that knows which lessons and reference
// sheets exist. assets/nav.js reads it to draw the header and footer of every
// page, and the lists on the index page.
//
// To add a lesson: add one entry to `lessons`, in order. Every page's
// previous/next links and the index update themselves. `sheets` on a lesson
// lists the reference sheets that lesson built or added to, by key.
//
// Loaded as a classic script (not a module) so that it works when a page is
// opened straight from disk.

window.COURSE_TOC = {
  title: "Cadence, explained",
  lessons: [
    {
      number: 1,
      file: "0001-where-code-runs.html",
      title: "Where does this code run?",
      sheets: ["where-code-runs", "repo-map"],
    },
    {
      number: 2,
      file: "0002-saving-a-change.html",
      title: "What happens when you press Save?",
      sheets: ["where-code-runs", "glossary"],
    },
  ],
  sheets: {
    "where-code-runs": {
      file: "where-code-runs.html",
      title: "Where code runs in Cadence",
      short: "where code runs",
    },
    glossary: {
      file: "glossary.html",
      title: "Glossary of Cadence words",
      short: "glossary",
    },
    "repo-map": {
      file: "repo-map.html",
      title: "Repo map of Cadence",
      short: "repo map",
    },
  },
};
