<?php

	include_once('class.modelo.php');

	$modelo = new Modelo();

	#########################################################################################################################
	##################################### Variables a ejecutar en el procedimiento ##########################################
	#########################################################################################################################

	$Rut 			= "19455293-9";
	$NombreEmpresa 	= "Raicerk Incorporated prueba";
	$RazonSocial	= "Raicerk Incorporated";
	$IdIndustria	= "18";
	$IdEmpresa		= "4045";
	$TamanoEmpresa	= "1";
	$TipoEmpresa	= "2";
	$Region			= "13";
	$Comuna 		= "307";
	$Ciudad 		= "Santiago";
	$Direccion 		= "Lima 1141";
	$Telefono 		= "64890833";
	$Acceso 		= "4";
	$SitioWeb 		= "http://raicerk.cl";

	#########################################################################################################################
	###################################### Array de datos para ejecucion ####################################################
	#########################################################################################################################

	$datos = array(
					array('Variable'=>'@IdEmpresa'    	,'Valor'=> $IdEmpresa     	,'Tipo'=> SQLVARCHAR),
					array('Variable'=>'@Rut' 			,'Valor'=> $Rut 			,'Tipo'=> SQLVARCHAR),
					array('Variable'=>'@NombreEmpresa' 	,'Valor'=> $NombreEmpresa	,'Tipo'=> SQLVARCHAR),
					array('Variable'=>'@RazonSocial' 	,'Valor'=> $RazonSocial 	,'Tipo'=> SQLVARCHAR),
					array('Variable'=>'@IdIndustria'	,'Valor'=> $IdIndustria 	,'Tipo'=> SQLVARCHAR),
					array('Variable'=>'@TamanoEmpresa'  ,'Valor'=> $TamanoEmpresa   ,'Tipo'=> SQLVARCHAR),
					array('Variable'=>'@TipoEmpresa'    ,'Valor'=> $TipoEmpresa     ,'Tipo'=> SQLVARCHAR),
					array('Variable'=>'@IdRegion'    	,'Valor'=> $Region     		,'Tipo'=> SQLVARCHAR),
					array('Variable'=>'@IdComuna'    	,'Valor'=> $Comuna     		,'Tipo'=> SQLVARCHAR),
					array('Variable'=>'@Ciudad'    		,'Valor'=> $Ciudad     		,'Tipo'=> SQLVARCHAR),
					array('Variable'=>'@Direccion'    	,'Valor'=> $Direccion     	,'Tipo'=> SQLVARCHAR),
					array('Variable'=>'@Telefono'    	,'Valor'=> $Telefono     	,'Tipo'=> SQLVARCHAR),
					array('Variable'=>'@IdEntradaSitio' ,'Valor'=> $Acceso     		,'Tipo'=> SQLVARCHAR),
					array('Variable'=>'@SitioWeb'    	,'Valor'=> $SitioWeb     	,'Tipo'=> SQLVARCHAR)
	);

	#########################################################################################################################
	###################################### Funcion que ejecuta procedimiento ################################################
	#########################################################################################################################

	$estado = $modelo->query('NexoRSU', "spMod_NexoRSU_Empresa_ActualizaDatosEmpresa", $datos, "Boolean");


	#########################################################################################################################
	############################################ Validaciones de retorno ####################################################
	#########################################################################################################################

	if ($estado) {
		echo "El Raicerk lo a hecho otra vez!!!";
	}else{
		echo "No funco el experimiento!!!";
	}
?>

<!---->

<?php

	include_once('class.modelo.php');

	$modelo = new Modelo();

	#########################################################################################################################
	##################################### Variables a ejecutar en el procedimiento ##########################################
	#########################################################################################################################

	$TipoOferta	= "3";
	$Usuario 	= "dummy4";
	$desde 		= "1";
	$hasta 		= "50";

	#########################################################################################################################
	###################################### Array de datos para ejecucion ####################################################
	#########################################################################################################################

	$datos = array(
					array('Variable'=>'@TipoOferta'    	,'Valor'=> $TipoOferta     	,'Tipo'=> SQLVARCHAR),
					array('Variable'=>'@Usuario'		,'Valor'=> $Usuario 		,'Tipo'=> SQLVARCHAR),
					array('Variable'=>'@Desde' 			,'Valor'=> $desde			,'Tipo'=> SQLVARCHAR),
					array('Variable'=>'@Hasta'		 	,'Valor'=> $hasta 			,'Tipo'=> SQLVARCHAR),

	);

	#########################################################################################################################
	###################################### Funcion que ejecuta procedimiento ################################################
	#########################################################################################################################

	$data = $modelo->query('NexoRSU', "spRec_NexoRSU_Oferta_UltimasOfertas", $datos, "Data");

	#########################################################################################################################
	############################################ Validaciones de retorno ####################################################
	#########################################################################################################################

	echo "<table border = '1'>";
	foreach ($data as $campo) {
		echo "<tr>";
		echo "<td>".$campo['IdOferta']."</td>";
		echo "<td>".$campo['NombreEmpresa']."</td>";
		echo "<td>".$campo['Descripcion']."</td>";
		echo "<td>".$campo['Cargo']."</td>";
		echo "<tr>";
	}
?>

<!-- -->

<?php

	include_once('class.modelo.php');

	$modelo = new Modelo();

	#########################################################################################################################
	##################################### Variables a ejecutar en el procedimiento ##########################################
	#########################################################################################################################

	$Usuario 	= "jvmora";

	#########################################################################################################################
	###################################### Array de datos para ejecucion ####################################################
	#########################################################################################################################

	$datos = array(
					array('Variable'=>'@Usuario', 'Valor'=> $Usuario, 'Tipo'=> SQLVARCHAR),

	);

	#########################################################################################################################
	###################################### Funcion que ejecuta procedimiento ################################################
	#########################################################################################################################

	$data = $modelo->query('Portal', "spRec_Portal_Sap_DatosAlumno", $datos, "Data");

	#########################################################################################################################
	############################################ Validaciones de retorno ####################################################
	#########################################################################################################################

	echo "<table border = '1'>";
	foreach ($data as $campo) {
		echo "<tr>";
		echo "<td>".$campo['Nombre1']."</td>";
		echo "<td>".$campo['Nombre2']."</td>";
		echo "<td>".$campo['Apellido1']."</td>";
		echo "<td>".$campo['Apellido2']."</td>";
		echo "<td>".$campo['Rut']."</td>";
		echo "<tr>";
	}
?>