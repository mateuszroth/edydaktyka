USE edydaktyka;

CREATE TABLE Users ( # student
    Album INT NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Password VARCHAR(128) NOT NULL,
    PasswordSalt VARCHAR (256) NOT NULL,
    Email VARCHAR(320) NOT NULL,
    Photo TEXT,
    IsAdmin BOOL DEFAULT FALSE,
    CreatedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Album),
    UNIQUE (Email)
);

INSERT INTO Users VALUES (0, "Admin", "Admin", "", "", "mateusz.roth+admin@gmail.com", NULL, TRUE, NULL);
INSERT INTO Users VALUES (117328, "Mateusz", "Roth", "", "", "mateusz.roth@gmail.com", NULL, FALSE, NULL);
INSERT INTO Users VALUES (117111, "Adam", "Nowak", "", "", "adam.nowak@student.put.poznan.pl", NULL, FALSE, NULL);
INSERT INTO Users VALUES (117112, "Barbara", "Bogacka", "",  "", "barbara.bogacka@student.put.poznan.pl", NULL, FALSE, NULL);
INSERT INTO Users VALUES (117113, "Cecylia", "Ciągnik", "", "", "cecylia.ciagnik@student.put.poznan.pl", NULL, FALSE, NULL);
INSERT INTO Users VALUES (117114, "Damian", "Dąbrowski", "", "", "damian.dabrowski@student.put.poznan.pl", NULL, FALSE, NULL);

CREATE TABLE Groups ( # grupa
    ID INT NOT NULL AUTO_INCREMENT,
    ModeOfStudy ENUM('', 'NST', 'ST') NOT NULL,
    FieldOfStudy VARCHAR(100) NOT NULL,
    GroupNumber ENUM('', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10') NOT NULL,
    GroupHalf ENUM('', 'a', 'b', 'c', 'd') NOT NULL,
    CourseName VARCHAR(100) NOT NULL,
    Link TEXT,
    Description TEXT,
    IsActive BOOL NOT NULL DEFAULT TRUE,
    PRIMARY KEY (ID)
);

INSERT INTO Groups VALUES (NULL, "NST", "ZTI", "", "", "Organizacja usług komercyjnych w internecie", NULL, NULL, TRUE);
INSERT INTO Groups VALUES (NULL, "ST", "Informatyka", "1", "a", "Programowanie w Delphi", NULL, NULL, TRUE);

CREATE TABLE GroupAssignments ( # new table
    ID INT NOT NULL AUTO_INCREMENT,
    StudentID INT NOT NULL,
    GroupID INT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (StudentID)
        REFERENCES Users (Album),
    FOREIGN KEY (GroupID)
        REFERENCES Groups (ID)
);

INSERT INTO GroupAssignments VALUES (NULL, 117328, 1);
INSERT INTO GroupAssignments VALUES (NULL, 117328, 2);
INSERT INTO GroupAssignments VALUES (NULL, 117111, 1);
INSERT INTO GroupAssignments VALUES (NULL, 117112, 1);
INSERT INTO GroupAssignments VALUES (NULL, 117113, 2);
INSERT INTO GroupAssignments VALUES (NULL, 117114, 2);

CREATE TABLE Classes ( # zajecia
    ID INT NOT NULL AUTO_INCREMENT,
    GroupID INT NOT NULL,
    ClassNumber TINYINT NOT NULL,
    TakenOn DATETIME DEFAULT CURRENT_TIMESTAMP,
    Title VARCHAR(100) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (GroupID)
        REFERENCES Groups (ID),
    CHECK (ClassNumber >= 0),
    CHECK (ClassNumber < 100)
);

INSERT INTO Classes VALUES (NULL, 1, 1, NULL, "Podstawy");
INSERT INTO Classes VALUES (NULL, 1, 2, NULL, "E-commerce");
INSERT INTO Classes VALUES (NULL, 2, 1, NULL, "Podstawy");
INSERT INTO Classes VALUES (NULL, 2, 1, NULL, "Instrukcje warunkowe");


# DROP TABLE ClassAttendances;

CREATE TABLE ClassAttendances ( # obecnosc
    ID INT NOT NULL AUTO_INCREMENT,
    ClassID INT NOT NULL,
    GroupID INT NOT NULL,
    StudentID INT NOT NULL,
    IsPresent BOOL NOT NULL DEFAULT TRUE,
    IsReportRequired BOOL NOT NULL DEFAULT TRUE,
    ReportFile VARCHAR(255),
    ReportGrade INT,
    ReportAddedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ID),
    FOREIGN KEY (StudentID)
        REFERENCES Users (Album),
    FOREIGN KEY (GroupID)
        REFERENCES Groups (ID),
    FOREIGN KEY (ClassID)
        REFERENCES Classes (ID),
    CHECK (ReportGrade IS NULL OR ReportGrade <= 50)
);

INSERT INTO ClassAttendances VALUES (NULL, 1, 1, 117328, TRUE, TRUE, NULL, NULL, NULL);
INSERT INTO ClassAttendances VALUES (NULL, 1, 1, 117328, FALSE, TRUE, NULL, NULL, NULL);

# DROP TABLE Theses;

CREATE TABLE Theses ( # dyplom
    ID INT NOT NULL AUTO_INCREMENT,
    Type ENUM('', 'obroniona', 'zgłoszona', 'realizowany', 'pomyślany') NOT NULL,
    Year INT(4),
    GraduateName VARCHAR(255),
    GraduateID INT,
    Title TEXT NOT NULL,
    UsedTechnologies TEXT,
    Goal TEXT,
    Sketch TEXT,
    Link TEXT,
    PRIMARY KEY (ID),
    FOREIGN KEY (GraduateID)
        REFERENCES Users (Album)
);

INSERT INTO Theses VALUES (NULL, 'realizowany', 2019, 'Mateusz Roth', 117328, 'Analiza serwisu edu.andrzeju.pl organizującego współpracę ze studentami w zakresie zajęć oraz prac dyplomowych pod kątem jego użyteczności i ponowna implementacja', 'Node.js React', 'Wykrycie słabych punktów w użyteczności serwisu edu.andrzeju.pl i zaproponowanie ich eliminacji', NULL, NULL);

# DROP TABLE ThesisVolunteers;

CREATE TABLE ThesisVolunteers ( # kandydat
	ID INT NOT NULL AUTO_INCREMENT,
	ThesisID INT NOT NULL,
	StudentID INT NOT NULL,
    CreatedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (ID),
	FOREIGN KEY (StudentID) REFERENCES Users(Album),
	FOREIGN KEY (ThesisID) REFERENCES Theses(ID)
);

INSERT INTO ThesisVolunteers VALUES (NULL, 1, 117328, NULL);

# DROP TABLE Consultations;

CREATE TABLE Consultations ( # rezerwacje
	ID INT NOT NULL AUTO_INCREMENT,
	StudentID INT NOT NULL,
    ReservationOn DATETIME NOT NULL,
	PRIMARY KEY (ID),
	FOREIGN KEY (StudentID) REFERENCES Users(Album)
);

INSERT INTO Consultations VALUES (NULL, 117328, '2019-10-01 00:00:00');

CREATE TABLE Questionnaires (
    ID INT NOT NULL AUTO_INCREMENT,
    CreatedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
    GroupID INT,
    Grade INT NOT NULL,
    Speed INT NOT NULL,
    Valueable INT NOT NULL,
    Comments TEXT,
    PRIMARY KEY (ID),
    FOREIGN KEY (GroupID)
        REFERENCES Groups (ID),
    CHECK (Grade > 0),
    CHECK (Grade <= 50),
    CHECK (Speed >= - 2),
    CHECK (Speed <= 2),
    CHECK (Valueable >= - 2),
    CHECK (Valueable <= 2)
);

INSERT INTO Questionnaires VALUES (NULL, NULL, 1, 50, 0, 2, NULL);

CREATE TABLE Articles (
	ID INT NOT NULL AUTO_INCREMENT,
    Title VARCHAR(1000),
    Content TEXT,
    PRIMARY KEY (ID)
);

INSERT INTO Articles VALUES (NULL, "O autorze", "Jestem super prowadzącym!");