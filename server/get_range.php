<?php

require_once 'Classes/pdo.php';

extract($_GET);

$database = new Database();

$database->beginTransaction();

// make sure utf8 is stored and retrieved correctly
$database->query("SET NAMES 'utf8'");
$database->execute();
$database->query("SET lc_time_names = 'zh_CN'");
$database->execute();

$database->query($query);
$rows = $database->resultset();

$result = array();
$result['count'] = $database->rowCount();
foreach ($rows AS $val) {
	$result[] = array('row' => $val);
}
echo json_encode($result);

$database->endTransaction();

?>