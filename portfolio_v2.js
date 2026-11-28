(function () {
  'use strict';

  var runway = document.getElementById('intro-runway');
  var hairlineFill = document.getElementById('scroll-hairline-fill');

  var backdrop = document.getElementById('backdrop-layer');
  var monumentalType = document.getElementById('hero-monumental-type');
  var halftone = document.getElementById('halftone-sweep');
  var dossierCards = document.getElementById('dossier-cards');
  var card1 = document.getElementById('d-card-1');
  var card2 = document.getElementById('d-card-2');
  var card3 = document.getElementById('d-card-3');

  var subjectBox = document.getElementById('hero-subject-box');
  var reticle = document.getElementById('head-reticle');
  var xrayRibbon = document.getElementById('xray-ribbon');
  var xrayClimax = document.getElementById('xray-climax');
  var xrayTicker = document.getElementById('xray-ticker');
  var xrayLaser = document.getElementById('xray-laser-streak');

  var nameWrap = document.getElementById('callout-name-wrap');
  var titleEl = document.getElementById('callout-title');
  var factRows = Array.from(document.querySelectorAll('.fact-row'));
  var chapterRail = document.getElementById('chapter-rail');
  var crSteps = Array.from(document.querySelectorAll('.cr-step'));
  var scrollCue = document.getElementById('scroll-cue');
  var lensFlare = document.getElementById('lens-flare');
  var hoverCue = document.getElementById('hover-cue');

  function clamp01(v) { return v < 0 ? 0 : (v > 1 ? 1 : v); }
  function smoothstep(a, b, x) {
    var t = clamp01((x - a) / (b - a));
    return t * t * (3 - 2 * t);
  }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* ========================================================================
     01. AUDIO CONTROLLER (Reel DgAnRXaI6Zi Track + Scroll Volume Fade)
     ======================================================================== */
  var audio = document.getElementById('intro-audio');
  var audioBtn = document.getElementById('audio-toggle-btn');
  var audioLabel = document.getElementById('audio-label');
  var audioVol = document.getElementById('audio-vol');

  var audioWanted = false;
  var manuallyMuted = false;
  var currentScrollP = 0;

  function syncAudioUI(vol) {
    if (!audioBtn) return;
    var playing = audioWanted && !manuallyMuted && audio && !audio.paused && vol > 0.01;
    audioBtn.classList.toggle('is-on', audioWanted && !manuallyMuted);
    audioBtn.classList.toggle('is-playing', playing);
    audioBtn.setAttribute('aria-pressed', audioWanted && !manuallyMuted ? 'true' : 'false');
    if (audioLabel) {
      if (manuallyMuted) audioLabel.textContent = 'Son coupé';
      else if (audioWanted) audioLabel.textContent = currentScrollP >= 0.95 ? 'Fondu terminé' : 'Son actif';
      else audioLabel.textContent = 'Activer le son ♪';
    }
    if (audioVol) audioVol.textContent = Math.round(vol * 100) + '%';
  }

  function updateAudioVolume(p) {
    if (!audio) return;
    var fade = 1 - smoothstep(0.68, 0.96, p);
    var targetVol = (audioWanted && !manuallyMuted) ? 0.82 * fade : 0;
    audio.volume = clamp01(targetVol);

    if (audioWanted && !manuallyMuted) {
      if (p >= 0.965 || targetVol <= 0.005) {
        if (!audio.paused) audio.pause();
      } else if (audio.paused) {
        audio.play().catch(function () {});
      }
    } else if (!audio.paused) {
      audio.pause();
    }
    syncAudioUI(targetVol);
  }

  function unlockAudio() {
    if (!audio || manuallyMuted || audioWanted) return;
    audioWanted = true;
    audio.play().then(function () {
      updateAudioVolume(currentScrollP);
    }).catch(function () {
      audioWanted = false;
      syncAudioUI(0);
    });
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!audioWanted) {
        manuallyMuted = false;
        unlockAudio();
      } else {
        manuallyMuted = !manuallyMuted;
        if (!manuallyMuted && currentScrollP < 0.96) {
          audio.play().catch(function () {});
        }
        updateAudioVolume(currentScrollP);
      }
    });
  }

  ['pointerdown', 'keydown'].forEach(function (evt) {
    window.addEventListener(evt, function firstGesture() {
      if (!manuallyMuted && !audioWanted) unlockAudio();
      window.removeEventListener(evt, firstGesture);
    }, { passive: true });
  });

  /* ========================================================================
     02. DUAL IDENTITY (DARK=MASK->SUIT / LIGHT=SUIT->MASK) + SURGICAL REVEAL
     ======================================================================== */
  var canvas = document.getElementById('hero-mask-canvas');
  var maskBtn = document.getElementById('mask-toggle-btn');
  var themeBtn = document.getElementById('theme-toggle-btn');
  var themeLabel = document.getElementById('theme-toggle-label');
  var suiteThemeBtn = document.getElementById('suite-theme-btn');
  var ctx = canvas ? canvas.getContext('2d') : null;
  var maskBuf = document.createElement('canvas');
  var mctx = maskBuf.getContext('2d');
  var paintCanvas = document.createElement('canvas');
  var pctx = paintCanvas.getContext('2d');
  var hasPainted = false;
  var lastPaintPt = null;

  var imgSuit = new Image();
  var imgHoodie = new Image();
  var imgsLoaded = 0;
  imgSuit.onload = imgHoodie.onload = function () { imgsLoaded++; };
  imgSuit.src = 'portfolio_v2_assets/intro_matei_suit.png?v=10b';
  imgHoodie.src = 'portfolio_v2_assets/intro_matei_hoodie_mask.png?v=10b';

  var currentTheme = 'dark';
  var fullMaskToggled = false;

  function setTheme(nextTheme) {
    currentTheme = nextTheme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    fullMaskToggled = false;
    pointerInside = false;
    teaserStartMs = -1;
    teaserTriggered = true;
    for (var k = 0; k < trail.length; k++) trail[k].r = 0;
    hasPainted = false;
    lastPaintPt = null;
    if (pctx && paintCanvas.width > 0) pctx.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
    if (maskBtn) maskBtn.classList.remove('is-on');
    if (themeBtn) {
      themeBtn.classList.toggle('is-on', currentTheme === 'light');
      themeBtn.setAttribute('aria-pressed', currentTheme === 'light' ? 'true' : 'false');
    }
    if (themeLabel) {
      themeLabel.textContent = currentTheme === 'dark' ? '☾ Sombre' : '☀ Clair';
    }
    if (suiteThemeBtn) {
      suiteThemeBtn.textContent = currentTheme === 'dark' ? 'Passer en Mode Clair' : 'Passer en Mode Sombre';
    }
    if (hoverCue) {
      hoverCue.textContent = currentTheme === 'dark'
        ? 'Survolez pour révéler le visage'
        : 'Survolez pour révéler le masque';
      hoverCue.classList.remove('is-hidden');
    }
    window.dispatchEvent(new CustomEvent('v2-theme-change', { detail: { theme: currentTheme } }));
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }
  if (suiteThemeBtn) {
    suiteThemeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  var pointerInside = false;
  var hasUserHovered = false;
  var pointerTarget = { x: 0.489, y: 0.193 };
  var winPtr = { x: 0, y: 0 };
  var smoothPtr = { x: 0, y: 0 };
  var teaserTriggered = false;
  var teaserStartMs = -1;

  var trail = [];
  for (var i = 0; i < 10; i++) {
    trail.push({ x: 0.489, y: 0.193, r: 0 });
  }

  window.addEventListener('pointermove', function (e) {
    winPtr.x = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
    winPtr.y = (e.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
  }, { passive: true });

  var centerOffsetX = 0;
  function updateSubjectCenterOffset() {
    if (!subjectBox) return;
    var prev = subjectBox.style.transform;
    subjectBox.style.transform = 'none';
    var r = subjectBox.getBoundingClientRect();
    centerOffsetX = (window.innerWidth * 0.5) - (r.left + r.width * 0.5);
    subjectBox.style.transform = prev;
  }

  function resizeHeroCanvas() {
    if (!canvas || !subjectBox) return;
    updateSubjectCenterOffset();
    var r = subjectBox.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.max(1, Math.round(r.width * dpr));
    var h = Math.max(1, Math.round(r.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      var prevPaint = null;
      if (hasPainted && paintCanvas.width > 0 && paintCanvas.height > 0) {
        prevPaint = document.createElement('canvas');
        prevPaint.width = paintCanvas.width;
        prevPaint.height = paintCanvas.height;
        prevPaint.getContext('2d').drawImage(paintCanvas, 0, 0);
      }
      canvas.width = w; canvas.height = h;
      maskBuf.width = w; maskBuf.height = h;
      paintCanvas.width = w; paintCanvas.height = h;
      if (prevPaint) pctx.drawImage(prevPaint, 0, 0, w, h);
    }
  }
  resizeHeroCanvas();
  window.addEventListener('resize', resizeHeroCanvas, { passive: true });

  function stampPaintSegment(x0, y0, x1, y1) {
    if (!pctx || paintCanvas.width <= 0) return;
    var w = paintCanvas.width;
    var h = paintCanvas.height;
    var r = w * 0.072;
    var dist = Math.hypot((x1 - x0) * w, (y1 - y0) * h);
    var steps = Math.max(1, Math.ceil(dist / Math.max(4, r * 0.28)));
    var tSec = performance.now() * 0.001;

    pctx.save();
    pctx.fillStyle = '#ffffff';
    pctx.shadowColor = '#ffffff';
    pctx.shadowBlur = Math.max(5, w * 0.009);
    for (var s = 0; s <= steps; s++) {
      var t = s / steps;
      var px = lerp(x0, x1, t) * w;
      var py = lerp(y0, y1, t) * h;
      drawLiquidBlob(pctx, px, py, r, tSec, s * 0.4);
      pctx.fill();
    }
    pctx.restore();
    hasPainted = true;
  }

  if (subjectBox) {
    subjectBox.addEventListener('pointerenter', function (e) {
      pointerInside = true;
      hasUserHovered = true;
      if (hoverCue) hoverCue.classList.add('is-hidden');
      var r = subjectBox.getBoundingClientRect();
      pointerTarget.x = clamp01((e.clientX - r.left) / Math.max(1, r.width));
      pointerTarget.y = clamp01((e.clientY - r.top) / Math.max(1, r.height));
      lastPaintPt = { x: pointerTarget.x, y: pointerTarget.y };
      stampPaintSegment(pointerTarget.x, pointerTarget.y, pointerTarget.x, pointerTarget.y);
    }, { passive: true });

    subjectBox.addEventListener('pointermove', function (e) {
      pointerInside = true;
      hasUserHovered = true;
      var r = subjectBox.getBoundingClientRect();
      pointerTarget.x = clamp01((e.clientX - r.left) / Math.max(1, r.width));
      pointerTarget.y = clamp01((e.clientY - r.top) / Math.max(1, r.height));
      var prev = lastPaintPt || pointerTarget;
      stampPaintSegment(prev.x, prev.y, pointerTarget.x, pointerTarget.y);
      lastPaintPt = { x: pointerTarget.x, y: pointerTarget.y };
    }, { passive: true });

    subjectBox.addEventListener('pointerleave', function () {
      pointerInside = false;
      lastPaintPt = null;
    }, { passive: true });
  }

  if (maskBtn) {
    maskBtn.addEventListener('click', function () {
      fullMaskToggled = !fullMaskToggled;
      maskBtn.classList.toggle('is-on', fullMaskToggled);
      if (!fullMaskToggled) {
        hasPainted = false;
        lastPaintPt = null;
        if (pctx && paintCanvas.width > 0) pctx.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
      }
      if (hoverCue && fullMaskToggled) hoverCue.classList.add('is-hidden');
    });
  }

  function drawLiquidBlob(c, cx, cy, baseR, timeSec, seed) {
    var steps = 64;
    c.beginPath();
    for (var s = 0; s <= steps; s++) {
      var ang = (s / steps) * Math.PI * 2;
      var wobble =
        1 +
        0.11 * Math.sin(ang * 3 + timeSec * 4.0 + seed) +
        0.07 * Math.cos(ang * 5 - timeSec * 2.9 + seed * 1.7);
      var rad = baseR * wobble;
      var px = cx + Math.cos(ang) * rad;
      var py = cy + Math.sin(ang) * rad;
      if (s === 0) c.moveTo(px, py);
      else c.lineTo(px, py);
    }
    c.closePath();
  }

  function renderMaskFrame(now) {
    if (!ctx || !canvas || imgsLoaded < 2) return;
    var w = canvas.width;
    var h = canvas.height;
    var timeSec = now * 0.001;

    var baseImg = currentTheme === 'dark' ? imgHoodie : imgSuit;
    var revealImg = currentTheme === 'dark' ? imgSuit : imgHoodie;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(baseImg, 0, 0, w, h);

    // 0.9s automatic liquid discovery teaser when crossing p >= 0.32 if user hasn't hovered
    var teaserActive = false;
    var teaserX = 0.489, teaserY = 0.193;
    if (teaserStartMs > 0 && !hasUserHovered && !fullMaskToggled) {
      var elapsed = (now - teaserStartMs) / 900;
      if (elapsed >= 0 && elapsed < 1) {
        teaserActive = true;
        teaserX = lerp(0.43, 0.55, elapsed);
        teaserY = 0.195 + Math.sin(elapsed * Math.PI) * 0.025;
      } else {
        teaserStartMs = -1;
      }
    }

    var active = fullMaskToggled || pointerInside || teaserActive;
    if (reticle) reticle.classList.toggle('is-hover-reveal', pointerInside || fullMaskToggled || hasPainted);
    var headTargetR = fullMaskToggled ? Math.max(w, h) * 1.15 : (active ? w * 0.072 : 0);
    var aimX = fullMaskToggled ? 0.49 : (pointerInside ? pointerTarget.x : teaserX);
    var aimY = fullMaskToggled ? 0.20 : (pointerInside ? pointerTarget.y : teaserY);

    trail[0].x = lerp(trail[0].x, aimX, 0.36);
    trail[0].y = lerp(trail[0].y, aimY, 0.36);
    trail[0].r = lerp(trail[0].r, headTargetR, fullMaskToggled ? 0.14 : (active ? 0.24 : 0.16));

    var anyVisible = hasPainted || fullMaskToggled || trail[0].r > 1.2;
    for (var k = 1; k < trail.length; k++) {
      var prev = trail[k - 1];
      trail[k].x = lerp(trail[k].x, prev.x, 0.34);
      trail[k].y = lerp(trail[k].y, prev.y, 0.34);
      var decay = 1 - k / (trail.length + 1);
      var targetRK = fullMaskToggled ? headTargetR * decay : (active ? headTargetR * (0.44 + 0.56 * decay) : 0);
      trail[k].r = lerp(trail[k].r, targetRK, active ? 0.22 : 0.18);
      if (trail[k].r > 1.2) anyVisible = true;
    }

    if (anyVisible) {
      mctx.save();
      mctx.globalCompositeOperation = 'source-over';
      mctx.clearRect(0, 0, w, h);
      if (fullMaskToggled) {
        mctx.fillStyle = '#ffffff';
        mctx.fillRect(0, 0, w, h);
      } else {
        if (hasPainted) mctx.drawImage(paintCanvas, 0, 0);
        mctx.fillStyle = '#ffffff';
        mctx.shadowColor = '#ffffff';
        mctx.shadowBlur = Math.max(5, w * 0.009);
        for (var j = 0; j < trail.length; j++) {
          if (trail[j].r < 1.2) continue;
          drawLiquidBlob(mctx, trail[j].x * w, trail[j].y * h, trail[j].r, timeSec, j * 0.9);
          mctx.fill();
        }
      }
      mctx.restore();

      mctx.globalCompositeOperation = 'source-in';
      mctx.drawImage(revealImg, 0, 0, w, h);
      ctx.drawImage(maskBuf, 0, 0);
    }
  }

  /* ========================================================================
     03. EXTENDED 760vh 6-BEAT SCROLL CHOREOGRAPHY
     ======================================================================== */
  var targetP = 0;
  var smoothP = 0;

  function computeScrollProgress() {
    var docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (hairlineFill) {
      hairlineFill.style.transform = 'scaleX(' + clamp01(window.scrollY / docH).toFixed(4) + ')';
    }
    if (!runway) return 0;
    var rect = runway.getBoundingClientRect();
    var total = Math.max(1, runway.offsetHeight - window.innerHeight);
    return clamp01(-rect.top / total);
  }

  function applyStageTransforms(p, now) {
    currentScrollP = p;
    document.documentElement.setAttribute('data-scroll-zone', p >= 0.89 ? 'suite' : 'intro');
    document.documentElement.setAttribute('data-intro', p < 0.08 ? 'pure' : 'active');

    if (!teaserTriggered && p >= 0.32 && p < 0.78) {
      teaserTriggered = true;
      teaserStartMs = now || performance.now();
    }

    // Smooth pointer parallax
    smoothPtr.x = lerp(smoothPtr.x, winPtr.x, 0.08);
    smoothPtr.y = lerp(smoothPtr.y, winPtr.y, 0.08);
    var px = smoothPtr.x;
    var py = smoothPtr.y;

    // Beat 1 (0.00 -> 0.22): Pure Centered Zoomed-In Face -> Dolly Out & Pan Right
    var pan = smoothstep(0.0, 0.22, p);
    var outFade = 1 - smoothstep(0.92, 0.99, p) * 0.25;

    if (backdrop) {
      var bgX = lerp(0, -16, pan) - p * 12 - px * 9;
      var bgY = -py * 6;
      var bgScale = lerp(1.12, 1.04, pan) + p * 0.06;
      backdrop.style.transform = 'translate3d(' + bgX.toFixed(1) + 'px,' + bgY.toFixed(1) + 'px,0) scale(' + bgScale.toFixed(4) + ')';
    }
    if (monumentalType) {
      monumentalType.style.opacity = (pan * outFade).toFixed(3);
      monumentalType.style.transform = 'translate3d(calc(-50% + ' + (-px * 16).toFixed(1) + 'px), calc(-50% + ' + (-py * 10).toFixed(1) + 'px), 0) scale(' + lerp(1.08, 1.0, pan).toFixed(3) + ')';
    }
    if (subjectBox) {
      var subX = lerp(centerOffsetX, 0, pan) + px * 4;
      var subY = lerp(subjectBox.offsetHeight * 0.22, 0, pan);
      var subScale = lerp(1.48, 1.0, pan) + smoothstep(0.22, 0.70, p) * 0.05;
      subjectBox.style.transform = 'translate3d(' + subX.toFixed(1) + 'px,' + subY.toFixed(1) + 'px,0) scale(' + subScale.toFixed(4) + ')';
    }
    if (dossierCards) {
      dossierCards.style.transform = 'translate3d(' + (-px * 12).toFixed(1) + 'px,' + (-py * 8).toFixed(1) + 'px,0)';
    }

    // Beat 2 (0.16 -> 0.30): Reticle Lock + Halftone Sweep + Collar X-Ray Scan
    if (halftone) {
      var ht = smoothstep(0.18, 0.38, p);
      halftone.style.opacity = (ht * outFade).toFixed(3);
      halftone.style.transform = 'rotate(-5.5deg) translate3d(' + ((1 - ht) * 16).toFixed(1) + '%, ' + ((1 - ht) * 95).toFixed(1) + '%, 0)';
    }
    if (reticle) {
      var rt = smoothstep(0.16, 0.32, p);
      reticle.style.opacity = (rt * outFade).toFixed(3);
      var rScale = lerp(1.60, 1.0, rt);
      var rRot = lerp(-18, -8, rt);
      reticle.style.transform = 'translate(-50%, -50%) rotate(' + rRot.toFixed(2) + 'deg) scale(' + rScale.toFixed(3) + ')';
    }

    if (xrayRibbon) {
      var xrIn = smoothstep(0.17, 0.24, p);
      var xrDrop = smoothstep(0.30, 0.42, p);
      var xrTop = lerp(24, 65, xrDrop);
      var xrH = lerp(16, 36, xrDrop);
      xrayRibbon.style.opacity = (xrIn * outFade).toFixed(3);
      xrayRibbon.style.top = xrTop.toFixed(1) + '%';
      xrayRibbon.style.height = xrH.toFixed(1) + '%';
    }

    // Beat 3 (0.30 -> 0.44): MATÉI DE SAINT LÉGER + SYSTÈME DÉVELOPPEUR
    var nT = smoothstep(0.30, 0.40, p);
    if (nameWrap) {
      nameWrap.style.opacity = (nT * outFade).toFixed(3);
      nameWrap.style.transform = 'translateX(' + ((1 - nT) * -22).toFixed(1) + 'px)';
    }
    var tT = smoothstep(0.34, 0.44, p);
    if (titleEl) {
      titleEl.style.opacity = (tT * outFade).toFixed(3);
      titleEl.style.transform = 'translateY(' + ((1 - tT) * 16).toFixed(1) + 'px)';
    }

    // Beat 4 (0.42 -> 0.56): 3 Project Cards + 4 Fact Black Wipes (all finished by p=0.55, holding cleanly 0.56->0.72!)
    var c1 = smoothstep(0.42, 0.51, p);
    var c2 = smoothstep(0.46, 0.54, p);
    var c3 = smoothstep(0.49, 0.57, p);
    if (card1) {
      card1.style.opacity = (c1 * outFade).toFixed(3);
      card1.style.transform = 'translate3d(0,' + ((1 - c1) * 28).toFixed(1) + 'px,0) rotate(' + lerp(-10, -4, c1).toFixed(1) + 'deg) scale(' + lerp(0.82, 1, c1).toFixed(3) + ')';
    }
    if (card2) {
      card2.style.opacity = (c2 * outFade).toFixed(3);
      card2.style.transform = 'translate3d(0,' + ((1 - c2) * 30).toFixed(1) + 'px,0) rotate(' + lerp(8, 2.5, c2).toFixed(1) + 'deg) scale(' + lerp(0.82, 1, c2).toFixed(3) + ')';
    }
    if (card3) {
      card3.style.opacity = (c3 * outFade).toFixed(3);
      card3.style.transform = 'translate3d(0,' + ((1 - c3) * 26).toFixed(1) + 'px,0) rotate(' + lerp(10, 4.5, c3).toFixed(1) + 'deg) scale(' + lerp(0.82, 1, c3).toFixed(3) + ')';
    }

    factRows.forEach(function (row, idx) {
      var start = 0.40 + idx * 0.030;
      var appear = smoothstep(start - 0.02, start + 0.025, p);
      var wipe = smoothstep(start + 0.01, start + 0.06, p);
      row.style.opacity = (appear * outFade).toFixed(3);
      var wEl = row.querySelector('.fact-wipe');
      if (wEl) wEl.style.transform = 'translateX(' + (wipe * 105).toFixed(1) + '%)';
    });

    // Beat 5 (0.66 -> 0.87): Extended Full Edge-to-Edge Climax Diagonal X-Ray Slash
    var clProg = smoothstep(0.66, 0.87, p);
    var clOp = smoothstep(0.66, 0.71, p) * (1 - smoothstep(0.83, 0.88, p));
    if (xrayClimax) {
      xrayClimax.style.opacity = clOp.toFixed(3);
      xrayClimax.style.top = lerp(4, 48, clProg).toFixed(1) + '%';
      xrayClimax.style.transform = 'rotate(-15deg)';
    }
    if (xrayTicker) {
      xrayTicker.style.transform = 'translateX(' + lerp(8, -18, clProg).toFixed(2) + '%)';
    }
    if (xrayLaser) {
      var lOp = smoothstep(0.71, 0.75, p) * (1 - smoothstep(0.80, 0.85, p));
      xrayLaser.style.opacity = lOp.toFixed(3);
      xrayLaser.style.top = lerp(28, 62, clProg).toFixed(1) + '%';
    }
    if (reticle) {
      var rt = smoothstep(0.16, 0.32, p);
      var rScale = lerp(1.60, 1.0, rt) * lerp(1.0, 0.92, clOp);
      var rRot = lerp(-18, -8, rt);
      reticle.style.transform = 'translate(-50%, -50%) rotate(' + rRot.toFixed(2) + 'deg) scale(' + rScale.toFixed(3) + ')';
    }

    // Beat 6 (0.83 -> 1.00): Subtle Climax Flare into Torn-Page Divider
    if (lensFlare) {
      var fl = smoothstep(0.81, 0.87, p) * (1 - smoothstep(0.91, 0.96, p)) * 0.24;
      lensFlare.style.opacity = fl.toFixed(3);
    }

    // Chapter rail state (hidden at 0%, appears as dossier unlocks)
    if (chapterRail) {
      chapterRail.style.opacity = (smoothstep(0.14, 0.22, p) * outFade).toFixed(3);
      var activeCr = p < 0.20 ? 0 : (p < 0.40 ? 1 : (p < 0.66 ? 2 : 3));
      crSteps.forEach(function (el, idx) {
        el.classList.toggle('is-active', idx === activeCr);
      });
    }

    if (scrollCue) scrollCue.style.opacity = (1 - smoothstep(0.03, 0.12, p)).toFixed(3);

    updateAudioVolume(p);
  }

  window.addEventListener('scroll', function () {
    targetP = computeScrollProgress();
  }, { passive: true });

  targetP = computeScrollProgress();
  smoothP = targetP;
  applyStageTransforms(smoothP, performance.now());

  function tick(now) {
    smoothP = lerp(smoothP, targetP, 0.16);
    if (Math.abs(smoothP - targetP) < 0.0005) smoothP = targetP;
    applyStageTransforms(smoothP, now);
    renderMaskFrame(now);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
