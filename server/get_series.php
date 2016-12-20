<?php


include 'Classes/pdo.php';
include realpath(dirname(__FILE__))."/statistics.php";		// statistical functions


extract($_POST);

if ($ticks == 0)	$ticks=1;
$tijd = array();
$kleur = "rgb(56, 56, 56)";	// kleur voor labels en ticks
$top = 25;		// default for labels

//file_put_contents("debug.txt", $what);

// checks if a date is between start and end
// note that it compares strings, so the date MUST be in YYYY-MM-DD format!
function between($date, $start, $end) {
	return ( ( $date >= $start ) && ( $date < $end ) );
}

$database = new Database();

$query = sprintf("SELECT * FROM gwc_pline.%s WHERE (DATE(date) BETWEEN '%s' AND '%s') AND product='%s' ORDER BY date",
							$table, $start, $end, $product);

$database->query($query);
$rows = $database->resultset();

$data = array();	// the output data
switch($type) {
	case "raw":		
		$idx = 1;
		foreach ($rows as $i=>$row) {
			foreach ($field as $naam) {
				if (trim($row[$naam]) != "") 
					array_push($data, array($idx++, floatval($row[$naam]), $row['date'] ));
			}
		}
		break;
	case "average":
		$tmp = array();
		$q = 1;
		$sample_size = round($database->rowCount() / 20);
		foreach ($rows as $idx => $row) {
			foreach ($field as $naam) {
				$val = $row[$naam];
				if (is_numeric($val)) {
					array_push($tmp, $row);			
					if ($idx % $sample_size == 0) {
						array_push($data, array($q++, mean(array_column($tmp, $naam)), $row['date'] ));	
						$tmp = [];		
					}
				}
			}	
		}
		break;
	case "deviation":
		$tmp = array();
		$q = 1;
		$sample_size = round($database->rowCount() / 20);
		foreach ($rows as $idx => $row) {
			foreach ($field as $naam) {
				$val = $row[$naam];
				if (is_numeric($val)) {
					array_push($tmp, $row);			
					if ($idx % $sample_size == 0) {
						array_push($data, array($q++, stddev(array_column($tmp, $naam)), $row['date'] ));	
						$tmp = [];		
					}
				}
			}	
		}
		break;
	case "variance":
		$tmp = array();
		$q = 1;
		$sample_size = round($database->rowCount() / 20);
		foreach ($rows as $idx => $row) {
			foreach ($field as $naam) {
				$val = $row[$naam];
				if (is_numeric($val)) {
					array_push($tmp, $row);			
					if ($idx % $sample_size == 0) {
						array_push($data, array($q++, cof_var(array_column($tmp, $naam)), $row['date'] ));	
						$tmp = [];		
					}
				}
			}	
		}
		break;
	case "cpk":
		// get the specifications of the product
		$query = sprintf("SELECT %s_min AS min, %s_max AS max, DATE(start) as start, DATE(end) as end 
					 			FROM gwc_slimline.products_finished WHERE pid='%s' ", $field, $field, $product);
		$database->query($query);
		$sp = $database->resultset();

		$tmp = array();
		$q = 0;
		$sample_size = 50;
		foreach ($rows as $idx => $row) {
			$val = $row['value'];
			if (is_numeric($val)) {
				array_push($tmp, $row);
				if (count($tmp) > $sample_size) {
					$datum = $row['date'];
					foreach ($sp as $val) {
						if (between($datum, $val['start'], $val['end'])) {
							$low = $val['min'];
							$high = $val['max'];
							array_push($data, array($q, cpk(array_column($tmp, 'value'), $low, $high), $row['date'] ));
							$tmp = [];
							$q++;
						}
					}				
				}
			}
		}
		break;
	default: 
		echo "";	return;	// not available
}


//echo print_r($data); return;

$datasize = count($data);

if ($datasize < 5) {		// check if there is enough data
	echo "";
	return;
}

// get the specifications of the product
$query = sprintf("SELECT %s AS lsl, %s AS usl, start, end FROM gwc_pline.specs WHERE name='%s' ",
						$spec['min'], $spec['max'], $product);
						
$database->query($query);
$rows = $database->resultset();

$s = array();
foreach ($rows as $row) {
	$min35 = $row['lsl'];
	$max35 = $row['usl'];
	$norm = ($min35+$max35)/2;
	$min20 = $norm-(($norm-$min35)/35*20);
	$max20 = $norm+(($max35-$norm)/35*20);
	array_push($s, array($row['start'], $row['end'], $min35, $min20, $norm, $max20, $max35));
}
//echo print_r($s);	return;
$specs = array();	// array with the specs [from, to, min35, min20, norm, max20, max35]) to use for each point in the data
$oldate = "";
$from = 0;
$to = 0;
$spec = $s[0];
$oldate = $spec[1];
array_push($specs, array($from, $datasize, $spec[2], $spec[3], $spec[4], $spec[5], $spec[6]));

foreach($data as $key => $val) {
	$date = $val[2];	// val = [[x][value][date]]
	foreach($s as $spec) {
		if (between($date, $spec[0], $spec[1])) {
			if ($spec[1] != $oldate) {
				$oldate = $spec[1];
				$to = $key;
				$from = $to;
				$specs[count($specs)-1][1] = $to;
				array_push($specs, array($from, $datasize, $spec[2], $spec[3], $spec[4], $spec[5], $spec[6]));
			}
		}
	}   
}


// make an array with the time labels on the x-axis (the data is provided as series of [[x][value][date], [][][], ... ]
$split = round(count($data) / $ticks);
foreach($data as $idx => $value) {
	if ($split != 0)
		if (($idx % $split) == $split-2)
			if (array_key_exists(2, $value))
				$tijd[] = array($idx+1, substr($value[2], 0, 10) );
}

// set the y-as opties
function yaxes() {
	global $ylabel, $kleur, $ygrid;
	$axes = sprintf('{
			position: "left",
			axisLabel: "%s",
			axisLabelUseCanvas: true,
			axisLabelFontSizePixels: 12,
			axisLabelFontFamily: "Verdana, Arial",
			axisLabelColour: "%s",
			axisLabelPadding: 3,
			font: { size: 10, weight: "light", family: "sans-serif", color: "%s" }
		}', $ylabel, $kleur, $kleur );
	return $axes;
}

// set the x-as opties
function xaxes() {
	global $xlabel, $top, $tijd, $kleur, $xgrid;
	$axes = sprintf('{
			position: "bottom",
			axisLabel: "",
			axisLabelUseCanvas: true,
			axisLabelFontSizePixels: 12,
			axisLabelFontFamily: "Verdana, Arial",
			axisLabelColour: "%s",
			axisLabelPadding: %s,
			ticks:%s, 
			font: { size: 10, weight: "light", family: "sans-serif", color: "%s" }
		}', $kleur, $top, json_encode($tijd), $kleur );
	return $axes;
}

//var_dump($data);

// set the dataset
$dataset = sprintf('{
		label: "%s",
		data: %s,
		yaxis: 1,
		color: "%s",
		lines: {show:true},
		bars: {show:false, lineWidth: 0, fill:%s}
	}', $label, json_encode($data), $color, $trans );

// set the background colors
function background($specs) {
	$red = "#FFAD99";
	$yellow = "#FFD2AA";
	$green = "#AAFFAA";
	$b0 = -100000;
	$b5 = 100000;
	$result = "";
	
	if ( !is_array($specs))
		return $result;
	foreach($specs as $spec) {	// set the specs for each period
		$from = $spec[0];
		$to = $spec[1];
		$b1 = $spec[2];
		$b2 = $spec[3];
		$b3 = $spec[5];
		$b4 = $spec[6];
		$result .= sprintf("{xaxis: {from:%s, to:%s}, yaxis: {from:%s, to:%s}, color:'%s'},
									{xaxis: {from:%s, to:%s}, yaxis: {from:%s, to:%s}, color:'%s'},	
									{xaxis: {from:%s, to:%s}, yaxis: {from:%s, to:%s}, color:'%s'},
									{xaxis: {from:%s, to:%s}, yaxis: {from:%s, to:%s}, color:'%s'},
									{xaxis: {from:%s, to:%s}, yaxis: {from:%s, to:%s}, color:'%s'},",
									$from, $to, $b0, $b1, $red,
									$from, $to, $b1, $b2, $yellow,
									$from, $to, $b2, $b3, $green,
									$from, $to, $b3, $b4, $yellow,
									$from, $to, $b4, $b5, $red);
	}
	$result = substr($result, 0, -1);		// remove last comma
	return $result;
}

// set the remaining options
$options = sprintf('
			{
			space: %s,
			canvas: true,
			series: {
				stack: false,
				downsample: { threshold: %s },
				curvedLines: {	
					active: %s, 
					apply:true
				}
			},
			trendline: { show: %s },
			grid: {
				markings: [%s]
			},
			legend: {
				noColumns: 2,
				backgroundColor: "white",
				backgroundOpacity: 0.3,
				color: "grey"
			},
			yaxes: [%s],
			xaxes: [%s]
		}', $space, $samples, $curved, $trend, background($specs), yaxes(), xaxes() );	

$canvas = "canvas".rand(0, 9999)."_".time();	// generate a unique name for the canvas

$empty = sprintf("$('%s').empty(); ", $element);
$plot = sprintf('var %s = $.plot($("%s"), [%s], %s); ', 
						$canvas, $element, $dataset, $options);
$toIMG = sprintf("$('%s').html('<img src=\"'+%s.getCanvas().toDataURL('image/png')+'\"/>');", $element, $canvas);

echo $empty.$plot.$toIMG;

?>