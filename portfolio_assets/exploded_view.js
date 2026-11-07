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
      titleFr: 'Interfaces 60 fps, WebSockets & Accessibilité WCAG',
      titleEn: '60fps Web UI, WebSockets & WCAG Accessibility',
      shortFr: 'UI / WebSockets / 60fps',
      shortEn: 'UI / WebSockets / 60fps',
      descFr:
        'Interfaces HTML/CSS/JS natives et réactives à 60 fps : navigation au clavier (⌘K, focus-trap), flux de carnets d\'ordres temps réel et contrastes optimisés.',
      descEn:
        'Responsive vanilla interfaces at 60fps: full keyboard navigation (⌘K, modal focus-traps), real-time orderbook depth streams, and high contrast.',
      proofFr: 'Preuves : Ce portfolio interactif • Kai Academic • Dashboard Polymarket Live',
      proofEn: 'Proof: This interactive portfolio • Kai Academic • Live Polymarket Dashboard',
      svgIcon: `<rect x="18" y="22" width="64" height="44" rx="4" fill="none" stroke="currentColor" stroke-width="2.5"/><line x1="18" y1="33" x2="82" y2="33" stroke="currentColor" stroke-width="2"/><circle cx="25" cy="27.5" r="2" fill="#ef4444"/><circle cx="32" cy="27.5" r="2" fill="currentColor"/><path d="M30 50 L42 42 L52 52 L70 39" fill="none" stroke="#ef4444" stroke-width="2.5"/>`
    },
    {
      code: 'L05',
      side: 'right',
      slot: 0,
      accent: '#fb7185',
      tagFr: 'COUCHE 05 // INTELLIGENCE & ESSAIM AUTONOME',
      tagEn: 'LAYER 05 // AI AGENTS & SWARM LAB',
      titleFr: 'Serveurs MCP, Swarms Multi-Agents (Kai) & Trading Quant',
      titleEn: 'MCP Servers, Multi-Agent Swarms & Quant Trading',
      shortFr: 'IA / MCP / Quant',
      shortEn: 'AI / MCP / Quant',
      descFr:
        'Serveurs Model Context Protocol (Smithery/Glama), consensus multi-agents (36 agents spécialisés), arbitrage de prédictions Polymarket et modèles bayésiens.',
      descEn:
        'Published Model Context Protocol servers, multi-agent consensus swarms (36 specialized agents), Polymarket prediction arbitrage, and Bayesian models.',
      proofFr: 'Preuves : security-scanner-mcp • Moteur Polymarket V71-V150 • Swarm Kai',
      proofEn: 'Proof: security-scanner-mcp • Polymarket Engine V71-V150 • Kai Swarm',
      svgIcon: `<circle cx="30" cy="32" r="6" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="30" cy="58" r="6" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="54" cy="45" r="7" fill="none" stroke="#ef4444" stroke-width="2.5"/><circle cx="75" cy="45" r="6" fill="none" stroke="currentColor" stroke-width="2.2"/><line x1="36" y1="34" x2="47" y2="42" stroke="currentColor" stroke-width="1.8"/><line x1="36" y1="56" x2="47" y2="48" stroke="currentColor" stroke-width="1.8"/><line x1="61" y1="45" x2="69" y2="45" stroke="#ef4444" stroke-width="2.2"/>`
    },
    {
      code: 'L04',
      side: 'left',
      slot: 1,
      accent: '#ef4444',
      tagFr: 'COUCHE 04 // SÉCURITÉ APPLICATIVE & GARDE-FOUS',
      tagEn: 'LAYER 04 // APPSEC & HARDENING',
      titleFr: 'Failles XSS (CWE-79), Masquage d\'Erreurs (CWE-209) & RBAC',
      titleEn: 'XSS Fixes (CWE-79), Error Masking (CWE-209) & RBAC',
      shortFr: 'AppSec / RBAC / XSS',
      shortEn: 'AppSec / RBAC / XSS',
      descFr:
        'Contrôle strict des autorisations, assainissement des entrées utilisateur, élimination des fuites de traces de pile internes et vérification RFC 9116.',
      descEn:
        'Strict mutation authorization checks, input sanitization, internal stack trace leak elimination, and RFC 9116 security.txt verification.',
      proofFr: 'Preuves : 7 PRs fusionnées sur BasedHardware/omi • Audits de sécurité',
      proofEn: 'Proof: 7 merged PRs on BasedHardware/omi • AppSec code audits',
      svgIcon: `<path d="M50 18 L76 30 V50 C76 66 50 82 50 82 C50 82 24 66 24 50 V30 Z" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M50 36 V62 M38 49 H62" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>`
    },
    {
      code: 'L03',
      side: 'right',
      slot: 1,
      accent: '#38bdf8',
      tagFr: 'COUCHE 03 // DONNÉES & PERSISTANCE',
      tagEn: 'LAYER 03 // DATA & PERSISTENCE',
      titleFr: 'SQLite WAL, Vecteurs & Modélisation Relationnelle 3NF',
      titleEn: 'SQLite WAL, Vectors & Normalized Relational SQL',
      shortFr: 'Data / SQLite / SQL 3NF',
      shortEn: 'Data / SQLite / SQL 3NF',
      descFr:
        'Conception de schémas relationnels normalisés (Merise MCD/MLD, SQL 3NF), bases vectorielles haute performance et grand livre de transactions immuable.',
      descEn:
        'Normalized relational schemas (Merise MCD/MLD, 3NF SQL), high-performance vector databases, and immutable transaction ledger architecture.',
      proofFr: 'Preuves : Letta Memory OS • Trade Ledger SHA-256 • Projets R1.05 IUT',
      proofEn: 'Proof: Letta Memory OS • SHA-256 Trade Ledger • IUT R1.05 SQL Labs',
      svgIcon: `<ellipse cx="50" cy="28" rx="28" ry="10" fill="none" stroke="currentColor" stroke-width="2.3"/><path d="M22 28 V50 C22 56 34 60 50 60 C66 60 78 56 78 50 V28" fill="none" stroke="currentColor" stroke-width="2.3"/><path d="M22 50 V72 C22 78 34 82 50 82 C66 82 78 78 78 72 V50" fill="none" stroke="currentColor" stroke-width="2.3"/><path d="M40 45 L50 53 L62 39" fill="none" stroke="#38bdf8" stroke-width="2.5"/>`
    },
    {
      code: 'L02',
      side: 'left',
      slot: 2,
      accent: '#f59e0b',
      tagFr: 'COUCHE 02 // SERVICES LINUX & SUPERVISION',
      tagEn: 'LAYER 02 // LINUX SERVICES & SUPERVISION',
      titleFr: '19 Démons Systemd, VPS Oracle Cloud 24/7 & Auto-Guérison',
      titleEn: '19 Systemd Units, 24/7 Oracle VPS & Watchdogs',
      shortFr: 'Systemd / Linux / 24-7',
      shortEn: 'Systemd / Linux / 24-7',
      descFr:
        'Supervision d\'infrastructure serveur Ubuntu 24.04 sans dépendance propriétaire : démons systemd redémarrés automatiquement, tunnels Cloudflare chiffrés et scripts de veille.',
      descEn:
        'Ubuntu 24.04 server orchestration without proprietary cloud locks: self-healing systemd services, encrypted Cloudflare tunnels, and continuous daemons.',
      proofFr: 'Preuves : VPS Oracle Cloud 88.96.47.180 • Uptime 99.98% • Sentinelles actives',
      proofEn: 'Proof: Oracle Cloud VPS 88.96.47.180 • 99.98% uptime • Active sentinels',
      svgIcon: `<rect x="20" y="24" width="60" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="2.3"/><circle cx="28" cy="34" r="2.5" fill="#f59e0b"/><line x1="36" y1="34" x2="68" y2="34" stroke="currentColor" stroke-width="2"/><rect x="20" y="52" width="60" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="2.3"/><circle cx="28" cy="62" r="2.5" fill="#10b981"/><line x1="36" y1="62" x2="56" y2="62" stroke="currentColor" stroke-width="2"/>`
    },
    {
      code: 'L01',
      side: 'right',
      slot: 2,
      accent: '#38bdf8',
      tagFr: 'COUCHE 01 // BAS NIVEAU, C99 & INTÉGRITÉ MÉMOIRE',
      tagEn: 'LAYER 01 // SYSTEMS, ISO C99 & MEMORY INTEGRITY',
      titleFr: 'ISO C99 Stricte, Arbres AST & Valgrind Zéro Fuite',
      titleEn: 'Strict ISO C99, AST Trees & Zero-Leak Valgrind',
      shortFr: 'C99 / AST / Valgrind',
      shortEn: 'C99 / AST / Valgrind',
      descFr:
        'Développement en C standard ANSI/ISO C99 compilé sous -Wall -Wextra -Werror, Allman bracing style, prototypage rigoureux et vérification dynamique Valgrind (0 octet perdu).',
      descEn:
        'ANSI/ISO C99 systems programming compiled under -Wall -Wextra -Werror, Allman bracing style, strict prototyping, and Valgrind verification (0 bytes leaked).',
      proofFr: 'Preuves : AlgoForge Pro Studio • Katas algorithmiques IUT Anglet (R1.01)',
      proofEn: 'Proof: AlgoForge Pro Studio • IUT Anglet algorithmic katas (R1.01)',
      svgIcon: `<rect x="26" y="26" width="48" height="48" rx="6" fill="none" stroke="currentColor" stroke-width="2.3"/><line x1="34" y1="18" x2="34" y2="26" stroke="#38bdf8" stroke-width="2.5"/><line x1="50" y1="18" x2="50" y2="26" stroke="#38bdf8" stroke-width="2.5"/><line x1="66" y1="18" x2="66" y2="26" stroke="#38bdf8" stroke-width="2.5"/><line x1="34" y1="74" x2="34" y2="82" stroke="#38bdf8" stroke-width="2.5"/><line x1="50" y1="74" x2="50" y2="82" stroke="#38bdf8" stroke-width="2.5"/><line x1="66" y1="74" x2="66" y2="82" stroke="#38bdf8" stroke-width="2.5"/><text x="50" y="55" font-family="monospace" font-size="14" font-weight="bold" fill="currentColor" text-anchor="middle">C99</text>`
    }
  ];

  function getLang() {
    return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'fr';
  }

  function initExplodedArchitecture() {
    const stage = document.getElementById('exploded-stage');
    const stackContainer = document.getElementById('exploded-stack-3d');
    const calloutsLeft = document.getElementById('exploded-callouts-left');
    const calloutsRight = document.getElementById('exploded-callouts-right');
    const leaderSvg = document.getElementById('exploded-leader-svg');
    const floorShadow = document.getElementById('exploded-floor-shadow');
    const slider = document.getElementById('exploded-range');
    const pctLabel = document.getElementById('exploded-pct-label');
    const toggleBtn = document.getElementById('exploded-toggle-btn');

    const inspTag = document.getElementById('exploded-inspector-tag');
    const inspTitle = document.getElementById('exploded-inspector-title');
    const inspDesc = document.getElementById('exploded-inspector-desc');
    const inspProof = document.getElementById('exploded-inspector-proof');

    if (!stage || !stackContainer || !calloutsLeft || !calloutsRight) return;

    let selectedIdx = 0;
    let currentE = 0.0;
    let targetE = 0.0;
    let currentRotX = 57;
    let targetRotX = 57;
    let currentRotZ = -38;
    let targetRotZ = -38;
    let manualOverride = false;
    let isTicking = false;

    // Build slabs and callout elements
    const slabs = [];
    const callouts = [];

    // Clear existing children
    stackContainer.innerHTML = '';
    calloutsLeft.innerHTML = '';
    calloutsRight.innerHTML = '';

    EXPLODED_LAYERS.forEach((data, index) => {
      // 3D Slab
      const slab = document.createElement('div');
      slab.className = `exploded-slab slab-${data.code.toLowerCase()}`;
      slab.setAttribute('data-index', String(index));
      slab.setAttribute('role', 'button');
      slab.setAttribute('tabindex', '0');
      slab.setAttribute('aria-label', `${data.code} : ${data.titleFr}`);

      slab.innerHTML = `
        <div class="slab-face top">
          <div class="slab-chip">
            <span class="slab-badge">${data.code}</span>
            <span class="slab-name">${data.shortFr}</span>
          </div>
          <svg class="slab-glyph" viewBox="0 0 100 100">${data.svgIcon}</svg>
        </div>
        <div class="slab-face side-x"></div>
        <div class="slab-face side-y"></div>
      `;
      stackContainer.appendChild(slab);
      slabs.push(slab);

      // Callout Button
      const callout = document.createElement('button');
      callout.type = 'button';
      callout.className = `exploded-callout callout-${data.side}`;
      callout.setAttribute('data-index', String(index));
      callout.innerHTML = `
        <span class="callout-code">${data.code}</span>
        <div class="callout-body">
          <strong class="callout-title">${data.titleFr}</strong>
          <span class="callout-meta">${data.shortFr}</span>
        </div>
      `;

      if (data.side === 'left') {
        calloutsLeft.appendChild(callout);
      } else {
        calloutsRight.appendChild(callout);
      }
      callouts.push(callout);

      // Interaction listeners
      function triggerSelect() {
        selectLayer(index);
        manualOverride = true;
        if (targetE < 0.35) targetE = 0.75;
        requestTick();
      }

      slab.addEventListener('click', triggerSelect);
      callout.addEventListener('click', triggerSelect);
      slab.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerSelect();
        }
      });
    });

    function selectLayer(idx) {
      selectedIdx = idx;
      const data = EXPLODED_LAYERS[idx];
      const lang = getLang();

      slabs.forEach((s, i) => s.classList.toggle('active', i === idx));
      callouts.forEach((c, i) => c.classList.toggle('active', i === idx));

      if (inspTag) inspTag.textContent = lang === 'en' ? data.tagEn : data.tagFr;
      if (inspTitle) inspTitle.textContent = lang === 'en' ? data.titleEn : data.titleFr;
      if (inspDesc) inspDesc.textContent = lang === 'en' ? data.descEn : data.descFr;
      if (inspProof) inspProof.textContent = lang === 'en' ? data.proofEn : data.proofFr;
    }

    function computeScrollExplosion() {
      const rect = stage.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const start = vh * 0.85;
      const end = vh * 0.15;
      const progress = (start - rect.top) / (start - end);
      return Math.max(0, Math.min(1, progress));
    }

    function applyVisuals() {
      const e = currentE;
      const pct = Math.round(e * 100);
      if (slider && !manualOverride) slider.value = String(pct);
      if (pctLabel) pctLabel.textContent = `${pct}%`;

      const lang = getLang();
      if (toggleBtn) {
        if (e > 0.55) {
          toggleBtn.textContent = lang === 'en' ? 'Contract 3D View (0%)' : 'Rassembler la vue (0%)';
        } else {
          toggleBtn.textContent = lang === 'en' ? 'Explode 3D View (100%)' : 'Éclater la vue (100%)';
        }
      }

      // Position Slabs along Z axis
      const n = slabs.length;
      slabs.forEach((slab, i) => {
        const orderFromBottom = n - 1 - i;
        const baseZ = orderFromBottom * 18;
        const expandedZ = orderFromBottom * 82;
        const z = baseZ + (expandedZ - baseZ) * e;
        const isSelected = i === selectedIdx;
        const lift = isSelected ? 12 : 0;

        slab.style.transform = `translate3d(0, 0, ${z + lift}px)`;
        slab.style.opacity = '1';
      });

      // Floor Shadow
      if (floorShadow) {
        const shadowScale = 1 - e * 0.28;
        const shadowOpacity = 0.75 - e * 0.45;
        floorShadow.style.transform = `scale(${shadowScale})`;
        floorShadow.style.opacity = String(shadowOpacity);
      }

      // Animate Callouts Opacity & Drift
      callouts.forEach((callout, i) => {
        const isLeft = EXPLODED_LAYERS[i].side === 'left';
        const slideX = isLeft ? (1 - e) * -16 : (1 - e) * 16;
        callout.style.opacity = String(0.4 + e * 0.6);
        callout.style.transform = `translateX(${slideX}px)`;
      });

      // Draw SVG Leader Lines
      drawLeaderLines();
    }

    function drawLeaderLines() {
      if (!leaderSvg) return;
      const stageRect = stage.getBoundingClientRect();
      const w = stageRect.width;
      const h = stageRect.height;

      leaderSvg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      let paths = '';

      slabs.forEach((slab, i) => {
        const callout = callouts[i];
        if (!slab || !callout) return;

        const slabRect = slab.getBoundingClientRect();
        const calloutRect = callout.getBoundingClientRect();

        const isLeft = EXPLODED_LAYERS[i].side === 'left';
        const startX = isLeft ? calloutRect.right - stageRect.left : calloutRect.left - stageRect.left;
        const startY = calloutRect.top + calloutRect.height / 2 - stageRect.top;

        const endX = isLeft ? slabRect.left + slabRect.width * 0.2 - stageRect.left : slabRect.right - slabRect.width * 0.2 - stageRect.left;
        const endY = slabRect.top + slabRect.height / 2 - stageRect.top;

        const isSelected = i === selectedIdx;
        const strokeColor = isSelected ? '#ff1744' : 'rgba(255, 255, 255, 0.2)';
        const strokeWidth = isSelected ? 2 : 1;
        const dash = isSelected ? '' : 'stroke-dasharray="3 3"';

        const midX = (startX + endX) / 2;

        paths += `
          <path d="M${startX},${startY} C${midX},${startY} ${midX},${endY} ${endX},${endY}"
                fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" ${dash} opacity="${currentE > 0.15 ? 0.85 : 0.2}" />
        `;
      });

      leaderSvg.innerHTML = paths;
    }

    function tick() {
      // Spring physics toward targetE
      const diffE = targetE - currentE;
      currentE += diffE * 0.14;

      const diffRotX = targetRotX - currentRotX;
      currentRotX += diffRotX * 0.14;

      const diffRotZ = targetRotZ - currentRotZ;
      currentRotZ += diffRotZ * 0.14;

      if (stackContainer) {
        stackContainer.style.transform = `rotateX(${currentRotX}deg) rotateZ(${currentRotZ}deg)`;
      }

      applyVisuals();

      if (Math.abs(diffE) > 0.002 || Math.abs(diffRotX) > 0.05 || Math.abs(diffRotZ) > 0.05) {
        requestAnimationFrame(tick);
      } else {
        currentE = targetE;
        currentRotX = targetRotX;
        currentRotZ = targetRotZ;
        isTicking = false;
      }
    }

    function requestTick() {
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(tick);
      }
    }

    window.addEventListener(
      'scroll',
      function () {
        if (!manualOverride) {
          targetE = computeScrollExplosion();
        } else {
          const rect = stage.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > window.innerHeight) {
            manualOverride = false;
          }
        }
        requestTick();
      },
      { passive: true }
    );

    window.addEventListener('resize', requestTick, { passive: true });

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

    stage.addEventListener(
      'mousemove',
      function (ev) {
        const r = stage.getBoundingClientRect();
        const nx = (ev.clientX - r.left) / Math.max(1, r.width) - 0.5;
        const ny = (ev.clientY - r.top) / Math.max(1, r.height) - 0.5;
        targetRotX = 57 - ny * 8;
        targetRotZ = -38 + nx * 10;
        requestTick();
      },
      { passive: true }
    );

    stage.addEventListener('mouseleave', function () {
      targetRotX = 57;
      targetRotZ = -38;
      requestTick();
    });

    selectLayer(0);
    targetE = computeScrollExplosion();
    currentE = targetE;
    applyVisuals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExplodedArchitecture);
  } else {
    initExplodedArchitecture();
  }
})();
