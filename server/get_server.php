<?php

// returns the server ip
// used to determine whether to show the login box
// (login is only shown on life-server)

echo json_encode($_SERVER['SERVER_ADDR']);

?>