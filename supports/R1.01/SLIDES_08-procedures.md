# Présentation

Source: https://patrick-etcheverry.github.io/r1.01-initiation-au-dev/Cours/08-procedures


---
### Diapositive 1

Concevoir des sous-programmes
- Partie 1 : les procédures -
R1.01 - Initiation au développement
Patrick Etcheverry
IUT de Bayonne - Département informatique
patrick.etcheverry@iutbayonne.univ-pau.fr
www.iutbayonne.univ-pau.fr/~etchever
https://github.com/patrick-etcheverry

---
### Diapositive 2

Plan du cours
Introduction
03
Définitions
06
Procédures
10
Passage de paramètres
16
Passage de paramètres par valeur
19
Passage de paramètres par référence
30
Passage de paramètres par référence constante
40
Cas des tableaux en paramètre
46
Variables locales à un sous-programme
53
Bonnes pratiques
56

---
### Diapositive 3

Plan du cours
Introduction
03
Définitions
06
Procédures
10
Passage de paramètres
16
Passage de paramètres par valeur
19
Passage de paramètres par référence
30
Passage de paramètres par référence constante
40
Cas des tableaux en paramètre
46
Variables locales à un sous-programme
53
Bonnes pratiques
56

---
### Diapositive 4

Introduction
Notion de programmation modulaire
Les programmes répondant à des problèmes complexes sont souvent
                composés de plusieurs milliers de lignes...
Ce type de programme ne peut pas être écrit d’un seul tenant. La plupart du temps,
                le programmeur :
décompose le programme en plusieurs parties plus petites,
donne un nom à chacune de ces parties,
assemble ces différentes parties pour former le programme final.
Cette approche nommée
programmation modulaire
repose sur
                l’écriture
                de
sous-programmes
.
Intérêts des sous-programmes
Ils permettent de traiter les opérations répétitives en factorisant le
                code et en évitant ainsi les duplications de code
[1]
;
Ils favorisent la construction de programmes de manière modulaire ;
De par leur indépendance vis-à-vis du programme principal, ils
                    peuvent être réutilisés dans d’autres programmes et accélèrent donc
                    le développement de ces derniers.
[1]
lorsqu'aucune solution algorithmique ne permet d'éviter cette duplication.

---
### Diapositive 5

Introduction

---
### Diapositive 6

Notion de programmation modulaire
Les programmes répondant à des problèmes complexes sont souvent
                composés de plusieurs milliers de lignes...
Ce type de programme ne peut pas être écrit d’un seul tenant. La plupart du temps,
                le programmeur :
décompose le programme en plusieurs parties plus petites,
donne un nom à chacune de ces parties,
assemble ces différentes parties pour former le programme final.
Cette approche nommée
programmation modulaire
repose sur
                l’écriture
                de
sous-programmes
.

---
### Diapositive 7

Intérêts des sous-programmes
Ils permettent de traiter les opérations répétitives en factorisant le
                code et en évitant ainsi les duplications de code
[1]
;
Ils favorisent la construction de programmes de manière modulaire ;
De par leur indépendance vis-à-vis du programme principal, ils
                    peuvent être réutilisés dans d’autres programmes et accélèrent donc
                    le développement de ces derniers.
[1]
lorsqu'aucune solution algorithmique ne permet d'éviter cette duplication.

---
### Diapositive 8

Définitions
Qu'est-ce qu'un sous-programme ?
Définition
Un sous-programme est une portion de programme
réutilisable
qui peut être exécutée de manière
indépendante
par rapport à un
                        programme dit principal.
A l'instar de n'importe quel traitement, un sous-programme a un
                        nom et peut :
avoir des
données
;
avoir des
résultats
.
Qu'est-ce qu'un paramètre ?
Définition
Les paramètres
[1]
d'un sous-programme désignent les données et les
                        résultats du sous-programme. On distingue :
Les paramètres
formels
:
                            ils désignent les noms des données et
                            des résultats lors de la
déclaration
et de la
définition
du
                            sous-programme ;
Les paramètres
effectifs
:
                            ils désignent les noms des données
                            et des résultats lors de l'
appel
du sous programme.
Les paramètres d'un sous-programme s'intègrent au dictionnaire des
                variables du sous-programme : il est donc
inutile de les re-déclarer
à
                l'intérieur du sous-programme.
[1]
appelés aussi
arguments
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

---
### Diapositive 9

Définitions

---
### Diapositive 10

Qu'est-ce qu'un sous-programme ?
Définition
Un sous-programme est une portion de programme
réutilisable
qui peut être exécutée de manière
indépendante
par rapport à un
                        programme dit principal.
A l'instar de n'importe quel traitement, un sous-programme a un
                        nom et peut :
avoir des
données
;
avoir des
résultats
.

---
### Diapositive 11

Qu'est-ce qu'un paramètre ?
Définition
Les paramètres
[1]
d'un sous-programme désignent les données et les
                        résultats du sous-programme. On distingue :
Les paramètres
formels
:
                            ils désignent les noms des données et
                            des résultats lors de la
déclaration
et de la
définition
du
                            sous-programme ;
Les paramètres
effectifs
:
                            ils désignent les noms des données
                            et des résultats lors de l'
appel
du sous programme.
Les paramètres d'un sous-programme s'intègrent au dictionnaire des
                variables du sous-programme : il est donc
inutile de les re-déclarer
à
                l'intérieur du sous-programme.
[1]
appelés aussi
arguments
.

---
### Diapositive 12

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
### Diapositive 13

Les procédures
Qu'est-ce qu'une procédure ?
Définition
Une procédure est un sous-programme qui peut avoir :
de 0 à N données;
de 0 à N résultats.
Une procédure est homogène à une instruction : Son appel s'écrit comme une instruction.
A noter : Contrairement à une fonction,
[1]
une procédure ne renvoie pas de valeur.
[1]
cette famille de sous-programmes sera étudiée lors du prochain
                cours.
Déclarer une procédure (1/2)
Etant donné qu'une procédure est un sous-programme, sa déclaration est
                    constituée d'une
entête
et d'un
but
.
L'
entête
de la procédure spécifie le nom de la procédure ainsi que le nom et
                    type de chaque paramètre
formel
.
Le
but
prend la forme d'un commentaire qui décrit le service rendu par la procédure
                    ainsi que le rôle de chacun de ses paramètres.
Déclarer une procédure (2/2)
Dans la
déclaration
, le nom des paramètres formels est facultatif mais
                fortement conseillé : le fait de nommer chaque paramètre permet ensuite de
                spécifier le rôle de chacun des paramètres dans le but de la procédure.
Déclaration, définition, appel : vue d'ensemble
#include <iostream> 
                using namespace std;
// Déclaration des sous-programmes
void afficherSomme (double nb1, double nb2);
// But : Affiche à l'écran la somme des nombres nb1 et nb2
int main (void) // Programme principal
                {
                  // VARIABLES du programme principal
                  double valeur1 ; // Nombre à additionner avec valeur2
                  double valeur2 ; // Nombre à additionner avec valeur1
                
                  // (clavier) >> saisir les nombres à additionner >> valeur1, valeur2
                  cout << " Entrez un nombre : "; cin >> valeur1 ;
                  cout << " Entrez un autre nombre : "; cin >> valeur2 ;

                  // Appel du sous-programme afficherSomme
afficherSomme (valeur1, valeur2);
return 0 ;
                }
// Définition des sous-programmes
void afficherSomme (double nb1, double nb2)
{
cout << (nb1 + nb2) << endl;
}
Évaluons ce que vous avez retenu...
Sortez vos smartphones

---
### Diapositive 14

Les procédures

---
### Diapositive 15

Qu'est-ce qu'une procédure ?
Définition
Une procédure est un sous-programme qui peut avoir :
de 0 à N données;
de 0 à N résultats.
Une procédure est homogène à une instruction : Son appel s'écrit comme une instruction.
A noter : Contrairement à une fonction,
[1]
une procédure ne renvoie pas de valeur.
[1]
cette famille de sous-programmes sera étudiée lors du prochain
                cours.

---
### Diapositive 16

Déclarer une procédure (1/2)
Etant donné qu'une procédure est un sous-programme, sa déclaration est
                    constituée d'une
entête
et d'un
but
.
L'
entête
de la procédure spécifie le nom de la procédure ainsi que le nom et
                    type de chaque paramètre
formel
.
Le
but
prend la forme d'un commentaire qui décrit le service rendu par la procédure
                    ainsi que le rôle de chacun de ses paramètres.

---
### Diapositive 17

Déclarer une procédure (2/2)
Dans la
déclaration
, le nom des paramètres formels est facultatif mais
                fortement conseillé : le fait de nommer chaque paramètre permet ensuite de
                spécifier le rôle de chacun des paramètres dans le but de la procédure.

---
### Diapositive 18

Déclaration, définition, appel : vue d'ensemble
#include <iostream> 
                using namespace std;
// Déclaration des sous-programmes
void afficherSomme (double nb1, double nb2);
// But : Affiche à l'écran la somme des nombres nb1 et nb2
int main (void) // Programme principal
                {
                  // VARIABLES du programme principal
                  double valeur1 ; // Nombre à additionner avec valeur2
                  double valeur2 ; // Nombre à additionner avec valeur1
                
                  // (clavier) >> saisir les nombres à additionner >> valeur1, valeur2
                  cout << " Entrez un nombre : "; cin >> valeur1 ;
                  cout << " Entrez un autre nombre : "; cin >> valeur2 ;

                  // Appel du sous-programme afficherSomme
afficherSomme (valeur1, valeur2);
return 0 ;
                }
// Définition des sous-programmes
void afficherSomme (double nb1, double nb2)
{
cout << (nb1 + nb2) << endl;
}

---
### Diapositive 19

Évaluons ce que vous avez retenu...
Sortez vos smartphones

---
### Diapositive 20

Passage de paramètres
Mise en correspondance des paramètres formels et effectifs
La mise en correspondance des paramètres formels et des paramètres
                effectifs est réalisée en fonction de la
position
qu'occupe chaque
                paramètre dans la déclaration et l'appel du sous-programme :
Modes de transmission des paramètres
Le mode de transmission définit le mécanisme qui sera utilisé pour transmettre le contenu du paramètre
                sera au sous-programme.
Selon que le paramètre soit une
donnée
, un
résultat
et selon la
taille
occupée en mémoire par le paramètre, on choisira, en C++, l'un des
                modes suivants
[1]
:
passage de paramètre par
valeur
;
passage de paramètre par
référence
;
passage de paramètre par
référence constante
.
[1]
Programmation - Principes et pratiques en C++, Bjarne Stroustrup, 2010.

---
### Diapositive 21

Passage de paramètres

---
### Diapositive 22

Mise en correspondance des paramètres formels et effectifs
La mise en correspondance des paramètres formels et des paramètres
                effectifs est réalisée en fonction de la
position
qu'occupe chaque
                paramètre dans la déclaration et l'appel du sous-programme :

---
### Diapositive 23

Modes de transmission des paramètres
Le mode de transmission définit le mécanisme qui sera utilisé pour transmettre le contenu du paramètre
                sera au sous-programme.
Selon que le paramètre soit une
donnée
, un
résultat
et selon la
taille
occupée en mémoire par le paramètre, on choisira, en C++, l'un des
                modes suivants
[1]
:
passage de paramètre par
valeur
;
passage de paramètre par
référence
;
passage de paramètre par
référence constante
.
[1]
Programmation - Principes et pratiques en C++, Bjarne Stroustrup, 2010.

---
### Diapositive 24

Passage de paramètres par valeur
Principe du passage par valeur
Par défaut, un paramètre est transmis par valeur. Dans ce mode, le
                sous-programme reçoit une copie du paramètre et non le paramètre lui-même :
cout << "Entrez un nombre : "; 
                        cin >> valeur1;
                        cout << "Entrez un autre nombre : "; 
                        cin >> valeur2;
                        
                        afficherSomme (valeur1, valeur2);
Remarques :
lorsque le sous-programme a terminé de s'exécuter, les copies des
                            paramètres sont
effacées
de la mémoire.
un paramètre transmis par valeur
ne peut pas être modifié
→ La valeur
                        du paramètre est donc
protégée
.
Les étapes du passage par valeur via un exemple
#include <iostream> 
                using namespace std;
                    
                // Déclaration des sous-programmes
                void incrementer (int valIncrement, int valAIncrementer);
                // But : Incrémente valAIncrementer d'une valeur égale à valIncrement
                    
                int main (void) // Programme principal
                {
                    // VARIABLES
                    int nombre; // Nombre à incrementer
                    
                    // TRAITEMENTS  
                    cout << "Entrez un nombre : "; cin >> nombre;
                    
                    incrementer (2, nombre);
                    
                    cout << "Apres increment, nombre = " << nombre << endl;
                    return 0;
                }
                    
                // Définition des sous-programmes
                void incrementer (int valIncrement, int valAIncrementer)
                {
                    valAIncrementer = valAIncrementer + valIncrement;
                }
Etape 1 : Création de la copie
Appel de la procédure :
void incrementer (int valIncrement, int valAIncrementer) 
                        {
                            valAIncrementer = valAIncrementer + valIncrement;
                        }
Considérons l'appel suivant :
incrementer (2 , nombre) ;
Étape 1
: Lors de l'appel à la procedure
incrementer()
une
copie
du
                paramètre
nombre
est créée en mémoire centrale :
Etape 2 : Envoi de la copie à la procédure
Rappel du code de la procédure :
void incrementer (int valIncrement, int valAIncrementer) 
                        {
                            valAIncrementer = valAIncrementer + valIncrement;
                        }
Appel de la procédure :
incrementer (2 , nombre) ;
Étape 2
: La
copie
du paramètre
nombre
est envoyée à la procédure et vient remplacer le
                paramètre formel
valAIncrementer
:
Etape 3 : Exécution du code de la procédure
Rappel du code de la procédure :
void incrementer (int valIncrement, int valAIncrementer) 
                        {
                            valAIncrementer = valAIncrementer + valIncrement;
                        }
Appel de la procédure :
incrementer (2 , nombre) ;
Étape 3
: La procédure effectue le calcul avec la
copie
du paramètre
nombre
:
Etape 4 : Stockage du résultat du calcul...
Rappel du code de la procédure :
void incrementer (int valIncrement, int valAIncrementer) 
                        {
                            valAIncrementer = valAIncrementer + valIncrement;
                        }
Appel de la procédure :
incrementer (2 , nombre) ;
Étape 4
: Le résultat du calcul est affecté à la
copie
du paramètre
nombre
:
Etape 5 : Suppression de la copie en mémoire
Rappel du code de la procédure :
void incrementer (int valIncrement, int valAIncrementer) 
                        {
                            valAIncrementer = valAIncrementer + valIncrement;
                        }
Appel de la procédure :
incrementer (2 , nombre) ;
Étape 5
: La procédure a terminé de s'exécuter → la copie du
                paramètre
nombre
est effacée de la mémoire centrale :
Résultat final...
Le programme principal reprend son exécution :
cout << "Apres increment, nombre = " << nombre << endl;
... et affiche à l'écran la valeur de la variable nombre... qui n'a pas changé :
Passage par valeur - démonstration
Passage par valeur - conclusion
Un paramètre transmis par valeur est
protégé
: il ne peut être
                    modifié étant donné que le sous-programme travaille sur une
copie
de ce paramètre ;
Si une procédure doit modifier un paramètre car ce paramètre est un
                    résultat, il faut être en mesure de modifier sa valeur ;
Dans ce cas de figure, on s'orientera vers un passage de paramètre
                    par
référence
.

---
### Diapositive 25

Passage de paramètres par valeur

---
### Diapositive 26

Principe du passage par valeur
Par défaut, un paramètre est transmis par valeur. Dans ce mode, le
                sous-programme reçoit une copie du paramètre et non le paramètre lui-même :
cout << "Entrez un nombre : "; 
                        cin >> valeur1;
                        cout << "Entrez un autre nombre : "; 
                        cin >> valeur2;
                        
                        afficherSomme (valeur1, valeur2);
Remarques :
lorsque le sous-programme a terminé de s'exécuter, les copies des
                            paramètres sont
effacées
de la mémoire.
un paramètre transmis par valeur
ne peut pas être modifié
→ La valeur
                        du paramètre est donc
protégée
.

---
### Diapositive 27

Les étapes du passage par valeur via un exemple
#include <iostream> 
                using namespace std;
                    
                // Déclaration des sous-programmes
                void incrementer (int valIncrement, int valAIncrementer);
                // But : Incrémente valAIncrementer d'une valeur égale à valIncrement
                    
                int main (void) // Programme principal
                {
                    // VARIABLES
                    int nombre; // Nombre à incrementer
                    
                    // TRAITEMENTS  
                    cout << "Entrez un nombre : "; cin >> nombre;
                    
                    incrementer (2, nombre);
                    
                    cout << "Apres increment, nombre = " << nombre << endl;
                    return 0;
                }
                    
                // Définition des sous-programmes
                void incrementer (int valIncrement, int valAIncrementer)
                {
                    valAIncrementer = valAIncrementer + valIncrement;
                }

---
### Diapositive 28

Etape 1 : Création de la copie
Appel de la procédure :
void incrementer (int valIncrement, int valAIncrementer) 
                        {
                            valAIncrementer = valAIncrementer + valIncrement;
                        }
Considérons l'appel suivant :
incrementer (2 , nombre) ;
Étape 1
: Lors de l'appel à la procedure
incrementer()
une
copie
du
                paramètre
nombre
est créée en mémoire centrale :

---
### Diapositive 29

Etape 2 : Envoi de la copie à la procédure
Rappel du code de la procédure :
void incrementer (int valIncrement, int valAIncrementer) 
                        {
                            valAIncrementer = valAIncrementer + valIncrement;
                        }
Appel de la procédure :
incrementer (2 , nombre) ;
Étape 2
: La
copie
du paramètre
nombre
est envoyée à la procédure et vient remplacer le
                paramètre formel
valAIncrementer
:

---
### Diapositive 30

Etape 3 : Exécution du code de la procédure
Rappel du code de la procédure :
void incrementer (int valIncrement, int valAIncrementer) 
                        {
                            valAIncrementer = valAIncrementer + valIncrement;
                        }
Appel de la procédure :
incrementer (2 , nombre) ;
Étape 3
: La procédure effectue le calcul avec la
copie
du paramètre
nombre
:

---
### Diapositive 31

Etape 4 : Stockage du résultat du calcul...
Rappel du code de la procédure :
void incrementer (int valIncrement, int valAIncrementer) 
                        {
                            valAIncrementer = valAIncrementer + valIncrement;
                        }
Appel de la procédure :
incrementer (2 , nombre) ;
Étape 4
: Le résultat du calcul est affecté à la
copie
du paramètre
nombre
:

---
### Diapositive 32

Etape 5 : Suppression de la copie en mémoire
Rappel du code de la procédure :
void incrementer (int valIncrement, int valAIncrementer) 
                        {
                            valAIncrementer = valAIncrementer + valIncrement;
                        }
Appel de la procédure :
incrementer (2 , nombre) ;
Étape 5
: La procédure a terminé de s'exécuter → la copie du
                paramètre
nombre
est effacée de la mémoire centrale :

---
### Diapositive 33

Résultat final...
Le programme principal reprend son exécution :
cout << "Apres increment, nombre = " << nombre << endl;
... et affiche à l'écran la valeur de la variable nombre... qui n'a pas changé :

---
### Diapositive 34

Passage par valeur - démonstration

---
### Diapositive 35

Passage par valeur - conclusion
Un paramètre transmis par valeur est
protégé
: il ne peut être
                    modifié étant donné que le sous-programme travaille sur une
copie
de ce paramètre ;
Si une procédure doit modifier un paramètre car ce paramètre est un
                    résultat, il faut être en mesure de modifier sa valeur ;
Dans ce cas de figure, on s'orientera vers un passage de paramètre
                    par
référence
.

---
### Diapositive 36

Passage de paramètres par référence
Principe du passage par référence
Dans ce mode, le sous-programme reçoit
directement
le paramètre
                    et non une copie.
Pour préciser qu'un paramètre doit être transmis par référence, on
                    utilise le symbole
&
après le type du paramètre
                    qui doit être passé par référence.
Attention
: l'ajout du
                    symbole
&
est réalisé au niveau de la
déclaration
et de la
définition
du sous-programme mais pas au
                    niveau de l'appel !
Le passage par référence via un exemple
Reprenons le cas de la procédure
incrementer()
en utilisant cette fois-ci
                un
                passage
par référence
:
#include <iostream> 
                using namespace std;
                    
                // Déclaration des sous-programmes
                void incrementer (int valIncrement, int& valAIncrementer);
                // But : Incrémente valAIncrementer d'une valeur égale à valIncrement
                    
                int main (void) // Programme principal
                {
                   // VARIABLES
                    int nombre; // Nombre à incrementer
                    
                    // TRAITEMENTS  
                    cout << "Entrez un nombre : "; cin >> nombre;
                    
                    incrementer (2, nombre);
                    
                    cout << "Apres increment, nombre = " << nombre << endl;
                    return 0;
                }
                    
                // Définition des sous-programmes
                void incrementer (int valIncrement, int& valAIncrementer)
                {
                   valAIncrementer = valAIncrementer + valIncrement;
                }
Etape 1 : Transmission directe du paramètre
Rappel du code de la procédure :
void incrementer (int valIncrement, int& valAIncrementer) 
                        {
                            valAIncrementer = valAIncrementer + valIncrement;
                        }
Appel de la procédure :
incrementer (2 , nombre) ;
Étape 1
: L'esperluète (
&
)
                devant le paramètre
valAIncrementer
indique que
                ce paramètre doit être transmis
directement
à la procédure.
Lors de l'appel de la procédure
incrementer()
,
                        le paramètre
nombre
est transmis
directement
(pas de copie en mémoire) à la procédure.
Le paramètre formel
valAIncrementer
est alors remplacé par la
                        valeur de
nombre
.
Etape 2 : Exécution du code de la procédure
Rappel du code de la procédure :
void incrementer (int valIncrement, int& valAIncrementer) 
                            {
                                valAIncrementer = valAIncrementer + valIncrement;
                            }
Appel de la procédure :
incrementer (2 , nombre) ;
Étape 2
: La procédure effectue le calcul en utilisant
directement
la valeur du paramètre
nombre
:
Etape 3 : Stockage du résultat du calcul...
Rappel du code de la procédure :
void incrementer (int valIncrement, int& valAIncrementer) 
                            {
                                valAIncrementer = valAIncrementer + valIncrement;
                            }
Appel de la procédure :
incrementer (2 , nombre) ;
Étape 3
: Le résultat du calcul est affecté directement à
nombre
:
Résultat final...
Le programme principal reprend son exécution :
cout << "Apres increment, nombre = " << nombre << endl;
... et affiche à l'écran la valeur de la variable
nombre
... qui a été
                modifiée par la procédure puisqu'elle
                a travaillé
directement
dessus :
Passage par référence - démonstration
Passage par référence vs passage par valeur (1/1)
Lorsqu'un paramètre est transmis par
valeur
, la valeur du paramètre est
protégée
de toute erreur de programmation car le sous-programme
                    travaille sur une copie.
A l'inverse, lorsqu'un paramètre est transmis par
référence
, le
                    programmeur doit rester vigilant aux opérations qu'il applique sur le
                    paramètre car toute modification remonte ensuite au niveau du
                    programme appelant !
Passage par référence vs passage par valeur (2/2)
Le passage de paramètre par
valeur
protège les valeurs transmises au
                    sous-programme mais nécessite au préalable de déclencher une opération
                    de copie des paramètres. Cette opération de copie peut, lorsque les
                    paramètres sont "volumineux",
[1]
ralentir l'exécution du programme et/ou
                    provoquer une consommation de mémoire excessive.
Dans ce dernier cas de figure, on s'orientera vers un passage de
                    paramètres par
référence constante
.
[1]
Des tableaux ou des enregistrements complexes par exemple.

---
### Diapositive 37

Passage de paramètres par référence

---
### Diapositive 38

Principe du passage par référence
Dans ce mode, le sous-programme reçoit
directement
le paramètre
                    et non une copie.
Pour préciser qu'un paramètre doit être transmis par référence, on
                    utilise le symbole
&
après le type du paramètre
                    qui doit être passé par référence.
Attention
: l'ajout du
                    symbole
&
est réalisé au niveau de la
déclaration
et de la
définition
du sous-programme mais pas au
                    niveau de l'appel !

---
### Diapositive 39

Le passage par référence via un exemple
Reprenons le cas de la procédure
incrementer()
en utilisant cette fois-ci
                un
                passage
par référence
:
#include <iostream> 
                using namespace std;
                    
                // Déclaration des sous-programmes
                void incrementer (int valIncrement, int& valAIncrementer);
                // But : Incrémente valAIncrementer d'une valeur égale à valIncrement
                    
                int main (void) // Programme principal
                {
                   // VARIABLES
                    int nombre; // Nombre à incrementer
                    
                    // TRAITEMENTS  
                    cout << "Entrez un nombre : "; cin >> nombre;
                    
                    incrementer (2, nombre);
                    
                    cout << "Apres increment, nombre = " << nombre << endl;
                    return 0;
                }
                    
                // Définition des sous-programmes
                void incrementer (int valIncrement, int& valAIncrementer)
                {
                   valAIncrementer = valAIncrementer + valIncrement;
                }

---
### Diapositive 40

Etape 1 : Transmission directe du paramètre
Rappel du code de la procédure :
void incrementer (int valIncrement, int& valAIncrementer) 
                        {
                            valAIncrementer = valAIncrementer + valIncrement;
                        }
Appel de la procédure :
incrementer (2 , nombre) ;
Étape 1
: L'esperluète (
&
)
                devant le paramètre
valAIncrementer
indique que
                ce paramètre doit être transmis
directement
à la procédure.
Lors de l'appel de la procédure
incrementer()
,
                        le paramètre
nombre
est transmis
directement
(pas de copie en mémoire) à la procédure.
Le paramètre formel
valAIncrementer
est alors remplacé par la
                        valeur de
nombre
.

---
### Diapositive 41

Etape 2 : Exécution du code de la procédure
Rappel du code de la procédure :
void incrementer (int valIncrement, int& valAIncrementer) 
                            {
                                valAIncrementer = valAIncrementer + valIncrement;
                            }
Appel de la procédure :
incrementer (2 , nombre) ;
Étape 2
: La procédure effectue le calcul en utilisant
directement
la valeur du paramètre
nombre
:

---
### Diapositive 42

Etape 3 : Stockage du résultat du calcul...
Rappel du code de la procédure :
void incrementer (int valIncrement, int& valAIncrementer) 
                            {
                                valAIncrementer = valAIncrementer + valIncrement;
                            }
Appel de la procédure :
incrementer (2 , nombre) ;
Étape 3
: Le résultat du calcul est affecté directement à
nombre
:

---
### Diapositive 43

Résultat final...
Le programme principal reprend son exécution :
cout << "Apres increment, nombre = " << nombre << endl;
... et affiche à l'écran la valeur de la variable
nombre
... qui a été
                modifiée par la procédure puisqu'elle
                a travaillé
directement
dessus :

---
### Diapositive 44

Passage par référence - démonstration

---
### Diapositive 45

Passage par référence vs passage par valeur (1/1)
Lorsqu'un paramètre est transmis par
valeur
, la valeur du paramètre est
protégée
de toute erreur de programmation car le sous-programme
                    travaille sur une copie.
A l'inverse, lorsqu'un paramètre est transmis par
référence
, le
                    programmeur doit rester vigilant aux opérations qu'il applique sur le
                    paramètre car toute modification remonte ensuite au niveau du
                    programme appelant !

---
### Diapositive 46

Passage par référence vs passage par valeur (2/2)
Le passage de paramètre par
valeur
protège les valeurs transmises au
                    sous-programme mais nécessite au préalable de déclencher une opération
                    de copie des paramètres. Cette opération de copie peut, lorsque les
                    paramètres sont "volumineux",
[1]
ralentir l'exécution du programme et/ou
                    provoquer une consommation de mémoire excessive.
Dans ce dernier cas de figure, on s'orientera vers un passage de
                    paramètres par
référence constante
.
[1]
Des tableaux ou des enregistrements complexes par exemple.

---
### Diapositive 47

Passage de paramètres par référence constante
Principe du passage par référence constante
Le passage par
référence constante
est similaire au passage de
                    paramètre par référence, si ce n'est que le paramètre transmis
n'est pas modifiable
par le sous-programme.
Comme pour le passage par référence, on utilisera le symbole
&
pour
                    préciser que le paramètre est transmis
directement sans copie
.
Pour bloquer la modification sur le paramètre transmis, on précisera à
                    l'aide du mot clé
const
[1]
que le paramètre concerné ne peut donc être modifié.
Dans ce mode, le paramètre est donc passé
directement
au
                    sous-programme (pas de copie), mais sa valeur
ne peut être modifiée
par le sous-programme.
[1]
A la déclaration et à la définition du sous-programme, mais pas
                à l'appel.
Le passage par référence constante via un exemple
Reprenons le cas de la procédure
incrementer()
en utilisant cette fois-ci
                un passage
par référence constante
:
#include <iostream> 
                using namespace std;
                    
                // Déclaration des sous-programmes
                void incrementer (int valIncrement, const int& valAIncrementer);
                // But : Incrémente valAIncrementer d'une valeur égale à valIncrement
                    
                int main (void) // Programme principal
                {
                   // VARIABLES
                    int nombre; // Nombre à incrementer
                    
                    // TRAITEMENTS  
                    cout << "Entrez un nombre : "; cin >> nombre;
                    
                    incrementer (2, nombre);
                    
                    cout << "Apres increment, nombre = " << nombre << endl;
                    return 0;
                }
                    
                // Définition des sous-programmes
                void incrementer (int valIncrement, const int& valAIncrementer)
                {
                   valAIncrementer = valAIncrementer + valIncrement;
                }
Protection du paramètre effective dès la compilation
Dès la phase de compilation, une erreur apparaı̂t mettant en évidence
                l’incohérence du code : impossible de modifier un paramètre transmis par référence constante !
Passage par référence constante - démonstration
Choisir la manière de passer un paramètre
Utiliser le passage par
valeur
pour les très ”petits” objets.
[1]
Utiliser le passage par
référence constante
pour les
                        objets ”volumineux”
[2]
qui n’ont pas besoin d’être modifiés.
Utiliser le passage par
référence
uniquement quand
                        on y est obligé.
Bjarne Stroustrup -
Programmation : Principes et pratiques en C++ - Pearson 2010.
[1]
moins de 16 octets selon B. Stroustrup.
[2]
plus de 16 octets selon B. Stroustrup.

---
### Diapositive 48

Passage de paramètres par référence constante

---
### Diapositive 49

Principe du passage par référence constante
Le passage par
référence constante
est similaire au passage de
                    paramètre par référence, si ce n'est que le paramètre transmis
n'est pas modifiable
par le sous-programme.
Comme pour le passage par référence, on utilisera le symbole
&
pour
                    préciser que le paramètre est transmis
directement sans copie
.
Pour bloquer la modification sur le paramètre transmis, on précisera à
                    l'aide du mot clé
const
[1]
que le paramètre concerné ne peut donc être modifié.
Dans ce mode, le paramètre est donc passé
directement
au
                    sous-programme (pas de copie), mais sa valeur
ne peut être modifiée
par le sous-programme.
[1]
A la déclaration et à la définition du sous-programme, mais pas
                à l'appel.

---
### Diapositive 50

Le passage par référence constante via un exemple
Reprenons le cas de la procédure
incrementer()
en utilisant cette fois-ci
                un passage
par référence constante
:
#include <iostream> 
                using namespace std;
                    
                // Déclaration des sous-programmes
                void incrementer (int valIncrement, const int& valAIncrementer);
                // But : Incrémente valAIncrementer d'une valeur égale à valIncrement
                    
                int main (void) // Programme principal
                {
                   // VARIABLES
                    int nombre; // Nombre à incrementer
                    
                    // TRAITEMENTS  
                    cout << "Entrez un nombre : "; cin >> nombre;
                    
                    incrementer (2, nombre);
                    
                    cout << "Apres increment, nombre = " << nombre << endl;
                    return 0;
                }
                    
                // Définition des sous-programmes
                void incrementer (int valIncrement, const int& valAIncrementer)
                {
                   valAIncrementer = valAIncrementer + valIncrement;
                }

---
### Diapositive 51

Protection du paramètre effective dès la compilation
Dès la phase de compilation, une erreur apparaı̂t mettant en évidence
                l’incohérence du code : impossible de modifier un paramètre transmis par référence constante !

---
### Diapositive 52

Passage par référence constante - démonstration

---
### Diapositive 53

Choisir la manière de passer un paramètre
Utiliser le passage par
valeur
pour les très ”petits” objets.
[1]
Utiliser le passage par
référence constante
pour les
                        objets ”volumineux”
[2]
qui n’ont pas besoin d’être modifiés.
Utiliser le passage par
référence
uniquement quand
                        on y est obligé.
Bjarne Stroustrup -
Programmation : Principes et pratiques en C++ - Pearson 2010.
[1]
moins de 16 octets selon B. Stroustrup.
[2]
plus de 16 octets selon B. Stroustrup.

---
### Diapositive 54

Cas des tableaux en paramètre
Particularité des tableaux en paramètre
Le langage C++ a été conçu en privilégiant d'abord des critères
                    d'efficacité.
Les tableaux étant considérés comme des objets ”volumineux”,
[1]
ils sont
par défaut
passés par
référence
et non par
                    valeur afin
d'éviter la recopie
en mémoire de tous les éléments du tableau.
A retenir : Lorsqu'un tableau est transmis en paramètre d'un
                    sous-programme, il pourra être passé par
référence
ou par
référence
                        constante uniquement
.
[1]
au sens de B. Stroustrup
Tableau par référence : exemple (1/3)
void incrTab (int tab[], unsigned short int nbCases);
                /* But : Incrémente de 1 toutes les valeurs du tableau tab
                   de taille nbCases*/
Dans le sous-programme ci-dessus :
Le paramètre
tab
est transmis par
référence
car
                    c'est un tableau
                    (et de ce fait, il n'est pas nécessaire d'utiliser
&
).
                    Ces valeurs pourront donc être modifiées ;
le paramètre
tailleTab
est transmis par
valeur
(conformément aux
                    règles vues précédemment).
Tableau par référence : exemple (2/3)
#include <iostream> 

                    using namespace std;
                    
                    // Déclaration des sous-programmes
                    void incrTab (int tab[], unsigned int tailleTab);
                    // But : Incrémente de 1 toutes les valeurs du tableau tab de taille tailleTab
                    
                    int main (void) // Corps du programme principal
                    {
                      // VARIABLES
                      const unsigned int NB_CASES = 5; // Taille du tableau
                      int notes[NB_CASES] = {13, 9, 15, 13, 5}; // Tableau de notes à incrémenter
                    
                      // TRAITEMENTS  
                      incrTab (notes, NB_CASES);
                      // notes, NB_CASES >> afficher le tableau après incrémentation >> (écran)
                      for (unsigned int i = 0 ; i < NB_CASES ; i++)
                      {
                        cout << notes[i] << "  "; 
                      }
                      return 0;
                    }
                    // Définition des sous-programmes
                    void incrTab (int tab[], unsigned int tailleTab)
                    {
                      for (unsigned int i = 0 ; i < tailleTab ; i++)
                      {
                        tab[i]++;
                      }
                    }
Tableau par référence : exemple (3/3)
Résultat de l'exécution du programme précédent :
Tableau par référence constante
Lorsque le sous-programme n'a pas besoin de modifier le tableau, on procédera
                à un passage de paramètre par
référence constante
:
void recherche (const int tab[], int valATrouver, unsigned short int& pos, bool& trouve);
            /* But : Recherche la valeur valATrouver dans le tableau tab.
              - si la recherche aboutie, trouve prend la valeur vraie et pos indique la 
                position où l'élément a été trouvé
              - si la recherche n'aboutie pas, trouve prend la valeur faux et pos ne 
                contient aucune valeur pertinente. */
Ci-dessus, le tableau
tab
est passé par
référence constante
car le
                    programme effectue uniquement une recherche et cette recherche ne doit
                    pas modifier les éléments du tableau ;
l'entier
valATrouver
est passé par
valeur
car sa
                    valeur ne doit pas être
                    modifiée par la recherche et car sa taille est plus petite que 16 octets ;
le booléen
trouve
et l'entier
pos
sont
                    passés
                    par
référence
car ce sont des
                    résultats et que le sous-programme a besoin de leur attribuer une valeur.
Évaluons ce que vous avez retenu...
Sortez vos smartphones

---
### Diapositive 55

Cas des tableaux en paramètre

---
### Diapositive 56

Particularité des tableaux en paramètre
Le langage C++ a été conçu en privilégiant d'abord des critères
                    d'efficacité.
Les tableaux étant considérés comme des objets ”volumineux”,
[1]
ils sont
par défaut
passés par
référence
et non par
                    valeur afin
d'éviter la recopie
en mémoire de tous les éléments du tableau.
A retenir : Lorsqu'un tableau est transmis en paramètre d'un
                    sous-programme, il pourra être passé par
référence
ou par
référence
                        constante uniquement
.
[1]
au sens de B. Stroustrup

---
### Diapositive 57

Tableau par référence : exemple (1/3)
void incrTab (int tab[], unsigned short int nbCases);
                /* But : Incrémente de 1 toutes les valeurs du tableau tab
                   de taille nbCases*/
Dans le sous-programme ci-dessus :
Le paramètre
tab
est transmis par
référence
car
                    c'est un tableau
                    (et de ce fait, il n'est pas nécessaire d'utiliser
&
).
                    Ces valeurs pourront donc être modifiées ;
le paramètre
tailleTab
est transmis par
valeur
(conformément aux
                    règles vues précédemment).

---
### Diapositive 58

Tableau par référence : exemple (2/3)
#include <iostream> 

                    using namespace std;
                    
                    // Déclaration des sous-programmes
                    void incrTab (int tab[], unsigned int tailleTab);
                    // But : Incrémente de 1 toutes les valeurs du tableau tab de taille tailleTab
                    
                    int main (void) // Corps du programme principal
                    {
                      // VARIABLES
                      const unsigned int NB_CASES = 5; // Taille du tableau
                      int notes[NB_CASES] = {13, 9, 15, 13, 5}; // Tableau de notes à incrémenter
                    
                      // TRAITEMENTS  
                      incrTab (notes, NB_CASES);
                      // notes, NB_CASES >> afficher le tableau après incrémentation >> (écran)
                      for (unsigned int i = 0 ; i < NB_CASES ; i++)
                      {
                        cout << notes[i] << "  "; 
                      }
                      return 0;
                    }
                    // Définition des sous-programmes
                    void incrTab (int tab[], unsigned int tailleTab)
                    {
                      for (unsigned int i = 0 ; i < tailleTab ; i++)
                      {
                        tab[i]++;
                      }
                    }

---
### Diapositive 59

Tableau par référence : exemple (3/3)
Résultat de l'exécution du programme précédent :

---
### Diapositive 60

Tableau par référence constante
Lorsque le sous-programme n'a pas besoin de modifier le tableau, on procédera
                à un passage de paramètre par
référence constante
:
void recherche (const int tab[], int valATrouver, unsigned short int& pos, bool& trouve);
            /* But : Recherche la valeur valATrouver dans le tableau tab.
              - si la recherche aboutie, trouve prend la valeur vraie et pos indique la 
                position où l'élément a été trouvé
              - si la recherche n'aboutie pas, trouve prend la valeur faux et pos ne 
                contient aucune valeur pertinente. */
Ci-dessus, le tableau
tab
est passé par
référence constante
car le
                    programme effectue uniquement une recherche et cette recherche ne doit
                    pas modifier les éléments du tableau ;
l'entier
valATrouver
est passé par
valeur
car sa
                    valeur ne doit pas être
                    modifiée par la recherche et car sa taille est plus petite que 16 octets ;
le booléen
trouve
et l'entier
pos
sont
                    passés
                    par
référence
car ce sont des
                    résultats et que le sous-programme a besoin de leur attribuer une valeur.

---
### Diapositive 61

Évaluons ce que vous avez retenu...
Sortez vos smartphones

---
### Diapositive 62

Variables locales à un sous-programme
Variables locales à un sous-programme
Un sous-programme peut avoir son propre dictionnaire de variables ;
Ces variables ne sont alors accessibles
qu'au sein du
                    sous-programme
;
Ces variables existent le temps de l'exécution du sous-programme →
                    Elles ne peuvent donc pas être manipulées dans le programme
                    appelant.
Variables locales - exemple
#include <iostream> 
                using namespace std;

                // Déclaration des sous-programmes
                void afficherPerimetre (double ray);
                // But : Affiche à l'écran le périmètre du cercle de rayon ray
                
                int main (void) // Corps du programme principal
                {
                  // Variable du programme principal
                  double rayonCercle; // Le rayon du cercle dont on veut calculer le perimetre
                
                  // TRAITEMENTS du programme principal
                  cout << "Entrez le rayon du cercle : "; cin >> rayonCercle;
                  afficherPerimetre(rayonCercle);
                  cout << perimetre << endl; // INTERDIT !
                  return 0;
                }
                
                // Définition des sous-programmes
                void afficherPerimetre (double ray)
                {
                  // VARIABLES LOCALES au sous-programme afficherPerimetre
                  double perimetre; // Perimètre du cercle de rayon ray
                  const float PI = 3.14; // valeur de pi utlisée pour calculer le périmètre
                
                  // TRAITEMENTS du sous-programme afficherPerimetre
                  perimetre = 2 * PI * ray;    
                  cout << "Le perimetre du cercle est egal a " << perimetre << endl;
                }

---
### Diapositive 63

Variables locales à un sous-programme

---
### Diapositive 64

Variables locales à un sous-programme
Un sous-programme peut avoir son propre dictionnaire de variables ;
Ces variables ne sont alors accessibles
qu'au sein du
                    sous-programme
;
Ces variables existent le temps de l'exécution du sous-programme →
                    Elles ne peuvent donc pas être manipulées dans le programme
                    appelant.

---
### Diapositive 65

Variables locales - exemple
#include <iostream> 
                using namespace std;

                // Déclaration des sous-programmes
                void afficherPerimetre (double ray);
                // But : Affiche à l'écran le périmètre du cercle de rayon ray
                
                int main (void) // Corps du programme principal
                {
                  // Variable du programme principal
                  double rayonCercle; // Le rayon du cercle dont on veut calculer le perimetre
                
                  // TRAITEMENTS du programme principal
                  cout << "Entrez le rayon du cercle : "; cin >> rayonCercle;
                  afficherPerimetre(rayonCercle);
                  cout << perimetre << endl; // INTERDIT !
                  return 0;
                }
                
                // Définition des sous-programmes
                void afficherPerimetre (double ray)
                {
                  // VARIABLES LOCALES au sous-programme afficherPerimetre
                  double perimetre; // Perimètre du cercle de rayon ray
                  const float PI = 3.14; // valeur de pi utlisée pour calculer le périmètre
                
                  // TRAITEMENTS du sous-programme afficherPerimetre
                  perimetre = 2 * PI * ray;    
                  cout << "Le perimetre du cercle est egal a " << perimetre << endl;
                }

---
### Diapositive 66

Bonnes pratiques
Bonnes pratiques
[1]
(1/4)
Rangez les paramètres dans l'ordre données, données/résultats,
                        résultats plutôt que de ranger vos paramètres aux hasard ou par ordre
                        alphabétique.
void recherche (const int tab[], unsigned int nbCases, int valATrouver, 
                                        bool & trouve, unsigned short int& pos );
Exception à cette règle : Si le sous-programme prend en
                        paramètre un
                        tableau et sa taille, on aura tendance à placer le tableau en premier, suivi de sa
                        taille, même si le tableau est un résultat et que sa taille est une donnée :
void inverserValeurs (double& tab[] , unsigned int nbCases);
[1]
McConnell, S. - Tout sur le code - Pour concevoir du logiciel de
                qualité, 2e édition - Dunod 2005
Bonnes pratiques
[1]
(2/4)
Placez les paramètres d'état ou d'erreur en dernier :
void diviser (double dividende, double diviseur , 
                                      double& resultat, bool& divParZero) ;
Utilisez
tous
les paramètres d'un sous-programme : Si vous passez un
                        paramètre à un sous-programme, utilisez-le. Si vous ne l'utilisez pas, retirez le
                        de l'entête du sous-programme.
N'employez pas de paramètres de sous-programme comme variable de
                        travail : Employez des variables locales au sous-programme.
[1]
McConnell, S. - Tout sur le code - Pour concevoir du logiciel de
                qualité, 2e édition - Dunod 2005
Bonnes pratiques (3/4)
Limitez le nombre de paramètres d'un sous-programme :
à
7
selon S.
                        McConnell :
Des recherches psychologiques ont montré que la
                            plupart des gens ne peuvent pas garder en tête plus
                            de 7 éléments d'information à la fois.
Steve McConnell -
Tout sur le code - Pour concevoir du logiciel de qualité - Dunod
                                2005.
à
3
selon R.C.
                        Martin ("oncle Bob") :
Lorsqu'il y a plus de trois arguments, vous devez vous
                            interroger sur leur raison d'être et faire en sorte d'éviter
                            cette situation.
Robert Cecil Martin -
Coder proprement - Pearson 2009.
Bonnes pratiques
[1]
(4/4)
Documentez vos sous-programmes en précisant, selon la situation :
Quels sont les paramètres en entrée, les paramètres modifiés et le
                    paramètres de sortie ;
Les unités des paramètres numériques (cm, mètres...) ;
La signification des codes d'état ou des valeurs d'erreurs si vous
                    n'employez pas d'énumérations ;
Les plages de validité des valeurs attendues ;
Les valeurs particulières qui ne doivent jamais apparaı̂tre.
[1]
McConnell, S. - Tout sur le code - Pour concevoir du logiciel de
                qualité, 2e édition - Dunod 2005

---
### Diapositive 67

Bonnes pratiques

---
### Diapositive 68

Bonnes pratiques
[1]
(1/4)
Rangez les paramètres dans l'ordre données, données/résultats,
                        résultats plutôt que de ranger vos paramètres aux hasard ou par ordre
                        alphabétique.
void recherche (const int tab[], unsigned int nbCases, int valATrouver, 
                                        bool & trouve, unsigned short int& pos );
Exception à cette règle : Si le sous-programme prend en
                        paramètre un
                        tableau et sa taille, on aura tendance à placer le tableau en premier, suivi de sa
                        taille, même si le tableau est un résultat et que sa taille est une donnée :
void inverserValeurs (double& tab[] , unsigned int nbCases);
[1]
McConnell, S. - Tout sur le code - Pour concevoir du logiciel de
                qualité, 2e édition - Dunod 2005

---
### Diapositive 69

Bonnes pratiques
[1]
(2/4)
Placez les paramètres d'état ou d'erreur en dernier :
void diviser (double dividende, double diviseur , 
                                      double& resultat, bool& divParZero) ;
Utilisez
tous
les paramètres d'un sous-programme : Si vous passez un
                        paramètre à un sous-programme, utilisez-le. Si vous ne l'utilisez pas, retirez le
                        de l'entête du sous-programme.
N'employez pas de paramètres de sous-programme comme variable de
                        travail : Employez des variables locales au sous-programme.
[1]
McConnell, S. - Tout sur le code - Pour concevoir du logiciel de
                qualité, 2e édition - Dunod 2005

---
### Diapositive 70

Bonnes pratiques (3/4)
Limitez le nombre de paramètres d'un sous-programme :
à
7
selon S.
                        McConnell :
Des recherches psychologiques ont montré que la
                            plupart des gens ne peuvent pas garder en tête plus
                            de 7 éléments d'information à la fois.
Steve McConnell -
Tout sur le code - Pour concevoir du logiciel de qualité - Dunod
                                2005.
à
3
selon R.C.
                        Martin ("oncle Bob") :
Lorsqu'il y a plus de trois arguments, vous devez vous
                            interroger sur leur raison d'être et faire en sorte d'éviter
                            cette situation.
Robert Cecil Martin -
Coder proprement - Pearson 2009.

---
### Diapositive 71

Bonnes pratiques
[1]
(4/4)
Documentez vos sous-programmes en précisant, selon la situation :
Quels sont les paramètres en entrée, les paramètres modifiés et le
                    paramètres de sortie ;
Les unités des paramètres numériques (cm, mètres...) ;
La signification des codes d'état ou des valeurs d'erreurs si vous
                    n'employez pas d'énumérations ;
Les plages de validité des valeurs attendues ;
Les valeurs particulières qui ne doivent jamais apparaı̂tre.
[1]
McConnell, S. - Tout sur le code - Pour concevoir du logiciel de
                qualité, 2e édition - Dunod 2005
