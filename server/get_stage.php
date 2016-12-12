<?php
// return options for the production stage selectbox

require_once 'language.php';

extract($_GET);


$text = array();
$text[] = $LABELS[654];	// rolling			
$text[] = $LABELS[662];	// wrapping
$text[] = $LABELS[680];	// cutting
$text[] = $LABELS[681];	// storage
$text[] = $LABELS[692];	// stick appearance
$text[] = $LABELS[528];	// pack appearance
$text[] = $LABELS[708];	// sleeve/box appearance

$result = "";
foreach($text AS $key=>$val) {
	$result = sprintf("%s<option value='%s'>%s</option>", $result, $key, $val[$lang]);
}

echo json_encode($result);

?>