// -*- coding: utf-8 -*-
/**
 * linter.js - Linter & Analyseur Sémantique Algorithmique IUT R1.01
 * =================================================================
 * Contrôle en temps réel de la validité de l'arbre, de la cohérence
 * des flots de données (E/S), des règles d'Anglet et du dictionnaire.
 */

class AlgorithmicLinter {
    constructor(tree) {
        this.tree = tree;
    }

    audit() {
        const errors = [];
        const warnings = [];
        const root = this.tree.getRoot();

        if (!root) {
            errors.push({
                id: "err_no_root",
                nodeId: null,
                severity: "error",
                title: "Aucun algorithme racine",
                description: "L'arbre doit contenir au moins une action racine principale.",
                fixable: false
            });
            return { errors, warnings, totalErrors: errors.length, totalWarnings: warnings.length };
        }

        const nodes = this.tree.nodes;
        const dict = this.tree.dictionary || {};

        // 1. Audit des variables du dictionnaire
        for (const [varName, info] of Object.entries(dict)) {
            if (!info.role || info.role.trim() === "" || info.role.startsWith("Variable " + varName)) {
                warnings.push({
                    id: `warn_dict_role_${varName}`,
                    nodeId: null,
                    variable: varName,
                    severity: "warning",
                    title: `Rôle manquant pour '${varName}'`,
                    description: `La variable '${varName}' dans le dictionnaire n'a pas de signification ou rôle explicité.`,
                    fixAction: "openDictionary"
                });
            }
        }

        // 2. Audit de chaque nœud
        for (const [id, node] of Object.entries(nodes)) {
            // A. Titre de l'action
            if (!node.title || node.title.trim() === "" || node.title === "Nouvelle Action") {
                warnings.push({
                    id: `warn_title_${id}`,
                    nodeId: id,
                    severity: "warning",
                    title: "Libellé d'action par défaut ou vide",
                    description: `Le nœud (${id}) n'a pas de nom d'action explicite (Verbe à l'infinitif + complément attendu).`,
                    fixAction: "focusNode"
                });
            }

            // B. Variables d'entrées et sorties existantes dans le dictionnaire
            const allNodeVars = [...(node.inputs || []), ...(node.outputs || [])];
            for (const v of allNodeVars) {
                if (!dict[v]) {
                    warnings.push({
                        id: `warn_missing_dict_${id}_${v}`,
                        nodeId: id,
                        variable: v,
                        severity: "warning",
                        title: `Variable '${v}' absente du dictionnaire`,
                        description: `La variable '${v}' est utilisée dans le nœud '${node.title}' mais n'est pas répertoriée dans le dictionnaire des variables.`,
                        fixAction: "addToDictionary",
                        fixPayload: { varName: v }
                    });
                }
            }

            // C. Spécificités par type de nœud
            if (node.type === "composed") {
                if (!node.children || node.children.length === 0) {
                    warnings.push({
                        id: `warn_empty_composed_${id}`,
                        nodeId: id,
                        severity: "warning",
                        title: "Action composée sans décomposition",
                        description: `L'action composée '${node.title}' doit être raffinée en au moins une sous-action enfant.`,
                        fixAction: "addChild"
                    });
                }
            }

            if (node.type === "condition") {
                if (!node.condition || node.condition.trim() === "") {
                    errors.push({
                        id: `err_empty_cond_${id}`,
                        nodeId: id,
                        severity: "error",
                        title: "Condition alternative vide",
                        description: `La structure conditionnelle '${node.title}' nécessite une expression booléenne (ex: reduc > 0).`,
                        fixAction: "editCondition"
                    });
                }
            }

            if (node.type === "loop_while" || node.type === "loop_repeat") {
                if (!node.condition || node.condition.trim() === "") {
                    errors.push({
                        id: `err_empty_loop_cond_${id}`,
                        nodeId: id,
                        severity: "error",
                        title: "Condition de boucle manquante",
                        description: `La boucle '${node.title}' nécessite une condition d'arrêt pour éviter une boucle infinie.`,
                        fixAction: "editCondition"
                    });
                }
            }

            if (node.type === "loop_for") {
                if (!node.loopVar || !node.loopStart || !node.loopEnd) {
                    warnings.push({
                        id: `warn_loop_for_bounds_${id}`,
                        nodeId: id,
                        severity: "warning",
                        title: "Paramètres de boucle Pour incomplets",
                        description: `Vérifiez la variable de boucle et les bornes (début, fin).`,
                        fixAction: "editLoop"
                    });
                }
            }

            // D. Cohérence des flots de données (Conservation du flux IUT)
            if (node.children && node.children.length > 0) {
                // Collecter ce qui est produit par les enfants séquentiellement
                const scopeAvailable = new Set(node.inputs || []);
                for (const childId of node.children) {
                    const child = nodes[childId];
                    if (!child) continue;

                    // Vérifier si les entrées de l'enfant sont disponibles
                    for (const inVar of (child.inputs || [])) {
                        if (!scopeAvailable.has(inVar) && !dict[inVar]?.nature?.includes("D")) {
                            warnings.push({
                                id: `warn_uninitialized_var_${child.id}_${inVar}`,
                                nodeId: child.id,
                                severity: "warning",
                                title: `Donnée d'entrée '${inVar}' non fournie`,
                                description: `Le sous-nœud '${child.title}' requiert '${inVar}' en entrée, mais elle n'est ni déclarée dans les entrées du parent '${node.title}', ni produite par une action précédente.`,
                                fixAction: "addParentInput",
                                fixPayload: { parentId: node.id, varName: inVar }
                            });
                        }
                    }

                    // Les sorties de l'enfant enrichissent le scope pour les suivants
                    for (const outVar of (child.outputs || [])) {
                        scopeAvailable.add(outVar);
                    }
                }
            }
        }

        return {
            errors,
            warnings,
            totalErrors: errors.length,
            totalWarnings: warnings.length,
            summaryBadge: `${errors.length} / ${warnings.length}`,
            isClean: errors.length === 0 && warnings.length === 0
        };
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { AlgorithmicLinter };
}
