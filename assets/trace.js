// Trace widget: step through one journey across the three places in Cadence
// (browser, server, database), one hop at a time.
//
// Authoring format:
//
//   <figure class="trace wide">
//     <ol class="trace-steps">
//       <li class="trace-step" data-lane="browser" data-send="server">…</li>
//       <li class="trace-step" data-lane="server">…</li>
//       <li class="trace-step" data-lane="server" data-send="database">…</li>
//     </ol>
//     <figcaption>…</figcaption>
//   </figure>
//
//   data-lane  where this step happens: browser | server | database
//   data-send  optional: the place this step sends something to. Lights up
//              the arrow between the two places, in the right direction.
//
// The script draws the three-place map above the steps and adds Back / Next
// controls. Without the script the steps still read as an ordered list.
//
// Loaded as a classic script (not a module) so that it works when a page is
// opened straight from disk, hence the wrapper function.

(() => {
  const PLACES = [
    { lane: "browser", name: "Browser", note: "a tab on your machine" },
    { lane: "server", name: "Server", note: "the program npm run dev starts" },
    { lane: "database", name: "Database", note: "the file data.db" },
  ];

  // What travels along each arrow, by direction.
  const CARGO = {
    "browser>server": "request",
    "server>browser": "response",
    "server>database": "query",
    "database>server": "rows",
  };

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function arrow(from, to, glyph) {
    const node = el("span", "trace-arrow");
    node.dataset.route = `${from}>${to}`;
    node.append(el("b", "", glyph), CARGO[`${from}>${to}`]);
    return node;
  }

  function buildMap() {
    const map = el("div", "trace-map");
    PLACES.forEach((place, index) => {
      const node = el("div", "trace-node");
      node.dataset.lane = place.lane;
      node.append(el("b", "", place.name), el("small", "", place.note));
      map.append(node);

      const next = PLACES[index + 1];
      if (next) {
        const link = el("div", "trace-link");
        link.append(
          arrow(place.lane, next.lane, "⟶"),
          arrow(next.lane, place.lane, "⟵"),
        );
        map.append(link);
      }
    });
    return map;
  }

  function setUpTrace(trace) {
    const steps = [...trace.querySelectorAll(".trace-step")];
    if (steps.length === 0) return;

    const map = buildMap();
    trace.prepend(map);

    const controls = el("div", "trace-controls");
    const back = el("button", "btn", "← Back");
    const next = el("button", "btn", "Next →");
    const all = el("button", "btn btn-quiet", "Show all steps");
    const count = el("span", "trace-count");
    for (const button of [back, next, all]) button.type = "button";
    controls.append(back, count, next, all);
    trace.querySelector(".trace-steps").after(controls);

    let current = 0;
    let stepping = true;

    function render() {
      trace.classList.toggle("is-stepping", stepping);
      steps.forEach((step, index) => {
        step.classList.toggle("is-current", stepping && index === current);
      });

      const step = steps[current];
      const route = step.dataset.send
        ? `${step.dataset.lane}>${step.dataset.send}`
        : null;
      for (const node of map.querySelectorAll(".trace-node")) {
        node.classList.toggle(
          "is-on",
          stepping && node.dataset.lane === step.dataset.lane,
        );
      }
      for (const node of map.querySelectorAll(".trace-arrow")) {
        node.classList.toggle(
          "is-on",
          stepping && node.dataset.route === route,
        );
      }

      back.hidden = !stepping;
      next.hidden = !stepping;
      back.disabled = current === 0;
      next.disabled = current === steps.length - 1;
      count.textContent = stepping
        ? `Step ${current + 1} of ${steps.length}`
        : `All ${steps.length} steps`;
      all.textContent = stepping ? "Show all steps" : "Step through";
    }

    back.addEventListener("click", () => {
      current = Math.max(0, current - 1);
      render();
    });
    next.addEventListener("click", () => {
      current = Math.min(steps.length - 1, current + 1);
      render();
    });
    all.addEventListener("click", () => {
      stepping = !stepping;
      render();
    });

    render();
  }

  for (const trace of document.querySelectorAll(".trace")) {
    setUpTrace(trace);
  }
})();
