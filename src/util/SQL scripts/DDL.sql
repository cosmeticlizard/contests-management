CREATE TABLE IF NOT EXISTS PERMISSION
(
    ID_PERMISSION VARCHAR(2) PRIMARY KEY,
    C             NUMERIC(1, 0) NOT NULL,
    R             NUMERIC(1, 0) NOT NULL,
    U             NUMERIC(1, 0) NOT NULL,
    D             NUMERIC(1, 0) NOT NULL
);

CREATE TABLE IF NOT EXISTS USER_TYPE
(
    ID          INTEGER PRIMARY KEY,
    USER_TYPE   VARCHAR(30) NOT NULL,
    DESCRIPTION VARCHAR(32) NOT NULL,
    PERMISSION  VARCHAR(2)  NOT NULL,
    CONSTRAINT FK_PERMISSION FOREIGN KEY (PERMISSION) REFERENCES PERMISSION (ID_PERMISSION)
);

CREATE TABLE IF NOT EXISTS USERS
(
    USERNAME  VARCHAR(32) PRIMARY KEY,
    PASSWORD  VARCHAR(100) NOT NULL,
    EMAIL     VARCHAR(32)  NOT NULL,
    NAME      VARCHAR(32)  NOT NULL,
    LAST_NAME VARCHAR(32)  NOT NULL,
    USER_TYPE INTEGER      NOT NULL,
    CONSTRAINT FK_USER_TYPE FOREIGN KEY (USER_TYPE) REFERENCES USER_TYPE (ID)
);

CREATE TABLE IF NOT EXISTS INSTITUTION
(
    ID_INSTITUTION VARCHAR(8),
    NAME VARCHAR(50) NOT NULL,
    PRIMARY KEY (ID_INSTITUTION)
);

CREATE TABLE IF NOT EXISTS TEAM
(
    ID_TEAM        VARCHAR(8),
    TEAM_NAME      VARCHAR(50) NOT NULL,
    ID_INSTITUTION VARCHAR(8),
    LEADER_USERNAME VARCHAR (32),
    PRIMARY KEY (ID_TEAM),
    FOREIGN KEY (ID_INSTITUTION) REFERENCES INSTITUTION (ID_INSTITUTION),
    FOREIGN KEY (LEADER_USERNAME) REFERENCES USERS (USERNAME)
);



CREATE TABLE IF NOT EXISTS USERS_TEAM
(
    USERNAME VARCHAR(30),
    ID_TEAM  VARCHAR(8),
    PRIMARY KEY (USERNAME, ID_TEAM),
    FOREIGN KEY (USERNAME) REFERENCES USERS (USERNAME),
    FOREIGN KEY (ID_TEAM) REFERENCES TEAM (ID_TEAM)
);


CREATE TABLE IF NOT EXISTS CITY
(
    CITY_CODE CHAR(5),
    CITY_NAME VARCHAR(40) NOT NULL,
    PRIMARY KEY (CITY_CODE)
);




CREATE TABLE VENUE
(
    ID_VENUE    INTEGER,
    VENUE_NAME  VARCHAR(100)  NOT NULL,
    SHORT_NAME  VARCHAR(6)    NOT NULL,
    V_ADDRESS   VARCHAR(100)  UNIQUE NOT NULL,
    CITY_CODE   CHAR(5),
    PRIMARY KEY(ID_VENUE),
    FOREIGN KEY(CITY_CODE) REFERENCES CITY(CITY_CODE)
);

CREATE TABLE IF NOT EXISTS STATUS
(
    ID_STATUS   CHAR(1)            NOT NULL,
    STATUS_NAME VARCHAR(10) UNIQUE NOT NULL,
    DESCRIPTION VARCHAR(100)       NOT NULL,
    PRIMARY KEY (ID_STATUS)
);

CREATE TABLE IF NOT EXISTS COMPETITION
(

    ID_COMPETITION    INTEGER       NOT NULL,
    NAME              VARCHAR(30)  NOT NULL,
    DESCRIPTION       VARCHAR(100) NOT NULL,
    START_INSCRIPTION TIMESTAMP    NOT NULL,
    END_INSCRIPTION   TIMESTAMP    NOT NULL,
    START_DATE        TIMESTAMP    NOT NULL,
    END_DATE          TIMESTAMP    NOT NULL,
    TEAM_MEMBERS_MIN  NUMERIC(3)   NOT NULL,
    TEAM_MEMBERS_MAX  NUMERIC(3)   NOT NULL,
    ID_STATUS   CHAR(1)            NOT NULL,
    PRIMARY KEY (ID_COMPETITION),
    FOREIGN KEY (ID_STATUS) REFERENCES STATUS (ID_STATUS) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS VENUE_COMPETITION
(
    ID_VENUE       INTEGER,
    ID_COMPETITION INTEGER,
    PRIMARY KEY (ID_VENUE, ID_COMPETITION),
    FOREIGN KEY (ID_VENUE) REFERENCES VENUE (ID_VENUE),
    FOREIGN KEY (ID_COMPETITION) REFERENCES COMPETITION (ID_COMPETITION)
);


CREATE TABLE IF NOT EXISTS USER_TEAM_COMPETITION
(
    USERNAME       VARCHAR(30),
    ID_TEAM        VARCHAR(8),
    ID_COMPETITION INTEGER,
    FOREIGN KEY (USERNAME) REFERENCES USERS (USERNAME),
    FOREIGN KEY (ID_TEAM) REFERENCES TEAM (ID_TEAM),
    FOREIGN KEY (ID_COMPETITION) REFERENCES COMPETITION (ID_COMPETITION),
    PRIMARY KEY (USERNAME, ID_TEAM, ID_COMPETITION)
);