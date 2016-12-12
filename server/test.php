<?php

$fields = ['rol_l_min', 'rol_l_max', 'rol_c_min', 'rol_c_max', 'rol_w_min', 'rol_w_max', 'rol_p_min', 'rol_p_max', 'moist_s_min', 'moist_s_max'];
$cell = array_map(function($n) { return 'S'.$n; }, range(1, count($fields)) );
foreach ($fields AS $i=>$field)
	echo sprintf("%s: %s<br>", $cell[$i], $field);


?>