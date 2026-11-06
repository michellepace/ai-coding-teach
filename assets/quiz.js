// Quiz widget: retrieval practice with immediate feedback.
//
// Authoring format (see the notes in assets/course.css):
//
//   <section class="quiz" data-quiz="0001-some-id" data-title="Lesson title">
//     <article class="quiz-q" data-answer="b">
//       <p class="quiz-prompt">The question?</p>
//       <ul class="quiz-options">
//         <li data-option="a">First option</li>
//         <li data-option="b">Second option</li>
//         <li data-option="c">Third option</li>
//       </ul>
//       <p class="quiz-why" hidden>Why the right answer is right.</p>
//     </article>
//   </section>
//
// Behaviour: options are shuffled on every load, the FIRST answer to each
// question is the one that counts, and the result can be copied as plain text
// to paste back to the teacher (Claude), who uses it to plan the next lesson.
//
// Loaded as a classic script (not a module) so that it works when a page is
// opened straight from disk, hence the wrapper function.

(() => {
  const STORAGE_PREFIX = "teach-quiz:";

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function readStore(key) {
    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_PREFIX + key));
    } catch {
      return null;
    }
  }

  function writeStore(key, value) {
    try {
      window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch {
      // Storage can be unavailable for local files. The quiz works without it.
    }
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function setUpQuiz(quiz) {
    const id = quiz.dataset.quiz || "quiz";
    const title = quiz.dataset.title || document.title;
    const questions = [...quiz.querySelectorAll(".quiz-q")];
    const previous = readStore(id);
    const answers = [];

    const result = el("div", "quiz-result");
    result.hidden = true;
    quiz.append(result);

    function showResult() {
      const score = answers.filter((a) => a.correct).length;
      const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD, local
      const lines = [
        `Quiz result: ${title}`,
        `Score: ${score}/${questions.length} on first attempt (${today})`,
      ];
      for (const a of answers) {
        lines.push(
          a.correct
            ? `Q${a.number} correct`
            : `Q${a.number} MISSED: chose "${a.chosen}", answer was "${a.right}"`,
        );
      }
      const report = lines.join("\n");

      result.replaceChildren();
      result.append(
        el(
          "p",
          "quiz-score",
          `${score} of ${questions.length} on first attempt`,
        ),
      );
      if (previous) {
        result.append(
          el(
            "p",
            "quiz-note",
            `Last time: ${previous.score} of ${previous.total}, on ${previous.date}.`,
          ),
        );
      }
      result.append(
        el(
          "p",
          "",
          "Paste this to your teacher in Claude Code. It decides what the next lesson should cover.",
        ),
      );

      const box = el("textarea", "quiz-report");
      box.readOnly = true;
      box.rows = lines.length + 1;
      box.value = report;
      result.append(box);

      const actions = el("div", "quiz-actions");
      const copy = el("button", "btn", "Copy result");
      copy.type = "button";
      const note = el("span", "quiz-note");
      copy.addEventListener("click", async () => {
        box.select();
        try {
          await navigator.clipboard.writeText(report);
          note.textContent = "Copied.";
        } catch {
          note.textContent = "Selected. Press Ctrl+C to copy.";
        }
      });
      const again = el("button", "btn btn-quiet", "Start again");
      again.type = "button";
      again.addEventListener("click", () => window.location.reload());
      actions.append(copy, again, note);
      result.append(actions);

      result.hidden = false;
      writeStore(id, { score, total: questions.length, date: today });
    }

    questions.forEach((question, index) => {
      const number = index + 1;
      const list = question.querySelector(".quiz-options");
      const why = question.querySelector(".quiz-why");
      const prompt = question.querySelector(".quiz-prompt");
      const rightKey = question.dataset.answer;

      prompt.prepend(el("span", "quiz-number", `Question ${number}`));

      const verdict = el("p", "quiz-verdict");
      verdict.hidden = true;
      question.insertBefore(verdict, why);

      const buttons = [];
      const items = shuffle([...list.children]);
      items.forEach((item, position) => {
        const button = el("button", "quiz-option");
        button.type = "button";
        button.dataset.option = item.dataset.option;
        const letter = el("span", "quiz-letter", "abcdef"[position]);
        const label = el("span", "");
        label.append(...item.childNodes);
        button.append(letter, label);
        item.append(button);
        list.append(item);
        buttons.push({ button, label });
      });

      for (const { button, label } of buttons) {
        button.addEventListener("click", () => {
          const correct = button.dataset.option === rightKey;
          const right = buttons.find(
            (b) => b.button.dataset.option === rightKey,
          );
          for (const other of buttons) {
            other.button.disabled = true;
            if (other !== right && other.button !== button) {
              other.button.classList.add("is-faded");
            }
          }
          right.button.classList.add("is-correct");
          if (!correct) button.classList.add("is-wrong");

          verdict.textContent = correct ? "Correct." : "Not quite.";
          verdict.classList.add(correct ? "is-correct" : "is-wrong");
          verdict.hidden = false;
          why.hidden = false;

          answers.push({
            number,
            correct,
            chosen: label.textContent.trim(),
            right: right.label.textContent.trim(),
          });
          if (answers.length === questions.length) {
            answers.sort((a, b) => a.number - b.number);
            showResult();
          }
        });
      }
    });
  }

  for (const quiz of document.querySelectorAll(".quiz")) {
    setUpQuiz(quiz);
  }
})();
