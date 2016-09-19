<?php
/*
Site : http:www.smarttutorials.net
Author :muni
*/



//site specific configuration declartion
define( 'BASE_PATH', 'http://localhost/pmed-angular/');
define('DB_HOST', 'localhost');
define('DB_NAME', 'dasystem');
define('DB_USERNAME','root');
define('DB_PASSWORD','');


$mysqli  = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
$mysqli->query("SET NAMES 'utf8'");
$mysqli->query("SET CHARACTER_SET 'utf8'");
if (mysqli_connect_errno()) {
	echo("Failed to connect, the error message is : ". mysqli_connect_error());
	exit();
}

