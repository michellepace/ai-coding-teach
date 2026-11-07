// Navigation: draws the header and footer of every page, and the lists on the
// index page, from the table of contents in assets/toc.js.
//
// Each page says what it is on <body>:
//
//   <body data-page="lesson" data-lesson="2">
//   <body data-page="sheet" data-sheet="glossary">
//   <body data-page="index">
//
// and keeps a plain Index link in its <nav class="topbar"> as the fallback if
// this script does not run. The script fills in the rest:
//
//   header   Index on the left; previous and next lesson on the right (lessons)
//   footer   the sheets the lesson used, plus previous and next again (lessons)
//            Index only (sheets)
//   index    the lesson list and the sheet list, in <section data-toc="…">
//
// Loaded as a classic script (not a module) so that it works when a page is
// opened straight from disk, hence the wrapper function.

(() => {
  const toc = window.COURSE_TOC;
  if (!toc) return;

  const body = document.body;
  const page = body.dataset.page;
  const root = page === "index" ? "" : "../";

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function link(href, text, title) {
    const node = el("a", "", text);
    node.href = href;
    if (title) node.title = title;
    return node;
  }

  function lessonHref(lesson) {
    return page === "lesson" ? lesson.file : `${root}lessons/${lesson.file}`;
  }

  function sheetHref(sheet) {
    return page === "sheet" ? sheet.file : `${root}reference/${sheet.file}`;
  }

  // Previous and next, as a pair of links. `long` adds the titles.
  function pager(index, long) {
    const node = el("span", "nav-pager");
    const prev = toc.lessons[index - 1];
    const next = toc.lessons[index + 1];
    const nextNumber = toc.lessons[index].number + 1;

    if (prev) {
      const text = long
        ? `← Lesson ${prev.number}: ${prev.title}`
        : `← Lesson ${prev.number}`;
      node.append(link(lessonHref(prev), text, prev.title));
    }
    if (next) {
      const text = long
        ? `Lesson ${next.number}: ${next.title} →`
        : `Lesson ${next.number} →`;
      node.append(link(lessonHref(next), text, next.title));
    } else {
      const text = long
        ? `Lesson ${nextNumber}: not written yet`
        : `Lesson ${nextNumber} →`;
      node.append(el("span", "nav-muted", text));
    }
    return node;
  }

  function setUpLesson() {
    const index = toc.lessons.findIndex(
      (lesson) => String(lesson.number) === body.dataset.lesson,
    );
    if (index === -1) return;
    const lesson = toc.lessons[index];

    const topbar = document.querySelector(".topbar");
    if (topbar) topbar.append(pager(index, false));

    const footer = document.querySelector(".lesson-nav");
    if (footer) {
      const refs = el("span", "nav-refs");
      refs.append("Reference for this lesson: ");
      lesson.sheets.forEach((key, i) => {
        const sheet = toc.sheets[key];
        if (!sheet) return;
        if (i > 0) refs.append(" · ");
        refs.append(link(sheetHref(sheet), sheet.short, sheet.title));
      });
      footer.append(refs, pager(index, true));
    }
  }

  function setUpIndex() {
    const lessons = document.querySelector('[data-toc="lessons"]');
    if (lessons) {
      const list = el("ol");
      for (const lesson of toc.lessons) {
        const item = el("li");
        item.append(link(lessonHref(lesson), lesson.title));
        list.append(item);
      }
      // The list numbers it, so the text does not repeat "Lesson 3".
      list.append(el("li", "nav-muted", "Not written yet"));
      lessons.append(list);
    }

    const sheets = document.querySelector('[data-toc="sheets"]');
    if (sheets) {
      const list = el("ul");
      for (const sheet of Object.values(toc.sheets)) {
        const item = el("li");
        item.append(link(sheetHref(sheet), sheet.title));
        list.append(item);
      }
      sheets.append(list);
    }
  }

  if (page === "lesson") setUpLesson();
  if (page === "index") setUpIndex();
  // A sheet's header and footer are complete in the HTML: Index, and nothing else.
})();
