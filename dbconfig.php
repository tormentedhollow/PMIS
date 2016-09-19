<?php

$DB_host = "localhost";
$DB_user = "root";
$DB_pass = "";
$DB_name = "dasystem";

try
{
	$DB_con = new PDO("mysql:host={$DB_host};dbname={$DB_name}",$DB_user,$DB_pass);
	$DB_con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
	$e->getMessage();
}

define( 'BASE_PATH', 'http://localhost/pmed-angular/');
define('DB_HOST', 'localhost');
define('DB_NAME', 'dasystem');
define('DB_USERNAME','root');
define('DB_PASSWORD','');


$mysqli  = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
if (mysqli_connect_errno()) {
	echo("Failed to connect, the error message is : ". mysqli_connect_error());
	exit();
}