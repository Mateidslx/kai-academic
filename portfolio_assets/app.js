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
      { id: 'about', title: 'Matéi derrière le code (Chapitres & Principes)', desc: 'Pays Basque, Delta, Escalade, Korrika, Échecs & Projets', href: '#about', tag: 'Histoire' },
      { id: 'flagships', title: 'Flagships & Écosystème 7-Layer', desc: 'Moteur quantitatif Polymarket & 46 PRs open-source', href: '#flagships', tag: 'Projets' },
      { id: 'exploded', title: 'Totem Architecture 3D (WebGL Monolithe)', desc: 'Monolithe 3D isométrique à 6 étages avec shaders GLSL et torsion élastique', href: '#exploded-architecture', tag: '3D WebGL' },
      { id: 'matrix', title: 'The Systems Matrix', desc: 'Bento index : IA, C99, Valgrind, Web & Cloud', href: '#projects', tag: 'Index' },
      { id: 'parcours', title: 'Parcours & ADN Terrain (Bac 20/20 Grand Oral)', desc: 'IUT Anglet, Stages HUPI/Marra, UK, Échecs ~1500 Elo', href: '#parcours', tag: 'Parcours' },
      { id: 'terminal', title: 'Matéi Shell [>_ CLI Terminal]', desc: 'Exécuter valgrind, polymarket, chess, prs, cat cv', action: () => { const btn = document.getElementById('terminal-pill-btn'); if(btn) btn.click(); }, tag: 'CLI' },
      { id: 'cv-fr', title: 'Télécharger CV Français (PDF)', desc: 'Curriculum Vitae officiel Matéi de Saint Léger (FR)', href: 'portfolio_assets/CV_Matei_de_Saint_Leger_FR.pdf', tag: 'Document' },
      { id: 'cv-en', title: 'Download English Resume (PDF)', desc: 'Official Engineering Resume Matéi de Saint Léger (EN)', href: 'portfolio_assets/Resume_Matei_de_Saint_Leger_EN.pdf', tag: 'Document' },
      { id: 'contact', title: 'Contact & Recrutement Alternance', desc: 'Discuter d\'une alternance BUT 2 dès Septembre 2027', href: '#contact', tag: 'Contact' }
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


  // ==========================================================================
  // MATÉI SHELL — INTERACTIVE UNIX CLI TERMINAL DRAWER
  // ==========================================================================
  function initTerminalDrawer() {
    const pillBtn = document.getElementById('terminal-pill-btn');
    const drawer = document.getElementById('terminal-drawer');
    const closeBtn = document.getElementById('terminal-close-btn');
    const input = document.getElementById('terminal-input');
    const body = document.getElementById('terminal-body');

    if (!drawer || !input || !body) return;

    function openDrawer() {
      drawer.classList.add('is-open');
      setTimeout(() => input.focus(), 100);
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
    }

    if (pillBtn) pillBtn.addEventListener('click', () => {
      if (drawer.classList.contains('is-open')) closeDrawer();
      else openDrawer();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    window.addEventListener('keydown', (e) => {
      if (e.key === '`' || e.key === '~') {
        if (!['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
          e.preventDefault();
          if (drawer.classList.contains('is-open')) closeDrawer();
          else openDrawer();
        }
      } else if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });

    function printLine(text, type = '') {
      const line = document.createElement('div');
      line.className = 'term-line-output ' + type;
      line.textContent = text;
      body.appendChild(line);
      body.scrollTop = body.scrollHeight;
    }

    const commandHistory = [];
    let historyIdx = -1;

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = input.value.trim();
        if (!cmd) return;

        printLine('matei@anglet:~$ ' + cmd, 'dim');
        commandHistory.push(cmd);
        historyIdx = commandHistory.length;
        input.value = '';

        const lower = cmd.toLowerCase();

        if (lower === 'help') {
          printLine('COMMANDES DISPONIBLES :');
          printLine('  valgrind    - Audit mémoire C99 AlgoForge (zéro fuite, zéros octets perdus)');
          printLine('  polymarket  - Simulation carnet d\'ordres WebSockets en temps réel (<2ms)');
          printLine('  prs         - Liste des 46 Pull Requests mergées (Twenty CRM, Omi, AlgoForge)');
          printLine('  chess       - Évaluation position Stockfish 17 NNUE & FEN');
          printLine('  cat cv      - Résumé du profil & liens de téléchargement CV');
          printLine('  swarm       - Rejouer l\'animation Swarm Rebuild (takeover)');
          printLine('  clear       - Nettoyer le terminal');
          printLine('  exit        - Fermer le terminal');
        } else if (lower === 'valgrind') {
          printLine('==19842== Memcheck, a memory error detector', 'accent');
          printLine('==19842== Command: ./bin/algoforge_c99 --strict --dataset=100k');
          printLine('[INFO] Heap Allocator: custom memory pool (strict Allman alignment)');
          printLine('[INFO] Quicksort tripartition + AVL rotation: 100,000 nodes');
          printLine('[INFO] Verification: all 100,000 elements sorted in 1.42ms');
          printLine('==19842== HEAP SUMMARY:');
          printLine('==19842==     in use at exit: 0 bytes in 0 blocks', 'success');
          printLine('==19842==   total heap usage: 100,000 allocs, 100,000 frees, 4,800,000 bytes allocated');
          printLine('==19842== All heap blocks were freed -- no leaks are possible', 'success');
          printLine('==19842== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)', 'success');
        } else if (lower === 'polymarket') {
          printLine('[WS] Connecting to wss://ws-subscriptions-clob.polymarket.com/ws/market...', 'accent');
          printLine('[WS] Subscribed to orderbook: presidential-election-2024 / trump-win');
          printLine('[TICK +0.4ms] BID: 0.582 (size: 42,000 USDC) | ASK: 0.584 (size: 28,500 USDC)');
          printLine('[TICK +1.1ms] SPREAD: 0.002 (0.34%) | Imbalance ratio: +1.47');
          printLine('[EXEC +1.9ms] Market order matched on Polygon PoS (Gas: 24 Gwei, Latency: 1.9ms)', 'success');
          printLine('[METRIC] Execution speed: p95 < 2.1ms | 0 slippage vs best book', 'success');
        } else if (lower === 'prs') {
          printLine('[GITHUB] 46 Production PRs Merged Across Open Source Repositories:', 'accent');
          printLine('• Twenty CRM (#1428): Fixed relational cascade sync on workspace deletion');
          printLine('• Twenty CRM (#1504): Optimized GraphQL cursor pagination (94% query speedup)');
          printLine('• BasedHardware/omi (#892): Hardened BLE packet framing against audio dropouts');
          printLine('• BasedHardware/omi (#914): Fixed background sync battery drain on iOS daemon');
          printLine('• AlgoForge (#01-18): C99 Valgrind 0-leak strict algorithmic library');
        } else if (lower === 'chess') {
          printLine('  +---+---+---+---+---+---+---+---+');
          printLine('8 | r | . | b | q | k | b | . | r |');
          printLine('7 | p | p | p | . | . | p | p | p |');
          printLine('6 | . | . | n | . | . | n | . | . |');
          printLine('5 | . | . | . | p | . | . | . | . |');
          printLine('4 | . | . | B | P | . | . | . | . |');
          printLine('3 | . | . | N | . | . | N | . | . |');
          printLine('2 | P | P | P | . | P | P | P | P |');
          printLine('1 | R | . | B | Q | K | . | . | R |');
          printLine('  +---+---+---+---+---+---+---+---+');
          printLine('    a   b   c   d   e   f   g   h');
          printLine('[Stockfish 17 NNUE] Depth: 24/48 | Eval: +2.41 (White advantage)', 'success');
          printLine('[Best line] 1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6');
          printLine('[Player stats] Matéi de Saint Léger: ~1500 Elo (Rapid & Blitz)');
        } else if (lower === 'cat cv') {
          printLine('Matéi de Saint Léger — Étudiant BUT 1 Informatique (IUT d\'Anglet — TD2/TP4)', 'accent');
          printLine('Bac 2026 Mention AB (13,75/20) • Grand Oral 20/20 • Mention DNL Basque (14,40/20)');
          printLine('Recherche: Alternance BUT 2 (Septembre 2027, Côte Basque / Hybride / Remote)');
          printLine('Email: matei64200@gmail.com');
          printLine('GitHub: https://github.com/Mateidslx');
          printLine('LinkedIn: https://linkedin.com/in/matéi-de-saint-léger-24329a32b/');
          printLine('Téléchargements disponibles : CV Français (PDF) et English Resume (PDF)');
        } else if (lower === 'swarm') {
          printLine('[SWARM] Lancement du moteur de rebuild...', 'accent');
          closeDrawer();
          if (typeof window.__startSwarm === 'function') {
            window.__startSwarm();
          } else {
            window.location.search = '?swarm=1';
          }
        } else if (lower === 'clear') {
          body.innerHTML = '';
        } else if (lower === 'exit') {
          closeDrawer();
        } else {
          printLine(`Commande inconnue: '${cmd}'. Tapez 'help' pour la liste.`, 'accent');
        }
      } else if (e.key === 'ArrowUp') {
        if (historyIdx > 0) {
          historyIdx--;
          input.value = commandHistory[historyIdx] || '';
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIdx < commandHistory.length - 1) {
          historyIdx++;
          input.value = commandHistory[historyIdx] || '';
        } else {
          historyIdx = commandHistory.length;
          input.value = '';
        }
      }
    });
  }

  // ==========================================================================
  // AUTONOMOUS CO-PILOT AGENTS (Theo, Elena, Kai, Sarah)
  // ==========================================================================
  
  // ==========================================================================
  // INTERACTIVE CODE SWITCHER LOGIC (ALGOFORGE C99)
  // ==========================================================================
  function initCodeSwitcher() {
    const tabs = document.querySelectorAll('.code-tab-btn');
    const view = document.getElementById('algoforge-code-view');
    if (!tabs.length || !view) return;

    const SNIPPETS = {
      c99: `/* Tripartition canonique IUT Anglet (P. Etcheverry) */
Status_t tree_insert(Node_t** root, const int val)
{
    if (*root == NULL)
    {
        *root = node_allocate(val);
        return (*root != NULL) ? STATUS_OK : STATUS_OOM;
    }
    return (val < (*root)->value)
        ? tree_insert(&(*root)->left, val)
        : tree_insert(&(*root)->right, val);
}`,
      valgrind: `==19842== Memcheck, a memory error detector (Valgrind-3.22)
==19842== Command: ./bin/algoforge_c99 --strict --test=all
==19842== HEAP SUMMARY:
==19842==     in use at exit: 0 bytes in 0 blocks
==19842==   total heap usage: 100,000 allocs, 100,000 frees, 4.8MB
==19842== All heap blocks were freed -- no leaks are possible
==19842== ERROR SUMMARY: 0 errors from 0 contexts (0 suppressed)`,
      merise: `/* MLD Relationnel 3NF — Michel Marquesuzaà (R1.05) */
CREATE TABLE OrdreExecution (
    id_ordre INT PRIMARY KEY,
    timestamp_nano BIGINT NOT NULL,
    ticker VARCHAR(16) NOT NULL,
    quantite NUMERIC(18, 4) CHECK (quantite > 0),
    prix_limite NUMERIC(18, 6) NOT NULL,
    statut_execution VARCHAR(8) CHECK (statut_execution IN ('FILLED','PENDING'))
);`
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const key = tab.getAttribute('data-code');
        if (SNIPPETS[key]) {
          view.textContent = SNIPPETS[key];
        }
      });
    });
  }

  function initCopilotFleet() {
    const container = document.getElementById('copilot-fleet-container');
    if (!container) return;

    const AGENTS = [
      { id: 'theo', name: 'Theo [C99 / Systèmes]', color: '#ef4444', icon: '⚡' },
      { id: 'elena', name: 'Elena [AppSec / Valgrind]', color: '#10b981', icon: '🛡️' },
      { id: 'kai', name: 'Kai [Quant / Polymarket]', color: '#3b82f6', icon: '📈' },
      { id: 'sarah', name: 'Sarah [UI / Accessibilité]', color: '#a855f7', icon: '🎨' }
    ];

    const elements = AGENTS.map((agent, i) => {
      const el = document.createElement('div');
      el.className = 'agent-reticle';
      el.id = 'copilot-' + agent.id;
      el.style.opacity = '0';
      el.innerHTML = `
        <svg class="agent-reticle-cursor" viewBox="0 0 24 24" fill="${agent.color}">
          <path d="M0 0L14 10L8 12L12 20L9 21L5 13L0 17Z" stroke="#000" stroke-width="1.5" />
        </svg>
        <div class="agent-reticle-badge" style="background:${agent.color}; border: 1px solid rgba(255,255,255,0.2);">
          ${agent.icon} ${agent.name}
        </div>
      `;
      container.appendChild(el);
      return { agent, el, targetX: 100 + i * 200, targetY: 400 + i * 60, currentX: 100, currentY: 400 };
    });

    // Gentle roaming across interesting sections
    const targetSelectors = [
      '.nav-dock',
      '.hero-card-left',
      '.hero-card-right',
      '.totem-stage-container',
      '#flagships .bento-main',
      '.dna-chess-card',
      '.contact-card'
    ];

    let lastInteraction = Date.now();
    window.addEventListener('scroll', () => { lastInteraction = Date.now(); }, { passive: true });
    window.addEventListener('mousemove', () => { lastInteraction = Date.now(); }, { passive: true });

    function step() {
      const isIdle = (Date.now() - lastInteraction) > 2500;
      
      elements.forEach((item, idx) => {
        if (!isIdle) {
          // Fade out during active user interactions
          item.el.style.opacity = '0';
          return;
        }

        // Periodically pick targets
        if (Math.random() < 0.02) {
          const sel = targetSelectors[Math.floor(Math.random() * targetSelectors.length)];
          const targetDom = document.querySelector(sel);
          if (targetDom) {
            const rect = targetDom.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              item.targetX = rect.left + Math.random() * rect.width;
              item.targetY = rect.top + Math.random() * Math.min(rect.height, 200);
            }
          }
        }

        // Smooth spring physics interpolation
        item.currentX += (item.targetX - item.currentX) * 0.08;
        item.currentY += (item.targetY - item.currentY) * 0.08;

        item.el.style.transform = `translate3d(${item.currentX}px, ${item.currentY}px, 0)`;
        item.el.style.opacity = '0.9';
      });

      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // ==========================================================================
  // AKARU-KINETIC BIOGRAPHY CHAPTER STAGE & HAIRLINE PRINCIPLES CONTROLLER
  // ==========================================================================
  function initAkaruStory() {
    const panels = Array.from(document.querySelectorAll('#akaru-accordion .akaru-panel'));
    const navButtons = Array.from(document.querySelectorAll('#akaru-accordion .akaru-nav-item'));
    const curtainLayer = document.getElementById('akaru-curtain-layer');
    const counterEl = document.getElementById('akaru-deck-counter');
    const stageIdxEl = document.getElementById('akaru-stage-idx');
    const prevBtn = document.getElementById('akaru-prev-btn');
    const nextBtn = document.getElementById('akaru-next-btn');
    const principlesList = document.getElementById('akaru-principles-list');
    const aboutSection = document.getElementById('about');

    const CHAPTER_LABELS = [
      '01 / 05 — PAYS BASQUE & RACINES',
      '02 / 05 — HORS ÉCRAN & DELTA',
      '03 / 05 — ÉCHECS, ALPHAZERO & IA',
      '04 / 05 — FORGE & LABO QUANT',
      '05 / 05 — IUT ANGLET & OPEN-SOURCE'
    ];

    let currentIdx = 0;
    let wipeMidTimer = null;
    let wipeEndTimer = null;

    function triggerCurtainWipe(onMidpoint) {
      if (!curtainLayer) {
        onMidpoint();
        return;
      }
      if (wipeMidTimer) clearTimeout(wipeMidTimer);
      if (wipeEndTimer) clearTimeout(wipeEndTimer);
      curtainLayer.classList.remove('is-wiping');
      void curtainLayer.offsetWidth;
      curtainLayer.classList.add('is-wiping');
      wipeMidTimer = setTimeout(() => {
        onMidpoint();
      }, 150);
      wipeEndTimer = setTimeout(() => {
        curtainLayer.classList.remove('is-wiping');
      }, 540);
    }

    function applyChapterState(safeIdx) {
      currentIdx = safeIdx;
      panels.forEach((panel, i) => {
        const isActive = i === safeIdx;
        panel.classList.toggle('is-active', isActive);
        panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });
      navButtons.forEach((btn, i) => {
        const isActive = i === safeIdx;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
      if (counterEl && CHAPTER_LABELS[safeIdx]) {
        counterEl.textContent = CHAPTER_LABELS[safeIdx];
      }
      if (stageIdxEl) {
        stageIdxEl.textContent = `CHAPITRE 0${safeIdx + 1} / 0${panels.length}`;
      }
    }

    function activateChapter(index, withCurtain = true) {
      if (!panels.length) return;
      const safeIdx = ((index % panels.length) + panels.length) % panels.length;
      if (safeIdx === currentIdx && panels[safeIdx]?.classList.contains('is-active')) return;
      // Immediately update rail buttons & counter for zero perceived lag
      navButtons.forEach((btn, i) => {
        const isActive = i === safeIdx;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
      if (counterEl && CHAPTER_LABELS[safeIdx]) {
        counterEl.textContent = CHAPTER_LABELS[safeIdx];
      }
      if (stageIdxEl) {
        stageIdxEl.textContent = `CHAPITRE 0${safeIdx + 1} / 0${panels.length}`;
      }
      if (withCurtain) {
        triggerCurtainWipe(() => applyChapterState(safeIdx));
      } else {
        applyChapterState(safeIdx);
      }
    }

    navButtons.forEach((btn, idx) => {
      btn.addEventListener('click', () => activateChapter(idx, true));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          const next = (idx + 1) % panels.length;
          activateChapter(next, true);
          navButtons[next].focus();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const prev = (idx - 1 + panels.length) % panels.length;
          activateChapter(prev, true);
          navButtons[prev].focus();
        }
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => activateChapter(currentIdx - 1, true));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => activateChapter(currentIdx + 1, true));
    }

    // Akaru Scroll-Reveal Observer (Triggers vertical curtain once + self-drawing hairlines)
    if ('IntersectionObserver' in window) {
      let curtainPlayedOnce = false;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            if (entry.target === aboutSection && !curtainPlayedOnce) {
              curtainPlayedOnce = true;
              if (curtainLayer) {
                curtainLayer.classList.add('is-wiping');
                setTimeout(() => curtainLayer.classList.remove('is-wiping'), 540);
              }
            }
            if (entry.target === principlesList) {
              principlesList.classList.add('is-inview');
            }
          });
        },
        { threshold: 0.16 }
      );
      if (aboutSection) observer.observe(aboutSection);
      if (principlesList) observer.observe(principlesList);
    } else if (principlesList) {
      principlesList.classList.add('is-inview');
    }

    const hairlineItems = Array.from(document.querySelectorAll('#akaru-principles-list .akaru-hairline-item'));
    const plates = Array.from(document.querySelectorAll('.akaru-visual-stack .akaru-stack-plate'));

    function selectPrinciple(idx) {
      const targetPlate = hairlineItems[idx]?.getAttribute('data-principle') ?? '0';
      hairlineItems.forEach((item, i) => {
        item.classList.toggle('is-selected', i === idx);
      });
      plates.forEach((plate) => {
        plate.classList.toggle('is-highlighted', plate.getAttribute('data-principle') === targetPlate);
      });
    }

    hairlineItems.forEach((item, idx) => {
      item.addEventListener('mouseenter', () => selectPrinciple(idx));
      item.addEventListener('click', () => selectPrinciple(idx));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectPrinciple(idx);
        }
      });
    });
  }

  function init() {
    initAuroraCanvas();
    initAkaruStory();
    initLayerInteractive();
    initMatrixFilter();
    initClipboard();
    initCommandPalette();
    initTerminalDrawer();
    initCopilotFleet();
    initCodeSwitcher();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
