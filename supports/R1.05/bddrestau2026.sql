-- Création de la table RESTAURANT
CREATE TABLE Restaurant 
(
id NUMBER(10), 
nom VARCHAR2(255), 
ville VARCHAR2(255),
dateEnregistrement DATE,
PRIMARY KEY (id)
);

-- Création de la table VIN
CREATE TABLE Vin
(
id NUMBER(10), 
cru VARCHAR2(255), 
millesime NUMBER(4), 
region VARCHAR2(255), 
couleur VARCHAR2(20) CHECK (couleur IN ('Rouge', 'Blanc', 'Rosé')),
PRIMARY KEY (id)
);   

-- Création de la table PLAT
CREATE TABLE Plat 
(
id NUMBER(10), 
nom VARCHAR2(255), 
place VARCHAR2(255), 
couleurVinRecommandee VARCHAR2(20) CHECK (couleurVinRecommandee IN ('Rouge', 'Blanc', 'Rosé')), 
idVinIdeal NUMBER(10),
PRIMARY KEY (id),
FOREIGN KEY (idVinIdeal) REFERENCES Vin(id) 
);

-- Création de la table ProposerVin
CREATE TABLE ProposerVin
(
idRestaurant NUMBER(10), 
idVin NUMBER(10), 
prix NUMBER(10,2),
PRIMARY KEY (idRestaurant, idVin),
FOREIGN KEY (idRestaurant) REFERENCES Restaurant(id) ,
FOREIGN KEY (idVin) REFERENCES Vin(id) 
);
   
-- Création de la table ProposerVin
CREATE TABLE ProposerPlat 
(
idRestaurant NUMBER(10), 
idPlat NUMBER(10), 
prix NUMBER(10,2),
estSpecialite NUMBER(1) CHECK(estSpecialite IN (0,1)),
PRIMARY KEY (idRestaurant, idPlat),
FOREIGN KEY (idRestaurant) REFERENCES Restaurant(id),
FOREIGN KEY (idPlat) REFERENCES Plat(id) 
);

-- Création de la table Ouverture
CREATE TABLE Ouverture 
(
idRestaurant NUMBER(10), 
jourSemaine VARCHAR2(20) CHECK (jourSemaine IN ('Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche')),
horaireOuverture VARCHAR2(25), 
horaireFermeture VARCHAR2(25),
PRIMARY KEY (idRestaurant, jourSemaine, horaireOuverture),
FOREIGN KEY (idRestaurant) REFERENCES Restaurant(id) 
);

----- Insertion dans la table Restaurant
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


----- Insertion dans la table Vin
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


----- Insertion dans la table Plat
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


----- Insertion dans la table ProposerVin
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


----- Insertion dans la table ProposerPlat
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


----- Insertion dans la table Ouverture
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