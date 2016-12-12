<?php

// calculate the quality and score
// args: table, id
// returns quality/score and updates the table

require_once 'Classes/pdo.php';
require_once 'Classes/PHPExcel.php';

extract($_GET);

$database = new Database();

// make sure utf8 is stored and retrieved correctly
$database->beginTransaction();
$database->query("SET NAMES 'utf8'");
$database->execute();
$database->query("SET lc_time_names = 'zh_CN'");
$database->execute();

// get all formulas and store these in an array
$database = new Database();
$database->query("SELECT * FROM gwc_handmade.formulas WHERE id=1");
$formula = $database->single();

// get the data
$sql = sprintf("SELECT * FROM gwc_handmade.%s WHERE id=%s", $table, $id);
$database->query($sql);
$data = $database->single();

// get the specs
$sql = sprintf("SELECT * FROM gwc_handmade.specs WHERE 
								pid = (SELECT pid FROM gwc_handmade.specs WHERE name='%s' LIMIT 1)
								AND DATE('%s') BETWEEN DATE(start) AND DATE(end) ",	$data['product'], $data['date']);	
$database->query($sql);
$specs = $database->single();

// returns a array in the form of: A1, A2, A3 etc.
function CellRange($prefix, $from, $to) {
	$out = array();
	for ($i=$from; $i<=$to; $i++)
		$out[] = $prefix.$i;
	return $out;
}
 
$objPHPExcel = new PHPExcel();
$sheet = $objPHPExcel->getActiveSheet();

// store the ranges in B,C,D,E and F rows (length, circ, weight, pd, moist)
for ($n=1; $n<=10; $n++)	$sheet->setCellValue('B'.$n, $data['l'.$n] );
for ($n=1; $n<=10; $n++)	$sheet->setCellValue('C'.$n, $data['c'.$n] );
for ($n=1; $n<=10; $n++)	$sheet->setCellValue('D'.$n, $data['w'.$n] );
for ($n=1; $n<=10; $n++)	$sheet->setCellValue('E'.$n, $data['p'.$n] );
for ($n=1; $n<=8; $n++)		$sheet->setCellValue('F'.$n, $data['m'.$n] );

// set the specifications
$fields = ['rol_l_min','rol_l_max','rol_c_min','rol_c_max','rol_w_min','rol_w_max','rol_p_min','rol_p_max','moist_s_min','moist_s_max'];
$cell = CellRange("S", 1, 10);	// S1..S10
foreach ($fields AS $i=>$field)
	$sheet->setCellValue($cell[$i], $specs[$field] );

$result = array();

switch($table) {
	case "rolling": // ---------------------------------------------------- rolling ---------------------------------------------------------------
		// set the formulas
		$fields = ['l_outlow','l_outhigh','l_inspec','c_outlow','c_outhigh','c_inspec','w_outlow','w_outhigh','w_inspec','p_outlow','p_outhigh','p_inspec'];
		$cell = CellRange("A", 1, 12);	// A1..A12
		foreach ($fields AS $i=>$field) 
			$sheet->setCellValue($cell[$i], $formula[$field] );
		
		// set the data
		$fields = ['surfout','blendacc','pdacc','tightout'];
		$cell = CellRange("A", 13, 16);	// A13..A16
		foreach ($fields AS $i=>$field) 
			$sheet->setCellValue($cell[$i], $data[$field] );
		
		$sheet->setCellValue('A17', $formula['r_batch_score'] );
		$sheet->setCellValue('Q1', $formula['r_batch_quality'] );

		$result['score'] = 		$sheet->getCell('A17')->getCalculatedValue();
		$result['quality'] =	$sheet->getCell('Q1')->getCalculatedValue();
		break;
	case "wrapping": // ---------------------------------------------------- wrapping ---------------------------------------------------------------
		// set the formulas
		$fields = ['color','headend','wrapok','incision','empty','tightness','veins','crease','spot','blot','seam','hole','crack','splice'];
		$cell = CellRange("A", 18, 31);	// A18..A31
		foreach ($fields AS $i=>$field) 
			$sheet->setCellValue($cell[$i], $data[$field] );
			
		$sheet->setCellValue('A32', $formula['w_batch_score'] );
		$sheet->setCellValue('Q1', $formula['w_batch_quality'] );
		
		$result['score'] = 		$sheet->getCell('A32')->getCalculatedValue();
		$result['quality'] =	$sheet->getCell('Q1')->getCalculatedValue();
		break;
	case "cutting": // ---------------------------------------------------- cutting ---------------------------------------------------------------
		// set the formulas
		$fields = ['headend','incision','empty','crease','blot','seam','crack'];
		$cell = CellRange("A", 33, 39);	// A33..A39
		foreach ($fields AS $i=>$field)
			$sheet->setCellValue($cell[$i], $data[$field] );
		
		$sheet->setCellValue('A40', $formula['c_batch_score'] );
		$sheet->setCellValue('Q1', $formula['c_batch_quality'] );
		
		$result['score'] = 		$sheet->getCell('A40')->getCalculatedValue();
		$result['quality'] =	$sheet->getCell('Q1')->getCalculatedValue();
		break;
	case "storage": // ---------------------------------------------------- storage ---------------------------------------------------------------
		// set the formulas
		$fields = ['dopant','headend','empty','seam','hole','break','deworm'];
		$cell = CellRange("A", 41, 47);	// A41..47
		foreach ($fields AS $i=>$field) 
			$sheet->setCellValue($cell[$i], $data[$field] );
		
		$fields = ['m_outlow','m_outhigh','m_inspec','m_2inspec'];
		$cell = CellRange("A", 48, 51);	// A48..51
		foreach ($fields AS $i=>$field)
			$sheet->setCellValue($cell[$i], $formula[$field] );

		$sheet->setCellValue('A52', $formula['s_batch_score'] );
		$sheet->setCellValue('Q1', $formula['s_batch_quality'] );

		$result['score'] = 		$sheet->getCell('A52')->getCalculatedValue();
		$result['quality'] =	$sheet->getCell('Q1')->getCalculatedValue();
		break;
	default:
		echo "table not found";
}

// save the result
$sql = sprintf("UPDATE gwc_handmade.%s SET score='%s', quality='%s' WHERE id=%s", $table, $result['score'], $result['quality'], $id);
$database->query($sql);
$database->execute();

echo json_encode($result);

?>