/* ==========================================================================
   MATÉI DE SAINT LÉGER — AUTONOMOUS CAD / CURSOR ARCHITECT (V15 SOVEREIGN)
   Strictly aligned with Reference Video (DfWWldaTQTz.mp4) & User Directives:
   1. Start Pitch Dark / Blank Slate on Page Load or Refresh (scrollY < 60)
   2. Organic Hero Assembly (1.8s): 8 SVG Cursors draw the 3 pillars, then frames dissolve
   3. ZERO PARASITES: Cursors glide to lateral margins (Idle Patrol) away from reading areas
   4. NO WIREFRAMES on tiny text fragments or sub-items
   5. ZERO DECONSTRUCTION: Scrolling up preserves all created elements 100% intact
   6. Scroll Frontier: Cursors only activate when scrolling down to reveal new unrevealed cards
   7. Live Autonomous Tour 1x linked to Bottom Telemetry Dock
   ========================================================================== */

(function () {
  'use strict';

  const CURSOR_PROFILES = [
    { name: 'Alex',  role: 'Lead Architect', color: '#38bdf8' }, // Sky Cyan
    { name: 'Soren', role: 'Security RedTeam', color: '#ef4444' }, // Crimson
    { name: 'Elena', role: 'Quant Streamer',   color: '#10b981' }, // Mint Emerald
    { name: 'Kai',   role: 'Swarm Operator',   color: '#fbbf24' }, // Amber
    { name: 'Axel',  role: 'C99 Artisan',      color: '#f472b6' }, // Rose
    { name: 'Iris',  role: 'Mail Watcher',     color: '#22d3ee' }, // Cyan
    { name: 'Lex',   role: 'Policy Guard',     color: '#fb923c' }, // Orange
    { name: 'Astra', role: 'Memory Keeper',    color: '#a3e635' }  // Lime
  ];

  const MAX_CURSORS = 8;
  const MAX_CAD_FRAMES = 3;

  let cursorElements = [];
  let cadFrameElements = [];
  let isTouring = false;
  let tourSpeed = 1.0;
  let tourRafId = null;
  let prevScrollY = window.scrollY || 0;
  let isActivelyScrolling = false;
  let scrollIdleTimer = null;
  let hasAssembledHero = false;

  // Reveal Tracking
  const revealedElements = new WeakSet();

  /* ------------------------------------------------------------------------
     1. CREATE CURSOR & CAD OVERLAYS
     ------------------------------------------------------------------------ */
  function initOverlayLayer() {
    let overlay = document.getElementById('sovereign-cursor-layer');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'sovereign-cursor-layer';
      overlay.className = 'builder-cursors-layer';
      overlay.setAttribute('aria-hidden', 'true');
      document.body.appendChild(overlay);
    }

    // Create 8 Cursors
    cursorElements = CURSOR_PROFILES.map((profile, i) => {
      const cur = document.createElement('div');
      cur.className = 'saai-cursor';
      cur.style.transform = `translate3d(-100px, -100px, 0)`;
      cur.innerHTML = `
        <svg class="saai-cursor-svg" viewBox="0 0 18 18" fill="none">
          <path d="M2 2L15 8L8.5 10.5L6 17L2 2Z" fill="${profile.color}" stroke="#070709" stroke-width="1.5" stroke-linejoin="round" />
        </svg>
      `;
      overlay.appendChild(cur);
      return {
        el: cur,
        profile,
        x: -100,
        y: -100,
        targetX: -100,
        targetY: -100,
        idleSide: i % 2 === 0 ? 'left' : 'right',
        idleAngle: (i / MAX_CURSORS) * Math.PI * 2
      };
    });

    // Create CAD Framing Pool
    cadFrameElements = [];
    for (let i = 0; i < MAX_CAD_FRAMES; i++) {
      const f = document.createElement('div');
      f.className = 'saai-frame is-wireframe';
      f.style.opacity = '0';
      f.innerHTML = `
        <span class="saai-handle tl"></span>
        <span class="saai-handle tr"></span>
        <span class="saai-handle bl"></span>
        <span class="saai-handle br"></span>
        <span class="saai-dim">FRAME // INIT</span>
      `;
      overlay.appendChild(f);
      cadFrameElements.push({
        el: f,
        dimEl: f.querySelector('.saai-dim'),
        active: false
      });
    }
  }

  /* ------------------------------------------------------------------------
     2. ORGANIC HERO ASSEMBLY (1.8s) ON REFRESH
     ------------------------------------------------------------------------ */
  function runOrganicHeroAssembly() {
    const isAtTop = (window.scrollY || 0) < 60;
    if (!isAtTop) {
      // User is deep in the page, reveal hero instantly without animation
      document.documentElement.classList.remove('hero-blank-slate');
      hasAssembledHero = true;
      return;
    }

    const heroLeft = document.querySelector('.hero-left');
    const portraitStage = document.getElementById('portrait-stage');
    const heroRight = document.querySelector('.hero-right');

    const heroWordmark = document.querySelector('.hero-wordmark-wrap');
    const canvasEl = document.getElementById('op-art-canvas');

    if (!heroLeft || !portraitStage || !heroRight) {
      document.documentElement.classList.remove('hero-blank-slate');
      hasAssembledHero = true;
      return;
    }

    const startTs = performance.now();
    const duration = 1800; // 1.8 seconds clean assembly

    // Target Rectangles for the 3 Hero Pillars
    const rectLeft = heroLeft.getBoundingClientRect();
    const rectCenter = portraitStage.getBoundingClientRect();
    const rectRight = heroRight.getBoundingClientRect();

    // Assign CAD frames to the 3 main containers
    const targets = [
      { rect: rectLeft, label: 'HERO // LEFT OPERATOR' },
      { rect: rectCenter, label: 'HERO // SOVEREIGN SILICON' },
      { rect: rectRight, label: 'HERO // HUD ARCHITECTURE' }
    ];

    targets.forEach((tgt, i) => {
      if (cadFrameElements[i]) {
        const f = cadFrameElements[i];
        f.el.style.left = `${tgt.rect.left}px`;
        f.el.style.top = `${tgt.rect.top}px`;
        f.el.style.width = `${tgt.rect.width}px`;
        f.el.style.height = `${tgt.rect.height}px`;
        f.dimEl.textContent = `${Math.round(tgt.rect.width)} × ${Math.round(tgt.rect.height)}`;
        f.el.style.opacity = '1';
        f.active = true;
      }
    });

    function stepHeroAssembly(now) {
      const elapsed = now - startTs;
      const progress = Math.min(elapsed / duration, 1.0);

      // Cursors swirl around the 3 targets tracing corners
      cursorElements.forEach((c, idx) => {
        const targetObj = targets[idx % targets.length];
        const r = targetObj.rect;
        const angle = (elapsed * 0.004) + (idx * (Math.PI / 2));
        const radiusX = r.width * 0.45;
        const radiusY = r.height * 0.45;
        const centerX = r.left + r.width / 2;
        const centerY = r.top + r.height / 2;

        c.targetX = centerX + Math.cos(angle) * radiusX;
        c.targetY = centerY + Math.sin(angle) * radiusY;

        c.x += (c.targetX - c.x) * 0.25;
        c.y += (c.targetY - c.y) * 0.25;
        c.el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
      });

      if (progress >= 0.75 && document.documentElement.classList.contains('hero-blank-slate')) {
        // Smoothly reveal content as cursors complete tracing
        document.documentElement.classList.remove('hero-blank-slate');
        if (heroWordmark) heroWordmark.style.opacity = '1';
        if (canvasEl) canvasEl.style.opacity = '1';
      }

      if (progress < 1.0) {
        requestAnimationFrame(stepHeroAssembly);
      } else {
        // Finish: dissolve CAD frames completely
        cadFrameElements.forEach(f => {
          f.el.style.transition = 'opacity 0.4s ease';
          f.el.style.opacity = '0';
          setTimeout(() => {
            f.active = false;
            f.el.style.transition = '';
          }, 450);
        });

        hasAssembledHero = true;
        revealedElements.add(heroLeft);
        revealedElements.add(portraitStage);
        revealedElements.add(heroRight);

        // Guide cursors to lateral margins (Idle Patrol)
        parkCursorsInMargins();
      }
    }

    requestAnimationFrame(stepHeroAssembly);
  }

  /* ------------------------------------------------------------------------
     3. IDLE PATROL IN LATERAL MARGINS (NO TEXT OBSTRUCTION)
     ------------------------------------------------------------------------ */
  function parkCursorsInMargins() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    cursorElements.forEach((c, i) => {
      const isLeft = c.idleSide === 'left';
      const marginX = isLeft ? 28 + (i % 2) * 18 : w - (38 + (i % 2) * 18);
      const marginY = 120 + ((i % 4) * (h / 5));

      c.targetX = marginX;
      c.targetY = marginY;
    });
  }

  /* ------------------------------------------------------------------------
     4. SCROLL FRONTIER CONSTRUCTION (DOWN ONLY — ZERO REVERSE COLLAPSE)
     ------------------------------------------------------------------------ */
  function handleScrollActivity() {
    const currentScrollY = window.scrollY || 0;
    const isScrollingDown = currentScrollY > prevScrollY;
    prevScrollY = currentScrollY;

    isActivelyScrolling = true;
    clearTimeout(scrollIdleTimer);

    // If scrolling DOWN, inspect incoming cards that are not yet revealed
    if (isScrollingDown) {
      const cards = document.querySelectorAll('[data-scroll-build="card"], [data-scroll-build="heading"], .flagship-card, .timeline-item');
      const vh = window.innerHeight;

      cards.forEach(card => {
        if (!revealedElements.has(card)) {
          const rect = card.getBoundingClientRect();
          // Frontier window: entering bottom 15% of viewport
          if (rect.top < vh - 40 && rect.bottom > 40) {
            revealedElements.add(card);
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';

            // Dispatch 1 or 2 cursors to briefly touch the incoming card
            const freeCursor = cursorElements[Math.floor(Math.random() * 3)];
            if (freeCursor) {
              freeCursor.targetX = rect.left + 24;
              freeCursor.targetY = rect.top + 20;
            }
          }
        }
      });
    }

    // When scrolling stops, cursors return to idle margins
    scrollIdleTimer = setTimeout(() => {
      isActivelyScrolling = false;
      parkCursorsInMargins();
    }, 400);
  }

  /* ------------------------------------------------------------------------
     5. MAIN RAF LOOP: SMOOTH SPRING CURSOR INTERPOLATION
     ------------------------------------------------------------------------ */
  function animateCursors(ts) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    cursorElements.forEach((c, idx) => {
      // In idle mode, add a gentle harmonic float along the margins
      if (!isActivelyScrolling && hasAssembledHero) {
        c.idleAngle += 0.015;
        const floatX = Math.cos(c.idleAngle) * 6;
        const floatY = Math.sin(c.idleAngle * 0.8) * 12;

        const isLeft = c.idleSide === 'left';
        const baseX = isLeft ? 26 : w - 42;
        const baseY = 140 + ((idx % 4) * (h / 4.6));

        c.targetX = baseX + floatX;
        c.targetY = baseY + floatY;
      }

      // Spring Interpolation
      c.x += (c.targetX - c.x) * 0.14;
      c.y += (c.targetY - c.y) * 0.14;

      c.el.style.transform = `translate3d(${Math.round(c.x)}px, ${Math.round(c.y)}px, 0)`;
    });

    requestAnimationFrame(animateCursors);
  }

  /* ------------------------------------------------------------------------
     6. AUTONOMOUS TOUR 1x CONTROLLER (BOTTOM DOCK LINK)
     ------------------------------------------------------------------------ */
  function initTourController() {
    const tourBtn = document.getElementById('tour-toggle-btn');
    const tourIcon = document.getElementById('tour-btn-icon');
    if (!tourBtn || !tourIcon) return;

    function stepTour() {
      if (!isTouring) return;
      window.scrollBy({ top: 1.4 * tourSpeed, behavior: 'instant' });

      // If at page bottom, loop back to top
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 20)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      tourRafId = requestAnimationFrame(stepTour);
    }

    tourBtn.addEventListener('click', () => {
      isTouring = !isTouring;
      if (isTouring) {
        tourIcon.textContent = '❚❚';
        tourBtn.classList.add('active');
        stepTour();
      } else {
        tourIcon.textContent = '▶';
        tourBtn.classList.remove('active');
        cancelAnimationFrame(tourRafId);
      }
    });

    // Pause tour on user manual interaction
    ['wheel', 'touchstart', 'keydown'].forEach(evt => {
      window.addEventListener(evt, () => {
        if (isTouring) {
          isTouring = false;
          tourIcon.textContent = '▶';
          tourBtn.classList.remove('active');
          cancelAnimationFrame(tourRafId);
        }
      }, { passive: true });
    });
  }

  /* ------------------------------------------------------------------------
     7. INITIALIZATION LIFECYCLE
     ------------------------------------------------------------------------ */
  function init() {
    initOverlayLayer();
    requestAnimationFrame(animateCursors);

    // Initial load assembly
    setTimeout(() => {
      runOrganicHeroAssembly();
    }, 150);

    // Scroll listeners
    window.addEventListener('scroll', handleScrollActivity, { passive: true });
    window.addEventListener('resize', parkCursorsInMargins, { passive: true });

    initTourController();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
