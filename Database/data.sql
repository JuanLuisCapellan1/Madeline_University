CREATE DATABASE universidad;

USE universidad;

DROP TABLE IF EXISTS estudiantes;
CREATE TABLE estudiantes(
	ID INT UNSIGNED AUTO_INCREMENT,
    NOMBRES VARCHAR(64) NOT NULL,
    APELLIDOS VARCHAR(64) NOT NULL, 
    EMAIL VARCHAR(320) NOT NULL,
    EDAD INT UNSIGNED NOT NULL,
    TELEFONO VARCHAR(64) NOT NULL,
    CEDULA VARCHAR(64) NOT NULL,
    FECHA_INGRESO TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    DIRECCION VARCHAR(64) NOT NULL,
    PRIMARY KEY(ID),
    UNIQUE KEY (EMAIL),
    UNIQUE KEY (CEDULA)
);

SELECT * FROM estudiantes;

DROP TABLE IF EXISTS profesores;
CREATE TABLE profesores(
	ID INT UNSIGNED AUTO_INCREMENT,
    NOMBRES VARCHAR(64) NOT NULL,
    APELLIDOS VARCHAR(64) NOT NULL, 
    EMAIL VARCHAR(320) NOT NULL,
    EDAD INT UNSIGNED NOT NULL,
    TELEFONO VARCHAR(64) NOT NULL,
    CEDULA VARCHAR(64) NOT NULL,
    SALARIO FLOAT(12,2) UNSIGNED NOT NULL,
    FECHA_INGRESO TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    DIRECCION VARCHAR(64) NOT NULL,
    PRIMARY KEY(ID),
    UNIQUE KEY (EMAIL),
    UNIQUE KEY (CEDULA)
);

DROP TABLE IF EXISTS materias;
CREATE TABLE materias(
	ID INT UNSIGNED AUTO_INCREMENT,
    NOMBRE VARCHAR(64) NOT NULL,
    PRIMARY KEY (ID)
);

DROP TABLE IF EXISTS sessiones_estudiantes;
CREATE TABLE sessiones_estudiantes(
	ID INT UNSIGNED AUTO_INCREMENT,
    ID_ESTUDIANTE INT UNSIGNED NOT NULL,
    ID_MATERIA INT UNSIGNED NOT NULL,
    PRIMARY KEY (ID),
    CONSTRAINT FK_ESTUDIANTE FOREIGN KEY (ID_ESTUDIANTE) REFERENCES estudiantes (ID),
    CONSTRAINT FK_MATERIA_ESTUDIANTES FOREIGN KEY (ID_MATERIA) REFERENCES materias (ID)
);
insert into sessiones_estudiantes values (1, 1, 1);
insert into sessiones_estudiantes values (2, 1, 2);
SELECT es.NOMBRES, m.NOMBRE FROM sessiones_estudiantes AS s JOIN estudiantes AS es ON s.ID_ESTUDIANTE = es.ID JOIN materias as m ON s.ID_MATERIA = m.ID;

DROP TABLE IF EXISTS sessiones_profesores;
CREATE TABLE sessiones_profesores (
	ID INT UNSIGNED AUTO_INCREMENT,
    ID_PROFESOR INT UNSIGNED NOT NULL,
    ID_MATERIA INT UNSIGNED NOT NULL,
    PRIMARY KEY (ID),
    CONSTRAINT FK_PROFESORES FOREIGN KEY (ID_PROFESOR) REFERENCES profesores (ID),
    CONSTRAINT FK_MATERIA_PROFESORES FOREIGN KEY (ID_MATERIA) REFERENCES materias (ID)
);

select * from sessiones_profesores;
delete from sessiones_profesores where id = 2;