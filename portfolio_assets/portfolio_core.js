/* ==========================================================================
   MATÉI DE SAINT LÉGER — PORTFOLIO V15 INTERACTIVE CORE (SOVEREIGN ENGINE)
   Interactive 7-Layer Stack | Polymarket Orderbook & Kelly Sim | Omi PRs Diff
   Command Palette ⌘K | Pull-Cord Theme | Bilingual FR/EN | Telemetry Clock
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. DATA: 7-LAYER CONSTITUTIONAL STACK (KAI AUTONOMOUS CORE)
     ------------------------------------------------------------------------ */
  const STACK_LAYERS = [
    {
      badge: 'COUCHE L1 // MOTEUR D\'INFÉRENCE & SÉCURITÉ',
      role: 'Raisonnement Multi-Modèles & Politiques Fermées',
      title: 'Routage Hybride Claude Code, Gemini 2.5 Pro & Inférence Locale Jev',
      desc: 'Inférence contextuelle adaptative : arbitrage de latence et coût entre Claude 3.7 Sonnet (raisonnement architectural), Gemini 2.5 Pro (large fenêtre de contexte multimodal) et Ollama local (modèle Jev fine-tuné). Intégration d\'un Fail-Closed Policy Engine bloquant toute action non signée.',
      file: 'core/llm/cognitive_router.py',
      code: `async def route_cognitive_prompt(prompt: str, context_budget: int) -> ModelVerdict:
    # 1. Verification stricte fail-closed
    if not policy_engine.verify_intent(prompt):
        raise SecurityGateException("CRITICAL: Prompt injection or unauthorized payload")
    
    # 2. Arbitrage de latence et cout
    if context_budget > 64000:
        return await gemini_flash_client.generate(prompt)
    elif "refactor" in prompt or "valgrind" in prompt:
        return await claude_code_client.generate_deep_reasoning(prompt)
    return await ollama_jev_local.generate_fast(prompt)`,
      pills: ['Fail-Closed Security', 'Context Caching', 'Dynamic Quotas', 'Zero Prompt Leakage']
    },
    {
      badge: 'COUCHE L2 // MÉMOIRE HIÉRARCHIQUE LETTA (MEMGPT)',
      role: 'Core Memory, Vecteurs SQLite WAL & Grand Livre d\'Événements',
      title: 'Système Tripartite de Persistance Cognitive Déterministe',
      desc: 'Architecture de mémoire inspirée de MemGPT : Core Memory (profil utilisateur, contraintes cognitives et règles académiques), Archival Memory (vecteurs sqlite-vec indexés) et Recall Memory (grand livre exhaustif des 808 sessions passées sans perte de contexte).',
      file: 'core/memory/letta_memory_os.py',
      code: `class LettaMemoryOS:
    def __init__(self, db_path: Path):
        self.conn = sqlite3.connect(db_path, isolation_level=None)
        self.conn.execute("PRAGMA journal_mode=WAL;")
        self.conn.execute("PRAGMA synchronous=NORMAL;")
        
    def recall_with_provenance(self, query_embedding: list[float], top_k: int = 5):
        cursor = self.conn.cursor()
        return cursor.execute("""
            SELECT doc_id, text, confidence, source_file
            FROM archival_memory 
            ORDER BY vector_distance(embedding, ?) ASC LIMIT ?
        """, (query_embedding, top_k)).fetchall()`,
      pills: ['SQLite WAL Mode', 'Vector Cosine Distance', 'Audit Trail', 'Provenance Tracking']
    },
    {
      badge: 'COUCHE L3 // ESSAIM MULTI-AGENTS & CONSENSUS',
      role: '36 Agents Spécialisés & Table Ronde Pré-Exécution',
      title: 'Délégation Hiérarchique & Consensus Déterministe (DAG)',
      desc: 'Orchestration d\'un conseil de 36 agents autonomes (Red Team AppSec, Artisan C99, Bounty Hunter, Sentinelle de Marché, Copilote Académique). Toute action à fort impact nécessite l\'accord unanime de la table ronde avec vérification de préconditions formelles.',
      file: 'core/agents/task_dag_orchestrator.py',
      code: `class TaskDAGOrchestrator:
    def evaluate_preflight_consensus(self, task: TaskNode) -> bool:
        reviews = [
            security_auditor.audit(task),
            testing_reality_checker.validate_evidence(task),
            execution_persistence_guard.check_state(task)
        ]
        return all(r.verdict == Verdict.APPROVED for r in reviews)`,
      pills: ['Topological Sort', '36 Micro-Agents', 'Consensus Voting', 'Rollback Primitives']
    },
    {
      badge: 'COUCHE L4 // BOUCLE D\'EXÉCUTION CONTINUE 24/7',
      role: 'Moteur Insomnia Autopilot sur VPS Oracle Cloud Ubuntu',
      title: 'Supervision Systemd, Auto-Guérison & Heartbeat Sans Sommeil',
      desc: 'Moteur autonome 24/7 déployé sur VPS Oracle Cloud Ubuntu 24.04. 19 démons systemd surveillés en continu avec redémarrage automatique en cas de crash, tunnel Cloudflare chiffré, et sentinelle Telegram envoyant des pings périodiques.',
      file: 'scripts/vps_sentinel_full.py',
      code: `def monitor_systemd_daemons():
    for service_name in CRITICAL_DAEMONS:
        status = subprocess.run(["systemctl", "is-active", service_name], capture_output=True, text=True)
        if status.stdout.strip() != "active":
            logger.warning(f"Daemon {service_name} DOWN! Triggering auto-heal...")
            subprocess.run(["systemctl", "restart", service_name])
            telegram_notify(f"🛡️ Kai Watchdog restarted {service_name}")`,
      pills: ['19 Systemd Units', 'Watchdog Auto-Healing', 'Encrypted Tunnel', 'Sub-Second Recovery']
    },
    {
      badge: 'COUCHE L5 // PONT MATÉRIEL & TÉLÉMÉTRIE MOBILE',
      role: 'Passerelle Shizuku IPC, ADB Sans Fil & Isolation DAC',
      title: 'Contrôle Matériel Headless & Métrologie Circadienne',
      desc: 'Liaison directe avec terminal mobile Xiaomi/Redmi via Shizuku et commandes ADB sans fil. Suivi automatique du temps d\'écran, régulation circadienne des alarmes matinales (alignées sur le calendrier universitaire ADE) et synchronisation sans cloud tiers.',
      file: 'core/desktop/adb_phone_bridge.py',
      code: `def query_phone_telemetry() -> DeviceState:
    res = subprocess.run(["adb", "shell", "dumpsys", "battery"], capture_output=True, text=True)
    level = parse_battery_level(res.stdout)
    screen_time = query_screen_time_dpm()
    return DeviceState(battery_pct=level, screen_minutes=screen_time)`,
      pills: ['Shizuku IPC', 'Wireless ADB', 'Circadian Optimization', 'Zero External Cloud']
    },
    {
      badge: 'COUCHE L6 // DÉTECTEUR DIFFÉRENTIEL PROACTIF',
      role: 'Veille Silencieuse Moodle, ADE & Triage d\'E-mails',
      title: 'Inspection d\'État Différentielle & Zéro Spam d\'Alerte',
      desc: 'Surveillance proactive des sources académiques et professionnelles : détection immédiate des nouveaux dépôts de devoirs sur Moodle, réalignement des emplois du temps ADE et triage intelligent des courriels sans notification superflue.',
      file: 'core/detector/proactive_change_detector.py',
      code: `def compute_moodle_diff(previous_snapshot, current_snapshot):
    diff = diff_assignments(previous_snapshot, current_snapshot)
    if diff.has_new_deadlines():
        task_scheduler.insert_priority_study_block(diff.deadlines)
        telegram_bot.notify_discrete(f"📚 Nouveau devoir détecté : {diff.title}")`,
      pills: ['Differential Hashing', 'ADE Schedule Sync', 'Moodle Diffs', 'Zero Alert Fatigue']
    },
    {
      badge: 'COUCHE L7 // AUTO-ÉVOLUTION & FORGE D\'OUTILS',
      role: 'Synthèse Autonome de Skills & Boucles de Tests TDD',
      title: 'Génération Dynamique de Nouveaux Outils MCP',
      desc: 'Capacité pour le système d\'identifier un manque d\'outillage, d\'écrire le script Python correspondant, de créer la suite de tests unitaires pytest (cible >= 80% couverture) et d\'enregistrer le serveur MCP dynamiquement sans redémarrer le système.',
      file: 'core/skills/self_evolution_engine.py',
      code: `def forge_new_mcp_skill(skill_spec: SkillSpec) -> bool:
    code = generate_mcp_tool_code(skill_spec)
    test_suite = generate_pytest_suite(code)
    
    # Validation TDD stricte
    if run_test_suite_in_sandbox(test_suite):
        persist_mcp_server(skill_spec.name, code)
        registry.register_tool(skill_spec.name)
        return True
    return False`,
      pills: ['Dynamic MCP Synthesis', 'TDD Coverage >= 80%', 'Sandbox Validation', 'Hot Reloading']
    }
  ];

  /* ------------------------------------------------------------------------
     2. DATA: BASED HARDWARE / OMI (8K★) PRODUCTION CONTRIBUTIONS
     ------------------------------------------------------------------------ */
  const OMI_PRS = [
    {
      title: 'PR #14604: XSS Elimination (Whoop)',
      maintainer: 'Approved 5/5 by @kodjima33',
      url: 'https://github.com/BasedHardware/omi/pull/14604',
      note: 'Vulnérabilité Reflected XSS critique : le paramètre d\'erreur OAuth renvoyé par le fournisseur Whoop était injecté directement dans le template HTML sans assainissement. Solution : échappement des entités HTML et validation stricte du schéma.',
      before: `@app.get("/auth/whoop/callback")
def whoop_callback(error: str = None):
    if error:
        # VULNERABLE: Direct string interpolation into HTML response
        return HTMLResponse(f"<h1>Error: {error}</h1>")
    ...`,
      after: `@app.get("/auth/whoop/callback")
def whoop_callback(error: str = None):
    if error:
        # SECURED: Strict entity escaping and schema whitelist
        safe_error = html.escape(error, quote=True)
        return HTMLResponse(content=render_error_template(safe_error), status_code=400)
    ...`
    },
    {
      title: 'PR #15974: CLI Overflow Mitigation',
      maintainer: 'Merged by @aryanorastar',
      url: 'https://github.com/BasedHardware/omi/pull/15974',
      note: 'Dépassement de tampon et plantage d\'exécution CLI lors de la désérialisation d\'horodatages d\'expiration gigantesques. Solution : parsing d\'entiers borné avec seuils min/max sécurisés et repli automatique.',
      before: `def load_token_expiry(data: dict) -> datetime:
    # VULNERABLE: Unchecked epoch integer parsing crashes on large values
    return datetime.fromtimestamp(int(data["expires_at"]))`,
      after: `def load_token_expiry(data: dict) -> datetime:
    # SECURED: Bounded integer parsing with defensive epoch boundaries
    raw_val = int(data.get("expires_at", 0))
    if not (0 < raw_val < 253402300799):  # Max UTC year 9999
        logger.warning("Malformed expiry detected, fallback to default")
        return datetime.utcnow() + timedelta(hours=1)
    return datetime.utcfromtimestamp(raw_val)`
    },
    {
      title: 'PR #16025: CWE-209 Exception Masking',
      maintainer: 'Merged by @aryanorastar',
      url: 'https://github.com/BasedHardware/omi/pull/16025',
      note: 'Fuite d\'informations sensibles de base de données (CWE-209) : les traces complètes d\'ORM et les schémas SQL internes étaient envoyés en clair dans les réponses HTTP 500 aux clients non authentifiés.',
      before: `@app.get("/api/v1/tasks/recommendations")
async def get_task_recommendations(user_id: str):
    try:
        return await db.query_tasks(user_id)
    except Exception as exc:
        # VULNERABLE: Leaking internal SQL/ORM stacktrace
        raise HTTPException(status_code=500, detail=str(exc))`,
      after: `@app.get("/api/v1/tasks/recommendations")
async def get_task_recommendations(user_id: str):
    try:
        return await db.query_tasks(user_id)
    except Exception as exc:
        # SECURED: Structured internal log with sanitized localized error
        logger.exception("Task recommendation query failure", extra={"user_id": user_id})
        raise HTTPException(status_code=500, detail="INTERNAL_SERVICE_ERROR")`
    },
    {
      title: 'PR #20168: Idempotent Token Sync',
      maintainer: 'Cherry-picked with credit to @Mateidslx by @Git-on-my-level',
      url: 'https://github.com/BasedHardware/omi/pull/16029',
      note: 'Race condition lors du rafraîchissement concurrent de tokens OAuth : des requêtes simultanées invalidaient prématurément la session active. Solution : verrou distribué idempotent et primitives de synchronisation atomique.',
      before: `async def refresh_access_token(user_id: str):
    # VULNERABLE: Multiple concurrent requests trigger race condition
    token = await provider.fetch_new_token(user_id)
    await db.save_token(user_id, token)
    return token`,
      after: `async def refresh_access_token(user_id: str):
    # SECURED: Idempotent token mutex lock preventing duplicate refresh
    async with get_token_lock(user_id):
        cached = await db.get_valid_token(user_id)
        if cached and not cached.is_expired():
            return cached
        token = await provider.fetch_new_token(user_id)
        await db.save_token(user_id, token)
        return token`
    }
  ];

  /* ------------------------------------------------------------------------
     3. POLYMARKET LIVE SYNTHETIC ORDERBOOK STREAMER
     ------------------------------------------------------------------------ */
  function initPolymarketOrderbook() {
    const tableEl = document.getElementById('orderbook-depth-table');
    if (!tableEl) return;

    const baseAsks = [
      { price: 0.655, size: 2840 },
      { price: 0.648, size: 4520 },
      { price: 0.640, size: 8900 },
      { price: 0.635, size: 12400 }
    ];

    const baseBids = [
      { price: 0.625, size: 14200 },
      { price: 0.620, size: 9350 },
      { price: 0.612, size: 5200 },
      { price: 0.605, size: 3100 }
    ];

    function renderDepth() {
      let html = '';
      let cumul = 0;

      // Render Asks (reversed order for standard depth chart)
      baseAsks.slice().reverse().forEach(row => {
        const jitter = (Math.random() - 0.5) * 400;
        const currentSize = Math.max(800, Math.round(row.size + jitter));
        cumul += currentSize;
        const pct = Math.min(100, Math.round((currentSize / 15000) * 100));

        html += `
          <div class="depth-row ask">
            <span class="price">${row.price.toFixed(3)}</span>
            <span class="shares">${currentSize.toLocaleString('en-US')}</span>
            <span class="cumul">${cumul.toLocaleString('en-US')}</span>
            <div class="depth-bar" style="width: ${pct}%"></div>
          </div>
        `;
      });

      html += `<div style="height: 1px; background: rgba(255,255,255,0.15); margin: 4px 0;"></div>`;

      // Render Bids
      cumul = 0;
      baseBids.forEach(row => {
        const jitter = (Math.random() - 0.5) * 400;
        const currentSize = Math.max(800, Math.round(row.size + jitter));
        cumul += currentSize;
        const pct = Math.min(100, Math.round((currentSize / 15000) * 100));

        html += `
          <div class="depth-row bid">
            <span class="price">${row.price.toFixed(3)}</span>
            <span class="shares">${currentSize.toLocaleString('en-US')}</span>
            <span class="cumul">${cumul.toLocaleString('en-US')}</span>
            <div class="depth-bar" style="width: ${pct}%"></div>
          </div>
        `;
      });

      tableEl.innerHTML = html;
    }

    renderDepth();
    setInterval(renderDepth, 2400); // Live ticking every 2.4s
  }

  /* ------------------------------------------------------------------------
     4. KELLY CRITERION & NOWCAST BAYESIAN SIMULATOR
     ------------------------------------------------------------------------ */
  function initKellySimulator() {
    const marketOddsSlider = document.getElementById('market-odds-slider');
    const modelProbSlider = document.getElementById('model-prob-slider');
    const marketOddsVal = document.getElementById('market-odds-val');
    const modelProbVal = document.getElementById('model-prob-val');
    const kellyFracRes = document.getElementById('kelly-frac-res');
    const safeKellyRes = document.getElementById('safe-kelly-res');
    const expectedValueRes = document.getElementById('expected-value-res');

    if (!marketOddsSlider || !modelProbSlider) return;

    function updateCalculations() {
      const pMarket = parseFloat(marketOddsSlider.value);
      const pTrue = parseFloat(modelProbSlider.value);

      marketOddsVal.textContent = pMarket.toFixed(2);
      modelProbVal.textContent = pTrue.toFixed(2);

      // Decimal odds: b = (1 - pMarket) / pMarket
      // Kelly fraction: f* = (pTrue * b - (1 - pTrue)) / b = (pTrue - pMarket) / (1 - pMarket)
      const b = (1.0 - pMarket) / pMarket;
      const q = 1.0 - pTrue;
      const fStar = (pTrue * b - q) / b;

      const ev = ((pTrue - pMarket) / pMarket) * 100;

      if (fStar <= 0) {
        kellyFracRes.textContent = '0.00% (No Edge)';
        kellyFracRes.className = 'text-crimson';
        safeKellyRes.textContent = '0.00 € (Stay in Cash)';
        expectedValueRes.textContent = `${ev.toFixed(2)}% (Negative)`;
        expectedValueRes.className = 'text-crimson';
      } else {
        const fullPct = (fStar * 100).toFixed(2);
        const safeFraction = fStar * 0.25;
        const safePct = (safeFraction * 100).toFixed(2);
        const capitalAllocation = (safeFraction * 1000).toFixed(2);

        kellyFracRes.textContent = `${fullPct}%`;
        kellyFracRes.className = 'text-emerald';

        safeKellyRes.textContent = `${safePct}% (Cap: ${capitalAllocation} € / 1000 €)`;
        expectedValueRes.textContent = `+${ev.toFixed(2)}%`;
        expectedValueRes.className = 'text-emerald';
      }
    }

    marketOddsSlider.addEventListener('input', updateCalculations);
    modelProbSlider.addEventListener('input', updateCalculations);
    updateCalculations();
  }

  /* ------------------------------------------------------------------------
     5. STACK 7 COUCHES INTERACTIVE TABS
     ------------------------------------------------------------------------ */
  function initStack7Tabs() {
    const tabs = document.querySelectorAll('.stack-tab');
    const badgeEl = document.getElementById('stack-layer-badge');
    const roleEl = document.getElementById('stack-layer-role');
    const titleEl = document.getElementById('stack-layer-title');
    const descEl = document.getElementById('stack-layer-desc');
    const fileEl = document.getElementById('stack-code-file');
    const preEl = document.getElementById('stack-code-pre');
    const pillsEl = document.getElementById('stack-layer-pills');

    if (!tabs.length || !titleEl) return;

    function renderLayer(idx) {
      const data = STACK_LAYERS[idx];
      if (!data) return;

      tabs.forEach((t, i) => {
        const isActive = i === idx;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      badgeEl.textContent = data.badge;
      roleEl.textContent = data.role;
      titleEl.textContent = data.title;
      descEl.textContent = data.desc;
      fileEl.textContent = data.file;
      preEl.textContent = data.code;

      pillsEl.innerHTML = data.pills.map(p => `<span class="layer-pill">${p}</span>`).join('');
    }

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => renderLayer(idx));
    });

    renderLayer(0); // Default to Layer 1
  }

  /* ------------------------------------------------------------------------
     6. OMI 7 PRS DIFF VIEWER INTERACTIVE TABS
     ------------------------------------------------------------------------ */
  function initOmiPrTabs() {
    const tabs = document.querySelectorAll('.omi-pr-btn');
    const titleEl = document.getElementById('omi-diff-title');
    const linkEl = document.getElementById('omi-pr-link');
    const noteEl = document.getElementById('omi-diff-note');
    const beforeEl = document.getElementById('omi-diff-before');
    const afterEl = document.getElementById('omi-diff-after');

    if (!tabs.length || !titleEl) return;

    function renderPr(idx) {
      const data = OMI_PRS[idx];
      if (!data) return;

      tabs.forEach((t, i) => {
        const isActive = i === idx;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      titleEl.textContent = `BasedHardware/omi: ${data.title} · ${data.maintainer}`;
      linkEl.href = data.url;
      noteEl.innerHTML = data.note;
      beforeEl.textContent = data.before;
      afterEl.textContent = data.after;
    }

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => renderPr(idx));
    });

    renderPr(0); // Default to PR 1
  }

  /* ------------------------------------------------------------------------
     7. TACTILE HANGING PULL-CORD THEME TOGGLE
     ------------------------------------------------------------------------ */
  function initPullCordTheme() {
    const cordBtn = document.getElementById('pull-cord-btn');
    if (!cordBtn) return;

    const savedTheme = localStorage.getItem('theme-preference') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    cordBtn.addEventListener('click', () => {
      cordBtn.classList.add('pulling');
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme-preference', nextTheme);

      setTimeout(() => {
        cordBtn.classList.remove('pulling');
      }, 400);
    });
  }

  /* ------------------------------------------------------------------------
     8. BILINGUAL LANGUAGE SWITCHER (FR / EN)
     ------------------------------------------------------------------------ */
  function initLanguageToggle() {
    const langBtn = document.getElementById('lang-toggle-btn');
    if (!langBtn) return;

    let currentLang = localStorage.getItem('lang-preference') || 'fr';
    applyLanguage(currentLang);

    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'fr' ? 'en' : 'fr';
      applyLanguage(currentLang);
      localStorage.setItem('lang-preference', currentLang);
    });

    function applyLanguage(lang) {
      document.documentElement.setAttribute('lang', lang);

      // Translate all data-fr / data-en nodes
      document.querySelectorAll('[data-fr][data-en]').forEach(el => {
        const val = el.getAttribute(`data-${lang}`);
        if (!val) return;
        if (el.getAttribute('data-html') === 'true') {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      });
    }
  }

  /* ------------------------------------------------------------------------
     9. ONE-CLICK EMAIL COPY & TOAST BANNER
     ------------------------------------------------------------------------ */
  function initEmailCopy() {
    const btn = document.getElementById('btn-copy-email');
    const toast = document.getElementById('toast-banner');
    if (!btn || !toast) return;

    btn.addEventListener('click', async () => {
      const email = 'matei64200@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        toast.textContent = `✓ E-mail copié dans le presse-papier : ${email}`;
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 3200);
      } catch (e) {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  /* ------------------------------------------------------------------------
     10. COMMAND PALETTE (CTRL+K / CMD+K)
     ------------------------------------------------------------------------ */
  function initCommandPalette() {
    const backdrop = document.getElementById('cmdk-backdrop');
    const openBtn = document.getElementById('cmdk-open-btn');
    const input = document.getElementById('cmdk-input');
    const list = document.getElementById('cmdk-list');

    if (!backdrop || !input || !list) return;

    const COMMANDS = [
      { label: 'Aller à : Écosystème Autonome Kai 7 Couches', action: () => location.href = '#flagship-deployments' },
      { label: 'Aller à : Moteur Quantitatif Polymarket (V71-V150)', action: () => location.href = '#polymarket-quant' },
      { label: 'Aller à : Contributions Open-Source BasedHardware/Omi (7 PRs)', action: () => location.href = '#project-omi-prs' },
      { label: 'Aller à : AlgoForge & C99 Valgrind Zéro-Leak', action: () => location.href = '#project-c99' },
      { label: 'Aller à : Vue Éclatée 2.5D Interactive', action: () => location.href = '#exploded-architecture' },
      { label: 'Télécharger : CV Français (PDF)', action: () => window.open('portfolio_assets/CV_Matei_de_Saint_Leger_FR.pdf') },
      { label: 'Download: English Resume (PDF)', action: () => window.open('portfolio_assets/Resume_Matei_de_Saint_Leger_EN.pdf') },
      { label: 'Télémétrie : Statut VPS Oracle Cloud 24/7', action: () => alert('VPS Oracle Cloud 88.96.47.180: 19 services systemd actifs (Uptime: 99.98%)') },
      { label: 'Changer le Thème (Mode Noir / Papier Clair)', action: () => document.getElementById('pull-cord-btn')?.click() }
    ];

    function openCmdk() {
      backdrop.classList.add('open');
      input.value = '';
      renderList(COMMANDS);
      input.focus();
    }

    function closeCmdk() {
      backdrop.classList.remove('open');
    }

    function renderList(items) {
      list.innerHTML = items.map((cmd, i) => `
        <div class="cmdk-item" data-index="${i}">
          <span>${cmd.label}</span>
          <span class="cmdk-kbd">↵</span>
        </div>
      `).join('');

      list.querySelectorAll('.cmdk-item').forEach((item, i) => {
        item.addEventListener('click', () => {
          closeCmdk();
          items[i].action();
        });
      });
    }

    openBtn?.addEventListener('click', openCmdk);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeCmdk();
    });

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openCmdk();
      }
      if (e.key === 'Escape' && backdrop.classList.contains('open')) {
        closeCmdk();
      }
    });

    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim();
      const filtered = COMMANDS.filter(c => c.label.toLowerCase().includes(q));
      renderList(filtered);
    });
  }

  /* ------------------------------------------------------------------------
     11. ABILITY CARD TOGGLE (PORTRAIT STAGE)
     ------------------------------------------------------------------------ */
  function initAbilityCard() {
    const toggleBtn = document.getElementById('ability-toggle-btn');
    const closeBtn = document.getElementById('ability-close-btn');
    const card = document.getElementById('portrait-ability-card');

    if (!toggleBtn || !card) return;

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      card.classList.toggle('active');
    });

    closeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      card.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
      if (card.classList.contains('active') && !card.contains(e.target) && e.target !== toggleBtn) {
        card.classList.remove('active');
      }
    });
  }

  /* ------------------------------------------------------------------------
     12. LIVE CLOCK (BIARRITZ LOCAL TIME)
     ------------------------------------------------------------------------ */
  function initLiveClock() {
    const clockEl = document.getElementById('dock-local-time');
    const footerClockEl = document.getElementById('live-biarritz-clock');

    function updateTime() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('fr-FR', {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      if (clockEl) clockEl.textContent = `Biarritz ${timeStr} · 24/7 VPS`;
      if (footerClockEl) footerClockEl.textContent = `${timeStr} CET`;
    }

    updateTime();
    setInterval(updateTime, 1000);
  }

  /* ------------------------------------------------------------------------
     13. INITIALIZE ALL ENGINES
     ------------------------------------------------------------------------ */
  function initAll() {
    initStack7Tabs();
    initPolymarketOrderbook();
    initKellySimulator();
    initOmiPrTabs();
    initPullCordTheme();
    initLanguageToggle();
    initEmailCopy();
    initCommandPalette();
    initAbilityCard();
    initLiveClock();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
