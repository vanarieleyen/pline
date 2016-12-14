<?php
// return production status labels for filling options in selectbox

extract($_GET);

$text = array();
$text[] = array("---", "---");
$text[] = array("正常生产", "Normal Production");
$text[] = array("试制产品", "Trial Production");

foreach($text AS $key=>$val) {
	echo sprintf("<option value='%s'>%s</option>", $key, $val[$lang], $key==0 ? "selected":"");
}

?>
