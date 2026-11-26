/* ==========================================================================
   MATÉI DE SAINT LÉGER — STORYTELLING, MOTION.DEV & DRIBBBLE CHRONICLE ENGINE
   - Utilise window.Motion (Motion v11 UMD hébergé localement dans vendor/motion.min.js)
   - Horloge à tambours verticaux géants (Dribbble V1) + Balayage en tuiles damier
   - Odomètres à tambours sur les 4 indicateurs vérifiés (inView + stagger)
   - Timeline interactive Motion Studio sur Parcours 2023 -> 2028
   - Transitions spring sur les onglets Projets & progression navbar sans occlusion
   ========================================================================== */

(function () {
  'use strict';

  const CITY_DATA = {
    biarritz: {
      tz: 'Europe/Paris',
      place: 'BIARRITZ · IUT DE BAYONNE – ANGLET',
      sub: 'BUT Informatique · Systèmes autonomes, React 18 & Linux',
      noteLabel: 'Base Côte Basque (43.48°N)',
      noteValue: 'Disponible Alternance & Hybride'
    },
    paris: {
      tz: 'Europe/Paris',
      place: 'ORACLE CLOUD VPS · INFRASTRUCTURE 24/7',
      sub: '20 Agents Cloud Python, FastAPI & systemd en production continue',
      noteLabel: 'Production Serveur',
      noteValue: '22 / 22 tests pytest OK'
    },
    londres: {
      tz: 'Europe/London',
      place: 'BRIGHTON & BOURNEMOUTH · UK B2',
      sub: 'Deux étés d’immersion complète en Angleterre (2024 & 2025)',
      noteLabel: 'Immersion Anglophone',
      noteValue: 'Anglais Technique B2'
    },
    sanfrancisco: {
      tz: 'America/Los_Angeles',
      place: 'OPEN-SOURCE GLOBAL · GITHUB @MATEIDSLX',
      sub: '46 Pull Requests fusionnées sur Twenty CRM, BasedHardware/Omi & FinTech',
      noteLabel: 'Contributions OSS',
      noteValue: '46 PRs · Revues & Tests CI'
    }
  };

  function getMotion() {
    return window.Motion || null;
  }

  function reduced() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function animateSafe(el, props, opts) {
    if (!el) return;
    const M = getMotion();
    if (M && typeof M.animate === 'function' && !reduced()) {
      return M.animate(el, props, opts);
    }
    if (props.y !== undefined) {
      el.style.transform = `translateY(${Array.isArray(props.y) ? props.y[props.y.length - 1] : props.y})`;
    }
    if (props.opacity !== undefined) {
      el.style.opacity = String(Array.isArray(props.opacity) ? props.opacity[props.opacity.length - 1] : props.opacity);
    }
    return null;
  }

  /* 1. Barre de progression fine dans la navbar (sans dépendance ScrollTimeline NaN) */
  function initNavScrollLine() {
    const line = document.getElementById('nav-scroll-line');
    if (!line) return;
    let rafPending = false;
    const update = () => {
      rafPending = false;
      const docEl = document.documentElement;
      const max = Math.max(0, docEl.scrollHeight - window.innerHeight);
      const raw = max > 0 ? (window.scrollY / max) * 100 : 0;
      const pct = Number.isFinite(raw) ? Math.min(100, Math.max(0, raw)) : 0;
      line.style.width = `${pct.toFixed(1)}%`;
    };
    const schedule = () => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    update();
  }

  /* 2. Odomètres verticaux sur les 4 chiffres du Proof Deck */
  function initProofOdometers() {
    const nums = Array.from(document.querySelectorAll('.odo-num[data-odo]'));
    if (!nums.length || reduced()) return;

    nums.forEach((el) => {
      const target = String(el.getAttribute('data-odo') || el.textContent || '').trim();
      el.innerHTML = '';
      el.style.display = 'inline-flex';
      el.style.alignItems = 'baseline';
      el.style.gap = '1px';
      [...target].forEach((ch) => {
        const d = parseInt(ch, 10);
        if (Number.isNaN(d)) {
          const span = document.createElement('span');
          span.textContent = ch;
          el.appendChild(span);
          return;
        }
        const cell = document.createElement('span');
        cell.className = 'drum-cell';
        cell.style.width = '0.64em';
        const track = document.createElement('span');
        track.className = 'drum-track';
        for (let k = 0; k <= 9; k++) {
          const s = document.createElement('span');
          s.textContent = String(k);
          track.appendChild(s);
        }
        track.dataset.digit = String(d);
        track.style.transform = 'translateY(0em)';
        cell.appendChild(track);
        el.appendChild(cell);
      });
    });

    const deck = document.querySelector('.hero-proof-deck');
    if (!deck) return;

    let played = false;
    const trigger = () => {
      if (played) return;
      played = true;
      const tracks = deck.querySelectorAll('.drum-track[data-digit]');
      tracks.forEach((tr, i) => {
        const d = Number(tr.dataset.digit || 0);
        const endY = `${(-d * 1.18).toFixed(3)}em`;
        const M = getMotion();
        if (M && typeof M.animate === 'function' && !reduced()) {
          M.animate(tr, { transform: ['translateY(0em)', `translateY(${endY})`] }, { duration: 0.72, delay: i * 0.055, easing: [0.22, 1, 0.36, 1] });
        } else {
          tr.style.transform = `translateY(${endY})`;
        }
      });
    };

    const checkVisibleOrPassed = () => {
      const r = deck.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.98) {
        trigger();
      }
    };

    const M = getMotion();
    if (M && typeof M.inView === 'function') {
      M.inView(deck, () => trigger(), { amount: 0.1 });
    }
    window.addEventListener('scroll', checkVisibleOrPassed, { passive: true });
    setTimeout(checkVisibleOrPassed, 250);
  }

  /* 3. Horloge à tambours mécaniques + Balayage tuiles damier (Dribbble V1) */
  function initChronicleTimer() {
    const tracks = Array.from({ length: 6 }, (_, i) => document.getElementById(`drum-d${i}`));
    if (tracks.some((t) => !t)) return;

    tracks.forEach((tr) => {
      tr.innerHTML = '';
      for (let d = 0; d <= 9; d++) {
        const span = document.createElement('span');
        span.textContent = String(d);
        tr.appendChild(span);
      }
      tr.dataset.cur = '0';
    });

    const tileMask = document.getElementById('timer-tile-wipe');
    if (tileMask) {
      tileMask.innerHTML = '';
      for (let i = 0; i < 16; i++) {
        const cell = document.createElement('span');
        cell.className = 'timer-tile-cell';
        tileMask.appendChild(cell);
      }
    }

    let currentMode = 'clock'; // 'clock' | 'alternance'
    let currentCity = 'biarritz';

    const label0 = document.getElementById('timer-label-0');
    const label1 = document.getElementById('timer-label-1');
    const label2 = document.getElementById('timer-label-2');
    const headingEl = document.getElementById('timer-heading-label');
    const placeEl = document.getElementById('timer-scene-place');
    const subEl = document.getElementById('timer-scene-sub');
    const dateWkEl = document.getElementById('timer-date-weekday');
    const dateMainEl = document.getElementById('timer-date-main');

    function setDigit(idx, digitVal) {
      const tr = tracks[idx];
      if (!tr || tr.dataset.cur === String(digitVal)) return;
      const prevVal = Number(tr.dataset.cur || 0);
      tr.dataset.cur = String(digitVal);
      const fromY = `translateY(${(-prevVal * 1.18).toFixed(3)}em)`;
      const toY = `translateY(${(-digitVal * 1.18).toFixed(3)}em)`;
      const M = getMotion();
      if (M && typeof M.animate === 'function' && !reduced()) {
        M.animate(tr, { transform: [fromY, toY] }, { duration: 0.42, easing: [0.22, 1, 0.36, 1] });
      } else {
        tr.style.transform = toY;
      }
    }

    function runTileWipe() {
      if (!tileMask || reduced()) return;
      const cells = Array.from(tileMask.querySelectorAll('.timer-tile-cell'));
      const M = getMotion();
      if (M && typeof M.animate === 'function') {
        cells.forEach((c, idx) => {
          const delay = ((idx % 8) + Math.floor(idx / 8) * 2) * 0.025;
          M.animate(c, { opacity: [0.95, 0], scale: [1, 0.88] }, { duration: 0.42, delay, easing: [0.22, 1, 0.36, 1] });
        });
      }
    }

    function formatTzTime(tz) {
      try {
        const now = new Date();
        const parts = new Intl.DateTimeFormat('fr-FR', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).formatToParts(now);
        const get = (t) => parts.find((p) => p.type === t)?.value || '00';
        return { h: get('hour'), m: get('minute'), s: get('second') };
      } catch (_) {
        const d = new Date();
        return {
          h: String(d.getHours()).padStart(2, '0'),
          m: String(d.getMinutes()).padStart(2, '0'),
          s: String(d.getSeconds()).padStart(2, '0')
        };
      }
    }

    function refreshSceneInfo(withWipe) {
      if (withWipe) runTileWipe();
      const info = CITY_DATA[currentCity] || CITY_DATA.biarritz;
      if (placeEl) placeEl.textContent = info.place;
      if (subEl) subEl.textContent = info.sub;

      if (currentMode === 'alternance') {
        if (headingEl) headingEl.textContent = 'COMPTE À REBOURS // DISPONIBILITÉ ALTERNANCE';
        if (label0) label0.textContent = 'mois';
        if (label1) label1.textContent = 'jours';
        if (label2) label2.textContent = 'heures';
        if (dateWkEl) dateWkEl.textContent = 'Rentrée BUT 2 · Sept. 2027';
      } else {
        if (headingEl) headingEl.textContent = 'WORLD TIME // CÔTE BASQUE & PROJETS';
        if (label0) label0.textContent = 'heures';
        if (label1) label1.textContent = 'minutes';
        if (label2) label2.textContent = 'secondes';
        if (dateWkEl) dateWkEl.textContent = info.noteLabel;
        if (dateMainEl) dateMainEl.textContent = info.noteValue;
      }
    }

    function tick() {
      // Update all 4 city sub-clocks
      Object.entries(CITY_DATA).forEach(([key, meta]) => {
        const t = formatTzTime(meta.tz);
        document.querySelectorAll(`[data-city-clock="${key}"]`).forEach((el) => {
          el.textContent = `${t.h}:${t.m}`;
        });
      });

      let dStr = '000000';
      if (currentMode === 'alternance') {
        const target = new Date('2027-09-01T08:00:00+02:00');
        const now = new Date();
        const totalSec = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
        let months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
        const anchor = new Date(now.getTime());
        anchor.setMonth(anchor.getMonth() + months);
        if (anchor.getTime() > target.getTime()) {
          months = Math.max(0, months - 1);
          anchor.setTime(now.getTime());
          anchor.setMonth(anchor.getMonth() + months);
        }
        const remSec = Math.max(0, Math.floor((target.getTime() - anchor.getTime()) / 1000));
        const remDays = Math.min(31, Math.floor(remSec / 86400));
        const remHrs = Math.floor((remSec % 86400) / 3600);
        const remMins = Math.floor((totalSec % 3600) / 60);
        const remSecs = totalSec % 60;
        if (dateMainEl) {
          dateMainEl.textContent = `${String(remMins).padStart(2, '0')}m ${String(remSecs).padStart(2, '0')}s · Côte Basque`;
        }
        dStr =
          String(Math.min(99, months)).padStart(2, '0') +
          String(remDays).padStart(2, '0') +
          String(remHrs).padStart(2, '0');
      } else {
        const meta = CITY_DATA[currentCity] || CITY_DATA.biarritz;
        const t = formatTzTime(meta.tz);
        dStr = `${t.h}${t.m}${t.s}`;
      }

      for (let i = 0; i < 6; i++) {
        setDigit(i, Number(dStr[i] || 0));
      }
    }

    document.querySelectorAll('[data-timer-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextMode = btn.getAttribute('data-timer-mode');
        if (!nextMode || nextMode === currentMode) return;
        currentMode = nextMode;
        document.querySelectorAll('[data-timer-mode]').forEach((b) => {
          b.classList.toggle('is-active', b === btn);
        });
        refreshSceneInfo(true);
        tick();
      });
    });

    document.querySelectorAll('[data-timer-city]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextCity = btn.getAttribute('data-timer-city');
        if (!nextCity || nextCity === currentCity) return;
        currentCity = nextCity;
        document.querySelectorAll('[data-timer-city]').forEach((b) => {
          b.classList.toggle('is-active', b === btn);
        });
        refreshSceneInfo(true);
        tick();
      });
    });

    refreshSceneInfo(false);
    tick();
    setInterval(tick, 1000);
  }

  /* 4. Timeline interactive Motion Studio dans #parcours */
  function initParcoursTimeline() {
    const playhead = document.getElementById('tl-playhead');
    const readout = document.getElementById('tl-active-readout');
    const playBtn = document.getElementById('tl-play-btn');
    const tracks = Array.from(document.querySelectorAll('.tl-track-row[data-tl-idx]'));
    const cards = Array.from(document.querySelectorAll('.parcours-bento .bento-card'));
    if (!playhead || !tracks.length) return;

    let currentIdx = 3;
    let playTimer = 0;

    function selectStep(idx) {
      currentIdx = idx;
      const tr = tracks[idx];
      if (!tr) return;
      const parsedPos = parseFloat(tr.getAttribute('data-pos') || '0.5');
      const pos = Number.isFinite(parsedPos) ? Math.min(1, Math.max(0, parsedPos)) : 0.5;
      const cardIdx = parseInt(tr.getAttribute('data-card') || '0', 10);
      const label = tr.getAttribute('data-label') || '';

      tracks.forEach((row) => row.classList.toggle('is-active', row === tr));
      cards.forEach((c, ci) => c.classList.toggle('is-tl-focused', ci === cardIdx));
      if (readout) readout.textContent = label;

      const offsetLeft = window.innerWidth < 768 ? 110 : 164;
      playhead.style.left = `calc(${offsetLeft}px + (100% - ${offsetLeft}px) * ${pos.toFixed(2)})`;
    }

    tracks.forEach((tr, idx) => {
      tr.addEventListener('click', () => {
        if (playTimer) {
          clearInterval(playTimer);
          playTimer = 0;
          if (playBtn) playBtn.textContent = '▶ Lecture';
        }
        selectStep(idx);
      });
    });

    playBtn?.addEventListener('click', () => {
      if (playTimer) {
        clearInterval(playTimer);
        playTimer = 0;
        playBtn.textContent = '▶ Lecture';
        return;
      }
      playBtn.textContent = '❚❚ Pause';
      let step = (currentIdx + 1) % tracks.length;
      selectStep(step);
      playTimer = setInterval(() => {
        step = (step + 1) % tracks.length;
        selectStep(step);
      }, 1500);
    });

    selectStep(3);
  }

  /* 5. Transitions Motion sur onglets Projets & inversion thème (Dribbble V2) */
  function staggerTabContent(panel) {
    if (!panel || reduced()) return;
    const M = getMotion();
    const items = panel.querySelectorAll('.fact-checklist li, .tech-chip-row .tech-chip');
    items.forEach((item, idx) => {
      if (M && typeof M.animate === 'function') {
        M.animate(
          item,
          { opacity: [0, 1], transform: ['translateY(10px)', 'translateY(0px)'] },
          { duration: 0.34, delay: Math.min(idx * 0.045, 0.36), easing: [0.22, 1, 0.36, 1] }
        );
      }
    });
  }

  function initMotionPolish() {
    document.querySelectorAll('[data-project-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-project-tab');
        const panel = document.querySelector(`[data-project-panel="${key}"]`);
        if (panel) {
          panel.style.opacity = '1';
          animateSafe(panel, { opacity: [0.88, 1], transform: ['translateY(8px)', 'translateY(0px)'] }, { duration: 0.28, easing: [0.22, 1, 0.36, 1] });
          staggerTabContent(panel);
        }
      });
    });

    window.addEventListener('matei:themechange', () => {
      const chip = document.querySelector('.brand-chip .kinetic-bars-svg');
      if (chip) {
        animateSafe(chip, { rotate: [0, 180], scale: [1, 1.18, 1] }, { duration: 0.45, easing: [0.22, 1, 0.36, 1] });
      }
    });
  }

  /* 6. Storytelling Chorégraphié au Scroll (Actes, CAD Rules, Scrubbing & Header Chapter Readout) */
  function initScrollStorytelling() {
    if (reduced()) return;

    const CHAPTERS = [
      { id: 'hero', code: 'ACTE 0 // PROFIL' },
      { id: 'chronicle-timer', code: 'ACTE 0.5 // CHRONO' },
      { id: 'flagships', code: 'ACTE I // PROJETS' },
      { id: 'exploded-architecture', code: 'ACTE II // TOTEM 3D' },
      { id: 'parcours', code: 'ACTE III // PARCOURS' },
      { id: 'contact', code: 'ACTE IV // CONTACT' }
    ];

    let navReadoutEl = document.getElementById('nav-chapter-readout');
    if (!navReadoutEl) {
      const navActions = document.querySelector('.nav-capsule .nav-actions');
      if (navActions) {
        navReadoutEl = document.createElement('span');
        navReadoutEl.id = 'nav-chapter-readout';
        navReadoutEl.className = 'nav-chapter-readout';
        navReadoutEl.textContent = CHAPTERS[0].code;
        navActions.insertBefore(navReadoutEl, navActions.firstChild);
      }
    }

    function updateScrubAndChapter() {
      const sy = window.scrollY || 0;
      const vh = window.innerHeight || 800;

      // Parallax scrub (valeurs bornées finies : 0..1)
      const heroRatio = Math.max(-1, Math.min(1.5, sy / Math.max(1, vh)));
      document.documentElement.style.setProperty('--hero-scrub', heroRatio.toFixed(3));

      const totemSec = document.getElementById('exploded-architecture');
      if (totemSec) {
        const tr = totemSec.getBoundingClientRect();
        const raw = (vh - tr.top) / Math.max(1, vh + tr.height);
        const clamped = Number.isFinite(raw) ? Math.max(0, Math.min(1, raw)) : 0;
        document.documentElement.style.setProperty('--totem-scrub', clamped.toFixed(3));
      }

      // Calcul chapitre actif
      let curIdx = 0;
      CHAPTERS.forEach((ch, idx) => {
        const el = document.getElementById(ch.id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= vh * 0.42) curIdx = idx;
      });
      if (navReadoutEl) navReadoutEl.textContent = CHAPTERS[curIdx].code;
    }

    let scrubQueued = false;
    const onScrollOrResize = () => {
      if (scrubQueued) return;
      scrubQueued = true;
      requestAnimationFrame(() => {
        scrubQueued = false;
        updateScrubAndChapter();
        checkGroupsInView();
      });
    };

    const groups = [];
    let storyArmed = false;

    function revealGroup(g) {
      if (g.revealed) return;
      g.revealed = true;
      const M = getMotion();
      g.items.forEach((item, idx) => {
        const el = item.el;
        const delay = item.delay != null ? item.delay : idx * 0.045;
        el.setAttribute('data-story', 'visible');
        if (M && typeof M.animate === 'function') {
          if (item.mode === 'clipTitle') {
            M.animate(el, { opacity: [0, 1], clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'], transform: ['translateY(16px)', 'translateY(0px)'] }, { duration: 0.48, delay, easing: [0.22, 1, 0.36, 1] });
          } else if (item.mode === 'barX') {
            M.animate(el, { opacity: [0, 1], transform: ['scaleX(0.12)', 'scaleX(1)'] }, { duration: 0.48, delay, easing: [0.22, 1, 0.36, 1] });
          } else if (item.mode === 'slideLeft') {
            M.animate(el, { opacity: [0, 1], transform: ['translateX(-18px)', 'translateX(0px)'] }, { duration: 0.46, delay, easing: [0.22, 1, 0.36, 1] });
          } else if (item.mode === 'zoomCanvas') {
            M.animate(el, { opacity: [0, 1], transform: ['scale(0.95)', 'scale(1)'] }, { duration: 0.48, delay, easing: [0.22, 1, 0.36, 1] });
          } else {
            M.animate(el, { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] }, { duration: 0.44, delay, easing: [0.22, 1, 0.36, 1] });
          }
        }
      });
      if (typeof g.onReveal === 'function') g.onReveal();
    }

    function checkGroupsInView() {
      if (!storyArmed) return;
      const thresholdY = (window.innerHeight || 800) * 0.92;
      groups.forEach((g) => {
        if (g.revealed) return;
        const r = g.triggerEl.getBoundingClientRect();
        if (r.top <= thresholdY) revealGroup(g);
      });
    }

    function buildStoryGroups() {
      const addGroup = (triggerEl, itemSpecs, onReveal) => {
        if (!triggerEl) return;
        const items = [];
        itemSpecs.forEach((sp) => {
          const nodes = sp.all ? Array.from(document.querySelectorAll(sp.sel)) : [document.querySelector(sp.sel)];
          nodes.forEach((el, idx) => {
            if (!el) return;
            items.push({
              el,
              mode: sp.mode || 'rise',
              delay: (sp.baseDelay || 0) + idx * (sp.step || 0.045)
            });
          });
        });
        if (items.length) groups.push({ triggerEl, items, onReveal, revealed: false });
      };

      addGroup(document.querySelector('.hero-proof-deck'), [
        { sel: '.hero-proof-deck .proof-deck-header', mode: 'rise', baseDelay: 0 },
        { sel: '.hero-proof-grid .proof-stat-card', mode: 'rise', baseDelay: 0.04, step: 0.055, all: true }
      ]);

      addGroup(document.getElementById('chronicle-timer'), [
        { sel: '#chronicle-timer .timer-grid-card', mode: 'rise', baseDelay: 0.02 }
      ], () => {
        const wipeBtn = document.querySelector('#timer-tile-wipe');
        if (wipeBtn) {
          const cells = Array.from(wipeBtn.querySelectorAll('.timer-tile-cell'));
          const M = getMotion();
          if (M && typeof M.animate === 'function') {
            cells.forEach((c, idx) => {
              const delay = ((idx % 8) + Math.floor(idx / 8) * 2) * 0.02;
              M.animate(c, { opacity: [0.92, 0], scale: [1, 0.88] }, { duration: 0.38, delay, easing: [0.22, 1, 0.36, 1] });
            });
          }
        }
      });

      addGroup(document.getElementById('flagships'), [
        { sel: '#flagships .section-cad-rule', mode: 'rise', baseDelay: 0 },
        { sel: '#flagships .kicker-pill', mode: 'rise', baseDelay: 0.03 },
        { sel: '#flagships .section-title', mode: 'clipTitle', baseDelay: 0.06 },
        { sel: '#flagships .section-lead', mode: 'rise', baseDelay: 0.09 },
        { sel: '#flagships .agent-pilot-bar', mode: 'rise', baseDelay: 0.12 },
        { sel: '#flagships .project-tab-btn', mode: 'rise', baseDelay: 0.14, step: 0.035, all: true },
        { sel: '#flagships .project-showcase-stage', mode: 'rise', baseDelay: 0.18 }
      ], () => {
        const activePanel = document.querySelector('.project-panel:not([hidden])');
        staggerTabContent(activePanel);
      });

      addGroup(document.getElementById('exploded-architecture'), [
        { sel: '#exploded-architecture .section-cad-rule', mode: 'rise', baseDelay: 0 },
        { sel: '#exploded-architecture .kicker-pill', mode: 'rise', baseDelay: 0.03 },
        { sel: '#exploded-architecture .section-title', mode: 'clipTitle', baseDelay: 0.06 },
        { sel: '#exploded-architecture .section-lead', mode: 'rise', baseDelay: 0.09 },
        { sel: '#exploded-architecture .totem-readout-panel', mode: 'slideLeft', baseDelay: 0.12 },
        { sel: '#exploded-architecture .totem-canvas-wrap', mode: 'zoomCanvas', baseDelay: 0.15 }
      ]);

      addGroup(document.getElementById('parcours'), [
        { sel: '#parcours .section-cad-rule', mode: 'rise', baseDelay: 0 },
        { sel: '#parcours .kicker-pill', mode: 'rise', baseDelay: 0.03 },
        { sel: '#parcours .section-title', mode: 'clipTitle', baseDelay: 0.06 },
        { sel: '#parcours .section-lead', mode: 'rise', baseDelay: 0.09 },
        { sel: '#parcours .parcours-timeline-studio', mode: 'rise', baseDelay: 0.12 },
        { sel: '#parcours .tl-track-span', mode: 'barX', baseDelay: 0.14, step: 0.05, all: true },
        { sel: '#parcours .bento-card', mode: 'rise', baseDelay: 0.16, step: 0.055, all: true }
      ]);

      addGroup(document.getElementById('contact'), [
        { sel: '#contact .section-cad-rule', mode: 'rise', baseDelay: 0 },
        { sel: '#contact .contact-banner', mode: 'rise', baseDelay: 0.05 },
        { sel: '#contact .site-footer', mode: 'rise', baseDelay: 0.1 }
      ]);
    }

    function armScrollStorytelling() {
      if (storyArmed) return;
      if (document.querySelector('swarm-rebuild')) return;
      storyArmed = true;
      buildStoryGroups();
      const vh = window.innerHeight || 800;

      groups.forEach((g) => {
        const r = g.triggerEl.getBoundingClientRect();
        if (r.top <= vh * 0.88) {
          g.revealed = true;
          g.items.forEach((item) => item.el.setAttribute('data-story', 'visible'));
        } else {
          g.items.forEach((item) => item.el.setAttribute('data-story', 'pending'));
        }
      });

      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const match = groups.find((g) => g.triggerEl === entry.target);
              if (match) revealGroup(match);
              io.unobserve(entry.target);
            });
          },
          { threshold: 0.06, rootMargin: '0px 0px -6% 0px' }
        );
        groups.forEach((g) => {
          if (!g.revealed) io.observe(g.triggerEl);
        });
      }
      updateScrubAndChapter();
    }

    // Ne jamais masquer d'éléments tant que le moteur de capture swarm.js scanne la page :
    // attendre que swarm-rebuild ait monté puis disparu (Go live / Esc), ou armer directement si swarm=off.
    const qp = new URLSearchParams(window.location.search);
    const swarmOff = qp.get('swarm') === 'off' || qp.get('swarm') === '0';
    let sawSwarmHost = false;

    const tryArmWhenClear = () => {
      if (storyArmed) return;
      const host = document.querySelector('swarm-rebuild');
      if (host) {
        sawSwarmHost = true;
        return;
      }
      if ((sawSwarmHost || swarmOff) && !document.body.classList.contains('is-preloading')) {
        armScrollStorytelling();
      }
    };

    const obs = new MutationObserver(() => {
      updateScrubAndChapter();
      tryArmWhenClear();
    });
    obs.observe(document.documentElement, { childList: true });

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    if (swarmOff) {
      setTimeout(tryArmWhenClear, 120);
      window.addEventListener('matei:heroentered', () => setTimeout(tryArmWhenClear, 80), { once: true });
    }
    updateScrubAndChapter();
  }

  /* 7. Interactions Studio : Bouton Magnétique Finale & Aperçu Flottant Onglets (Zajno/Snellenberg) */
  function initStudioMicroInteractions() {
    if (reduced()) return;

    const orb = document.getElementById('copy-email-btn');
    if (orb && window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
      orb.addEventListener('pointermove', (e) => {
        const r = orb.getBoundingClientRect();
        const dx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 12;
        const dy = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 12;
        orb.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
      });
      orb.addEventListener('pointerleave', () => {
        orb.style.transform = '';
      });
    }

    if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
      const PREVIEW_META = {
        zenworkspace: { img: 'portfolio_assets/real_previews/zentable_real.png', tag: 'REACT 18 · 57/57 VITEST' },
        cloud: { img: 'portfolio_assets/real_previews/kai_academic_real.png', tag: 'PYTHON DAG · 20 AGENTS' },
        oss: { img: 'portfolio_assets/real_previews/security_scanner_real.png', tag: '46 PRS · OWASP MCP' },
        kai: { img: 'portfolio_assets/real_previews/kai_academic_real.png', tag: 'IUT ANGLET · 447 DOCS' },
        polydrive: { img: 'portfolio_assets/real_previews/zentable_real.png', tag: 'NUMPY MLP · 876 PARAMS' }
      };

      const card = document.createElement('div');
      card.className = 'tab-hover-preview';
      card.setAttribute('aria-hidden', 'true');
      card.innerHTML = `<img alt="" /><div class="tab-hover-preview-cap"><span id="thp-title"></span><span id="thp-tag" style="color:var(--accent)"></span></div>`;
      document.body.appendChild(card);

      const imgEl = card.querySelector('img');
      const titleEl = card.querySelector('#thp-title');
      const tagEl = card.querySelector('#thp-tag');
      let hovered = false;

      document.querySelectorAll('.project-tab-btn').forEach((btn) => {
        btn.addEventListener('pointerenter', () => {
          if (window.innerWidth < 1024 || btn.classList.contains('is-active')) return;
          const key = btn.getAttribute('data-project-tab');
          const info = PREVIEW_META[key];
          if (!info || key === 'cloud' || key === 'polydrive') return;
          hovered = true;
          imgEl.src = info.img;
          if (titleEl) titleEl.textContent = btn.textContent.trim();
          if (tagEl) tagEl.textContent = info.tag;
          const r = btn.getBoundingClientRect();
          card.style.transform = `translate3d(${Math.round(Math.min(window.innerWidth - 260, Math.max(16, r.left)))}px, ${Math.round(r.top - 186)}px, 0) scale(1)`;
          card.classList.add('is-visible');
        });
        btn.addEventListener('pointerleave', () => {
          hovered = false;
          card.classList.remove('is-visible');
        });
        btn.addEventListener('click', () => {
          if (hovered) {
            hovered = false;
            card.classList.remove('is-visible');
          }
        });
      });
    }
  }

  function bootStoryMotion() {
    initNavScrollLine();
    initProofOdometers();
    initChronicleTimer();
    initParcoursTimeline();
    initMotionPolish();
    initScrollStorytelling();
    initStudioMicroInteractions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootStoryMotion);
  } else {
    bootStoryMotion();
  }
})();
