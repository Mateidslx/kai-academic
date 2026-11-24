/**
 * Programme : Trier un tableau d'étudiants (Défi Individuel S1.01 — Corrigé Étalon M. Patrick Etcheverry)
 * Source    : patrick-etcheverry/code-explorer/tests/test2/essai.cpp & fichiers/etudiant001..003.cpp
 * But       : Trier la liste des 15 étudiants de S1 selon l'algorithme du tri pair-impair par transposition :
 *             - Sujet A : trierParTpDecroissant (par numéro de groupe de TP décroissant)
 *             - Sujet B : triParNomCroissant (par ordre alphabétique croissant du nom)
 */
#include <iostream>
#include <string>
using namespace std;

// Définition du type Etudiant
struct Etudiant
{
    string nom;            // nom de l'étudiant
    string prenom;         // prénom de l'étudiant
    unsigned short int td; // numéro de TD de l'étudiant
    unsigned short int tp; // numéro de TP de l'étudiant
};

// DECLARATION DES SOUS-PROGRAMMES
void trierParTpDecroissant(Etudiant tab[], unsigned int nbCases);
// But : Trier un tableau d'étudiants par numéro de TP décroissant selon l'algorithme du tri pair-impair

void triParNomCroissant(Etudiant tab[], unsigned int nbCases);
// But : Trier un tableau d'étudiants par nom croissant selon l'algorithme du tri pair-impair

// PROGRAMME PRINCIPAL
int main(void)
{
    // CONSTANTES
    const unsigned int EFFECTIF_S1 = 15; // Nombre d'étudiants inscrits en semestre 1

    // VARIABLES
    Etudiant etudiantsS1[EFFECTIF_S1] = {
        {"Barbier", "Remi", 2, 4},     {"Gueguen", "Lucie", 1, 1},
        {"Maret", "Ludovic", 3, 5},    {"Souchon", "Elodie", 1, 2},
        {"Dubuisson", "Marie", 3, 5},  {"Gaudreau", "Lucien", 2, 3},
        {"Besnard", "Emmanuel", 1, 2}, {"Boutin", "Alain", 3, 5},
        {"Almeras", "Valentin", 1, 1}, {"Blondeau", "Denise", 2, 4},
        {"Berlioz", "Gabriel", 2, 4},  {"Dupont", "Benjamin", 3, 5},
        {"Pomeroy", "Thibault", 1, 1}, {"Laffitte", "Anna", 2, 4},
        {"Duret", "Christelle", 2, 3}
    };
    unsigned int i; // Indice d'affichage du tableau

    // TRAITEMENTS
    // 1. Tester le Sujet A : Tri par numéro de TP décroissant
    trierParTpDecroissant(etudiantsS1, EFFECTIF_S1);
    cout << "=== SUJET A : Tri par TP decroissant (Tri Pair-Impair) ===" << endl;
    for (i = 0; i < EFFECTIF_S1; i++)
    {
        cout << etudiantsS1[i].nom << " " << etudiantsS1[i].prenom << " (TP" << etudiantsS1[i].tp << ")" << endl;
    }
    cout << endl;

    // 2. Tester le Sujet B : Tri par nom croissant
    triParNomCroissant(etudiantsS1, EFFECTIF_S1);
    cout << "=== SUJET B : Tri par Nom croissant (Tri Pair-Impair) ===" << endl;
    for (i = 0; i < EFFECTIF_S1; i++)
    {
        cout << etudiantsS1[i].nom << " " << etudiantsS1[i].prenom << " (TP" << etudiantsS1[i].tp << ")" << endl;
    }

    return 0;
}

// DEFINITION DES SOUS-PROGRAMMES
void trierParTpDecroissant(Etudiant tab[], unsigned int nbCases)
{
    bool estTrie;             // Indique si tab est totalement trié
    Etudiant copieEtudEnPosI; // Copie de l'étudiant situé en position i pour l'échange

    // Considérer que le tableau n'est pas trié >> estTrie
    estTrie = false;

    // tab, nbCases, estTrie >> Trier le tableau >> tab
    while (!estTrie)
    {
        // Supposer que le tableau est totalement trié >> estTrie
        estTrie = true;

        // tab, nbCases >> Comparer les étudiants aux indices pairs - impairs >> [tab], [estTrie]
        for (unsigned int i = 0; i <= (nbCases - 2); i += 2)
        {
            if (tab[i].tp < tab[i + 1].tp)
            {
                // tab, i >> Echanger tab[i] et tab[i+1] >> tab
                copieEtudEnPosI = tab[i];
                tab[i] = tab[i + 1];
                tab[i + 1] = copieEtudEnPosI;

                // Infirmer l'hypothèse de départ supposant que le tableau était trié >> estTrie
                estTrie = false;
            }
        }

        // tab, nbCases >> Comparer les étudiants aux indices impairs - pairs >> [tab], [estTrie]
        for (unsigned int i = 1; i <= (nbCases - 2); i += 2)
        {
            if (tab[i].tp < tab[i + 1].tp)
            {
                // tab, i >> Echanger tab[i] et tab[i+1] >> tab
                copieEtudEnPosI = tab[i];
                tab[i] = tab[i + 1];
                tab[i + 1] = copieEtudEnPosI;

                // Infirmer l'hypothèse de départ supposant que le tableau était trié >> estTrie
                estTrie = false;
            }
        }
    }
}

void triParNomCroissant(Etudiant tab[], unsigned int nbCases)
{
    bool estTrie;             // Indique si tab est totalement trié
    Etudiant copieEtudEnPosI; // Copie de l'étudiant situé en position i pour l'échange

    // Considérer que le tableau n'est pas trié >> estTrie
    estTrie = false;

    // tab, nbCases, estTrie >> Trier le tableau >> tab
    while (!estTrie)
    {
        // Supposer que le tableau est totalement trié >> estTrie
        estTrie = true;

        // tab, nbCases >> Comparer les étudiants aux indices pairs - impairs >> [tab], [estTrie]
        for (unsigned int i = 0; i <= (nbCases - 2); i += 2)
        {
            if (tab[i].nom > tab[i + 1].nom)
            {
                // tab, i >> Echanger tab[i] et tab[i+1] >> tab
                copieEtudEnPosI = tab[i];
                tab[i] = tab[i + 1];
                tab[i + 1] = copieEtudEnPosI;

                // Infirmer l'hypothèse de départ supposant que le tableau était trié >> estTrie
                estTrie = false;
            }
        }

        // tab, nbCases >> Comparer les étudiants aux indices impairs - pairs >> [tab], [estTrie]
        for (unsigned int i = 1; i <= (nbCases - 2); i += 2)
        {
            if (tab[i].nom > tab[i + 1].nom)
            {
                // tab, i >> Echanger tab[i] et tab[i+1] >> tab
                copieEtudEnPosI = tab[i];
                tab[i] = tab[i + 1];
                tab[i + 1] = copieEtudEnPosI;

                // Infirmer l'hypothèse de départ supposant que le tableau était trié >> estTrie
                estTrie = false;
            }
        }
    }
}
