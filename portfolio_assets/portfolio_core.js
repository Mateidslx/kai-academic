/* ==========================================================================
   MATÉI DE SAINT LÉGER — PORTFOLIO V17 CORE CONTROLLER
   Tactile Pull-Cord | Spotlight ⌘K | 7-Layer Stack | Matrix | Live Biarritz Clock | Web Audio
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. PROCEDURAL WEB AUDIO FEEDBACK (ZERO EXTERNAL ASSETS)
     ------------------------------------------------------------------------ */
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioCtx = new Ctx();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playProceduralSound(type) {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'pull') {
        // Tactile lamp cord snap: low-to-high transient followed by resonant drop
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.exponentialRampToValueAtTime(420, t + 0.04);
        osc.frequency.exponentialRampToValueAtTime(80, t + 0.12);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.15);
      } else if (type === 'click') {
        // High mechanical tactile click
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, t);
        osc.frequency.exponentialRampToValueAtTime(300, t + 0.03);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.04);
      } else if (type === 'success') {
        // Soft positive chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, t); // C5
        osc.frequency.setValueAtTime(659.25, t + 0.06); // E5
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.23);
      }
    } catch (_) {}
  }

  /* ------------------------------------------------------------------------
     2. DATA: 7-LAYER CONSTITUTIONAL STACK (WITH FILENAMES & DUAL LANGUAGE)
     ------------------------------------------------------------------------ */
  const STACK_LAYERS = [
    {
      kickerFr: 'COUCHE 01 // CŒUR COGNITIF',
      kickerEn: 'LAYER 01 // COGNITIVE CORE',
      titleFr: 'Fondation Cognitive Hybride & Moteur Fail-Closed',
      titleEn: 'Hybrid Cognitive Foundation & Fail-Closed Engine',
      descFr: 'Routage contextuel adaptatif entre Claude 3.7 Sonnet, Gemini 2.5 Pro et modèles locaux Ollama Jev. Zéro fuite de prompt, politique de sécurité étanche.',
      descEn: 'Adaptive contextual routing across Claude 3.7 Sonnet, Gemini 2.5 Pro and local Ollama Jev models. Zero prompt leakage, fail-closed policy gates.',
      file: 'kai_layer_01_cognitive_core.py',
      code: `async def route_cognitive_prompt(prompt: str) -> ModelVerdict:
    if not policy_engine.verify_intent(prompt):
        raise SecurityGateException("CRITICAL: Prompt injection or unauthorized payload")
    if len(prompt) > 64000:
        return await gemini_flash_client.generate(prompt)
    elif "refactor" in prompt or "c99" in prompt:
        return await claude_code_client.generate_deep_reasoning(prompt)
    return await ollama_jev_local.generate_fast(prompt)`,
      pills: ['Fail-Closed Security', 'Context Caching', 'Dynamic Quotas', 'Zero Prompt Leakage']
    },
    {
      kickerFr: 'COUCHE 02 // TON & PERSONA DYNAMIQUE',
      kickerEn: 'LAYER 02 // DYNAMIC PERSONA & TONE',
      titleFr: 'Fragments de Personas & Modulation Sémantique',
      titleEn: 'Adaptive Persona Shards & Tone Synthesis',
      descFr: 'Modulation en temps réel alignant les réponses sur la rigueur académique de l\'IUT, l\'audit de sécurité ou la finance de prédiction. Interpolation stricte des garde-fous.',
      descEn: 'Real-time tone modulation aligning responses with academic rigor, security auditing, or quantitative finance. Dynamic prompt prefixing and semantic modulation.',
      file: 'kai_layer_02_dynamic_persona.py',
      code: `def apply_persona_tone(shard: AgentShard, context: RequestContext) -> SystemPrompt:
    base_prompt = load_core_identity(shard.role)
    constraints = compose_guardrails(context.security_level)
    return base_prompt.interpolate(constraints, context.user_preferences)`,
      pills: ['Dynamic Tone', 'Shard Isolation', 'Zero Drift', 'Strict Alignment']
    },
    {
      kickerFr: 'COUCHE 03 // SYNTHÈSE VOCALE & BRIDGE MATÉRIEL',
      kickerEn: 'LAYER 03 // VOICE SYNTHESIS & HARDWARE',
      titleFr: 'Voix Neurale Faible Latence & Télémétrie ADB',
      titleEn: 'Low-Latency Neural Speech & Headless Telemetry',
      descFr: 'Streaming audio TTS sous les 180ms, flux WebSocket bidirectionnel duplex et pont matériel ADB sans fil vers smartphones Android dédiés.',
      descEn: 'Sub-180ms TTS audio streaming, WebSocket bidirectional audio duplexing, and wireless ADB hardware bridge connecting Android testbeds.',
      file: 'kai_layer_03_hardware_bridge.py',
      code: `async def stream_audio_duplex(audio_stream: AsyncIterator[bytes]):
    async for chunk in tts_engine.synthesize_stream(audio_stream):
        await websocket_client.send_bytes(chunk)`,
      pills: ['Sub-180ms Latency', 'Duplex Audio', 'Wireless ADB', 'Hardware Bridge']
    },
    {
      kickerFr: 'COUCHE 04 // BOUCLE AUTONOME & INSOMNIA',
      kickerEn: 'LAYER 04 // AUTONOMOUS LOOP & INSOMNIA',
      titleFr: 'Supervision Continue & 19 Démons Systemd sur VPS Ubuntu 24.04',
      titleEn: '19 Systemd Daemons on Oracle Cloud VPS (Ubuntu 24.04)',
      descFr: 'Moteur d\'exécution ininterrompu avec boucles de supervision watchdogs, tunnels chiffrés Cloudflare et auto-rétablissement des services sans intervention.',
      descEn: 'Non-stop execution engine running continuous supervisor loops, auto-healing watchdogs, encrypted Cloudflare tunnels, and automatic failover.',
      file: 'kai_layer_04_insomnia_supervisor.py',
      code: `def monitor_systemd_daemons():
    for daemon in CRITICAL_DAEMONS:
        if subprocess.run(["systemctl", "is-active", daemon], capture_output=True).stdout.strip() != b"active":
            subprocess.run(["systemctl", "restart", daemon])
            telegram_notify(f"🛡️ Kai Watchdog auto-healed {daemon}")`,
      pills: ['19 Systemd Units', 'Uptime 99.98%', 'Auto-Healing', 'Zero Downtime']
    },
    {
      kickerFr: 'COUCHE 05 // MÉMOIRE PERSISTANTE 4 NIVEAUX',
      kickerEn: 'LAYER 05 // 4-TIER PERSISTENT MEMORY',
      titleFr: 'OS Mémoire Letta Hiérarchique & SQLite WAL',
      titleEn: 'Hierarchical Letta Memory OS & SQLite WAL',
      descFr: 'Architecture mémoire inspirée de MemGPT : Core Memory (profil et contraintes), Archival Memory (index vectoriel sqlite-vec) et Recall Memory (registre d\'audit des sessions).',
      descEn: 'Hierarchical memory inspired by MemGPT: Core Memory (user profile & constraints), Archival Memory (sqlite-vec vector index), and Recall Memory (multi-session audit ledger).',
      file: 'kai_layer_05_letta_memory.py',
      code: `class LettaMemoryOS:
    def recall_with_provenance(self, query_embedding: list[float], top_k: int = 5):
        return self.conn.execute("""
            SELECT doc_id, text, confidence, source_file
            FROM archival_memory 
            ORDER BY vector_distance(embedding, ?) ASC LIMIT ?
        """, (query_embedding, top_k)).fetchall()`,
      pills: ['SQLite WAL', 'Vector Distance', 'Provenance Tracking', 'Audit Ledger']
    },
    {
      kickerFr: 'COUCHE 06 // CERVEAU PROACTIF & DÉTECTEUR DIFFÉRENTIEL',
      kickerEn: 'LAYER 06 // PROACTIVE BRAIN & CHANGE DETECTOR',
      titleFr: 'Hachage Différentiel & Automatisation Sans Spam',
      titleEn: 'Differential Hashing & Non-Spam Automation',
      descFr: 'Surveillance d\'état en temps réel des échéances universitaires (diffs Moodle), emplois du temps ADE, classification emails et webhooks de marchés.',
      descEn: 'Real-time state monitoring of academic deadlines (Moodle diffs), university timetables (ADE), email classification, and market event webhooks.',
      file: 'kai_layer_06_differential_watcher.py',
      code: `def compute_differential_diff(previous_hash, current_hash):
    if previous_hash != current_hash:
        delta = inspect_state_delta()
        task_dag.insert_high_priority_action(delta)`,
      pills: ['Moodle Diffs', 'ADE Schedule Sync', 'Zero Spam', 'Differential Hashing']
    },
    {
      kickerFr: 'COUCHE 07 // AUTO-ÉVOLUTION & FORGE MCP',
      kickerEn: 'LAYER 07 // SELF-EVOLUTION & TOOL SMITHING',
      titleFr: 'Synthèse Dynamique de Serveurs MCP & TDD Autonome',
      titleEn: 'Dynamic MCP Synthesis & Autonomous TDD',
      descFr: 'Analyse d\'écart générant de nouveaux outils Python, rédaction de suites pytest complètes (couverture >= 80%) et rechargement à chaud des serveurs MCP sans redémarrage.',
      descEn: 'Automated gap analysis generating new Python tools, writing comprehensive pytest suites (coverage >= 80%), and hot-reloading MCP endpoints without reboot.',
      file: 'kai_layer_07_mcp_forge.py',
      code: `def forge_and_verify_mcp_tool(spec: ToolSpec) -> bool:
    code = synthesize_python_code(spec)
    test_suite = generate_pytest_suite(code)
    if run_in_sandbox(test_suite):
        register_mcp_tool(spec.name, code)
        return True
    return False`,
      pills: ['MCP Synthesis', 'TDD Coverage >= 80%', 'Sandbox Security', 'Hot Reloading']
    }
  ];

  let currentLang = localStorage.getItem('ms_lang') || 'fr';
  let activeStackIdx = 0;

  /* ------------------------------------------------------------------------
     3. STACK 7 TABS CONTROLLER + COPY CODE
     ------------------------------------------------------------------------ */
  function initStackTabs() {
    const pills = document.querySelectorAll('.s-pill');
    const kickerEl = document.getElementById('insp-kicker');
    const titleEl = document.getElementById('insp-title');
    const descEl = document.getElementById('insp-desc');
    const fileEl = document.getElementById('insp-code-file');
    const codeEl = document.getElementById('insp-code');
    const pillsEl = document.getElementById('insp-pills');
    const copyBtn = document.getElementById('btn-copy-code');

    if (!pills.length || !titleEl) return;

    function renderStack(idx) {
      activeStackIdx = idx;
      const data = STACK_LAYERS[idx];
      if (!data) return;

      pills.forEach((p, i) => p.classList.toggle('active', i === idx));

      if (kickerEl) kickerEl.textContent = currentLang === 'fr' ? data.kickerFr : data.kickerEn;
      if (titleEl) titleEl.textContent = currentLang === 'fr' ? data.titleFr : data.titleEn;
      if (descEl) descEl.textContent = currentLang === 'fr' ? data.descFr : data.descEn;
      if (fileEl) fileEl.textContent = data.file;
      if (codeEl) codeEl.textContent = data.code;

      if (pillsEl) {
        pillsEl.innerHTML = data.pills.map(p => `<span>${p}</span>`).join('');
      }
    }

    pills.forEach((p, idx) => {
      p.addEventListener('click', () => {
        playProceduralSound('click');
        renderStack(idx);
      });
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        playProceduralSound('click');
        const data = STACK_LAYERS[activeStackIdx];
        if (!data) return;
        try {
          await navigator.clipboard.writeText(data.code);
          copyBtn.textContent = currentLang === 'fr' ? '✓ Copié !' : '✓ Copied!';
          copyBtn.classList.add('copied');
          playProceduralSound('success');
          setTimeout(() => {
            copyBtn.textContent = currentLang === 'fr' ? 'Copier le code' : 'Copy Code';
            copyBtn.classList.remove('copied');
          }, 2000);
        } catch (_) {}
      });
    }

    renderStack(0);
  }

  /* ------------------------------------------------------------------------
     4. MATRIX CATEGORY FILTERING
     ------------------------------------------------------------------------ */
  function initMatrixFilter() {
    const buttons = document.querySelectorAll('.mf-btn');
    const items = document.querySelectorAll('.matrix-item');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        playProceduralSound('click');
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        items.forEach(item => {
          const cat = item.getAttribute('data-cat');
          if (filter === 'all' || cat === filter) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------------------
     5. TACTILE HANGING PULL-CORD THEME SWITCH
     ------------------------------------------------------------------------ */
  function initPullCordSwitch() {
    const btn = document.getElementById('pull-cord-btn');
    if (!btn) return;

    // Apply saved theme
    const savedTheme = localStorage.getItem('ms_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    btn.addEventListener('click', () => {
      playProceduralSound('pull');
      btn.classList.add('is-pulled');

      setTimeout(() => {
        const curTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const nextTheme = curTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('ms_theme', nextTheme);
        showToast(nextTheme === 'dark' ? 'Thème : Noir Studio' : 'Thème : Papier Chaud');
      }, 140);

      setTimeout(() => {
        btn.classList.remove('is-pulled');
      }, 380);
    });
  }

  /* ------------------------------------------------------------------------
     6. LIVE BIARRITZ CLOCK & TELEMETRY
     ------------------------------------------------------------------------ */
  function initBiarritzClock() {
    const clockEl = document.getElementById('clock-display');
    if (!clockEl) return;

    function tick() {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('fr-FR', {
          timeZone: 'Europe/Paris',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        clockEl.textContent = `Biarritz • ${timeStr} CET`;
      } catch (_) {
        clockEl.textContent = 'Biarritz • Côte Basque';
      }
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ------------------------------------------------------------------------
     7. SPOTLIGHT COMMAND PALETTE (CMD+K / CTRL+K)
     ------------------------------------------------------------------------ */
  function initCommandPalette() {
    const backdrop = document.getElementById('cmdk-backdrop');
    const openBtn = document.getElementById('cmdk-open-btn');
    const input = document.getElementById('cmdk-input');
    const listEl = document.getElementById('cmdk-list');
    if (!backdrop || !input || !listEl) return;

    let selIdx = 0;
    let filtered = [];

    function getCommands() {
      const fr = currentLang === 'fr';
      return [
        {
          label: fr ? '🚀  Rejouer l\'animation de construction Swarm (Replay Build)' : '🚀  Replay Swarm Rebuild Construction (saai.pro)',
          kbd: 'BUILD',
          run: () => {
            if (typeof window.replaySwarm === 'function') {
              window.replaySwarm();
            } else if (window.__swarmRebuild) {
              window.scrollTo({ top: 0, behavior: 'instant' });
              window.__swarmRebuild.start();
            }
          }
        },
        {
          label: fr ? '💡  Tirer la cordelette : Mode Noir Studio / Papier Clair' : '💡  Pull Cord Lamp Switch: Dark Studio / Warm Paper',
          kbd: 'THEME',
          run: () => {
            const pullBtn = document.getElementById('pull-cord-btn');
            if (pullBtn) pullBtn.click();
          }
        },
        {
          label: fr ? '🌐  Basculer la langue : Français / English' : '🌐  Switch Language: French / English',
          kbd: 'LANG',
          run: () => {
            const langBtn = document.getElementById('lang-toggle-btn');
            if (langBtn) langBtn.click();
          }
        },
        {
          label: fr ? '📋  Copier l\'adresse email (matei64200@gmail.com)' : '📋  Copy Direct Email (matei64200@gmail.com)',
          kbd: 'EMAIL',
          run: () => {
            const copyBtn = document.getElementById('btn-copy-sahir');
            if (copyBtn) copyBtn.click();
          }
        },
        {
          label: fr ? '📄  Télécharger mon CV Français (PDF)' : '📄  Download French Resume (PDF)',
          kbd: 'CV FR',
          run: () => {
            const a = document.createElement('a');
            a.href = 'portfolio_assets/CV_Matei_de_Saint_Leger_FR.pdf';
            a.download = 'CV_Matei_de_Saint_Leger_FR.pdf';
            a.click();
          }
        },
        {
          label: fr ? '📄  Download English Resume (PDF)' : '📄  Download English Resume (PDF)',
          kbd: 'CV EN',
          run: () => {
            const a = document.createElement('a');
            a.href = 'portfolio_assets/Resume_Matei_de_Saint_Leger_EN.pdf';
            a.download = 'Resume_Matei_de_Saint_Leger_EN.pdf';
            a.click();
          }
        },
        {
          label: fr ? '🤖  Flagship : Kai — Écosystème IA Autonome 7 Couches' : '🤖  Flagship: Kai — 7-Layer Autonomous AI Ecosystem',
          kbd: '#01',
          run: () => document.getElementById('flagships')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
          label: fr ? '📈  Flagship : Polymarket — Moteur Quant & Nowcast' : '📈  Flagship: Polymarket — Quant Engine & Nowcast',
          kbd: '#02',
          run: () => document.getElementById('trio-quant')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
          label: fr ? '🛡️  Flagship : BasedHardware / Omi (8k★ PRs Sécurité)' : '🛡️  Flagship: BasedHardware / Omi (8k★ Security PRs)',
          kbd: '#03',
          run: () => document.getElementById('trio-oss')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
          label: fr ? '⚙️  Flagship : AlgoForge Pro Studio (ISO C99 Valgrind)' : '⚙️  Flagship: AlgoForge Pro Studio (ISO C99 Valgrind)',
          kbd: '#04',
          run: () => document.getElementById('trio-systems')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
          label: fr ? '⊞  Grille des Systèmes & Outils Spécialisés' : '⊞  The Systems Matrix & Tooling Index',
          kbd: '#05',
          run: () => document.getElementById('matrix')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
          label: fr ? '✉️  Direct Connect : Me Contacter' : '✉️  Direct Connect: Get In Touch',
          kbd: '#06',
          run: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
          label: '🐙  Profil GitHub Officiel (@Mateidslx)',
          kbd: 'GITHUB',
          run: () => window.open('https://github.com/Mateidslx', '_blank', 'noopener,noreferrer')
        }
      ];
    }

    function renderItems() {
      listEl.innerHTML = filtered.map((cmd, i) => `
        <button type="button" class="cmdk-item${i === selIdx ? ' selected' : ''}" data-idx="${i}">
          <span>${cmd.label}</span>
          <span class="cmdk-item-kbd">${cmd.kbd}</span>
        </button>
      `).join('');

      listEl.querySelectorAll('.cmdk-item').forEach(btn => {
        btn.addEventListener('click', () => {
          executeCommand(parseInt(btn.getAttribute('data-idx') || '0', 10));
        });
      });
    }

    function executeCommand(i) {
      const cmd = filtered[i];
      backdrop.classList.remove('open');
      playProceduralSound('click');
      if (cmd && cmd.run) cmd.run();
    }

    function openPalette() {
      playProceduralSound('click');
      input.value = '';
      filtered = getCommands();
      selIdx = 0;
      renderItems();
      backdrop.classList.add('open');
      setTimeout(() => input.focus(), 50);
    }

    function closePalette() {
      backdrop.classList.remove('open');
    }

    if (openBtn) openBtn.addEventListener('click', openPalette);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closePalette();
    });

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      filtered = getCommands().filter(c => c.label.toLowerCase().includes(q) || c.kbd.toLowerCase().includes(q));
      selIdx = 0;
      renderItems();
    });

    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (backdrop.classList.contains('open')) closePalette();
        else openPalette();
      } else if (e.key === '/' && !backdrop.classList.contains('open') && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        openPalette();
      } else if (e.key === 'Escape' && backdrop.classList.contains('open')) {
        e.preventDefault();
        closePalette();
      } else if (backdrop.classList.contains('open')) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          selIdx = (selIdx + 1) % filtered.length;
          renderItems();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          selIdx = (selIdx - 1 + filtered.length) % filtered.length;
          renderItems();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (filtered.length > 0) executeCommand(selIdx);
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     8. BILINGUAL LANGUAGE CONTROLLER (FR / EN)
     ------------------------------------------------------------------------ */
  function initLanguage() {
    const langBtn = document.getElementById('lang-toggle-btn');
    const langText = document.getElementById('lang-btn-text');

    function applyLang(lang) {
      currentLang = lang;
      localStorage.setItem('ms_lang', lang);
      if (langText) langText.textContent = lang === 'fr' ? 'FR / EN' : 'EN / FR';

      // Update 7-layer tab currently displayed
      const kickerEl = document.getElementById('insp-kicker');
      const titleEl = document.getElementById('insp-title');
      const descEl = document.getElementById('insp-desc');
      const data = STACK_LAYERS[activeStackIdx];
      if (data) {
        if (kickerEl) kickerEl.textContent = lang === 'fr' ? data.kickerFr : data.kickerEn;
        if (titleEl) titleEl.textContent = lang === 'fr' ? data.titleFr : data.titleEn;
        if (descEl) descEl.textContent = lang === 'fr' ? data.descFr : data.descEn;
      }

      showToast(lang === 'fr' ? 'Langue : Français' : 'Language: English');
    }

    if (langBtn) {
      langBtn.addEventListener('click', () => {
        playProceduralSound('click');
        const nextLang = currentLang === 'fr' ? 'en' : 'fr';
        applyLang(nextLang);
      });
    }

    // Initialize with saved lang
    if (langText) langText.textContent = currentLang === 'fr' ? 'FR / EN' : 'EN / FR';
  }

  /* ------------------------------------------------------------------------
     9. EMAIL COPY BUTTON & TOAST
     ------------------------------------------------------------------------ */
  function showToast(msg) {
    const toast = document.getElementById('toast-banner');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2800);
  }

  function initEmailCopy() {
    const btn = document.getElementById('btn-copy-sahir');
    if (!btn) return;

    btn.addEventListener('click', async () => {
      playProceduralSound('click');
      const email = 'matei64200@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        playProceduralSound('success');
        showToast(`✓ Copied: ${email}`);
      } catch (e) {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  /* ------------------------------------------------------------------------
     10. GLOBAL SWARM REPLAY BRIDGE
     ------------------------------------------------------------------------ */
  window.replaySwarm = function () {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (window.__swarmRebuild) {
      try {
        window.__swarmRebuild.start();
        showToast('🚀 Swarm Rebuild restarted!');
      } catch (_) {
        window.location.reload();
      }
    } else {
      window.location.reload();
    }
  };

  /* ------------------------------------------------------------------------
     11. INITIALIZE ALL
     ------------------------------------------------------------------------ */
  function init() {
    initStackTabs();
    initMatrixFilter();
    initPullCordSwitch();
    initBiarritzClock();
    initCommandPalette();
    initLanguage();
    initEmailCopy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
