<?php

require_once 'Classes/pdo.php';

extract($_GET);

$readonly = 1;

$row = array();

if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
	$ip=$_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
	$ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
	$ip=$_SERVER['REMOTE_ADDR'];
}	

if (trim($pass) == '') {
	$guest = 1;
	$ok = true;
} else {
	$database = new Database();

	// make sure utf8 is stored and retrieved correctly
	$database->beginTransaction();
	$database->query("SET NAMES 'utf8'");
	$database->execute();
	$database->query("SET lc_time_names = 'zh_CN'");
	$database->execute();

	// get the user
	$query = "SELECT * FROM gwc_handmade.users WHERE BINARY login = :LOGIN ";	// use case sensitive search for login (BINARY keyword)
	$database->query($query);
	$database->bind(':LOGIN', $pass);
	$rec = $database->single();
	$count = $database->rowCount();
	$ok = ($count == 1);
	extract($rec);

	$database->endTransaction();

	$guest = 0;
}
$row['guest'] = $guest;

if ($ok && ($guest == 0)) {
	$query = "UPDATE gwc_handmade.users SET identity='".$ip."', `gebruik`=`gebruik`+1, date=NOW() WHERE id=".$id;
	$database->query($query);
	$database->execute();
}

if ($pass == "z0nnew1nde") {	// superuser
	$row['ok'] = true;
	$row['specs'] = '1';
	$row['formulas'] = '1'; 
	$row['admin'] = '1';
	$row['names'] = '1'; 
	$row['readonly'] = false; 
	$row['id'] = '-1';
	$row['guest'] = 0;
} else if ($guest == 0) {
	$row['readonly'] = $readonly;
	$row['ok'] = $ok;
	$row['specs'] = $specs;
	$row['formulas'] = $formulas; 
	$row['admin'] = $admin; 
	$row['names'] = $names; 
	$row['id'] = $id;
	$row['guest'] = 0;
} else {
	$row['guest'] = 1;
	$row['specs'] = 0;
	$row['formulas'] = 0;
	$row['names'] = 0;
	$row['ok'] = $ok;
}

echo json_encode($row);

?>