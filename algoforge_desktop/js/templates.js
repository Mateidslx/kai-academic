// -*- coding: utf-8 -*-
/**
 * templates.js - Bibliothèque de Patrons Algorithmiques Standards IUT R1.01
 * =========================================================================
 * Modèles officiels de l'IUT de Bayonne et du Pays Basque (Campus d'Anglet)
 */

const ALGORITHMIC_TEMPLATES = {
    // 1. Patron exact de la capture : Calcul du prix réduit
    "prix_reduit": {
        id: "prix_reduit",
        name: "🏷️ Calcul du Prix Réduit (Capture d'écran)",
        description: "Décomposition descendante avec calcul de remise commerciale en pourcentage.",
        tree: {
            title: "Afficher prix reduit",
            description: "Calcul d'un montant après déduction d'un pourcentage de remise",
            dictionary: {
                "prix": { type: "reel", role: "Prix d'origine en euros", nature: "D" },
                "reduc": { type: "reel", role: "Taux de réduction en %", nature: "D" },
                "prixReduit": { type: "reel", role: "Prix net final à payer", nature: "R" }
            },
            rootId: "root",
            nodes: {
                "root": {
                    id: "root",
                    title: "Afficher prix reduit",
                    type: "composed",
                    inputs: ["prix", "reduc"],
                    outputs: ["prixReduit"],
                    x: 480,
                    y: 90,
                    children: ["saisie", "calcul", "affichage"]
                },
                "saisie": {
                    id: "saisie",
                    parentId: "root",
                    title: "Saisir prix et remise",
                    type: "simple",
                    inputs: [],
                    outputs: ["prix", "reduc"],
                    codeExpression: "saisir(prix);\nsaisir(reduc);",
                    x: 180,
                    y: 280,
                    children: []
                },
                "calcul": {
                    id: "calcul",
                    parentId: "root",
                    title: "Calculer montant reduit",
                    type: "simple",
                    inputs: ["prix", "reduc"],
                    outputs: ["prixReduit"],
                    codeExpression: "prixReduit = prix * (1.0 - (reduc / 100.0));",
                    x: 480,
                    y: 280,
                    children: []
                },
                "affichage": {
                    id: "affichage",
                    parentId: "root",
                    title: "Afficher le prix final",
                    type: "simple",
                    inputs: ["prixReduit"],
                    outputs: [],
                    codeExpression: 'afficher("Prix reduit : ", prixReduit);',
                    x: 780,
                    y: 280,
                    children: []
                }
            }
        }
    },

    // 2. Échange de deux valeurs
    "echange_valeurs": {
        id: "echange_valeurs",
        name: "🔄 Échange de deux valeurs (Permutation)",
        description: "Utilisation d'une variable intermédiaire temporaire (tampon).",
        tree: {
            title: "Echanger deux valeurs",
            description: "Permute le contenu des variables a et b grâce à une variable tampon",
            dictionary: {
                "a": { type: "entier", role: "Première valeur", nature: "D/R" },
                "b": { type: "entier", role: "Deuxième valeur", nature: "D/R" },
                "temp": { type: "entier", role: "Variable tampon intermédiaire", nature: "INT" }
            },
            rootId: "root",
            nodes: {
                "root": {
                    id: "root",
                    title: "Permuter deux entiers",
                    type: "composed",
                    inputs: ["a", "b"],
                    outputs: ["a", "b"],
                    x: 480,
                    y: 90,
                    children: ["save_temp", "assign_b", "assign_a"]
                },
                "save_temp": {
                    id: "save_temp",
                    parentId: "root",
                    title: "Sauvegarder a dans temp",
                    type: "simple",
                    inputs: ["a"],
                    outputs: ["temp"],
                    codeExpression: "temp = a;",
                    x: 250,
                    y: 280,
                    children: []
                },
                "assign_b": {
                    id: "assign_b",
                    parentId: "root",
                    title: "Affecter b a a",
                    type: "simple",
                    inputs: ["b"],
                    outputs: ["a"],
                    codeExpression: "a = b;",
                    x: 480,
                    y: 280,
                    children: []
                },
                "assign_a": {
                    id: "assign_a",
                    parentId: "root",
                    title: "Affecter temp a b",
                    type: "simple",
                    inputs: ["temp"],
                    outputs: ["b"],
                    codeExpression: "b = temp;",
                    x: 710,
                    y: 280,
                    children: []
                }
            }
        }
    },

    // 3. Saisie contrôlée
    "saisie_controlee": {
        id: "saisie_controlee",
        name: "🛡️ Saisie Contrôlée (Validation de note)",
        description: "Boucle de vérification forçant la saisie d'une note valide entre 0 et 20.",
        tree: {
            title: "Saisie controlee d'une note",
            description: "Répète la saisie jusqu'à ce que la valeur soit dans l'intervalle [0, 20]",
            dictionary: {
                "note": { type: "reel", role: "Note de l'étudiant comprise entre 0 et 20", nature: "R" }
            },
            rootId: "root",
            nodes: {
                "root": {
                    id: "root",
                    title: "Obtenir note valide",
                    type: "composed",
                    inputs: [],
                    outputs: ["note"],
                    x: 480,
                    y: 90,
                    children: ["boucle_repeter"]
                },
                "boucle_repeter": {
                    id: "boucle_repeter",
                    parentId: "root",
                    title: "Repeter saisie",
                    type: "loop_repeat",
                    condition: "note >= 0 && note <= 20",
                    inputs: [],
                    outputs: ["note"],
                    x: 480,
                    y: 280,
                    children: ["saisir_action"]
                },
                "saisir_action": {
                    id: "saisir_action",
                    parentId: "boucle_repeter",
                    title: "Saisir une note",
                    type: "simple",
                    inputs: [],
                    outputs: ["note"],
                    codeExpression: "saisir(note);",
                    x: 480,
                    y: 470,
                    children: []
                }
            }
        }
    },

    // 4. Recherche de Maximum
    "recherche_maximum": {
        id: "recherche_maximum",
        name: "🏆 Recherche du Maximum",
        description: "Trouve la plus grande valeur parmi n éléments par comparaison successive.",
        tree: {
            title: "Determiner le maximum",
            description: "Compare un nouveau nombre au maximum courant",
            dictionary: {
                "x": { type: "reel", role: "Valeur actuelle", nature: "D" },
                "max": { type: "reel", role: "Plus grande valeur rencontree", nature: "D/R" }
            },
            rootId: "root",
            nodes: {
                "root": {
                    id: "root",
                    title: "Actualiser maximum",
                    type: "composed",
                    inputs: ["x", "max"],
                    outputs: ["max"],
                    x: 480,
                    y: 90,
                    children: ["test_condition"]
                },
                "test_condition": {
                    id: "test_condition",
                    parentId: "root",
                    title: "Si x depasse max",
                    type: "condition",
                    condition: "x > max",
                    inputs: ["x", "max"],
                    outputs: ["max"],
                    x: 480,
                    y: 280,
                    children: ["maj_max"]
                },
                "maj_max": {
                    id: "maj_max",
                    parentId: "test_condition",
                    title: "Mettre a jour max",
                    type: "simple",
                    inputs: ["x"],
                    outputs: ["max"],
                    codeExpression: "max = x;",
                    x: 480,
                    y: 470,
                    children: []
                }
            }
        }
    },

    // 5. Choix Multiple (Selon que... Cas... / Switch)
    "menu_choix": {
        id: "menu_choix",
        name: "🔀 Choix Multiple (Selon que... Cas... / Switch)",
        description: "Aiguillage à branches multiples selon la valeur discrète d'une variable de choix.",
        tree: {
            title: "Aiguiller selon le choix",
            description: "Exécute une action spécifique selon le code menu saisi par l'utilisateur",
            dictionary: {
                "choix": { type: "entier", role: "Code action choisi (1, 2, 3 ou autre)", nature: "D" },
                "resultat": { type: "chaine", role: "Message ou statut de l'opération", nature: "R" }
            },
            rootId: "root",
            nodes: {
                "root": {
                    id: "root",
                    title: "Traiter choix menu",
                    type: "composed",
                    inputs: ["choix"],
                    outputs: ["resultat"],
                    x: 480,
                    y: 90,
                    children: ["selon_choix"]
                },
                "selon_choix": {
                    id: "selon_choix",
                    parentId: "root",
                    title: "Aiguiller action",
                    type: "choice",
                    switchExpr: "choix",
                    inputs: ["choix"],
                    outputs: ["resultat"],
                    x: 480,
                    y: 280,
                    children: ["cas_ajouter", "cas_modifier", "cas_supprimer", "cas_autrement"]
                },
                "cas_ajouter": {
                    id: "cas_ajouter",
                    parentId: "selon_choix",
                    title: "Ajouter element",
                    type: "simple",
                    caseValue: "1",
                    inputs: [],
                    outputs: ["resultat"],
                    codeExpression: 'resultat = "Element ajoute avec succes";',
                    x: 120,
                    y: 470,
                    children: []
                },
                "cas_modifier": {
                    id: "cas_modifier",
                    parentId: "selon_choix",
                    title: "Modifier element",
                    type: "simple",
                    caseValue: "2",
                    inputs: [],
                    outputs: ["resultat"],
                    codeExpression: 'resultat = "Element modifie";',
                    x: 360,
                    y: 470,
                    children: []
                },
                "cas_supprimer": {
                    id: "cas_supprimer",
                    parentId: "selon_choix",
                    title: "Supprimer element",
                    type: "simple",
                    caseValue: "3",
                    inputs: [],
                    outputs: ["resultat"],
                    codeExpression: 'resultat = "Element supprime";',
                    x: 600,
                    y: 470,
                    children: []
                },
                "cas_autrement": {
                    id: "cas_autrement",
                    parentId: "selon_choix",
                    title: "Gerer choix invalide",
                    type: "simple",
                    caseValue: "Autrement",
                    inputs: [],
                    outputs: ["resultat"],
                    codeExpression: 'resultat = "Erreur: choix non reconnu";',
                    x: 840,
                    y: 470,
                    children: []
                }
            }
        }
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = { ALGORITHMIC_TEMPLATES };
}
