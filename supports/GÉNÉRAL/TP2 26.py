# -*- coding: utf-8 -*-
"""
Created on Tue Feb  4 08:22:09 2025

@author: bruyere
"""

import pandas as pd
import numpy as np
import os
# choix du répertoire par défaut (à modifier)
os.chdir('C:\\INFO\\R2.08 Statistique S2\\pandas')
###############################################################################
#                           ANALYSE UNIVARIEE                                 #
###############################################################################

# Importation et préparation du DataFrame résultats
resultats = pd.read_table('resultats.csv',sep=';',encoding='cp1252',index_col=0,decimal=',')
resultats.dtypes
resultats['DecS2'].unique()
resultats['AnnS1'].unique()
resultats['AnnS2'].unique()
resultats['Dec'].unique()

# Définir DecS2 comme qualitative - catégorielle
resultats['DecS2'] = pd.Categorical(resultats['DecS2'])


# Définir AnnS1 et AnnS2 comme qualitatives (catégorielles) ordinales
# Variable AnnS1
resultats['AnnS1'] = pd.Categorical(resultats['AnnS1'], 
                                    categories = ['16-17', '17-18', '18-19'],
                                    ordered  = True)
resultats['AnnS1'].unique()
# Variable AnnS2
resultats['AnnS2'] = pd.Categorical(resultats['AnnS2'], 
                                    categories = ['16-17', '17-18', '18-19'],
                                    ordered  = True)
resultats['AnnS2'].unique()

############################################################
# DESCRIBE() : RESUME, SYNTHESE DES VARIABLES DU DATAFRAME #
############################################################

resultats.dtypes
resultats.select_dtypes(include=['number']).describe()  #ou resultats.describe()

#Par indicateurs : 
resultats.select_dtypes(include=['number']).mean()  			  
resultats.select_dtypes(include=['number']).std() #écarts-type
resultats.select_dtypes(include=['number']).min()
resultats.select_dtypes(include=['number']).max()

resultats.select_dtypes(include=['number']).quantile([0.2,0.4,0.6]) 

# Résumés des variables qualitatives
resultats.select_dtypes(exclude=['number']).describe()

######################################################
# ANALYSE UNIVARIEE – VARIABLE QUANTITATIVE CONTINUE #
######################################################

# Indicateurs 
resultats['MoyS2'].describe()
resultats['MoyS2'].mean()		
resultats['MoyS2'].median()	
resultats['MoyS2'].min()	
resultats['MoyS2'].max()	
resultats['MoyS2'].std()	
resultats['MoyS2'].describe()[2]	
resultats['MoyS2'].quantile([0.2,0.4,0.6]) 

# Graphique : histogramme
import matplotlib.pyplot as plt
# Définir un objet “Axes”
ax = plt.subplot()
# Définir les bornes des classes personnalisées
bornes_classes = [resultats['MoyS2'].min(), 8, 10, 12, 14, resultats['MoyS2'].max()]
# Tracé de l'histogramme avec 'density=True' pour normaliser les hauteurs en fonction de # la largeur des classes
ax.hist(resultats['MoyS2'], bins=bornes_classes, density=True)
# Ajouter des labels et un titre, des valeurs limites pour l'axe des abscisses
ax.set_xlabel('Moyenne obtenue au S2')
ax.set_ylabel('Densité')
ax.set_title('Répartition des étudiants selon leur moyenne au S2')
ax.set_xlim(0, 20)
ax.set_yticks([])  # Supprime les graduations de l'axe des ordonnées
# Afficher l'histogramme
plt.show()

######################################################
# ANALYSE UNIVARIEE – VARIABLE QUANTITATIVE DISCRETE #
######################################################

# Importation
resultats = pd.read_table('resultats.csv',sep=';',encoding='cp1252',index_col=0,decimal=',')
# Création de la variable DISCRETE 'note_arr_S2' 
resultats['note_arr_S2']=round(resultats['MoyS2'],0)
# valeurs prises par la variable 'note_arr_S2'
resultats['note_arr_S2'].unique()

# Tableaux de fréquences – value_counts()
resultats['note_arr_S2'].value_counts() 
# Enregistrement du tableau dans une Serie
tabEff = resultats['note_arr_S2'].value_counts()
tabEff[12]	
# Calculs sur la Serie tabEff
round(tabEff / sum(tabEff)*100,1)
# Filtrage
tabEff[tabEff > 15]

# Graphiques : diagramme en barres
ax = plt.subplot()
# Tableau de fréquences (effectifs) ordonné sur les index et non sur les effectifs
TabEff = resultats['note_arr_S2'].value_counts().sort_index()  
TabEff
# Création du diagramme en barres
ax.bar(TabEff.index, TabEff.values)
# Personnalisation
ax.set_title("Répartition des étudiants selon leur moyenne au S2")
ax.set_xlabel("Moyenne au S2")
ax.set_ylabel("Effectif")
# index de TabEff --> étiquettes de l’axe des x
ax.set_xticks(TabEff.index)  
plt.show()

#############################################
# ANALYSE UNIVARIEE – VARIABLE QUALITATIVES #
#############################################


# Importation et préparation du DataFrame cimas
cimas = pd.read_table('cimas.csv',sep=';', decimal=',')
cimas.dtypes
# Variables qualitatives
cimas['pic'].unique()
cimas['pic'] = pd.Categorical(cimas['pic'])
cimas['origine'].unique()
cimas['origine'] = pd.Categorical(cimas['origine'])
cimas['chaussures'] = pd.Categorical(cimas['chaussures'],
                                     categories = ['Ville','Sport','Trail','Rando','Alpinisme'],
                                     ordered = True)
cimas.dtypes

# Tableaux de fréquences - value_counts()
# Comment est-il trié ?
cimas['chaussures'].value_counts()
cimas['chaussures'].value_counts().sort_index()

tabEffChauss = cimas['chaussures'].value_counts().sort_index()
tabEffOri = cimas['origine'].value_counts()
# Affichage
tabEffChauss
tabEffOri


##############################################
# Diargramme en barres - variables ordinales #
##############################################

# Créer un diagramme en barres
ax = plt.subplot()
# tableau de fréquences ordonné selon les modalités
tabEffChauss = cimas['chaussures'].value_counts().sort_index()  

# Diagramme en barres
barres = ax.bar(tabEffChauss.index, tabEffChauss, color='blue')

# Ajouter des étiquettes et un titre
ax.set_title('Répartition des randonneurs \n selon leur type de chaussures', fontsize=14)
ax.set_xlabel('Type de chaussures', fontsize=12)
ax.set_ylabel('Effectifs', fontsize=12)
ax.bar_label(barres, labels=tabEffChauss, label_type='edge', fontsize=12, color='blue')
ax.set_ylim(0,5000)
plt.show()

##############################################
# Diargramme en barres - variables nominales #
##############################################

# Créer un diagramme en barres
ax = plt.subplot()
# origine, variable nominale
cimas['origine'] = cimas['origine'].astype('category')
# tableau de fréquences
tabEff = cimas['origine'].value_counts()  # Par défaut trié par ordre décroissant
# Diagramme en barres
barres = ax.bar(tabEff.index, tabEff, color='blue')
# Ajouter des labels et un titre
ax.set_title('Répartition des randonneurs selon leur origine', fontsize=14)
ax.set_xlabel('Origine', fontsize=12)
ax.set_ylabel('Effectifs', fontsize=12)
# Personalisation avancée : ajouter des étiquettes (pourcentages) sur les barres
# Calcul des pourcentages de sorte que leur somme soit égale à 1
tabPour = (tabEff/tabEff.sum()*100).round(1)
sommePour = tabPour.sum().round(1)

# On calcule la somme des fréquences, si elle est différente de 1
# on retranche le surplus à la première valeur (choix arbitraire)
if sommePour != 100 :
    diff = sommePour - 100  
    tabPour.iloc[0] -= diff 
pourcentages =[f'{v:.1f}%' for v in tabPour]

# Ajout d'étiquettes sur les barres, correspondant aux pourcentages, avec bar_label
ax.bar_label(barres, labels=pourcentages, label_type='center', fontsize=12, color='white')
plt.show()

# Diagramme en secteurs - Variable nominale

ax = plt.subplot()
# Création du diagramme en secteurs
ax.pie(
    tabEff,
    labels = tabEff.index,
    autopct=lambda p: pourcentages.pop(0),
    startangle=90,        # Commencer à 0° (midi)
    counterclock=False)    # Sens trigonométrique inverse
# Ajouter un titre
ax.set_title("Répartition des randonneurs selon leur origine")
plt.show()


###############################################################################
#                           ANALYSE BIVARIEE                                  #
###############################################################################

##################################################
# ANALYSE BIVARIEE – DEUX VARIABLES QUALITATIVES #
##################################################

# Tableau de contingence, profils lignes et colonnes
# Tableau de contingence (ou tableau croisé) - variables sexe et origine
pd.crosstab(cimas['origine'],cimas['Sexe'])
# Profils colonnes
pd.crosstab(cimas['origine'],cimas['Sexe'],normalize= 'columns')
# Profils lignes
pd.crosstab(cimas['origine'],cimas['Sexe'],normalize= 'index')

# Diagramme en barres empilées à 100%

# Initialisation d'une figure et d'un objet Axes
ax = plt.subplot()
# Création du diagramme en barres empilées
profLignes = pd.crosstab(cimas['origine'],cimas['Sexe'],normalize= 'index')
profLignes.plot(kind = 'bar', 
                stacked = True,
                ax = ax)
# Personnalisation des titres, axes, légende
ax.set_ylabel('Proportion')
ax.set_xlabel('Origine')
# Placer la légende en dehors du graphique
ax.legend(title='Genre',loc='upper left')
plt.show()

##################################################
# ANALYSE BIVARIEE – QUANTITATIVE ET QUALITATIVE #
##################################################

# Importation et préparationd des données
rugby = pd.read_table('rugby.csv', sep = ';', decimal = ',')
rugby.dtypes
# Définition des variables qualitatives - catégorielles
rugby['poste'].unique()
rugby['poste'] = pd.Categorical(rugby['poste'])
rugby['club'].unique()
rugby['club'] = pd.Categorical(rugby['club'])
rugby['libelle'].unique()
rugby['libelle'] = pd.Categorical(rugby['libelle'])
rugby['Annee'].unique()
rugby['Annee'] = pd.Categorical(rugby['Annee'], 
                                categories = [1993, 2010, 2016, 2022],
                                ordered = True)
rugby['poids'].describe()   

# Indicateurs : Calculs par modalités de la variable qualitative
moypoids = rugby['poids'].groupby(rugby['Annee']).mean()  

# Graphiques
# Diagramme en barres des moyennes par modalités

rugby['Annee'] = pd.Categorical(rugby['Annee'], ordered = True)
# Calcul du poids moyen par année
moypoids = rugby['poids'].groupby(rugby['Annee'], observed=True).mean()  
# Création d’un objet Axes
ax = plt.subplot()
# Tracé du graphique sur l'objet Axes
bars = ax.bar(moypoids.index.astype('str'), moypoids, color='skyblue', edgecolor='black')
# Ajout de titres et labels
ax.set_title('Poids moyen par année de championnat', fontsize=16)
ax.set_xlabel('Année', fontsize=12)
ax.set_ylabel('Poids moyen)', fontsize=12)
i = 0
for an in moypoids.index :
    ax.text(i,
            round(moypoids[an],1)/2,
            round(moypoids[an],1),
            ha='center')
    i = i + 1
plt.show()

# Diagramme en boîtes à moustaches (BOXPLOT)

ax = plt.subplot()
rugby.boxplot(by ='Annee', 
 column =['poids'], 
              ax = ax, showmeans=True, grid = False)
# Ajout des titres et légendes
ax.set_title("Répartition des joueurs selon le poids et l'année")
ax.set_xlabel("Année")
ax.set_ylabel("Poids")
# Supprimer le titre supplémentaire généré par pandas
plt.suptitle("")
plt.show()

###################################################
# Analyse bivariée – Deux variables quantitatives #
###################################################
rugby = pd.read_table('rugby.csv', sep = ';', decimal = ',')
rugby22 = rugby[rugby['Annee'] == 2022]

# Calcul de la régression linéaire avec la bibliothèque scipy
from scipy.stats import linregress
slope, intercept, r_value, p_value, std_err = linregress(rugby22['taille'], 
                                                         rugby22['poids'])
print("Pente (a):", slope.round(1))                                      
print("Ordonnée à l'origine (b):", intercept.round(1))
print("coefficient de corrélation linéaire :", r_value.round(1))


# Graphique : nuage de points avec droite de régression (matplotlib)
ax = plt.subplot()
rugby22.plot.scatter(x='taille', y='poids', ax = ax)
x = rugby22["taille"] 
ax.plot(x, slope * x + intercept, color='red')
plt.show()

# Graphique : nuage de poitns colorés selon une troisième variable (seaborn)
import seaborn as sns
ax = plt.subplot()
# Création du scatter plot avec seaborn sur un objet axes
sns.scatterplot(x=rugby22['taille'], 
                y=rugby22['poids'], hue=rugby22['poste'], data=rugby22)
# Personnalisation du graphique
ax.set_title("Répartition des joueurs du Top 14 2022 \n selon leur poids, leur taille et leur poste")
ax.set_xlabel('Taille (cm)')
ax.set_ylabel('Poids (kg)')
plt.show()

#######################################
# COMPLEMENTS : SERIES CHRONOLOGIQUES #
#######################################
# Importation
chrono = pd.read_table('VoyageursEspagne.csv',sep=';',decimal=',',index_col=0,encoding='ANSI')

ax = plt.subplot()
# Tracé de la courbe
ax.plot(chrono.index, chrono['Residentesves'], color = 'blue', label='Résidents espagnols')
ax.plot(chrono.index, chrono['Residentesvex'], color = 'green', label='Etrangers')
# Titre et légende
ax.set_title('Evolution de la fréquentation mensuelle hotelière en Espagne \n de janvier 99 à octobre 23 (en millions de visiteurs)')
ax.set_xlabel("Date", fontsize=12)
ax.set_xticks(chrono.index[::12])  # Une date sur 4
ax.tick_params(axis='x', rotation=45 , labelsize = 8)
ax.legend()
plt.show()

























