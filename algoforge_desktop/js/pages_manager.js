// -*- coding: utf-8 -*-
/**
 * pages_manager.js - Gestionnaire Multi-Pages & Carnet de TD (AlgoForge Pro)
 * ===========================================================================
 * Permet de gérer une collection d'exercices d'algorithmique (pages de TD/TP)
 * avec stockage local persistant, isolation des arbres et auto-nommage IA.
 */

class PagesManager {
    constructor(treeInstance, onPageChange = null) {
        this.tree = treeInstance;
        this.onPageChange = onPageChange;
        this.namingEngine = new SmartAiNamingEngine();

        this.storageKey = "af_notebook_v2";
        this.pages = [];
        this.activePageId = null;

        this.init();
    }

    init() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed.pages) && parsed.pages.length > 0) {
                    this.pages = parsed.pages;
                    if (!this.pages.find(p => p.id === "page_menu_choix") && typeof ALGORITHMIC_TEMPLATES !== "undefined" && ALGORITHMIC_TEMPLATES["menu_choix"]) {
                        this.pages.push({
                            id: "page_menu_choix",
                            title: "Menu et Choix Multiple",
                            createdAt: Date.now() - 450000,
                            updatedAt: Date.now(),
                            tags: ["TD 2", "Selon"],
                            notes: "Aiguillage multiple selon la variable choix (Cas 1, 2, 3 et Autrement).",
                            treeData: ALGORITHMIC_TEMPLATES["menu_choix"].tree
                        });
                        this.save();
                    }
                    this.activePageId = parsed.activePageId || this.pages[0].id;
                    this.loadActivePageIntoTree();
                    return;
                }
            } catch (e) {
                console.error("Erreur chargement carnet:", e);
            }
        }

        // Première initialisation avec 4 pages de TD réelles
        this.pages = [
            {
                id: "page_prix_reduit",
                title: "Calcul du Prix Réduit",
                createdAt: Date.now() - 3600000,
                updatedAt: Date.now(),
                tags: ["TD 1", "Arithmétique"],
                notes: "Exercice type R1.01 : Calcul de remise commerciale en pourcentage.",
                treeData: ALGORITHMIC_TEMPLATES["prix_reduit"].tree
            },
            {
                id: "page_echange",
                title: "Permutation de Deux Variables",
                createdAt: Date.now() - 1800000,
                updatedAt: Date.now(),
                tags: ["TD 1", "Bases"],
                notes: "Utilisation obligatoire d'une variable intermédiaire temp.",
                treeData: ALGORITHMIC_TEMPLATES["echange_valeurs"].tree
            },
            {
                id: "page_saisie",
                title: "Saisie Contrôlée d'une Note",
                createdAt: Date.now() - 900000,
                updatedAt: Date.now(),
                tags: ["TD 2", "Boucles"],
                notes: "Validation stricte de la note entre 0.0 et 20.0.",
                treeData: ALGORITHMIC_TEMPLATES["saisie_controlee"].tree
            },
            {
                id: "page_menu_choix",
                title: "Menu et Choix Multiple",
                createdAt: Date.now() - 450000,
                updatedAt: Date.now(),
                tags: ["TD 2", "Selon"],
                notes: "Aiguillage multiple selon la variable choix (Cas 1, 2, 3 et Autrement).",
                treeData: ALGORITHMIC_TEMPLATES["menu_choix"].tree
            }
        ];

        this.activePageId = "page_prix_reduit";
        this.save();
        this.loadActivePageIntoTree();
    }

    save() {
        // Enregistrer l'état courant de l'arbre dans la page active avant sauvegarde
        const activePage = this.getActivePage();
        if (activePage) {
            activePage.treeData = JSON.parse(this.tree.exportToAlgoForgeJson());
            activePage.updatedAt = Date.now();
        }

        const payload = {
            version: "1.0.0",
            savedAt: Date.now(),
            activePageId: this.activePageId,
            pages: this.pages
        };

        try {
            localStorage.setItem(this.storageKey, JSON.stringify(payload));
        } catch (e) {
            console.warn("Écriture localStorage limitée:", e);
        }
    }

    getActivePage() {
        return this.pages.find(p => p.id === this.activePageId) || null;
    }

    selectPage(pageId) {
        if (this.activePageId === pageId) return;

        // 1. Sauvegarder la page sortante
        this.save();

        // 2. Basculer sur la nouvelle page
        const target = this.pages.find(p => p.id === pageId);
        if (!target) return;

        this.activePageId = pageId;
        this.loadActivePageIntoTree();
        this.save();

        if (typeof this.onPageChange === "function") {
            this.onPageChange(target);
        }
    }

    loadActivePageIntoTree() {
        const page = this.getActivePage();
        if (!page || !page.treeData) return;

        this.tree.restoreSnapshot(page.treeData);
        this.tree.title = page.title;
    }

    createPage(title = null, templateKey = null) {
        this.save();

        let initialTreeData = null;
        let finalTitle = title;

        if (templateKey && ALGORITHMIC_TEMPLATES[templateKey]) {
            initialTreeData = ALGORITHMIC_TEMPLATES[templateKey].tree;
            if (!finalTitle) finalTitle = ALGORITHMIC_TEMPLATES[templateKey].name.replace(/^[^a-zA-Z0-9À-ÿ]+/, '').trim();
        } else {
            // Arbre vierge avec une action simple
            initialTreeData = {
                title: finalTitle || "Sans titre",
                description: "Nouvel exercice d'algorithmique",
                dictionary: {},
                rootId: "root",
                nodes: {
                    "root": {
                        id: "root",
                        title: "Nouvelle Action",
                        type: "composed",
                        inputs: [],
                        outputs: [],
                        x: 480,
                        y: 90,
                        children: []
                    }
                }
            };
        }

        const newId = "page_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
        const newPage = {
            id: newId,
            title: finalTitle || "Sans titre",
            createdAt: Date.now(),
            updatedAt: Date.now(),
            tags: ["TD"],
            notes: "",
            treeData: initialTreeData
        };

        this.pages.unshift(newPage); // Ajouter en tête de liste
        this.activePageId = newId;
        this.loadActivePageIntoTree();
        this.save();

        if (typeof this.onPageChange === "function") {
            this.onPageChange(newPage);
        }

        return newPage;
    }

    renamePage(pageId, newTitle) {
        const page = this.pages.find(p => p.id === pageId);
        if (!page) return;

        page.title = newTitle.trim() || "Sans titre";
        page.updatedAt = Date.now();

        if (page.id === this.activePageId) {
            this.tree.title = page.title;
        }

        this.save();
    }

    deletePage(pageId) {
        if (this.pages.length <= 1) {
            alert("Impossible de supprimer la seule page restante.");
            return false;
        }

        const index = this.pages.findIndex(p => p.id === pageId);
        if (index === -1) return false;

        this.pages.splice(index, 1);

        if (this.activePageId === pageId) {
            this.activePageId = this.pages[0].id;
            this.loadActivePageIntoTree();
        }

        this.save();

        if (typeof this.onPageChange === "function") {
            this.onPageChange(this.getActivePage());
        }

        return true;
    }

    // Auto-nommage par IA pour la page active
    autoNameCurrentPage() {
        const page = this.getActivePage();
        if (!page) return null;

        const suggestion = this.namingEngine.suggestTitle(this.tree);
        if (suggestion && suggestion.title) {
            this.renamePage(page.id, suggestion.title);
            return suggestion;
        }
        return null;
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { PagesManager };
}
