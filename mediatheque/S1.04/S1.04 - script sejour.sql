CREATE TABLE SEJOUR (
    code            NUMBER(5)       CONSTRAINT pk_sejour PRIMARY KEY,
    type            VARCHAR2(15)    NOT NULL,
    intitule        VARCHAR2(100)   NOT NULL,
    lieu            VARCHAR2(80)    NOT NULL,
    heureArrivee    VARCHAR2(5)     NOT NULL,
    heureDepart     VARCHAR2(5)     NOT NULL,
    nomContact      VARCHAR2(80)    NOT NULL,
    telContact      VARCHAR2(20)    NOT NULL,
    emailContact    VARCHAR2(120)   NOT NULL,
    tarifHS         NUMBER(8,2)     NOT NULL,
    tarifS          NUMBER(8,2)     NOT NULL
);