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

$nr = (isset($nr)) ? $nr-1 : 0;

if (!isset($query)) {
	if (isset($value))
		$query = "SELECT * FROM ".$table." WHERE ".$field." = ".$value." ORDER BY id ASC LIMIT ".$nr.", 1 ";
	else
		$query = "SELECT * FROM ".$table." ORDER BY id ASC LIMIT ".$nr.", 1 ";
} else {
	$query = urldecode($query);	
}

$database->query($query);
//echo $database->getQuery($query);	return;
try {
	$result = $database->resultset();
} catch(PDOException $exception) {
	echo $exception->getMessage();
}

$row = array();
$row = $result[0];
$row['debug'] = $query;
$row['rowcount'] = $database->rowCount();
$row['row'] = $result;

$database->endTransaction();

echo json_encode($row);
?>
