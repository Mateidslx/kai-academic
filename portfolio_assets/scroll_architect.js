/* ==========================================================================
   MATÉI DE SAINT LÉGER — AUTONOMOUS MULTIPLAYER ARCHITECT ENGINE (v16.1)
   Strictly aligned with DfWWldaTQTz.mp4 & Explicit User Directives:
   1. On load/refresh: Screen starts dark with delicate blue wireframes and 0 layers.
   2. Hero construction: Multiplayer cursors spawn, attach Figma boxes, type text,
      and assemble hero sequentially (0 -> 52 layers).
   3. ZERO PARASITIC CURSORS: As soon as an element finishes building, the active cursor
      IMMEDIATELY glides back to its margin parking sanctuary. When idle, ALL cursors
      stay parked on the outer margins (x < 50px or x > width - 50px).
      THEY NEVER HOVER OR FREEZE ON TOP OF CONTENT!
   4. Human scroll-driven build: Below the fold, elements stay unbuilt wireframes.
      As the human scrolls down, incoming elements queue and assemble steadily
      one-by-one ("au fur et à mesure, pas en accéléré ni rien").
   5. Zero deconstruction: Scrolling back UP retains 100% of built elements.
   6. Bottom dock: Live agent dots, 0 -> 252 layers, and interactive scrubber knob.
   ========================================================================== */

(function () {
  'use strict';

  const AGENTS = [
    { name: 'Alex',  color: '#38bdf8' }, // Sky Cyan
    { name: 'Soren', color: '#ef4444' }, // Crimson
    { name: 'Elena', color: '#10b981' }, // Emerald
    { name: 'Kai',   color: '#fbbf24' }, // Amber
    { name: 'Axel',  color: '#a855f7' }, // Purple
    { name: 'Iris',  color: '#ec4899' }, // Pink
    { name: 'Lex',   color: '#fb923c' }, // Orange
    { name: 'Astra', color: '#22d3ee' }  // Bright Cyan
  ];

  const TOTAL_LAYERS = 252;
  const HERO_FINAL_LAYER = 52;

  let cursorNodes = [];
  let figmaSelectionBox = null;
  let figmaDimTag = null;
  let activeTargetElement = null;

  let isHeroBuilding = true;
  let isQueueWorkerRunning = false;
  let buildQueue = [];
  let registeredLayers = [];

  let isAutoTouring = false;
  let autoTourRaf = null;

  /* ------------------------------------------------------------------------
     1. CREATE MULTIPLAYER LAYER, FIGMA SELECTION OVERLAY & CURSORS
     ------------------------------------------------------------------------ */
  function setupMultiplayerLayer() {
    let overlay = document.getElementById('sahir-multiplayer-layer');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'sahir-multiplayer-layer';
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.pointerEvents = 'none';
      overlay.style.zIndex = '930';
      overlay.style.overflow = 'hidden';
      document.body.appendChild(overlay);
    }
    overlay.innerHTML = '';

    // Figma Selection Box
    figmaSelectionBox = document.createElement('div');
    figmaSelectionBox.className = 'figma-selection-overlay';
    figmaSelectionBox.style.opacity = '0';
    figmaSelectionBox.innerHTML = `
      <span class="fh-handle tl"></span>
      <span class="fh-handle tr"></span>
      <span class="fh-handle bl"></span>
      <span class="fh-handle br"></span>
      <span class="fh-dim-tag" id="figma-dim-tag">358 × 24</span>
    `;
    overlay.appendChild(figmaSelectionBox);
    figmaDimTag = document.getElementById('figma-dim-tag');

    // Spawn 8 Multiplayer Cursors
    cursorNodes = AGENTS.map((agent, i) => {
      const node = document.createElement('div');
      node.className = 'figma-agent-cursor';
      node.innerHTML = `
        <svg class="cur-arrow-svg" viewBox="0 0 16 16" fill="none">
          <path d="M1 1L14 6.5L7.5 8.5L5 14.5L1 1Z" fill="${agent.color}" stroke="#070709" stroke-width="1.2" stroke-linejoin="round"/>
        </svg>
        <span class="cur-nametag" style="background:${agent.color}">${agent.name}</span>
      `;
      overlay.appendChild(node);

      // Start position offscreen in margins
      const isLeft = i < 4;
      const startX = isLeft ? 24 + (i % 2) * 16 : window.innerWidth - (48 + (i % 2) * 16);
      const startY = 160 + (i % 4) * (window.innerHeight * 0.17);

      return {
        el: node,
        agent,
        x: startX,
        y: startY,
        tx: startX,
        ty: startY,
        orbitAngle: (i / AGENTS.length) * Math.PI * 2,
        speed: 0.016 + (i % 3) * 0.004,
        isParked: true
      };
    });
  }

  /* ------------------------------------------------------------------------
     2. PARKING MARGINS SANCTUARY (ZERO PARASITIC CURSORS ON IDLE)
     ------------------------------------------------------------------------ */
  function parkSingleCursor(cursor, i) {
    if (!cursor) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    cursor.isParked = true;
    if (i < 4) {
      // Left margin: x between 20px and 45px
      cursor.tx = 24 + (i % 2) * 16;
      cursor.ty = 160 + i * (h * 0.17);
    } else {
      // Right margin: x between w-55px and w-30px
      cursor.tx = w - (48 + (i % 2) * 16);
      cursor.ty = 180 + (i - 4) * (h * 0.17);
    }
  }

  function parkCursorsAtMargins() {
    cursorNodes.forEach((c, i) => {
      parkSingleCursor(c, i);
    });
    detachFigmaBox();
  }

  /* ------------------------------------------------------------------------
     3. FIGMA SELECTION BOX HELPERS
     ------------------------------------------------------------------------ */
  function attachFigmaBox(element, customLabel) {
    if (!element || !figmaSelectionBox) return;
    activeTargetElement = element;
    const r = element.getBoundingClientRect();

    figmaSelectionBox.style.top = `${r.top + window.scrollY - 3}px`;
    figmaSelectionBox.style.left = `${r.left + window.scrollX - 4}px`;
    figmaSelectionBox.style.width = `${Math.max(40, r.width + 8)}px`;
    figmaSelectionBox.style.height = `${Math.max(20, r.height + 6)}px`;
    figmaSelectionBox.style.opacity = '1';

    if (figmaDimTag) {
      figmaDimTag.textContent = customLabel || `${Math.round(r.width)} × ${Math.round(r.height)}`;
    }
  }

  function detachFigmaBox() {
    activeTargetElement = null;
    if (figmaSelectionBox) {
      figmaSelectionBox.style.opacity = '0';
    }
  }

  /* ------------------------------------------------------------------------
     4. REGISTER ALL CONSTRUCTIBLE LAYERS AS WIREFRAMES ON LOAD
     ------------------------------------------------------------------------ */
  function registerAllElementsAsWireframes() {
    const layerDefs = [
      // Hero Elements (Built in sequence on load)
      { id: 'hero-nav', selector: '.top-nav-bar', layerWeight: 10, isHero: true },
      { id: 'hero-wordmark', selector: '.hero-wordmark-display', layerWeight: 10, isHero: true },
      { id: 'hero-greeting', selector: '#hero-greeting', layerWeight: 4, isHero: true, isTypewriter: true },
      { id: 'hero-plate', selector: '#hero-name-plate', layerWeight: 4, isHero: true },
      { id: 'hero-role', selector: '#hero-role-pill', layerWeight: 6, isHero: true, isTypewriter: true },
      { id: 'hero-bio', selector: '#hero-bio-para', layerWeight: 6, isHero: true, isTypewriter: true },
      { id: 'hero-btns', selector: '.hero-btn-group', layerWeight: 4, isHero: true },
      { id: 'hero-stats', selector: '.hero-stats-trio', layerWeight: 4, isHero: true },
      { id: 'hero-portrait', selector: '#portrait-stage-box', layerWeight: 4, isHero: true },
      { id: 'hero-hud-01', selector: '#hud-card-01', layerWeight: 2, isHero: true },
      { id: 'hero-hud-02', selector: '#hud-card-02', layerWeight: 2, isHero: true },
      { id: 'hero-hud-03', selector: '#hud-card-03', layerWeight: 2, isHero: true },
      { id: 'hero-tech-tags', selector: '.tech-tags-bar', layerWeight: 2, isHero: true },

      // Section 01: About
      { id: 'about-index', selector: '#about .section-index-line', layerWeight: 4 },
      { id: 'about-eyebrow', selector: '#about .section-eyebrow-red', layerWeight: 4 },
      { id: 'about-title', selector: '#about .section-title-large', layerWeight: 6 },
      { id: 'about-p1', selector: '#tw-para-1', layerWeight: 10, isTypewriter: true },
      { id: 'about-p2', selector: '#tw-para-2', layerWeight: 12, isTypewriter: true },
      { id: 'about-sovereign', selector: '#card-sovereign-silicon', layerWeight: 10, isTypewriter: true },

      // Section 02: Flagships
      { id: 'flag-eyebrow', selector: '#flagships .section-eyebrow-red', layerWeight: 4 },
      { id: 'flag-title', selector: '#flagships .section-title-large', layerWeight: 6 },
      { id: 'flag-sub', selector: '#flagships .section-subtitle-gray', layerWeight: 4 },
      { id: 'flag-master', selector: '.master-flagship-box', layerWeight: 20 },
      { id: 'flag-stack', selector: '.stack-section-inner', layerWeight: 16 },
      { id: 'flag-quant', selector: '#trio-quant', layerWeight: 12 },
      { id: 'flag-oss', selector: '#trio-oss', layerWeight: 12 },
      { id: 'flag-systems', selector: '#trio-systems', layerWeight: 12 },

      // Section 03: Matrix
      { id: 'mat-eyebrow', selector: '#matrix .section-eyebrow-red', layerWeight: 4 },
      { id: 'mat-title', selector: '#matrix .section-title-large', layerWeight: 6 },
      { id: 'mat-filter', selector: '.matrix-filter-bar', layerWeight: 6 },
      { id: 'mat-grid', selector: '.matrix-cards-grid', layerWeight: 24 },

      // Section 04: Direct Connect
      { id: 'conn-eyebrow', selector: '#contact .section-eyebrow-red', layerWeight: 4 },
      { id: 'conn-title', selector: '#contact .section-title-large', layerWeight: 6 },
      { id: 'conn-lead', selector: '#contact .max-w-lead', layerWeight: 6 },
      { id: 'conn-email', selector: '.direct-email-box', layerWeight: 10 },
      { id: 'conn-pills', selector: '.direct-social-pills', layerWeight: 8 },
      { id: 'conn-footer', selector: '.sahir-footer', layerWeight: 5 }
    ];

    layerDefs.forEach(def => {
      const el = document.querySelector(def.selector);
      if (el) {
        const rect = el.getBoundingClientRect();
        const dimStr = `${Math.round(rect.width || 280)} × ${Math.round(rect.height || 40)}`;
        el.setAttribute('data-dim', dimStr);
        el.classList.add('unbuilt-wireframe');

        // Text elements preparation
        if (def.isTypewriter) {
          const contentSpan = el.querySelector('.tw-content');
          if (contentSpan) contentSpan.textContent = '';
        }

        registeredLayers.push({
          id: def.id,
          el,
          layerWeight: def.layerWeight,
          isHero: !!def.isHero,
          isTypewriter: !!def.isTypewriter,
          isBuilt: false,
          isEnqueued: false
        });
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. TYPEWRITER EFFECT HELPER
     ------------------------------------------------------------------------ */
  function typewriteElement(el, speed, onComplete) {
    const fullText = el.getAttribute('data-full-text') || el.querySelector('[data-full-text]')?.getAttribute('data-full-text') || '';
    const contentSpan = el.querySelector('.tw-content');
    const caretSpan = el.querySelector('.tw-caret');

    if (!contentSpan || !fullText) {
      if (onComplete) onComplete();
      return;
    }

    let charIdx = 0;
    const charDelay = speed || 10;

    function nextChar() {
      if (charIdx <= fullText.length) {
        contentSpan.textContent = fullText.slice(0, charIdx);
        charIdx++;
        setTimeout(nextChar, charDelay);
      } else {
        if (caretSpan) caretSpan.style.display = 'none';
        if (onComplete) onComplete();
      }
    }
    nextChar();
  }

  /* ------------------------------------------------------------------------
     6. HERO INITIAL CONSTRUCTION SEQUENCE (0 -> 52 LAYERS)
     ------------------------------------------------------------------------ */
  function buildHeroSequentially(onFinished) {
    let currentHeroLayer = 0;
    const heroItems = registeredLayers.filter(l => l.isHero);

    function updateDock(layerVal) {
      const elCurr = document.getElementById('dock-layer-curr');
      const fill = document.getElementById('dock-scrubber-fill');
      const knob = document.getElementById('dock-scrubber-knob');
      if (elCurr) elCurr.textContent = layerVal;
      const pct = (layerVal / TOTAL_LAYERS) * 100;
      if (fill) fill.style.width = `${pct}%`;
      if (knob) knob.style.left = `${pct}%`;
    }

    let itemIdx = 0;

    function stepHero() {
      if (itemIdx >= heroItems.length) {
        isHeroBuilding = false;
        updateDock(HERO_FINAL_LAYER);
        // RETREAT ALL CURSORS TO MARGINS IMMEDIATELY!
        parkCursorsAtMargins();
        if (onFinished) onFinished();
        return;
      }

      const item = heroItems[itemIdx];
      const el = item.el;
      const rect = el.getBoundingClientRect();

      // Dispatch active cursor to this element
      const cursorIdx = itemIdx % cursorNodes.length;
      const activeCursor = cursorNodes[cursorIdx];
      activeCursor.isParked = false;
      activeCursor.tx = rect.left + Math.min(60, rect.width * 0.4);
      activeCursor.ty = rect.top + Math.min(30, rect.height * 0.5);

      attachFigmaBox(el, `${Math.round(rect.width)} × ${Math.round(rect.height)}`);
      el.classList.add('is-building');

      currentHeroLayer += item.layerWeight;
      updateDock(Math.min(HERO_FINAL_LAYER, currentHeroLayer));

      if (item.isTypewriter) {
        typewriteElement(el, 5, () => {
          el.classList.remove('is-building', 'unbuilt-wireframe');
          el.classList.add('is-built');
          item.isBuilt = true;
          detachFigmaBox();
          parkSingleCursor(activeCursor, cursorIdx);
          itemIdx++;
          setTimeout(stepHero, 40);
        });
      } else {
        setTimeout(() => {
          el.classList.remove('is-building', 'unbuilt-wireframe');
          el.classList.add('is-built');
          item.isBuilt = true;
          detachFigmaBox();
          parkSingleCursor(activeCursor, cursorIdx);
          itemIdx++;
          setTimeout(stepHero, 40);
        }, 70);
      }
    }

    // Start hero construction 150ms after page load
    setTimeout(stepHero, 150);
  }

  /* ------------------------------------------------------------------------
     7. HUMAN SCROLL-DRIVEN VIEWPORT QUEUE ("AU FUR ET À MESURE")
     ------------------------------------------------------------------------ */
  function checkViewportAndEnqueue() {
    if (isHeroBuilding) return;

    const vh = window.innerHeight;
    const belowHeroLayers = registeredLayers.filter(l => !l.isHero && !l.isBuilt && !l.isEnqueued);

    belowHeroLayers.forEach(layer => {
      const r = layer.el.getBoundingClientRect();
      // Enqueue when element is in viewport or approaching within 140px of bottom
      if (r.top < vh - 20 && r.bottom > 20) {
        layer.isEnqueued = true;
        buildQueue.push(layer);
      }
    });

    if (!isQueueWorkerRunning && buildQueue.length > 0) {
      processBuildQueue();
    }
  }

  function processBuildQueue() {
    if (buildQueue.length === 0) {
      isQueueWorkerRunning = false;
      detachFigmaBox();
      parkCursorsAtMargins();
      return;
    }

    isQueueWorkerRunning = true;
    const layer = buildQueue.shift();
    const el = layer.el;
    const r = el.getBoundingClientRect();

    // If human already scrolled past it above the viewport: instant build
    if (r.bottom < -20) {
      if (layer.isTypewriter) {
        const fullText = el.getAttribute('data-full-text') || el.querySelector('[data-full-text]')?.getAttribute('data-full-text') || '';
        const contentSpan = el.querySelector('.tw-content');
        const caretSpan = el.querySelector('.tw-caret');
        if (contentSpan) contentSpan.textContent = fullText;
        if (caretSpan) caretSpan.style.display = 'none';
      }
      el.classList.remove('is-building', 'unbuilt-wireframe');
      el.classList.add('is-built');
      layer.isBuilt = true;
      updateScrollerTelemetry();
      processBuildQueue();
      return;
    }

    // Select builder cursor (alternating between agent 0 Alex and agent 1 Soren)
    const cursorIdx = buildQueue.length % 2;
    const cursor = cursorNodes[cursorIdx];
    cursor.isParked = false;
    cursor.tx = r.left + Math.min(80, r.width * 0.3);
    cursor.ty = r.top + Math.min(40, r.height * 0.5);

    attachFigmaBox(el, `${Math.round(r.width)} × ${Math.round(r.height)}`);
    el.classList.add('is-building');

    updateScrollerTelemetry();

    if (layer.isTypewriter) {
      typewriteElement(el, 8, () => {
        el.classList.remove('is-building', 'unbuilt-wireframe');
        el.classList.add('is-built');
        layer.isBuilt = true;
        detachFigmaBox();
        parkSingleCursor(cursor, cursorIdx);

        // Paced interval between elements: 90ms ("au fur et à mesure")
        setTimeout(processBuildQueue, 90);
      });
    } else {
      setTimeout(() => {
        el.classList.remove('is-building', 'unbuilt-wireframe');
        el.classList.add('is-built');
        layer.isBuilt = true;
        detachFigmaBox();
        parkSingleCursor(cursor, cursorIdx);

        // Paced interval: 100ms
        setTimeout(processBuildQueue, 100);
      }, 120);
    }
  }

  /* ------------------------------------------------------------------------
     8. DOCK TELEMETRY UPDATE (HUMAN SCROLL POSITION)
     ------------------------------------------------------------------------ */
  function updateScrollerTelemetry() {
    if (isHeroBuilding) return;

    const scrollY = window.scrollY || 0;
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const scrollRatio = Math.min(1.0, Math.max(0.0, scrollY / maxScroll));

    const currentLayer = Math.round(HERO_FINAL_LAYER + scrollRatio * (TOTAL_LAYERS - HERO_FINAL_LAYER));
    const elCurr = document.getElementById('dock-layer-curr');
    const fill = document.getElementById('dock-scrubber-fill');
    const knob = document.getElementById('dock-scrubber-knob');

    if (elCurr) elCurr.textContent = currentLayer;
    const pct = (currentLayer / TOTAL_LAYERS) * 100;
    if (fill) fill.style.width = `${pct}%`;
    if (knob) knob.style.left = `${pct}%`;
  }

  /* ------------------------------------------------------------------------
     9. SPRING ANIMATION LOOP
     ------------------------------------------------------------------------ */
  function animateFrame() {
    cursorNodes.forEach(c => {
      c.orbitAngle += c.speed;
      // Harmonic jitter: gentle breathing motion (±2px)
      const jx = Math.cos(c.orbitAngle) * 2.5;
      const jy = Math.sin(c.orbitAngle * 1.3) * 2.5;

      c.x += (c.tx + jx - c.x) * 0.16;
      c.y += (c.ty + jy - c.y) * 0.16;

      c.el.style.transform = `translate3d(${Math.round(c.x)}px, ${Math.round(c.y)}px, 0)`;
    });

    // Update active Figma selection frame position with scroll
    if (activeTargetElement && figmaSelectionBox && figmaSelectionBox.style.opacity === '1') {
      const r = activeTargetElement.getBoundingClientRect();
      figmaSelectionBox.style.top = `${r.top + window.scrollY - 3}px`;
      figmaSelectionBox.style.left = `${r.left + window.scrollX - 4}px`;
      figmaSelectionBox.style.width = `${Math.max(40, r.width + 8)}px`;
      figmaSelectionBox.style.height = `${Math.max(20, r.height + 6)}px`;
    }

    requestAnimationFrame(animateFrame);
  }

  /* ------------------------------------------------------------------------
     10. HUMAN SCROLL LISTENERS (ZERO AUTO-SCROLL UNLESS USER CLICKS PLAY)
     ------------------------------------------------------------------------ */
  function onHumanScroll() {
    updateScrollerTelemetry();
    checkViewportAndEnqueue();
  }

  function initDockInteractions() {
    const scrubberTrack = document.querySelector('.dock-scrubber-track');
    const playBtn = document.getElementById('dock-play-pause');

    if (scrubberTrack) {
      scrubberTrack.addEventListener('click', (e) => {
        const rect = scrubberTrack.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        window.scrollTo({ top: maxScroll * ratio, behavior: 'smooth' });
      });
    }

    if (playBtn) {
      playBtn.textContent = '▶'; // human in control by default

      function stepTour() {
        if (!isAutoTouring) return;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        if (window.scrollY >= maxScroll - 10) {
          isAutoTouring = false;
          playBtn.textContent = '▶';
          return;
        }
        window.scrollBy({ top: 1.2, behavior: 'instant' });
        autoTourRaf = requestAnimationFrame(stepTour);
      }

      playBtn.addEventListener('click', () => {
        isAutoTouring = !isAutoTouring;
        playBtn.textContent = isAutoTouring ? '❚❚' : '▶';
        if (isAutoTouring) {
          stepTour();
        } else {
          cancelAnimationFrame(autoTourRaf);
        }
      });

      ['wheel', 'touchstart', 'keydown'].forEach(evt => {
        window.addEventListener(evt, () => {
          if (isAutoTouring) {
            isAutoTouring = false;
            playBtn.textContent = '▶';
            cancelAnimationFrame(autoTourRaf);
          }
        }, { passive: true });
      });
    }
  }

  /* ------------------------------------------------------------------------
     11. INIT
     ------------------------------------------------------------------------ */
  function init() {
    setupMultiplayerLayer();
    registerAllElementsAsWireframes();
    initDockInteractions();

    window.addEventListener('scroll', onHumanScroll, { passive: true });
    window.addEventListener('resize', () => {
      parkCursorsAtMargins();
      updateScrollerTelemetry();
      checkViewportAndEnqueue();
    }, { passive: true });

    requestAnimationFrame(animateFrame);

    // Kick off hero sequential construction
    buildHeroSequentially(() => {
      checkViewportAndEnqueue();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
