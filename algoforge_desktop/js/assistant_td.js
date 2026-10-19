// -*- coding: utf-8 -*-
/**
 * assistant_td.js - Assistant Pédagogique de TD IUT (Kai TD Copilot)
 * ====================================================================
 * Fournit un guidage méthodologique socratique pour les séances de TD
 * de R1.01 (Anglet) : conseils, indices, et jeux de tests aux limites.
 */

class TdPedagogicalAssistant {
    constructor(tree, simulator) {
        this.tree = tree;
        this.simulator = simulator;
    }

    // Générer des jeux de tests recommandés (cas limites et normaux)
    generateTestCases() {
        const dict = this.tree.dictionary || {};
        const varNames = Object.keys(dict);

        const testCases = [];

        if (varNames.includes("prix") && varNames.includes("reduc")) {
            testCases.push({
                name: "Cas Nominal (100 € à 20%)",
                description: "Vérifie le calcul standard avec une remise simple",
                inputs: { prix: 100.0, reduc: 20.0 },
                expected: "prixReduit = 80.00 €"
            });
            testCases.push({
                name: "Remise Nulle (0%)",
                description: "Le prix final doit être strictement égal au prix initial",
                inputs: { prix: 50.0, reduc: 0.0 },
                expected: "prixReduit = 50.00 €"
            });
            testCases.push({
                name: "Gratuité Totale (100%)",
                description: "Le prix final doit valoir 0.00 €",
                inputs: { prix: 75.0, reduc: 100.0 },
                expected: "prixReduit = 0.00 €"
            });
            testCases.push({
                name: "Cas Limite Décimal (19.99 € à 33%)",
                description: "Vérifie la précision des réels (float) sans arrondi parasite",
                inputs: { prix: 19.99, reduc: 33.0 },
                expected: "prixReduit ~ 13.39 €"
            });
        } else if (varNames.includes("note")) {
            testCases.push({
                name: "Note Moyenne (10.0)",
                inputs: { note: 10.0 },
                expected: "Note acceptée"
            });
            testCases.push({
                name: "Borne Inférieure (0.0)",
                inputs: { note: 0.0 },
                expected: "Note acceptée"
            });
            testCases.push({
                name: "Borne Supérieure (20.0)",
                inputs: { note: 20.0 },
                expected: "Note acceptée"
            });
            testCases.push({
                name: "Hors-Borne Négative (-2.5)",
                inputs: { note: -2.5 },
                expected: "Rejeté : redemander saisie"
            });
        } else {
            // Cas générique
            const nominalInputs = {};
            for (const v of varNames) {
                nominalInputs[v] = 10;
            }
            testCases.push({
                name: "Test Automatique Standard",
                description: "Valeurs initiales positives pour test de flux",
                inputs: nominalInputs,
                expected: "Exécution sans blocage"
            });
        }

        return testCases;
    }

    // Conseils méthodologiques selon le contenu de l'arbre
    getMethodologicalAdvice() {
        const advice = [];
        const nodes = this.tree.nodes || {};

        // Règle 1 : Nommage des actions (M. Etcheverry)
        advice.push({
            rule: "Nommage : Verbe à l'Infinitif + Complément",
            tip: "Chaque boîte doit commencer par un verbe d'action à l'infinitif suivi d'un complément direct clair (ex: 'Saisir une note', 'Calculer la moyenne', 'Afficher le statut'). Évitez les noms passifs ou vagues comme 'Moyenne' ou 'Traitement'."
        });

        // Règle 2 : Règle des 3 tiers (Tripartition IUT)
        advice.push({
            rule: "Règle des 3 tiers (Tripartition IUT)",
            tip: "En R1.01, un problème algorithmique se décompose systématiquement en 3 phases chronologiques : 1. Saisie des données, 2. Traitement / Calcul, 3. Affichage des résultats."
        });

        // Règle 3 : Flots de données { E } et { S }
        advice.push({
            rule: "Intégrité des Flots { E } et { S }",
            tip: "Une action ne peut consommer en entrée { E } que des variables initialisées ou saisies au préalable. Si une boîte calcule une nouvelle variable, elle doit obligatoirement figurer dans son flot de sortie { S }."
        });

        // Règle 4 : Passages par adresse
        const composedNodes = Object.values(nodes).filter(n => n.type === "composed" && n.id !== this.tree.rootId);
        if (composedNodes.length > 0) {
            advice.push({
                rule: "Passage par Pointeur en C (Sorties)",
                tip: "Toute variable figurant dans le flot sortant { S } d'un sous-programme doit être passée par adresse (pointeur *ptr) en langage C pour que sa valeur modifiée soit conservée par l'appelant."
            });
        }

        // Règle 5 : Boucles bornées vs non bornées
        const loopNodes = Object.values(nodes).filter(n => n.type.startsWith("loop"));
        if (loopNodes.length > 0) {
            advice.push({
                rule: "Choix de la Structure Itérative",
                tip: "Utilisez une boucle POUR quand le nombre d'itérations est connu à l'avance (ex: parcourir les N cases d'un tableau). Utilisez TANT QUE quand l'arrêt dépend d'un événement imprévisible."
            });
        }

        return advice;
    }

    // Charger un jeu de test dans le simulateur
    loadTestCaseIntoSimulator(testCase) {
        if (!testCase || !testCase.inputs) return;
        this.simulator.prepare(testCase.inputs);
        this.simulator.play(600);
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { TdPedagogicalAssistant };
}
