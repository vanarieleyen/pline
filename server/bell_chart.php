<?php

// generate the bell chart from raw data


extract($_POST);

$sp = $specs[2]-$specs[0];	// ruimte binnen de specs
$scale = $samples/$sp;		// hoeveel de waarden moeten worden aangepast om in de sample-ruimte te passen

// set specification limits
$min35 = round($specs[0]*$scale);
$norm  = round($specs[1]*$scale);
$max35 = round($specs[2]*$scale);

$delta = max($norm-$min35, $max35-$norm);
$min20 = round($norm - ($delta/35*20));
$max20 = round($norm + ($delta/35*20));

$serie = array();
$tijd = array();

$kleur = "rgb(56, 56, 56)";	// kleur voor labels en ticks

$top = 25;		// default for labels

$serie = array();
$serie = json_decode(stripslashes($what[0]));		// put the data in serie-array

$distribution = array();		// the individual bars
$left = $min35-($min35/100*3);	// set the limits for values that are too much out of bounds
$right = $max35+($max35/100*3);

foreach($serie as $key => $value) {
	if (isset($value[1]))
		$val = is_numeric($value[1]) ? round($value[1]*$scale) : 0;
	else
		$val = 0;
	$index = $val; 
	if (($index > $left) && ($index <  $right)) { 
		if (isset($distribution[$index]))
			$distribution[$index]++;
		else
			$distribution[$index] = 0;
	}
}

ksort($distribution);

$barwidth = 1000000; // set at an imaginary large value
$old = 0;
$result = array();
foreach ($distribution as $key => $value) {
	$result[] = array($key, $value);
	if ($key-$old < $barwidth) {
		$barwidth = $key-$old;
	}
	$old = $key;
}
$serie = $result;

$tijd = array();
$tijd[0] = array($min35, round($min35/$scale, 2) );
$tijd[1] = array($min20, round($min20/$scale, 2) );
$tijd[2] = array($norm,  round($norm/$scale, 2) );
$tijd[3] = array($max20, round($max20/$scale, 2) );
$tijd[4] = array($max35, round($max35/$scale, 2) );

$top = 10;

// file_put_contents("debug.txt", print_r($tijd, true));

if ($orientation == "horizontal") {

	// set the background colors
	function background($b1, $b2, $b3, $b4) {
		global $specs;	
		$red = "#FFAD99";
		$yellow = "#FFD2AA";
		$green = "#AAFFAA";
		$b0 = -100000;
		$b5 = 100000;
	
		if (!is_array($specs))
			return "";
		if (count($specs) == 0) {
			return "";
		} else {
			return 
				sprintf("{ xaxis: { from:%s, to:%s }, color: '%s' },", $b0, $b1, $red).
				sprintf("{ xaxis: { from:%s, to:%s }, color: '%s' },", $b1, $b2, $yellow).
				sprintf("{ xaxis: { from:%s, to:%s }, color: '%s' },", $b2, $b3, $green).
				sprintf("{ xaxis: { from:%s, to:%s }, color: '%s' },", $b3, $b4, $yellow).
				sprintf("{ xaxis: { from:%s, to:%s }, color: '%s' } ", $b4, $b5, $red);
		}
	}
	
	// display the grid on the graph
	$xgrid = ($grid[0] == '0') ? "tickLength: 0," : "";
	$ygrid = ($grid[1] == '0') ? "tickLength: 0," : "";
	
	function yaxes() {
		global $ylabel, $kleur, $ygrid;
		$axes = sprintf('
			{
				position: "left",
				axisLabel: "%s",
				axisLabelUseCanvas: true,
				axisLabelFontSizePixels: 12,
				axisLabelFontFamily: "Verdana, Arial",
				axisLabelColour: "%s",
				axisLabelPadding: 3,
				%s
				font: { size: 10, weight: "light", family: "sans-serif", color: "%s" }
			},', $ylabel, $kleur, $ygrid, $kleur );
		return substr($axes, 0, -1);		// remove last comma
	}
	
	function xaxes() {
		global $xlabel, $top, $tijd, $kleur, $xgrid;
		$axes = sprintf('
			{
				position: "bottom",
				axisLabel: "%s",
				axisLabelUseCanvas: true,
				axisLabelFontSizePixels: 12,
				axisLabelFontFamily: "Verdana, Arial",
				axisLabelColour: "%s",
				axisLabelPadding: %s,
				ticks:%s, 
				%s
				font: { size: 10, weight: "light", family: "sans-serif", color: "%s" }
			},', $xlabel, $kleur, $top, json_encode($tijd), $xgrid, $kleur );
		return substr($axes, 0, -1);		// remove last comma
	}
	
	//file_put_contents("debug.txt", $what);
	// set the dataset
	$dataset = sprintf('
		{
			label: "%s",
			data: %s,
			yaxis: 1,
			color: "%s",
			lines: {show:false},
			bars: {show:true, lineWidth: 1}
		},', $label[0], json_encode($serie), $color);
		
	
	$dataset = substr($dataset, 0, -1);		// remove last comma
	//file_put_contents("debug.txt", $dataset);
	
	//$barwidth = 7;
	// set the options
	$options = sprintf('
				{
				space: %s,
				canvas: true,
				series: {
					downsample: { threshold: %s }
				},
				grid: {
					markings: [%s]
				},
				legend: {
					noColumns: 2,
					backgroundColor: "white",
					backgroundOpacity: 0.3,
					color: "grey"
				},
				bars: {
					barWidth: %s
				},
				yaxes: [%s],
				xaxes: [%s]
			}', $space, $samples, background($min35, $min20, $max20, $max35), $barwidth, yaxes(), xaxes() );	
	
} else {
	
	// set the dataset
	$dataset = sprintf('
		{
			data: %s,
			yaxis: 1,
			color: "%s",
			lines: {show:false},
			bars: {show:true, lineWidth: 1}
		},', json_encode($serie), $color);
	$dataset = substr($dataset, 0, -1);		// remove last comma

	// set the options
	$options = sprintf('
				{
				space: %s,
				canvas: true,
				series: {
					downsample: { threshold: %s }
				},
				bars: {
					barWidth: %s
				},
				xaxis: {
					show: false
				},
				yaxis: {
					show: false
				}
			}', $space, $samples, $barwidth );	
	
}

$canvas = "canvas".rand(0, 9999)."_".time();	// generate a unique name for the canvas

$empty = sprintf("$('%s').empty(); ", $element);
$plot = sprintf('var %s = $.plot($("%s"), [%s], %s); ', 
						$canvas, $element, $dataset, $options);
$toIMG = sprintf("$('%s').html('<img src=\"'+%s.getCanvas().toDataURL('image/png')+'\"/>');", $element, $canvas);

//file_put_contents("debug.txt", $plot);

echo $empty.$plot.$toIMG;

?>