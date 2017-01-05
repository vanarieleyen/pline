<?php

// get the choices of the charts

require_once 'language.php';

extract($_GET);

//echo $group;
switch ($group) {
	case "regain1":
	case "regain2":
	case "cylheat":
		echo sprintf("<option value='matinmoist'>%s</option>", 	$LABELS[612][$lang]);
	case "drying":
		echo sprintf("<option value='matouttemp'>%s</option>", 	$LABELS[614][$lang]);
	case "flavor":
		echo sprintf("<option value='matoutmoist'>%s</option>", $LABELS[613][$lang]);
		break;
	case "blend":
		echo sprintf("<option value='moisture'>%s</option>", 		$LABELS[631][$lang]);
}

?>
