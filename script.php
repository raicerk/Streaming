<?php
include 'sistema/class.controlador.php';

$opcion = $_POST['accion'];

switch ($opcion) {
	case 'CreaSala':
		$controlador = new Controlador();
		echo $controlador->CreaSala($_POST['IdMesa']);
	break;
	
	default:
		# code...
	break;
}


?>