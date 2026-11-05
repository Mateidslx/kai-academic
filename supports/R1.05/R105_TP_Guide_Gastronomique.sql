-- =============================================================================
-- BUT 1 Informatique — IUT de Bayonne et du Pays Basque (Campus d'Anglet)
-- Module R1.05 : Introduction aux Bases de Données — Manipulation
-- Enseignant : M. Yon Dourisboure
-- TP : Un guide gastronomique (Projections & Restrictions)
-- Fichier complet prêt à l'exécution sous Oracle SQL Developer / SQL*Plus
-- =============================================================================

-- =============================================================================
-- 0. NETTOYAGE PRÉALABLE DES TABLES (Ordre inverse des dépendances / clés étrangères)
-- =============================================================================
DROP TABLE Ouverture CASCADE CONSTRAINTS;
DROP TABLE ProposerPlat CASCADE CONSTRAINTS;
DROP TABLE ProposerVin CASCADE CONSTRAINTS;
DROP TABLE Plat CASCADE CONSTRAINTS;
DROP TABLE Vin CASCADE CONSTRAINTS;
DROP TABLE Restaurant CASCADE CONSTRAINTS;

-- =============================================================================
-- 1. CRÉATION DU SCHÉMA RELATIONNEL (DDL ORACLE)
-- =============================================================================

-- Table 1 : RESTAURANT
CREATE TABLE Restaurant 
(
    id NUMBER(10), 
    nom VARCHAR2(255) NOT NULL, 
    ville VARCHAR2(255) NOT NULL,
    dateEnregistrement DATE,
    CONSTRAINT pk_restaurant PRIMARY KEY (id)
);

-- Table 2 : VIN (Catalogue général des vins)
CREATE TABLE Vin
(
    id NUMBER(10), 
    cru VARCHAR2(255) NOT NULL, 
    millesime NUMBER(4) NOT NULL, 
    region VARCHAR2(255) NOT NULL, 
    couleur VARCHAR2(20) NOT NULL,
    CONSTRAINT pk_vin PRIMARY KEY (id),
    CONSTRAINT ck_vin_couleur CHECK (couleur IN ('Rouge', 'Blanc', 'Rosé'))
);   

-- Table 3 : PLAT (Catalogue général des plats)
CREATE TABLE Plat 
(
    id NUMBER(10), 
    nom VARCHAR2(255) NOT NULL, 
    place VARCHAR2(255) NOT NULL, 
    couleurVinRecommandee VARCHAR2(20), 
    idVinIdeal NUMBER(10),
    CONSTRAINT pk_plat PRIMARY KEY (id),
    CONSTRAINT ck_plat_couleur CHECK (couleurVinRecommandee IN ('Rouge', 'Blanc', 'Rosé')),
    CONSTRAINT fk_plat_vinideal FOREIGN KEY (idVinIdeal) REFERENCES Vin(id)
);

-- Table 4 : PROPOSERVIN (Association Restaurant - Vin avec prix)
CREATE TABLE ProposerVin
(
    idRestaurant NUMBER(10), 
    idVin NUMBER(10), 
    prix NUMBER(10,2) NOT NULL,
    CONSTRAINT pk_proposervin PRIMARY KEY (idRestaurant, idVin),
    CONSTRAINT fk_pv_restaurant FOREIGN KEY (idRestaurant) REFERENCES Restaurant(id),
    CONSTRAINT fk_pv_vin FOREIGN KEY (idVin) REFERENCES Vin(id)
);
   
-- Table 5 : PROPOSERPLAT (Association Restaurant - Plat avec prix & spécialité)
CREATE TABLE ProposerPlat 
(
    idRestaurant NUMBER(10), 
    idPlat NUMBER(10), 
    prix NUMBER(10,2) NOT NULL,
    estSpecialite NUMBER(1) DEFAULT 0 NOT NULL,
    CONSTRAINT pk_proposerplat PRIMARY KEY (idRestaurant, idPlat),
    CONSTRAINT ck_pp_specialite CHECK (estSpecialite IN (0, 1)),
    CONSTRAINT fk_pp_restaurant FOREIGN KEY (idRestaurant) REFERENCES Restaurant(id),
    CONSTRAINT fk_pp_plat FOREIGN KEY (idPlat) REFERENCES Plat(id)
);

-- Table 6 : OUVERTURE (Créneaux d'ouverture hebdomadaires)
CREATE TABLE Ouverture 
(
    idRestaurant NUMBER(10), 
    jourSemaine VARCHAR2(20),
    horaireOuverture VARCHAR2(25), 
    horaireFermeture VARCHAR2(25),
    CONSTRAINT pk_ouverture PRIMARY KEY (idRestaurant, jourSemaine, horaireOuverture),
    CONSTRAINT ck_ouv_jour CHECK (jourSemaine IN ('Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche')),
    CONSTRAINT fk_ouv_restaurant FOREIGN KEY (idRestaurant) REFERENCES Restaurant(id)
);

-- =============================================================================
-- 2. INSERTION DU JEU D'ESSAI OFFICIEL (DML)
-- =============================================================================

-- Insertion Restaurant
INSERT INTO Restaurant (id,nom,ville,dateEnregistrement) VALUES (1,'Le Neptune','Biarritz', TO_DATE ('01/06/2010', 'DD/MM/YYYY'));
INSERT INTO Restaurant (id,nom,ville,dateEnregistrement) VALUES (2,'Steak House','Bayonne', TO_DATE ('12/01/2000', 'DD/MM/YYYY'));
INSERT INTO Restaurant (id,nom,ville,dateEnregistrement) VALUES (3,'Auberge du Poids Public','Saint Jean de Luz', TO_DATE ('24/01/2014', 'DD/MM/YYYY'));
INSERT INTO Restaurant (id,nom,ville,dateEnregistrement) VALUES (4,'Les 6 Marmitons','Toulouse', TO_DATE ('01/08/1998', 'DD/MM/YYYY'));
INSERT INTO Restaurant (id,nom,ville,dateEnregistrement) VALUES (5,'L''Espadon','Toulouse', TO_DATE ('10/01/2002', 'DD/MM/YYYY'));
INSERT INTO Restaurant (id,nom,ville,dateEnregistrement) VALUES (6,'Mille et Une Pates','Toulouse', TO_DATE ('01/07/2016', 'DD/MM/YYYY'));
INSERT INTO Restaurant (id,nom,ville,dateEnregistrement) VALUES (7,'L''Estouffade','Toulouse', TO_DATE ('01/07/2005', 'DD/MM/YYYY'));
INSERT INTO Restaurant (id,nom,ville,dateEnregistrement) VALUES (8,'La Bonne Auberge','Bayonne', TO_DATE ('07/07/2005', 'DD/MM/YYYY'));
INSERT INTO Restaurant (id,nom,ville,dateEnregistrement) VALUES (9,'Pizzeria Le Carretou','Biarritz', TO_DATE ('13/02/2024', 'DD/MM/YYYY'));
INSERT INTO Restaurant (id,nom,ville,dateEnregistrement) VALUES (10,'Le Don Quichotte','Bayonne', TO_DATE ('01/04/2022', 'DD/MM/YYYY'));

-- Insertion Vin
INSERT INTO Vin (id,cru,millesime,region,couleur) VALUES (1,'Gaillac',1993,'Tarn','Rouge');
INSERT INTO Vin (id,cru,millesime,region,couleur) VALUES (2,'Madiran',1995,'Gers','Rouge');
INSERT INTO Vin (id,cru,millesime,region,couleur) VALUES (3,'Irouleguy',1995,'Pays Basque','Rosé');
INSERT INTO Vin (id,cru,millesime,region,couleur) VALUES (4,'Gewurtztraminer',1990,'Alsace','Blanc');
INSERT INTO Vin (id,cru,millesime,region,couleur) VALUES (5,'Jurançon',1997,'Pyrénées Atlantique','Blanc');
INSERT INTO Vin (id,cru,millesime,region,couleur) VALUES (6,'Tavel',1994,'Gard','Rosé');
INSERT INTO Vin (id,cru,millesime,region,couleur) VALUES (7,'Picrate',1993,'Bordeaux','Rouge');
INSERT INTO Vin (id,cru,millesime,region,couleur) VALUES (8,'Château Lafite',1997,'Médoc','Rouge');
INSERT INTO Vin (id,cru,millesime,region,couleur) VALUES (9,'Gaillac',1995,'Tarn','Rouge');
INSERT INTO Vin (id,cru,millesime,region,couleur) VALUES (10,'Madiran',1996,'Gers','Rouge');

-- Insertion Plat
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (1,'Salade de Tomates','Entrée',null,null);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (2,'Salade Niçoise','Entrée',null,null);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (3,'Salade Campagnarde','Entrée','Rouge',2);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (4,'Foie Gras','Entrée','Blanc',5);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (5,'Soupe de Poisson','Entrée',null,null);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (6,'Assiette  de Charcuterie','Entrée','Rouge',2);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (7,'Assiette Chinoise (Nems, Raviolis, ....)','Entrée',null,null);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (8,'Huitres Gratinées','Entrée','Blanc',5);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (9,'Plateau de Fruits de mer','Entrée','Blanc',4);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (10,'Gazpacho','Entrée',null,null);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (11,'Magret  de Canard','Plat principal','Rouge',10);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (12,'Soles à la Normande','Plat principal','Blanc',4);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (13,'Gambas Grillées','Plat principal','Blanc',5);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (14,'Homard à l''Américaine','Plat principal','Blanc',5);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (15,'Cassoulet','Plat principal','Rouge',2);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (16,'Spaghetti à la Bolognaise','Plat principal','Rosé',3);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (17,'Pâtes Fraîches','Plat principal','Rosé',3);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (18,'Aligot','Plat principal','Rouge',9);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (19,'Boeuf Bourguignon','Plat principal','Rouge',8);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (20,'Pizza','Plat principal','Rouge',7);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (21,'Ile Flottante','Dessert',null,null);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (22,'Profiterole','Dessert',null,null);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (23,'Crême Caramel','Dessert',null,null);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (24,'Gâteau Basque aux agrumes','Dessert',null,null);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (25,'Sorbet Fruits Rouges','Dessert',null,null);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (26,'Plateau de la vallée d''Ossau','Dessert','Rouge',1);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (27,'Plateau de Fruits','Dessert',null,null);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (28,'Nougat Glacé','Dessert',null,null);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (29,'Tarte aux Pommes','Dessert',null,null);
INSERT INTO Plat (id,nom,place,couleurVinRecommandee,idVinIdeal) VALUES (30,'Tarte Amatxi','Dessert',null,null);

-- Insertion ProposerVin
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (1,4,25);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (1,5,15);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (2,7,9);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (3,5,16);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (3,10,20);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (4,1,13);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (4,2,15);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (4,3,10);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (4,4,26);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (4,5,20);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (4,6,14);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (4,7,5);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (4,8,32);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (4,9,18);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (4,10,20);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (5,5,23);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (6,1,16);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (6,3,13);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (6,6,12);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (7,7,8);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (7,9,13);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (8,1,16);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (8,5,19);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (8,6,12);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (9,7,10);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (10,3,15);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (10,6,14);
INSERT INTO ProposerVin (idRestaurant,idVin,prix) VALUES (10,7,9);

-- Insertion ProposerPlat
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (1, 5, 10, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (1, 8, 15, 1);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (1, 9, 25, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (1, 13, 20, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (1, 20, 12.5, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (1, 21, 6, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (2, 1, 5, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (2, 20, 12.5, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (2, 28, 5, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (3, 4, 18, 1);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (3, 8, 12.5, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (3, 11, 24, 1);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (3, 19, 22, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (3, 26, 11, 1);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (3, 30, 7.5, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (4, 2, 8, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (4, 3, 12.5, 1);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (4, 10, 12, 1);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (4, 15, 25, 1);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (4, 24, 6, 1);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (4, 27, 7.5, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (5, 9, 30, 1);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (5, 14, 23, 1);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (6, 1, 6, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (6, 16, 12, 1);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (6, 17, 16, 1);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (6, 20, 9, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (6, 23, 5, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (6, 29, 5, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (7, 6, 9, 1);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (7, 7, 13, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (7, 12, 14, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (7, 27, 7, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (8, 2, 8, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (8, 15, 14, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (8, 18, 13, 1);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (9, 1, 5, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (9, 6, 7, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (9, 17, 10, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (9, 20, 11, 1);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (10, 2, 11, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (10, 7, 13, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (10, 22, 7, 0);
INSERT INTO ProposerPlat (idRestaurant, idPlat, prix, estSpecialite) VALUES (10, 25, 5, 0);

-- Insertion Ouverture
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (1,'Lundi','12','14');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (1,'Lundi','19','23');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (1,'Samedi','1','4');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (1,'Samedi','12','14');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (1,'Samedi','20','23');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (2,'Samedi','22','5');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (3,'Dimanche','12','14');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (3,'Dimanche','19','22');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (3,'Jeudi','12','14');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (3,'Jeudi','19','22');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (3,'Lundi','12','14');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (3,'Lundi','19','22');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (3,'Mardi','12','14');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (3,'Mardi','19','22');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (3,'Mercredi','12','14');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (3,'Mercredi','19','22');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (3,'Samedi','12','14');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (3,'Samedi','19','22');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (3,'Vendredi','12','14');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (3,'Vendredi','19','22');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (4,'Samedi','20','23');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (4,'Vendredi','12','15');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (5,'Dimanche','12','15');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (5,'Lundi','12','14');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (5,'Lundi','19','20');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (5,'Samedi','20','23');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (6,'Dimanche','20','22');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (6,'Samedi','20','4');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (7,'Jeudi','12','15');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (7,'Mardi','12','15');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (7,'Mercredi','12','15');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (8,'Samedi','12','15');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (8,'Vendredi','12','15');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (9,'Lundi','12','15');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (9,'Lundi','20','22');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (9,'Mardi','12','15');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (9,'Mardi','20','22');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (10,'Lundi','23','4');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (10,'Mardi','1','5');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (10,'Mercredi','12','14');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (10,'Vendredi','12','14');
INSERT INTO Ouverture (idRestaurant,jourSemaine,horaireOuverture,horaireFermeture) VALUES (10,'Vendredi','22','4'); 

COMMIT;

-- =============================================================================
-- EXERCICE 2 : REQUÊTES D'INTERROGATION SQL
-- =============================================================================

-- -----------------------------------------------------------------------------
-- PARTIE 1 : PROJECTIONS SIMPLES
-- -----------------------------------------------------------------------------

-- Question 1 : Quels sont les noms et villes de tous les restaurants ?
-- Explication : Projection simple sur les colonnes 'nom' et 'ville' de la table Restaurant.
SELECT nom, ville
FROM Restaurant;

-- Question 2 : Quels sont les vins proposés (cru) ?
-- Explication : 
-- Option A (Attendu TP monothème/mono-table) : Liste sans doublon des crus présents dans la base (table Vin).
SELECT DISTINCT cru
FROM Vin;

-- Option B (Variante avec jointure) : Crus effectivement proposés à la carte d'au moins un restaurant.
-- (Tous les crus de la table Vin sont d'ailleurs proposés au moins une fois dans le jeu d'essai).
SELECT DISTINCT v.cru
FROM Vin v
JOIN ProposerVin pv ON v.id = pv.idVin
ORDER BY v.cru;

-- Question 3 : Quels sont les vins proposés (cru et millésime) ?
-- Explication :
-- Option A (Mono-table) : Couples (cru, millésime) distincts de la table Vin.
SELECT DISTINCT cru, millesime
FROM Vin
ORDER BY cru, millesime;

-- Option B (Variante avec jointure) : Couples (cru, millésime) effectivement vendus par un restaurant.
SELECT DISTINCT v.cru, v.millesime
FROM Vin v
JOIN ProposerVin pv ON v.id = pv.idVin
ORDER BY v.cru, v.millesime;


-- -----------------------------------------------------------------------------
-- PARTIE 2 : PROJECTIONS ET RESTRICTIONS
-- -----------------------------------------------------------------------------

-- Question 1 : Quels sont les vins rosés du catalogue ?
-- Explication : Restriction sur la couleur 'Rosé' dans la table Vin.
SELECT id, cru, millesime, region, couleur
FROM Vin
WHERE couleur = 'Rosé';

-- Question 2 : Quels sont les vins blancs du millésime 2018 ?
-- Explication : Double restriction cumulative avec opérateur logique AND.
-- Note académique : Sur le jeu d'essai fourni, aucun vin ne date de 2018 (les millésimes vont de 1990 à 1997).
-- Il est donc tout à fait normal d'obtenir 0 ligne (résultat vide).
SELECT id, cru, millesime, region, couleur
FROM Vin
WHERE couleur = 'Blanc'
  AND millesime = 2018;

-- Question 3 : Quels sont les restaurants (id, nom, ville) de Bayonne et de Biarritz ?
-- Explication : Utilisation du prédicat d'appartenance à un ensemble IN ('Bayonne', 'Biarritz')
-- équivalent à (ville = 'Bayonne' OR ville = 'Biarritz').
SELECT id, nom, ville
FROM Restaurant
WHERE ville IN ('Bayonne', 'Biarritz')
ORDER BY id;

-- Question 4 : Quels sont les restaurants qui existaient le 11 septembre 2001, triés par date d’enregistrement ?
-- Explication : Comparaison temporelle sous Oracle avec TO_DATE('11/09/2001', 'DD/MM/YYYY').
-- 'Existaient le 11/09/2001' signifie enregistrés au plus tard à cette date (<=).
-- Tri chronologique croissant obligatoire via ORDER BY.
SELECT id, nom, ville, TO_CHAR(dateEnregistrement, 'DD/MM/YYYY') AS dateEnregistrement
FROM Restaurant
WHERE dateEnregistrement <= TO_DATE('11/09/2001', 'DD/MM/YYYY')
ORDER BY dateEnregistrement ASC;

-- Question 5 : Quels sont les plats servis en entrée qu’il est conseillé de consommer avec un vin Blanc ?
-- Explication : Restriction combinée sur la place dans le repas ('Entrée') et la couleur conseillée ('Blanc').
-- (Note : 'avec un in Blanc' dans le polycopié est une coquille pour 'avec un vin Blanc').
SELECT id, nom
FROM Plat
WHERE place = 'Entrée'
  AND couleurVinRecommandee = 'Blanc';

-- Question 6 : Quels sont les identifiants des plats dont le prix est compris entre 20 et 30 euros ?
-- Explication : Le prix d'un plat dépend du restaurant qui le sert, donc la requête s'exécute sur ProposerPlat.
-- Le mot-clé DISTINCT évite d'afficher plusieurs fois le même plat s'il coûte entre 20 et 30 € dans plusieurs établissements.
SELECT DISTINCT idPlat
FROM ProposerPlat
WHERE prix BETWEEN 20 AND 30
ORDER BY idPlat;

-- Question 7 : Quels sont les identifiants des plats qui sont une spécialité du restaurant d’identifiant 3 et qui ont un prix inférieur à 15 euros ?
-- Explication : Triple critère dans ProposerPlat avec idRestaurant = 3, estSpecialite = 1 (vrai) et prix < 15 (strictement).
SELECT idPlat
FROM ProposerPlat
WHERE idRestaurant = 3
  AND estSpecialite = 1
  AND prix < 15;

-- Question 8 : Quels sont les entrées et les plats pour lesquels on recommande du vin blanc ?
-- Explication : On filtre sur couleurVinRecommandee = 'Blanc' tout en ciblant les entrées et plats principaux
-- (excluant ainsi d'éventuels desserts).
SELECT id, nom, place
FROM Plat
WHERE couleurVinRecommandee = 'Blanc'
  AND place IN ('Entrée', 'Plat principal')
ORDER BY place, id;

-- Question 9 : Quels sont les entrées pour lesquelles on recommande du vin blanc et les plats pour lesquels on recommande du vin rouge ?
-- Explication : Combinaison de deux conditions composites disjointes avec l'opérateur OR.
-- Les parenthèses sont obligatoires en SQL car l'opérateur AND a une priorité supérieure à OR.
SELECT id, nom, place, couleurVinRecommandee
FROM Plat
WHERE (place = 'Entrée' AND couleurVinRecommandee = 'Blanc')
   OR (place = 'Plat principal' AND couleurVinRecommandee = 'Rouge')
ORDER BY place, id;
