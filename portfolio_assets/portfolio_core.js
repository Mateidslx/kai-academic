/* ==========================================================================
   AUTHENTIC SAHIR (DfWWldaTQTz.mp4) PORTFOLIO CORE CONTROLLER
   7-Layer Stack Tabs | Matrix Filtering | Email Copy & Toasts
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. DATA: 7-LAYER CONSTITUTIONAL STACK (SAAI / KAI MATCH)
     ------------------------------------------------------------------------ */
  const STACK_LAYERS = [
    {
      kicker: 'LAYER 01 // COGNITIVE CORE',
      title: 'Hybrid Cognitive Foundation & Fail-Closed Engine',
      desc: 'Adaptive contextual routing across Claude 3.7 Sonnet, Gemini 2.5 Pro and local Ollama Jev models. Zero prompt leakage, fail-closed policy gates.',
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
      kicker: 'LAYER 02 // DYNAMIC TONE & PERSONA',
      title: 'Adaptive Persona Shards & Tone Synthesis',
      desc: 'Real-time tone modulation aligning responses with academic rigor, security auditing, or quantitative finance. Dynamic prompt prefixing and semantic modulation.',
      code: `def apply_persona_tone(shard: AgentShard, context: RequestContext) -> SystemPrompt:
    base_prompt = load_core_identity(shard.role)
    constraints = compose_guardrails(context.security_level)
    return base_prompt.interpolate(constraints, context.user_preferences)`,
      pills: ['Dynamic Tone', 'Shard Isolation', 'Zero Drift', 'Strict Alignment']
    },
    {
      kicker: 'LAYER 03 // VOICE SYNTHESIS & HARDWARE',
      title: 'Low-Latency Neural Speech & Headless Telemetry',
      desc: 'Sub-180ms TTS audio streaming, WebSocket bidirectional audio duplexing, and wireless ADB hardware bridge connecting Xiaomi/Redmi devices.',
      code: `async def stream_audio_duplex(audio_stream: AsyncIterator[bytes]):
    async for chunk in tts_engine.synthesize_stream(audio_stream):
        await websocket_client.send_bytes(chunk)`,
      pills: ['Sub-180ms Latency', 'Duplex Audio', 'Wireless ADB', 'Hardware Bridge']
    },
    {
      kicker: 'LAYER 04 // AUTONOMOUS LOOP & INSOMNIA',
      title: '24/7 Continuous Execution & Watchdog Supervision',
      title: '19 Systemd Daemons on Oracle Cloud VPS (Ubuntu 24.04)',
      desc: 'Non-stop execution engine running continuous supervisor loops, auto-healing watchdogs, encrypted Cloudflare tunnels, and automatic failover.',
      code: `def monitor_systemd_daemons():
    for daemon in CRITICAL_DAEMONS:
        if subprocess.run(["systemctl", "is-active", daemon], capture_output=True).stdout.strip() != b"active":
            subprocess.run(["systemctl", "restart", daemon])
            telegram_notify(f"🛡️ Kai Watchdog auto-healed {daemon}")`,
      pills: ['19 Systemd Units', 'Uptime 99.98%', 'Auto-Healing', 'Zero Downtime']
    },
    {
      kicker: 'LAYER 05 // 4-TIER PERSISTENT MEMORY',
      title: 'Hierarchical Letta Memory OS & SQLite WAL',
      desc: '3-tier memory architecture inspired by MemGPT: Core Memory (user profile & constraints), Archival Memory (sqlite-vec vector index), and Recall Memory (808-session audit ledger).',
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
      kicker: 'LAYER 06 // PROACTIVE BRAIN & CHANGE DETECTOR',
      title: 'Differential Hashing & Non-Spam Automation',
      desc: 'Real-time state monitoring of academic deadlines (Moodle diffs), university timetables (ADE), email classification, and market event webhooks.',
      code: `def compute_differential_diff(previous_hash, current_hash):
    if previous_hash != current_hash:
        delta = inspect_state_delta()
        task_dag.insert_high_priority_action(delta)`,
      pills: ['Moodle Diffs', 'ADE Schedule Sync', 'Zero Spam', 'Differential Hashing']
    },
    {
      kicker: 'LAYER 07 // SELF-EVOLUTION & TOOL SMITHING',
      title: 'Dynamic MCP Synthesis & Autonomous TDD',
      desc: 'Automated gap analysis generating new Python tools, writing comprehensive pytest suites (coverage >= 80%), and hot-reloading MCP endpoints without reboot.',
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

  /* ------------------------------------------------------------------------
     2. STACK 7 TABS CONTROLLER
     ------------------------------------------------------------------------ */
  function initStackTabs() {
    const pills = document.querySelectorAll('.s-pill');
    const kickerEl = document.getElementById('insp-kicker');
    const titleEl = document.getElementById('insp-title');
    const descEl = document.getElementById('insp-desc');
    const codeEl = document.getElementById('insp-code');
    const pillsEl = document.getElementById('insp-pills');

    if (!pills.length || !titleEl) return;

    function renderStack(idx) {
      const data = STACK_LAYERS[idx];
      if (!data) return;

      pills.forEach((p, i) => p.classList.toggle('active', i === idx));

      if (kickerEl) kickerEl.textContent = data.kicker;
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (codeEl) codeEl.textContent = data.code;

      if (pillsEl) {
        pillsEl.innerHTML = data.pills.map(p => `<span>${p}</span>`).join('');
      }
    }

    pills.forEach((p, idx) => {
      p.addEventListener('click', () => renderStack(idx));
    });

    renderStack(0);
  }

  /* ------------------------------------------------------------------------
     3. MATRIX CATEGORY FILTERING
     ------------------------------------------------------------------------ */
  function initMatrixFilter() {
    const buttons = document.querySelectorAll('.mf-btn');
    const items = document.querySelectorAll('.matrix-item');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
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
     4. EMAIL COPY BUTTON & TOAST
     ------------------------------------------------------------------------ */
  function initEmailCopy() {
    const btn = document.getElementById('btn-copy-sahir');
    const toast = document.getElementById('toast-banner');
    if (!btn || !toast) return;

    btn.addEventListener('click', async () => {
      const email = 'matei64200@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        toast.textContent = `✓ Copied: ${email}`;
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 3000);
      } catch (e) {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. INITIALIZE
     ------------------------------------------------------------------------ */
  function init() {
    initStackTabs();
    initMatrixFilter();
    initEmailCopy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
