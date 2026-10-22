# 📝 Modèle de Question de QCM pour M. Marquesuzaà
> **Séance :** Vendredi 23 Octobre 2026 – 08h00 à 09h30 (Salle TD 124, IUT d'Anglet)  
> **Ressource :** R1.05 « Introduction aux Bases de Données et SQL » – Partie Conception  
> **Document Source Officiel :** `Modeles de donnees 2026_acompleter2parpage.pdf` (Transparent 30 & 99)  
> **Format requis :** Feuille A5 (demi-feuille A4) manuscrite à déposer dans les 5 premières minutes.

---

## ✍️ Ce qu'il faut recopier à la main sur la feuille A5 :

```text
DE SAINT LEGER Matéi TD 2 TP 4 – 23/10/2026
R1.05 (partie Conception) – Chapitre II (transparent 30)

Question : À quelle condition une propriété doit-elle caractériser une classe d’association plutôt que l’un des types d’entité reliés ?

Réponses :
1. Lorsque la valeur de la propriété dépend conjointement de l'ensemble des entités qui participent à l'association et ne peut être rattachée à une seule entité isolée.
2. Lorsque l'association comporte au moins deux entités afin d'alléger le nombre d'attributs dans chaque entité.
3. Lorsque la propriété apporte une précision sur l'occurrence du lien lui-même (comme une quantité commandée ou une note obtenue) et non sur une entité prise individuellement.
4. Lorsque l'une des entités participantes possède une cardinalité maximale de 1 pour lui permettre de stocker une valeur supplémentaire.

Réponses correctes : 1 et 3
```

---

## 🎯 Pourquoi cette question est optimale pour M. Marquesuzaà :

1. **Conformité stricte au cours (Zéro IA, zéro extrapolation) :**
   - **Réponse 1** : Reprend la définition exacte du **transparent 30** (propriété caractérisant l'association par la relation entre plusieurs entités).
   - **Réponse 2** : Fausse et mal rédigée sur le fond (piège d'étudiant : on ne met pas une propriété dans une association pour « faire de la place »).
   - **Réponse 3** : Reformulation rigoureuse basée sur les exemples concrets donnés par le professeur au transparent 30 (*quantité* pour une commande Client/Produit, *année* d'obtention pour Etudiant/Diplôme).
   - **Réponse 4** : Contresens classique sanctionné en partiel : le **transparent 99** précise explicitement qu'une association ayant une cardinalité `(1,1)` ne doit pas porter de propriété (elle migre dans l'entité fille).

2. **Respect des consignes du document officiel `QuestionQCM.pdf` :**
   - Entête complet avec Nom, Prénom, groupe de TD (TD 2), groupe de TP (TP 4), date du jour, chapitre et transparent précis.
   - Exactement deux bonnes réponses (1 et 3), comme dans l'exemple officiel donné par M. Marquesuzaà et M. Etcheverry.
