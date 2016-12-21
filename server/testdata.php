<?php

// generates a test product with 3 spec periods (3 months in the past)
// generates test data with data for every hour / 90 days
// the product is called 'test' and automatically removed and populated with random data
// http://192.168.56.10/pline/server/testdata.php

require_once 'Classes/pdo.php';

extract($_GET);

$database = new Database();

// make sure utf8 is stored and retrieved correctly
$database->beginTransaction();
$database->query("SET NAMES 'utf8'");
$database->execute();
$database->query("SET lc_time_names = 'zh_CN'");
$database->execute();

// return random number distributed in a bell curve (to get real-looking random data)
// min/max: upper lower limit
// std_deviation: width of the curve (3 is rather good)
// step: array index increment when storing the result in an array
function purebell($min,$max,$std_deviation,$step=1) {
	$rand1 = (float)mt_rand()/(float)mt_getrandmax();
	$rand2 = (float)mt_rand()/(float)mt_getrandmax();
	$gaussian_number = sqrt(-2 * log($rand1)) * cos(2 * M_PI * $rand2);
	$mean = ($max + $min) / 2;
	$random_number = ($gaussian_number * $std_deviation) + $mean;
	$random_number = round($random_number / $step) * $step;
	if($random_number < $min || $random_number > $max) {
		$random_number = purebell($min, $max,$std_deviation);
	}
  return $random_number;
}

/*
for ($i = 0; $i < 100; $i++) {
	echo purebell(0,100,3)." ";
}
return;
*/

// remove test product from specs and data
$database->query("DELETE FROM gwc_pline.specs WHERE name='test' ");		
$database->execute();
$database->query("DELETE FROM gwc_pline.inspection WHERE product='test' ");
$database->execute();

// insert test specs of 3 time periods
$sql = "INSERT INTO gwc_pline.specs (name, start, end, pid, 
	1_matinMoistMin, 1_matinMoistMax, 1_matoutMoistMin, 1_matoutMoistMax, 1_matoutTempMin, 1_matoutTempMax,
	2_matinMoistMin, 2_matinMoistMax, 2_matoutMoistMin, 2_matoutMoistMax, 2_matoutTempMin, 2_matoutTempMax,
	cyl_matinMoistMin, cyl_matinMoistMax, cyl_matoutMoistMin, cyl_matoutMoistMax, cyl_matoutTempMin, cyl_matoutTempMax)  
		VALUES('test', DATE_SUB(NOW(), INTERVAL 30 DAY), '3000-01-01 00:00:00', 88888888,
		20, 22, 15, 17, 30, 35, 16, 18, 12, 12.5, 20, 25, 14, 15, 13, 13.5, 22, 25 ) ";
$database->query($sql);
$database->execute();

$sql = "INSERT INTO gwc_pline.specs (name, start, end, pid, 
	1_matinMoistMin, 1_matinMoistMax, 1_matoutMoistMin, 1_matoutMoistMax, 1_matoutTempMin, 1_matoutTempMax,
	2_matinMoistMin, 2_matinMoistMax, 2_matoutMoistMin, 2_matoutMoistMax, 2_matoutTempMin, 2_matoutTempMax,
	cyl_matinMoistMin, cyl_matinMoistMax, cyl_matoutMoistMin, cyl_matoutMoistMax, cyl_matoutTempMin, cyl_matoutTempMax) 
		VALUES('test', DATE_SUB(NOW(), INTERVAL 60 DAY), DATE_SUB(NOW(), INTERVAL 30 DAY), 88888888, 
		22, 24, 16, 18, 31, 36, 17, 19, 12.5, 13.5, 22, 27, 13, 14, 12, 12.5, 20, 22 ) ";
$database->query($sql);
$database->execute();

$sql = "INSERT INTO gwc_pline.specs (name, start, end, pid, 
	1_matinMoistMin, 1_matinMoistMax, 1_matoutMoistMin, 1_matoutMoistMax, 1_matoutTempMin, 1_matoutTempMax,
	2_matinMoistMin, 2_matinMoistMax, 2_matoutMoistMin, 2_matoutMoistMax, 2_matoutTempMin, 2_matoutTempMax,
	cyl_matinMoistMin, cyl_matinMoistMax, cyl_matoutMoistMin, cyl_matoutMoistMax, cyl_matoutTempMin, cyl_matoutTempMax) 
		VALUES('test', DATE_SUB(NOW(), INTERVAL 90 DAY), DATE_SUB(NOW(), INTERVAL 60 DAY), 88888888, 
		19, 21, 14, 16, 29, 34, 15, 17, 11, 13, 19, 24, 11, 12, 13, 14, 21, 22 ) ";
$database->query($sql);
$database->execute();

function generate($specmin, $specmax, $date) {
	global $database;
	
	$sql = sprintf("SELECT * FROM gwc_pline.specs WHERE DATE('%s') BETWEEN start AND end AND name='test' ", $date);
	$database->query($sql);
	$spec = $database->single();
	
	$ll = 100*$spec[$specmin];
	$ul = 100*$spec[$specmax];
	$ll = $ll-($ll/100*rand(1, 10));
	$ul = $ul+($ul/100*rand(1, 10));
	
	return purebell($ll, $ul, 3)/100;
}


$amount = 90 * 24;		// 90 days, 24 hours
for ($i = 0; $i < $amount; $i++) {
	
	$t = new DateTime();
	$t->sub( new DateInterval( sprintf('PT%sH', $i) ));
	$date = $t->format('Y-m-d H:m:s');
	
	$matin_1a = generate("1_matinMoistMin", "1_matinMoistMax", $date);
	$matin_1b = generate("1_matinMoistMin", "1_matinMoistMax", $date);
	$matout_1a = generate("1_matoutMoistMin", "1_matoutMoistMax", $date);
	$matout_1b = generate("1_matoutMoistMin", "1_matoutMoistMax", $date);
	$matemp_1a = generate("1_matoutTempMin", "1_matoutTempMax", $date);
	$matemp_1b = generate("1_matoutTempMin", "1_matoutTempMax", $date);

	$matin_2a = generate("2_matinMoistMin", "2_matinMoistMax", $date);
	$matin_2b = generate("2_matinMoistMin", "2_matinMoistMax", $date);
	$matout_2a = generate("2_matoutMoistMin", "2_matoutMoistMax", $date);
	$matout_2b = generate("2_matoutMoistMin", "2_matoutMoistMax", $date);
	$matemp_2a = generate("2_matoutTempMin", "2_matoutTempMax", $date);
	$matemp_2b = generate("2_matoutTempMin", "2_matoutTempMax", $date);
	
	$cylin_a = generate("cyl_matinMoistMin", "cyl_matinMoistMax", $date);
	$cylout_a = generate("cyl_matoutMoistMin", "cyl_matoutMoistMax", $date);
	$cyltemp_a = generate("cyl_matoutTempMin", "cyl_matoutTempMax", $date);
	$cylin_b = generate("cyl_matinMoistMin", "cyl_matinMoistMax", $date);
	$cylout_b = generate("cyl_matoutMoistMin", "cyl_matoutMoistMax", $date);
	$cyltemp_b = generate("cyl_matoutTempMin", "cyl_matoutTempMax", $date);
	
	$sql = sprintf("INSERT INTO gwc_pline.inspection 
				(date, product, 
				1_matinMoistA, 1_matinMoistB, 1_matoutMoistA, 1_matoutMoistB, 1_matoutTempA, 1_matoutTempB,
				2_matinMoistA, 2_matinMoistB, 2_matoutMoistA, 2_matoutMoistB, 2_matoutTempA, 2_matoutTempB,
				cyl_matinMoistA, cyl_matinMoistB, cyl_matoutMoistA, cyl_matoutMoistB, cyl_matoutTempA, cyl_matoutTempB) 
					VALUES('%s','test',%s,%s,%s,%s,%s,%s, %s,%s,%s,%s,%s,%s, %s,%s,%s,%s,%s,%s)",
					$date, 
					$matin_1a, $matin_1b, $matout_1a, $matout_1b, $matemp_1a, $matemp_1b,
					$matin_2a, $matin_2b, $matout_2a, $matout_2b, $matemp_2a, $matemp_2b,
					$cylin_a, $cylin_b, $cylout_a, $cylout_b, $cyltemp_a, $cyltemp_b);

	$database->query($sql);
	$database->execute();
}



$database->endTransaction();


?>