<?php

// fill the database with test data
// args:	product: product to use
// 				amount: amount to generate
// http://192.168.56.10/pline/server/filltestdata.php?product=test&amount=1000

require_once 'Classes/pdo.php';

extract($_GET);

$database = new Database();

// make sure utf8 is stored and retrieved correctly
$database->beginTransaction();
$database->query("SET NAMES 'utf8'");
$database->execute();
$database->query("SET lc_time_names = 'zh_CN'");
$database->execute();

// get specs of the product (to generate random data around the specs)
$sql = sprintf("SELECT * FROM gwc_pline.specs WHERE DATE(end)='3000-01-01' AND name='%s' ", $product);
$database->query($sql);
$spec = $database->single();

for ($i = 0; $i < $amount; $i++) {
	$ll = 100*$spec["1_matinMoistMin"];
	$ul = 100*$spec["1_matinMoistMax"];
	$ll = $ll-($ll/100*rand(1, 4));
	$ul = $ul+($ul/100*rand(1, 4));
	$matin_1 = rand($ll, $ul)/100;
	$matin_2 = rand($ll, $ul)/100;
	
	$ll = 100*$spec["1_matoutMoistMin"];
	$ul = 100*$spec["1_matoutMoistMax"];
	$ll = $ll-($ll/100*rand(1, 4));
	$ul = $ul+($ul/100*rand(1, 4));
	$matout_1 = rand($ll, $ul)/100;
	$matout_2 = rand($ll, $ul)/100;
	
	$ll = 100*$spec["1_matoutTempMin"];
	$ul = 100*$spec["1_matoutTempMax"];
	$ll = $ll-($ll/100*rand(1, 4));
	$ul = $ul+($ul/100*rand(1, 4));
	$matemp_1 = rand($ll, $ul)/100;
	$matemp_2 = rand($ll, $ul)/100;
	
	$sql = sprintf("INSERT INTO gwc_pline.inspection 
				(date, product, 1_matinMoistA, 1_matinMoistB, 1_matoutMoistA, 1_matoutMoistB, 1_matoutTempA, 1_matoutTempB) 
					VALUES(NOW(),'%s',%s,%s,%s,%s,%s,%s)",
					$product, $matin_1, $matin_2, $matout_1, $matout_2, $matemp_1, $matemp_2);

	$database->query($sql);
	$database->execute();
}



$database->endTransaction();


?>