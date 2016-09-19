<?php

$db = new PDO('mysql:host=localhost;dbname=dasystem;charset=utf8mb4', 'root', '');
$ctr=0;
foreach($db->query('SELECT * FROM `tbl_benea`') as $prov) {
    foreach($db->query('SELECT id FROM `month` WHERE month_name = "'.$prov['month'].'"') as $prov_id) {
	    echo $prov['month'].' '.$prov_id['id'].' <br><hr><hr>'; 
		    $stmt = $db->prepare("UPDATE tbl_benea set month = ".$prov_id['id']." where bene_id = ".$prov['bene_id']);
		    $stmt->execute();

			echo "<br>";
	}
}
echo $ctr;
?>