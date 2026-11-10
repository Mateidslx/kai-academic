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

        const siblingTabs = widget ? widget.querySelectorAll('.code-tab-btn') : tabs;
        siblingTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        view.textContent = SNIPPETS[key];
      });
    });
  }

  // ==========================================================================
  // AKARU-KINETIC BIOGRAPHY CHAPTER STAGE CONTROLLER
  // ==========================================================================
  function initAkaruStory() {
    const panels = Array.from(document.querySelectorAll('#akaru-accordion .akaru-panel'));
    const navButtons = Array.from(document.querySelectorAll('#akaru-accordion .akaru-nav-item'));
    const curtainLayer = document.getElementById('akaru-curtain-layer');
    const counterEl = document.getElementById('akaru-deck-counter');
    const stageIdxEl = document.getElementById('akaru-stage-idx');
    const prevBtn = document.getElementById('akaru-prev-btn');
    const nextBtn = document.getElementById('akaru-next-btn');
    const aboutSection = document.getElementById('about');

    const CHAPTER_LABELS = [
      '01 / 05 — PAYS BASQUE & FORMATION',
      '02 / 05 — SPORT, ENDURANCE & MONTAGNE',
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
          });
        },
        { threshold: 0.16 }
      );
      if (aboutSection) observer.observe(aboutSection);
    }
  }

  function init() {
    initAkaruStory();
    initLayerInteractive();
    initClipboard();
    initCommandPalette();
    initTerminalDrawer();
    initCodeSwitcher();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
