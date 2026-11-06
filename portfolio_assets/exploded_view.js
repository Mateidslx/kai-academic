/* ==========================================================================
   MATÉI DE SAINT LÉGER — INTERACTIVE 3D / 2.5D EXPLODED ARCHITECTURE VIEW
   Spring-Damped Axis Dissociation | SVG Leader Callouts | Attenuating Shadows
   ========================================================================== */

(function () {
  'use strict';

  const EXPLODED_LAYERS = [
    {
      code: 'L06',
      side: 'left',
      slot: 0,
      accent: '#ef4444',
      tagFr: 'COUCHE 06 // INTERFACE & EXPÉRIENCE',
      tagEn: 'LAYER 06 // UI & INTERACTION',
      titleFr: 'Interfaces 60 fps, React & Accessibilité WCAG',
      titleEn: '60fps Web UI, React & WCAG Accessibility',
      shortFr: 'UI / React / 60fps',
      shortEn: 'UI / React / 60fps',
      descFr:
        'Applications TypeScript / React / Next.js et interfaces HTML/CSS/JS natives fluides à 60 fps, navigation clavier (⌘K, focus-trap) et contrastes soignés.',
      descEn:
        'Responsive TypeScript / React / Next.js apps and zero-bloat 60fps vanilla interfaces with full keyboard navigation (⌘K, modal focus-traps) and high contrast.',
      proofFr: 'Preuves : Ce portfolio interactif • Kai Academic • 38 PRs Frontend & Vitest',
      proofEn: 'Proof: This interactive portfolio • Kai Academic • 38 Frontend & Vitest PRs',
      svgIcon: `<rect x="18" y="22" width="64" height="44" rx="4" fill="none" stroke="currentColor" stroke-width="2.5"/><line x1="18" y1="33" x2="82" y2="33" stroke="currentColor" stroke-width="2"/><circle cx="25" cy="27.5" r="2" fill="#ef4444"/><circle cx="32" cy="27.5" r="2" fill="currentColor"/><path d="M30 50 L42 42 L52 52 L70 39" fill="none" stroke="#ef4444" stroke-width="2.5"/>`
    },
    {
      code: 'L05',
      side: 'right',
      slot: 0,
      accent: '#fb7185',
      tagFr: 'COUCHE 05 // INTELLIGENCE & AUTOMATISATION',
      tagEn: 'LAYER 05 // AI AGENTS & NEURAL LAB',
      titleFr: 'Serveurs MCP, Orchestration DAG & Réseaux de Neurones',
      titleEn: 'MCP Servers, DAG Orchestration & Neural Prototypes',
      shortFr: 'IA / MCP / Neurones',
      shortEn: 'AI / MCP / Neural',
      descFr:
        'Serveurs Model Context Protocol publiés (Smithery/Glama), graphes de tâches Python déterministes, extraction OpenCV/FEN (Stockfish NNUE) et réseaux de neurones.',
      descEn:
        'Published Model Context Protocol servers, deterministic Python task DAGs, OpenCV/DOM chess state extraction (Stockfish NNUE), and neural network prototypes.',
      proofFr: 'Preuves : security-scanner-mcp • V-Bot Chess UCI • Orchestrateur Kai',
      proofEn: 'Proof: security-scanner-mcp • V-Bot Chess UCI • Kai DAG Orchestrator',
      svgIcon: `<circle cx="30" cy="32" r="6" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="30" cy="58" r="6" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="54" cy="45" r="7" fill="none" stroke="#ef4444" stroke-width="2.5"/><circle cx="75" cy="45" r="6" fill="none" stroke="currentColor" stroke-width="2.2"/><line x1="36" y1="34" x2="47" y2="42" stroke="currentColor" stroke-width="1.8"/><line x1="36" y1="56" x2="47" y2="48" stroke="currentColor" stroke-width="1.8"/><line x1="61" y1="45" x2="69" y2="45" stroke="#ef4444" stroke-width="2.2"/>`
    },
    {
      code: 'L04',
      side: 'left',
      slot: 1,
      accent: '#ef4444',
      tagFr: 'COUCHE 04 // SÉCURITÉ & GARDE-FOUS',
      tagEn: 'LAYER 04 // APPSEC & HARDENING',
      titleFr: 'Permissions RBAC, Anti-XSS, CWE-209 & RFC 9116',
      titleEn: 'RBAC Guards, Anti-XSS, CWE-209 & RFC 9116',
      shortFr: 'AppSec / RBAC / XSS',
      shortEn: 'AppSec / RBAC / XSS',
      descFr:
        'Contrôle strict des autorisations sur les mutations sensibles, masquage des traces internes d’exceptions, validation des bornes et conformité security.txt.',
      descEn:
        'Strict authorization checks on sensitive mutations, internal stack-trace sanitization, payload boundary validation, and RFC 9116 disclosure compliance.',
      proofFr: 'Preuves : PR #26490 sur Twenty CRM (40k★) • 6+ PRs sécurité sur BasedHardware/omi',
      proofEn: 'Proof: PR #26490 in Twenty CRM (40k★) • 6+ security PRs in BasedHardware/omi',
      svgIcon: `<path d="M50 18 L76 28 V46 C76 62 64 73 50 79 C36 73 24 62 24 46 V28 Z" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M40 48 L47 55 L61 40" fill="none" stroke="#ef4444" stroke-width="2.8" stroke-linecap="round"/>`
    },
    {
      code: 'L03',
      side: 'right',
      slot: 1,
      accent: '#f87171',
      tagFr: 'COUCHE 03 // LOGIQUE MÉTIER & APIS',
      tagEn: 'LAYER 03 // BACKEND & REAL-TIME APIS',
      titleFr: 'Services Python FastAPI, NestJS & Tests Hermétiques',
      titleEn: 'FastAPI, NestJS Services & Hermetic Test Suites',
      shortFr: 'FastAPI / NestJS / TDD',
      shortEn: 'FastAPI / NestJS / TDD',
      descFr:
        'APIs REST & WebSockets asynchrones, verrous distribués atomiques sur les flux OAuth concurrents, et couverture de non-régression Pytest / Vitest.',
      descEn:
        'Asynchronous REST & WebSocket backends, atomic concurrency locks across OAuth flows, and hermetic Pytest / Vitest regression test suites.',
      proofFr: 'Preuves : 46 Pull Requests fusionnées en production • Scanners WebSockets',
      proofEn: 'Proof: 46 upstream merged Pull Requests • Real-time WebSocket scanners',
      svgIcon: `<rect x="20" y="24" width="60" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="20" y="48" width="60" height="16" rx="3" fill="none" stroke="#ef4444" stroke-width="2.2"/><circle cx="29" cy="32" r="2.5" fill="#ef4444"/><circle cx="29" cy="56" r="2.5" fill="currentColor"/><line x1="42" y1="32" x2="70" y2="32" stroke="currentColor" stroke-width="2"/><line x1="42" y1="56" x2="70" y2="56" stroke="#ef4444" stroke-width="2"/>`
    },
    {
      code: 'L02',
      side: 'left',
      slot: 2,
      accent: '#ef4444',
      tagFr: 'COUCHE 02 // DONNÉES & PERSISTANCE',
      tagEn: 'LAYER 02 // RELATIONAL DATA & WAL',
      titleFr: 'Modélisation Merise 3NF, PostgreSQL & SQLite WAL',
      titleEn: '3NF Data Modeling, PostgreSQL & SQLite WAL',
      shortFr: 'PostgreSQL / SQL 3NF',
      shortEn: 'PostgreSQL / 3NF SQL',
      descFr:
        'Schémas relationnels normalisés (MCD / MLD), intégrité référentielle stricte, requêtes analytiques SQL et journalisation transactionnelle Write-Ahead Logging.',
      descEn:
        'Normalized relational schemas (3NF), strict referential integrity, analytical SQL queries, and local Write-Ahead Logging (WAL) provenance stores.',
      proofFr: 'Preuves : Projets BDD IUT Anglet (R1.05 / S1.04) • Mémoire SQLite Kai • Twenty ORM',
      proofEn: 'Proof: IUT Database Labs • Kai SQLite WAL Store • Twenty ORM PR #26502',
      svgIcon: `<ellipse cx="50" cy="27" rx="26" ry="9" fill="none" stroke="currentColor" stroke-width="2.3"/><path d="M24 27 V46 C24 51 35.6 55 50 55 C64.4 55 76 51 76 46 V27" fill="none" stroke="#ef4444" stroke-width="2.3"/><path d="M24 46 V64 C24 69 35.6 73 50 73 C64.4 73 76 69 76 64 V46" fill="none" stroke="currentColor" stroke-width="2.3"/>`
    },
    {
      code: 'L01',
      side: 'right',
      slot: 2,
      accent: '#dc2626',
      tagFr: 'COUCHE 01 // SOCLE SYSTÈME & MÉMOIRE',
      tagEn: 'LAYER 01 // LINUX KERNEL & C/C++ CORE',
      titleFr: 'ISO C99 / C++, Zéro Fuite Valgrind & Ubuntu 24.04',
      titleEn: 'ISO C99 / C++, Zero-Leak Valgrind & Ubuntu 24.04',
      shortFr: 'C/C++ / Valgrind / Linux',
      shortEn: 'C/C++ / Valgrind / Linux',
      descFr:
        'Compilation stricte (-Wall -Wextra -Werror), gestion manuelle de la mémoire vérifiée sous Valgrind, et administration serveur Linux 24/7 (systemd, Docker, Nginx).',
      descEn:
        'Zero-warning C/C++ compilation (-Wall -Wextra -Werror), Valgrind heap verification, and 24/7 Ubuntu 24.04 cloud administration (systemd, Docker, Nginx).',
      proofFr: 'Preuves : VPS Ubuntu 24.04 en production • Travaux C / C++ & Katas IUT Anglet',
      proofEn: 'Proof: Live Ubuntu 24.04 VPS • Zero-leak C / C++ & OOP Systems Coursework',
      svgIcon: `<rect x="28" y="28" width="44" height="36" rx="4" fill="none" stroke="#ef4444" stroke-width="2.5"/><rect x="38" y="37" width="24" height="18" fill="none" stroke="currentColor" stroke-width="2"/><line x1="36" y1="20" x2="36" y2="28" stroke="currentColor" stroke-width="2"/><line x1="50" y1="20" x2="50" y2="28" stroke="currentColor" stroke-width="2"/><line x1="64" y1="20" x2="64" y2="28" stroke="currentColor" stroke-width="2"/><line x1="36" y1="64" x2="36" y2="72" stroke="currentColor" stroke-width="2"/><line x1="50" y1="64" x2="50" y2="72" stroke="currentColor" stroke-width="2"/><line x1="64" y1="64" x2="64" y2="72" stroke="currentColor" stroke-width="2"/>`
    }
  ];

  function initExplodedArchitecture() {
    const section = document.getElementById('exploded-architecture');
    const stage = document.getElementById('exploded-stage');
    const stackEl = document.getElementById('exploded-stack-3d');
    const leftCol = document.getElementById('exploded-callouts-left');
    const rightCol = document.getElementById('exploded-callouts-right');
    const svgEl = document.getElementById('exploded-leader-svg');
    const slider = document.getElementById('exploded-range');
    const pctLabel = document.getElementById('exploded-pct-label');
    const toggleBtn = document.getElementById('exploded-toggle-btn');
    const floorShadow = document.getElementById('exploded-floor-shadow');

    if (!section || !stage || !stackEl || !leftCol || !rightCol || !svgEl) return;

    let selectedIdx = 0;
    let manualOverride = false;
    let targetE = 0.0;
    let currentE = 0.0;
    let velE = 0.0;

    let targetRotX = 57;
    let targetRotZ = -38;
    let curRotX = 57;
    let curRotZ = -38;

    let rafId = null;
    let lastTs = 0;

    // Build 6 3D plates + 6 callout cards + 6 SVG leader paths
    const plateEls = [];
    const pinEls = [];
    const calloutEls = [];
    const leaderPaths = [];
    const leaderDots = [];

    stackEl.innerHTML = '';
    leftCol.innerHTML = '';
    rightCol.innerHTML = '';
    svgEl.innerHTML = '';

    EXPLODED_LAYERS.forEach((layer, idx) => {
      // 1. 3D Isometric Plate (div[role="button"] for true preserve-3d across all engines)
      const plate = document.createElement('div');
      plate.setAttribute('role', 'button');
      plate.setAttribute('tabindex', '0');
      plate.className = 'iso-plate' + (idx === 0 ? ' is-selected' : '');
      plate.setAttribute('data-idx', String(idx));
      plate.setAttribute('aria-label', `${layer.code} — ${layer.titleFr}`);

      plate.innerHTML = `
        <span class="iso-plate-face iso-face-top">
          <span class="iso-plate-head">
            <span class="iso-code">${layer.code}</span>
            <span class="iso-led"></span>
          </span>
          <svg class="iso-glyph" viewBox="0 0 100 92" aria-hidden="true">${layer.svgIcon}</svg>
          <span class="iso-plate-label" data-fr="${layer.shortFr}" data-en="${layer.shortEn}">${layer.shortFr}</span>
          <span class="iso-anchor-pin" data-side="${layer.side}"></span>
        </span>
        <span class="iso-plate-face iso-face-front" aria-hidden="true"></span>
        <span class="iso-plate-face iso-face-right" aria-hidden="true"></span>
      `;
      plateEls.push(plate);
      pinEls.push(plate.querySelector('.iso-anchor-pin'));

      // 2. Callout Card (Left or Right column)
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'exp-callout-card' + (idx === 0 ? ' is-selected' : '');
      card.setAttribute('data-idx', String(idx));
      card.innerHTML = `
        <span class="exp-callout-kicker" data-fr="${layer.tagFr}" data-en="${layer.tagEn}">${layer.tagFr}</span>
        <strong class="exp-callout-title" data-fr="${layer.titleFr}" data-en="${layer.titleEn}">${layer.titleFr}</strong>
        <span class="exp-callout-proof" data-fr="${layer.proofFr}" data-en="${layer.proofEn}">${layer.proofFr}</span>
      `;
      if (layer.side === 'left') {
        leftCol.appendChild(card);
      } else {
        rightCol.appendChild(card);
      }
      calloutEls.push(card);

      // 3. SVG Callout Leader Line + Pin Dot
      const ns = 'http://www.w3.org/2000/svg';
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('class', 'exp-leader-line' + (idx === 0 ? ' is-selected' : ''));
      svgEl.appendChild(path);
      leaderPaths.push(path);

      const dot = document.createElementNS(ns, 'circle');
      dot.setAttribute('r', '3.6');
      dot.setAttribute('class', 'exp-leader-dot' + (idx === 0 ? ' is-selected' : ''));
      svgEl.appendChild(dot);
      leaderDots.push(dot);

      // Click / Hover / Keyboard selection
      const selectFn = () => selectLayer(idx);
      plate.addEventListener('click', selectFn);
      plate.addEventListener('mouseenter', selectFn);
      plate.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectFn();
        }
      });
      card.addEventListener('click', selectFn);
      card.addEventListener('mouseenter', selectFn);
    });

    // Append 3D plates bottom-to-top (L01 -> L06) to match physical Z elevation
    for (let i = plateEls.length - 1; i >= 0; i--) {
      stackEl.appendChild(plateEls[i]);
    }

    function getLang() {
      return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'fr';
    }

    function selectLayer(idx) {
      selectedIdx = idx;
      const isFr = getLang() === 'fr';
      const layer = EXPLODED_LAYERS[idx] || EXPLODED_LAYERS[0];

      plateEls.forEach((el, i) => el.classList.toggle('is-selected', i === idx));
      calloutEls.forEach((el, i) => el.classList.toggle('is-selected', i === idx));
      leaderPaths.forEach((el, i) => el.classList.toggle('is-selected', i === idx));
      leaderDots.forEach((el, i) => el.classList.toggle('is-selected', i === idx));

      const inspTag = document.getElementById('exploded-inspector-tag');
      const inspTitle = document.getElementById('exploded-inspector-title');
      const inspDesc = document.getElementById('exploded-inspector-desc');
      const inspProof = document.getElementById('exploded-inspector-proof');

      if (inspTag) inspTag.textContent = isFr ? layer.tagFr : layer.tagEn;
      if (inspTitle) inspTitle.textContent = isFr ? layer.titleFr : layer.titleEn;
      if (inspDesc) inspDesc.textContent = isFr ? layer.descFr : layer.descEn;
      if (inspProof) inspProof.textContent = isFr ? layer.proofFr : layer.proofEn;

      requestTick();
    }

    function computeScrollExplosion() {
      const rect = section.getBoundingClientRect();
      const vh = Math.max(520, window.innerHeight);
      // Explodes smoothly as section enters center of viewport, re-assembles when scrolling away up
      const progress = (vh * 0.78 - rect.top) / (vh * 0.68);
      return Math.max(0, Math.min(1, progress));
    }

    function updateLeaderLines(eFactor) {
      if (window.innerWidth <= 980) {
        svgEl.style.opacity = '0';
        return;
      }

      const stageRect = stage.getBoundingClientRect();
      if (stageRect.width < 100 || stageRect.height < 100) return;

      svgEl.setAttribute('viewBox', `0 0 ${stageRect.width} ${stageRect.height}`);
      const fade = Math.max(0, Math.min(1, (eFactor - 0.18) / 0.45));
      svgEl.style.opacity = fade.toFixed(3);

      EXPLODED_LAYERS.forEach((layer, idx) => {
        const pinRect = pinEls[idx].getBoundingClientRect();
        const cardRect = calloutEls[idx].getBoundingClientRect();

        const px = pinRect.left + pinRect.width * 0.5 - stageRect.left;
        const py = pinRect.top + pinRect.height * 0.5 - stageRect.top;

        const cx =
          layer.side === 'left'
            ? cardRect.right - stageRect.left + 4
            : cardRect.left - stageRect.left - 4;
        const cy = cardRect.top + cardRect.height * 0.5 - stageRect.top;

        const elbowX = layer.side === 'left' ? cx + (px - cx) * 0.42 : cx - (cx - px) * 0.42;
        const d = `M ${px.toFixed(1)} ${py.toFixed(1)} L ${elbowX.toFixed(1)} ${cy.toFixed(1)} L ${cx.toFixed(1)} ${cy.toFixed(1)}`;

        leaderPaths[idx].setAttribute('d', d);
        leaderDots[idx].setAttribute('cx', px.toFixed(1));
        leaderDots[idx].setAttribute('cy', py.toFixed(1));
      });
    }

    function applyVisuals() {
      const e = currentE;

      // Update UI Slider & Button Readout
      const pct = Math.round(e * 100);
      if (slider && document.activeElement !== slider) {
        slider.value = String(pct);
      }
      if (pctLabel) {
        pctLabel.textContent = `${pct}%`;
      }
      if (toggleBtn) {
        const isFr = getLang() === 'fr';
        toggleBtn.textContent =
          e > 0.55
            ? isFr
              ? 'Assembler le bloc (0%)'
              : 'Assemble Core (0%)'
            : isFr
            ? 'Éclater la vue 3D (100%)'
            : 'Explode 3D View (100%)';
      }

      // Apply 3D stack orientation
      stackEl.style.transform = `rotateX(${curRotX.toFixed(2)}deg) rotateZ(${curRotZ.toFixed(2)}deg)`;

      // Position each of the 6 extruded plates along Z with spring dissociation + attenuating shadows
      const compactGap = 14;
      const explodedGap = 66;
      const gap = compactGap + (explodedGap - compactGap) * e;
      const centerOffset = 2.5 * gap;

      plateEls.forEach((plate, idx) => {
        const layerOrderFromBottom = 5 - idx; // L01 = 0 (bottom), L06 = 5 (top)
        const zPos = layerOrderFromBottom * gap - centerOffset;
        const isSel = idx === selectedIdx;
        const pullOut = isSel && e > 0.15 ? 14 : 0;

        // Shadow attenuates & spreads softly on top face without flattening preserve-3d (Golden Rule #3)
        const shadowAlpha = (0.64 - e * 0.34).toFixed(2);
        const shadowBlur = Math.round(14 + e * 28);
        const topFace = plate.firstElementChild;

        plate.style.transform = `translate3d(${pullOut}px, ${pullOut}px, ${zPos.toFixed(1)}px)`;
        if (topFace) {
          topFace.style.boxShadow = `${Math.round(6 + e * 10)}px ${Math.round(10 + e * 16)}px ${shadowBlur}px rgba(0, 0, 0, ${shadowAlpha})`;
        }
      });

      // Floor ambient shadow softens and widens as stack levitates & explodes
      if (floorShadow) {
        const sc = (0.86 + e * 0.28).toFixed(3);
        const op = (0.62 - e * 0.28).toFixed(3);
        floorShadow.style.transform = `translate(-50%, -50%) rotateX(60deg) scale(${sc})`;
        floorShadow.style.opacity = op;
      }

      // Fade in & slide Callout Cards synchronized with dissociation (Golden Rule #2)
      calloutEls.forEach((card, idx) => {
        const stagger = idx * 0.045;
        const localP = Math.max(0, Math.min(1, (e - 0.12 - stagger) / 0.48));
        const sideSign = EXPLODED_LAYERS[idx].side === 'left' ? -14 : 14;
        if (card.style.visibility !== 'hidden') {
          card.style.opacity = (0.58 + localP * 0.42).toFixed(3);
        }
        card.style.transform = `translate3d(${((1 - localP) * sideSign).toFixed(1)}px, 0, 0)`;
      });

      updateLeaderLines(e);
    }

    function tick(now) {
      const dt = lastTs ? Math.min(0.04, Math.max(0.005, (now - lastTs) / 1000)) : 0.016;
      lastTs = now;

      if (!manualOverride) {
        targetE = computeScrollExplosion();
      }

      // Real Hooke's Law Damped Spring Physics (Golden Rule #1)
      const stiffness = 135;
      const damping = 18;
      const accel = stiffness * (targetE - currentE) - damping * velE;
      velE += accel * dt;
      currentE += velE * dt;
      currentE = Math.max(0, Math.min(1, currentE));

      // Smooth pointer tilt interpolation
      const rotAlpha = 1 - Math.exp(-dt * 10);
      curRotX += (targetRotX - curRotX) * rotAlpha;
      curRotZ += (targetRotZ - curRotZ) * rotAlpha;

      applyVisuals();

      const unsettled =
        Math.abs(targetE - currentE) > 0.0015 ||
        Math.abs(velE) > 0.002 ||
        Math.abs(targetRotX - curRotX) > 0.04 ||
        Math.abs(targetRotZ - curRotZ) > 0.04;

      if (unsettled) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        currentE = targetE;
        velE = 0;
        applyVisuals();
        rafId = null;
        lastTs = 0;
      }
    }

    function requestTick() {
      if (!rafId) {
        lastTs = 0;
        rafId = window.requestAnimationFrame(tick);
      }
    }

    // Scroll listener (re-engages automatic scroll mode when user scrolls away & back)
    window.addEventListener(
      'scroll',
      function () {
        const rect = section.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          manualOverride = false;
        }
        requestTick();
      },
      { passive: true }
    );

    window.addEventListener('resize', requestTick, { passive: true });

    // Interactive Slider & Toggle Button
    if (slider) {
      slider.addEventListener('input', function () {
        manualOverride = true;
        targetE = Math.max(0, Math.min(1, parseFloat(slider.value || '0') / 100));
        requestTick();
      });
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        manualOverride = true;
        targetE = targetE > 0.55 ? 0.0 : 1.0;
        requestTick();
      });
    }

    // Subtle 3D Parallax Tilt on Pointer Move over the Stage
    stage.addEventListener(
      'mousemove',
      function (ev) {
        const r = stage.getBoundingClientRect();
        const nx = (ev.clientX - r.left) / Math.max(1, r.width) - 0.5;
        const ny = (ev.clientY - r.top) / Math.max(1, r.height) - 0.5;
        targetRotX = 57 - ny * 10;
        targetRotZ = -38 + nx * 14;
        requestTick();
      },
      { passive: true }
    );

    stage.addEventListener('mouseleave', function () {
      targetRotX = 57;
      targetRotZ = -38;
      requestTick();
    });

    // Expose language refresh hook so FR/EN toggle updates the inspector & button
    window.__refreshExplodedLang = function () {
      selectLayer(selectedIdx);
      applyVisuals();
    };

    selectLayer(0);
    targetE = computeScrollExplosion();
    currentE = targetE;
    applyVisuals();
  }

  window.addEventListener('DOMContentLoaded', initExplodedArchitecture);
})();
