// -*- coding: utf-8 -*-
/**
 * models.js - Modèles de données pour AlgoForge Pro
 * ===================================================
 * Gestion de l'arbre algorithmique, des nœuds d'action (R1.01),
 * du dictionnaire des variables, et de l'historique Undo/Redo.
 */

class AlgorithmicTree {
    constructor() {
        this.title = "Calcul du prix réduit";
        this.description = "Algorithme de calcul et d'affichage d'un prix après réduction";
        this.author = "Matéi de Saint Leger";
        this.version = "1.0.0";
        this.date = new Date().toISOString();

        // Dictionnaire des variables : clé = nom de la variable
        // { type: 'reel'|'entier'|'chaine'|'booleen'|'caractere'|'tableau', role: string, nature: 'D'|'R'|'D/R'|'INT' }
        this.dictionary = {
            "prix": { type: "reel", role: "Prix initial de l'article en euros", nature: "D" },
            "reduc": { type: "reel", role: "Taux de réduction en pourcentage (ex: 20 pour 20%)", nature: "D" },
            "prixReduit": { type: "reel", role: "Prix final après application de la remise", nature: "R" }
        };

        // Table des nœuds : clé = id
        this.nodes = {};
        this.rootId = "root";

        // Historique Undo / Redo
        this.undoStack = [];
        this.redoStack = [];
        this.maxHistory = 50;

        // Initialisation de l'exemple fidèle à la capture
        this.initDefaultTree();
    }

    initDefaultTree() {
        this.nodes = {};

        // Racine (Action Principale)
        const root = new ActionNode({
            id: "root",
            title: "Afficher prix reduit",
            type: "composed",
            inputs: ["prix", "reduc"],
            outputs: ["prixReduit"],
            x: 520,
            y: 90,
            children: ["node_saisie", "node_calcul", "node_affichage"]
        });
        this.nodes[root.id] = root;

        // Enfant 1 : Saisir les données
        const node1 = new ActionNode({
            id: "node_saisie",
            parentId: "root",
            title: "Saisir prix et remise",
            type: "simple",
            inputs: [],
            outputs: ["prix", "reduc"],
            codeExpression: 'saisir(prix);\nsaisir(reduc);',
            x: 80,
            y: 280,
            children: []
        });
        this.nodes[node1.id] = node1;

        // Enfant 2 : Calculer le prix réduit
        const node2 = new ActionNode({
            id: "node_calcul",
            parentId: "root",
            title: "Calculer montant reduit",
            type: "simple",
            inputs: ["prix", "reduc"],
            outputs: ["prixReduit"],
            codeExpression: 'prixReduit = prix * (1.0 - (reduc / 100.0));',
            x: 520,
            y: 280,
            children: []
        });
        this.nodes[node2.id] = node2;

        // Enfant 3 : Afficher le résultat
        const node3 = new ActionNode({
            id: "node_affichage",
            parentId: "root",
            title: "Afficher le prix final",
            type: "simple",
            inputs: ["prixReduit"],
            outputs: [],
            codeExpression: 'afficher("Prix reduit : ", prixReduit);',
            x: 960,
            y: 280,
            children: []
        });
        this.nodes[node3.id] = node3;

        this.rootId = "root";
        this.saveState();
    }

    saveState() {
        const snapshot = JSON.stringify({
            title: this.title,
            description: this.description,
            dictionary: this.dictionary,
            nodes: this.nodes,
            rootId: this.rootId
        });
        this.undoStack.push(snapshot);
        if (this.undoStack.length > this.maxHistory) {
            this.undoStack.shift();
        }
        this.redoStack = []; // Vider la pile Redo sur nouvelle action
    }

    undo() {
        if (this.undoStack.length <= 1) return false;
        const current = this.undoStack.pop();
        this.redoStack.push(current);
        const previous = JSON.parse(this.undoStack[this.undoStack.length - 1]);
        this.restoreSnapshot(previous);
        return true;
    }

    redo() {
        if (this.redoStack.length === 0) return false;
        const next = this.redoStack.pop();
        this.undoStack.push(next);
        this.restoreSnapshot(JSON.parse(next));
        return true;
    }

    restoreSnapshot(data) {
        this.title = data.title;
        this.description = data.description;
        this.dictionary = data.dictionary || {};
        this.rootId = data.rootId || "root";
        this.nodes = {};
        for (const [id, nodeData] of Object.entries(data.nodes)) {
            this.nodes[id] = new ActionNode(nodeData);
        }
    }

    addNode(nodeData) {
        this.saveState();
        const node = new ActionNode(nodeData);
        this.nodes[node.id] = node;

        if (node.parentId && this.nodes[node.parentId]) {
            const parent = this.nodes[node.parentId];
            if (!parent.children.includes(node.id)) {
                parent.children.push(node.id);
            }
        }
        this.autoSyncVariables(node);
        return node;
    }

    removeNode(id) {
        if (id === this.rootId) return false; // Impossible de supprimer la racine
        const node = this.nodes[id];
        if (!node) return false;

        this.saveState();

        // Détacher du parent
        if (node.parentId && this.nodes[node.parentId]) {
            const parent = this.nodes[node.parentId];
            parent.children = parent.children.filter(cid => cid !== id);
        }

        // Supprimer récursivement les enfants
        const deleteRecursive = (targetId) => {
            const target = this.nodes[targetId];
            if (!target) return;
            for (const childId of target.children) {
                deleteRecursive(childId);
            }
            delete this.nodes[targetId];
        };

        deleteRecursive(id);
        return true;
    }

    getNode(id) {
        return this.nodes[id] || null;
    }

    getRoot() {
        return this.nodes[this.rootId] || null;
    }

    // Synchronisation automatique des variables dans le dictionnaire
    autoSyncVariables(node) {
        const allVars = [...(node.inputs || []), ...(node.outputs || [])];
        for (const v of allVars) {
            const cleanVar = v.trim();
            if (cleanVar && !this.dictionary[cleanVar]) {
                // Déduire la nature
                let nature = "INT";
                const isInput = (node.inputs || []).includes(cleanVar);
                const isOutput = (node.outputs || []).includes(cleanVar);
                if (isInput && isOutput) nature = "D/R";
                else if (isInput) nature = "D";
                else if (isOutput) nature = "R";

                this.dictionary[cleanVar] = {
                    type: "reel", // Type par défaut
                    role: "Variable " + cleanVar,
                    nature: nature
                };
            }
        }
    }

    // Réorganisation automatique de l'arbre en coordonnées orthogonales IUT
    autoLayout() {
        this.saveState();
        const root = this.getRoot();
        if (!root) return;

        const LEVEL_HEIGHT = 190;
        const NODE_SPACING = 160;

        const calculateSubtreeWidth = (nodeId) => {
            const node = this.nodes[nodeId];
            if (!node || node.children.length === 0) {
                return node ? Math.max(node.width || 180, 180) : 180;
            }
            let total = 0;
            for (const cid of node.children) {
                total += calculateSubtreeWidth(cid);
            }
            total += (node.children.length - 1) * NODE_SPACING;
            return Math.max(node.width || 180, total);
        };

        const positionSubtree = (nodeId, startX, y) => {
            const node = this.nodes[nodeId];
            if (!node) return;

            const subtreeWidth = calculateSubtreeWidth(nodeId);
            node.x = startX + (subtreeWidth / 2) - ((node.width || 180) / 2);
            node.y = y;

            if (node.children.length > 0) {
                let currentChildX = startX;
                for (const cid of node.children) {
                    const childWidth = calculateSubtreeWidth(cid);
                    positionSubtree(cid, currentChildX, y + LEVEL_HEIGHT);
                    currentChildX += childWidth + NODE_SPACING;
                }
            }
        };

        positionSubtree(root.id, 100, 90);
    }

    // Export au format JSON compatible AlgoForge (.af)
    exportToAlgoForgeJson() {
        return JSON.stringify({
            app: "AlgoForgePro",
            version: "2.0.0",
            exportDate: new Date().toISOString(),
            title: this.title,
            description: this.description,
            dictionary: this.dictionary,
            nodes: this.nodes,
            rootId: this.rootId
        }, null, 2);
    }

    importFromAlgoForgeJson(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if (!data.nodes || !data.rootId) {
                throw new Error("Format de fichier non valide pour un arbre algorithmique.");
            }
            this.saveState();
            this.restoreSnapshot(data);
            return true;
        } catch (e) {
            console.error("Erreur importation:", e);
            return false;
        }
    }
}

class ActionNode {
    constructor(data = {}) {
        this.id = data.id || "node_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
        this.title = data.title || "Nouvelle Action";
        
        // Type de bloc :
        // - 'simple' : Action élémentaire (rectangle simple)
        // - 'composed' : Action composée / sous-programme (rectangle double bordure)
        // - 'condition' : Structure alternative / Si ... Alors ... Sinon (trapèze/pans coupés)
        // - 'choice' : Choix multiple / Selon que
        // - 'loop_for' : Boucle Pour i de 1 à N
        // - 'loop_while' : Boucle Tant que
        // - 'loop_repeat' : Boucle Répéter ... jusqu'à
        this.type = data.type || "simple";

        // Flot des données IUT R1.01
        this.inputs = Array.isArray(data.inputs) ? [...data.inputs] : [];   // { E }
        this.outputs = Array.isArray(data.outputs) ? [...data.outputs] : []; // { S }

        // Détails conditionnels ou itératifs
        this.condition = data.condition || "";
        this.conditionBranch = data.conditionBranch || null; // 'then' | 'else' | null
        this.loopVar = data.loopVar || "i";
        this.loopStart = data.loopStart || "1";
        this.loopEnd = data.loopEnd || "n";
        this.loopStep = data.loopStep || "1";

        // Expression de calcul / code interne (pour la simulation pas-à-pas et la génération de code C)
        this.codeExpression = data.codeExpression || "";

        // Coordonnées et dimensions
        this.x = typeof data.x === "number" ? data.x : 300;
        this.y = typeof data.y === "number" ? data.y : 200;
        this.width = data.width || 190;
        this.height = data.height || 64;

        // Relations hiérarchiques
        this.parentId = data.parentId || null;
        this.children = Array.isArray(data.children) ? [...data.children] : [];
        this.collapsed = !!data.collapsed;
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { AlgorithmicTree, ActionNode };
}
