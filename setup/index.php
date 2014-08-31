<?php

if (file_exists ("../sistema/class.constantes.php")) {
	if (unlink ("../sistema/class.constantes.php")) {
		echo "Borrado exitosamente<br> ";
	}
}

$nombre_temp = "class.constantes";  
$archivo="../sistema/".$nombre_temp.".php"; 

$gestor = fopen($archivo, "w");  

$contenido = "<?php";
$contenido .= "
";
$contenido .= "#Constantes de Conexion";
$contenido .= "
";
$contenido .= "define('db_hostname', 'localhost');";
$contenido .= "
";
$contenido .= "define('db_name', 'streaming');";
$contenido .= "
";
$contenido .= "define('db_username', 'root');";
$contenido .= "
";
$contenido .= "define('db_password', 'Lima1141Server1');";
$contenido .= "
";
$contenido .= "?>";

fwrite($gestor, $contenido); 
fclose($gestor); 

echo "Creado exitosamente<br> ";




###############################################################################################################################

	#$host = $_POST['host'];
	#$user = $_POST['user'];
	#$pass = $_POST['pass'];

	$conn = new mysqli('localhost', 'root', 'Lima1141Server1');
	if (mysqli_connect_errno()) {
	  exit('Connect failed: '. mysqli_connect_error());
	}
	$sql = "DROP SCHEMA IF EXISTS `streaming`;";
	if ($conn->query($sql) === TRUE) {
	  echo 'Database "Streaming" eliminada exitosamente<br> ';
	}
	$sql = "CREATE SCHEMA IF NOT EXISTS `streaming` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;";
	if ($conn->query($sql) === TRUE) {
	  echo 'Database "Streaming" Creada exitosamente<br> ';
	}
	else {
	 echo 'Error: '. $conn->error;
	}
	$conn->close();

###############################################################################################################################

$mysqli = new mysqli("localhost", "root", "Lima1141Server1", "streaming");
if ($mysqli->connect_errno) {
    echo "Falló la conexión con MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

for ($i=0; $i < 9; $i++) { 
	switch ($i) {
		case '0':
			$querya = $mysqli->query("DROP TABLE IF EXISTS `streaming`.`mesas`");
			$queryb = $mysqli->query("CREATE TABLE IF NOT EXISTS `streaming`.`mesas` (
										  `idmesas` INT UNSIGNED NOT NULL AUTO_INCREMENT,
										  `mesasNombre` VARCHAR(45) NULL,
										  PRIMARY KEY (`idmesas`))
										ENGINE = InnoDB;");
			if (!$querya || !$queryb) {
			    echo "Falló la creación de la tabla Mesas: (" . $mysqli->errno . ") " . $mysqli->error;
			}else{
				echo "Tablas Mesas creada exitosamente<br>";
			}
		break;

		case '1':
			$querya = $mysqli->query("DROP TABLE IF EXISTS `streaming`.`salas`");
			$queryb = $mysqli->query("CREATE TABLE IF NOT EXISTS `streaming`.`salas` (
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
									ENGINE = InnoDB;");
			if (!$querya || !$queryb) {
			    echo "Falló la creación de la tabla Salas: (" . $mysqli->errno . ") " . $mysqli->error;
			}else{
				echo "Tablas Salas creada exitosamente<br>";
			}
		break;

		case '2':
			$querya = $mysqli->query("DROP TABLE IF EXISTS `streaming`.`receptor`");
			$queryb = $mysqli->query("CREATE TABLE IF NOT EXISTS `streaming`.`receptor` (
									  `idreceptor` INT UNSIGNED NOT NULL AUTO_INCREMENT,
									  `receptorNombre` VARCHAR(45) NULL,
									  PRIMARY KEY (`idreceptor`))
									ENGINE = InnoDB;
									");
			if (!$querya || !$queryb) {
			    echo "Falló la creación de la tabla Receptor: (" . $mysqli->errno . ") " . $mysqli->error;
			}else{
				echo "Tablas Receptor creada exitosamente<br>";
			}
		break;

		case '3':
			$querya = $mysqli->query("DROP TABLE IF EXISTS `streaming`.`salasReceptor`");
			$queryb = $mysqli->query("CREATE TABLE IF NOT EXISTS `streaming`.`salasReceptor` (
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
									ENGINE = InnoDB;");
			if (!$querya || !$queryb) {
			    echo "Falló la creación de la tabla salasReceptor: (" . $mysqli->errno . ") " . $mysqli->error;
			}else{
				echo "Tablas salasReceptor creada exitosamente<br>";
			}
		break;

		case '4':
			$querya = $mysqli->query("CREATE PROCEDURE `streaming`.`CrearSala` (IN mesas_idmesas int, IN salasNombre varchar(45), IN SalasFecha date, IN SalasHora time, IN salasEstado tinyint)
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

										END");
			if (!$querya) {
			    echo "Falló la creación del procedimiento CrearSala: (" . $mysqli->errno . ") " . $mysqli->error;
			}else{
				echo "procedimiento CrearSala creado exitosamente<br>";
			}
		break;

		case '5':
			$querya = $mysqli->query("INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 1');");
			$queryb = $mysqli->query("INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 2');");
			$queryc = $mysqli->query("INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 3');");
			$queryd = $mysqli->query("INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 4');");
			$querye = $mysqli->query("INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 5');");
			$queryf = $mysqli->query("INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 6');");
			$queryg = $mysqli->query("INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 7');");
			$queryh = $mysqli->query("INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 8');");
			$queryi = $mysqli->query("INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 9');");
			$queryj = $mysqli->query("INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 10');");
			$queryk = $mysqli->query("INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 11');");
			$queryl = $mysqli->query("INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 12');");
			$querym = $mysqli->query("INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 13');");
			$queryn = $mysqli->query("INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 14');");
			$queryo = $mysqli->query("INSERT INTO `streaming`.`mesas` (`mesasNombre`) VALUES ('Mesa 15');");
			$queryp = $mysqli->query("INSERT INTO `streaming`.`receptor` (`receptorNombre`) VALUES ('Juan Mora');");
			$queryq = $mysqli->query("INSERT INTO `streaming`.`receptor` (`receptorNombre`) VALUES ('Carolina Ramirez');");
			if (!$querya || !$queryb || !$queryc || !$queryd || !$querye || !$queryf || !$queryg || !$queryh || !$queryi || !$queryj || !$queryk || !$queryl || !$querym || !$queryn || !$queryo || !$queryp || !$queryq) {
			    echo "Fallaron laa Inserciones: (" . $mysqli->errno . ") " . $mysqli->error;
			}else{
				echo "Inserciones realizadas exitosamente<br>";
			}
		break;		
		
		default:
			# code...
		break;
	}
}

$mysqli->close();


?>