# Groupe 16 - TP4 - Les Flèches de la Précision Page

Source: https://elearn.univ-pau.fr/mod/page/view.php?id=646686

Dernier exercice déposé sur Elearn (Exercice 6)

Appréciations

Justification du modèle algorithmique

Juste correct

Codage du modèle algorithmique

Assez Bien

Qualité du nommage des variables

Bien

Précision du typage des variables

Bien

Respect des conventions de nommage

Assez Bien

Pertinence des commentaires

Bien

Choix des structures de contrôle

Assez Bien

Indentation

Très Bien

Retour des correcteurs

Le code est fonctionnel : avec les tableaux des deux exemples de l'énoncé, le programme affiche le bon message.

Bonne mise en œuvre du modèle : la phase d'initialisation est isolée (lignes 28-31) et les deux fins de parcours forment la condition de continuation du

while

(ligne 34).

But erroné (ligne 7) : l'énoncé ne demande pas la position de la première occurrence, mais de vérifier si le tableau contient au moins une fois la valeur 20.

La justification (lignes 9-10) décrit l'implémentation (boucle

while

, drapeau, borne) au lieu d'expliquer pourquoi le modèle convient : on cherche si au moins une valeur vaut 20, donc on peut s'arrêter à la première trouvée.

La valeur 20 ne change pas :

valeurCible

(lignes 22 et 29) doit être une constante nommée, déclarée et initialisée en même temps.

else

inutile (ligne 40) : revoyez le modèle.

Note de l'exercice 6 :

13/20

Exercice choisi par l'enseignant (Exercice 3)

Retour des correcteurs

Le code n'est pas fonctionnel : la boucle démarre à

i = NB_CASES

(ligne 27), soit une case après la fin de la chaîne. Le programme affiche un caractère parasite avant "ecicrexE". Il fallait démarrer à

NB_CASES - 1

.

Modèle annoncé incorrect (ligne 8) : chaque caractère est affiché, il s'agit donc d'un parcours complet avec traitement systématique, et non conditionné.

Type inadapté : l'énoncé demande une chaîne de caractères. Le tableau de

char

(ligne 24) complique le code et oblige à écrire la taille en dur.

Le rôle de

chaine

et de

NB_CASES

(lignes 23-24) n'est pas documenté.

Note de l'exercice 3 :

6/20

Bilan

Dernier exercice déposé (Ex. 6)

13/20

Exercice choisi (Ex. 3)

6/20

Note finale

9,5/20

Modifié le: mardi 10 novembre 2026, 17:03