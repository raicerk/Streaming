-- MySQL Script generated by MySQL Workbench
-- 08/30/14 15:36:25
-- Model: New Model    Version: 1.0
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema streaming
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `streaming` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `streaming` ;

-- -----------------------------------------------------
-- Table `streaming`.`mesas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `streaming`.`mesas` (
  `idmesas` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `mesasNombre` VARCHAR(45) NULL,
  PRIMARY KEY (`idmesas`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `streaming`.`salas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `streaming`.`salas` (
  `idsalas` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `mesas_idmesas` INT UNSIGNED NOT NULL,
  `salasNombre` VARCHAR(45) NULL,
  `salasFecha` DATE NULL,
  `salasHora` TIME NULL,
  `salasEstado` TINYINT NULL,
  PRIMARY KEY (`idsalas`),
  INDEX `fk_salas_mesas_idx` (`mesas_idmesas` ASC),
  CONSTRAINT `fk_salas_mesas`
    FOREIGN KEY (`mesas_idmesas`)
    REFERENCES `streaming`.`mesas` (`idmesas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `streaming`.`receptor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `streaming`.`receptor` (
  `idreceptor` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `receptorNombre` VARCHAR(45) NULL,
  PRIMARY KEY (`idreceptor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `streaming`.`salasReceptor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `streaming`.`salasReceptor` (
  `idsalasReceptor` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Fecha` DATE NULL,
  `Hora` TIME NULL,
  `salas_idsalas` INT UNSIGNED NOT NULL,
  `receptor_idreceptor` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idsalasReceptor`),
  INDEX `fk_salasReceptor_salas1_idx` (`salas_idsalas` ASC),
  INDEX `fk_salasReceptor_receptor1_idx` (`receptor_idreceptor` ASC),
  CONSTRAINT `fk_salasReceptor_salas1`
    FOREIGN KEY (`salas_idsalas`)
    REFERENCES `streaming`.`salas` (`idsalas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_salasReceptor_receptor1`
    FOREIGN KEY (`receptor_idreceptor`)
    REFERENCES `streaming`.`receptor` (`idreceptor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- -----------------------------------------------------
-- Insert de tabla mesa
-- -----------------------------------------------------
INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 1');
INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 2');
INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 3');
INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 4');
INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 5');
INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 6');
INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 7');
INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 8');
INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 9');
INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 10');
INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 11');
INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 12');
INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 13');
INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 14');
INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 15');


-- -----------------------------------------------------
-- Insert tabla receptor
-- -----------------------------------------------------
INSERT INTO `streaming`.`receptor` (`receptorNombre`) VALUES ('Juan Mora');
INSERT INTO `streaming`.`receptor` (`receptorNombre`) VALUES ('Carolina Ramirez');

-- -----------------------------------------------------
-- Crea procedimiento para crear sala
-- -----------------------------------------------------
USE `streaming`;
DROP procedure IF EXISTS `CrearSala`;

DELIMITER $$
USE `streaming`$$
CREATE PROCEDURE `streaming`.`CrearSala` (IN mesas_idmesas int, IN salasNombre varchar(45), IN SalasFecha date, IN SalasHora time, IN salasEstado tinyint)
BEGIN
  INSERT INTO `streaming`.`salas`(`mesas_idmesas`, 
                  `salasNombre`, 
                  `salasFecha`, 
                  `salasHora`, 
                  `salasEstado`) 
              VALUES (mesas_idmesas, 
                  salasNombre, 
                  salasFecha, 
                  salasHora, 
                  salasEstado);

END$$

DELIMITER ;




