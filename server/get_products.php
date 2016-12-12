<?php

// get the productnames from the database and return it as options for a selectbox

require_once 'Classes/pdo.php';

$database = new Database();

// make sure utf8 is stored and retrieved correctly
$database->beginTransaction();
$database->query("SET NAMES 'utf8'");
$database->execute();
$database->query("SET lc_time_names = 'zh_CN'");
$database->execute();

// get the latest products
$query = "SELECT name FROM gwc_handmade.specs WHERE DATE(end)='3000-01-01' ORDER BY name ";
$database->query($query);
$rows = $database->resultset();

$database->endTransaction();

// return the option list
echo sprintf("<option value='%s'>%s</option>", "0", "---");
foreach ($rows AS $row) {
	echo sprintf("<option value='%s'>%s</option>", $row['name'], $row['name']);
}

?>