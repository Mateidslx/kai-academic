# Concevoir des sous-programmes Page

Source: https://elearn.univ-pau.fr/mod/page/view.php?id=695683

Concevoir un sous-programme

Quelques points de repère pour concevoir une procédure ou une fonction et définir correctement sa déclaration.

Concevoir un sous-programme : points de repère

Concevoir un bon sous-programme ne consiste pas seulement à écrire des instructions correctes. Il faut également construire une déclaration claire et cohérente : choisir le bon type de sous-programme, lui donner un nom pertinent, définir correctement sa valeur retournée et ses paramètres, puis préciser le rôle de chacun d'eux. La check-list suivante peut être utilisée comme guide pendant la conception, puis comme contrôle final avant de considérer le sous-programme comme terminé.

Pour mon sous-programme :

☑

Ai-je choisi le bon type de sous-programme :

procédure ou fonction

?

☑

Son

nom

décrit-il clairement ce qu'il fait ?

☑

S'il s'agit d'une fonction, ai-je choisi le bon

type pour la valeur retournée

?

☑

Ai-je ajouté un

commentaire

qui décrit ce que fait le sous-programme et précise le rôle de chacun de ses paramètres ?

☑

L'ordre des paramètres respecte-t-il les bonnes pratiques : d'abord les paramètres en

données

, puis les paramètres en

données/résultats

et enfin les paramètres en

résultats

? A noter que, par convention, lorsqu'un tableau et sa taille sont transmis ensemble, on place habituellement

le tableau en premier, suivi de sa taille

, que le tableau soit une donnée ou un résultat.

Pour chacun de ses paramètres :

☑

Ai-je choisi un

nom significatif

?

☑

Ai-je choisi le

type approprié

?

☑

Ai-je choisi le bon

mode de passage

: par valeur, par référence ou par référence constante ?

Choisir le bon mode de passage des paramètres

Le schéma de décision complet

Le schéma suivant permet de déterminer le mode de passage d'un paramètre en fonction de deux questions principales :

le paramètre doit-il être modifié par le sous-programme ?

et, si ce n'est pas le cas,

est-il considéré comme lourd ?

Cliquer sur le schéma pour l'agrandir.

Comment lire ce schéma ?

Lorsqu'un paramètre doit être transmis à une procédure ou à une fonction, le choix du mode de passage ne doit pas être fait par habitude. Il dépend de l'utilisation qui sera faite de ce paramètre.

Le raisonnement se fait dans l'ordre suivant :

déterminer si le paramètre doit être

modifié par le sous-programme

;

s'il ne doit pas être modifié, déterminer s'il est

léger ou lourd

;

dans certains cas, tenir compte du fait que le paramètre est

un tableau

pour écrire correctement son type en C++.

Le paramètre doit être modifié par le sous-programme

Si le sous-programme doit modifier la valeur du paramètre et que cette modification doit être visible après son appel, on utilise un

passage par référence

.

Règle :

un paramètre modifiable est transmis par référence.

Le paramètre n'est pas un tableau

On ajoute le symbole

&

au niveau du paramètre.

Exemple

void saisir(int& valeur);

// Saisit au clavier une valeur entière et la stocke dans valeur.

La procédure

saisir

doit pouvoir affecter une nouvelle valeur à

valeur

. La référence permet donc de travailler directement sur la variable fournie lors de l'appel.

Le paramètre est un tableau

Pour un tableau, dans la syntaxe utilisée dans ce cours, on n'ajoute pas de

&

au niveau du paramètre. Les éléments du tableau pourront néanmoins être modifiés par le sous-programme.

Exemple

void remplir(int tableau[], unsigned int taille);

// Remplit tableau avec des valeurs entières saisies au clavier, taille indiquant le nombre de valeurs à saisir.

Le paramètre ne doit pas être modifié

Si le sous-programme doit seulement consulter la valeur du paramètre, il faut ensuite s'intéresser au

coût de sa copie

.

On distingue alors, dans le cadre de ce cours, les

paramètres légers

des

paramètres lourds

.

Comment distinguer un paramètre léger d'un paramètre lourd ?

Le terme

lourd

désigne ici un objet dont la copie peut représenter un coût non négligeable. Pour éviter d'avoir à étudier précisément la représentation mémoire de chaque type, on adopte dans ce cours une convention simple.

Convention utilisée dans ce cours

Les types

int

,

float

,

double

,

char

,

bool

ainsi que les

pointeurs

sont considérés comme

légers

.

Les autres types sont considérés comme

lourds

.

Selon les cas, une

string

pourra cependant être considérée comme légère si l'on sait que la chaîne qu'elle contient restera petite, ou lourde si elle peut contenir une quantité importante de texte.

Par exemple, une chaîne utilisée pour représenter un

nom de mois

pourra être considérée comme légère, alors qu'une chaîne contenant

un chapitre de livre

sera considérée comme lourde.

Paramètre non modifiable et léger : passage par valeur

Si le paramètre n'a pas besoin d'être modifié et qu'il est léger, on utilise un

passage par valeur

.

Dans le code, on n'ajoute ni

&

ni

const

au niveau du paramètre.

Exemple

void afficher(int valeur);

// Affiche la valeur entière contenue dans valeur.

Ici,

valeur

est un

int

. Sa copie est considérée comme peu coûteuse : le passage par valeur est donc adapté.

Paramètre non modifiable et lourd : passage par référence constante

Si le paramètre n'a pas besoin d'être modifié mais qu'il est lourd, il est préférable d'éviter sa copie. On utilise alors un

passage par référence constante

.

La

référence

évite de copier l'objet et

const

garantit que le sous-programme ne pourra pas modifier ce paramètre.

Le paramètre n'est pas un tableau

On ajoute

const

et

&

au niveau du paramètre.

Exemple

void afficher(const string& chapitre);

// Affiche le texte contenu dans chapitre.

Le paramètre est un tableau

Pour un tableau, on ajoute

const

devant le type des éléments, mais on n'ajoute pas de

&

.

Exemple

void afficher(const int tableau[], unsigned int taille);

// Affiche les valeurs contenues dans tableau, taille indiquant le nombre de valeurs à afficher.

En résumé

Situation

Mode de passage

Écriture

Paramètre modifiable, hors tableau

Référence

Type& parametre

Tableau modifiable

Référence

Type tableau[]

Paramètre non modifiable et léger

Valeur

Type parametre

Paramètre non modifiable et lourd, hors tableau

Référence constante

const Type& parametre

Tableau non modifiable

Référence constante

const Type tableau[]

Quelques points d'attention

Un passage par référence ne doit pas être choisi simplement parce que l'on connaît cette syntaxe : il doit correspondre à un besoin de

modifier le paramètre

.

Pour un paramètre léger uniquement consulté, le passage par valeur reste la solution la plus simple.

Pour un paramètre lourd uniquement consulté,

const

permet d'indiquer clairement que le sous-programme ne doit pas modifier l'objet.

Les tableaux constituent un cas particulier dans l'écriture des paramètres : dans la syntaxe utilisée ici, on n'ajoute pas explicitement de

&

.

Références

Bjarne Stroustrup et Herb Sutter

,

C++ Core Guidelines

, règle

F.16

: pour les paramètres d'entrée, passer par valeur les types peu coûteux à copier et les autres par référence constante.

Bjarne Stroustrup et Herb Sutter

,

C++ Core Guidelines

, règle

F.17

: pour les paramètres qui doivent être modifiés, utiliser une référence non constante.

×