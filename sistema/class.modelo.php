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
 
	protected function AbrirConexion($NombreConexion){
		switch ($NombreConexion) {
			case 'NexoRSU':
				try{
					$conn=mssql_connect(constant('db_hostnameRSU'),constant('db_usernameRSU'),constant('db_passwordRSU')) ;
					$res = mssql_select_db(constant('db_nameRSU'),$conn);
					return $conn;
				}catch(Exception $ex){
					throw new Exception ("La conexión al servidor a fallado..");
				}
			break;
			
			default:
				# code...
			break;
		}
	}

	protected function CerrarConexion($Conexion){
		if(isset($Conexion) ){
			mssql_close($Conexion);
			unset($Conexion);
		}
	}

}

class Modelo extends Db{
 
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


	public function query($NombreConexion , $Procedimiento, $array_variables , $TipoRetorno){

		$Conexion = Db::AbrirConexion($NombreConexion);

		if ($TipoRetorno == "Boolean") {
			$procedure = mssql_init($Procedimiento, $Conexion);
			foreach ($array_variables as $variable) {
				$total = "";
				foreach ($variable as $key => $value) {
					$total .= $value.",";
				}
				$seccion = explode(",", $total);
				mssql_bind($procedure, $seccion[0], $seccion[1], $seccion[2]);
			}
			$estado = mssql_execute($procedure);
			if ($estado) {
				return true;
			}else{
				return false;
			}
			Bd::CerrarConexion($Conexion);
		}

		if ($TipoRetorno == "Data") {
			$procedure = mssql_init($Procedimiento, $Conexion);
			foreach ($array_variables as $variable) {
				$total = "";
				foreach ($variable as $key => $value) {
					$total .= $value.",";
				}
				$seccion = explode(",", $total);
				mssql_bind($procedure, $seccion[0], $seccion[1], $seccion[2]);
			}
			$resultado = mssql_execute($procedure);
			$array = array();
			while ($row = mssql_fetch_array($resultado)) {
				$array[] = $row;
			}
			return $array;
			Bd::CerrarConexion($Conexion);
		}
	}
}

?>