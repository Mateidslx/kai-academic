/* ==========================================================================
   KAI STUDY v4 — EXPLORATEUR, ATELIER SOCRATIQUE, ANTIVIBE DEEP DIVE & SM-2
   ========================================================================== */

(function () {
  'use strict';

  const DATA = window.__KAI_STUDY_DATA__ || {
    stats: {},
    modules: [],
    chapters: {},
    quizzes: [],
    supports: [],
    deepDives: []
  };

  const STORAGE = {
    DONE_CHAPS: 'kai_study_v2_done_chapters',
    SM2: 'kai_study_v2_sm2',
    LAST_VISIT: 'kai_study_v2_last_visit',
    PREFS: 'kai_study_v2_prefs',
    WRONG_Q: 'kai_study_v2_wrong_q',
    MASTERY: 'kai_study_v4_mastery',
    AHAS: 'kai_study_v4_ahas',
    OPEN_Q: 'kai_study_v4_open_q',
    ANTIVIBE_PREFS: 'kai_study_v4_antivibe_prefs'
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
    mastery: readJson(STORAGE.MASTERY, {}),
    ahas: readJson(STORAGE.AHAS, []),
    openQuestions: readJson(STORAGE.OPEN_Q, []),
    avPrefs: readJson(STORAGE.ANTIVIBE_PREFS, {
      mode: 'socratic',
      depth: 'mid',
      output: 'compact',
      skipMastered: false
    }),
    socModule: 'ALL',
    socDeck: [],
    socIdx: 0,
    socHintLevel: 0,
    socRevealed: false,
    ddModule: 'ALL',
    ddDeck: [],
    ddIdx: 0,
    ddRevealed: false,
    predictions: {},
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

  function todayIso() {
    return new Date().toISOString().slice(0, 10);
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
    else if (viewName === 'socratic') renderSocratic();
    else if (viewName === 'flashcards') renderFlashcards();
    else if (viewName === 'quiz') renderQuiz();
    else if (viewName === 'library') renderLibrary();

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function recordVisit(modCode, title, url) {
    state.lastVisit = { module: modCode, title, url };
    writeJson(STORAGE.LAST_VISIT, state.lastVisit);
  }

  /* ---------------- 3. Home Ledger & 20 Modules Grid ---------------- */
  function countDoneForModule(code) {
    const chaps = DATA.chapters[code] || [];
    let done = 0;
    chaps.forEach((c) => {
      if (state.doneChapters[`${code}:${c.file}`]) done++;
    });
    return done;
  }

  function countMasteredTotal() {
    const masteredIds = new Set();
    Object.entries(state.mastery).forEach(([id, rec]) => {
      if (rec && rec.status === 'mastered') masteredIds.add(id);
    });
    Object.entries(state.sm2).forEach(([id, rec]) => {
      if (rec && rec.reps >= 2) masteredIds.add(id);
    });
    return masteredIds.size;
  }

  function renderHome() {
    const totalDone = Object.values(state.doneChapters).filter(Boolean).length;
    const totalMastered = countMasteredTotal();

    const kpiModules = document.getElementById('kpi-modules');
    const kpiChaps = document.getElementById('kpi-chapters');
    const kpiMastery = document.getElementById('kpi-mastery');
    const kpiSup = document.getElementById('kpi-supports');
    const progTxt = document.getElementById('hero-progress-text');

    if (kpiModules) kpiModules.textContent = String(DATA.modules.length);
    if (kpiChaps) kpiChaps.textContent = `${totalDone} / ${DATA.stats.chapters || 0}`;
    if (kpiMastery) kpiMastery.textContent = `${totalMastered} / ${DATA.stats.quizzes || 0}`;
    if (kpiSup) kpiSup.textContent = String(DATA.stats.supports || 0);
    if (progTxt) {
      progTxt.textContent = `${totalDone} chapitres validés · ${getDueCardsCount()} cartes SM-2 dues · ${state.ahas.length} déclics notés`;
    }

    const resTitle = document.getElementById('resume-title');
    const resBtn = document.getElementById('resume-btn');
    if (resTitle) resTitle.textContent = state.lastVisit.title || 'R1.05 — Bases de Données & Merise';
    if (resBtn) {
      resBtn.onclick = () => setView('explorer', state.lastVisit.module || 'R1.05');
    }

    const grid = document.getElementById('modules-grid');
    if (!grid) return;

    const filtered = DATA.modules.filter((m) => state.homeFilter === 'all' || m.pole === state.homeFilter);
    grid.innerHTML = filtered.map((m) => {
      const done = countDoneForModule(m.code);
      const total = m.chapterCount || 0;
      const pct = total ? Math.round((done / total) * 100) : 0;
      const qBtn = m.quizCount > 0
        ? `<button type="button" class="mod-btn-sub" data-open-quiz="${esc(m.code)}">QCM (${m.quizCount})</button>
           <button type="button" class="mod-btn-sub" data-open-socratic="${esc(m.code)}">Socratique</button>`
        : `<a class="mod-btn-sub" href="${esc(m.courseUrl)}" target="_blank" rel="noopener">Index ↗</a>`;

      return `
        <article class="module-row-card" style="--mod-color:${esc(m.color)};">
          <div>
            <div class="module-top-row">
              <span class="mod-code-badge">${esc(m.code)}</span>
              <span class="mod-cat-label">${esc(m.category)} · ${done}/${total}</span>
            </div>
            <h3 class="mod-title">${esc(m.name)}</h3>
            <p class="mod-prof">${esc(m.prof)}</p>
            <p class="mod-desc">${formatRichText(m.description)}</p>
          </div>
          <div class="mod-footer">
            <div class="mod-metrics">
              <span>${total} chapitres · ${m.supportCount} docs</span>
              <span>${pct}% parcouru</span>
            </div>
            <div class="mod-progress-track" aria-label="Progression ${pct}%">
              <div class="mod-progress-fill" style="width:${pct}%"></div>
            </div>
            <div class="mod-actions">
              <button type="button" class="mod-btn-main" data-open-mod="${esc(m.code)}">Chapitres</button>
              <a class="mod-btn-sub" href="${esc(m.revisionUrl)}" target="_blank" rel="noopener">Fiche ↗</a>
              ${qBtn}
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /* ---------------- 4. Split Course Explorer & Inline Reader ---------------- */
  function renderExplorer() {
    const rail = document.getElementById('explorer-rail');
    const main = document.getElementById('explorer-main');
    if (!rail || !main) return;

    rail.innerHTML = DATA.modules.map((m) => {
      const done = countDoneForModule(m.code);
      const active = m.code === state.selectedMod ? 'is-active' : '';
      return `
        <button type="button" class="rail-mod-btn ${active}" data-select-mod="${esc(m.code)}" style="--mod-dot:${esc(m.color)}" title="${esc(m.code + ' · ' + m.name)}">
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
    const modDdCount = (DATA.deepDives || []).filter((d) => d.module === mod.code).length;

    const quizBtnHtml = mod.quizCount > 0
      ? `<button type="button" class="btn-solid" data-open-quiz="${esc(mod.code)}">QCM Examen (${mod.quizCount} Q)</button>
         <button type="button" class="btn-outline" data-open-fc="${esc(mod.code)}">Flashcards SM-2</button>
         <button type="button" class="btn-outline" data-open-socratic="${esc(mod.code)}">Atelier Socratique</button>`
      : (modDdCount > 0 ? `<button type="button" class="btn-outline" data-open-dd="${esc(mod.code)}">Deep Dive Code (${modDdCount})</button>` : '');

    const chapsHtml = chaps.map((c) => {
      const key = `${mod.code}:${c.file}`;
      const isDone = !!state.doneChapters[key];
      const secHtml = (c.sections || []).slice(0, 4).map((s) => `<span class="sec-inline">${esc(s)}</span>`).join('');
      return `
        <article class="chapter-row ${isDone ? 'is-done' : ''}">
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
          ${secHtml ? `<div class="chapter-sections-line">${secHtml}</div>` : ''}
        </article>
      `;
    }).join('');

    main.innerHTML = `
      <section class="module-banner" style="--mod-color:${esc(mod.color)}">
        <div class="module-top-row">
          <span class="mod-code-badge">${esc(mod.code)} · ${done} / ${allChaps.length} validés</span>
          <span class="mono" style="font-size:0.76rem;color:var(--ink-muted)">${mod.supportCount} documents officiels</span>
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

      <section class="reader-drawer" id="reader-drawer">
        <div class="reader-toolbar">
          <strong id="reader-title">Lecteur intégré</strong>
          <div class="utility-cluster">
            <a class="btn-outline" id="reader-ext-link" href="#" target="_blank" rel="noopener">Plein écran ↗</a>
            <button type="button" class="btn-outline" id="reader-close-btn">Fermer ✕</button>
          </div>
        </div>
        <iframe class="reader-iframe" id="reader-iframe" title="Lecteur de cours intégré"></iframe>
      </section>

      <div class="section-head" style="margin:2px 0;">
        <div class="filter-pills">
          <button type="button" class="pill-btn ${state.chapFilter === 'all' ? 'is-active' : ''}" data-chap-filter="all">Tous (${allChaps.length})</button>
          <button type="button" class="pill-btn ${state.chapFilter === 'todo' ? 'is-active' : ''}" data-chap-filter="todo">À étudier (${allChaps.length - done})</button>
          <button type="button" class="pill-btn ${state.chapFilter === 'tdtp' ? 'is-active' : ''}" data-chap-filter="tdtp">TD / TP</button>
        </div>
      </div>

      <div class="chapters-ledger">
        ${chapsHtml || '<div class="chapter-row"><strong>Aucun chapitre restant dans ce filtre.</strong></div>'}
      </div>
    `;
  }

  /* ---------------- 5. Socratic Tutor & AntiVibe Deep Dive ---------------- */
  function classifySocraticPattern(q) {
    const text = `${q.q} ${q.pitfall || ''}`.toLowerCase();
    if (/(erreur|piège|échoue|null|dépassement|boucle infinie|crash|faux|interdit|fuite)/.test(text)) {
      return {
        label: "Cas d'erreur",
        framing: 'Quel cas limite ou erreur de manipulation déclenche le piège ici ?'
      };
    }
    if (/(différence|compar|contrairement|plutôt que|entre |versus|vs )/.test(text)) {
      return {
        label: 'Comparaison',
        framing: 'En quoi ces deux mécanismes diffèrent-ils concrètement à l\'exécution ?'
      };
    }
    if (/(affiche|valeur|résultat|complexité|exécution|étape|convertir|binaire|matrice|sortie|trace)/.test(text)) {
      return {
        label: 'Trace',
        framing: 'Déroule l\'état étape par étape avant de formuler le résultat exact :'
      };
    }
    if (/(pourquoi|rôle|avantage|intérêt|permet|sert|conception)/.test(text)) {
      return {
        label: "Choix d'architecture",
        framing: 'Quelle contrainte technique ou métier impose ce choix ?'
      };
    }
    if (/(définition|signifie|caractérise|qu'est-ce|nomme-t-on)/.test(text)) {
      return {
        label: 'Clarification',
        framing: 'Formule la définition exacte attendue au polycopié, sans approximation :'
      };
    }
    return {
      label: 'Prédiction',
      framing: 'Explique le comportement ou l\'invariant clé avec tes mots avant d\'ouvrir le corrigé :'
    };
  }

  function findChapterForQuiz(q) {
    const chaps = DATA.chapters[q.module] || [];
    const target = (q.chapter || '').toLowerCase();
    if (target) {
      const hit = chaps.find((c) => target.includes(c.title.toLowerCase().slice(0, 12)) || c.title.toLowerCase().includes(target.slice(0, 12)));
      if (hit) return hit;
    }
    return chaps[0] || null;
  }

  function buildSocraticDeck() {
    let pool = (DATA.quizzes || []).slice();
    if (state.socModule !== 'ALL') {
      pool = pool.filter((q) => q.module === state.socModule);
    }
    if (state.avPrefs.skipMastered) {
      const unmastered = pool.filter((q) => (state.mastery[q.id] && state.mastery[q.id].status) !== 'mastered');
      if (unmastered.length) pool = unmastered;
    }
    // Prioritize confused items, then unrated/learning, then mastered
    const rank = (q) => {
      const st = state.mastery[q.id] && state.mastery[q.id].status;
      if (st === 'confused') return 0;
      if (!st || st === 'learning') return 1;
      return 2;
    };
    pool.sort((a, b) => rank(a) - rank(b));
    state.socDeck = pool;
    state.socIdx = 0;
    state.socHintLevel = 0;
    state.socRevealed = false;
  }

  function buildDeepDiveDeck() {
    let pool = (DATA.deepDives || []).slice();
    if (state.ddModule !== 'ALL') {
      pool = pool.filter((d) => d.module === state.ddModule);
    }
    if (state.avPrefs.skipMastered) {
      const unmastered = pool.filter((d) => (state.mastery[d.id] && state.mastery[d.id].status) !== 'mastered');
      if (unmastered.length) pool = unmastered;
    }
    state.ddDeck = pool;
    state.ddIdx = 0;
    state.ddRevealed = false;
  }

  function setMastery(id, status, meta) {
    const now = Date.now();
    const prev = state.mastery[id] || { reviews: 0 };
    const waitDays = status === 'confused' ? 0 : status === 'learning' ? 3 : 7;
    state.mastery[id] = {
      status,
      module: meta.module,
      label: meta.label,
      reviews: (prev.reviews || 0) + 1,
      updatedAt: todayIso(),
      nextDue: now + waitDays * 24 * 60 * 60 * 1000
    };
    writeJson(STORAGE.MASTERY, state.mastery);
  }

  function analyzeCodeFacts(dd) {
    const lines = String(dd.code || '').split(/\r?\n/);
    const low = dd.code.toLowerCase();
    const facts = [];
    if (/\b(for|while)\s*\(/.test(low)) facts.push('Itération bornée ou conditionnelle présente : vérifier condition d\'arrêt et indice initial/final.');
    if (/\b(if|else|switch)\b/.test(low)) facts.push('Branchement conditionnel : identifier quel cas limite est filtré en premier.');
    if (/(\*|&|malloc|free|calloc|nullptr|new |delete )/.test(low)) facts.push('Manipulation directe mémoire/références : contrôler validité des pointeurs et libération sans fuite.');
    if (/(select |join |group by|where |foreign key|primary key)/.test(low)) facts.push('Requête ou contrainte relationnelle SQL : vérifier cardinalités, clés étrangères et agrégats.');
    if (/(chmod |stderr|stdout|2>|grep |awk |ssh)/.test(low)) facts.push('Commande POSIX / redirection de flux : vérifier droits octaux (rwx = 4+2+1) ou descripteurs 1/2.');
    if (/(np\.|numpy|def |return )/.test(low)) facts.push('Calcul vectoriel ou fonction Python : distinguer opération élément par élément (*) et produit matriciel (@).');
    if (/(https?:\/\/|\?|\#|<form|<!doctype)/.test(low)) facts.push('Structure réseau ou balisage Web : repérer schéma, hôte, port, chemin, paramètres ou sémantique HTML.');
    if (!facts.length) facts.push('Trace structurée issue du polycopié : suivre l\'évolution des valeurs d\'entrée vers la sortie.');

    const lineNotes = [];
    lines.forEach((ln, idx) => {
      const s = ln.trim();
      if (!s || s === '{' || s === '}' || s === '/*' || s === '*/') return;
      let note = '';
      if (s.startsWith('//') || s.startsWith('#') || s.startsWith('--')) {
        note = `Annotation du polycopié : ${s.replace(/^(\/\/+|#+|--+)\s*/, '')}`;
      } else if (/^(for|while)\s*\(/.test(s)) {
        note = 'Boucle de parcours : vérifier la borne et l\'invariant d\'itération.';
      } else if (/^(if|else if)\s*\(/.test(s)) {
        note = 'Garde conditionnelle : sépare le cas nominal du cas particulier.';
      } else if (/\breturn\b/.test(s)) {
        note = 'Point de sortie : renvoie la valeur calculée à l\'appelant.';
      } else if (/\b(SELECT|FROM|WHERE|JOIN|GROUP BY|CREATE TABLE|INSERT INTO|DROP TABLE)\b/i.test(s)) {
        note = 'Clause SQL structurant la projection, le filtrage ou le schéma relationnel.';
      } else if (/\b(chmod|grep|awk|cat)\b/i.test(s)) {
        note = 'Instruction shell agissant sur les permissions ou les flux standard.';
      } else if (/=/.test(s)) {
        note = 'Affectation / initialisation d\'état utilisée dans la suite du bloc.';
      }
      if (note && lineNotes.length < 8) {
        lineNotes.push({ num: idx + 1, src: s.slice(0, 72), note });
      }
    });
    return { facts, lineNotes };
  }

  function renderJournalSidebar() {
    const entries = Object.values(state.mastery);
    const confusedCnt = entries.filter((e) => e.status === 'confused').length;
    const learningCnt = entries.filter((e) => e.status === 'learning').length;
    const masteredCnt = entries.filter((e) => e.status === 'mastered').length;

    const ahasHtml = state.ahas.slice(0, 6).map((a) => `
      <div class="journal-entry">
        <div class="journal-entry-meta">
          <span>${esc(a.module)} · ${esc(a.chapter.slice(0, 26))}</span>
          <span>${esc(a.date)}</span>
        </div>
        <div>${esc(a.text)}</div>
      </div>
    `).join('') || '<div class="journal-entry" style="color:var(--ink-muted)">Aucun déclic noté pour le moment. Formule ta prédiction puis capture ce qui a cliqué.</div>';

    const openQHtml = state.openQuestions.slice(0, 6).map((oq) => `
      <button type="button" class="open-q-row ${oq.resolved ? 'is-resolved' : ''}" data-toggle-openq="${esc(oq.id)}">
        <span class="mono">${oq.resolved ? '[x]' : '[ ]'}</span>
        <span><strong>${esc(oq.module)}</strong> · ${esc(oq.text)}</span>
      </button>
    `).join('') || '<div class="journal-entry" style="color:var(--ink-muted)">Aucune question ouverte enregistrée.</div>';

    return `
      <aside class="journal-sidebar" aria-label="Journal d'apprentissage">
        <div class="journal-head">
          <h3>Journal d'Apprentissage</h3>
          <span class="mono" style="font-size:0.74rem;color:var(--ink-muted)">${entries.length} notées</span>
        </div>

        <div class="journal-counters">
          <div class="j-counter">
            <strong>${confusedCnt}</strong>
            <span><i class="status-dot dot-confused"></i> Confus</span>
          </div>
          <div class="j-counter">
            <strong>${learningCnt}</strong>
            <span><i class="status-dot dot-learning"></i> En cours</span>
          </div>
          <div class="j-counter">
            <strong>${masteredCnt}</strong>
            <span><i class="status-dot dot-mastered"></i> Maîtrisé</span>
          </div>
        </div>

        <button type="button" class="btn-outline" id="toggle-skip-mastered" style="justify-content:space-between;width:100%;">
          <span>Skip List AntiVibe (masquer maîtrisés)</span>
          <span class="mono">${state.avPrefs.skipMastered ? 'Actif' : 'Inactif'}</span>
        </button>

        <div>
          <p class="journal-section-title">Questions ouvertes (${state.openQuestions.filter((x) => !x.resolved).length})</p>
          <div class="aha-capture-row" style="margin-bottom:8px;">
            <input type="text" class="aha-input" id="open-q-input" placeholder="Point à éclaircir plus tard..." aria-label="Ajouter une question ouverte" />
            <button type="button" class="btn-outline" id="add-open-q-btn">Ajouter</button>
          </div>
          <div class="journal-list">${openQHtml}</div>
        </div>

        <div>
          <p class="journal-section-title">Aha Moments (${state.ahas.length})</p>
          <div class="journal-list">${ahasHtml}</div>
        </div>

        <button type="button" class="btn-solid" id="export-journal-btn" style="width:100%;">Exporter learning-journal.md ↓</button>
      </aside>
    `;
  }

  function renderSocratic() {
    const host = document.getElementById('socratic-host');
    if (!host) return;

    if (!state.socDeck.length && state.view === 'socratic') buildSocraticDeck();
    if (!state.ddDeck.length && state.view === 'socratic') buildDeepDiveDeck();

    const mode = state.avPrefs.mode || 'socratic';
    const depth = state.avPrefs.depth || 'mid';
    const output = state.avPrefs.output || 'compact';

    const topHtml = `
      <div class="socratic-topbar">
        <div>
          <h2>Atelier Socratique &amp; AntiVibe Code Deep Dives</h2>
          <p>Prédire avant de révéler (learn-codebase) et disséquer les extraits réels du cours (AntiVibe) sans passivité.</p>
        </div>
        <div class="utility-cluster" style="flex-wrap:wrap;">
          <div class="seg-control" role="group" aria-label="Mode d'atelier">
            <button type="button" class="seg-btn ${mode === 'socratic' ? 'is-active' : ''}" data-av-mode="socratic">Rappel Socratique (${DATA.quizzes.length})</button>
            <button type="button" class="seg-btn ${mode === 'deepdive' ? 'is-active' : ''}" data-av-mode="deepdive">Deep Dive Code (${(DATA.deepDives || []).length})</button>
          </div>
          <div class="seg-control" role="group" aria-label="Niveau AntiVibe">
            <button type="button" class="seg-btn ${depth === 'junior' ? 'is-active' : ''}" data-av-depth="junior">Junior</button>
            <button type="button" class="seg-btn ${depth === 'mid' ? 'is-active' : ''}" data-av-depth="mid">Intermédiaire</button>
            <button type="button" class="seg-btn ${depth === 'senior' ? 'is-active' : ''}" data-av-depth="senior">Audit Senior</button>
          </div>
          ${mode === 'deepdive' ? `
            <div class="seg-control" role="group" aria-label="Densité Deep Dive">
              <button type="button" class="seg-btn ${output === 'compact' ? 'is-active' : ''}" data-av-output="compact">Compact</button>
              <button type="button" class="seg-btn ${output === 'full' ? 'is-active' : ''}" data-av-output="full">Complet</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    let stageHtml = '';

    if (mode === 'socratic') {
      const modsWithQuiz = Array.from(new Set((DATA.quizzes || []).map((q) => q.module)));
      const filterBar = `
        <div class="socratic-toolbar">
          <div class="filter-pills">
            <button type="button" class="pill-btn ${state.socModule === 'ALL' ? 'is-active' : ''}" data-soc-mod="ALL">Tous (${DATA.quizzes.length})</button>
            ${modsWithQuiz.map((m) => `<button type="button" class="pill-btn ${state.socModule === m ? 'is-active' : ''}" data-soc-mod="${esc(m)}">${esc(m)}</button>`).join('')}
          </div>
          <button type="button" class="btn-outline" id="soc-shuffle-btn">Mélanger</button>
        </div>
      `;

      const q = state.socDeck[state.socIdx];
      if (!q) {
        stageHtml = `${filterBar}<div class="socratic-stage"><p>Aucune question disponible pour ce filtre.</p></div>`;
      } else {
        const modInfo = DATA.modules.find((m) => m.code === q.module);
        const accent = (modInfo && modInfo.color) || '#287271';
        const pat = classifySocraticPattern(q);
        const ch = findChapterForQuiz(q);
        const predVal = state.predictions[q.id] || '';
        const ansText = q.options[q.correctIdx] || '';
        const mStatus = (state.mastery[q.id] && state.mastery[q.id].status) || '';
        const distractors = q.options.filter((_, idx) => idx !== q.correctIdx);

        let hintHtml = '';
        if (state.socHintLevel >= 1) {
          const secs = ch && ch.sections && ch.sections.length ? ch.sections.slice(0, 3).join(' · ') : (modInfo ? modInfo.description : '');
          hintHtml += `<div><strong>Indice 1 · Contexte du cours (${esc(q.module)}) :</strong> Chapitre « ${esc(ch ? ch.title : q.chapter)} » (${esc(q.prof || (modInfo && modInfo.prof) || '')}). Notions liées : ${esc(secs)}</div>`;
        }
        if (state.socHintLevel >= 2) {
          hintHtml += `<div><strong>Indice 2 · Axe de vigilance (${esc(pat.label)}) :</strong> ${esc(pat.framing)} ${q.pitfall ? 'Un piège d\'examen porte précisément sur une confusion de termes.' : 'Distinguons cause technique et symptôme avant d\'ouvrir.'}</div>`;
        }

        let compareRightHtml = '';
        if (depth === 'senior') {
          compareRightHtml = `
            <div><strong>Invariant :</strong> ${formatRichText(ansText)}</div>
            ${q.pitfall ? `<div class="fc-pitfall"><strong>Mode de défaillance :</strong> ${formatRichText(q.pitfall)}</div>` : (q.explanation ? `<div><strong>Justification :</strong> ${formatRichText(q.explanation)}</div>` : '')}
          `;
        } else if (depth === 'junior') {
          compareRightHtml = `
            <div><strong>What (Réponse exacte) :</strong> ${formatRichText(ansText)}</div>
            ${q.explanation ? `<div><strong>Why (Explication pas à pas) :</strong> ${formatRichText(q.explanation)}</div>` : ''}
            ${distractors.length ? `<div><strong>Ce qu'il ne faut pas confondre :</strong><ul class="distractor-list">${distractors.map((d) => `<li>${formatRichText(d)}</li>`).join('')}</ul></div>` : ''}
            ${q.pitfall ? `<div class="fc-pitfall"><strong>Piège d'examen :</strong> ${formatRichText(q.pitfall)}</div>` : ''}
          `;
        } else {
          compareRightHtml = `
            <div><strong>What :</strong> ${formatRichText(ansText)}</div>
            ${q.explanation ? `<div><strong>Why :</strong> ${formatRichText(q.explanation)}</div>` : ''}
            ${q.pitfall ? `<div class="fc-pitfall"><strong>Piège d'examen :</strong> ${formatRichText(q.pitfall)}</div>` : ''}
          `;
        }

        stageHtml = `
          ${filterBar}
          <article class="socratic-stage" style="--card-accent:${esc(accent)}">
            <div>
              <div class="chapter-meta">
                <span class="mod-code-badge" style="background:${esc(accent)}">${esc(q.module)}</span>
                <span class="pattern-tag">${esc(pat.label)}</span>
                <span>Défi ${state.socIdx + 1} / ${state.socDeck.length}</span>
                <span>· ${esc(q.chapter)}</span>
              </div>
              <h3 class="socratic-q-text">${formatRichText(q.q)}</h3>
              <p class="socratic-framing">${esc(pat.framing)}</p>
            </div>

            ${state.socHintLevel > 0 ? `<div class="hint-drawer" id="socratic-hint-box">${hintHtml}</div>` : ''}

            <div>
              <label class="field-label" for="socratic-prediction">1. Ta prédiction avant révélation (Ask Before Telling)</label>
              <textarea class="predict-textarea" id="socratic-prediction" placeholder="Écris ton raisonnement en 1 à 3 phrases avant d'afficher la vérité du polycopié...">${esc(predVal)}</textarea>
            </div>

            <div class="utility-cluster" style="flex-wrap:wrap;justify-content:space-between;">
              <div class="utility-cluster" style="flex-wrap:wrap;">
                <button type="button" class="btn-outline" id="soc-hint-btn">
                  ${state.socHintLevel === 0 ? 'Indice 1 (Contexte)' : state.socHintLevel === 1 ? 'Indice 2 (Vigilance)' : 'Masquer les indices'}
                </button>
                <button type="button" class="btn-solid" id="soc-compare-btn">
                  ${state.socRevealed ? 'Masquer la comparaison' : 'Comparer avec le cours'}
                </button>
              </div>
              <div class="utility-cluster">
                <button type="button" class="btn-outline" id="soc-prev-btn">← Précédent</button>
                <button type="button" class="btn-outline" id="soc-next-btn">Suivant →</button>
              </div>
            </div>

            ${state.socRevealed ? `
              <div class="compare-grid" id="socratic-compare-grid">
                <div class="compare-pane">
                  <span class="compare-label">TA PRÉDICTION</span>
                  <div>${predVal.trim() ? esc(predVal) : 'Aucune prédiction écrite avant révélation — pense à formuler une hypothèse au prochain défi.'}</div>
                </div>
                <div class="compare-pane truth">
                  <span class="compare-label">VÉRITÉ DU COURS · ${esc(depth.toUpperCase())}</span>
                  ${compareRightHtml}
                </div>
              </div>
            ` : ''}

            <div>
              <span class="field-label">2. Évaluation honnête &amp; planification SM-2</span>
              <div class="mastery-row">
                <button type="button" class="mastery-btn ${mStatus === 'confused' ? 'is-active' : ''}" data-rate-mastery="confused" data-status="confused">
                  <i class="status-dot dot-confused"></i> Confus (revoir vite)
                </button>
                <button type="button" class="mastery-btn ${mStatus === 'learning' ? 'is-active' : ''}" data-rate-mastery="learning" data-status="learning">
                  <i class="status-dot dot-learning"></i> En cours (3 j)
                </button>
                <button type="button" class="mastery-btn ${mStatus === 'mastered' ? 'is-active' : ''}" data-rate-mastery="mastered" data-status="mastered">
                  <i class="status-dot dot-mastered"></i> Maîtrisé (Skip List)
                </button>
              </div>
            </div>

            <div>
              <label class="field-label" for="socratic-aha-input">3. Capturer un déclic (Aha Moment dans tes mots)</label>
              <div class="aha-capture-row">
                <input type="text" class="aha-input" id="socratic-aha-input" placeholder="Ce qui vient de cliquer sur cette notion..." />
                <button type="button" class="btn-outline" id="socratic-aha-save">Noter au journal</button>
              </div>
            </div>
          </article>
        `;
      }
    } else {
      const modsWithDd = Array.from(new Set((DATA.deepDives || []).map((d) => d.module)));
      const filterBar = `
        <div class="socratic-toolbar">
          <div class="filter-pills">
            <button type="button" class="pill-btn ${state.ddModule === 'ALL' ? 'is-active' : ''}" data-dd-mod="ALL">Tous (${(DATA.deepDives || []).length})</button>
            ${modsWithDd.map((m) => `<button type="button" class="pill-btn ${state.ddModule === m ? 'is-active' : ''}" data-dd-mod="${esc(m)}">${esc(m)}</button>`).join('')}
          </div>
          <button type="button" class="btn-outline" id="dd-shuffle-btn">Mélanger</button>
        </div>
      `;

      const dd = state.ddDeck[state.ddIdx];
      if (!dd) {
        stageHtml = `${filterBar}<div class="socratic-stage"><p>Aucun extrait de code disponible pour ce filtre.</p></div>`;
      } else {
        const modInfo = DATA.modules.find((m) => m.code === dd.module);
        const accent = (modInfo && modInfo.color) || '#287271';
        const predVal = state.predictions[dd.id] || '';
        const mStatus = (state.mastery[dd.id] && state.mastery[dd.id].status) || '';
        const lines = String(dd.code || '').split(/\r?\n/);
        const analysis = analyzeCodeFacts(dd);

        const codeLinesHtml = lines.map((ln, idx) => `
          <li class="code-line"><span class="code-ln">${idx + 1}</span><span class="code-src">${esc(ln)}</span></li>
        `).join('');

        let analysisHtml = '';
        if (state.ddRevealed) {
          if (depth === 'senior') {
            analysisHtml = `
              <div class="deepdive-panel" id="deepdive-analysis">
                <div class="deepdive-block">
                  <h4>Architecture Summary · ${esc(dd.lang.toUpperCase())}</h4>
                  <p>${formatRichText(dd.context)}</p>
                </div>
                <div class="deepdive-block">
                  <h4>Key Observations &amp; Edge Cases</h4>
                  <ul>${analysis.facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
                </div>
                <div class="deepdive-block">
                  <h4>Flags &amp; Vigilance Examen</h4>
                  <p>${dd.pitfall ? formatRichText(dd.pitfall) : 'Vérifier les invariants d\'entrée/sortie et l\'absence d\'effets de bord non gérés.'}</p>
                </div>
              </div>
            `;
          } else {
            analysisHtml = `
              <div class="deepdive-panel" id="deepdive-analysis">
                <div class="deepdive-block">
                  <h4>Vue d'ensemble (What &amp; Why)</h4>
                  <p>${formatRichText(dd.context)}</p>
                </div>
                <div class="deepdive-block">
                  <h4>Composants &amp; Mécanismes détectés</h4>
                  <ul>${analysis.facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
                </div>
                ${output === 'full' && analysis.lineNotes.length ? `
                  <div class="deepdive-block">
                    <h4>Lecture guidée ligne par ligne</h4>
                    <ul>${analysis.lineNotes.map((n) => `<li><span class="mono">L${n.num}</span> — ${esc(n.note)}</li>`).join('')}</ul>
                  </div>
                ` : ''}
                ${output === 'full' && dd.sections && dd.sections.length ? `
                  <div class="deepdive-block">
                    <h4>Prérequis du chapitre (${esc(dd.chapter)})</h4>
                    <ul>${dd.sections.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
                  </div>
                ` : ''}
                ${dd.pitfall ? `
                  <div class="deepdive-block">
                    <h4>Vigilance / Piège associé (${esc(dd.module)})</h4>
                    <p>${formatRichText(dd.pitfall)}</p>
                  </div>
                ` : ''}
                <div>
                  <a class="btn-outline" href="${esc(dd.chapterUrl)}" target="_blank" rel="noopener">Ouvrir le chapitre source complet ↗</a>
                </div>
              </div>
            `;
          }
        }

        stageHtml = `
          ${filterBar}
          <article class="socratic-stage" style="--card-accent:${esc(accent)}">
            <div>
              <div class="chapter-meta">
                <span class="mod-code-badge" style="background:${esc(accent)}">${esc(dd.module)}</span>
                <span class="pattern-tag">${esc(dd.lang.toUpperCase())}</span>
                <span>Extrait ${state.ddIdx + 1} / ${state.ddDeck.length}</span>
                <span>· ${esc(dd.chapter)}</span>
              </div>
              <h3 class="socratic-q-text">${esc(dd.title)}</h3>
            </div>

            <div class="code-stage">
              <div class="code-stage-head">
                <span>${esc(dd.chapterUrl)}</span>
                <span>${lines.length} lignes · source polycopié</span>
              </div>
              <ol class="code-lines">${codeLinesHtml}</ol>
            </div>

            <div>
              <label class="field-label" for="dd-prediction">1. Prédis le comportement &amp; le cas critique avant de révéler l'analyse</label>
              <textarea class="predict-textarea" id="dd-prediction" placeholder="Que fait ce bloc ligne par ligne ? Que se passe-t-il sur un cas limite (tableau vide, NULL, droits insuffisants) ?">${esc(predVal)}</textarea>
            </div>

            <div class="utility-cluster" style="flex-wrap:wrap;justify-content:space-between;">
              <button type="button" class="btn-solid" id="dd-reveal-btn">
                ${state.ddRevealed ? 'Masquer l\'analyse AntiVibe' : 'Révéler l\'analyse AntiVibe'}
              </button>
              <div class="utility-cluster">
                <button type="button" class="btn-outline" id="dd-prev-btn">← Précédent</button>
                <button type="button" class="btn-outline" id="dd-next-btn">Suivant →</button>
              </div>
            </div>

            ${analysisHtml}

            <div>
              <span class="field-label">2. Maîtrise de cet extrait (Skip List AntiVibe)</span>
              <div class="mastery-row">
                <button type="button" class="mastery-btn ${mStatus === 'confused' ? 'is-active' : ''}" data-rate-dd="confused" data-status="confused">
                  <i class="status-dot dot-confused"></i> Confus
                </button>
                <button type="button" class="mastery-btn ${mStatus === 'learning' ? 'is-active' : ''}" data-rate-dd="learning" data-status="learning">
                  <i class="status-dot dot-learning"></i> En cours
                </button>
                <button type="button" class="mastery-btn ${mStatus === 'mastered' ? 'is-active' : ''}" data-rate-dd="mastered" data-status="mastered">
                  <i class="status-dot dot-mastered"></i> Maîtrisé
                </button>
              </div>
            </div>

            <div>
              <label class="field-label" for="dd-aha-input">3. Déclic retenu sur ce code</label>
              <div class="aha-capture-row">
                <input type="text" class="aha-input" id="dd-aha-input" placeholder="L'invariant ou l'erreur que ce code m'a appris..." />
                <button type="button" class="btn-outline" id="dd-aha-save">Noter au journal</button>
              </div>
            </div>
          </article>
        `;
      }
    }

    host.innerHTML = `
      ${topHtml}
      <div class="socratic-layout">
        <div>${stageHtml}</div>
        ${renderJournalSidebar()}
      </div>
    `;
  }

  function exportLearningJournalMd() {
    const masteryEntries = Object.entries(state.mastery);
    const confident = masteryEntries.filter(([, v]) => v.status === 'mastered');
    const learning = masteryEntries.filter(([, v]) => v.status === 'learning');
    const confused = masteryEntries.filter(([, v]) => v.status === 'confused');

    const lines = [
      '# BUT 1 Learning Journal — Kai Study',
      '',
      `> Exporté le ${todayIso()} · IUT de Bayonne – Campus d'Anglet`,
      '',
      '## Concept Mastery Map',
      '',
      '### Confident (Maîtrisé)',
      ...(confident.length ? confident.map(([, v]) => `- [${v.module}] ${v.label} (${v.updatedAt})`) : ['- Aucune notion marquée maîtrisée pour le moment.']),
      '',
      '### Learning (En cours)',
      ...(learning.length ? learning.map(([, v]) => `- [${v.module}] ${v.label} (revoir sous 3 j)`) : ['- Aucune notion en cours.']),
      '',
      '### Need to Explore (Confus)',
      ...(confused.length ? confused.map(([, v]) => `- [${v.module}] ${v.label}`) : ['- Aucune notion marquée confus.']),
      '',
      '## Known Concepts (AntiVibe Skip List)',
      ...(confident.length ? confident.map(([, v]) => `- ${v.module}: ${v.label}`) : ['- Vide']),
      '',
      '## Open Questions',
      ...(state.openQuestions.length ? state.openQuestions.map((q) => `- [${q.resolved ? 'x' : ' '}] **${q.module}** — ${q.text} (${q.date})`) : ['- [ ] Aucune question ouverte.']),
      '',
      '## Spaced Review Queue (SM-2)',
      `- Flashcards SM-2 enregistrées : ${Object.keys(state.sm2).length}`,
      `- Cartes dues aujourd'hui : ${getDueCardsCount()}`,
      '',
      '## Aha Moments',
      ...(state.ahas.length
        ? state.ahas.flatMap((a) => [`### ${a.date} — ${a.module} · ${a.chapter}`, a.text, ''])
        : ['Aucun déclic enregistré pour le moment.'])
    ];

    const md = lines.join('\n');
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'learning-journal.md';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /* ---------------- 6. SM-2 Spaced Repetition Flashcards ---------------- */
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
      interval = 0;
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

    if (state.fcIdx + 1 < state.fcDeck.length) state.fcIdx++;
    else buildFlashcardDeck();
    renderFlashcards();
  }

  function renderFlashcards() {
    if (!state.fcDeck.length && state.view === 'flashcards') buildFlashcardDeck();

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
        <div class="flashcard-stage">
          <div>
            <h3>Session terminée : 0 carte due pour ce filtre</h3>
            <p class="chapter-summary">Choisis "Toutes (${DATA.quizzes.length})" ou une matière précise pour continuer à t'entraîner.</p>
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
          <h2>Répétition Espacée SM-2</h2>
          <p>Formule mentalement ta réponse avant de retourner la carte (barre d'espace ou clic).</p>
        </div>
        <button type="button" class="btn-outline" id="fc-shuffle-btn">Mélanger</button>
      </div>

      <div class="filter-pills">${pills}</div>

      <div class="fc-status-bar">
        <span>Carte <strong>${state.fcIdx + 1} / ${state.fcDeck.length}</strong> · ${esc(card.module)}</span>
        <span class="mono">${Object.keys(state.sm2).length} cartes enregistrées</span>
      </div>

      <div class="flashcard-stage" id="fc-card" style="--card-accent:${esc(accent)}">
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

  /* ---------------- 7. Exam QCM Simulator ---------------- */
  function startQuizSession() {
    let pool = (DATA.quizzes || []).slice();
    if (state.quizModule === 'WRONG') {
      pool = pool.filter((q) => state.wrongIds.includes(q.id));
    } else if (state.quizModule !== 'ALL') {
      pool = pool.filter((q) => q.module === state.quizModule);
    }
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
      <div class="quiz-controls">
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
      host.innerHTML = `${controlsHtml}<div class="quiz-stage"><h3>Aucune question dans ce filtre</h3><p class="chapter-summary">Aucune erreur enregistrée. Lance une série de 10 questions.</p></div>`;
      return;
    }

    if (state.quizIdx >= state.quizDeck.length) {
      const pct = Math.round((state.quizScore / state.quizDeck.length) * 100);
      host.innerHTML = `
        ${controlsHtml}
        <div class="quiz-stage">
          <h2>Bilan de la session : ${state.quizScore} / ${state.quizDeck.length} (${pct}%)</h2>
          <p class="chapter-summary">Les questions manquées sont placées dans le filtre "Mes erreurs" et prioritaires dans l'Atelier Socratique.</p>
          <div class="masthead-actions">
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
      <div class="fc-status-bar">
        <span>Question <strong>${state.quizIdx + 1} / ${state.quizDeck.length}</strong> · ${esc(q.module)}</span>
        <span class="mono">Score : <strong>${state.quizScore}</strong></span>
      </div>
      <div class="quiz-stage">
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

  /* ---------------- 8. Official PDF Library ---------------- */
  function renderLibrary() {
    const host = document.getElementById('library-host');
    if (!host) return;

    const q = state.libQuery.trim().toLowerCase();
    const mods = Array.from(new Set((DATA.supports || []).map((d) => d.module)));
    const items = (DATA.supports || []).filter((d) => {
      if (state.libModule !== 'ALL' && d.module !== state.libModule) return false;
      if (q && !d.title.toLowerCase().includes(q) && !d.module.toLowerCase().includes(q)) return false;
      return true;
    });

    const shown = items.slice(0, 80);
    const listHtml = shown.map((d) => `
      <div class="doc-row">
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
          <p>Polycopiés et diaporamas présents localement et en ligne (aucun lien cassé).</p>
        </div>
        <a class="btn-outline" href="documents.html" target="_blank" rel="noopener">Vue catalogue complet ↗</a>
      </div>

      <div class="lib-filter-box">
        <input type="search" class="search-input" id="lib-search-input" placeholder="Filtrer par titre ou matière (ex: Merise, Linux, Bruyère, S1.01)..." value="${esc(state.libQuery)}" aria-label="Rechercher un document" />
        <div class="filter-pills">
          <button type="button" class="pill-btn ${state.libModule === 'ALL' ? 'is-active' : ''}" data-lib-mod="ALL">Tous (${DATA.supports.length})</button>
          ${mods.map((m) => `<button type="button" class="pill-btn ${state.libModule === m ? 'is-active' : ''}" data-lib-mod="${esc(m)}">${esc(m)}</button>`).join('')}
        </div>
      </div>

      <div class="library-ledger">${listHtml || '<div class="doc-row">Aucun document ne correspond à cette recherche.</div>'}</div>
    `;
  }

  /* ---------------- 9. Global Ctrl+K Search ---------------- */
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
      (DATA.deepDives || []).forEach((d, idx) => {
        if ((d.module + ' ' + d.title + ' ' + d.code).toLowerCase().includes(q)) {
          hits.push({
            label: `${d.module} · ${d.title}`,
            meta: `Deep Dive ${d.lang.toUpperCase()}`,
            action: () => {
              state.avPrefs.mode = 'deepdive';
              state.ddModule = d.module;
              writeJson(STORAGE.ANTIVIBE_PREFS, state.avPrefs);
              buildDeepDiveDeck();
              const foundIdx = state.ddDeck.findIndex((x) => x.id === d.id);
              state.ddIdx = foundIdx >= 0 ? foundIdx : 0;
              state.ddRevealed = false;
              setView('socratic');
            }
          });
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

  /* ---------------- 10. Pomodoro Timer ---------------- */
  let pomoSecs = 25 * 60;
  let pomoTimer = null;

  function updatePomoUI() {
    const btn = document.getElementById('pomo-btn');
    if (!btn) return;
    const mm = String(Math.floor(pomoSecs / 60)).padStart(2, '0');
    const ss = String(pomoSecs % 60).padStart(2, '0');
    btn.textContent = `${mm}:${ss}`;
    btn.classList.toggle('is-running', !!pomoTimer);
  }

  /* ---------------- 11. Event Delegation ---------------- */
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
        setView('explorer', openMod.dataset.openMod || openMod.dataset.selectMod);
        return;
      }

      const openSoc = target.closest('[data-open-socratic]');
      if (openSoc) {
        state.avPrefs.mode = 'socratic';
        state.socModule = openSoc.dataset.openSocratic || 'ALL';
        writeJson(STORAGE.ANTIVIBE_PREFS, state.avPrefs);
        buildSocraticDeck();
        setView('socratic');
        return;
      }

      const openDd = target.closest('[data-open-dd]');
      if (openDd) {
        state.avPrefs.mode = 'deepdive';
        state.ddModule = openDd.dataset.openDd || 'ALL';
        writeJson(STORAGE.ANTIVIBE_PREFS, state.avPrefs);
        buildDeepDiveDeck();
        setView('socratic');
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

      /* ---- Socratic & AntiVibe Interactions ---- */
      const avModeBtn = target.closest('[data-av-mode]');
      if (avModeBtn) {
        state.avPrefs.mode = avModeBtn.dataset.avMode;
        writeJson(STORAGE.ANTIVIBE_PREFS, state.avPrefs);
        renderSocratic();
        return;
      }

      const avDepthBtn = target.closest('[data-av-depth]');
      if (avDepthBtn) {
        state.avPrefs.depth = avDepthBtn.dataset.avDepth;
        writeJson(STORAGE.ANTIVIBE_PREFS, state.avPrefs);
        renderSocratic();
        return;
      }

      const avOutBtn = target.closest('[data-av-output]');
      if (avOutBtn) {
        state.avPrefs.output = avOutBtn.dataset.avOutput;
        writeJson(STORAGE.ANTIVIBE_PREFS, state.avPrefs);
        renderSocratic();
        return;
      }

      const socModBtn = target.closest('[data-soc-mod]');
      if (socModBtn) {
        state.socModule = socModBtn.dataset.socMod;
        buildSocraticDeck();
        renderSocratic();
        return;
      }

      const ddModBtn = target.closest('[data-dd-mod]');
      if (ddModBtn) {
        state.ddModule = ddModBtn.dataset.ddMod;
        buildDeepDiveDeck();
        renderSocratic();
        return;
      }

      if (target.closest('#soc-shuffle-btn')) {
        for (let i = state.socDeck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [state.socDeck[i], state.socDeck[j]] = [state.socDeck[j], state.socDeck[i]];
        }
        state.socIdx = 0;
        state.socHintLevel = 0;
        state.socRevealed = false;
        renderSocratic();
        return;
      }

      if (target.closest('#dd-shuffle-btn')) {
        for (let i = state.ddDeck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [state.ddDeck[i], state.ddDeck[j]] = [state.ddDeck[j], state.ddDeck[i]];
        }
        state.ddIdx = 0;
        state.ddRevealed = false;
        renderSocratic();
        return;
      }

      if (target.closest('#soc-hint-btn')) {
        state.socHintLevel = (state.socHintLevel + 1) % 3;
        renderSocratic();
        return;
      }

      if (target.closest('#soc-compare-btn')) {
        state.socRevealed = !state.socRevealed;
        renderSocratic();
        return;
      }

      if (target.closest('#soc-prev-btn') && state.socDeck.length) {
        state.socIdx = (state.socIdx - 1 + state.socDeck.length) % state.socDeck.length;
        state.socHintLevel = 0;
        state.socRevealed = false;
        renderSocratic();
        return;
      }

      if (target.closest('#soc-next-btn') && state.socDeck.length) {
        state.socIdx = (state.socIdx + 1) % state.socDeck.length;
        state.socHintLevel = 0;
        state.socRevealed = false;
        renderSocratic();
        return;
      }

      if (target.closest('#dd-reveal-btn')) {
        state.ddRevealed = !state.ddRevealed;
        renderSocratic();
        return;
      }

      if (target.closest('#dd-prev-btn') && state.ddDeck.length) {
        state.ddIdx = (state.ddIdx - 1 + state.ddDeck.length) % state.ddDeck.length;
        state.ddRevealed = false;
        renderSocratic();
        return;
      }

      if (target.closest('#dd-next-btn') && state.ddDeck.length) {
        state.ddIdx = (state.ddIdx + 1) % state.ddDeck.length;
        state.ddRevealed = false;
        renderSocratic();
        return;
      }

      const rateSoc = target.closest('[data-rate-mastery]');
      if (rateSoc) {
        const q = state.socDeck[state.socIdx];
        if (q) {
          setMastery(q.id, rateSoc.dataset.rateMastery, { module: q.module, label: q.q.slice(0, 90) });
          renderSocratic();
        }
        return;
      }

      const rateDd = target.closest('[data-rate-dd]');
      if (rateDd) {
        const dd = state.ddDeck[state.ddIdx];
        if (dd) {
          setMastery(dd.id, rateDd.dataset.rateDd, { module: dd.module, label: dd.title.slice(0, 90) });
          renderSocratic();
        }
        return;
      }

      if (target.closest('#socratic-aha-save')) {
        const inp = document.getElementById('socratic-aha-input');
        const q = state.socDeck[state.socIdx];
        const txt = inp ? inp.value.trim() : '';
        if (txt && q) {
          state.ahas.unshift({ id: String(Date.now()), refId: q.id, module: q.module, chapter: q.chapter, text: txt, date: todayIso() });
          writeJson(STORAGE.AHAS, state.ahas);
          renderSocratic();
        }
        return;
      }

      if (target.closest('#dd-aha-save')) {
        const inp = document.getElementById('dd-aha-input');
        const dd = state.ddDeck[state.ddIdx];
        const txt = inp ? inp.value.trim() : '';
        if (txt && dd) {
          state.ahas.unshift({ id: String(Date.now()), refId: dd.id, module: dd.module, chapter: dd.chapter, text: txt, date: todayIso() });
          writeJson(STORAGE.AHAS, state.ahas);
          renderSocratic();
        }
        return;
      }

      if (target.closest('#toggle-skip-mastered')) {
        state.avPrefs.skipMastered = !state.avPrefs.skipMastered;
        writeJson(STORAGE.ANTIVIBE_PREFS, state.avPrefs);
        buildSocraticDeck();
        buildDeepDiveDeck();
        renderSocratic();
        return;
      }

      if (target.closest('#add-open-q-btn')) {
        const inp = document.getElementById('open-q-input');
        const txt = inp ? inp.value.trim() : '';
        if (txt) {
          const curMod = state.avPrefs.mode === 'deepdive'
            ? ((state.ddDeck[state.ddIdx] && state.ddDeck[state.ddIdx].module) || 'BUT1')
            : ((state.socDeck[state.socIdx] && state.socDeck[state.socIdx].module) || 'BUT1');
          state.openQuestions.unshift({ id: `oq_${Date.now()}`, module: curMod, text: txt, resolved: false, date: todayIso() });
          writeJson(STORAGE.OPEN_Q, state.openQuestions);
          renderSocratic();
        }
        return;
      }

      const oqBtn = target.closest('[data-toggle-openq]');
      if (oqBtn) {
        const id = oqBtn.dataset.toggleOpenq;
        state.openQuestions = state.openQuestions.map((x) => (x.id === id ? { ...x, resolved: !x.resolved } : x));
        writeJson(STORAGE.OPEN_Q, state.openQuestions);
        renderSocratic();
        return;
      }

      if (target.closest('#export-journal-btn')) {
        exportLearningJournalMd();
        return;
      }

      /* ---- Flashcards & QCM & Library ---- */
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
      if (e.target && e.target.id === 'socratic-prediction') {
        const q = state.socDeck[state.socIdx];
        if (q) state.predictions[q.id] = e.target.value;
      } else if (e.target && e.target.id === 'dd-prediction') {
        const dd = state.ddDeck[state.ddIdx];
        if (dd) state.predictions[dd.id] = e.target.value;
      } else if (e.target && e.target.id === 'lib-search-input') {
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

    document.addEventListener('keydown', (e) => {
      const tag = document.activeElement?.tagName;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchModal.classList.add('is-open');
        runGlobalSearch('');
        document.getElementById('global-search-input')?.focus();
      } else if (e.key === 'Escape') {
        searchModal?.classList.remove('is-open');
        prefsModal?.classList.remove('is-open');
      } else if (e.code === 'Space' && state.view === 'flashcards' && tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
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
    const badgeSoc = document.getElementById('nav-count-socratic');
    const badgeQuiz = document.getElementById('nav-count-quiz');
    const badgeDocs = document.getElementById('nav-count-docs');
    if (badgeChaps) badgeChaps.textContent = String(DATA.stats.chapters || 116);
    if (badgeSoc) badgeSoc.textContent = String(DATA.stats.deepDives || (DATA.deepDives || []).length);
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
      socratique: 'socratic',
      antivibe: 'socratic',
      deepdive: 'socratic',
      flashcards: 'flashcards',
      quiz: 'quiz',
      bibliotheque: 'library',
      library: 'library',
      supports: 'library'
    };
    if (hash === 'deepdive') {
      state.avPrefs.mode = 'deepdive';
      writeJson(STORAGE.ANTIVIBE_PREFS, state.avPrefs);
    }
    setView(hashMap[hash] || 'home');
  });
})();
