// -*- coding: utf-8 -*-
/**
 * ai_naming.js - Moteur d'Auto-Nommage Intelligent par IA (AlgoForge Pro)
 * =========================================================================
 * Analyse sémantique instantanée des flots de données {E}/{S}, des verbes
 * d'action et des expressions pour déduire un nom de page précis et pédagogique.
 */

class SmartAiNamingEngine {
    constructor() {
        // Modèles heuristiques d'inférence algorithmique
        this.patterns = [
            {
                name: "Calcul du Prix Réduit",
                tags: ["R1.01", "Arithmétique", "Remise"],
                matcher: (vars, titles) => vars.includes("prix") && (vars.includes("reduc") || vars.includes("remise") || vars.includes("prixreduit"))
            },
            {
                name: "Calcul de TVA et Prix TTC",
                tags: ["R1.01", "Commerce", "TTC"],
                matcher: (vars, titles) => (vars.includes("ht") || vars.includes("tva") || vars.includes("ttc"))
            },
            {
                name: "Échange de Deux Variables",
                tags: ["R1.01", "Bases", "Permutation"],
                matcher: (vars, titles) => (vars.includes("temp") || vars.includes("tmp")) && (vars.includes("a") || vars.includes("b") || vars.includes("x") || vars.includes("y"))
            },
            {
                name: "Saisie Contrôlée d'une Note",
                tags: ["R1.01", "Boucle", "Validation"],
                matcher: (vars, titles) => vars.includes("note") || titles.some(t => t.includes("saisir") && t.includes("note") || t.includes("valide"))
            },
            {
                name: "Recherche du Maximum",
                tags: ["R1.01", "Comparaison", "Extremum"],
                matcher: (vars, titles) => vars.includes("max") || vars.includes("maximum") || titles.some(t => t.includes("max"))
            },
            {
                name: "Recherche du Minimum",
                tags: ["R1.01", "Comparaison", "Extremum"],
                matcher: (vars, titles) => vars.includes("min") || vars.includes("minimum") || titles.some(t => t.includes("min"))
            },
            {
                name: "Calcul de Somme et Moyenne",
                tags: ["R1.01", "Statistiques", "Cumul"],
                matcher: (vars, titles) => (vars.includes("somme") || vars.includes("cumul")) && (vars.includes("moyenne") || vars.includes("moy"))
            },
            {
                name: "Recherche Séquentielle dans un Tableau",
                tags: ["R1.01", "Tableau", "Recherche"],
                matcher: (vars, titles) => (vars.includes("tab") || vars.includes("tableau")) && (vars.includes("trouve") || vars.includes("cible") || vars.includes("val"))
            },
            {
                name: "Calcul de Factorielle",
                tags: ["R1.01", "Maths", "Boucle"],
                matcher: (vars, titles) => vars.includes("fact") || vars.includes("factorielle")
            },
            {
                name: "Calcul du PGCD (Algorithme d'Euclide)",
                tags: ["R1.01", "Arithmétique", "Euclide"],
                matcher: (vars, titles) => vars.includes("pgcd") || (vars.includes("reste") && vars.includes("diviseur"))
            }
        ];
    }

    // Analyse l'arbre algorithmique et propose le meilleur titre
    suggestTitle(tree) {
        if (!tree) return { title: "Exercice d'Algorithmique", reason: "Arbre non initialisé", confidence: 0.1 };

        // 1. Extraire toutes les variables normalisées
        const allVars = new Set();
        const allTitles = [];

        for (const [varName] of Object.entries(tree.dictionary || {})) {
            allVars.add(varName.toLowerCase().trim());
        }

        for (const [_, node] of Object.entries(tree.nodes || {})) {
            (node.inputs || []).forEach(v => allVars.add(v.toLowerCase().trim()));
            (node.outputs || []).forEach(v => allVars.add(v.toLowerCase().trim()));
            if (node.title) allTitles.push(node.title.toLowerCase());
        }

        const varList = Array.from(allVars);

        // 2. Tester les motifs prédéfinis du cursus
        for (const pattern of this.patterns) {
            if (pattern.matcher(varList, allTitles)) {
                return {
                    title: pattern.name,
                    reason: `Détecté par analyse des variables : ${varList.slice(0, 4).join(', ')}`,
                    tags: pattern.tags,
                    confidence: 0.95
                };
            }
        }

        // 3. Inférence basée sur le nœud racine s'il existe et a un titre significatif
        const root = tree.getRoot();
        if (root && root.title && root.title !== "Nouvelle Action" && root.title !== "Titre de l'algorithme" && root.title !== "Afficher prix reduit") {
            const formattedTitle = root.title.charAt(0).toUpperCase() + root.title.slice(1);
            return {
                title: formattedTitle,
                reason: "Inférence directe depuis l'action racine principale",
                tags: ["R1.01", "Personnalisé"],
                confidence: 0.85
            };
        }

        // 4. Inférence synthétique à partir des verbes d'actions
        const verbs = [];
        for (const t of allTitles) {
            const firstWord = t.split(" ")[0];
            if (["calculer", "saisir", "afficher", "trier", "verifier", "trouver", "permuter"].includes(firstWord)) {
                verbs.push(firstWord);
            }
        }

        if (verbs.length > 0 && varList.length > 0) {
            const mainVerb = verbs[0].charAt(0).toUpperCase() + verbs[0].slice(1);
            const mainVar = varList[0];
            return {
                title: `${mainVerb} de ${mainVar}`,
                reason: `Inférence combinée : verbe '${verbs[0]}' et variable clé '${mainVar}'`,
                tags: ["R1.01", "Généré"],
                confidence: 0.70
            };
        }

        // Titre par défaut propre
        const pageNumber = Math.floor(Math.random() * 90) + 10;
        return {
            title: `Exercice TD ${pageNumber}`,
            reason: "Aucune structure sémantique identifiable pour le moment",
            tags: ["R1.01", "TD"],
            confidence: 0.40
        };
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { SmartAiNamingEngine };
}
