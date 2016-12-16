<?php

/*------------------ statistical functions ---------------*/
function mean($array) {
    $count = count($array);
    if ($count == 0)	return 0;
    $total = 0;
    foreach ($array as $value) 
        $total = $total + $value; 
    $average = ($total/$count);
    return $average;
}

function stddev($array) {
  $n = 0;
  $mean = 0;
  $M2 = 0;
  foreach($array as $x){
      $n++;
      $delta = $x - $mean;
      $mean = $mean + $delta/$n;
      $M2 = $M2 + $delta*($x - $mean);
  }
	if ($n == 1) $n = 0;
  $variance = $M2/($n - 1);
  return sqrt($variance);
}

// coefficient of variance
function cof_var($array) {
    return stddev($array) / mean($array) * 100;
}

function variance($array) {
	$tmp = stddev($array);
	return $tmp*$tmp;
}

function cp($array, $min, $max) {			// bereken de Cp
	if (count($array) < 3)		// minimum datasize
		return "-";
	$LSL = $min;
	$USL = $max;
	$SIGMA = stddev($array);
	if ($SIGMA == 0) $SIGMA = 0.000000001;
	$CP = ($USL-$LSL)/(6*$SIGMA);
	return $CP; //max([$CP, 0]);
}

function cpk($array, $min, $max) {			// bereken de Cpk
	if (count($array) < 3)		// minimum datasize
		return "-";
	$LSL = $min;
	$USL = $max;
	$SIGMA = stddev($array);
	if ($SIGMA == 0) $SIGMA = 0.000000001;
	$AVG = mean($array);
	$CPL = ($AVG-$LSL)/(3*$SIGMA);
	$CPU = ($USL-$AVG)/(3*$SIGMA);
	$CPK = min($CPL,$CPU);
	return $CPK; //max([$CPK, 0]);
}

// returns the number of items not in range
function offrange($array, $min, $max) {
	$out = 0;
	foreach($array as $x){
		if (($x > $max) || ($x < $min)) 
			$out++;
	}
	return $out;
}

?>
