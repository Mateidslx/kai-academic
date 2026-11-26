/* ==========================================================================
   MATÉI DE SAINT LÉGER — COSMIC SPACE & BAYER POINTILLÉ MODULES (v15)
   Integrates Lab Picks: #01 SLX 3D Horizon, #06 Gargantua, #07 Carter Wheel,
   #11 Liquid Manifesto & Glyph Swap, #12 Unanim Morph-Dock, #13 Elliptical Curtain
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------- Shared Three.js WebGL Lifecycle Helper ---------------- */
  function createSpaceWebGL(canvas, observeTarget, renderCb) {
    if (!window.THREE || !canvas) return null;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: true
      });
    } catch (_) {
      return null;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if (THREE.sRGBEncoding !== undefined) renderer.outputEncoding = THREE.sRGBEncoding;

    let inView = true;
    let warmup = 6;
    if ('IntersectionObserver' in window && observeTarget) {
      const io = new IntersectionObserver((entries) => {
        inView = entries[0].isIntersecting;
      }, { threshold: 0.01 });
      io.observe(observeTarget);
    }

    function syncSize(camera, host) {
      const w = Math.max(1, (host && host.clientWidth) || canvas.clientWidth || 800);
      const h = Math.max(1, (host && host.clientHeight) || canvas.clientHeight || 360);
      const size = renderer.getSize(new THREE.Vector2());
      if (size.x !== w || size.y !== h) {
        renderer.setSize(w, h, false);
        if (camera) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        }
      }
      return { w, h };
    }

    function loop(now) {
      if (inView || warmup > 0) {
        if (warmup > 0) warmup--;
        renderCb(now, renderer, syncSize);
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    return {
      renderer,
      bumpWarmup(frames) {
        warmup = Math.max(warmup, frames || 6);
      }
    };
  }

  /* ---------------- #13 Elliptical Space Transition Curtain ---------------- */
  const curtainEl = document.getElementById('space-curtain-overlay');
  const curtainLabelEl = document.getElementById('space-curtain-label');
  let curtainTimerA = null;
  let curtainTimerB = null;

  function triggerEllipticalCurtain(label, targetSelector) {
    if (!curtainEl) {
      if (targetSelector) {
        const t = document.querySelector(targetSelector);
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    if (curtainTimerA) clearTimeout(curtainTimerA);
    if (curtainTimerB) clearTimeout(curtainTimerB);
    if (curtainLabelEl && label) curtainLabelEl.textContent = label;

    curtainEl.classList.add('is-wiped');
    curtainTimerA = setTimeout(() => {
      if (targetSelector) {
        const t = document.querySelector(targetSelector);
        if (t) t.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }, 360);

    curtainTimerB = setTimeout(() => {
      curtainEl.classList.remove('is-wiped');
    }, 860);
  }

  /* ---------------- #01 SLX 3D Space Pointillé Horizon & Core ---------------- */
  function initSlxSpaceHorizon() {
    const stage = document.getElementById('slx-stage');
    const canvas = document.getElementById('slx-horizon-canvas');
    if (!stage || !canvas || !window.THREE) return;

    const stations = [
      {
        k: '01 / 04 · ARCHITECTE SYSTÈME',
        t: 'Orchestration 20 Agents Cloud',
        d: 'Plan de contrôle distribué en Python orchestrant 20 rôles spécialisés reliés en graphe acyclique (DAG) avec portes Critic & QA.',
        cam: [0, 3.8, 12.2],
        wire: 0xa2c8b1
      },
      {
        k: '02 / 04 · ZENWORKSPACE V2',
        t: 'Tableur Spatial & FormulaEngine',
        d: '63 fichiers TypeScript/React 18 et un moteur d’évaluation topologique inter-tables de 923 lignes validé par 57/57 tests Vitest.',
        cam: [2.7, 4.9, 10.8],
        wire: 0x38bdf8
      },
      {
        k: '03 / 04 · SÉCURITÉ & OPEN-SOURCE',
        t: '46 PRs & Security Scanner MCP',
        d: 'Correctifs RBAC/XSS fusionnés sur Twenty CRM, BasedHardware/omi et FinTech TS, plus serveur public MCP d’audit OWASP RFC 9116.',
        cam: [-2.4, 4.4, 11.2],
        wire: 0xff1e42
      },
      {
        k: '04 / 04 · IA EMPARQUÉE POLYDRIVE',
        t: 'Perceptron NumPy & Neuroévolution',
        d: 'Réseau 16→24→16→4 entraîné par gradient PPO-Clip et algorithme génétique directement sur le moteur physique PolyTrack 3D.',
        cam: [1.4, 3.4, 9.9],
        wire: 0xf4f3ef
      }
    ];

    let activeSt = 0;
    let px = 0;
    let py = 0;
    let glCtrl = null;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040509, 0.036);
    const camera = new THREE.PerspectiveCamera(46, 2.2, 0.1, 140);
    camera.position.set(0, 3.8, 12.2);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const pRed = new THREE.PointLight(0xff1e42, 3.8, 30);
    pRed.position.set(-4, 5, 5);
    scene.add(pRed);
    const pCyan = new THREE.PointLight(0x38bdf8, 2.2, 26);
    pCyan.position.set(6, 4, 2);
    scene.add(pCyan);

    // Terrain 3D mesh + Stippled Pointillé Vertex Cloud (SCRIB3 signature)
    const planeGeo = new THREE.PlaneGeometry(52, 38, 46, 34);
    const baseSolid = new THREE.Mesh(
      planeGeo,
      new THREE.MeshStandardMaterial({
        color: 0x06070c,
        roughness: 0.9,
        metalness: 0.25,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1
      })
    );
    baseSolid.rotation.x = -Math.PI / 2;
    baseSolid.position.set(0, -1.8, -4);
    scene.add(baseSolid);

    const wireMat = new THREE.MeshBasicMaterial({ color: 0xa2c8b1, wireframe: true, transparent: true, opacity: 0.22 });
    const wireMesh = new THREE.Mesh(planeGeo, wireMat);
    wireMesh.rotation.x = -Math.PI / 2;
    wireMesh.position.set(0, -1.78, -4);
    scene.add(wireMesh);

    const dotTerrainMat = new THREE.PointsMaterial({ color: 0xff1e42, size: 0.11, transparent: true, opacity: 0.85 });
    const dotTerrain = new THREE.Points(planeGeo, dotTerrainMat);
    dotTerrain.rotation.x = -Math.PI / 2;
    dotTerrain.position.set(0, -1.74, -4);
    scene.add(dotTerrain);

    // Floating 3D Geometric Orbital Core behind reticle
    const coreGroup = new THREE.Group();
    coreGroup.position.set(-3.9, 1.5, -1.5);
    const icoGeo = new THREE.IcosahedronGeometry(1.55, 1);
    coreGroup.add(new THREE.Mesh(icoGeo, new THREE.MeshStandardMaterial({ color: 0x0b0d14, metalness: 0.85, roughness: 0.2 })));
    coreGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(icoGeo), new THREE.LineBasicMaterial({ color: 0xff1e42, transparent: true, opacity: 0.88 })));
    coreGroup.add(new THREE.Points(icoGeo, new THREE.PointsMaterial({ color: 0xf4f3ef, size: 0.08, transparent: true, opacity: 0.85 })));
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.028, 10, 84), new THREE.MeshBasicMaterial({ color: 0xf4f3ef, transparent: true, opacity: 0.52 }));
    ringA.rotation.x = 1.05;
    coreGroup.add(ringA);
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.75, 0.02, 10, 84), new THREE.MeshBasicMaterial({ color: 0xff1e42, transparent: true, opacity: 0.56 }));
    ringB.rotation.y = 0.8;
    coreGroup.add(ringB);
    scene.add(coreGroup);

    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      py = ((e.clientY - r.top) / r.height - 0.5) * 2;
    });

    function setStation(i) {
      activeSt = i;
      stage.querySelectorAll('.slx-tick').forEach((t, idx) => {
        t.classList.toggle('is-active', idx === i);
        t.setAttribute('aria-pressed', String(idx === i));
      });
      const lbl = document.getElementById('slx-dock-label');
      const kicker = document.getElementById('slx-kicker');
      const title = document.getElementById('slx-title');
      const desc = document.getElementById('slx-desc');
      if (lbl) lbl.textContent = `0${i + 1} / 04`;
      if (kicker) kicker.textContent = stations[i].k;
      if (title) title.textContent = stations[i].t;
      if (desc) desc.textContent = stations[i].d;
      wireMat.color.setHex(stations[i].wire);
      dotTerrainMat.color.setHex(i === 2 ? 0xf4f3ef : 0xff1e42);
      const blk = document.getElementById('slx-copy-block');
      if (blk) {
        blk.classList.remove('slx-anim');
        void blk.offsetWidth;
        blk.classList.add('slx-anim');
      }
      if (glCtrl) glCtrl.bumpWarmup(8);
    }

    stage.querySelectorAll('.slx-tick').forEach((t) => {
      t.addEventListener('click', () => setStation(Number(t.dataset.slxIdx)));
    });
    const replayBtn = document.getElementById('slx-replay-btn');
    if (replayBtn) replayBtn.addEventListener('click', () => setStation(activeSt));

    glCtrl = createSpaceWebGL(canvas, stage, (now, renderer, syncSize) => {
      syncSize(camera, stage);
      const t = now * 0.0011;
      const pos = planeGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i);
        const vy = pos.getY(i);
        const wave = Math.sin(vx * 0.24 + t + activeSt) * 0.72 + Math.cos(vy * 0.26 - t * 0.8) * 0.62;
        pos.setZ(i, wave);
      }
      pos.needsUpdate = true;

      coreGroup.rotation.y = t * 0.45 + px * 0.5;
      coreGroup.rotation.x = Math.sin(t * 0.4) * 0.18 + py * 0.35;
      ringA.rotation.z = t * 0.6;
      ringB.rotation.x = -t * 0.5;

      const tc = stations[activeSt].cam;
      camera.position.x += (tc[0] + px * 0.9 - camera.position.x) * 0.06;
      camera.position.y += (tc[1] - py * 0.5 - camera.position.y) * 0.06;
      camera.position.z += (tc[2] - camera.position.z) * 0.06;
      camera.lookAt(-0.4, 0.2, -2.5);
      renderer.render(scene, camera);
    });
  }

  /* ---------------- #11 Melon Liquid Blur-to-Ink & Glitch Glyphs ---------------- */
  function initLiquidManifestoAndGlyphs() {
    const card = document.getElementById('cosmic-manifesto');
    const wrap = document.getElementById('liquid-words');
    const scrub = document.getElementById('manifesto-scrub');
    const out = document.getElementById('manifesto-pct');
    const bar = document.getElementById('glyph-swap-bar');
    if (!card || !wrap) return;

    const sentence = 'Architecte logiciel pragmatique concevant des outils autonomes, réactifs et rigoureusement testés.';
    const words = sentence.split(' ');
    wrap.innerHTML = words.map((w) => `<span class="liq-w">${w}</span>`).join('');
    const wordEls = Array.from(wrap.querySelectorAll('.liq-w'));

    let manualLocked = false;
    function applyPct(pct) {
      const clamped = Math.max(0, Math.min(100, Math.round(pct)));
      const cut = Math.round((clamped / 100) * wordEls.length);
      wordEls.forEach((w, i) => w.classList.toggle('is-blob', i >= cut));
      if (scrub) scrub.value = String(clamped);
      if (out) out.textContent = `${clamped}%`;
    }

    function syncFromScroll() {
      if (manualLocked) return;
      const r = card.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const raw = ((vh * 0.88 - r.top) / (vh * 0.58)) * 100;
      applyPct(Math.max(28, Math.min(100, raw)));
    }

    if (scrub) {
      scrub.addEventListener('input', () => {
        manualLocked = true;
        applyPct(Number(scrub.value));
      });
    }
    window.addEventListener('scroll', syncFromScroll, { passive: true });
    syncFromScroll();

    if (bar) {
      const label = 'ZENWORKSPACE · 20 AGENTS · 46 PRS · TOTEM 3D · ORACLE VPS';
      bar.innerHTML = [...label].map((c) => `<span class="gs-ch">${c}</span>`).join('');
      const chEls = Array.from(bar.querySelectorAll('.gs-ch'));
      setInterval(() => {
        chEls.forEach((el) => el.classList.remove('is-alt'));
        for (let k = 0; k < 5; k++) {
          const pick = chEls[Math.floor(Math.random() * chEls.length)];
          if (pick && pick.textContent.trim()) pick.classList.add('is-alt');
        }
      }, 650);
    }
  }

  /* ---------------- #07 Carter 3D Orbital Wheel (2-Way Synced with #flagships) ---------------- */
  function initCarterOrbitalWheel() {
    const track = document.getElementById('wheel-track');
    const prevBtn = document.getElementById('wheel-prev');
    const nextBtn = document.getElementById('wheel-next');
    const counter = document.getElementById('wheel-counter');
    const roll = document.getElementById('wheel-roll-tag');
    const yrEl = document.getElementById('wheel-year');
    if (!track) return;

    const projects = [
      { key: 'zenworkspace', n: 'ZenWorkspace', tag: 'REACT 18 · VITEST', yr: '2025–2026', desc: 'Tableur spatial & FormulaEngine (57/57)', img: 'portfolio_assets/real_previews/zentable_real.png' },
      { key: 'cloud', n: '20 Agents Cloud', tag: 'PYTHON DAG · PYTEST', yr: '2025–2026', desc: 'Orchestrateur multi-agents sur Oracle VPS', img: '' },
      { key: 'oss', n: '46 PRs OSS & MCP', tag: 'RBAC · OWASP · NESTJS', yr: '2026', desc: 'Twenty CRM, Omi & Security Scanner', img: 'portfolio_assets/real_previews/security_scanner_real.png' },
      { key: 'kai', n: 'Kai Academic', tag: 'BUT INFO · 447 DOCS', yr: '2025–2026', desc: 'Portail promo IUT d’Anglet & AlgoForge', img: 'portfolio_assets/real_previews/kai_academic_real.png' },
      { key: 'polydrive', n: 'PolyDrive Lab', tag: 'NUMPY MLP · PPO-CLIP', yr: '2026', desc: 'Réseau 876 paramètres sur PolyTrack 3D', img: '' }
    ];

    let idx = 0;
    let syncingFromTab = false;

    projects.forEach((d, i) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'wheel-card';
      card.setAttribute('aria-label', `Sélectionner ${d.n}`);
      const thumbHtml = d.img
        ? `<div class="wheel-thumb"><img src="${d.img}" alt="${d.n}" loading="lazy" /></div>`
        : `<div class="wheel-thumb">${d.tag}</div>`;
      card.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;width:100%;"><span style="font-family:var(--font-mono);font-size:0.68rem;color:var(--accent);font-weight:800;">0${i + 1}</span><span style="font-family:var(--font-mono);font-size:0.62rem;color:var(--text-muted);">${d.yr}</span></div>${thumbHtml}<strong style="font-size:0.95rem;text-align:left;width:100%;">${d.n}</strong><span style="font-size:0.73rem;color:var(--text-secondary);text-align:left;width:100%;">${d.desc}</span>`;
      card.addEventListener('click', () => go(i, true));
      track.appendChild(card);
    });

    function renderWheel() {
      const cards = track.querySelectorAll('.wheel-card');
      const step = (track.clientWidth || 800) < 520 ? 132 : 225;
      cards.forEach((c, i) => {
        const off = i - idx;
        const tx = off * step;
        const ty = Math.abs(off) * 16;
        const tz = -Math.abs(off) * 75;
        const rotY = -off * 18;
        const rotZ = off * 5;
        const op = Math.abs(off) > 2 ? 0 : 1 - Math.abs(off) * 0.28;
        c.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${off === 0 ? 1.05 : 0.92})`;
        c.style.opacity = String(op);
        c.style.zIndex = String(10 - Math.abs(off));
        c.style.borderColor = off === 0 ? 'var(--accent)' : 'var(--border-strong)';
        c.style.pointerEvents = Math.abs(off) > 2 ? 'none' : 'auto';
      });
      if (counter) counter.textContent = `N°0${idx + 1} / 0${projects.length}`;
      if (yrEl) yrEl.textContent = projects[idx].yr;
      if (roll) {
        roll.innerHTML = [...projects[idx].tag]
          .map((ch, ci) => `<span style="--ci:${ci}">${ch === ' ' ? '&nbsp;' : ch}</span>`)
          .join('');
      }
    }

    function go(nextIdx, pushToTab) {
      idx = (nextIdx + projects.length) % projects.length;
      renderWheel();
      if (pushToTab && !syncingFromTab) {
        const key = projects[idx].key;
        const tabBtn = document.querySelector(`.project-tab-btn[data-project-tab="${key}"]`);
        if (tabBtn && !tabBtn.classList.contains('is-active')) {
          syncingFromTab = true;
          tabBtn.click();
          syncingFromTab = false;
        }
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => go(idx - 1, true));
    if (nextBtn) nextBtn.addEventListener('click', () => go(idx + 1, true));

    // Sync from lower tabs -> wheel
    document.querySelectorAll('.project-tab-btn[data-project-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (syncingFromTab) return;
        const key = btn.getAttribute('data-project-tab');
        const found = projects.findIndex((p) => p.key === key);
        if (found !== -1 && found !== idx) {
          syncingFromTab = true;
          go(found, false);
          syncingFromTab = false;
        }
      });
    });

    window.addEventListener('resize', renderWheel);
    renderWheel();
  }

  /* ---------------- #06 SLX Gargantua 3D Pointillé Singularity + Terminal ---------------- */
  function initGargantuaSingularity() {
    const stage = document.getElementById('gargantua-contact-stage');
    const c = document.getElementById('gargantua-contact-canvas');
    const input = document.getElementById('gargantua-input');
    const reply = document.getElementById('gargantua-reply');
    const form = document.getElementById('gargantua-form');
    if (!stage || !c) return;

    const answers = {
      alternance: 'Disponible pour une alternance BUT 2 dès Septembre 2027 (Biarritz, Anglet, Bayonne, Bidart & hybride). Véhiculé et autonome sur Linux/Git.',
      zen: 'ZenWorkspace v2.0.0 : tableur spatial React 18 + TypeScript + Electron 33, moteur FormulaEngine (923 l.), 57/57 tests Vitest validés.',
      cloud: 'Cloud Control Plane : orchestrateur Python DAG à 20 rôles spécialisés déployé 24/7 sur VPS Ubuntu Oracle, 22/22 tests pytest.',
      poly: 'PolyDrive Neural Lab : perceptron NumPy pur (16→24→16→4, 876 paramètres), PPO-Clip + neuroévolution branché sur PolyTrack 3D.',
      oss: '46 Pull Requests fusionnées (@Mateidslx) sur Twenty CRM (40k★), BasedHardware/omi (XSS/CWE-209) et FinTech TS + security-scanner-mcp MIT.',
      c99: 'Systèmes & BUT Info : C99 strict (-Wall -Wextra -Werror -g + Valgrind), C++, PostgreSQL/Merise 3NF et algoForge Desktop.'
    };

    function answerQuery(raw) {
      const q = (raw || '').trim().toLowerCase();
      let ans = answers.alternance + ' Projets vérifiés : ZenWorkspace (57/57), 20 Agents Cloud (22/22), 46 PRs OSS.';
      if (q.includes('zen')) ans = answers.zen;
      else if (q.includes('cloud') || q.includes('agent')) ans = answers.cloud;
      else if (q.includes('poly') || q.includes('ia') || q.includes('lidar')) ans = answers.poly;
      else if (q.includes('oss') || q.includes('pr') || q.includes('mcp') || q.includes('sec')) ans = answers.oss;
      else if (q.includes('c99') || q.includes('sql') || q.includes('c++')) ans = answers.c99;
      if (reply) {
        reply.textContent = ans;
        reply.classList.add('is-open');
      }
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        answerQuery(input ? input.value : '');
      });
    }

    stage.querySelectorAll('.gargantua-chip[data-gq]').forEach((chip) => {
      chip.addEventListener('click', () => {
        const key = chip.getAttribute('data-gq');
        if (input) input.value = key;
        answerQuery(key);
      });
    });

    if (input) {
      const phList = [
        'Posez une question : "alternance", "zentable", "cloud"...',
        'Essayez : "polydrive", "oss", ou "c99"...'
      ];
      let phi = 0;
      setInterval(() => {
        phi = (phi + 1) % phList.length;
        input.placeholder = phList[phi];
      }, 2800);
    }

    if (!window.THREE) return;

    let px = 0;
    let py = 0;
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      py = ((e.clientY - r.top) / r.height - 0.5) * 2;
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 2.2, 0.1, 120);
    camera.position.set(0, 1.15, 7.8);
    camera.lookAt(0, -0.3, 0);

    const bhGroup = new THREE.Group();
    bhGroup.position.set(0, 0.4, 0);
    scene.add(bhGroup);

    bhGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.12, 40, 40),
      new THREE.MeshBasicMaterial({ color: 0x020205 })
    ));

    const gUniforms = { uTime: { value: 0 } };
    const photonMat = new THREE.ShaderMaterial({
      uniforms: gUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewPos = -mvPos.xyz;
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewPos;
        void main() {
          float fresnel = pow(1.0 - max(0.0, dot(normalize(vViewPos), vNormal)), 3.2);
          vec3 col = mix(vec3(1.0, 0.12, 0.26), vec3(1.0, 0.94, 0.90), fresnel);
          gl_FragColor = vec4(col * fresnel * 1.35, fresnel * 0.9);
        }
      `
    });
    bhGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1.24, 40, 40), photonMat));

    function makeDiskMaterial(innerR, outerR) {
      return new THREE.ShaderMaterial({
        uniforms: {
          uTime: gUniforms.uTime,
          uInner: { value: innerR },
          uOuter: { value: outerR }
        },
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          varying vec3 vPos;
          void main() {
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform float uInner;
          uniform float uOuter;
          varying vec3 vPos;
          void main() {
            float r = length(vPos.xy);
            float normR = clamp((r - uInner) / (uOuter - uInner), 0.0, 1.0);
            float ang = atan(vPos.y, vPos.x);
            float spiral = sin(ang * 4.0 + r * 6.5 - uTime * 2.2) * 0.5 + 0.5;
            float bands = sin(r * 14.0 - uTime * 1.6) * 0.5 + 0.5;
            float intensity = pow(1.0 - normR, 1.65) * (0.42 + 0.58 * spiral * bands);
            vec3 hot = vec3(1.0, 0.88, 0.82);
            vec3 crim = vec3(1.0, 0.118, 0.259);
            vec3 col = mix(hot, crim, smoothstep(0.0, 0.45, normR));
            float innerFade = smoothstep(0.0, 0.08, normR);
            gl_FragColor = vec4(col * intensity * 1.45, intensity * innerFade);
          }
        `
      });
    }

    const disk = new THREE.Mesh(new THREE.RingGeometry(1.24, 4.35, 112, 10), makeDiskMaterial(1.24, 4.35));
    disk.rotation.x = -1.24;
    disk.rotation.y = 0.16;
    bhGroup.add(disk);

    const halo = new THREE.Mesh(new THREE.RingGeometry(1.16, 2.7, 96, 8), makeDiskMaterial(1.16, 2.7));
    halo.rotation.x = 0.14;
    bhGroup.add(halo);

    // Stippled Space Pointillé Starfield + Crimson Orbiting Dots (850 points)
    const starCount = 850;
    const whitePos = new Float32Array(starCount * 3);
    const crimPos = new Float32Array(260 * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 2.0 + Math.random() * 9.5;
      const a = Math.random() * Math.PI * 2;
      whitePos[i * 3] = Math.cos(a) * r;
      whitePos[i * 3 + 1] = (Math.random() - 0.5) * 4.4;
      whitePos[i * 3 + 2] = Math.sin(a) * r - 1.8;
    }
    for (let i = 0; i < 260; i++) {
      const r = 1.45 + Math.random() * 3.8;
      const a = Math.random() * Math.PI * 2;
      crimPos[i * 3] = Math.cos(a) * r;
      crimPos[i * 3 + 1] = (Math.random() - 0.5) * 0.45;
      crimPos[i * 3 + 2] = Math.sin(a) * r;
    }
    const wGeo = new THREE.BufferGeometry();
    wGeo.setAttribute('position', new THREE.BufferAttribute(whitePos, 3));
    const whiteStars = new THREE.Points(wGeo, new THREE.PointsMaterial({ color: 0xf4f3ef, size: 0.055, transparent: true, opacity: 0.78 }));
    bhGroup.add(whiteStars);

    const cGeo = new THREE.BufferGeometry();
    cGeo.setAttribute('position', new THREE.BufferAttribute(crimPos, 3));
    const crimDots = new THREE.Points(cGeo, new THREE.PointsMaterial({ color: 0xff1e42, size: 0.075, transparent: true, opacity: 0.88 }));
    crimDots.rotation.x = 0.22;
    bhGroup.add(crimDots);

    createSpaceWebGL(c, stage, (now, renderer, syncSize) => {
      syncSize(camera, stage);
      const t = now * 0.001;
      gUniforms.uTime.value = t;
      whiteStars.rotation.y = t * 0.06;
      crimDots.rotation.y = t * 0.34;
      bhGroup.rotation.y += (px * 0.24 - bhGroup.rotation.y) * 0.06;
      bhGroup.rotation.x += (py * 0.14 - bhGroup.rotation.x) * 0.06;
      renderer.render(scene, camera);
    });
  }

  /* ---------------- #12 Unanim Floating Morph-Dock & #13 Curtain Wiring ---------------- */
  function initUnanimMorphDock() {
    const btn = document.getElementById('unanim-dock-btn');
    const drawer = document.getElementById('unanim-drawer');
    const tag = document.getElementById('unanim-pill-tag');
    const parcoursReplay = document.getElementById('parcours-curtain-replay');

    if (parcoursReplay) {
      parcoursReplay.addEventListener('click', () => triggerEllipticalCurtain('PARCOURS & STAGES', '#parcours'));
    }

    if (!btn || !drawer) return;
    function setOpen(open) {
      drawer.classList.toggle('is-open', open);
      btn.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      if (tag) tag.textContent = open ? 'Fermer' : 'Explorer';
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(!drawer.classList.contains('is-open'));
    });

    drawer.querySelectorAll('a[data-curtain-target]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSel = link.getAttribute('data-curtain-target');
        const label = link.getAttribute('data-curtain-label') || 'SECTION';
        setOpen(false);
        triggerEllipticalCurtain(label, targetSel);
      });
    });

    document.addEventListener('click', (e) => {
      if (drawer.classList.contains('is-open') && !drawer.contains(e.target) && !btn.contains(e.target)) {
        setOpen(false);
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) setOpen(false);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSlxSpaceHorizon();
    initLiquidManifestoAndGlyphs();
    initCarterOrbitalWheel();
    initGargantuaSingularity();
    initUnanimMorphDock();
  });
})();
