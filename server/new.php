<?php


require_once 'Classes/pdo.php';

extract($_GET);

$database = new Database();
 
// make sure utf8 is stored and retrieved correctly
$database->beginTransaction();
$database->query("SET NAMES 'utf8'");
$database->execute();
$database->query("SET lc_time_names = 'zh_CN'");
$database->execute();

if ($table == "gwc_handmade.specs")
	$query = sprintf("INSERT INTO %s (date, start) VALUES(NOW(), NOW())", $table);
else	
	$query = sprintf("INSERT INTO %s (date) VALUES(NOW())", $table);
		
$database->query($query);	
$database->execute();
$id = $database->lastInsertId();

$database->endTransaction();

$result = array();
$result['id'] = $id;
echo json_encode($result);

?>