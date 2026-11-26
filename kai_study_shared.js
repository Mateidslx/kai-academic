(function () {
  'use strict';

  var PREFS_KEY = 'kai_study_v2_prefs';
  var DEFAULT_PREFS = { tint: 'cream', font: 'lexend', fontSize: 16, bionic: false, ruler: false };

  function loadPrefs() {
    try {
      var raw = localStorage.getItem(PREFS_KEY);
      if (!raw) return Object.assign({}, DEFAULT_PREFS);
      return Object.assign({}, DEFAULT_PREFS, JSON.parse(raw));
    } catch (_) {
      return Object.assign({}, DEFAULT_PREFS);
    }
  }

  function savePrefs(p) {
    try { localStorage.setItem(PREFS_KEY, JSON.stringify(p)); } catch (_) {}
  }

  var prefs = loadPrefs();

  function applyPrefs() {
    var root = document.documentElement;
    root.setAttribute('data-tint', prefs.tint || 'cream');
    root.style.setProperty('--font-size', (prefs.fontSize || 16) + 'px');
    root.style.setProperty(
      '--font-main',
      prefs.font === 'jakarta'
        ? '"Plus Jakarta Sans", "Lexend", system-ui, sans-serif'
        : '"Lexend", "Plus Jakarta Sans", system-ui, sans-serif'
    );
    if (document.body) {
      document.body.classList.toggle('ks-ruler-on', !!prefs.ruler);
    }
    document.querySelectorAll('.ks-tint-btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-ks-tint') === (prefs.tint || 'cream'));
    });
    var rulerBtn = document.getElementById('ks-ruler-toggle');
    if (rulerBtn) rulerBtn.classList.toggle('is-active', !!prefs.ruler);
  }

  applyPrefs();
  if (window.self !== window.top) {
    document.documentElement.classList.add('ks-in-iframe');
  }

  function detectHubHref() {
    var scriptEl = document.currentScript || document.querySelector('script[src*="kai_study_shared.js"]');
    if (scriptEl) {
      var src = scriptEl.getAttribute('src') || '';
      if (src.indexOf('../../') === 0) return '../../index.html';
      if (src.indexOf('../') === 0) return '../index.html';
    }
    var p = (window.location.pathname || '').replace(/\\/g, '/');
    if (/\/courses\/[^/]+\/[^/]+\.html$/i.test(p)) return '../../index.html';
    if (/\/(courses|revision|quiz)\/[^/]+\.html$/i.test(p)) return '../index.html';
    return 'index.html';
  }

  function detectContextMeta() {
    var p = (window.location.pathname || '').replace(/\\/g, '/');
    var modMatch = p.match(/(R1\.\d{2}|S1\.\d{2}|P1\.01|MTU)/i);
    var mod = modMatch ? modMatch[1].toUpperCase() : '';
    var section = 'Ressource';
    if (/\/revision\//i.test(p)) section = 'Fiche Révision';
    else if (/\/courses\/[^/]+\//i.test(p)) section = 'Chapitre';
    else if (/\/courses\//i.test(p)) section = 'Module';
    else if (/\/quiz\//i.test(p)) section = 'QCM Examen';
    else if (/documents\.html/i.test(p)) section = 'Médiathèque';
    else if (/telechargements\.html/i.test(p)) section = 'Téléchargements';
    return { mod: mod, section: section };
  }

  function mountUnifiedBar() {
    if (!document.body || document.querySelector('.ks-unified-bar')) return;

    var hubHref = detectHubHref();
    var meta = detectContextMeta();
    var isSubCourse = hubHref === '../../index.html' && meta.mod;
    var modIndexLink = isSubCourse
      ? '<a class="ks-bar-link" href="../' + meta.mod + '.html">Module ' + meta.mod + '</a>'
      : '';
    var revLink = meta.mod && meta.section !== 'Fiche Révision'
      ? '<a class="ks-bar-link" href="' + (hubHref === '../../index.html' ? '../../revision/' : '../revision/') + meta.mod + '.html">Fiche ' + meta.mod + '</a>'
      : '';

    var bar = document.createElement('div');
    bar.className = 'ks-unified-bar';
    bar.setAttribute('role', 'banner');
    bar.innerHTML =
      '<div class="ks-unified-inner">' +
        '<div class="ks-bar-left">' +
          '<a class="ks-brand" href="' + hubHref + '" title="Retour au Hub Kai Study">' +
            '<span class="ks-brand-mark">KS</span>' +
            '<span class="ks-brand-label">Kai Study</span>' +
          '</a>' +
          '<span class="ks-crumb-sep">/</span>' +
          '<a class="ks-bar-link" href="' + hubHref + '">← Hub</a>' +
          modIndexLink +
          revLink +
          '<span style="font-size:0.75rem;color:var(--ink-muted);font-weight:600;">' +
            (meta.mod ? meta.mod + ' · ' : '') + meta.section +
          '</span>' +
        '</div>' +
        '<div class="ks-bar-right">' +
          '<div class="ks-tint-group" role="group" aria-label="Teinte scotopique">' +
            '<button type="button" class="ks-tint-btn" data-ks-tint="cream">Crème</button>' +
            '<button type="button" class="ks-tint-btn" data-ks-tint="mint">Menthe</button>' +
            '<button type="button" class="ks-tint-btn" data-ks-tint="sky">Ciel</button>' +
            '<button type="button" class="ks-tint-btn" data-ks-tint="dark">Nuit</button>' +
          '</div>' +
          '<button type="button" class="ks-tool-btn" id="ks-font-dec" title="Réduire la taille">A-</button>' +
          '<button type="button" class="ks-tool-btn" id="ks-font-inc" title="Agrandir la taille">A+</button>' +
          '<button type="button" class="ks-tool-btn" id="ks-ruler-toggle" title="Règle de lecture">Règle</button>' +
        '</div>' +
      '</div>';

    document.body.insertBefore(bar, document.body.firstChild);
    document.body.classList.add('ks-has-bar');

    var ruler = document.createElement('div');
    ruler.className = 'ks-reading-ruler';
    ruler.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ruler);

    bar.addEventListener('click', function (e) {
      var tBtn = e.target.closest('[data-ks-tint]');
      if (tBtn) {
        prefs.tint = tBtn.getAttribute('data-ks-tint');
        savePrefs(prefs);
        applyPrefs();
        return;
      }
      if (e.target.closest('#ks-font-dec')) {
        prefs.fontSize = Math.max(14, (prefs.fontSize || 16) - 1);
        savePrefs(prefs);
        applyPrefs();
        return;
      }
      if (e.target.closest('#ks-font-inc')) {
        prefs.fontSize = Math.min(22, (prefs.fontSize || 16) + 1);
        savePrefs(prefs);
        applyPrefs();
        return;
      }
      if (e.target.closest('#ks-ruler-toggle')) {
        prefs.ruler = !prefs.ruler;
        savePrefs(prefs);
        applyPrefs();
      }
    });

    document.addEventListener('pointermove', function (e) {
      if (prefs.ruler) {
        ruler.style.top = Math.max(54, e.clientY - 18) + 'px';
      }
    }, { passive: true });

    applyPrefs();
  }

  window.addEventListener('storage', function (e) {
    if (e.key === PREFS_KEY) {
      prefs = loadPrefs();
      applyPrefs();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountUnifiedBar);
  } else {
    mountUnifiedBar();
  }
})();
