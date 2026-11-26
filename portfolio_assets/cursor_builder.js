/* ==========================================================================
   MATÉI DE SAINT LÉGER — MOTEUR D'ASSEMBLAGE PAR CURSEURS MULTI-AGENTS
   Chorégraphie collaborative style Figma / saai.pro (100 % originale) :
   - Règles X/Y (20 px) + guides d'alignement rouges + projection pointillée bleue
   - Curseurs SVG dynamiques (arrow, cross, ibeam, dup, ew/ns)
   - Boîtes wireframe avec poignées 7×7, icône média et badges dimensions W × H
   - Frappe / révélation de texte horizontale avec curseur I-beam & sélection bleue
   - Badges d'espacement entre cartes répétées + Tour Auto + contrôle clavier ESC
   - 100 % non-bloquant (pointer-events: none sur la scène) : apps live intactes
   ========================================================================== */

(function () {
  'use strict';

  const AGENTS = [
    { name: 'Architect', short: 'A', color: '#ff1e42' },
    { name: 'Frontend', short: 'F', color: '#0D99FF' },
    { name: 'Layout', short: 'L', color: '#0ACF83' },
    { name: 'Type', short: 'T', color: '#FFCD29' },
    { name: 'WebGL', short: 'W', color: '#9747FF' },
    { name: 'Shaders', short: 'S', color: '#00B8D9' },
    { name: 'Grid', short: 'G', color: '#FF6B4A' },
    { name: 'QA', short: 'Q', color: '#14AE5C' },
    { name: 'Tokens', short: 'K', color: '#FF72A0' },
    { name: 'Motion', short: 'M', color: '#FF9F1C' },
    { name: 'Router', short: 'R', color: '#2EC4B6' },
    { name: 'Deploy', short: 'D', color: '#7B61FF' }
  ];

  const GLYPHS = {
    arrow: (c) =>
      `<svg viewBox="0 0 18 18" width="16" height="16" fill="none" aria-hidden="true"><path d="M2 1.5L15.2 7.2L8.6 9.3L6.2 15.8L2 1.5Z" fill="${c}" stroke="#ffffff" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
    cross: (c) =>
      `<svg viewBox="0 0 18 18" width="17" height="17" fill="none" aria-hidden="true"><path d="M9 2V16M2 9H16" stroke="#ffffff" stroke-width="3.2" stroke-linecap="square"/><path d="M9 2.6V15.4M2.6 9H15.4" stroke="${c}" stroke-width="1.6" stroke-linecap="square"/></svg>`,
    ibeam: (c) =>
      `<svg viewBox="0 0 16 20" width="14" height="18" fill="none" aria-hidden="true"><path d="M5 2H11M5 18H11M8 2V18" stroke="#ffffff" stroke-width="3" stroke-linecap="square"/><path d="M5.2 2.2H10.8M5.2 17.8H10.8M8 2.2V17.8" stroke="${c}" stroke-width="1.6" stroke-linecap="square"/></svg>`,
    dup: (c) =>
      `<svg viewBox="0 0 20 18" width="18" height="17" fill="none" aria-hidden="true"><path d="M2 1.5L11.5 6.8L6.5 8.5L4.6 13.4L2 1.5Z" fill="${c}" stroke="#ffffff" stroke-width="1.3" stroke-linejoin="round"/><path d="M7.5 6.2L17 11.5L12 13.2L10.1 17.2L7.5 6.2Z" fill="#ffffff" stroke="${c}" stroke-width="1.2" stroke-linejoin="round"/></svg>`
  };

  const MEDIA_PH_ICON =
    `<svg class="swarm-ph-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="8.5" cy="9.5" r="1.5" fill="currentColor"/><path d="M4.5 17.5 10 12.2 14 15.8 16.5 13.2 19.5 17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function initCursorBuilder() {
    const params = new URLSearchParams(window.location.search);
    const reducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDisabledOnLoad =
      reducedMotion || params.get('swarm') === 'off' || params.get('swarm') === '0' || params.get('skipLoader') === '1';

    let layerHost = null;
    let hudEl = null;
    let rafId = 0;
    let running = false;
    let autoTour = false;
    let tourAcc = 0;
    let speed = 1;
    let lastTime = 0;
    let startedAt = 0;
    let layers = [];
    let cursors = [];
    let pointer = { x: window.innerWidth * 0.55, y: window.innerHeight * 0.42 };
    let buildToken = 0;

    function buildTargetList() {
      const specs = [
        { sel: '.nav-capsule', kind: 'box', label: 'NAV_CAPSULE', priority: 0 },
        { sel: '.hero-stage-card', kind: 'frame', label: 'STAGE_MATRIX', priority: 1 },
        { sel: '#hero .kicker-pill', kind: 'pill', label: 'STATUT', priority: 2 },
        { sel: '#hero .hero-title-main', kind: 'text', label: 'DISPLAY_H1', priority: 3 },
        { sel: '#hero .hero-bio', kind: 'text', label: 'BIO_SYSTEMS', priority: 4 },
        { sel: '#hero .hero-cta-row', kind: 'pill', label: 'ACTIONS', priority: 5 },
        { sel: '.portrait-studio-box', kind: 'media', label: 'PORTRAIT_CAD', priority: 4 },
        { sel: '.hero-marquee-strip', kind: 'pill', label: 'TICKER', priority: 6 },
        { sel: '.hero-proof-deck', kind: 'frame', label: 'KPI_DECK', priority: 7 },
        { sel: '.proof-stat-card', kind: 'dup', label: 'KPI', priority: 8, all: true },
        { sel: '#chronicle-timer .timer-grid-card', kind: 'frame', label: 'WORLD_TIME_GRID', priority: 9 },
        { sel: '#flagships .section-head', kind: 'text', label: 'SEC_HEADER_01', priority: 10 },
        { sel: '.agent-pilot-bar', kind: 'pill', label: 'SWARM_BAR', priority: 11 },
        { sel: '.tabs-bar-wrap', kind: 'pill', label: 'PROJECT_TABS', priority: 12 },
        { sel: '.project-showcase-stage', kind: 'frame', label: 'SHOWCASE_STAGE', priority: 12.5 },
        { sel: '.project-panel:not([hidden]) .app-window-frame', kind: 'media', label: 'LIVE_APP_FRAME', priority: 13 },
        { sel: '.project-panel:not([hidden]) .project-info-col', kind: 'text', label: 'SPEC_PANEL', priority: 14 },
        { sel: '#exploded-architecture .section-head', kind: 'text', label: 'SEC_HEADER_02', priority: 16 },
        { sel: '.totem-stage-section', kind: 'frame', label: 'TOTEM_MONOLITH', priority: 17 },
        { sel: '.totem-readout-panel', kind: 'box', label: 'TOTEM_SPEC', priority: 18 },
        { sel: '.totem-canvas-wrap', kind: 'media', label: 'WEBGL_CANVAS', priority: 18 },
        { sel: '#parcours .section-head', kind: 'text', label: 'SEC_HEADER_03', priority: 20 },
        { sel: '#parcours-timeline', kind: 'frame', label: 'TIMELINE_STUDIO', priority: 20.4 },
        { sel: '.parcours-bento .bento-card', kind: 'dup', label: 'PARCOURS', priority: 21, all: true },
        { sel: '#contact .contact-banner', kind: 'frame', label: 'CONTACT_CTA', priority: 23 },
        { sel: '.site-footer', kind: 'pill', label: 'FOOTER', priority: 24 }
      ];

      const list = [];
      const seen = new Set();
      specs.forEach((sp) => {
        const nodes = sp.all ? Array.from(document.querySelectorAll(sp.sel)) : [document.querySelector(sp.sel)];
        nodes.forEach((el, idx) => {
          if (!el || seen.has(el)) return;
          seen.add(el);
          list.push({
            el,
            prevEl: idx > 0 ? nodes[idx - 1] : null,
            kind: sp.kind,
            label: sp.all ? `${sp.label}_0${idx + 1}` : sp.label,
            priority: sp.priority + idx * 0.16,
            state: 'pending',
            duration: sp.kind === 'text' ? 0.52 : sp.kind === 'frame' ? 0.44 : 0.38
          });
        });
      });
      return list;
    }

    function ensureOverlayDom() {
      if (!layerHost) {
        layerHost = document.createElement('div');
        layerHost.id = 'swarm-stage-layer';
        layerHost.className = 'swarm-stage-layer';
        layerHost.setAttribute('aria-hidden', 'true');
        layerHost.innerHTML = `
          <div class="swarm-ruler-top"></div>
          <div class="swarm-ruler-left"></div>
          <div class="swarm-items-layer"></div>
          <div class="swarm-cursors-layer"></div>
        `;
        document.body.appendChild(layerHost);
      }

      if (!hudEl) {
        hudEl = document.createElement('div');
        hudEl.id = 'swarm-builder-hud';
        hudEl.className = 'swarm-builder-hud';
        hudEl.setAttribute('role', 'region');
        hudEl.setAttribute('aria-label', 'Barre de construction multi-agents');
        hudEl.innerHTML = `
          <div class="swarm-hud-avatars" aria-hidden="true">
            ${AGENTS.slice(0, 6)
              .map((a) => `<span class="swarm-av-dot" style="background:${a.color}" title="${a.name}">${a.short}</span>`)
              .join('')}
          </div>
          <span class="swarm-hud-meta"><strong id="swarm-agent-count">12</strong> agents</span>
          <span class="swarm-hud-sep" aria-hidden="true"></span>
          <span class="swarm-hud-layers" id="swarm-layer-counter">0 / 0 calques</span>
          <div class="swarm-hud-track" aria-hidden="true"><div class="swarm-hud-fill" id="swarm-hud-fill"></div></div>
          <button type="button" class="swarm-hud-btn is-tour" id="swarm-btn-tour" title="Défilement automatique pour assembler la page">Tour Auto</button>
          <button type="button" class="swarm-hud-btn" id="swarm-btn-speed" title="Vitesse">1×</button>
          <button type="button" class="swarm-hud-btn" id="swarm-btn-replay" title="Rejouer l'assemblage">Rejouer</button>
          <button type="button" class="swarm-hud-btn is-live-exit" id="swarm-btn-live" title="Tout finaliser immédiatement [ESC]">✕</button>
        `;
        document.body.appendChild(hudEl);

        document.getElementById('swarm-btn-tour')?.addEventListener('click', () => toggleAutoTour());
        document.getElementById('swarm-btn-speed')?.addEventListener('click', () => cycleSpeed());
        document.getElementById('swarm-btn-replay')?.addEventListener('click', () => replay({ autoTour: true }));
        document.getElementById('swarm-btn-live')?.addEventListener('click', () => finishAll(true));
      }
    }

    function createCursorPool() {
      const itemsHost = layerHost.querySelector('.swarm-items-layer');
      const cursorsHost = layerHost.querySelector('.swarm-cursors-layer');
      if (itemsHost) itemsHost.innerHTML = '';
      if (cursorsHost) cursorsHost.innerHTML = '';

      const poolCount = window.innerWidth < 768 ? 6 : 12;
      cursors = [];

      for (let i = 0; i < poolCount; i++) {
        const meta = AGENTS[i % AGENTS.length];
        const node = document.createElement('div');
        node.className = 'swarm-cursor-node';
        node.innerHTML = `<span class="swarm-cursor-glyph">${GLYPHS.arrow(meta.color)}</span>`;
        cursorsHost.appendChild(node);

        const fromLeft = i % 2 === 0;
        const startX = fromLeft ? -40 : window.innerWidth + 40;
        const startY = ((i + 1) / (poolCount + 1)) * window.innerHeight;

        cursors.push({
          idx: i,
          meta,
          node,
          glyphEl: node.querySelector('.swarm-cursor-glyph'),
          x: startX,
          y: startY,
          tool: 'arrow',
          task: null,
          speedMul: i % 4 === 0 ? 0.44 : 0.28,
          orbitPhase: (i / poolCount) * Math.PI * 2
        });
      }

      const countEl = document.getElementById('swarm-agent-count');
      if (countEl) countEl.textContent = String(poolCount);
    }

    function setCursorTool(cursor, tool) {
      if (cursor.tool === tool) return;
      cursor.tool = tool;
      const fn = GLYPHS[tool] || GLYPHS.arrow;
      cursor.glyphEl.innerHTML = fn(cursor.meta.color);
    }

    function spawnWireframeBox(layer, cursor) {
      const itemsHost = layerHost.querySelector('.swarm-items-layer');
      const box = document.createElement('div');
      box.className = `swarm-wirebox is-${layer.kind}`;
      box.innerHTML = `
        <div class="swarm-wire-fill">${layer.kind === 'media' ? MEDIA_PH_ICON : ''}</div>
        <div class="swarm-caret" aria-hidden="true"></div>
        <span class="swarm-handle tl"></span>
        <span class="swarm-handle tr"></span>
        <span class="swarm-handle bl"></span>
        <span class="swarm-handle br"></span>
        <span class="swarm-dim-badge">0 × 0</span>
      `;
      itemsHost.appendChild(box);

      const guideV = document.createElement('div');
      guideV.className = 'swarm-guide-line is-vertical';
      itemsHost.appendChild(guideV);

      const guideH = document.createElement('div');
      guideH.className = 'swarm-guide-line is-horizontal';
      itemsHost.appendChild(guideH);

      let gapEl = null;
      if (layer.kind === 'dup' && layer.prevEl) {
        gapEl = document.createElement('div');
        gapEl.className = 'swarm-spacing-badge';
        itemsHost.appendChild(gapEl);
      }

      return {
        box,
        dimEl: box.querySelector('.swarm-dim-badge'),
        caretEl: box.querySelector('.swarm-caret'),
        guideV,
        guideH,
        gapEl,
        cleanup() {
          box.classList.add('is-committing');
          guideV.remove();
          guideH.remove();
          if (gapEl) gapEl.remove();
          setTimeout(() => box.remove(), 220);
        }
      };
    }

    function markState(layer, state) {
      layer.state = state;
      layer.el.setAttribute('data-swarm-state', state);
      if (state === 'building') {
        if (layer.kind === 'text') layer.el.style.setProperty('--swarm-wipe', '100%');
        else if (layer.kind === 'media') layer.el.style.setProperty('--swarm-media-wipe', '100%');
      } else if (state !== 'pending') {
        layer.el.style.removeProperty('--swarm-wipe');
        layer.el.style.removeProperty('--swarm-media-wipe');
      }
    }

    function updateHud(completedNow = false) {
      const built = layers.filter((l) => l.state === 'built').length;
      const total = layers.length || 1;
      const pct = Math.round((built / total) * 100);
      const cntEl = document.getElementById('swarm-layer-counter');
      const fillEl = document.getElementById('swarm-hud-fill');
      const tourBtn = document.getElementById('swarm-btn-tour');
      if (cntEl) {
        if (completedNow) {
          const sec = Math.max(0.8, (performance.now() - startedAt) / 1000).toFixed(1);
          cntEl.textContent = `Assemblé en ${sec}s`;
        } else {
          cntEl.textContent = `${built} / ${total} calques`;
        }
      }
      if (fillEl) fillEl.style.width = `${pct}%`;
      if (tourBtn) {
        tourBtn.classList.toggle('is-active', autoTour);
        tourBtn.textContent = autoTour ? 'Tour Auto ●' : 'Tour Auto';
      }
    }

    function assignTasks() {
      const vh = window.innerHeight;
      const frontierBottom = vh + 130;
      const frontierTop = -240;

      const available = layers
        .filter((l) => {
          if (l.state !== 'pending') return false;
          const r = l.el.getBoundingClientRect();
          if (r.width < 2 || r.height < 2) return false;
          return r.top < frontierBottom && r.bottom > frontierTop;
        })
        .sort((a, b) => a.priority - b.priority);

      for (const c of cursors) {
        if (c.task || !available.length) continue;
        const nextLayer = available.shift();
        markState(nextLayer, 'building');
        c.task = {
          layer: nextLayer,
          effect: spawnWireframeBox(nextLayer, c),
          elapsed: 0
        };
      }
    }

    function stepFrame(now) {
      if (!running) return;
      const rawDt = Math.min(0.05, Math.max(0.008, (now - lastTime) / 1000));
      lastTime = now;

      const dt = rawDt * speed;
      assignTasks();

      const vh = window.innerHeight;
      const vw = window.innerWidth;

      if (autoTour) {
        const busyCount = cursors.filter((c) => c.task !== null).length;
        const scrollRate = busyCount <= 2 ? 380 * speed : busyCount <= 5 ? 190 * speed : 75 * speed;
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);
        if (window.scrollY < maxScroll - 4) {
          tourAcc += scrollRate * rawDt;
          const stepPx = Math.floor(tourAcc);
          if (stepPx >= 1) {
            tourAcc -= stepPx;
            window.scrollBy({ top: stepPx, left: 0, behavior: 'instant' });
          }
        } else if (busyCount === 0 && layers.every((l) => l.state === 'built')) {
          autoTour = false;
          tourAcc = 0;
          updateHud(true);
        }
      }

      for (const c of cursors) {
        let tx = pointer.x + Math.cos(now * 0.0024 + c.orbitPhase) * 68;
        let ty = pointer.y + Math.sin(now * 0.0028 + c.orbitPhase) * 46;

        if (c.task) {
          const t = c.task;
          const layer = t.layer;
          const r = layer.el.getBoundingClientRect();
          t.elapsed += dt;
          const p = clamp(t.elapsed / layer.duration, 0, 1);

          if (layer.kind === 'text') {
            const boxPhase = clamp(p / 0.34, 0, 1);
            const typePhase = clamp((p - 0.25) / 0.65, 0, 1);
            if (p < 0.32) setCursorTool(c, 'cross');
            else if (p < 0.9) setCursorTool(c, 'ibeam');
            else setCursorTool(c, 'arrow');

            const wNow = Math.max(24, Math.round(r.width * easeOutCubic(boxPhase)));
            const caretX = r.left + r.width * easeInOutQuad(typePhase);
            const lineY = r.top + Math.min(r.height * 0.42, 34);
            tx = p < 0.32 ? r.left + wNow : caretX;
            ty = p < 0.32 ? r.top + Math.min(r.height, 44) * easeOutCubic(boxPhase) : lineY;

            t.effect.box.style.left = `${Math.round(r.left)}px`;
            t.effect.box.style.top = `${Math.round(r.top)}px`;
            t.effect.box.style.width = `${wNow}px`;
            t.effect.box.style.height = `${Math.round(r.height)}px`;
            t.effect.dimEl.textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`;

            if (p >= 0.25) {
              t.effect.box.classList.add('is-typing');
              t.effect.caretEl.style.left = `${Math.round(r.width * typePhase)}px`;
              layer.el.style.setProperty('--swarm-wipe', `${Math.round((1 - typePhase) * 100)}%`);
            }
            t.effect.guideV.style.left = `${Math.round(r.left)}px`;
            t.effect.guideH.style.top = `${Math.round(r.top)}px`;
          } else {
            const isDup = layer.kind === 'dup' && layer.prevEl;
            const drawPhase = clamp(p / 0.72, 0, 1);
            const ep = easeOutCubic(drawPhase);
            setCursorTool(c, p < 0.72 ? (isDup ? 'dup' : 'cross') : 'arrow');

            const curW = Math.max(22, r.width * ep);
            const curH = Math.max(20, r.height * ep);
            tx = r.left + curW;
            ty = r.top + curH;

            t.effect.box.style.left = `${Math.round(r.left)}px`;
            t.effect.box.style.top = `${Math.round(r.top)}px`;
            t.effect.box.style.width = `${Math.round(curW)}px`;
            t.effect.box.style.height = `${Math.round(curH)}px`;
            t.effect.dimEl.textContent = `${Math.round(curW)} × ${Math.round(curH)}`;
            t.effect.guideV.style.left = `${Math.round(r.left + curW)}px`;
            t.effect.guideH.style.top = `${Math.round(r.top + curH)}px`;

            if (t.effect.gapEl && layer.prevEl) {
              const pr = layer.prevEl.getBoundingClientRect();
              const gapPx = Math.max(8, Math.round(r.left - pr.right));
              if (r.left > pr.right && gapPx < 120) {
                t.effect.gapEl.style.left = `${Math.round(pr.right + gapPx / 2)}px`;
                t.effect.gapEl.style.top = `${Math.round(r.top + r.height * 0.5)}px`;
                t.effect.gapEl.textContent = `${gapPx}`;
              } else {
                t.effect.gapEl.style.display = 'none';
              }
            }

            if (layer.kind === 'media' && p >= 0.52) {
              const wipeP = clamp((p - 0.52) / 0.45, 0, 1);
              layer.el.style.setProperty('--swarm-media-wipe', `${Math.round((1 - easeOutCubic(wipeP)) * 100)}%`);
            }
          }

          if (p >= 0.72 && layer.el.getAttribute('data-swarm-state') === 'building') {
            markState(layer, 'built');
            if (layer.el.classList.contains('app-window-frame') || layer.el.classList.contains('totem-canvas-wrap')) {
              window.dispatchEvent(new Event('resize'));
              window.dispatchEvent(new CustomEvent('matei:stagescale'));
            }
          }

          if (p >= 1) {
            layer.el.style.removeProperty('--swarm-wipe');
            layer.el.style.removeProperty('--swarm-media-wipe');
            markState(layer, 'built');
            t.effect.cleanup();
            c.task = null;
            setCursorTool(c, 'arrow');
            updateHud(false);
          }
        } else {
          setCursorTool(c, 'arrow');
        }

        const clampedX = clamp(tx, 10, vw - 22);
        const clampedY = clamp(ty, 10, vh - 22);
        const spring = c.task ? c.speedMul : 0.085;
        c.x += (clampedX - c.x) * spring;
        c.y += (clampedY - c.y) * spring;
        c.node.style.transform = `translate3d(${Math.round(c.x)}px, ${Math.round(c.y)}px, 0)`;

        const anyBusy = cursors.some((item) => item.task !== null);
        c.node.classList.toggle('is-idle', !c.task && !anyBusy);
      }

      const allBuilt = layers.every((l) => l.state === 'built');
      if (allBuilt && !cursors.some((c) => c.task)) {
        autoTour = false;
        updateHud(true);
        document.body.classList.add('swarm-complete');
        setTimeout(() => {
          if (layers.every((l) => l.state === 'built')) {
            layerHost?.classList.add('is-settled');
          }
        }, 700);
        running = false;
        cancelAnimationFrame(rafId);
        return;
      }

      rafId = requestAnimationFrame(stepFrame);
    }

    function wakeLoop() {
      if (running) return;
      if (layers.every((l) => l.state === 'built')) return;
      layerHost?.classList.remove('is-settled');
      running = true;
      lastTime = performance.now();
      rafId = requestAnimationFrame(stepFrame);
    }

    function start(opts = {}) {
      const token = ++buildToken;
      ensureOverlayDom();
      layers = buildTargetList();
      if (!layers.length) return;

      startedAt = performance.now();
      document.body.classList.remove('swarm-complete');
      document.body.classList.add('swarm-hud-active');
      hudEl?.classList.add('is-visible');

      layers.forEach((l) => markState(l, 'pending'));
      createCursorPool();
      autoTour = Boolean(opts.autoTour);
      updateHud(false);

      if (token !== buildToken) return;
      wakeLoop();
    }

    function replay(opts = {}) {
      finishAll(false);
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
      setTimeout(() => {
        start({ autoTour: Boolean(opts.autoTour) });
      }, reducedMotion ? 10 : 280);
    }

    function finishAll(hideHud = true) {
      ++buildToken;
      running = false;
      autoTour = false;
      cancelAnimationFrame(rafId);

      cursors.forEach((c) => {
        if (c.task) {
          c.task.effect.cleanup();
          c.task = null;
        }
      });

      layers.forEach((l) => {
        l.el.style.removeProperty('--swarm-wipe');
        l.el.style.removeProperty('--swarm-media-wipe');
        markState(l, 'built');
      });

      if (layerHost) {
        layerHost.classList.add('is-settled');
        const itemsHost = layerHost.querySelector('.swarm-items-layer');
        const cursorsHost = layerHost.querySelector('.swarm-cursors-layer');
        if (itemsHost) itemsHost.innerHTML = '';
        if (cursorsHost) cursorsHost.innerHTML = '';
      }
      document.body.classList.add('swarm-complete');

      if (hideHud) {
        hudEl?.classList.remove('is-visible');
        document.body.classList.remove('swarm-hud-active');
      }
      updateHud(true);
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new CustomEvent('matei:stagescale'));
    }

    function toggleAutoTour() {
      if (!layers.length || layers.every((l) => l.state === 'built')) {
        replay({ autoTour: true });
        return;
      }
      autoTour = !autoTour;
      updateHud(false);
      wakeLoop();
    }

    function cycleSpeed() {
      const order = [1, 2, 3];
      speed = order[(order.indexOf(speed) + 1) % order.length];
      const spBtn = document.getElementById('swarm-btn-speed');
      if (spBtn) spBtn.textContent = `${speed}×`;
    }

    window.addEventListener(
      'pointermove',
      (e) => {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
      },
      { passive: true }
    );

    window.addEventListener(
      'scroll',
      () => {
        if (layers.some((l) => l.state === 'pending')) {
          wakeLoop();
        }
      },
      { passive: true }
    );

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('swarm-hud-active')) {
        finishAll(true);
      }
    });

    window.__cursorBuilder = { start, replay, finishAll, toggleAutoTour, cycleSpeed };

    if (!isDisabledOnLoad) {
      let booted = false;
      const bootOnce = () => {
        if (booted) return;
        booted = true;
        start({ autoTour: false });
      };
      if (document.body.classList.contains('hero-entered')) {
        bootOnce();
      } else {
        window.addEventListener('matei:heroentered', bootOnce, { once: true });
        setTimeout(() => {
          if (!booted && !document.body.classList.contains('is-preloading')) bootOnce();
        }, 1600);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursorBuilder);
  } else {
    initCursorBuilder();
  }
})();
