<?php

require_once 'language.php';

extract($_GET);

echo sprintf("<label><input type='radio' name='%s' value='IMR' checked>I-MR</label><br>", $name);
echo sprintf("<label><input type='radio' name='%s' value='xbar'>Xbar-Range</label><br>", $name);
echo sprintf("<label><input type='radio' name='%s' value='C'>C Chart</label><br>", $name);
echo sprintf("<label><input type='radio' name='%s' value='U'>U Chart</label><br>", $name);
echo sprintf("<label><input type='radio' name='%s' value='Np'>Np Chart</label><br>", $name);
echo sprintf("<label><input type='radio' name='%s' value='P'>P Chart</label><br>", $name);



?>
