/**
 * MATÉI DE SAINT LÉGER — PORTFOLIO CORE APP
 * Noir & Crimson Ambient Canvas, Interactive 7-Layer Ecosystem, Systems Matrix Filtering, Dispatch & Keyboard Shortcuts
 */

(function () {
  'use strict';

  // ==========================================================================
  // KAI & POLYMARKET 7-LAYER CONSTITUTIONAL ARCHITECTURAL DATA
  // ==========================================================================
  const LAYER_DATA = {
    1: {
      badge: 'LAYER 01 // DATA INGESTION & WEBSOCKETS',
      title: 'Carnets d\'Ordres & WebSockets Temps Réel',
      desc: 'Flux asynchrones connectés aux WebSockets de Binance et au CLOB Polymarket. Ingestion et parsing des variations de liquidité avec temps de traitement sous 50ms sur VPS Oracle Cloud.',
      tags: ['WebSockets Low-Latency', 'Asyncio Python', 'CLOB Polymarket']
    },
    2: {
      badge: 'LAYER 02 // PROBABILISTIC MODELING',
      title: 'Modélisation Probabiliste & Arbitrage Météo',
      desc: 'Moteur d\'arbitrage probabiliste (Phases V71 à V150 / V230). Comparaison des prévisions météorologiques en temps réel aux distributions de prix du marché prédictif pour identifier les écarts d\'espérance mathématique.',
      tags: ['Calcul d\'Espérance', 'Modèles Météo Nowcast', 'Écart Probabiliste']
    },
    3: {
      badge: 'LAYER 03 // IMMUTABLE LEDGER',
      title: 'Trade Ledger Immuable & Règle des Échanges',
      desc: 'Grand livre de transactions hermétique enregistrant chaque position, slippage CPMM et règle d\'exécution. Aucun ordre n\'est validé sans audit d\'invariants formels.',
      tags: ['Trade Ledger Immuable', 'Audit Déterministe', 'CPMM Invariants']
    },
    4: {
      badge: 'LAYER 04 // AGENTIC CYCLE 24/7',
      title: 'Boucle Autonome 24/7 & Auto-Healing Linux',
      desc: 'Daemons de surveillance systemd tournant en continu sur serveur Ubuntu dédié. Auto-healing instantané, reprise sur panne réseau et heartbeat toutes les 15 minutes avec alertes Telegram.',
      tags: ['Daemons Linux 24/7', 'Sentinelle Watchdog', 'Systemd Daemons']
    },
    5: {
      badge: 'LAYER 05 // HIERARCHICAL MEMORY',
      title: 'Mémoire Hiérarchique à 4 Paliers (Letta/MemGPT)',
      desc: 'Architecture mémoire résiliente combinant Core Memory (profil et invariants), Archival Memory (SQLite FTS5 lexical), vector embeddings et logs append-only. Zéro perte d\'état aux redémarrages.',
      tags: ['SQLite FTS5 Lexical', 'Mémoire 4 Paliers', 'Letta / MemGPT']
    },
    6: {
      badge: 'LAYER 06 // SECURITY SENTINEL',
      title: 'Sentinelle Sécurité & Détection d\'Anomalies',
      desc: 'Auditeur de code et gardien de politique hermétique. Surveillance des fuites de tokens, isolation des processus (CWE-209), et filtrage des mutations non autorisées.',
      tags: ['Fail-Closed Policy', 'Audit Hermétique', 'CWE-209 Mitigation']
    },
    7: {
      badge: 'LAYER 07 // META-COGNITION & METRICS',
      title: 'Cycle d\'Auto-Évolution & Benchmarking',
      desc: 'Couche de méta-cognition effectuant des autopsies automatisées des échecs d\'exécution, l\'optimisation de latence des appels et la consolidation quotidienne des apprentissages.',
      tags: ['Benchmarking Latence', 'Post-Mortems Automatisés', 'Tuning Itératif']
    }
  };

  // ==========================================================================
  // AMBIENT NOIR & CRIMSON OP-ART CANVAS
  // ==========================================================================
  function initAuroraCanvas() {
    const canvas = document.getElementById('aurora-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let animationFrameId = null;
    let isRunning = false;
    let mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    let frame = 0;

    const orbs = [
      { x: 0.35, y: 0.40, radius: 0.50, vx: 0.0003, vy: 0.0002, color: 'rgba(239, 68, 68, 0.14)' },
      { x: 0.70, y: 0.45, radius: 0.42, vx: -0.0002, vy: 0.0003, color: 'rgba(185, 28, 28, 0.10)' },
      { x: 0.50, y: 0.80, radius: 0.48, vx: 0.0002, vy: -0.0002, color: 'rgba(255, 255, 255, 0.03)' }
    ];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX / width;
      mouse.targetY = e.clientY / height;
    }, { passive: true });

    function render() {
      if (!isRunning) return;
      frame++;

      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < 0.1 || orb.x > 0.9) orb.vx *= -1;
        if (orb.y < 0.1 || orb.y > 0.9) orb.vy *= -1;

        const px = (orb.x + (mouse.x - 0.5) * 0.06) * width;
        const py = (orb.y + (mouse.y - 0.5) * 0.06) * height;
        const r = orb.radius * Math.min(width, height);

        const gradient = ctx.createRadialGradient(px, py, 0, px, py, r);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      });

      const centerX = width * 0.5 + (mouse.x - 0.5) * 20;
      const centerY = height * 0.45 + (mouse.y - 0.5) * 20;
      const baseR = (frame * 0.4) % 120;

      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        const ringRadius = baseR + i * 140;
        const alpha = Math.max(0, 0.04 - (ringRadius / (Math.max(width, height) * 0.7)) * 0.04);
        if (alpha > 0.005) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    function startLoop() {
      if (!isRunning) {
        isRunning = true;
        render();
      }
    }

    function stopLoop() {
      if (isRunning) {
        isRunning = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      }
    }

    const heroSection = document.getElementById('hero');
    if (heroSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startLoop();
          else stopLoop();
        });
      }, { threshold: 0.05 });
      observer.observe(heroSection);
    } else {
      startLoop();
    }
  }

  // ==========================================================================
  // INTERACTIVE 7-LAYER ARCHITECTURE CONTROLLER
  // ==========================================================================
  function initLayerInteractive() {
    const tabs = document.querySelectorAll('.layer-tab, .layer-nav-btn');
    const badgeEl = document.getElementById('layer-inspect-id') || document.getElementById('layer-badge');
    const titleEl = document.getElementById('layer-inspect-title') || document.getElementById('layer-title');
    const descEl = document.getElementById('layer-inspect-desc') || document.getElementById('layer-desc');
    const tagsEl = document.getElementById('layer-inspect-tags') || document.getElementById('layer-tags');
    const contentBox = document.getElementById('layer-content') || document.getElementById('layer-content-box');

    if (!tabs.length || !badgeEl || !titleEl || !descEl || !tagsEl) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const layerNum = parseInt(tab.getAttribute('data-layer'), 10);
        const data = LAYER_DATA[layerNum];
        if (!data) return;

        tabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        if (contentBox) {
          contentBox.style.opacity = '0';
          contentBox.style.transform = 'translateY(4px)';

          setTimeout(() => {
            badgeEl.textContent = data.badge;
            titleEl.textContent = data.title;
            descEl.textContent = data.desc;

            tagsEl.innerHTML = '';
            data.tags.forEach((tagText) => {
              const span = document.createElement('span');
              span.className = 'tech-tag';
              span.textContent = tagText;
              tagsEl.appendChild(span);
            });

            contentBox.style.opacity = '1';
            contentBox.style.transform = 'translateY(0)';
          }, 140);
        }
      });
    });
  }

  // ==========================================================================
  // SYSTEMS MATRIX BENTO FILTERING
  // ==========================================================================
  function initMatrixFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn, .matrix-filter-btn');
    const cards = document.querySelectorAll('.bento-card, .matrix-card');

    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter');

        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        cards.forEach((card) => {
          const cardCat = card.getAttribute('data-category') || '';
          if (category === 'all' || cardCat.includes(category)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 20);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 180);
          }
        });
      });
    });
  }

  // ==========================================================================
  // CLIPBOARD COPY WITH TOAST FEEDBACK
  // ==========================================================================
  function initClipboard() {
    const copyBtns = document.querySelectorAll('[data-copy]');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');

    function showToast(text) {
      if (!toast) return;
      if (toastMsg) toastMsg.textContent = 'Adresse e-mail copiée : ' + text;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2800);
    }

    copyBtns.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const textToCopy = btn.getAttribute('data-copy');
        if (!textToCopy) return;

        try {
          await navigator.clipboard.writeText(textToCopy);
          const originalText = btn.innerHTML;
          btn.innerHTML = '<span>✓ Copié !</span>';
          btn.classList.add('copied');
          showToast(textToCopy);

          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('copied');
          }, 2400);
        } catch (_) {
          window.prompt('Copiez l\'adresse e-mail :', textToCopy);
        }
      });
    });
  }

  // ==========================================================================
  // COMMAND PALETTE (CMD+K / CTRL+K)
  // ==========================================================================
  function initCommandPalette() {
    const overlay = document.getElementById('cmdk-overlay');
    const input = document.getElementById('cmdk-input');
    const closeBtn = document.getElementById('cmdk-close');
    const resultsContainer = document.getElementById('cmdk-results');

    if (!overlay || !input) return;

    const commands = [
      { id: 'about', title: 'À Propos & Philosophie', desc: 'Background, premier-principe et formation', href: '#about', tag: 'Section' },
      { id: 'flagships', title: 'Flagships & Écosystème 7-Layer', desc: 'Moteur quantitatif Polymarket & 46 PRs open-source', href: '#flagships', tag: 'Projets' },
      { id: 'matrix', title: 'The Systems Matrix', desc: 'Bento index : IA, C99, Valgrind, Web & Cloud', href: '#projects', tag: 'Index' },
      { id: 'parcours', title: 'Parcours & ADN Terrain', desc: 'IUT Anglet, Stages HUPI/Marra, UK, Échecs', href: '#parcours', tag: 'Parcours' },
      { id: 'contact', title: 'Contact & Recrutement Alternance', desc: 'Discuter d\'une alternance 2e année BUT Informatique', href: '#contact', tag: 'Contact' },
      { id: 'github', title: 'GitHub de Matéi (@Mateidslx)', desc: 'Inspecter les 46 PRs et dépôts publics', href: 'https://github.com/Mateidslx', external: true, tag: 'Lien' },
      { id: 'cv-fr', title: 'Télécharger CV Français (PDF)', desc: 'Format officiel BUT Informatique 2026', href: 'CV_Matei_de_Saint_Leger_FR.pdf', external: true, tag: 'Fichier' },
      { id: 'cv-en', title: 'Download English Resume (PDF)', desc: 'Software Engineering / Systems Resume', href: 'Resume_Matei_de_Saint_Leger_EN.pdf', external: true, tag: 'File' }
    ];

    function openPalette() {
      overlay.classList.add('active');
      input.value = '';
      renderResults(commands);
      setTimeout(() => input.focus(), 60);
    }

    function closePalette() {
      overlay.classList.remove('active');
    }

    function renderResults(list) {
      if (!resultsContainer) return;
      resultsContainer.innerHTML = '';
      if (!list.length) {
        resultsContainer.innerHTML = '<div class="cmdk-empty">Aucun résultat trouvé.</div>';
        return;
      }
      list.forEach((item, idx) => {
        const a = document.createElement('a');
        a.href = item.href;
        if (item.external) {
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
        }
        a.className = 'cmdk-item' + (idx === 0 ? ' selected' : '');
        a.innerHTML = `
          <div class="cmdk-item-main">
            <span class="cmdk-item-title">${item.title}</span>
            <span class="cmdk-item-desc">${item.desc}</span>
          </div>
          <span class="cmdk-item-tag">${item.tag}</span>
        `;
        a.addEventListener('click', () => closePalette());
        resultsContainer.appendChild(a);
      });
    }

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (overlay.classList.contains('active')) closePalette();
        else openPalette();
      }
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closePalette();
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closePalette);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePalette();
    });

    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim();
      if (!q) {
        renderResults(commands);
        return;
      }
      const filtered = commands.filter((c) =>
        c.title.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.tag.toLowerCase().includes(q)
      );
      renderResults(filtered);
    });

    document.querySelectorAll('[data-cmdk-trigger]').forEach((b) => {
      b.addEventListener('click', openPalette);
    });
  }

  function init() {
    initAuroraCanvas();
    initLayerInteractive();
    initMatrixFilter();
    initClipboard();
    initCommandPalette();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
