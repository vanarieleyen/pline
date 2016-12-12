<?php

require_once 'Classes/pdo.php';

$database = new Database();

// make sure utf8 is stored and retrieved correctly
$database->beginTransaction();
$database->query("SET NAMES 'utf8'");
$database->execute();
$database->query("SET lc_time_names = 'zh_CN'");
$database->execute();

// set table and field names with corresponding label
$fields = "id, date, name, gebruik";

$column = explode(", ", $fields);															// extract the column names from the $fields

$query = sprintf("SELECT %s	FROM gwc_handmade.users ORDER BY id DESC", $fields);
$database->query($query);
$rows = $database->resultset();

foreach ($rows as $aRow) {
	$regel = "<tr>";
	foreach ($column AS $field) {
		$regel = sprintf("%s<td><center>%s</center></td>", $regel, $aRow[$field]);
	}
	$regel .= "</tr>";
	$output['records'][] = $regel;
}

$database->endTransaction();

echo json_encode( $output );
	

?>