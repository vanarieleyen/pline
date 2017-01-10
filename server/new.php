<?php


require_once 'Classes/pdo.php';

extract($_GET);

$database = new Database();
 
// make sure utf8 is stored and retrieved correctly
$database->beginTransaction();
$database->query("SET NAMES 'utf8'");
$database->execute();
$database->query("SET lc_time_names = 'zh_CN'");
$database->execute();


switch ($table) {
	case "gwc_pline.specs":
		$query = sprintf("INSERT INTO %s (start) VALUES(NOW())", $table);
		$database->query($query);	
		$database->execute();
		$id = $database->lastInsertId();
		break;
	case "gwc_pline.inspection":
		$database->query("INSERT INTO gwc_pline.inspection (date) VALUES(NOW())");		// create new inspection record
		$database->execute();
		$id = $database->lastInsertId();
		
		$database->query("INSERT INTO gwc_pline.penalties (master) VALUES(:ID)");		// create new penalties record
		$database->bind(":ID", $id);
		$database->execute();
		$penalties_id = $database->lastInsertId();
		
		$database->query("UPDATE gwc_pline.inspection SET penalties=:PENID WHERE id=:ID");	// link inspection to penalties
		$database->bind(":ID", $id);
		$database->bind(":PENID", $penalties_id);
		$database->execute();

		break;
	default:
		$query = sprintf("INSERT INTO %s (date) VALUES(NOW())", $table);
		$database->query($query);	
		$database->execute();
		$id = $database->lastInsertId();
		break;
}

$database->endTransaction();

$result = array();
$result['id'] = $id;
echo json_encode($result);

?>