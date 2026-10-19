// -*- coding: utf-8 -*-
/**
 * app.js - Contrôleur Principal pour AlgoForge Pro Studio (Application de Bureau)
 * ==============================================================================
 * Orchestre les modèles, le carnet multi-pages, le rendu SVG, l'auto-nommage IA,
 * la synchronisation Cloud Kai, le simulateur et l'assistant de TD.
 */

document.addEventListener("DOMContentLoaded", () => {
    // =========================================================================
    // 0. RÉFÉRENCES DOM EXHAUSTIVES (INITIALISÉES IMMÉDIATEMENT)
    // =========================================================================
    const sidebar = document.getElementById("notebook-sidebar");
    const btnToggleSidebar = document.getElementById("btn-toggle-sidebar");
    const pagesListElem = document.getElementById("notebook-pages-list");
    const searchInput = document.getElementById("sidebar-search-input");
    const titleInput = document.getElementById("algo-title-input");
    const btnAiNaming = document.getElementById("btn-ai-naming");
    const tagElem = document.getElementById("algo-tag-badge");

    const svgCanvas = document.getElementById("tree-canvas");
    const sideDrawer = document.getElementById("side-drawer");
    const btnCloseDrawer = document.getElementById("btn-close-drawer");
    const drawerTabs = document.querySelectorAll(".drawer-tab");
    const tabPanes = document.querySelectorAll(".tab-pane");

    const btnSimPlay = document.getElementById("btn-sim-play");
    const btnSimStep = document.getElementById("btn-sim-step");
    const btnSimReset = document.getElementById("btn-sim-reset");
    const memoryTraceContainer = document.getElementById("memory-trace-container");
    const consoleOutput = document.getElementById("console-output");

    const codeOutput = document.getElementById("code-output");
    const btnCopyCode = document.getElementById("btn-copy-code");
    const codeTabBtns = document.querySelectorAll(".code-tab-btn");

    const dictTbody = document.getElementById("dict-tbody");
    const modalVar = document.getElementById("modal-variable");
    const badgeAuditCount = document.getElementById("badge-audit-count");
    const btnDockAudit = document.getElementById("btn-dock-audit");
    const btnTopbarAudit = document.getElementById("btn-topbar-audit");
    const auditContainer = document.getElementById("audit-results-container");
    const labelZoom = document.getElementById("label-zoom");

    const inspectorBar = document.getElementById("action-inspector-bar");
    const insTitle = document.getElementById("inspector-node-title");
    const insType = document.getElementById("inspector-node-type");
    const insInputs = document.getElementById("inspector-node-inputs");
    const insOutputs = document.getElementById("inspector-node-outputs");
    const insCondGroup = document.getElementById("inspector-cond-group");
    const insCond = document.getElementById("inspector-node-cond");
    const insChoiceGroup = document.getElementById("inspector-choice-group");
    const insSwitch = document.getElementById("inspector-node-switch");
    const insCaseGroup = document.getElementById("inspector-case-group");
    const insCase = document.getElementById("inspector-node-case");
    const insBtnAdd = document.getElementById("inspector-btn-add-child");
    const insBtnDel = document.getElementById("inspector-btn-delete");

    let currentLang = "c"; // 'c' | 'pseudo' | 'python'

    // =========================================================================
    // 1. INITIALISATION DES COMPOSANTS CŒURS
    // =========================================================================
    const tree = new AlgorithmicTree();
    const linter = new AlgorithmicLinter(tree);
    const transpiler = new AlgorithmicTranspiler(tree);

    // Simulateur interactif
    const simulator = new AlgorithmicSimulator(tree, (state) => {
        renderer.highlightSimNode(state.activeNodeId);
        updateSimulatorUI(state);
    });

    // Moteur de rendu SVG avec édition directe et centrage automatique
    const renderer = new AlgorithmicRenderer(
        svgCanvas,
        tree,
        (selectedNode) => { onNodeSelected(selectedNode); },
        (editedNode) => { renderer.startInlineNodeEdit(editedNode.id); },
        () => {
            pagesManager.save();
            updateAllPanels();
        }
    );

    renderer.onZoomChange = (zoomPercent) => {
        if (labelZoom) labelZoom.textContent = zoomPercent + "%";
    };

    // Assistant de TD IUT
    const assistantTd = new TdPedagogicalAssistant(tree, simulator);

    // Passerelle Cloud & Télémétrie de TD
    const cloudSync = new CloudSyncGateway("http://88.96.47.180:8765", (status) => {
        updateCloudStatusUI(status);
    });

    // =========================================================================
    // 2. FONCTION DE RENDU DE LA LISTE DES PAGES (DÉCLARÉE AVANT UTILISATION)
    // =========================================================================
    function renderPagesList(filterQuery = "") {
        if (!pagesListElem) return;

        const query = filterQuery.toLowerCase().trim();
        const pages = pagesManager.pages.filter(p => {
            if (!query) return true;
            return (p.title || "").toLowerCase().includes(query) || (p.notes || "").toLowerCase().includes(query);
        });

        let html = "";
        for (const page of pages) {
            const isActive = page.id === pagesManager.activePageId;
            const tag = (page.tags && page.tags[0]) || "TD";
            html += `
                <div class="page-item ${isActive ? 'active' : ''}" data-page-id="${page.id}">
                    <div class="page-item-left">
                        <span class="page-icon">${isActive ? '📂' : '📄'}</span>
                        <span class="page-title-text" title="${page.title}">${page.title}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 4px;">
                        <span class="page-tag">${tag}</span>
                        <button class="page-btn-delete" data-delete-id="${page.id}" title="Supprimer cet exercice">✕</button>
                    </div>
                </div>
            `;
        }

        pagesListElem.innerHTML = html || `<p style="padding: 12px; font-size: 12px; color: var(--text-muted); text-align: center;">Aucun exercice trouvé</p>`;

        // Écouteurs de clic sur chaque page
        pagesListElem.querySelectorAll(".page-item").forEach(item => {
            item.addEventListener("click", (e) => {
                if (e.target.classList.contains("page-btn-delete")) return;
                const pageId = item.getAttribute("data-page-id");
                pagesManager.selectPage(pageId);
            });
        });

        // Écouteurs de suppression
        pagesListElem.querySelectorAll(".page-btn-delete").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const pageId = btn.getAttribute("data-delete-id");
                if (confirm("Supprimer cet exercice du carnet ?")) {
                    pagesManager.deletePage(pageId);
                    renderPagesList(searchInput ? searchInput.value : "");
                }
            });
        });
    }

    // Gestionnaire Multi-Pages
    const pagesManager = new PagesManager(tree, (activePage) => {
        if (titleInput) titleInput.value = activePage.title || tree.title;
        if (tagElem) tagElem.textContent = (activePage.tags && activePage.tags[0]) || "TD";

        renderer.selectedNodeId = tree.rootId;
        onNodeSelected(tree.getRoot());
        renderer.centerAndFitTree(1.0);
        updateAllPanels();
        renderPagesList(searchInput ? searchInput.value : "");

        cloudSync.recordTdActivity({
            action: "switch_page",
            pageId: activePage.id,
            title: activePage.title
        });

        // Si on est dans l'app native, synchroniser avec %APPDATA%
        if (window.algoNative && typeof window.algoNative.saveNotebookToDisk === "function") {
            window.algoNative.saveNotebookToDisk(pagesManager.pages).catch(err => {
                console.warn("[AlgoNative] saveNotebookToDisk:", err);
            });
        }
    });

    // Chargement initial depuis le disque si en mode desktop natif
    if (window.algoNative && typeof window.algoNative.loadNotebookFromDisk === "function") {
        window.algoNative.loadNotebookFromDisk().then(res => {
            if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
                pagesManager.pages = res.data;
                pagesManager.activePageId = res.data[0].id;
                pagesManager.loadActivePageIntoTree();
                if (titleInput) titleInput.value = tree.title;
                renderer.centerAndFitTree(1.0);
                renderPagesList();
                updateAllPanels();
            }
        }).catch(err => {
            console.warn("[AlgoNative] loadNotebookFromDisk:", err);
        });
    }

    // Premier affichage propre centré
    const initialPage = pagesManager.getActivePage();
    if (initialPage) {
        if (titleInput) titleInput.value = initialPage.title || tree.title;
        if (tagElem) tagElem.textContent = (initialPage.tags && initialPage.tags[0]) || "TD";
    }

    setTimeout(() => {
        renderer.centerAndFitTree(1.0);
    }, 50);
    renderPagesList();
    updateAllPanels();
    onNodeSelected(tree.getRoot());

    window.__algoPagesManager = pagesManager;
    window.__algoTree = tree;
    window.__algoRenderer = renderer;
    window.__algoTranspiler = transpiler;
    window.__algoOnNodeSelected = onNodeSelected;
    window.__algoUpdateAllPanels = updateAllPanels;

    // =========================================================================
    // 3. BARRE LATÉRALE : GESTION DES EXERCICES
    // =========================================================================
    if (btnToggleSidebar && sidebar) {
        btnToggleSidebar.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            renderPagesList(e.target.value);
        });
    }

    const createNewPageHandler = () => {
        const newPage = pagesManager.createPage("Sans titre");
        renderPagesList(searchInput ? searchInput.value : "");
        if (titleInput) {
            titleInput.focus();
            titleInput.select();
        }
    };

    const btnAdd1 = document.getElementById("btn-sidebar-add-page");
    const btnAdd2 = document.getElementById("btn-sidebar-new-ex");
    const mNewPage = document.getElementById("m-new-page");
    if (btnAdd1) btnAdd1.addEventListener("click", createNewPageHandler);
    if (btnAdd2) btnAdd2.addEventListener("click", createNewPageHandler);
    if (mNewPage) mNewPage.addEventListener("click", createNewPageHandler);

    window.__algoTriggerNewPage = createNewPageHandler;

    const autoNameHandler = () => {
        const suggestion = pagesManager.autoNameCurrentPage();
        if (suggestion) {
            if (titleInput) titleInput.value = suggestion.title;
            renderPagesList(searchInput ? searchInput.value : "");
            updateCodeGenerator();

            cloudSync.recordTdActivity({
                action: "ai_auto_name",
                title: suggestion.title,
                reason: suggestion.reason
            });
        }
    };

    window.__algoTriggerAutoName = autoNameHandler;

    if (btnAiNaming) {
        btnAiNaming.addEventListener("click", autoNameHandler);
    }

    if (titleInput) {
        titleInput.addEventListener("input", (e) => {
            const val = e.target.value.trim() || "Sans titre";
            pagesManager.renamePage(pagesManager.activePageId, val);
            renderPagesList(searchInput ? searchInput.value : "");
            updateCodeGenerator();
        });
    }

    // =========================================================================
    // 5. STATUT CLOUD KAI
    // =========================================================================
    function updateCloudStatusUI(status) {
        const dot = document.getElementById("cloud-dot");
        if (!dot) return;

        if (status.isOnline) {
            dot.className = "cloud-dot online";
            dot.title = "Cloud Connecté (88.96.47.180)";
        } else {
            dot.className = "cloud-dot offline";
            dot.title = "Mode Hors-Ligne (Sauvegarde locale %APPDATA% active)";
        }
    }

    // =========================================================================
    // 6. OUTILS DE LA BARRE FLOTTANTE
    // =========================================================================
    const toolButtons = document.querySelectorAll(".dock-pill button[data-tool]");
    toolButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            toolButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const tool = btn.getAttribute("data-tool");
            renderer.setTool(tool);

            if (tool !== "select" && tool !== "link") {
                addNewNodeFromTool(tool);
                setTimeout(() => {
                    const sel = document.getElementById("tool-select");
                    if (sel) sel.click();
                }, 150);
            }
        });
    });

    function addNewNodeFromTool(toolType) {
        const selectedId = renderer.selectedNodeId || "root";
        const parent = tree.nodes[selectedId] || tree.getRoot();

        let title = "Nouvelle Action";
        let type = toolType;
        let inputs = [];
        let outputs = [];
        let condition = "";
        let switchExpr = "";

        if (toolType === "simple") title = "Action elementaire";
        else if (toolType === "composed") title = "Sous programme";
        else if (toolType === "condition") { title = "Si condition"; condition = "valeur > 0"; }
        else if (toolType === "choice") { title = "Aiguiller choix"; switchExpr = "choix"; type = "choice"; }
        else if (toolType === "loop_for") title = "Pour chaque element";
        else if (toolType === "loop_while") { title = "Tant que condition"; condition = "continuer == 1"; }

        const childCount = (parent.children || []).length;
        const newX = parent.x + (childCount * 140) - 40;
        const newY = parent.y + 190;

        let caseVal = "";
        if (parent.type === "choice") {
            caseVal = childCount === 0 ? "1" : (childCount === 1 ? "2" : (childCount === 2 ? "3" : "Autrement"));
            title = `Action cas ${caseVal}`;
        }

        const newNode = tree.addNode({
            title: title,
            type: type,
            parentId: parent.id,
            caseValue: caseVal,
            inputs: inputs,
            outputs: outputs,
            condition: condition,
            switchExpr: switchExpr,
            x: newX,
            y: newY
        });

        // Si on crée un Choix Multiple (Selon que... / Switch), générer immédiatement deux cas (Cas 1 et Autrement)
        if (type === "choice") {
            tree.addNode({
                title: "Traiter cas 1",
                type: "simple",
                parentId: newNode.id,
                caseValue: "1",
                x: newNode.x - 70,
                y: newNode.y + 190
            });
            tree.addNode({
                title: "Traiter defaut",
                type: "simple",
                parentId: newNode.id,
                caseValue: "Autrement",
                x: newNode.x + 130,
                y: newNode.y + 190
            });
        }

        renderer.selectedNodeId = newNode.id;
        renderer.render();
        pagesManager.save();
        updateAllPanels();

        cloudSync.recordTdActivity({
            action: "add_node",
            nodeType: type,
            title: title
        });
    }

    // =========================================================================
    // 7. TIROIR LATÉRAL (DRAWER) & ASSISTANT DE TD
    // =========================================================================
    function openDrawer(tabId = null) {
        if (!sideDrawer) return;
        sideDrawer.classList.add("open");
        if (tabId) switchTab(tabId);
    }

    function closeDrawer() {
        if (!sideDrawer) return;
        sideDrawer.classList.remove("open");
    }

    function switchTab(tabId) {
        drawerTabs.forEach(t => t.classList.toggle("active", t.getAttribute("data-tab") === tabId));
        tabPanes.forEach(p => p.classList.toggle("active", p.id === tabId));
        if (tabId === "tab-copilot") updateCopilotUI();
        updateAllPanels();
    }

    drawerTabs.forEach(tab => {
        tab.addEventListener("click", () => { switchTab(tab.getAttribute("data-tab")); });
    });

    if (btnCloseDrawer) btnCloseDrawer.addEventListener("click", closeDrawer);

    // Boutons Topbar
    const btnTopCode = document.getElementById("btn-top-code");
    const btnTopSim = document.getElementById("btn-top-sim");
    const btnMenuCode = document.getElementById("btn-menu-code");
    const btnMenuSim = document.getElementById("btn-menu-sim");
    const btnMenuCopilot = document.getElementById("btn-menu-copilot");
    const btnToggleDrawer = document.getElementById("btn-toggle-drawer");

    if (btnTopCode) btnTopCode.addEventListener("click", () => { openDrawer("tab-code"); });
    if (btnTopSim) btnTopSim.addEventListener("click", () => { openDrawer("tab-sim"); simulator.prepare(); });
    if (btnMenuCode) btnMenuCode.addEventListener("click", () => { openDrawer("tab-code"); });
    if (btnMenuSim) btnMenuSim.addEventListener("click", () => { openDrawer("tab-sim"); simulator.prepare(); });
    if (btnMenuCopilot) btnMenuCopilot.addEventListener("click", () => { openDrawer("tab-copilot"); });

    if (btnToggleDrawer) {
        btnToggleDrawer.addEventListener("click", () => {
            if (sideDrawer && sideDrawer.classList.contains("open")) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }

    const btnTopAuto = document.getElementById("btn-top-autolayout");
    const mAutoLayout = document.getElementById("m-autolayout");
    if (btnTopAuto) {
        btnTopAuto.addEventListener("click", () => {
            tree.autoLayout();
            renderer.centerAndFitTree(1.0);
            pagesManager.save();
        });
    }
    if (mAutoLayout) {
        mAutoLayout.addEventListener("click", () => {
            tree.autoLayout();
            renderer.centerAndFitTree(1.0);
            pagesManager.save();
        });
    }

    // Dock gauche
    const btnDockDict = document.getElementById("btn-dock-dict");
    const btnDockVars = document.getElementById("btn-dock-vars");
    const btnDockAuto = document.getElementById("btn-dock-autolayout");
    if (btnDockAudit) btnDockAudit.addEventListener("click", () => { openDrawer("tab-audit"); });
    if (btnTopbarAudit) btnTopbarAudit.addEventListener("click", () => { openDrawer("tab-audit"); });
    if (btnDockDict) btnDockDict.addEventListener("click", () => { openDrawer("tab-dict"); });
    if (btnDockVars) btnDockVars.addEventListener("click", () => { openDrawer("tab-dict"); });
    if (btnDockAuto) {
        btnDockAuto.addEventListener("click", () => {
            tree.autoLayout();
            renderer.centerAndFitTree(1.0);
            pagesManager.save();
        });
    }

    // Dock droit
    const btnUndo = document.getElementById("btn-dock-undo");
    const btnRedo = document.getElementById("btn-dock-redo");
    const btnZoomIn = document.getElementById("btn-dock-zoom-in");
    const btnZoomOut = document.getElementById("btn-dock-zoom-out");

    if (btnUndo) btnUndo.addEventListener("click", () => { if (tree.undo()) { renderer.render(); pagesManager.save(); updateAllPanels(); } });
    if (btnRedo) btnRedo.addEventListener("click", () => { if (tree.redo()) { renderer.render(); pagesManager.save(); updateAllPanels(); } });
    if (btnZoomIn) btnZoomIn.addEventListener("click", () => { renderer.setZoom(Math.round(renderer.zoom * 100) + 10); });
    if (btnZoomOut) btnZoomOut.addEventListener("click", () => { renderer.setZoom(Math.round(renderer.zoom * 100) - 10); });
    if (labelZoom) labelZoom.addEventListener("click", () => { renderer.resetView(); });

    // =========================================================================
    // 8. SIMULATEUR PAS-À-PAS
    // =========================================================================
    if (btnSimPlay) {
        btnSimPlay.addEventListener("click", () => {
            if (simulator.isRunning) {
                simulator.pause();
                btnSimPlay.innerHTML = "<span>▶</span> Reprendre";
                btnSimPlay.classList.remove("sim-btn-play");
            } else {
                simulator.play(800);
                btnSimPlay.innerHTML = "<span>⏸</span> Pause";
                btnSimPlay.classList.add("sim-btn-play");
            }
        });
    }

    if (btnSimStep) {
        btnSimStep.addEventListener("click", () => {
            if (!simulator.executionQueue.length) simulator.prepare();
            simulator.step();
        });
    }

    if (btnSimReset) {
        btnSimReset.addEventListener("click", () => {
            simulator.reset();
            simulator.prepare();
            if (btnSimPlay) {
                btnSimPlay.innerHTML = "<span>▶</span> Lancer";
                btnSimPlay.classList.add("sim-btn-play");
            }
            renderer.highlightSimNode(null);
        });
    }

    function updateSimulatorUI(state) {
        if (memoryTraceContainer) {
            let traceHtml = "";
            for (const [vName, vVal] of Object.entries(state.variables || {})) {
                traceHtml += `
                    <div class="trace-item">
                        <span style="font-weight: 600; color: #1e3a8a;">${vName}</span>
                        <span class="trace-val">${typeof vVal === 'number' ? (Number.isInteger(vVal) ? vVal : vVal.toFixed(2)) : vVal}</span>
                    </div>
                `;
            }
            memoryTraceContainer.innerHTML = traceHtml || "<p style='color: #94a3b8; font-size: 12px;'>Aucune variable active</p>";
        }

        if (consoleOutput) {
            consoleOutput.innerHTML = state.logs.map(l => `<div>${l}</div>`).join("");
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }

        if (state.status === "finished" && btnSimPlay) {
            btnSimPlay.innerHTML = "<span>▶</span> Relancer";
            btnSimPlay.classList.remove("sim-btn-play");
        }
    }

    // =========================================================================
    // 9. ASSISTANT DE TD (COPILOT)
    // =========================================================================
    function updateCopilotUI() {
        const testsContainer = document.getElementById("test-cases-container");
        const adviceContainer = document.getElementById("method-advice-container");

        if (testsContainer) {
            const testCases = assistantTd.generateTestCases();
            let testsHtml = "";
            testCases.forEach((tc, idx) => {
                const inputsStr = Object.entries(tc.inputs || {}).map(([k, v]) => `${k}=${v}`).join(", ");
                testsHtml += `
                    <div class="test-case-card">
                        <div class="test-case-info">
                            <span class="test-case-title">${tc.name}</span>
                            <span class="test-case-desc">Entrées : { ${inputsStr} } → Attendu : ${tc.expected || 'OK'}</span>
                        </div>
                        <button class="btn-load-test" data-test-idx="${idx}">⚡ Tester</button>
                    </div>
                `;
            });
            testsContainer.innerHTML = testsHtml;

            testsContainer.querySelectorAll(".btn-load-test").forEach(btn => {
                btn.addEventListener("click", () => {
                    const idx = parseInt(btn.getAttribute("data-test-idx"), 10);
                    assistantTd.loadTestCaseIntoSimulator(testCases[idx]);
                    openDrawer("tab-sim");
                });
            });
        }

        if (adviceContainer) {
            const adviceList = assistantTd.getMethodologicalAdvice();
            let adviceHtml = "";
            for (const adv of adviceList) {
                adviceHtml += `
                    <div class="advice-card">
                        <div class="advice-rule">📌 ${adv.rule}</div>
                        <div class="advice-tip">${adv.tip}</div>
                    </div>
                `;
            }
            adviceContainer.innerHTML = adviceHtml;
        }
    }

    // =========================================================================
    // 10. GÉNÉRATEUR DE CODE
    // =========================================================================
    codeTabBtns.forEach(b => {
        b.addEventListener("click", () => {
            codeTabBtns.forEach(btn => btn.classList.remove("active"));
            b.classList.add("active");
            currentLang = b.getAttribute("data-lang");
            updateCodeGenerator();
        });
    });

    if (btnCopyCode) {
        btnCopyCode.addEventListener("click", () => {
            const codeText = codeOutput ? codeOutput.textContent : "";
            navigator.clipboard.writeText(codeText).then(() => {
                btnCopyCode.textContent = "✅ Copié !";
                setTimeout(() => { btnCopyCode.textContent = "📋 Copier"; }, 1500);
            });
        });
    }

    function updateCodeGenerator() {
        if (!codeOutput) return;
        if (currentLang === "c") {
            codeOutput.textContent = transpiler.generateCCode();
        } else if (currentLang === "pseudo") {
            codeOutput.textContent = transpiler.generatePseudoCode();
        } else if (currentLang === "python") {
            codeOutput.textContent = transpiler.generatePythonCode();
        }
    }

    // =========================================================================
    // 11. DICTIONNAIRE DES DONNÉES
    // =========================================================================
    function updateDictionaryTable() {
        if (!dictTbody) return;
        const dict = tree.dictionary || {};
        let html = "";

        for (const [name, info] of Object.entries(dict)) {
            const nature = info.nature || "INT";
            const tagClass = "tag-" + nature.toLowerCase().replace("/", "");
            html += `
                <tr>
                    <td style="font-family: var(--font-code); font-weight: 700; color: #1e3a8a;">${name}</td>
                    <td style="color: var(--text-secondary);">${info.type || "reel"}</td>
                    <td><span class="dict-nature-tag ${tagClass}">${nature}</span></td>
                    <td style="color: var(--text-muted);">${info.role || "—"}</td>
                </tr>
            `;
        }
        dictTbody.innerHTML = html;
    }

    const btnAddVar = document.getElementById("btn-add-var");
    const btnCancelVar = document.getElementById("btn-cancel-modal-var");
    const btnConfirmVar = document.getElementById("btn-confirm-modal-var");

    if (btnAddVar && modalVar) btnAddVar.addEventListener("click", () => { modalVar.classList.add("open"); });
    if (btnCancelVar && modalVar) btnCancelVar.addEventListener("click", () => { modalVar.classList.remove("open"); });

    if (btnConfirmVar && modalVar) {
        btnConfirmVar.addEventListener("click", () => {
            const nameElem = document.getElementById("modal-var-name");
            const typeElem = document.getElementById("modal-var-type");
            const natureElem = document.getElementById("modal-var-nature");
            const roleElem = document.getElementById("modal-var-role");

            const name = nameElem ? nameElem.value.trim() : "";
            const type = typeElem ? typeElem.value : "reel";
            const nature = natureElem ? natureElem.value : "D";
            const role = roleElem ? roleElem.value.trim() : "";

            if (name) {
                tree.dictionary[name] = { type, nature, role };
                tree.saveState();
                pagesManager.save();
                modalVar.classList.remove("open");
                if (nameElem) nameElem.value = "";
                if (roleElem) roleElem.value = "";
                updateAllPanels();
            }
        });
    }

    // =========================================================================
    // 12. AUDIT SÉMANTIQUE & LINTER (⚠️ 0 / 1)
    // =========================================================================
    function updateAuditLinter() {
        const audit = linter.audit();
        const badgeIcon = document.getElementById("badge-audit-icon");
        if (badgeIcon) {
            badgeIcon.textContent = audit.isClean ? "✓" : "⚠️";
        }
        if (badgeAuditCount) {
            badgeAuditCount.textContent = audit.isClean ? "Conforme" : `${audit.errors.length + audit.warnings.length} anomalie${audit.errors.length + audit.warnings.length > 1 ? 's' : ''}`;
        }
        if (btnDockAudit) btnDockAudit.classList.toggle("clean", audit.isClean);
        if (btnTopbarAudit) {
            btnTopbarAudit.classList.toggle("clean", audit.isClean);
            btnTopbarAudit.title = audit.isClean ? "Audit IUT : Arbre 100% conforme" : `Audit IUT : ${audit.errors.length} anomalie(s)`;
        }

        if (!auditContainer) return;
        if (audit.isClean) {
            auditContainer.innerHTML = `
                <div style="padding: 16px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; color: #166534; font-size: 13px;">
                    <strong>✅ Arbre algorithmique parfait !</strong>
                    <p style="margin-top: 4px; font-size: 12px;">Tous les flots de données sont cohérents et conformes aux normes IUT.</p>
                </div>
            `;
            return;
        }

        let html = "";
        for (const err of audit.errors) {
            html += `
                <div style="padding: 10px 12px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; margin-bottom: 8px;">
                    <div style="font-weight: 700; color: #991b1b; font-size: 12.5px;">❌ ${err.title}</div>
                    <div style="font-size: 11.5px; color: #7f1d1d; margin-top: 2px;">${err.description}</div>
                </div>
            `;
        }
        for (const warn of audit.warnings) {
            html += `
                <div style="padding: 10px 12px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; margin-bottom: 8px;">
                    <div style="font-weight: 700; color: #92400e; font-size: 12.5px;">⚠️ ${warn.title}</div>
                    <div style="font-size: 11.5px; color: #78350f; margin-top: 2px;">${warn.description}</div>
                </div>
            `;
        }
        auditContainer.innerHTML = html;
    }

    // =========================================================================
    // 13. PROPRIÉTÉS DU NŒUD SÉLECTIONNÉ & BARRE CONTEXTUELLE D'ACTION
    // =========================================================================
    function onNodeSelected(node) {
        if (!node) {
            if (inspectorBar) inspectorBar.style.display = "none";
            return;
        }

        // 1. Mise à jour de la barre contextuelle immédiate
        if (inspectorBar) {
            inspectorBar.style.display = "flex";
            if (insTitle && document.activeElement !== insTitle) insTitle.value = node.title || "";
            if (insType) insType.value = node.type || "simple";
            if (insInputs && document.activeElement !== insInputs) insInputs.value = (node.inputs || []).join(", ");
            if (insOutputs && document.activeElement !== insOutputs) insOutputs.value = (node.outputs || []).join(", ");

            const isCondOrLoop = node.type === "condition" || (node.type && node.type.startsWith("loop"));
            if (insCondGroup) {
                insCondGroup.style.display = isCondOrLoop ? "flex" : "none";
                if (insCond && document.activeElement !== insCond) insCond.value = node.condition || "";
            }

            // Affichage spécifique Choix Multiple (Selon que... / Switch)
            const isChoice = node.type === "choice";
            if (insChoiceGroup) {
                insChoiceGroup.style.display = isChoice ? "flex" : "none";
                if (insSwitch && document.activeElement !== insSwitch) insSwitch.value = node.switchExpr || node.condition || "choix";
            }

            // Affichage spécifique Cas (si le parent est un Choix Multiple)
            const parent = node.parentId ? tree.nodes[node.parentId] : null;
            const isChildOfChoice = parent && parent.type === "choice";
            if (insCaseGroup) {
                insCaseGroup.style.display = isChildOfChoice ? "flex" : "none";
                if (insCase && document.activeElement !== insCase) insCase.value = node.caseValue || "1";
            }

            if (insBtnDel) {
                insBtnDel.style.display = (node.id === tree.rootId) ? "none" : "flex";
            }
        }

        // 2. Mise à jour du tiroir de propriétés (synchronisation complète)
        const pTitle = document.getElementById("prop-node-title");
        const pType = document.getElementById("prop-node-type");
        const pIn = document.getElementById("prop-node-inputs");
        const pOut = document.getElementById("prop-node-outputs");
        const pExpr = document.getElementById("prop-node-expr");

        if (pTitle && document.activeElement !== pTitle) pTitle.value = node.title || "";
        if (pType) pType.value = node.type || "simple";
        if (pIn && document.activeElement !== pIn) pIn.value = (node.inputs || []).join(", ");
        if (pOut && document.activeElement !== pOut) pOut.value = (node.outputs || []).join(", ");
        if (pExpr && document.activeElement !== pExpr) pExpr.value = node.codeExpression || node.switchExpr || node.condition || "";
    }

    // Événements de saisie directe sur la barre contextuelle
    if (insTitle) {
        insTitle.addEventListener("input", (e) => {
            const id = renderer.selectedNodeId;
            const node = tree.nodes[id];
            if (!node) return;
            node.title = e.target.value.trim() || "Action";
            renderer.render();
            pagesManager.save();
            const pTitle = document.getElementById("prop-node-title");
            if (pTitle) pTitle.value = node.title;
            updateCodeGenerator();
        });
        insTitle.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                insTitle.blur();
            }
        });
    }

    if (insType) {
        insType.addEventListener("change", (e) => {
            const id = renderer.selectedNodeId;
            const node = tree.nodes[id];
            if (!node) return;
            tree.saveState();
            node.type = e.target.value;
            const isCondOrLoop = node.type === "condition" || node.type.startsWith("loop");
            if (insCondGroup) insCondGroup.style.display = isCondOrLoop ? "flex" : "none";
            if (insChoiceGroup) insChoiceGroup.style.display = (node.type === "choice") ? "flex" : "none";
            const pType = document.getElementById("prop-node-type");
            if (pType) pType.value = node.type;
            renderer.render();
            pagesManager.save();
            updateAllPanels();
        });
    }

    if (insInputs) {
        insInputs.addEventListener("input", (e) => {
            const id = renderer.selectedNodeId;
            const node = tree.nodes[id];
            if (!node) return;
            node.inputs = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
            tree.autoSyncVariables(node);
            renderer.render();
            pagesManager.save();
            const pIn = document.getElementById("prop-node-inputs");
            if (pIn) pIn.value = e.target.value;
            updateDictionaryTable();
            updateAuditLinter();
            updateCodeGenerator();
        });
    }

    if (insOutputs) {
        insOutputs.addEventListener("input", (e) => {
            const id = renderer.selectedNodeId;
            const node = tree.nodes[id];
            if (!node) return;
            node.outputs = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
            tree.autoSyncVariables(node);
            renderer.render();
            pagesManager.save();
            const pOut = document.getElementById("prop-node-outputs");
            if (pOut) pOut.value = e.target.value;
            updateDictionaryTable();
            updateAuditLinter();
            updateCodeGenerator();
        });
    }

    if (insCond) {
        insCond.addEventListener("input", (e) => {
            const id = renderer.selectedNodeId;
            const node = tree.nodes[id];
            if (!node) return;
            node.condition = e.target.value;
            renderer.render();
            pagesManager.save();
            const pExpr = document.getElementById("prop-node-expr");
            if (pExpr) pExpr.value = node.condition;
            updateCodeGenerator();
        });
    }

    if (insSwitch) {
        insSwitch.addEventListener("input", (e) => {
            const id = renderer.selectedNodeId;
            const node = tree.nodes[id];
            if (!node) return;
            node.switchExpr = e.target.value;
            node.condition = e.target.value;
            tree.autoSyncVariables(node);
            renderer.render();
            pagesManager.save();
            const pExpr = document.getElementById("prop-node-expr");
            if (pExpr) pExpr.value = node.switchExpr;
            updateCodeGenerator();
        });
    }

    if (insCase) {
        insCase.addEventListener("input", (e) => {
            const id = renderer.selectedNodeId;
            const node = tree.nodes[id];
            if (!node) return;
            node.caseValue = e.target.value;
            renderer.render();
            pagesManager.save();
            updateCodeGenerator();
        });
    }

    if (insBtnAdd) {
        insBtnAdd.addEventListener("click", () => {
            const id = renderer.selectedNodeId || tree.rootId;
            renderer.addChildNode(id);
        });
    }

    const deleteNodeHandler = () => {
        const id = renderer.selectedNodeId;
        if (id && id !== tree.rootId) {
            tree.removeNode(id);
            renderer.selectedNodeId = tree.rootId;
            pagesManager.save();
            renderer.render();
            onNodeSelected(tree.getRoot());
            updateAllPanels();
        }
    };

    if (insBtnDel) {
        insBtnDel.addEventListener("click", deleteNodeHandler);
    }

    function openNodePropsDrawer(node) {
        openDrawer("tab-node");
        onNodeSelected(node);
    }

    const btnSaveProps = document.getElementById("btn-save-props");
    if (btnSaveProps) {
        btnSaveProps.addEventListener("click", () => {
            const id = renderer.selectedNodeId;
            const node = tree.nodes[id];
            if (!node) return;

            tree.saveState();
            const pTitle = document.getElementById("prop-node-title");
            const pType = document.getElementById("prop-node-type");
            const pIn = document.getElementById("prop-node-inputs");
            const pOut = document.getElementById("prop-node-outputs");
            const pExpr = document.getElementById("prop-node-expr");

            node.title = pTitle ? pTitle.value.trim() : "Action";
            node.type = pType ? pType.value : "simple";
            node.inputs = pIn ? pIn.value.split(",").map(s => s.trim()).filter(Boolean) : [];
            node.outputs = pOut ? pOut.value.split(",").map(s => s.trim()).filter(Boolean) : [];

            const expr = pExpr ? pExpr.value.trim() : "";
            if (node.type === "condition") {
                node.condition = expr;
            } else {
                node.codeExpression = expr;
            }

            tree.autoSyncVariables(node);
            pagesManager.save();
            renderer.render();
            onNodeSelected(node);
            updateAllPanels();
        });
    }

    const btnDeleteNode = document.getElementById("btn-delete-node");
    const mDeleteNode = document.getElementById("m-delete-node");

    if (btnDeleteNode) btnDeleteNode.addEventListener("click", deleteNodeHandler);
    if (mDeleteNode) mDeleteNode.addEventListener("click", deleteNodeHandler);

    // =========================================================================
    // 14. MODÈLES STANDARDS IUT
    // =========================================================================
    document.querySelectorAll("#dropdown-templates .dropdown-entry").forEach(item => {
        item.addEventListener("click", () => {
            const templateKey = item.getAttribute("data-template");
            const tpl = ALGORITHMIC_TEMPLATES[templateKey];
            if (tpl) {
                tree.saveState();
                tree.restoreSnapshot(tpl.tree);
                pagesManager.createPage(tpl.name.replace(/^[^a-zA-Z0-9À-ÿ]+/, '').trim(), templateKey);
                tree.autoLayout();
                renderer.render();
                updateAllPanels();
            }
        });
    });

    // =========================================================================
    // 15. EXPORTS & SAUVEGARDES (NATIVE ELECTRON + FALLBACK WEB)
    // =========================================================================
    const triggerSaveNative = async () => {
        const jsonContent = tree.exportToAlgoForgeJson();
        const defaultName = `${tree.title.replace(/\s+/g, "_")}.af`;

        if (window.algoNative && typeof window.algoNative.saveFileDialog === "function") {
            const res = await window.algoNative.saveFileDialog(defaultName, jsonContent, 'af');
            if (res && res.success) {
                alert(`Exercice sauvegardé avec succès dans :\n${res.filePath}`);
            }
        } else {
            downloadFile(defaultName, jsonContent, "application/json");
        }
        cloudSync.recordTdActivity({ action: "save_file", title: tree.title });
    };

    const triggerOpenNative = async () => {
        if (window.algoNative && typeof window.algoNative.openFileDialog === "function") {
            const res = await window.algoNative.openFileDialog();
            if (res && res.success && res.content) {
                if (tree.importFromAlgoForgeJson(res.content)) {
                    pagesManager.createPage(tree.title);
                    tree.autoLayout();
                    renderer.render();
                    updateAllPanels();
                }
            }
        } else {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = ".af,.json";
            fileInput.onchange = (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (re) => {
                    if (tree.importFromAlgoForgeJson(re.target.result)) {
                        pagesManager.createPage(tree.title);
                        tree.autoLayout();
                        renderer.render();
                        updateAllPanels();
                    }
                };
                reader.readAsText(file);
            };
            fileInput.click();
        }
    };

    window.__algoTriggerSaveFile = triggerSaveNative;
    window.__algoTriggerOpenFile = triggerOpenNative;

    const mSave = document.getElementById("m-save");
    const mOpen = document.getElementById("m-open");
    const mExportSvg = document.getElementById("m-export-svg");
    const mExportC = document.getElementById("m-export-c");

    if (mSave) mSave.addEventListener("click", triggerSaveNative);
    if (mOpen) mOpen.addEventListener("click", triggerOpenNative);

    if (mExportSvg) {
        mExportSvg.addEventListener("click", () => {
            const svgData = new XMLSerializer().serializeToString(svgCanvas);
            downloadFile(`${tree.title.replace(/\s+/g, "_")}.svg`, svgData, "image/svg+xml");
        });
    }

    if (mExportC) {
        mExportC.addEventListener("click", async () => {
            const cCode = transpiler.generateCCode();
            const defaultName = `${transpiler.toIdentifier(tree.title)}.c`;

            if (window.algoNative && typeof window.algoNative.saveFileDialog === "function") {
                await window.algoNative.saveFileDialog(defaultName, cCode, 'c');
            } else {
                downloadFile(defaultName, cCode, "text/plain");
            }
            cloudSync.recordTdActivity({ action: "export_c", title: tree.title });
        });
    }

    function downloadFile(filename, content, mimeType) {
        const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // =========================================================================
    // 16. RACCOURCIS CLAVIER SYSTÈME
    // =========================================================================
    window.addEventListener("keydown", (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

        if (e.ctrlKey && e.key === "\\") {
            e.preventDefault();
            if (btnToggleSidebar) btnToggleSidebar.click();
        } else if (e.ctrlKey && e.key === "n") {
            e.preventDefault();
            createNewPageHandler();
        } else if (e.ctrlKey && e.key === "s") {
            e.preventDefault();
            triggerSaveNative();
        } else if (e.ctrlKey && e.key === "o") {
            e.preventDefault();
            triggerOpenNative();
        } else if (e.ctrlKey && e.key === "z") {
            e.preventDefault();
            const u = document.getElementById("btn-dock-undo");
            if (u) u.click();
        } else if (e.ctrlKey && e.key === "y") {
            e.preventDefault();
            const r = document.getElementById("btn-dock-redo");
            if (r) r.click();
        } else if (e.key === "Delete" || e.key === "Backspace") {
            deleteNodeHandler();
        } else if (e.key === " ") {
            e.preventDefault();
            if (btnSimStep) btnSimStep.click();
        }
    });

    let resizeTimer = null;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            renderer.centerAndFitTree(1.0);
        }, 100);
    });

    function updateAllPanels() {
        updateCodeGenerator();
        updateDictionaryTable();
        updateAuditLinter();
    }
});
