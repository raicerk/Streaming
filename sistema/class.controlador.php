<?php

	include 'class.modelo.php';

	class Controlador {
		
		public function CreaSala($IdMesa){
			
			$modelo = new Modelo();

			$fecha = date("Y-m-d");
			$hora = date("H:i:s");
			$sala = base64_encode(date("d-m-Y h:i:s"));
			$estado = 1;
			
			$modelo->IdMesa = $IdMesa;
			$modelo->NombreSala = $sala;
			$modelo->Fecha = $fecha;
			$modelo->Hora = $hora;
			$modelo->SalasEstado = $estado;

			$estado = $modelo->InsertaSala();

			if ($estado) {
				return $sala;
			}
		}
	}

	
?>

