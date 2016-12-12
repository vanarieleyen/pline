<?php

// get the defects from the database and return it as options for a selectbox
// call: populate.php?type=defecttype

require_once 'Classes/pdo.php';

extract($_GET);

$database = new Database();

// make sure utf8 is stored and retrieved correctly
$database->beginTransaction();
$database->query("SET NAMES 'utf8'");
$database->execute();
$database->query("SET lc_time_names = 'zh_CN'");
$database->execute();

// get the defects
$query = sprintf("SELECT * FROM gwc_handmade.defectlabels WHERE type LIKE '%s%%' ", $type);
$database->query($query);
$rows = $database->resultset();

$database->endTransaction();

// return the option list
echo sprintf("<option value='%s'>%s</option>", "0", "---");
foreach ($rows AS $row) {
	echo sprintf("<option value='%s'>%s</option>", $row['code'], $row['text']);
}

?>