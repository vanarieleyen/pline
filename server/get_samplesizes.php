<?php

require_once 'language.php';

extract($_GET);

echo sprintf("<option value='MEAS'>%s</option>", 	"Measurement");
echo sprintf("<option value='HOUR'>%s</option>", 	"Hour");
echo sprintf("<option value='DAY'>%s</option>", 	"Day");
echo sprintf("<option value='2'>%s</option>", 		"2");
echo sprintf("<option value='5'>%s</option>", 		"5");
echo sprintf("<option value='10'>%s</option>",		"10");
echo sprintf("<option value='20'>%s</option>",		"20");


?>
