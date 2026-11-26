/* ==========================================================================
   MATÉI DE SAINT LÉGER — ATLANTIQUE // ATELIER D'INGÉNIEUR (v18)
   Continuous Scroll Storytelling + Real PBR GLB + Systems Telemetry
   ========================================================================== */

(function () {
  'use strict';

  window.__STORY_CINEMA_STATE__ = {
    modelsLoaded: 0,
    totalModels: 2,
    progress: 0,
    chapter: 1,
    paused: false
  };

  /* ---------------- 1. Persistent Three.js Scene + PBR GLB Choreography ---------------- */
  function initCinemaWebGL() {
    const canvas = document.getElementById('story-webgl-canvas');
    if (!canvas || !window.THREE) return;

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
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if (THREE.sRGBEncoding !== undefined) renderer.outputEncoding = THREE.sRGBEncoding;
    if (THREE.ACESFilmicToneMapping !== undefined) {
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.92;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / Math.max(1, window.innerHeight), 0.1, 140);
    camera.position.set(0, 0, 10);

    if (THREE.RoomEnvironment && THREE.PMREMGenerator) {
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new THREE.RoomEnvironment(), 0.04).texture;
      pmrem.dispose();
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.28));
    const keyLight = new THREE.DirectionalLight(0xfff5e8, 1.15);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const crimsonRim = new THREE.DirectionalLight(0xe62e45, 2.1);
    crimsonRim.position.set(-6, 3, -3);
    scene.add(crimsonRim);

    const sageFill = new THREE.DirectionalLight(0x8fb3a8, 1.15);
    sageFill.position.set(4, -5, 4);
    scene.add(sageFill);

    const ribbonGeo = new THREE.PlaneGeometry(34, 16, 48, 22);
    const ribbonMat = new THREE.MeshBasicMaterial({
      color: 0x8fb3a8,
      wireframe: true,
      transparent: true,
      opacity: 0.14
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbonMesh.rotation.x = -1.25;
    ribbonMesh.position.set(0, -3.4, -5.5);
    scene.add(ribbonMesh);

    const pCount = 820;
    const pPos = new Float32Array(pCount * 3);
    const pCrimPos = new Float32Array(180 * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 26;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 3;
    }
    for (let i = 0; i < 180; i++) {
      pCrimPos[i * 3] = (Math.random() - 0.5) * 24;
      pCrimPos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pCrimPos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const ivoryDust = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0xf3f1ec, size: 0.055, transparent: true, opacity: 0.55 })
    );
    scene.add(ivoryDust);

    const pCrimGeo = new THREE.BufferGeometry();
    pCrimGeo.setAttribute('position', new THREE.BufferAttribute(pCrimPos, 3));
    const emberDust = new THREE.Points(
      pCrimGeo,
      new THREE.PointsMaterial({ color: 0xe62e45, size: 0.075, transparent: true, opacity: 0.68 })
    );
    scene.add(emberDust);

    let helmetGroup = null;
    let brainStemGroup = null;
    let brainMixer = null;

    function normalizeModel(root, targetHeight) {
      const box = new THREE.Box3().setFromObject(root);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z, 0.001);
      const s = targetHeight / maxDim;
      root.scale.setScalar(s);
      root.position.sub(center.multiplyScalar(s));
      const wrap = new THREE.Group();
      wrap.add(root);
      return wrap;
    }

    if (THREE.GLTFLoader) {
      const loader = new THREE.GLTFLoader();

      loader.load(
        'portfolio_assets/models/DamagedHelmet.glb',
        (gltf) => {
          helmetGroup = normalizeModel(gltf.scene, 3.3);
          helmetGroup.visible = false;
          scene.add(helmetGroup);
          window.__STORY_CINEMA_STATE__.modelsLoaded++;
        },
        undefined,
        () => {}
      );

      loader.load(
        'portfolio_assets/models/BrainStem.glb',
        (gltf) => {
          brainStemGroup = normalizeModel(gltf.scene, 3.6);
          brainStemGroup.visible = false;
          scene.add(brainStemGroup);
          if (gltf.animations && gltf.animations.length > 0) {
            brainMixer = new THREE.AnimationMixer(gltf.scene);
            brainMixer.clipAction(gltf.animations[0]).play();
          }
          window.__STORY_CINEMA_STATE__.modelsLoaded++;
        },
        undefined,
        () => {}
      );
    }

    const helmetAnchor = document.getElementById('helmet-stage-anchor');
    const brainAnchor = document.getElementById('brainstem-stage-anchor');
    let ptrX = 0;
    let ptrY = 0;
    let smoothP = 0;
    let targetP = 0;
    let simTime = 0;
    const startTs = performance.now();

    window.addEventListener('pointermove', (e) => {
      ptrX = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
      ptrY = (e.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
    }, { passive: true });

    function placeAtAnchor(group, anchor, baseScale, rotYBase, rotXBase) {
      if (!group || !anchor) return;
      const r = anchor.getBoundingClientRect();
      const vw = Math.max(1, window.innerWidth);
      const vh = Math.max(1, window.innerHeight);

      if (r.bottom < -120 || r.top > vh + 120 || r.width < 10 || r.height < 10) {
        group.visible = false;
        return;
      }

      const cx = r.left + r.width * 0.5;
      const cy = r.top + r.height * 0.5;
      const ndcX = (cx / vw) * 2 - 1;
      const ndcY = -(cy / vh) * 2 + 1;

      const dist = camera.position.z;
      const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * dist;
      const halfW = halfH * camera.aspect;

      group.visible = true;
      group.position.x = ndcX * halfW;
      group.position.y = ndcY * halfH;
      group.position.z = 0;

      const focusScale = Math.max(0.45, Math.min(1.08, 1.05 - Math.abs(ndcY) * 0.25)) * (vw < 720 ? 0.78 : 1.0);
      group.scale.setScalar(baseScale * focusScale);
      group.rotation.y = rotYBase + ptrX * 0.35 + ndcY * 1.15;
      group.rotation.x = rotXBase + ptrY * 0.16;
    }

    function syncSize() {
      const w = Math.max(1, window.innerWidth);
      const h = Math.max(1, window.innerHeight);
      const size = renderer.getSize(new THREE.Vector2());
      if (size.x !== w || size.y !== h) {
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
    }

    const clock = new THREE.Clock();

    function tick(now) {
      const rawDt = Math.min(0.05, clock.getDelta());
      const paused = !!window.__STORY_CINEMA_STATE__.paused;
      const dt = paused ? 0 : rawDt;
      syncSize();

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetP = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      smoothP += (targetP - smoothP) * 0.085;
      window.__STORY_CINEMA_STATE__.progress = smoothP;

      if (!paused) {
        simTime += dt * 0.9;
        const pos = ribbonGeo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const vx = pos.getX(i);
          const vy = pos.getY(i);
          pos.setZ(i, Math.sin(vx * 0.3 + simTime + smoothP * 6.0) * 0.7 + Math.cos(vy * 0.32 - simTime) * 0.5);
        }
        pos.needsUpdate = true;

        // Subtle 900ms radial settle at entry (never blocks text or clicks)
        const introT = Math.min(1, (now - startTs) / 900);
        const introEase = 1 - Math.pow(1 - introT, 3);
        const radialScale = 1.38 - 0.38 * introEase;
        ivoryDust.scale.setScalar(radialScale);
        emberDust.scale.setScalar(radialScale);

        ivoryDust.rotation.y = simTime * 0.06 + smoothP * 1.1;
        emberDust.rotation.y = -simTime * 0.09 + smoothP * 1.6;

        if (brainMixer) brainMixer.update(dt);
      }

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      ivoryDust.material.color.setHex(isLight ? 0x101116 : 0xf3f1ec);
      ivoryDust.material.opacity = isLight ? 0.28 : 0.55;
      ribbonMat.opacity = isLight ? 0.10 : 0.14;

      placeAtAnchor(helmetGroup, helmetAnchor, 1.05, simTime * 0.55 - 0.3, 0.08);
      placeAtAnchor(brainStemGroup, brainAnchor, 1.0, simTime * 0.45 + 0.25, 0.04);

      camera.position.x = ptrX * 0.32;
      camera.position.y = -ptrY * 0.22;
      camera.lookAt(0, 0, -0.5);

      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  /* ---------------- 2. Continuous Scroll Choreography & Telemetry ---------------- */
  function decodeBlueprintLabels(container) {
    const labels = Array.from(container.querySelectorAll('.bp-label[data-decode]'));
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.__STORY_CINEMA_STATE__.paused || reduceMotion) {
      labels.forEach((el) => { el.textContent = el.dataset.decode; });
      return;
    }

    const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#%';
    labels.forEach((el, idx) => {
      if (el.dataset.decoded) return;
      el.dataset.decoded = '1';
      const target = el.dataset.decode || '';
      const start = performance.now() + idx * 35;
      const dur = 420;

      function frame(ts) {
        if (window.__STORY_CINEMA_STATE__.paused || ts - start >= dur) {
          el.textContent = target;
          return;
        }
        if (ts < start) {
          requestAnimationFrame(frame);
          return;
        }
        const prog = (ts - start) / dur;
        const locked = Math.floor(prog * target.length);
        let out = '';
        for (let i = 0; i < target.length; i++) {
          const ch = target[i];
          if (i < locked || ch === ' ' || ch === '/' || ch === '·') {
            out += ch;
          } else {
            out += glyphs[Math.floor(Math.random() * glyphs.length)];
          }
        }
        el.textContent = out;
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }

  function initScrollChoreography() {
    const rail = document.getElementById('story-scroll-fill');
    const navNum = document.getElementById('nav-ch-num');
    const navTitle = document.getElementById('nav-ch-title');
    const dockNum = document.getElementById('dock-ch-num');
    const dockPct = document.getElementById('dock-ch-pct');
    const signalReadout = document.getElementById('signal-readout');
    const signalCursor = document.getElementById('signal-cursor');

    const chapters = Array.from(document.querySelectorAll('.story-chapter[data-chapter]'));
    const manifestoBox = document.getElementById('liquid-manifesto');
    const manifestoWrap = document.getElementById('liquid-words');
    const zenFrame = document.getElementById('zen-tilt-frame');
    const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));

    let mWords = [];
    if (manifestoWrap) {
      const sentence = manifestoWrap.dataset.sentence || manifestoWrap.textContent.trim();
      mWords = sentence.split(/\s+/);
      manifestoWrap.innerHTML = mWords.map((w) => `<span class="liq-w is-blob">${w}</span>`).join(' ');
    }
    const wordEls = manifestoWrap ? Array.from(manifestoWrap.querySelectorAll('.liq-w')) : [];

    const revealEls = Array.from(document.querySelectorAll('.story-reveal'));
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            if (entry.target.classList.contains('system-blueprint')) {
              decodeBlueprintLabels(entry.target);
            }
            entry.target.querySelectorAll('[data-count]').forEach((numEl) => {
              if (numEl.dataset.counted) return;
              numEl.dataset.counted = '1';
              const target = Number(numEl.dataset.count) || 0;
              const start = performance.now();
              function step(ts) {
                const p = Math.min(1, (ts - start) / 480);
                const ease = 0.5 + 0.5 * (1 - Math.pow(1 - p, 3));
                numEl.textContent = String(Math.round(target * (p >= 1 ? 1 : ease)));
                if (p < 1) requestAnimationFrame(step);
              }
              requestAnimationFrame(step);
            });
          }
        });
      }, { threshold: 0.05, rootMargin: '80px 0px' });
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('is-in'));
    }

    function updateOnScroll() {
      const sy = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pct = Math.max(0, Math.min(100, Math.round((sy / maxScroll) * 100)));
      const vh = Math.max(1, window.innerHeight);

      if (rail) rail.style.width = `${pct}%`;
      if (dockPct) dockPct.textContent = `${pct}%`;
      if (signalReadout) signalReadout.textContent = String(pct).padStart(3, '0');
      if (signalCursor) signalCursor.style.top = `${pct}%`;

      revealEls.forEach((el) => {
        if (!el.classList.contains('is-in') && el.getBoundingClientRect().top < vh * 0.94) {
          el.classList.add('is-in');
          if (el.classList.contains('system-blueprint')) {
            decodeBlueprintLabels(el);
          }
        }
      });

      let activeIdx = 0;
      chapters.forEach((ch, idx) => {
        const top = ch.getBoundingClientRect().top;
        if (top <= vh * 0.45) activeIdx = idx;
      });
      const activeCh = chapters[activeIdx];
      if (activeCh) {
        const num = activeCh.dataset.chapter || `0${activeIdx + 1}`;
        const label = activeCh.dataset.title || '';
        window.__STORY_CINEMA_STATE__.chapter = activeIdx + 1;
        if (navNum) navNum.textContent = `${num} / 07`;
        if (navTitle) navTitle.textContent = label;
        if (dockNum) dockNum.textContent = `${num} / 07`;
      }

      if (manifestoBox && wordEls.length > 0) {
        const r = manifestoBox.getBoundingClientRect();
        const prog = Math.max(0.18, Math.min(1, (vh * 0.88 - r.top) / (vh * 0.56)));
        const litCount = Math.round(prog * wordEls.length);
        wordEls.forEach((w, i) => w.classList.toggle('is-blob', i >= litCount));
      }

      if (zenFrame) {
        const r = zenFrame.getBoundingClientRect();
        const rel = (r.top + r.height * 0.5 - vh * 0.5) / vh;
        const rx = Math.max(-7, Math.min(9, rel * 10));
        const sc = Math.max(0.95, Math.min(1.01, 1 - Math.abs(rel) * 0.04));
        zenFrame.style.transform = `rotateX(${rx.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
      }

      parallaxEls.forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0.08;
        const r = el.getBoundingClientRect();
        const offset = (r.top + r.height * 0.5 - vh * 0.5) * speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    }

    window.addEventListener('scroll', updateOnScroll, { passive: true });
    window.addEventListener('resize', updateOnScroll, { passive: true });
    updateOnScroll();
  }

  /* ---------------- 3. Viewfinder Corner-Bracket Cursor ---------------- */
  function initCursorBrackets() {
    const wrap = document.getElementById('cursor-brackets');
    if (!wrap) return;
    const finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer || window.innerWidth < 1120) return;

    const tl = wrap.querySelector('.cb-tl');
    const tr = wrap.querySelector('.cb-tr');
    const bl = wrap.querySelector('.cb-bl');
    const br = wrap.querySelector('.cb-br');
    const selector = 'a, button, .oss-ledger-row, .email-copy-orb';
    let currentTarget = null;

    function positionBrackets() {
      if (!currentTarget || window.innerWidth < 1120) {
        wrap.classList.remove('is-active');
        return;
      }
      const r = currentTarget.getBoundingClientRect();
      if (r.width === 0 || r.height === 0 || r.bottom < 0 || r.top > window.innerHeight) {
        wrap.classList.remove('is-active');
        return;
      }
      const pad = 6;
      const x1 = r.left - pad;
      const y1 = r.top - pad;
      const x2 = r.right + pad - 10;
      const y2 = r.bottom + pad - 10;

      tl.style.transform = `translate3d(${x1}px, ${y1}px, 0)`;
      tr.style.transform = `translate3d(${x2}px, ${y1}px, 0)`;
      bl.style.transform = `translate3d(${x1}px, ${y2}px, 0)`;
      br.style.transform = `translate3d(${x2}px, ${y2}px, 0)`;
      wrap.classList.add('is-active');
    }

    document.addEventListener('pointerover', (e) => {
      const match = e.target && e.target.closest ? e.target.closest(selector) : null;
      if (match) {
        currentTarget = match;
        positionBrackets();
      }
    });

    document.addEventListener('pointerout', (e) => {
      if (!currentTarget) return;
      const related = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget.closest(selector) : null;
      if (!related) {
        currentTarget = null;
        wrap.classList.remove('is-active');
      }
    });

    window.addEventListener('scroll', positionBrackets, { passive: true });
    window.addEventListener('resize', positionBrackets, { passive: true });
  }

  /* ---------------- 4. Theme Toggle, Morph Dock, Email Copy & Signal Controls ---------------- */
  function initControls() {
    const themeBtn = document.getElementById('cinema-theme-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        themeBtn.textContent = next === 'light' ? '☾ Nuit' : '☀ Jour';
      });
    }

    const dockBtn = document.getElementById('story-dock-btn');
    const dockDrawer = document.getElementById('story-dock-drawer');
    if (dockBtn && dockDrawer) {
      function setDockOpen(open) {
        dockDrawer.classList.toggle('is-open', open);
        dockDrawer.setAttribute('aria-hidden', String(!open));
        dockBtn.setAttribute('aria-expanded', String(open));
      }
      dockBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setDockOpen(!dockDrawer.classList.contains('is-open'));
      });
      dockDrawer.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => setDockOpen(false));
      });
      document.addEventListener('click', (e) => {
        if (dockDrawer.classList.contains('is-open') && !dockDrawer.contains(e.target) && !dockBtn.contains(e.target)) {
          setDockOpen(false);
        }
      });
    }

    const copyOrb = document.getElementById('cinema-copy-email');
    const copyStatus = document.getElementById('copy-orb-status');
    if (copyOrb) {
      copyOrb.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText('matei64200@gmail.com'); } catch (_) {}
        if (copyStatus) {
          copyStatus.textContent = '✓ ADRESSE COPIÉE DANS LE PRESSE-PAPIERS';
          setTimeout(() => { copyStatus.textContent = 'CLIQUER POUR COPIER L’EMAIL'; }, 2400);
        }
      });
    }

    const signalToggleBtn = document.getElementById('signal-toggle-btn');
    const signalToggleLabel = document.getElementById('signal-toggle-label');
    if (signalToggleBtn) {
      signalToggleBtn.addEventListener('click', () => {
        const paused = !window.__STORY_CINEMA_STATE__.paused;
        window.__STORY_CINEMA_STATE__.paused = paused;
        document.documentElement.classList.toggle('motion-paused', paused);
        signalToggleBtn.setAttribute('aria-pressed', String(paused));
        if (signalToggleLabel) {
          signalToggleLabel.textContent = paused
            ? 'SIGNAL: PAUSED — RESUME'
            : 'SIGNAL: LIVE — PAUSE ANIMATIONS';
        }
        document.querySelectorAll('svg.blueprint-svg').forEach((svg) => {
          if (paused && typeof svg.pauseAnimations === 'function') {
            svg.pauseAnimations();
          } else if (!paused && typeof svg.unpauseAnimations === 'function') {
            svg.unpauseAnimations();
          }
        });
      });
    }

    const backTopBtn = document.getElementById('back-top-btn');
    if (backTopBtn) {
      backTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCinemaWebGL();
    initScrollChoreography();
    initCursorBrackets();
    initControls();
  });
})();
