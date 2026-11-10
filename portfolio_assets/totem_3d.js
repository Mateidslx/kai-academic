/* ==========================================================================
   MATÉI DE SAINT LÉGER — FISSURED RETRO MONOLITH TOTEM (WEBGL BAYER DITHER + 3D)
   Chamfered Octagonal Fault-Shifted Slabs | Retro 8x8 Bayer Stain | Elastic Ripple
   ========================================================================== */

(function () {
  'use strict';

  const TOTEM_LAYERS = [
    {
      num: '01',
      label: 'C99',
      roleFr: 'BAS-NIVEAU • RIGUEUR IUT',
      roleEn: 'LOW-LEVEL • IUT RIGOR',
      titleFr: 'SYSTÈMES &\nISO C99',
      titleEn: 'SYSTEMS &\nISO C99',
      ribbon: 'SYSTÈMES & ISO C99 ',
      descFr:
        'Développement ISO C99 strict (-Wall -Wextra -Werror) avec pointeurs durcis, arbres syntaxiques AST et gestion mémoire manuelle.',
      descEn:
        'Strict ISO C99 engineering (-Wall -Wextra -Werror) with hardened pointers, AST trees and manual heap lifecycle.',
      buildsFr: 'lru_cache.c O(1) • dijkstra_graph.c • Transpileur AlgoForge Pro',
      buildsEn: 'lru_cache.c O(1) • dijkstra_graph.c • AlgoForge Pro Transpiler',
      proofFr: 'Valgrind : 0 octet perdu / 0 erreur • Flags -Wall -Wextra -Werror',
      proofEn: 'Valgrind: 0 bytes lost / 0 errors • Flags -Wall -Wextra -Werror',
      tags: ['ISO C99', 'VALGRIND', 'GDB / MAKEFILE'],
      ctaFr: 'TEST VALGRIND ↗',
      ctaEn: 'VALGRIND TRACE ↗',
      actionType: 'terminal',
      actionPayload: 'valgrind',
      faultOffset: { x: 0.04, z: -0.03, rotY: 0.015 }
    },
    {
      num: '02',
      label: 'IA/QUANT',
      roleFr: 'QUANT • DEEP LEARNING • 24/7',
      roleEn: 'QUANT • DEEP LEARNING • 24/7',
      titleFr: 'SWARMS IA &\nPOLYMARKET',
      titleEn: 'AI SWARMS &\nPOLYMARKET',
      ribbon: 'POLYMARKET QUANT & IA ',
      descFr:
        'Pipeline quantitatif météo & carnet d\'ordres temps réel, réseaux PyTorch probabilistes et essaim autonome de 36 agents Kai.',
      descEn:
        'Real-time weather & orderbook quant pipeline, probabilistic PyTorch nets and 36-agent autonomous Kai swarm.',
      buildsFr: 'GMM-MDN (466k prév.) • TCN BTC 30×32 • Kill-Switch V43 Look-Ahead',
      buildsEn: 'GMM-MDN (466k forecasts) • TCN BTC 30×32 • V43 Look-Ahead Kill-Switch',
      proofFr: 'RMSE 0.677°C • ECE PAV 1.43% • PBO/CSCV PASS • Flat Sizing 1,00 $',
      proofEn: 'RMSE 0.677°C • ECE PAV 1.43% • PBO/CSCV PASS • Strict $1 Flat Sizing',
      tags: ['PYTORCH', 'WEBSOCKET CLOB', 'WALK-FORWARD'],
      ctaFr: 'FLUX CLOB ↗',
      ctaEn: 'CLOB STREAM ↗',
      actionType: 'terminal',
      actionPayload: 'polymarket',
      faultOffset: { x: -0.07, z: 0.05, rotY: -0.025 }
    },
    {
      num: '03',
      label: 'APPSEC',
      roleFr: 'SÉCURITÉ AST • UPSTREAM PRS',
      roleEn: 'AST SECURITY • UPSTREAM PRS',
      titleFr: 'APPSEC &\nOPEN-SOURCE',
      titleEn: 'APPSEC &\nOPEN-SOURCE',
      ribbon: 'APPSEC & 46 PRS ',
      descFr:
        'Audit statique de vulnérabilités, verrouillage strict RBAC, assainissement des entrées et revues quotidiennes en production.',
      descEn:
        'Static vulnerability analysis, strict RBAC enforcement, input sanitization and production upstream engineering.',
      buildsFr: 'SafePath-Lint (SPL001..004) • Omi 7 PRs (#14604..#20168) • Twenty #26490',
      buildsEn: 'SafePath-Lint (SPL001..004) • Omi 7 PRs (#14604..#20168) • Twenty #26490',
      proofFr: '46 PRs fusionnées • Neutralisation CWE-22, CWE-79 (XSS) & CWE-209',
      proofEn: '46 Merged PRs • CWE-22, CWE-79 (XSS) & CWE-209 Mitigated',
      tags: ['AST PYTHON', 'CWE-22 / RBAC', 'TYPESCRIPT'],
      ctaFr: 'VOIR PRS ↗',
      ctaEn: 'VIEW PRS ↗',
      actionType: 'terminal',
      actionPayload: 'prs',
      faultOffset: { x: 0.08, z: 0.04, rotY: 0.03 }
    },
    {
      num: '04',
      label: 'LINUX',
      roleFr: 'SYSADMIN • VÉRIFICATION PHYSIQUE',
      roleEn: 'SYSADMIN • PHYSICAL STATE CHECKS',
      titleFr: 'LINUX &\nKAI CORE OS',
      titleEn: 'LINUX &\nKAI CORE OS',
      ribbon: 'SYSTEMD & KAI CORE OS ',
      descFr:
        'Exploitation Ubuntu 24.04 avec vérificateur d\'état physique post-action (StateVerifier), daemons systemd auto-guéris et pipelines B2B.',
      descEn:
        'Ubuntu 24.04 operations with deterministic post-action verification (StateVerifier), self-healing systemd units and B2B pipelines.',
      buildsFr: 'StateVerifier (%PDF-/SQLite/ADB) • Extracteur B2B sans hallucination',
      buildsEn: 'StateVerifier (%PDF-/SQLite/ADB) • Zero-Hallucination B2B Extractor',
      proofFr: '735 tests unitaires B2B ancrés mot-à-mot • Services Ubuntu 24/7',
      proofEn: '735 word-grounded B2B unit tests • Ubuntu 24/7 systemd services',
      tags: ['UBUNTU 24.04', 'STATE VERIFIER', 'VPS ORACLE'],
      ctaFr: 'VOIR ÉTUDE #04 ↓',
      ctaEn: 'CASE STUDY #04 ↓',
      actionType: 'scroll',
      actionPayload: '#case-kai',
      faultOffset: { x: -0.06, z: -0.06, rotY: -0.02 }
    },
    {
      num: '05',
      label: 'DATA',
      roleFr: 'DATA ARCHITECTURE • TRAÇABILITÉ',
      roleEn: 'DATA ARCHITECTURE • TRACEABILITY',
      titleFr: 'SQLITE WAL &\nMERISE 3NF',
      titleEn: 'SQLITE WAL &\nMERISE 3NF',
      ribbon: 'SQLITE WAL & 3NF ',
      descFr:
        'Modélisation conceptuelle MCD/MLD en 3e forme normale, indexation plein texte FTS5 BM25 et journaux d\'audit cryptographiques SHA-256.',
      descEn:
        'Conceptual MCD/MLD 3NF database modeling, FTS5 BM25 indexing and cryptographically chained SHA-256 audit ledgers.',
      buildsFr: 'academic_vault.db (2 018+ entités) • Registre Audit SHA-256 & SPRT',
      buildsEn: 'academic_vault.db (2,018+ entities) • SHA-256 Ledger & SPRT Drift',
      proofFr: 'SQLite WAL ACID • Normalisation 3NF stricte • Parité live/replay 0.00',
      proofEn: 'SQLite WAL ACID • Strict 3NF Normalization • 0.00 Live/Replay Parity',
      tags: ['MERISE 3NF', 'FTS5 BM25', 'SHA-256'],
      ctaFr: 'AUDIT ÉTAT ↗',
      ctaEn: 'STATE VERIFY ↗',
      actionType: 'terminal',
      actionPayload: 'verify',
      faultOffset: { x: 0.05, z: -0.05, rotY: 0.02 }
    },
    {
      num: '06',
      label: 'UI 60FPS',
      roleFr: 'FRONTEND • ERGONOMIE COGNITIVE',
      roleEn: 'FRONTEND • COGNITIVE UX',
      titleFr: 'UI 60FPS &\nSHELL CLI',
      titleEn: '60FPS UI &\nSHELL CLI',
      ribbon: 'UI 60FPS • SHELL CLI ',
      descFr:
        'Interfaces Vanilla JS, React et Tauri haute fréquence, axées sur la clarté cognitive (Lexend) et pilotables 100 % au clavier.',
      descEn:
        'High-frequency Vanilla JS, React & Tauri interfaces tailored for cognitive clarity and full keyboard navigation.',
      buildsFr: 'Kai Academic (79 pages) • ZenTable Pro (React 19) • Pdf-helper (Tauri)',
      buildsEn: 'Kai Academic (79 pages) • ZenTable Pro (React 19) • Pdf-helper (Tauri)',
      proofFr: 'Palette clavier ⌘K • Cartes HUPI Leaflet/D3.js • Shaders WebGL GLSL',
      proofEn: '⌘K Command Palette • HUPI Leaflet/D3.js • WebGL GLSL Shaders',
      tags: ['REACT 19 / TS', 'WEBGL GLSL', 'TAURI / LEAFLET'],
      ctaFr: 'SHELL ⌘K ↗',
      ctaEn: 'SHELL ⌘K ↗',
      actionType: 'terminal',
      actionPayload: 'cat cv',
      faultOffset: { x: -0.03, z: 0.06, rotY: -0.015 }
    }
  ];

  // Studio Freight Stencil Brutalist Vector Numerals ("01" .. "06")
  function getBrutalistNumberSVG(numStr) {
    const digit0 = `<g transform="translate(0,0)">
      <path d="M4,4 H78 V92 H4 Z" fill="#08080b" />
      <rect x="31" y="34" width="20" height="28" rx="10" fill="#ededf0"/>
    </g>`;

    const digitsRight = {
      '1': `<g transform="translate(88,0)"><path d="M12,4 H56 V92 H24 V30 H8 V12 Z" fill="#08080b"/></g>`,
      '2': `<g transform="translate(88,0)"><path d="M4,4 H76 V54 H30 V66 H76 V92 H4 V34 H48 V26 H4 Z" fill="#08080b"/></g>`,
      '3': `<g transform="translate(88,0)"><path d="M4,4 H76 V92 H4 V66 H48 V56 H22 V38 H48 V28 H4 Z" fill="#08080b"/></g>`,
      '4': `<g transform="translate(88,0)"><path d="M4,4 H32 V38 H48 V4 H76 V92 H48 V62 H4 Z" fill="#08080b"/></g>`,
      '5': `<g transform="translate(88,0)"><path d="M4,4 H76 V28 H30 V36 H76 V92 H4 V66 H48 V58 H4 Z" fill="#08080b"/></g>`,
      '6': `<g transform="translate(88,0)"><path d="M4,4 H72 V26 H32 V36 H76 V92 H4 Z" fill="#08080b"/><rect x="30" y="54" width="20" height="18" rx="9" fill="#ededf0"/></g>`
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
    const p = 0.75;
    const s = p / 4;
    return Math.pow(2, -10 * t) * Math.sin(((t - s) * (2 * Math.PI)) / p) + 1;
  }

  // Full-Bleed Monumental Ribbon CanvasTexture (Seamless Periodic Tiling, Zero Chopped Letters)
  function createKineticRibbonTexture(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#060609';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Authentic weight 400 Archivo Black (matches Google Fonts static weight -> zero faux-bold bloat)
    const fontStr = '400 156px "Archivo Black", "Bebas Neue", "Impact", sans-serif';
    ctx.font = fontStr;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ef4444';

    const cleanText = text.trim().toUpperCase() + '  •  ';
    const rawW = Math.max(120, ctx.measureText(cleanText).width || 1100);
    const numCopies = Math.max(1, Math.round(canvas.width / rawW));
    const scale = canvas.width / (numCopies * rawW);

    ctx.save();
    ctx.scale(scale, 1);
    // Draw clean wrapping copies across exact [0, 2048] boundary so u=1 -> u=0 loops seamlessly
    for (let i = -1; i <= numCopies + 1; i++) {
      ctx.fillText(cleanText, i * rawW, canvas.height * 0.54);
    }
    ctx.restore();

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.generateMipmaps = false;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  }

  // Procedural Seismic Fissure Crack Map for Dark Inactive & Stone Faces
  function createFissureVeinsTexture(seed) {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3.5;

    for (let k = 0; k < 8; k++) {
      let cx = ((k * 257 + seed * 173) % 1920) + 60;
      let cy = (k % 2 === 0) ? 0 : 256;
      const dy = (k % 2 === 0) ? 46 : -46;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      for (let step = 0; step < 5; step++) {
        cx += ((step + k + seed) % 2 === 0 ? 22 : -18);
        cy += dy;
        ctx.lineTo(cx, cy);
      }
      ctx.stroke();

      // Secondary branching micro-fissure
      if (k % 2 === 0) {
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - 12, cy - dy * 1.5);
        ctx.lineTo(cx + 38, cy - dy * 2.5);
        ctx.stroke();
        ctx.lineWidth = 3.5;
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  }

  // Crossed Engineering Wrenches on top beveled octagon of Slice 01
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

      octx.beginPath();
      octx.roundRect(-142, -22, 284, 44, 6);
      octx.fill();

      octx.beginPath();
      octx.arc(-155, 0, 52, 0, Math.PI * 2);
      octx.fill();

      octx.beginPath();
      octx.arc(155, 0, 52, 0, Math.PI * 2);
      octx.fill();

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

  // Octagonal Chamfered 2D Points (eliminating flat square corners -> chiseled monolithic slab)
  function getOctagonPoints(w, d, chamfer) {
    const hw = w * 0.5;
    const hd = d * 0.5;
    const sw = hw - chamfer;
    const sd = hd - chamfer;

    // Ordered clockwise from viewer-left wall across front beveled center spine
    return [
      [-sw, hd],   // Front-Left start
      [sw, hd],    // Front-Left end -> Center Front Chamfer!
      [hw, sd],    // Front-Right start
      [hw, -sd],   // Front-Right end -> Right Chamfer
      [sw, -hd],   // Back-Right start
      [-sw, -hd],  // Back-Right end -> Back Left Chamfer
      [-hw, -sd],  // Back-Left start
      [-hw, sd]    // Back-Left end
    ];
  }

  // Sculpted Extruded Chamfered Octagonal Monolith Geometry
  function createOctagonSlabGeometry(w, h, d, chamfer, bevelSize = 0.0) {
    const pts = getOctagonPoints(w, d, chamfer);
    const shape = new THREE.Shape();
    shape.moveTo(pts[0][0], -pts[0][1]);
    for (let i = 1; i < pts.length; i++) {
      shape.lineTo(pts[i][0], -pts[i][1]);
    }
    shape.closePath();

    const extrudeDepth = h - (bevelSize * 2);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: extrudeDepth,
      bevelEnabled: bevelSize > 0,
      bevelSegments: 1,
      steps: 1,
      bevelSize: bevelSize,
      bevelThickness: bevelSize
    });
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, -extrudeDepth * 0.5, 0);
    return geo;
  }

  // 8-Segment Seamless Perimeter Ribbon Wrapping Around Octagonal Walls & Front Chamfer Spine
  function createOctagonRibbonGeometry(w, h, d, chamfer) {
    const pts = getOctagonPoints(w, d, chamfer);
    const ring = [...pts, pts[0]];
    const hh = h * 0.5;

    // Arc-length normalized UVs so chamfer face has ZERO horizontal texture squashing
    const cumLen = [0];
    let totalLen = 0;
    for (let i = 0; i < 8; i++) {
      const dx = ring[i + 1][0] - ring[i][0];
      const dz = ring[i + 1][1] - ring[i][1];
      totalLen += Math.hypot(dx, dz);
      cumLen.push(totalLen);
    }

    const positions = [];
    const uvs = [];
    const indices = [];

    for (let i = 0; i < 8; i++) {
      const [x0, z0] = ring[i];
      const [x1, z1] = ring[i + 1];
      const u0 = cumLen[i] / totalLen;
      const u1 = cumLen[i + 1] / totalLen;

      const base = i * 4;
      positions.push(
        x0, hh, z0,
        x0, -hh, z0,
        x1, -hh, z1,
        x1, hh, z1
      );
      uvs.push(u0, 1.0, u0, 0.0, u1, 0.0, u1, 1.0);
      indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return { geo, perimeter: totalLen };
  }

  // Retro Bayer 4x4 + Fissure Crack + Full-Height Kinetic Ribbon Fragment Shader
  function createKineticRibbonMaterial(textTex, fissureTex, perimeter, bandHeight) {
    const texRatio = 2048 / 256;
    const worldRatio = perimeter / bandHeight;
    // Exact integer repeat ensures zero chopped letters or jump glitches across the UV wrap seam
    const repeatFactor = Math.max(1.0, Math.round(worldRatio / texRatio));

    return new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: textTex },
        uFissure: { value: fissureTex },
        uScroll: { value: 0 },
        uPulseTime: { value: 0 },
        uActive: { value: 0 },
        uRepeatX: { value: repeatFactor },
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
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D uMap;
        uniform sampler2D uFissure;
        uniform float uScroll;
        uniform float uPulseTime;
        uniform float uActive;
        uniform float uRepeatX;
        uniform vec3 uAccent;

        float bayer4x4(vec2 p) {
          int x = int(mod(p.x, 4.0));
          int y = int(mod(p.y, 4.0));
          int idx = x + y * 4;
          if (idx == 0) return 0.0/16.0;
          if (idx == 1) return 8.0/16.0;
          if (idx == 2) return 2.0/16.0;
          if (idx == 3) return 10.0/16.0;
          if (idx == 4) return 12.0/16.0;
          if (idx == 5) return 4.0/16.0;
          if (idx == 6) return 14.0/16.0;
          if (idx == 7) return 6.0/16.0;
          if (idx == 8) return 3.0/16.0;
          if (idx == 9) return 11.0/16.0;
          if (idx == 10) return 1.0/16.0;
          if (idx == 11) return 9.0/16.0;
          if (idx == 12) return 15.0/16.0;
          if (idx == 13) return 7.0/16.0;
          if (idx == 14) return 13.0/16.0;
          return 5.0/16.0;
        }

        void main() {
          vec2 scrolledUv = vec2(fract(vUv.x * uRepeatX + uScroll), vUv.y);
          vec4 textSample = texture2D(uMap, scrolledUv);
          float crack = texture2D(uFissure, vec2(fract(vUv.x * 2.0), vUv.y)).r;

          // Retro Bayer dithered obsidian texture & glowing tectonic fissures on inactive slabs
          vec2 pix = floor(gl_FragCoord.xy / 3.0);
          float d = bayer4x4(pix);
          float pulse = 0.55 + 0.45 * sin(uPulseTime * 1.8 + vUv.x * 6.2831853);
          float ditherCrack = step(d, crack * 0.65 * pulse);

          vec3 darkBase = vec3(0.022, 0.022, 0.032);
          vec3 inactiveStone = darkBase + vec3(0.02, 0.02, 0.026) * step(d, 0.14);
          vec3 inactiveFissure = mix(inactiveStone, uAccent * 0.48, ditherCrack);

          // Unbroken razor-sharp active kinetic typography (no static cracks slicing letters)
          vec3 activeCol = textSample.rgb;

          vec3 finalCol = mix(inactiveFissure, activeCol, uActive);
          gl_FragColor = vec4(finalCol, 1.0);
        }
      `,
      side: THREE.FrontSide
    });
  }

  // Clean Ordered 8x8 Bayer Halftone Nebula Shader (V29 Crisp Look + Smooth Cursor Ripple)
  function createRetroStainMaterial() {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1440, 620) },
        uMouse: { value: new THREE.Vector2(0.64, 0.48) },
        uColor: { value: new THREE.Color('#ef4444') }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.99, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform vec3 uColor;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }

        // Exact 8x8 Bayer Ordered Dithering Matrix (Crisp 1-bit CRT Halftone Grid)
        float bayer8(vec2 pos) {
          int x = int(mod(pos.x, 8.0));
          int y = int(mod(pos.y, 8.0));
          float val = 0.0;
          int xi = x; int yi = y;
          val += float(((xi ^ yi) & 1) * 2 + (yi & 1)) * 16.0;
          xi >>= 1; yi >>= 1;
          val += float(((xi ^ yi) & 1) * 2 + (yi & 1)) * 4.0;
          xi >>= 1; yi >>= 1;
          val += float(((xi ^ yi) & 1) * 2 + (yi & 1)) * 1.0;
          return val / 64.0;
        }

        void main() {
          float gran = 5.0; // Clean uniform Bayer matrix spacing
          vec2 pixCoord = floor(gl_FragCoord.xy / gran);
          vec2 uvPix = (pixCoord * gran) / max(uResolution, vec2(1.0));

          float aspect = uResolution.x / max(1.0, uResolution.y);
          vec2 p = vec2((uvPix.x - 0.62) * aspect, uvPix.y - 0.48);

          // Gentle localized cursor gravity modulation confined strictly inside the radial halo
          vec2 m = vec2((uMouse.x - 0.62) * aspect, uMouse.y - 0.48);
          float mouseDist = length(p - m);
          float mouseRipple = exp(-mouseDist * 4.5) * 0.34;

          float n1 = noise(p * 3.2 + vec2(uTime * 0.14, -uTime * 0.1));
          float n2 = noise(p * 6.5 - vec2(uTime * 0.09, uTime * 0.15));
          float field = (n1 * 0.6 + n2 * 0.4);

          float radialFade = clamp(1.0 - length(p) * 1.15, 0.0, 1.0);
          radialFade = smoothstep(0.0, 0.9, radialFade);

          float intensity = clamp((field * 0.72 + mouseRipple) * radialFade, 0.0, 0.75);
          float threshold = bayer8(pixCoord);
          float dotMask = step(threshold, intensity);

          gl_FragColor = vec4(uColor * 0.65, dotMask * 0.52);
        }
      `,
      transparent: true,
      depthWrite: false,
      depthTest: false
    });
  }

  function initServiceTotem() {
    const section = document.getElementById('exploded-architecture');
    const canvas = document.getElementById('totem-webgl-canvas');
    const numberEl = document.getElementById('totem-card-number');
    const roleEl = document.getElementById('totem-card-role');
    const titleEl = document.getElementById('totem-card-title');
    const descEl = document.getElementById('totem-card-desc');
    const specKeyBuilds = document.getElementById('totem-spec-key-builds');
    const buildsEl = document.getElementById('totem-card-builds');
    const specKeyProof = document.getElementById('totem-spec-key-proof');
    const proofEl = document.getElementById('totem-card-proof');
    const tagsEl = document.getElementById('totem-card-tags');
    const ctaEl = document.getElementById('totem-card-cta');
    const counterEl = document.getElementById('totem-card-counter');
    const telemetryDots = document.querySelectorAll('.totem-telem-sq');
    const prevBtn = document.getElementById('totem-btn-prev');
    const nextBtn = document.getElementById('totem-btn-next');
    const bottomPills = document.querySelectorAll('.totem-capsule-btn');

    if (!section || !canvas) return;

    let currentIndex = 0;
    let scrambleRaf = 0;

    function scrambleText(el, targetText, durationMs = 200) {
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
          if (ch === ' ' || ch === '\n' || i < revealCount) out += ch;
          else out += chars[Math.floor(Math.random() * chars.length)];
        }
        el.textContent = out;
        if (p < 1) scrambleRaf = requestAnimationFrame(frame);
        else el.textContent = targetText;
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

      if (roleEl) {
        roleEl.textContent = lang === 'en' ? layer.roleEn : layer.roleFr;
      }

      if (titleEl) {
        titleEl.innerHTML = (lang === 'en' ? layer.titleEn : layer.titleFr).replace(/\n/g, '<br/>');
      }

      const targetDesc = lang === 'en' ? layer.descEn : layer.descFr;
      if (descEl) {
        if (animate) scrambleText(descEl, targetDesc, 200);
        else descEl.textContent = targetDesc;
      }

      if (specKeyBuilds) specKeyBuilds.textContent = lang === 'en' ? 'BUILDS //' : 'PROJETS //';
      if (buildsEl) buildsEl.textContent = lang === 'en' ? layer.buildsEn : layer.buildsFr;
      if (specKeyProof) specKeyProof.textContent = lang === 'en' ? 'PROOF //' : 'PREUVE //';
      if (proofEl) proofEl.textContent = lang === 'en' ? layer.proofEn : layer.proofFr;

      if (tagsEl && Array.isArray(layer.tags)) {
        tagsEl.innerHTML = layer.tags
          .map((tag) => `<span class="totem-tag-pill">${tag}</span>`)
          .join('');
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

      if (counterEl) counterEl.textContent = `${layer.num}/06`;

      telemetryDots.forEach((sq, i) => {
        const mapped = Math.floor((idx / 5) * 2.99);
        sq.classList.toggle('active', i === mapped);
      });

      if (prevBtn) prevBtn.classList.toggle('is-boundary', idx === 0);
      if (nextBtn) nextBtn.classList.toggle('is-boundary', idx === TOTEM_LAYERS.length - 1);

      bottomPills.forEach((btn, i) => {
        btn.classList.toggle('active', i === idx);
      });
    }

    // ---------------------------------------------------------
    // 2. Three.js WebGL Fissured Monolith + Retro Bayer Shader
    // ---------------------------------------------------------
    let webglReady = false;
    let sliceObjects = [];
    let raycaster = null;
    let pointer = { x: 0, y: 0 };
    let camera, scene, stainScene, stainCam, renderer, totemRoot, stainMat;
    let hoverTilt = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollTwist = 0;

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
        renderer.autoClear = false;

        scene = new THREE.Scene();

        camera = new THREE.OrthographicCamera(-4, 4, 4, -4, 0.1, 100);
        camera.position.set(0, 0, 14);
        camera.lookAt(0, 0, 0);

        // Separate Pass 1 Background Scene for Retro 8x8 Bayer Stain (never clips over Totem!)
        stainScene = new THREE.Scene();
        stainCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        stainMat = createRetroStainMaterial();
        const stainPlane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), stainMat);
        stainPlane.frustumCulled = false;
        stainScene.add(stainPlane);

        // Main Chamfered Monolith Group (Bigger & Sculpted!)
        totemRoot = new THREE.Group();
        totemRoot.rotation.set(Math.PI / 6.3, -Math.PI / 4, 0);
        scene.add(totemRoot);

        const W = 3.12;
        const D = 3.12;
        const H = 0.78;
        const chamfer = 0.42;
        const gap = 0.065; // Deeper fractured shadow gaps between strata
        const step = H + gap;
        const topStartY = ((TOTEM_LAYERS.length - 1) * step) / 2;

        const coreGeo = createOctagonSlabGeometry(W - 0.05, H, D - 0.05, chamfer, 0.0);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0x060609 });

        const edgesGeo = new THREE.EdgesGeometry(
          createOctagonSlabGeometry(W + 0.016, H + 0.008, D + 0.016, chamfer, 0.012),
          14
        );
        const bandH = H * 0.94;
        const { geo: ribbonGeo, perimeter } = createOctagonRibbonGeometry(W, bandH, D, chamfer);

        TOTEM_LAYERS.forEach((layer, idx) => {
          const sliceGroup = new THREE.Group();
          const fault = layer.faultOffset;
          sliceGroup.position.set(fault.x, topStartY - idx * step, fault.z);
          sliceGroup.userData = { baseRotY: fault.rotY, baseY: sliceGroup.position.y };
          sliceGroup.rotation.y = fault.rotY;

          // 1. Chamfered Octagonal Obsidian Core
          const coreMesh = new THREE.Mesh(coreGeo, coreMat);
          coreMesh.userData = { layerIndex: idx };
          sliceGroup.add(coreMesh);

          // 2. Razor-Sharp Chamfer Wireframes
          const edgeMat = new THREE.LineBasicMaterial({
            color: idx === 0 ? 0xef4444 : 0xffffff,
            transparent: true,
            opacity: idx === 0 ? 0.9 : 0.25
          });
          const edgeLines = new THREE.LineSegments(edgesGeo, edgeMat);
          sliceGroup.add(edgeLines);

          // 3. Full-Bleed Kinetic Ribbon + Retro Bayer Cracks Shader
          const textTex = createKineticRibbonTexture(layer.ribbon);
          const fissTex = createFissureVeinsTexture(idx + 3);
          const ribbonMat = createKineticRibbonMaterial(textTex, fissTex, perimeter, bandH);
          ribbonMat.uniforms.uActive.value = idx === 0 ? 1.0 : 0.0;
          const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
          ribbonMesh.userData = { layerIndex: idx };
          sliceGroup.add(ribbonMesh);

          // 4. Crossed Engineering Wrenches Crown Emblem on Slice 01
          if (idx === 0) {
            const markTex = createCrownMarkTexture();
            const markGeo = new THREE.PlaneGeometry(W * 0.58, D * 0.58);
            const markMat = new THREE.MeshBasicMaterial({ map: markTex, transparent: true });
            const markMesh = new THREE.Mesh(markGeo, markMat);
            markMesh.rotation.x = -Math.PI / 2;
            markMesh.position.y = H * 0.5 + 0.015;
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
        console.warn('[Totem3D] WebGL init error:', err);
        return false;
      }
    }

    function resizeCanvas() {
      if (!renderer || !camera || !canvas) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = Math.max(300, rect.width);
      const h = Math.max(380, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setSize(w, h, false);

      if (stainMat) {
        stainMat.uniforms.uResolution.value.set(w * dpr, h * dpr);
      }

      const aspect = w / h;
      // Full-frame orthographic clearance so bottom slab (06) always floats cleanly above pill dock
      const frustumH = window.innerWidth <= 980 ? 7.0 : 7.45;
      const frustumW = frustumH * aspect;
      camera.left = -frustumW / 2;
      camera.right = frustumW / 2;
      camera.top = frustumH / 2;
      camera.bottom = -frustumH / 2;
      camera.updateProjectionMatrix();

      if (totemRoot) {
        totemRoot.position.x = window.innerWidth > 980 ? frustumW * 0.172 : 0;
        totemRoot.position.y = window.innerWidth > 980 ? 0.34 : 0.04;
      }
    }

    function triggerSliceTwistWave(targetIdx, direction, fullPi) {
      const now = performance.now();
      const rotSign = direction >= 0 ? 1 : -1;
      const angleDelta = rotSign * (fullPi ? Math.PI : Math.PI / 2);

      sliceObjects.forEach((s, i) => {
        s.targetActive = i === targetIdx ? 1.0 : 0.0;
        const dist = Math.abs(i - targetIdx);
        s.twistAnim = {
          startTime: now + dist * 75,
          duration: fullPi ? 1850 : 1550,
          fromY: s.group.userData.baseRotY,
          deltaY: angleDelta
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
        triggerSliceTwistWave(currentIndex, dir, true);
      }
    }

    webglReady = initWebGL();
    updateCardUI(0, false);

    if (webglReady && document.fonts) {
      const loadFontAndRefresh = async () => {
        try {
          await document.fonts.load('400 156px "Archivo Black"');
          await document.fonts.ready;
        } catch (_) {}
        sliceObjects.forEach((s, idx) => {
          const oldTex = s.ribbonMat.uniforms.uMap.value;
          const freshTex = createKineticRibbonTexture(TOTEM_LAYERS[idx].ribbon);
          s.ribbonMat.uniforms.uMap.value = freshTex;
          if (oldTex && oldTex.dispose) oldTex.dispose();
        });
      };
      loadFontAndRefresh();
    }

    // Dramatic SCRIB3 Scroll-Entrance Cascade on Viewport Intersection
    let entrancePlayed = false;
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !entrancePlayed && webglReady) {
              entrancePlayed = true;
              triggerSliceTwistWave(currentIndex, 1, true);
            }
          });
        },
        { threshold: 0.25 }
      );
      io.observe(section);
    }

    // Track gentle scroll-linked monolith yaw angle (real continuous feedback as user scrolls!)
    window.addEventListener(
      'scroll',
      () => {
        const rect = section.getBoundingClientRect();
        const centerDist = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        scrollTwist = Math.max(-0.4, Math.min(0.4, centerDist * 0.35));
      },
      { passive: true }
    );

    // ---------------------------------------------------------
    // 3. 60fps Shader & Continuous Smooth Breathing + Twist Loop
    // ---------------------------------------------------------
    let lastTime = performance.now();
    let smoothMouse = { x: 0.62, y: 0.48, targetX: 0.62, targetY: 0.48 };

    function animate(now) {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const tSec = now * 0.001;

      if (webglReady && renderer && scene && camera) {
        if (stainMat) {
          stainMat.uniforms.uTime.value = tSec;
          const lerpFactor = Math.min(1, dt * 6.5);
          smoothMouse.x += (smoothMouse.targetX - smoothMouse.x) * lerpFactor;
          smoothMouse.y += (smoothMouse.targetY - smoothMouse.y) * lerpFactor;
          stainMat.uniforms.uMouse.value.set(smoothMouse.x, smoothMouse.y);
        }

        hoverTilt.x += (hoverTilt.targetX - hoverTilt.x) * 0.08;
        hoverTilt.y += (hoverTilt.targetY - hoverTilt.y) * 0.08;

        if (totemRoot) {
          const baseRootY = window.innerWidth > 980 ? 0.34 : 0.04;
          const idleFloatY = Math.sin(tSec * 1.15) * 0.045;
          const idleBreathRot = Math.sin(tSec * 0.7) * 0.04;
          totemRoot.position.y = baseRootY + idleFloatY;
          totemRoot.rotation.x = Math.PI / 6.3 + hoverTilt.y * 0.07;
          totemRoot.rotation.y = -Math.PI / 4 + hoverTilt.x * 0.14 + scrollTwist + idleBreathRot;
        }

        sliceObjects.forEach((s, idx) => {
          s.ribbonMat.uniforms.uScroll.value = (s.ribbonMat.uniforms.uScroll.value + dt * 0.044) % 1.0;
          s.ribbonMat.uniforms.uPulseTime.value = tSec;
          s.activeVal += (s.targetActive - s.activeVal) * Math.min(1, dt * 10);
          s.ribbonMat.uniforms.uActive.value = s.activeVal;

          // Smooth micro levitation breathing per stratum (no abrupt cursor jumps)
          const waveY = Math.sin(tSec * 1.6 + idx * 0.8) * 0.012;
          s.group.position.y = s.group.userData.baseY + waveY;

          const targetOp = 0.24 + s.activeVal * 0.68;
          s.edgeMat.opacity += (targetOp - s.edgeMat.opacity) * 0.15;
          if (s.activeVal > 0.35) s.edgeMat.color.setHex(0xef4444);
          else s.edgeMat.color.setHex(0xffffff);

          if (s.twistAnim) {
            const elapsed = now - s.twistAnim.startTime;
            if (elapsed >= 0) {
              const p = Math.min(1, elapsed / s.twistAnim.duration);
              const eased = elasticOut(p);
              s.group.rotation.y = s.twistAnim.fromY + s.twistAnim.deltaY * eased;
              if (p >= 1) {
                s.group.rotation.y = s.group.userData.baseRotY;
                s.twistAnim = null;
              }
            }
          }
        });

        renderer.clear();
        if (stainScene && stainCam) {
          renderer.render(stainScene, stainCam);
          renderer.clearDepth();
        }
        renderer.render(scene, camera);
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

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
      if (!rect.width || !rect.height) return;
      const nx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const ny = Math.max(0, Math.min(1, 1.0 - (e.clientY - rect.top) / rect.height));
      pointer.x = nx * 2 - 1;
      pointer.y = ny * 2 - 1;
      hoverTilt.targetX = pointer.x;
      hoverTilt.targetY = pointer.y;

      smoothMouse.targetX = nx;
      smoothMouse.targetY = ny;

      if (raycaster && camera) {
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(sliceObjects.map((s) => s.core), false);
        canvas.style.cursor = hits.length > 0 ? 'pointer' : 'grab';
      }
    }, { passive: true });

    canvas.addEventListener('mouseleave', () => {
      hoverTilt.targetX = 0;
      hoverTilt.targetY = 0;
      smoothMouse.targetX = 0.62;
      smoothMouse.targetY = 0.48;
    });

    canvas.addEventListener('click', (e) => {
      if (!raycaster || !camera) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(sliceObjects.map((s) => s.core), false);
      if (hits.length > 0) {
        const hitIdx = hits[0].object.userData.layerIndex;
        if (typeof hitIdx === 'number') {
          selectSlice(hitIdx, hitIdx >= currentIndex ? 1 : -1);
        }
      }
    });

    window.__totemSelectSlice = function (idx) {
      selectSlice(idx, 1);
    };

    window.addEventListener('keydown', (e) => {
      const r = section.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.7 && r.bottom > window.innerHeight * 0.3) {
        if (e.key === 'ArrowRight') selectSlice(currentIndex + 1, 1);
        else if (e.key === 'ArrowLeft') selectSlice(currentIndex - 1, -1);
      }
    });

    window.addEventListener('resize', resizeCanvas, { passive: true });
    setTimeout(resizeCanvas, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServiceTotem);
  } else {
    initServiceTotem();
  }
})();
