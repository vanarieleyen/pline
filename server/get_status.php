<?php
// return status labels for filling options in deworm (storage.php) selectbox

extract($_GET);

$text = array();
$text[] = array("无", "None");
$text[] = array("生霉", "Mildew");
$text[] = array("虫蛀", "Moth");


foreach($text AS $key=>$val) {
	echo sprintf("<option value='%s'>%s</option>", $key, $val[$lang]);
}

?>