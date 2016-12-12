<?php

include 'Classes/pdo.php';

extract($_GET);

//echo $query;

$database = new Database();

$database->beginTransaction();

// make sure utf8 is stored and retrieved correctly
$database->query("SET NAMES 'utf8'");
$database->execute();
$database->query("SET lc_time_names = 'zh_CN'");
$database->execute();

$database->query($query);
if ($database->execute() == false)
	$id = 'error';
else
	$id = $database->lastInsertId();	// only used when there was an insert

$database->endTransaction();

$result = Array();
$result['id'] = $id;
echo json_encode($result);

?>