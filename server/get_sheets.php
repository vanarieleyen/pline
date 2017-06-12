<?php

include 'Classes/pdo.php';

extract($_GET);

$database = new Database();

// make sure utf8 is stored and retrieved correctly
$database->beginTransaction();
$database->query("SET NAMES 'utf8'");
$database->execute();
$database->query("SET lc_time_names = 'zh_CN'");
$database->execute();

// set the conditions of the query
$condition = sprintf("DATE(date) BETWEEN '%s' AND '%s' ", $start, $end);
$condition = sprintf("%s%s", $condition, $prodstat=='0' ? "" : " AND t1.prodStat = '".$prodstat."' ");
$condition = sprintf("%s%s", $condition, $result=='0' ? "" : " AND t1.result = '".$result."' ");
$condition = sprintf("%s%s", $condition, $disposal=='0' ? "" : " AND t1.disposal = '".$disposal."' ");
$condition = sprintf("%s%s", $condition, $product=='---' ? "" : " AND t1.product = '".$product."' ");

// get field names for inspection table
$query = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'gwc_pline' AND TABLE_NAME = 'inspection' ";
$database->query($query);
$rows = $database->resultset();
$inspectionFields = ""; 
foreach ($rows AS $row) {
	$inspectionFields = sprintf("%st1.%s AS %s, ", $inspectionFields, $row['COLUMN_NAME'], $row['COLUMN_NAME']);
}
$inspectionFields = substr($inspectionFields, 0, -2);

// get field names for specs table
$query = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'gwc_pline' AND TABLE_NAME = 'specs' ";
$database->query($query);
$rows = $database->resultset();
$specFields = ""; 
foreach ($rows AS $row) {
	$specFields = sprintf("%st2.%s AS spec_%s, ", $specFields, $row['COLUMN_NAME'], $row['COLUMN_NAME']);
}
$specFields = substr($specFields, 0, -2);

// get field names for penalties table
$query = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'gwc_pline' AND TABLE_NAME = 'penalties' ";
$database->query($query);
$rows = $database->resultset();
$penaltyFields = ""; 
foreach ($rows AS $row) {
	$penaltyFields = sprintf("%st3.%s AS pen_%s, ", $penaltyFields, $row['COLUMN_NAME'], $row['COLUMN_NAME']);
}
$penaltyFields = substr($penaltyFields, 0, -2);

$query = sprintf("SELECT %s, %s, %s
						FROM gwc_pline.inspection t1 
						JOIN gwc_pline.specs t2 ON t1.date BETWEEN t2.start AND t2.end and t2.name=t1.product
						JOIN gwc_pline.penalties t3 ON t3.id=t1.penalties 	 	
						WHERE %s ORDER BY t1.date", $inspectionFields, $specFields, $penaltyFields, $condition);
$database->query($query);
$rows = $database->resultset();

$database->endTransaction();

echo json_encode($rows);
	

?>