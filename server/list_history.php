<?php

require_once 'Classes/pdo.php';

$database = new Database();

// make sure utf8 is stored and retrieved correctly
$database->beginTransaction();
$database->query("SET NAMES 'utf8'");
$database->execute();
$database->query("SET lc_time_names = 'zh_CN'");
$database->execute();

extract($_GET);

if ($page < 0)
	return;


// paging
$start = $page*$length;
$limit = " LIMIT ". $start .", ". $length;

$fields = "id, date, batchNr, product, score, result";
$column = explode(", ", $fields);		// extract the column names from the $fields

// sorting
$order = sprintf(" ORDER BY %s %s ", $column[$sort+1], $direction);

// list the fields and make them sortable
$selection = "id, date, batchNr*1 AS batchNr, product, score*1.0 AS score, (result%3+result) AS result";

$query = sprintf("SELECT %s FROM gwc_pline.inspection WHERE 1 %s %s", $selection, $order, $limit);
$database->query($query);
$rows = $database->resultset();

$output = array();

foreach ($rows as $aRow) {
	$regel = "<tr>";
	
	foreach ($column AS $field) {
		if ($field =='result') {		// make the result column a coloured block
			switch ($aRow[$field]) {
				case 2: $status = "greenBackground";	break;
				case 3: $status = "orangeBackground"; break;
				case 4: $status = "redBackground";		break;
				default: $status= "";
			}
			$txt = sprintf("<center><span class='%s'>%s</span></center>", $status, str_pad("", 5, "_", STR_PAD_BOTH));
			$regel = sprintf("%s<td>%s</td>", $regel, str_replace("_", "&nbsp;&nbsp;", $txt));  
		} elseif ($field =='score') {
			$score = $aRow['score'];
			$regel = sprintf("%s<td><center><span class='%s'>%s</span></center></td>", $regel, $score<95?'red':($score<97?'orange':'green' ), $score);
		} elseif ($field =='id') {
			$regel = sprintf("%s<td style='display:none'>%s</td>", $regel, $aRow['id']);			
		} else {
			$regel = sprintf('%s<td><center>%s</center></td>', $regel, $aRow[$field]);
		}
	}

	$regel .= "</tr>";
	$output['records'][] = $regel;
}

$database->endTransaction();

$output["crc"] = md5($regel);

echo json_encode( $output );

?>