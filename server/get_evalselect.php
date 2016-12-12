<?php
// get all products, samplings and stages that where active in a certain period

require_once 'Classes/pdo.php';
require_once 'language.php';

extract($_GET);

$database = new Database();

// make sure utf8 is stored and retrieved correctly
$database->beginTransaction();
$database->query("SET NAMES 'utf8'");
$database->execute();
$database->query("SET lc_time_names = 'zh_CN'");
$database->execute();

$text = array();
$text["rolling"] = $LABELS[654][$lang];			
$text["wrapping"] = $LABELS[662][$lang];
$text["cutting"] = $LABELS[680][$lang];
$text["storage"] = $LABELS[681][$lang];	
$text["stickDefects"] = $LABELS[692][$lang];	
$text["packDefects"] = $LABELS[528][$lang];
$text["boxDefects"] = $LABELS[708][$lang];

$result = [];
$products = [];
$sampling = [];
$stage = ["rolling","wrapping","cutting","storage","stickDefects","packDefects","boxDefects"];

// set conditions
$prodCond = ($prod != "0") ? sprintf(" AND product='%s' ", $prod) : "";
$sampCond = ($samp != "0") ? sprintf(" AND name='%s' ", $samp) : "";

$ar1 = array("rolling","wrapping","cutting");		// tables that contain the name-field
$ar2 = array("storage","stickDefects","packDefects","boxDefects");	// tables without the name-field

if (!(array_search($step, $ar1) === false) || $step=='0') {
	$table = ($step != "0") ? array($step) : $ar1;
	foreach ($table AS $name) {
		$query = sprintf("SELECT * FROM gwc_handmade.%s WHERE DATE(date) BETWEEN '%s' AND '%s' %s%s", $name, $start, $end, $prodCond, $sampCond);
		$database->query($query);
		$rows = $database->resultset();
		if ($database->rowCount() > 0) {
			foreach ($rows AS $idx=>$row) {
				if (array_search(trim($row["product"]), $products) === false) 
					array_push($products, trim($row["product"]));
				if (array_search(trim($row["name"]), $sampling) === false)
					array_push($sampling, trim($row["name"]));
			}
		}
	}
}

if (!(array_search($step, $ar2) === false) || $step=='0') {
	$table = ($step != "0") ? array($step) : $ar2;
	foreach ($table AS $name) {
		$query = sprintf("SELECT * FROM gwc_handmade.%s WHERE DATE(date) BETWEEN '%s' AND '%s' %s", $name, $start, $end, $prodCond);
		$database->query($query);
		$rows = $database->resultset();
		if ($database->rowCount() > 0) {
			foreach ($rows AS $idx=>$row) {
				if (array_search(trim($row["product"]), $products) === false) 
					array_push($products, trim($row["product"]));
			}
		}
	}
}

$database->endTransaction();

$tmp = sprintf("<option value='%s'>%s</option>", "0", "---");
foreach ($stage AS $name) {
	if ($name == $step)
		$tmp = sprintf("%s<option value='%s' selected='selected'>%s</option>", $tmp, $name, $text[$name]);
	else 
		$tmp = sprintf("%s<option value='%s'>%s</option>", $tmp, $name, $text[$name]);
}
$result['stage'] = $tmp;

$tmp = sprintf("<option value='%s'>%s</option>", "0", "---");
foreach ($products AS $name) {
	if ($name == $prod)
		$tmp = sprintf("%s<option value='%s' selected='selected'>%s</option>", $tmp, $name, $name);
	else 
		$tmp = sprintf("%s<option value='%s'>%s</option>", $tmp, $name, $name);
}
$result['product'] = $tmp;

$tmp = sprintf("<option value='%s'>%s</option>", "0", "---");
foreach ($sampling AS $name) {
	if ($name == $samp)
		$tmp = sprintf("%s<option value='%s' selected='selected'>%s</option>", $tmp, $name, $name);
	else 
		$tmp = sprintf("%s<option value='%s'>%s</option>", $tmp, $name, $name);
}
$result['sampling'] = $tmp;

echo json_encode($result);

?>