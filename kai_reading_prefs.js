/**
 * kai_reading_prefs.js
 * Unified Cognitive & Accessibility Reading Preference Engine
 * Shared across index.html, courses/*.html and revision/*.html
 * 
 * Enforces unified schema, bi-directional DOM synchronization,
 * W3C WCAG 2.1 & British Dyslexia Association guidelines.
 */

(function () {
  'use strict';

  var STORAGE_KEYS = ['kai_accessibility_prefs', 'kai_study_prefs'];

  var DEFAULT_PREFS = {
    font: "'Lexend', 'OpenDyslexic', system-ui, sans-serif",
    fontSize: 18,
    lineHeight: 1.85,
    letterSpacing: 0.035,
    scotopicTint: "#FAF8F5",
    ruler: false,
    bionic: false
  };

  // Strictly preserve each hex color without cross-color mutation
  var SCOTOPIC_THEMES = {
    '#FFFFFF': { tint: '#FFFFFF', card: '#FFFFFF', text: '#0F172A', border: '#E2E8F0', heading: '#0F172A', name: 'Blanc Pur' },
    '#FAF8F5': { tint: '#FAF8F5', card: '#FFFDF9', text: '#1C1917', border: '#E7E5E4', heading: '#292524', name: 'Crème Doux' },
    '#FAF6EE': { tint: '#FAF6EE', card: '#FFFDF9', text: '#1C1917', border: '#E7E5E4', heading: '#292524', name: 'Sable Chaud' },
    '#FFF7ED': { tint: '#FFF7ED', card: '#FFEDD5', text: '#7C2D12', border: '#FED7AA', heading: '#431407', name: 'Pêche Reposant' },
    '#F0FDF4': { tint: '#F0FDF4', card: '#F7FEE7', text: '#14351F', border: '#BBF7D0', heading: '#0E4429', name: 'Menthe Apaisante' },
    '#F0F9FF': { tint: '#F0F9FF', card: '#F8FAFC', text: '#0F2D4A', border: '#BFDBFE', heading: '#1E3A8A', name: 'Ciel Doux' },
    '#FAF5FF': { tint: '#FAF5FF', card: '#FAF5FF', text: '#3B0764', border: '#E9D5FF', heading: '#581C87', name: 'Lavande Feutrée' },
    '#0F172A': { tint: '#0F172A', card: '#1E293B', text: '#F1F5F9', border: '#334155', heading: '#FFFFFF', name: 'Nuit Sombre' }
  };

  var _lastFocusedElement = null;

  function getStoredPrefs() {
    var raw = null;
    for (var i = 0; i < STORAGE_KEYS.length; i++) {
      try {
        raw = localStorage.getItem(STORAGE_KEYS[i]);
        if (raw) break;
      } catch (e) {}
    }
    if (!raw) return Object.assign({}, DEFAULT_PREFS);
    try {
      var parsed = JSON.parse(raw);
      var scotopic = typeof parsed.scotopicTint === 'string' && SCOTOPIC_THEMES[parsed.scotopicTint] ? parsed.scotopicTint : DEFAULT_PREFS.scotopicTint;
      return {
        font: typeof parsed.font === 'string' && parsed.font.length > 0 ? parsed.font : DEFAULT_PREFS.font,
        fontSize: typeof parsed.fontSize !== 'undefined' ? parseInt(parsed.fontSize, 10) || DEFAULT_PREFS.fontSize : DEFAULT_PREFS.fontSize,
        lineHeight: typeof parsed.lineHeight !== 'undefined' ? parseFloat(parsed.lineHeight) || DEFAULT_PREFS.lineHeight : DEFAULT_PREFS.lineHeight,
        letterSpacing: typeof parsed.letterSpacing !== 'undefined' ? parseFloat(parsed.letterSpacing) : DEFAULT_PREFS.letterSpacing,
        scotopicTint: scotopic,
        ruler: Boolean(parsed.ruler),
        bionic: Boolean(parsed.bionic)
      };
    } catch (e) {
      return Object.assign({}, DEFAULT_PREFS);
    }
  }

  function persistPrefs(prefs) {
    var serialized = JSON.stringify(prefs);
    for (var i = 0; i < STORAGE_KEYS.length; i++) {
      try {
        localStorage.setItem(STORAGE_KEYS[i], serialized);
      } catch (e) {}
    }
  }

  function applyPrefs(prefs, skipPersist) {
    if (!prefs) prefs = getStoredPrefs();
    var root = document.documentElement;
    var theme = SCOTOPIC_THEMES[prefs.scotopicTint] || SCOTOPIC_THEMES['#FAF8F5'];

    // 1. CSS Custom Properties
    root.style.setProperty('--user-font-family', prefs.font);
    root.style.setProperty('--user-font-size', prefs.fontSize + 'px');
    root.style.setProperty('--user-line-height', String(prefs.lineHeight));
    root.style.setProperty('--user-letter-spacing', prefs.letterSpacing + 'em');
    root.style.setProperty('--scotopic-tint', theme.tint);
    root.style.setProperty('--scotopic-card-bg', theme.card);
    root.style.setProperty('--scotopic-text', theme.text);
    root.style.setProperty('--scotopic-border', theme.border);
    root.style.setProperty('--scotopic-heading', theme.heading);

    // 2. Direct body styling (prevents flicker and forces background)
    if (document.body) {
      document.body.style.fontFamily = prefs.font;
      document.body.style.fontSize = prefs.fontSize + 'px';
      document.body.style.lineHeight = String(prefs.lineHeight);
      document.body.style.letterSpacing = prefs.letterSpacing + 'em';
      document.body.style.backgroundColor = theme.tint;
      document.body.style.color = theme.text;
    }

    var chapterMain = document.getElementById('chapterMainContent');
    if (chapterMain) {
      chapterMain.style.fontFamily = prefs.font;
      chapterMain.style.fontSize = prefs.fontSize + 'px';
      chapterMain.style.lineHeight = String(prefs.lineHeight);
      chapterMain.style.letterSpacing = prefs.letterSpacing + 'em';
    }

    // 3. Sync UI Controls
    syncControls(prefs);

    // 4. Update Reading Ruler State
    updateRulerVisual(prefs.ruler);

    if (typeof window.syncQuickBarUi === 'function') {
      try { window.syncQuickBarUi(); } catch (e) {}
    }

    if (!skipPersist) {
      persistPrefs(prefs);
    }
  }

  function syncControls(prefs) {
    if (!prefs) prefs = getStoredPrefs();
    
    // Sliders & value labels
    var sFont = document.getElementById('sliderFontSize');
    if (sFont) sFont.value = prefs.fontSize;
    var lFont = document.getElementById('labelFontSize');
    if (lFont) lFont.innerText = prefs.fontSize + 'px';

    var sLine = document.getElementById('sliderLineHeight');
    if (sLine) sLine.value = prefs.lineHeight;
    var lLine = document.getElementById('labelLineHeight');
    if (lLine) lLine.innerText = String(prefs.lineHeight);

    var sSpace = document.getElementById('sliderLetterSpacing');
    if (sSpace) sSpace.value = prefs.letterSpacing;
    var lSpace = document.getElementById('labelLetterSpacing');
    if (lSpace) lSpace.innerText = prefs.letterSpacing + 'em';

    var qDisplay = document.getElementById('quickFontSizeDisplay');
    if (qDisplay) qDisplay.innerText = prefs.fontSize + 'px';

    // Reading ruler toggle
    var toggleRuler = document.getElementById('toggleReadingRuler');
    if (toggleRuler) toggleRuler.checked = prefs.ruler;

    // Font selection buttons in index.html (fontBtn-*) and revision/*.html (btnFont*)
    var fontKeys = [
      { id: 'fontBtn-OpenDyslexic', altId: 'btnFontOpenDyslexic', name: 'OpenDyslexic', match: 'Open' },
      { id: 'fontBtn-Lexend', altId: 'btnFontLexend', name: 'Lexend', match: 'Lexend' },
      { id: 'fontBtn-Comic', altId: 'btnFontComic', name: 'Comic', match: 'Comic' },
      { id: 'fontBtn-Jakarta', altId: 'btnFontJakarta', name: 'Jakarta', match: 'Jakarta' }
    ];
    fontKeys.forEach(function (fk) {
      var isSel = (fk.match === 'Open' && (prefs.font.indexOf('Open-Dyslexic') !== -1 || prefs.font.indexOf('OpenDyslexic') !== -1)) ||
                  (fk.match === 'Lexend' && prefs.font.indexOf('Lexend') !== -1 && prefs.font.indexOf('Open') === -1) ||
                  (fk.match === 'Comic' && prefs.font.indexOf('Comic') !== -1) ||
                  (fk.match === 'Jakarta' && prefs.font.indexOf('Jakarta') !== -1);
      
      var btn = document.getElementById(fk.id);
      if (btn) {
        btn.classList.toggle('border-blue-600', isSel);
        btn.classList.toggle('bg-blue-50', isSel);
        btn.classList.toggle('ring-2', isSel);
        btn.classList.toggle('ring-blue-400', isSel);
      }
      var altBtn = document.getElementById(fk.altId);
      if (altBtn) {
        if (isSel) {
          altBtn.className = 'p-2 rounded-xl border border-blue-600 bg-blue-50 text-blue-900 font-bold text-center ring-2 ring-blue-400';
        } else {
          altBtn.className = 'p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-center';
        }
      }
    });

    // Scotopic swatches outline
    var swatches = document.querySelectorAll('[onclick*="setScotopicTint"]');
    swatches.forEach(function (sw) {
      var m = sw.getAttribute('onclick') || '';
      var active = m.indexOf(prefs.scotopicTint) !== -1;
      if (active) {
        sw.style.outline = '3px solid #2563EB';
        sw.style.outlineOffset = '2px';
      } else {
        sw.style.outline = 'none';
      }
    });
  }

  function updateRulerVisual(enabled) {
    var overlay = document.getElementById('readingRulerOverlay');
    var band = document.getElementById('readingRulerBand');
    if (overlay) {
      overlay.style.display = enabled ? 'block' : 'none';
      return;
    }
    // Standalone floating ruler if overlay not present
    var ruler = document.getElementById('kaiReadingRuler');
    if (enabled) {
      if (!ruler) {
        ruler = document.createElement('div');
        ruler.id = 'kaiReadingRuler';
        ruler.style.position = 'fixed';
        ruler.style.pointerEvents = 'none';
        ruler.style.height = '36px';
        ruler.style.left = '0';
        ruler.style.right = '0';
        ruler.style.background = 'rgba(254, 240, 138, 0.28)';
        ruler.style.borderTop = '2px solid rgba(234, 179, 8, 0.4)';
        ruler.style.borderBottom = '2px solid rgba(234, 179, 8, 0.4)';
        ruler.style.zIndex = '9999';
        ruler.style.top = '200px';
        document.body.appendChild(ruler);
      }
      ruler.style.display = 'block';
    } else if (ruler) {
      ruler.style.display = 'none';
    }
  }

  // Global mousemove for reading ruler
  window.addEventListener('mousemove', function (e) {
    var band = document.getElementById('readingRulerBand');
    if (band && band.parentElement && band.parentElement.style.display !== 'none') {
      band.style.top = (e.clientY - 24) + 'px';
      return;
    }
    var floating = document.getElementById('kaiReadingRuler');
    if (floating && floating.style.display !== 'none') {
      floating.style.top = (e.clientY - 18) + 'px';
    }
  });

  // Global Drawer Focus Trap & Keyboard Navigation (W3C WCAG 2.1)
  document.addEventListener('keydown', function (e) {
    var drawer = document.getElementById('accessibilityDrawer');
    if (!drawer) return;
    var isOpen = drawer.classList.contains('open') || 
                 (drawer.style.display !== 'none' && drawer.style.visibility !== 'hidden' && !drawer.hasAttribute('inert'));
    if (!isOpen) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      if (typeof window.closeAccessibilityDrawer === 'function') {
        window.closeAccessibilityDrawer();
      }
      return;
    }

    if (e.key === 'Tab') {
      var focusables = drawer.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])');
      if (!focusables || focusables.length === 0) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || !drawer.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || !drawer.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // Public API
  window.SCOTOPIC_THEMES = SCOTOPIC_THEMES;

  window.openAccessibilityDrawer = function () {
    var drawer = document.getElementById('accessibilityDrawer');
    if (drawer) {
      _lastFocusedElement = document.activeElement;
      drawer.style.display = 'flex';
      drawer.style.visibility = 'visible';
      drawer.classList.add('open');
      drawer.removeAttribute('inert');
      drawer.setAttribute('aria-hidden', 'false');
      var firstFocus = drawer.querySelector('button, input, select');
      if (firstFocus) firstFocus.focus();
    }
  };

  window.closeAccessibilityDrawer = function () {
    var drawer = document.getElementById('accessibilityDrawer');
    if (drawer) {
      drawer.classList.remove('open');
      drawer.setAttribute('inert', '');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.style.visibility = 'hidden';
      drawer.style.display = 'none';
      if (_lastFocusedElement && typeof _lastFocusedElement.focus === 'function') {
        _lastFocusedElement.focus();
      } else {
        var trigger = document.getElementById('accessDrawerBtn');
        if (trigger) trigger.focus();
      }
    }
  };

  window.closeAccessibilityDrawerOnBackdrop = function (e) {
    if (e.target && e.target.id === 'accessibilityDrawer') {
      window.closeAccessibilityDrawer();
    }
  };

  window.getAccessibilityPrefs = function () {
    return getStoredPrefs();
  };

  window.saveAccessibilityPrefs = function () {
    var p = getStoredPrefs();
    var sFont = document.getElementById('sliderFontSize');
    var sLine = document.getElementById('sliderLineHeight');
    var sSpace = document.getElementById('sliderLetterSpacing');
    var rulerBox = document.getElementById('toggleReadingRuler');
    if (sFont) p.fontSize = parseInt(sFont.value, 10);
    if (sLine) p.lineHeight = parseFloat(sLine.value);
    if (sSpace) p.letterSpacing = parseFloat(sSpace.value);
    if (rulerBox) p.ruler = Boolean(rulerBox.checked);
    persistPrefs(p);
  };

  window.setUserFont = function (fontName) {
    var prefs = getStoredPrefs();
    var resolved = fontName;
    if (fontName.indexOf('OpenDyslexic') !== -1 || fontName.indexOf('Open-Dyslexic') !== -1) {
      resolved = "'Open-Dyslexic', 'OpenDyslexic', sans-serif";
    } else if (fontName.indexOf('Lexend') !== -1) {
      resolved = "'Lexend', system-ui, sans-serif";
    } else if (fontName.indexOf('Comic') !== -1) {
      resolved = "'Comic Neue', cursive, sans-serif";
    } else if (fontName.indexOf('Jakarta') !== -1) {
      resolved = "'Plus Jakarta Sans', system-ui, sans-serif";
    }
    prefs.font = resolved;
    applyPrefs(prefs);
  };

  window.updateFontSize = function (val) {
    var prefs = getStoredPrefs();
    prefs.fontSize = Math.max(12, Math.min(32, parseInt(val, 10) || 18));
    applyPrefs(prefs);
  };

  window.updateLineHeight = function (val) {
    var prefs = getStoredPrefs();
    prefs.lineHeight = Math.max(1.2, Math.min(2.8, parseFloat(val) || 1.85));
    applyPrefs(prefs);
  };

  window.updateLetterSpacing = function (val) {
    var prefs = getStoredPrefs();
    prefs.letterSpacing = Math.max(0, Math.min(0.2, parseFloat(val) || 0.035));
    applyPrefs(prefs);
  };

  window.setScotopicTint = function (color) {
    var prefs = getStoredPrefs();
    if (SCOTOPIC_THEMES[color]) {
      prefs.scotopicTint = color;
      applyPrefs(prefs);
    }
  };

  window.toggleReadingRuler = function (enabled) {
    var prefs = getStoredPrefs();
    prefs.ruler = Boolean(enabled);
    applyPrefs(prefs);
  };

  window.resetAccessibilityDefaults = function () {
    for (var i = 0; i < STORAGE_KEYS.length; i++) {
      try {
        localStorage.removeItem(STORAGE_KEYS[i]);
      } catch (e) {}
    }
    applyPrefs(Object.assign({}, DEFAULT_PREFS));
  };

  window.initAccessibilityPreferences = function () {
    applyPrefs(getStoredPrefs(), true);
  };

  // Immediate execution before DOM ready to prevent style flashes
  initAccessibilityPreferences();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initAccessibilityPreferences();
    });
  } else {
    initAccessibilityPreferences();
  }
})();
