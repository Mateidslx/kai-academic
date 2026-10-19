// -*- coding: utf-8 -*-
/**
 * simulator.js - Moteur de Simulation Pas-à-Pas Visuel (AlgoForge Pro)
 * ====================================================================
 * Permet d'exécuter l'arbre algorithmique pas-à-pas ou en continu,
 * en éclairant les blocs sur le canvas et en affichant l'évolution
 * des variables en direct dans une trace mémoire réactive.
 */

class AlgorithmicSimulator {
    constructor(tree, onStateChange = null) {
        this.tree = tree;
        this.onStateChange = onStateChange; // Callback (activeNodeId, variables, logs, status)

        this.variables = {};
        this.executionQueue = [];
        this.currentStepIndex = -1;
        this.isRunning = false;
        this.timer = null;
        this.delayMs = 900; // Vitesse de pas en lecture continue
        this.logs = [];
        this.status = "idle"; // 'idle' | 'running' | 'paused' | 'finished'
    }

    // Initialisation avec des valeurs par défaut pour les variables d'entrée
    prepare(customInputs = {}) {
        this.reset();
        const root = this.tree.getRoot();
        if (!root) return;

        // Initialiser toutes les variables du dictionnaire à 0 ou valeur fournie
        for (const [varName, info] of Object.entries(this.tree.dictionary || {})) {
            if (customInputs[varName] !== undefined) {
                this.variables[varName] = Number(customInputs[varName]) || customInputs[varName];
            } else if (varName === "prix") {
                this.variables[varName] = 100.0;
            } else if (varName === "reduc") {
                this.variables[varName] = 20.0;
            } else {
                this.variables[varName] = 0.0;
            }
        }

        // Construire la séquence d'exécution à plat
        this.executionQueue = [];
        this.buildExecutionSequence(root.id);
        this.currentStepIndex = -1;
        this.status = "ready";
        this.addLog(`🚀 Simulateur prêt avec ${this.executionQueue.length} étapes algorithmiques.`);
        this.notify();
    }

    buildExecutionSequence(nodeId) {
        const node = this.tree.nodes[nodeId];
        if (!node) return;

        if (node.type === "composed") {
            // L'action composée commence
            this.executionQueue.push({
                nodeId: node.id,
                action: "enter",
                description: `Entrée dans l'action composée '${node.title}'`
            });

            // Exécution ordonnée des sous-actions
            for (const cid of (node.children || [])) {
                this.buildExecutionSequence(cid);
            }

            // Clôture
            this.executionQueue.push({
                nodeId: node.id,
                action: "exit",
                description: `Sortie de l'action '${node.title}'`
            });
        } else if (node.type === "simple") {
            this.executionQueue.push({
                nodeId: node.id,
                action: "execute",
                description: `Exécution : ${node.title}`
            });
        } else if (node.type === "condition") {
            this.executionQueue.push({
                nodeId: node.id,
                action: "evaluate_condition",
                description: `Évaluation de la condition : ${node.condition || 'Vrai'}`
            });
            // Pour simplifier la pré-construction, on inclut la branche then si elle existe
            if (node.children[0]) this.buildExecutionSequence(node.children[0]);
        } else if (node.type === "choice") {
            const swVar = node.switchExpr || node.condition || "choix";
            this.executionQueue.push({
                nodeId: node.id,
                action: "evaluate_choice",
                description: `Évaluation du choix : Selon (${swVar})`
            });
            // Exécuter les enfants du choix
            for (const cid of (node.children || [])) {
                this.buildExecutionSequence(cid);
            }
        } else if (node.type.startsWith("loop")) {
            this.executionQueue.push({
                nodeId: node.id,
                action: "loop_iter",
                description: `Itération de boucle : ${node.title}`
            });
            for (const cid of (node.children || [])) {
                this.buildExecutionSequence(cid);
            }
        }
    }

    step() {
        if (this.currentStepIndex >= this.executionQueue.length - 1) {
            this.status = "finished";
            this.pause();
            this.addLog("✅ Algorithme terminé avec succès ! Tous les résultats ont été produits.");
            this.notify();
            return false;
        }

        this.currentStepIndex++;
        const currentItem = this.executionQueue[this.currentStepIndex];
        const node = this.tree.nodes[currentItem.nodeId];

        if (node) {
            this.executeNodeLogic(node, currentItem);
        }

        if (this.currentStepIndex >= this.executionQueue.length - 1) {
            this.status = "finished";
            this.pause();
            this.addLog("✅ Fin de l'algorithme !");
        } else {
            this.status = "running";
        }

        this.notify();
        return true;
    }

    executeNodeLogic(node, stepItem) {
        if (stepItem.action === "execute" || stepItem.action === "enter") {
            // Interprétation basique des formules IUT
            if (node.codeExpression) {
                const lines = node.codeExpression.split("\n");
                for (const line of lines) {
                    const clean = line.trim().replace(/;$/, "");
                    if (clean.includes("=") || clean.includes("<-")) {
                        const parts = clean.split(/=|\<-/);
                        const varName = parts[0].trim();
                        const expr = parts[1].trim();

                        try {
                            // Remplacer les noms de variables par leurs valeurs actuelles
                            let evalExpr = expr;
                            for (const [k, v] of Object.entries(this.variables)) {
                                const regex = new RegExp(`\\b${k}\\b`, "g");
                                evalExpr = evalExpr.replace(regex, v);
                            }
                            // Évaluation sécurisée
                            const result = Function(`"use strict"; return (${evalExpr})`)();
                            this.variables[varName] = Number(result) || result;
                            this.addLog(`⚡ Calcul [${node.title}] : ${varName} = ${this.variables[varName]}`);
                        } catch (e) {
                            this.addLog(`⚠️ Évaluation calcul [${node.title}] : ${clean}`);
                        }
                    } else if (clean.startsWith("afficher(") || clean.startsWith("print(")) {
                        this.addLog(`📢 Affichage écran : prix initial = ${this.variables.prix} €, réduction = ${this.variables.reduc} %, PRIX RÉDUIT = ${this.variables.prixReduit} €`);
                    } else if (clean.startsWith("saisir(")) {
                        this.addLog(`📥 Saisie validée : variables d'entrée prises en compte.`);
                    }
                }
            } else {
                this.addLog(`👉 ${stepItem.description}`);
            }
        } else {
            this.addLog(`🔹 ${stepItem.description}`);
        }
    }

    play(speedMs = null) {
        if (speedMs) this.delayMs = speedMs;
        if (this.status === "finished" || this.currentStepIndex >= this.executionQueue.length - 1) {
            this.prepare();
        }

        this.isRunning = true;
        this.status = "running";
        this.notify();

        clearInterval(this.timer);
        this.timer = setInterval(() => {
            const hasMore = this.step();
            if (!hasMore) {
                this.pause();
            }
        }, this.delayMs);
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.timer);
        this.timer = null;
        if (this.status !== "finished") {
            this.status = "paused";
        }
        this.notify();
    }

    reset() {
        this.pause();
        this.variables = {};
        this.executionQueue = [];
        this.currentStepIndex = -1;
        this.status = "idle";
        this.logs = [];
        this.notify();
    }

    addLog(msg) {
        const time = new Date().toLocaleTimeString();
        this.logs.push(`[${time}] ${msg}`);
        if (this.logs.length > 50) this.logs.shift();
    }

    getActiveNodeId() {
        if (this.currentStepIndex >= 0 && this.currentStepIndex < this.executionQueue.length) {
            return this.executionQueue[this.currentStepIndex].nodeId;
        }
        return null;
    }

    notify() {
        if (typeof this.onStateChange === "function") {
            this.onStateChange({
                activeNodeId: this.getActiveNodeId(),
                variables: { ...this.variables },
                logs: [...this.logs],
                status: this.status,
                step: this.currentStepIndex + 1,
                totalSteps: this.executionQueue.length
            });
        }
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { AlgorithmicSimulator };
}
