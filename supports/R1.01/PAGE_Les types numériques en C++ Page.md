# Les types numériques en C++ Page

Source: https://elearn.univ-pau.fr/mod/page/view.php?id=692258

Types numériques en C++

Tailles usuelles, plages de valeurs et rappels de vocabulaire.

Nombres signés / non signés

Les valeurs numériques peuvent comporter un signe ou pas. Pour représenter :

les nombres

sans signe

, on utilise l’attribut

unsigned

;

les nombres

avec signe

, on utilise l’attribut

signed

.

Les caractères

Le type

char

est destiné à représenter un caractère (par exemple :

?

,

*

,

%

…).

Chaque caractère est représenté par un code numérique nommé

code ASCII

. La table contient 256 symboles : lettres, chiffres, ponctuation, espaces, etc. Le dessin et le codage numérique sont définis par la norme ASCII.

Type de base

Taille en octet

unsigned char

1

(signed) char

1

Remarque

: l’attribut

signed

est la valeur par défaut ;

char

et

signed char

sont équivalents.

Les nombres entiers

Cette catégorie regroupe les types représentant les nombres entiers.

Classement des types d’entiers selon leur taille :

short

<

int

<

long

<

long long

Type

Plage de valeurs sur processeur 32 bits

Plage de valeurs sur processeur 64 bits

Taille du type sur processeur 32 bits

Taille du type sur processeur 64 bits

unsigned short

[0 ; 65535]

[0 ; 65535]

2

2

(signed) short int

[-32768 ; 32767]

[-32768 ; 32767]

2

2

unsigned int

[0 ; 4,294,967,295]

[0 ; 4,294,967,295]

4

4

signed int

[-2,147,483,648 ; +2,147,483,647]

[-2,147,483,648 ; +2,147,483,647]

4

4

unsigned long

[0 ; 4,294,967,295]

[0 ; 18,446,744,073,709,551,615]

4

8

signed long

[-2,147,483,648 ; +2,147,483,647]

[-9,223,372,036,854,775,808 ; +9,223,372,036,854,775,807]

4

8

unsigned long long

[0 ; 18,446,744,073,709,551,615]

non utilisable

8

8

signed long long

[-9,223,372,036,854,775,808 ; +9,223,372,036,854,775,807]

non utilisable

8

8

Les nombres à virgule

Types représentant les nombres à virgule flottante.

Type

Plage de valeurs

Taille en octets

float

[ -3.4×10

-38

; 3.4×10

38

]

4

double

[ -1.7×10

-308

; 1.7×10

308

]

8

long double

[ -3.4×10

-4932

; 3.4×10

4932

]

10