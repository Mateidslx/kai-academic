# Présentation

Source: https://patrick-etcheverry.github.io/r1.01-initiation-au-dev/Cours/01-specifs


---
### Diapositive 1

Analyse et spécification d'un problème algorithmique
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
3
Spécifications externes : Principes
9
Spécifications externes : Exemple
15
Définitions
22
Spécifications internes : Principes
36
Spécifications internes : Exemple
60

---
### Diapositive 3

Plan du cours
Introduction
3
Spécifications externes : Principes
9
Spécifications externes : Exemple
15
Définitions
22
Spécifications internes : Principes
36
Spécifications internes : Exemple
60

---
### Diapositive 4

Introduction
De l'importance de la phase d'analyse...
Avant d’élaborer un programme, il est primordial de
bien cerner les
                    propriétés du problème
à résoudre.
Sans cette phase d’analyse, la solution a peu de chance de répondre
                    parfaitement au problème de départ.
D'autre part, certaines propriétés du problème, si elles sont
                    identifiées
                    suffisamment tôt, peuvent parfois être exploitées pour élaborer des
                    solutions plus simples et/ou plus efficaces...
Paroles d'experts...
"Si j'avais une heure pour résoudre un problème,
                        je prendrais 55 minutes à réfléchir au problème
                        et 5 minutes à penser aux solutions."
Attribué à Albert Einstein
"Il faut définir le problème aussi complètement
                        que possible avant de réfléchir à une quelconque
                        solution."
Jacques Arsac,
Préceptes pour programmer, Dunod, 1991
De l'importance de la phase de spécification...
Savoir
spécifier
précisément
un problème, un besoin, une solution est essentiel pour pouvoir échanger avec :
un co-équipier
un chef de projet
un client
mais aussi une
                    intelligence artificielle...
Caractéristiques des problèmes algorithmiques
Les problèmes traités en algorithmique sont ciblés et se limitent
                souvent à répondre à un objectif unique :
rechercher un élément dans un tableau,
trier un fichier par ordre alphabétique,
compter le nombre d'éléments enregistrés dans une liste,
...
Bien que souvent restreints, certains problèmes algorithmiques peuvent se révéler très complexes à
                résoudre...
Analyser et spécifier les caractéristiques d'un problème algorithmique
Pour analyser, identifier et spécifier les caractéristiques du problème à résoudre, une approche
                consiste à établir successivement :
les spécifications
externes
du problème ;
les spécifications
internes
du problème.

---
### Diapositive 5

Introduction

---
### Diapositive 6

De l'importance de la phase d'analyse...
Avant d’élaborer un programme, il est primordial de
bien cerner les
                    propriétés du problème
à résoudre.
Sans cette phase d’analyse, la solution a peu de chance de répondre
                    parfaitement au problème de départ.
D'autre part, certaines propriétés du problème, si elles sont
                    identifiées
                    suffisamment tôt, peuvent parfois être exploitées pour élaborer des
                    solutions plus simples et/ou plus efficaces...

---
### Diapositive 7

Paroles d'experts...
"Si j'avais une heure pour résoudre un problème,
                        je prendrais 55 minutes à réfléchir au problème
                        et 5 minutes à penser aux solutions."
Attribué à Albert Einstein
"Il faut définir le problème aussi complètement
                        que possible avant de réfléchir à une quelconque
                        solution."
Jacques Arsac,
Préceptes pour programmer, Dunod, 1991

---
### Diapositive 8

De l'importance de la phase de spécification...
Savoir
spécifier
précisément
un problème, un besoin, une solution est essentiel pour pouvoir échanger avec :
un co-équipier
un chef de projet
un client
mais aussi une
                    intelligence artificielle...

---
### Diapositive 9

Caractéristiques des problèmes algorithmiques
Les problèmes traités en algorithmique sont ciblés et se limitent
                souvent à répondre à un objectif unique :
rechercher un élément dans un tableau,
trier un fichier par ordre alphabétique,
compter le nombre d'éléments enregistrés dans une liste,
...
Bien que souvent restreints, certains problèmes algorithmiques peuvent se révéler très complexes à
                résoudre...

---
### Diapositive 10

Analyser et spécifier les caractéristiques d'un problème algorithmique
Pour analyser, identifier et spécifier les caractéristiques du problème à résoudre, une approche
                consiste à établir successivement :
les spécifications
externes
du problème ;
les spécifications
internes
du problème.

---
### Diapositive 11

Spécifications externes : Principe
Spécifications externes : De quoi s'agit-il ?
Les spécifications externes d'un programme visent à
définir
                    ce que le programme doit faire
par rapport à l'utilisateur.
Il s'agit de décrire
le quoi
et non le comment
[1]
.
Objectif :
Spécifier clairement tous les "non-dits".
[1]
Le "comment" sera décrit par un algorithme.
Spécifications externes : Étape 1
On spécifie les différents comportements possibles du programme :
comportement idéal
[1]
comportements particuliers
[2]
comportements en cas d'erreur
[3]
[1]
on parlera de
scénario nominal
[2]
on parlera de
scénarios alternatifs
[3]
on parlera de
scénarios d'exception
Spécifications externes : Étape 2
Pour
chaque
comportement précédemment identifié, on élaborera un jeu d'essai mettant en évidence :
ce que voit l'utilisateur
à l'écran (sous forme d'un
                    croquis) ;
les informations en
donnée
du programme ;
les
résultats
attendus par rapport aux données entrées ;
les
propriétés
discutables et retenues sur les
                    informations
                    utilisées en données et/ou en résultats.
Ce travail va soulever des questions sur le programme à réaliser :
                    les réponses possibles devront être discutées
                    et les réponses retenues contribueront à clarifier le travail à réaliser

---
### Diapositive 12

Spécifications externes : Principe

---
### Diapositive 13

Spécifications externes : De quoi s'agit-il ?
Les spécifications externes d'un programme visent à
définir
                    ce que le programme doit faire
par rapport à l'utilisateur.
Il s'agit de décrire
le quoi
et non le comment
[1]
.
Objectif :
Spécifier clairement tous les "non-dits".
[1]
Le "comment" sera décrit par un algorithme.

---
### Diapositive 14

Spécifications externes : Étape 1
On spécifie les différents comportements possibles du programme :
comportement idéal
[1]
comportements particuliers
[2]
comportements en cas d'erreur
[3]
[1]
on parlera de
scénario nominal
[2]
on parlera de
scénarios alternatifs
[3]
on parlera de
scénarios d'exception

---
### Diapositive 15

Spécifications externes : Étape 2
Pour
chaque
comportement précédemment identifié, on élaborera un jeu d'essai mettant en évidence :
ce que voit l'utilisateur
à l'écran (sous forme d'un
                    croquis) ;
les informations en
donnée
du programme ;
les
résultats
attendus par rapport aux données entrées ;
les
propriétés
discutables et retenues sur les
                    informations
                    utilisées en données et/ou en résultats.
Ce travail va soulever des questions sur le programme à réaliser :
                    les réponses possibles devront être discutées
                    et les réponses retenues contribueront à clarifier le travail à réaliser

---
### Diapositive 16

Spécifications externes : Exemple
Problème de départ et objectif
Élaborer un programme permettant de convertir en dollars
                une somme de départ exprimée en euros...
Rappels :
l'objectif des spécifications externes est de
clarifier les caractéristiques
du programme à élaborer.
le moyen d'y parvenir consiste à élaborer un ou plusieurs
jeux d'essais
décrivant le comportement de ce programme...
Etape 1 : Identifier les scénarios possibles...
Pour cet exemple, on pourrait considérer trois scénarios :
Scénario nominal
(cas le plus fréquent) : le programme parvient à réaliser
                    la conversion euros → dollars ;
Scénario alternatif
(cas particulier) : l'utilisateur souhaite convertir une somme de... 0 € ;
Scénario d'exception
(cas d'erreur) : le programme ne peut pas réaliser la conversion à cause
                    d'une erreur de saisie de la part de l'utilisateur.
Etape 2 : Élaborer un jeu d'essai pour chaque scénario identifié (1/3)
Scénario nominal
            (comportement le plus fréquent)
Ce que voit l'utilisateur :
Données et résultats pour ce jeu d'essai :
Donnée : 12.99
Résultat attendu : 16.89
Propriétés mises en évidence sur ce jeu d'essai
                    :
La valeur du taux de conversion euros → dollars
                        est intégrée au
                        programme (elle ne sera pas saisie).
le résultat de la conversion aura une précision de 2
                        chiffres après la
                        virgule.
Etape 2 : Élaborer un jeu d'essai pour chaque scénario identifié (2/3)
Scénario alternatif
            (comportements moins fréquent / cas particuliers)
Ce que voit l'utilisateur :
Données et résultats pour ce jeu d'essai :
Donnée : 0
Résultat attendu : 0
Nouvelles propriétés mises en évidence par ce jeu d'essai :
Une somme de départ égale à 0 n'est pas considéré comme un cas d'erreur ;
Dans ce cas particulier, le programme pourrait se
                        dispenser du calcul de conversion (→ piste éventuelle pour optimiser le programme ?).
Etape 2 : Élaborer un jeu d'essai pour chaque scénario identifié (3/3)
Scénario d'exception
            (comportement du programme en cas d'erreur)
Ce que voit l'utilisateur :
Données et résultats pour ce jeu d'essai :
Donnée : -100
Résultat attendu :
                            Le message d'erreur "Erreur de saisie. Conversion impossible."
Nouvelles propriétés mises en évidence par ce jeu d'essai :
Une erreur de saisie ne doit pas faire "planter" le programme ;
Le message d'erreur affiché reste général,
                        il ne précise pas la nature de l'erreur (ici saisie d'un nombre négatif).
Un mot sur la gestion des cas d'erreur...
La conception de tout programme informatique
doit
tenir compte des cas
                    d'erreurs qui peuvent survenir ;
Cet aspect est particulièrement important lorsque l'utilisateur peut
                    introduire des données dans le programme ;
[1]
Pour le moment
,
nous ne décrirons pas les cas d'erreurs
, lorsque nous
                            établirons les spécifications externes d'un programme.
                            La prise en compte des erreurs sera abordée lorsque vous travaillerez sur
                            les techniques de gestion des erreurs.
[2]
[1]
Never Trust User Input
: Arsac,
                J. - Préceptes pour programmer - Dunod, 1991
[2]
Semestre 2 :  R2.03 - Qualité de développement.

---
### Diapositive 17

Spécifications externes : Exemple

---
### Diapositive 18

Problème de départ et objectif
Élaborer un programme permettant de convertir en dollars
                une somme de départ exprimée en euros...
Rappels :
l'objectif des spécifications externes est de
clarifier les caractéristiques
du programme à élaborer.
le moyen d'y parvenir consiste à élaborer un ou plusieurs
jeux d'essais
décrivant le comportement de ce programme...

---
### Diapositive 19

Etape 1 : Identifier les scénarios possibles...
Pour cet exemple, on pourrait considérer trois scénarios :
Scénario nominal
(cas le plus fréquent) : le programme parvient à réaliser
                    la conversion euros → dollars ;
Scénario alternatif
(cas particulier) : l'utilisateur souhaite convertir une somme de... 0 € ;
Scénario d'exception
(cas d'erreur) : le programme ne peut pas réaliser la conversion à cause
                    d'une erreur de saisie de la part de l'utilisateur.

---
### Diapositive 20

Etape 2 : Élaborer un jeu d'essai pour chaque scénario identifié (1/3)
Scénario nominal
            (comportement le plus fréquent)
Ce que voit l'utilisateur :
Données et résultats pour ce jeu d'essai :
Donnée : 12.99
Résultat attendu : 16.89
Propriétés mises en évidence sur ce jeu d'essai
                    :
La valeur du taux de conversion euros → dollars
                        est intégrée au
                        programme (elle ne sera pas saisie).
le résultat de la conversion aura une précision de 2
                        chiffres après la
                        virgule.

---
### Diapositive 21

Etape 2 : Élaborer un jeu d'essai pour chaque scénario identifié (2/3)
Scénario alternatif
            (comportements moins fréquent / cas particuliers)
Ce que voit l'utilisateur :
Données et résultats pour ce jeu d'essai :
Donnée : 0
Résultat attendu : 0
Nouvelles propriétés mises en évidence par ce jeu d'essai :
Une somme de départ égale à 0 n'est pas considéré comme un cas d'erreur ;
Dans ce cas particulier, le programme pourrait se
                        dispenser du calcul de conversion (→ piste éventuelle pour optimiser le programme ?).

---
### Diapositive 22

Etape 2 : Élaborer un jeu d'essai pour chaque scénario identifié (3/3)
Scénario d'exception
            (comportement du programme en cas d'erreur)
Ce que voit l'utilisateur :
Données et résultats pour ce jeu d'essai :
Donnée : -100
Résultat attendu :
                            Le message d'erreur "Erreur de saisie. Conversion impossible."
Nouvelles propriétés mises en évidence par ce jeu d'essai :
Une erreur de saisie ne doit pas faire "planter" le programme ;
Le message d'erreur affiché reste général,
                        il ne précise pas la nature de l'erreur (ici saisie d'un nombre négatif).

---
### Diapositive 23

Un mot sur la gestion des cas d'erreur...
La conception de tout programme informatique
doit
tenir compte des cas
                    d'erreurs qui peuvent survenir ;
Cet aspect est particulièrement important lorsque l'utilisateur peut
                    introduire des données dans le programme ;
[1]
Pour le moment
,
nous ne décrirons pas les cas d'erreurs
, lorsque nous
                            établirons les spécifications externes d'un programme.
                            La prise en compte des erreurs sera abordée lorsque vous travaillerez sur
                            les techniques de gestion des erreurs.
[2]
[1]
Never Trust User Input
: Arsac,
                J. - Préceptes pour programmer - Dunod, 1991
[2]
Semestre 2 :  R2.03 - Qualité de développement.

---
### Diapositive 24

Définitions
Quel est le point commun entre ces programmes ?
Pour répondre à la question, il faut revenir à la base :
Qu'est-ce que l'informatique ?
Qu'est-ce que l'informatique ?
Historique et définition
Le terme informatique désigne littéralement l'
automatisation
du traitement
                        de l'
information
par ordinateur.
Il a été créé en 1962 par Philippe Dreyfus à partir des
                        mots
« information »
et
« automatique »
.
Le terme a été accepté par l'Academie francaise en
                        1966, et l’informatique devint alors
                        officiellement
la science du traitement automatique de l'information
.
Qu'est-ce qui caractérise un programmme informatique ?
L'informatique est la science du
traitement
automatique
de l'
information
...
L'automatisation va être mise en œuvre par un ordinateur qui va exécuter un programme.
Ce programme va traiter de l'information.
Autrement dit : Tout programme, quel que soit le langage
                    utilisé, est composé d'
informations
de
traitements
!
Quel est le point commun entre ces programmes ?
Tous ces programmes sont composés d'informations et de traitements !
Quelles conséquences pour un programmeur ?
Puisque tout programme est composé d'informations et de traitements, un
                « bon programmeur » doit
savoir identifier et structurer
:
les
informations
qui seront manipulées dans son programme ;
les
traitements
à mettre en place pour traiter ces informations.
Il est important d'avoir des repères méthodologiques pour identifier les informations à gérer ainsi
                    que les traitements à mettre en place, en particulier lorsque la complexité du problème à résoudre
                    augmente...
L'élaboration des
spécifications internes
du problème peut vous aider à surmonter
                    ces
                    difficultés.
Notion de
traitement
Définition
Un
traitement
est une opération (calcul, saisie,
                            affichage...)
                            manipulant une ou plusieurs
informations
.
Exemples de traitements :
Saisir
au clavier l'
identifiant
et le
mot de passe
d'un utilisateur
Afficher
à l'écran le
nom
d'un client
Calculer
la
moyenne
d'un étudiant
Notion d'
information
Définition
Une
information
est une valeur jouant un
                            rôle dans un traitement.
Pour un traitement donné, une information peut jouer le
rôle
:
de
donnée
;
de
résultat
;
de
donnée
ET de
résultat
.
Notion de
donnée
Définition
Une
donnée
est une information nécessaire pour
                            pouvoir exécuter un traitement.
Exemple:
Pour mettre en place un
traitement
visant à
calculer le périmètre d'un cercle
,
                il faut connaître le
rayon
de ce cercle.
L'
information
rayon
joue donc le rôle de
donnée
pour le
traitement
calculer le périmètre d'un cercle
.
Notion de
résultat
Définition
Un
résultat
est une information
                            qui est produite, calculée ou modifiée par un traitement.
Exemple:
Le
traitement
visant à
calculer le périmètre d'un cercle
,
                calcule une nouvelle information qui est le
périmètre
du cercle.
L'
information
périmètre
joue donc le rôle de
résultat
pour le
traitement
calculer le périmètre d'un cercle
.
Statut de donnée/résultat
Attention
Le statut de donnée / résultat d'une information n'est pas absolu :
                            Ce statut est toujours
spécifique à un traitement
.
Statut de donnée/résultat : Exemple
Statut des différentes informations dans le programme calculant le périmètre d'un cercle...
Données
Traitements
Résultats
aucune
Saisir le rayon
rayon
rayon, π
Calculer le périmètre
périmètre
périmètre
Afficher le périmètre
aucun
Dans cet exemple, l'information
rayon
a un statut de :
résultat
pour le traitement
Saisir le rayon
donnée
pour le traitement
Calculer le périmètre
Informations et traitements au sein du code
Au sein d'un code informatique :
une
information
prendra la forme d'une
variable
(ou d'une
constante
si sa valeur est fixe et ne change pas au cours de
                    l'exécution du code) ;
un
traitement
prendra la forme d'un ensemble
                    de lignes de code qui seront regroupées au sein d'un
programme principal
,
                    d'une
procédure
,
                    d'une
fonction
ou
                    d'une
méthode
.
[1]
[1]
Ces notions de programmation
            seront définies et étudiées progressivement au cours de l'année.

---
### Diapositive 25

Définitions

---
### Diapositive 26

Quel est le point commun entre ces programmes ?
Pour répondre à la question, il faut revenir à la base :
Qu'est-ce que l'informatique ?

---
### Diapositive 27

Qu'est-ce que l'informatique ?
Historique et définition
Le terme informatique désigne littéralement l'
automatisation
du traitement
                        de l'
information
par ordinateur.
Il a été créé en 1962 par Philippe Dreyfus à partir des
                        mots
« information »
et
« automatique »
.
Le terme a été accepté par l'Academie francaise en
                        1966, et l’informatique devint alors
                        officiellement
la science du traitement automatique de l'information
.

---
### Diapositive 28

Qu'est-ce qui caractérise un programmme informatique ?
L'informatique est la science du
traitement
automatique
de l'
information
...
L'automatisation va être mise en œuvre par un ordinateur qui va exécuter un programme.
Ce programme va traiter de l'information.
Autrement dit : Tout programme, quel que soit le langage
                    utilisé, est composé d'
informations
de
traitements
!

---
### Diapositive 29

Quel est le point commun entre ces programmes ?
Tous ces programmes sont composés d'informations et de traitements !

---
### Diapositive 30

Quelles conséquences pour un programmeur ?
Puisque tout programme est composé d'informations et de traitements, un
                « bon programmeur » doit
savoir identifier et structurer
:
les
informations
qui seront manipulées dans son programme ;
les
traitements
à mettre en place pour traiter ces informations.
Il est important d'avoir des repères méthodologiques pour identifier les informations à gérer ainsi
                    que les traitements à mettre en place, en particulier lorsque la complexité du problème à résoudre
                    augmente...
L'élaboration des
spécifications internes
du problème peut vous aider à surmonter
                    ces
                    difficultés.

---
### Diapositive 31

Notion de
traitement
Définition
Un
traitement
est une opération (calcul, saisie,
                            affichage...)
                            manipulant une ou plusieurs
informations
.
Exemples de traitements :
Saisir
au clavier l'
identifiant
et le
mot de passe
d'un utilisateur
Afficher
à l'écran le
nom
d'un client
Calculer
la
moyenne
d'un étudiant

---
### Diapositive 32

Notion d'
information
Définition
Une
information
est une valeur jouant un
                            rôle dans un traitement.
Pour un traitement donné, une information peut jouer le
rôle
:
de
donnée
;
de
résultat
;
de
donnée
ET de
résultat
.

---
### Diapositive 33

Notion de
donnée
Définition
Une
donnée
est une information nécessaire pour
                            pouvoir exécuter un traitement.
Exemple:
Pour mettre en place un
traitement
visant à
calculer le périmètre d'un cercle
,
                il faut connaître le
rayon
de ce cercle.
L'
information
rayon
joue donc le rôle de
donnée
pour le
traitement
calculer le périmètre d'un cercle
.

---
### Diapositive 34

Notion de
résultat
Définition
Un
résultat
est une information
                            qui est produite, calculée ou modifiée par un traitement.
Exemple:
Le
traitement
visant à
calculer le périmètre d'un cercle
,
                calcule une nouvelle information qui est le
périmètre
du cercle.
L'
information
périmètre
joue donc le rôle de
résultat
pour le
traitement
calculer le périmètre d'un cercle
.

---
### Diapositive 35

Statut de donnée/résultat
Attention
Le statut de donnée / résultat d'une information n'est pas absolu :
                            Ce statut est toujours
spécifique à un traitement
.

---
### Diapositive 36

Statut de donnée/résultat : Exemple
Statut des différentes informations dans le programme calculant le périmètre d'un cercle...
Données
Traitements
Résultats
aucune
Saisir le rayon
rayon
rayon, π
Calculer le périmètre
périmètre
périmètre
Afficher le périmètre
aucun
Dans cet exemple, l'information
rayon
a un statut de :
résultat
pour le traitement
Saisir le rayon
donnée
pour le traitement
Calculer le périmètre

---
### Diapositive 37

Informations et traitements au sein du code
Au sein d'un code informatique :
une
information
prendra la forme d'une
variable
(ou d'une
constante
si sa valeur est fixe et ne change pas au cours de
                    l'exécution du code) ;
un
traitement
prendra la forme d'un ensemble
                    de lignes de code qui seront regroupées au sein d'un
programme principal
,
                    d'une
procédure
,
                    d'une
fonction
ou
                    d'une
méthode
.
[1]
[1]
Ces notions de programmation
            seront définies et étudiées progressivement au cours de l'année.

---
### Diapositive 38

Spécifications internes : Principe
Spécifications internes : De quoi s'agit-il ?
Puisque tout programme est composé d'informations et de traitements,
les spécifications internes ont pour but de décrire les
                caractéristiques de ces informations et de ces traitements.
Objectifs :
Identifier les
informations
et
traitements
composant un programme ;
Caractériser les
propriétés
de
                            chaque information / traitement ;
Mettre en évidence les
liens
existants entre informations et traitements.
Spécifier une information...
Spécifier les propriétés d'une information
Pour spécifier les propriétés d'une information, on renseignera les éléments suivants :
le
nom
de l'information ;
sa
signification
;
son
type
;
son
mode d'initialisation
;
son éventuelle
exportation
.
Nommer une information
Le
nom
d'une information est un identifiant choisi arbitrairement et
                qui doit avoir les propriétés suivantes :
Le nom doit être
significatif
.
[1]
Des noms comme
rayon-cercle
ou
vitesse-train
sont acceptables mais
x114
ou
toto
sont à proscrire !
Pour des contraintes techniques, le nom de l'information ne doit pas
                    comporter de caractères accentués et d'espaces. On utilisera
diametre
plutôt que
diamètre
ou
tauxHoraire
à la place de
taux horaire
[2]
;
le nom choisi est fixé
une fois pour toutes
: il sera ensuite repris
                    au niveau des algorithmes et du code.
[1]
car vos programmes doivent être lisibles !
[2]
Des techniques de nommage des
                informations seront abordées en TP.
Donner la signification d'une information
La
signification
d'une information est un texte qui
                    décrit le
rôle
de l'information.
Ce texte doit permettre à un autre programmeur de comprendre ce que représente
                    l'information et quel est son rôle dans le programme.
Exemple
Nom
: sommeEuros
Signification
:
                La somme en euros qui doit être convertie en dollars.
Prendre de bonnes habitudes dès le départ...
Important
Bien choisir le nom des informations et décrire avec soin la
                        signification de chaque information manipulée contribue à
                        produire des codes plus lisibles !
"Always code as if the person who ends up
                    maintaining your code is a violent psychopath
                    who knows where you live."
John F. Woods -
on comp.lang.c++ newsgroup, september 1991
Définir le type d'une information
Le
type
d'une information détermine :
l'ensemble des valeurs que l'information pourra prendre ;
les opérations autorisées sur cette information.
Dans un premier temps, on ne considérera que les types suivants :
Type
Exemples de valeurs
Codage basique en C++
Nombre entier
-4, 0, 3, 415, 9
int
Nombre à virgule
-2.14, 3.14, 10.2, 9.0
float
Caractère
'a', 'b', '!', '+', '9'
char
Chaîne de caractères
"Bonjour", "au revoir", "a", "9"
string
Booléen
true
ou
false
bool
S'interroger sur le mode d'initialisation
Le mode d'initialisation décrit comment l'information va acquérir sa
                première valeur.
Il n'y a que trois possibilités :
Prédéfinie
: la valeur de
                    l'information est connue
avant
l'exécution
                    du programme :
On précisera alors sa valeur
.
Saisie
: la valeur de
                    l'information est entrée dans le programme au
                    cours de son exécution (par exemple via une saisie au clavier).
On précisera alors le nom du traitement qui
                        réalise la saisie.
Calculée
: la valeur de
                    l'information est calculée au cours de l'exécution du programme.
On précisera alors le nom du traitement qui réalise ce calcul.
Déterminer si l'information doit être exportée
Il s'agit de préciser si le programme doit afficher la valeur de
                l'information sur un écran, l'imprimer ou l'enregistrer dans un fichier.
Il n'y a que deux possibilités :
Non
:
                    la valeur de l'information reste en mémoire centrale au sein du
                    programme.
Oui
: la valeur de
                    l'information est envoyée sur un périphérique de
                    sortie (écran, imprimante, disque dur).
On précisera alors le nom du traitement qui réalise
                        ce traitement.
Spécification d'une information - Résumé
Nom
:
                Identifiant significatif, sans accents ni espaces.
Signification
:
                Commentaire détaillant le rôle et les propriétés de l'information.
Type
:
                Ensemble des valeurs possibles de l'information.
Mode d'initialisation
:
Prédéfinie
→ donner la valeur de l'information ;
Saisie
→ donner le nom du traitement qui réalise la saisie ;
Calculée
→ donner le nom du traitement qui réalise le calcul.
Exportation
:
Non
Oui
→ donner le nom du traitement qui réalise l'exportation.
Spécifier un traitement...
Spécifier les propriétés d'un traitement
Pour spécifier les propriétés d'un traitement, on renseignera les éléments suivants :
le
nom
du traitement ;
son
but
;
ses
données
;
ses
résultats
;
sa
description
.
Nommer un traitement
Le
nom
d'un traitement est un identifiant choisi arbitrairement et
                qui doit avoir les propriétés suivantes :
Le nom doit être
significatif
.
[1]
Des noms comme
saisir-somme-euros
ou
calculer-vitesse-train
sont acceptables mais
traitement4
ou
t28
sont à proscrire !
Pour des contraintes techniques, le nom du traitement ne doit pas
                    comporter de caractères accentués et d'espaces. On choisira donc par
                    exemple
afficherPerimetre
et non pas
afficher périmètre
;
le nom choisi est fixé
une fois pour toutes
: il sera ensuite repris
                    au niveau des algorithmes et du code.
[1]
N'oubliez pas que vous devez tout faire pour rendre vos programmes lisibles !
Clarifier le but du traitement
Le
but
d'un traitement est un texte qui
                    décrit ce que fait le traitement en termes de service rendu.
                    de l'information.
Ce texte doit permettre à un autre programmeur de comprendre
                    à quoi sert ce traitement et quel est son rôle dans le programme.
Exemple
Nom
: convertirEurosVersDollars
Signification
:
                A partir d'une somme de départ exprimée en euros, ce traitement
                calcule la somme correspondante en dollars en tenant compte d'un
                taux de conversion prédéfini.
Identifier les données nécessaires à un traitement
Il s'agit de lister les informations dont la valeur est nécessaire pour
                exécuter le traitement : sans la valeur de ces informations, le traitement n'est
                pas en mesure de s'exécuter.
Exemple
Nom
: convertirEurosVersDollars
Signification
:
                A partir d'une somme de départ exprimée en euros, ce traitement
                calcule la somme correspondante en dollars en tenant compte d'un
                taux de conversion prédéfini.
Données
:
                sommeEuros, tauxEurosVersDollars
Identifier les résultats produits par un traitement
Il s'agit de lister les informations dont la valeur est produite, calculée
                ou modifiée suite à l'exécution du traitement.
Exemple
Nom
: convertirEurosVersDollars
Signification
:
                A partir d'une somme de départ exprimée en euros, ce traitement
                calcule la somme correspondante en dollars en tenant compte d'un
                taux de conversion prédéfini.
Données
:
                sommeEuros, tauxEurosVersDollars
Résultats
:
                sommeDollars
Décrire un traitement
La
description
d'un traitement dépend de la nature du
                traitement :
S'il s'agit d'une
action de saisie
,
                    la description prend la forme d'un croquis qui illustre comment
                    la saisie se présente à l'écran.
S'il s'agit d'une
action de calcul
,
                    la description correspond à la formule permettant de réaliser le calcul.
S'il s'agit d'une
action de sortie
(affichage ou impresion), la description
                    la description prend la forme d'un croquis qui illustre ce qui
                    apparaît à l'écran ou sur le papier de l'imprimante.
Spécification d'un traitement - Résumé
Nom
:
                Identifiant significatif, sans accent ni espace.
But
:
                Commentaire détaillant le service rendu par le traitement.
Données
:
                Liste des informations dont la valeur est nécessaire pour exécuter le
                traitement.
Résultats
:
                Liste des informations dont la valeur est produite, calculée ou modifiée après
                exécution du traitement.
Description
:
                A adapter selon le type de traitement :
Saisie
→ un croquis décrivant comment la saisie se présente à l'écran.
Calcul
→ spécifier la formule utilisée pour réaliser le calcul.
Sortie
→ décrire ce que l'utilisateur voit (à l'écran / à
                    l'impression) lorsque l'action de sortie a été réalisée.
Évaluons ce que vous avez retenu...
Spécifications externes et internes
Estimer la cohérence globale...
Analyse des liens entre informations et traitements
Le tableau bilan est un outil permettant :
de mettre en évidence les liens existant entre informations
                    et traitements ;
d'estimer la cohérence globale des spécifications réalisées.
Structure d'un tableau bilan
Le tableau bilan est une matrice dans laquelle :
chaque ligne correspond à une information ;
chaque colonne correspond à un traitement.
Traitement 1
Traitement 2
Traitement 3
Information 1
Information 2
Information 3
Remplir un tableau bilan
Chaque case du tableau bilan est à l'intersection d'un traitement et
                d'une information. Pour remplir cette case, on écrira :
D
si l'information est une donnée pour le traitement ;
R
> si l'information est un résultat du traitement ;
D/R
si l'information est une donnée qui est modifiée par
                    le traitement ;
rien dans tous les autres cas.
Traitement 1
Traitement 2
Traitement 3
Information 1
R
D
Information 2
R
D
Information 3
R
D
Estimer la cohérence globale des spécifications
On évalue la consistance globale des spécifications internes
                selon les règles suivantes :
Toute information doit être impliquée dans au moins un
                    traitement, sinon elle ne sert à rien →
pas de ligne vide
;
Tout traitement doit être en relation avec au moins une
                    information, sinon ce n’est pas un traitement informatique →
pas de colonne vide
.
Traitement 1
Traitement 2
Traitement 3
Information 1
R
D
Information 2
R
D
Information 3
R
D

---
### Diapositive 39

Spécifications internes : Principe

---
### Diapositive 40

Spécifications internes : De quoi s'agit-il ?
Puisque tout programme est composé d'informations et de traitements,
les spécifications internes ont pour but de décrire les
                caractéristiques de ces informations et de ces traitements.
Objectifs :
Identifier les
informations
et
traitements
composant un programme ;
Caractériser les
propriétés
de
                            chaque information / traitement ;
Mettre en évidence les
liens
existants entre informations et traitements.

---
### Diapositive 41

Spécifier une information...

---
### Diapositive 42

Spécifier les propriétés d'une information
Pour spécifier les propriétés d'une information, on renseignera les éléments suivants :
le
nom
de l'information ;
sa
signification
;
son
type
;
son
mode d'initialisation
;
son éventuelle
exportation
.

---
### Diapositive 43

Nommer une information
Le
nom
d'une information est un identifiant choisi arbitrairement et
                qui doit avoir les propriétés suivantes :
Le nom doit être
significatif
.
[1]
Des noms comme
rayon-cercle
ou
vitesse-train
sont acceptables mais
x114
ou
toto
sont à proscrire !
Pour des contraintes techniques, le nom de l'information ne doit pas
                    comporter de caractères accentués et d'espaces. On utilisera
diametre
plutôt que
diamètre
ou
tauxHoraire
à la place de
taux horaire
[2]
;
le nom choisi est fixé
une fois pour toutes
: il sera ensuite repris
                    au niveau des algorithmes et du code.
[1]
car vos programmes doivent être lisibles !
[2]
Des techniques de nommage des
                informations seront abordées en TP.

---
### Diapositive 44

Donner la signification d'une information
La
signification
d'une information est un texte qui
                    décrit le
rôle
de l'information.
Ce texte doit permettre à un autre programmeur de comprendre ce que représente
                    l'information et quel est son rôle dans le programme.
Exemple
Nom
: sommeEuros
Signification
:
                La somme en euros qui doit être convertie en dollars.

---
### Diapositive 45

Prendre de bonnes habitudes dès le départ...
Important
Bien choisir le nom des informations et décrire avec soin la
                        signification de chaque information manipulée contribue à
                        produire des codes plus lisibles !
"Always code as if the person who ends up
                    maintaining your code is a violent psychopath
                    who knows where you live."
John F. Woods -
on comp.lang.c++ newsgroup, september 1991

---
### Diapositive 46

Définir le type d'une information
Le
type
d'une information détermine :
l'ensemble des valeurs que l'information pourra prendre ;
les opérations autorisées sur cette information.
Dans un premier temps, on ne considérera que les types suivants :
Type
Exemples de valeurs
Codage basique en C++
Nombre entier
-4, 0, 3, 415, 9
int
Nombre à virgule
-2.14, 3.14, 10.2, 9.0
float
Caractère
'a', 'b', '!', '+', '9'
char
Chaîne de caractères
"Bonjour", "au revoir", "a", "9"
string
Booléen
true
ou
false
bool

---
### Diapositive 47

S'interroger sur le mode d'initialisation
Le mode d'initialisation décrit comment l'information va acquérir sa
                première valeur.
Il n'y a que trois possibilités :
Prédéfinie
: la valeur de
                    l'information est connue
avant
l'exécution
                    du programme :
On précisera alors sa valeur
.
Saisie
: la valeur de
                    l'information est entrée dans le programme au
                    cours de son exécution (par exemple via une saisie au clavier).
On précisera alors le nom du traitement qui
                        réalise la saisie.
Calculée
: la valeur de
                    l'information est calculée au cours de l'exécution du programme.
On précisera alors le nom du traitement qui réalise ce calcul.

---
### Diapositive 48

Déterminer si l'information doit être exportée
Il s'agit de préciser si le programme doit afficher la valeur de
                l'information sur un écran, l'imprimer ou l'enregistrer dans un fichier.
Il n'y a que deux possibilités :
Non
:
                    la valeur de l'information reste en mémoire centrale au sein du
                    programme.
Oui
: la valeur de
                    l'information est envoyée sur un périphérique de
                    sortie (écran, imprimante, disque dur).
On précisera alors le nom du traitement qui réalise
                        ce traitement.

---
### Diapositive 49

Spécification d'une information - Résumé
Nom
:
                Identifiant significatif, sans accents ni espaces.
Signification
:
                Commentaire détaillant le rôle et les propriétés de l'information.
Type
:
                Ensemble des valeurs possibles de l'information.
Mode d'initialisation
:
Prédéfinie
→ donner la valeur de l'information ;
Saisie
→ donner le nom du traitement qui réalise la saisie ;
Calculée
→ donner le nom du traitement qui réalise le calcul.
Exportation
:
Non
Oui
→ donner le nom du traitement qui réalise l'exportation.

---
### Diapositive 50

Spécifier un traitement...

---
### Diapositive 51

Spécifier les propriétés d'un traitement
Pour spécifier les propriétés d'un traitement, on renseignera les éléments suivants :
le
nom
du traitement ;
son
but
;
ses
données
;
ses
résultats
;
sa
description
.

---
### Diapositive 52

Nommer un traitement
Le
nom
d'un traitement est un identifiant choisi arbitrairement et
                qui doit avoir les propriétés suivantes :
Le nom doit être
significatif
.
[1]
Des noms comme
saisir-somme-euros
ou
calculer-vitesse-train
sont acceptables mais
traitement4
ou
t28
sont à proscrire !
Pour des contraintes techniques, le nom du traitement ne doit pas
                    comporter de caractères accentués et d'espaces. On choisira donc par
                    exemple
afficherPerimetre
et non pas
afficher périmètre
;
le nom choisi est fixé
une fois pour toutes
: il sera ensuite repris
                    au niveau des algorithmes et du code.
[1]
N'oubliez pas que vous devez tout faire pour rendre vos programmes lisibles !

---
### Diapositive 53

Clarifier le but du traitement
Le
but
d'un traitement est un texte qui
                    décrit ce que fait le traitement en termes de service rendu.
                    de l'information.
Ce texte doit permettre à un autre programmeur de comprendre
                    à quoi sert ce traitement et quel est son rôle dans le programme.
Exemple
Nom
: convertirEurosVersDollars
Signification
:
                A partir d'une somme de départ exprimée en euros, ce traitement
                calcule la somme correspondante en dollars en tenant compte d'un
                taux de conversion prédéfini.

---
### Diapositive 54

Identifier les données nécessaires à un traitement
Il s'agit de lister les informations dont la valeur est nécessaire pour
                exécuter le traitement : sans la valeur de ces informations, le traitement n'est
                pas en mesure de s'exécuter.
Exemple
Nom
: convertirEurosVersDollars
Signification
:
                A partir d'une somme de départ exprimée en euros, ce traitement
                calcule la somme correspondante en dollars en tenant compte d'un
                taux de conversion prédéfini.
Données
:
                sommeEuros, tauxEurosVersDollars

---
### Diapositive 55

Identifier les résultats produits par un traitement
Il s'agit de lister les informations dont la valeur est produite, calculée
                ou modifiée suite à l'exécution du traitement.
Exemple
Nom
: convertirEurosVersDollars
Signification
:
                A partir d'une somme de départ exprimée en euros, ce traitement
                calcule la somme correspondante en dollars en tenant compte d'un
                taux de conversion prédéfini.
Données
:
                sommeEuros, tauxEurosVersDollars
Résultats
:
                sommeDollars

---
### Diapositive 56

Décrire un traitement
La
description
d'un traitement dépend de la nature du
                traitement :
S'il s'agit d'une
action de saisie
,
                    la description prend la forme d'un croquis qui illustre comment
                    la saisie se présente à l'écran.
S'il s'agit d'une
action de calcul
,
                    la description correspond à la formule permettant de réaliser le calcul.
S'il s'agit d'une
action de sortie
(affichage ou impresion), la description
                    la description prend la forme d'un croquis qui illustre ce qui
                    apparaît à l'écran ou sur le papier de l'imprimante.

---
### Diapositive 57

Spécification d'un traitement - Résumé
Nom
:
                Identifiant significatif, sans accent ni espace.
But
:
                Commentaire détaillant le service rendu par le traitement.
Données
:
                Liste des informations dont la valeur est nécessaire pour exécuter le
                traitement.
Résultats
:
                Liste des informations dont la valeur est produite, calculée ou modifiée après
                exécution du traitement.
Description
:
                A adapter selon le type de traitement :
Saisie
→ un croquis décrivant comment la saisie se présente à l'écran.
Calcul
→ spécifier la formule utilisée pour réaliser le calcul.
Sortie
→ décrire ce que l'utilisateur voit (à l'écran / à
                    l'impression) lorsque l'action de sortie a été réalisée.

---
### Diapositive 58

Évaluons ce que vous avez retenu...
Spécifications externes et internes

---
### Diapositive 59

Estimer la cohérence globale...

---
### Diapositive 60

Analyse des liens entre informations et traitements
Le tableau bilan est un outil permettant :
de mettre en évidence les liens existant entre informations
                    et traitements ;
d'estimer la cohérence globale des spécifications réalisées.

---
### Diapositive 61

Structure d'un tableau bilan
Le tableau bilan est une matrice dans laquelle :
chaque ligne correspond à une information ;
chaque colonne correspond à un traitement.
Traitement 1
Traitement 2
Traitement 3
Information 1
Information 2
Information 3

---
### Diapositive 62

Remplir un tableau bilan
Chaque case du tableau bilan est à l'intersection d'un traitement et
                d'une information. Pour remplir cette case, on écrira :
D
si l'information est une donnée pour le traitement ;
R
> si l'information est un résultat du traitement ;
D/R
si l'information est une donnée qui est modifiée par
                    le traitement ;
rien dans tous les autres cas.
Traitement 1
Traitement 2
Traitement 3
Information 1
R
D
Information 2
R
D
Information 3
R
D

---
### Diapositive 63

Estimer la cohérence globale des spécifications
On évalue la consistance globale des spécifications internes
                selon les règles suivantes :
Toute information doit être impliquée dans au moins un
                    traitement, sinon elle ne sert à rien →
pas de ligne vide
;
Tout traitement doit être en relation avec au moins une
                    information, sinon ce n’est pas un traitement informatique →
pas de colonne vide
.
Traitement 1
Traitement 2
Traitement 3
Information 1
R
D
Information 2
R
D
Information 3
R
D

---
### Diapositive 64

Spécifications internes : Exemple
Problème de départ
Élaborer un programme permettant de saisir une somme de départ
                en euros puis de la convertir en dollars.
Liste des informations et traitements
Informations
sommeEuros
sommeDollars
tauxEurosVersDollars
Traitements
saisirSommeEuros
calculerSommeDollars
afficherSommeDollars
Spécification des informations (1/3)
Nom
:
sommeEuros
Signification
:
                    La somme en euros qui doit être convertie en dollars.
Type
:
                    nombre à virgule
Mode d'initialisation
:
                    Saisie au clavier par le traitement
saisirSommeEuros
Exportation
:
                    Non
Spécification des informations (2/3)
Nom
:
tauxEurosVersDollars
Signification
:
                    Taux de conversion utilisé pour convertir des euros en dollars.
Type
:
                    nombre à virgule
Mode d'initialisation
:
                    Prédéfini à la valeur
1.3383
Exportation
:
                    Non
Spécification des informations (3/3)
Nom
:
sommeDollars
Signification
:
                    La somme en dollars résultant de la conversion.
Type
:
                    nombre à virgule
Mode d'initialisation
:
                    Calculé par le traitement
calculerSommeDollars
Exportation
:
                    Oui : par le traitement
afficherSommeDollars
Spécification des traitements (1/3)
Nom
:
saisirSommeEuros
But
:
                    Saisir au clavier la somme en € qui sera convertie en $
Données
:
                    aucune
Résultats
:
sommeEuros
Description
:
Spécification des traitements (2/3)
Nom
:
calculerSommeDollars
But
:
                    Convertir en $ une somme de départ exprimée en €
Données
:
sommeEuros
,
tauxEurosVersDollars
Résultats
:
sommeDollars
Description
:
sommeDollars = sommeEuros × tauxEurosVersDollars
Spécification des traitements (3/3)
Nom
:
afficherSommeDollars
But
:
                    Afficher à l'écran la somme convertie en $
Données
:
sommeDollars
Résultats
:
                    aucun
Description
:
Tableau bilan
saisirSommeEuros
calculerSommeDollars
afficherSommeDollars
sommeEuros
R
D
tauxEurosVersDollars
D
sommeDollars
R
D
Aucune ligne vide : toute information joue bien un rôle dans la solution spécifiée ;
Aucune colonne vide : tous les traitements semblent faire sens car ils manipulent
                    tous une ou plusieurs informations.

---
### Diapositive 65

Spécifications internes : Exemple

---
### Diapositive 66

Problème de départ
Élaborer un programme permettant de saisir une somme de départ
                en euros puis de la convertir en dollars.
Liste des informations et traitements
Informations
sommeEuros
sommeDollars
tauxEurosVersDollars
Traitements
saisirSommeEuros
calculerSommeDollars
afficherSommeDollars

---
### Diapositive 67

Spécification des informations (1/3)
Nom
:
sommeEuros
Signification
:
                    La somme en euros qui doit être convertie en dollars.
Type
:
                    nombre à virgule
Mode d'initialisation
:
                    Saisie au clavier par le traitement
saisirSommeEuros
Exportation
:
                    Non

---
### Diapositive 68

Spécification des informations (2/3)
Nom
:
tauxEurosVersDollars
Signification
:
                    Taux de conversion utilisé pour convertir des euros en dollars.
Type
:
                    nombre à virgule
Mode d'initialisation
:
                    Prédéfini à la valeur
1.3383
Exportation
:
                    Non

---
### Diapositive 69

Spécification des informations (3/3)
Nom
:
sommeDollars
Signification
:
                    La somme en dollars résultant de la conversion.
Type
:
                    nombre à virgule
Mode d'initialisation
:
                    Calculé par le traitement
calculerSommeDollars
Exportation
:
                    Oui : par le traitement
afficherSommeDollars

---
### Diapositive 70

Spécification des traitements (1/3)
Nom
:
saisirSommeEuros
But
:
                    Saisir au clavier la somme en € qui sera convertie en $
Données
:
                    aucune
Résultats
:
sommeEuros
Description
:

---
### Diapositive 71

Spécification des traitements (2/3)
Nom
:
calculerSommeDollars
But
:
                    Convertir en $ une somme de départ exprimée en €
Données
:
sommeEuros
,
tauxEurosVersDollars
Résultats
:
sommeDollars
Description
:
sommeDollars = sommeEuros × tauxEurosVersDollars

---
### Diapositive 72

Spécification des traitements (3/3)
Nom
:
afficherSommeDollars
But
:
                    Afficher à l'écran la somme convertie en $
Données
:
sommeDollars
Résultats
:
                    aucun
Description
:

---
### Diapositive 73

Tableau bilan
saisirSommeEuros
calculerSommeDollars
afficherSommeDollars
sommeEuros
R
D
tauxEurosVersDollars
D
sommeDollars
R
D
Aucune ligne vide : toute information joue bien un rôle dans la solution spécifiée ;
Aucune colonne vide : tous les traitements semblent faire sens car ils manipulent
                    tous une ou plusieurs informations.
