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

$query = "SELECT * FROM gwc_pline.names";
$database->query($query);
$row = $database->single();

$database->endTransaction();

$names = explode(PHP_EOL, $row['inspector']);

// generate the option list
echo sprintf("<option value='---'>%s</option selected>", "---");
foreach ($names AS $val) {
	if (trim($val) != "") 
		echo sprintf("<option value='%s'>%s</option>", $val, $val);
}

?>
