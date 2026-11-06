/* ==========================================================================
   MATÉI DE SAINT LÉGER — AUTHENTIC VIDEO FIGMA / CAD CREATION ENGINE (V13)
   Exact match to user video reference (media_1793992329783):
   1. Clean sharp cursor arrows (NO parasite name tags cluttering the screen)
   2. Zero cursors when idle / doing nothing (clean, readable content)
   3. On Refresh / Page Load: Cursors actively build Hero, then smoothly fade out
   4. On Scroll Down: Cursors appear at the frontier to build unbuilt elements live
   5. On Scroll Up: Cursors appear to deconstruct cards (crimson frames ↺ W×H + un-typing)
   6. Authentic Figma Frames: 4 white corner square handles + live dimension badges
   ========================================================================== */

(function () {
  'use strict';

  const CURSOR_COLORS = [
    '#ef4444', // Crimson
    '#38bdf8', // Sky Blue
    '#34d399', // Emerald
    '#fbbf24', // Amber
    '#f472b6', // Rose
    '#22d3ee', // Cyan
    '#fb923c', // Orange
    '#a3e635'  // Lime
  ];

  const MAX_FRAMES = 6;
  const MAX_CURSORS = 8;

  const DYNAMIC_TEXT_IDS = new Set([
    'layer-desc',
    'layer-badge',
    'layer-title',
    'layer-code-file',
    'layer-code-pre',
    'exploded-pct-label',
    'exploded-toggle-btn',
    'exploded-inspector-tag',
    'exploded-inspector-title',
    'exploded-inspector-desc',
    'exploded-inspector-proof',
    'door-badge',
    'door-heading',
    'door-desc',
    'timeline-big-year',
    'timeline-period-label',
    'timeline-step-count'
  ]);

  let modules = [];
  let sectionGates = [];
  let allTypeItems = [];
  let heroRefs = null;
  let overlayEl = null;
  let guideXEl = null;
  let guideYEl = null;
  let hudPillEl = null;
  let hudStatusEl = null;
  let hudCountEl = null;
  let hudPctEl = null;
  let framePool = [];
  let cursorPool = [];
  let rafId = null;
  let lastTs = 0;
  let prevScrollY = 0;
  let scrollDirection = 1; // 1 = assembling down, -1 = deconstructing up
  let scrollMotionTimer = 0;
  let isActivelyScrolling = false;
  let nextTaskUid = 1;

  // Hero Initial Load / Refresh Live Creation Choreography
  let isHeroIntroActive = false;
  let heroIntroStartTs = 0;
  let heroIntroCleaned = false;
  let heroElements = null;

  function clamp01(x) {
    return x <= 0 ? 0 : x >= 1 ? 1 : x;
  }

  function smoothstep(x) {
    const c = clamp01(x);
    return c * c * (3 - 2 * c);
  }

  function getLang() {
    return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'fr';
  }

  function canTypeLeaf(el) {
    if (!el) return false;
    if (el.id && DYNAMIC_TEXT_IDS.has(el.id)) return false;
    if (el.children && el.children.length > 0) return false;
    const txt = (el.textContent || '').trim();
    return txt.length >= 2;
  }

  function makeSubItem(el, mode, start, end, priority) {
    const item = {
      uid: 'sub_' + nextTaskUid++,
      el,
      mode, // 'type' | 'clip' | 'fade3d'
      start,
      end,
      priority: priority || 2,
      subP: 0,
      fullText: mode === 'type' ? el.textContent || '' : '',
      mounted: false,
      visEl: null,
      caretEl: null,
      ghostEl: null,
      lastChars: -1
    };
    if (mode === 'type') {
      allTypeItems.push(item);
    }
    return item;
  }

  function mountTypeSpans(item) {
    if (item.mounted && item.visEl && item.visEl.parentNode === item.el) return;
    item.fullText = item.el.textContent || item.fullText || '';
    const vis = document.createElement('span');
    vis.className = 'saai-vis';
    const caret = document.createElement('span');
    caret.className = 'saai-caret';
    caret.setAttribute('aria-hidden', 'true');
    const ghost = document.createElement('span');
    ghost.className = 'saai-ghost';
    ghost.setAttribute('aria-hidden', 'true');

    item.el.textContent = '';
    item.el.appendChild(vis);
    item.el.appendChild(caret);
    item.el.appendChild(ghost);

    item.visEl = vis;
    item.caretEl = caret;
    item.ghostEl = ghost;
    item.mounted = true;
    item.lastChars = -1;
  }

  function unmountTypeSpans(item) {
    if (!item.mounted) return;
    if (item.visEl && item.visEl.parentNode === item.el) {
      item.el.textContent = item.fullText;
    } else {
      item.fullText = item.el.textContent || item.fullText;
    }
    item.visEl = null;
    item.caretEl = null;
    item.ghostEl = null;
    item.mounted = false;
    item.lastChars = -1;
  }

  function applySubItem(item, parentP) {
    const raw = (parentP - item.start) / Math.max(0.06, item.end - item.start);
    const p = smoothstep(raw);
    item.subP = p;

    const el = item.el;
    if (!el) return;

    if (p <= 0.008) {
      if (item.mode === 'type') unmountTypeSpans(item);
      if (item.mode === 'clip') el.style.clipPath = '';
      if (item.mode === 'fade3d') el.style.transform = '';
      el.style.opacity = '0';
      el.style.visibility = 'hidden';
      return;
    }

    if (p >= 0.988) {
      if (item.mode === 'type') unmountTypeSpans(item);
      if (item.mode === 'clip') el.style.clipPath = '';
      if (item.mode === 'fade3d') el.style.transform = '';
      el.style.opacity = '';
      el.style.visibility = '';
      return;
    }

    el.style.visibility = 'visible';

    if (item.mode === 'type') {
      el.style.opacity = '1';
      mountTypeSpans(item);
      const total = item.fullText.length;
      const chars = Math.max(1, Math.min(total, Math.round(total * p)));
      if (chars !== item.lastChars) {
        item.visEl.textContent = item.fullText.slice(0, chars);
        item.ghostEl.textContent = item.fullText.slice(chars);
        item.lastChars = chars;
      }
      return;
    }

    if (item.mode === 'clip') {
      el.style.opacity = '1';
      const px = Math.max(0.04, p);
      const py = Math.max(0.14, Math.min(1, p * 1.18));
      const rightPct = ((1 - px) * 100).toFixed(2);
      const bottomPct = ((1 - py) * 100).toFixed(2);
      el.style.clipPath = `inset(-2px ${rightPct}% ${bottomPct}% -2px)`;
      return;
    }

    // 'fade3d' — preserves CSS transform-style: preserve-3d on #exploded-stack-3d
    el.style.opacity = p.toFixed(3);
    el.style.transform = `translate3d(0, ${((1 - p) * 18).toFixed(1)}px, 0)`;
  }

  function discoverHeadingItems(el) {
    if (canTypeLeaf(el)) {
      return [makeSubItem(el, 'type', 0.02, 0.98, 3)];
    }

    const items = [];
    if (el.classList.contains('editorial-quote-inner')) {
      const mark = el.querySelector('.editorial-quote-mark');
      const quote = el.querySelector('.editorial-quote-text');
      const meta = el.querySelector('.editorial-quote-meta');
      if (mark) items.push(makeSubItem(mark, 'fade3d', 0.02, 0.22, 1));
      if (quote && canTypeLeaf(quote)) items.push(makeSubItem(quote, 'type', 0.06, 0.78, 3));
      if (meta && canTypeLeaf(meta)) items.push(makeSubItem(meta, 'type', 0.72, 0.98, 2));
      return items;
    }

    if (el.classList.contains('project-filter-bar')) {
      const btns = Array.from(el.querySelectorAll('.proj-filter-btn'));
      btns.forEach((btn, idx) => {
        const s = 0.04 + idx * 0.16;
        const e = Math.min(0.98, 0.44 + idx * 0.17);
        items.push(makeSubItem(btn, 'clip', s, e, 2));
      });
      return items;
    }

    return [makeSubItem(el, 'clip', 0.02, 0.98, 2)];
  }

  function discoverCardSubItems(cardEl) {
    const items = [];
    const seen = new Set();

    function add(el, mode, start, end, priority) {
      if (!el || seen.has(el)) return;
      seen.add(el);
      if (mode === 'type' && !canTypeLeaf(el)) {
        mode = 'clip';
      }
      items.push(makeSubItem(el, mode, start, end, priority));
    }

    if (cardEl.classList.contains('metrics-band-grid')) {
      const cells = Array.from(cardEl.querySelectorAll('.metric-band-cell'));
      cells.forEach((cell, i) => {
        const num = cell.querySelector('.metric-band-num');
        const lbl = cell.querySelector('.metric-band-lbl');
        const base = 0.04 + i * 0.09;
        if (num && canTypeLeaf(num)) add(num, 'type', base, base + 0.21, 3);
        if (lbl && canTypeLeaf(lbl)) add(lbl, 'type', base + 0.22, Math.min(0.98, base + 0.58), 3);
      });
      return items;
    }

    if (cardEl.id === 'exploded-stage') {
      const vp3d = cardEl.querySelector('.exploded-3d-viewport');
      if (vp3d) add(vp3d, 'fade3d', 0.24, 0.78, 1);
      const callouts = Array.from(cardEl.querySelectorAll('.exp-callout-card'));
      callouts.forEach((c, i) => {
        const s = 0.28 + i * 0.08;
        const e = Math.min(0.97, 0.58 + i * 0.075);
        add(c, 'clip', s, e, 3);
      });
      return items;
    }

    if (cardEl.classList.contains('exploded-inspector-bar')) {
      add(cardEl.querySelector('.exploded-insp-main'), 'clip', 0.25, 0.76, 3);
      add(cardEl.querySelector('.exploded-insp-proof-box'), 'clip', 0.46, 0.96, 3);
      return items;
    }

    if (cardEl.classList.contains('exploded-controls-card')) {
      add(cardEl.querySelector('.exploded-ctrl-label'), 'type', 0.24, 0.50, 2);
      add(cardEl.querySelector('.exploded-pct-badge'), 'clip', 0.36, 0.58, 2);
      add(cardEl.querySelector('.exploded-range-input'), 'clip', 0.44, 0.78, 3);
      add(cardEl.querySelector('.exploded-ctrl-actions'), 'clip', 0.58, 0.96, 3);
      return items;
    }

    if (cardEl.classList.contains('repo-lab-wrap')) {
      add(cardEl.querySelector('.repo-lab-header .layer-badge'), 'type', 0.24, 0.48, 2);
      add(cardEl.querySelector('.repo-lab-header .repo-all-link'), 'clip', 0.36, 0.56, 2);
      const repos = Array.from(cardEl.querySelectorAll('.repo-mini-card'));
      repos.forEach((r, i) => {
        add(r, 'clip', 0.32 + i * 0.11, Math.min(0.97, 0.64 + i * 0.10), 3);
      });
      return items;
    }

    if (cardEl.classList.contains('doors-showcase')) {
      const doors = Array.from(cardEl.querySelectorAll('.door-card'));
      doors.forEach((d, i) => {
        add(d, 'clip', 0.24 + i * 0.08, 0.56 + i * 0.08, 3);
      });
      add(cardEl.querySelector('#door-detail-panel'), 'clip', 0.54, 0.96, 3);
      return items;
    }

    if (cardEl.classList.contains('timeline-sticky-left')) {
      add(cardEl.querySelector('.section-eyebrow'), 'type', 0.24, 0.45, 2);
      add(cardEl.querySelector('.timeline-lead'), 'type', 0.32, 0.58, 3);
      add(cardEl.querySelector('#timeline-big-year'), 'clip', 0.42, 0.70, 3);
      add(cardEl.querySelector('#timeline-period-label'), 'clip', 0.52, 0.78, 2);
      add(cardEl.querySelector('.timeline-step-bar'), 'clip', 0.60, 0.86, 2);
      add(cardEl.querySelector('.timeline-sticky-note'), 'type', 0.64, 0.96, 2);
      return items;
    }

    if (cardEl.classList.contains('timeline-item')) {
      add(cardEl.querySelector('.timeline-dot'), 'fade3d', 0.18, 0.36, 1);
      add(cardEl.querySelector('.timeline-date'), 'type', 0.24, 0.48, 2);
      add(cardEl.querySelector('.timeline-loc-pill'), 'clip', 0.34, 0.54, 2);
      add(cardEl.querySelector('.timeline-item-title'), 'type', 0.36, 0.68, 3);
      add(cardEl.querySelector('.timeline-item-desc'), 'type', 0.48, 0.96, 3);
      return items;
    }

    if (cardEl.classList.contains('dna-card')) {
      add(cardEl.querySelector('.layer-badge'), 'type', 0.24, 0.46, 2);
      add(cardEl.querySelector('.dna-card-title'), 'type', 0.32, 0.60, 3);
      add(cardEl.querySelector('.dna-card-desc'), 'type', 0.44, 0.80, 3);
      const subWidgets = Array.from(
        cardEl.querySelectorAll('.dna-mini-row, .lang-chip, .trait-bar-item, .chess-mini-widget')
      );
      subWidgets.forEach((w, i) => {
        add(w, 'clip', 0.54 + i * 0.07, Math.min(0.97, 0.80 + i * 0.05), 3);
      });
      return items;
    }

    if (cardEl.classList.contains('contact-card')) {
      add(cardEl.querySelector('.section-eyebrow'), 'type', 0.24, 0.44, 2);
      add(cardEl.querySelector('.contact-title'), 'type', 0.30, 0.60, 3);
      add(cardEl.querySelector('.contact-desc'), 'type', 0.44, 0.78, 3);
      add(cardEl.querySelector('.email-dispatch-row'), 'clip', 0.58, 0.88, 3);
      add(cardEl.querySelector('.social-pills-row'), 'clip', 0.70, 0.97, 3);
      return items;
    }

    const dot = cardEl.querySelector('.case-status-dot');
    const kickerText = cardEl.querySelector('.case-kicker > span:last-child');
    if (dot) add(dot, 'fade3d', 0.24, 0.36, 1);
    if (kickerText) add(kickerText, 'type', 0.24, 0.46, 2);

    add(cardEl.querySelector('.case-title'), 'type', 0.30, 0.60, 3);
    add(cardEl.querySelector('.case-desc'), 'type', 0.42, 0.80, 3);
    add(cardEl.querySelector('.case-preview-window'), 'clip', 0.32, 0.88, 4);

    const tabs = cardEl.querySelector('.oss-eco-tabs, .layer-tabs');
    if (tabs) add(tabs, 'clip', 0.58, 0.84, 3);

    const inlineDesc = cardEl.querySelector('.layer-inline-desc');
    if (inlineDesc) add(inlineDesc, 'clip', 0.66, 0.90, 2);

    add(cardEl.querySelector('.case-tags'), 'clip', 0.68, 0.92, 2);
    add(cardEl.querySelector('.case-actions'), 'clip', 0.74, 0.97, 3);

    return items;
  }

  function createBuilderOverlay() {
    if (overlayEl || document.getElementById('builder-cursors-layer')) return;

    overlayEl = document.createElement('div');
    overlayEl.id = 'builder-cursors-layer';
    overlayEl.className = 'builder-cursors-layer';
    overlayEl.setAttribute('aria-hidden', 'true');

    // Laser Smart-Alignment Guides
    guideXEl = document.createElement('div');
    guideXEl.className = 'saai-smart-guide guide-x';
    guideYEl = document.createElement('div');
    guideYEl.className = 'saai-smart-guide guide-y';
    overlayEl.appendChild(guideXEl);
    overlayEl.appendChild(guideYEl);

    // Frame Pool with 4 white corner square handles and dimension badge
    framePool = [];
    for (let i = 0; i < MAX_FRAMES; i++) {
      const box = document.createElement('div');
      box.className = 'saai-frame';
      box.style.opacity = '0';
      box.innerHTML = `
        <i class="saai-handle tl"></i>
        <i class="saai-handle tr"></i>
        <i class="saai-handle bl"></i>
        <i class="saai-handle br"></i>
        <span class="saai-dim">0 × 0</span>
      `;
      overlayEl.appendChild(box);
      framePool.push({
        el: box,
        dimEl: box.querySelector('.saai-dim'),
        taskKey: null,
        alpha: 0,
        x: 0,
        y: 0,
        w: 40,
        h: 24,
        inited: false
      });
    }

    // Clean cursor arrows: sharp SVG pointers WITHOUT any parasitic text tags
    cursorPool = [];
    for (let i = 0; i < MAX_CURSORS; i++) {
      const color = CURSOR_COLORS[i % CURSOR_COLORS.length];
      const cur = document.createElement('div');
      cur.className = 'saai-cursor';
      cur.style.opacity = '0';
      cur.innerHTML = `
        <svg class="saai-cursor-svg" viewBox="0 0 18 18" fill="none">
          <path class="cur-arrow" d="M2.1 1.7L16.3 7.5L9.5 10.0L7.0 16.8L2.1 1.7Z"
                fill="${color}" stroke="#ffffff" stroke-width="1.45" stroke-linejoin="round"/>
          <g class="cur-cross">
            <line x1="9" y1="1.5" x2="9" y2="16.5" stroke="#04131f" stroke-width="3.2" stroke-linecap="round"/>
            <line x1="1.5" y1="9" x2="16.5" y2="9" stroke="#04131f" stroke-width="3.2" stroke-linecap="round"/>
            <line x1="9" y1="2" x2="9" y2="16" stroke="${color}" stroke-width="1.7" stroke-linecap="round"/>
            <line x1="2" y1="9" x2="16" y2="9" stroke="${color}" stroke-width="1.7" stroke-linecap="round"/>
            <circle cx="9" cy="9" r="1.5" fill="#ffffff"/>
          </g>
        </svg>
      `;
      overlayEl.appendChild(cur);
      cursorPool.push({
        el: cur,
        color,
        taskKey: null,
        alpha: 0,
        x: 0,
        y: 0,
        inited: false,
        crosshair: false
      });
    }

    document.body.appendChild(overlayEl);

    // Minimalist Bottom-Right Telemetry Pill
    hudPillEl = document.createElement('div');
    hudPillEl.id = 'architect-hud-pill';
    hudPillEl.className = 'architect-hud-pill';
    hudPillEl.setAttribute('data-mode', 'settled');
    hudPillEl.setAttribute('aria-hidden', 'true');
    hudPillEl.innerHTML = `
      <span class="architect-hud-dot"></span>
      <span class="architect-hud-status">ASSEMBLÉ ●</span>
      <span class="architect-hud-sep">·</span>
      <span class="architect-hud-count">00 / 00</span>
      <span class="architect-hud-sep">·</span>
      <span class="architect-hud-pct">0%</span>
    `;
    hudStatusEl = hudPillEl.querySelector('.architect-hud-status');
    hudCountEl = hudPillEl.querySelector('.architect-hud-count');
    hudPctEl = hudPillEl.querySelector('.architect-hud-pct');
    document.body.appendChild(hudPillEl);
  }

  function initSpecularCardSpotlight() {
    let pendingEv = null;
    let spotRaf = 0;

    document.addEventListener(
      'pointermove',
      function (ev) {
        pendingEv = ev;
        if (!spotRaf) {
          spotRaf = window.requestAnimationFrame(function () {
            spotRaf = 0;
            if (!pendingEv) return;
            const target = pendingEv.target && pendingEv.target.closest
              ? pendingEv.target.closest('.hud-card, .case-card, .repo-mini-card, .dna-card')
              : null;
            if (!target) return;
            const r = target.getBoundingClientRect();
            const mx = ((pendingEv.clientX - r.left) / Math.max(1, r.width)) * 100;
            const my = ((pendingEv.clientY - r.top) / Math.max(1, r.height)) * 100;
            target.style.setProperty('--mx', `${mx.toFixed(1)}%`);
            target.style.setProperty('--my', `${my.toFixed(1)}%`);
          });
        }
      },
      { passive: true }
    );
  }

  function measureModules() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const vh = Math.max(500, window.innerHeight);
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);

    modules.forEach((m) => {
      if (m.el.offsetParent === null && window.getComputedStyle(m.el).display === 'none') {
        m.hiddenByFilter = true;
        return;
      }
      m.hiddenByFilter = false;

      const prevVis = m.el.style.visibility;
      const prevTransform = m.el.style.transform;
      m.el.style.transform = 'none';
      const rect = m.el.getBoundingClientRect();
      m.el.style.transform = prevTransform;
      m.el.style.visibility = prevVis;

      const docTop = rect.top + scrollY;
      let startScroll = docTop - vh * 0.92;
      let endScroll =
        m.kind === 'coord'
          ? docTop - vh * 0.54
          : m.kind === 'heading'
            ? docTop - vh * 0.42
            : docTop - vh * 0.22;

      if (endScroll > maxScroll - 20) {
        endScroll = Math.max(24, maxScroll - 20);
        const spanCap = m.kind === 'card' ? Math.min(470, vh * 0.58) : Math.min(250, vh * 0.32);
        startScroll = Math.max(0, endScroll - spanCap);
      }
      if (endScroll <= startScroll + 65) {
        startScroll = Math.max(0, endScroll - 175);
      }

      m.startScroll = startScroll;
      m.endScroll = endScroll;
    });
  }

  function applyModuleVisual(m, p) {
    if (m.hiddenByFilter) return;

    if (m.kind === 'coord') {
      if (p <= 0.008) {
        m.el.style.opacity = '0';
        m.el.style.visibility = 'hidden';
        return;
      }
      if (p >= 0.988) {
        m.el.style.opacity = '';
        m.el.style.visibility = '';
        m.el.style.clipPath = '';
        if (m.lineEl) {
          m.lineEl.style.transform = '';
          m.lineEl.style.transformOrigin = '';
        }
        if (m.rightIdxEl) m.rightIdxEl.style.opacity = '';
        return;
      }

      m.el.style.visibility = 'visible';
      m.el.style.opacity = Math.min(1, p * 2.2).toFixed(3);

      if (m.lineEl) {
        const lineP = smoothstep((p - 0.08) / 0.78);
        m.lineEl.style.transformOrigin = 'left center';
        m.lineEl.style.transform = `scaleX(${lineP.toFixed(4)})`;
        if (m.rightIdxEl) {
          m.rightIdxEl.style.opacity = smoothstep((p - 0.72) / 0.26).toFixed(3);
        }
      } else {
        const rightPct = ((1 - p) * 100).toFixed(2);
        m.el.style.clipPath = `inset(-4px ${rightPct}% -4px -4px)`;
      }
      return;
    }

    if (m.kind === 'heading') {
      if (p <= 0.008) {
        m.subItems.forEach((si) => applySubItem(si, 0));
        m.el.style.opacity = '0';
        m.el.style.visibility = 'hidden';
        return;
      }
      m.el.style.visibility = 'visible';
      m.el.style.opacity = '1';
      for (let i = 0; i < m.subItems.length; i++) {
        applySubItem(m.subItems[i], p);
      }
      if (p >= 0.988) {
        m.el.style.opacity = '';
        m.el.style.visibility = '';
      }
      return;
    }

    if (m.noShellWireframe) {
      if (p <= 0.008) {
        m.subItems.forEach((si) => applySubItem(si, 0));
        m.el.style.opacity = '0';
        m.el.style.visibility = 'hidden';
        return;
      }
      m.el.style.visibility = 'visible';
      m.el.style.opacity = '1';
      for (let i = 0; i < m.subItems.length; i++) {
        applySubItem(m.subItems[i], p);
      }
      return;
    }

    if (p < 0.22) {
      for (let i = 0; i < m.subItems.length; i++) {
        applySubItem(m.subItems[i], 0);
      }
      m.el.style.opacity = '0';
      m.el.style.visibility = 'hidden';
      return;
    }

    if (p >= 0.988) {
      for (let i = 0; i < m.subItems.length; i++) {
        applySubItem(m.subItems[i], 1);
      }
      m.el.style.opacity = '';
      m.el.style.visibility = '';
      return;
    }

    const shellAlpha = smoothstep((p - 0.22) / 0.06);
    m.el.style.visibility = 'visible';
    m.el.style.opacity = shellAlpha.toFixed(3);

    for (let i = 0; i < m.subItems.length; i++) {
      applySubItem(m.subItems[i], p);
    }
  }

  function applySectionGates() {
    for (let i = 0; i < sectionGates.length; i++) {
      const g = sectionGates[i];
      const p = g.leadModule ? g.leadModule.currentP : 1;
      if (p <= 0.006) {
        g.el.style.opacity = '0';
      } else if (p >= 0.16) {
        g.el.style.opacity = '';
      } else {
        g.el.style.opacity = smoothstep((p - 0.006) / 0.154).toFixed(3);
      }
    }
  }

  function applyHeroUpperParallax(scrollY) {
    if (!heroRefs) return;
    const vh = Math.max(500, window.innerHeight);
    const t = clamp01((scrollY - 60) / (vh * 0.72));

    if (t <= 0.002) {
      heroRefs.left.style.transform = '';
      heroRefs.left.style.opacity = '';
      heroRefs.portrait.style.transform = '';
      heroRefs.portrait.style.opacity = '';
      heroRefs.right.style.transform = '';
      heroRefs.right.style.opacity = '';
      return;
    }

    const fade = (1 - t * 0.72).toFixed(3);
    heroRefs.left.style.transform = `translate3d(${(-t * 22).toFixed(1)}px, ${(-t * 16).toFixed(1)}px, 0)`;
    heroRefs.left.style.opacity = fade;

    heroRefs.portrait.style.transform = `translate3d(0, ${(-t * 12).toFixed(1)}px, 0) scale(${(1 - t * 0.045).toFixed(3)})`;
    heroRefs.portrait.style.opacity = fade;

    heroRefs.right.style.transform = `translate3d(${(t * 22).toFixed(1)}px, ${(-t * 16).toFixed(1)}px, 0)`;
    heroRefs.right.style.opacity = fade;
  }

  function updateHudPill(scrollY, activeFrameCount) {
    if (!hudPillEl) return;
    if (scrollY < 24) {
      hudPillEl.classList.remove('visible');
      return;
    }
    hudPillEl.classList.add('visible');

    let visibleCount = 0;
    let builtCount = 0;
    let sumP = 0;

    for (let i = 0; i < modules.length; i++) {
      const m = modules[i];
      if (m.hiddenByFilter) continue;
      visibleCount++;
      sumP += m.currentP;
      if (m.currentP >= 0.55) builtCount++;
    }

    const totalPct = visibleCount > 0 ? Math.round((sumP / visibleCount) * 100) : 0;
    const isFr = getLang() === 'fr';
    const reversingNow = scrollDirection < 0 && (isActivelyScrolling || activeFrameCount > 0);
    const buildingNow = isActivelyScrolling || activeFrameCount > 0;

    let mode = 'settled';
    let label = isFr ? 'ASSEMBLÉ ●' : 'SETTLED ●';
    if (reversingNow) {
      mode = 'reverse';
      label = isFr ? 'DÉCONSTRUCTION ↑' : 'DECONSTRUCTING ↑';
    } else if (buildingNow) {
      mode = 'build';
      label = isFr ? 'CONSTRUCTION ↓' : 'ASSEMBLING ↓';
    }

    if (hudPillEl.getAttribute('data-mode') !== mode) {
      hudPillEl.setAttribute('data-mode', mode);
    }
    if (hudStatusEl.textContent !== label) {
      hudStatusEl.textContent = label;
    }
    hudCountEl.textContent = `${String(builtCount).padStart(2, '0')} / ${String(visibleCount).padStart(2, '0')}`;
    hudPctEl.textContent = `${totalPct}%`;
  }

  /* ------------------------------------------------------------------------
     HERO INITIAL LIVE CONSTRUCTION CHOREOGRAPHY (PUNCHY & CLEAN)
     Runs fast on refresh (1.4s), then fades out completely to leave the page clean!
     ------------------------------------------------------------------------ */
  function initHeroIntroChoreography() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    if (scrollY >= 60) {
      isHeroIntroActive = false;
      return;
    }

    const nameEl = document.querySelector('.hero-name-block');
    const roleTextEl = document.getElementById('role-flip-text');
    const portraitStageEl = document.getElementById('portrait-stage');
    const card1 = document.querySelector('.hero-right .hud-card:nth-child(1)');
    const card2 = document.querySelector('.hero-right .hud-card:nth-child(2)');
    const card3 = document.querySelector('.hero-right .hud-card:nth-child(3)');

    if (!nameEl || !portraitStageEl) {
      isHeroIntroActive = false;
      return;
    }

    heroElements = {
      nameEl,
      nameText: nameEl.textContent.trim() || 'MATÉI.',
      roleTextEl,
      roleText: roleTextEl ? roleTextEl.textContent.trim() : '',
      portraitStageEl,
      card1,
      card2,
      card3
    };

    isHeroIntroActive = true;
    heroIntroStartTs = performance.now();
    heroIntroCleaned = false;
  }

  function cleanHeroIntro() {
    if (heroIntroCleaned || !heroElements) return;
    heroIntroCleaned = true;
    isHeroIntroActive = false;

    if (heroElements.nameEl) {
      heroElements.nameEl.textContent = heroElements.nameText;
      heroElements.nameEl.style.opacity = '';
    }
    if (heroElements.roleTextEl) {
      heroElements.roleTextEl.textContent = heroElements.roleText;
      heroElements.roleTextEl.style.opacity = '';
    }
    if (heroElements.card1) {
      heroElements.card1.style.clipPath = '';
      heroElements.card1.style.opacity = '';
    }
    if (heroElements.card2) {
      heroElements.card2.style.clipPath = '';
      heroElements.card2.style.opacity = '';
    }
    if (heroElements.card3) {
      heroElements.card3.style.clipPath = '';
      heroElements.card3.style.opacity = '';
    }
  }

  function getHeroIntroOperations(now) {
    if (!heroElements || !isHeroIntroActive) return null;
    const t = (now - heroIntroStartTs) / 1000;

    if (t > 1.6 || (window.scrollY || 0) > 40) {
      cleanHeroIntro();
      return null;
    }

    const frameTasks = [];
    const cursorTargets = [];

    // 1. Name "MATÉI." (0.04s -> 0.70s)
    if (t >= 0.04 && t <= 0.85 && heroElements.nameEl) {
      const p = smoothstep(clamp01((t - 0.04) / 0.66));
      const r = heroElements.nameEl.getBoundingClientRect();
      const chars = Math.max(1, Math.min(heroElements.nameText.length, Math.round(heroElements.nameText.length * p)));
      heroElements.nameEl.textContent = heroElements.nameText.slice(0, chars);

      frameTasks.push({
        key: 'hero_name_box',
        kind: 'text',
        left: r.left - 4,
        top: r.top - 2,
        width: r.width + 8,
        height: r.height + 4,
        dimW: Math.round(r.width),
        dimH: Math.round(r.height),
        cursorX: r.left + r.width * p + 4,
        cursorY: r.bottom - 4,
        crosshair: false,
        score: -0.95
      });
      cursorTargets.push({
        key: 'hero_name_box_drag',
        x: r.left + r.width * p + 4,
        y: r.bottom - 4,
        crosshair: false
      });
    }

    // 2. Role Text (0.25s -> 0.95s)
    if (t >= 0.25 && t <= 1.10 && heroElements.roleTextEl) {
      const p = smoothstep(clamp01((t - 0.25) / 0.70));
      const r = heroElements.roleTextEl.getBoundingClientRect();
      const chars = Math.max(1, Math.min(heroElements.roleText.length, Math.round(heroElements.roleText.length * p)));
      heroElements.roleTextEl.textContent = heroElements.roleText.slice(0, chars);

      frameTasks.push({
        key: 'hero_role_box',
        kind: 'text',
        left: r.left - 4,
        top: r.top - 2,
        width: r.width + 8,
        height: r.height + 4,
        dimW: Math.round(r.width * p),
        dimH: Math.round(r.height),
        cursorX: r.left + r.width * p + 3,
        cursorY: r.bottom - 2,
        crosshair: false,
        score: -0.85
      });
      cursorTargets.push({
        key: 'hero_role_box_drag',
        x: r.left + r.width * p + 3,
        y: r.bottom - 2,
        crosshair: false
      });
    }

    // 3. Portrait Stage Wireframe (0.35s -> 1.35s)
    if (t >= 0.35 && t <= 1.45 && heroElements.portraitStageEl) {
      const p = smoothstep(clamp01((t - 0.35) / 1.0));
      const r = heroElements.portraitStageEl.getBoundingClientRect();
      const curW = Math.max(40, r.width * (0.08 + 0.92 * p));
      const curH = Math.max(40, r.height * (0.08 + 0.92 * p));

      frameTasks.push({
        key: 'hero_portrait_wire',
        kind: 'wireframe',
        left: r.left,
        top: r.top,
        width: curW,
        height: curH,
        dimW: Math.round(curW),
        dimH: Math.round(curH),
        cursorX: r.left + curW,
        cursorY: r.top + curH,
        crosshair: p < 0.85,
        score: -0.90
      });
      cursorTargets.push({
        key: 'hero_portrait_wire_drag',
        x: r.left + curW,
        y: r.top + curH,
        crosshair: p < 0.85
      });
    }

    // 4. Hero Right KPI Cards (0.50s -> 1.50s)
    const cards = [
      { el: heroElements.card1, start: 0.50, end: 1.25 },
      { el: heroElements.card2, start: 0.70, end: 1.40 },
      { el: heroElements.card3, start: 0.90, end: 1.55 }
    ];

    cards.forEach((cd, idx) => {
      if (t >= cd.start && t <= cd.end + 0.05 && cd.el) {
        const p = smoothstep(clamp01((t - cd.start) / (cd.end - cd.start)));
        const r = cd.el.getBoundingClientRect();
        const curW = Math.max(30, r.width * p);
        const curH = Math.max(20, r.height * p);

        const rightPct = ((1 - p) * 100).toFixed(1);
        const bottomPct = ((1 - p) * 100).toFixed(1);
        cd.el.style.clipPath = `inset(0 ${rightPct}% ${bottomPct}% 0)`;
        cd.el.style.opacity = Math.min(1, p * 1.5).toFixed(2);

        frameTasks.push({
          key: `hero_card_${idx}`,
          kind: 'clip',
          left: r.left,
          top: r.top,
          width: curW,
          height: curH,
          dimW: Math.round(curW),
          dimH: Math.round(curH),
          cursorX: r.left + curW,
          cursorY: r.top + curH,
          crosshair: false,
          score: -0.75 + idx * 0.05
        });
        cursorTargets.push({
          key: `hero_card_${idx}_drag`,
          x: r.left + curW,
          y: r.top + curH,
          crosshair: false
        });
      }
    });

    return {
      frames: frameTasks.slice(0, MAX_FRAMES),
      cursors: cursorTargets.slice(0, MAX_CURSORS)
    };
  }

  function collectActiveOperations() {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const frameTasks = [];
    const freeCursorTasks = [];

    for (let i = 0; i < modules.length; i++) {
      const m = modules[i];
      if (m.hiddenByFilter) continue;
      const p = m.currentP;
      if (p <= 0.012 || p >= 0.982) continue;

      if (m.kind === 'coord') {
        const targetNode = m.lineEl || m.el;
        const r = targetNode.getBoundingClientRect();
        if (r.bottom < 58 || r.top > vh - 24 || r.width < 30) continue;
        const lineP = m.lineEl ? smoothstep((p - 0.08) / 0.78) : p;
        if (lineP <= 0.02 || lineP >= 0.98) continue;
        const tipX = Math.max(12, Math.min(vw - 20, r.left + r.width * lineP));
        const tipY = Math.max(58, Math.min(vh - 24, r.top + r.height * 0.5));
        freeCursorTasks.push({
          key: m.uid + '_tip',
          x: tipX,
          y: tipY,
          crosshair: false,
          score: Math.abs(tipY - vh * 0.48) / vh
        });
        continue;
      }

      if (m.kind === 'card' && !m.noShellWireframe && p < 0.27) {
        const r = m.el.getBoundingClientRect();
        if (r.bottom >= 72 && r.top <= vh - 36 && r.width >= 60) {
          const wP = smoothstep((p - 0.012) / 0.245);
          const visTop = Math.max(62, r.top);
          const visMaxH = Math.max(36, Math.min(vh - 34, r.bottom) - visTop);
          const curW = Math.max(24, r.width * (0.06 + 0.94 * wP));
          const curH = Math.max(18, visMaxH * (0.10 + 0.90 * wP));
          const left = Math.max(12, r.left);

          frameTasks.push({
            key: m.uid + '_wire',
            kind: 'wireframe',
            left,
            top: visTop,
            width: Math.min(vw - 16 - left, curW),
            height: curH,
            dimW: Math.round(r.width * (0.06 + 0.94 * wP)),
            dimH: Math.round(Math.min(r.height, 640) * (0.10 + 0.90 * wP)),
            cursorX: Math.min(vw - 18, left + curW),
            cursorY: Math.min(vh - 28, visTop + curH),
            crosshair: wP < 0.82,
            dualAnchor: curW > 180,
            score: Math.abs(visTop + curH * 0.5 - vh * 0.54) / vh - 0.22
          });
        }
        continue;
      }

      for (let j = 0; j < m.subItems.length; j++) {
        const si = m.subItems[j];
        const sp = si.subP;
        if (sp <= 0.02 || sp >= 0.975) continue;

        if (si.mode === 'type' && si.mounted && si.visEl) {
          const vr = si.visEl.getBoundingClientRect();
          if (vr.bottom < 64 || vr.top > vh - 30 || vr.width < 4) continue;
          const cr = si.caretEl ? si.caretEl.getBoundingClientRect() : vr;

          const padX = 4;
          const padY = 2;
          const left = Math.max(10, vr.left - padX);
          const top = Math.max(60, vr.top - padY);
          const width = Math.max(18, Math.min(vw - 16 - left, vr.width + padX * 2));
          const height = Math.max(16, Math.min(vh - 30 - top, vr.height + padY * 2));

          const caretX = Math.max(14, Math.min(vw - 18, (cr.width >= 0 ? cr.right : vr.right) + 3));
          const caretY = Math.max(62, Math.min(vh - 26, (cr.height > 0 ? cr.bottom : vr.bottom) - 1));

          const centerDist = Math.abs(top + height * 0.5 - vh * 0.5) / vh;
          const midBonus = Math.abs(sp - 0.5) * 0.35;

          frameTasks.push({
            key: si.uid,
            kind: 'text',
            left,
            top,
            width,
            height,
            dimW: Math.round(vr.width),
            dimH: Math.round(vr.height),
            cursorX: caretX,
            cursorY: caretY,
            crosshair: false,
            dualAnchor: false,
            score: centerDist + midBonus - si.priority * 0.06
          });
        } else if (si.mode === 'clip') {
          const r = si.el.getBoundingClientRect();
          if (r.bottom < 66 || r.top > vh - 32 || r.width < 28 || r.height < 14) continue;

          const px = Math.max(0.05, sp);
          const py = Math.max(0.14, Math.min(1, sp * 1.18));
          const left = Math.max(10, r.left);
          const top = Math.max(60, r.top);
          const maxVisH = Math.max(16, Math.min(vh - 32, r.bottom) - top);
          const curW = Math.max(20, Math.min(vw - 16 - left, r.width * px));
          const curH = Math.max(15, maxVisH * py);

          const centerDist = Math.abs(top + curH * 0.5 - vh * 0.5) / vh;
          const midBonus = Math.abs(sp - 0.5) * 0.35;

          frameTasks.push({
            key: si.uid,
            kind: 'clip',
            left,
            top,
            width: curW,
            height: curH,
            dimW: Math.round(r.width * px),
            dimH: Math.round(r.height * py),
            cursorX: Math.min(vw - 18, left + curW),
            cursorY: Math.min(vh - 26, top + curH),
            crosshair: sp < 0.22 && r.height > 90,
            dualAnchor: r.width >= 240 && r.height >= 85 && curW >= 90,
            score: centerDist + midBonus - si.priority * 0.06
          });
        }
      }
    }

    frameTasks.sort((a, b) => a.score - b.score);

    const selectedFrames = [];
    for (let i = 0; i < frameTasks.length && selectedFrames.length < MAX_FRAMES; i++) {
      const cand = frameTasks[i];
      const collision = selectedFrames.some(
        (other) => Math.abs(other.top - cand.top) < 18 && Math.abs(other.left - cand.left) < 36
      );
      if (!collision) {
        selectedFrames.push(cand);
      }
    }

    const cursorTargets = [];
    selectedFrames.forEach((ft) => {
      cursorTargets.push({
        key: ft.key + '_drag',
        x: ft.cursorX,
        y: ft.cursorY,
        crosshair: ft.crosshair
      });
      if (ft.dualAnchor && cursorTargets.length < MAX_CURSORS - 1) {
        cursorTargets.push({
          key: ft.key + '_anch',
          x: ft.left - 1,
          y: ft.top - 1,
          crosshair: false
        });
      }
    });

    freeCursorTasks.sort((a, b) => a.score - b.score);
    for (
      let i = 0;
      i < freeCursorTasks.length && cursorTargets.length < MAX_CURSORS;
      i++
    ) {
      cursorTargets.push(freeCursorTasks[i]);
    }

    return {
      frames: selectedFrames,
      cursors: cursorTargets.slice(0, MAX_CURSORS)
    };
  }

  function updateOverlayPool(dt, now) {
    if (!overlayEl) return false;
    if (window.innerWidth <= 660) {
      overlayEl.style.opacity = '0';
      return false;
    }
    overlayEl.style.opacity = '1';

    const scrollY = window.scrollY || window.pageYOffset || 0;
    let ops = null;

    if (isHeroIntroActive) {
      ops = getHeroIntroOperations(now);
    }
    if (!ops) {
      ops = collectActiveOperations();
    }

    const reversingVisual = scrollDirection < 0 && (isActivelyScrolling || ops.frames.length > 0);

    updateHudPill(scrollY, ops.frames.length);

    let animating = false;
    const posLerp = 1 - Math.exp(-dt * 26);
    const glideLerp = 1 - Math.exp(-dt * 18);
    const fadeLerp = 1 - Math.exp(-dt * 16);

    // Update Laser Smart-Alignment Guides on primary frame
    if (guideXEl && guideYEl) {
      if (ops.frames.length > 0 && (isActivelyScrolling || isHeroIntroActive)) {
        const lead = ops.frames[0];
        guideXEl.style.opacity = '0.78';
        guideYEl.style.opacity = '0.78';
        guideXEl.style.transform = `translate3d(0, ${lead.top.toFixed(1)}px, 0)`;
        guideYEl.style.transform = `translate3d(${lead.left.toFixed(1)}px, 0, 0)`;
        animating = true;
      } else {
        guideXEl.style.opacity = '0';
        guideYEl.style.opacity = '0';
      }
    }

    // 1. Assign Frames
    const frameAssign = new Array(framePool.length).fill(null);
    const usedFrames = new Set();

    ops.frames.forEach((ft, idx) => {
      const matchIdx = framePool.findIndex(
        (slot, sIdx) => !frameAssign[sIdx] && slot.taskKey === ft.key
      );
      if (matchIdx !== -1) {
        frameAssign[matchIdx] = ft;
        usedFrames.add(idx);
      }
    });

    ops.frames.forEach((ft, idx) => {
      if (usedFrames.has(idx)) return;
      const freeIdx = frameAssign.findIndex((a) => a === null);
      if (freeIdx !== -1) {
        frameAssign[freeIdx] = ft;
        usedFrames.add(idx);
      }
    });

    for (let i = 0; i < framePool.length; i++) {
      const slot = framePool[i];
      const ft = frameAssign[i];
      const targetAlpha = ft ? 1 : 0;

      slot.alpha += (targetAlpha - slot.alpha) * fadeLerp;
      if (Math.abs(targetAlpha - slot.alpha) > 0.005) {
        animating = true;
      } else {
        slot.alpha = targetAlpha;
      }
      slot.el.style.opacity = slot.alpha.toFixed(3);

      if (ft) {
        const sameTask = slot.taskKey === ft.key;
        slot.taskKey = ft.key;
        slot.el.classList.toggle('is-wireframe', ft.kind === 'wireframe');
        slot.el.classList.toggle('is-text-box', ft.kind === 'text');
        slot.el.classList.toggle('is-reversing', reversingVisual);

        if (!slot.inited || (!sameTask && slot.alpha < 0.25)) {
          slot.x = ft.left;
          slot.y = ft.top;
          slot.w = ft.width;
          slot.h = ft.height;
          slot.inited = true;
          animating = true;
        } else {
          const k = sameTask ? posLerp : glideLerp;
          slot.x += (ft.left - slot.x) * k;
          slot.y += (ft.top - slot.y) * k;
          slot.w += (ft.width - slot.w) * k;
          slot.h += (ft.height - slot.h) * k;
          if (
            Math.abs(ft.left - slot.x) > 0.4 ||
            Math.abs(ft.top - slot.y) > 0.4 ||
            Math.abs(ft.width - slot.w) > 0.4 ||
            Math.abs(ft.height - slot.h) > 0.4
          ) {
            animating = true;
          }
        }

        slot.el.style.transform = `translate3d(${slot.x.toFixed(1)}px, ${slot.y.toFixed(1)}px, 0)`;
        slot.el.style.width = `${Math.max(14, slot.w).toFixed(1)}px`;
        slot.el.style.height = `${Math.max(14, slot.h).toFixed(1)}px`;
        const prefix = reversingVisual ? '↺ ' : '';
        slot.dimEl.textContent = `${prefix}${Math.max(1, ft.dimW)} × ${Math.max(1, ft.dimH)}`;
      } else if (slot.alpha <= 0.01) {
        slot.taskKey = null;
        slot.inited = false;
      }
    }

    // 2. Assign Cursors: ONLY ACTIVE CURSORS ARE VISIBLE (Zero parasites when idle!)
    const curAssign = new Array(cursorPool.length).fill(null);
    const usedCursors = new Set();

    ops.cursors.forEach((ct, idx) => {
      const matchIdx = cursorPool.findIndex(
        (c, cIdx) => !curAssign[cIdx] && c.taskKey === ct.key
      );
      if (matchIdx !== -1) {
        curAssign[matchIdx] = ct;
        usedCursors.add(idx);
      }
    });

    ops.cursors.forEach((ct, idx) => {
      if (usedCursors.has(idx)) return;
      let bestIdx = -1;
      let bestScore = Infinity;

      for (let cIdx = 0; cIdx < cursorPool.length; cIdx++) {
        if (curAssign[cIdx]) continue;
        const c = cursorPool[cIdx];
        if (c.inited && c.alpha > 0.15) {
          const dist = Math.hypot(ct.x - c.x, ct.y - c.y);
          if (dist < bestScore) {
            bestScore = dist;
            bestIdx = cIdx;
          }
        } else if (bestIdx === -1) {
          bestIdx = cIdx;
        }
      }

      if (bestIdx !== -1) {
        curAssign[bestIdx] = ct;
        usedCursors.add(idx);
      }
    });

    for (let i = 0; i < cursorPool.length; i++) {
      const c = cursorPool[i];
      const ct = curAssign[i];
      // Target alpha is 1 when actively assigned, 0 when idle (CLEAN SCREEN!)
      const targetAlpha = ct ? 1 : 0;

      c.alpha += (targetAlpha - c.alpha) * fadeLerp;
      if (Math.abs(targetAlpha - c.alpha) > 0.005) {
        animating = true;
      } else {
        c.alpha = targetAlpha;
      }
      c.el.style.opacity = c.alpha.toFixed(3);

      if (ct) {
        const sameTask = c.taskKey === ct.key;
        c.taskKey = ct.key;
        if (c.crosshair !== ct.crosshair) {
          c.crosshair = ct.crosshair;
          c.el.classList.toggle('is-crosshair', ct.crosshair);
        }

        const tx = ct.crosshair ? ct.x - 9 : ct.x - 2;
        const ty = ct.crosshair ? ct.y - 9 : ct.y - 2;

        if (!c.inited) {
          c.x = tx + (i % 2 === 0 ? -28 : 28);
          c.y = ty + 24;
          c.inited = true;
          animating = true;
        } else {
          const k = sameTask ? posLerp : glideLerp;
          c.x += (tx - c.x) * k;
          c.y += (ty - c.y) * k;
          if (Math.abs(tx - c.x) > 0.35 || Math.abs(ty - c.y) > 0.35) {
            animating = true;
          }
        }

        c.el.style.transform = `translate3d(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px, 0)`;
      } else if (c.alpha <= 0.01) {
        c.taskKey = null;
        c.inited = false;
      }
    }

    return animating;
  }

  function tick(now) {
    const dt = lastTs ? Math.min(0.05, Math.max(0.005, (now - lastTs) / 1000)) : 0.016;
    lastTs = now;

    const scrollY = window.scrollY || window.pageYOffset || 0;
    const scrubLerp = 1 - Math.exp(-dt * 18);
    let modulesMoving = false;

    applyHeroUpperParallax(scrollY);

    for (let i = 0; i < modules.length; i++) {
      const m = modules[i];
      if (m.hiddenByFilter) continue;

      const span = Math.max(1, m.endScroll - m.startScroll);
      const raw = clamp01((scrollY - m.startScroll) / span);
      const targetP = smoothstep(raw);
      const diff = targetP - m.currentP;

      if (Math.abs(diff) > 0.0009) {
        m.currentP += diff * scrubLerp;
        modulesMoving = true;
      } else {
        m.currentP = targetP;
      }

      applyModuleVisual(m, m.currentP);
    }

    applySectionGates();
    const overlayMoving = updateOverlayPool(dt, now);

    if (modulesMoving || overlayMoving || isHeroIntroActive || isActivelyScrolling) {
      rafId = window.requestAnimationFrame(tick);
    } else {
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

  window.__refreshScrollArchitectLang = function () {
    for (let i = 0; i < allTypeItems.length; i++) {
      const item = allTypeItems[i];
      if (item.mounted && item.visEl && item.visEl.parentNode === item.el) {
        unmountTypeSpans(item);
      } else {
        item.visEl = null;
        item.caretEl = null;
        item.ghostEl = null;
        item.mounted = false;
        item.lastChars = -1;
      }
      item.fullText = item.el.textContent || '';
    }

    measureModules();
    for (let i = 0; i < modules.length; i++) {
      applyModuleVisual(modules[i], modules[i].currentP);
    }
    applySectionGates();
    requestTick();
  };

  function initScrollArchitect() {
    initSpecularCardSpotlight();

    const reduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const left = document.querySelector('.hero-left');
    const portrait = document.querySelector('.portrait-stage');
    const right = document.querySelector('.hero-right');
    if (left && portrait && right) {
      heroRefs = { left, portrait, right };
    }

    allTypeItems = [];
    const rawNodes = Array.from(
      document.querySelectorAll('[data-scroll-build], .cad-ruler-bar, .tubik-divider-iso-wave')
    );

    modules = rawNodes.map((el) => {
      const attrKind = el.getAttribute('data-scroll-build');
      const kind =
        attrKind ||
        (el.classList.contains('cad-ruler-bar') || el.classList.contains('tubik-divider-iso-wave')
          ? 'coord'
          : 'card');

      const subItems =
        kind === 'heading'
          ? discoverHeadingItems(el)
          : kind === 'card'
            ? discoverCardSubItems(el)
            : [];

      return {
        uid: 'mod_' + nextTaskUid++,
        el,
        kind,
        lineEl: el.querySelector('.section-coord-line'),
        rightIdxEl: el.querySelector('.section-coord-index'),
        noShellWireframe: el.classList.contains('metrics-band-grid'),
        subItems,
        hiddenByFilter: false,
        startScroll: 0,
        endScroll: 240,
        currentP: 0
      };
    });

    sectionGates = [];
    const gateContainers = document.querySelectorAll(
      '.section-block, .tubik-divider-ruler, .tubik-divider-editorial, .tubik-divider-metrics, .tubik-divider-iso-wave'
    );
    gateContainers.forEach((secEl) => {
      const leadMod = modules.find((m) => m.el === secEl || secEl.contains(m.el));
      if (leadMod) {
        sectionGates.push({ el: secEl, leadModule: leadMod });
      }
    });

    createBuilderOverlay();
    measureModules();

    const initScrollY = window.scrollY || window.pageYOffset || 0;
    prevScrollY = initScrollY;

    modules.forEach((m) => {
      const span = Math.max(1, m.endScroll - m.startScroll);
      const raw = clamp01((initScrollY - m.startScroll) / span);
      m.currentP = smoothstep(raw);
      applyModuleVisual(m, m.currentP);
    });
    applySectionGates();
    applyHeroUpperParallax(initScrollY);

    initHeroIntroChoreography();
    requestTick();

    window.addEventListener(
      'scroll',
      function () {
        const sy = window.scrollY || window.pageYOffset || 0;
        const delta = sy - prevScrollY;

        if (Math.abs(delta) > 1.5) {
          scrollDirection = delta < 0 ? -1 : 1;
        }

        if (isHeroIntroActive && Math.abs(sy) > 25) {
          cleanHeroIntro();
        }

        prevScrollY = sy;
        isActivelyScrolling = true;
        window.clearTimeout(scrollMotionTimer);
        scrollMotionTimer = window.setTimeout(function () {
          isActivelyScrolling = false;
          requestTick();
        }, 180);

        requestTick();
      },
      { passive: true }
    );

    window.addEventListener(
      'resize',
      function () {
        measureModules();
        requestTick();
      },
      { passive: true }
    );

    document.querySelectorAll('.proj-filter-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        window.setTimeout(function () {
          measureModules();
          requestTick();
        }, 35);
      });
    });
  }

  if (document.readyState === 'complete') {
    initScrollArchitect();
  } else {
    window.addEventListener('load', initScrollArchitect);
  }
})();
