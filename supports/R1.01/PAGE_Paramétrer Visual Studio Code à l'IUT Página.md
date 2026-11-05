# Paramétrer Visual Studio Code à l'IUT Página

Source: https://elearn.univ-pau.fr/mod/page/view.php?id=692259

Paramétrer Visual Studio Code à l'IUT

Pour traiter les exercices de programmation sur lesquels nous travaillerons tout au long du module R1.01 - Initiation au développement, nous utiliserons l'environnement de programmation

Visual Studio Code

et nous programmerons en C++.

1. Mise en place des dossiers et des fichiers

Pour mettre en place l'environnement de travail que nous utiliserons tout au long du module, suivez les étapes ci-dessous :

Sur

votre espace de travail réseau

désigné par le disque

F:

, créez un dossier dans lequel vous rangerez les travaux pratiques des différentes matières que vous aborderez tout au long de l'année.

Attention

: le chemin d’accès ne doit comporter ni espaces, ni caractères accentués. Par exemple :

F:\\travaux-pratiques

. Sinon certains outils (par ex. le débogueur) ne fonctionneront pas.

Toujours avec l'explorateur de fichiers de windows, rendez-vous

à l'intérieur

du dossier qui contiendra tous vos travaux pratiques (

F:\\travaux-pratiques

dans cet exemple).

Faites un clic droit à l'intérieur de ce dossier pour faire apparaître le menu contextuel de l'explorateur et sélectionnez l'option

Git Bash Here

.

Dans le terminal qui vient de s'ouvrir, copiez-collez et enchaînez les commandes ci-dessous pour mettre en place votre espace de travail dédié au module R1.01 :

git
              clone https://github.com/patrick-etcheverry/cplusplus-r101.git
              tp-r1-01-init-au-dev1

Copier

cd
              tp-r1-01-init-au-dev1

Copier

rm
              -fr .git README.md .gitignore

Copier

A la fin de ces étapes vous disposez d'un dossier

tp-r1-01-init-au-dev1

qui contient plusieurs sous-dossiers :

le sous-dossier

tp1

contiendra le code des exercices que vous traiterez durant ce TP1 (

un sous-dossier par exercice

),

le sous-dossier

tp2

contiendra le code des exercices que vous traiterez durant le TP2 (

un sous-dossier par exercice

),

etc.

Notez que le dossier

tp-r1-01-init-au-dev1

contient un dossier

.vscode

et un fichier

travaux-pratiques-r1-01

(ou

travaux-pratiques-r1-01.code-workspace

si votre explorateur de fichiers affiche les extensions). Ce dossier et ce fichier

ne doivent pas être supprimés

.

Si besoin, le déroulement des différentes étapes est illustré dans la vidéo ci-dessous :

2. Test de l'environnement de programmation

Pour vérifier que l'environnement de programmation est opérationnel, suivez les étapes ci-dessous :

Dans le menu

Démarrer

de Windows recherchez et ouvrez l'application Visual Studio Code

pour C++

(attention de ne pas ouvrir l'application Visual Studio Code "tout court" qui ouvrira un éditeur non opérationnel pour programmer en C++) ;

Pour éviter toute erreur de manipulation lors des futurs TP, nous vous conseillons fortement d'ajouter sur votre bureau un raccourci vers l'application Visual Studio Code

pour C++

que vous devrez ouvrir en début de chaque TP du module R1.01 ;

Dans Visual Studio Code, utilisez le menu

Fichier

→

Ouvrir l'espace de travail à partir du fichier...

Sélectionnez le fichier

travaux-pratiques-r1-01

(ou

travaux-pratiques-r1-01.code-workspace

si votre explorateur affiche les extensions) qui se trouve dans votre dossier

tp-r1-01-initiation-dev1

;

Dans l'explorateur de fichier de Visual Studio Code (à gauche), ouvrez le fichier

main.cpp

qui se trouve dans le dossier

tp1/hello-world

.

Utilisez le raccourci clavier

Ctrl

+

Maj

+

B

pour lancer une opération de compilation (cette notion sera abordée juste après). Vérifier qu'une nouvelle zone s'affiche au bas de la fenêtre de Visual Studio Code avec le résultat de la compilation.

En haut à droite de l'interface de Visual Studio Code vous trouverez un bouton en forme de triangle (une sorte de bouton "Play"). Cliquez sur ce bouton pour exécuter le code.

Vérifiez qu'une fenêtre de terminal s'ouvre pour exécuter le programme et affiche la phrase "Hello world!".

Si les deux dernières étapes se sont déroulées sans problème, votre environnement de programmation est prêt.

🙂

Si besoin, le déroulement des différentes étapes est illustré dans la vidéo ci-dessous :