<?php

// http://localhost/handmade/server/get_history.php?lang=1&tab=rolling_sub_tab

require_once 'Classes/pdo.php';

$database = new Database();

// make sure utf8 is stored and retrieved correctly
$database->beginTransaction();
$database->query("SET NAMES 'utf8'");
$database->execute();
$database->query("SET lc_time_names = 'zh_CN'");
$database->execute();

extract($_GET);

// set table and field names with corresponding label
switch ($tab) {
	case "rolling_sub_tab":
	case "wrapping_sub_tab":
	case "cutting_sub_tab":
		$fields = "id, date, product, name, score, quality, inspector";
		break;
	case "storage_sub_tab":
		$fields = "id, date, product, incharge, score, quality, inspector";
		break;
	case "defects_sub_tab":
		$fields = "id, date, product, sample, judge, score, inspector";
		break;
	default:
		echo "unknown tab";
		return;
}

$column = explode(", ", $fields);		
											// extract the column names from the $fields
$table = sprintf("gwc_handmade.%s", explode("_", $tab)[0]);		// get the tablename from the $tab-name

if ($table == "gwc_handmade.defects") {		// er zijn 3 defects tables..
	$type = ["stickDefects", "packDefects", "boxDefects"];
	$table = sprintf("gwc_handmade.%s", $type[$defects]);	
}


$query = sprintf("SELECT %s	FROM %s ORDER BY id DESC", $fields, $table);
$database->query($query);
// echo $database->getQuery($query); return;
$rows = $database->resultset();

$output = array();

foreach ($rows as $aRow) {
	$regel = "<tr>";
	foreach ($column AS $field) {
		if (strstr($field, "score")) {
			$score = $aRow[$field];
			$txt = sprintf("<center><span class='%s'>%s</span></center>", $score<95?'red':($score<97?'orange':'green' ), $score);
			$regel = sprintf("%s<td>%s</td>", $regel, $txt);
		} elseif ($field =='id') {
			$regel = sprintf("%s<td style='display:none'>%s</td>", $regel, $aRow[$field]);
		} else {
			$regel = sprintf("%s<td><center>%s</center></td>", $regel, $aRow[$field]);
		}
	}
	$regel .= "</tr>";
	$output['records'][] = $regel;
}

$database->endTransaction();

echo json_encode( $output );

?>