<?php

// get the group names for the charts

require_once 'language.php';

extract($_GET);
									
echo sprintf("<option value='regain1'>%s</option>", 	$LABELS[610][$lang]);
echo sprintf("<option value='regain2'>%s</option>", 	$LABELS[611][$lang]);
echo sprintf("<option value='cylheat'>%s</option>", 	$LABELS[620][$lang]);
echo sprintf("<option value='drying'>%s</option>", 	$LABELS[621][$lang]);
echo sprintf("<option value='blend'>%s</option>", 		$LABELS[630][$lang]);
echo sprintf("<option value='flavor'>%s</option>",		$LABELS[622][$lang]);

?>
