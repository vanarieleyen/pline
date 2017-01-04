<?php

require_once 'language.php';

extract($_GET);

echo sprintf("<label><input type='radio' name='%s' value='Raw' checked>%s</label><br>", $name, $LABELS[534][$lang]);
echo sprintf("<label><input type='radio' name='%s' value='Average'>%s</label><br>", $name, $LABELS[158][$lang]);
echo sprintf("<label><input type='radio' name='%s' value='Deviation'>%s</label><br>", $name, $LABELS[517][$lang]);
echo sprintf("<label><input type='radio' name='%s' value='Variance'>%s</label><br>", $name, $LABELS[518][$lang]);
echo sprintf("<label><input type='radio' name='%s' value='Cpk'>%s</label><br>", $name, $LABELS[40][$lang]);
echo sprintf("<label><input type='radio' name='%s' value='Dist'>%s</label><br>", $name, $LABELS[314][$lang]);


?>
