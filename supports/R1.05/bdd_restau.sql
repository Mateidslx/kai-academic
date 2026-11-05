-- Création de la table RESTAURANTS
CREATE TABLE RESTAURANTS 
(
code NUMBER PRIMARY KEY, 
nom VARCHAR2(255), 
ville VARCHAR2(255)
);

-- Création de la table VINS
CREATE TABLE VINS 
(
code NUMBER PRIMARY KEY, 
cru VARCHAR2(255), 
millesime NUMBER(4), 
region VARCHAR2(255), 
couleur VARCHAR2(255)
);   

-- Création de la table PLATS
CREATE TABLE PLATS 
(
code NUMBER PRIMARY KEY, 
nom VARCHAR2(255), 
place VARCHAR2(255), 
couleurvinrdee VARCHAR2(255), 
codevinideal NUMBER,
CONSTRAINT fk_PLATS_VINS
	FOREIGN KEY( codevinideal )
	REFERENCES VINS(code) 
	ON DELETE CASCADE
);

-- Création de la table SERVIRVIN
CREATE TABLE SERVIRVIN
(
coderestau NUMBER, 
codevin NUMBER, 
prixvin NUMBER,
CONSTRAINT pk_SERVIRVIN
	PRIMARY KEY( coderestau, codevin),
CONSTRAINT fk_SERVIRVIN_RESTAURANTS
	FOREIGN KEY( coderestau )
	REFERENCES RESTAURANTS(code) 
	ON DELETE CASCADE,
CONSTRAINT fk_SERVIRVIN_VIN
	FOREIGN KEY( codevin )
	REFERENCES VINS(code) 
	ON DELETE CASCADE
);
   
-- Création de la table SERVIRPLAT
CREATE TABLE SERVIRPLAT 
(
coderestau NUMBER, 
codeplat NUMBER, 
prixplat NUMBER,
specialite NUMBER CHECK (specialite IN (0, 1)),
CONSTRAINT pk_SERVIRPLAT
	PRIMARY KEY( coderestau, codeplat),
CONSTRAINT fk_SERVIRPLAT_RESTAURANTS
	FOREIGN KEY( coderestau )
	REFERENCES RESTAURANTS(code) 
	ON DELETE CASCADE,
CONSTRAINT fk_SERVIRPLAT_PLAT
	FOREIGN KEY( codeplat )
	REFERENCES PLATS(code) 
	ON DELETE CASCADE
);

-- Création de la table OUVERTURE
CREATE TABLE OUVERTURE 
(
coderestau NUMBER, 
libjour VARCHAR2(255), 
horaireouverture VARCHAR2(255), 
horairefermeture VARCHAR2(255),
CONSTRAINT pk_OUVERTURE
	PRIMARY KEY( coderestau, libjour, horaireouverture),
CONSTRAINT fk_OUVERTURE_RESTAURANTS
	FOREIGN KEY( coderestau )
	REFERENCES RESTAURANTS(code) 
	ON DELETE CASCADE
);

----- Insértion dans la table RESTAURANTS
Insert into RESTAURANTS (code,nom,ville) values (1,'Le Neptune','Biarritz');
Insert into RESTAURANTS (code,nom,ville) values (2,'Steak House','Bayonne');
Insert into RESTAURANTS (code,nom,ville) values (3,'Auberge du Poids Public','Saint Jean de Luz');
Insert into RESTAURANTS (code,nom,ville) values (4,'Les 6 Marmitons','Toulouse');
Insert into RESTAURANTS (code,nom,ville) values (5,'L''Espadon','Toulouse');
Insert into RESTAURANTS (code,nom,ville) values (6,'Mille et Une Pâtes','Toulouse');
Insert into RESTAURANTS (code,nom,ville) values (7,'L''Estouffade','Toulouse');
Insert into RESTAURANTS (code,nom,ville) values (8,'La Bonne Auberge','Bayonne');
Insert into RESTAURANTS (code,nom,ville) values (9,'Pizzeria Le Carretou','Biarritz');
Insert into RESTAURANTS (code,nom,ville) values (10,'Le Don Quichotte','Bayonne');


----- Insértion dans la table VINS
Insert into VINS (code,cru,millesime,region,couleur) values (1,'Gaillac',1993,'Tarn','Rouge');
Insert into VINS (code,cru,millesime,region,couleur) values (2,'Madiran',1995,'Gers','Rouge');
Insert into VINS (code,cru,millesime,region,couleur) values (3,'Irouleguy',1995,'Pays Basque','Rosé');
Insert into VINS (code,cru,millesime,region,couleur) values (4,'Gewurtztraminer',1990,'Alsace','Blanc');
Insert into VINS (code,cru,millesime,region,couleur) values (5,'Jurançon',1997,'Pyrénées Atlantique','Blanc');
Insert into VINS (code,cru,millesime,region,couleur) values (6,'Tavel',1994,'Gard','Rosé');
Insert into VINS (code,cru,millesime,region,couleur) values (7,'Picrate',1993,'Bordeaux','Rouge');
Insert into VINS (code,cru,millesime,region,couleur) values (8,'Château Lafite',1997,'Médoc','Rouge');
Insert into VINS (code,cru,millesime,region,couleur) values (9,'Gaillac',1995,'Tarn','Rouge');
Insert into VINS (code,cru,millesime,region,couleur) values (10,'Madiran',1996,'Gers','Rouge');


----- Insértion dans la table PLATS
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (1,'Salade de Tomates','Entrée',null,null);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (2,'Salade Niçoise','Entrée',null,null);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (3,'Salade Campagnarde','Entrée','Rouge',2);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (4,'Foie Gras','Entrée','Blanc',5);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (5,'Soupe de Poisson','Entrée',null,null);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (6,'Assiette  de Charcuterie','Entrée','Rouge',2);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (7,'Assiette Chinoise (Nems, Raviolis, ....)','Entrée',null,null);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (8,'Huîtres Gratinées','Entrée','Blanc',5);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (9,'Plateau de Fruits de mer','Entrée','Blanc',4);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (10,'Gazpacho','Entrée',null,null);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (11,'Magret  de Canard','Plat principal','Rouge',10);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (12,'Soles à la Normande','Plat principal','Blanc',4);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (13,'Gambas Grillées','Plat principal','Blanc',5);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (14,'Homard à lAméricaine','Plat principal','Blanc',5);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (15,'Cassoulet','Plat principal','Rouge',2);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (16,'Spaghetti à la Bolognaise','Plat principal','Rosé',3);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (17,'Pâtes Fraîches','Plat principal','Rosé',3);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (18,'Aligot','Plat principal','Rouge',9);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (19,'Boeuf Bourguignon','Plat principal','Rouge',8);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (20,'Pizza','Plat principal','Rouge',7);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (21,'Ile Flottante','Dessert',null,null);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (22,'Profiterole','Dessert',null,null);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (23,'Crème Caramel','Dessert',null,null);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (24,'Gâteau Basque aux agrumes','Dessert',null,null);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (25,'Sorbet Fruits Rouges','Dessert',null,null);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (26,'Plateau de la vallée d'Ossau','Dessert','Rouge',1);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (27,'Plateau de Fruits','Dessert',null,null);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (28,'Nougat Glacé','Dessert',null,null);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (29,'Tarte aux Pommes','Dessert',null,null);
Insert into PLATS (code,nom,place,couleurvinrdee,codevinideal) values (30,'Tarte Amatxi','Dessert',null,null);


----- Insértion dans la table SERVIRVIN
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (1,4,25);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (1,5,15);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (2,7,9);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (3,5,16);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (3,10,20);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (4,1,13);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (4,2,15);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (4,3,10);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (4,4,26);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (4,5,20);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (4,6,14);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (4,7,5);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (4,8,32);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (4,9,18);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (4,10,20);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (5,5,23);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (6,1,16);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (6,3,13);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (6,6,12);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (7,7,8);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (7,9,13);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (8,1,16);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (8,5,19);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (8,6,12);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (9,7,10);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (10,3,15);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (10,6,14);
Insert into SERVIRVIN (coderestau,codevin,prixvin) values (10,7,9);


----- Insértion dans la table SERVIRPLAT
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (1, 5, 10, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (1, 8, 15, 1);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (1, 9, 25, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (1, 13, 20, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (1, 20, 12.5, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (1, 21, 6, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (2, 1, 5, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (2, 20, 12.5, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (2, 28, 5, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (3, 4, 18, 1);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (3, 8, 12.5, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (3, 11, 24, 1);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (3, 19, 22, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (3, 26, 11, 1);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (3, 30, 7.5, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (4, 2, 8, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (4, 3, 12.5, 1);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (4, 10, 12, 1);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (4, 15, 25, 1);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (4, 24, 6, 1);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (4, 27, 7.5, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (5, 9, 30, 1);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (5, 14, 23, 1);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (6, 1, 6, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (6, 16, 12, 1);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (6, 17, 16, 1);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (6, 20, 9, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (6, 23, 5, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (6, 29, 5, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (7, 6, 9, 1);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (7, 7, 13, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (7, 12, 14, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (7, 27, 7, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (8, 2, 8, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (8, 15, 14, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (8, 18, 13, 1);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (9, 1, 5, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (9, 6, 7, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (9, 17, 10, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (9, 20, 11, 1);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (10, 2, 11, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (10, 7, 13, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (10, 22, 7, 0);
Insert into SERVIRPLAT (coderestau, codeplat, prixplat, specialite) values (10, 25, 5, 0);


----- Insértion dans la table OUVERTURE
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (1,'Lundi','12','14');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (1,'Lundi','19','23');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (1,'Samedi','1','4');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (1,'Samedi','12','14');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (1,'Samedi','20','23');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (2,'Samedi','22','5');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (3,'Dimanche','12','14');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (3,'Dimanche','19','22');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (3,'Jeudi','12','14');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (3,'Jeudi','19','22');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (3,'Lundi','12','14');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (3,'Lundi','19','22');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (3,'Mardi','12','14');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (3,'Mardi','19','22');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (3,'Mercredi','12','14');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (3,'Mercredi','19','22');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (3,'Samedi','12','14');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (3,'Samedi','19','22');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (3,'Vendredi','12','14');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (3,'Vendredi','19','22');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (4,'Samedi','20','23');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (4,'Vendredi','12','15');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (5,'Dimanche','12','15');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (5,'Lundi','12','14');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (5,'Lundi','19','20');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (5,'Samedi','20','23');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (6,'Dimanche','20','22');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (6,'Samedi','20','4');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (7,'Jeudi','12','15');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (7,'Mardi','12','15');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (7,'Mercredi','12','15');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (8,'Samedi','12','15');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (8,'Vendredi','12','15');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (9,'Lundi','12','15');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (9,'Lundi','20','22');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (9,'Mardi','12','15');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (9,'Mardi','20','22');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (10,'Lundi','23','4');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (10,'Mardi','1','5');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (10,'Mercredi','12','14');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (10,'Vendredi','12','14');
Insert into OUVERTURE (coderestau,libjour,horaireouverture,horairefermeture) values (10,'Vendredi','22','4');