(function () {
  'use strict';

  var CDN_BASE = 'https://mateidslx.github.io/kai-academic/';
  var isPortalFile = location.protocol === 'file:' && /\/run\/user\/\d+\/doc\//.test(location.pathname);
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isPortalFile) {
    document.querySelectorAll('a[href^="portfolio_assets/"], a[href^="portfolio_apps/"]').forEach(function (a) {
      a.setAttribute('href', CDN_BASE + a.getAttribute('href'));
    });
  }

  /* ========================================================================
     01. TOAST & CLIPBOARD
     ======================================================================== */
  var toastEl = document.getElementById('toast');
  var toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-shown'); }, 2200);
  }

  function copyEmail(addr) {
    var text = addr || 'matei64200@gmail.com';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function () {});
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (_) {}
      document.body.removeChild(ta);
    }
    showToast('Copié : ' + text);
  }

  document.querySelectorAll('[data-copy-email]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      copyEmail(btn.getAttribute('data-copy-email'));
    });
  });

  /* ========================================================================
     02. THEME (OBSCURA DEFAULT / LIGHT OPTIONAL) + LEXEND + MOBILE DRAWER
     ======================================================================== */
  function toggleTheme() {
    var cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'obscura' : 'light';
    document.documentElement.setAttribute('data-theme', cur);
    try { localStorage.setItem('msl-obscura-theme', cur); } catch (_) {}
    showToast(cur === 'light' ? 'Mode Atelier Clair activé' : 'Mode Obscura Studio activé');
  }

  function toggleLexend() {
    var on = document.documentElement.getAttribute('data-reading') !== 'lexend';
    if (on) {
      document.documentElement.setAttribute('data-reading', 'lexend');
      try { localStorage.setItem('msl-reading', 'lexend'); } catch (_) {}
    } else {
      document.documentElement.removeAttribute('data-reading');
      try { localStorage.removeItem('msl-reading'); } catch (_) {}
    }
    showToast(on ? 'Police confort Lexend activée' : 'Typographie studio rétablie');
  }

  var btnTheme = document.getElementById('footer-theme-btn');
  var btnLexend = document.getElementById('footer-lexend-btn');
  if (btnTheme) btnTheme.addEventListener('click', toggleTheme);
  if (btnLexend) btnLexend.addEventListener('click', toggleLexend);

  var burger = document.getElementById('nav-burger');
  var drawer = document.getElementById('mobile-drawer');
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var open = drawer.hidden;
      drawer.hidden = !open;
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        drawer.hidden = true;
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ========================================================================
     03. HERO 3D WEBGL PARTICLE SCULPTURE (THREE.JS WITH 2D CANVAS FALLBACK)
         Reads presence & scroll depth at 60fps
     ======================================================================== */
  (function initHero3D() {
    var canvas = document.getElementById('hero-webgl-canvas');
    if (!canvas) return;

    var pointerX = 0, pointerY = 0;
    var scrollYRatio = 0;
    window.addEventListener('pointermove', function (e) {
      pointerX = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
      pointerY = (e.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
    }, { passive: true });
    window.addEventListener('scroll', function () {
      scrollYRatio = Math.min(1.5, window.scrollY / Math.max(1, window.innerHeight));
    }, { passive: true });

    function bootFallback2D() {
      var ctx = canvas.getContext('2d');
      if (!ctx) return;
      var w = 0, h = 0, dpr = 1;
      var pts = [];
      for (var k = 0; k < 520; k++) {
        var ang = (k / 520) * Math.PI * 6;
        var rad = 240 + 75 * Math.cos(3 * ang);
        var jx = (((k * 3571) % 100) / 100 - 0.5) * 34;
        var jy = (((k * 6133) % 100) / 100 - 0.5) * 34;
        pts.push({
          x: rad * Math.cos(2 * ang) + jx,
          y: rad * Math.sin(2 * ang) * 0.72 + jy,
          z: 130 * Math.sin(3 * ang),
          crimson: k % 5 === 0
        });
      }
      function resize2D() {
        var r = canvas.parentElement.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = r.width; h = r.height;
        canvas.width = w * dpr; canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      resize2D();
      window.addEventListener('resize', resize2D, { passive: true });
      function draw2D(t) {
        ctx.clearRect(0, 0, w, h);
        var isLight = document.documentElement.getAttribute('data-theme') === 'light';
        var rotY = (reducedMotion ? 0.5 : t * 0.00024) + pointerX * 0.35;
        var rotX = 0.28 + pointerY * 0.22 + scrollYRatio * 0.4;
        var cx = w * 0.74, cy = h * 0.46;
        var cosY = Math.cos(rotY), sinY = Math.sin(rotY);
        var cosX = Math.cos(rotX), sinX = Math.sin(rotX);

        // Orbital wireframes
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotY * 0.35);
        ctx.beginPath();
        ctx.ellipse(0, 0, Math.min(w * 0.36, 420), Math.min(h * 0.24, 175), -0.28, 0, Math.PI * 2);
        ctx.strokeStyle = isLight ? 'rgba(200, 46, 33, 0.14)' : 'rgba(226, 67, 52, 0.20)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(0, 0, Math.min(w * 0.28, 320), Math.min(h * 0.18, 130), 0.42, 0, Math.PI * 2);
        ctx.strokeStyle = isLight ? 'rgba(20, 21, 26, 0.08)' : 'rgba(243, 240, 232, 0.09)';
        ctx.stroke();
        ctx.restore();

        for (var j = 0; j < pts.length; j++) {
          var p = pts[j];
          var x1 = p.x * cosY - p.z * sinY;
          var z1 = p.x * sinY + p.z * cosY;
          var y2 = p.y * cosX - z1 * sinX;
          var z2 = p.y * sinX + z1 * cosX;
          var scale = 540 / (540 + z2);
          var sx = cx + x1 * scale;
          var sy = cy + y2 * scale;
          ctx.beginPath();
          ctx.arc(sx, sy, (p.crimson ? 2.6 : 1.55) * scale, 0, Math.PI * 2);
          ctx.fillStyle = p.crimson
            ? 'rgba(226, 67, 52,' + Math.min(0.92, 0.42 + 0.45 * scale).toFixed(2) + ')'
            : (isLight
              ? 'rgba(20, 21, 26,' + Math.min(0.32, 0.10 + 0.18 * scale).toFixed(2) + ')'
              : 'rgba(243, 240, 232,' + Math.min(0.68, 0.16 + 0.42 * scale).toFixed(2) + ')');
          ctx.fill();
        }
        if (!reducedMotion) requestAnimationFrame(draw2D);
      }
      draw2D(0);
    }

    function bootThreeWebGL() {
      if (!window.THREE) { bootFallback2D(); return; }
      try {
        var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(48, window.innerWidth / Math.max(1, window.innerHeight), 0.1, 100);
        camera.position.set(0, 0, 7.2);

        // Soft glowing circular sprite texture
        var sp = document.createElement('canvas');
        sp.width = 32; sp.height = 32;
        var sctx = sp.getContext('2d');
        var sg = sctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        sg.addColorStop(0, 'rgba(255,255,255,1)');
        sg.addColorStop(0.4, 'rgba(255,255,255,0.65)');
        sg.addColorStop(1, 'rgba(255,255,255,0)');
        sctx.fillStyle = sg;
        sctx.fillRect(0, 0, 32, 32);
        var spriteTex = new THREE.CanvasTexture(sp);

        // Sculptural Torus-Knot Particle Constellation + Dual Orbital Rings
        var count = 2100;
        var positions = new Float32Array(count * 3);
        var colors = new Float32Array(count * 3);
        var cSilver = new THREE.Color(0xf3f0e8);
        var cCrimson = new THREE.Color(0xe24334);
        var cSlate = new THREE.Color(0x6b6c7e);

        for (var i = 0; i < count; i++) {
          var t = (i / count) * Math.PI * 2 * 3;
          var p = 2, q = 3;
          var r = 2.25 + 0.72 * Math.cos(q * t);
          var jitter = ((i * 7919) % 100) / 100 - 0.5;
          var x = r * Math.cos(p * t) + jitter * 0.48;
          var y = r * Math.sin(p * t) * 0.78 + jitter * 0.40;
          var z = 0.95 * Math.sin(q * t) + jitter * 0.58;
          positions[i * 3] = x + 2.2;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = z;

          var col = i % 5 === 0 ? cCrimson : (i % 3 === 0 ? cSilver : cSlate);
          colors[i * 3] = col.r;
          colors[i * 3 + 1] = col.g;
          colors[i * 3 + 2] = col.b;
        }

        var geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        var mat = new THREE.PointsMaterial({
          size: 0.092,
          map: spriteTex,
          vertexColors: true,
          transparent: true,
          opacity: 0.72,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        });
        var cloud = new THREE.Points(geo, mat);
        scene.add(cloud);

        var ringGeo = new THREE.TorusGeometry(3.15, 0.010, 8, 128);
        var ringMat = new THREE.MeshBasicMaterial({ color: 0xe24334, transparent: true, opacity: 0.28 });
        var ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(2.2, 0, 0);
        ring.rotation.x = 1.1;
        scene.add(ring);

        var ring2Geo = new THREE.TorusGeometry(2.4, 0.007, 8, 120);
        var ring2Mat = new THREE.MeshBasicMaterial({ color: 0xf3f0e8, transparent: true, opacity: 0.12 });
        var ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ring2.position.set(2.2, 0, 0);
        ring2.rotation.y = 0.9;
        scene.add(ring2);

        function resizeGL() {
          var rect = canvas.parentElement.getBoundingClientRect();
          renderer.setSize(rect.width, rect.height, false);
          camera.aspect = rect.width / Math.max(1, rect.height);
          camera.updateProjectionMatrix();
        }
        resizeGL();
        window.addEventListener('resize', resizeGL, { passive: true });

        var rx = 0, ry = 0;
        function animateGL(now) {
          var s = reducedMotion ? 0 : now * 0.00018;
          rx += (pointerY * 0.28 + scrollYRatio * 0.45 - rx) * 0.05;
          ry += (pointerX * 0.35 + s - ry) * 0.05;
          cloud.rotation.x = rx;
          cloud.rotation.y = ry;
          ring.rotation.z = -ry * 0.7;
          ring.rotation.x = 1.05 + rx * 0.4;
          ring2.rotation.z = ry * 0.5;
          ring2.rotation.y = 0.85 - rx * 0.3;
          renderer.render(scene, camera);
          if (!reducedMotion) requestAnimationFrame(animateGL);
        }
        animateGL(0);
      } catch (_) {
        bootFallback2D();
      }
    }

    if (window.THREE) {
      bootThreeWebGL();
    } else if (isPortalFile) {
      bootFallback2D();
    } else {
      var s = document.createElement('script');
      s.src = 'portfolio_assets/vendor/three.min.js';
      s.async = true;
      s.onload = bootThreeWebGL;
      s.onerror = bootFallback2D;
      document.head.appendChild(s);
    }
  })();

  /* ========================================================================
     04. SPECULAR SPOTLIGHT + PORTRAIT TILT + SCROLL HAIRLINE
     ======================================================================== */
  if (!reducedMotion && window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.studio-card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left).toFixed(0) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top).toFixed(0) + 'px');
      }, { passive: true });
    });

    var pHalo = document.getElementById('portrait-halo');
    if (pHalo) {
      pHalo.addEventListener('pointermove', function (e) {
        var r = pHalo.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        pHalo.style.transform = 'perspective(900px) rotateY(' + (px * 7).toFixed(2) + 'deg) rotateX(' + (-py * 6).toFixed(2) + 'deg)';
      });
      pHalo.addEventListener('pointerleave', function () { pHalo.style.transform = ''; });
    }
  }

  var hairline = document.getElementById('scroll-hairline-fill');
  var navLinks = Array.from(document.querySelectorAll('.nav-links a[data-sec]'));
  var SEC_IDS = ['zenworkspace', 'opensource', 'kaicloud', 'labo', 'parcours'];
  function onScroll() {
    var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var ratio = Math.max(0, Math.min(1, window.scrollY / max));
    if (hairline) hairline.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
    var active = '';
    SEC_IDS.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.42) active = id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('data-sec') === active);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ========================================================================
     05. SCENE 02 — ZENWORKSPACE LIVE EMBED SWITCHER
     ======================================================================== */
  var zenImg = document.getElementById('zen-preview-img');
  var zenIframe = document.getElementById('zen-live-iframe');
  var zenIframeLoaded = false;

  document.querySelectorAll('[data-zen-mode]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var mode = btn.getAttribute('data-zen-mode');
      document.querySelectorAll('[data-zen-mode]').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
      });
      if (mode === 'live') {
        if (!zenIframeLoaded && zenIframe) {
          zenIframe.src = (isPortalFile ? CDN_BASE : '') + 'portfolio_apps/zenworkspace/index.html';
          zenIframeLoaded = true;
        }
        if (zenImg) zenImg.hidden = true;
        if (zenIframe) zenIframe.hidden = false;
        showToast('ZenWorkspace v2.0 chargé en direct');
      } else {
        if (zenImg) zenImg.hidden = false;
        if (zenIframe) zenIframe.hidden = true;
      }
    });
  });

  /* ========================================================================
     06. SCENE 03 — 46 PRS OVERLAPPING TERMINAL & CODE DIFF SURGERY
     ======================================================================== */
  var PRS = {
    twenty: {
      file: 'packages/twenty-server/src/metadata/view.resolver.ts',
      url: 'https://github.com/twentyhq/twenty/pull/26490',
      cmd: 'vitest run view.resolver.spec.ts twenty-orm.batch.spec.ts',
      checks: [
        ['Guard RBAC VIEWS / LAYOUTS vérifié', '142 ms'],
        ['twenty-orm batch delete event capture', '218 ms'],
        ['PR #26490 & #26502 fusionnées sur main', 'MERGED']
      ],
      before: [
        { c: 'diff-dim', t: '// Avant : mutation metadata sans garde RBAC dédié' },
        { c: 'diff-del', t: '- @UseGuards(WorkspaceAuthGuard)' },
        { c: '', t: '  @Mutation(() => ViewDTO)' },
        { c: '', t: '  async updateCoreView(@Args(\'input\') input: UpdateViewInput) {' },
        { c: '', t: '    return this.viewService.update(input);' },
        { c: '', t: '  }' },
        { c: '', t: '' },
        { c: 'diff-del', t: '- await repository.deleteMany(criteria); // 0 event émis' }
      ],
      after: [
        { c: 'diff-dim', t: '// PR #26490 : verrouillage RBAC strict VIEWS / LAYOUTS' },
        { c: 'diff-add', t: '+ @UseGuards(' },
        { c: 'diff-add', t: '+   WorkspaceAuthGuard,' },
        { c: 'diff-add', t: '+   SettingsPermissionGuard(PermissionFlagType.VIEWS),' },
        { c: 'diff-add', t: '+ )' },
        { c: '', t: '  @Mutation(() => ViewDTO)' },
        { c: '', t: '  async updateCoreView(@Args(\'input\') input: UpdateViewInput) {' },
        { c: '', t: '    return this.viewService.update(input);' },
        { c: '', t: '  }' },
        { c: '', t: '' },
        { c: 'diff-add', t: '+ const ids = await repository.deleteMany(criteria);' },
        { c: 'diff-add', t: '+ await this.eventEmitter.emitBatchDestroy({ objectName, ids });' }
      ]
    },
    omi: {
      file: 'backend/routers/oauth_whoop_and_errors.py',
      url: 'https://github.com/BasedHardware/omi/pull/19637',
      cmd: 'pytest tests/test_oauth_xss.py tests/test_cwe209_masking.py',
      checks: [
        ['XSS callback OAuth neutralisée (#14604)', '84 ms'],
        ['CWE-209 detail=str(exc) masqué (#16025..#17272)', '119 ms'],
        ['Verrou refresh token & guards epoch (#20168)', 'MERGED']
      ],
      before: [
        { c: 'diff-dim', t: '# Avant : XSS réfléchie & fuite traceback CWE-209' },
        { c: 'diff-del', t: '- return HTMLResponse(f"<p>OAuth error: {error}</p>")' },
        { c: '', t: '' },
        { c: '', t: '  except Exception as exc:' },
        { c: 'diff-del', t: '-     raise HTTPException(status_code=500, detail=str(exc))' },
        { c: '', t: '' },
        { c: 'diff-del', t: '- expiry = datetime.fromtimestamp(raw_epoch)' }
      ],
      after: [
        { c: 'diff-dim', t: '# 7 PRs fusionnées sur BasedHardware/omi (8k★)' },
        { c: 'diff-add', t: '+ from html import escape' },
        { c: 'diff-add', t: '+ return HTMLResponse(f"<p>OAuth error: {escape(error, quote=True)}</p>")' },
        { c: '', t: '' },
        { c: '', t: '  except Exception:' },
        { c: 'diff-add', t: '+     logger.exception("Unhandled internal error")' },
        { c: 'diff-add', t: '+     raise HTTPException(500, detail="Internal error")' },
        { c: '', t: '' },
        { c: 'diff-add', t: '+ expiry = parse_bounded_epoch(raw_epoch)  # Zero OverflowError' }
      ]
    },
    fintech: {
      file: 'src/lib/stellarUri_and_auth_interceptor.ts',
      url: 'https://github.com/Mateidslx',
      cmd: 'vitest run stellarUri.spec.ts authInterceptor.spec.ts a11y.spec.ts',
      checks: [
        ['Précision décimale USD/Crypto stellarUri', '62 ms'],
        ['Intercepteur HTTP 401 verrouillé (idempotent)', '91 ms'],
        ['38 PRs TypeScript/React fusionnées', 'MERGED']
      ],
      before: [
        { c: 'diff-dim', t: '// Avant : arrondi flottant & rafale de redirections 401' },
        { c: 'diff-del', t: '- const uri = `web+stellar:pay?amount=${amount.toString()}`;' },
        { c: '', t: '' },
        { c: '', t: '  api.interceptors.response.use(ok, (err) => {' },
        { c: 'diff-del', t: '-   if (err.status === 401) window.location.assign(\'/login\');' },
        { c: '', t: '  });' }
      ],
      after: [
        { c: 'diff-dim', t: '// Dupdap & Moistello FinTech · 38 PRs fusionnées' },
        { c: 'diff-add', t: '+ const safeAmt = formatAssetAmount(amount, 7);' },
        { c: 'diff-add', t: '+ const uri = `web+stellar:pay?amount=${safeAmt}`;' },
        { c: '', t: '' },
        { c: 'diff-add', t: '+ let redirectInFlight = false;' },
        { c: '', t: '  api.interceptors.response.use(ok, (err) => {' },
        { c: 'diff-add', t: '+   if (err.status === 401 && !redirectInFlight) {' },
        { c: 'diff-add', t: '+     redirectInFlight = true; redirectToLogin();' },
        { c: 'diff-add', t: '+   }' },
        { c: '', t: '  });' }
      ]
    }
  };

  var activeRepo = 'twenty';
  var activeDiff = 'after';

  function renderPR() {
    var d = PRS[activeRepo];
    if (!d) return;
    var fEl = document.getElementById('os-file-name');
    var tEl = document.getElementById('os-diff-tag');
    var cEl = document.getElementById('os-code-pre');
    var uEl = document.getElementById('os-pr-link');
    var cmdEl = document.getElementById('os-term-cmd');
    var rowsEl = document.getElementById('os-term-rows');

    if (fEl) fEl.textContent = d.file;
    if (uEl) uEl.href = d.url;
    if (cmdEl) cmdEl.innerHTML = '<b>$</b> ' + d.cmd;
    if (tEl) {
      tEl.textContent = activeDiff === 'after' ? 'PATCH FUSIONNÉ' : 'AVANT CORRECTIF';
      tEl.className = 'code-tag ' + (activeDiff === 'after' ? 'is-after' : 'is-before');
    }
    if (rowsEl) {
      rowsEl.innerHTML = d.checks.map(function (ch) {
        return '<div class="term-line"><span><span class="term-ok">✓</span> ' + ch[0] + '</span><span class="term-ms">' + ch[1] + '</span></div>';
      }).join('');
    }
    if (cEl) {
      var arr = activeDiff === 'after' ? d.after : d.before;
      cEl.innerHTML = arr.map(function (ln) {
        var esc = ln.t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return ln.c ? '<span class="' + ln.c + '">' + esc + '</span>' : esc;
      }).join('\n');
    }
  }

  document.querySelectorAll('[data-repo]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeRepo = btn.getAttribute('data-repo');
      document.querySelectorAll('[data-repo]').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      renderPR();
    });
  });

  document.querySelectorAll('[data-diff]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeDiff = btn.getAttribute('data-diff');
      document.querySelectorAll('[data-diff]').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      renderPR();
    });
  });
  renderPR();

  /* ========================================================================
     07. SCENE 04 — ORBITARIUM LIVE CLOUD TOPOLOGY CANVAS
     ======================================================================== */
  var ORB_NODES = [
    { id: 'moodle', label: 'Moodle Scraper', orbit: 0.78, angle: 0.3, speed: 0.22, title: 'Moissonneur CAS SSO UPPA (Cron 4h)', desc: 'Authentification Moodle vérifiée, téléchargement récursif des supports PDF/TP et mise à jour du registre (811 documents).' },
    { id: 'fiches', label: 'Auto-Fiches', orbit: 0.56, angle: 2.1, speed: -0.30, title: 'Génération & Unification Kai Study v4', desc: 'Pipeline incrémental générant les 20 pages modules, les fiches 3 niveaux et le thème scotopique Crème/Menthe/Ciel/Nuit.' },
    { id: 'sqlite', label: 'SQLite WAL', orbit: 0.38, angle: 4.0, speed: 0.36, title: 'Persistance ACID + FTS5 Streaming', desc: 'Base relationnelle WAL (15,8 Mo) avec indexation plein texte en lots bornés (< 100 Mo RAM) et empreintes SHA-256.' },
    { id: 'systemd', label: 'Systemd 24/7', orbit: 0.88, angle: 4.8, speed: -0.18, title: '12 Services Cloud Supervisés (Ubuntu 24.04)', desc: 'Watchdog auto-healing, cgroups MemoryMax, bots Discord/Telegram, sentinelle mails Iris et déploiement GitHub Pages.' }
  ];

  var selectedOrb = 'moodle';
  function updateOrbReadout() {
    var n = ORB_NODES.find(function (x) { return x.id === selectedOrb; }) || ORB_NODES[0];
    var box = document.getElementById('orbital-readout');
    if (box && n) box.innerHTML = '<strong>' + n.title + '</strong>' + n.desc;
    document.querySelectorAll('[data-orb]').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-orb') === selectedOrb);
    });
  }
  document.querySelectorAll('[data-orb]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      selectedOrb = btn.getAttribute('data-orb');
      updateOrbReadout();
    });
  });
  updateOrbReadout();

  (function initOrbitalCanvas() {
    var c = document.getElementById('orbital-canvas');
    if (!c) return;
    var ctx = c.getContext('2d');
    var w = 0, h = 0, dpr = 1;
    function resize() {
      var r = c.parentElement.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function draw(now) {
      ctx.clearRect(0, 0, w, h);
      var cx = w / 2, cy = h / 2;
      var maxR = Math.min(w, h) * 0.44;
      var t = reducedMotion ? 0 : now * 0.001;

      // Center VPS core glow
      var grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, 52);
      grad.addColorStop(0, 'rgba(226, 67, 52, 0.45)');
      grad.addColorStop(1, 'rgba(226, 67, 52, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(cx, cy, 52, 0, Math.PI * 2); ctx.fill();

      // Orbits & nodes
      ORB_NODES.forEach(function (n) {
        var r = maxR * n.orbit;
        var active = n.id === selectedOrb;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = active ? 'rgba(226, 67, 52, 0.35)' : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = active ? 1.4 : 1;
        ctx.stroke();

        var a = n.angle + t * n.speed;
        var nx = cx + Math.cos(a) * r;
        var ny = cy + Math.sin(a) * r;

        // Data tether to core
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = active ? 'rgba(226, 67, 52, 0.32)' : 'rgba(255, 255, 255, 0.04)';
        ctx.stroke();

        // Node circle
        ctx.beginPath();
        ctx.arc(nx, ny, active ? 6.5 : 4.5, 0, Math.PI * 2);
        ctx.fillStyle = active ? '#e24334' : '#f3f0e8';
        ctx.fill();

        // Label
        ctx.font = '600 10.5px "JetBrains Mono", monospace';
        ctx.fillStyle = active ? '#f3f0e8' : 'rgba(243, 240, 232, 0.62)';
        ctx.fillText(n.label, nx + 10, ny + 4);
      });

      // Core node
      ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#0e0f15'; ctx.fill();
      ctx.strokeStyle = '#e24334'; ctx.lineWidth = 2; ctx.stroke();
      ctx.font = '700 9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#f3f0e8';
      ctx.textAlign = 'center';
      ctx.fillText('VPS', cx, cy + 3);
      ctx.textAlign = 'left';

      if (!reducedMotion) requestAnimationFrame(draw);
    }
    draw(0);
  })();

  /* ========================================================================
     08. SCENE 05 — LABO CARDS (SECURITY SCANNER + MATHBALLX LIVE PHYSICS)
     ======================================================================== */
  var SEC_MAP = {
    bad: {
      score: 28, grade: 'F',
      items: [['CSP', 'ABSENT', false], ['HSTS', 'ABSENT', false], ['X-Frame', 'ABSENT', false], ['RFC 9116', '404', false]]
    },
    good: {
      score: 100, grade: 'A+',
      items: [['CSP', 'STRICT', true], ['HSTS', '1 AN', true], ['X-Frame', 'DENY', true], ['RFC 9116', 'VALIDE', true]]
    }
  };
  function renderSec(mode) {
    var d = SEC_MAP[mode];
    if (!d) return;
    var arc = document.getElementById('lab-sec-arc');
    var grd = document.getElementById('lab-sec-grade');
    var list = document.getElementById('lab-sec-list');
    var circ = 2 * Math.PI * 28;
    if (arc) {
      arc.style.strokeDasharray = circ.toFixed(1);
      arc.style.strokeDashoffset = (circ * (1 - d.score / 100)).toFixed(1);
      arc.classList.toggle('is-bad', d.score < 60);
    }
    if (grd) grd.textContent = d.grade;
    if (list) {
      list.innerHTML = d.items.map(function (it) {
        return '<div class="sec-pill ' + (it[2] ? 'ok' : 'bad') + '"><span>' + it[0] + '</span><span>' + it[1] + '</span></div>';
      }).join('');
    }
  }
  document.querySelectorAll('[data-sec]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-sec]').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      renderSec(btn.getAttribute('data-sec'));
    });
  });
  renderSec('good');

  // Mathballx 60fps Interactive Vector Physics Mini-Engine
  (function initMathballx() {
    var c = document.getElementById('mathballx-canvas');
    if (!c) return;
    var ctx = c.getContext('2d');
    var w = 0, h = 0, dpr = 1;
    function resize() {
      var r = c.parentElement.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    var balls = [
      { x: 70, y: 60, vx: 1.9, vy: 1.3, r: 9, col: '#e24334' },
      { x: 160, y: 120, vx: -1.6, vy: 1.7, r: 7, col: '#f3f0e8' },
      { x: 220, y: 80, vx: 1.2, vy: -1.8, r: 8, col: '#34d399' },
      { x: 120, y: 150, vx: -1.4, vy: -1.2, r: 6, col: '#d4a85f' }
    ];

    c.addEventListener('click', function (e) {
      var r = c.getBoundingClientRect();
      if (balls.length > 12) balls.shift();
      balls.push({
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        vx: (Math.random() - 0.5) * 4.5,
        vy: -2.2 - Math.random() * 2,
        r: 6 + Math.random() * 4,
        col: Math.random() > 0.5 ? '#e24334' : '#f3f0e8'
      });
    });

    function step() {
      ctx.fillStyle = 'rgba(7, 8, 12, 0.30)';
      ctx.fillRect(0, 0, w, h);

      for (var i = 0; i < balls.length; i++) {
        var b = balls[i];
        if (!reducedMotion) {
          b.vy += 0.04;
          b.x += b.vx;
          b.y += b.vy;
          if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx) * 0.96; }
          if (b.x + b.r > w) { b.x = w - b.r; b.vx = -Math.abs(b.vx) * 0.96; }
          if (b.y - b.r < 0) { b.y = b.r; b.vy = Math.abs(b.vy) * 0.96; }
          if (b.y + b.r > h) { b.y = h - b.r; b.vy = -Math.abs(b.vy) * 0.94; }
        }
        // Elastic ball-to-ball collision
        for (var j = i + 1; j < balls.length; j++) {
          var o = balls[j];
          var dx = o.x - b.x, dy = o.y - b.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var minD = b.r + o.r;
          if (dist > 0 && dist < minD) {
            var nx = dx / dist, ny = dy / dist;
            var overlap = (minD - dist) * 0.5;
            b.x -= nx * overlap; b.y -= ny * overlap;
            o.x += nx * overlap; o.y += ny * overlap;
            var tx = b.vx; b.vx = o.vx; o.vx = tx;
            var ty = b.vy; b.vy = o.vy; o.vy = ty;
          }
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.col;
        ctx.fill();
      }
      if (!reducedMotion) requestAnimationFrame(step);
    }
    step();
  })();

  /* ========================================================================
     09. SCENE 06 — 3D DEPTH PHOTOGRAPH CAROUSEL (about_01..05.webp)
     ======================================================================== */
  var slides = Array.from(document.querySelectorAll('.c3d-slide'));
  var cpBtns = Array.from(document.querySelectorAll('.cp-btn'));
  var cIdx = 0;

  function renderCarousel() {
    var n = slides.length;
    slides.forEach(function (el, i) {
      var diff = i - cIdx;
      if (diff > n / 2) diff -= n;
      if (diff < -n / 2) diff += n;
      var clamped = Math.max(-2, Math.min(2, diff));
      el.setAttribute('data-pos', String(clamped));
    });
    cpBtns.forEach(function (b, i) { b.classList.toggle('is-active', i === cIdx); });
  }

  slides.forEach(function (el, i) {
    el.addEventListener('click', function () { cIdx = i; renderCarousel(); });
  });
  cpBtns.forEach(function (b, i) {
    b.addEventListener('click', function () { cIdx = i; renderCarousel(); });
  });
  renderCarousel();

  /* ========================================================================
     10. CMD+K COMMAND PALETTE
     ======================================================================== */
  var backdrop = document.getElementById('cmdk-backdrop');
  var input = document.getElementById('cmdk-input');
  var listEl = document.getElementById('cmdk-list');

  var CMDS = [
    { t: 'ZenWorkspace v2.0 (App interactive)', m: 'Scene 02', fn: function () { location.assign('#zenworkspace'); } },
    { t: '46 Pull Requests Open-Source', m: 'Scene 03', fn: function () { location.assign('#opensource'); } },
    { t: 'Kai Study v4 & Cloud Agents 24/7', m: 'Scene 04', fn: function () { location.assign('#kaicloud'); } },
    { t: 'Labo : Security MCP, V-Bot, C99, Mathballx', m: 'Scene 05', fn: function () { location.assign('#labo'); } },
    { t: 'Parcours & Terrain (Galerie 3D)', m: 'Scene 06', fn: function () { location.assign('#parcours'); } },
    { t: 'Copier l\'e-mail (matei64200@gmail.com)', m: 'Contact', fn: function () { copyEmail(); } },
    { t: 'Télécharger CV Français (PDF)', m: 'PDF', fn: function () { window.open((isPortalFile ? CDN_BASE : '') + 'portfolio_assets/CV_Matei_de_Saint_Leger_FR.pdf', '_blank', 'noopener'); } },
    { t: 'Basculer Obscura / Atelier Clair', m: 'Thème', fn: toggleTheme },
    { t: 'Basculer police confort Lexend', m: 'Confort', fn: toggleLexend }
  ];
  var filtered = CMDS.slice();
  var sel = 0;

  function drawCmdk() {
    if (!listEl) return;
    listEl.innerHTML = '';
    filtered.forEach(function (c, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cmdk-item' + (i === sel ? ' is-sel' : '');
      b.innerHTML = '<span>' + c.t + '</span><span>' + c.m + '</span>';
      b.addEventListener('click', function () { closeCmdk(); c.fn(); });
      listEl.appendChild(b);
    });
  }
  function openCmdk() {
    if (!backdrop || !input) return;
    backdrop.hidden = false;
    input.value = '';
    filtered = CMDS.slice();
    sel = 0;
    drawCmdk();
    requestAnimationFrame(function () { input.focus(); });
  }
  function closeCmdk() { if (backdrop) backdrop.hidden = true; }

  document.querySelectorAll('[data-open-cmdk]').forEach(function (b) { b.addEventListener('click', openCmdk); });
  if (backdrop && input) {
    backdrop.addEventListener('click', function (e) { if (e.target === backdrop) closeCmdk(); });
    input.addEventListener('input', function () {
      var q = input.value.toLowerCase().trim();
      filtered = q ? CMDS.filter(function (c) { return (c.t + ' ' + c.m).toLowerCase().indexOf(q) >= 0; }) : CMDS.slice();
      sel = 0;
      drawCmdk();
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' && filtered.length) { e.preventDefault(); sel = (sel + 1) % filtered.length; drawCmdk(); }
      else if (e.key === 'ArrowUp' && filtered.length) { e.preventDefault(); sel = (sel - 1 + filtered.length) % filtered.length; drawCmdk(); }
      else if (e.key === 'Enter' && filtered[sel]) { e.preventDefault(); var fn = filtered[sel].fn; closeCmdk(); fn(); }
    });
  }
  window.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (backdrop && !backdrop.hidden) closeCmdk(); else openCmdk();
    } else if (e.key === 'Escape') {
      closeCmdk();
    }
  });
})();
