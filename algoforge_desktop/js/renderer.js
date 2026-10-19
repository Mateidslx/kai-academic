// -*- coding: utf-8 -*-
/**
 * renderer.js - Moteur de Rendu Graphique SVG & Éditeur en Ligne (AlgoForge Pro)
 * ===============================================================================
 * Formalisme officiel des Arbres d'Actions IUT R1.01 (Etcheverry / Tabula Rasa).
 * Supporte :
 * - Édition de texte directe sur le canvas (Double-clic sur action ou flux { E } / { S })
 * - Création d'action par double-clic sur le canvas ou via poignée rapide (+)
 * - Raccourcis clavier : Entrée/F2 (Éditer), Tab (Ajouter enfant), Suppr (Supprimer)
 * - Centrage automatique et zoom fluide centré
 * - Rendu clair des boucles (Tant que / Répéter) avec conditions lisibles
 */

class AlgorithmicRenderer {
    constructor(svgElement, tree, onNodeSelect = null, onNodeEdit = null, onNodeChange = null) {
        this.svg = svgElement;
        this.tree = tree;
        this.onNodeSelect = onNodeSelect;
        this.onNodeEdit = onNodeEdit;
        this.onNodeChange = onNodeChange;

        // Vue & Transformation
        this.zoom = 1.0;
        this.panX = 60;
        this.panY = 50;

        // Interaction
        this.isPanning = false;
        this.panStartX = 0;
        this.panStartY = 0;

        this.draggingNode = null;
        this.dragOffsetX = 0;
        this.dragOffsetY = 0;

        this.selectedNodeId = "root";
        this.activeSimNodeId = null;

        this.currentTool = "select";
        this.linkSourceId = null;

        this.viewportGroup = null;
        this.linksGroup = null;
        this.nodesGroup = null;

        this.initDOM();
        this.bindEvents();
    }

    initDOM() {
        this.svg.innerHTML = `
            <defs>
                <filter id="glow-sim" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#10b981" flood-opacity="0.8"/>
                </filter>
                <filter id="glow-select" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#3b82f6" flood-opacity="0.6"/>
                </filter>
                <pattern id="grid-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#cbd5e1" opacity="0.45" />
                </pattern>
            </defs>
            <rect id="bg-canvas" width="100%" height="100%" fill="url(#grid-dots)" />
            <g id="viewport">
                <g id="links-layer"></g>
                <g id="nodes-layer"></g>
            </g>
        `;

        this.viewportGroup = this.svg.querySelector("#viewport");
        this.linksGroup = this.svg.querySelector("#links-layer");
        this.nodesGroup = this.svg.querySelector("#nodes-layer");
    }

    render() {
        this.viewportGroup.setAttribute(
            "transform",
            `translate(${this.panX}, ${this.panY}) scale(${this.zoom})`
        );

        this.renderLinks();
        this.renderNodes();
    }

    renderLinks() {
        let html = "";
        const nodes = this.tree.nodes;

        for (const [id, node] of Object.entries(nodes)) {
            if (!node.children || node.children.length === 0) continue;

            const parentCenterX = node.x + (node.width / 2);
            const parentBottomY = node.y + node.height;
            const connectorSquareY = parentBottomY + 12;

            // Petit connecteur carré sous la boîte parente
            html += `
                <rect x="${parentCenterX - 5}" y="${parentBottomY}" width="10" height="12"
                      fill="#ffffff" stroke="#2c4f64" stroke-width="1.5" />
            `;

            const validChildren = node.children.map(cid => nodes[cid]).filter(c => !!c);
            if (validChildren.length === 0) continue;

            const childCenters = validChildren.map(c => c.x + (c.width / 2));
            const minChildX = Math.min(...childCenters);
            const maxChildX = Math.max(...childCenters);
            const busBarY = connectorSquareY + 28;

            // Ligne verticale descendante
            html += `
                <line x1="${parentCenterX}" y1="${connectorSquareY}" x2="${parentCenterX}" y2="${busBarY}"
                      stroke="#2c4f64" stroke-width="1.6" />
            `;

            // Barre horizontale de distribution
            if (validChildren.length > 1 || minChildX !== parentCenterX) {
                html += `
                    <line x1="${minChildX}" y1="${busBarY}" x2="${maxChildX}" y2="${busBarY}"
                          stroke="#2c4f64" stroke-width="1.6" />
                `;
            }

            // Lignes vers chaque enfant
            for (const child of validChildren) {
                const childCenterX = child.x + (child.width / 2);
                html += `
                    <line x1="${childCenterX}" y1="${busBarY}" x2="${childCenterX}" y2="${child.y}"
                          stroke="#2c4f64" stroke-width="1.6" />
                `;
            }
        }

        this.linksGroup.innerHTML = html;
    }

    renderNodes() {
        let html = "";
        const nodes = this.tree.nodes;

        for (const [id, node] of Object.entries(nodes)) {
            const isSelected = this.selectedNodeId === id;
            const isSimActive = this.activeSimNodeId === id;

            const strokeColor = isSimActive ? "#10b981" : (isSelected ? "#2563eb" : "#2c4f64");
            const strokeWidth = isSimActive ? "2.8" : (isSelected ? "2.2" : "1.6");
            const filterAttr = isSimActive ? 'filter="url(#glow-sim)"' : (isSelected ? 'filter="url(#glow-select)"' : '');

            // 1. Accolades d'entrées { E } à gauche (cliquable pour édition en ligne)
            const inputsStr = (node.inputs || []).join(", ");
            let inputsSvg = "";
            if (inputsStr.length > 0 || isSelected) {
                const label = inputsStr.length > 0 ? inputsStr : "ajouter E";
                const isPlaceholder = inputsStr.length === 0;
                inputsSvg = `
                    <g class="flow-group flow-input" data-node-id="${id}" data-flow="input" title="Cliquer pour modifier les entrées { E }" style="cursor: pointer;">
                        <text x="${node.x - 14}" y="${node.y + (node.height / 2) + 6}"
                              text-anchor="end" font-family="'Inter', sans-serif" font-size="13" font-weight="500" fill="${isPlaceholder ? '#94a3b8' : '#2c4f64'}">
                            <tspan font-family="'Source Code Pro', monospace" font-size="16" fill="#1e3a8a">{</tspan>
                            <tspan dx="3">${label}</tspan>
                            <tspan dx="3" font-family="'Source Code Pro', monospace" font-size="16" fill="#1e3a8a">}</tspan>
                        </text>
                    </g>
                `;
            }

            // 2. Accolades de sorties { S } à droite (cliquable pour édition en ligne)
            const outputsStr = (node.outputs || []).join(", ");
            let outputsSvg = "";
            if (outputsStr.length > 0 || isSelected) {
                const label = outputsStr.length > 0 ? outputsStr : "ajouter S";
                const isPlaceholder = outputsStr.length === 0;
                outputsSvg = `
                    <g class="flow-group flow-output" data-node-id="${id}" data-flow="output" title="Cliquer pour modifier les sorties { S }" style="cursor: pointer;">
                        <text x="${node.x + node.width + 14}" y="${node.y + (node.height / 2) + 6}"
                              text-anchor="start" font-family="'Inter', sans-serif" font-size="13" font-weight="500" fill="${isPlaceholder ? '#94a3b8' : '#2c4f64'}">
                            <tspan font-family="'Source Code Pro', monospace" font-size="16" fill="#1e3a8a">{</tspan>
                            <tspan dx="3">${label}</tspan>
                            <tspan dx="3" font-family="'Source Code Pro', monospace" font-size="16" fill="#1e3a8a">}</tspan>
                        </text>
                    </g>
                `;
            }

            // 3. Forme géométrique selon le type IUT
            let shapeSvg = "";
            const fillBg = isSimActive ? "#ecfdf5" : "#f8fafc";

            if (node.type === "composed") {
                // Action composée : double bordure verticale
                shapeSvg = `
                    <rect x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}"
                          fill="${fillBg}" stroke="${strokeColor}" stroke-width="${strokeWidth}" rx="3" ${filterAttr} />
                    <line x1="${node.x + 9}" y1="${node.y}" x2="${node.x + 9}" y2="${node.y + node.height}"
                          stroke="${strokeColor}" stroke-width="1.2" />
                    <line x1="${node.x + node.width - 9}" y1="${node.y}" x2="${node.x + node.width - 9}" y2="${node.y + node.height}"
                          stroke="${strokeColor}" stroke-width="1.2" />
                `;
            } else if (node.type === "condition") {
                // Condition / Alternative : hexagone pans coupés
                const bevel = 12;
                const points = [
                    `${node.x + bevel},${node.y}`,
                    `${node.x + node.width - bevel},${node.y}`,
                    `${node.x + node.width},${node.y + (node.height / 2)}`,
                    `${node.x + node.width - bevel},${node.y + node.height}`,
                    `${node.x + bevel},${node.y + node.height}`,
                    `${node.x},${node.y + (node.height / 2)}`
                ].join(" ");

                shapeSvg = `
                    <polygon points="${points}" fill="${fillBg}" stroke="${strokeColor}" stroke-width="${strokeWidth}" ${filterAttr} />
                `;
            } else if (node.type.startsWith("loop")) {
                // Boucle IUT : rectangle avec badge de boucle clair
                shapeSvg = `
                    <rect x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}"
                          fill="${fillBg}" stroke="${strokeColor}" stroke-width="${strokeWidth}" rx="6" ${filterAttr} />
                    <rect x="${node.x + 8}" y="${node.y + 6}" width="20" height="18" rx="3"
                          fill="#eff6ff" stroke="#3b82f6" stroke-width="1" />
                    <text x="${node.x + 18}" y="${node.y + 19}" text-anchor="middle" font-size="12" fill="#2563eb" font-weight="700">↻</text>
                `;
            } else {
                // Action simple élémentaire
                shapeSvg = `
                    <rect x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}"
                          fill="${fillBg}" stroke="${strokeColor}" stroke-width="${strokeWidth}" rx="3" ${filterAttr} />
                `;
            }

            // Découpage du titre
            const words = (node.title || "Action").split(" ");
            let line1 = node.title || "Action";
            let line2 = "";
            if (words.length >= 3 && node.title.length > 18) {
                const mid = Math.ceil(words.length / 2);
                line1 = words.slice(0, mid).join(" ");
                line2 = words.slice(mid).join(" ");
            }

            let textSvg = "";
            if (node.type.startsWith("loop") && node.condition) {
                // Boucle avec condition affichée
                const condShort = node.condition.length > 22 ? node.condition.slice(0, 21) + "…" : node.condition;
                textSvg = `
                    <text class="node-title-text" x="${node.x + (node.width / 2) + 6}" y="${node.y + (node.height / 2) - 4}"
                          text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="#1e293b">
                        ${line1}
                    </text>
                    <text class="node-cond-text" x="${node.x + (node.width / 2)}" y="${node.y + (node.height / 2) + 14}"
                          text-anchor="middle" font-family="'Source Code Pro', monospace" font-size="11" font-weight="500" fill="#0284c7">
                        ${condShort}
                    </text>
                `;
            } else if (line2) {
                textSvg = `
                    <text class="node-title-text" x="${node.x + (node.width / 2)}" y="${node.y + (node.height / 2) - 3}"
                          text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" font-weight="500" fill="#1e293b">
                        <tspan class="node-title-text" x="${node.x + (node.width / 2)}">${line1}</tspan>
                        <tspan class="node-title-text" x="${node.x + (node.width / 2)}" dy="16">${line2}</tspan>
                    </text>
                `;
            } else {
                textSvg = `
                    <text class="node-title-text" x="${node.x + (node.width / 2)}" y="${node.y + (node.height / 2) + 5}"
                          text-anchor="middle" font-family="'Inter', sans-serif" font-size="13.5" font-weight="500" fill="#1e293b">
                        ${line1}
                    </text>
                `;
            }

            // Poignées rapides sur nœud sélectionné (+ Enfant, ✎ Éditer, ✕ Supprimer)
            let handlesSvg = "";
            if (isSelected) {
                handlesSvg = `
                    <g class="node-handle handle-add-child" data-parent-id="${id}" title="Ajouter une action sous cette étape (Tab)">
                        <circle cx="${node.x + (node.width / 2)}" cy="${node.y + node.height + 14}" r="11" fill="#2563eb" />
                        <text x="${node.x + (node.width / 2)}" y="${node.y + node.height + 19}" text-anchor="middle" font-size="15" fill="#ffffff" font-weight="700">+</text>
                    </g>
                    <g class="node-handle handle-edit" data-node-id="${id}" title="Modifier le nom de l'action (Entrée ou Double-clic)">
                        <circle cx="${node.x + node.width}" cy="${node.y}" r="9" fill="#ffffff" stroke="#2563eb" stroke-width="1.5" />
                        <text x="${node.x + node.width}" y="${node.y + 4}" text-anchor="middle" font-size="10" fill="#2563eb">✎</text>
                    </g>
                `;
                if (id !== this.tree.rootId) {
                    handlesSvg += `
                        <g class="node-handle handle-delete" data-node-id="${id}" title="Supprimer cette action (Suppr)">
                            <circle cx="${node.x}" cy="${node.y}" r="9" fill="#ffffff" stroke="#ef4444" stroke-width="1.5" />
                            <text x="${node.x}" y="${node.y + 3}" text-anchor="middle" font-size="9" fill="#ef4444" font-weight="700">✕</text>
                        </g>
                    `;
                }
            }

            html += `
                <g class="node-item" data-id="${id}" style="cursor: move;">
                    ${inputsSvg}
                    ${shapeSvg}
                    ${textSvg}
                    ${outputsSvg}
                    ${handlesSvg}
                </g>
            `;
        }

        this.nodesGroup.innerHTML = html;
    }

    bindEvents() {
        // Mousedown pour Pan, Drag, Sélection et Poignées rapides
        this.svg.addEventListener("mousedown", (e) => {
            const target = e.target;

            // 1. Clic sur poignée "+" pour ajouter un enfant
            const handleAdd = target.closest(".handle-add-child");
            if (handleAdd) {
                e.stopPropagation();
                const parentId = handleAdd.getAttribute("data-parent-id");
                this.addChildNode(parentId);
                return;
            }

            // 2. Clic sur poignée "✎" pour éditer le texte en ligne
            const handleEdit = target.closest(".handle-edit");
            if (handleEdit) {
                e.stopPropagation();
                const nodeId = handleEdit.getAttribute("data-node-id");
                this.startInlineNodeEdit(nodeId);
                return;
            }

            // 3. Clic sur poignée "✕" pour supprimer
            const handleDel = target.closest(".handle-delete");
            if (handleDel) {
                e.stopPropagation();
                const nodeId = handleDel.getAttribute("data-node-id");
                this.deleteNode(nodeId);
                return;
            }

            // 4. Clic sur flux d'entrées { E } ou sorties { S }
            const flowGroup = target.closest(".flow-group");
            if (flowGroup) {
                e.stopPropagation();
                const nodeId = flowGroup.getAttribute("data-node-id");
                const flowType = flowGroup.getAttribute("data-flow");
                this.startInlineFlowEdit(nodeId, flowType);
                return;
            }

            // 5. Clic sur le nœud
            const nodeElem = target.closest(".node-item");
            if (nodeElem) {
                const nodeId = nodeElem.getAttribute("data-id");
                const wasAlreadySelected = this.selectedNodeId === nodeId;
                const isTextClick = target.tagName === "text" || target.tagName === "tspan" || !!target.closest("text");

                this.selectedNodeId = nodeId;

                if (this.currentTool === "link") {
                    this.handleLinkClick(nodeId);
                    return;
                }

                if (typeof this.onNodeSelect === "function") {
                    this.onNodeSelect(this.tree.nodes[nodeId]);
                }

                const node = this.tree.nodes[nodeId];
                if (node) {
                    this.draggingNode = node;
                    this.dragStartCoords = { x: e.clientX, y: e.clientY };
                    this.dragWasMoved = false;
                    this.clickTargetText = isTextClick;
                    this.clickWasAlreadySelected = wasAlreadySelected;

                    const coords = this.getCanvasCoords(e);
                    this.dragOffsetX = coords.x - node.x;
                    this.dragOffsetY = coords.y - node.y;
                }
                this.render();
            } else {
                // Clic sur fond : Pan & Désélection
                this.isPanning = true;
                this.panStartX = e.clientX - this.panX;
                this.panStartY = e.clientY - this.panY;
                this.selectedNodeId = null;
                if (typeof this.onNodeSelect === "function") {
                    this.onNodeSelect(null);
                }
                this.render();
            }
        });

        window.addEventListener("mousemove", (e) => {
            if (this.isPanning) {
                this.panX = e.clientX - this.panStartX;
                this.panY = e.clientY - this.panStartY;
                this.render();
            } else if (this.draggingNode) {
                if (this.dragStartCoords) {
                    const dist = Math.hypot(e.clientX - this.dragStartCoords.x, e.clientY - this.dragStartCoords.y);
                    if (dist > 4) {
                        this.dragWasMoved = true;
                    }
                }
                const coords = this.getCanvasCoords(e);
                this.draggingNode.x = Math.round((coords.x - this.dragOffsetX) / 10) * 10;
                this.draggingNode.y = Math.round((coords.y - this.dragOffsetY) / 10) * 10;
                this.render();
            }
        });

        window.addEventListener("mouseup", (e) => {
            if (this.isPanning) {
                this.isPanning = false;
            }
            if (this.draggingNode) {
                const draggedNode = this.draggingNode;
                const wasMoved = this.dragWasMoved;
                const isText = this.clickTargetText;
                const wasSelected = this.clickWasAlreadySelected;

                this.draggingNode = null;
                this.dragStartCoords = null;

                if (wasMoved) {
                    this.tree.saveState();
                    if (this.onNodeChange) this.onNodeChange();
                } else if (isText || wasSelected) {
                    // Clic franc sans glissement sur le texte ou sur un nœud déjà sélectionné : ouverture directe du champ d'écriture !
                    this.startInlineNodeEdit(draggedNode.id);
                }
            }
        });

        // Double-clic : Édition en ligne ou création instantanée d'action
        this.svg.addEventListener("dblclick", (e) => {
            const target = e.target;

            // Double clic sur flux
            const flowGroup = target.closest(".flow-group");
            if (flowGroup) {
                const nodeId = flowGroup.getAttribute("data-node-id");
                const flowType = flowGroup.getAttribute("data-flow");
                this.startInlineFlowEdit(nodeId, flowType);
                return;
            }

            // Double clic sur un nœud : ÉDITION DIRECTE DU TEXTE
            const nodeElem = target.closest(".node-item");
            if (nodeElem) {
                const nodeId = nodeElem.getAttribute("data-id");
                this.startInlineNodeEdit(nodeId);
                return;
            }

            // Double clic dans le vide : CRÉATION INSTANTANÉE D'UN NŒUD
            const coords = this.getCanvasCoords(e);
            const parent = this.tree.nodes[this.selectedNodeId] || this.tree.getRoot();
            this.tree.saveState();
            const newNode = this.tree.addNode({
                title: "Nouvelle action",
                type: "simple",
                parentId: parent ? parent.id : null,
                x: Math.round(coords.x - 90),
                y: Math.round(coords.y - 25)
            });
            this.selectedNodeId = newNode.id;
            if (this.onNodeChange) this.onNodeChange(newNode);
            this.render();
            this.startInlineNodeEdit(newNode.id);
        });

        // Raccourcis clavier quand le focus n'est pas dans un input
        window.addEventListener("keydown", (e) => {
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) {
                return;
            }

            if (e.key === "Enter" || e.key === "F2") {
                if (this.selectedNodeId) {
                    e.preventDefault();
                    this.startInlineNodeEdit(this.selectedNodeId);
                }
            } else if (e.key === "Tab") {
                if (this.selectedNodeId) {
                    e.preventDefault();
                    this.addChildNode(this.selectedNodeId);
                }
            } else if (e.key === "Delete" || e.key === "Backspace") {
                if (this.selectedNodeId && this.selectedNodeId !== this.tree.rootId) {
                    e.preventDefault();
                    this.deleteNode(this.selectedNodeId);
                }
            } else if (this.selectedNodeId && e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
                // Saisie instantanée dès qu'on tape une lettre ou un chiffre !
                e.preventDefault();
                this.startInlineNodeEdit(this.selectedNodeId, e.key);
            }
        });

        // Zoom molette centré sur la souris
        this.svg.addEventListener("wheel", (e) => {
            e.preventDefault();
            const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
            const newZoom = Math.min(Math.max(this.zoom * zoomFactor, 0.4), 2.2);

            const rect = this.svg.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            this.panX = mouseX - (mouseX - this.panX) * (newZoom / this.zoom);
            this.panY = mouseY - (mouseY - this.panY) * (newZoom / this.zoom);
            this.zoom = newZoom;

            this.render();
            if (typeof this.onZoomChange === "function") {
                this.onZoomChange(Math.round(this.zoom * 100));
            }
        });
    }

    // =========================================================================
    // ÉDITION EN LIGNE DIRECTE (INLINE TEXT EDITING)
    // =========================================================================
    startInlineNodeEdit(nodeId, initialChar = null) {
        const node = this.tree.nodes[nodeId];
        if (!node) return;

        this.selectedNodeId = nodeId;
        this.render();
        if (typeof this.onNodeSelect === "function") {
            this.onNodeSelect(node);
        }

        const overlay = document.getElementById("canvas-overlay");
        if (!overlay) return;
        overlay.innerHTML = "";

        const screenX = node.x * this.zoom + this.panX;
        const screenY = node.y * this.zoom + this.panY;
        const screenW = node.width * this.zoom;
        const screenH = node.height * this.zoom;

        const editor = document.createElement("textarea");
        editor.className = "inline-node-editor";
        if (initialChar !== null) {
            editor.value = initialChar;
        } else {
            editor.value = node.title || "";
        }
        editor.style.left = `${screenX}px`;
        editor.style.top = `${screenY}px`;
        editor.style.width = `${Math.max(screenW, 170)}px`;
        editor.style.height = `${Math.max(screenH, 56)}px`;

        let committed = false;
        const commit = () => {
            if (committed) return;
            committed = true;
            const newTitle = editor.value.trim() || "Action";
            if (newTitle !== node.title) {
                this.tree.saveState();
                node.title = newTitle;
                if (this.onNodeChange) this.onNodeChange(node);
            }
            overlay.innerHTML = "";
            this.render();
            if (typeof this.onNodeSelect === "function") {
                this.onNodeSelect(node);
            }
        };

        editor.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                commit();
            } else if (e.key === "Escape") {
                committed = true;
                overlay.innerHTML = "";
                this.render();
            }
        });

        editor.addEventListener("blur", () => {
            commit();
        });

        overlay.appendChild(editor);
        editor.focus();
        if (initialChar !== null) {
            editor.setSelectionRange(initialChar.length, initialChar.length);
        } else {
            editor.select();
        }
    }

    startInlineFlowEdit(nodeId, flowType) {
        const node = this.tree.nodes[nodeId];
        if (!node) return;

        this.selectedNodeId = nodeId;
        this.render();
        if (typeof this.onNodeSelect === "function") {
            this.onNodeSelect(node);
        }

        const overlay = document.getElementById("canvas-overlay");
        if (!overlay) return;
        overlay.innerHTML = "";

        const isInput = flowType === "input";
        const currentVals = isInput ? (node.inputs || []) : (node.outputs || []);

        let targetX = isInput ? (node.x - 130) : (node.x + node.width + 12);
        let targetY = node.y + (node.height / 2) - 16;

        const screenX = targetX * this.zoom + this.panX;
        const screenY = targetY * this.zoom + this.panY;

        const editor = document.createElement("input");
        editor.type = "text";
        editor.className = "inline-flow-editor";
        editor.value = currentVals.join(", ");
        editor.placeholder = isInput ? "ex: note, prix" : "ex: total, valide";
        editor.style.left = `${Math.max(10, screenX)}px`;
        editor.style.top = `${screenY}px`;
        editor.style.width = "130px";

        let committed = false;
        const commit = () => {
            if (committed) return;
            committed = true;
            const parts = editor.value.split(",").map(s => s.trim()).filter(Boolean);
            this.tree.saveState();
            if (isInput) {
                node.inputs = parts;
            } else {
                node.outputs = parts;
            }
            this.tree.autoSyncVariables(node);
            if (this.onNodeChange) this.onNodeChange(node);
            overlay.innerHTML = "";
            this.render();
            if (typeof this.onNodeSelect === "function") {
                this.onNodeSelect(node);
            }
        };

        editor.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                commit();
            } else if (e.key === "Escape") {
                committed = true;
                overlay.innerHTML = "";
                this.render();
            }
        });

        editor.addEventListener("blur", () => {
            commit();
        });

        overlay.appendChild(editor);
        editor.focus();
        editor.select();
    }

    addChildNode(parentId) {
        const parent = this.tree.nodes[parentId] || this.tree.getRoot();
        if (!parent) return;

        this.tree.saveState();
        const childCount = (parent.children || []).length;
        const newX = parent.x + (childCount * 220) - ((childCount > 0) ? 60 : 0);
        const newY = parent.y + 190;

        const newNode = this.tree.addNode({
            title: "Nouvelle action",
            type: "simple",
            parentId: parent.id,
            inputs: (parent.inputs || []).slice(0, 1),
            outputs: [],
            x: newX,
            y: newY
        });

        this.selectedNodeId = newNode.id;
        if (this.onNodeChange) this.onNodeChange(newNode);
        this.render();
        this.startInlineNodeEdit(newNode.id);
    }

    deleteNode(nodeId) {
        if (!nodeId || nodeId === this.tree.rootId) return;
        this.tree.saveState();
        this.tree.removeNode(nodeId);
        this.selectedNodeId = this.tree.rootId;
        if (this.onNodeChange) this.onNodeChange(this.tree.getRoot());
        this.render();
    }

    handleLinkClick(targetId) {
        if (!this.linkSourceId) {
            this.linkSourceId = targetId;
        } else {
            if (this.linkSourceId !== targetId) {
                const parent = this.tree.nodes[this.linkSourceId];
                const child = this.tree.nodes[targetId];
                if (parent && child && !parent.children.includes(targetId)) {
                    this.tree.saveState();
                    parent.children.push(targetId);
                    child.parentId = parent.id;
                    this.render();
                }
            }
            this.linkSourceId = null;
            this.setTool("select");
        }
    }

    getCanvasCoords(e) {
        const rect = this.svg.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;
        return {
            x: (clientX - this.panX) / this.zoom,
            y: (clientY - this.panY) / this.zoom
        };
    }

    setTool(toolName) {
        this.currentTool = toolName;
        this.linkSourceId = null;
    }

    setZoom(valPercent) {
        this.zoom = valPercent / 100.0;
        this.render();
    }

    // Centrage automatique et calcul de cadrage optimal
    centerAndFitTree(targetZoom = 1.0) {
        const nodes = Object.values(this.tree.nodes);
        if (nodes.length === 0) return;

        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        for (const node of nodes) {
            // Inclure les flux { E } et { S } dans le calcul de la boîte englobante
            const hasInputs = (node.inputs || []).length > 0;
            const hasOutputs = (node.outputs || []).length > 0;
            const leftPad = hasInputs ? 120 : 30;
            const rightPad = hasOutputs ? 120 : 30;

            minX = Math.min(minX, node.x - leftPad);
            maxX = Math.max(maxX, node.x + (node.width || 190) + rightPad);
            minY = Math.min(minY, node.y - 30);
            maxY = Math.max(maxY, node.y + (node.height || 54) + 30);
        }

        const treeW = maxX - minX;
        const treeH = maxY - minY;
        const canvasW = this.svg.clientWidth || 1000;
        const canvasH = this.svg.clientHeight || 700;

        const availableW = Math.max(300, canvasW - 80);
        const availableH = Math.max(300, canvasH - 120);

        let finalZoom = targetZoom;
        if (treeW * targetZoom > availableW || treeH * targetZoom > availableH) {
            const fitW = availableW / treeW;
            const fitH = availableH / treeH;
            finalZoom = Math.min(targetZoom, Math.min(fitW, fitH));
            finalZoom = Math.max(0.60, Math.round(finalZoom * 20) / 20);
        }

        this.zoom = finalZoom;
        this.panX = Math.round((canvasW - (treeW * this.zoom)) / 2 - (minX * this.zoom));
        this.panY = Math.max(40, Math.round((canvasH - (treeH * this.zoom)) / 2 - (minY * this.zoom)));

        this.render();
        if (typeof this.onZoomChange === "function") {
            this.onZoomChange(Math.round(this.zoom * 100));
        }
    }

    resetView() {
        this.centerAndFitTree(1.0);
    }

    highlightSimNode(nodeId) {
        this.activeSimNodeId = nodeId;
        this.render();
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { AlgorithmicRenderer };
}
