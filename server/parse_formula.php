<?php

// calculate an excel-style formula stored in the database

require_once 'Classes/pdo.php';
require_once 'Classes/PHPExcel.php';

// parse an excel-style formula and returns the result
// argument-1: the id of the formula (which formula in the table)
// argument-2: the arguments that are used in the formula (in an associative array)
// the arguments are in the form: ['A1'=>12, 'A2'=>$var]
// the formula should refer to the cells that are named in the arguments

// check the formula
function testFormula($sheet,$cell) {
	$formulaValue = $sheet->getCell($cell)->getValue();
	$calculate = false;
	try {
		$tokens = PHPExcel_Calculation::getInstance()->parseFormula($formulaValue,$sheet->getCell($cell));
		$calculate = true;
	} catch (Exception $e) {
		return false;
	}
	if ($calculate) {
		try {
			$cellValue = $sheet->getCell($cell)->getCalculatedValue();
		} catch (Exception $e) {
			return false;
		}
	}
	return true;
}

function CalcFormula($id, $args) {
	global $formulas;
	
	$formula = $formulas[$id];

	$objPHPExcel = new PHPExcel();
	$sheet = $objPHPExcel->getActiveSheet();
	
	// fill the cells with values
	foreach($args as $cell => $val) {
		$sheet->setCellValue($cell, $val);
	}
	
	// set the formula to use
	$sheet->setCellValue('B1', $formula);

	// double check the formula
	$ok = $sheet->getCell('B1')->isFormula();	
	$ok = ($ok && testFormula($sheet, 'B1'));

	// calculate and return the result
	$result = (($ok) ? $sheet->getCell('B1')->getCalculatedValue() : 'Error in Formula!');
	$objPHPExcel->__destruct();

	return (is_numeric($result*1)) ? $result : "";
}

// get all formulas and store these in an array
$formulas = array();	
$database = new Database();
$database->query("SELECT * FROM gwc_pline.formulas");
$rows = $database->resultset();
foreach ($rows AS $row) {
	$formulas[$row['id']] = $row['formula'];
}

/*
// test formula calculation
$objPHPExcel = new PHPExcel();
$sheet = $objPHPExcel->getActiveSheet();
$sheet->setCellValue('B1', $formulas[1]);
$sheet->setCellValue('A1', 2);
echo $sheet->getCell('B1')->getCalculatedValue();
*/

?>