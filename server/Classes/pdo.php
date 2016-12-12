<?php

http://culttt.com/2012/10/01/roll-your-own-pdo-php-class/

// needs config.ini (with login details) in the parent folder of the document root

class Database{
	private $dbh;
	private $error;
	private $stmt;
	private $params;

	public function __construct(){
		$path = realpath($_SERVER['DOCUMENT_ROOT']."/..");
		$config = parse_ini_file($path.'/config.ini');

		// Set DSN
		$dsn = 'mysql:host=' . $config['host'] . ';dbname=' . $config['db'];
		// Set options
		$options = array(
			PDO::ATTR_PERSISTENT    => true,
			PDO::ATTR_ERRMODE       => PDO::ERRMODE_EXCEPTION
		);
		// Create a new PDO instanace
		try{
			$this->dbh = new PDO($dsn, $config['login'], $config['password'], $options);
		}
		// Catch any errors
		catch(PDOException $e){
			$this->error = $e->getMessage();
		}
		$this->params = array();	// array with bound parameters
	}
	
    public function __destruct() {
        unset($this);
    } 

	// returns the constructed query with values
	// can be used in a mysql query to check if the query is ok
	public function getQuery($query) {
		$params = $this->params; 
		return str_replace(array_keys($params), array_values($params), $query);
	}
	
	public function query($query){
		$this->params = array();	// clear the params array (for debugging purpose)
		$this->stmt = $this->dbh->prepare($query);
	}

	public function bind($param, $value, $type = null){
		if (is_null($type)) {
			switch (true) {
				case is_int($value):
					$type = PDO::PARAM_INT;
					break;
				case is_bool($value):
					$type = PDO::PARAM_BOOL;
					break;
				case is_null($value):
					$type = PDO::PARAM_NULL;
					break;
				default:
					$type = PDO::PARAM_STR;
			}
		}
		$this->stmt->bindValue($param, $value, $type);
		$this->params[$param] = $value;
	}
	
	public function execute(){
		return $this->stmt->execute();
	}
	
	public function resultset(){
		$this->execute();
		return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	public function single(){
		$this->execute();
		return $this->stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function rowCount(){
		return $this->stmt->rowCount();
	}

	public function lastInsertId(){
		return $this->dbh->lastInsertId();
	}

	public function beginTransaction(){
		return $this->dbh->beginTransaction();
	}
	
	public function endTransaction(){
		return $this->dbh->commit();
	}

	public function cancelTransaction(){
		return $this->dbh->rollBack();
	}

	public function debugDumpParams(){
		return $this->stmt->debugDumpParams();
	}

}

?>