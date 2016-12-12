<?php
// return inspector names for filling options in selectbox

require_once 'Classes/pdo.php';

extract($_GET);

$database = new Database();

// make sure utf8 is stored and retrieved correctly
$database->beginTransaction();
$database->query("SET NAMES 'utf8'");
$database->execute();
$database->query("SET lc_time_names = 'zh_CN'");
$database->execute();
$database->endTransaction();

$query = "SELECT * FROM gwc_handmade.names";
$database->query($query);
$row = $database->single();

$inspectors = explode(PHP_EOL, $row['inspector']);
$sampling = explode(PHP_EOL, $row['name']);
$incharge = explode(PHP_EOL, $row['incharge']);

$result = array();

// generate the option list
$temp = sprintf("<option value='---'>%s</option selected>", "---");
foreach ($inspectors AS $val) {
	if (trim($val) != "") 
		$temp = sprintf("%s<option value='%s'>%s</option>", $temp, $val, $val);
}
$result['inspectors'] = $temp;

$temp = sprintf("<option value='---'>%s</option selected>", "---");
foreach ($sampling AS $val) {
	if (trim($val) != "") 
		$temp = sprintf("%s<option value='%s'>%s</option>", $temp, $val, $val);
}
$result['sampling'] = $temp;

$temp = sprintf("<option value='---'>%s</option selected>", "---");
foreach ($incharge AS $val) {
	if (trim($val) != "") 
		$temp = sprintf("%s<option value='%s'>%s</option>", $temp, $val, $val);
}
$result['incharge'] = $temp;

echo json_encode($result);

?>