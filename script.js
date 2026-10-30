(() => {
  "use strict";

  const words = (value) => (value || "").trim().split(/\s+/).filter(Boolean);

  // Storage may be unavailable for local files or private browsing.
  const readingInputs = Array.from(document.querySelectorAll("input[data-reading-option]"));
  const readingNote = document.getElementById("reading-preference-note");
  const readingStorageKey = "christopher-stordahl.reading-options";
  if (readingInputs.length) {
    let storage = null;
    let storedText = null;
    try {
      storage = window.localStorage;
      if (storage) storedText = storage.getItem(readingStorageKey);
    } catch { storage = null; }

    let savedOptions = null;
    try { savedOptions = JSON.parse(storedText || "null"); }
    catch { /* Ignore stale preferences. */ }
    if (savedOptions && typeof savedOptions === "object" && !Array.isArray(savedOptions)) {
      readingInputs.forEach((input) => {
        const value = savedOptions[input.dataset.readingOption];
        if (typeof value === "boolean") input.checked = value;
      });
    }

    const saveReadingOptions = () => {
      const options = Object.fromEntries(readingInputs.map((input) => [input.dataset.readingOption, input.checked]));
      let saved = false;
      try {
        if (storage) {
          storage.setItem(readingStorageKey, JSON.stringify(options));
          saved = true;
        }
      } catch { /* Keep the current choices if storage is blocked. */ }
      if (readingNote) readingNote.textContent = saved
        ? "Reading preferences are saved in this browser."
        : "Reading preferences apply for this visit only.";
    };
    readingInputs.forEach((input) => input.addEventListener("change", saveReadingOptions));
    // Check storage before updating the saved-preferences message.
    saveReadingOptions();
  }

  const readingOptions = document.querySelector(".reading-options");
  if (readingOptions) {
    readingOptions.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !readingOptions.open) return;
      const summary = readingOptions.querySelector("summary");
      if (!summary) return;
      event.preventDefault();
      readingOptions.open = false;
      summary.focus();
    });
  }

  // Shared controls for the connection map and museum timeline.
  const enhanceSelector = ({ root, controls, buttonAttribute, panelAttribute, initial, status, onSelect, announcement }) => {
    if (!root) return;
    const group = root.querySelector(controls);
    const buttons = Array.from(root.querySelectorAll(`[${buttonAttribute}]`));
    const panels = Array.from(root.querySelectorAll(`[${panelAttribute}]`));
    const values = new Set(panels.map((panel) => panel.getAttribute(panelAttribute)));
    if (!group || !buttons.length || !panels.length || !values.has(initial)) return;
    let selected = null;
    const select = (value, announce = false) => {
      if (!values.has(value)) return;
      const activeButton = buttons.find((button) => button.getAttribute(buttonAttribute) === value);
      if (!activeButton) return;
      const changed = selected !== value;
      buttons.forEach((button) => button.setAttribute("aria-pressed", String(button === activeButton)));
      panels.forEach((panel) => { panel.hidden = panel.getAttribute(panelAttribute) !== value; });
      onSelect(value);
      if (announce && changed && status) status.textContent = announcement(value, activeButton);
      selected = value;
    };
    select(initial);
    group.hidden = false;
    buttons.forEach((button) => {
      button.addEventListener("click", () => select(button.getAttribute(buttonAttribute), true));
    });
  };

  const explorer = document.querySelector(".lens-explorer");
  enhanceSelector({
    root: explorer,
    controls: ".lens-controls",
    buttonAttribute: "data-lens",
    panelAttribute: "data-lens-panel",
    initial: "psychology",
    status: document.getElementById("lens-status"),
    onSelect: (value) => {
      explorer.dataset.activeLens = value;
      explorer.querySelectorAll("g[data-branch]").forEach((branch) => {
        branch.dataset.active = String(words(branch.dataset.branch).includes(value));
      });
    },
    announcement: (_value, button) => `Perspective selected: ${button.textContent.trim()}.`
  });

  const museumJourney = document.querySelector(".museum-journey");
  enhanceSelector({
    root: museumJourney,
    controls: ".milestone-controls",
    buttonAttribute: "data-milestone",
    panelAttribute: "data-milestone-panel",
    initial: "2013",
    status: document.getElementById("milestone-status"),
    onSelect: (value) => {
      const track = museumJourney.querySelector(".journey-track");
      if (track) track.dataset.activeMilestone = value;
    },
    announcement: (value) => `Showing the ${value} milestone.`
  });

  const projectFilterGroup = document.querySelector(".project-filter-group");
  const projectFilterButtons = Array.from(document.querySelectorAll("[data-project-filter]"));
  const projectCards = Array.from(document.querySelectorAll("article.project-card[data-project-themes]"));
  const projectStatus = document.getElementById("project-filter-status");
  let selectProjectFilter = null;

  if (projectFilterGroup && projectFilterButtons.length && projectCards.length) {
    const matches = (card, theme) => theme === "all" || words(card.dataset.projectThemes).includes(theme);
    projectFilterButtons.forEach((button) => {
      const count = button.querySelector("[data-filter-count]");
      if (count) count.textContent = String(projectCards.filter((card) => matches(card, button.dataset.projectFilter)).length).padStart(2, "0");
    });
    selectProjectFilter = (theme, announce = false) => {
      const selectedButton = projectFilterButtons.find((button) => button.dataset.projectFilter === theme);
      if (!selectedButton) return;
      let count = 0;
      projectFilterButtons.forEach((button) => button.setAttribute("aria-pressed", String(button === selectedButton)));
      projectCards.forEach((card) => {
        card.hidden = !matches(card, theme);
        if (!card.hidden) count += 1;
      });
      if (announce && projectStatus) {
        const suffix = theme === "all" ? "across all areas" : `in ${theme}`;
        projectStatus.textContent = `Showing ${count} ${count === 1 ? "project" : "projects"} ${suffix}.`;
      }
    };
    selectProjectFilter("all");
    projectFilterGroup.hidden = false;
    projectFilterButtons.forEach((button) => {
      button.addEventListener("click", () => selectProjectFilter(button.dataset.projectFilter, true));
    });
  }

  // Open linked projects before the browser scrolls, including after Back/Forward.
  const revealProject = (hash, announce = false) => {
    if (!hash || hash.charAt(0) !== "#") return;
    let id;
    try { id = decodeURIComponent(hash.slice(1)); }
    catch { return; }
    const card = document.getElementById(id);
    if (!projectCards.includes(card)) return;
    const wasHidden = card.hidden;
    if (wasHidden && selectProjectFilter) selectProjectFilter("all", announce);
    const details = card.querySelector("details");
    if (details) details.open = true;
    return { card, wasHidden };
  };
  document.querySelectorAll("a[data-open-project]").forEach((link) => {
    link.addEventListener("click", () => revealProject(link.hash, true));
  });
  window.addEventListener("hashchange", () => {
    const target = revealProject(window.location.hash, true);
    // Filtering can hide the anchor before the browser scrolls.
    // Scroll again after revealing it.
    if (target?.wasHidden) target.card.scrollIntoView({ block: "start", behavior: "auto" });
  });
  revealProject(window.location.hash);

  const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
  const navSections = navLinks.map((link) => ({
    link,
    section: document.getElementById(link.hash.slice(1))
  })).filter((item) => item.section);
  let scheduled = false;
  const updateNavigation = () => {
    const offset = (document.querySelector(".site-header")?.offsetHeight || 83) + 45;
    let current = null;
    navSections.forEach((item) => {
      if (item.section.getBoundingClientRect().top <= offset) current = item;
    });
    if (navSections.length && window.scrollY > 100 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
      current = navSections[navSections.length - 1];
    }
    navLinks.forEach((link) => {
      if (current && current.link === link) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    scheduled = false;
  };
  const scheduleNavigation = () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(updateNavigation);
    }
  };
  window.addEventListener("scroll", scheduleNavigation, { passive: true });
  window.addEventListener("resize", scheduleNavigation);
  document.addEventListener("toggle", scheduleNavigation, true);
  updateNavigation();
})();
