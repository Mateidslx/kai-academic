# Présentation

Source: https://patrick-etcheverry.github.io/r1.01-initiation-au-dev/Cours/09-fonctions


---
### Diapositive 1

Concevoir des sous-programmes
- Partie 2 : les fonctions -
R1.01 - Initiation au développement
Patrick Etcheverry
IUT de Bayonne - Département informatique
patrick.etcheverry@iutbayonne.univ-pau.fr
www.iutbayonne.univ-pau.fr/~etchever
https://github.com/patrick-etcheverry

---
### Diapositive 2

Plan du cours
Rappels
03
Propriétés des fonctions
07
Déclarer une fonction
14
Définir une fonction
16
Appeler une fonction
18
Fonctions et procédures : différences
23
Point de vue algorithmique
26
Bonnes pratiques
28

---
### Diapositive 3

Plan du cours
Rappels
03
Propriétés des fonctions
07
Déclarer une fonction
14
Définir une fonction
16
Appeler une fonction
18
Fonctions et procédures : différences
23
Point de vue algorithmique
26
Bonnes pratiques
28

---
### Diapositive 4

Rappels
Qu'est-ce qu'un sous-programme ?
Définition
Un sous-programme est une portion de programme
réutilisable
qui peut être exécutée de manière
indépendante
par rapport à un
                        programme dit principal.
A l'instar de n'importe quel traitement, un sous-programme à un
                        nom et peut :
avoir des
données
;
avoir des
résultats
.
Déclaration, définition et appel
On distingue trois phases distinctes pour construire et utiliser un
                sous-programme :
La
déclaration
du sous-programme : Cette étape, facultative mais
fortement conseillée
, vise à spécifier le ”mode d'emploi” du
                    sous-programme en précisant son nom, ses données, ses résultats et
                    son but ;
La
définition
du sous-programme : Cette étape consiste à écrire le
                    corps du sous-programme, à savoir l'ensemble des instructions qui le
                    composent ;
L'
appel
du sous-programme : Cette étape consiste à déclencher
                    l'exécution du sous-programme.
Qu'est-ce qui caractérise une procédure ?
Il existe deux types de sous-programme :
les procédures ;
les fonctions.
Nous avons vu qu'une procédure est
homogène à une instruction
et peut avoir :
de
0 à N données
;
de
0 à N résultats
.
Nous allons voir que les fonctions offrent des fonctions différentes...

---
### Diapositive 5

Rappels

---
### Diapositive 6

Qu'est-ce qu'un sous-programme ?
Définition
Un sous-programme est une portion de programme
réutilisable
qui peut être exécutée de manière
indépendante
par rapport à un
                        programme dit principal.
A l'instar de n'importe quel traitement, un sous-programme à un
                        nom et peut :
avoir des
données
;
avoir des
résultats
.

---
### Diapositive 7

Déclaration, définition et appel
On distingue trois phases distinctes pour construire et utiliser un
                sous-programme :
La
déclaration
du sous-programme : Cette étape, facultative mais
fortement conseillée
, vise à spécifier le ”mode d'emploi” du
                    sous-programme en précisant son nom, ses données, ses résultats et
                    son but ;
La
définition
du sous-programme : Cette étape consiste à écrire le
                    corps du sous-programme, à savoir l'ensemble des instructions qui le
                    composent ;
L'
appel
du sous-programme : Cette étape consiste à déclencher
                    l'exécution du sous-programme.

---
### Diapositive 8

Qu'est-ce qui caractérise une procédure ?
Il existe deux types de sous-programme :
les procédures ;
les fonctions.
Nous avons vu qu'une procédure est
homogène à une instruction
et peut avoir :
de
0 à N données
;
de
0 à N résultats
.
Nous allons voir que les fonctions offrent des fonctions différentes...

---
### Diapositive 9

Propriétés des fonctions
Point de vue mathématique
Les fonctions trouvent leur origine dans le domaine mathématique...
En mathématique, une fonction est une opération qui, à partir d'une ou
                plusieurs valeurs de départ, en calcule une autre
unique
.
Exemple
: La fonction racine carrée est la fonction qui à tout réel positif
x
associe le nombre réel positif noté
√x
dont le carré est
x
.
Point de vue mathematique vs informatique
En mathématique :
les valeurs de départ utilisées par la fonction
ne sont pas modifiées
;
la fonction ne produit qu'
une seule valeur
                        résultante
.
En informatique...
...les points de vue divergent...
Le point de vue des puristes (1/2)...
[...] les puristes prétendent qu'une fonction doit
                    seulement retourner une valeur comme le font les
                    fonctions mathématiques.
Cela signifie qu'une
                    fonction n'admet que des paramètres d'entrée et
                    que sa
seule valeur en sortie
est sa valeur de retour.
Steve McConnell -
Tout sur le code - Pour concevoir du logiciel de qualité - Dunod
                        2005.
Le point de vue des puristes (2/2)...
Certains langages de programmation implantent les fonctions en
                reprenant ces propriétés.
Avec le langage
Ada
par exemple, une fonction est
                un sous-programme qui prend uniquement des paramètres d'entrée (des données)
                et qui retourne un et un seul résultat :
Le point divergent entre les puristes... et les autres
Le fait qu'une fonction
retourne
un résultat
unique
est une
                    propriété
admise
dans la plupart des langages de programmation.
Toutefois,
peu de langages intègrent le fait qu'une fonction considère
                        uniquement des
                        paramètres en donnée.
Définition retenue dans ce cours
Considérant les points de vue divergents, nous retiendrons la définition suivante :
Une fonction est un sous-programme qui
retourne une valeur
.
[1]
Steve McConnell -
Tout sur le code - Pour concevoir du logiciel de qualité - Dunod
                        2005.
[1]
Steve McConnel précise : "Une fonction est un
                sous-programme qui retourne une valeur; une procédure est un sous-programme qui ne
                retourne rien."

---
### Diapositive 10

Propriétés des fonctions

---
### Diapositive 11

Point de vue mathématique
Les fonctions trouvent leur origine dans le domaine mathématique...
En mathématique, une fonction est une opération qui, à partir d'une ou
                plusieurs valeurs de départ, en calcule une autre
unique
.
Exemple
: La fonction racine carrée est la fonction qui à tout réel positif
x
associe le nombre réel positif noté
√x
dont le carré est
x
.

---
### Diapositive 12

Point de vue mathematique vs informatique
En mathématique :
les valeurs de départ utilisées par la fonction
ne sont pas modifiées
;
la fonction ne produit qu'
une seule valeur
                        résultante
.
En informatique...
...les points de vue divergent...

---
### Diapositive 13

Le point de vue des puristes (1/2)...
[...] les puristes prétendent qu'une fonction doit
                    seulement retourner une valeur comme le font les
                    fonctions mathématiques.
Cela signifie qu'une
                    fonction n'admet que des paramètres d'entrée et
                    que sa
seule valeur en sortie
est sa valeur de retour.
Steve McConnell -
Tout sur le code - Pour concevoir du logiciel de qualité - Dunod
                        2005.

---
### Diapositive 14

Le point de vue des puristes (2/2)...
Certains langages de programmation implantent les fonctions en
                reprenant ces propriétés.
Avec le langage
Ada
par exemple, une fonction est
                un sous-programme qui prend uniquement des paramètres d'entrée (des données)
                et qui retourne un et un seul résultat :

---
### Diapositive 15

Le point divergent entre les puristes... et les autres
Le fait qu'une fonction
retourne
un résultat
unique
est une
                    propriété
admise
dans la plupart des langages de programmation.
Toutefois,
peu de langages intègrent le fait qu'une fonction considère
                        uniquement des
                        paramètres en donnée.

---
### Diapositive 16

Définition retenue dans ce cours
Considérant les points de vue divergents, nous retiendrons la définition suivante :
Une fonction est un sous-programme qui
retourne une valeur
.
[1]
Steve McConnell -
Tout sur le code - Pour concevoir du logiciel de qualité - Dunod
                        2005.
[1]
Steve McConnel précise : "Une fonction est un
                sous-programme qui retourne une valeur; une procédure est un sous-programme qui ne
                retourne rien."

---
### Diapositive 17

Déclarer une fonction
Comment déclarer une fonction ?
Étant donné qu'une fonction est un sous-programme, sa déclaration est
                constituée d'une
entête
et d'un
but
.
L'entête de la fonction spécifie
le type de la valeur retournée
par la fonction, le
                nom de la fonction ainsi que le nom et le type de ses paramètres formels.
[1]
[1]
Dans la déclaration, le nom des paramètres 
                formels est facultatif mais fortement conseillé : le fait de nommer chaque paramètre 
                permet ensuite de spécifier le rôle de chacun d'eux dans le but de la procédure.

---
### Diapositive 18

Déclarer une fonction

---
### Diapositive 19

Comment déclarer une fonction ?
Étant donné qu'une fonction est un sous-programme, sa déclaration est
                constituée d'une
entête
et d'un
but
.
L'entête de la fonction spécifie
le type de la valeur retournée
par la fonction, le
                nom de la fonction ainsi que le nom et le type de ses paramètres formels.
[1]
[1]
Dans la déclaration, le nom des paramètres 
                formels est facultatif mais fortement conseillé : le fait de nommer chaque paramètre 
                permet ensuite de spécifier le rôle de chacun d'eux dans le but de la procédure.

---
### Diapositive 20

Définir une fonction
Eléments constituants la définition d'une fonction
La définition d'une fonction est constituée :
de l'entête de la fonction (telle qu'elle apparaît dans la déclaration)
de l'ensemble des instructions qui composent la fonction.
d'au moins une instruction
return
chargée de transmettre au programme appelant la valeur résultante
                    de la fonction.

---
### Diapositive 21

Définir une fonction

---
### Diapositive 22

Eléments constituants la définition d'une fonction
La définition d'une fonction est constituée :
de l'entête de la fonction (telle qu'elle apparaît dans la déclaration)
de l'ensemble des instructions qui composent la fonction.
d'au moins une instruction
return
chargée de transmettre au programme appelant la valeur résultante
                    de la fonction.

---
### Diapositive 23

Appeler une fonction
Appel d'une procédure et d'une fonction : différences
Une procédure est homogène à une
instruction
→ son appel s'écrit comme une instruction :
// Exemple d'appel d'une procédure :
                        afficherSomme (12.5, 4.25) ; /* L'appel 
                        de la procédure s'écrit comme une 
                        instruction. */
Une fonction est homogène à une
valeur
→ son appel
ne peut PAS s'écrire comme une instruction
:
/* Appel INCORRECT : une fonction n'est 
                        pas homogène à une instruction : */

                        max (10, 4);
Une fonction étant homogène à une
valeur
, il faut
prendre en compte sa valeur
                            de retour
d'une manière ou d'une autre :
noteMax = max (10, 4); /* Appel correct : la valeur retournée par la fonction 
                    est enregistrée dans la variable noteMax . */
Appeler une fonction : plein de possibilités...
Une fonction est homogène à une
valeur
→ son appel peut être fait
                partout
[1]
où une valeur est acceptée :
double maximum =
100
;
double maximum =
max (100,70)
;
perimetre = 2 * pi *
rayon
;
perimetre = 2 * pi *
max (rayon1, rayon2)
;
if (maximum >
100
)
                            ...
if (maximum >
max (val1, val2)
)
                            ...
maximum = max (val1 ,
val2
);
maximum = max (val1 ,
max (val2, val3)
);
[1]
à quelques exceptions près...
Déclaration, définition, appel : vue d'ensemble
#include <iostream> 
                using namespace std;
                    
                // Déclaration des sous-programmes
double max (double nb1, double nb2);
// Retourne la plus grande valeur entre nb1 et nb2.
int main (void)
                {
                    double val1; // valeur à comparer avec val2
                    double val2; // valeur à comparer avec val1
                    
                    // clavier >> Saisie des valeurs à comparer >> val1, val2
                    cout << "Valeur 1 : "; 
                    cin >> val1;
                    cout << "Valeur 2 : "; 
                    cin >> val2;
                    
                    // val1, val2 >> Afficher le max >> écran
cout << "La valeur la plus grande est " << max(val1, val2) << endl;
return 0;
                }
// Définition des sous-programmes
double max (double nb1, double nb2
{
return nb1 > nb2 ? nb1 : nb2;
}
Évaluons ce que vous avez retenu...
Sortez vos smartphones

---
### Diapositive 24

Appeler une fonction

---
### Diapositive 25

Appel d'une procédure et d'une fonction : différences
Une procédure est homogène à une
instruction
→ son appel s'écrit comme une instruction :
// Exemple d'appel d'une procédure :
                        afficherSomme (12.5, 4.25) ; /* L'appel 
                        de la procédure s'écrit comme une 
                        instruction. */
Une fonction est homogène à une
valeur
→ son appel
ne peut PAS s'écrire comme une instruction
:
/* Appel INCORRECT : une fonction n'est 
                        pas homogène à une instruction : */

                        max (10, 4);
Une fonction étant homogène à une
valeur
, il faut
prendre en compte sa valeur
                            de retour
d'une manière ou d'une autre :
noteMax = max (10, 4); /* Appel correct : la valeur retournée par la fonction 
                    est enregistrée dans la variable noteMax . */

---
### Diapositive 26

Appeler une fonction : plein de possibilités...
Une fonction est homogène à une
valeur
→ son appel peut être fait
                partout
[1]
où une valeur est acceptée :
double maximum =
100
;
double maximum =
max (100,70)
;
perimetre = 2 * pi *
rayon
;
perimetre = 2 * pi *
max (rayon1, rayon2)
;
if (maximum >
100
)
                            ...
if (maximum >
max (val1, val2)
)
                            ...
maximum = max (val1 ,
val2
);
maximum = max (val1 ,
max (val2, val3)
);
[1]
à quelques exceptions près...

---
### Diapositive 27

Déclaration, définition, appel : vue d'ensemble
#include <iostream> 
                using namespace std;
                    
                // Déclaration des sous-programmes
double max (double nb1, double nb2);
// Retourne la plus grande valeur entre nb1 et nb2.
int main (void)
                {
                    double val1; // valeur à comparer avec val2
                    double val2; // valeur à comparer avec val1
                    
                    // clavier >> Saisie des valeurs à comparer >> val1, val2
                    cout << "Valeur 1 : "; 
                    cin >> val1;
                    cout << "Valeur 2 : "; 
                    cin >> val2;
                    
                    // val1, val2 >> Afficher le max >> écran
cout << "La valeur la plus grande est " << max(val1, val2) << endl;
return 0;
                }
// Définition des sous-programmes
double max (double nb1, double nb2
{
return nb1 > nb2 ? nb1 : nb2;
}

---
### Diapositive 28

Évaluons ce que vous avez retenu...
Sortez vos smartphones

---
### Diapositive 29

Fonctions et procédures : différences
Fonctions et procédures : différences essentielles
Fonction
Procédure
Retourne une valeur
Ne retourne aucune valeur
Contient au moins une instruction
return
Ne contient aucune instruction
return
Ne produit qu'un seul résultat
[1]
Produit de 0 à N résultats
Est homogène à une valeur
Est homogène à une instruction
Les appels peuvent être imbriqués
Les appels ne peuvent pas être imbriqués
[1]
selon les puristes.
Fonction ou procédure ?
Du fait qu'une procédure peut produire de 0 à N résultats, tout sous-programme peut être implanté
                sous forme de procédure... Mais on privilégiera toujours l'implantation sous forme de fonction
                lorsque les propriétés requises (
cf.
transparent précédent) sont réunies.
Version procédure :
void calculerPrixReduit (float prixInitial, 
                            unsigned short int reduc, 
                            float& prixReduit);
                        /* A partir d'un prixInitial et d'un 
                        pourcentage de reduc, calcule le 
                        prixReduit correspondant. */
Version fonction (à privilégier ici):
float calculerPrixReduit (float prixInitial, 
                              unsigned short int reduc);
                        /* A partir d'un prixInitial et d'un 
                        pourcentage de reduc, rerourne le 
                        prix réduit correspondant. */
Version procédure :
void afficherPrixReduit (float prixInitial, 
                            unsigned short int reduc); 
                        /* A partir d'un prixInitial et d'un 
                        pourcentage de reduc, affiche à l'écran 
                        le prixReduit correspondant. */
Pas d'équivalent "propre" sous forme de fonction car le sous-programme ne retourne aucune
                        valeur.

---
### Diapositive 30

Fonctions et procédures : différences

---
### Diapositive 31

Fonctions et procédures : différences essentielles
Fonction
Procédure
Retourne une valeur
Ne retourne aucune valeur
Contient au moins une instruction
return
Ne contient aucune instruction
return
Ne produit qu'un seul résultat
[1]
Produit de 0 à N résultats
Est homogène à une valeur
Est homogène à une instruction
Les appels peuvent être imbriqués
Les appels ne peuvent pas être imbriqués
[1]
selon les puristes.

---
### Diapositive 32

Fonction ou procédure ?
Du fait qu'une procédure peut produire de 0 à N résultats, tout sous-programme peut être implanté
                sous forme de procédure... Mais on privilégiera toujours l'implantation sous forme de fonction
                lorsque les propriétés requises (
cf.
transparent précédent) sont réunies.
Version procédure :
void calculerPrixReduit (float prixInitial, 
                            unsigned short int reduc, 
                            float& prixReduit);
                        /* A partir d'un prixInitial et d'un 
                        pourcentage de reduc, calcule le 
                        prixReduit correspondant. */
Version fonction (à privilégier ici):
float calculerPrixReduit (float prixInitial, 
                              unsigned short int reduc);
                        /* A partir d'un prixInitial et d'un 
                        pourcentage de reduc, rerourne le 
                        prix réduit correspondant. */
Version procédure :
void afficherPrixReduit (float prixInitial, 
                            unsigned short int reduc); 
                        /* A partir d'un prixInitial et d'un 
                        pourcentage de reduc, affiche à l'écran 
                        le prixReduit correspondant. */
Pas d'équivalent "propre" sous forme de fonction car le sous-programme ne retourne aucune
                        valeur.

---
### Diapositive 33

Point de vue algorithmique
Fonction : Aspects algorithmiques
Étant donné qu'une fonction est homogène à une valeur, on notera
                    le
type
de la valeur retournée sous forme de résultat :
Étant donné qu'une fonction a pour caractéristique de retourner une
                    valeur son algorithme comportera toujours au moins
                    une action
retourner
...

---
### Diapositive 34

Point de vue algorithmique

---
### Diapositive 35

Fonction : Aspects algorithmiques
Étant donné qu'une fonction est homogène à une valeur, on notera
                    le
type
de la valeur retournée sous forme de résultat :
Étant donné qu'une fonction a pour caractéristique de retourner une
                    valeur son algorithme comportera toujours au moins
                    une action
retourner
...

---
### Diapositive 36

Bonnes pratiques
Nombre d'instructions
return
dans une fonction
string signe (double nbre) ; 
                // But : Retourne le signe du nombre nbre (" positif " , " nul " ou " negatif ")
Solution 1
string signe (double nbre)
                        {
                          if (nbre > 0)
                          {
                            return "positif";
                          }
                          else if(nbre == 0)
                          {
                            return "nul";
                          }
                          else
                          {
                            return "negatif";
                          }
                        }
Solution 2
string signe (double nbre)
                        {
                          string signeNbre; // Le signe de nbre
                        
                          if (nbre > 0)
                          {
                            signeNbre = "positif";
                          }
                          else if (nbre == 0)   
                          {
                            signeNbre = "nul";
                          }
                          else
                          {
                            signeNbre = "negatif";
                          }

                          return signeNbre;
                        }
Quel code privilégier entre les deux solutions ?
Le choix des puristes
Les puristes suivront les règles de programmation structurée d'Edsger Dijkstra :
[...] chaque fonction doit posséder une entrée et
                    une sortie.
Dijkstra E.W., Dahl O.J. and Hoare C.A.R -
Structured programming - Academic Press Ltd.
                        1972
Selon cette approche, il ne doit y avoir qu'
une seule
instruction
return
dans une fonction.
Les points de vue plus modérés
[...] les return multiples peuvent améliorer la lisibilité et
                    la facilité de maintenance d'un sous-programme; ils
                    peuvent aussi éviter une logique exagérément
                    imbriquée. Cependant, ils doivent être utilisés
avec
                        précaution
.
McConnell, Steve -
Tout sur le code - Pour concevoir du logiciel de qualité - Dunod
                        2005.
Dans le cadre de ce module d'enseignement...
... nous adopterons la règle de
l'oncle Bob
:
[...] Si vos fonctions restent courtes, les multiples instructions return
                    occasionnelles ne seront pas vraiment un problème. Elles peuvent même
                    parfois être plus expressives que la règle une seule entrée et une seule sortie.
1
[...] En revanche, les règles de Dijkstra gardent
                    tout leur sens lorsque les fonctions sont longues.
Martin R.C. (Uncle Bob) -
Coder proprement - Pearson 2009.
[1]
Référence à la règle de Dijkstra
Longueur d'un sous-programme ?
La réponse la plus fréquente à cette question : le sous-programme doit
                tenir sur un écran.
Si cette règle pouvait avoir un sens il y a quelques années, lorsque les
                écrans avaient de faibles résolutions, elle n'est plus d'actualité car les
                écrans peuvent aujourd'hui afficher assez facilement une centaine de
                lignes...
Les sous-programmes doivent être courts !
Les programmes modernes s'orientent vers des
                            volumes importants de sous-programmes très
                            courts combinés à quelques sous-programmes
                            plus longs.
McConnell, Steve -
Tout sur le code - Pour concevoir du logiciel de qualité - Dunod
                                2005.
La première règle est d'écrire des fonctions courtes.
La deuxième règle est qu'elles doivent être encore plus courtes
                            que cela.
[...] Les fonctions doivent
                            rarement dépasser 20 lignes.
Martin R.C. (Uncle Bob) -
Coder proprement - Pearson 2009.
Dans le cadre de ce module d'enseignement...
... nous essaierons de produire des sous-programmes qui :
font une et une seule chose à la fois et le font bien (un calcul, un
                    affichage, une
                    recherche...) ;
restent courts (puisqu'ils ne feront qu'une seule chose).
Cependant, la règle visant à produire des sous-programmes courts ne doit
                    pas devenir une entrave trop forte. Ainsi, la longueur maximale de nos
                    sous-programmes sera aussi fonction :
de la cohérence du sous-programme;
de sa profondeur d'imbrication;
du nombre de variables;
du nombre de points de décisions;
du nombre de commentaires nécessaires
                                pour expliquer le sous-programme;
Comment nommer une fonction ?
Le contexte idéal pour créer une fonction est celui qui répond à la
                définition mathématique d'une fonction : le programmeur a besoin d'un
                sous-programme qui, à partir d'un ensemble de données, produit un
                résultat unique sans altérer les données.
Dans un tel contexte, la fonction sera nommée d'après la
                valeur qu'elle retourne. Ainsi, la fonction s'appelera :
max()
si elle retourne le max de deux valeurs;
sin()
si elle retourne le sinus d'un nombre;
...
Paroles d'experts
Il faut créer une fonction quand l'objectif principal du
                            sous-programme est de retourner la valeur indiquée par
                            le nom de la fonction, et une procédure dans les autres
                            cas.
McConnell, Steve -
Tout sur le code - Pour concevoir du logiciel de qualité - Dunod
                                2005.
Les noms des fonctions doivent indiquer leur rôle.
Martin R.C. (Uncle Bob) -
Coder proprement - Pearson 2009.
Des fonctions ressemblant à des procédures (1/5)
Les règles précédentes impliquent qu'un sous-programme produisant
                plus d'un résultat sera implanté sous forme de procédure (du fait qu'on ne
                peut nommer le sous-programme exclusivement par sa valeur résultante).
                Il existe toutefois une exception tolérée :
Il est
courant
en programmation de définir une
                    fonction qui travaille comme une procédure et
                    retourne une valeur d'état.
McConnell, Steve -
Tout sur le code - Pour concevoir du logiciel de qualité - Dunod
                        2005.
D'un point de vue logique, le sous-programme opère comme une
                procédure, mais puisqu'il retourne une valeur, c'est officiellement une
                fonction...
Des fonctions ressemblant à des procédures (2/5)
Considérons le cas d'un sous-programme qui recherche un élément
                dans un tableau d'entiers ;
Ce sous-programme produit un indicateur signalant si l'élément
                    cherché fait partie du tableau ou pas ;
Dans le cas où l'élément cherché appartient au tableau, le
                    sous-programme indiquera la position de la 1ère occurrence trouvée.
Comment implanter ce sous-programme ?
Des fonctions ressemblant à des procédures (3/5)
D'après la règle donnée par S. McConnell,
1
ce sous-programme sera
                en priorité implanté sous la forme d'une procédure :
void rechercherPosition (const int tab[], unsigned int nbCases, int valATrouver, 
                                         unsigned short int& pos, bool& trouve);     
                /* Cherche la position pos de l'élément valATrouver dans le tableau 
                d'entier tab composé de nbCases. L'indicateur trouve prend la 
                valeur vrai si la recherche est fructueuse, faux sinon */
[1]
"Il faut créer une fonction quand l'objectif principal du sous-programme est de
                retourner la valeur indiquée par le nom de la fonction, et une procédure dans les autres
                cas"
Des fonctions ressemblant à des procédures (4/5)
Toutefois, S. McConnell précise aussi qu'il existe
“une pratique
courante
en programmation qui consiste à définir une fonction travaillant
                    comme une procédure et retournant une valeur d'état”.
Selon cette pratique courante, nous pourrions considérer que l'indicateur
                trouve est une valeur d'état indiquant dans quel état la recherche s'est
                terminée. Nous pourrions alors écrire le sous-programme précédent sous
                forme d'une fonction de la manière suivante :
bool rechercherPosition (const int tab[], unsigned int nbCases, 
                                         int valATrouver, unsigned short int& pos);     
                /* Cherche la position pos de l'élément valATrouver dans le tableau 
                d'entier tab composé de nbCases. Le sous-programme retourne la valeur
                vrai si la recherche est fructueuse, faux sinon */
Des fonctions ressemblant à des procédures (5/5)
bool rechercherPosition (const int tab[], unsigned int nbCases, 
                                         int valATrouver, unsigned short int& pos);     
                /* Cherche la position pos de l'élément valATrouver dans le tableau 
                d'entier tab composé de nbCases. Le sous-programme retourne la valeur
                vrai si la recherche est fructueuse, faux sinon */
La déclaration précédente respecte la pratique courante qui consiste à définir
                une fonction travaillant comme une procédure et retournant une valeur d'état.
                Par contre, la déclaration ci-dessous ne cadrerait pas avec cette pratique
                courante car la position retournée n'est pas considérée comme une valeur d'état :
unsigned short int positionDe (const int tab[], unsigned int nbCases, 
                int valATrouver, bool& trouve);                 
               /* Retourne la position pos de l'élément valATrouver dans le tableau 
               d'entier tab composé de nbCases. Le sous-programme produit un 
               indicateur trouve qui prend la valeur vrai si la recherche 
               est fructueuse, faux sinon */
Quand créer une fonction plutôt qu'une procédure ?
Résumons :
un sous-programme produisant un résultat unique à partir d'un
                    ensemble de données non modifiées sera implanté sous forme
                    d'une fonction;
un sous-programme produisant un résultat ainsi qu'une valeur
                    d'état pourra être implanté :
sous forme d'une procédure,
sous forme d'une fonction, à condition que la valeur retournée
                            soit la valeur d'état;
Pour tous les autres cas de figure, le sous-programme sera
                    implanté sous forme d'une procédure.
Évaluons ce que vous avez retenu...
Sortez vos smartphones

---
### Diapositive 37

Bonnes pratiques

---
### Diapositive 38

Nombre d'instructions
return
dans une fonction
string signe (double nbre) ; 
                // But : Retourne le signe du nombre nbre (" positif " , " nul " ou " negatif ")
Solution 1
string signe (double nbre)
                        {
                          if (nbre > 0)
                          {
                            return "positif";
                          }
                          else if(nbre == 0)
                          {
                            return "nul";
                          }
                          else
                          {
                            return "negatif";
                          }
                        }
Solution 2
string signe (double nbre)
                        {
                          string signeNbre; // Le signe de nbre
                        
                          if (nbre > 0)
                          {
                            signeNbre = "positif";
                          }
                          else if (nbre == 0)   
                          {
                            signeNbre = "nul";
                          }
                          else
                          {
                            signeNbre = "negatif";
                          }

                          return signeNbre;
                        }
Quel code privilégier entre les deux solutions ?

---
### Diapositive 39

Le choix des puristes
Les puristes suivront les règles de programmation structurée d'Edsger Dijkstra :
[...] chaque fonction doit posséder une entrée et
                    une sortie.
Dijkstra E.W., Dahl O.J. and Hoare C.A.R -
Structured programming - Academic Press Ltd.
                        1972
Selon cette approche, il ne doit y avoir qu'
une seule
instruction
return
dans une fonction.

---
### Diapositive 40

Les points de vue plus modérés
[...] les return multiples peuvent améliorer la lisibilité et
                    la facilité de maintenance d'un sous-programme; ils
                    peuvent aussi éviter une logique exagérément
                    imbriquée. Cependant, ils doivent être utilisés
avec
                        précaution
.
McConnell, Steve -
Tout sur le code - Pour concevoir du logiciel de qualité - Dunod
                        2005.

---
### Diapositive 41

Dans le cadre de ce module d'enseignement...
... nous adopterons la règle de
l'oncle Bob
:
[...] Si vos fonctions restent courtes, les multiples instructions return
                    occasionnelles ne seront pas vraiment un problème. Elles peuvent même
                    parfois être plus expressives que la règle une seule entrée et une seule sortie.
1
[...] En revanche, les règles de Dijkstra gardent
                    tout leur sens lorsque les fonctions sont longues.
Martin R.C. (Uncle Bob) -
Coder proprement - Pearson 2009.
[1]
Référence à la règle de Dijkstra

---
### Diapositive 42

Longueur d'un sous-programme ?
La réponse la plus fréquente à cette question : le sous-programme doit
                tenir sur un écran.
Si cette règle pouvait avoir un sens il y a quelques années, lorsque les
                écrans avaient de faibles résolutions, elle n'est plus d'actualité car les
                écrans peuvent aujourd'hui afficher assez facilement une centaine de
                lignes...

---
### Diapositive 43

Les sous-programmes doivent être courts !
Les programmes modernes s'orientent vers des
                            volumes importants de sous-programmes très
                            courts combinés à quelques sous-programmes
                            plus longs.
McConnell, Steve -
Tout sur le code - Pour concevoir du logiciel de qualité - Dunod
                                2005.
La première règle est d'écrire des fonctions courtes.
La deuxième règle est qu'elles doivent être encore plus courtes
                            que cela.
[...] Les fonctions doivent
                            rarement dépasser 20 lignes.
Martin R.C. (Uncle Bob) -
Coder proprement - Pearson 2009.

---
### Diapositive 44

Dans le cadre de ce module d'enseignement...
... nous essaierons de produire des sous-programmes qui :
font une et une seule chose à la fois et le font bien (un calcul, un
                    affichage, une
                    recherche...) ;
restent courts (puisqu'ils ne feront qu'une seule chose).
Cependant, la règle visant à produire des sous-programmes courts ne doit
                    pas devenir une entrave trop forte. Ainsi, la longueur maximale de nos
                    sous-programmes sera aussi fonction :
de la cohérence du sous-programme;
de sa profondeur d'imbrication;
du nombre de variables;
du nombre de points de décisions;
du nombre de commentaires nécessaires
                                pour expliquer le sous-programme;

---
### Diapositive 45

Comment nommer une fonction ?
Le contexte idéal pour créer une fonction est celui qui répond à la
                définition mathématique d'une fonction : le programmeur a besoin d'un
                sous-programme qui, à partir d'un ensemble de données, produit un
                résultat unique sans altérer les données.
Dans un tel contexte, la fonction sera nommée d'après la
                valeur qu'elle retourne. Ainsi, la fonction s'appelera :
max()
si elle retourne le max de deux valeurs;
sin()
si elle retourne le sinus d'un nombre;
...

---
### Diapositive 46

Paroles d'experts
Il faut créer une fonction quand l'objectif principal du
                            sous-programme est de retourner la valeur indiquée par
                            le nom de la fonction, et une procédure dans les autres
                            cas.
McConnell, Steve -
Tout sur le code - Pour concevoir du logiciel de qualité - Dunod
                                2005.
Les noms des fonctions doivent indiquer leur rôle.
Martin R.C. (Uncle Bob) -
Coder proprement - Pearson 2009.

---
### Diapositive 47

Des fonctions ressemblant à des procédures (1/5)
Les règles précédentes impliquent qu'un sous-programme produisant
                plus d'un résultat sera implanté sous forme de procédure (du fait qu'on ne
                peut nommer le sous-programme exclusivement par sa valeur résultante).
                Il existe toutefois une exception tolérée :
Il est
courant
en programmation de définir une
                    fonction qui travaille comme une procédure et
                    retourne une valeur d'état.
McConnell, Steve -
Tout sur le code - Pour concevoir du logiciel de qualité - Dunod
                        2005.
D'un point de vue logique, le sous-programme opère comme une
                procédure, mais puisqu'il retourne une valeur, c'est officiellement une
                fonction...

---
### Diapositive 48

Des fonctions ressemblant à des procédures (2/5)
Considérons le cas d'un sous-programme qui recherche un élément
                dans un tableau d'entiers ;
Ce sous-programme produit un indicateur signalant si l'élément
                    cherché fait partie du tableau ou pas ;
Dans le cas où l'élément cherché appartient au tableau, le
                    sous-programme indiquera la position de la 1ère occurrence trouvée.
Comment implanter ce sous-programme ?

---
### Diapositive 49

Des fonctions ressemblant à des procédures (3/5)
D'après la règle donnée par S. McConnell,
1
ce sous-programme sera
                en priorité implanté sous la forme d'une procédure :
void rechercherPosition (const int tab[], unsigned int nbCases, int valATrouver, 
                                         unsigned short int& pos, bool& trouve);     
                /* Cherche la position pos de l'élément valATrouver dans le tableau 
                d'entier tab composé de nbCases. L'indicateur trouve prend la 
                valeur vrai si la recherche est fructueuse, faux sinon */
[1]
"Il faut créer une fonction quand l'objectif principal du sous-programme est de
                retourner la valeur indiquée par le nom de la fonction, et une procédure dans les autres
                cas"

---
### Diapositive 50

Des fonctions ressemblant à des procédures (4/5)
Toutefois, S. McConnell précise aussi qu'il existe
“une pratique
courante
en programmation qui consiste à définir une fonction travaillant
                    comme une procédure et retournant une valeur d'état”.
Selon cette pratique courante, nous pourrions considérer que l'indicateur
                trouve est une valeur d'état indiquant dans quel état la recherche s'est
                terminée. Nous pourrions alors écrire le sous-programme précédent sous
                forme d'une fonction de la manière suivante :
bool rechercherPosition (const int tab[], unsigned int nbCases, 
                                         int valATrouver, unsigned short int& pos);     
                /* Cherche la position pos de l'élément valATrouver dans le tableau 
                d'entier tab composé de nbCases. Le sous-programme retourne la valeur
                vrai si la recherche est fructueuse, faux sinon */

---
### Diapositive 51

Des fonctions ressemblant à des procédures (5/5)
bool rechercherPosition (const int tab[], unsigned int nbCases, 
                                         int valATrouver, unsigned short int& pos);     
                /* Cherche la position pos de l'élément valATrouver dans le tableau 
                d'entier tab composé de nbCases. Le sous-programme retourne la valeur
                vrai si la recherche est fructueuse, faux sinon */
La déclaration précédente respecte la pratique courante qui consiste à définir
                une fonction travaillant comme une procédure et retournant une valeur d'état.
                Par contre, la déclaration ci-dessous ne cadrerait pas avec cette pratique
                courante car la position retournée n'est pas considérée comme une valeur d'état :
unsigned short int positionDe (const int tab[], unsigned int nbCases, 
                int valATrouver, bool& trouve);                 
               /* Retourne la position pos de l'élément valATrouver dans le tableau 
               d'entier tab composé de nbCases. Le sous-programme produit un 
               indicateur trouve qui prend la valeur vrai si la recherche 
               est fructueuse, faux sinon */

---
### Diapositive 52

Quand créer une fonction plutôt qu'une procédure ?
Résumons :
un sous-programme produisant un résultat unique à partir d'un
                    ensemble de données non modifiées sera implanté sous forme
                    d'une fonction;
un sous-programme produisant un résultat ainsi qu'une valeur
                    d'état pourra être implanté :
sous forme d'une procédure,
sous forme d'une fonction, à condition que la valeur retournée
                            soit la valeur d'état;
Pour tous les autres cas de figure, le sous-programme sera
                    implanté sous forme d'une procédure.

---
### Diapositive 53

Évaluons ce que vous avez retenu...
Sortez vos smartphones
