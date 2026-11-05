# Concevoir des itérations Page

URL: https://elearn.univ-pau.fr/mod/page/view.php?id=695682

Concevoir des itérations

Quelques points de repère pour choisir une structure répétitive adaptée au problème à résoudre.

Lorsqu'un traitement doit être répété, plusieurs structures itératives peuvent souvent être utilisées pour obtenir le même résultat. Le choix d'une structure adaptée dépend surtout de ce que l'on sait sur le

nombre de répétitions

et de la manière dont les

conditions d'arrêt

peuvent être évaluées.

Il ne s'agit donc pas de choisir une boucle par habitude, mais de rechercher la structure qui traduit le plus naturellement la logique de l'algorithme.

Le schéma de décision complet

Le schéma suivant synthétise les différentes questions à se poser pour identifier la structure répétitive la plus adaptée. Il indique comment

formaliser la structure répétitive d'un point de vue algorithmique

puis, pour chaque structure ainsi formalisée,

comment la coder en C++

.

Dans ce schéma,

P

représente les traitements réalisés avant la répétition,

Q

le traitement répété et

Q1

et

Q2

deux parties du traitement séparées par l'évaluation d'une condition d'arrêt.

Première question : connaît-on le nombre de répétitions ?

La première question à se poser lorsque l'on conçoit une structure répétitive est la suivante :

Le nombre de répétitions est-il connu ou calculable avant d'entrer dans la boucle ?

Oui

Une

boucle comptée

, généralement exprimée avec

for

, est la structure la plus naturelle.

Non

Le choix dépend alors de la ou des

conditions d'arrêt

et du moment auquel elles peuvent être évaluées.

Le nombre de répétitions est connu

Lorsque le nombre de répétitions est

connu ou calculable avant d'entrer dans la boucle

, une boucle

for

est généralement la structure la plus adaptée.

Boucle croissante

for (int i = A; i <= B; i = i + 1)
{
    // Code à répéter
    ...
}

Boucle décroissante

for (int i = A; i >= B; i = i - 1)
{
    // Code à répéter
    ...
}

Conseil d'expert

Steve McConnell recommande la boucle

for

lorsqu'une boucle doit être exécutée un nombre déterminé de fois. Son mécanisme de contrôle doit rester simple et clairement identifiable dès l'entrée dans la boucle.

(McConnell,

Tout sur le code - Pour concevoir du logiciel de qualité, dans tous les langages

, 2005, p. 398)

Le nombre de répétitions n'est pas connu

Lorsque le nombre de répétitions n'est pas connu, le choix de la structure dépend du

moment auquel la condition d'arrêt peut être évaluée

.

Si une seule condition d'arrêt intervient, trois situations principales doivent être distinguées.

La condition d'arrêt est évaluée au début

On doit pouvoir déterminer

avant d'exécuter le traitement

si une nouvelle répétition doit avoir lieu.

La structure naturelle est alors une boucle

while

.

C++

while (!(condition_arret))
{
    // Code à répéter
    ...
}

Conséquence :

le corps de la boucle peut être exécuté

zéro fois

.

Steve McConnell préconise notamment une boucle

while

lorsque le test se situe naturellement au début de la répétition. (McConnell,

Tout sur le code - Pour concevoir du logiciel de qualité, dans tous les langages

, 2005, p. 395)

La condition d'arrêt est évaluée à la fin

La condition d'arrêt ne peut être évaluée qu'

après avoir réalisé le traitement

.

La structure

do...while

traduit directement cette situation.

C++

do
{
    // Code à répéter
    ...
}
while (!(condition_arret));

Conséquence :

le corps de la boucle est nécessairement exécuté

au moins une fois

.

McConnell recommande ce type de boucle lorsque le traitement doit nécessairement être réalisé avant de pouvoir décider s'il doit être répété. (McConnell,

Tout sur le code - Pour concevoir du logiciel de qualité, dans tous les langages

, 2005, p. 395)

La condition d'arrêt est évaluée en cours de répétition

Il arrive que la condition d'arrêt ne puisse être évaluée ni avant le traitement, ni après l'ensemble du traitement, mais

entre deux parties de celui-ci

.

Si le corps de la répétition est constitué de deux traitements

Q1

et

Q2

, et que la condition d'arrêt n'est connue qu'après Q1, la forme naturelle devient :

C++

while (true)
{
    // Code de Q1
    ...

    if (condition_arret)
    {
        break;
    }

    // Code de Q2
    ...
}

La forme

for
          (;;)

peut également être utilisée pour exprimer une boucle sans condition d'arrêt placée dans son en-tête.

McConnell qualifie cette organisation de boucle avec sortie en cours d'itération. En C++, elle peut notamment être exprimée avec une boucle sans fin et une instruction

break

. (McConnell,

Tout sur le code - Pour concevoir du logiciel de qualité, dans tous les langages

, 2005, p. 395)

Plusieurs conditions d'arrêt

Certaines répétitions peuvent être interrompues pour

plusieurs raisons différentes

.

Il faut alors déterminer si les différentes conditions d'arrêt peuvent être évaluées au même moment.

Les conditions peuvent être évaluées au même moment

Les conditions peuvent alors être regroupées dans une

condition logique composée

. On retombe ensuite sur les cas précédents : test au début, en cours ou à la fin de la répétition.

Exemple : conditions évaluées au début

while (!(condition_arret_1 || condition_arret_2))
{
    // Traitement
    ...
}

Les conditions doivent être évaluées à des moments différents

Si les conditions d'arrêt ne peuvent pas être évaluées au même endroit du traitement, il devient naturel de placer chaque test au moment où l'information nécessaire devient disponible.

C++

while (true)
{
    // Code répété partie 1
    ...

    if (condition_arret_1)
    {
        break;
    }

    // Code répété partie 2
    ...

    if (condition_arret_2)
    {
        break;
    }
}

A propos de l'utilisation de break

Une instruction

break

n'est pas une solution à employer systématiquement pour sortir d'une boucle.

Elle est particulièrement justifiée lorsque la logique du problème impose d'évaluer une condition d'arrêt

au milieu d'une répétition

ou lorsque plusieurs conditions d'arrêt doivent être vérifiées

à différents endroits

.

Bonne pratique

Les

C++ Core Guidelines

recommandent de limiter l'usage de

break

et

continue

dans les boucles (

ES.77

).

Dans un corps de boucle complexe, une sortie placée au milieu du code peut facilement passer inaperçue à la lecture. Le recours à

break

doit donc correspondre à une véritable nécessité de la structure du problème et rester clairement identifiable.

En résumé : quelle structure choisir ?

Situation

Structure généralement adaptée

Nombre de répétitions connu ou calculable

for

Condition d'arrêt testée avant le traitement

while

Condition d'arrêt testée après le traitement

do...while

Condition d'arrêt testée en cours de traitement

boucle sans fin +

break

Plusieurs conditions testées à différents endroits

boucle sans fin + plusieurs

break

Quelques bonnes pratiques en C++

Les

C++ Core Guidelines – ES.72

recommandent de privilégier une boucle

for

lorsqu'il existe une variable de boucle évidente.

La règle

ES.73

recommande plutôt

while

lorsqu'il n'existe pas de variable de boucle naturelle.

La règle

ES.77

recommande de limiter l'usage de

break

et

continue

afin de préserver la lisibilité des boucles complexes.

Références

McConnell, Steve.

Code Complete, Second Edition

. Microsoft Press, 2004.

McConnell, Steve.

Tout sur le code – Pour concevoir du logiciel de qualité, dans tous les langages

, 2005, notamment pages 395 et 398.

Bjarne Stroustrup et Herb Sutter.

C++ Core Guidelines

, notamment les recommandations ES.72, ES.73, ES.75 et ES.77.

Consulter les C++ Core Guidelines

cppreference.

Référence technique sur les structures

for

,

while

,

do...while

et

break

.

Consulter cppreference

×