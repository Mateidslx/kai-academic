/* ==========================================================================
   AUTHENTIC SAHIR (DfWWldaTQTz.mp4) MULTIPLAYER ARCHITECT & TOUR ENGINE
   1:1 Pixel-level reproduction of the Live Figma / IDE Autonomous Tour:
   - 8 Multiplayer Cursors with Name Badges (Alex, Soren, Elena, Kai, Axel...)
   - Thin Blue Figma Selection Frames (#38bdf8) with 4 Corner Handles & Dimensions
   - Character-by-Character Typewriter Effect with Blinking Caret (|)
   - Bottom Telemetry Scrubber Dock: 20 agents X / 252 layers — Touring 1x
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
    { name: 'Astra', color: '#22d3ee' }  // Cyan
  ];

  const TOTAL_LAYERS = 252;
  let currentLayer = 52;
  let isTouring = true;
  let tourSpeed = 1.0;
  let cursorNodes = [];
  let figmaSelectionBox = null;
  let figmaDimTag = null;
  let activeElementTarget = null;
  let tourRafId = null;

  /* ------------------------------------------------------------------------
     1. CREATE MULTIPLAYER CURSORS & FIGMA SELECTION OVERLAY
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

    // 1. Create Figma Selection Box
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

    // 2. Create Multiplayer Cursors
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
      return {
        el: node,
        agent,
        x: window.innerWidth * (0.2 + (i % 4) * 0.2),
        y: 120 + (i % 3) * 150,
        tx: window.innerWidth * (0.2 + (i % 4) * 0.2),
        ty: 120 + (i % 3) * 150,
        orbitAngle: (i / AGENTS.length) * Math.PI * 2,
        speed: 0.015 + (i % 3) * 0.005
      };
    });
  }

  /* ------------------------------------------------------------------------
     2. FIGMA SELECTION BOX TARGETING
     ------------------------------------------------------------------------ */
  function attachFigmaBox(element, label) {
    if (!element || !figmaSelectionBox) return;
    activeElementTarget = element;

    const rect = element.getBoundingClientRect();
    figmaSelectionBox.style.top = `${rect.top + window.scrollY - 3}px`;
    figmaSelectionBox.style.left = `${rect.left + window.scrollX - 4}px`;
    figmaSelectionBox.style.width = `${rect.width + 8}px`;
    figmaSelectionBox.style.height = `${rect.height + 6}px`;
    figmaSelectionBox.style.opacity = '1';

    if (figmaDimTag) {
      figmaDimTag.textContent = label || `${Math.round(rect.width)} × ${Math.round(rect.height)}`;
    }
  }

  function detachFigmaBox() {
    if (figmaSelectionBox) {
      figmaSelectionBox.style.opacity = '0';
    }
  }

  /* ------------------------------------------------------------------------
     3. TYPEWRITER EFFECT WITH BLINKING CARET
     ------------------------------------------------------------------------ */
  function typewriteElement(boxEl, onComplete) {
    if (!boxEl) return;
    const fullText = boxEl.getAttribute('data-full-text') || '';
    const contentSpan = boxEl.querySelector('.tw-content');
    const caretSpan = boxEl.querySelector('.tw-caret');

    if (!contentSpan) return;

    attachFigmaBox(boxEl, `${Math.round(boxEl.offsetWidth)} × ${Math.round(boxEl.offsetHeight)}`);

    // Dispatch lead cursor Alex to the typing point
    const leadCursor = cursorNodes[0];
    let charIdx = 0;
    const speed = 20; // 20ms per character for snappy authentic typing

    function stepType() {
      if (charIdx <= fullText.length) {
        contentSpan.textContent = fullText.slice(0, charIdx);

        // Move lead cursor along with typing
        if (leadCursor) {
          const r = boxEl.getBoundingClientRect();
          leadCursor.tx = r.left + Math.min(r.width - 20, charIdx * 8.5);
          leadCursor.ty = r.top + 14;
        }

        charIdx++;
        setTimeout(stepType, speed);
      } else {
        if (caretSpan) caretSpan.style.display = 'none';
        if (onComplete) onComplete();
      }
    }

    stepType();
  }

  /* ------------------------------------------------------------------------
     4. AUTONOMOUS SCROLL & LAYER TICKER CONTROLLER
     ------------------------------------------------------------------------ */
  function updateDockTelemetry(layer) {
    currentLayer = Math.min(TOTAL_LAYERS, Math.max(1, Math.round(layer)));
    const layerCurrEl = document.getElementById('dock-layer-curr');
    const scrubberFill = document.getElementById('dock-scrubber-fill');
    const scrubberKnob = document.getElementById('dock-scrubber-knob');

    if (layerCurrEl) layerCurrEl.textContent = currentLayer;

    const pct = (currentLayer / TOTAL_LAYERS) * 100;
    if (scrubberFill) scrubberFill.style.width = `${pct}%`;
    if (scrubberKnob) scrubberKnob.style.left = `${pct}%`;
  }

  function stepTour() {
    if (!isTouring) return;

    // Advance scroll smoothly
    const scrollMax = document.body.scrollHeight - window.innerHeight;
    const nextY = window.scrollY + 1.25 * tourSpeed;

    if (nextY >= scrollMax - 10) {
      // Reached the end: pause and show completed
      isTouring = false;
      const playBtn = document.getElementById('dock-play-pause');
      if (playBtn) playBtn.textContent = '▶';
      updateDockTelemetry(TOTAL_LAYERS);
      return;
    }

    window.scrollTo({ top: nextY, behavior: 'instant' });

    // Update layer count based on scroll progress
    const scrollProgress = window.scrollY / Math.max(1, scrollMax);
    const calculatedLayer = 50 + scrollProgress * (TOTAL_LAYERS - 50);
    updateDockTelemetry(calculatedLayer);

    tourRafId = requestAnimationFrame(stepTour);
  }

  /* ------------------------------------------------------------------------
     5. HERO AMBIENT ORBIT & INTERACTION DISPATCH
     ------------------------------------------------------------------------ */
  function setupHeroCursorPositions() {
    // Exact match to frame_04.50s: cursors hover on letters, badges, portrait, HUD
    const wordmark = document.querySelector('.hero-wordmark-display');
    const redPlate = document.querySelector('.red-name-plate');
    const rolePill = document.getElementById('hero-role-pill');
    const portraitBox = document.getElementById('portrait-stage-box');
    const hud1 = document.getElementById('hud-card-01');
    const hud2 = document.getElementById('hud-card-02');
    const exploreBtn = document.querySelector('.btn-sahir-explore');

    if (wordmark && cursorNodes.length >= 8) {
      const wmRect = wordmark.getBoundingClientRect();

      // Cursors 0, 1, 2 on PORTFOLIO letters (R, I, O)
      cursorNodes[0].tx = wmRect.left + wmRect.width * 0.42; // R
      cursorNodes[0].ty = wmRect.top + 45;

      cursorNodes[1].tx = wmRect.left + wmRect.width * 0.72; // I
      cursorNodes[1].ty = wmRect.top + 38;

      cursorNodes[2].tx = wmRect.left + wmRect.width * 0.85; // O
      cursorNodes[2].ty = wmRect.top + 50;

      // Cursor 3 on Subtitle Pill
      if (rolePill) {
        const rpRect = rolePill.getBoundingClientRect();
        cursorNodes[3].tx = rpRect.left + 40;
        cursorNodes[3].ty = rpRect.top + 10;
      }

      // Cursor 4 near Explore Architecture button
      if (exploreBtn) {
        const ebRect = exploreBtn.getBoundingClientRect();
        cursorNodes[4].tx = ebRect.left + 30;
        cursorNodes[4].ty = ebRect.top + 8;
      }

      // Cursor 5 on Portrait Chin
      if (portraitBox) {
        const pbRect = portraitBox.getBoundingClientRect();
        cursorNodes[5].tx = pbRect.left + pbRect.width * 0.48;
        cursorNodes[5].ty = pbRect.top + pbRect.height * 0.62;
      }

      // Cursor 6 on HUD Card 01
      if (hud1) {
        const h1Rect = hud1.getBoundingClientRect();
        cursorNodes[6].tx = h1Rect.left + 50;
        cursorNodes[6].ty = h1Rect.top + 16;
      }

      // Cursor 7 on HUD Card 02
      if (hud2) {
        const h2Rect = hud2.getBoundingClientRect();
        cursorNodes[7].tx = h2Rect.left + 80;
        cursorNodes[7].ty = h2Rect.top + 16;
      }
    }
  }

  /* ------------------------------------------------------------------------
     6. MAIN RAF LOOP: ANIMATE MULTIPLAYER CURSORS & BOXES
     ------------------------------------------------------------------------ */
  function animateFrame() {
    cursorNodes.forEach((c) => {
      // Gentle harmonic breathing jitter
      c.orbitAngle += c.speed;
      const jx = Math.cos(c.orbitAngle) * 5;
      const jy = Math.sin(c.orbitAngle * 1.3) * 5;

      c.x += (c.tx + jx - c.x) * 0.12;
      c.y += (c.ty + jy - c.y) * 0.12;

      c.el.style.transform = `translate3d(${Math.round(c.x)}px, ${Math.round(c.y)}px, 0)`;
    });

    // Keep active figma box locked to element position on scroll
    if (activeElementTarget && figmaSelectionBox && figmaSelectionBox.style.opacity === '1') {
      const r = activeElementTarget.getBoundingClientRect();
      figmaSelectionBox.style.top = `${r.top + window.scrollY - 3}px`;
      figmaSelectionBox.style.left = `${r.left + window.scrollX - 4}px`;
      figmaSelectionBox.style.width = `${r.width + 8}px`;
      figmaSelectionBox.style.height = `${r.height + 6}px`;
    }

    requestAnimationFrame(animateFrame);
  }

  /* ------------------------------------------------------------------------
     7. SECTION TRIGGERED TYPEWRITING ON SCROLL
     ------------------------------------------------------------------------ */
  let typedPara1 = false;
  let typedPara2 = false;
  let typedSovereign = false;

  function checkScrollTriggers() {
    const vh = window.innerHeight;

    const p1 = document.getElementById('tw-para-1');
    if (p1 && !typedPara1) {
      const r = p1.getBoundingClientRect();
      if (r.top < vh * 0.75 && r.bottom > 0) {
        typedPara1 = true;
        typewriteElement(p1, () => {
          const p2 = document.getElementById('tw-para-2');
          if (p2 && !typedPara2) {
            typedPara2 = true;
            typewriteElement(p2, () => {
              const sc = document.getElementById('tw-sovereign-desc');
              if (sc && !typedSovereign) {
                typedSovereign = true;
                typewriteElement(sc);
              }
            });
          }
        });
      }
    }
  }

  /* ------------------------------------------------------------------------
     8. DOCK INTERACTION BINDINGS
     ------------------------------------------------------------------------ */
  function initDockEvents() {
    const playBtn = document.getElementById('dock-play-pause');
    const fwdBtn = document.getElementById('dock-step-fwd');
    const backBtn = document.getElementById('dock-step-back');
    const scrubberTrack = document.querySelector('.dock-scrubber-track');

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        isTouring = !isTouring;
        playBtn.textContent = isTouring ? '❚❚' : '▶';
        if (isTouring) stepTour();
      });
    }

    if (fwdBtn) {
      fwdBtn.addEventListener('click', () => {
        window.scrollBy({ top: 350, behavior: 'smooth' });
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.scrollBy({ top: -350, behavior: 'smooth' });
      });
    }

    if (scrubberTrack) {
      scrubberTrack.addEventListener('click', (e) => {
        const rect = scrubberTrack.getBoundingClientRect();
        const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const scrollMax = document.body.scrollHeight - window.innerHeight;
        window.scrollTo({ top: scrollMax * clickRatio, behavior: 'smooth' });
      });
    }

    // Manual scroll sync
    window.addEventListener('scroll', () => {
      checkScrollTriggers();
      const scrollMax = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = window.scrollY / Math.max(1, scrollMax);
      const calculatedLayer = 50 + scrollProgress * (TOTAL_LAYERS - 50);
      updateDockTelemetry(calculatedLayer);
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     9. INITIALIZATION
     ------------------------------------------------------------------------ */
  function init() {
    setupMultiplayerLayer();
    setupHeroCursorPositions();
    initDockEvents();
    requestAnimationFrame(animateFrame);

    // Initial load: start touring smoothly after 1.5s
    setTimeout(() => {
      if (isTouring) stepTour();
    }, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
