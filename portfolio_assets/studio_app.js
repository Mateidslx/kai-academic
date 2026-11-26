/* ==========================================================================
   MATÉI DE SAINT LÉGER — STUDIO MOTION INTERACTIF
   - Preloader Motion Design (Odometer 000->100 + Réticule + Wipe SVG Courbé)
   - Switch Architectural Sobre Nuit (Obsidienne) <-> Jour (Éditorial)
   - Trame Matricielle Ordonnée Bayer 4x4 (Zéro boules 3D) + 3 Glissières Live
   - Projets 100 % Réels (ZenWorkspace, 20 Agents Cloud, 46 PRs, Kai, PolyDrive)
   - Curseurs d'Agents Fonctionnels Pilotant Directement l'Interface & Totem 3D
   ========================================================================== */

(function () {
  'use strict';

  const CLOUD_ROLES = [
    ['CLOUD_MASTER', 'Coordinateur principal : décompose chaque mission en graphe de tâches (DAG) et orchestre les agents.'],
    ['ARCHITECT_AGENT', 'Conçoit l’architecture système, les contrats d’interface et la structure des modules.'],
    ['FRONTEND_AGENT', 'Développe et vérifie les interfaces React / TypeScript / HTML avec rigueur visuelle.'],
    ['DASHBOARD_UI_AGENT', 'Assemble les tableaux de bord analytiques et composants UI accessibles.'],
    ['CLIENT_WEB_SALES_AGENT', 'Prépare les démonstrateurs clients et audits de refonte sur-mesure.'],
    ['BACKEND_AGENT', 'Implémente les services Python, API REST, WebSockets et persistance SQLite/PostgreSQL.'],
    ['CRITIC_AGENT', 'Relit chaque livrable avant validation pour détecter failles, doublons et écarts.'],
    ['QA_AGENT', 'Exécute les suites de tests automatisés (pytest, Vitest, Playwright) et bloque toute régression.'],
    ['DEPLOYMENT_AGENT', 'Gère la mise en production sur VPS Ubuntu 24.04 et la santé des services systemd.'],
    ['ELEARNING_DISCOVERY_AGENT', 'Collecte et indexe les supports pédagogiques et échéances académiques.'],
    ['DOCUMENT_UNDERSTANDING_AGENT', 'Analyse les documents PDF/HTML techniques pour en extraire la structure fiable.'],
    ['COURSE_WRITING_AGENT', 'Rédige et met en forme les fiches structurées et cours interactifs de Kai Academic.'],
    ['REVISION_AGENT', 'Génère des quiz d’entraînement et révisions ciblées conformes aux cours officiels.'],
    ['DATABASE_AGENT', 'Vérifie les schémas SQL normalisés, migrations et intégrité des données.'],
    ['IMPROVEMENT_AGENT', 'Analyse les journaux d’exécution pour proposer des améliorations mesurables.'],
    ['SURVEILLANCE_AGENT', 'Surveille la disponibilité 24/7 et les anomalies sur le serveur Linux.'],
    ['AUTO_REMEDIATION_AGENT', 'Diagnostique et corrige automatiquement les pannes récurrentes identifiées.'],
    ['SECURITY_AUDIT_AGENT', 'Contrôle les en-têtes HTTP, permissions, secrets et vulnérabilités applicatives.'],
    ['TASK_ORCHESTRATOR_AGENT', 'Planifie les étapes parallèles et garantit l’ordre topologique des dépendances.'],
    ['OUTREACH_ORCHESTRATOR_AGENT', 'Supervise les suivis structurés et vérifie l’absence d’envois non autorisés.']
  ];

  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     0. PRELOADER MOTION DESIGN (ODOMETER + BARRE + WIPE COURBE SVG)
     ------------------------------------------------------------------------ */
  function initPreloader() {
    const curtain = document.getElementById('preloader-curtain');
    const odo = document.getElementById('preloader-odometer');
    const barFill = document.getElementById('preloader-bar-fill');
    const phaseEl = document.getElementById('preloader-phase');
    const skipBtn = document.getElementById('preloader-skip-btn');
    const curvePath = document.getElementById('preloader-curve-path');

    if (!curtain) {
      document.body.classList.remove('is-preloading');
      document.body.classList.add('hero-entered');
      return;
    }

    const params = new URLSearchParams(window.location.search);
    if (reducedMotion || params.get('skipLoader') === '1') {
      curtain.classList.add('is-done');
      document.body.classList.remove('is-preloading');
      document.body.classList.add('hero-entered');
      window.dispatchEvent(new CustomEvent('matei:heroentered'));
      return;
    }

    let finished = false;
    const durationMs = 820;
    const startTime = performance.now();

    function animateCurveFlatten(duration) {
      if (!curvePath) return;
      const t0 = performance.now();
      function step(now) {
        const p = Math.min(1, (now - t0) / duration);
        const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        const sideY = Math.round(70 * (1 - e));
        const ctrlY = Math.round(160 * (1 - e));
        curvePath.setAttribute('d', `M0,0 L1440,0 L1440,${sideY} Q720,${ctrlY} 0,${sideY} Z`);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    function dismissCurtain() {
      if (finished) return;
      finished = true;
      if (odo) odo.textContent = '100';
      if (barFill) barFill.style.width = '100%';
      if (phaseEl) phaseEl.textContent = 'SYSTÈMES PRÊTS · 43.48°N';

      animateCurveFlatten(720);
      curtain.classList.add('is-exiting');
      document.body.classList.remove('is-preloading');
      setTimeout(() => {
        document.body.classList.add('hero-entered');
        window.dispatchEvent(new CustomEvent('matei:heroentered'));
      }, 150);

      setTimeout(() => {
        curtain.classList.add('is-done');
      }, 780);
    }

    function easeInOutCubic(x) {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    function tick(now) {
      if (finished) return;
      const elapsed = now - startTime;
      const raw = Math.min(1, elapsed / durationMs);
      const eased = easeInOutCubic(raw);
      const pct = Math.min(100, Math.round(eased * 100));

      if (odo) odo.textContent = String(pct).padStart(2, '0');
      if (barFill) barFill.style.width = `${pct}%`;

      if (phaseEl) {
        if (pct < 30) phaseEl.textContent = 'SYSTÈMES AUTONOMES';
        else if (pct < 65) phaseEl.textContent = 'APPS REACT & PYTHON';
        else if (pct < 96) phaseEl.textContent = 'TOTEM 3D WEBGL';
        else phaseEl.textContent = 'SYSTÈMES PRÊTS';
      }

      if (raw < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(dismissCurtain, 100);
      }
    }

    skipBtn?.addEventListener('click', dismissCurtain);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !finished) dismissCurtain();
    });

    // Fail-safe si l'onglet est inactif ou ralenti
    setTimeout(dismissCurtain, 2800);
    requestAnimationFrame(tick);
  }

  /* ------------------------------------------------------------------------
     1. SWITCH ARCHITECTURAL SOBRE NUIT (OBSIDIENNE) / JOUR (ÉDITORIAL)
     ------------------------------------------------------------------------ */
  function initThemeSwitch() {
    const btn = document.getElementById('theme-toggle-btn');
    const mobileBtn = document.getElementById('mobile-theme-toggle-btn');
    const mobileLabel = document.getElementById('mobile-theme-label');
    const label = document.getElementById('theme-dock-label');
    if (!btn && !mobileBtn) return;

    function applyTheme(theme, x, y) {
      const doSwitch = () => {
        document.documentElement.setAttribute('data-theme', theme);
        try { localStorage.setItem('matei_studio_theme', theme); } catch (_) {}
        const isDark = theme === 'dark';
        if (btn) btn.setAttribute('aria-pressed', String(isDark));
        if (mobileBtn) mobileBtn.setAttribute('aria-pressed', String(isDark));
        if (label) label.textContent = isDark ? 'MODE // NUIT' : 'MODE // JOUR';
        if (mobileLabel) mobileLabel.textContent = isDark ? 'NUIT' : 'JOUR';
        window.dispatchEvent(new CustomEvent('matei:themechange', { detail: { theme } }));
      };

      if (!reducedMotion && document.startViewTransition && typeof x === 'number' && typeof y === 'number') {
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );
        const transition = document.startViewTransition(doSwitch);
        transition.ready.then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
              ]
            },
            {
              duration: 520,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              pseudoElement: '::view-transition-new(root)'
            }
          );
        }).catch(() => {});
      } else {
        doSwitch();
      }
    }

    let saved = 'dark';
    try {
      const s = localStorage.getItem('matei_studio_theme');
      if (s === 'dark' || s === 'light') saved = s;
    } catch (_) {}
    applyTheme(saved);

    function handleToggleClick(e, sourceBtn) {
      const rect = sourceBtn.getBoundingClientRect();
      const x = e.clientX || rect.left + rect.width / 2;
      const y = e.clientY || rect.top + rect.height / 2;
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark', x, y);
    }

    btn?.addEventListener('click', (e) => handleToggleClick(e, btn));
    mobileBtn?.addEventListener('click', (e) => handleToggleClick(e, mobileBtn));

    return {
      toggle: () => {
        const refBtn = (btn && btn.offsetParent !== null) ? btn : (mobileBtn || btn);
        const rect = refBtn ? refBtn.getBoundingClientRect() : { left: window.innerWidth - 30, top: 30, width: 20, height: 20 };
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        applyTheme(current === 'dark' ? 'light' : 'dark', rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    };
  }

  /* ------------------------------------------------------------------------
     2. TRAME MATRICIELLE ORDONNÉE BAYER 4x4 (INSPIRATION PAPER SHADERS & SCRIB3)
        Zéro boules 3D brillances : pixels carrés nets quantifiés par seuillage Bayer
     ------------------------------------------------------------------------ */
  function initHeroDotUniverse() {
    const canvas = document.getElementById('hero-universe-canvas');
    const stage = canvas ? canvas.closest('.hero-stage-card') : null;
    if (!canvas || !stage) return;

    const ctx = canvas.getContext('2d');
    const sliderDensity = document.getElementById('slider-density');
    const sliderRelief = document.getElementById('slider-relief');
    const sliderForce = document.getElementById('slider-force');
    const outDensity = document.getElementById('out-density');
    const outRelief = document.getElementById('out-relief');
    const outForce = document.getElementById('out-force');

    const BAYER_4 = [
      [0 / 16, 8 / 16, 2 / 16, 10 / 16],
      [12 / 16, 4 / 16, 14 / 16, 6 / 16],
      [3 / 16, 11 / 16, 1 / 16, 9 / 16],
      [15 / 16, 7 / 16, 13 / 16, 5 / 16]
    ];

    const config = {
      step: sliderDensity ? Number(sliderDensity.value) : 16,
      scale: sliderRelief ? Number(sliderRelief.value) / 100 : 0.95,
      force: sliderForce ? Number(sliderForce.value) / 100 : 1.2
    };

    let cols = 0;
    let rows = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: -9999, y: -9999, active: false };
    const ripples = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = stage.clientWidth;
      height = stage.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / config.step) + 1;
      rows = Math.ceil(height / config.step) + 1;
    }

    function bindSlider(input, outEl, suffix, key, rebuild) {
      if (!input) return;
      input.addEventListener('input', () => {
        const val = Number(input.value);
        if (outEl) outEl.textContent = `${val}${suffix}`;
        if (key === 'step') config.step = val;
        if (key === 'scale') config.scale = val / 100;
        if (key === 'force') config.force = val / 100;
        if (rebuild) resize();
        if (reducedMotion) render(0);
      });
    }

    bindSlider(sliderDensity, outDensity, 'px', 'step', true);
    bindSlider(sliderRelief, outRelief, '%', 'scale', false);
    bindSlider(sliderForce, outForce, '%', 'force', false);

    stage.addEventListener('pointermove', (e) => {
      const rect = stage.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    });

    stage.addEventListener('pointerleave', () => {
      pointer.active = false;
    });

    stage.addEventListener('click', (e) => {
      const rect = stage.getBoundingClientRect();
      ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, r: 10, alpha: 1 });
    });

    function render(now) {
      const t = now * 0.0011;
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

      ctx.clearRect(0, 0, width, height);

      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].r += 9;
        ripples[i].alpha *= 0.935;
        if (ripples[i].alpha < 0.04) ripples.splice(i, 1);
      }

      const gap = config.step;
      const maxRadius = 175 * config.force;
      const basePx = Math.max(2, Math.round(gap * 0.24 * config.scale));

      for (let r = 0; r < rows; r++) {
        const py = r * gap;
        const ny = py / Math.max(1, height);
        const bayerRow = BAYER_4[r & 3];

        for (let c = 0; c < cols; c++) {
          const px = c * gap;
          const nx = px / Math.max(1, width);
          const threshold = bayerRow[c & 3];

          // Champ fluide onde radiale + balayage diagonal (shaders.paper.design / scrib3)
          const waveDiag = 0.5 + 0.5 * Math.sin(nx * 6.2 - ny * 4.1 - t * 1.45);
          const radialSweep = 0.5 + 0.5 * Math.cos(Math.hypot(nx - 0.72, ny - 0.45) * 9.0 - t * 1.8);
          const focusMask = Math.max(0, (nx * 0.92 + (1 - ny) * 0.25) - 0.16);
          let intensity = focusMask * (0.24 + 0.42 * (waveDiag * 0.65 + radialSweep * 0.35));
          let excite = 0;

          if (pointer.active) {
            const dx = px - pointer.x;
            const dy = py - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < maxRadius) {
              const pFactor = Math.pow(1 - dist / maxRadius, 1.35);
              excite = Math.max(excite, pFactor);
              intensity += pFactor * 0.72 * config.force;
            }
          }

          for (let k = 0; k < ripples.length; k++) {
            const rp = ripples[k];
            const dist = Math.hypot(px - rp.x, py - rp.y);
            const band = Math.abs(dist - rp.r);
            if (band < 42) {
              const w = (1 - band / 42) * rp.alpha;
              excite = Math.max(excite, w);
              intensity += w * 0.75;
            }
          }

          if (intensity <= threshold) continue;

          // Quantification nette en pixels carrés ordonnés
          const size = excite > 0.25 ? Math.max(2, Math.round(basePx * (1 + excite * 0.65))) : basePx;
          const half = Math.floor(size * 0.5);

          if (excite > 0.22) {
            const alpha = Math.min(0.92, 0.36 + excite * 0.56);
            ctx.fillStyle = `rgba(255, 30, 66, ${alpha.toFixed(2)})`;
          } else {
            const alpha = Math.min(0.28, 0.08 + intensity * 0.22);
            ctx.fillStyle = isDark
              ? `rgba(244, 243, 239, ${alpha.toFixed(2)})`
              : `rgba(16, 17, 22, ${alpha.toFixed(2)})`;
          }

          ctx.fillRect(px - half, py - half, size, size);
        }
      }

      if (!reducedMotion) requestAnimationFrame(render);
    }

    resize();
    window.addEventListener('resize', () => {
      resize();
      if (reducedMotion) render(0);
    });
    window.addEventListener('matei:themechange', () => {
      if (reducedMotion) render(0);
    });
    if (reducedMotion) render(0);
    else requestAnimationFrame(render);
  }

  /* ------------------------------------------------------------------------
     3. ONGLETS DIRECTION-AWARE DES PROJETS RÉELS
     ------------------------------------------------------------------------ */
  function initProjectTabs() {
    const buttons = Array.from(document.querySelectorAll('[data-project-tab]'));
    const panels = Array.from(document.querySelectorAll('[data-project-panel]'));
    if (!buttons.length || !panels.length) return;

    let currentIdx = 0;

    function selectTab(key) {
      const btn = buttons.find((b) => b.getAttribute('data-project-tab') === key);
      if (!btn) return;
      const nextIdx = Number(btn.getAttribute('data-tab-index') || '0');
      const idxReadout = document.getElementById('flagships-index-readout');
      if (idxReadout) idxReadout.textContent = `INDEX [ 0${nextIdx + 1} / 0${buttons.length} ]`;
      if (nextIdx === currentIdx) return;

      const dirClass = nextIdx > currentIdx ? 'enter-right' : 'enter-left';
      currentIdx = nextIdx;

      buttons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });

      panels.forEach((panel) => {
        const match = panel.getAttribute('data-project-panel') === key;
        panel.classList.remove('enter-right', 'enter-left');
        if (match) {
          panel.hidden = false;
          // Charger paresseusement l'app live quand on ouvre son onglet (ex: Security Scanner / Kai Academic)
          const lazyIframe = panel.querySelector('iframe[data-lazy-src]');
          if (lazyIframe && !lazyIframe.getAttribute('src')) {
            lazyIframe.setAttribute('src', lazyIframe.getAttribute('data-lazy-src'));
          }
          window.dispatchEvent(new Event('matei:stagescale'));
          void panel.offsetWidth;
          panel.classList.add(dirClass);
        } else {
          panel.hidden = true;
        }
      });
    }

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => selectTab(btn.getAttribute('data-project-tab')));
    });

    return { selectTab };
  }

  /* ------------------------------------------------------------------------
     4. MATRICE DES 20 VRAIS RÔLES CLOUD
     ------------------------------------------------------------------------ */
  function initCloudRolesMatrix() {
    const grid = document.getElementById('cloud-roles-grid');
    const detail = document.getElementById('cloud-role-detail');
    if (!grid || !detail) return;

    function selectRole(idx) {
      const btns = grid.querySelectorAll('.cloud-role-pill');
      btns.forEach((b, i) => b.classList.toggle('is-selected', i === idx));
      const [role, desc] = CLOUD_ROLES[idx] || CLOUD_ROLES[0];
      detail.innerHTML = `<strong>${role}</strong> : ${desc}`;
      if (btns[idx]) btns[idx].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    CLOUD_ROLES.forEach(([role], idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cloud-role-pill' + (idx === 0 ? ' is-selected' : '');
      btn.innerHTML = `<span>${role}</span><span class="role-led" aria-hidden="true"></span>`;
      btn.addEventListener('click', () => selectRole(idx));
      grid.appendChild(btn);
    });
    selectRole(0);

    return { selectRole };
  }

  /* ------------------------------------------------------------------------
     5. VISUALISEUR POLYDRIVE MLP RÉEL (16 -> 24 -> 16 -> 4)
     ------------------------------------------------------------------------ */
  function initPolydriveNeuralCanvas() {
    const canvas = document.getElementById('polydrive-real-canvas');
    const bar = document.getElementById('polydrive-telemetry-bar');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const layers = [16, 24, 16, 4];
    const inputs = ['Mur -75°', 'Mur -45°', 'Mur -20°', 'Mur 0°', 'Mur +20°', 'Mur +45°', 'Mur +75°', 'Sol Av.', 'Vitesse', 'Yaw', 'Roues', 'Écart', '+14m Av', '+14m Dr', '+34m Av', '+34m Dr'];
    const outputs = ['Accélérer (W)', 'Freiner (S)', 'Gauche (A)', 'Droite (D)'];
    let hoverInput = 3;

    function setSensor(idx) {
      hoverInput = Math.max(0, Math.min(15, idx));
      if (bar) {
        bar.innerHTML = `Capteur actif : <strong>${inputs[hoverInput]}</strong> → propagation sur <strong>16 → 24 → 16 → 4</strong> (876 paramètres NumPy)`;
      }
      if (reducedMotion) draw(0);
    }

    canvas.addEventListener('pointermove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const yRatio = (e.clientY - rect.top) / rect.height;
      setSensor(Math.floor(yRatio * 16));
    });

    function draw(now) {
      const t = now * 0.002;
      const w = canvas.width;
      const h = canvas.height;
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = isDark ? '#060709' : '#f7f6f3';
      ctx.fillRect(0, 0, w, h);

      const colX = [105, 225, 345, 445];
      const coords = layers.map((count, li) => {
        const arr = [];
        const pad = li === 3 ? 65 : 22;
        const usableH = h - pad * 2;
        for (let i = 0; i < count; i++) {
          const y = count === 1 ? h / 2 : pad + (i / (count - 1)) * usableH;
          const act = li === 0
            ? (i === hoverInput ? 1 : 0.35 + 0.35 * Math.sin(t + i * 0.6))
            : 0.35 + 0.55 * Math.abs(Math.sin(t * 0.9 + li + i * 0.4 + hoverInput * 0.2));
          arr.push({ x: colX[li], y, act });
        }
        return arr;
      });

      for (let li = 0; li < coords.length - 1; li++) {
        const A = coords[li];
        const B = coords[li + 1];
        for (let i = 0; i < A.length; i++) {
          for (let j = 0; j < B.length; j += (li === 0 ? 2 : 1)) {
            const strong = li === 0 && i === hoverInput;
            ctx.beginPath();
            ctx.moveTo(A[i].x, A[i].y);
            ctx.lineTo(B[j].x, B[j].y);
            ctx.strokeStyle = strong
              ? 'rgba(255, 30, 66, 0.78)'
              : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(16,17,22,0.16)');
            ctx.lineWidth = strong ? 1.8 : 0.8;
            ctx.stroke();
          }
        }
      }

      ctx.font = '700 11px "JetBrains Mono", monospace';
      coords.forEach((col, li) => {
        col.forEach((n, ni) => {
          const sz = li === 3 ? 10 : 7;
          ctx.fillStyle = (li === 0 && ni === hoverInput) || n.act > 0.72
            ? '#ff1e42'
            : (isDark ? '#434963' : '#64748b');
          ctx.fillRect(n.x - sz / 2, n.y - sz / 2, sz, sz);

          if (li === 0) {
            ctx.fillStyle = ni === hoverInput ? '#ff1e42' : (isDark ? '#c7cad8' : '#101116');
            ctx.textAlign = 'right';
            ctx.fillText(inputs[ni], n.x - 10, n.y + 4);
          }
          if (li === 3) {
            ctx.fillStyle = isDark ? '#f4f3ef' : '#101116';
            ctx.textAlign = 'left';
            ctx.fillText(outputs[ni], n.x + 12, n.y + 4);
          }
        });
      });

      if (!reducedMotion) requestAnimationFrame(draw);
    }

    window.addEventListener('matei:themechange', () => {
      if (reducedMotion) draw(0);
    });

    if (reducedMotion) draw(0);
    else requestAnimationFrame(draw);

    return { setSensor };
  }

  /* ------------------------------------------------------------------------
     6. CURSEURS D'AGENTS FONCTIONNELS (EXÉCUTENT DE VRAIES ACTIONS & SE RÉTRACTENT)
     ------------------------------------------------------------------------ */
  function initFunctionalAgentCursors(tabsApi, cloudApi, polyApi) {
    const statusEl = document.getElementById('agent-pilot-status');
    const btns = Array.from(document.querySelectorAll('[data-pilot-action]'));
    if (!btns.length) return;

    const agentCursor = document.createElement('div');
    agentCursor.className = 'figma-agent-cursor';
    agentCursor.innerHTML = `
      <svg class="cur-arrow-svg" viewBox="0 0 16 16" fill="none">
        <path id="cur-arrow-path" d="M1 1L14 6.5L7.5 8.5L5 14.5L1 1Z" fill="#ff1e42" stroke="#ffffff" stroke-width="1.3" stroke-linejoin="round"/>
      </svg>
      <span class="cur-nametag" id="cur-agent-tag" style="background:#ff1e42">Agent</span>
    `;
    document.body.appendChild(agentCursor);

    const selBox = document.createElement('div');
    selBox.className = 'figma-selection-overlay';
    selBox.style.opacity = '0';
    selBox.innerHTML = `<span class="fh-dim-tag" id="figma-dim-label">AGENT</span>`;
    document.body.appendChild(selBox);

    const arrowPath = document.getElementById('cur-arrow-path');
    const agentTag = document.getElementById('cur-agent-tag');
    const dimTag = document.getElementById('figma-dim-label');

    let hideTimer = 0;
    let dispatchToken = 0;
    let activeTargetEl = null;

    function syncSelectionBox() {
      if (!activeTargetEl) return;
      const r = activeTargetEl.getBoundingClientRect();
      selBox.style.top = `${r.top - 4}px`;
      selBox.style.left = `${r.left - 4}px`;
      selBox.style.width = `${r.width + 8}px`;
      selBox.style.height = `${r.height + 8}px`;
    }

    function waitForScrollSettle(token, done) {
      if (reducedMotion) {
        requestAnimationFrame(() => {
          if (token === dispatchToken) done();
        });
        return;
      }
      let lastY = window.scrollY;
      let stableFrames = 0;
      const start = performance.now();

      function check() {
        if (token !== dispatchToken) return;
        const curY = window.scrollY;
        if (Math.abs(curY - lastY) < 1.2) {
          stableFrames++;
        } else {
          stableFrames = 0;
        }
        lastY = curY;

        if (stableFrames >= 3 || performance.now() - start > 1050) {
          done();
        } else {
          requestAnimationFrame(check);
        }
      }
      setTimeout(() => {
        if (token === dispatchToken) requestAnimationFrame(check);
      }, 120);
    }

    function dispatchCursorTo(targetEl, label, color, onArrive) {
      if (!targetEl) return;
      const token = ++dispatchToken;
      clearTimeout(hideTimer);
      activeTargetEl = null;
      window.removeEventListener('scroll', syncSelectionBox);
      window.removeEventListener('resize', syncSelectionBox);

      targetEl.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });

      waitForScrollSettle(token, () => {
        if (token !== dispatchToken) return;
        const r = targetEl.getBoundingClientRect();
        const visTop = Math.max(76, r.top);
        const visBottom = Math.min(window.innerHeight - 64, r.bottom);
        const midY = visBottom > visTop ? visTop + (visBottom - visTop) * 0.28 : Math.max(80, Math.min(window.innerHeight - 90, r.top + 32));
        const tx = Math.max(24, Math.min(window.innerWidth - 130, r.left + r.width * 0.52));
        const ty = Math.max(80, Math.min(window.innerHeight - 90, midY));

        if (arrowPath) arrowPath.setAttribute('fill', color);
        if (agentTag) {
          agentTag.textContent = label;
          agentTag.style.background = color;
        }
        agentCursor.style.transition = reducedMotion ? 'none' : 'transform 0.52s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s';
        agentCursor.style.transform = `translate3d(${Math.round(tx)}px, ${Math.round(ty)}px, 0)`;
        agentCursor.classList.add('is-active');

        activeTargetEl = targetEl;
        syncSelectionBox();
        selBox.style.borderColor = color;
        selBox.style.opacity = '1';
        if (dimTag) {
          dimTag.style.background = color;
          dimTag.textContent = `${label} · ${Math.round(r.width)}×${Math.round(r.height)}`;
        }
        window.addEventListener('scroll', syncSelectionBox, { passive: true });
        window.addEventListener('resize', syncSelectionBox, { passive: true });

        if (typeof onArrive === 'function') onArrive();

        hideTimer = setTimeout(() => {
          if (token !== dispatchToken) return;
          selBox.style.opacity = '0';
          agentCursor.classList.remove('is-active');
          activeTargetEl = null;
          window.removeEventListener('scroll', syncSelectionBox);
          window.removeEventListener('resize', syncSelectionBox);
        }, 1600);
      });
    }

    let totemSlice = 1;
    let cloudRoleIdx = 0;
    let lidarIdx = 0;

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-pilot-action');
        btns.forEach((b) => b.classList.toggle('is-running', b === btn));

        if (action === 'swarm-replay') {
          if (statusEl) statusEl.textContent = '⚡ Reconstruction complète par essaim de curseurs (style saai.pro)...';
          window.scrollTo({ top: 0, behavior: 'instant' });
          if (window.__swarmRebuild) {
            if (window.__swarmRebuild.app) window.__swarmRebuild.stop(false);
            setTimeout(() => {
              window.__swarmRebuild.start();
              setTimeout(() => {
                const host = document.querySelector('swarm-rebuild');
                const tourBtn = host?.shadowRoot?.querySelector('[data-a="tour"]');
                if (tourBtn && !tourBtn.hidden && !tourBtn.classList.contains('on')) tourBtn.click();
              }, 350);
            }, 60);
          } else if (typeof window.__startSwarm === 'function') {
            window.__startSwarm(true);
          }
          return;
        }

        if (action === 'zentable') {
          tabsApi?.selectTab('zenworkspace');
          const stage = document.getElementById('project-showcase-stage');
          dispatchCursorTo(stage, 'ZenTable', '#0ea5e9', () => {
            if (statusEl) statusEl.textContent = '✓ ZenTable : capture réelle + FormulaEngine.ts (57/57 Vitest) affichés.';
          });
        } else if (action === 'cloud') {
          tabsApi?.selectTab('cloud');
          cloudRoleIdx = (cloudRoleIdx + 4) % CLOUD_ROLES.length;
          const roleName = CLOUD_ROLES[cloudRoleIdx][0];
          const stage = document.getElementById('project-showcase-stage');
          dispatchCursorTo(stage, 'Cloud IA', '#10b981', () => {
            cloudApi?.selectRole(cloudRoleIdx);
            if (statusEl) statusEl.textContent = `✓ Cloud IA : inspection en direct du rôle ${roleName} (sur 20).`;
          });
        } else if (action === 'polydrive') {
          tabsApi?.selectTab('polydrive');
          lidarIdx = (lidarIdx + 3) % 16;
          const stage = document.getElementById('project-showcase-stage');
          dispatchCursorTo(stage, 'PolyDrive', '#f59e0b', () => {
            polyApi?.setSensor(lidarIdx);
            if (statusEl) statusEl.textContent = `✓ PolyDrive : stimulation en direct du capteur #${lidarIdx + 1}/16 du MLP NumPy.`;
          });
        } else if (action === 'totem') {
          const totemSec = document.querySelector('#exploded-architecture .totem-stage-section');
          dispatchCursorTo(totemSec, 'Totem 3D', '#ff1e42', () => {
            if (typeof window.__totemSelectSlice === 'function') {
              window.__totemSelectSlice(totemSlice);
              totemSlice = (totemSlice + 1) % 6;
            }
            if (statusEl) statusEl.textContent = '✓ Totem 3D : rotation WebGL et inspection de la strate suivante.';
          });
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     7. SCROLL ISLAND, PALETTE ⌘K & TERMINAL CLI
     ------------------------------------------------------------------------ */
  function initScrollIsland() {
    const island = document.getElementById('scroll-island');
    const ring = document.getElementById('island-ring');
    const pctEl = document.getElementById('island-pct');
    const secName = document.getElementById('island-section-name');
    const sections = [
      { id: 'hero', label: 'Univers Matriciel' },
      { id: 'flagships', label: 'Projets Réels' },
      { id: 'exploded-architecture', label: 'Totem 3D' },
      { id: 'parcours', label: 'Parcours & Stages' },
      { id: 'contact', label: 'Contact' }
    ];

    function update() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.max(0, Math.min(100, Math.round((window.scrollY / total) * 100))) : 0;
      if (island) island.classList.toggle('is-visible', window.scrollY > 140);
      if (ring) ring.style.setProperty('--progress', String(pct));
      if (pctEl) pctEl.textContent = `${pct}%`;

      let active = sections[0];
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) active = s;
      });
      if (secName) secName.textContent = active.label;

      document.querySelectorAll('[data-nav-sec]').forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('data-nav-sec') === active.id);
      });
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function initModalsAndActions(themeCtrl, tabsApi) {
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText('matei64200@gmail.com'); } catch (_) {}
        const prev = copyBtn.textContent;
        copyBtn.textContent = '✓ matei64200@gmail.com copié !';
        setTimeout(() => { copyBtn.textContent = prev; }, 2200);
      });
    }

    const cmdkModal = document.getElementById('cmdk-modal');
    const cmdkOpen = document.getElementById('cmdk-open-btn');
    const cmdkClose = document.getElementById('cmdk-close-btn');
    const cmdkInput = document.getElementById('cmdk-input');
    const cmdkList = document.getElementById('cmdk-list');

    const scrollToSec = (id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    };

    const commands = [
      { label: 'Ouvrir ZenWorkspace (57/57 tests Vitest)', action: () => { tabsApi?.selectTab('zenworkspace'); scrollToSec('flagships'); } },
      { label: 'Inspecter les 20 Agents Cloud', action: () => { tabsApi?.selectTab('cloud'); scrollToSec('flagships'); } },
      { label: 'Voir 46 PRs Open-Source & Security Scanner MCP', action: () => { tabsApi?.selectTab('oss'); scrollToSec('flagships'); } },
      { label: 'Voir Kai Academic (447 fichiers IUT Anglet)', action: () => { tabsApi?.selectTab('kai'); scrollToSec('flagships'); } },
      { label: 'Tester PolyDrive Neural Lab (MLP 16→24→16→4)', action: () => { tabsApi?.selectTab('polydrive'); scrollToSec('flagships'); } },
      { label: 'Aller au Totem Technique 3D WebGL', action: () => { scrollToSec('exploded-architecture'); } },
      { label: 'Basculer Mode Nuit (Obsidienne) / Mode Jour (Éditorial)', action: () => { themeCtrl?.toggle(); } },
      { label: 'Copier matei64200@gmail.com', action: () => { copyBtn?.click(); } }
    ];

    function renderCommands(q = '') {
      if (!cmdkList) return;
      const needle = q.trim().toLowerCase();
      cmdkList.innerHTML = '';
      commands
        .filter((c) => !needle || c.label.toLowerCase().includes(needle))
        .forEach((c) => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'cmdk-item';
          b.innerHTML = `<span>${c.label}</span><span>↵</span>`;
          b.addEventListener('click', () => { c.action(); closeCmdk(); });
          cmdkList.appendChild(b);
        });
    }

    function openCmdk() {
      if (!cmdkModal) return;
      cmdkModal.hidden = false;
      cmdkModal.setAttribute('aria-hidden', 'false');
      renderCommands('');
      setTimeout(() => cmdkInput?.focus(), 40);
    }

    function closeCmdk() {
      if (!cmdkModal) return;
      cmdkModal.hidden = true;
      cmdkModal.setAttribute('aria-hidden', 'true');
    }

    cmdkOpen?.addEventListener('click', openCmdk);
    cmdkClose?.addEventListener('click', closeCmdk);
    cmdkInput?.addEventListener('input', () => renderCommands(cmdkInput.value));
    cmdkModal?.addEventListener('click', (e) => { if (e.target === cmdkModal) closeCmdk(); });

    const cliModal = document.getElementById('cli-modal');
    const cliOpen = document.getElementById('cli-open-btn');
    const cliClose = document.getElementById('cli-close-btn');
    const cliScreen = document.getElementById('cli-screen');
    const cliForm = document.getElementById('cli-form');
    const cliInput = document.getElementById('cli-input');

    const cliOutputs = {
      help: 'Commandes : zentable | cloud | oss | kai | polydrive | cv | theme | clear',
      zentable: 'ZenWorkspace (EXCEL_AI_APP v2.0.0) : 63 fichiers TS/TSX, FormulaEngine (923 l.), Electron 33, Vitest 57/57 OK.',
      cloud: `Cloud Control Plane : ${CLOUD_ROLES.length} rôles actifs (${CLOUD_ROLES.slice(0, 5).map(r => r[0]).join(', ')}...), 22/22 pytest OK.`,
      oss: 'GitHub @Mateidslx : 46 PRs fusionnées (twentyhq/twenty #26490/#26502, BasedHardware/omi XSS/CWE-209, FinTech 38 PRs) + security-scanner-mcp (MIT).',
      kai: 'Kai Academic (IUT Anglet) : 447 fichiers, 20 modules BUT Info, 137 pages HTML de cours + AlgoForge Desktop.',
      polydrive: 'PolyDrive Neural Lab : MLP NumPy pur (16 -> 24 -> 16 -> 4, 876 params), PPO-Clip + Neuroévolution, 5/5 pytest OK.',
      cv: 'CV PDF FR : portfolio_assets/CV_Matei_de_Saint_Leger_FR.pdf | EN : portfolio_assets/Resume_Matei_de_Saint_Leger_EN.pdf'
    };

    function printLine(txt) {
      if (!cliScreen) return;
      const p = document.createElement('div');
      p.style.marginBottom = '8px';
      p.textContent = txt;
      cliScreen.appendChild(p);
      cliScreen.scrollTop = cliScreen.scrollHeight;
    }

    function openCli() {
      if (!cliModal) return;
      cliModal.hidden = false;
      cliModal.setAttribute('aria-hidden', 'false');
      if (cliScreen && !cliScreen.childElementCount) {
        printLine('Terminal d’inspection vérifié — tapez "help" ou le nom d’un projet.');
      }
      setTimeout(() => cliInput?.focus(), 40);
    }

    function closeCli() {
      if (!cliModal) return;
      cliModal.hidden = true;
      cliModal.setAttribute('aria-hidden', 'true');
    }

    cliOpen?.addEventListener('click', openCli);
    cliClose?.addEventListener('click', closeCli);
    cliModal?.addEventListener('click', (e) => { if (e.target === cliModal) closeCli(); });

    cliForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!cliInput) return;
      const cmd = cliInput.value.trim().toLowerCase();
      if (!cmd) return;
      printLine(`❯ ${cmd}`);
      cliInput.value = '';
      if (cmd === 'clear') { if (cliScreen) cliScreen.innerHTML = ''; return; }
      if (cmd === 'theme') { themeCtrl?.toggle(); printLine('Thème basculé (Nuit Obsidienne ↔ Jour Éditorial).'); return; }
      printLine(cliOutputs[cmd] || `Commande inconnue "${cmd}". Essayez : ${cliOutputs.help}`);
    });

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openCmdk();
      } else if (e.key === 'Escape') {
        closeCmdk();
        closeCli();
      }
    });
  }

  /* ------------------------------------------------------------------------
     3B. INTERACTIVITÉ LIVE DES APPS EMBARQUÉES + TIROIR TRAME BAYER
     ------------------------------------------------------------------------ */
  function initHeroTunerAndLiveApps() {
    const tunerBtn = document.getElementById('toggle-bayer-tuner');
    const drawer = document.getElementById('hero-tuner-drawer');
    if (tunerBtn && drawer) {
      tunerBtn.addEventListener('click', () => {
        const open = drawer.hidden;
        drawer.hidden = !open;
        tunerBtn.setAttribute('aria-expanded', String(open));
        tunerBtn.textContent = open ? '⊞ Masquer Trame ▴' : '⊞ Trame Bayer ▾';
      });
    }

    const stages = Array.from(document.querySelectorAll('.app-live-stage'));
    function updateAllScales() {
      stages.forEach((stage) => {
        if (stage.hidden) return;
        const w = stage.clientWidth;
        if (w > 40) {
          stage.style.setProperty('--stage-scale', (w / 1260).toFixed(4));
        }
      });
    }

    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(updateAllScales);
      stages.forEach((s) => ro.observe(s));
    }
    window.addEventListener('resize', updateAllScales);
    window.addEventListener('matei:stagescale', () => requestAnimationFrame(updateAllScales));
    updateAllScales();

    // Révélation progressive des iframes au chargement par-dessus l'aperçu PNG instantané
    document.querySelectorAll('.app-live-iframe').forEach((frame) => {
      const markReady = () => frame.classList.add('is-loaded');
      frame.addEventListener('load', markReady);
      try {
        if (frame.contentDocument && frame.contentDocument.readyState === 'complete' && frame.getAttribute('src')) {
          markReady();
        }
      } catch (_) {}
    });

    // Bascule Live App <-> Aperçu PNG par onglet
    document.querySelectorAll('[data-frame-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-frame-toggle');
        const mode = btn.getAttribute('data-mode');
        document.querySelectorAll(`[data-frame-toggle="${key}"]`).forEach((b) => {
          if (b.tagName === 'BUTTON') b.classList.toggle('is-active', b === btn);
        });
        const liveBox = document.querySelector(`[data-frame-live="${key}"]`);
        const imgBox = document.querySelector(`[data-frame-img="${key}"]`);
        if (liveBox && imgBox) {
          const isLive = mode === 'live';
          liveBox.hidden = !isLive;
          imgBox.hidden = false;
          if (isLive) {
            const lazy = liveBox.querySelector('iframe[data-lazy-src]');
            if (lazy && !lazy.getAttribute('src')) {
              lazy.setAttribute('src', lazy.getAttribute('data-lazy-src'));
            }
            requestAnimationFrame(updateAllScales);
          }
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    const themeCtrl = initThemeSwitch();
    initHeroDotUniverse();
    initHeroTunerAndLiveApps();
    const tabsApi = initProjectTabs();
    const cloudApi = initCloudRolesMatrix();
    const polyApi = initPolydriveNeuralCanvas();
    initFunctionalAgentCursors(tabsApi, cloudApi, polyApi);
    initScrollIsland();
    initModalsAndActions(themeCtrl, tabsApi);
  });
})();
