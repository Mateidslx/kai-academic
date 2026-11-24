# Configurer Visual studio code sur votre PC Página

Source: https://elearn.univ-pau.fr/mod/page/view.php?id=692257

Configuration de Visual Studio Code

sur un PC personnel

Visual Studio Code

est un éditeur de code extensible qui peut être paramétré pour travailler avec de nombreux langages de programmation. L'objectif ici est d'installer Visual Studio Code sur votre PC windows avec un paramétrage équivalent à celui disponible sur les bureaux virtuels de l'IUT.

⚠️ Attention

Les étapes de configuration que vous allez suivre ici sont uniquement valables pour configurer l'éditeur Visual Studio Code sur une

machine windows personnelle

. Ce processus de configuration n'est pas valable si vous souhaitez installer et configurer Visual Studio Code sur les bureaux virtuels de l'IUT.

1. Prérequis concernant votre PC

Vous devez disposer d'une machine avec Windows 8, Windows 10 ou Windows 11 en version 64 bits et d'1 GO d'espace libre sur votre disque dur. Si vous disposez déjà d'une version de Visual Studio Code installée sur votre PC, désinstallez-la.

2. Contenu du pack

Cet assistant installe et pré-configure les logiciels libres suivants :

Visual Studio Code

(Licence MIT)

Le compilateur et débogueur C++ de

MinGW-64

(Licence GNU GPL)

Des extensions pour faciliter l'écriture, la compilation, l'exécution et le débogage de programmes C++

Le pack installe également les logiciels libres suivants qui vous seront utiles en 2ème année de BUT :

Le générateur de documentation

Doxygen

(Licence publique générale GNU version 2)

Des extensions pour faciliter la génération de documentation à partir de commentaires Doxygen, la sauvegarde et le partage du code sur Github.

3. Installation et premiers pas

Récupérer les fichiers nécessaires

Téléchargez les deux fichiers mis à disposition ci-dessous :

VScodePackInstaller.exe

: Cet exécutable permet d'installer Visual Studio Code sur votre PC avec le paramétrage et les extensions nécessaires.

Important :

Si Visual Studio Code est déjà installé sur votre PC, il est recommandé de le désinstaller avant de procéder à l'installation de cette version pré-configurée.

workspace-cplusplus.zip

: Cette archive contient un projet préconfiguré (workspace) que vous devrez utiliser avec Visual Studio Code pour écrire vos programmes.

VScodePackInstaller.exe

workspace-cplusplus

Installer Visual Studio Code

Exécutez le programme

VScodePackInstaller.exe

sur votre PC.

Selon votre configuration de windows, il est possible qu'une

fenêtre d'avertissement

apparaisse vous indiquant que Windows souhaite protéger votre PC de ce programme d'installation. Si c'est le cas, cliquez sur le lien "Informations complémentaires" puis sur le bouton "Exécuter quand même". Suivez ensuite les étapes proposées par l'assistant.

A la fin de l'installation, l'assistant vous demandera de redémarrer votre PC et ajoutera un raccourci

VSCode pour C++

sur votre bureau windows (

A

sur l'image ci-dessous).

⚠️ Important :

Ce raccourci exécutera Visual Studio Code avec une configuration dédiée au développement de programmes C++. Il est donc important que vous utilisiez ce raccourci (et non celui ajouté dans votre menu

Démarrer

) dès lors que vous voudrez utiliser Visual Studio Code pour écrire des programmes C++. Si vous souhaitez utiliser Visual Studio Code pour une autre activité de programmation, utilisez le raccourci présent dans votre menu

Démarrer

.

Cliquez sur l'image pour l'agrandir

Mettre en place l'espace de développement

Pour commencer un nouveau projet (workspace) C++, dézippez l'archive

workspace-cplusplus

dans un dossier dont le chemin ne contient ni caractère accentué ni espace (voir

B

dans l'image ci-dessus - par exemple

c:\Developpement

).

Ouvrir l'espace de développement

Lancez Visual Studio Code à partir du raccourci

VSCode pour C++

présent sur votre bureau puis ouvrez le workspace que vous avez précédemment dézippé.

Pour cela, rendez-vous dans le menu

Fichier → Ouvrir l'espace de travail

(ou

Open workspace

si votre interface est en anglais) et sélectionnez le fichier

workspace-cplusplus.code-workspace

(qui peut simplement apparaître sous le nom

workspace-cplusplus

si votre explorateur windows masque les extensions de fichiers).

Faire une première compilation

Une fois le worspace ouvert, utilisez l'explorateur situé sur la zone gauche de Visual Studio Code pour ouvrir le fichier

main.cpp

situé dans le dossier

hello-world

(

D

dans l'image ci-dessus). Le code d'un programme

hello-world

s'affiche alors dans Visual Studio Code.

Utilisez le raccourci clavier

CTRL + MAJ + B

pour lancer une opération de compilation. Vérifiez qu'un terminal s'ouvre et présente le résultat de la compilation au bas de l'interface de Visual Studio Code (

E

dans l'image ci-dessus)

Exécuter le programme

Appuyez sur le bouton

Play

situé en haut à droite de l'interface de Visual Studio Code (

F

dans l'image ci-dessus) et vérifiez qu'une nouvelle fenêtre de terminal s'ouvre (

G

dans l'image ci-dessus) pour présenter le résultat de l'exécution (affichage du message

Hello world!

).

Si vous êtes arrivé jusqu'à cette étape vous disposez maintenant d'un environnement de développement fonctionnel vous permettant d'écrire des programmes C++ à l'aide de Visual Studio Code, de générer de la documentation technique et éventuellement de versionner le code sur Github si vous avez rempli les pré-requis listés en haut de ce document. 😄

Aller plus loin

A partir de l'espace de travail que vous avez mis en place vous pouvez écrire de nouveaux programmes C++ en respectant la règle suivante :

Tout programme doit se trouver dans un dossier du workspace qui lui est dédié

.

Autrement dit, vous ne devez pas avoir plusieurs fichiers contenant l'extrait de code

int
        main (void)

dans un même dossier.

Si vous voulez écrire un nouveau programme

dans ce workspace

:

créez un nouveau dossier avec un nom sans caractère accentué ni espace, soit avec Visual Studio Code soit avec votre explorateur windows ;

au sein de ce dossier créez un nouveau fichier

main.cpp

puis commencez à écrire votre programme.

⚠️ Important :

Rappelez-vous que, dès lors que vous voulez écrire du code C++ via cette installation personnalisée de Visual Studio Code, vous devez :

ouvrir Visual Studio Code via le raccourci de bureau

VSCode pour C++

fourni avec cette installation ;

toujours ouvrir un espace de travail (désigné ici par le fichier

workspace-cplusplus.code-workspace

). Si vous ouvrez directement un fichier C++ ou un dossier C++ à la place d'un workspace vous n'aurez pas accès aux commandes de compilation et à certaines autres fonctionnalités.

Maintenant c'est à vous de jouer : Bon travail de programmation !

×