CREATE TABLE Equipe (
    num INTEGER,
    nom VARCHAR2(50) NOT,
    capaciteStade NUMERIC(5) CHECK (capaciteStade >= 0 AND capaciteStade <= 100000),
    budget REAL DEFAULT '0' ,
    PRIMARY KEY (num)
); 

CREATE Competition (
    num NUMERIC,
    nom VARCHAR(50),
    type VARCHAR(20) NOT NULL 
);

CREATE TABLE Appartenir (
    numJoueur NUMERIC,
    numEquipe NUMERIC,
    dateDebut DATE NOT NULL,
    dateFin DATE ,
    poste CHAR(2) CHECK (poste IN ('G','D','M','A','R')),
    numMaillot NUMERIC 
);
 
CREATE TABLE Preter (
    numJoueur NUMERIC, 
    numEquipe NUMERIC,
    dateDebut DATE,
    dateFin DATE,
    poste VARCHAR(10) CHECK poste IN ('G','D','M','A','R'),
    numMaillot INTEGER, 
    PRIMARY KEY numJoueur, numEquipe, 
    FOREIGN KEY (numJoueur) REF JOUEUR(num_joueur) 
);

CREATE TABLE Joueur(
    num NUMBER(5),
    nom VARCHAR2(50) 
    prenom VARCHAR2 ,
    nbSelections INT,
    estEnActivite BOOL,
    PRIMARY (num)
);