<?php

	#include_once('class.modelo.php');

	class Controlador {
		public function CreaSala(){
			#$modelo = new Modelo();
			$fecha = date("d-m-Y h:i:s");
			$sala = base64_encode($fecha);
			return $sala;
			##################################### Variables a ejecutar en el procedimiento ##########################################
			#$Rut 			= "19455293-9";
			#$NombreEmpresa 	= "Raicerk Incorporated prueba";
			###################################### Array de datos para ejecucion ####################################################
			#$datos = array(
			#				array('Variable'=>'@IdEmpresa'    	,'Valor'=> $IdEmpresa     	,'Tipo'=> SQLVARCHAR),
			#				array('Variable'=>'@Rut' 			,'Valor'=> $Rut 			,'Tipo'=> SQLVARCHAR),
			#);
			###################################### Funcion que ejecuta procedimiento ################################################
			#$estado = $modelo->query('NexoRSU', "spMod_NexoRSU_Empresa_ActualizaDatosEmpresa", $datos, "Boolean");
			############################################ Validaciones de retorno ####################################################
			#if ($estado) {
			#	echo "El Raicerk lo a hecho otra vez!!!";
			#}else{
			#	echo "No funco el experimiento!!!";
			#}
		}

		public function Otra(){
			$modelo = new Modelo();
			##################################### Variables a ejecutar en el procedimiento ##########################################
			$TipoOferta	= "3";
			$Usuario 	= "dummy4";
			$desde 		= "1";
			$hasta 		= "50";
			###################################### Array de datos para ejecucion ####################################################
			$datos = array(
							array('Variable'=>'@TipoOferta'    	,'Valor'=> $TipoOferta     	,'Tipo'=> SQLVARCHAR),
							array('Variable'=>'@Usuario'		,'Valor'=> $Usuario 		,'Tipo'=> SQLVARCHAR),
							array('Variable'=>'@Desde' 			,'Valor'=> $desde			,'Tipo'=> SQLVARCHAR),
							array('Variable'=>'@Hasta'		 	,'Valor'=> $hasta 			,'Tipo'=> SQLVARCHAR)
			);
			###################################### Funcion que ejecuta procedimiento ################################################
			$data = $modelo->query('NexoRSU', "spRec_NexoRSU_Oferta_UltimasOfertas", $datos, "Data");
			############################################ Validaciones de retorno ####################################################
			echo "<table border = '1'>";
			foreach ($data as $campo) {
				echo "<tr>";
				echo "<td>".$campo['IdOferta']."</td>";
				echo "<td>".$campo['NombreEmpresa']."</td>";
				echo "<td>".$campo['Descripcion']."</td>";
				echo "<td>".$campo['Cargo']."</td>";
				echo "<tr>";
			}
		}
	}

	
?>

