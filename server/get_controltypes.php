<?php

require_once 'language.php';

extract($_GET);

echo sprintf("<label><input type='radio' name='%s' value='IMR' checked>I-MR</label><br>", $name);
echo sprintf("<label><input type='radio' name='%s' value='XBAR'>X-bar R/s</label><br>", $name);
//echo sprintf("<label><input type='radio' name='%s' value='C'>C</label><br>", $name);
//echo sprintf("<label><input type='radio' name='%s' value='U'>U</label><br>", $name);
//echo sprintf("<label><input type='radio' name='%s' value='NP'>Np</label><br>", $name);
//echo sprintf("<label><input type='radio' name='%s' value='P'>P</label><br>", $name);



?>
