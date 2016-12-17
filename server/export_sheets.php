<?php

include 'Classes/pdo.php';
include 'Classes/PHPExcel.php';
include realpath(dirname(__FILE__))."/statistics.php";		// statistical functions

extract($_GET);

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////
 get the raw data
////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

$database = new Database();

// make sure utf8 is stored and retrieved correctly
$database->beginTransaction();
$database->query("SET NAMES 'utf8'");
$database->execute();
$database->query("SET lc_time_names = 'zh_CN'");
$database->execute();
$database->endTransaction();

// set the conditions of the query
$condition = sprintf("DATE(date) BETWEEN '%s' AND '%s' ", $start, $end);
$condition = sprintf("%s%s", $condition, $prodstat=='0' ? "" : " AND t1.prodStat = '".$prodstat."' ");
$condition = sprintf("%s%s", $condition, $result=='0' ? "" : " AND t1.result = '".$result."' ");
$condition = sprintf("%s%s", $condition, $disposal=='0' ? "" : " AND t1.disposal = '".$disposal."' ");
$condition = sprintf("%s%s", $condition, $product=='---' ? "" : " AND t1.product = '".$product."' ");

// get field names for inspection table
$query = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'gwc_pline' AND TABLE_NAME = 'inspection' ";
$database->query($query);
$rows = $database->resultset();

$inspectionFields = ""; 
foreach ($rows AS $row) {
	$inspectionFields = sprintf("%st1.%s AS %s, ", $inspectionFields, $row['COLUMN_NAME'], $row['COLUMN_NAME']);
}
$inspectionFields = substr($inspectionFields, 0, -2);

// get field names for specs table
$query = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'gwc_pline' AND TABLE_NAME = 'specs' ";
$database->query($query);
$rows = $database->resultset();

$specFields = ""; 
foreach ($rows AS $row) {
	$specFields = sprintf("%st2.%s AS spec_%s, ", $specFields, $row['COLUMN_NAME'], $row['COLUMN_NAME']);
}
$specFields = substr($specFields, 0, -2);

// get field names for penalties table
$query = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'gwc_pline' AND TABLE_NAME = 'penalties' ";
$database->query($query);
$rows = $database->resultset();
$penaltyFields = ""; 

foreach ($rows AS $row) {
	$penaltyFields = sprintf("%st3.%s AS pen_%s, ", $penaltyFields, $row['COLUMN_NAME'], $row['COLUMN_NAME']);
}
$penaltyFields = substr($penaltyFields, 0, -2);

$query = sprintf("SELECT %s, %s, %s
						FROM gwc_pline.inspection t1 
						JOIN gwc_pline.specs t2 ON t1.date BETWEEN t2.start AND t2.end and t2.name=t1.product
						JOIN gwc_pline.penalties t3 ON t3.id=t1.penalties 	 	
						WHERE %s ORDER BY t1.date", $inspectionFields, $specFields, $penaltyFields, $condition);
$database->query($query);
$rows = $database->resultset();

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////
 create the excel file
////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

	// returns the summary of a series of data
	function calcSummary($row, $aantal, $lsl, $usl, $fields) {
		$serie = [];
		$result = [];
		$amount = 0;
		$outspec = 0;
		for ($i=0; $i<$aantal; $i++) {
			foreach($fields AS $idx=>$field) {
				$val = $row[$i][$field];
				if (is_numeric($val)) {
					//echo $val;
					$serie[] = $val;
					$amount++;
					if ($val < $lsl || $val > $usl)
						$outspec++;
				}
			}
		}
		$result['amount'] = $amount;
		if ($amount == 0) {
			$result['cp'] = '--';
			$result['cpk'] = '--';
			$result['avg'] = '--';
			$result['dev'] = '--';
			$result['var'] = '--';
			$result['out'] = '--';
		} else {
			$result['cp'] = cp($lsl, $usl, $serie);
			$result['cpk'] = cpk($lsl, $usl, $serie);
			$result['avg'] = round(mean($serie), 2);
			$result['dev'] = round(stddev($serie), 2);
			$result['var'] = round(variance($serie), 2);
			$result['out'] = $outspec;
		}
		//var_dump($row);
		return $result;
	}		
	
$record = array();	// holds the sheets with data (each record is a sheet)
foreach ($rows AS $row) {
	$key = '#tab_'.$row['product'];
	if ( array_key_exists($key, $record) ) {
	 	array_push($record[$key], $row);
	} else {
		$record[$key] = array($row);
	}
}

// Create new PHPExcel object
$objPHPExcel = new PHPExcel();

// create the writer
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, "Excel5");

// generate excel column names (A,B,C..Z  AA,AB..)
function num2alpha($n) {
    for($r = ""; $n >= 0; $n = intval($n / 26) - 1)
        $r = chr($n%26 + 0x41) . $r;
    return $r;
}

// Set document properties
$objPHPExcel->getProperties()->setCreator("")
							 ->setLastModifiedBy("")
							 ->setTitle("")
							 ->setSubject("")
							 ->setKeywords("")
							 ->setCategory("");

	
$prodStat = array('', '正常生产', '试制产品');
$statOK = array('', '符合', '不符合');
$result = array('', '合格', '不合格', '待判');
$disposal = array("", "按工艺要求反掺使用", "质管室组织评审");

function setColor($sheet, $range, $color) {
	$sheet->getStyle($range)
			->getFill()
			->setFillType(PHPExcel_Style_Fill::FILL_SOLID)
			->getStartColor()
			->setRGB($color);
}

foreach ($record AS $row) {		// walk through all the sheets
	$sheet = $objPHPExcel->createSheet();
	$sheet->setTitle($row[0]['product']);
	$sheet->getStyle('A:ZZ')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$sheet->getStyle('A:ZZ')->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_TEXT);
	$sheet->freezePane( "F6" );
	$sheet->getColumnDimension('A')->setWidth(20);
	$sheet->getColumnDimension('B')->setWidth(23);

	setColor($sheet, 'A1:E1', 'CCFFCC');
	setColor($sheet, 'A2:C52', 'CCCCFF');
	setColor($sheet, 'C6:E52', '99CCFF');

	$aantal = count($row);
	$r = 1;
	
	// header quality inspection
	$sheet->setCellValue("A$r", "制丝过程判定项目质量检验记录表")
			->mergeCells("A$r:E$r");

	// production date
	$r++;
	$sheet->setCellValue("A$r", "生产日期")
			->mergeCells("A$r:E$r");
	for ($i=0; $i<$aantal*2; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['date'] )
				->mergeCells($c1.':'.$c2);	
	}

	// batch number
	$r++;
	$sheet->setCellValue("A$r", "生产批号")
			->mergeCells("A$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['batchNr'] )
				->mergeCells($c1.':'.$c2);	
	}
	
	// production status
	$r++;
	$sheet->setCellValue("A$r", "生产情况")
			->mergeCells("A$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $prodStat[$row[$i]['prodStat']] )
				->mergeCells($c1.':'.$c2);	
	}

	// items header
	$r++;
	$sheet->setCellValue("A$r", "工序")
			->setCellValue("B$r", "判定项目")
			->setCellValue("C$r", "指标要求")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->mergeCells($c1.':'.$c2);	
	}

	// feed intake
	$r++;
	$sheet->setCellValue("A$r", "投料")
			->setCellValue("B$r", "物料识别")
			->setCellValue("C$r", "原料标识符合配方")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $statOK[$row[$i]['rawMatOK']] )
				->mergeCells($c1.':'.$c2);	
	}

	// first moisture regain
	$r++;
	$sheet->setCellValue("A$r", "一次加料回潮")
			->mergeCells(sprintf("A%d:A%d", $r, $r+6))
			->getStyle(sprintf("A%d:A%d", $r, $r+6))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "入口物料含水率（%）")
			->setCellValue("C$r", $row[0]['spec_1_matinMoistMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_1_matinMoistMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['1_matinMoistA'] )
				->setCellValue( $c2,  $row[$i]['1_matinMoistB'] );
	}
	
	$r++;
	$sheet->setCellValue("B$r", "料液识别")
			->setCellValue("C$r", "料液标识符合生产牌号")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $statOK[$row[$i]['1_moistOK']] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	$sheet->setCellValue("B$r", "出口物料含水率（%）")
			->mergeCells(sprintf("B%d:B%d", $r, $r+3))
			->setCellValue("C$r", $row[0]['spec_1_matoutMoistMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_1_matoutMoistMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['1_matoutMoistA'] )
				->setCellValue( $c2,  $row[$i]['1_matoutMoistB'] );
	}

	$lsl = $row[0]['spec_1_matoutMoistMin'];
	$usl = $row[0]['spec_1_matoutMoistMax'];
	$res = calcSummary($row, $aantal, $lsl, $usl, ['1_matoutMoistA','1_matoutMoistB']);
	$r++;
	foreach([["F","数量"],["G","Cp"],["H","Cpk"],["I","平均"],["J","标准偏差"],["K","变异系数"],["L","超标支数"]] AS $idx=>$val) {
		$sheet->setCellValue($val[0].$r, $val[1]);
	}
	$r++;
	foreach([["F","amount"],["G","cp"],["H","cpk"],["I","avg"],["J","dev"],["K","var"],["L","out"]] AS $idx=>$val) {
		$sheet->setCellValue($val[0].$r, $res[$val[1]]);
	}

	$r++;
	$sheet->setCellValue("B$r", "出口物料温度（℃）")
			->setCellValue("C$r", $row[0]['spec_1_matoutTempMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_1_matoutTempMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['1_matoutTempA'] )
				->setCellValue( $c2,  $row[$i]['1_matoutTempB'] );
	}

	$r++;
	$sheet->setCellValue("B$r", "加料累计精度（%）")
			->setCellValue("C$r", "累计精度")
			->setCellValue("D$r", "≤")
			->setCellValue("E$r", "1");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $statOK[$row[$i]['1_accuracy']] )
				->mergeCells($c1.':'.$c2);	
	}

	// second moisture regain
	$r++;
	$sheet->setCellValue("A$r", "一次加料回潮")
			->mergeCells(sprintf("A%d:A%d", $r, $r+6))
			->getStyle(sprintf("A%d:A%d", $r, $r+6))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "入口物料含水率（%）")
			->setCellValue("C$r", $row[0]['spec_2_matinMoistMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_2_matinMoistMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['2_matinMoistA'] )
				->setCellValue( $c2,  $row[$i]['2_matinMoistB'] );
	}
	
	$r++;
	$sheet->setCellValue("B$r", "料液识别")
			->setCellValue("C$r", "料液标识符合生产牌号")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $statOK[$row[$i]['2_moistOK']] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	$sheet->setCellValue("B$r", "出口物料含水率（%）")
			->mergeCells(sprintf("B%d:B%d", $r, $r+3))
			->setCellValue("C$r", $row[0]['spec_2_matoutMoistMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_2_matoutMoistMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['2_matoutMoistA'] )
				->setCellValue( $c2,  $row[$i]['2_matoutMoistB'] );
	}
	
	$lsl = $row[0]['spec_2_matoutMoistMin'];
	$usl = $row[0]['spec_2_matoutMoistMax'];
	$res = calcSummary($row, $aantal, $lsl, $usl, ['2_matoutMoistA','2_matoutMoistB']);
	$r++;
	foreach([["F","数量"],["G","Cp"],["H","Cpk"],["I","平均"],["J","标准偏差"],["K","变异系数"],["L","超标支数"]] AS $idx=>$val) {
		$sheet->setCellValue($val[0].$r, $val[1]);
	}
	$r++;
	foreach([["F","amount"],["G","cp"],["H","cpk"],["I","avg"],["J","dev"],["K","var"],["L","out"]] AS $idx=>$val) {
		$sheet->setCellValue($val[0].$r, $res[$val[1]]);
	}

	$r++;
	$sheet->setCellValue("B$r", "出口物料温度（℃）")
			->setCellValue("C$r", $row[0]['spec_2_matoutTempMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_2_matoutTempMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['2_matoutTempA'] )
				->setCellValue( $c2,  $row[$i]['2_matoutTempB'] );
	}

	$r++;
	$sheet->setCellValue("B$r", "加料累计精度（%）")
			->setCellValue("C$r", "累计精度")
			->setCellValue("D$r", "≤")
			->setCellValue("E$r", "1");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $statOK[$row[$i]['2_accuracy']] )
				->mergeCells($c1.':'.$c2);	
	}
	
	
	// keep in storage
	$r++;
	$sheet->setCellValue("A$r", "贮叶")
			->mergeCells(sprintf("A%d:A%d", $r, $r+1))
			->getStyle(sprintf("A%d:A%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "贮存时间（h）")
			->setCellValue("C$r", $row[0]['spec_storTimeMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_storTimeMax']);

	$r++;
	$sheet->setCellValue("B$r", "物料识别")
			->setCellValue("C$r", "批次物料不应混装")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $statOK[$row[$i]['storageMatOK']] )
				->mergeCells($c1.':'.$c2);	
	}

	// cut into strips
	$r++;
	$sheet->setCellValue("A$r", "切丝")
			->setCellValue("B$r", "切丝宽度（mm）")
			->setCellValue("C$r", $row[0]['spec_cutWidthMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_cutWidthMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['cutWidth'] )
				->mergeCells($c1.':'.$c2);	
	}

	// humidifying and heating (cylinder)
	$r++;
	$sheet->setCellValue("A$r", "叶丝增温增湿（滚筒）")
			->mergeCells(sprintf("A%d:A%d", $r, $r+4))
			->getStyle(sprintf("A%d:A%d", $r, $r+4))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "入口物料含水率（%）")
			->setCellValue("C$r", $row[0]['spec_cyl_matinMoistMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_cyl_matinMoistMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['cyl_matinMoistA'] )
				->setCellValue( $c2,  $row[$i]['cyl_matinMoistB'] );
	}
	
	$r++;
	$sheet->setCellValue("B$r", "出口物料含水率（%）")
			->mergeCells(sprintf("B%d:B%d", $r, $r+3))
			->setCellValue("C$r", $row[0]['spec_cyl_matoutMoistMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_cyl_matoutMoistMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['cyl_matoutMoistA'] )
				->setCellValue( $c2,  $row[$i]['cyl_matoutMoistB'] );
	}

	$lsl = $row[0]['spec_cyl_matoutMoistMin'];
	$usl = $row[0]['spec_cyl_matoutMoistMax'];
	$res = calcSummary($row, $aantal, $lsl, $usl, ['cyl_matoutMoistA','cyl_matoutMoistB']);
	$r++;
	foreach([["F","数量"],["G","Cp"],["H","Cpk"],["I","平均"],["J","标准偏差"],["K","变异系数"],["L","超标支数"]] AS $idx=>$val) {
		$sheet->setCellValue($val[0].$r, $val[1]);
	}
	$r++;
	foreach([["F","amount"],["G","cp"],["H","cpk"],["I","avg"],["J","dev"],["K","var"],["L","out"]] AS $idx=>$val) {
		$sheet->setCellValue($val[0].$r, $res[$val[1]]);
	}

	$r++;
	$sheet->setCellValue("B$r", "出口物料温度(℃)")
			->setCellValue("C$r", $row[0]['spec_cyl_matoutTempMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_cyl_matoutTempMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['cyl_matoutTempA'] )
				->setCellValue( $c2,  $row[$i]['cyl_matoutTempB'] );
	}
				
	// air drying
	$r++;
	$sheet->setCellValue("A$r", "气流干燥")
			->mergeCells(sprintf("A%d:A%d", $r, $r+3))
			->getStyle(sprintf("A%d:A%d", $r, $r+3))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "出口物料含水率（%）")
			->setCellValue("C$r", $row[0]['spec_dry_matoutMoistMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_dry_matoutMoistMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['dry_matoutMoistA'] )
				->setCellValue( $c2,  $row[$i]['dry_matoutMoistB'] );
	}
	
	$lsl = $row[0]['spec_dry_matoutMoistMin'];
	$usl = $row[0]['spec_dry_matoutMoistMax'];
	$res = calcSummary($row, $aantal, $lsl, $usl, ['dry_matoutMoistA','dry_matoutMoistB']);
	$r++;
	foreach([["F","数量"],["G","Cp"],["H","Cpk"],["I","平均"],["J","标准偏差"],["K","变异系数"],["L","超标支数"]] AS $idx=>$val) {
		$sheet->setCellValue($val[0].$r, $val[1]);
	}
	$r++;
	foreach([["F","amount"],["G","cp"],["H","cpk"],["I","avg"],["J","dev"],["K","var"],["L","out"]] AS $idx=>$val) {
		$sheet->setCellValue($val[0].$r, $res[$val[1]]);
	}

	$r++;
	$sheet->setCellValue("B$r", "出口物料温度（℃）")
			->setCellValue("C$r", $row[0]['spec_dry_matoutTempMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_dry_matoutTempMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['dry_matoutTempA'] )
				->setCellValue( $c2,  $row[$i]['dry_matoutTempB'] );
	}		

	// blending the cut stem
	$r++;
	$sheet->setCellValue("A$r", "梗丝掺配")
			->mergeCells(sprintf("A%d:A%d", $r, $r+1))
			->getStyle(sprintf("A%d:A%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "物料识别")
			->setCellValue("C$r", "掺配梗丝标识符合工艺要求")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $statOK[$row[$i]['blendcutMatOK']] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	$sheet->setCellValue("B$r", "掺配累计精度（%）")
			->setCellValue("C$r", "累计精度")
			->setCellValue("D$r", "≤")
			->setCellValue("E$r", "1");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['blendcutAccuracy'] )
				->mergeCells($c1.':'.$c2);	
	}

	// blending the expanded tobacco
	$r++;
	$sheet->setCellValue("A$r", "膨胀丝掺配")
			->mergeCells(sprintf("A%d:A%d", $r, $r+1))
			->getStyle(sprintf("A%d:A%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "物料识别")
			->setCellValue("C$r", "掺配膨胀丝标识符合工艺要求")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $statOK[$row[$i]['blendexpMatOK']] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	$sheet->setCellValue("B$r", "掺配累计精度（%）")
			->setCellValue("C$r", "累计精度")
			->setCellValue("D$r", "≤")
			->setCellValue("E$r", "1");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['blendexpAccuracy'] )
				->mergeCells($c1.':'.$c2);	
	}

	// blending recycling tobacco
	$r++;
	$sheet->setCellValue("A$r", "回收丝掺配")
			->mergeCells(sprintf("A%d:A%d", $r, $r+1))
			->getStyle(sprintf("A%d:A%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "物料识别")
			->mergeCells(sprintf("B%d:B%d", $r, $r+1))
			->getStyle(sprintf("B%d:B%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("C$r", "回收丝掺配通知号")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['blendreID'] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	$sheet->setCellValue("C$r", "按工艺要求使用")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $statOK[$row[$i]['blendreOK']] )
				->mergeCells($c1.':'.$c2);	
	}	

	//  Add spice & flavor
	$r++;
	$sheet->setCellValue("A$r", "加香")
			->mergeCells(sprintf("A%d:A%d", $r, $r+5))
			->getStyle(sprintf("A%d:A%d", $r, $r+5))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "物料识别")
			->setCellValue("C$r", "料液标识符合生产牌号")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $statOK[$row[$i]['flavorOK']] )
				->mergeCells($c1.':'.$c2);	
	}	

	$r++;
	$sheet->setCellValue("B$r", "加香累计精度（%）")
			->mergeCells(sprintf("B%d:B%d", $r, $r+3))
			->setCellValue("C$r", "累计精度")
			->setCellValue("D$r", "≤")
			->setCellValue("E$r", "1");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['flavorAccuracy'] )
				->mergeCells($c1.':'.$c2);	
	}	

	$res = calcSummary($row, $aantal, 0, 1, ['flavorAccuracy']);
	$r++;
	foreach([["F","数量"],["G","Cp"],["H","Cpk"],["I","平均"],["J","标准偏差"],["K","变异系数"],["L","超标支数"]] AS $idx=>$val) {
		$sheet->setCellValue($val[0].$r, $val[1]);
	}
	$r++;
	foreach([["F","amount"],["G","cp"],["H","cpk"],["I","avg"],["J","dev"],["K","var"],["L","out"]] AS $idx=>$val) {
		$sheet->setCellValue($val[0].$r, $res[$val[1]]);
	}

	$r++;
	$sheet->setCellValue("B$r", "出口物料含水率（%）")
			//->mergeCells(sprintf("B%d:B%d", $r, $r+3))
			->setCellValue("C$r", $row[0]['spec_flavor_matoutMoistMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_flavor_matoutMoistMax']);
	$sheet->mergeCells(sprintf("B%d:B%d", $r, $r+1))
			->getStyle(sprintf("B%d:B%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->mergeCells(sprintf("C%d:C%d", $r, $r+1))
			->getStyle(sprintf("C%d:C%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->mergeCells(sprintf("D%d:D%d", $r, $r+1))
			->getStyle(sprintf("D%d:D%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->mergeCells(sprintf("E%d:E%d", $r, $r+1))
			->getStyle(sprintf("E%d:E%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);			
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['flavor_matoutMoistA'] )
				->setCellValue( $c2, $row[$i]['flavor_matoutMoistB'] );
	}	
	$r++;
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['flavor_matoutMoistC'] )
				->setCellValue( $c2, $row[$i]['flavor_matoutMoistD'] );
	}

	$lsl = $row[0]['spec_flavor_matoutMoistMin'];
	$usl = $row[0]['spec_flavor_matoutMoistMax'];
	$res = calcSummary($row, $aantal, $lsl, $usl, ['flavor_matoutMoistA','flavor_matoutMoistB','flavor_matoutMoistC','flavor_matoutMoistD']);
	$r++;
	foreach([["F","数量"],["G","Cp"],["H","Cpk"],["I","平均"],["J","标准偏差"],["K","变异系数"],["L","超标支数"]] AS $idx=>$val) {
		$sheet->setCellValue($val[0].$r, $val[1]);
	}
	$r++;
	foreach([["F","amount"],["G","cp"],["H","cpk"],["I","avg"],["J","dev"],["K","var"],["L","out"]] AS $idx=>$val) {
		$sheet->setCellValue($val[0].$r, $res[$val[1]]);
	}


	// blend tobaccos storage
	$r++;
	$sheet->setCellValue("A$r", "混丝贮存")
			->mergeCells(sprintf("A%d:A%d", $r, $r+2))
			->getStyle(sprintf("A%d:A%d", $r, $r+2))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $statOK[$row[$i]['blendstorMix']] )
				->mergeCells($c1.':'.$c2);	
	}	

	$r++;
	$sheet->setCellValue("B$r", "贮丝含水率（%）")
			->setCellValue("C$r", $row[0]['spec_blendstorMoistMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_blendstorMoistMax']);
	$sheet->mergeCells(sprintf("B%d:B%d", $r, $r+1))
			->getStyle(sprintf("B%d:B%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->mergeCells(sprintf("C%d:C%d", $r, $r+1))
			->getStyle(sprintf("C%d:C%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->mergeCells(sprintf("D%d:D%d", $r, $r+1))
			->getStyle(sprintf("D%d:D%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->mergeCells(sprintf("E%d:E%d", $r, $r+1))
			->getStyle(sprintf("E%d:E%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);			
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['blendstorMoistA'] )
				->setCellValue( $c2, $row[$i]['blendstorMoistB'] );
	}	

	$r++;
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['blendstorMoistC'] )
				->setCellValue( $c2, $row[$i]['blendstorMoistD'] );
	}
	
	// special link
	$r++;
	$sheet->setCellValue("A$r", "特殊检验环节")
			->mergeCells(sprintf("A%d:A%d", $r, $r+2))
			->getStyle(sprintf("A%d:A%d", $r, $r+2))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "成品烟丝结构（%）")
			->mergeCells(sprintf("B%d:B%d", $r, $r+1))
			->getStyle(sprintf("B%d:B%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("C$r", "整丝率")
			->setCellValue("D$r", "≤")
			->setCellValue("E$r", $row[0]['spec_amountLongStems']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['amountLongStems'] )
				->mergeCells($c1.':'.$c2);	
	}
	
	$r++;
	$sheet->setCellValue("C$r", "碎丝率")
			->setCellValue("D$r", "≤")
			->setCellValue("E$r", $row[0]['spec_amountShortStems']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['amountShortStems'] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	$sheet->setCellValue("B$r", "成品烟丝填充值（cm3/g）")
			->setCellValue("C$r", "填充值")
			->setCellValue("D$r", "≥")
			->setCellValue("E$r", $row[0]['spec_fillingPower']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['fillingPower'] )
				->mergeCells($c1.':'.$c2);	
	}	

	// seperator ///////////////////////////////////////////////////////////////////////////////
	$r+=2;
	
	setColor($sheet, 'A55:E55', 'CCFFCC');
	setColor($sheet, 'A56:B88', 'CCCCFF');
	setColor($sheet, 'C56:E88', '99CCFF');
	
	setColor($sheet, 'A89:E92', '99CCFF');
	setColor($sheet, 'A94:E96', '99CCFF');
	
	// header quality inspection
	$r++;
	$sheet->setCellValue("A$r", "制丝过程判定项目质量检验考核表")
			->mergeCells("A$r:E$r");

	// items header
	$r++;
	$sheet->setCellValue("A$r", "工序")
			->setCellValue("B$r", "判定项目")
			->setCellValue("C$r", "指标要求")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue($c1, '扣分判定情况')
				->mergeCells($c1.':'.$c2);	
	}

	// feed intake
	$r++;
	$sheet->setCellValue("A$r", "投料")
			->setCellValue("B$r", "物料识别")
			->setCellValue("C$r", "原料标识符合配方")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_FeedMatID'] )
				->mergeCells($c1.':'.$c2);	
	}

	// first moisture regain
	$r++;
	$sheet->setCellValue("A$r", "一次加料回潮")
			->mergeCells(sprintf("A%d:A%d", $r, $r+4))
			->getStyle(sprintf("A%d:A%d", $r, $r+4))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "入口物料含水率（%）")
			->setCellValue("C$r", $row[0]['spec_1_matinMoistMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_1_matinMoistMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['pen_1_matinMoist'] )
				->mergeCells($c1.':'.$c2);	
	}
	
	$r++;
	$sheet->setCellValue("B$r", "料液识别")
			->setCellValue("C$r", "料液标识符合生产牌号")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_1_matMoistID'] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	$sheet->setCellValue("B$r", "出口物料含水率（%）")
			->setCellValue("C$r", $row[0]['spec_1_matoutMoistMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_1_matoutMoistMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['pen_1_matoutMoist'] )
				->mergeCells($c1.':'.$c2);
	}

	$r++;
	$sheet->setCellValue("B$r", "出口物料温度（℃）")
			->setCellValue("C$r", $row[0]['spec_1_matoutTempMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_1_matoutTempMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['pen_1_matoutTemp'] )
				->mergeCells($c1.':'.$c2);
	}

	$r++;
	$sheet->setCellValue("B$r", "加料累计精度（%）")
			->setCellValue("C$r", "累计精度")
			->setCellValue("D$r", "≤")
			->setCellValue("E$r", "1");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['pen_1_accuracy'] )
				->mergeCells($c1.':'.$c2);	
	}

	// second moisture regain
	$r++;
	$sheet->setCellValue("A$r", "一次加料回潮")
			->mergeCells(sprintf("A%d:A%d", $r, $r+4))
			->getStyle(sprintf("A%d:A%d", $r, $r+4))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "入口物料含水率（%）")
			->setCellValue("C$r", $row[0]['spec_2_matinMoistMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_2_matinMoistMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['pen_2_matinMoist'] )
				->mergeCells($c1.':'.$c2);	
	}
	
	$r++;
	$sheet->setCellValue("B$r", "料液识别")
			->setCellValue("C$r", "料液标识符合生产牌号")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['pen_2_moistOK'] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	$sheet->setCellValue("B$r", "出口物料含水率（%）")
			->setCellValue("C$r", $row[0]['spec_2_matoutMoistMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_2_matoutMoistMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['pen_2_matoutMoist'] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	$sheet->setCellValue("B$r", "出口物料温度（℃）")
			->setCellValue("C$r", $row[0]['spec_2_matoutTempMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_2_matoutTempMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['pen_2_matoutTemp'] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	$sheet->setCellValue("B$r", "加料累计精度（%）")
			->setCellValue("C$r", "累计精度")
			->setCellValue("D$r", "≤")
			->setCellValue("E$r", "1");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_2_accuracy'] )
				->mergeCells($c1.':'.$c2);	
	}
	
	
	// keep in storage
	$r++;
	$sheet->setCellValue("A$r", "贮叶")
			->mergeCells(sprintf("A%d:A%d", $r, $r+1))
			->getStyle(sprintf("A%d:A%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "贮存时间（h）")
			->setCellValue("C$r", $row[0]['spec_storTimeMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_storTimeMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_storTime'] )
				->mergeCells($c1.':'.$c2);	
	}
	
	$r++;
	$sheet->setCellValue("B$r", "物料识别")
			->setCellValue("C$r", "批次物料不应混装")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_stormatOK'] )
				->mergeCells($c1.':'.$c2);	
	}

	// cut into strips
	$r++;
	$sheet->setCellValue("A$r", "切丝")
			->setCellValue("B$r", "切丝宽度（mm）")
			->setCellValue("C$r", $row[0]['spec_cutWidthMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_cutWidthMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_cutWidth'] )
				->mergeCells($c1.':'.$c2);	
	}

	// humidifying and heating (cylinder)
	$r++;
	$sheet->setCellValue("A$r", "叶丝增温增湿（滚筒）")
			->mergeCells(sprintf("A%d:A%d", $r, $r+2))
			->getStyle(sprintf("A%d:A%d", $r, $r+2))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "入口物料含水率（%）")
			->setCellValue("C$r", $row[0]['spec_cyl_matinMoistMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_cyl_matinMoistMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['pen_cyl_matinMoist'] )
				->mergeCells($c1.':'.$c2);	
	}
	
	$r++;
	$sheet->setCellValue("B$r", "出口物料含水率（%）")
			->setCellValue("C$r", $row[0]['spec_cyl_matoutMoistMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_cyl_matoutMoistMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['pen_cyl_matoutMoist'] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	$sheet->setCellValue("B$r", "出口物料含水率（%）")
			->setCellValue("C$r", $row[0]['spec_cyl_matoutTempMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_cyl_matoutTempMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['pen_cyl_matoutTemp'] )
				->mergeCells($c1.':'.$c2);	
	}
				
	// air drying
	$r++;
	$sheet->setCellValue("A$r", "气流干燥")
			->mergeCells(sprintf("A%d:A%d", $r, $r+1))
			->getStyle(sprintf("A%d:A%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "出口物料含水率（%）")
			->setCellValue("C$r", $row[0]['spec_dry_matoutMoistMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_dry_matoutMoistMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['pen_dry_matoutMoist'] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	$sheet->setCellValue("B$r", "出口物料温度（℃）")
			->setCellValue("C$r", $row[0]['spec_dry_matoutTempMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_dry_matoutTempMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1,  $row[$i]['pen_dry_matoutTemp'] )
				->mergeCells($c1.':'.$c2);	
	}		

	// blending the cut stem
	$r++;
	$sheet->setCellValue("A$r", "梗丝掺配")
			->mergeCells(sprintf("A%d:A%d", $r, $r+1))
			->getStyle(sprintf("A%d:A%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "物料识别")
			->setCellValue("C$r", "掺配梗丝标识符合工艺要求")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_blendcutStemID'] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	$sheet->setCellValue("B$r", "掺配累计精度（%）")
			->setCellValue("C$r", "累计精度")
			->setCellValue("D$r", "≤")
			->setCellValue("E$r", "1");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_blendcutAccuracy'] )
				->mergeCells($c1.':'.$c2);	
	}

	// blending the expanded tobacco
	$r++;
	$sheet->setCellValue("A$r", "膨胀丝掺配")
			->mergeCells(sprintf("A%d:A%d", $r, $r+1))
			->getStyle(sprintf("A%d:A%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "物料识别")
			->setCellValue("C$r", "掺配膨胀丝标识符合工艺要求")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_blendexpMatOK'] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	$sheet->setCellValue("B$r", "掺配累计精度（%）")
			->setCellValue("C$r", "累计精度")
			->setCellValue("D$r", "≤")
			->setCellValue("E$r", "1");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_blendexpAccuracy'] )
				->mergeCells($c1.':'.$c2);	
	}

	// blending recycling tobacco
	$r++;
	$sheet->setCellValue("A$r", "回收丝掺配")
			->mergeCells(sprintf("A%d:A%d", $r, $r+1))
			->getStyle(sprintf("A%d:A%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "物料识别")
			->mergeCells(sprintf("B%d:B%d", $r, $r+1))
			->getStyle(sprintf("B%d:B%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("C$r", "回收丝掺配通知号")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_blendreMatOK'] )
				->mergeCells($c1.':'.$c2);	
	}

	//  Add spice & flavor
	$r++;
	$sheet->setCellValue("A$r", "加香")
			->mergeCells(sprintf("A%d:A%d", $r, $r+3))
			->getStyle(sprintf("A%d:A%d", $r, $r+3))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "物料识别")
			->setCellValue("C$r", "料液标识符合生产牌号")
			->mergeCells("C$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_blendflavorMatOK'] )
				->mergeCells($c1.':'.$c2);	
	}	

	$r++;
	$sheet->setCellValue("B$r", "加香累计精度（%）")
			->setCellValue("C$r", "累计精度")
			->setCellValue("D$r", "≤")
			->setCellValue("E$r", "1");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_blendflavorAccuracy'] )
				->mergeCells($c1.':'.$c2);	
	}	

	$r++;
	$sheet->setCellValue("B$r", "出口物料含水率（%）")
			->setCellValue("C$r", $row[0]['spec_flavor_matoutMoistMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_flavor_matoutMoistMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_blendflavorMoist'] )
				->mergeCells($c1.':'.$c2);	
	}	

	// blend tobaccos storage
	$r++;
	$sheet->setCellValue("A$r", "混丝贮存")
			->mergeCells(sprintf("A%d:A%d", $r, $r+2))
			->getStyle(sprintf("A%d:A%d", $r, $r+2))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_blendstorMatOK'] )
				->mergeCells($c1.':'.$c2);	
	}	

	$r++;
	$sheet->setCellValue("B$r", "贮丝含水率（%）")
			->setCellValue("C$r", $row[0]['spec_blendstorMoistMin'])
			->setCellValue("D$r", "-")
			->setCellValue("E$r", $row[0]['spec_blendstorMoistMax']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_blendstorMoist'] )
				->mergeCells($c1.':'.$c2);	
	}	

	// special link
	$r++;
	$sheet->setCellValue("A$r", "特殊检验环节")
			->mergeCells(sprintf("A%d:A%d", $r, $r+2))
			->getStyle(sprintf("A%d:A%d", $r, $r+2))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("B$r", "成品烟丝结构（%）")
			->mergeCells(sprintf("B%d:B%d", $r, $r+1))
			->getStyle(sprintf("B%d:B%d", $r, $r+1))->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
	$sheet->setCellValue("C$r", "整丝率")
			->setCellValue("D$r", "≤")
			->setCellValue("E$r", $row[0]['spec_amountLongStems']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_amountLongStems'] )
				->mergeCells($c1.':'.$c2);	
	}
	
	$r++;
	$sheet->setCellValue("C$r", "碎丝率")
			->setCellValue("D$r", "≤")
			->setCellValue("E$r", $row[0]['spec_amountShortStems']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_amountShortStems'] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	$sheet->setCellValue("B$r", "成品烟丝填充值（cm3/g）")
			->setCellValue("C$r", "填充值")
			->setCellValue("D$r", "≥")
			->setCellValue("E$r", $row[0]['spec_fillingPower']);
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_fillingPower'] )
				->mergeCells($c1.':'.$c2);	
	}	
	
	// summary
	$r++;
	$sheet->setCellValue("A$r", "制丝综合质量得分")
			->mergeCells("A$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pen_score'] )
				->mergeCells($c1.':'.$c2);	
	}	
	
	$r++;
	$sheet->setCellValue("A$r", "判定结果")
			->mergeCells("A$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $result[$row[$i]['result']] )
				->mergeCells($c1.':'.$c2);	
	}
	
	$r++;
	$sheet->setCellValue("A$r", "待判或不合格原因")
			->mergeCells("A$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['pendingReason'] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	$sheet->setCellValue("A$r", "检验员")
			->mergeCells("A$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['inspector'] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	
	$r++;
	$sheet->setCellValue("A$r", "待判或不合格物料处理方式")
			->mergeCells("A$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $disposal[$row[$i]['disposal']] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	$sheet->setCellValue("A$r", "物料处理通知编号")
			->mergeCells("A$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['matNotNR'] )
				->mergeCells($c1.':'.$c2);	
	}

	$r++;
	$sheet->setCellValue("A$r", "检验员")
			->mergeCells("A$r:E$r");
	for ($i=0; $i<$aantal; $i++) {
		$c1 = sprintf("%s%d", num2alpha(($i*2)+5), $r);
		$c2 = sprintf("%s%d", num2alpha(($i*2)+6), $r);
		$sheet->setCellValue( $c1, $row[$i]['inspectorDis'] )
				->mergeCells($c1.':'.$c2);	
	}

					
}

$objPHPExcel->removeSheetByIndex(0);	// remove the default (not used) first sheet

$output = pathinfo(__FILE__, PATHINFO_FILENAME).".xls";

ob_start();
$objWriter->save('php://output');
$xlsData = ob_get_contents();
ob_end_clean();

// Redirect output to a client’s web browser (Excel5)
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename='.$output);
header('Cache-Control: max-age=0');
// If you're serving to IE 9, then the following may be needed
header('Cache-Control: max-age=1');

// If you're serving to IE over SSL, then the following may be needed
header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
header ('Pragma: public'); // HTTP/1.0

//$objWriter->save('php://output');
echo $xlsData;
$objPHPExcel->__destruct();

exit;

?>