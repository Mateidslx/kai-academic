/* ==========================================================================
   MATÉI DE SAINT LÉGER — PORTFOLIO V5 INTERACTIVE CORE (FR / EN)
   Role Flip-Pad | Pull-Cord Theme | Ability Card | Doors | Timeline | Cmd+K
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. BILINGUAL DATA: ROLE FLIP-PAD, KAI MODULES & SPECIALTY DOORS
     ------------------------------------------------------------------------ */
  const ROLES = [
    {
      fr: 'Développeur Python, TypeScript & C99',
      en: 'Python, TypeScript & C99 Developer',
      idx: '01 / 04 ↻'
    },
    {
      fr: 'Contributeur Open-Source (46 PRs)',
      en: 'Open-Source Contributor (46 Merged PRs)',
      idx: '02 / 04 ↻'
    },
    {
      fr: 'Sécurité Applicative & Serveurs MCP',
      en: 'AppSec & MCP Tooling Builder',
      idx: '03 / 04 ↻'
    },
    {
      fr: 'Candidat Alternance BUT 2 Informatique',
      en: 'Year-2 CS Apprenticeship Candidate',
      idx: '04 / 04 ↻'
    }
  ];

  const OSS_ECOSYSTEMS = [
    {
      tabFr: '01. Twenty CRM (40k★)',
      tabEn: '01. Twenty CRM (40k★)',
      winTitle: 'github.com/twentyhq/twenty — merged/@Mateidslx',
      rows: [
        {
          id: 'PR #26490',
          fr: 'Contrôle strict des permissions RBAC VIEWS & LAYOUTS sur les mutations metadata',
          en: 'Guard view field-group mutations with strict VIEWS & LAYOUTS RBAC permissions',
          status: 'MERGED',
          url: 'https://github.com/twentyhq/twenty/pull/26490'
        },
        {
          id: 'PR #26502',
          fr: 'Capture complète des enregistrements supprimés par lot dans twenty-orm',
          en: 'Capture all batch-deleted records accurately in twenty-orm event payloads',
          status: 'MERGED',
          url: 'https://github.com/twentyhq/twenty/pull/26502'
        },
        {
          id: 'OMI #19637',
          fr: 'BasedHardware/omi — Suppression des fuites d’exceptions internes (CWE-209)',
          en: 'BasedHardware/omi — Sanitize raw exception leakage in search endpoints (CWE-209)',
          status: 'MERGED',
          url: 'https://github.com/BasedHardware/omi/pull/19637'
        },
        {
          id: 'FINTECH #433',
          fr: 'Dupdap Stellar — Protection contre la substitution USD / montant crypto',
          en: 'Dupdap Stellar — Prevent USD substitution into crypto payment URI amounts',
          status: 'MERGED',
          url: 'https://github.com/dupdab/dupdap-frontend/pull/433'
        },
        {
          id: '46 PRS',
          fr: 'Inspecter l’ensemble de mes 46 Pull Requests fusionnées sur GitHub',
          en: 'Inspect all 46 upstream merged Pull Requests on GitHub',
          status: 'GITHUB ↗',
          url: 'https://github.com/pulls?q=is%3Apr+author%3AMateidslx+is%3Amerged'
        }
      ]
    },
    {
      tabFr: '02. BasedHardware / Omi (8k★)',
      tabEn: '02. BasedHardware / Omi (8k★)',
      winTitle: 'github.com/BasedHardware/omi — merged/@Mateidslx',
      rows: [
        {
          id: 'PR #19637',
          fr: 'Suppression des fuites de traces internes CWE-209 sur search_conversations',
          en: 'Eliminate CWE-209 raw exception leakage in search_conversations',
          status: 'MERGED',
          url: 'https://github.com/BasedHardware/omi/pull/19637'
        },
        {
          id: 'PR #17272',
          fr: 'Masquage sécurisé des erreurs internes sur les passerelles desktop_chat & JIT',
          en: 'Mask raw exception details in desktop_chat JIT & gateway handlers',
          status: 'MERGED',
          url: 'https://github.com/BasedHardware/omi/pull/17272'
        },
        {
          id: 'PR #17258',
          fr: 'Durcissement des endpoints Google Calendar contre la fuite d’informations',
          en: 'Harden Google Calendar endpoints against internal exception disclosure',
          status: 'MERGED',
          url: 'https://github.com/BasedHardware/omi/pull/17258'
        },
        {
          id: 'PR #14604',
          fr: 'Échappement XSS du paramètre OAuth error sur la page de callback',
          en: 'Escape OAuth error parameter in callback failure view against XSS',
          status: 'MERGED',
          url: 'https://github.com/BasedHardware/omi/pull/14604'
        },
        {
          id: 'PR #15974',
          fr: 'Protection contre OverflowError sur l’expiration de jetons dans le client CLI',
          en: 'Catch oversized token expiry OverflowError in Python CLI config loader',
          status: 'MERGED',
          url: 'https://github.com/BasedHardware/omi/pull/15974'
        }
      ]
    },
    {
      tabFr: '03. FinTech TypeScript (38 PRs)',
      tabEn: '03. TypeScript FinTech (38 PRs)',
      winTitle: 'github.com/dupdab/dupdap-frontend — 37 merged PRs',
      rows: [
        {
          id: 'PR #433',
          fr: 'Correction critique empêchant l’injection du montant USD dans stellarUri',
          en: 'Critical fix preventing USD amount substitution into crypto stellarUri',
          status: 'MERGED',
          url: 'https://github.com/dupdab/dupdap-frontend/pull/433'
        },
        {
          id: 'PR #428',
          fr: 'Idempotence des intercepteurs HTTP 401 concurrents en cours de vol',
          en: 'Guarantee idempotent handling of concurrent in-flight 401 auth responses',
          status: 'MERGED',
          url: 'https://github.com/dupdab/dupdap-frontend/pull/428'
        },
        {
          id: 'PR #437',
          fr: 'Suite de tests d’accessibilité clavier et focus-trap sur les modales React',
          en: 'Comprehensive focus-trap, restoration & keyboard a11y modal test suite',
          status: 'MERGED',
          url: 'https://github.com/dupdab/dupdap-frontend/pull/437'
        },
        {
          id: 'PR #423',
          fr: 'Migration ESM des mocks Next.js Navigation sous Vitest',
          en: 'Rewrite Next.js navigation test harness with Vitest ESM mocks',
          status: 'MERGED',
          url: 'https://github.com/dupdab/dupdap-frontend/pull/423'
        },
        {
          id: '+34 PRS',
          fr: 'Suites de tests webhooks, paiements, règlements et hydratation Zustand',
          en: 'Webhooks, settlements, auth hydration & component test suites',
          status: 'GITHUB ↗',
          url: 'https://github.com/dupdab/dupdap-frontend/pulls?q=is%3Apr+author%3AMateidslx+is%3Amerged'
        }
      ]
    }
  ];

  const KAI_MODULES = [
    {
      tabFr: '01. Linux & Systemd',
      tabEn: '01. Linux & Systemd',
      badgeFr: 'MODULE 01 // INFRASTRUCTURE LINUX',
      badgeEn: 'MODULE 01 // LINUX INFRASTRUCTURE',
      titleFr: 'Services Systemd & Supervision 24/7 sur Ubuntu 24.04',
      titleEn: '24/7 Systemd Services & Watchdogs on Ubuntu 24.04',
      descFr:
        'Déploiement continu sur serveur Ubuntu 24.04 avec unités systemd dédiées, supervision automatique des processus et reverse-proxy Nginx sans dépendance propriétaire.',
      descEn:
        'Continuous deployment on an Ubuntu 24.04 VPS with dedicated systemd units, automatic process recovery, and Nginx reverse-proxying without vendor lock-in.',
      file: 'ubuntu@vps:~/kai-agent$ cat kai-worker.service',
      code: `[Unit]
Description=Kai Python Worker Service
After=network-online.target

[Service]
Restart=always
RestartSec=3
ExecStart=/usr/bin/python3 -m cloud_control_plane.cloud_worker`,
      pillsFr: ['Ubuntu 24.04 LTS', 'Systemd', 'Nginx + SSH', 'Disponibilité 24/7'],
      pillsEn: ['Ubuntu 24.04 LTS', 'Systemd', 'Nginx + SSH', '24/7 Uptime']
    },
    {
      tabFr: '02. Orchestration DAG',
      tabEn: '02. DAG Orchestration',
      badgeFr: 'MODULE 02 // GRAPHE DE TÂCHES PYTHON',
      badgeEn: 'MODULE 02 // PYTHON TASK DAG',
      titleFr: 'Exécution Topologique & Gestion d’Erreurs',
      titleEn: 'Topological Task Scheduling & Fault Recovery',
      descFr:
        'Décomposition des tâches complexes en graphes acycliques dirigés (DAG) typés avec détection de cycles, réessais bornés et annulation propre en cas d’échec.',
      descEn:
        'Decomposes multi-step workflows into typed Directed Acyclic Graphs (DAGs) with cycle checks, bounded retries, and clean rollback on failure.',
      file: 'task_dag_orchestrator.py',
      code: `dag.add_step("tests", deps=["build"])
dag.add_step("deploy_vps", deps=["tests"])
assert dag.is_acyclic(), "Cycle détecté dans le graphe"
await dag.run_topological()`,
      pillsFr: ['Python 3.12', 'Asyncio', 'Tri Topologique', 'Tests Automatisés'],
      pillsEn: ['Python 3.12', 'Asyncio', 'Topological Sort', 'Automated Tests']
    },
    {
      tabFr: '03. Mémoire SQLite',
      tabEn: '03. SQLite Memory',
      badgeFr: 'MODULE 03 // PERSISTANCE & TRAÇABILITÉ',
      badgeEn: 'MODULE 03 // PERSISTENCE & PROVENANCE',
      titleFr: 'Base SQLite WAL & Traçabilité des Sources',
      titleEn: 'SQLite WAL Storage & Source Provenance',
      descFr:
        'Stockage local structuré en mode Write-Ahead Logging (WAL) séparant le contexte immédiat, l’historique horodaté des sessions et l’index documentaire.',
      descEn:
        'Structured local SQLite database in Write-Ahead Logging (WAL) mode separating active context, timestamped session logs, and indexed notes.',
      file: 'memory_store.sql',
      code: `CREATE TABLE memory_entries (
    id INTEGER PRIMARY KEY,
    claim TEXT NOT NULL,
    source_uri TEXT NOT NULL,
    created_at TEXT NOT NULL
); -- PRAGMA journal_mode=WAL;`,
      pillsFr: ['SQLite WAL', 'Schéma Relationnel', 'Zéro Latence Réseau'],
      pillsEn: ['SQLite WAL', 'Relational Schema', 'Zero Network Latency']
    },
    {
      tabFr: '04. Vérification SHA-256',
      tabEn: '04. SHA-256 Verification',
      badgeFr: 'MODULE 04 // CONTRÔLE POST-DÉPLOIEMENT',
      badgeEn: 'MODULE 04 // POST-DEPLOY VERIFICATION',
      titleFr: 'Validation par Empreintes SHA-256 & Rendu Réel',
      titleEn: 'SHA-256 Byte Parity & Headless Browser Checks',
      descFr:
        'Aucun déploiement n’est considéré terminé sur un simple code retour 0 : vérification systématique des sommes SHA-256 distantes, des réponses HTTP et du rendu navigateur.',
      descEn:
        'Deployments are never trusted on exit code 0 alone: scripts verify remote SHA-256 checksums, HTTP status headers, and headless Playwright renders.',
      file: 'verify_deploy.py',
      code: `assert local_sha256("portfolio.html") == remote_sha256("portfolio.html")
assert http_head("http://88.96.47.180:8765/portfolio.html") == 200
assert playwright_console_errors() == 0`,
      pillsFr: ['Parité SHA-256', 'Playwright', 'Sondes HTTP', 'Zéro Régression'],
      pillsEn: ['SHA-256 Parity', 'Playwright', 'HTTP Probes', 'Zero Regression']
    }
  ];

  const DOORS_DATA = [
    {
      badgeFr: 'DOMAINE 01 // BACKEND PYTHON, TYPESCRIPT & SÉCURITÉ (C1 • C2)',
      badgeEn: 'PORTAL 01 // PYTHON, TYPESCRIPT & APPLICATION SECURITY',
      headingFr: 'Services FastAPI / NestJS robustes, revues open-source et correction de failles',
      headingEn: 'Production FastAPI / NestJS backends, upstream OSS & vulnerability remediation',
      descFr:
        'Expérience concrète sur des bases de code industrielles (Twenty CRM 40k★, BasedHardware/omi 8k★, plateformes FinTech TypeScript) avec 46 Pull Requests fusionnées.',
      descEn:
        'Hands-on track record across large-scale codebases (Twenty CRM 40k★, BasedHardware/omi 8k★, TypeScript FinTech platforms) with 46 merged Pull Requests.',
      itemsFr: [
        'Développement backend Python (FastAPI, Asyncio) & TypeScript (NestJS, Node.js)',
        'Contrôles de permissions RBAC, élimination de fuites CWE-209 et vecteurs XSS',
        'Suites de tests hermétiques Vitest / Pytest et gestion d’erreurs HTTP 401 concurrentes',
        'Publication du serveur d’audit HTTP / RFC 9116 (security-scanner-mcp)'
      ],
      itemsEn: [
        'Backend engineering in Python (FastAPI, Asyncio) & TypeScript (NestJS, Node.js)',
        'RBAC permission guards, CWE-209 exception leak & XSS vector remediation',
        'Hermetic Vitest / Pytest regression suites & idempotent 401 auth interceptors',
        'Author of the published HTTP / RFC 9116 security-scanner-mcp server'
      ]
    },
    {
      badgeFr: 'DOMAINE 02 // PROGRAMMATION C99 & SYSTÈMES LINUX (C3)',
      badgeEn: 'PORTAL 02 // ISO C99 & LINUX SYSTEMS',
      headingFr: 'Gestion mémoire rigoureuse, compilation stricte et administration Linux 24/7',
      headingEn: 'Strict memory discipline, zero-warning C99 & 24/7 Linux administration',
      descFr:
        'Approche issue du BUT Informatique (et de mes bases Maths / NSI / SI) couplée à l’administration quotidienne d’un serveur Ubuntu 24.04.',
      descEn:
        'Grounded in university systems coursework (backed by Math, CS & Engineering Sciences) and daily Ubuntu 24.04 cloud administration.',
      itemsFr: [
        'Langage C99 compilé avec -Wall -Wextra -Werror (zéro warning toléré)',
        'Vérification systématique des pointeurs et fuites mémoire sous Valgrind',
        'Administration Ubuntu Server 24.04, Docker, unités systemd, SSH et Nginx',
        'Scripts Bash / Python de déploiement et vérification d’intégrité SHA-256'
      ],
      itemsEn: [
        'ISO C99 compiled under -Wall -Wextra -Werror (zero warnings)',
        'Heap & pointer boundary verification using Valgrind',
        'Ubuntu 24.04 server administration, Docker, systemd daemons, SSH & Nginx',
        'Automated deployment & SHA-256 post-deploy verification scripts'
      ]
    },
    {
      badgeFr: 'DOMAINE 03 // OUTILS IA, MCP & AUTOMATISATION (C2 • C5)',
      badgeEn: 'PORTAL 03 // AI AGENTS, MCP & AUTOMATION',
      headingFr: 'Outils IA pragmatiques, serveurs MCP standards et pipelines vérifiables',
      headingEn: 'Practical AI workflows, MCP servers & deterministic automation pipelines',
      descFr:
        'Conception de serveurs Model Context Protocol (publiés sur Smithery et Glama) et d’orchestrateurs Python structurés avec mémoire SQLite locale.',
      descEn:
        'Building published Model Context Protocol (MCP) servers (Smithery & Glama) and deterministic Python DAG orchestrators backed by SQLite.',
      itemsFr: [
        'Serveurs Model Context Protocol (MCP) publiés sur Smithery.ai et Glama.ai',
        'Orchestration de tâches en graphes acycliques dirigés (DAG) avec garde-fous',
        'Mémoire persistante SQLite WAL avec suivi de la source de chaque donnée',
        'Tests visuels et automatisation navigateur headless via Playwright'
      ],
      itemsEn: [
        'Published Model Context Protocol (MCP) tools on Smithery.ai & Glama.ai',
        'Directed Acyclic Graph (DAG) task routing with strict safety checks',
        'Persistent SQLite WAL memory tracking source provenance',
        'Headless browser verification & rendering pipelines using Playwright'
      ]
    },
    {
      badgeFr: 'DOMAINE 04 // BASES DE DONNÉES SQL & INTERFACES WEB (C4 • C6)',
      badgeEn: 'PORTAL 04 // RELATIONAL SQL & FRONTEND CRAFT',
      headingFr: 'Modélisation relationnelle 3NF et interfaces React / Vanilla JS accessibles',
      headingEn: 'Normalized 3NF SQL schemas & accessible React / Vanilla JS interfaces',
      descFr:
        'De la conception Merise / PostgreSQL jusqu’aux applications React / TypeScript / Tailwind et interfaces web natives fluides à 60 fps.',
      descEn:
        'From 3NF Merise/PostgreSQL database modeling to accessible React/TypeScript apps and dependency-free 60fps web interfaces.',
      itemsFr: [
        'Modélisation conceptuelle Merise (MCD / MLD), PostgreSQL, SQLite et Supabase',
        'Interfaces React, Next.js, TypeScript, Tailwind CSS et HTML/CSS/JS natif',
        'Accessibilité clavier W3C WCAG (focus-trap, contrastes élevés, lecteurs d’écran)',
        'Travail collaboratif Git / GitHub : revues de PRs exigeantes et commits normés'
      ],
      itemsEn: [
        'Conceptual data modeling (Merise), PostgreSQL, SQLite & Supabase',
        'React, Next.js, TypeScript, Tailwind CSS & high-craft vanilla HTML/CSS/JS',
        'WCAG keyboard accessibility (modal focus-traps, contrast, screen-reader labels)',
        'Collaborative Git/GitHub workflow: conventional commits & upstream PR reviews'
      ]
    }
  ];

  let currentLang = 'fr';
  let currentTheme = 'dark';
  let roleIdx = 0;
  let activeOssIdx = 0;
  let activeModuleIdx = 0;
  let activeDoorIdx = 0;

  /* ------------------------------------------------------------------------
     2. AMBIENT HERO OP-ART CANVAS (ADAPTS TO NOIR OR WARM PAPER THEME!)
     ------------------------------------------------------------------------ */
  function initOpArtCanvas() {
    const canvas = document.getElementById('op-art-canvas');
    const hero = document.querySelector('.hero-section');
    if (!canvas || !hero) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let running = true;
    let rafId = null;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let smoothX = 0.5;
    let smoothY = 0.5;
    let t = 0;

    function resize() {
      const rect = hero.getBoundingClientRect();
      width = Math.max(320, Math.floor(rect.width));
      height = Math.max(480, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function render() {
      if (!running) {
        rafId = null;
        return;
      }
      t += 0.008;
      smoothX += (mouseX - smoothX) * 0.05;
      smoothY += (mouseY - smoothY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const isLight = currentTheme === 'light';
      const cx = width * 0.5 + (smoothX - 0.5) * 32;
      const cy = height * 0.52 + (smoothY - 0.5) * 22;

      const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(width, height) * 0.45);
      grad.addColorStop(0, isLight ? 'rgba(220, 38, 38, 0.09)' : 'rgba(239, 68, 68, 0.13)');
      grad.addColorStop(0.5, isLight ? 'rgba(220, 38, 38, 0.02)' : 'rgba(239, 68, 68, 0.03)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const baseRadius = Math.min(width, height) * 0.21;
      for (let i = 0; i < 5; i++) {
        const r = baseRadius + i * 74 + Math.sin(t - i * 0.55) * 9;
        if (r <= 0) continue;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        if (i % 2 === 0) {
          ctx.strokeStyle = `rgba(220, 38, 38, ${0.11 - i * 0.015})`;
        } else {
          ctx.strokeStyle = isLight
            ? `rgba(17, 17, 21, ${0.06 - i * 0.008})`
            : `rgba(255, 255, 255, ${0.055 - i * 0.008})`;
        }
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rafId = window.requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener(
      'mousemove',
      function (e) {
        mouseX = e.clientX / Math.max(1, window.innerWidth);
        mouseY = e.clientY / Math.max(1, window.innerHeight);
      },
      { passive: true }
    );

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        function (entries) {
          running = entries.some((en) => en.isIntersecting) && !document.hidden;
          if (running && !rafId) rafId = window.requestAnimationFrame(render);
        },
        { threshold: 0.02 }
      );
      io.observe(hero);
    }

    resize();
    rafId = window.requestAnimationFrame(render);
  }

  /* ------------------------------------------------------------------------
     3. PULL-CORD THEME SWITCH, ROLE FLIP-PAD & PORTRAIT ABILITY CARD
     ------------------------------------------------------------------------ */
  function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    const cordBtn = document.getElementById('pull-cord-btn');
    if (cordBtn) {
      cordBtn.classList.add('is-pulled');
      window.setTimeout(() => cordBtn.classList.remove('is-pulled'), 260);
    }
    const msg =
      currentLang === 'fr'
        ? currentTheme === 'light'
          ? 'Thème Papier Éditorial activé'
          : 'Thème Studio Noir activé'
        : currentTheme === 'light'
        ? 'Warm Editorial Paper theme active'
        : 'Noir Studio theme active';
    showToast(msg);
  }

  function initPullCord() {
    const cordBtn = document.getElementById('pull-cord-btn');
    if (cordBtn) cordBtn.addEventListener('click', toggleTheme);
  }

  function renderRoleCard() {
    const roleText = document.getElementById('role-flip-text');
    const roleIndex = document.getElementById('role-flip-index');
    const item = ROLES[roleIdx] || ROLES[0];
    if (roleText) roleText.textContent = currentLang === 'fr' ? item.fr : item.en;
    if (roleIndex) roleIndex.textContent = item.idx;
  }

  function stepRoleFlip() {
    const pad = document.getElementById('role-flip-btn');
    if (!pad) return;
    pad.classList.add('is-flipping');
    window.setTimeout(function () {
      roleIdx = (roleIdx + 1) % ROLES.length;
      renderRoleCard();
      pad.classList.remove('is-flipping');
    }, 150);
  }

  function initRoleFlipPad() {
    const pad = document.getElementById('role-flip-btn');
    if (!pad) return;
    renderRoleCard();
    pad.addEventListener('click', stepRoleFlip);
    window.setInterval(function () {
      if (!document.hidden && window.scrollY < window.innerHeight * 0.7) {
        stepRoleFlip();
      }
    }, 4400);
  }

  function initAbilityCard() {
    const sheet = document.getElementById('ability-card-sheet');
    const toggleBtn = document.getElementById('ability-toggle-btn');
    const closeBtn = document.getElementById('ability-close-btn');
    if (!sheet || !toggleBtn) return;

    function setOpen(open) {
      sheet.classList.toggle('open', open);
      sheet.setAttribute('aria-hidden', open ? 'false' : 'true');
    }

    toggleBtn.addEventListener('click', function () {
      setOpen(!sheet.classList.contains('open'));
    });
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        setOpen(false);
      });
    }
  }

  /* ------------------------------------------------------------------------
     4. KAI MODULE TABS, INTERACTIVE SPECIALTY DOORS & TIMELINE SYNC
     ------------------------------------------------------------------------ */
  function renderKaiModule(idx) {
    activeModuleIdx = idx;
    const m = KAI_MODULES[idx] || KAI_MODULES[0];
    const isFr = currentLang === 'fr';

    document.querySelectorAll('.layer-tab[data-layer]').forEach((btn, i) => {
      const mod = KAI_MODULES[i];
      if (mod) btn.textContent = isFr ? mod.tabFr : mod.tabEn;
      btn.classList.toggle('active', i === idx);
      btn.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });

    const badgeEl = document.getElementById('layer-badge');
    const titleEl = document.getElementById('layer-title');
    const descEl = document.getElementById('layer-desc');
    const fileEl = document.getElementById('layer-code-file');
    const codeEl = document.getElementById('layer-code-pre');
    const pillsEl = document.getElementById('layer-pills');

    if (badgeEl) badgeEl.textContent = isFr ? m.badgeFr : m.badgeEn;
    if (titleEl) titleEl.textContent = isFr ? m.titleFr : m.titleEn;
    if (descEl) descEl.textContent = isFr ? m.descFr : m.descEn;
    if (fileEl) fileEl.textContent = m.file;
    if (codeEl) codeEl.textContent = m.code;
    if (pillsEl) {
      const pills = isFr ? m.pillsFr : m.pillsEn;
      pillsEl.innerHTML = pills.map((p) => `<span class="layer-pill">${p}</span>`).join('');
    }
  }

  function renderOssEcosystem(idx) {
    activeOssIdx = idx;
    const eco = OSS_ECOSYSTEMS[idx] || OSS_ECOSYSTEMS[0];
    const isFr = currentLang === 'fr';

    document.querySelectorAll('.oss-eco-tab').forEach((btn, i) => {
      const e = OSS_ECOSYSTEMS[i];
      if (e) btn.textContent = isFr ? e.tabFr : e.tabEn;
      btn.classList.toggle('active', i === idx);
    });

    const titleEl = document.getElementById('oss-window-title');
    const listEl = document.getElementById('oss-pr-list');
    if (titleEl) titleEl.textContent = eco.winTitle;
    if (listEl) {
      listEl.innerHTML = eco.rows
        .map(
          (r) => `
          <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="oss-pr-row">
            <span class="oss-pr-id">${r.id}</span>
            <span class="oss-pr-summary">${isFr ? r.fr : r.en}</span>
            <span class="oss-pr-status">${r.status}</span>
          </a>
        `
        )
        .join('');
    }
  }

  function initOssTabs() {
    document.querySelectorAll('.oss-eco-tab').forEach((btn) => {
      btn.addEventListener('click', function () {
        const idx = parseInt(btn.getAttribute('data-oss') || '0', 10);
        renderOssEcosystem(idx);
      });
    });
    renderOssEcosystem(0);
  }

  function initProjectFilters() {
    const btns = document.querySelectorAll('.proj-filter-btn');
    const cards = document.querySelectorAll('.case-card[data-cat]');
    if (!btns.length || !cards.length) return;

    btns.forEach((btn) => {
      btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-filter') || 'all';
        btns.forEach((b) => b.classList.toggle('active', b === btn));
        cards.forEach((card) => {
          const cat = card.getAttribute('data-cat');
          card.style.display = filter === 'all' || cat === filter ? '' : 'none';
        });
        window.dispatchEvent(new Event('resize'));
      });
    });
  }

  function initKaiTabs() {
    document.querySelectorAll('.layer-tab[data-layer]').forEach((btn) => {
      btn.addEventListener('click', function () {
        const idx = parseInt(btn.getAttribute('data-layer') || '0', 10);
        renderKaiModule(idx);
      });
    });
    renderKaiModule(0);
  }

  function renderDoor(idx) {
    activeDoorIdx = idx;
    const d = DOORS_DATA[idx] || DOORS_DATA[0];
    const isFr = currentLang === 'fr';

    document.querySelectorAll('.door-card').forEach((btn, i) => {
      btn.classList.toggle('active', i === idx);
      btn.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });

    const badgeEl = document.getElementById('door-badge');
    const headEl = document.getElementById('door-heading');
    const descEl = document.getElementById('door-desc');
    const listEl = document.getElementById('door-checklist');

    if (badgeEl) badgeEl.textContent = isFr ? d.badgeFr : d.badgeEn;
    if (headEl) headEl.textContent = isFr ? d.headingFr : d.headingEn;
    if (descEl) descEl.textContent = isFr ? d.descFr : d.descEn;
    if (listEl) {
      const arr = isFr ? d.itemsFr : d.itemsEn;
      listEl.innerHTML = arr.map((item) => `<li>${item}</li>`).join('');
    }
  }

  function initDoors() {
    document.querySelectorAll('.door-card').forEach((btn) => {
      btn.addEventListener('click', function () {
        const idx = parseInt(btn.getAttribute('data-door') || '0', 10);
        renderDoor(idx);
      });
    });
    renderDoor(0);
  }

  function updateActiveTimelineItem(activeItem) {
    if (!activeItem) return;
    const yearEl = document.getElementById('timeline-big-year');
    const periodEl = document.getElementById('timeline-period-label');
    const countEl = document.getElementById('timeline-step-count');
    const fillEl = document.getElementById('timeline-step-fill');

    document.querySelectorAll('.timeline-item').forEach((el) => {
      el.classList.toggle('active', el === activeItem);
    });

    if (yearEl) yearEl.textContent = activeItem.getAttribute('data-year') || '2026';
    if (periodEl) {
      periodEl.textContent =
        activeItem.getAttribute(currentLang === 'fr' ? 'data-period-fr' : 'data-period-en') || '';
    }
    if (countEl) countEl.textContent = activeItem.getAttribute('data-step') || '01 / 04';
    if (fillEl) fillEl.style.width = activeItem.getAttribute('data-pct') || '25%';
  }

  function initTimelineScrollSync() {
    const items = Array.from(document.querySelectorAll('.timeline-item'));
    if (!items.length) return;

    function syncOnScroll() {
      const targetY = window.innerHeight * 0.48;
      let best = items[0];
      let bestDist = Infinity;
      items.forEach((item) => {
        const r = item.getBoundingClientRect();
        const center = r.top + r.height * 0.35;
        const dist = Math.abs(center - targetY);
        if (dist < bestDist) {
          bestDist = dist;
          best = item;
        }
      });
      updateActiveTimelineItem(best);
    }

    window.addEventListener('scroll', syncOnScroll, { passive: true });
    syncOnScroll();
  }

  /* ------------------------------------------------------------------------
     5. BILINGUAL SWITCHER (100% FR / EN), CLOCK, COPY & COMMAND PALETTE
     ------------------------------------------------------------------------ */
  function applyLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'fr';
    document.documentElement.setAttribute('lang', currentLang);

    const toggleBtn = document.getElementById('lang-toggle-btn');
    if (toggleBtn) toggleBtn.textContent = currentLang === 'fr' ? 'FR / EN' : 'EN / FR';

    document.querySelectorAll('[data-fr]').forEach((el) => {
      const val = el.getAttribute(currentLang === 'fr' ? 'data-fr' : 'data-en');
      if (val !== null) {
        if (el.hasAttribute('data-html')) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    const cmdInput = document.getElementById('cmdk-input');
    if (cmdInput) {
      cmdInput.placeholder =
        cmdInput.getAttribute(
          currentLang === 'fr' ? 'data-placeholder-fr' : 'data-placeholder-en'
        ) || '';
    }

    const cvHref =
      currentLang === 'fr'
        ? 'portfolio_assets/CV_Matei_de_Saint_Leger_FR.pdf'
        : 'portfolio_assets/Resume_Matei_de_Saint_Leger_EN.pdf';
    ['dock-cv-link', 'hero-cv-link'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('href', cvHref);
    });

    renderRoleCard();
    renderOssEcosystem(activeOssIdx);
    renderKaiModule(activeModuleIdx);
    renderDoor(activeDoorIdx);
    if (typeof window.__refreshExplodedLang === 'function') {
      window.__refreshExplodedLang();
    }
    if (typeof window.__refreshScrollArchitectLang === 'function') {
      window.__refreshScrollArchitectLang();
    }
    const activeTl = document.querySelector('.timeline-item.active');
    if (activeTl) updateActiveTimelineItem(activeTl);
  }

  function showToast(msg) {
    const toast = document.getElementById('toast-banner');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('visible');
    window.clearTimeout(toast._hideTimer);
    toast._hideTimer = window.setTimeout(() => toast.classList.remove('visible'), 2600);
  }

  function copyEmailToClipboard() {
    const email = 'matei64200@gmail.com';
    const msg =
      currentLang === 'fr'
        ? 'E-mail copié : matei64200@gmail.com'
        : 'Copied to clipboard: matei64200@gmail.com';

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(
        () => showToast(msg),
        () => showToast(msg)
      );
    } else {
      showToast(msg);
    }
  }

  function initScrollAndClock() {
    const bar = document.getElementById('scroll-progress-bar');
    if (bar) {
      window.addEventListener(
        'scroll',
        function () {
          const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const pct = Math.max(0, Math.min(1, (window.scrollY || 0) / max));
          bar.style.transform = `scaleX(${pct.toFixed(4)})`;
        },
        { passive: true }
      );
    }

    const sections = [
      'projects',
      'exploded-architecture',
      'domains',
      'timeline',
      'experience-dna',
      'contact'
    ]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const links = document.querySelectorAll('.dock-link');
    if (sections.length && links.length && 'IntersectionObserver' in window) {
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              links.forEach((lnk) =>
                lnk.classList.toggle('active', lnk.getAttribute('href') === `#${entry.target.id}`)
              );
            }
          });
        },
        { rootMargin: '-35% 0px -50% 0px' }
      );
      sections.forEach((s) => spy.observe(s));
    }

    const clockEl = document.getElementById('live-biarritz-clock');
    const dockTimeEl = document.getElementById('dock-local-time');
    function tick() {
      try {
        const shortFmt = new Intl.DateTimeFormat('fr-FR', {
          timeZone: 'Europe/Paris',
          hour: '2-digit',
          minute: '2-digit'
        });
        const str = shortFmt.format(new Date());
        if (clockEl) clockEl.textContent = `${str} CET`;
        if (dockTimeEl) dockTimeEl.textContent = `Biarritz • ${str}`;
      } catch (_) {}
    }
    tick();
    window.setInterval(tick, 15000);
  }

  function initMagneticButtons() {
    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
      btn.addEventListener('mousemove', function (e) {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.14;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.18;
        btn.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  function initCommandPalette() {
    const backdrop = document.getElementById('cmdk-backdrop');
    const openBtn = document.getElementById('cmdk-open-btn');
    const input = document.getElementById('cmdk-input');
    const listEl = document.getElementById('cmdk-list');
    if (!backdrop || !input || !listEl) return;

    function getCommands() {
      const fr = currentLang === 'fr';
      return [
        {
          label: fr ? '◈  Aller aux Projets & PRs Open-Source' : '◈  Jump to Projects & Open-Source PRs',
          kbd: '#01',
          run: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
          label: fr ? '❖  Inspecter la Vue Éclatée 3D (6 Couches)' : '❖  Inspect Interactive 3D Exploded View',
          kbd: '#02 3D',
          run: () => document.getElementById('exploded-architecture')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
          label: fr ? '⊞  Explorer les Portes de Compétences' : '⊞  Explore Capability Portals',
          kbd: '#03',
          run: () => document.getElementById('domains')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
          label: fr ? '§  Voir mon Parcours Chronologique (2023–2026)' : '§  Jump to Chronological Timeline (2023–2026)',
          kbd: '#04',
          run: () => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
          label: fr ? '✦  Stages (HUPI, Marra), Immersion UK & Échecs' : '✦  Internships (HUPI, Marra), UK Stays & Chess',
          kbd: '#05',
          run: () => document.getElementById('experience-dna')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
          label: fr ? '⇄  Changer de langue (Français / English)' : '⇄  Switch Language (English / Français)',
          kbd: 'FR/EN',
          run: () => applyLanguage(currentLang === 'fr' ? 'en' : 'fr')
        },
        {
          label: fr ? '◐  Basculer Thème Noir / Papier Clair' : '◐  Toggle Noir / Warm Paper Theme',
          kbd: 'THEME',
          run: () => toggleTheme()
        },
        {
          label: fr
            ? '↓  Télécharger mon CV PDF (Alternance BUT 2)'
            : '↓  Download my Resume PDF (Year-2 Co-op)',
          kbd: 'PDF',
          run: () => {
            const url =
              currentLang === 'fr'
                ? 'portfolio_assets/CV_Matei_de_Saint_Leger_FR.pdf'
                : 'portfolio_assets/Resume_Matei_de_Saint_Leger_EN.pdf';
            window.open(url, '_blank', 'noopener');
          }
        },
        {
          label: fr ? '⎘  Copier mon e-mail (matei64200@gmail.com)' : '⎘  Copy Email (matei64200@gmail.com)',
          kbd: 'COPY',
          run: () => copyEmailToClipboard()
        },
        {
          label: fr
            ? '↗  Inspecter mes 46 PRs fusionnées sur GitHub'
            : '↗  Inspect all 46 Merged Pull Requests on GitHub',
          kbd: '46 PRs',
          run: () =>
            window.open(
              'https://github.com/pulls?q=is%3Apr+author%3AMateidslx+is%3Amerged',
              '_blank',
              'noopener'
            )
        },
        {
          label: fr
            ? '↗  Ouvrir security-scanner-mcp (Smithery / GitHub)'
            : '↗  Open security-scanner-mcp on GitHub',
          kbd: 'MCP',
          run: () =>
            window.open('https://github.com/Mateidslx/security-scanner-mcp', '_blank', 'noopener')
        },
        {
          label: fr ? '↗  Ouvrir mon GitHub (@Mateidslx)' : '↗  Open GitHub Profile (@Mateidslx)',
          kbd: 'GH',
          run: () => window.open('https://github.com/Mateidslx', '_blank', 'noopener')
        }
      ];
    }

    let filtered = [];
    let selIdx = 0;

    function renderItems() {
      listEl.innerHTML = filtered
        .map(
          (cmd, i) => `
          <button type="button" class="cmdk-item${i === selIdx ? ' selected' : ''}" data-idx="${i}">
            <span>${cmd.label}</span>
            <span class="cmdk-item-kbd">${cmd.kbd}</span>
          </button>
        `
        )
        .join('');

      listEl.querySelectorAll('.cmdk-item').forEach((btn) => {
        btn.addEventListener('click', function () {
          executeCommand(parseInt(btn.getAttribute('data-idx') || '0', 10));
        });
      });
    }

    function executeCommand(i) {
      const cmd = filtered[i];
      backdrop.classList.remove('open');
      if (cmd) cmd.run();
    }

    function openPalette() {
      input.value = '';
      filtered = getCommands();
      selIdx = 0;
      renderItems();
      backdrop.classList.add('open');
      window.setTimeout(() => input.focus(), 40);
    }

    if (openBtn) openBtn.addEventListener('click', openPalette);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('open');
    });

    input.addEventListener('input', function () {
      const q = input.value.trim().toLowerCase();
      filtered = getCommands().filter(
        (c) => c.label.toLowerCase().includes(q) || c.kbd.toLowerCase().includes(q)
      );
      selIdx = 0;
      renderItems();
    });

    window.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (backdrop.classList.contains('open')) {
          backdrop.classList.remove('open');
        } else {
          openPalette();
        }
        return;
      }
      if (!backdrop.classList.contains('open')) return;
      if (e.key === 'Escape') {
        backdrop.classList.remove('open');
      } else if (e.key === 'ArrowDown' && filtered.length) {
        e.preventDefault();
        selIdx = (selIdx + 1) % filtered.length;
        renderItems();
      } else if (e.key === 'ArrowUp' && filtered.length) {
        e.preventDefault();
        selIdx = (selIdx - 1 + filtered.length) % filtered.length;
        renderItems();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        executeCommand(selIdx);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initOpArtCanvas();
    initPullCord();
    initRoleFlipPad();
    initAbilityCard();
    initOssTabs();
    initProjectFilters();
    initKaiTabs();
    initDoors();
    initTimelineScrollSync();
    initScrollAndClock();
    initMagneticButtons();
    initCommandPalette();

    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.addEventListener('click', function () {
        applyLanguage(currentLang === 'fr' ? 'en' : 'fr');
      });
    }

    const copyBtn = document.getElementById('btn-copy-email');
    if (copyBtn) copyBtn.addEventListener('click', copyEmailToClipboard);

    const topBtn = document.getElementById('footer-back-top');
    if (topBtn) {
      topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Default to French for fr-* browsers, English otherwise
    const navLang = (navigator.language || 'fr').toLowerCase();
    applyLanguage(navLang.startsWith('en') ? 'en' : 'fr');
  });
})();
