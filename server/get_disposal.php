<?php
// return disposal labels for filling options in selectbox

extract($_GET);

$text = array();
$text[] = array("---", "---");
$text[] = array("按工艺要求反掺使用", "re-blend");
$text[] = array("质管室组织评审", "to be reviewed");

foreach($text AS $key=>$val) {
	echo sprintf("<option value='%s'>%s</option>", $key, $val[$lang], $key==0 ? "selected":"");
}

?>
