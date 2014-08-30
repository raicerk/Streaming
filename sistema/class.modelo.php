<?php
include('class.constantes.php');

class Db{
 
    public function __get($property){
        if (property_exists($this, $property)){
            return $this->$property;
        }
    }
 
    public function __set($property, $value){
        if (property_exists($this, $property)){
            $this->$property = $value;
        }
    }
 
	protected function Conexion(){

		$conexion = new mysqli(constant('db_hostname'), constant('db_username'), constant('db_password'), constant('db_name'));
		if ($conexion->connect_errno) {
		    return "Fallo al contenctar a MySQL: (" . $conexion->connect_errno . ") " . $conexion->connect_error;
		}else{
			return $conexion;
		}	
	}
}

class Modelo extends Db{

	private $NombreSala;
	private $Fecha;
	private $Hora;
	private $Mesa;
 
    public function __get($property){
        if (property_exists($this, $property)){
            return $this->$property;
        }
    }
 
    public function __set($property, $value){
        if (property_exists($this, $property)){
            $this->$property = $value;
        }
    }


	public function InsertaSala(){

		$conexion = Db::Conexion();
		$sql = 'CALL InsertaSala(?, ?, ?, ?);';
	    $sentencia = $conexion->prepare($sql);
	 	$sentencia->bind_Param('sssss', $NombreSala,$Fecha,$Hora, $Mesa);

		$NombreSala 	= $this->NombreSala;
		$Fecha 			= $this->Fecha;
		$Hora 			= $this->Hora;
		$Mesa 			= $this->Mesa;
	    
	    if($sentencia->execute()){
	        $conexion->close();
	        $sentencia->close();
	        return true;
	    }else{
	        $conexion->close();
	        $sentencia->close();
	        return false;
	    }
	}
}

?>