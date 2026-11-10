/* ==========================================================================
   MATÉI DE SAINT LÉGER — MONOLITHIC WEBGL SERVICE TOTEM (STUDIO FREIGHT / SCRIB3 INSPIRED)
   Orthographic Isometric 3D Monolith | GLSL Kinetic Ribbon Shader | Elastic Wave Ripple
   ========================================================================== */

(function () {
  'use strict';

  const TOTEM_LAYERS = [
    {
      num: '01',
      label: 'C99',
      titleFr: 'SYSTÈMES &\nISO C99',
      titleEn: 'SYSTEMS &\nISO C99',
      ribbon: 'SYSTÈMES & ISO C99 ',
      descFr:
        'DÉVELOPPEMENT BAS-NIVEAU ANSI/ISO C99 SOUS -WALL -WEXTRA -WERROR. ARCHITECTURE ALLMAN STRICTE, POINTEURS SÉCURISÉS ET ZÉRO FUITE MÉMOIRE VÉRIFIÉE SOUS VALGRIND.',
      descEn:
        'STRICT ANSI/ISO C99 SYSTEMS ENGINEERING UNDER -WALL -WEXTRA -WERROR. ALLMAN ARCHITECTURE, HARDENED POINTERS AND ZERO MEMORY LEAKS VERIFIED BY VALGRIND.',
      proofFr: 'PREUVE // ALGOFORGE C99 • 100K ALLOCS = 100K FREES (0 OCTET PERDU)',
      proofEn: 'PROOF // ALGOFORGE C99 • 100K ALLOCS = 100K FREES (0 BYTES LOST)',
      ctaFr: 'AUDITER VALGRIND ↗',
      ctaEn: 'AUDIT VALGRIND ↗',
      actionType: 'terminal',
      actionPayload: 'valgrind'
    },
    {
      num: '02',
      label: 'IA/QUANT',
      titleFr: 'SWARMS IA &\nPOLYMARKET QUANT',
      titleEn: 'AI SWARMS &\nPOLYMARKET QUANT',
      ribbon: 'POLYMARKET QUANT & IA ',
      descFr:
        'MOTEUR PRÉDICTIF D\'ARBITRAGE POLYMARKET TOURNANT 24/7 SUR VPS ORACLE. CARNETS D\'ORDRES WEBSOCKETS TEMPS RÉEL (<50MS) ET ESSAIM DE 36 AGENTS AUTONOMES KAI.',
      descEn:
        '24/7 POLYMARKET PREDICTIVE ARBITRAGE ENGINE ON ORACLE VPS. REAL-TIME WEBSOCKET ORDERBOOKS (<50MS) AND 36-AGENT AUTONOMOUS KAI SWARM ORCHESTRATION.',
      proofFr: 'PREUVE // VPS 88.96.47.180 • EXÉCUTION < 50MS • TRADE LEDGER SHA-256',
      proofEn: 'PROOF // VPS 88.96.47.180 • <50MS EXECUTION • IMMUTABLE SHA-256 LEDGER',
      ctaFr: 'FLUX POLYMARKET ↗',
      ctaEn: 'POLYMARKET FEED ↗',
      actionType: 'terminal',
      actionPayload: 'polymarket'
    },
    {
      num: '03',
      label: 'APPSEC',
      titleFr: 'APPSEC &\nOPEN-SOURCE',
      titleEn: 'APPSEC &\nOPEN-SOURCE',
      ribbon: 'APPSEC & OPEN-SOURCE ',
      descFr:
        '46 PULL REQUESTS FUSIONNÉES EN PRODUCTION SUR DES RÉPOS MAJEURS. DURCISSEMENT RBAC SUR MUTATIONS METADATA, SUPPRESSION DE FAILLES XSS CWE-79 ET MASQUAGE CWE-209.',
      descEn:
        '46 PRODUCTION PRS MERGED ACROSS FLAGSHIP REPOSITORIES. STRICT RBAC MUTATION CHECKS, CWE-79 XSS SANITIZATION AND CWE-209 STACK TRACE MASKING.',
      proofFr: 'PREUVE // 46 PRS FUSIONNÉES (TWENTY 40K★ & OMI 8K★)',
      proofEn: 'PROOF // 46 MERGED PRS (TWENTY 40K★ & OMI 8K★)',
      ctaFr: 'LISTER LES PRS ↗',
      ctaEn: 'LIST MERGED PRS ↗',
      actionType: 'terminal',
      actionPayload: 'prs'
    },
    {
      num: '04',
      label: 'LINUX',
      titleFr: 'DÉMONS LINUX &\nCLOUD 24/7',
      titleEn: 'LINUX DAEMONS &\nCLOUD 24/7',
      ribbon: 'LINUX DAEMONS & 24/7 ',
      descFr:
        'ORCHESTRATION D\'INFRASTRUCTURE SOUVERAINE LINUX SANS VERROU PROPRIÉTAIRE : 19 SERVICES SYSTEMD AUTO-GUÉRIS, WATCHDOGS ACTIFS ET TUNNELS CLOUDFLARE CHIFFRÉS.',
      descEn:
        'SOVEREIGN UBUNTU 24.04 INFRASTRUCTURE WITHOUT VENDOR LOCK-IN: 19 SELF-HEALING SYSTEMD DAEMONS, ACTIVE WATCHDOGS AND ENCRYPTED CLOUDFLARE TUNNELS.',
      proofFr: 'PREUVE // UPTIME 99.98% • ORACLE CLOUD DEDICATED UBUNTU',
      proofEn: 'PROOF // 99.98% UPTIME • ORACLE CLOUD DEDICATED UBUNTU',
      ctaFr: 'VOIR INFRASTRUCTURE ↓',
      ctaEn: 'VIEW INFRASTRUCTURE ↓',
      actionType: 'scroll',
      actionPayload: '#flagships'
    },
    {
      num: '05',
      label: 'DATA',
      titleFr: 'SQLITE WAL &\nMERISE 3NF',
      titleEn: 'SQLITE WAL &\n3NF MODELING',
      ribbon: 'SQLITE WAL & MERISE 3NF ',
      descFr:
        'MODÉLISATION RELATIONNELLE NORMALISÉE 3NF (MÉTHODE MERISE R1.05), BASES VECTORIELLES DE MÉMOIRE HIÉRARCHIQUE LETTA ET JOURNAL DES TRANSACTIONS IMMUABLE SHA-256.',
      descEn:
        'NORMALIZED 3NF RELATIONAL ARCHITECTURE (MERISE MCD/MLD), LETTA HIERARCHICAL MEMORY VECTOR STORES AND APPEND-ONLY SHA-256 TRANSACTION LEDGERS.',
      proofFr: 'PREUVE // LETTA MEMORY OS • SCHÉMAS SQL 3NF IUT ANGLET',
      proofEn: 'PROOF // LETTA MEMORY OS • IUT ANGLET SQL 3NF LABS',
      ctaFr: 'VOIR PARCOURS & ADN ↓',
      ctaEn: 'VIEW DNA & SQL LABS ↓',
      actionType: 'scroll',
      actionPayload: '#parcours'
    },
    {
      num: '06',
      label: 'UI 60FPS',
      titleFr: 'INTERFACES 60FPS &\nACCESSIBILITÉ',
      titleEn: '60FPS INTERFACES &\nACCESSIBILITY',
      ribbon: 'INTERFACES 60FPS & ⌘K ',
      descFr:
        'INTERFACES VANILLA ET TYPESCRIPT HAUTE FRÉQUENCE À 60 FPS CONSTANT : PALETTE DE COMMANDE ⌘K, TERMINAL UNIX INTÉGRÉ, THÈME OP-ART NOIR & CRIMSON SUR MESURE.',
      descEn:
        'HIGH-FREQUENCY VANILLA & TYPESCRIPT INTERFACES AT LOCKED 60 FPS: ⌘K COMMAND PALETTE, INTEGRATED UNIX CLI SHELL AND BESPOKE NOIR & CRIMSON OP-ART DESIGN.',
      proofFr: 'PREUVE // CE PORTFOLIO INTERACTIF • KAI ACADEMIC DASHBOARD',
      proofEn: 'PROOF // THIS INTERACTIVE PORTFOLIO • KAI ACADEMIC DASHBOARD',
      ctaFr: 'OUVRIR TERMINAL ⌘K ↗',
      ctaEn: 'OPEN TERMINAL ⌘K ↗',
      actionType: 'terminal',
      actionPayload: 'cat cv'
    }
  ];

  // Studio Freight Stencil Brutalist Vector Numerals ("01" .. "06")
  // Chunky geometric squares with crisp circular/squircle negative eyes matching SCRIB3
  function getBrutalistNumberSVG(numStr) {
    // 0: big chunky square block with center eye hole
    const digit0 = `<g transform="translate(0,0)">
      <path d="M4,4 H78 V92 H4 Z" fill="#08080b" rx="4"/>
      <rect x="31" y="34" width="20" height="28" rx="10" fill="#ededf0"/>
    </g>`;

    const digitsRight = {
      '1': `<g transform="translate(88,0)">
        <path d="M12,4 H56 V92 H24 V30 H8 V12 Z" fill="#08080b"/>
      </g>`,
      '2': `<g transform="translate(88,0)">
        <path d="M4,4 H76 V54 H30 V66 H76 V92 H4 V34 H48 V26 H4 Z" fill="#08080b"/>
      </g>`,
      '3': `<g transform="translate(88,0)">
        <path d="M4,4 H76 V92 H4 V66 H48 V56 H22 V38 H48 V28 H4 Z" fill="#08080b"/>
      </g>`,
      '4': `<g transform="translate(88,0)">
        <path d="M4,4 H32 V38 H48 V4 H76 V92 H48 V62 H4 Z" fill="#08080b"/>
      </g>`,
      '5': `<g transform="translate(88,0)">
        <path d="M4,4 H76 V28 H30 V36 H76 V92 H4 V66 H48 V58 H4 Z" fill="#08080b"/>
      </g>`,
      '6': `<g transform="translate(88,0)">
        <path d="M4,4 H72 V26 H32 V36 H76 V92 H4 Z" fill="#08080b"/>
        <rect x="30" y="54" width="20" height="18" rx="9" fill="#ededf0"/>
      </g>`
    };

    const secondDigit = numStr.charAt(1) || '1';
    return `<svg class="totem-numeral-svg" viewBox="0 0 172 96" aria-hidden="true">${digit0}${digitsRight[secondDigit] || digitsRight['1']}</svg>`;
  }

  function getLang() {
    return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'fr';
  }

  function elasticOut(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    const p = 0.72;
    const s = p / 4;
    return Math.pow(2, -10 * t) * Math.sin(((t - s) * (2 * Math.PI)) / p) + 1;
  }

  // Create continuous high-DPI scrolling CanvasTexture for active slice faces
  function createKineticRibbonTexture(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 4096;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#060609';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Bold brutalist uppercase crimson typography filling vertical face height (matching SCRIB3 Pack marquee)
    const fontStr = '900 176px "Archivo Black", "Bebas Neue", "Impact", sans-serif';
    ctx.font = fontStr;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ef4444';

    const cleanText = text.trim().toUpperCase() + '  •  ';
    const w = Math.max(100, ctx.measureText(cleanText).width || 1200);
    const numCopies = Math.max(1, Math.round(canvas.width / w));
    const scale = canvas.width / (numCopies * w);

    ctx.save();
    ctx.scale(scale, 1);
    for (let i = 0; i < numCopies + 1; i++) {
      ctx.fillText(cleanText, i * w, canvas.height * 0.54);
    }
    ctx.restore();

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  }

  // Crossed Engineering Spanners / Wrenches on top face of Top Monolith (matching SCRIB3 crown mark)
  function createCrownMarkTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 512, 512);

    function renderSingleWrench(angle) {
      const off = document.createElement('canvas');
      off.width = 512;
      off.height = 512;
      const octx = off.getContext('2d');
      octx.translate(256, 256);
      octx.rotate(angle);
      octx.fillStyle = '#ef4444';

      // Main shaft + collar
      octx.beginPath();
      octx.roundRect(-142, -22, 284, 44, 6);
      octx.fill();

      // Left open crescent jaw outer circle
      octx.beginPath();
      octx.arc(-155, 0, 52, 0, Math.PI * 2);
      octx.fill();

      // Right open crescent jaw outer circle
      octx.beginPath();
      octx.arc(155, 0, 52, 0, Math.PI * 2);
      octx.fill();

      // Transparent cutouts using destination-out so both wrenches cross cleanly
      octx.globalCompositeOperation = 'destination-out';
      octx.beginPath();
      octx.roundRect(-220, -18, 72, 36, 4);
      octx.fill();
      octx.beginPath();
      octx.roundRect(148, -18, 72, 36, 4);
      octx.fill();

      return off;
    }

    ctx.drawImage(renderSingleWrench(Math.PI / 4), 0, 0);
    // Subtle dark halo separation where top wrench crosses bottom wrench
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.translate(256, 256);
    ctx.rotate(-Math.PI / 4);
    ctx.fillRect(-146, -28, 292, 56);
    ctx.restore();
    ctx.drawImage(renderSingleWrench(-Math.PI / 4), 0, 0);

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  }

  // Folded 4-wall continuous perimeter strip wrapping smoothly around vertical spine corner
  function createPerimeterRibbonGeometry(w, h, d) {
    const hw = w * 0.5;
    const hd = d * 0.5;
    const hh = h * 0.5;

    // Points flowing viewer-left -> center-front-spine -> viewer-right -> back -> left
    // In rotated -45deg space: +Z faces front-left, +X faces front-right!
    const corners = [
      [-hw, hd],  // Far Left
      [hw, hd],   // Front Center Spine (facing camera)
      [hw, -hd],  // Far Right
      [-hw, -hd], // Back Spine
      [-hw, hd]   // Loop closed
    ];

    const positions = [];
    const uvs = [];
    const indices = [];

    for (let i = 0; i < 4; i++) {
      const [x0, z0] = corners[i];
      const [x1, z1] = corners[i + 1];
      const u0 = i * 0.25;
      const u1 = (i + 1) * 0.25;

      const base = i * 4;
      // Top-left, Bottom-left, Bottom-right, Top-right
      positions.push(
        x0, hh, z0,
        x0, -hh, z0,
        x1, -hh, z1,
        x1, hh, z1
      );
      uvs.push(
        u0, 1.0,
        u0, 0.0,
        u1, 0.0,
        u1, 1.0
      );
      indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }

  function createKineticRibbonMaterial(texture) {
    return new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: texture },
        uTime: { value: 0 },
        uActive: { value: 0 },
        uAccent: { value: new THREE.Color('#ef4444') }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uMap;
        uniform float uTime;
        uniform float uActive;
        uniform vec3 uAccent;

        void main() {
          // Scroll across wrapped 4-wall loop with natural unstretched aspect ratio (~1.24 across 4096x256 canvas)
          vec2 scrolledUv = vec2(fract(vUv.x * 1.24 + uTime), vUv.y);
          vec4 tex = texture2D(uMap, scrolledUv);

          // Pitch black obsidian inactive base
          vec3 darkBase = vec3(0.023, 0.023, 0.035);
          vec3 activeColor = mix(darkBase, tex.rgb, 1.0);

          // Crisp hairline top/bottom border inside slice
          if (vUv.y < 0.015 || vUv.y > 0.985) {
            activeColor = mix(darkBase, uAccent * 0.55, uActive);
          }

          vec3 finalCol = mix(darkBase, activeColor, uActive);
          gl_FragColor = vec4(finalCol, 1.0);
        }
      `,
      side: THREE.DoubleSide
    });
  }

  function initServiceTotem() {
    const section = document.getElementById('exploded-architecture');
    const canvas = document.getElementById('totem-webgl-canvas');
    const numberEl = document.getElementById('totem-card-number');
    const titleEl = document.getElementById('totem-card-title');
    const descEl = document.getElementById('totem-card-desc');
    const proofEl = document.getElementById('totem-card-proof');
    const ctaEl = document.getElementById('totem-card-cta');
    const counterEl = document.getElementById('totem-card-counter');
    const telemetryDots = document.querySelectorAll('.totem-telem-sq');
    const prevBtn = document.getElementById('totem-btn-prev');
    const nextBtn = document.getElementById('totem-btn-next');
    const bottomPills = document.querySelectorAll('.totem-capsule-btn');

    if (!section || !canvas) return;

    let currentIndex = 0;
    let scrambleRaf = 0;

    // ---------------------------------------------------------
    // 1. Editorial Card Update + Studio Freight Kinetic Scramble
    // ---------------------------------------------------------
    function scrambleText(el, targetText, durationMs = 240) {
      if (!el) return;
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/•<>#';
      const start = performance.now();
      const len = targetText.length;

      function frame(now) {
        const p = Math.min(1, (now - start) / durationMs);
        const revealCount = Math.floor(p * len);
        let out = '';
        for (let i = 0; i < len; i++) {
          const ch = targetText[i];
          if (ch === ' ' || ch === '\n' || i < revealCount) {
            out += ch;
          } else {
            out += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        el.textContent = out;
        if (p < 1) {
          scrambleRaf = requestAnimationFrame(frame);
        } else {
          el.textContent = targetText;
        }
      }
      cancelAnimationFrame(scrambleRaf);
      scrambleRaf = requestAnimationFrame(frame);
    }

    function updateCardUI(idx, animate = true) {
      const layer = TOTEM_LAYERS[idx];
      const lang = getLang();

      if (numberEl) {
        numberEl.innerHTML = getBrutalistNumberSVG(layer.num);
        if (animate) {
          numberEl.classList.remove('is-flipping');
          void numberEl.offsetWidth;
          numberEl.classList.add('is-flipping');
        }
      }

      if (titleEl) {
        titleEl.innerHTML = (lang === 'en' ? layer.titleEn : layer.titleFr).replace(/\n/g, '<br/>');
      }

      const targetDesc = lang === 'en' ? layer.descEn : layer.descFr;
      if (descEl) {
        if (animate) {
          scrambleText(descEl, targetDesc, 240);
        } else {
          descEl.textContent = targetDesc;
        }
      }

      if (proofEl) {
        proofEl.textContent = lang === 'en' ? layer.proofEn : layer.proofFr;
      }

      if (ctaEl) {
        ctaEl.textContent = lang === 'en' ? layer.ctaEn : layer.ctaFr;
        ctaEl.onclick = function () {
          if (layer.actionType === 'terminal') {
            const termBtn = document.getElementById('terminal-pill-btn');
            const termInput = document.getElementById('terminal-input');
            if (termBtn) termBtn.click();
            if (termInput) {
              setTimeout(() => {
                termInput.value = layer.actionPayload;
                termInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
              }, 260);
            }
          } else {
            const dest = document.querySelector(layer.actionPayload);
            if (dest) dest.scrollIntoView({ behavior: 'smooth' });
          }
        };
      }

      if (counterEl) {
        counterEl.textContent = `${layer.num}/06`;
      }

      // 3-square vertical telemetry progress indicator
      telemetryDots.forEach((sq, i) => {
        const mapped = Math.floor((idx / 5) * 2.99);
        sq.classList.toggle('active', i === mapped);
      });

      // Boundary dimming matching SCRIB3 viewfinder aesthetic (still wraps or clicks cleanly)
      if (prevBtn) prevBtn.classList.toggle('is-boundary', idx === 0);
      if (nextBtn) nextBtn.classList.toggle('is-boundary', idx === TOTEM_LAYERS.length - 1);

      // Update Bottom Capsule Pills
      bottomPills.forEach((btn, i) => {
        btn.classList.toggle('active', i === idx);
      });
    }

    // ---------------------------------------------------------
    // 2. Three.js WebGL Orthographic Isometric Monolith
    // ---------------------------------------------------------
    let webglReady = false;
    let sliceObjects = [];
    let raycaster = null;
    let pointer = { x: 0, y: 0 };
    let camera, scene, renderer, totemRoot;
    let hoverTilt = { x: 0, y: 0, targetX: 0, targetY: 0 };

    function initWebGL() {
      if (typeof THREE === 'undefined') return false;

      try {
        renderer = new THREE.WebGLRenderer({
          canvas: canvas,
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

        scene = new THREE.Scene();

        // Orthographic camera ensures crisp architectural CAD/Isometric lines (zero perspective warp)
        camera = new THREE.OrthographicCamera(-4, 4, 4, -4, 0.1, 100);
        camera.position.set(0, 0, 12);
        camera.lookAt(0, 0, 0);

        // Monolith container rotated into Studio Freight's exact isometric angle
        totemRoot = new THREE.Group();
        totemRoot.rotation.set(Math.PI / 6.2, -Math.PI / 4, 0);
        scene.add(totemRoot);

        const W = 2.65;
        const D = 2.65;
        const H = 0.62;
        const gap = 0.032;
        const step = H + gap;
        const topStartY = ((TOTEM_LAYERS.length - 1) * step) / 2;

        const coreGeo = new THREE.BoxGeometry(W - 0.02, H - 0.015, D - 0.02);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0x060609 });

        const edgesGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(W + 0.028, H, D + 0.028));
        const ribbonGeo = createPerimeterRibbonGeometry(W + 0.02, H * 0.88, D + 0.02);

        TOTEM_LAYERS.forEach((layer, idx) => {
          const sliceGroup = new THREE.Group();
          sliceGroup.position.set(0, topStartY - idx * step, 0);

          // 1. Solid obsidian core
          const coreMesh = new THREE.Mesh(coreGeo, coreMat);
          coreMesh.userData = { layerIndex: idx };
          sliceGroup.add(coreMesh);

          // 2. Crisp wireframe edge borders
          const edgeMat = new THREE.LineBasicMaterial({
            color: idx === 0 ? 0xef4444 : 0xffffff,
            transparent: true,
            opacity: idx === 0 ? 0.85 : 0.24
          });
          const edgeLines = new THREE.LineSegments(edgesGeo, edgeMat);
          sliceGroup.add(edgeLines);

          // 3. Folded 4-wall kinetic marquee ribbon
          const tex = createKineticRibbonTexture(layer.ribbon);
          const ribbonMat = createKineticRibbonMaterial(tex);
          ribbonMat.uniforms.uActive.value = idx === 0 ? 1.0 : 0.0;
          const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
          ribbonMesh.userData = { layerIndex: idx };
          sliceGroup.add(ribbonMesh);

          // 4. Crossed Engineering Wrenches on top face of Block 0
          if (idx === 0) {
            const markTex = createCrownMarkTexture();
            const markGeo = new THREE.PlaneGeometry(W * 0.62, D * 0.62);
            const markMat = new THREE.MeshBasicMaterial({
              map: markTex,
              transparent: true
            });
            const markMesh = new THREE.Mesh(markGeo, markMat);
            markMesh.rotation.x = -Math.PI / 2;
            markMesh.position.y = H * 0.5 + 0.006;
            sliceGroup.add(markMesh);
          }

          totemRoot.add(sliceGroup);
          sliceObjects.push({
            group: sliceGroup,
            core: coreMesh,
            edgeMat: edgeMat,
            ribbonMat: ribbonMat,
            activeVal: idx === 0 ? 1.0 : 0.0,
            targetActive: idx === 0 ? 1.0 : 0.0,
            twistAnim: null
          });
        });

        raycaster = new THREE.Raycaster();
        resizeCanvas();
        return true;
      } catch (err) {
        console.warn('[Totem3D] WebGL init fallback:', err);
        return false;
      }
    }

    function resizeCanvas() {
      if (!renderer || !camera || !canvas) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = Math.max(300, rect.width);
      const h = Math.max(400, rect.height);
      renderer.setSize(w, h, false);

      const aspect = w / h;
      const frustumH = 6.2;
      const frustumW = frustumH * aspect;
      camera.left = -frustumW / 2;
      camera.right = frustumW / 2;
      camera.top = frustumH / 2;
      camera.bottom = -frustumH / 2;
      camera.updateProjectionMatrix();

      // Offset Totem gently right on wide desktop screens so Floating Card overlaps its left edge (SCRIB3 signature)
      if (totemRoot) {
        totemRoot.position.x = window.innerWidth > 980 ? frustumW * 0.13 : 0;
        totemRoot.position.y = -0.05;
      }
    }

    function triggerSliceTwistWave(targetIdx, direction) {
      const now = performance.now();
      const rotSign = direction >= 0 ? 1 : -1;

      sliceObjects.forEach((s, i) => {
        s.targetActive = i === targetIdx ? 1.0 : 0.0;
        const dist = Math.abs(i - targetIdx);
        // Active slice makes dramatic 90 deg (+PI/2) snap twist, neighboring slices cascade dynamically
        const targetAngle = rotSign * (Math.PI / 2);
        s.twistAnim = {
          startTime: now + dist * 65, // Staggered wave delay in ms
          duration: 1450,
          fromY: 0,
          deltaY: targetAngle
        };
      });
    }

    function selectSlice(nextIdx, forceDirection) {
      const len = TOTEM_LAYERS.length;
      const wrappedIdx = ((nextIdx % len) + len) % len;
      if (wrappedIdx === currentIndex && !forceDirection) return;

      const dir = forceDirection || (wrappedIdx > currentIndex ? 1 : -1);
      currentIndex = wrappedIdx;
      updateCardUI(currentIndex, true);
      if (webglReady) {
        triggerSliceTwistWave(currentIndex, dir);
      }
    }

    webglReady = initWebGL();
    updateCardUI(0, false);

    if (webglReady && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        sliceObjects.forEach((s, idx) => {
          const oldTex = s.ribbonMat.uniforms.uMap.value;
          const freshTex = createKineticRibbonTexture(TOTEM_LAYERS[idx].ribbon);
          s.ribbonMat.uniforms.uMap.value = freshTex;
          if (oldTex && oldTex.dispose) oldTex.dispose();
        });
      });
    }

    // ---------------------------------------------------------
    // 3. Animation Render Loop (60fps GLSL & Elastic Physics)
    // ---------------------------------------------------------
    let lastTime = performance.now();
    function animate(now) {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (webglReady && renderer && scene && camera) {
        // Gentle gyroscope mouse tilt
        hoverTilt.x += (hoverTilt.targetX - hoverTilt.x) * 0.08;
        hoverTilt.y += (hoverTilt.targetY - hoverTilt.y) * 0.08;
        if (totemRoot) {
          totemRoot.rotation.x = Math.PI / 6.2 + hoverTilt.y * 0.06;
          totemRoot.rotation.y = -Math.PI / 4 + hoverTilt.x * 0.09;
        }

        sliceObjects.forEach((s, i) => {
          // Scroll continuous marquee text horizontally across active face perimeter
          s.ribbonMat.uniforms.uTime.value += dt * 0.14;

          // Smooth active band illumination blend
          s.activeVal += (s.targetActive - s.activeVal) * Math.min(1, dt * 10);
          s.ribbonMat.uniforms.uActive.value = s.activeVal;

          // Edge glow intensity shift
          const targetOp = 0.22 + s.activeVal * 0.65;
          s.edgeMat.opacity += (targetOp - s.edgeMat.opacity) * 0.15;
          if (s.activeVal > 0.35) {
            s.edgeMat.color.setHex(0xef4444);
          } else {
            s.edgeMat.color.setHex(0xffffff);
          }

          // Elastic Overshoot Y-Axis Twist
          if (s.twistAnim) {
            const elapsed = now - s.twistAnim.startTime;
            if (elapsed >= 0) {
              const p = Math.min(1, elapsed / s.twistAnim.duration);
              const eased = elasticOut(p);
              s.group.rotation.y = s.twistAnim.fromY + s.twistAnim.deltaY * eased;
              if (p >= 1) {
                s.group.rotation.y = 0; // Seamless 90-degree square symmetry lock
                s.twistAnim = null;
              }
            }
          }
        });

        renderer.render(scene, camera);
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    // ---------------------------------------------------------
    // 4. Interaction Event Bindings (Arrows, Click Raycaster, Pills, Scroll)
    // ---------------------------------------------------------
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) selectSlice(currentIndex - 1, -1);
        else selectSlice(TOTEM_LAYERS.length - 1, -1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex < TOTEM_LAYERS.length - 1) selectSlice(currentIndex + 1, 1);
        else selectSlice(0, 1);
      });
    }

    bottomPills.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        selectSlice(idx, idx > currentIndex ? 1 : -1);
      });
    });

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      hoverTilt.targetX = pointer.x;
      hoverTilt.targetY = pointer.y;

      if (raycaster && camera) {
        raycaster.setFromCamera(pointer, camera);
        const pickables = sliceObjects.map((s) => s.core);
        const hits = raycaster.intersectObjects(pickables, false);
        canvas.style.cursor = hits.length > 0 ? 'pointer' : 'grab';
      }
    });

    canvas.addEventListener('mouseleave', () => {
      hoverTilt.targetX = 0;
      hoverTilt.targetY = 0;
    });

    canvas.addEventListener('click', (e) => {
      if (!raycaster || !camera) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const pickables = sliceObjects.map((s) => s.core);
      const hits = raycaster.intersectObjects(pickables, false);
      if (hits.length > 0) {
        const hitIdx = hits[0].object.userData.layerIndex;
        if (typeof hitIdx === 'number') {
          selectSlice(hitIdx, hitIdx >= currentIndex ? 1 : -1);
        }
      }
    });

    // Expose global selection hook for Command Palette / Tests
    window.__totemSelectSlice = function (idx) {
      selectSlice(idx, 1);
    };

    // Keyboard navigation when viewing section
    window.addEventListener('keydown', (e) => {
      const r = section.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.7 && r.bottom > window.innerHeight * 0.3) {
        if (e.key === 'ArrowRight') {
          selectSlice(currentIndex + 1, 1);
        } else if (e.key === 'ArrowLeft') {
          selectSlice(currentIndex - 1, -1);
        }
      }
    });

    window.addEventListener('resize', resizeCanvas, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServiceTotem);
  } else {
    initServiceTotem();
  }
})();
