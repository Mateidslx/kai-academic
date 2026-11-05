# Semaine 1 - TP 1 - Activités de programmation Page

URL: https://elearn.univ-pau.fr/mod/page/view.php?id=692207

TP1

Mise en place et découverte de l'environnement de travail

R1.01 - Initiation au développement

Pour traiter les exercices de programmation sur lesquels nous travaillerons tout au long du module R1.01 - Initiation au développement, nous utiliserons l'environnement de programmation

Visual Studio Code

et nous programmerons en C++.

1. Configuration de Visual Studio Code

Avec l'aide de votre enseignant, suivez les directives données dans le tutoriel

Paramétrer Visual Studio Code à l'IUT

. Une fois que votre environnement de travail a été configuré et testé revenez sur ce sujet de TP pour passer à l'étape suivante.

2. Appréhender le mécanisme de la compilation

Après avoir testé le paramétrage de Visual studio code en compilant et en exécutant le programme

Hello world

, vérifiez que vous avez un fichier

main.exe

dans le dossier

hello-world

. Utilisez éventuellement le bouton d'actualisation pour rafraichir la liste des fichiers dans Visual studio code :

Essayez d'ouvrir le fichier

main.exe

avec Visual studio code et observez ce qui se passe ;

Supprimez le fichier

main.exe

, ouvrez à nouveau le fichier

main.cpp

du dossier

hello-world

et lancez une compilation avec le raccourci

Ctrl

+

Maj

+

B

Actualisez la liste des fichiers et vérifiez que le fichier

main.exe

est à nouveau présent ;

Supprimez à nouveau le fichier

main.exe

puis introduisez une erreur dans le code en supprimant le point-virgule qui se trouve à la fin de la ligne commençant par

cout

;

Relancez une compilation (

Ctrl

+

Maj

+

B

) et vérifiez cette fois-ci que le fichier

main.exe

n'est pas re-créé :

A partir des manipulations que vous venez de faire et des connaissances que vous avez en programmation, essayez d'expliquer à votre enseignant ce qu'est une opération de compilation.

3. Analyse et prise en main d'un code simple

Corrigez l'erreur introduite dans le fichier

main.cpp

puis recompilez-le (

Ctrl

+

Maj

+

B

) afin de revenir à un programme fonctionnel. Fermez ensuite ce fichier

main.cpp

puis ouvrez le fichier

main.cpp

qui se trouve dans le dossier

conversion-euros-dollars

.

Ouvrez maintenant le fichier

main.cpp

qui se trouve dans le dossier

conversion-euros-dollars

.

Ce programme permet de convertir une somme saisie en euros vers une somme équivalente en dollars. Compilez ce programme (

Ctrl

+

Maj

+

B

) puis exécutez le (bouton

) pour tester son fonctionnement. Analysez ensuite le code de ce programme, puis, avec les connaissances dont vous disposez et avec l'aide de votre enseignant répondez aux questions qui suivent.

1.

Expliquez à quoi sert le symbole

//

utilisé par exemple juste avant le mot VARIABLES :

Copier

// VARIABLES

2.

Expliquez à quoi servent les symboles

/*

et

*/

utilisés en début de fichier ;

3.

Dans la ligne ci-dessous expliquez ce que représente

sommeEuros

:

Copier

double

sommeEuros;

// La somme en euros qui doit être convertie en dollars.

4.

Dans la ligne ci-dessous expliquez ce que représente

double

:

Copier

double

sommeEuros;

// La somme en euros qui doit être convertie en dollars.

5.

Dans la ligne ci-dessous expliquez ce que représente

La
            somme en euros qui doit être convertie en dollars

:

Copier

double

sommeEuros;

// La somme en euros qui doit être convertie en dollars.

6.

Dans la ligne ci-dessous expliquez ce que représente

const

:

Copier

const

double

TAUX_EUROS_VERS_DOLLARS =

1.3383

;

// Le taux de conversion utilisé pour convertir des euros en dollars.

7.

Dans la ligne ci-dessous expliquez ce que représente

1.3383

:

Copier

const

double

TAUX_EUROS_VERS_DOLLARS =

1.3383

;

// Le taux de conversion utilisé pour convertir des euros en dollars.

8.

Dans la ligne ci-dessous expliquez quel est le rôle de l'instruction

cout

ainsi que son mode de fonctionnement :

Copier

cout <<

"Entrez la somme en euros a convertir en dollars : "

;

9.

Indiquez quelle différence d'usage y a t'il entre l'instruction

cout

précédente et celle ci-dessous :

Copier

cout <<

"La somme convertie est egale a "

<< sommeDollars <<

" $"

<< endl;

10.

Indiquez ce que fait l'instruction ci-dessous et précisez quel est le rôle de l'opérateur

=

Copier

sommeDollars = sommeEuros * TAUX_EUROS_VERS_DOLLARS;

4. Travail à faire d'ici la séance de TP de la semaine prochaine

Rendez-vous dans la section

Tutoriels vidéos

de ce cours puis étudiez les notions de programmation présentées dans les vidéos suivantes :

Compiler et exécuter un code avec Visual Studio Code (révision de notions abordées dans ce TP) ;

Le programme Hello World de C++ (révision de notions abordées dans ce TP) ;

Les conventions de nommage (nouvelle compétence à acquérir)

Déclarer ses variables correctement (nouvelle compétence à acquérir)

Méthodologie d'écriture d'un code (nouvelle compétence à acquérir)

⚠️ Attention

: Les notions abordées dans ces vidéos :

pourront faire l'objet de questions lors du prochain examen écrit ;

seront évaluées lors de l'épreuve de programmation du module.

Si vous avez des questions sur les points abordés dans ces vidéos,

sollicitez vos enseignants !

S'il vous reste du temps

, nous vous recommandons également d'aller plus loin et de consolider vos connaissances en étudiant les notions abordées dans les tutoriels suivants :

Qu'est-ce qu'un IDE ?

Langages compilés et interprétés ;

Notions d'entrées-sorties ;

Les espaces de noms.

×