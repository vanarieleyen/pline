<?php

require_once 'Classes/pdo.php';

// http://10.164.113.50:88/pline/ajax/get_prods.php

extract($_GET);

$database = new Database();

// make sure utf8 is stored and retrieved correctly
$database->beginTransaction();
$database->query("SET NAMES 'utf8'");
$database->execute();
$database->query("SET lc_time_names = 'zh_CN'");
$database->execute();

$query = "SELECT name FROM gwc_pline.specs WHERE DATE(end)='3000-01-01' ORDER BY name ";
$database->query($query);
$rows = $database->resultset();

$database->endTransaction();

// generate the option list
echo sprintf("<option value='/'>%s</option selected>", "---");
foreach ($rows AS $val) {
	$nr = $val['name'];
	if (trim($nr) != "") 
		echo sprintf("<option value='%s'>%s</option>", $nr, $nr);
}

?>