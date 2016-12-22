<?php

// get the product names from the database and return it as options for a selectbox
// call: get_products.php?start=2016-03-10&end=2016-03-19

require_once realpath($_SERVER['DOCUMENT_ROOT']).'/ajax/language.php';

extract($_GET);

echo sprintf("<label><input type='radio' name='%s' value='Raw' checked>%s</label><br>", $name, $LABELS[534][$lang]);
echo sprintf("<label><input type='radio' name='%s' value='Average'>%s</label><br>", $name, $LABELS[158][$lang]);
echo sprintf("<label><input type='radio' name='%s' value='Deviation'>%s</label><br>", $name, $LABELS[517][$lang]);
echo sprintf("<label><input type='radio' name='%s' value='Variance'>%s</label><br>", $name, $LABELS[518][$lang]);
echo sprintf("<label><input type='radio' name='%s' value='Cpk'>%s</label><br>", $name, $LABELS[40][$lang]);
echo sprintf("<label><input type='radio' name='%s' value='Dist'>%s</label><br>", $name, $LABELS[314][$lang]);



?>
