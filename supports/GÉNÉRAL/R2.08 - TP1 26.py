'''Spyder peu s'éxécuter de façon interactive, c'est à dire "pas à pas". 
Pour exécuter une ligne ou un programme sélectionné il suffit d'appuyer sur 
la touche F9 ou le  bouton "Run selection or current line"'''

import pandas as pd
import numpy as np
import os
# choix du répertoire par défaut (à modifier)
os.chdir('D:\\INFO\\R2.08 Statistique S2\\pandas')
######################################################
# Création d'un objet DataFrame et d'un objet Series #
######################################################
# Exemple d'objet Series
s = pd.Series([5, 10, 15, 20], index=['a', 'b', 'c', 'd'])

# Exemple de DataFrame
dfEtudiants = pd.DataFrame({
    'Nom': ['Paul', 'Alice', 'Bob', 'Lucie'],
    'Âge': [24, 12, 15, 13],
    'Ville': ['Bayonne', 'Anglet', 'Marseille', 'Bayonne'],
    'Année' : [2000, 2022, 1997, 2000]}, 
    index=['Etud1', 'Etud2', 'Etud3', 'Etud4'])



''' On vérifier la présence des deux variables crées dans l'onglet
Variable Explorer, en haut à droite de l'écran'''


print(dfEtudiants)
dfEtudiants['Ville']
type(dfEtudiants['Ville'])

#########################################################
# PAGE 3                                                #
# Méthodes .loc et .iloc pour sélectionner des éléments #
# d'un objet Series                                     #
#########################################################
s = pd.Series([5, 10, 15, 20], index=['a', 'b', 'c', 'd'])
print(s)


# Avec l'objet de type Series, s
# Affichage de la valeur d’index 'a'
print(s.loc['a'])
# Affichage de la 1ère valeur, d’indice 0
print(s.iloc[0])

#########################################################
# PAGE 4                                                #
# Méthodes .loc et .iloc pour sélectionner des éléments #
# d'un objet DataFrame                                  #
#########################################################

# Avec l'objet DataFrame, dfEtudiants
# Valeur d’index 'Etud1' pour 'Ville' 
print(dfEtudiants.loc['Etud1','Ville'])
# Affichage de la 1ère valeur de la 3eme colonne
print(dfEtudiants.iloc[0,2])

###################################################################
# Remarque : dans un DataFrame, les colonnes correspondent à des  #
# objets de type Series                                           #
###################################################################
dfEtudiants['Ville']
type(dfEtudiants['Ville'])



#######################################################
# Méthodes .loc et .iloc pour sélectionner des plages #
# de valeurs ou de modalités                          #
#######################################################

#################################
# Exemples pour un objet Series #
# PAGE 5                        #
# Exécuter ligne par ligne      #
#################################
s.loc['a':'c']
s.loc[['a', 'b', 'c']]
s.iloc[0:3]
s.iloc[[0, 1, 2]]

#################################
# Exemples pour un objet Series #
# PAGE 5                        #
# Exécuter ligne par ligne      #
#################################
# Sélection d'une plage d'individus
dfEtudiants.loc[['Etud1', 'Etud2', 'Etud3'],:] 
dfEtudiants.loc['Etud1':'Etud3',:]
dfEtudiants.iloc[[0,1,2],:]
dfEtudiants.iloc[0:3,:]

# Sélection d'une plage de variables
dfEtudiants.loc[:,['Nom', 'Âge', 'Ville']]
dfEtudiants.loc[:, 'Nom':'Ville']
dfEtudiants.iloc[:,[0,1,2]]
dfEtudiants.iloc[:, 0:3]

# Sélection d'individus et de variables
dfEtudiants.iloc[[0,1,2], 0:3]
dfEtudiants.loc['Etud1':'Etud3',['Nom','Âge','Ville']]

##################################################
# Exemples d'utilisations de conditions logiques # 
# pour une sélection dans un objet Series        #
# PAGE 5                                         #
# Exécuter ligne par ligne                       #
##################################################

# Création d'une liste de booléens
listeBool = [True, False, False, True]

# Utilisation de listeBool pour sélectionner les lignes de s
s.loc[listeBool]
# avec les index
s.loc[['a','d']]

# Autre façon d’obtenir une liste(ici une Series)booléenne
s < 10
s > 15
(s <10) | (s > 15)

# Sélections dans l'objet Series
s.loc[(s<10) | (s>15)]
s.loc[listeBool]
s.loc[['a','d']]

##################################################
# Exemples d'utilisations de conditions logiques # 
# pour une sélection dans un objet DataFrame     #
# PAGE 6                                         #
# Exécuter ligne par ligne                       #
##################################################

# Affichage de listeBool
listeBool

# Autre façon d'obtenir une liste (ici Series) booléenne
dfEtudiants['Ville'] == 'Bayonne'
dfEtudiants.loc[listeBool,:]
dfEtudiants.loc[['Etud1','Etud4'],:]
dfEtudiants.iloc[[0,3],:]

#######################################
# Copie profonde ou superficielle ?   #
# PAGE 6                              #
#######################################
dfEtudiants = pd.DataFrame({
    'Nom': ['Paul', 'Alice', 'Bob', 'Lucie'],
    'Âge': [24, 12, 15, 13],
    'Ville': ['Bayonne', 'Anglet', 'Marseille', 'Bayonne'],
    'Année' : [2000, 2022, 1997, 2000]}, 
    index=['Etud1', 'Etud2', 'Etud3', 'Etud4'])

# copie par plages : superficielle
df1 = dfEtudiants.iloc[0:2,:]
df1.iloc[0,0] = 'Lulu'
dfEtudiants.iloc[0,0]
id(dfEtudiants.values[0,0]) == id(df1.values[0,0]) 

# copy() : profonde
df2 = dfEtudiants.iloc[0:2,:].copy()
df2.iloc[0,0] = 'Lolo'
dfEtudiants.iloc[0,0]
id(dfEtudiants.values[0,0]) == id(df2.values[0,0]) 

# copie par sélections de colonnes : profonde
df3 = dfEtudiants.iloc[[0,3],:]
df3.iloc[0,0] = 'Lala'
dfEtudiants.iloc[0,0]
id(dfEtudiants.values[0,0]) == id(df3.values[0,0])  



#################
# APPLICATION 1 #
# PAGE 7        #
#################

# a.	Créer un DataFrame représentant les données de ventes du tableau de la page 7 du poly

# b.	Utiliser .loc[] pour :
# o	Sélectionner les ventes du Produit B.

# o	Sélectionner les mois pour lesquels les ventes du Produit A sont supérieures à 150


# o	Sélectionner les mois pour lesquels les ventes du Produit C sont strictement comprises entre 200 et 250.


# o	Modifier la valeur du Produit B en juillet à 150.

#c.	Utilise .iloc[] pour :
# o	Sélectionner la première ligne du DataFrame, correspondant aux résultats de janvier

# o	Extraire les 3 premiers et 3 derniers mois.




#################################
# Importation de fichiers texte #
#################################

###########################################
# importation du fichier ProfEntrants.csv #
# APPLICATION 2 p10                       #
###########################################

profilsentrants=pd.read_table('ProfEntrants.csv',sep=";")

# A. Modifier le programme précédent pour que la variable Num  soit lue comme index.


# B. Importer le fichier « Poursuites.csv » en utilisant comme index la colonne « code ».


# C. Importer le fichier « Resultats.csv » en utilisant comme index la colonne « num »
 
# D. Facultatif : Importer directement les trois feuilles du fichier excel « Données Etudiants anonymisées - avec poursuites détudes.xlsx » en utilisant la fonction pd.read_excel. 
# Nom des feuilles : Profil entrant, Résultat, Poursuites d'études



#############################
# Propriétés des DataFrames #
#############################

############################
# DIMENSIONS               #
# Exemples PAGE 11         #
# Exécuter ligne par ligne #
############################
profilsentrants.shape
profilsentrants.shape[0]
profilsentrants.shape[1]
profilsentrants.size
len(profilsentrants)

##################################
# INDEX – DEFINITION ET PARCOURS #
# Exemples PAGE 11               #
# Exécuter ligne par ligne       #
##################################

# Importation du fichier ProfEntrants.csv
profilsentrants=pd.read_table('ProfEntrants.csv',sep=";", index_col = 0)
# Visualiser profilsentrants à partir de Variable Explorer

# Suppression de l’index :
profilsentrants = profilsentrants.reset_index()
# Visualiser profilsentrants à partir de Variable Explorer

# Num en index :
profilsentrants = profilsentrants.set_index("Num")
# Visualiser profilsentrants à partir de Variable Explorer

# Parcours d'un DataFrame par ses index
for ind in profilsentrants.index : 
    print(profilsentrants.loc[ind,'Bac'])

###############################
# NOMS ET TYPES DES VARIABLES #
# columns et dtypes           #
# Exemples PAGE 12            #
# Exécuter ligne par ligne    #
###############################
#NOMS DES VARIABLES : COLUMNS
profilsentrants.columns

# TYPES INFORMATIQUES DES VARIABLES : DTYPES
profilsentrants.dtypes

#####################
# APPLICATION 3 p12 #
#####################
# A. Importer le DataFrame resultats à partir de resultat.csv 

# B. Créer un DataFrame res1819 ne contenant que les résultats des étudiants de la promo 18-19

# C. Créer un objet de type Series, ne contenant que les Décisions de passage de S2 
# pour les étudiants dont la moyenne au S2 est inférieure à 10.

# D. De quelle nature est l'objet profilsentrants.dtypes ?
# Utiliser la fonction type().

# E. Utiliser profilsentrants.dtypes pour afficher uniquement les colonnes de profilsentrants de 
# nature numérique

###########################################################
# PREPARATION DES DONNEES STATISTIQUES  DANS UN DATAFRAME #
###########################################################

##################################
# TYPE STATISTIQUE DES VARIABLES #
# Exemples p13                   #
##################################
# Importation de ProfEntrants.csv
profilsentrants=pd.read_table('ProfEntrants.csv',sep=";", index_col=0)
profilsentrants.dtypes

# Bac, TypeForm, Serie : qualitatives nominales   
profilsentrants['Bac'] = pd.Categorical(profilsentrants['Bac'])
profilsentrants['TypeForm'] = pd.Categorical(profilsentrants['TypeForm'])
profilsentrants.dtypes
# Mention, Entrée : qualitatives ordinales      
# Pour la variable "Mention"
profilsentrants["Mention"].unique()
# Utilisation des noms de modalités obtenus avec unique(), pour les ordonner dans Categorical
profilsentrants["Mention"] = pd.Categorical(profilsentrants["Mention"],
                                            categories =['Admis sans mention',
                                                         'Admis mention Assez Bien', 
                                                         'Admis mention Bien', 
                                                         'Admis mention Très Bien'],
                                            ordered = True)
profilsentrants["Mention"].unique()
# Pour la variable "Entree"
profilsentrants["Entree"].unique()
# Utilisation des noms de modalités obtenus avec unique(), pour les ordonner dans Categorical
profilsentrants["Entree"] = pd.Categorical(profilsentrants["Entree"],
                                            categories =[2016, 2017, 2018],
                                            ordered = True)
profilsentrants["Entree"].unique()

########################
# QUALITE DES DONNEES  #
########################

##################################
# VALEURS MANQUANTES - Détection #
# Exemples p14                   #
# Exécuter ligne par ligne       #
##################################

profilsentrants.isna()	    
profilsentrants.isna().sum()

profilsentrants['Mention'].isna()
profilsentrants['Mention'].isna().sum()

###################################
# VALEURS MANQUANTES - Traitement #
###################################

# Suppression des lignes contenant des valeurs manquantes
# Nombre de lignes de profilsentrants
len(profilsentrants)
# Nombre de lignes après suppression de celles contenant des valeurs manquantes
len(profilsentrants.dropna())

# Imputer les valeurs manquantes
# Exécuter ligne par ligne
profilsentrants.isna().sum()
profilsentrants['Bac'] = profilsentrants['Bac'].fillna(profilsentrants['Bac'].mode()[0])
profilsentrants.isna().sum()
profilsentrants['Classement'] = profilsentrants['Classement'].fillna(profilsentrants['Classement'].mean())
profilsentrants.isna().sum()

################################
# TRANSFORMATIONS DE VARIABLES #
# Exemples p15-16              #
################################

# Affichage des noms de variables
profilsentrants.columns	
# Nom de la troisième colonne
profilsentrants.columns[2]	

# Renommer une variable
noms = list(profilsentrants.columns)
noms[2] = 'Formation'
profilsentrants.columns = noms             

# Création de variables
profilsentrants ['nvlvar1'] = 0
profilsentrants ['nvlvar2'] = numpy.nan	
profilsentrants ['nvlvar3'] = None
profilsentrants

# Suppression
# Suppression de variables (colonnes)
profilsentrants.drop(columns=['Bac', 'Classement'],inplace = True)
profilsentrants.columns
# Suppression d’individus (lignes)
len(profilsentrants)
profilsentrants.drop(index=[106,149],inplace = True)
len(profilsentrants)

##############################################
# TRANSFORMATIONS DE VARIABLES QUANTITATIVES #
#                    P16                     #
##############################################

# Opérations vectoriellles
# Importation des données de resultats.csv
resultats = pd.read_table('Resultats.csv',sep=";", encoding = "cp1252",     
                           index_col = 0, decimal = ",")
# Calcul de la racine des valeurs de MoyS2
resultats['racinecarreeS2'] = np.sqrt(resultats['MoyS2'])

# Calcul de la moyenne dans l’UE1
resultats['MoyUE1'] = (resultats['UE11'] + resultats['UE12'])/2

# Calcul de la variable centrée associée à MoyS2
resultats['MoyS2C'] = resultats['MoyS2'] - resultats['MoyS2'].mean()

# Méthode apply
# racinecarreeB : on utilise apply avec une fonction définie localement par lambda 
# « lambda x : np.sart(x) » : la fonction qui à tout x associe sa racine
resultats['racinec2'] = resultats['MoyS2'].apply(lambda x : np.sqrt(x))

resultats['racine3']=resultats['MoyS2'].apply(lambda x : np.sqrt(x) if x>=0 else np.sqrt(x))


# Mise en classe d'une variable quantitative : qcut et cut
# Classes de mêmes effectifs
resultats["Class1"] = pd.qcut(resultats["MoyS2"],4)

resultats["Class2"] = pd.qcut(resultats["MoyS2"],4,
                              labels =["g1","g2","g3","g4"])  
# Classes de mêmes amplitudes
resultats["Class3"]=pd.cut(resultats["MoyS2"],3)
resultats["Class4"]=pd.cut(resultats["MoyS2"],3,right=False)
# Pour des classes personnalisées, il suffit de donner les bornes des classes (option bins)
resultats["Class5"]=pd.cut(resultats["MoyS2"],bins=[0,8,10,12,14,20])
# Nouveau DataFrame contenant MoyS2 et les variables créées
res = resultats.loc[:,['MoyS2', 'Class1', 'Class2', 'Class3', 'Class4', 'Class5']]


#####################################################
# RECODAGE D'UNE VARIABLE QUALITATIVE - CATEGORICAL #
#                       P17                         #
#####################################################
# Importation
poursuites = pd.read_table('poursuites.csv', sep = ";", encoding = 'cp1252', index_col = 0)

# Définition de Situation comme variable categorical
poursuites['Situation'] = pd.Categorical(poursuites['Situation'])
Poursuites.dtypes	

# Utilisation de cat.rename_categories pour renommer les modalités de Situation
dict_corresp1 = {'Année sabbatique': 'Sabb',
                  'réorientation': 'Réor',
                  'Etudes longues': 'Longues',
                  'Emploi / Recherche d\'emploi': 'Emploi',
                  'Licence Pro': 'LPro'}

poursuites['Situation1'] = poursuites['Situation'].cat.rename_categories(dict_corresp1)
poursuites.dtypes	

# Utilisation de map pour regrouper les modalités de Situation
dict_corresp2 = {'Année sabbatique': 'Autre',
                  'réorientation': 'Autre',
                  'Etudes longues': 'Etudes longues',
                  'Emploi / Recherche d\'emploi': 'Emploi / Recherche d\'emploi',
                  'Licence Pro': 'Licence Pro'}
poursuites['Situation2'] = poursuites['Situation'].map(dict_corresp2)
poursuites.dtypes	

poursuites["Situation1"].unique()

poursuites["Situation2"].unique()	
########################################################
# Des variables qualitatives particulières : les dates #
#                    P18                               #
########################################################

df = pd.read_csv('testdate.csv', sep=";")
df.dtypes
# Du format object (txt) au format date
# https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior
df['date'] = pd.to_datetime(df['date'], format = "%m-%Y")
df.dtypes
# Utilisation de fonctions date
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month

######################
# Application 4  P18 #
######################

# Manipulations du DataFrame profilsentrants.
# a.	Afficher les noms de variables de ce DataFrame



# b.	Renommer la variable « Serie » en « seriebac »



# c.	Afficher les modalités de la variable « seriebac ».



# d.	Créer une nouvelle variable nommée « bac », n’ayant plus de 3 modalités : « S », « STI2D », « Autre »



# e.	Créer une variable nommée « classcod1 » correspondant à la mise en classe de la variable de « Classement » en 5 classes de mêmes effectifs




# f.	Créer une variable nommée « classcod2 » correspondant à la mise en classe de la variable de « Classement » en 5 classes de même amplitude



# Manipulations du DataFrame resultats.
#a.	Afficher les noms de variables de ce DataFrame



#b.	Créer une variable Moyenne, correpondant à la moyenne des deux semestres.



#c.	Créer une variable progres prenant la valeur « oui » si la moyenne de S2 est strictement supérieure à celle de S1 et « non » sinon.



###########################
# Concaténation de tables #
#      p19                #
###########################

# Jointure (« concaténation horizontale »)
pd.merge(profilsentrants,
         resultats,
         left_index=True,
         right_index=True,
         how="inner")

#################
# Application 5 #
#################

# Jointure. 
# Concaténer les trois tables profilsentrants, poursuites et resultats. 
# On ne gardera que les étudiants communs aux trois tables.

