<?php

// bereken de physical en visual penalties en sla deze op in de penalties-table

// wordt aangeroepen vanuit get_evaluation.php
// gebruikt dan de volgende variabelen:
// $station, $machine, $product, $start, $end
// en wordt in een json call aangeroepen vanuit function.js
// in dat geval wordt id meegegeven

//ini_set('memory_limit', '512M');

require_once 'Classes/pdo.php';

// get the formulas and function to calculate it
include "parse_formula.php";		// ParseExcel() function

extract($_GET);

// update the penalties table
function update($db, $id) {
	global $result;
	
	// get data
	$db->query(sprintf("SELECT * FROM gwc_pline.inspection WHERE id=%s", $id));
	$rec = $db->single();
	
	// get the specs for that period
	$db->query(sprintf("SELECT * FROM gwc_pline.specs WHERE name='%s' AND DATE('%s') BETWEEN start AND end", $rec['product'], $rec['date']));
	$specs = $db->single();

	$matinMoistMin1 = $specs['1_matinMoistMin']; 
	$matinMoistMax1 = $specs['1_matinMoistMax'];
	$matoutMoistMin1 = $specs['1_matoutMoistMin'];
	$matoutMoistMax1 = $specs['1_matoutMoistMax'];
	$matoutTempMin1 = $specs['1_matoutTempMin']; 		 			
	$matoutTempMax1 = $specs['1_matoutTempMax']; 
	$accuracy1 = $specs['1_accuracy']; 
	$matinMoistMin2 = $specs['2_matinMoistMin']; 
	$matinMoistMax2 = $specs['2_matinMoistMax']; 
	$matoutMoistMin2 = $specs['2_matoutMoistMin']; 
	$matoutMoistMax2 = $specs['2_matoutMoistMax']; 
	$matoutTempMin2 = $specs['2_matoutTempMin']; 		 			
	$matoutTempMax2 = $specs['2_matoutTempMax']; 
	$accuracy2 = $specs['2_accuracy']; 
	$storTimeMin = $specs['storTimeMin']; 
	$storTimeMax = $specs['storTimeMax']; 
	$cutWidthMin = $specs['cutWidthMin']; 
	$cutWidthMax = $specs['cutWidthMax']; 
	$cyl_matinMoistMin = $specs['cyl_matinMoistMin']; 
	$cyl_matinMoistMax = $specs['cyl_matinMoistMax']; 		 			
	$cyl_matoutMoistMin = $specs['cyl_matoutMoistMin']; 
	$cyl_matoutMoistMax = $specs['cyl_matoutMoistMax']; 
	$cyl_matoutTempMin = $specs['cyl_matoutTempMin']; 
	$cyl_matoutTempMax = $specs['cyl_matoutTempMax']; 
	$dry_matoutMoistMin = $specs['dry_matoutMoistMin']; 
	$dry_matoutMoistMax = $specs['dry_matoutMoistMax']; 		 			
	$dry_matoutTempMin = $specs['dry_matoutTempMin']; 
	$dry_matoutTempMax = $specs['dry_matoutTempMax']; 
	$blendcutAccuracy = $specs['blendcutAccuracy']; 
	$blendexpAccuracy = $specs['blendexpAccuracy']; 
	$blendflavorAccuracy = $specs['blendflavorAccuracy']; 
	$blendstorMoistMin = $specs['blendstorMoistMin']; 
	$blendstorMoistMax = $specs['blendstorMoistMax']; 
	$flavor_matoutMoistMin = $specs['flavor_matoutMoistMin']; 
	$flavor_matoutMoistMax = $specs['flavor_matoutMoistMax']; 		 			
	$amountLongStems = $specs['amountLongStems']; 
	$amountShortStems = $specs['amountShortStems']; 
	$fillingPower = $specs['fillingPower']; 

	// all formulas are stored in a table
	$penalties = 100;
	
	$pen_FeedMatID	= CalcFormula(1, ['A1'=>$rec['rawMatOK']] );
	$penalties += $pen_FeedMatID;

	$pen_matinMoist1 = CalcFormula(2, ['A2'=>$matinMoistMax1, 'A3'=>$matinMoistMin1,
													'A4'=>$rec['1_matinMoistA'], 'A5'=>$rec['1_matinMoistB'] ] );
	$penalties += $pen_matinMoist1;
		
	$pen_matMoistID1	= CalcFormula(3, ['A6'=>$rec['1_moistOK']] );
	$penalties += $pen_matMoistID1;

	$pen_matoutMoist1 = CalcFormula(4, ['A8'=>$matoutMoistMin1, 'A9'=>$matoutMoistMax1,
													'A7'=>$rec['1_matoutMoistA'], 'A10'=>$rec['1_matoutMoistB'] ] );
	$penalties += $pen_matoutMoist1;
	
	$pen_matoutTemp1 = CalcFormula(5, ['A12'=>$matoutTempMin1, 'A13'=>$matoutTempMax1,
													'A11'=>$rec['1_matoutTempA'], 'A14'=>$rec['1_matoutTempB'] ] );
	$penalties += $pen_matoutTemp1;

	$pen_accuracy1	= CalcFormula(6, ['A15'=>$rec['1_accuracy']] );
	$penalties += $pen_accuracy1;

	$pen_matinMoist2 = CalcFormula(7, ['A17'=>$matinMoistMin2, 'A18'=>$matinMoistMax2,
													'A16'=>$rec['2_matinMoistA'], 'A19'=>$rec['2_matinMoistB'] ] );
	$penalties += $pen_matinMoist2;
	
	$pen_matMoistID2	= CalcFormula(8, ['A20'=>$rec['2_moistOK']] );
	$penalties += $pen_matMoistID2;
		
	$pen_matoutMoist2 = CalcFormula(9, ['A22'=>$matoutMoistMin2, 'A23'=>$matoutMoistMax2,
													'A21'=>$rec['2_matoutMoistA'], 'A24'=>$rec['2_matoutMoistB'] ] );
	$penalties += $pen_matoutMoist2;

	$pen_matoutTemp2 = CalcFormula(10, ['A26'=>$matoutTempMin2, 'A27'=>$matoutTempMax2,
													'A25'=>$rec['2_matoutTempA'], 'A28'=>$rec['2_matoutTempB'] ] );
	$penalties += $pen_matoutTemp2;
	
	$pen_accuracy2	= CalcFormula(11, ['A29'=>$rec['2_accuracy']] );
	$penalties += $pen_accuracy2;
	
	$pen_storTime = CalcFormula(12, ['A31'=>$storTimeMin, 'A32'=>$storTimeMax,	'A30'=>$rec['storageTime'] ] );
	$penalties += $pen_storTime;
	
	$pen_stormatOK	= CalcFormula(13, ['A33'=>$rec['storageMatOK']] );
	$penalties += $pen_stormatOK;

	$pen_cutWidth = CalcFormula(14, ['A34'=>$rec['cutWidth'], 'A35'=>$cutWidthMin, 'A36'=>$cutWidthMax ] );
	$penalties += $pen_cutWidth;
	
	$pen_cyl_matinMoist = CalcFormula(15, ['A38'=>$cyl_matinMoistMin, 'A39'=>$cyl_matinMoistMax,	
														'A37'=>$rec['cyl_matinMoistA'], 'A40'=>$rec['cyl_matinMoistB'] ] );
	$penalties += $pen_cyl_matinMoist;
	
	$pen_cyl_matoutMoist = CalcFormula(16, ['A42'=>$cyl_matoutMoistMin, 'A43'=>$cyl_matoutMoistMax,	
														'A41'=>$rec['cyl_matoutMoistA'], 'A44'=>$rec['cyl_matoutMoistB'] ] );
	$penalties += $pen_cyl_matoutMoist;
		
	$pen_cyl_matoutTemp = CalcFormula(17, ['A46'=>$cyl_matoutTempMin, 'A47'=>$cyl_matoutTempMax,	
														'A45'=>$rec['cyl_matoutTempA'], 'A48'=>$rec['cyl_matoutTempB'] ] );
	$penalties += $pen_cyl_matoutTemp;
	
	$pen_dry_matoutMoist = CalcFormula(18, ['A50'=>$dry_matoutMoistMin, 'A51'=>$dry_matoutMoistMax,	
														'A49'=>$rec['dry_matoutMoistA'], 'A52'=>$rec['dry_matoutMoistB'] ] );
	$penalties += $pen_dry_matoutMoist;
	
	$pen_dry_matoutTemp = CalcFormula(19, ['A54'=>$dry_matoutTempMin, 'A55'=>$dry_matoutTempMax,	
														'A53'=>$rec['dry_matoutTempA'], 'A56'=>$rec['dry_matoutTempB'] ] );
	$penalties += $pen_dry_matoutTemp;

	$pen_blendcutStemID	= CalcFormula(20, ['A57'=>$rec['blendcutMatOK']] );
	$penalties += $pen_blendcutStemID;
	
	$pen_blendcutAccuracy	= CalcFormula(21, ['A58'=>$rec['blendcutAccuracy']] );
	$penalties += $pen_blendcutAccuracy;

	$pen_blendexpMatOK	= CalcFormula(22, ['A59'=>$rec['blendexpMatOK']] );
	$penalties += $pen_blendexpMatOK;

	$pen_blendexpAccuracy	= CalcFormula(23, ['A60'=>$rec['blendexpAccuracy']] );
	$penalties += $pen_blendexpAccuracy;

	$pen_blendreMatOK	= CalcFormula(24, ['A61'=>$rec['blendreOK']] );
	$penalties += $pen_blendreMatOK;		

	$pen_blendflavorMatOK	= CalcFormula(25, ['A62'=>$rec['flavorOK']] );
	$penalties += $pen_blendflavorMatOK;	
	
	$pen_blendflavorAccuracy	= CalcFormula(26, ['A63'=>$rec['flavorAccuracy']] );
	$penalties += $pen_blendflavorAccuracy;

	$pen_blendflavorMoist = CalcFormula(27, ['A65'=>$flavor_matoutMoistMin, 'A66'=>$flavor_matoutMoistMax,	
															'A64'=>$rec['flavor_matoutMoistA'], 'A67'=>$rec['flavor_matoutMoistB'],
														 	'A68'=>$rec['flavor_matoutMoistC'], 'A69'=>$rec['flavor_matoutMoistD'] ] );
	$penalties += $pen_blendflavorMoist;
	
	$pen_blendstorMatOK	= CalcFormula(28, ['A70'=>$rec['blendstorMix']] );
	$penalties += $pen_blendstorMatOK;

	$pen_blendstorMoist = CalcFormula(29, ['A72'=>$blendstorMoistMin, 'A73'=>$blendstorMoistMax,	
															'A71'=>$rec['blendstorMoistA'], 'A74'=>$rec['blendstorMoistB'],
														 	'A75'=>$rec['blendstorMoistC'], 'A76'=>$rec['blendstorMoistD'] ] );
	$penalties += $pen_blendstorMoist;

	$pen_amountLongStems	= CalcFormula(30, ['A77'=>$rec['amountLongStems'], 'A78'=>$amountLongStems] );
	$penalties += $pen_amountLongStems;	
	
	$pen_amountShortStems	= CalcFormula(31, ['A79'=>$rec['amountShortStems'], 'A80'=>$amountShortStems] );
	$penalties += $pen_amountShortStems;
	
	$pen_fillingPower	= CalcFormula(32, ['A81'=>$rec['fillingPower'], 'A82'=>$fillingPower] );
	$penalties += $pen_fillingPower;
	
	$penalties = max([$penalties, 0]);
	
	$query = "UPDATE gwc_pline.penalties SET
		FeedMatID=:FeedMatID, 1_matinMoist=:1_matinMoist, 1_matMoistID=:1_matMoistID, 1_matoutMoist=:1_matoutMoist, 
		1_matoutTemp=:1_matoutTemp, 1_accuracy=:1_accuracy, 2_matinMoist=:2_matinMoist, 2_matMoistID=:2_matMoistID, 
		2_matoutMoist=:2_matoutMoist, 2_matoutTemp=:2_matoutTemp, 2_accuracy=:2_accuracy, storTime=:storTime, stormatOK=:stormatOK,
		cutWidth=:cutWidth, cyl_matinMoist=:cyl_matinMoist, cyl_matoutMoist=:cyl_matoutMoist, cyl_matoutTemp=:cyl_matoutTemp, 
		dry_matoutMoist=:dry_matoutMoist, dry_matoutTemp=:dry_matoutTemp, blendcutStemID=:blendcutStemID, blendcutAccuracy=:blendcutAccuracy, 
		blendexpMatOK=:blendexpMatOK, blendexpAccuracy=:blendexpAccuracy, blendreMatOK=:blendreMatOK, blendflavorMatOK=:blendflavorMatOK, 
		blendflavorAccuracy=:blendflavorAccuracy, blendflavorMoist=:blendflavorMoist, blendstorMatOK=:blendstorMatOK, 
		blendstorMoist=:blendstorMoist, amountLongStems=:amountLongStems, amountShortStems=:amountShortStems, 
		fillingPower=:fillingPower, score=:score 
		WHERE id=:ID";

	$db->query($query);

	$db->bind(':FeedMatID', $pen_FeedMatID);
	$db->bind(':1_matinMoist', $pen_matinMoist1);
	$db->bind(':1_matMoistID', $pen_matMoistID1);
	$db->bind(':1_matoutMoist', $pen_matoutMoist1);
	$db->bind(':1_matoutTemp', $pen_matoutTemp1);
	$db->bind(':1_accuracy', $pen_accuracy1);
	$db->bind(':2_matinMoist', $pen_matinMoist2);
	$db->bind(':2_matMoistID', $pen_matMoistID2);
	$db->bind(':2_matoutMoist', $pen_matoutMoist2);
	$db->bind(':2_matoutTemp', $pen_matoutTemp2);
	$db->bind(':2_accuracy', $pen_accuracy2);
	$db->bind(':storTime', $pen_storTime);
	$db->bind(':stormatOK', $pen_stormatOK);
	$db->bind(':cutWidth', $pen_cutWidth);
	$db->bind(':cyl_matinMoist', $pen_cyl_matinMoist);
	$db->bind(':cyl_matoutMoist', $pen_cyl_matoutMoist);
	$db->bind(':cyl_matoutTemp', $pen_cyl_matoutTemp);
	$db->bind(':dry_matoutMoist', $pen_dry_matoutMoist);
	$db->bind(':dry_matoutTemp', $pen_dry_matoutTemp);
	$db->bind(':blendcutStemID', $pen_blendcutStemID);
	$db->bind(':blendcutAccuracy', $pen_blendcutAccuracy);
	$db->bind(':blendexpMatOK', $pen_blendexpMatOK);
	$db->bind(':blendexpAccuracy', $pen_blendexpAccuracy);
	$db->bind(':blendreMatOK', $pen_blendreMatOK);
	$db->bind(':blendflavorMatOK', $pen_blendflavorMatOK);
	$db->bind(':blendflavorAccuracy', $pen_blendflavorAccuracy);
	$db->bind(':blendflavorMoist', $pen_blendflavorMoist);
	$db->bind(':blendstorMatOK', $pen_blendstorMatOK);
	$db->bind(':blendstorMoist', $pen_blendstorMoist);
	$db->bind(':amountLongStems', $pen_amountLongStems);
	$db->bind(':amountShortStems', $pen_amountShortStems);
	$db->bind(':fillingPower', $pen_fillingPower);
	$db->bind(':score', $penalties);
	$db->bind(':ID', $rec['penalties']);
	$db->execute();
	
	$query = "UPDATE gwc_pline.inspection SET score=:score WHERE id=:id";
	$db->query($query);
	$db->bind(":score", $penalties);
	$db->bind(":id", $id);
	$db->execute();

	$result['FeedMatID'] = $pen_FeedMatID;
	$result['1_matinMoist'] = $pen_matinMoist1;
	$result['1_matMoistID'] = $pen_matMoistID1;
	$result['1_matoutMoist'] = $pen_matoutMoist1;
	$result['1_matoutTemp'] = $pen_matoutTemp1;
	$result['1_accuracy'] = $pen_accuracy2;
	$result['2_matinMoist'] = $pen_matinMoist2;
	$result['2_matMoistID'] = $pen_matMoistID2;
	$result['2_matoutMoist'] = $pen_matoutMoist2;
	$result['2_matoutTemp'] = $pen_matoutTemp2;
	$result['2_accuracy'] = $pen_accuracy2;
	$result['storTime'] = $pen_storTime;
	$result['stormatOK'] = $pen_stormatOK;
	$result['cutWidth'] = $pen_cutWidth;
	$result['cyl_matinMoist'] = $pen_cyl_matinMoist;
	$result['cyl_matoutMoist'] = $pen_cyl_matoutMoist;
	$result['cyl_matoutTemp'] = $pen_cyl_matoutTemp;
	$result['dry_matoutMoist'] = $pen_dry_matoutMoist;
	$result['dry_matoutTemp'] = $pen_dry_matoutTemp;
	$result['blendcutStemID'] = $pen_blendcutStemID;
	$result['blendcutAccuracy'] = $pen_blendcutAccuracy;
	$result['blendexpMatOK'] = $pen_blendexpMatOK;
	$result['blendexpAccuracy'] = $pen_blendexpAccuracy;
	$result['blendreMatOK'] = $pen_blendreMatOK;
	$result['blendflavorMatOK'] = $pen_blendflavorMatOK;
	$result['blendflavorAccuracy'] = $pen_blendflavorAccuracy;
	$result['blendflavorMoist'] = $pen_blendflavorMoist;
	$result['blendstorMatOK'] = $pen_blendstorMatOK;
	$result['blendstorMoist'] = $pen_blendstorMoist;
	$result['amountLongStems'] = $pen_amountLongStems;
	$result['amountShortStems'] = $pen_amountShortStems;
	$result['fillingPower'] = $pen_fillingPower;
	$result['score'] = $penalties;
}

$result = array();
$database = new Database();

update($database, $id);

echo json_encode($result);


?>