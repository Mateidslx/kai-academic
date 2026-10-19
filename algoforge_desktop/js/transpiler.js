// -*- coding: utf-8 -*-
/**
 * transpiler.js - Générateur de Code Multi-Langages (IUT R1.01)
 * ==============================================================
 * Génère instantanément :
 * 1. Le Pseudo-code IUT normalisé (avec LEXIQUE, ACTION, SI/POUR/TANTQUE)
 * 2. Le Langage C Allman (Strictement conforme à l'IUT d'Anglet R1.01)
 * 3. Le Code Python 3 prêt à être exécuté
 */

class AlgorithmicTranspiler {
    constructor(tree) {
        this.tree = tree;
    }

    // Mapping des types IUT vers types C
    getCType(iutType) {
        switch ((iutType || "").toLowerCase()) {
            case "entier": return "int";
            case "reel": return "float";
            case "booleen": return "int"; // ou bool avec stdbool.h
            case "caractere": return "char";
            case "chaine": return "char*";
            case "tableau": return "int*";
            default: return "float";
        }
    }

    // Mapping des types IUT vers types Python
    getPyType(iutType) {
        switch ((iutType || "").toLowerCase()) {
            case "entier": return "int";
            case "reel": return "float";
            case "booleen": return "bool";
            case "caractere": return "str";
            case "chaine": return "str";
            case "tableau": return "list";
            default: return "float";
        }
    }

    // Nettoyer un identifiant (nom de fonction ou variable C valide)
    toIdentifier(str) {
        return (str || "action")
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Enlever accents
            .replace(/[^a-z0-9_]/g, "_")
            .replace(/^_+|_+$/g, "")
            .replace(/_+/g, "_") || "action_unnamed";
    }

    // ==========================================
    // 1. GÉNÉRATION DU PSEUDO-CODE IUT NORMALISÉ
    // ==========================================
    generatePseudoCode() {
        const root = this.tree.getRoot();
        if (!root) return "// Arbre vide";

        let lines = [];
        lines.push(`ALGORITHME ${this.toIdentifier(this.tree.title)}`);
        lines.push(`// Description : ${this.tree.description}`);
        lines.push(`// Conçu avec AlgoForge Pro (Conforme IUT d'Anglet - R1.01)`);
        lines.push("");

        // Lexique global
        lines.push("LEXIQUE");
        const dict = this.tree.dictionary || {};
        for (const [varName, info] of Object.entries(dict)) {
            const role = info.role ? ` // ${info.role}` : "";
            lines.push(`    ${varName} : ${info.type || "reel"}${role}`);
        }
        lines.push("");

        // Définition des sous-actions (si composées)
        const generateNodeActions = (nodeId) => {
            const node = this.tree.nodes[nodeId];
            if (!node) return;

            if (node.type === "composed" && node.id !== this.tree.rootId) {
                const inputsStr = (node.inputs || []).join(", ");
                const outputsStr = (node.outputs || []).join(", ");
                lines.push(`ACTION ${this.toIdentifier(node.title)}(E: {${inputsStr}}, S: {${outputsStr}})`);
                lines.push("DEBUT");
                for (const cid of node.children) {
                    generateNodeExecution(cid, "    ");
                }
                lines.push("FIN ACTION");
                lines.push("");
            }

            for (const cid of (node.children || [])) {
                generateNodeActions(cid);
            }
        };

        const generateNodeExecution = (nodeId, indent = "    ") => {
            const node = this.tree.nodes[nodeId];
            if (!node) return;

            lines.push(`${indent}// Étape : ${node.title}`);

            if (node.type === "simple") {
                if (node.codeExpression && node.codeExpression.trim()) {
                    const exprLines = node.codeExpression.split("\n");
                    for (const l of exprLines) {
                        lines.push(`${indent}${l}`);
                    }
                } else {
                    lines.push(`${indent}${this.toIdentifier(node.title)}()`);
                }
            } else if (node.type === "composed") {
                const args = [...(node.inputs || []), ...(node.outputs || [])].join(", ");
                lines.push(`${indent}${this.toIdentifier(node.title)}(${args})`);
            } else if (node.type === "condition") {
                lines.push(`${indent}SI (${node.condition || "condition"}) ALORS`);
                const thenChild = node.children[0];
                const elseChild = node.children[1];
                if (thenChild) generateNodeExecution(thenChild, indent + "    ");
                if (elseChild) {
                    lines.push(`${indent}SINON`);
                    generateNodeExecution(elseChild, indent + "    ");
                }
                lines.push(`${indent}FIN SI`);
            } else if (node.type === "loop_for") {
                lines.push(`${indent}POUR ${node.loopVar || "i"} DE ${node.loopStart || "1"} A ${node.loopEnd || "n"} FAIRE`);
                for (const cid of node.children) {
                    generateNodeExecution(cid, indent + "    ");
                }
                lines.push(`${indent}FIN POUR`);
            } else if (node.type === "loop_while") {
                lines.push(`${indent}TANT QUE (${node.condition || "condition"}) FAIRE`);
                for (const cid of node.children) {
                    generateNodeExecution(cid, indent + "    ");
                }
                lines.push(`${indent}FIN TANT QUE`);
            } else if (node.type === "loop_repeat") {
                lines.push(`${indent}REPETER`);
                for (const cid of node.children) {
                    generateNodeExecution(cid, indent + "    ");
                }
                lines.push(`${indent}JUSQU'A (${node.condition || "condition"})`);
            }
        };

        generateNodeActions(root.id);

        // Bloc principal
        lines.push("DEBUT");
        for (const cid of root.children) {
            generateNodeExecution(cid, "    ");
        }
        lines.push("FIN ALGORITHME");

        return lines.join("\n");
    }

    // ==========================================
    // 2. GÉNÉRATION DU CODE C ALLMAN STRICT (R1.01)
    // ==========================================
    generateCCode() {
        const root = this.tree.getRoot();
        if (!root) return "// Arbre vide";

        const dict = this.tree.dictionary || {};
        let lines = [];

        lines.push("/**");
        lines.push(` * @file ${this.toIdentifier(this.tree.title)}.c`);
        lines.push(` * @brief ${this.tree.description}`);
        lines.push(" * @author Matéi de Saint Leger - BUT 1 Informatique (Campus d'Anglet)");
        lines.push(" * @note Norme stricte R1.01 : Style Allman, typage explicite, zero fuite memoire");
        lines.push(" */");
        lines.push("");
        lines.push("#include <stdio.h>");
        lines.push("#include <stdlib.h>");
        lines.push("#include <stdbool.h>");
        lines.push("");

        // Prototypes des sous-fonctions
        const subFunctions = [];
        for (const [id, node] of Object.entries(this.tree.nodes)) {
            if (node.type === "composed" && id !== this.tree.rootId) {
                subFunctions.push(node);
            }
        }

        if (subFunctions.length > 0) {
            lines.push("/* ========================================================================= */");
            lines.push("/* PROTOTYPES DES SOUS-PROGRAMMES (IUT R1.01)                                 */");
            lines.push("/* ========================================================================= */");
            for (const fn of subFunctions) {
                const params = [];
                for (const inVar of (fn.inputs || [])) {
                    params.push(`${this.getCType(dict[inVar]?.type)} ${inVar}`);
                }
                for (const outVar of (fn.outputs || [])) {
                    // Passage par adresse pour les sorties en C
                    params.push(`${this.getCType(dict[outVar]?.type)} *ptr_${outVar}`);
                }
                const paramStr = params.length > 0 ? params.join(", ") : "void";
                lines.push(`void ${this.toIdentifier(fn.title)}(${paramStr});`);
            }
            lines.push("");
        }

        // Implémentation du MAIN
        lines.push("/* ========================================================================= */");
        lines.push("/* PROGRAMME PRINCIPAL                                                       */");
        lines.push("/* ========================================================================= */");
        lines.push("int main(void)");
        lines.push("{");

        // 1. Déclaration des variables avec initialisation défensive
        lines.push("    /* --- 1. Dictionnaire des variables (Allocation automatique sur la pile) --- */");
        for (const [varName, info] of Object.entries(dict)) {
            const cType = this.getCType(info.type);
            const initVal = cType === "float" ? "0.0f" : (cType === "int" ? "0" : "0");
            lines.push(`    ${cType} ${varName} = ${initVal}; /* ${info.role || varName} */`);
        }
        lines.push("");

        // 2. Déroulement séquentiel des enfants de la racine
        const generateCNode = (nodeId, indent = "    ") => {
            const node = this.tree.nodes[nodeId];
            if (!node) return;

            lines.push(`${indent}/* --- ${node.title} --- */`);

            if (node.type === "simple") {
                if (node.codeExpression && node.codeExpression.trim()) {
                    const cLines = node.codeExpression.split("\n");
                    for (const l of cLines) {
                        let cleanLine = l.trim();
                        // Remplacer fonctions pseudo-code par syntaxe C
                        if (cleanLine.startsWith("saisir(") && cleanLine.endsWith(");")) {
                            const target = cleanLine.replace("saisir(", "").replace(");", "").trim();
                            const fmt = this.getCType(dict[target]?.type) === "float" ? "%f" : "%d";
                            lines.push(`${indent}printf("Veuillez saisir ${target} : ");`);
                            lines.push(`${indent}scanf("${fmt}", &${target});`);
                        } else if (cleanLine.startsWith("afficher(") && cleanLine.endsWith(");")) {
                            lines.push(`${indent}printf("Resultat : %f\\n", prixReduit);`);
                        } else {
                            if (!cleanLine.endsWith(";")) cleanLine += ";";
                            lines.push(`${indent}${cleanLine}`);
                        }
                    }
                } else {
                    lines.push(`${indent}/* Traitement elementaire : ${node.title} */`);
                }
            } else if (node.type === "composed") {
                const args = [];
                for (const inVar of (node.inputs || [])) args.push(inVar);
                for (const outVar of (node.outputs || [])) args.push(`&${outVar}`);
                lines.push(`${indent}${this.toIdentifier(node.title)}(${args.join(", ")});`);
            } else if (node.type === "condition") {
                lines.push(`${indent}if (${node.condition || "1"})`);
                lines.push(`${indent}{`);
                if (node.children[0]) generateCNode(node.children[0], indent + "    ");
                lines.push(`${indent}}`);
                if (node.children[1]) {
                    lines.push(`${indent}else`);
                    lines.push(`${indent}{`);
                    generateCNode(node.children[1], indent + "    ");
                    lines.push(`${indent}}`);
                }
            } else if (node.type === "loop_for") {
                const v = node.loopVar || "i";
                lines.push(`${indent}for (${v} = ${node.loopStart || 1}; ${v} <= ${node.loopEnd || 10}; ${v}++)`);
                lines.push(`${indent}{`);
                for (const cid of node.children) generateCNode(cid, indent + "    ");
                lines.push(`${indent}}`);
            } else if (node.type === "loop_while") {
                lines.push(`${indent}while (${node.condition || "0"})`);
                lines.push(`${indent}{`);
                for (const cid of node.children) generateCNode(cid, indent + "    ");
                lines.push(`${indent}}`);
            }
        };

        for (const cid of root.children) {
            generateCNode(cid, "    ");
        }

        lines.push("");
        lines.push("    return 0;");
        lines.push("}");
        lines.push("");

        // Implémentation des sous-fonctions
        for (const fn of subFunctions) {
            const params = [];
            for (const inVar of (fn.inputs || [])) params.push(`${this.getCType(dict[inVar]?.type)} ${inVar}`);
            for (const outVar of (fn.outputs || [])) params.push(`${this.getCType(dict[outVar]?.type)} *ptr_${outVar}`);
            const paramStr = params.length > 0 ? params.join(", ") : "void";

            lines.push(`void ${this.toIdentifier(fn.title)}(${paramStr})`);
            lines.push("{");
            for (const cid of fn.children) {
                generateCNode(cid, "    ");
            }
            lines.push("}");
            lines.push("");
        }

        return lines.join("\n");
    }

    // ==========================================
    // 3. GÉNÉRATION DU CODE PYTHON 3
    // ==========================================
    generatePythonCode() {
        const root = this.tree.getRoot();
        if (!root) return "# Arbre vide";

        let lines = [];
        lines.push("#!/usr/bin/env python3");
        lines.push("# -*- coding: utf-8 -*-");
        lines.push(`"""${this.tree.title} - ${this.tree.description}`);
        lines.push("Généré par AlgoForge Pro - Campus d'Anglet");
        lines.push('"""');
        lines.push("");

        lines.push("def main():");
        lines.push("    # --- Dictionnaire des variables ---");
        for (const [varName, info] of Object.entries(this.tree.dictionary || {})) {
            lines.push(`    ${varName}: ${this.getPyType(info.type)} = 0.0  # ${info.role || varName}`);
        }
        lines.push("");

        const generatePyNode = (nodeId, indent = "    ") => {
            const node = this.tree.nodes[nodeId];
            if (!node) return;

            lines.push(`${indent}# ${node.title}`);
            if (node.type === "simple") {
                if (node.codeExpression && node.codeExpression.trim()) {
                    for (const l of node.codeExpression.split("\n")) {
                        let clean = l.trim().replace(/;$/, "");
                        if (clean.startsWith("saisir(") && clean.endsWith(")")) {
                            const v = clean.replace("saisir(", "").replace(")", "").trim();
                            lines.push(`${indent}${v} = float(input(f"Entrez ${v} : "))`);
                        } else if (clean.startsWith("afficher(") && clean.endsWith(")")) {
                            lines.push(`${indent}print(f"Prix réduit calculé : {prixReduit:.2f} €")`);
                        } else {
                            lines.push(`${indent}${clean}`);
                        }
                    }
                } else {
                    lines.push(`${indent}pass`);
                }
            } else if (node.type === "composed") {
                for (const cid of node.children) generatePyNode(cid, indent);
            } else if (node.type === "condition") {
                lines.push(`${indent}if ${node.condition || "True"}:`);
                if (node.children[0]) generatePyNode(node.children[0], indent + "    ");
                else lines.push(`${indent}    pass`);
                if (node.children[1]) {
                    lines.push(`${indent}else:`);
                    generatePyNode(node.children[1], indent + "    ");
                }
            } else if (node.type === "loop_for") {
                lines.push(`${indent}for ${node.loopVar || "i"} in range(${node.loopStart || 1}, ${node.loopEnd || 10} + 1):`);
                for (const cid of node.children) generatePyNode(cid, indent + "    ");
            }
        };

        for (const cid of root.children) {
            generatePyNode(cid, "    ");
        }

        lines.push("");
        lines.push("if __name__ == '__main__':");
        lines.push("    main()");

        return lines.join("\n");
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { AlgorithmicTranspiler };
}
