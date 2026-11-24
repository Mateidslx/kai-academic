# Présentation

Source: https://patrick-etcheverry.github.io/r1.01-initiation-au-dev/Cours/04-iterations


---
### Diapositive 1

Décomposition itérative d'un problème algorithmique
R1.01 - Initiation au développement
Patrick Etcheverry
IUT de Bayonne - Département informatique
patrick.etcheverry@iutbayonne.univ-pau.fr
www.iutbayonne.univ-pau.fr/~etchever
https://github.com/patrick-etcheverry

---
### Diapositive 2

Plan du cours
Principe de la décomposition itérative
3
Formalisme de la décomposition itérative
5
Itérations avec nombre de répétitions connu
9
Itérations avec nombre de répétitions inconnu
19
Bonnes pratiques
35

---
### Diapositive 3

Plan du cours
Principe de la décomposition itérative
3
Formalisme de la décomposition itérative
5
Itérations avec nombre de répétitions connu
9
Itérations avec nombre de répétitions inconnu
19
Bonnes pratiques
35

---
### Diapositive 4

Principe de la décomposition itérative
Décomposition itérative - Définition
Une décomposition itérative
[1]
exprime le fait que la résolution d'un
                problème
P
de nature complexe équivaut à
répéter
plusieurs fois
                la résolution d'un ou plusieurs sous-problèmes.
Les décompositions itératives permettent de décrire des solutions
                algorithmiques du type :
faire ceci tant de fois
ou encore,
faire ceci jusqu'à ce que telle condition soit vérifiée
ou encore,
tant que telle condition n'est pas vérifiée faire cela
.
Vocabulaire : Dans le jargon informatique, une structure itérative au
                sein d'un code est appelée une
boucle
.
[1]
nommée aussi décomposition répétitive.

---
### Diapositive 5

Principe de la décomposition itérative

---
### Diapositive 6

Décomposition itérative - Définition
Une décomposition itérative
[1]
exprime le fait que la résolution d'un
                problème
P
de nature complexe équivaut à
répéter
plusieurs fois
                la résolution d'un ou plusieurs sous-problèmes.
Les décompositions itératives permettent de décrire des solutions
                algorithmiques du type :
faire ceci tant de fois
ou encore,
faire ceci jusqu'à ce que telle condition soit vérifiée
ou encore,
tant que telle condition n'est pas vérifiée faire cela
.
Vocabulaire : Dans le jargon informatique, une structure itérative au
                sein d'un code est appelée une
boucle
.
[1]
nommée aussi décomposition répétitive.

---
### Diapositive 7

Formalisme de la décomposition itérative
Formalisme général
Signification : Le problème
P
se résout
                en
répétant un certain nombre de fois
la résolution du sous-problème
SP
.
Bien sûr, les conditions de répétition devront être précisées pour lever
                l'ambiguı̈té du terme
"un certain nombre de fois"
...
Exemple général
Afficher le contenu d'un tableau
consiste à répéter plusieurs fois l'action
Afficher le contenu d'une case
.
En fait, l'action
Afficher le contenu d'une case
sera répétée autant de fois
                        qu'il y a de cases dans le tableau considéré.
Reste à voir comment
                préciser ces conditions de répétition dans l'algorithme...
Deux familles de décompositions itératives
les décompositions itératives où
le nombre de répétitions est connu ou calculable
                        à l'avance
: on sait précisément le nombre de fois où un traitement doit être
                        répété pour résoudre le problème global.
Exemple
Afficher le contenu d'un tableau de 5 cases → il faudra répéter 5 fois le
                                    traitement
Afficher une case
.
les décompositions itératives où
le nombre de 
                        répétitions est inconnu
: on
                        ne sait pas à l'avance combien de fois un traitement doit être répété pour
                        que le problème soit résolu.
Exemple
Demander à l'utilisateur de saisir un numéro de mois tant que la valeur
                                    saisie n'est pas comprise entre 1 et 12 → on ne sait pas quand l'utilisateur
                                    va saisir une valeur valide, on ne sait donc pas combien de fois le
                                    traitement de saisie devra être répété.

---
### Diapositive 8

Formalisme de la décomposition itérative

---
### Diapositive 9

Formalisme général
Signification : Le problème
P
se résout
                en
répétant un certain nombre de fois
la résolution du sous-problème
SP
.
Bien sûr, les conditions de répétition devront être précisées pour lever
                l'ambiguı̈té du terme
"un certain nombre de fois"
...

---
### Diapositive 10

Exemple général
Afficher le contenu d'un tableau
consiste à répéter plusieurs fois l'action
Afficher le contenu d'une case
.
En fait, l'action
Afficher le contenu d'une case
sera répétée autant de fois
                        qu'il y a de cases dans le tableau considéré.
Reste à voir comment
                préciser ces conditions de répétition dans l'algorithme...

---
### Diapositive 11

Deux familles de décompositions itératives
les décompositions itératives où
le nombre de répétitions est connu ou calculable
                        à l'avance
: on sait précisément le nombre de fois où un traitement doit être
                        répété pour résoudre le problème global.
Exemple
Afficher le contenu d'un tableau de 5 cases → il faudra répéter 5 fois le
                                    traitement
Afficher une case
.
les décompositions itératives où
le nombre de 
                        répétitions est inconnu
: on
                        ne sait pas à l'avance combien de fois un traitement doit être répété pour
                        que le problème soit résolu.
Exemple
Demander à l'utilisateur de saisir un numéro de mois tant que la valeur
                                    saisie n'est pas comprise entre 1 et 12 → on ne sait pas quand l'utilisateur
                                    va saisir une valeur valide, on ne sait donc pas combien de fois le
                                    traitement de saisie devra être répété.

---
### Diapositive 12

Itérations avec nombre de répétitions connu
Formalime général
On définit au niveau de la boucle le nombre de fois où la résolution du
                sous problème SP doit être répétée en précisant
                un point de départ (
A
) et
                un point d'arrivée à atteindre (
B
).
i
représente le numéro de la répétition courante.
                Sa valeur varie de la valeur
A
jusqu'à la
                valeur
B
.
Exemples
Syntaxe générale
Une décomposition itérative avec nombre de répétitions connu se code au
                moyen de l'instruction
for
en respectant la syntaxe suivante :
for (initialisation ; condition de continuation ; progression)
  {
    Liste des instructions à répéter
  }
initialisation
: On précise le numéro de la 1ère répétition
                    qui peut être
                    égal à 1 ou à une autre valeur.
condition de continuation
: Expression booléenne précisant la
condition de
continuation
de la répétition.
Attention
:
                    dans les algorithmes on
                    exprime la
condition d'
arrêt
de la répétition → il faudra
                    donc
inverser
cette condition d'arrêt au moment du codage.
progression
: opération déterminant le numéro de la prochaine
                    répétition.
                    On ajoute généralement 1 au numéro de répétition courante mais pas
                    forcément.
Codage
Pour coder ce type d'itération on distinguera les boucles
croissantes
et
décroissantes
.
Cas où
A < B
→
                                Boucle
croissante
for (i = A ; i <= B ; i = i + 1)
  {
    // Code résolvant le sous-problème SP
    ...
  }
ou plus couramment :
for (i = A ; i <= B ; i++)
  {
    // Code résolvant le sous-problème SP
    ...
  }
Cas où
A > B
→
                        Boucle
décroissante
for (i = A ; i >= B ; i = i - 1)
  {
    // Code résolvant le sous-problème SP
    ...
  }
ou plus couramment :
for (i = A ; i >= B ; i--)
  {
    // Code résolvant le sous-problème SP
    ...
  }
Petite parenthèse sur les opérateurs d'affectation composés
A l'instar de
i++
et
i--
qui sont
                très utilisés dans les structures de type
for
,
                C++
[1]
propose d'autres opérateurs d'affectation composés. Les
                tableaux ci-dessous en listent quelques un :
Forme décomposée
Forme composée équivalente
i = i + 1
i++
i = i - 1
i--
i = i + 2
i += 2
Forme décomposée
Forme composée équivalente
i = i - 2
i -= 2
i = i * 2
i *= 2
i = i / 2
i /= 2
Remarque : Même si l'affectation composée
i += 1
existe on lui préfèrera toujours l'instruction créée spécifiquement
                pour traiter ce cas de figure, à savoir
i++
.
                Même remarque pour
i -= 1
[1]
mais aussi Python, C, Java, PHP...
Calculer le nombre de répétitions d'une boucle for
Lorsqu'on souhaite mesurer les performances d'un algorithme, il peut être intéressant
                        de calculer le nombre d'itérations réalisées avant d'obtenir le résultat final.
Lorsque l'algorithme utilise une structure itérative de type
for
, le
                nombre de
                répétitions est obtenu via l'une des formules ci-dessous :
boucle
croissante
(cas où A < B) :
nbRepet = B - A + 1
boucle
décroissante
(cas où A > B) :
nbRepet = A - B + 1
A retenir : Si la formule de calcul produit un résultat négatif ou nul,
                cela
                signifie que l'algorithme ne réalisera aucune répétition.
Calculer le nombre de répétitions d'une boucle for
nbRepet = B  - A + 1
  = 11 - 3 + 1 
  = 9
nbRepet = A  - B + 1
  = 12 - 0 + 1 
  = 13
nbRepet = A - B + 1
  = B - A + 1
  = 0 - 0 + 1 
  = 1
Comprendre le mécanisme de la boucle for
Évaluons ce que vous avez retenu...
Sortez vos smartphones

---
### Diapositive 13

Itérations avec nombre de répétitions connu

---
### Diapositive 14

Formalime général
On définit au niveau de la boucle le nombre de fois où la résolution du
                sous problème SP doit être répétée en précisant
                un point de départ (
A
) et
                un point d'arrivée à atteindre (
B
).
i
représente le numéro de la répétition courante.
                Sa valeur varie de la valeur
A
jusqu'à la
                valeur
B
.

---
### Diapositive 15

Exemples

---
### Diapositive 16

Syntaxe générale
Une décomposition itérative avec nombre de répétitions connu se code au
                moyen de l'instruction
for
en respectant la syntaxe suivante :
for (initialisation ; condition de continuation ; progression)
  {
    Liste des instructions à répéter
  }
initialisation
: On précise le numéro de la 1ère répétition
                    qui peut être
                    égal à 1 ou à une autre valeur.
condition de continuation
: Expression booléenne précisant la
condition de
continuation
de la répétition.
Attention
:
                    dans les algorithmes on
                    exprime la
condition d'
arrêt
de la répétition → il faudra
                    donc
inverser
cette condition d'arrêt au moment du codage.
progression
: opération déterminant le numéro de la prochaine
                    répétition.
                    On ajoute généralement 1 au numéro de répétition courante mais pas
                    forcément.

---
### Diapositive 17

Codage
Pour coder ce type d'itération on distinguera les boucles
croissantes
et
décroissantes
.
Cas où
A < B
→
                                Boucle
croissante
for (i = A ; i <= B ; i = i + 1)
  {
    // Code résolvant le sous-problème SP
    ...
  }
ou plus couramment :
for (i = A ; i <= B ; i++)
  {
    // Code résolvant le sous-problème SP
    ...
  }
Cas où
A > B
→
                        Boucle
décroissante
for (i = A ; i >= B ; i = i - 1)
  {
    // Code résolvant le sous-problème SP
    ...
  }
ou plus couramment :
for (i = A ; i >= B ; i--)
  {
    // Code résolvant le sous-problème SP
    ...
  }

---
### Diapositive 18

Petite parenthèse sur les opérateurs d'affectation composés
A l'instar de
i++
et
i--
qui sont
                très utilisés dans les structures de type
for
,
                C++
[1]
propose d'autres opérateurs d'affectation composés. Les
                tableaux ci-dessous en listent quelques un :
Forme décomposée
Forme composée équivalente
i = i + 1
i++
i = i - 1
i--
i = i + 2
i += 2
Forme décomposée
Forme composée équivalente
i = i - 2
i -= 2
i = i * 2
i *= 2
i = i / 2
i /= 2
Remarque : Même si l'affectation composée
i += 1
existe on lui préfèrera toujours l'instruction créée spécifiquement
                pour traiter ce cas de figure, à savoir
i++
.
                Même remarque pour
i -= 1
[1]
mais aussi Python, C, Java, PHP...

---
### Diapositive 19

Calculer le nombre de répétitions d'une boucle for
Lorsqu'on souhaite mesurer les performances d'un algorithme, il peut être intéressant
                        de calculer le nombre d'itérations réalisées avant d'obtenir le résultat final.
Lorsque l'algorithme utilise une structure itérative de type
for
, le
                nombre de
                répétitions est obtenu via l'une des formules ci-dessous :
boucle
croissante
(cas où A < B) :
nbRepet = B - A + 1
boucle
décroissante
(cas où A > B) :
nbRepet = A - B + 1
A retenir : Si la formule de calcul produit un résultat négatif ou nul,
                cela
                signifie que l'algorithme ne réalisera aucune répétition.

---
### Diapositive 20

Calculer le nombre de répétitions d'une boucle for
nbRepet = B  - A + 1
  = 11 - 3 + 1 
  = 9
nbRepet = A  - B + 1
  = 12 - 0 + 1 
  = 13
nbRepet = A - B + 1
  = B - A + 1
  = 0 - 0 + 1 
  = 1

---
### Diapositive 21

Comprendre le mécanisme de la boucle for

---
### Diapositive 22

Évaluons ce que vous avez retenu...
Sortez vos smartphones

---
### Diapositive 23

Itérations avec nombre de répétitions inconnu
Les questions à se poser
Les problèmes dont la solution se base sur une décomposition itérative
                avec nombre de répétitions inconnu sont fréquents.
Pour mettre en place ce type de décomposition itérative, deux questions
                essentielles doivent être traitées :
Quelle est la condition
à
                    satisfaire pour que la répétition prenne fin ?
A quel moment
doit-on se préoccuper
                    de savoir si cette condition est
                    satisfaite ?
A retenir
Les erreurs de programmation sur les structures
                        répétitives sont
                        souvent dues au fait que le programmeur a mal répondu à
                        l'une ou l'autre de ces questions...
Exemple
Proposer un algorithme qui demande à l'utilisateur de saisir un
                numéro de mois
numMois
tant que la valeur saisie n'est pas comprise
                entre 1 et 12.
On ne sait pas quand l'utilisateur va saisir une valeur
                valide, on ne sait
                donc pas combien de fois l'action de saisie devra être répétée.
Mise en place de la structure répétitive :
Quelle est la condition à satisfaire pour que la répétition prenne fin ?
numMois ∈
                            [1..12]
A quel moment doit-on se préoccuper de savoir si cette condition est
                        satisfaite ?
Après la saisie de
                            numMois
Points de repère
Y a t'il des points de repère permettant de répondre aux questions précédentes ?
Quelle est la condition à satisfaire pour que la répétition prenne fin
                        ?
La réponse à cette question dépend
                        du problème à traiter : il n'y a pas de réponse type.
A quel moment doit-on se préoccuper de savoir si cette condition est
                        satisfaite ?
On peut ici dégager des configurations
                        typiques qu'on retrouve régulièrement lors de la résolution de problèmes...
Quel est le bon moment pour s'arrêter ?
Choisir le moment opportun pour évaluer une condition d'arrêt est une question fondamentale
                pour réussir à mettre en place une structure itérative.
Il existe des configurations algorithmiques connues qui permettent d'établir une base de réflexion...
Evaluer la condition d'arrêt
avant
chaque répétition
Dans cette configuration, l'algorithme :
évalue d'abord si la condition d'arrêt est vérifiée ;
si elle n'est pas vérifiée, traite P1 puis P2 ;
- - - fin de la 1ère répétition - - -
évalue si la condition d'arrêt est vérifiée ;
si elle n'est pas vérifiée, traite P1 puis P2 ;
- - - fin de la 2ème répétition - - -
...
- - - fin de la Nème répétition - - -
évalue si la condition d'arrêt est vérifiée ;
si elle est vérifiée, stoppe la répétition.
Evaluer la condition d'arrêt
en cours
de répétition
Dans cette configuration, l'algorithme :
traite P1
évalue si la condition d'arrêt est vérifiée ;
si elle n'est pas vérifiée traite P2 ;
- - - fin de la 1ère répétition - - -
traite P1
évalue si la condition d'arrêt est vérifiée ;
si elle n'est pas vérifiée traite P2 ;
- - - fin de la 2ème répétition - - -
...
- - - fin de la Nème répétition - - -
traite P1
évalue si la condition d'arrêt est vérifiée ;
si elle est vérifiée stoppe la répétition (P2 n'est pas traité).
Evaluer la condition d'arrêt
après
chaque répétition
Dans cette configuration, l'algorithme :
traite P1 puis P2 ;
évalue si la condition d'arrêt est vérifiée (on suppose que non) ;
- - - fin de la 1ère répétition - - -
traite P1 puis P2 ;
évalue si la condition d'arrêt est vérifiée (on suppose que non) ;
- - - fin de la 2ème répétition - - -
...
- - - fin de la Nème répétition - - -
traite P1 puis P2 ;
évalue si la condition d'arrêt est vérifiée (on suppose que oui) ;
stoppe la répétition.
Autres cas de figure
Les autres cas de figure concernent les structures répétitives intégrant
plusieurs conditions d'arrêt non évaluables en même temps.
Ces cas sont nombreux et sont les plus complexes.
Toutefois, l'élaboration de telles
                        structures répétitives est similaire aux précédentes. Pour chaque condition d'arrêt, on
                        se préoccupera :
de formaliser précisément chaque condition d'arrêt ;
de savoir à quel moment chaque condition d'arrêt doit être évaluée.
Condition d'arrêt
avant
chaque répétition : codage
while ( ! (condition d'arrêt) )
  {
    // code de P1
    ...

    // code de P2
    ...
  }
Condition d'arrêt
après
chaque répétition : codage
do
  {
    // code de P1
    ...

    // code de P2
    ...
  }
  while ( ! (condition d'arrêt) ) ;
Condition d'arrêt évaluée
en cours
de répétition
while (true)
 {
   // code de P1
   ...
     
   if (condition d'arrêt)
   {
     break;
   }
     
   // code de P2
   ...
 }
for ( ; ; )
 {
   // code de P1
   ...
        
   if (condition d'arrêt)
   {
     break;
   }
        
   // code de P2
   ...
 }
Conditions d'arrêt multiples non évaluables en même temps (1/2)
while (true)
 {
   // code de P1
   ...
        
   if (condition d'arrêt 1)
   {
     break;
   }
        
   // code de P2
   ...

   if (condition d'arrêt 2)
   {
     break;
   }     
 }
Conditions d'arrêt multiples non évaluables en même temps (2/2)
Autre possibilité :
for ( ; ; )
 {
   // code de P1
   ...
        
   if (condition d'arrêt 1)
   {
     break;
   }
        
   // code de P2
   ...

   if (condition d'arrêt 2)
   {
     break;
   }    
 }
Concevoir une structure itérative : résumé
Évaluons ce que vous avez retenu...
Sortez vos smartphones

---
### Diapositive 24

Itérations avec nombre de répétitions inconnu

---
### Diapositive 25

Les questions à se poser
Les problèmes dont la solution se base sur une décomposition itérative
                avec nombre de répétitions inconnu sont fréquents.
Pour mettre en place ce type de décomposition itérative, deux questions
                essentielles doivent être traitées :
Quelle est la condition
à
                    satisfaire pour que la répétition prenne fin ?
A quel moment
doit-on se préoccuper
                    de savoir si cette condition est
                    satisfaite ?
A retenir
Les erreurs de programmation sur les structures
                        répétitives sont
                        souvent dues au fait que le programmeur a mal répondu à
                        l'une ou l'autre de ces questions...

---
### Diapositive 26

Exemple
Proposer un algorithme qui demande à l'utilisateur de saisir un
                numéro de mois
numMois
tant que la valeur saisie n'est pas comprise
                entre 1 et 12.
On ne sait pas quand l'utilisateur va saisir une valeur
                valide, on ne sait
                donc pas combien de fois l'action de saisie devra être répétée.
Mise en place de la structure répétitive :
Quelle est la condition à satisfaire pour que la répétition prenne fin ?
numMois ∈
                            [1..12]
A quel moment doit-on se préoccuper de savoir si cette condition est
                        satisfaite ?
Après la saisie de
                            numMois

---
### Diapositive 27

Points de repère
Y a t'il des points de repère permettant de répondre aux questions précédentes ?
Quelle est la condition à satisfaire pour que la répétition prenne fin
                        ?
La réponse à cette question dépend
                        du problème à traiter : il n'y a pas de réponse type.
A quel moment doit-on se préoccuper de savoir si cette condition est
                        satisfaite ?
On peut ici dégager des configurations
                        typiques qu'on retrouve régulièrement lors de la résolution de problèmes...

---
### Diapositive 28

Quel est le bon moment pour s'arrêter ?
Choisir le moment opportun pour évaluer une condition d'arrêt est une question fondamentale
                pour réussir à mettre en place une structure itérative.
Il existe des configurations algorithmiques connues qui permettent d'établir une base de réflexion...

---
### Diapositive 29

Evaluer la condition d'arrêt
avant
chaque répétition
Dans cette configuration, l'algorithme :
évalue d'abord si la condition d'arrêt est vérifiée ;
si elle n'est pas vérifiée, traite P1 puis P2 ;
- - - fin de la 1ère répétition - - -
évalue si la condition d'arrêt est vérifiée ;
si elle n'est pas vérifiée, traite P1 puis P2 ;
- - - fin de la 2ème répétition - - -
...
- - - fin de la Nème répétition - - -
évalue si la condition d'arrêt est vérifiée ;
si elle est vérifiée, stoppe la répétition.

---
### Diapositive 30

Evaluer la condition d'arrêt
en cours
de répétition
Dans cette configuration, l'algorithme :
traite P1
évalue si la condition d'arrêt est vérifiée ;
si elle n'est pas vérifiée traite P2 ;
- - - fin de la 1ère répétition - - -
traite P1
évalue si la condition d'arrêt est vérifiée ;
si elle n'est pas vérifiée traite P2 ;
- - - fin de la 2ème répétition - - -
...
- - - fin de la Nème répétition - - -
traite P1
évalue si la condition d'arrêt est vérifiée ;
si elle est vérifiée stoppe la répétition (P2 n'est pas traité).

---
### Diapositive 31

Evaluer la condition d'arrêt
après
chaque répétition
Dans cette configuration, l'algorithme :
traite P1 puis P2 ;
évalue si la condition d'arrêt est vérifiée (on suppose que non) ;
- - - fin de la 1ère répétition - - -
traite P1 puis P2 ;
évalue si la condition d'arrêt est vérifiée (on suppose que non) ;
- - - fin de la 2ème répétition - - -
...
- - - fin de la Nème répétition - - -
traite P1 puis P2 ;
évalue si la condition d'arrêt est vérifiée (on suppose que oui) ;
stoppe la répétition.

---
### Diapositive 32

Autres cas de figure
Les autres cas de figure concernent les structures répétitives intégrant
plusieurs conditions d'arrêt non évaluables en même temps.
Ces cas sont nombreux et sont les plus complexes.
Toutefois, l'élaboration de telles
                        structures répétitives est similaire aux précédentes. Pour chaque condition d'arrêt, on
                        se préoccupera :
de formaliser précisément chaque condition d'arrêt ;
de savoir à quel moment chaque condition d'arrêt doit être évaluée.

---
### Diapositive 33

Condition d'arrêt
avant
chaque répétition : codage
while ( ! (condition d'arrêt) )
  {
    // code de P1
    ...

    // code de P2
    ...
  }

---
### Diapositive 34

Condition d'arrêt
après
chaque répétition : codage
do
  {
    // code de P1
    ...

    // code de P2
    ...
  }
  while ( ! (condition d'arrêt) ) ;

---
### Diapositive 35

Condition d'arrêt évaluée
en cours
de répétition
while (true)
 {
   // code de P1
   ...
     
   if (condition d'arrêt)
   {
     break;
   }
     
   // code de P2
   ...
 }
for ( ; ; )
 {
   // code de P1
   ...
        
   if (condition d'arrêt)
   {
     break;
   }
        
   // code de P2
   ...
 }

---
### Diapositive 36

Conditions d'arrêt multiples non évaluables en même temps (1/2)
while (true)
 {
   // code de P1
   ...
        
   if (condition d'arrêt 1)
   {
     break;
   }
        
   // code de P2
   ...

   if (condition d'arrêt 2)
   {
     break;
   }     
 }

---
### Diapositive 37

Conditions d'arrêt multiples non évaluables en même temps (2/2)
Autre possibilité :
for ( ; ; )
 {
   // code de P1
   ...
        
   if (condition d'arrêt 1)
   {
     break;
   }
        
   // code de P2
   ...

   if (condition d'arrêt 2)
   {
     break;
   }    
 }

---
### Diapositive 38

Concevoir une structure itérative : résumé

---
### Diapositive 39

Évaluons ce que vous avez retenu...
Sortez vos smartphones

---
### Diapositive 40

Bonnes pratiques
Délimiter les actions répétées avec des accolades
Que ce soit pour une boucle for, une boucle while ou une boucle do-while, il
                        est possible de se dispenser d'utiliser des accolades s'il n'y a qu'une seule
                        instruction répétée.
Toutefois, pour appliquer les bonnes pratiques vues précédemment, nous
                        emploierons toujours des accolades pour délimiter les instructions
                        répétées, même s'il n'y en n'a qu'une.
"All flow control primitives (if, else, while, for, do,
                                switch and case) should be followed by a block,
                                even if it is empty."
Mats Henricson and Erik Nyquist -
Industrial Strength C++, 1997, p. 27
Cette bonne pratique améliore la lisibilité du code, sa maintenabilité (possibilité
                d'ajouter / supprimer des instructions répétées sans soucis) et évite des cas
                d'erreurs fastidieux à déceler.
Prendre le temps d'identifier la structure itérative la plus adaptée (1/4)
Cas où la condition d'arrêt est évaluée en
début
de boucle.
"Pour créer une boucle dont le test se trouve
au
                        début
, employez une
boucle while
en C++, C#,
                    Java, Visual Basic et de nombreux autres
                    langages."
Steve McConnell -
Tout sur le code - Pour concevoir du logiciel de qualité, dans tous les
                        langages, 2005, page 395.
Prendre le temps d'identifier la structure itérative la plus adaptée (2/4)
Cas où la condition d'arrêt est évaluée en
fin
de boucle.
"Vous rencontrerez de temps en temps des situations dans
                    lesquelles la boucle doit être souple, mais où le code doit
                    être exécuté
au moins une fois
. Dans un tel cas,
                    employez une boucle
do-while
en C++, C# et Java
                    et do-loop-while en Visual Basic."
Steve McConnell -
Tout sur le code - Pour concevoir du logiciel de qualité, dans tous les
                        langages, 2005, page 395.
Prendre le temps d'identifier la structure itérative la plus adaptée (3/4)
Cas où la condition d'arrêt est évaluée en
cours
de répétition.
"Une boucle loop-with-exit est une boucle dans laquelle
                    la condition de sortie apparaı̂t au milieu de la boucle
                    plutôt qu'au début ou à la fin. Ce type de boucle existe
                    de manière explicite en Visual Basic
[1]
; vous
                    pouvez l'emuler à l'aide de
while(true)
et de
break
[2]
en C++ [...]."
Steve McConnell -
Tout sur le code - Pour concevoir du logiciel de qualité, dans tous les
                        langages, 2005, page 395.
[1]
existe également en Ada avec loop - end loop.
[2]
ou for ( ; ; ) et break.
Prendre le temps d'identifier la structure itérative la plus adaptée (4/4)
Cas où le nombre de répétitions est connu.
"La boucle
for
est le choix idéal si vous avez
                    besoin d'une boucle qui s'exécute
un certain
                        nombre de fois
[1]
."
Steve McConnell -
Tout sur le code - Pour concevoir du logiciel de qualité, dans tous les
                        langages, 2005, page 398.
[1]
ce nombre de fois étant connu ou calculable.
Utiliser correctement chaque structure de contrôle (1/2)
"La caractéristique d'une boucle for, c'est qu'elle est définie au début
                    de la boucle et que vous l'oubliez ensuite. Il n'y aucun contrôle à
                    installer à l'intérieur de la boucle. Par contre, s'il existe une
                    condition de sortie pour laquelle l'exécution doit se poursuivre
                    à l'extérieur d'une boucle, utilisez une boucle while
[1]
."
Steve McConnell -
Tout sur le code - Pour concevoir du logiciel de qualité, dans tous les
                        langages, 2005, page 398.
[1]
ou do...while selon la position de la condition d'arrêt.
Conseil d'expert
Extrait de
McConnell, S. (2004). Code Complete, Second Edition. Redmond, WA, USA: Microsoft Press. ISBN: 0735619670 - Page 372.
Exemple de pratique à éviter
for ( i = 1 ; i <= 10 ; i++ )
 {
   cout < < " Entrez un nombre " ; 
   cin > > nbre ;

   if ( nbre < 0 )
   {
     break ;
   }
 }
Dans cet exemple, lorsque le nombre saisi est négatif la répétitition prend fin :
Le nombre de saisies à effectuer n'est donc pas connu
L'usage d'une boucle for n'est donc pas approprié
Utiliser correctement chaque structure de contrôle (2/2)
Ne modifiez
jamais
l'indice d'une boucle for au sein des actions répétées : Si
                vous utilisez une boucle for, laissez la gérer elle-même l'évolution de son
                indice, sinon changez de type de boucle.
"Ne trafiquez pas l'indice d'une boucle for pour
                            l'obliger à se terminer."
Steve McConnell -
Tout sur le code - Pour concevoir du logiciel de qualité, dans tous les
                                langages, 2005, page 403.
"Do not change a loop variable inside a for-loop
                                block."
Mats Henricson and Erik Nyquist -
Industrial Strength C++, 1997, p. 26-27
Exemple de pratique à proscrire
for ( i = 1 ; i < 100 ; i++ )
 {
   // du code 
   ...

   if ( ... )
   {
     i = 100 ;
   }

   // encore du code
   ...
 }

---
### Diapositive 41

Bonnes pratiques

---
### Diapositive 42

Délimiter les actions répétées avec des accolades
Que ce soit pour une boucle for, une boucle while ou une boucle do-while, il
                        est possible de se dispenser d'utiliser des accolades s'il n'y a qu'une seule
                        instruction répétée.
Toutefois, pour appliquer les bonnes pratiques vues précédemment, nous
                        emploierons toujours des accolades pour délimiter les instructions
                        répétées, même s'il n'y en n'a qu'une.
"All flow control primitives (if, else, while, for, do,
                                switch and case) should be followed by a block,
                                even if it is empty."
Mats Henricson and Erik Nyquist -
Industrial Strength C++, 1997, p. 27
Cette bonne pratique améliore la lisibilité du code, sa maintenabilité (possibilité
                d'ajouter / supprimer des instructions répétées sans soucis) et évite des cas
                d'erreurs fastidieux à déceler.

---
### Diapositive 43

Prendre le temps d'identifier la structure itérative la plus adaptée (1/4)
Cas où la condition d'arrêt est évaluée en
début
de boucle.
"Pour créer une boucle dont le test se trouve
au
                        début
, employez une
boucle while
en C++, C#,
                    Java, Visual Basic et de nombreux autres
                    langages."
Steve McConnell -
Tout sur le code - Pour concevoir du logiciel de qualité, dans tous les
                        langages, 2005, page 395.

---
### Diapositive 44

Prendre le temps d'identifier la structure itérative la plus adaptée (2/4)
Cas où la condition d'arrêt est évaluée en
fin
de boucle.
"Vous rencontrerez de temps en temps des situations dans
                    lesquelles la boucle doit être souple, mais où le code doit
                    être exécuté
au moins une fois
. Dans un tel cas,
                    employez une boucle
do-while
en C++, C# et Java
                    et do-loop-while en Visual Basic."
Steve McConnell -
Tout sur le code - Pour concevoir du logiciel de qualité, dans tous les
                        langages, 2005, page 395.

---
### Diapositive 45

Prendre le temps d'identifier la structure itérative la plus adaptée (3/4)
Cas où la condition d'arrêt est évaluée en
cours
de répétition.
"Une boucle loop-with-exit est une boucle dans laquelle
                    la condition de sortie apparaı̂t au milieu de la boucle
                    plutôt qu'au début ou à la fin. Ce type de boucle existe
                    de manière explicite en Visual Basic
[1]
; vous
                    pouvez l'emuler à l'aide de
while(true)
et de
break
[2]
en C++ [...]."
Steve McConnell -
Tout sur le code - Pour concevoir du logiciel de qualité, dans tous les
                        langages, 2005, page 395.
[1]
existe également en Ada avec loop - end loop.
[2]
ou for ( ; ; ) et break.

---
### Diapositive 46

Prendre le temps d'identifier la structure itérative la plus adaptée (4/4)
Cas où le nombre de répétitions est connu.
"La boucle
for
est le choix idéal si vous avez
                    besoin d'une boucle qui s'exécute
un certain
                        nombre de fois
[1]
."
Steve McConnell -
Tout sur le code - Pour concevoir du logiciel de qualité, dans tous les
                        langages, 2005, page 398.
[1]
ce nombre de fois étant connu ou calculable.

---
### Diapositive 47

Utiliser correctement chaque structure de contrôle (1/2)
"La caractéristique d'une boucle for, c'est qu'elle est définie au début
                    de la boucle et que vous l'oubliez ensuite. Il n'y aucun contrôle à
                    installer à l'intérieur de la boucle. Par contre, s'il existe une
                    condition de sortie pour laquelle l'exécution doit se poursuivre
                    à l'extérieur d'une boucle, utilisez une boucle while
[1]
."
Steve McConnell -
Tout sur le code - Pour concevoir du logiciel de qualité, dans tous les
                        langages, 2005, page 398.
[1]
ou do...while selon la position de la condition d'arrêt.

---
### Diapositive 48

Conseil d'expert
Extrait de
McConnell, S. (2004). Code Complete, Second Edition. Redmond, WA, USA: Microsoft Press. ISBN: 0735619670 - Page 372.

---
### Diapositive 49

Exemple de pratique à éviter
for ( i = 1 ; i <= 10 ; i++ )
 {
   cout < < " Entrez un nombre " ; 
   cin > > nbre ;

   if ( nbre < 0 )
   {
     break ;
   }
 }
Dans cet exemple, lorsque le nombre saisi est négatif la répétitition prend fin :
Le nombre de saisies à effectuer n'est donc pas connu
L'usage d'une boucle for n'est donc pas approprié

---
### Diapositive 50

Utiliser correctement chaque structure de contrôle (2/2)
Ne modifiez
jamais
l'indice d'une boucle for au sein des actions répétées : Si
                vous utilisez une boucle for, laissez la gérer elle-même l'évolution de son
                indice, sinon changez de type de boucle.
"Ne trafiquez pas l'indice d'une boucle for pour
                            l'obliger à se terminer."
Steve McConnell -
Tout sur le code - Pour concevoir du logiciel de qualité, dans tous les
                                langages, 2005, page 403.
"Do not change a loop variable inside a for-loop
                                block."
Mats Henricson and Erik Nyquist -
Industrial Strength C++, 1997, p. 26-27

---
### Diapositive 51

Exemple de pratique à proscrire
for ( i = 1 ; i < 100 ; i++ )
 {
   // du code 
   ...

   if ( ... )
   {
     i = 100 ;
   }

   // encore du code
   ...
 }
