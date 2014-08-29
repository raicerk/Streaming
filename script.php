<?php
include 'sistema/class.controlador.php';

$opcion = $_POST['accion'];

switch ($opcion) {
	case 'CreaSala':
		$controlador = new Controlador();
		echo $controlador->CreaSala();
	break;
	
	default:
		# code...
	break;
}


?>