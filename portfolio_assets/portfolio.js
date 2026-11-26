(function () {
  'use strict';

  /* ========================================================================
     00. FLATPAK DOCUMENT PORTAL FALLBACK (/run/user/<uid>/doc/<id>/)
     ======================================================================== */
  const CDN_BASE = 'https://mateidslx.github.io/kai-academic/';
  const isPortalFile = location.protocol === 'file:' && /\/run\/user\/\d+\/doc\//.test(location.pathname);
  if (isPortalFile) {
    document.querySelectorAll('a[href^="portfolio_assets/"], a[href^="portfolio_apps/"]').forEach((a) => {
      a.setAttribute('href', CDN_BASE + a.getAttribute('href'));
    });
  }

  /* ========================================================================
     00b. INTERACTIVE TOPOGRAPHIC CONTOUR CANVAS (Côte Basque / Pyrénées)
          Reads pointer presence & scroll depth smoothly at 60fps
     ======================================================================== */
  (function initTopoCanvas() {
    const canvas = document.getElementById('hero-topo-canvas');
    if (!canvas) return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1;
    let mx = 0.65, my = 0.42, tx = 0.65, ty = 0.42;
    let scrollPhase = 0;

    function resize() {
      const rect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : { width: window.innerWidth, height: 640 };
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(320, Math.round(rect.width));
      h = Math.max(420, Math.round(rect.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      const dark = document.documentElement.getAttribute('data-theme') === 'basalt';
      const strokeBase = dark ? 'rgba(243, 239, 230, 0.065)' : 'rgba(20, 20, 19, 0.065)';
      const strokeAccent = dark ? 'rgba(224, 77, 61, 0.16)' : 'rgba(201, 59, 43, 0.14)';

      mx += (tx - mx) * 0.06;
      my += (ty - my) * 0.06;

      const lines = 11;
      const steps = 42;
      const phase = reduced ? 0 : t * 0.00028 + scrollPhase * 1.4;

      for (let i = 0; i < lines; i++) {
        const yBase = (h / (lines + 1)) * (i + 1);
        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const u = s / steps;
          const x = u * w;
          const dx = u - mx;
          const dy = yBase / h - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const peak = Math.exp(-dist * dist * 9.5) * 34;
          const wave =
            Math.sin(u * 5.2 + i * 0.55 + phase) * 14 +
            Math.cos(u * 2.8 - i * 0.35 + phase * 0.7) * 9 -
            peak;
          const y = yBase + wave;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = i === 4 || i === 7 ? strokeAccent : strokeBase;
        ctx.lineWidth = i === 4 ? 1.35 : 0.9;
        ctx.stroke();
      }
      if (!reduced) requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      if (r.height > 0) {
        tx = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
        ty = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
      }
    }, { passive: true });
    window.addEventListener('scroll', () => {
      scrollPhase = Math.min(1.5, window.scrollY / 900);
    }, { passive: true });

    if (reduced) draw(0);
    else requestAnimationFrame(draw);
  })();

  /* Origin-Aware Spotlight tracking on interactive surfaces */
  if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.spotlight-surface').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${(e.clientX - r.left).toFixed(0)}px`);
        el.style.setProperty('--my', `${(e.clientY - r.top).toFixed(0)}px`);
      }, { passive: true });
    });
  }

  /* ========================================================================
     01. SONNER TOAST
     ======================================================================== */
  const toastEl = document.getElementById('sonner-toast');
  const toastMsg = document.getElementById('sonner-msg');
  let toastTimer = null;

  function showToast(msg) {
    if (!toastEl || !toastMsg) return;
    toastMsg.textContent = msg;
    toastEl.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-shown'), 2400);
  }

  async function copyText(text, label) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (__) {}
      document.body.removeChild(ta);
    }
    showToast(label || `Copié : ${text}`);
  }

  document.querySelectorAll('[data-copy-email]').forEach((btn) => {
    btn.addEventListener('click', () => copyText(btn.getAttribute('data-copy-email'), 'E-mail copié : matei64200@gmail.com'));
  });

  /* ========================================================================
     02. THEME (PIERRE / BASALTE) + LEXEND COMFORT + CLOCK + MOBILE MENU
     ======================================================================== */
  const themeBtns = Array.from(document.querySelectorAll('[data-set-theme]'));
  function setTheme(theme, notify) {
    const t = theme === 'basalt' ? 'basalt' : 'stone';
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('msl-atelier-theme', t); } catch (_) {}
    themeBtns.forEach((b) => {
      const act = b.getAttribute('data-set-theme') === t;
      b.classList.toggle('is-active', act);
      b.setAttribute('aria-pressed', act ? 'true' : 'false');
    });
    if (notify) showToast(t === 'basalt' ? 'Mode Nuit Basalte activé' : 'Mode Atelier Pierre activé');
  }
  setTheme(document.documentElement.getAttribute('data-theme') || 'stone', false);
  themeBtns.forEach((b) => b.addEventListener('click', () => setTheme(b.getAttribute('data-set-theme'), true)));

  const lexendBtns = [document.getElementById('inline-lexend-btn'), document.getElementById('footer-lexend-btn')].filter(Boolean);
  function toggleLexend() {
    const on = document.documentElement.getAttribute('data-reading') !== 'lexend';
    if (on) {
      document.documentElement.setAttribute('data-reading', 'lexend');
      try { localStorage.setItem('msl-reading', 'lexend'); } catch (_) {}
    } else {
      document.documentElement.removeAttribute('data-reading');
      try { localStorage.removeItem('msl-reading'); } catch (_) {}
    }
    lexendBtns.forEach((b) => b.setAttribute('aria-pressed', on ? 'true' : 'false'));
    showToast(on ? 'Police confort Lexend activée' : 'Typographie éditoriale rétablie');
  }
  lexendBtns.forEach((b) => {
    if (document.documentElement.getAttribute('data-reading') === 'lexend') b.setAttribute('aria-pressed', 'true');
    b.addEventListener('click', toggleLexend);
  });

  const clockEl = document.getElementById('basque-clock');
  function tickClock() {
    if (!clockEl) return;
    try {
      const fmt = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
      clockEl.textContent = `${fmt} CET`;
    } catch (_) {
      clockEl.textContent = 'Europe/Paris';
    }
  }
  tickClock();
  setInterval(tickClock, 30000);

  const mobBtn = document.getElementById('mobile-toggle');
  const mobNav = document.getElementById('mobile-nav');
  if (mobBtn && mobNav) {
    mobBtn.addEventListener('click', () => {
      const open = mobNav.hidden;
      mobNav.hidden = !open;
      mobBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      mobNav.hidden = true;
      mobBtn.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ========================================================================
     03. MOTION DESIGN — MAGNETIC BUTTONS + 3D PORTRAIT TILT + SCROLL REVEAL
     ======================================================================== */
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;

  if (!reducedMotion && finePointer) {
    document.querySelectorAll('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.16;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.18;
        el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transform = '';
      });
    });

    const tiltCard = document.getElementById('hero-portrait-plate');
    if (tiltCard) {
      tiltCard.addEventListener('pointermove', (e) => {
        const r = tiltCard.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tiltCard.style.transform = `perspective(900px) rotateY(${(px * 6).toFixed(2)}deg) rotateX(${(-py * 5).toFixed(2)}deg)`;
      });
      tiltCard.addEventListener('pointerleave', () => {
        tiltCard.style.transform = '';
      });
    }
  }

  // Progressive Scroll Reveals (only mark offscreen elements pending so screenshots/top stay crisp)
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const reveals = Array.from(document.querySelectorAll('.reveal-on-scroll'));
    const revObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.remove('is-pending');
          en.target.classList.add('is-visible');
          revObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.95) {
        el.classList.add('is-pending');
        revObs.observe(el);
      }
    });
  }

  // Number Tickers
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const tickers = Array.from(document.querySelectorAll('[data-ticker]'));
    const tObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        tObs.unobserve(el);
        const target = parseInt(el.getAttribute('data-ticker'), 10);
        if (!Number.isFinite(target)) return;
        const from = Math.max(0, target - Math.min(10, Math.round(target * 0.2)));
        const start = performance.now();
        const step = (now) => {
          const p = Math.min(1, (now - start) / 240);
          el.textContent = String(Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    tickers.forEach((el) => tObs.observe(el));
  }

  /* ========================================================================
     04. ACTE I — INTERACTIVE PR DIFF & CI REPLAY INSPECTOR
     ======================================================================== */
  const PR_DATA = {
    twenty: {
      kicker: 'TWENTY CRM (40K★) · PR #26490 & #26502',
      headline: 'Verrouillage RBAC metadata & batch delete ORM',
      context: 'Sur le CRM open-source Twenty, certaines mutations metadata (VIEWS / LAYOUTS) n\'appliquaient pas le garde de permission dédié, et les suppressions par lot ORM contournaient la capture d\'événements. J\'ai verrouillé les contrôleurs NestJS et couvert le cycle sous Vitest.',
      url: 'https://github.com/twentyhq/twenty/pull/26490',
      file: 'packages/twenty-server/src/metadata/view.resolver.ts',
      checks: ['Guard RBAC VIEWS / LAYOUTS vérifié', 'twenty-orm batch delete event capture', 'Revue mainteneurs & merge sur main'],
      before: [
        { cls: 'diff-line-dim', txt: '// Avant correctif : mutation metadata sans garde RBAC' },
        { cls: 'diff-line-del', txt: '- @UseGuards(WorkspaceAuthGuard)' },
        { cls: '', txt: '  @Mutation(() => ViewDTO)' },
        { cls: '', txt: '  async updateCoreView(@Args(\'input\') input: UpdateViewInput) {' },
        { cls: '', txt: '    return this.viewService.update(input);' },
        { cls: '', txt: '  }' },
        { cls: '', txt: '' },
        { cls: 'diff-line-dim', txt: '// twenty-orm : suppressions par lot non remontées' },
        { cls: 'diff-line-del', txt: '- await repository.deleteMany(criteria); // 0 event émis' }
      ],
      after: [
        { cls: 'diff-line-dim', txt: '// PR #26490 : garde RBAC strict VIEWS / LAYOUTS' },
        { cls: 'diff-line-add', txt: '+ @UseGuards(' },
        { cls: 'diff-line-add', txt: '+   WorkspaceAuthGuard,' },
        { cls: 'diff-line-add', txt: '+   SettingsPermissionGuard(PermissionFlagType.VIEWS),' },
        { cls: 'diff-line-add', txt: '+ )' },
        { cls: '', txt: '  @Mutation(() => ViewDTO)' },
        { cls: '', txt: '  async updateCoreView(@Args(\'input\') input: UpdateViewInput) {' },
        { cls: '', txt: '    return this.viewService.update(input);' },
        { cls: '', txt: '  }' },
        { cls: '', txt: '' },
        { cls: 'diff-line-dim', txt: '// PR #26502 : capture exhaustive batch delete ORM' },
        { cls: 'diff-line-add', txt: '+ const ids = await repository.deleteMany(criteria);' },
        { cls: 'diff-line-add', txt: '+ await this.eventEmitter.emitBatchDestroy({ objectName, ids });' }
      ]
    },
    omi: {
      kicker: 'BASEDHARDWARE / OMI (8K★) · 7 PRS FUSIONNÉES',
      headline: 'Neutralisation XSS OAuth, CWE-209 & OverflowError',
      context: 'Audit et durcissement de plusieurs routes FastAPI et du CLI : encodage HTML strict contre XSS réfléchie (#14604), masquage des exceptions ORM CWE-209 (#16025/#17258/#17272), bornage epoch (#15974) et verrou concurrent du refresh token (#20168).',
      url: 'https://github.com/BasedHardware/omi/pull/19637',
      file: 'backend/routers/oauth_whoop_and_errors.py',
      checks: ['XSS OAuth callback neutralisée (#14604)', 'CWE-209 detail=str(exc) masqué (#16025..#17272)', 'Verrou refresh token & guards regex fusionnés'],
      before: [
        { cls: 'diff-line-dim', txt: '# Avant correctif : XSS réfléchie & fuite traceback CWE-209' },
        { cls: 'diff-line-del', txt: '- return HTMLResponse(f"<p>OAuth error: {error}</p>")' },
        { cls: '', txt: '' },
        { cls: '', txt: '  except Exception as exc:' },
        { cls: 'diff-line-del', txt: '-     raise HTTPException(status_code=500, detail=str(exc))' },
        { cls: '', txt: '' },
        { cls: 'diff-line-dim', txt: '# CLI : timestamp hors bornes provoquait OverflowError' },
        { cls: 'diff-line-del', txt: '- expiry = datetime.fromtimestamp(raw_epoch)' }
      ],
      after: [
        { cls: 'diff-line-dim', txt: '# PRs #14604, #16025, #17272, #15974 fusionnées sur main' },
        { cls: 'diff-line-add', txt: '+ from html import escape' },
        { cls: 'diff-line-add', txt: '+ safe = escape(error, quote=True)' },
        { cls: 'diff-line-add', txt: '+ return HTMLResponse(f"<p>OAuth error: {safe}</p>")' },
        { cls: '', txt: '' },
        { cls: '', txt: '  except Exception:' },
        { cls: 'diff-line-add', txt: '+     logger.exception("Unhandled internal error")' },
        { cls: 'diff-line-add', txt: '+     raise HTTPException(500, detail="Internal error")' },
        { cls: '', txt: '' },
        { cls: 'diff-line-add', txt: '+ expiry = parse_bounded_epoch(raw_epoch)  # Zero crash' }
      ]
    },
    fintech: {
      kicker: 'DUPDAP & MOISTELLO FINTECH · 38 PRS FUSIONNÉES',
      headline: 'Précision USD/Crypto, intercepteur 401 & a11y Vitest',
      context: '38 Pull Requests fusionnées en production TypeScript/React : correction critique de conversion USD/Crypto sur stellarUri, verrou d\'idempotence sur les redirections HTTP 401 concurrentes et tests d\'accessibilité clavier Vitest.',
      url: 'https://github.com/Mateidslx',
      file: 'src/lib/stellarUri_and_auth_interceptor.ts',
      checks: ['Précision décimale stellarUri vérifiée', 'Intercepteur HTTP 401 idempotent', 'Suites Vitest clavier & focus-trap vertes'],
      before: [
        { cls: 'diff-line-dim', txt: '// Avant : arrondi flottant & rafale de redirections 401' },
        { cls: 'diff-line-del', txt: '- const uri = `web+stellar:pay?amount=${amount.toString()}`;' },
        { cls: '', txt: '' },
        { cls: '', txt: '  api.interceptors.response.use(ok, (err) => {' },
        { cls: 'diff-line-del', txt: '-   if (err.status === 401) window.location.assign(\'/login\');' },
        { cls: '', txt: '  });' }
      ],
      after: [
        { cls: 'diff-line-dim', txt: '// Après (38 PRs) : formatage borné & lock 401 idempotent' },
        { cls: 'diff-line-add', txt: '+ const safeAmt = formatAssetAmount(amount, 7);' },
        { cls: 'diff-line-add', txt: '+ const uri = `web+stellar:pay?amount=${safeAmt}`;' },
        { cls: '', txt: '' },
        { cls: 'diff-line-add', txt: '+ let redirectInFlight = false;' },
        { cls: '', txt: '  api.interceptors.response.use(ok, (err) => {' },
        { cls: 'diff-line-add', txt: '+   if (err.status === 401 && !redirectInFlight) {' },
        { cls: 'diff-line-add', txt: '+     redirectInFlight = true;' },
        { cls: 'diff-line-add', txt: '+     redirectToLogin();' },
        { cls: 'diff-line-add', txt: '+   }' },
        { cls: '', txt: '  });' }
      ]
    }
  };

  let activePR = 'twenty';
  let diffMode = 'after';

  const prKicker = document.getElementById('pr-kicker');
  const prHeadline = document.getElementById('pr-headline');
  const prContext = document.getElementById('pr-context');
  const prExtUrl = document.getElementById('pr-ext-url');
  const prFilePath = document.getElementById('pr-file-path');
  const prModeBadge = document.getElementById('pr-mode-badge');
  const prCodeView = document.getElementById('pr-code-view');
  const ciEls = [document.getElementById('ci-1'), document.getElementById('ci-2'), document.getElementById('ci-3')];

  function renderPR() {
    const d = PR_DATA[activePR];
    if (!d || !prCodeView) return;
    if (prKicker) prKicker.textContent = d.kicker;
    if (prHeadline) prHeadline.textContent = d.headline;
    if (prContext) prContext.textContent = d.context;
    if (prExtUrl) prExtUrl.href = d.url;
    if (prFilePath) prFilePath.textContent = d.file;
    d.checks.forEach((txt, i) => { if (ciEls[i]) ciEls[i].textContent = txt; });

    if (prModeBadge) {
      prModeBadge.textContent = diffMode === 'after' ? 'PATCH FUSIONNÉ' : 'ÉTAT AVANT PATCH';
      prModeBadge.className = 'code-status-tag ' + (diffMode === 'after' ? 'is-after' : 'is-before');
    }

    const lines = diffMode === 'after' ? d.after : d.before;
    prCodeView.innerHTML = lines.map((l) => {
      const esc = l.txt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return l.cls ? `<span class="${l.cls}">${esc}</span>` : esc;
    }).join('\n');
  }

  document.querySelectorAll('.repo-tab[data-pr]').forEach((tab) => {
    tab.addEventListener('click', () => {
      activePR = tab.getAttribute('data-pr');
      document.querySelectorAll('.repo-tab[data-pr]').forEach((t) => {
        const a = t === tab;
        t.classList.toggle('is-active', a);
        t.setAttribute('aria-selected', a ? 'true' : 'false');
      });
      renderPR();
    });
  });

  document.querySelectorAll('.diff-opt[data-diff-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      diffMode = btn.getAttribute('data-diff-mode');
      document.querySelectorAll('.diff-opt').forEach((b) => {
        const a = b === btn;
        b.classList.toggle('is-active', a);
        b.setAttribute('aria-pressed', a ? 'true' : 'false');
      });
      renderPR();
    });
  });

  const runCiBtn = document.getElementById('run-ci-btn');
  if (runCiBtn) {
    runCiBtn.addEventListener('click', () => {
      const rows = Array.from(document.querySelectorAll('#ci-checklist .ci-check'));
      rows.forEach((r) => {
        r.classList.add('is-running');
        const ico = r.querySelector('.ci-ico');
        if (ico) ico.textContent = '◌';
      });
      rows.forEach((r, idx) => {
        setTimeout(() => {
          r.classList.remove('is-running');
          const ico = r.querySelector('.ci-ico');
          if (ico) ico.textContent = '✓';
          if (idx === rows.length - 1) showToast('Pipeline CI validé : 3/3 checks verts');
        }, 260 * (idx + 1));
      });
    });
  }
  renderPR();

  /* ========================================================================
     05. ACTE II — LIVE ZENWORKSPACE SPATIAL FORMULA ENGINE PLAYGROUND
     ======================================================================== */
  const inA1 = document.getElementById('zen-a1');
  const inA2 = document.getElementById('zen-a2');
  const inA3 = document.getElementById('zen-a3');
  const outSum = document.getElementById('zen-sum-out');
  const outNet = document.getElementById('zen-net-out');
  const outMargin = document.getElementById('zen-margin-out');
  const cyclePill = document.getElementById('zen-cycle-pill');
  const latencyEl = document.getElementById('zen-latency');
  const targetCard = document.getElementById('zen-target-card');
  let zenCycleMode = false;

  function fmtEuro(n) {
    return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' €';
  }

  function recalcZen() {
    if (!inA1 || !inA2 || !inA3) return;
    const t0 = performance.now();
    const a1 = Math.max(0, parseFloat(inA1.value) || 0);
    const a2 = Math.max(0, parseFloat(inA2.value) || 0);
    const a3 = Math.max(0, parseFloat(inA3.value) || 0);
    const total = a1 + a2;

    if (outSum) outSum.textContent = fmtEuro(total);

    if (zenCycleMode) {
      if (outNet) outNet.textContent = '#CYCLE!';
      if (outMargin) outMargin.textContent = '#REF_GUARD';
      if (cyclePill) {
        cyclePill.textContent = '3. Cycle A1↔B1 bloqué';
        cyclePill.classList.add('is-err');
      }
      if (targetCard) targetCard.classList.add('is-cycle');
    } else {
      const net = total - a3;
      const margin = total > 0 ? (net / total) * 100 : 0;
      if (outNet) outNet.textContent = fmtEuro(net);
      if (outMargin) outMargin.textContent = `${margin.toFixed(1)} %`;
      if (cyclePill) {
        cyclePill.textContent = '3. 0 Cycle détecté';
        cyclePill.classList.remove('is-err');
      }
      if (targetCard) targetCard.classList.remove('is-cycle');
    }
    const dt = Math.max(0.2, performance.now() - t0);
    if (latencyEl) latencyEl.textContent = `Recalcul : ${dt.toFixed(1)} ms`;
  }

  [inA1, inA2, inA3].forEach((inp) => {
    if (inp) inp.addEventListener('input', () => {
      zenCycleMode = false;
      document.querySelectorAll('.preset-btn[data-zen-preset]').forEach((b) => b.classList.remove('is-active'));
      recalcZen();
    });
  });

  document.querySelectorAll('.preset-btn[data-zen-preset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-zen-preset');
      document.querySelectorAll('.preset-btn[data-zen-preset]').forEach((b) => b.classList.toggle('is-active', b === btn));
      if (zenCanvasEl && zenCanvasEl.hidden) {
        zenCanvasEl.hidden = false;
        if (zenPreviewEl) zenPreviewEl.hidden = true;
        document.querySelectorAll('[data-zen-view]').forEach((b) => {
          const act = b.getAttribute('data-zen-view') === 'sim';
          b.classList.toggle('is-active', act);
          b.setAttribute('aria-pressed', act ? 'true' : 'false');
        });
      }
      if (mode === 'saas') {
        zenCycleMode = false;
        inA1.value = '4200'; inA2.value = '1850'; inA3.value = '950';
      } else if (mode === 'scale') {
        zenCycleMode = false;
        inA1.value = '8900'; inA2.value = '3400'; inA3.value = '1450';
      } else if (mode === 'cycle') {
        zenCycleMode = true;
        showToast('Garde topologique DAG déclenché : #CYCLE! isolé');
      }
      recalcZen();
    });
  });
  recalcZen();

  /* ========================================================================
     06. ACTE III — 3D FLIPPING SM-2 FLASHCARDS + VPS INFRA INSPECTOR
     ======================================================================== */
  const CARDS = [
    {
      mod: 'R1.01 · ISO C99 & MÉMOIRE',
      q: 'Pourquoi compiler systématiquement avec -Wall -Wextra -Werror et auditer sous Valgrind ?',
      a: 'Les flags -Werror transforment tout avertissement (variable non initialisée, conversion implicite) en erreur bloquante dès la compilation, tandis que Valgrind Memcheck prouve 0 octet perdu et 0 accès hors-bornes sur le tas.',
      interval: '+1 jour'
    },
    {
      mod: 'R1.05 · MERISE 3NF & POSTGRESQL',
      q: 'Quelle condition définit la 3e Forme Normale (3NF) lors du passage MCD → MLD ?',
      a: 'La relation doit être en 2NF et aucun attribut non-clé ne doit dépendre transitivement de la clé primaire : chaque colonne décrit la clé, toute la clé et rien que la clé.',
      interval: '+1 jour'
    },
    {
      mod: 'R1.04 · SYSTÈMES UNIX & LINUX',
      q: 'Pourquoi activer le mode WAL (Write-Ahead Logging) sur une base SQLite utilisée 24/7 ?',
      a: 'Le mode WAL sépare les écritures dans un journal séquentiel, permettant aux lectures concurrentes de s\'exécuter sans blocage tout en préservant l\'atomicité ACID en cas de coupure.',
      interval: '+1 jour'
    }
  ];

  let cardIdx = 0;
  const fc3d = document.getElementById('flashcard-3d');
  const fcMod = document.getElementById('fc-module');
  const fcQ = document.getElementById('fc-question');
  const fcA = document.getElementById('fc-answer');
  const fcInt = document.getElementById('fc-interval');
  const sm2Count = document.getElementById('sm2-counter');

  function renderCard() {
    const c = CARDS[cardIdx];
    if (!c) return;
    if (fc3d) fc3d.classList.remove('is-flipped');
    if (fcMod) fcMod.textContent = c.mod;
    if (fcQ) fcQ.textContent = c.q;
    if (fcA) fcA.textContent = c.a;
    if (fcInt) fcInt.textContent = `Intervalle SM-2 actuel : ${c.interval}`;
    if (sm2Count) sm2Count.textContent = `CARTE 0${cardIdx + 1} / 0${CARDS.length}`;
  }

  if (fc3d) {
    fc3d.addEventListener('click', () => fc3d.classList.toggle('is-flipped'));
    fc3d.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fc3d.classList.toggle('is-flipped');
      }
    });
  }

  document.querySelectorAll('[data-sm2-rate]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const rate = btn.getAttribute('data-sm2-rate');
      const nextInt = rate === 'again' ? '+1 jour' : rate === 'good' ? '+6 jours' : '+14 jours';
      CARDS[cardIdx].interval = nextInt;
      if (fcInt) fcInt.textContent = `Planifié par SM-2 : ${nextInt}`;
      showToast(`Carte planifiée (${nextInt})`);
    });
  });

  const nextCardBtn = document.getElementById('sm2-next-btn');
  if (nextCardBtn) {
    nextCardBtn.addEventListener('click', () => {
      cardIdx = (cardIdx + 1) % CARDS.length;
      renderCard();
    });
  }
  renderCard();

  const INFRA = {
    dag: {
      kicker: 'COUCHE 01 · ORCHESTRATION',
      title: 'Exécution ordonnée par graphe de dépendances',
      desc: 'Découpe chaque flux en tâches indépendantes reliées par un graphe acyclique dirigé (DAG) en Python Asyncio, évitant les scripts monolithiques fragiles et permettant la reprise ciblée sur erreur.',
      proof: 'Invariant : 0 état silencieux — chaque transition est journalisée en SQLite WAL.'
    },
    wal: {
      kicker: 'COUCHE 02 · PERSISTANCE ACID',
      title: 'Mémoire locale SQLite en mode WAL',
      desc: 'Stockage transactionnel sans serveur externe lourd, capable d\'encaisser des lectures concurrentes pendant les écritures d\'arrière-plan avec intégrité garantie après redémarrage.',
      proof: 'Invariant : journalisation atomique + index plein texte FTS5.'
    },
    verify: {
      kicker: 'COUCHE 03 · CONTRÔLE POST-DÉPLOIEMENT',
      title: 'Ne jamais se fier à un simple HTTP 200',
      desc: 'Validation physique des artefacts après chaque build : empreintes cryptographiques SHA-256, contrôle des en-têtes binaires et parcours automatisés Playwright sur desktop et mobile.',
      proof: 'Invariant : chaque déploiement est vérifié par empreinte et rendu réel.'
    },
    systemd: {
      kicker: 'COUCHE 04 · EXPLOITATION LINUX 24/7',
      title: 'Unités systemd résilientes sur Ubuntu 24.04',
      desc: 'Services supervisés sur VPS Oracle Cloud avec redémarrage automatique, plafonds mémoire cgroups (MemoryMax) et journalisation propre via journalctl.',
      proof: 'Invariant : disponibilité continue 24/7 sans intervention manuelle.'
    },
    moodle: {
      kicker: 'COUCHE 05 · SCRAPER MOODLE & FICHES AUTO',
      title: 'Moissonnage Elearn UPPA → Fiches 3 niveaux automatiques',
      desc: 'Authentification CAS SSO vérifiée, extraction récursive des supports PDF/TP sur e-cours.univ-pau.fr, synchronisation supports_registry et régénération automatique des fiches 3 niveaux unifiées sur Kai Study v4.',
      proof: 'Invariant : pipeline cron UNIX + déploiement certifié GitHub Pages (0 lien mort).'
    }
  };

  /* ========================================================================
     06b. ZENWORKSPACE VIEW SWITCHER (Simulateur AST vs Aperçu Réel)
          + SECURITY SCANNER MCP INTERACTIVE OWASP COMPARATOR
     ======================================================================== */
  const zenCanvasEl = document.getElementById('zen-canvas');
  const zenPreviewEl = document.getElementById('zen-real-preview');
  document.querySelectorAll('[data-zen-view]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-zen-view');
      document.querySelectorAll('[data-zen-view]').forEach((b) => {
        const act = b === btn;
        b.classList.toggle('is-active', act);
        b.setAttribute('aria-pressed', act ? 'true' : 'false');
      });
      if (zenCanvasEl) zenCanvasEl.hidden = mode !== 'sim';
      if (zenPreviewEl) zenPreviewEl.hidden = mode !== 'real';
    });
  });

  const SEC_STATES = {
    vuln: {
      score: 28,
      grade: 'F',
      summary: 'App vibe-coded par défaut : 4 en-têtes OWASP absents, fuite version serveur et pas de security.txt.',
      headers: [
        { k: 'CSP', ok: false, v: 'ABSENT' },
        { k: 'HSTS', ok: false, v: 'ABSENT' },
        { k: 'X-Frame-Options', ok: false, v: 'ABSENT' },
        { k: 'RFC 9116 security.txt', ok: false, v: '404' }
      ]
    },
    hardened: {
      score: 100,
      grade: 'A+',
      summary: 'Durci par Security Scanner MCP : politique CSP stricte, HSTS preload, anti-clickjacking et divulgation RFC 9116.',
      headers: [
        { k: 'CSP', ok: true, v: 'STRICT ✓' },
        { k: 'HSTS', ok: true, v: '31536000s ✓' },
        { k: 'X-Frame-Options', ok: true, v: 'DENY ✓' },
        { k: 'RFC 9116 security.txt', ok: true, v: 'VALIDE ✓' }
      ]
    }
  };

  const secArc = document.getElementById('sec-gauge-arc');
  const secGrade = document.getElementById('sec-grade-text');
  const secSummary = document.getElementById('sec-audit-summary');
  const secList = document.getElementById('sec-headers-list');
  const secInteractiveBox = document.getElementById('sec-interactive-box');
  const secRealBox = document.getElementById('sec-real-box');

  function renderSecAudit(mode) {
    if (secInteractiveBox) secInteractiveBox.hidden = mode === 'real';
    if (secRealBox) secRealBox.hidden = mode !== 'real';
    const d = SEC_STATES[mode];
    if (!d) return;
    const circ = 2 * Math.PI * 24;
    if (secArc) {
      secArc.style.strokeDasharray = circ.toFixed(1);
      secArc.style.strokeDashoffset = (circ * (1 - d.score / 100)).toFixed(1);
      secArc.classList.toggle('is-bad', d.score < 60);
    }
    if (secGrade) secGrade.textContent = d.grade;
    if (secSummary) secSummary.textContent = d.summary;
    if (secList) {
      secList.innerHTML = d.headers.map((h) => (
        `<div class="sec-hdr-pill ${h.ok ? 'is-ok' : 'is-miss'}"><span>${h.k}</span><span class="sh-st">${h.v}</span></div>`
      )).join('');
    }
  }

  document.querySelectorAll('[data-sec-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const m = btn.getAttribute('data-sec-mode');
      document.querySelectorAll('[data-sec-mode]').forEach((b) => b.classList.toggle('is-active', b === btn));
      renderSecAudit(m);
    });
  });
  renderSecAudit('hardened');

  document.querySelectorAll('.infra-node[data-infra]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const k = btn.getAttribute('data-infra');
      const d = INFRA[k];
      if (!d) return;
      document.querySelectorAll('.infra-node').forEach((b) => {
        const a = b === btn;
        b.classList.toggle('is-active', a);
        b.setAttribute('aria-selected', a ? 'true' : 'false');
      });
      document.getElementById('infra-kicker').textContent = d.kicker;
      document.getElementById('infra-title').textContent = d.title;
      document.getElementById('infra-desc').textContent = d.desc;
      document.getElementById('infra-proof').textContent = d.proof;
    });
  });

  /* ========================================================================
     07. ACTE IV — INTERACTIVE PARCOURS GALLERY
     ======================================================================== */
  const tlSteps = Array.from(document.querySelectorAll('.tl-step[data-step]'));
  const gSlides = Array.from(document.querySelectorAll('.g-slide[data-slide]'));
  function setStep(idx) {
    tlSteps.forEach((s, i) => s.classList.toggle('is-active', i === idx));
    gSlides.forEach((s, i) => s.classList.toggle('is-active', i === idx));
  }
  tlSteps.forEach((s, i) => {
    s.addEventListener('click', () => setStep(i));
    s.addEventListener('mouseenter', () => setStep(i));
  });

  /* ========================================================================
     08. SCROLL PROGRESS BAR + WATERMELON CAPSULE + NAV SYNC
     ======================================================================== */
  const topBar = document.getElementById('top-progress-bar');
  const capsule = document.getElementById('scroll-capsule');
  const capTrigger = document.getElementById('capsule-trigger');
  const capDrawer = document.getElementById('capsule-drawer');
  const capLabel = document.getElementById('capsule-label');
  const capPct = document.getElementById('capsule-pct');
  const navLinks = Array.from(document.querySelectorAll('.nav-link[data-nav]'));
  const capLinks = Array.from(document.querySelectorAll('[data-cap]'));

  const ACTS = [
    { id: 'prologue', label: 'Prologue' },
    { id: 'acte-1', label: 'Acte 01 · PRs' },
    { id: 'acte-2', label: 'Acte 02 · Zen' },
    { id: 'acte-3', label: 'Acte 03 · Kai' },
    { id: 'parcours', label: 'Acte 04 · Parcours' },
    { id: 'contact', label: 'Épilogue' }
  ];

  let prevY = -1;
  function rafScroll() {
    const sy = window.scrollY;
    if (sy !== prevY) {
      prevY = sy;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.max(0, Math.min(1, sy / max));
      const pct = ratio * 100;
      if (topBar) topBar.style.transform = `scaleX(${ratio.toFixed(4)})`;
      if (capsule) {
        capsule.classList.toggle('is-visible', sy > 300);
        capsule.style.setProperty('--p', pct.toFixed(1));
      }
      if (capPct) {
        const r = Math.round(pct);
        capPct.textContent = `${r < 10 ? '0' : ''}${r}%`;
      }
      const probe = window.innerHeight * 0.36;
      let cur = ACTS[0];
      ACTS.forEach((a) => {
        const el = document.getElementById(a.id);
        if (el && el.getBoundingClientRect().top <= probe) cur = a;
      });
      if (capLabel) capLabel.textContent = cur.label;
      navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('data-nav') === cur.id));
      capLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('data-cap') === cur.id));
    }
    requestAnimationFrame(rafScroll);
  }
  requestAnimationFrame(rafScroll);

  if (capTrigger && capDrawer) {
    capTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = capDrawer.hidden;
      capDrawer.hidden = !open;
      capTrigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    capLinks.forEach((a) => a.addEventListener('click', () => {
      capDrawer.hidden = true;
      capTrigger.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('click', (e) => {
      if (capsule && !capsule.contains(e.target) && !capDrawer.hidden) {
        capDrawer.hidden = true;
        capTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ========================================================================
     09. SHADCN CMDK PALETTE (⌘K)
     ======================================================================== */
  const backdrop = document.getElementById('cmdk-backdrop');
  const input = document.getElementById('cmdk-input');
  const list = document.getElementById('cmdk-list');

  const CMDS = [
    { t: 'Acte 01 · 46 PRs Open-Source (Diff & CI live)', m: 'Navigation', fn: () => location.assign('#acte-1') },
    { t: 'Acte 02 · ZenWorkspace v2.0 (Playground Formules)', m: 'Démo', fn: () => location.assign('#acte-2') },
    { t: 'Acte 03 · Kai Academic (Flashcards SM-2) & VPS', m: 'Démo', fn: () => location.assign('#acte-3') },
    { t: 'Acte 04 · Parcours, Stages HUPI / Marra & UK', m: 'Navigation', fn: () => location.assign('#parcours') },
    { t: 'Épilogue · Contact & Alternance BUT 2', m: 'Contact', fn: () => location.assign('#contact') },
    { t: 'Copier l\'e-mail (matei64200@gmail.com)', m: 'Action', fn: () => copyText('matei64200@gmail.com', 'E-mail copié : matei64200@gmail.com') },
    { t: 'Basculer Atelier Pierre / Nuit Basalte', m: 'Thème', fn: () => setTheme(document.documentElement.getAttribute('data-theme') === 'stone' ? 'basalt' : 'stone', true) },
    { t: 'Activer / désactiver le mode lecture Lexend', m: 'Confort', fn: toggleLexend },
    { t: 'Télécharger CV Français (PDF)', m: 'PDF', fn: () => window.open((isPortalFile ? CDN_BASE : '') + 'portfolio_assets/CV_Matei_de_Saint_Leger_FR.pdf', '_blank', 'noopener') },
    { t: 'Download English Resume (PDF)', m: 'PDF', fn: () => window.open((isPortalFile ? CDN_BASE : '') + 'portfolio_assets/Resume_Matei_de_Saint_Leger_EN.pdf', '_blank', 'noopener') }
  ];

  let filtered = CMDS.slice();
  let sel = 0;

  function renderCmdk() {
    if (!list) return;
    list.innerHTML = '';
    filtered.forEach((c, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'cmdk-item' + (i === sel ? ' is-selected' : '');
      b.innerHTML = `<span class="cmdk-item-title">${c.t}</span><span class="cmdk-item-meta">${c.m}</span>`;
      b.addEventListener('mouseenter', () => { sel = i; renderSel(); });
      b.addEventListener('click', () => { closeCmdk(); c.fn(); });
      list.appendChild(b);
    });
  }

  function renderSel() {
    if (!list) return;
    Array.from(list.children).forEach((el, i) => el.classList.toggle('is-selected', i === sel));
  }

  function openCmdk() {
    if (!backdrop || !input) return;
    backdrop.hidden = false;
    input.value = '';
    filtered = CMDS.slice();
    sel = 0;
    renderCmdk();
    requestAnimationFrame(() => input.focus());
  }

  function closeCmdk() { if (backdrop) backdrop.hidden = true; }

  document.querySelectorAll('[data-open-cmdk]').forEach((b) => b.addEventListener('click', openCmdk));
  if (backdrop && input) {
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeCmdk(); });
    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim();
      filtered = q ? CMDS.filter((c) => c.t.toLowerCase().includes(q) || c.m.toLowerCase().includes(q)) : CMDS.slice();
      sel = 0;
      renderCmdk();
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' && filtered.length) { e.preventDefault(); sel = (sel + 1) % filtered.length; renderSel(); }
      else if (e.key === 'ArrowUp' && filtered.length) { e.preventDefault(); sel = (sel - 1 + filtered.length) % filtered.length; renderSel(); }
      else if (e.key === 'Enter' && filtered[sel]) { e.preventDefault(); const fn = filtered[sel].fn; closeCmdk(); fn(); }
    });
  }

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (backdrop && !backdrop.hidden) closeCmdk();
      else openCmdk();
    } else if (e.key === 'Escape') {
      closeCmdk();
      if (capDrawer && !capDrawer.hidden) {
        capDrawer.hidden = true;
        if (capTrigger) capTrigger.setAttribute('aria-expanded', 'false');
      }
    }
  });
})();
