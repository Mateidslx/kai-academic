/**
 * MATÉI DE SAINT LÉGER — PORTFOLIO CORE APP
 * Noir & Crimson Ambient Canvas, Interactive 7-Layer Ecosystem, Systems Matrix Filtering, Dispatch & Keyboard Shortcuts
 */

(function () {
  'use strict';

  // ==========================================================================
  // ÉTUDE #01 — POLYMARKET QUANTITATIVE & ADVERSARIAL AUDITS (5 PHASES)
  // ==========================================================================
  const LAYER_DATA = {
    1: {
      badge: 'PHASE 01 // PARITÉ BIT-À-BIT & CARNETS L2',
      title: 'Collecteur Binance WS & Polymarket CLOB (0.00000000 écart live/replay)',
      desc: 'Flux asynchrones branchés sur depth@100ms / aggTrade et le CLOB Polymarket (extraction exacte min(asks)), persistés dans SQLite en mode WAL (btc_raw_microstructure.db & weather_trading.db ~60k lignes). Les unités Fahrenheit/Celsius et horodatages 1970 défaillants sont normalisés avec une parité mathématique exacte de 0.00000000 entre flux live et replay SQL.',
      tags: ['depth@100ms WS', 'SQLite WAL', 'min(asks) CLOB']
    },
    2: {
      badge: 'PHASE 02 // RÉSEAUX PROBABILISTES & CALIBRATION',
      title: '5-Gaussian Residual GMM-MDN (RMSE 0.677°C) & TCN Multi-Task 30×32',
      desc: 'Réseau PyTorch GMM-MDN entraîné sur 466 572 prévisions / 4,8M mesures (GraphCast 0.25°, ECMWF AIFS, Open-Meteo → RMSE 0,677°C) avec calibration isotone PAV réduisant l\'ECE de 17,14% à 1,43%. En parallèle, TCN séquentiel 30×32 features sur 4 horizons (0m/+5m/+10m/+15m, FocalLoss, Sharpe Walk-Forward 2,45 / Sortino 3,82).',
      tags: ['PyTorch GMM-MDN', 'Isotonic PAV 1.43%', 'TCN 30×32']
    },
    3: {
      badge: 'PHASE 03 // FALSIFICATION ADVERSARIALE & KILL-SWITCH',
      title: 'Arrêt volontaire de V43 (+117k$ simulés) & Purge de 47% de labels biaisés',
      desc: 'Plutôt que d\'exploiter des backtests flatteurs, une batterie destructive a exposé : 47% d\'étiquettes METAR corrompues et 13,4x doublons (~69k lignes purgées), ecmwf_ifs04 retournant None sur 79,5% des 984 marchés (V183), et une fuite temporelle sur V43 (0 trade pré-12h UTC). Système gelé volontairement avant tout capital réel + kill-switch auto à Sharpe > 8.0, test permutation (V131.6), Deflated Sharpe & PBO/CSCV.',
      tags: ['Kill-Switch Sharpe > 8', 'PBO / CSCV', 'Look-Ahead Audit']
    },
    4: {
      badge: 'PHASE 04 // SIMULATION CARNET L2 & FLAT SIZING STRICT',
      title: 'Lissage de Laplace, Abstention Engine & Contrefeu 1,00 $ / Trade',
      desc: 'Simulateur CLOB L2 intégrant ~165 ms de latence profilée, lissage bayésien de Laplace (k=5, n0=10) par ville, garde anti-cannibalisation (Single-Bracket Guard) et moteur d\'abstention bloquant les cotes pièges (1€ pour 0,05€). Après 10 000 runs Block-Bootstrap Monte Carlo prouvant le risque de ruine du Kelly composé sous faible capital, règle stricte de flat sizing à 1,00 $.',
      tags: ['Bootstrap 10k Runs', 'AbstentionEngine', 'Flat Sizing 1.00$']
    },
    5: {
      badge: 'PHASE 05 // EXPLOITATION ORACLE OCI & DÉTECTION DE DÉRIVE',
      title: 'Daemons Systemd 24/7, Chaîne SHA-256 & Test Séquentiel de Wald (SPRT)',
      desc: 'Pipeline déployé sur VMs Ubuntu Oracle Cloud via unités systemd auto-guéris, journal d\'audit immuable SQLite chaîné par empreintes SHA-256 (audit_chain.py), détecteur de concept drift PSI (concept_drift_detector.py) et test séquentiel SPRT (sprt_monitor.py) pour couper toute stratégie dès dérive OOS.',
      tags: ['Ubuntu 24.04 Systemd', 'SHA-256 Audit Chain', 'SPRT & PSI']
    }
  };

  // ==========================================================================
  // INTERACTIVE 5-PHASE TEARDOWN CONTROLLER (ÉTUDE #01)
  // ==========================================================================
  function initLayerInteractive() {
    const tabs = document.querySelectorAll('.layer-tab, .layer-nav-btn');
    const badgeEl = document.getElementById('layer-inspect-id') || document.getElementById('layer-badge');
    const titleEl = document.getElementById('layer-inspect-title') || document.getElementById('layer-title');
    const descEl = document.getElementById('layer-inspect-desc') || document.getElementById('layer-desc');
    const tagsEl = document.getElementById('layer-inspect-tags') || document.getElementById('layer-tags');
    const contentBox = document.getElementById('layer-content') || document.getElementById('layer-content-box');

    if (!tabs.length || !badgeEl || !titleEl || !descEl || !tagsEl) return;
    let lastLayer = 1;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const layerNum = parseInt(tab.getAttribute('data-layer'), 10);
        const data = LAYER_DATA[layerNum];
        if (!data || layerNum === lastLayer) return;
        const dir = layerNum > lastLayer ? 1 : -1;
        lastLayer = layerNum;

        tabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        if (contentBox) {
          contentBox.style.opacity = '0';
          contentBox.style.filter = 'blur(3px)';
          contentBox.style.transform = `translateX(${-dir * 18}px)`;

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

            contentBox.style.transition = 'none';
            contentBox.style.transform = `translateX(${dir * 20}px)`;
            void contentBox.offsetWidth;
            contentBox.style.transition = '';
            contentBox.style.opacity = '1';
            contentBox.style.filter = 'blur(0px)';
            contentBox.style.transform = 'translateX(0)';
          }, 130);
        }
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
      { id: 'about', title: 'Matéi derrière le code (Chapitres)', desc: 'Pays Basque, Escalade, Échecs, Projets & IUT Anglet', href: '#about', tag: 'Portrait' },
      { id: 'case-quant', title: 'Étude #01 — Moteur Quantitatif Polymarket V1→V211', desc: 'PyTorch GMM-MDN, TCN 30×32, Kill-Switch V43 & PBO/CSCV', href: '#case-quant', tag: 'Quant' },
      { id: 'case-oss', title: 'Étude #02 — Omi (7 PRs), Twenty CRM & SafePath-Lint', desc: 'PRs #14604..#20168, #26490/#26502, AST SPL001..SPL004', href: '#case-oss', tag: 'AppSec' },
      { id: 'case-c99', title: 'Étude #03 — Cache LRU O(1), Dijkstra C99 & AlgoForge Pro', desc: 'Code ISO C99 strict -Wall -Werror, Valgrind & Transpiler', href: '#case-c99', tag: 'ISO C99' },
      { id: 'case-kai', title: 'Étude #04 — Kai Core OS, Kai Academic & Forge B2B', desc: 'StateVerifier, SQLite FTS5 BM25 (79 p.) & 735 tests B2B', href: '#case-kai', tag: 'Systèmes' },
      { id: 'exploded', title: 'Totem Architecture 3D (WebGL Monolithe)', desc: 'Monolithe 3D isométrique à 6 étages avec shaders Bayer 8×8', href: '#exploded-architecture', tag: '3D WebGL' },
      { id: 'parcours', title: 'Parcours, Stages & Échecs (HUPI, Marra, Bac 20/20)', desc: 'Stages, IUT Anglet, UK, 10k parties AlphaZero & Restos du Cœur', href: '#parcours', tag: 'Parcours' },
      { id: 'terminal', title: 'Matéi Shell [>_ CLI Terminal]', desc: 'Exécuter valgrind, polymarket, prs, safepath, verify, chess', action: () => { const btn = document.getElementById('terminal-pill-btn'); if (btn) btn.click(); }, tag: 'CLI' },
      { id: 'cv-fr', title: 'Télécharger CV Français (PDF)', desc: 'Curriculum Vitae officiel Matéi de Saint Léger (FR)', href: 'portfolio_assets/CV_Matei_de_Saint_Leger_FR.pdf', external: true, tag: 'Document' },
      { id: 'cv-en', title: 'Download English Resume (PDF)', desc: 'Official Engineering Resume Matéi de Saint Léger (EN)', href: 'portfolio_assets/Resume_Matei_de_Saint_Leger_EN.pdf', external: true, tag: 'Document' },
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
        a.href = item.href || '#';
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
        a.addEventListener('click', (e) => {
          if (typeof item.action === 'function') {
            e.preventDefault();
            closePalette();
            item.action();
            return;
          }
          closePalette();
        });
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
          printLine('COMMANDES DISPONIBLES (TRACE RÉELLE DES PROJETS) :');
          printLine('  valgrind    - Trace gcc -Wall -Wextra -Werror + Valgrind sur lru_cache.c');
          printLine('  polymarket  - Pipeline GMM-MDN (RMSE 0.677°C) & coupure look-ahead V43');
          printLine('  prs         - Audit exact des PRs Omi (#14604..#20168) & Twenty (#26490)');
          printLine('  safepath    - Exécution AST SafePath-Lint (règles CWE-22 SPL001/003/004)');
          printLine('  verify      - Contrôle d\'état physique StateVerifier (PDF/SQLite/ELF)');
          printLine('  chess       - Benchmark AlphaZero 10k parties GPU & Stockfish NNUE');
          printLine('  cat cv      - Synthèse officielle BUT Info Anglet & liens CV');
          printLine('  swarm       - Rejouer l\'animation Swarm Rebuild');
          printLine('  clear       - Nettoyer le terminal');
          printLine('  exit        - Fermer le terminal');
        } else if (lower === 'valgrind') {
          printLine('$ gcc -std=c99 -Wall -Wextra -Werror -pedantic lru_cache.c test_lru.c -o lru_test', 'accent');
          printLine('[BUILD] 0 warning, 0 error (Allman + Murmur3 O(1) hash + double-linked sentinels)');
          printLine('==19842== Memcheck, a memory error detector');
          printLine('==19842== Command: ./lru_test && ./test_dijkstra');
          printLine('==19842== HEAP SUMMARY:');
          printLine('==19842==     in use at exit: 0 bytes in 0 blocks', 'success');
          printLine('==19842==   All heap blocks were freed -- no leaks are possible', 'success');
          printLine('==19842== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)', 'success');
        } else if (lower === 'polymarket') {
          printLine('[PIPELINE] weather_quant_system V211 + BTC 5m TCN (Oracle Ubuntu OCI)', 'accent');
          printLine('[INGEST] Binance depth@100ms + CLOB min(asks) -> parity delta = 0.00000000');
          printLine('[MODEL] 5-Gaussian Residual GMM-MDN on 466,572 forecasts -> RMSE 0.677°C');
          printLine('[CALIB] Isotonic PAV calibration: ECE reduced 17.14% -> 1.43%');
          printLine('[AUDIT] V43 Look-Ahead Trap (+117k$ sim, 0 pre-12h UTC trade) -> KILLED by Gate', 'accent');
          printLine('[GATE] PBO/CSCV PASS • Deflated Sharpe verified • Flat Sizing forced at 1.00$', 'success');
        } else if (lower === 'prs') {
          printLine('[GITHUB] 46 Pull Requests Fusionnées (BasedHardware/omi, Twenty CRM, FinTech):', 'accent');
          printLine('• omi #14604 (whoop-app): Reflected XSS in OAuth callback -> HTML escaping (5/5)');
          printLine('• omi #15974 (CLI #15913): Bounded epoch parsing stopping OverflowError crash');
          printLine('• omi #16025 / #17258 / #17272: Stopped CWE-209 detail=str(exc) & OAuth traceback leaks');
          printLine('• omi #19637 / #16029->#20168: Search regex guards + concurrent token refresh lock');
          printLine('• twenty #26490 & #26502: NestJS RBAC guards (VIEWS/LAYOUTS) & ORM batch deletes');
          printLine('• dupdab/dupdap-frontend (37 PRs) & cocor-tech/moistello-frontend (#1): stellarUri & 401 lock', 'success');
        } else if (lower === 'safepath') {
          printLine('$ safepath-lint ./routes/ --format=summary', 'accent');
          printLine('[SPL001] routes/export.py:42 -> Unsanitized f-string passed to send_file()');
          printLine('[SPL003] routes/files.py:19  -> path.startswith("/var/data") misses trailing slash (sibling bypass /var/data_forbidden)');
          printLine('[SPL004] utils/clean.py:08   -> .replace("../", "") bypassable via "....//"');
          printLine('[FIX] Enforce Path(base).resolve().is_relative_to(root) -> 0 findings', 'success');
        } else if (lower === 'verify') {
          printLine('[Kai StateVerifier] Auditing physical artifacts instead of trusting HTTP 200:', 'accent');
          printLine('• PDF Header Check: magic bytes === b"%PDF-" (PASS)');
          printLine('• SQLite WAL Store: academic_vault.db (2,018+ FTS5 entities indexed) (PASS)');
          printLine('• B2B Pipeline Tests: 310 reporting + 425 anchored extraction = 735 passed', 'success');
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
          printLine('[Research] 10,000 AlphaZero self-play games trained (2h15 Radeon GPU)');
          printLine('[Benchmark] 1,000 evaluation games vs Stockfish (avg 1.17s/game) + Hexapawn NSI', 'success');
          printLine('[Player] Matéi de Saint Léger: ~1500 Elo (Rapid & Blitz)');
        } else if (lower === 'cat cv') {
          printLine('Matéi de Saint Léger — BUT Informatique (IUT de Bayonne–Anglet)', 'accent');
          printLine('Bac 2026 Cantau Anglet Mention AB (13,75/20) • Grand Oral 20/20 • DNL Basque 14,40/20');
          printLine('Stages: HUPI (Bidart, Carte ADT64 Leaflet/D3.js) & Bureau d\'Études Marra');
          printLine('Objectif: Alternance BUT 2 dès Septembre 2027 (Côte Basque / Hybride / Remote)');
          printLine('Email: matei64200@gmail.com • GitHub: https://github.com/Mateidslx');
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
  // INTERACTIVE CODE SWITCHERS (C99 / OSS / KAI CASE STUDIES)
  // ==========================================================================
  function initCodeSwitcher() {
    const tabs = document.querySelectorAll('.code-tab-btn');
    if (!tabs.length) return;

    const SNIPPETS = {
      // Case #02 — Open-Source & SafePath AST
      omi: `/* BasedHardware/omi — 7 Correctifs Production Fusionnés */
#14604 (whoop)    : XSS réfléchie OAuth -> encodage HTML strict (5/5)
#15974 (CLI)      : OverflowError expiry -> bornage epoch (#15913)
#16025 (tasks)    : Fuite CWE-209 detail=str(exc) ORM -> masquage
#17258 (cal)      : Masquage tracebacks refresh OAuth exposés
#17272 (desktop)  : Sanitisation exceptions stream chat (3 routes)
#19637 (search)   : Guards ValueError/re.error ("Good hygiene")
#16029 -> #20168  : Lock race condition token refresh (main)`,
      twenty: `/* twentyhq/twenty (2 PRs) + dupdab & moistello (38 PRs) */
twenty #26490 : Gardes RBAC stricts (VIEWS / LAYOUTS) sur metadata
twenty #26502 : Capture suppressions batch dans twenty-orm + Vitest
dupdab/dupdap-frontend (#429..#459, 37 PRs) & moistello-frontend :
  - #433 : Précision montants USD <-> Crypto (stellarUri)
  - #431 : Intercepteur HTTP 401 concurrent idempotent (redirectToLogin)
  - #437..#458 : Suites Vitest focus-trap modales, auth & webhooks`,
      safepath: `# SafePath-Lint (MIT AST) — CWE-22 / CWE-23 / CWE-36
[SPL001] Injection binaire / f-string dans open() / send_file()
[SPL003] path.startswith("/var/data") -> bypass /var/data_forbidden
[SPL004] raw.replace("../", "")      -> bypass "....//" imbriqué

# Garde déterministe imposée :
resolved = Path(base_dir, user_path).resolve()
if not resolved.is_relative_to(Path(base_dir).resolve()):
    raise PermissionError("CWE-22 traversal blocked")`,

      // Case #03 — ISO C99, AlgoForge Pro & Merise
      lru: `/* IUT/c_tests/lru_cache.c — Hash O(1) + Sentinelles */
static size_t hash_func(int key, size_t table_size)
{
    uint32_t h = (uint32_t)key;
    h ^= h >> 16;
    h *= 0x85ebca6b;
    h ^= h >> 13;
    h *= 0xc2b2ae35;
    h ^= h >> 16;
    return h % table_size;
}

static void move_to_head(LRUCache* cache, Node* node)
{
    list_remove(node);
    list_insert_head(cache, node);
}`,
      transpiler: `/* algoforge_desktop/js/transpiler.js (Electron IDE R1.01) */
// Génère Pseudo-code IUT -> C Allman strict -> Python 3
ALGORITHME tri_par_selection
LEXIQUE
    tab : tableau[1..N] d'entier // Données structurées
// Règles vérifiées automatiquement par AlgoForge :
// - Aucune sortie brutale (break/return) dans boucle TANTQUE
// - Tripartition C99 : données / données-résultats (&) / résultats`,
      valgrind: `==19842== Memcheck, a memory error detector (Valgrind-3.22)
==19842== Command: ./bin/test_lru && ./bin/test_dijkstra
==19842== HEAP SUMMARY:
==19842==     in use at exit: 0 bytes in 0 blocks
==19842==   All heap blocks were freed -- no leaks are possible
==19842== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)`,
      merise: `/* MLD Relationnel 3NF — R1.05 Bases de Données (M. Marquesuzaà) */
CREATE TABLE OrdreExecution (
    id_ordre INT PRIMARY KEY,
    timestamp_nano BIGINT NOT NULL,
    ticker VARCHAR(16) NOT NULL,
    quantite NUMERIC(18, 4) CHECK (quantite > 0),
    prix_limite NUMERIC(18, 6) NOT NULL,
    statut_execution VARCHAR(8) CHECK (statut_execution IN ('FILLED','PENDING'))
);`,

      // Case #04 — Kai Core OS, B2B Forge & Kai Academic
      verifier: `# Extrait architecture réelle — core/state_verifier.py
# Élimine le piège classique : "HTTP 200 / exit 0 == succès"
if fmt == "pdf":
    with open(p, "rb") as f:
        entete = f.read(5)
        if entete != b"%PDF-":
            return VerificationResult(valide=False, motif="En-tête PDF invalide")
# Vérifie également : persistance SQLite WAL, binaire ELF compilé, et ADB dumpsys`,
      b2b: `// Pipeline B2B (735 Tests Unitaires Verts) & Pdf-helper BTP
1. Reporting Multi-Sources (310 tests) : GA4 + Google Ads + Search Console
   -> Architecture découplée (collecte / comparaison M-1 & N-1 / export PDF)
2. Extracteur Documentaire Ancré (425 tests) : Contrats & Bons d'intervention
   -> Zéro hallucination : chaque champ retourne EXTRAIT | À VÉRIFIER | NON DÉTECTÉ
3. Pdf-helper BTP (Tauri + React + FastAPI + OCR G.R.E.) :
   -> Stitching multi-pages et reconstruction de tableaux PDF vers Excel`,
      academic: `/* Kai Academic — Indexation locale SQLite FTS5 BM25 */
- Base : academic_vault.db (2 018+ entités indexées sur 20 modules S1 IUT)
- Contrainte stricte : zéro contenu inventé hors supports officiels UPPA
- Ergonomie cognitive (a11y_audit_pro/scotopic.py + Lexend) :
  * Alignement strict à gauche (zéro texte justifié en rivières)
  * Zéro italique sur blocs longs, palettes scoptiques douces`
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const widget = tab.closest('.code-switcher-widget');
        const targetId = tab.getAttribute('data-target') || 'algoforge-code-view';
        const view = document.getElementById(targetId);
        const key = tab.getAttribute('data-code');
        if (!view || !SNIPPETS[key]) return;

        const siblingTabs = Array.from(widget ? widget.querySelectorAll('.code-tab-btn') : tabs);
        const oldIdx = siblingTabs.findIndex((t) => t.classList.contains('active'));
        const newIdx = siblingTabs.indexOf(tab);
        const dir = oldIdx === -1 || newIdx >= oldIdx ? 1 : -1;

        siblingTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        view.style.opacity = '0';
        view.style.filter = 'blur(2px)';
        view.style.transform = `translateX(${-dir * 14}px)`;
        setTimeout(() => {
          view.textContent = SNIPPETS[key];
          view.style.transition = 'none';
          view.style.transform = `translateX(${dir * 14}px)`;
          void view.offsetWidth;
          view.style.transition = '';
          view.style.opacity = '1';
          view.style.filter = 'blur(0px)';
          view.style.transform = 'translateX(0)';
        }, 110);
      });
    });
  }

  // ==========================================================================
  // AKARU-KINETIC SCROLL-DRIVEN BIOGRAPHY TRAJECTORY CONTROLLER
  // ==========================================================================
  function initAkaruStory() {
    const deckShell = document.getElementById('akaru-deck-shell');
    const steps = Array.from(document.querySelectorAll('#akaru-accordion .akaru-step-card'));
    const slides = Array.from(document.querySelectorAll('#akaru-stage-media-box .akaru-visual-slide'));
    const scrubBtns = Array.from(document.querySelectorAll('#akaru-deck-shell .akaru-scrub-btn'));
    const curtainLayer = document.getElementById('akaru-curtain-layer');
    const counterEl = document.getElementById('akaru-deck-counter');
    const pctEl = document.getElementById('akaru-scroll-pct');
    const stageIdxEl = document.getElementById('akaru-stage-idx');
    const stageYearEl = document.getElementById('akaru-stage-year');
    const stageDomainEl = document.getElementById('akaru-stage-domain');
    const stageSubEl = document.getElementById('akaru-stage-sub');
    const aboutSection = document.getElementById('about');

    if (!deckShell || !steps.length) return;

    const CHAPTER_META = [
      {
        label: '01 / 05 — PAYS BASQUE & FORMATION',
        year: '2023–2026',
        domain: 'FORMATION & LANGUES',
        sub: 'LYCÉE CANTAU ANGLET'
      },
      {
        label: '02 / 05 — SPORT, ENDURANCE & MONTAGNE',
        year: 'TERRAIN',
        domain: 'SPORT & ÉQUILIBRE',
        sub: 'ESCALADE • TRAIL • LECTURE'
      },
      {
        label: '03 / 05 — ÉCHECS, ALPHAZERO & IA',
        year: '2025–2026',
        domain: 'COGNITION & STRATÉGIE',
        sub: 'ÉCHECS ~1500 ELO'
      },
      {
        label: '04 / 05 — FORGE & LABO QUANT',
        year: '2023–2026',
        domain: 'SYSTÈMES & PRODUITS',
        sub: 'MARRA • HUPI • ZENTABLE • QUANT'
      },
      {
        label: '05 / 05 — IUT ANGLET & OPEN-SOURCE',
        year: '2026+',
        domain: 'BUT INFO & COMMUNAUTÉ',
        sub: 'IUT BAYONNE-ANGLET'
      }
    ];

    let currentIdx = -1;
    let wipeMidTimer = null;
    let wipeEndTimer = null;
    let lastWipeAt = 0;
    let rafPending = false;

    function triggerCurtainWipe(onMidpoint) {
      if (!curtainLayer || curtainLayer.offsetParent === null) {
        onMidpoint();
        return;
      }
      const now = performance.now();
      if (now - lastWipeAt < 180) {
        onMidpoint();
        return;
      }
      lastWipeAt = now;
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
      const total = steps.length;
      const meta = CHAPTER_META[safeIdx];

      steps.forEach((step, i) => {
        const isActive = i === safeIdx;
        step.classList.toggle('is-active', isActive);
        step.classList.toggle('is-passed', i < safeIdx);
        if (isActive) step.setAttribute('aria-current', 'step');
        else step.removeAttribute('aria-current');
      });

      slides.forEach((slide, i) => {
        const isActive = i === safeIdx;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });

      scrubBtns.forEach((btn, i) => {
        const isActive = i === safeIdx;
        btn.classList.toggle('is-active', isActive);
        btn.classList.toggle('is-passed', i < safeIdx);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      if (counterEl && meta) counterEl.textContent = meta.label;
      if (stageIdxEl) stageIdxEl.textContent = `CHAPITRE 0${safeIdx + 1} / 0${total}`;
      if (stageYearEl && meta) stageYearEl.textContent = meta.year;
      if (stageDomainEl && meta) stageDomainEl.textContent = meta.domain;
      if (stageSubEl && meta) stageSubEl.textContent = meta.sub;
    }

    function syncFromScroll(allowCurtain = true) {
      rafPending = false;
      const vh = window.innerHeight || 800;
      const focalY = vh * 0.44;

      const firstRect = steps[0].getBoundingClientRect();
      const lastRect = steps[steps.length - 1].getBoundingClientRect();
      const firstCenter = firstRect.top + firstRect.height * 0.4;
      const lastCenter = lastRect.top + lastRect.height * 0.4;
      const rawP = (focalY - firstCenter) / Math.max(1, lastCenter - firstCenter);
      const overallP = Math.max(0, Math.min(1, rawP));

      deckShell.style.setProperty('--akaru-scroll-p', overallP.toFixed(4));
      if (pctEl) {
        const pct = Math.round(overallP * 100);
        pctEl.textContent = `${pct < 10 ? '0' : ''}${pct}%`;
      }

      let bestIdx = 0;
      let bestDist = Infinity;
      let bestSigned = 0;
      let bestHeight = 240;

      if (firstRect.height > 0 && firstRect.top > focalY) {
        bestIdx = 0;
        bestSigned = focalY - (firstRect.top + firstRect.height * 0.45);
        bestHeight = Math.max(140, firstRect.height);
      } else {
        steps.forEach((step, i) => {
          const rect = step.getBoundingClientRect();
          if (rect.height === 0) return;
          const center = rect.top + rect.height * 0.45;
          const dist = Math.abs(center - focalY);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = i;
            bestSigned = focalY - center;
            bestHeight = Math.max(140, rect.height);
          }
        });
      }

      const localPan = Math.max(-1, Math.min(1, bestSigned / bestHeight));
      const localZoom = 0.5 + 0.5 * (1 - Math.abs(localPan));
      deckShell.style.setProperty('--akaru-slide-pan', localPan.toFixed(4));
      deckShell.style.setProperty('--akaru-slide-zoom', localZoom.toFixed(4));

      if (bestIdx !== currentIdx) {
        if (allowCurtain && currentIdx !== -1) {
          // Immediately sync header pills/counter while blades reveal the new visual
          const meta = CHAPTER_META[bestIdx];
          if (counterEl && meta) counterEl.textContent = meta.label;
          scrubBtns.forEach((btn, i) => {
            btn.classList.toggle('is-active', i === bestIdx);
            btn.classList.toggle('is-passed', i < bestIdx);
          });
          triggerCurtainWipe(() => applyChapterState(bestIdx));
        } else {
          applyChapterState(bestIdx);
        }
      }
    }

    function scheduleSync() {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => syncFromScroll(true));
    }

    function scrollToChapter(index) {
      const safeIdx = Math.max(0, Math.min(steps.length - 1, index));
      const step = steps[safeIdx];
      if (!step) return;
      const rect = step.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const targetOffset = Math.max(142, vh * 0.34 - Math.min(rect.height * 0.15, 60));
      const targetY = Math.max(0, window.scrollY + rect.top - targetOffset);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }

    steps.forEach((step, idx) => {
      step.addEventListener('click', () => {
        const sel = window.getSelection && window.getSelection().toString();
        if (sel) return;
        scrollToChapter(idx);
      });
    });

    scrubBtns.forEach((btn, idx) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        scrollToChapter(idx);
      });
    });

    window.addEventListener('scroll', scheduleSync, { passive: true });
    window.addEventListener('resize', scheduleSync, { passive: true });

    syncFromScroll(false);

    if ('IntersectionObserver' in window) {
      let curtainPlayedOnce = false;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            if (entry.target === aboutSection && !curtainPlayedOnce) {
              curtainPlayedOnce = true;
              if (curtainLayer && curtainLayer.offsetParent !== null) {
                curtainLayer.classList.add('is-wiping');
                setTimeout(() => curtainLayer.classList.remove('is-wiping'), 540);
              }
            }
          });
        },
        { threshold: 0.16 }
      );
      if (aboutSection) observer.observe(aboutSection);
    }
  }

  // ==========================================================================
  // DAMPED SPRING ROLLING NUMBERS (Cult UI RollingNumber Physics Port)
  // ==========================================================================
  function initRollingNumbers() {
    const els = Array.from(document.querySelectorAll('[data-roll]'));
    if (!els.length) return;

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) return;

    function formatValue(val, decimals, sep, suffix) {
      const fixed = decimals > 0 ? val.toFixed(decimals) : String(Math.round(val));
      if (!sep) return fixed + suffix;
      const parts = fixed.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep);
      return parts.join('.') + suffix;
    }

    function animateSpring(el) {
      const target = parseFloat(el.getAttribute('data-roll'));
      if (!Number.isFinite(target)) return;
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const sep = el.getAttribute('data-sep') || '';
      const suffix = el.getAttribute('data-suffix') || '';

      // Cult UI physics constants: crisp damped spring (stiffness=110, damping=18, mass=0.8)
      const mass = 0.8;
      const stiffness = 110;
      const damping = 18;
      let x = target * 0.45;
      let v = 0;
      const startTs = performance.now();
      let prevTs = startTs;

      const step = (now) => {
        const dt = Math.min(0.032, Math.max(0.004, (now - prevTs) / 1000));
        prevTs = now;
        const accel = (-stiffness * (x - target) - damping * v) / mass;
        v += accel * dt;
        x += v * dt;

        el.textContent = formatValue(x, decimals, sep, suffix);

        const tol = Math.max(0.001, Math.abs(target) * 0.0005);
        if (
          (now - startTs >= 1150) ||
          (Math.abs(x - target) <= tol && Math.abs(v) <= 0.01 * Math.max(1, target))
        ) {
          el.textContent = formatValue(target, decimals, sep, suffix);
          return;
        }
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.dataset.rollDone === '1') return;
          el.dataset.rollDone = '1';
          observer.unobserve(el);
          animateSpring(el);
        });
      },
      { threshold: 0.25 }
    );
    els.forEach((el) => observer.observe(el));
  }

  // ==========================================================================
  // FLOATING SCROLL ISLAND (Watermelon UI Conic Progress + Drawer Port)
  // ==========================================================================
  function initScrollIsland() {
    const island = document.getElementById('scroll-island');
    const trigger = document.getElementById('scroll-island-trigger');
    const sectionEl = document.getElementById('scroll-island-section');
    const pctEl = document.getElementById('scroll-island-pct');
    const links = Array.from(document.querySelectorAll('#scroll-island-drawer .island-link'));
    if (!island || !trigger) return;

    const SECTIONS = [
      { id: 'hero', label: '00 / HERO' },
      { id: 'about', label: '01 / BENTO' },
      { id: 'flagships', label: '02 / ÉTUDES CAS' },
      { id: 'exploded-architecture', label: '03 / TOTEM 3D' },
      { id: 'parcours', label: '04 / PARCOURS' },
      { id: 'contact', label: '05 / CONTACT' },
    ];

    let rafId = false;
    function syncIsland() {
      rafId = false;
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const pct = Math.max(0, Math.min(100, (window.scrollY / maxScroll) * 100));
      island.classList.toggle('is-visible', window.scrollY > 140);
      island.style.setProperty('--scroll-island-p', pct.toFixed(1));
      if (pctEl) {
        const rounded = Math.round(pct);
        pctEl.textContent = `${rounded < 10 ? '0' : ''}${rounded}%`;
      }

      const probeY = window.innerHeight * 0.36;
      let active = SECTIONS[0];
      SECTIONS.forEach((sec) => {
        const node = document.getElementById(sec.id);
        if (!node) return;
        const rect = node.getBoundingClientRect();
        if (rect.top <= probeY) active = sec;
      });

      if (sectionEl) sectionEl.textContent = active.label;
      links.forEach((lnk) => {
        lnk.classList.toggle('is-active', lnk.getAttribute('data-island-target') === active.id);
      });
    }

    function onScroll() {
      if (rafId) return;
      rafId = true;
      requestAnimationFrame(syncIsland);
    }

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const opening = !island.classList.contains('is-open');
      island.classList.toggle('is-open', opening);
      trigger.setAttribute('aria-expanded', opening ? 'true' : 'false');
    });

    links.forEach((lnk) => {
      lnk.addEventListener('click', () => {
        island.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!island.contains(e.target) && island.classList.contains('is-open')) {
        island.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && island.classList.contains('is-open')) {
        island.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    syncIsland();
  }

  function initScrollStagger() {
    const targets = document.querySelectorAll('.flagship-card, .parcours-card, .bento-card');
    if (!targets.length) return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-revealed'));
      return;
    }
    targets.forEach((el, idx) => {
      el.classList.add('ux-stagger-item');
      el.style.setProperty('--stagger-i', String(idx % 3));
    });
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) {
          ent.target.classList.add('is-revealed');
          obs.unobserve(ent.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach((el) => obs.observe(el));
  }

  function initHeroDitherCanvas() {
    const canvas = document.getElementById('hero-dither-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bayer4 = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5]
    ];

    let cols = 0, rows = 0, w = 0, h = 0;
    const cell = 6;
    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(240, Math.floor(rect.width));
      h = Math.max(240, Math.floor(rect.height));
      canvas.width = w;
      canvas.height = h;
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
    }
    resize();
    window.addEventListener('resize', resize);

    let mx = 0.5, my = 0.44, activeHover = 0;
    const parent = canvas.parentElement || canvas;
    parent.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      mx = Math.max(0, Math.min(1, (e.clientX - r.left) / Math.max(1, r.width)));
      my = Math.max(0, Math.min(1, (e.clientY - r.top) / Math.max(1, r.height)));
      activeHover = 1;
    }, { passive: true });
    parent.addEventListener('pointerleave', () => { activeHover = 0; });

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let lastTs = 0;

    function draw(ts) {
      if (!reduced && ts - lastTs < 48) {
        requestAnimationFrame(draw);
        return;
      }
      lastTs = ts;
      frame += 0.045;

      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, w, h);

      const cx = cols * 0.5;
      const cy = rows * 0.44;
      const norm = Math.max(1, Math.min(cols, rows) * 0.46);
      const pmx = mx * cols;
      const pmy = my * rows;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const dx = (x - cx) / norm;
          const dy = (y - cy) / norm;
          const distCursor = Math.hypot((x - pmx) / norm, (y - pmy) / norm);
          const attract = activeHover * Math.exp(-distCursor * 3.8);

          const r = Math.sqrt(dx * dx + dy * dy);
          const ang = Math.atan2(dy, dx) + attract * 0.65;
          const vortex = Math.sin(r * 6.2 - frame * 1.45 + ang * 4.0) * 0.5 + 0.5;
          const radial = Math.max(0, 1.06 - r * 0.72) * (r > 0.14 ? 1 : r / 0.14);
          const lum = vortex * radial + attract * 0.42;
          const threshold = (bayer4[y & 3][x & 3] + 0.5) / 16;

          if (lum > threshold + 0.12) {
            ctx.fillStyle = (attract > 0.25 || lum > 0.86) ? '#f4f4f5' : '#ff1e42';
            ctx.fillRect(x * cell, y * cell, cell - 1, cell - 1);
          }
        }
      }
      if (!reduced) requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  }

  function initSkiper80Showcase() {
    const items = document.querySelectorAll('.s80-item[data-s80]');
    if (!items.length) return;

    const DATA = {
      cloud: {
        kicker: '01 // CLOUD CONTROL PLANE',
        badge: '41/41 PYTEST VERTS',
        title: 'Cloud Agents & Orchestration 24/7',
        desc: '20 agents spécialisés (<code>CLOUD_MASTER</code>, <code>QA_AGENT</code>, <code>SECURITY_AUDIT_AGENT</code>, <code>FRONTEND_AGENT</code>…) orchestrés via DAG SQLite (<code>TaskGraphDB</code>), routage multi-modèles et vérification physique fail-closed sur Oracle Cloud Ubuntu.',
        metrics: [
          ['20', 'Agents Spécialisés'],
          ['41/41', 'Tests Cloud Passés'],
          ['OCI', 'Ubuntu Systemd 24/7']
        ],
        href: '#case-kai',
        cta: 'Inspecter StateVerifier & DAG ↓'
      },
      zentable: {
        kicker: '02 // ZENTABLE PRO (NOUVEAU EXCEL)',
        badge: 'REACT 19 / TYPESCRIPT',
        title: 'ZenTable Pro — Tableur Web Haute Performance',
        desc: 'Conçu comme une alternative moderne et fluide à Excel en <strong>React 19 + TypeScript strict</strong> : grille réactive, moteur de formules dédié et ergonomie sans lourdeur pour manipuler des tableaux structurés.',
        metrics: [
          ['React 19', 'Rendu Réactif'],
          ['TS Strict', 'Typage Sûr'],
          ['Formules', 'Moteur Tableur']
        ],
        href: '#about',
        cta: 'Voir dans le parcours Systèmes ↓'
      },
      quant: {
        kicker: '03 // QUANT & FALSIFICATION',
        badge: 'RMSE 0,677°C',
        title: 'Moteur Quantitatif Polymarket & Audit Adversarial',
        desc: 'Réseau <strong>PyTorch GMM-MDN</strong> entraîné sur <strong>466 572 prévisions</strong> (ECE ramenée à 1,43% par calibration PAV), <code>TCN 30×32</code> sur carnets L2 et coupure volontaire V43 après détection de biais look-ahead.',
        metrics: [
          ['466 572', 'Prévisions Replay'],
          ['0,677°C', 'RMSE 5-Gaussian MDN'],
          ['1,43%', 'ECE après PAV']
        ],
        href: '#case-quant',
        cta: 'Ouvrir l\'étude Polymarket ↓'
      },
      oss: {
        kicker: '04 // UPSTREAM & APPSEC',
        badge: '46 PRs FUSIONNÉES',
        title: 'BasedHardware/omi, Twenty CRM & SafePath-Lint',
        desc: 'Correctifs sécurité et concurrence fusionnés en production sur <strong>Omi</strong> (7 PRs : XSS, OverflowError, CWE-209) et <strong>Twenty CRM</strong> (<code>#26490</code>), complétés par l\'analyseur AST <strong>SafePath-Lint (MIT, CWE-22)</strong>.',
        metrics: [
          ['46 PRs', 'Fusionnées Upstream'],
          ['7 PRs', 'BasedHardware/omi'],
          ['CWE-22', 'SafePath AST MIT']
        ],
        href: '#case-oss',
        cta: 'Inspecter les PRs & AST ↓'
      },
      b2b: {
        kicker: '05 // FORGE B2B & ISO C99',
        badge: '735 TESTS + VALGRIND 0',
        title: 'Extracteur B2B (735 Tests), Kai Academic & LRU C99',
        desc: 'Extracteur documentaire B2B validé par <strong>735 tests unitaires</strong> (310 + 425), bibliothèque <strong>Kai Academic</strong> indexée SQLite FTS5 BM25 (79 fiches Lexend) et structures <strong>ISO C99</strong> à 0 octet perdu sous Valgrind.',
        metrics: [
          ['735', 'Tests Unitaires B2B'],
          ['79 p.', 'Kai Academic FTS5'],
          ['0 fuite', 'Valgrind ISO C99']
        ],
        href: '#case-c99',
        cta: 'Voir C99 & Forge B2B ↓'
      }
    };

    const kickerEl = document.getElementById('s80-kicker');
    const badgeEl = document.getElementById('s80-badge');
    const titleEl = document.getElementById('s80-title');
    const descEl = document.getElementById('s80-desc');
    const metricsEl = document.getElementById('s80-metrics');
    const linkEl = document.getElementById('s80-link');

    function activate(key) {
      const entry = DATA[key];
      if (!entry) return;
      items.forEach((btn) => {
        const active = btn.getAttribute('data-s80') === key;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', String(active));
      });
      if (kickerEl) kickerEl.textContent = entry.kicker;
      if (badgeEl) badgeEl.textContent = entry.badge;
      if (titleEl) titleEl.textContent = entry.title;
      if (descEl) descEl.innerHTML = entry.desc;
      if (metricsEl) {
        metricsEl.innerHTML = entry.metrics
          .map(([v, l]) => `<div class="s80-stat"><strong>${v}</strong><span>${l}</span></div>`)
          .join('');
      }
      if (linkEl) {
        linkEl.href = entry.href;
        linkEl.textContent = entry.cta;
      }
    }

    items.forEach((btn) => {
      const key = btn.getAttribute('data-s80');
      btn.addEventListener('click', () => activate(key));
      btn.addEventListener('mouseenter', () => activate(key));
    });
  }

  function initSpotlightSurfaces() {
    const surfaces = document.querySelectorAll('.spotlight-surface');
    if (!surfaces.length) return;
    surfaces.forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
        el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
      });
    });
  }

  function initGlobalDitherBg() {
    const canvas = document.getElementById('global-dither-bg');
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false });

    let targetMouse = { x: 0.65, y: 0.52 };
    let smoothMouse = { x: 0.65, y: 0.52 };
    let mouseVel = 0;
    let clickPos = { x: 0.5, y: 0.5 };
    let clickTime = -10.0;

    window.addEventListener('pointermove', (e) => {
      const nx = Math.max(0, Math.min(1, e.clientX / Math.max(1, window.innerWidth)));
      const ny = Math.max(0, Math.min(1, 1.0 - e.clientY / Math.max(1, window.innerHeight)));
      mouseVel = Math.min(1.0, mouseVel + Math.hypot(nx - targetMouse.x, ny - targetMouse.y) * 5.0);
      targetMouse.x = nx;
      targetMouse.y = ny;
    }, { passive: true });

    window.addEventListener('pointerdown', (e) => {
      clickPos.x = Math.max(0, Math.min(1, e.clientX / Math.max(1, window.innerWidth)));
      clickPos.y = Math.max(0, Math.min(1, 1.0 - e.clientY / Math.max(1, window.innerHeight)));
      clickTime = performance.now() * 0.001;
    }, { passive: true });

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (gl) {
      const vsSrc = `
        attribute vec2 aPos;
        varying vec2 vUv;
        void main() {
          vUv = aPos * 0.5 + 0.5;
          gl_Position = vec4(aPos, 0.0, 1.0);
        }
      `;
      const fsSrc = `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform float uScroll;
        uniform float uVel;
        uniform float uClickAge;
        uniform vec2 uRes;
        uniform vec2 uMouse;
        uniform vec2 uClickPos;

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

        float bayer4x4(vec2 p) {
          int x = int(mod(p.x, 4.0));
          int y = int(mod(p.y, 4.0));
          int idx = x + y * 4;
          if (idx == 0) return 0.0 / 16.0;
          if (idx == 1) return 8.0 / 16.0;
          if (idx == 2) return 2.0 / 16.0;
          if (idx == 3) return 10.0 / 16.0;
          if (idx == 4) return 12.0 / 16.0;
          if (idx == 5) return 4.0 / 16.0;
          if (idx == 6) return 14.0 / 16.0;
          if (idx == 7) return 6.0 / 16.0;
          if (idx == 8) return 3.0 / 16.0;
          if (idx == 9) return 11.0 / 16.0;
          if (idx == 10) return 1.0 / 16.0;
          if (idx == 11) return 9.0 / 16.0;
          if (idx == 12) return 15.0 / 16.0;
          if (idx == 13) return 7.0 / 16.0;
          if (idx == 14) return 13.0 / 16.0;
          return 5.0 / 16.0;
        }

        void main() {
          // Crisp separated 6px square pixels over pure #050507 Obsidian Void
          float gran = 6.0;
          vec2 pix = floor(gl_FragCoord.xy / gran);
          vec2 inCell = fract(gl_FragCoord.xy / gran);
          float pixelBox = step(0.24, inCell.x) * step(0.24, inCell.y);

          vec2 uvPix = (pix * gran) / max(uRes, vec2(1.0));
          float aspect = uRes.x / max(1.0, uRes.y);
          vec2 p = vec2((uvPix.x - 0.5) * aspect, uvPix.y - 0.5);
          vec2 m = vec2((uMouse.x - 0.5) * aspect, uMouse.y - 0.5);

          // Magnetic cursor scatter + shockwave ripple
          vec2 dVec = p - m;
          float dist = length(dVec);
          vec2 warpedP = p - normalize(dVec + vec2(0.0001)) * exp(-dist * 4.2) * (0.08 + uVel * 0.14);

          float mRing = exp(-abs(dist - 0.14) * 26.0) * 0.65 + exp(-dist * 6.5) * (0.38 + uVel * 0.45);

          vec2 cPos = vec2((uClickPos.x - 0.5) * aspect, uClickPos.y - 0.5);
          float cDist = length(p - cPos);
          float shock = 0.0;
          if (uClickAge > 0.0 && uClickAge < 1.8) {
            float waveR = uClickAge * 0.78;
            shock = exp(-abs(cDist - waveR) * 32.0) * (1.0 - uClickAge * 0.55) * 0.95;
          }

          // Sparse, structured scroll-morphing geometries (keeps 75% Noir void for crisp AAA typography)
          // Mode 0: Asymmetric Hero Orbit Dots (subtle on left, rich wave bands)
          vec2 sp = warpedP - vec2(0.32 * aspect, 0.0);
          float sr = length(sp);
          float sang = atan(sp.y, sp.x);
          float swirlField = pow(max(0.0, sin(sr * 6.0 - uTime * 1.1 + sang * 3.0)), 2.0) * clamp(1.0 - sr * 0.85, 0.0, 1.0);

          // Mode 1: Rotating Dithered 3D Sphere on right half
          vec2 gp = warpedP - vec2(0.28 * aspect, 0.0);
          float gr = length(gp);
          float sphereMask = smoothstep(0.42, 0.39, gr);
          float gz = sqrt(max(0.0, 0.41 * 0.41 - gr * gr));
          vec3 snorm = normalize(vec3(gp.x, gp.y, gz + 0.001));
          vec3 ldir = normalize(vec3(cos(uTime * 0.65), sin(uTime * 0.45), 0.72));
          float sphereField = max(0.0, dot(snorm, ldir)) * sphereMask;

          // Mode 2: Sculpted Interference Lattice Waves
          float waveField = pow(max(0.0, sin(warpedP.x * 6.8 + uTime * 0.85) * cos(warpedP.y * 5.8 - uTime * 0.65)), 2.0) * 0.72;

          float w1 = clamp(1.0 - abs(uScroll - 0.0) * 1.15, 0.0, 1.0);
          float w2 = clamp(1.0 - abs(uScroll - 1.2) * 1.0, 0.0, 1.0);
          float w3 = clamp(uScroll - 1.4, 0.0, 1.0) * 0.85;
          float morphed = (swirlField * w1 + sphereField * w2 + waveField * w3) / max(0.9, w1 + w2 + w3);

          // Sparse ambient dithered stars + interactive magnetic wake
          float grainField = pow(noise(warpedP * 2.8 + vec2(uTime * 0.06, -uScroll * 0.3)), 2.2) * 0.55;
          float totalField = clamp(max(morphed * 0.78, grainField) + mRing + shock, 0.0, 1.0);

          float thr = bayer4x4(pix);
          float mask = step(thr + 0.34, totalField) * pixelBox;

          vec3 voidCol = vec3(0.02, 0.02, 0.028);
          vec3 crimson = vec3(1.0, 0.118, 0.259);
          vec3 darkCrimson = vec3(0.42, 0.04, 0.10);
          vec3 ashWhite = vec3(0.96, 0.96, 0.97);

          vec3 dotCol = mix(darkCrimson, crimson, clamp(totalField * 1.1, 0.0, 1.0));
          float whitePeak = smoothstep(0.82, 0.96, totalField) * 0.55 + clamp(shock, 0.0, 1.0) * 0.75;
          dotCol = mix(dotCol, ashWhite, clamp(whitePeak, 0.0, 0.85));

          vec3 outCol = mix(voidCol, dotCol, mask * 0.85);
          gl_FragColor = vec4(outCol, 1.0);
        }
      `;

      function compile(type, src) {
        const sh = gl.createShader(type);
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
      }

      const vs = compile(gl.VERTEX_SHADER, vsSrc);
      const fs = compile(gl.FRAGMENT_SHADER, fsSrc);
      if (vs && fs) {
        const prog = gl.createProgram();
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (gl.getProgramParameter(prog, gl.LINK_STATUS)) {
          gl.useProgram(prog);
          const buf = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, buf);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
          const aPos = gl.getAttribLocation(prog, 'aPos');
          gl.enableVertexAttribArray(aPos);
          gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

          const uTime = gl.getUniformLocation(prog, 'uTime');
          const uScroll = gl.getUniformLocation(prog, 'uScroll');
          const uVel = gl.getUniformLocation(prog, 'uVel');
          const uClickAge = gl.getUniformLocation(prog, 'uClickAge');
          const uRes = gl.getUniformLocation(prog, 'uRes');
          const uMouse = gl.getUniformLocation(prog, 'uMouse');
          const uClickPos = gl.getUniformLocation(prog, 'uClickPos');

          function resizeGl() {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = Math.max(320, Math.floor(window.innerWidth * dpr));
            canvas.height = Math.max(240, Math.floor(window.innerHeight * dpr));
            gl.viewport(0, 0, canvas.width, canvas.height);
          }
          resizeGl();
          window.addEventListener('resize', resizeGl, { passive: true });

          function renderGl(now) {
            const tSec = now * 0.001;
            smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.1;
            smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.1;
            mouseVel *= 0.92;

            const docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const scrollNorm = (window.scrollY || 0) / docH;

            gl.uniform1f(uTime, tSec);
            gl.uniform1f(uScroll, scrollNorm * 3.0);
            gl.uniform1f(uVel, mouseVel);
            gl.uniform1f(uClickAge, tSec - clickTime);
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.uniform2f(uMouse, smoothMouse.x, smoothMouse.y);
            gl.uniform2f(uClickPos, clickPos.x, clickPos.y);

            gl.clearColor(0.02, 0.02, 0.028, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            if (!reduced) requestAnimationFrame(renderGl);
          }
          requestAnimationFrame(renderGl);
          return;
        }
      }
    }
  }

  function initMagneticElements() {
    const els = document.querySelectorAll('.hero-btn-primary, .magnetic-circle-btn');
    els.forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.28;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
        el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transform = '';
      });
    });
  }

  function initQuantWaveform() {
    const canvas = document.getElementById('quant-live-wave');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(240, Math.floor(rect.width * (window.devicePixelRatio || 1)));
      canvas.height = Math.max(60, Math.floor(rect.height * (window.devicePixelRatio || 1)));
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function draw(now) {
      const w = canvas.width;
      const h = canvas.height;
      const t = now * 0.0018;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.09)';
      ctx.lineWidth = 1;
      for (let g = 1; g <= 2; g++) {
        const y = (h / 3) * g;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // MDN Confidence Band in Crimson
      ctx.fillStyle = 'rgba(255, 30, 66, 0.12)';
      ctx.beginPath();
      for (let x = 0; x <= w; x += 6) {
        const nx = (x / w) * Math.PI * 3.2;
        const mean = h * 0.5 + Math.sin(nx + t) * h * 0.22 + Math.cos(nx * 1.7 - t * 0.6) * h * 0.1;
        const spread = h * (0.1 + 0.04 * Math.sin(nx * 2 + t));
        if (x === 0) ctx.moveTo(x, mean - spread);
        else ctx.lineTo(x, mean - spread);
      }
      for (let x = w; x >= 0; x -= 6) {
        const nx = (x / w) * Math.PI * 3.2;
        const mean = h * 0.5 + Math.sin(nx + t) * h * 0.22 + Math.cos(nx * 1.7 - t * 0.6) * h * 0.1;
        const spread = h * (0.1 + 0.04 * Math.sin(nx * 2 + t));
        ctx.lineTo(x, mean + spread);
      }
      ctx.closePath();
      ctx.fill();

      // Predicted Mean (Crimson #ff1e42)
      ctx.strokeStyle = '#ff1e42';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const nx = (x / w) * Math.PI * 3.2;
        const y = h * 0.5 + Math.sin(nx + t) * h * 0.22 + Math.cos(nx * 1.7 - t * 0.6) * h * 0.1;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Observed Parity Trace (Crisp Silver #e4e4e7)
      ctx.strokeStyle = '#e4e4e7';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const nx = (x / w) * Math.PI * 3.2;
        const y = h * 0.5 + Math.sin(nx + t - 0.18) * h * 0.2 + Math.cos(nx * 2.3 - t * 0.8) * h * 0.08;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      if (!reduced) requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  function init() {
    initGlobalDitherBg();
    initHeroDitherCanvas();
    initMagneticElements();
    initQuantWaveform();
    initSkiper80Showcase();
    initSpotlightSurfaces();
    initAkaruStory();
    initLayerInteractive();
    initClipboard();
    initCommandPalette();
    initTerminalDrawer();
    initCodeSwitcher();
    initRollingNumbers();
    initScrollIsland();
    initScrollStagger();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
