<?php
// get all products, status, results and disposals from a certain period

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

$disposalText = array();
$disposalText['1'] = array("按工艺要求反掺使用", "re-blend");
$disposalText['2'] = array("质管室组织评审", "to be reviewed");

$prodstatText = array();
$prodstatText['1'] = array("正常生产", "Normal Production");
$prodstatText['2'] = array("试制产品", "Trial Production");

$resultText = array();
$resultText['1'] = array("合格", "Qualified");
$resultText['2'] = array("不合格", "Rejected");
$resultText['3'] = array("待判", "To be judged");

$productsFound = [];
$prodStatFound = [];
$resultFound = [];
$disposalFound = [];


// set conditions
$productCond = ($product != "0") ? sprintf(" AND product='%s' ", $product) : "";
$prodStatCond = ($prodStat != "0") ? sprintf(" AND prodStat='%s' ", $prodStat) : "";
$resultCond = ($result != "0") ? sprintf(" AND result='%s' ", $result) : "";
$disposalCond = ($disposal != "0") ? sprintf(" AND disposal='%s' ", $disposal) : "";

$query = sprintf("SELECT * FROM gwc_pline.inspection WHERE DATE(date) BETWEEN DATE('%s') AND DATE('%s') %s%s%s%s ", 
										$start, $end, $productCond, $prodStatCond, $resultCond, $disposalCond);

$database->query($query);
$rows = $database->resultset();
if ($database->rowCount() > 0) {
	foreach ($rows AS $idx=>$row) {
		$val = trim($row["product"]);
		if (array_search($val, $productsFound) === false) {
			array_push($productsFound, $val);
		} 
			
		$val = trim($row["prodStat"]);
		if (array_search($val, $prodStatFound) === false) {
			if (intval($val) == $val && $val >0) 
				array_push($prodStatFound, $val);
		} 		

		$val = trim($row["result"]);
		if (array_search($val, $resultFound) === false) {
			if (intval($val) == $val && $val >0) 
				array_push($resultFound, $val);
		} 

		$val = trim($row["disposal"]);
		if (array_search($val, $disposalFound) === false) {
			if (intval($val) == $val && $val >0) 
				array_push($disposalFound, $val);
		} 
	}
}

$database->endTransaction();

$output = [];

$tmp = sprintf("<option value='%s'>%s</option>", "0", "---");
foreach ($productsFound AS $name) {
	if ($name == $product)
		$tmp = sprintf("%s<option value='%s' selected='selected'>%s</option>", $tmp, $name, $name);
	else 
		$tmp = sprintf("%s<option value='%s'>%s</option>", $tmp, $name, $name);
}
$output['product'] = $tmp;

$tmp = sprintf("<option value='%s'>%s</option>", "0", "---");
foreach ($prodStatFound AS $name) {
	if ($name == $prodStat)
		$tmp = sprintf("%s<option value='%s' selected='selected'>%s</option>", $tmp, $name, $prodstatText[$name][$lang]);
	else 
		$tmp = sprintf("%s<option value='%s'>%s</option>", $tmp, $name, $prodstatText[$name][$lang]);
}
$output['prodStat'] = $tmp;

$tmp = sprintf("<option value='%s'>%s</option>", "0", "---");
foreach ($resultFound AS $name) {
	if ($name == $result)
		$tmp = sprintf("%s<option value='%s' selected='selected'>%s</option>", $tmp, $name, $resultText[$name][$lang]);
	else 
		$tmp = sprintf("%s<option value='%s'>%s</option>", $tmp, $name, $resultText[$name][$lang]);
}
$output['result'] = $tmp;

$tmp = sprintf("<option value='%s'>%s</option>", "0", "---");
foreach ($disposalFound AS $name) {
	if ($name == $disposal)
		$tmp = sprintf("%s<option value='%s' selected='selected'>%s</option>", $tmp, $name, $disposalText[$name][$lang]);
	else 
		$tmp = sprintf("%s<option value='%s'>%s</option>", $tmp, $name, $disposalText[$name][$lang]);
}
$output['disposal'] = $tmp;

echo json_encode($output);

?>