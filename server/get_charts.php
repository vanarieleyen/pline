<?php

// get the product names from the database and return it as options for a selectbox
// call: get_products.php?start=2016-03-10&end=2016-03-19

require_once realpath($_SERVER['DOCUMENT_ROOT']).'/ajax/language.php';

extract($_GET);
									
echo sprintf("<option value='regain1'>%s</option>", 	$LABELS[610][$lang]);
echo sprintf("<option value='regain2'>%s</option>", 	$LABELS[611][$lang]);
echo sprintf("<option value='cylheat'>%s</option>", 	$LABELS[620][$lang]);
echo sprintf("<option value='drying'>%s</option>", 	$LABELS[621][$lang]);
echo sprintf("<option value='blend'>%s</option>", 		$LABELS[630][$lang]);
echo sprintf("<option value='flavor'>%s</option>",		$LABELS[622][$lang]);

?>
