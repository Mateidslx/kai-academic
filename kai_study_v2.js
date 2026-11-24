/* ==========================================================================
   KAI STUDY v2 — ACTIVE RECALL, SM-2 FLASHCARDS, COURSE EXPLORER & QCM
   ========================================================================== */

(function () {
  'use strict';

  const DATA = window.__KAI_STUDY_DATA__ || { stats: {}, modules: [], chapters: {}, quizzes: [], supports: [] };
  const STORAGE = {
    DONE_CHAPS: 'kai_study_v2_done_chapters',
    SM2: 'kai_study_v2_sm2',
    LAST_VISIT: 'kai_study_v2_last_visit',
    PREFS: 'kai_study_v2_prefs',
    WRONG_Q: 'kai_study_v2_wrong_q'
  };

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeJson(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (_) {}
  }

  const state = {
    view: 'home',
    homeFilter: 'all',
    selectedMod: (DATA.modules[0] && DATA.modules[0].code) || 'R1.01',
    chapFilter: 'all',
    doneChapters: readJson(STORAGE.DONE_CHAPS, {}),
    sm2: readJson(STORAGE.SM2, {}),
    wrongIds: readJson(STORAGE.WRONG_Q, []),
    lastVisit: readJson(STORAGE.LAST_VISIT, {
      module: 'R1.05',
      title: 'R1.05 — Bases de Données & Modélisation (MCD)',
      url: 'courses/R1.05/chap1_merise_mcd.html'
    }),
    prefs: readJson(STORAGE.PREFS, {
      tint: 'cream',
      font: 'lexend',
      fontSize: 16,
      bionic: false,
      ruler: false
    }),
    fcModule: 'DUE',
    fcDeck: [],
    fcIdx: 0,
    quizModule: 'ALL',
    quizMode: '10',
    quizDeck: [],
    quizIdx: 0,
    quizScore: 0,
    quizAnswered: false,
    libModule: 'ALL',
    libExt: 'ALL',
    libQuery: ''
  };

  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatRichText(text) {
    const safe = esc(text);
    if (!state.prefs.bionic) return safe;
    return safe.replace(/([A-Za-zÀ-ÖØ-öø-ÿ]{3,})/g, (word) => {
      const cut = Math.max(2, Math.ceil(word.length * 0.42));
      return `<strong class="bionic-b">${word.slice(0, cut)}</strong>${word.slice(cut)}`;
    });
  }

  /* ---------------- 1. Accessibility & Scotopic Preferences ---------------- */
  function applyPrefs() {
    document.documentElement.setAttribute('data-tint', state.prefs.tint || 'cream');
    document.documentElement.style.setProperty('--font-size', `${state.prefs.fontSize || 16}px`);
    const fontVal = state.prefs.font === 'jakarta'
      ? '"Plus Jakarta Sans", system-ui, sans-serif'
      : '"Lexend", "Plus Jakarta Sans", system-ui, sans-serif';
    document.documentElement.style.setProperty('--font-main', fontVal);
    document.body.classList.toggle('ruler-on', !!state.prefs.ruler);

    document.querySelectorAll('[data-tint-choice]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.tintChoice === state.prefs.tint);
    });
    const bionicBtn = document.getElementById('pref-bionic');
    if (bionicBtn) {
      bionicBtn.setAttribute('aria-pressed', String(!!state.prefs.bionic));
      bionicBtn.textContent = state.prefs.bionic ? 'Lecture Bionique : Activée' : 'Lecture Bionique : Désactivée';
    }
    const rulerBtn = document.getElementById('pref-ruler');
    if (rulerBtn) {
      rulerBtn.setAttribute('aria-pressed', String(!!state.prefs.ruler));
      rulerBtn.textContent = state.prefs.ruler ? 'Réglette guidée : Activée' : 'Réglette guidée : Désactivée';
    }
    const fontBtn = document.getElementById('pref-font');
    if (fontBtn) {
      fontBtn.textContent = state.prefs.font === 'jakarta' ? 'Police : Plus Jakarta Sans' : 'Police : Lexend (Dyslexie)';
    }
    const sizeLabel = document.getElementById('pref-size-label');
    if (sizeLabel) sizeLabel.textContent = `${state.prefs.fontSize} px`;
    writeJson(STORAGE.PREFS, state.prefs);
  }

  /* ---------------- 2. Navigation & View Switching ---------------- */
  function setView(viewName, modCode) {
    state.view = viewName;
    if (modCode) state.selectedMod = modCode;

    document.querySelectorAll('.nav-tab[data-view]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.view === viewName);
    });
    document.querySelectorAll('.view-pane').forEach((pane) => {
      pane.classList.toggle('is-active', pane.id === `view-${viewName}`);
    });

    if (viewName === 'home') renderHome();
    else if (viewName === 'explorer') renderExplorer();
    else if (viewName === 'flashcards') renderFlashcards();
    else if (viewName === 'quiz') renderQuiz();
    else if (viewName === 'library') renderLibrary();

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function recordVisit(modCode, title, url) {
    state.lastVisit = { module: modCode, title, url };
    writeJson(STORAGE.LAST_VISIT, state.lastVisit);
  }

  /* ---------------- 3. Home Cockpit & 20 Modules Grid ---------------- */
  function countDoneForModule(code) {
    const chaps = DATA.chapters[code] || [];
    let done = 0;
    chaps.forEach((c) => {
      if (state.doneChapters[`${code}:${c.file}`]) done++;
    });
    return done;
  }

  function renderHome() {
    const totalDone = Object.values(state.doneChapters).filter(Boolean).length;
    const totalCardsSeen = Object.keys(state.sm2).length;

    const kpiModules = document.getElementById('kpi-modules');
    const kpiChaps = document.getElementById('kpi-chapters');
    const kpiQuiz = document.getElementById('kpi-quizzes');
    const kpiSup = document.getElementById('kpi-supports');
    const progTxt = document.getElementById('hero-progress-text');

    if (kpiModules) kpiModules.textContent = String(DATA.modules.length);
    if (kpiChaps) kpiChaps.textContent = `${totalDone} / ${DATA.stats.chapters || 0}`;
    if (kpiQuiz) kpiQuiz.textContent = `${totalCardsSeen} / ${DATA.stats.quizzes || 0}`;
    if (kpiSup) kpiSup.textContent = String(DATA.stats.supports || 0);
    if (progTxt) {
      progTxt.textContent = `${totalDone} chapitres validés · ${getDueCardsCount()} flashcards dues aujourd'hui`;
    }

    const resTitle = document.getElementById('resume-title');
    const resBtn = document.getElementById('resume-btn');
    if (resTitle) resTitle.textContent = state.lastVisit.title || 'R1.05 — Bases de Données & Merise';
    if (resBtn) {
      resBtn.onclick = () => {
        setView('explorer', state.lastVisit.module || 'R1.05');
      };
    }

    const grid = document.getElementById('modules-grid');
    if (!grid) return;

    const filtered = DATA.modules.filter((m) => state.homeFilter === 'all' || m.pole === state.homeFilter);
    grid.innerHTML = filtered.map((m) => {
      const done = countDoneForModule(m.code);
      const total = m.chapterCount || 0;
      const pct = total ? Math.round((done / total) * 100) : 0;
      const qBtn = m.quizCount > 0
        ? `<button type="button" class="mod-btn-sub" data-open-quiz="${esc(m.code)}">QCM (${m.quizCount})</button>`
        : `<a class="mod-btn-sub" href="${esc(m.courseUrl)}" target="_blank" rel="noopener">Index ↗</a>`;

      return `
        <article class="module-card" style="--mod-color: ${esc(m.color)};">
          <div>
            <div class="module-top-row">
              <span class="mod-code-badge">${esc(m.code)}</span>
              <span class="mod-cat-label">${esc(m.category)} · ${done}/${total}</span>
            </div>
            <h3 class="mod-title">${esc(m.name)}</h3>
            <p class="mod-prof">${esc(m.prof)}</p>
            <p class="mod-desc">${formatRichText(m.description)}</p>
          </div>
          <div>
            <div class="mod-metrics">
              <span>${total} chapitres</span>
              ${m.quizCount ? `<span>${m.quizCount} QCM</span>` : ''}
              <span>${m.supportCount} docs</span>
            </div>
            <div class="mod-progress-track" aria-label="Progression ${pct}%">
              <div class="mod-progress-fill" style="width:${pct}%"></div>
            </div>
            <div class="mod-actions">
              <button type="button" class="mod-btn-main" data-open-mod="${esc(m.code)}">Explorer les chapitres</button>
              <a class="mod-btn-sub" href="${esc(m.revisionUrl)}" target="_blank" rel="noopener">Fiche ↗</a>
              ${qBtn}
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /* ---------------- 4. RemNote-Style Split Course Explorer ---------------- */
  function renderExplorer() {
    const rail = document.getElementById('explorer-rail');
    const main = document.getElementById('explorer-main');
    if (!rail || !main) return;

    rail.innerHTML = DATA.modules.map((m) => {
      const done = countDoneForModule(m.code);
      const active = m.code === state.selectedMod ? 'is-active' : '';
      return `
        <button type="button" class="rail-mod-btn ${active}" data-select-mod="${esc(m.code)}">
          <span class="rail-dot" style="background:${esc(m.color)}"></span>
          <span class="rail-mod-title"><strong>${esc(m.code)}</strong> · ${esc(m.name)}</span>
          <span class="rail-progress">${done}/${m.chapterCount}</span>
        </button>
      `;
    }).join('');

    const mod = DATA.modules.find((m) => m.code === state.selectedMod) || DATA.modules[0];
    if (!mod) return;

    const allChaps = DATA.chapters[mod.code] || [];
    const chaps = allChaps.filter((c) => {
      if (state.chapFilter === 'todo') return !state.doneChapters[`${mod.code}:${c.file}`];
      if (state.chapFilter === 'tdtp') return c.kind === 'TD' || c.kind === 'TP';
      return true;
    });
    const done = countDoneForModule(mod.code);

    const quizBtnHtml = mod.quizCount > 0
      ? `<button type="button" class="btn-solid" data-open-quiz="${esc(mod.code)}">QCM Examen (${mod.quizCount} Q)</button>
         <button type="button" class="btn-outline" data-open-fc="${esc(mod.code)}">Flashcards SM-2</button>`
      : '';

    const chapsHtml = chaps.map((c) => {
      const key = `${mod.code}:${c.file}`;
      const isDone = !!state.doneChapters[key];
      const secHtml = (c.sections || []).map((s) => `<span class="sec-tag">${esc(s)}</span>`).join('');
      return `
        <article class="surface-card chapter-card ${isDone ? 'is-done' : ''}">
          <div class="chapter-head">
            <div class="chapter-check-wrap">
              <button type="button" class="chapter-check" data-toggle-chap="${esc(key)}" aria-pressed="${isDone}" title="Marquer comme acquis">
                ${isDone ? '✓' : ''}
              </button>
              <div>
                <h3 class="chapter-title">${formatRichText(c.title)}</h3>
                <div class="chapter-meta">
                  <span>${esc(c.kind)}</span>
                  <span>· ${c.words} mots</span>
                  <span>· ~${c.readMin} min</span>
                </div>
              </div>
            </div>
            <div class="utility-cluster">
              <button type="button" class="btn-outline" data-preview-url="${esc(c.url)}" data-preview-title="${esc(c.title)}" data-preview-mod="${esc(mod.code)}">Lire ici</button>
              <a class="btn-solid" href="${esc(c.url)}" target="_blank" rel="noopener">Ouvrir ↗</a>
            </div>
          </div>
          ${c.summary ? `<p class="chapter-summary">${formatRichText(c.summary)}</p>` : ''}
          ${secHtml ? `<div class="chapter-sections">${secHtml}</div>` : ''}
        </article>
      `;
    }).join('');

    main.innerHTML = `
      <section class="surface-card module-banner" style="--mod-color:${esc(mod.color)}">
        <div class="module-top-row">
          <span class="mod-code-badge">${esc(mod.code)} · ${done} / ${allChaps.length} validés</span>
          <span class="mono" style="font-size:0.78rem;color:var(--ink-muted)">${mod.supportCount} documents officiels</span>
        </div>
        <h2>${esc(mod.name)}</h2>
        <p class="mod-prof">${esc(mod.prof)}</p>
        <p class="chapter-summary">${formatRichText(mod.description)}</p>
        <div class="module-banner-links">
          <a class="btn-outline" href="${esc(mod.revisionUrl)}" target="_blank" rel="noopener">Fiche Révision 3 niveaux ↗</a>
          <a class="btn-outline" href="${esc(mod.courseUrl)}" target="_blank" rel="noopener">Index du module ↗</a>
          ${quizBtnHtml}
        </div>
      </section>

      <section class="surface-card reader-drawer" id="reader-drawer">
        <div class="reader-toolbar">
          <strong id="reader-title">Lecteur intégré</strong>
          <div class="utility-cluster">
            <a class="btn-outline" id="reader-ext-link" href="#" target="_blank" rel="noopener">Plein écran ↗</a>
            <button type="button" class="btn-outline" id="reader-close-btn">Fermer ✕</button>
          </div>
        </div>
        <iframe class="reader-iframe" id="reader-iframe" title="Lecteur de cours intégré"></iframe>
      </section>

      <div class="section-head" style="margin:4px 0 0;">
        <div class="filter-pills">
          <button type="button" class="pill-btn ${state.chapFilter === 'all' ? 'is-active' : ''}" data-chap-filter="all">Tous (${allChaps.length})</button>
          <button type="button" class="pill-btn ${state.chapFilter === 'todo' ? 'is-active' : ''}" data-chap-filter="todo">À étudier (${allChaps.length - done})</button>
          <button type="button" class="pill-btn ${state.chapFilter === 'tdtp' ? 'is-active' : ''}" data-chap-filter="tdtp">TD / TP</button>
        </div>
      </div>

      ${chapsHtml || '<div class="surface-card chapter-card"><strong>Aucun chapitre restant dans ce filtre — bien joué.</strong></div>'}
    `;
  }

  /* ---------------- 5. SM-2 Spaced Repetition Flashcards ---------------- */
  function isDue(qId) {
    const rec = state.sm2[qId];
    if (!rec) return true;
    return rec.nextDue <= Date.now();
  }

  function getDueCardsCount() {
    return (DATA.quizzes || []).filter((q) => isDue(q.id)).length;
  }

  function buildFlashcardDeck() {
    let list = DATA.quizzes || [];
    if (state.fcModule === 'DUE') {
      list = list.filter((q) => isDue(q.id));
    } else if (state.fcModule !== 'ALL') {
      list = list.filter((q) => q.module === state.fcModule);
    }
    state.fcDeck = list.slice();
    state.fcIdx = 0;
  }

  function rateSm2(qId, quality) {
    const now = Date.now();
    const cur = state.sm2[qId] || { interval: 0, reps: 0, ef: 2.5 };
    let interval = 1;
    let reps = cur.reps;
    let ef = cur.ef;

    if (quality < 2) {
      reps = 0;
      interval = 0; // Revoir tout de suite / aujourd'hui
    } else {
      reps += 1;
      if (reps === 1) interval = 1;
      else if (reps === 2) interval = 3;
      else interval = Math.max(4, Math.round(cur.interval * ef));
      ef = Math.max(1.3, ef + (0.1 - (4 - quality) * (0.08 + (4 - quality) * 0.02)));
    }

    const nextDue = interval === 0 ? now + 5 * 60 * 1000 : now + interval * 24 * 60 * 60 * 1000;
    state.sm2[qId] = { interval, reps, ef: Number(ef.toFixed(2)), nextDue };
    writeJson(STORAGE.SM2, state.sm2);

    if (state.fcIdx + 1 < state.fcDeck.length) {
      state.fcIdx++;
    } else {
      buildFlashcardDeck();
    }
    renderFlashcards();
  }

  function renderFlashcards() {
    if (!state.fcDeck.length && state.view === 'flashcards') {
      buildFlashcardDeck();
    }
    const modsWithQuiz = Array.from(new Set((DATA.quizzes || []).map((q) => q.module)));
    const pills = [
      `<button type="button" class="pill-btn ${state.fcModule === 'DUE' ? 'is-active' : ''}" data-fc-mod="DUE">À réviser (${getDueCardsCount()})</button>`,
      `<button type="button" class="pill-btn ${state.fcModule === 'ALL' ? 'is-active' : ''}" data-fc-mod="ALL">Toutes (${DATA.quizzes.length})</button>`,
      ...modsWithQuiz.map((m) => `<button type="button" class="pill-btn ${state.fcModule === m ? 'is-active' : ''}" data-fc-mod="${esc(m)}">${esc(m)}</button>`)
    ].join('');

    const host = document.getElementById('flashcards-host');
    if (!host) return;

    const card = state.fcDeck[state.fcIdx];
    if (!card) {
      host.innerHTML = `
        <div class="section-head"><div><h2>Répétition Espacée SM-2</h2><p>Entraînement par rappel actif issu des ${DATA.quizzes.length} questions vérifiées.</p></div></div>
        <div class="filter-pills">${pills}</div>
        <div class="surface-card flashcard-stage">
          <div>
            <h3>Session terminée : 0 carte due pour ce filtre</h3>
            <p class="chapter-summary">Choisis "Toutes (${DATA.quizzes.length})" ou une matière précise pour continuer à t'entraîner librement.</p>
          </div>
          <button type="button" class="btn-solid" data-fc-mod="ALL">Réviser tout le paquet (${DATA.quizzes.length} cartes)</button>
        </div>
      `;
      return;
    }

    const modInfo = DATA.modules.find((m) => m.code === card.module);
    const accent = (modInfo && modInfo.color) || '#287271';
    const ansText = card.options[card.correctIdx] || '';

    host.innerHTML = `
      <div class="section-head">
        <div>
          <h2>Répétition Espacée SM-2 (Active Recall)</h2>
          <p>Rappelle la réponse mentalement avant de retourner la carte (barre d'espace ou clic).</p>
        </div>
        <button type="button" class="btn-outline" id="fc-shuffle-btn">Mélanger</button>
      </div>

      <div class="filter-pills">${pills}</div>

      <div class="surface-card fc-status-bar">
        <span>Carte <strong>${state.fcIdx + 1} / ${state.fcDeck.length}</strong> · ${esc(card.module)}</span>
        <span class="mono">${Object.keys(state.sm2).length} cartes enregistrées en SM-2</span>
      </div>

      <div class="surface-card flashcard-stage" id="fc-card" style="--card-accent:${esc(accent)}">
        <div>
          <div class="chapter-meta">
            <span class="mod-code-badge" style="background:${esc(accent)}">${esc(card.module)}</span>
            <span>${esc(card.chapter)}</span>
            <span>· ${esc(card.prof)}</span>
          </div>
          <p class="fc-front-q">${formatRichText(card.q)}</p>
        </div>

        <div class="fc-answer-box" id="fc-answer-box">
          <div class="fc-answer-title">Réponse exacte : ${formatRichText(ansText)}</div>
          ${card.explanation ? `<div>${formatRichText(card.explanation)}</div>` : ''}
          ${card.pitfall ? `<div class="fc-pitfall"><strong>Piège d'examen :</strong> ${formatRichText(card.pitfall)}</div>` : ''}
        </div>

        <div id="fc-controls">
          <button type="button" class="btn-solid" id="fc-reveal-btn" style="width:100%">Afficher la réponse (Espace)</button>
          <div class="sm2-actions" id="fc-rate-row" style="display:none;margin-top:12px;">
            <button type="button" class="sm2-btn" data-sm2-rate="1">1 · À revoir<small>&lt; 10 min</small></button>
            <button type="button" class="sm2-btn" data-sm2-rate="2">2 · Difficile<small>1 jour</small></button>
            <button type="button" class="sm2-btn" data-sm2-rate="3">3 · Bien<small>3 à 6 j</small></button>
            <button type="button" class="sm2-btn" data-sm2-rate="4">4 · Maîtrisé<small>7 j+</small></button>
          </div>
        </div>
      </div>
    `;
  }

  /* ---------------- 6. Exam QCM Simulator ---------------- */
  function startQuizSession() {
    let pool = (DATA.quizzes || []).slice();
    if (state.quizModule === 'WRONG') {
      pool = pool.filter((q) => state.wrongIds.includes(q.id));
    } else if (state.quizModule !== 'ALL') {
      pool = pool.filter((q) => q.module === state.quizModule);
    }
    // Fisher-Yates shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const limit = state.quizMode === 'ALL' ? pool.length : Number(state.quizMode) || 10;
    state.quizDeck = pool.slice(0, limit);
    state.quizIdx = 0;
    state.quizScore = 0;
    state.quizAnswered = false;
  }

  function renderQuiz() {
    if (!state.quizDeck.length) startQuizSession();
    const host = document.getElementById('quiz-host');
    if (!host) return;

    const mods = Array.from(new Set((DATA.quizzes || []).map((q) => q.module)));
    const controlsHtml = `
      <div class="surface-card quiz-controls">
        <div class="utility-cluster" style="flex-wrap:wrap;">
          <select class="quiz-select" id="quiz-mod-sel" aria-label="Choisir le module du QCM">
            <option value="ALL" ${state.quizModule === 'ALL' ? 'selected' : ''}>Toutes matières (${DATA.quizzes.length} Q)</option>
            <option value="WRONG" ${state.quizModule === 'WRONG' ? 'selected' : ''}>Mes erreurs (${state.wrongIds.length})</option>
            ${mods.map((m) => `<option value="${esc(m)}" ${state.quizModule === m ? 'selected' : ''}>${esc(m)}</option>`).join('')}
          </select>
          <select class="quiz-select" id="quiz-len-sel" aria-label="Nombre de questions">
            <option value="10" ${state.quizMode === '10' ? 'selected' : ''}>Express · 10 Q</option>
            <option value="25" ${state.quizMode === '25' ? 'selected' : ''}>Complet · 25 Q</option>
            <option value="ALL" ${state.quizMode === 'ALL' ? 'selected' : ''}>Tout le paquet</option>
          </select>
          <button type="button" class="btn-solid" id="quiz-restart-btn">Nouvelle série</button>
        </div>
        <a class="btn-outline" href="quiz/index.html" target="_blank" rel="noopener">App QCM plein écran ↗</a>
      </div>
    `;

    if (!state.quizDeck.length) {
      host.innerHTML = `${controlsHtml}<div class="surface-card quiz-stage"><h3>Aucune question dans ce filtre</h3><p class="chapter-summary">Aucune erreur enregistrée pour le moment. Lance une série de 10 questions !</p></div>`;
      return;
    }

    if (state.quizIdx >= state.quizDeck.length) {
      const pct = Math.round((state.quizScore / state.quizDeck.length) * 100);
      host.innerHTML = `
        ${controlsHtml}
        <div class="surface-card quiz-stage">
          <h2>Bilan de la session : ${state.quizScore} / ${state.quizDeck.length} (${pct}%)</h2>
          <p class="chapter-summary">Les questions manquées ont été ajoutées au filtre "Mes erreurs" et priorisées dans tes flashcards SM-2.</p>
          <div class="hero-actions">
            <button type="button" class="btn-solid" id="quiz-replay-btn">Relancer une série</button>
            ${state.wrongIds.length ? '<button type="button" class="btn-outline" id="quiz-review-wrong">Revoir mes erreurs</button>' : ''}
          </div>
        </div>
      `;
      return;
    }

    const q = state.quizDeck[state.quizIdx];
    const letters = ['A', 'B', 'C', 'D', 'E'];
    host.innerHTML = `
      ${controlsHtml}
      <div class="surface-card fc-status-bar">
        <span>Question <strong>${state.quizIdx + 1} / ${state.quizDeck.length}</strong> · ${esc(q.module)}</span>
        <span class="mono">Score : <strong>${state.quizScore}</strong></span>
      </div>
      <div class="surface-card quiz-stage">
        <div>
          <div class="chapter-meta">
            <span class="mod-code-badge" style="background:var(--primary)">${esc(q.module)}</span>
            <span>${esc(q.chapter)}</span>
            <span>· ${esc(q.prof)}</span>
          </div>
          <h3 class="fc-front-q">${formatRichText(q.q)}</h3>
        </div>
        <div class="quiz-options">
          ${q.options.map((opt, idx) => `
            <button type="button" class="quiz-opt-btn" data-quiz-pick="${idx}">
              <span class="quiz-opt-key">${letters[idx] || idx + 1}</span>
              <span>${formatRichText(opt)}</span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="quiz-feedback">
          <strong id="quiz-fb-head"></strong>
          <div>${formatRichText(q.explanation)}</div>
          ${q.pitfall ? `<div class="fc-pitfall"><strong>Piège d'examen :</strong> ${formatRichText(q.pitfall)}</div>` : ''}
          <div><button type="button" class="btn-solid" id="quiz-next-btn">Question suivante →</button></div>
        </div>
      </div>
    `;
  }

  /* ---------------- 7. Official PDF Library ---------------- */
  function renderLibrary() {
    const host = document.getElementById('library-host');
    if (!host) return;

    const q = state.libQuery.trim().toLowerCase();
    const mods = Array.from(new Set((DATA.supports || []).map((d) => d.module)));
    const items = (DATA.supports || []).filter((d) => {
      if (state.libModule !== 'ALL' && d.module !== state.libModule) return false;
      if (state.libExt !== 'ALL' && d.ext !== state.libExt) return false;
      if (q && !d.title.toLowerCase().includes(q) && !d.module.toLowerCase().includes(q)) return false;
      return true;
    });

    const shown = items.slice(0, 80);
    const listHtml = shown.map((d) => `
      <div class="surface-card doc-row">
        <div class="doc-row-main">
          <strong>${esc(d.title)}</strong>
          <span>${esc(d.module)} · ${esc(d.ext)} · ${esc(d.sizeLabel)}</span>
        </div>
        <a class="btn-outline" href="${esc(d.path)}" target="_blank" rel="noopener">Ouvrir ${esc(d.ext)} ↗</a>
      </div>
    `).join('');

    host.innerHTML = `
      <div class="section-head">
        <div>
          <h2>Supports Enseignants &amp; PDFs Vérifiés (${items.length})</h2>
          <p>Tous les polycopiés et diaporamas présents sur le serveur (aucun lien cassé).</p>
        </div>
        <a class="btn-outline" href="documents.html" target="_blank" rel="noopener">Vue catalogue complet ↗</a>
      </div>

      <div class="surface-card" style="padding:16px;display:grid;gap:12px;">
        <input type="search" class="search-input" id="lib-search-input" placeholder="Filtrer par titre ou matière (ex: Merise, Linux, Bruyère, S1.01)..." value="${esc(state.libQuery)}" aria-label="Rechercher un document" />
        <div class="filter-pills">
          <button type="button" class="pill-btn ${state.libModule === 'ALL' ? 'is-active' : ''}" data-lib-mod="ALL">Tous (${DATA.supports.length})</button>
          ${mods.map((m) => `<button type="button" class="pill-btn ${state.libModule === m ? 'is-active' : ''}" data-lib-mod="${esc(m)}">${esc(m)}</button>`).join('')}
        </div>
      </div>

      <div class="library-grid">${listHtml || '<div class="surface-card doc-row">Aucun document ne correspond à cette recherche.</div>'}</div>
    `;
  }

  /* ---------------- 8. Global Ctrl+K Search ---------------- */
  function runGlobalSearch(query) {
    const resBox = document.getElementById('search-results');
    if (!resBox) return;
    const q = query.trim().toLowerCase();
    const hits = [];

    if (!q) {
      DATA.modules.slice(0, 6).forEach((m) => {
        hits.push({ label: `${m.code} — ${m.name}`, meta: `${m.chapterCount} chapitres`, action: () => setView('explorer', m.code) });
      });
    } else {
      DATA.modules.forEach((m) => {
        if ((m.code + ' ' + m.name + ' ' + m.prof).toLowerCase().includes(q)) {
          hits.push({ label: `${m.code} — ${m.name}`, meta: 'Module', action: () => setView('explorer', m.code) });
        }
      });
      Object.entries(DATA.chapters).forEach(([code, chaps]) => {
        chaps.forEach((c) => {
          const hay = (code + ' ' + c.title + ' ' + (c.sections || []).join(' ')).toLowerCase();
          if (hay.includes(q)) {
            hits.push({
              label: `${code} · ${c.title}`,
              meta: `Chapitre (~${c.readMin} min)`,
              action: () => {
                setView('explorer', code);
                openPreview(c.url, c.title, code);
              }
            });
          }
        });
      });
      DATA.supports.forEach((d) => {
        if ((d.module + ' ' + d.title).toLowerCase().includes(q)) {
          hits.push({ label: d.title, meta: `${d.module} · ${d.ext}`, href: d.path });
        }
      });
    }

    resBox.innerHTML = hits.slice(0, 14).map((h, i) => (
      h.href
        ? `<a class="search-hit" href="${esc(h.href)}" target="_blank" rel="noopener"><strong>${esc(h.label)}</strong><span class="mono" style="font-size:0.74rem;color:var(--ink-muted)">${esc(h.meta)} ↗</span></a>`
        : `<button type="button" class="search-hit" data-search-hit="${i}"><strong>${esc(h.label)}</strong><span class="mono" style="font-size:0.74rem;color:var(--ink-muted)">${esc(h.meta)}</span></button>`
    )).join('') || '<div class="chapter-summary">Aucun résultat trouvé.</div>';

    window.__KAI_SEARCH_HITS__ = hits;
  }

  function openPreview(url, title, modCode) {
    const drawer = document.getElementById('reader-drawer');
    const frame = document.getElementById('reader-iframe');
    const titleEl = document.getElementById('reader-title');
    const extEl = document.getElementById('reader-ext-link');
    if (drawer && frame) {
      if (titleEl) titleEl.textContent = title;
      if (extEl) extEl.href = url;
      frame.src = url;
      drawer.classList.add('is-open');
      drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    recordVisit(modCode, `${modCode} · ${title}`, url);
  }

  /* ---------------- 9. Pomodoro Header Timer ---------------- */
  let pomoSecs = 25 * 60;
  let pomoTimer = null;

  function updatePomoUI() {
    const btn = document.getElementById('pomo-btn');
    if (!btn) return;
    const mm = String(Math.floor(pomoSecs / 60)).padStart(2, '0');
    const ss = String(pomoSecs % 60).padStart(2, '0');
    btn.textContent = `Pomodoro ${mm}:${ss}`;
    btn.classList.toggle('is-running', !!pomoTimer);
  }

  /* ---------------- 10. Event Delegation ---------------- */
  function initEvents() {
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!target || !target.closest) return;

      const navBtn = target.closest('[data-view]');
      if (navBtn) {
        setView(navBtn.dataset.view);
        return;
      }

      const filterBtn = target.closest('[data-home-filter]');
      if (filterBtn) {
        state.homeFilter = filterBtn.dataset.homeFilter;
        document.querySelectorAll('[data-home-filter]').forEach((b) => b.classList.toggle('is-active', b === filterBtn));
        renderHome();
        return;
      }

      const openMod = target.closest('[data-open-mod], [data-select-mod]');
      if (openMod) {
        const code = openMod.dataset.openMod || openMod.dataset.selectMod;
        setView('explorer', code);
        return;
      }

      const openFc = target.closest('[data-open-fc]');
      if (openFc) {
        state.fcModule = openFc.dataset.openFc;
        buildFlashcardDeck();
        setView('flashcards');
        return;
      }

      const openQuiz = target.closest('[data-open-quiz]');
      if (openQuiz) {
        state.quizModule = openQuiz.dataset.openQuiz;
        startQuizSession();
        setView('quiz');
        return;
      }

      const chapFilter = target.closest('[data-chap-filter]');
      if (chapFilter) {
        state.chapFilter = chapFilter.dataset.chapFilter;
        renderExplorer();
        return;
      }

      const toggleChap = target.closest('[data-toggle-chap]');
      if (toggleChap) {
        const key = toggleChap.dataset.toggleChap;
        state.doneChapters[key] = !state.doneChapters[key];
        writeJson(STORAGE.DONE_CHAPS, state.doneChapters);
        renderExplorer();
        return;
      }

      const prevBtn = target.closest('[data-preview-url]');
      if (prevBtn) {
        openPreview(prevBtn.dataset.previewUrl, prevBtn.dataset.previewTitle, prevBtn.dataset.previewMod);
        return;
      }

      if (target.closest('#reader-close-btn')) {
        const drawer = document.getElementById('reader-drawer');
        const frame = document.getElementById('reader-iframe');
        if (drawer) drawer.classList.remove('is-open');
        if (frame) frame.src = 'about:blank';
        return;
      }

      const fcModBtn = target.closest('[data-fc-mod]');
      if (fcModBtn) {
        state.fcModule = fcModBtn.dataset.fcMod;
        buildFlashcardDeck();
        renderFlashcards();
        return;
      }

      if (target.closest('#fc-reveal-btn')) {
        const cardEl = document.getElementById('fc-card');
        const rateRow = document.getElementById('fc-rate-row');
        const revBtn = document.getElementById('fc-reveal-btn');
        if (cardEl) cardEl.classList.add('is-flipped');
        if (rateRow) rateRow.style.display = 'grid';
        if (revBtn) revBtn.style.display = 'none';
        return;
      }

      if (target.closest('#fc-shuffle-btn')) {
        state.fcDeck.sort(() => Math.random() - 0.5);
        state.fcIdx = 0;
        renderFlashcards();
        return;
      }

      const sm2Btn = target.closest('[data-sm2-rate]');
      if (sm2Btn) {
        const card = state.fcDeck[state.fcIdx];
        if (card) rateSm2(card.id, Number(sm2Btn.dataset.sm2Rate));
        return;
      }

      const qPick = target.closest('[data-quiz-pick]');
      if (qPick && !state.quizAnswered) {
        state.quizAnswered = true;
        const pickIdx = Number(qPick.dataset.quizPick);
        const q = state.quizDeck[state.quizIdx];
        const ok = pickIdx === q.correctIdx;
        if (ok) {
          state.quizScore++;
          state.wrongIds = state.wrongIds.filter((id) => id !== q.id);
        } else if (!state.wrongIds.includes(q.id)) {
          state.wrongIds.push(q.id);
        }
        writeJson(STORAGE.WRONG_Q, state.wrongIds);

        document.querySelectorAll('[data-quiz-pick]').forEach((b) => {
          b.disabled = true;
          const bi = Number(b.dataset.quizPick);
          if (bi === q.correctIdx) b.classList.add('is-correct');
          else if (bi === pickIdx && !ok) b.classList.add('is-wrong');
        });
        const fb = document.getElementById('quiz-feedback');
        const fbHead = document.getElementById('quiz-fb-head');
        if (fbHead) fbHead.textContent = ok ? 'Bonne réponse ✓' : 'Réponse incorrecte — voici l\'explication :';
        if (fb) fb.classList.add('is-visible');
        return;
      }

      if (target.closest('#quiz-next-btn')) {
        state.quizIdx++;
        state.quizAnswered = false;
        renderQuiz();
        return;
      }

      if (target.closest('#quiz-restart-btn') || target.closest('#quiz-replay-btn')) {
        startQuizSession();
        renderQuiz();
        return;
      }

      if (target.closest('#quiz-review-wrong')) {
        state.quizModule = 'WRONG';
        startQuizSession();
        renderQuiz();
        return;
      }

      const libMod = target.closest('[data-lib-mod]');
      if (libMod) {
        state.libModule = libMod.dataset.libMod;
        renderLibrary();
        return;
      }

      const hitBtn = target.closest('[data-search-hit]');
      if (hitBtn) {
        const hit = (window.__KAI_SEARCH_HITS__ || [])[Number(hitBtn.dataset.searchHit)];
        document.getElementById('search-modal').classList.remove('is-open');
        if (hit && hit.action) hit.action();
        return;
      }

      const tintBtn = target.closest('[data-tint-choice]');
      if (tintBtn) {
        state.prefs.tint = tintBtn.dataset.tintChoice;
        applyPrefs();
      }
    });

    document.addEventListener('change', (e) => {
      if (e.target && e.target.id === 'quiz-mod-sel') {
        state.quizModule = e.target.value;
        startQuizSession();
        renderQuiz();
      } else if (e.target && e.target.id === 'quiz-len-sel') {
        state.quizMode = e.target.value;
        startQuizSession();
        renderQuiz();
      }
    });

    document.addEventListener('input', (e) => {
      if (e.target && e.target.id === 'lib-search-input') {
        state.libQuery = e.target.value;
        renderLibrary();
        const inp = document.getElementById('lib-search-input');
        if (inp) {
          inp.focus();
          inp.setSelectionRange(state.libQuery.length, state.libQuery.length);
        }
      } else if (e.target && e.target.id === 'global-search-input') {
        runGlobalSearch(e.target.value);
      } else if (e.target && e.target.id === 'pref-size-slider') {
        state.prefs.fontSize = Number(e.target.value) || 16;
        applyPrefs();
      }
    });

    // Modals & Toolbar controls
    const searchModal = document.getElementById('search-modal');
    const prefsModal = document.getElementById('prefs-modal');
    document.getElementById('open-search-btn')?.addEventListener('click', () => {
      searchModal.classList.add('is-open');
      runGlobalSearch('');
      document.getElementById('global-search-input')?.focus();
    });
    document.getElementById('close-search-btn')?.addEventListener('click', () => searchModal.classList.remove('is-open'));
    searchModal?.addEventListener('click', (e) => { if (e.target === searchModal) searchModal.classList.remove('is-open'); });

    document.getElementById('open-prefs-btn')?.addEventListener('click', () => prefsModal.classList.add('is-open'));
    document.getElementById('close-prefs-btn')?.addEventListener('click', () => prefsModal.classList.remove('is-open'));
    prefsModal?.addEventListener('click', (e) => { if (e.target === prefsModal) prefsModal.classList.remove('is-open'); });

    document.getElementById('pref-bionic')?.addEventListener('click', () => {
      state.prefs.bionic = !state.prefs.bionic;
      applyPrefs();
      setView(state.view);
    });
    document.getElementById('pref-ruler')?.addEventListener('click', () => {
      state.prefs.ruler = !state.prefs.ruler;
      applyPrefs();
    });
    document.getElementById('pref-font')?.addEventListener('click', () => {
      state.prefs.font = state.prefs.font === 'lexend' ? 'jakarta' : 'lexend';
      applyPrefs();
    });

    document.getElementById('pomo-btn')?.addEventListener('click', () => {
      if (pomoTimer) {
        clearInterval(pomoTimer);
        pomoTimer = null;
      } else {
        pomoTimer = setInterval(() => {
          pomoSecs = pomoSecs > 0 ? pomoSecs - 1 : 25 * 60;
          updatePomoUI();
        }, 1000);
      }
      updatePomoUI();
    });

    // Keyboard shortcuts (Ctrl+K, Escape, Space on flashcards)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchModal.classList.add('is-open');
        runGlobalSearch('');
        document.getElementById('global-search-input')?.focus();
      } else if (e.key === 'Escape') {
        searchModal?.classList.remove('is-open');
        prefsModal?.classList.remove('is-open');
      } else if (e.code === 'Space' && state.view === 'flashcards' && document.activeElement?.tagName !== 'INPUT') {
        const revBtn = document.getElementById('fc-reveal-btn');
        if (revBtn && revBtn.style.display !== 'none') {
          e.preventDefault();
          revBtn.click();
        }
      }
    });

    const rulerEl = document.getElementById('reading-ruler');
    document.addEventListener('pointermove', (e) => {
      if (state.prefs.ruler && rulerEl) {
        rulerEl.style.top = `${Math.max(56, e.clientY - 18)}px`;
      }
    }, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const badgeChaps = document.getElementById('nav-count-chaps');
    const badgeQuiz = document.getElementById('nav-count-quiz');
    const badgeDocs = document.getElementById('nav-count-docs');
    if (badgeChaps) badgeChaps.textContent = String(DATA.stats.chapters || 116);
    if (badgeQuiz) badgeQuiz.textContent = String(DATA.stats.quizzes || 235);
    if (badgeDocs) badgeDocs.textContent = String(DATA.stats.supports || 215);

    applyPrefs();
    updatePomoUI();
    initEvents();

    const hash = (window.location.hash || '').replace('#', '').toLowerCase();
    const hashMap = {
      cours: 'explorer',
      revisions: 'explorer',
      explorer: 'explorer',
      flashcards: 'flashcards',
      quiz: 'quiz',
      bibliotheque: 'library',
      library: 'library',
      supports: 'library'
    };
    setView(hashMap[hash] || 'home');
  });
})();
