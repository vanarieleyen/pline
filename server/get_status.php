<?php
// return status labels for filling options in selectbox

extract($_GET);

$text = array();
$text[] = array("---", "---");
$text[] = array("合格", "Qualified");
$text[] = array("不合格", "Rejected");

foreach($text AS $key=>$val) {
	echo sprintf("<option value='%s'>%s</option>", $key, $val[$lang], $key==0 ? "selected":"");
}

?>
