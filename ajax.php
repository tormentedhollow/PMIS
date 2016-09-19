<?php
ob_start();
session_start();
require_once 'config.php';
if( isset($_POST['type']) && !empty($_POST['type'] ) ){
	$type = $_POST['type'];
	switch ($type) {
		case "log_in":
			log_in($mysqli);
			break;
		case "getMFO":
			getMFO($mysqli);
			break;
		case "getMFOFilter":
			getMFOFilter($mysqli);
			break;
		case "getMFOFilterBanner":
			getMFOFilterBanner($mysqli);
			break;
		case "getMFOQuarterBanner":
			getMFOQuarterBanner($mysqli);
			break;
		case "getAllQuarterBanner":
			getAllQuarterBanner($mysqli);
			break;
		case "getProvince":
			getProvince($mysqli);
			break;
		case "getMunicipal":
			getMunicipal($mysqli);
			break;
		case "getBarangay":
			getBarangay($mysqli);
			break;
		case "getMonth":
			getMonth($mysqli);
			break;
		case "getBanner":
			getBanner($mysqli);
			break;
		case "getGroup":
			getGroup($mysqli);
			break;
		case "getIndividual":
			getIndividual($mysqli);
			break;
		case "getIndiMFO":
			getIndiMFO($mysqli);
			break;
		case "getUnitMeasure":
			getUnitMeasure($mysqli);
			break;
		case "getMFOName":
			getMFOName($mysqli);
			break;
		case "getMFOHeader":
			getMFOHeader($mysqli);
			break;
		case "getMFOAll":
			getMFOAll($mysqli);
			break;
		case "getPhysical":
			getPhysical($mysqli);
			break;
		case "getPhysicalByHeader":
			getPhysicalByHeader($mysqli);
			break;
		case "getPhysicalMFO":
			getPhysicalMFO($mysqli);
			break;
		case "getPhysicalBanner":
			getPhysicalBanner($mysqli);
			break;
		case "add_remarks":
			add_remarks($mysqli);
			break;
		case "add_remarksDistrict":
			add_remarksDistrict($mysqli);
			break;
		case "getkiloDetails":
			getkiloDetails($mysqli);
			break;
		case "getBeneDetails":
			getBeneDetails($mysqli);
			break;
		case "add_kilo":
			add_kilo($mysqli);
			break;
		case "edit_kilo":
			edit_kilo($mysqli);
			break;
		case "edit_group":
			edit_group($mysqli);
			break;
		case "edit_bene":
			edit_bene($mysqli);
			break;
		case "edit_individual":
			edit_individual($mysqli);
			break;
		case "add_individual":
			add_individual($mysqli);
			break;				
		case "add_bene":
			add_bene($mysqli);
			break;
		case "add_group":
			add_group($mysqli);
			break;
		case "add_ob":
			add_ob($mysqli);
			break;
		case "add_oba":
			add_oba($mysqli);
			break;
		case "add_bed1":
			add_bed1($mysqli);
			break;
		case "delete_bene":
			delete_bene($mysqli, $_POST['id']);
			break;
		case "delete_bed1":
			delete_bed1($mysqli, $_POST['items']);
			break;
		case "delete_kilo":
			delete_kilo($mysqli, $_POST['id']);
			break;
		case "delete_group":
			delete_group($mysqli, $_POST['id']);
			break;
		case "delete_individual":
			delete_individual($mysqli, $_POST['id']);
			break;		
		case "getByDistrict":
			getByDistrict($mysqli, $_POST['provs'], $_POST['dist']);
			break;
		case "getByDistrictMFO":
			getByDistrictMFO($mysqli);
			break;
		case "getBeneMFO":
			getBeneMFO($mysqli);
			break;
		case "getBeneTotal":
			getBeneTotal($mysqli);
			break;
		case "logout":
			logout();
			break;		
		case "performance":
			performance($mysqli);
			break;	
		case "financial_Q1":
			financial_Q1($mysqli);
			break;
		case "view_ob":
			view_ob($mysqli);
			break;	
		case "view_oba":
			view_oba($mysqli);
			break;		
		case "updateUser":
			updateUser($mysqli);
			break;	
		case "getUser":
			getUser($mysqli);
			break;
		case "changePassword":
			changePassword($mysqli);
			break;
		case "changeAvatar":
			changeAvatar($mysqli);
			break;
		case "view_P":
			view_P($mysqli);
			break;	
		case "view_service":
			view_service($mysqli);
			break;
		case "view_service_month":
			view_service_month($mysqli);
			break;
		default:
			invalidRequest();

	}

}else{
	invalidRequest();
}

function view_service($mysqli){
	try{	
		$gid= $mysqli->real_escape_string(isset( $_POST['gid'] ) ? $_POST['gid'] : '');
		$query = "SELECT DISTINCT tbl_mfo.mfo_name  FROM tbl_groupservice
		inner join `tbl_mfo` on tbl_groupservice.mfo_id = tbl_mfo.mfo_id
		where  tbl_groupservice.group_id = '$gid' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$data['data'][] = $row;
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function view_service_month($mysqli){
	try{	
		$mon= $mysqli->real_escape_string(isset( $_POST['mon'] ) ? $_POST['mon'] : '');
		$query = "SELECT DISTINCT tbl_group.name  FROM tbl_groupservice
		inner join `tbl_group` on tbl_groupservice.group_id = tbl_group.id
		where  tbl_groupservice.month = '$mon' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$data['data'][] = $row;
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}


function view_P($mysqli){
	try{
		$mon = $_POST['mon'];
		$mfo = $_POST['mfo'];
		$unit = $_POST['unit'];
		$ta = $_POST['ta'];
		$prog_id = '';
		if(isset($_POST['id'])&&$_POST['id']!='')
			$prog_id = $_POST['id'];
		else
			$prog_id = $_SESSION['program_id'];
		$tbl = '';
		if($ta == 'T'){
			$tbl = 'tbl_registered';
		}
		else if($ta == 'A'){
			$tbl = 'tbl_registereda';
		}
		$str="";
		if(intval($mon)>0){
			$str = " and month = ".$mon;
		}
		$str1="";
		if($mfo!=''&&isset($mfo)){
			$str1=" FORMAT(header_id,2)=FORMAT('".$mfo."',2) and";
		}
		$query = "SELECT * FROM `".$tbl."` inner join tbl_mfo on `".$tbl."`.mfo_id=`tbl_mfo`.mfo_id WHERE".$str1." unit_id = (select id from unit_of_measure where description = '".$unit."')".$str." and user_id in (select user_id from users where program_id = ".$prog_id.") order by  header_id";
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$data['data'][] = $row;
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function view_ob($mysqli){
	try{
		$id = $_POST['id'];
		if($id==''){
			$id = $_SESSION['program_id'];
		}
		$mon = $_POST['mon'];
		$query = "SELECT * FROM `tbl_obligation` inner join tbl_mfo on `tbl_obligation`.mfo_id=`tbl_mfo`.mfo_id inner join month on `tbl_obligation`.month=`month`.id where month='$mon' and user_id in (select user_id from users where program_id = ".$id.")";
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$data['data'][] = $row;
		}
		$data['q'] = "SELECT * FROM `tbl_obligation` inner join tbl_mfo on `tbl_obligation`.mfo_id=`tbl_mfo`.mfo_id inner join month on `tbl_obligation`.month=`month`.id where month='$mon' and user_id in (select user_id from users where program_id = ".$id.")";
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function view_oba($mysqli){

	try{
		$id = $_POST['id'];
		if($id==''){
			$id = $_SESSION['program_id'];
		}
		$mon = $_POST['mon'];
		$query = "SELECT * FROM `tbl_obligationa` inner join tbl_mfo on `tbl_obligationa`.mfo_id=`tbl_mfo`.mfo_id where month='$mon' and user_id in (select user_id from users where program_id = ".$id.")";
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$data['data'][] = $row;
		}
		$data['q'] = "SELECT * FROM `tbl_obligationa` inner join tbl_mfo on `tbl_obligationa`.mfo_id=`tbl_mfo`.mfo_id where month='$mon' and user_id in (select user_id from users where program_id = ".$id.")";
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function getProvince($mysqli){
	try{	
		$query = "SELECT * FROM `tbl_province`";
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$data['data'][] = $row;
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function getMunicipal($mysqli){
	try{	
		$query = "SELECT * FROM `tbl_municipal`";
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$data['data'][] = $row;
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function getBarangay($mysqli){
	try{	
		$query = "SELECT * FROM `tbl_barangay`";
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$data['data'][] = $row;
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function getMonth($mysqli){
	try{	
		$query = "SELECT * FROM `month`";
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$data['data'][] = $row;
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function getGroup($mysqli){
	try{	
		$query = "SELECT *,  (SELECT COUNT(DISTINCT tbl_groupservice.mfo_id)  FROM tbl_groupservice WHERE tbl_groupservice.group_id =tbl_group.id) services FROM tbl_group where created_by in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$data['data'][] = $row;
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function getIndividual($mysqli){
	try{
		$mon= $mysqli->real_escape_string(isset( $_POST['mon'] ) ? $_POST['mon'] : '');
		$gid= $mysqli->real_escape_string(isset( $_POST['gid'] ) ? $_POST['gid'] : '');
		if(isset($mon)&&$mon!=''&&$mon!='0'){	
			$query = "SELECT tbl_individual.*, tbl_group.name, month.month_name, tbl_mfo.mfo_name  FROM `tbl_individual` 
			inner join `tbl_group` on tbl_individual.group_id = tbl_group.id inner join `month` on tbl_individual.month = month.id inner join `tbl_mfo` on tbl_individual.mfo_id = tbl_mfo.mfo_id where month='$mon' and tbl_individual.created_by in (select user_id from users where program_id = ".$_SESSION['program_id'].")";	
		}
		else{
			$query = "SELECT tbl_individual.*, tbl_group.name, month.month_name  FROM `tbl_individual` 
			inner join `tbl_group` on tbl_individual.group_id = tbl_group.id inner join `month` on tbl_individual.month = month.id where group_id='$gid' and tbl_individual.created_by in (select user_id from users where program_id = ".$_SESSION['program_id'].")";	
		}
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$data['data'][] = $row;
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function getIndiMFO($mysqli){
try{	
		$x=0;
		$query = "SELECT * FROM `tbl_mfo` where unitofmeasure=1 and  mfo_id in (select mfo_id from mfo_con_program where program_id = ".$_SESSION['program_id'].")";
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			for($o=1;$o<=12;$o++){ //looping the month
				$queryb1 = "SELECT  count(*) as total FROM tbl_individual where month='$o' and mfo_id= '$row[mfo_id]' and created_by in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
				$resultb1 = $mysqli->query( $queryb1 );
				$rowb1 = $resultb1->fetch_assoc();
				$row['total'][] = $rowb1;

				$queryb2 = "SELECT  count(*) as totalg FROM tbl_groupservice where month='$o' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
				$resultb2 = $mysqli->query( $queryb2 );
				$rowb2 = $resultb2->fetch_assoc();
				$row['totalg'][] = $rowb2;
			}
			$row['ind'] = $x;
			$data['data'][] = $row;
			$x++;	
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function getBeneTotal($mysqli){
	try{	
		$data = array();
	 	$run_total=0;
	 	$run_total2=0;
		for($o=1;$o<=12;$o++){ //looping the month
				$query = "SELECT (sum(male)+sum(female)+sum(ind)) as total, month.month_name FROM `tbl_bene` 
				inner join month on tbl_bene.month = month.id WHERE tbl_bene.month='$o' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
				$result = $mysqli->query( $query );
				$row = $result->fetch_assoc();
				$run_total = $run_total + $row['total'];
				$row['rt'] = $run_total;
				$data['total'][] = $row; 

				$query = "SELECT count(*) as ind, SUM(sex='male') AS male, SUM(sex='female') AS female FROM `tbl_individual` WHERE month='$o' and created_by in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
				$result = $mysqli->query( $query );
				$row = $result->fetch_assoc();
				$run_total2 = $run_total2 + $row['ind'];
				$row['rt'] = $run_total2;
				$data['bene'][] = $row;
		
		}
		//$data['data'][] = $temp;
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}
function getUnitMeasure($mysqli){
	try{	
		$query = "SELECT * FROM `unit_of_measure`";
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$data['data'][] = $row;
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function getMFOName($mysqli){
	try{	
		$query = "SELECT * FROM `tbl_mfo`";
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$data['data'][] = $row;
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function getMFOHeader($mysqli){
	try{	
		$query = "SELECT * FROM `tbl_mfoheader`";
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$data['data'][] = $row;
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function getBeneMFO($mysqli){
	try{	
		$x=0;
		$query = "SELECT * FROM `tbl_mfo` where unitofmeasure=1 and  mfo_id in (select mfo_id from mfo_con_program where program_id = ".$_SESSION['program_id'].")";
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			for($o=1;$o<=12;$o++){ //looping the month
				$queryb1 = "SELECT  (sum(male)+sum(female)+sum(ind)) as b, SUM(groups) as g FROM tbl_benea where month='$o' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
				$resultb1 = $mysqli->query( $queryb1 );
				$rowb1 = $resultb1->fetch_assoc();
				$row['ben'][] = $rowb1;
			}
			$row['ind'] = $x;
			$row['a'] = 1; //accomplishment form
			$data['data'][] = $row;
			$x++;	
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function getBanner($mysqli){
	try{	
		$query = "SELECT * FROM `tbl_banners`";
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$data['data'][] = $row;
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}




function financial_Q1($mysqli){
	try{
		//$data = array();
		
		$strQuery = "SELECT * FROM month";
     	$result = $mysqli->query($strQuery) or exit("Error code ({$mysqli->errno}): {$mysqli->error}");		
        
			$data["data"] = array();
        	while($row = mysqli_fetch_array($result)) {
				$query1 = "SELECT sum(kilo) as kilo1 FROM tbl_registered where month='$row[month_name]'  and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
				$result1 = $mysqli->query($query1) or exit("Error code ({$mysqli->errno}): {$mysqli->error}");
				$row1 = mysqli_fetch_array($result1);
			array_push($data["data"], array(
				"label" => $row['month_name'],
				"value" => $row1["kilo1"]
              	)
           	);			
        	}
		//array_push($data, $arrData);		    
     	
		echo json_encode($data);
		exit;
	}catch (Exception $e){
		$data = array();
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function performance($mysqli){
	try{
		$data = array();
		$strMonth = "SELECT * FROM month";
     	$resultM = $mysqli->query($strMonth) or exit("Error code ({$mysqli->errno}): {$mysqli->error}");
     	while($rowM = mysqli_fetch_array($resultM)) { 
		$strQuery = "SELECT * FROM program";
     	$result = $mysqli->query($strQuery) or exit("Error code ({$mysqli->errno}): {$mysqli->error}");		
        	$arrData=  array(
                    "seriesname" => $rowM["month_name"]                 
              	);
			$arrData["data"] = array();
        	while($row = mysqli_fetch_array($result)) {
        		if($row['id']==6){
        			$query1 = "SELECT sum(financial) as kilo1 FROM tbl_registered where month='$rowM[month_name]'  and user_id in (select user_id from users where program_id != 0)";
        		}
        		else{
        			$query1 = "SELECT sum(financial) as kilo1 FROM tbl_registered where month='$rowM[month_name]'  and user_id in (select user_id from users where program_id = '$row[id]')";
        		}
				$result1 = $mysqli->query($query1) or exit("Error code ({$mysqli->errno}): {$mysqli->error}");
				$row1 = mysqli_fetch_array($result1);
			array_push($arrData["data"], array(
				"value" => $row1["kilo1"]
              	)
           	);			
        	}
		array_push($data, $arrData);		    
     	}
		echo json_encode($data);
		exit;
	}catch (Exception $e){
		$data = array();
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function log_in($mysqli){
	
		$data = array();
		$_SESSION['logged_in'] = false;
		//$username = trim($_POST['username']); 
		//$password = trim($_POST['password']); 
		$username = $mysqli->real_escape_string(isset( $_POST['username'] ) ? $_POST['username'] : '');
		$password = $mysqli->real_escape_string(isset( $_POST['password'] ) ? $_POST['password'] : '');
		
	
		if($username == '' || $password == '' ){
			throw new Exception( "Required fields missing, Please enter and submit" );
		}
		$query = "SELECT * FROM users where username = '$username' and password = '$password' ";
		$result = $mysqli->query($query);
		$data = $result->fetch_assoc();
		$count = $result->num_rows;
		if( $count == 1){
			$data['success'] = true;
			$_SESSION = $data;
			$_SESSION['logged_in'] = true;
			$_SESSION['uid'] = uniqid('ang_');
			$data['uid'] = uniqid('ang_');
			//$data['message'] = 'Log-in successfully.';
				
		} else {
			$data['success'] = false;
			//$data['message'] = "Username and password did not matched";			
		}
		echo json_encode($data);
	}
function updateUser($mysqli){
	try{	
		$data = array();
		$fn = $mysqli->real_escape_string(isset( $_POST['item']['firstName'] ) ? $_POST['item']['firstName'] : '');
		$ln = $mysqli->real_escape_string(isset( $_POST['item']['lastName'] ) ? $_POST['item']['lastName'] : '');
		$un = $mysqli->real_escape_string(isset( $_POST['item']['username'] ) ? $_POST['item']['username'] : '');
		$em = $mysqli->real_escape_string(isset( $_POST['item']['email'] ) ? $_POST['item']['email'] : '');
		$query = "UPDATE users set first_name='$fn', last_name='$ln', username='$un', email='$em' where user_id=".$_SESSION['user_id']."";
		$result = $mysqli->query( $query );	
		if( $mysqli->query( $query ) ){
	
			$data['success'] = true;			
		}
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function changePassword($mysqli){
	try{	
		$data = array();
		$new = $mysqli->real_escape_string(isset( $_POST['item']['new'] ) ? $_POST['item']['new'] : '');
		$query = "UPDATE users set password='$new' where user_id=".$_SESSION['user_id']."";
		$result = $mysqli->query( $query );	
		if( $mysqli->query( $query ) ){
	
			$data['success'] = true;			
		}
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function changeAvatar($mysqli){
	$target_dir = 'images/avatar/';
	$target_file = $target_dir.basename($_FILES["file"]["name"]);
	try{	
		$data = array();
		$filename = $mysqli->real_escape_string(isset( $_FILES['file']['name'] ) ? $_FILES['file']['name'] : '');
		$query = "UPDATE users set image='$filename' where user_id=".$_SESSION['user_id']."";
		$result = $mysqli->query( $query );	
		if( $mysqli->query( $query ) ){
			move_uploaded_file( $_FILES['file']['tmp_name'] , $target_file);
			$data['success'] = true;
			$data['filename']=$filename;	
			$data['filetemp']=$_FILES['file']['tmp_name'];	
			$data['dest']=	$target_file;
		}
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}


function getUser($mysqli){
	try{	
		$data = array();
		$query = "SELECT * FROM `users`  where user_id=".$_SESSION['user_id']."";
		$result = $mysqli->query( $query );		
		$row = $result->fetch_assoc();
		$data['data'][] = $row;
		
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function logout(){
	$data = array();
	session_unset();
	session_destroy();
	$data['success'] = true;
	echo json_encode($data);
}


function getMFO($mysqli){
	$x=0;
	$total=array();
	try{
		if($_SESSION['program_id']=='6'){
			$query = "SELECT * FROM tbl_mfo,unit_of_measure where `unitofmeasure` = `unit_of_measure`.`id` order by sequence,mfo_id";
		}
		else if((int)$_SESSION['program_id']>=10){
			$query = "SELECT * FROM tbl_mfo,unit_of_measure where  mfo_id in (select mfo_id from mfo_con_program where program_id = ".$_SESSION['program_id'].") and `unitofmeasure` = `unit_of_measure`.`id` order by sequence,mfo_id";
		}
		else
			$query = "SELECT * FROM tbl_mfo,unit_of_measure where  mfo_id in (select mfo_id from mfo_con_program where program_id = ".$_SESSION['program_id']." || program_id = 6) and `unitofmeasure` = `unit_of_measure`.`id` order by sequence,mfo_id";

		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			if($row['clickable']=='no'||$row['clickable']=='No'||$row['clickable']=='NO'){
				/*
				$queryno = "SELECT sub_mfo_id as sub FROM header where header_mfo_id='$row[mfo_id]'";
				$resultno = $mysqli->query( $queryno );
				$c=0;
				while ($rowno = $resultno->fetch_assoc()) {
					$row['no'][$c] = $rowno['sub'];
					$c++;
				}
				*/
			}
			else{
				for($o=1;$o<=12;$o++){ //looping the month
					$query1 = "SELECT sum(kilo) as kt FROM tbl_registered where month='$o' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
					$result1 = $mysqli->query( $query1 );
					$row1 = $result1->fetch_assoc();
					$row['kilo'][] = $row1;

					$fquery1 = "SELECT sum(financial) as ft FROM tbl_registered where month='$o' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
					$fresult1 = $mysqli->query( $fquery1 );
					$frow1 = $fresult1->fetch_assoc();
					$row['fin'][] = $frow1;

					$queryb1 = "SELECT  (sum(male)+sum(female)+sum(ind)) as b, SUM(groups) as g FROM tbl_bene where month='$o' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
					$resultb1 = $mysqli->query( $queryb1 );
					$rowb1 = $resultb1->fetch_assoc();
					$row['ben'][] = $rowb1;
				}						
			}
			$row['ind'] = $x;
			$row['mfo_id'] = $row['mfo_id'];
			$row['unit'] = $row['description'];
			$row['area'] = $row['area'];

			$data['data'][] = $row;
			$x++; //increment index object

		}

		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}


function getMFOFilter($mysqli){ //beds & quarter query exclude the beneficiary
	$x=0;
	$total=array();
	try{
		if($_SESSION['program_id']=='6'){
			$query = "SELECT * FROM tbl_mfo inner join unit_of_measure  on tbl_mfo.unitofmeasure =unit_of_measure.id  order by sequence,mfo_id";
		}
		else if((int)$_SESSION['program_id']>=10){
			$query = "SELECT * FROM tbl_mfo inner join unit_of_measure  on tbl_mfo.unitofmeasure =unit_of_measure.id  where mfo_id in (select mfo_id from mfo_con_program where program_id = ".$_SESSION['program_id'].")  and  !(unitofmeasure=1) order by sequence,mfo_id";
		}
		else
			$query = "SELECT * FROM tbl_mfo inner join unit_of_measure  on tbl_mfo.unitofmeasure =unit_of_measure.id  where mfo_id in (select mfo_id from mfo_con_program where program_id = ".$_SESSION['program_id']." || program_id = 6) and !(unitofmeasure=1) order by sequence,mfo_id";

		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			if($row['clickable']=='no'||$row['clickable']=='No'||$row['clickable']=='NO'){
			
			$temp['ind'] = $x;
			$temp['mfo_id'] = $row['mfo_id'];
			$temp['mfo_name'] = $row['mfo_name'];
			$temp['clickable'] = $row['clickable'];
			$temp['input'] = $row['input'];
			$temp['output'] = $row['output'];

			$data['data'][] = $temp;
			$x++; //increment index object
			}
			else{
				$queryKilo = "SELECT IFNULL(SUM(kilo), 0) as kilo,  IFNULL(SUM(financial), 0) as fin FROM tbl_registered where mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";	
				$resultKilo = $mysqli->query( $queryKilo);
				$rowFilter = $resultKilo->fetch_assoc();
				$row['kilot'] = $rowFilter['kilo'];
				$row['fint'] = $rowFilter['fin'];
				$queryob = "SELECT IFNULL(SUM(financial_obligation), 0) as obt FROM tbl_obligation where mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";	
				$resultob = $mysqli->query( $queryob);
				$rowFilterob = $resultob->fetch_assoc();
				$row['obt'] = $rowFilterob['obt'];

				/*
				$queryben = "SELECT  (sum(male)+sum(female)+sum(ind)) as ben1, SUM(groups) as g FROM tbl_bene where  mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
				$resultben = $mysqli->query( $queryben );
				$rowBen = $resultben->fetch_assoc();
				$ben1 = $rowBen['ben1'];
				$g = $rowBen['g'];
				*/

				if($row['kilot']>0 || $row['fint']>0 ){
					$queryMonth = "SELECT * FROM month";	
					$resultMonth = $mysqli->query( $queryMonth );

					//$queryo = "SELECT sum(financial_obligation) as obl FROM tbl_obligation where mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
					//$resulto = $mysqli->query( $queryo );
					//$row['ob_mfo'] = $resulto->fetch_assoc(); //total obligation of the banner

					//$query = "SELECT sum(kilo) as kilo FROM tbl_registered where mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
					//$result1 = $mysqli->query( $query );
					//$row['kilo_mfo'] = $result1->fetch_assoc(); //total physical of the banner

					while ($rowMonth = $resultMonth->fetch_assoc()) {					
						$query = "SELECT sum(kilo) as kilo FROM tbl_registered where month='$rowMonth[id]' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
						$result1 = $mysqli->query( $query );
						$row['kilo'][$rowMonth['id']] = $result1->fetch_assoc();
					

						$query1A = "SELECT sum(kilo) as kiloa FROM tbl_registereda where month='$rowMonth[id]' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
						$result1A = $mysqli->query( $query1A );
						$row['kiloa'][$rowMonth['id']] = $result1A->fetch_assoc();

						$queryo = "SELECT sum(financial_obligation) as obl FROM tbl_obligation where month='$rowMonth[id]' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
						$resulto = $mysqli->query( $queryo );
						$row['ob'][$rowMonth['id']] = $resulto->fetch_assoc();

						$queryoa = "SELECT sum(financial_obligation) as obl FROM tbl_obligationa where month='$rowMonth[id]' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
						$resultoa = $mysqli->query( $queryoa );						
						$row['oba'][$rowMonth['id']] = $resultoa->fetch_assoc();
						/*
						$fquery1 = "SELECT sum(financial) as fin FROM tbl_registered where month2='$rowMonth[id]' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
						$fresult1 = $mysqli->query( $fquery1 );
						$row['fin'][$rowMonth['id']] = $fresult1->fetch_assoc();
						
						$queryb = "SELECT  (sum(male)+sum(female)+sum(ind)) as ben1, SUM(groups) as g FROM tbl_bene where month='$rowMonth[id]' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
						$resultb = $mysqli->query( $queryb );
						$row['ben'][$rowMonth['id']] = $resultb->fetch_assoc();

						$queryb1 = "SELECT  (sum(male)+sum(female)+sum(ind)) as ben1, SUM(groups) as g FROM tbl_benea where month='$rowMonth[id]' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
						$resultb1 = $mysqli->query( $queryb1 );
						$row['bena'][$rowMonth['id']] = $resultb1->fetch_assoc();
						*/

			
					}

					for($q=01;$q<5;$q++){					
						$queryRemarks = "SELECT * FROM tbl_remarks where quarter='$q' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
						$resultRemarks = $mysqli->query( $queryRemarks );
						$rowRemarks = $resultRemarks->fetch_assoc();
						$row['remarks'][$q] = $rowRemarks['remarks_text'];			
					}

			$row['ind'] = $x;
			$row['mfo_id'] = $row['mfo_id'];
			$row['description'] = $row['description'];
			$row['area'] = $row['area'];

			$data['data'][] = $row;
			$x++; //increment index object
				}				
			}


		}
		//total obligation
		//$queryo = "SELECT sum(financial_obligation) as obl FROM tbl_obligation where user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
		//$resulto = $mysqli->query( $queryo );
		//$data['ob_total']= $resulto->fetch_assoc();


		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function getMFOFilterBanner($mysqli){
	$x=0;
	$total=array();
	$id = $_POST['id'];
	try{
		if($id =='6'){
			$query = "SELECT * FROM tbl_mfo,unit_of_measure where `unitofmeasure` = `unit_of_measure`.`id` order by sequence,mfo_id";
		}
		else if($id >=10){
			$query = "SELECT * FROM tbl_mfo,unit_of_measure where  mfo_id in (select mfo_id from mfo_con_program where program_id = '$id') and `unitofmeasure` = `unit_of_measure`.`id` order by sequence,mfo_id";
		}
		else
			$query = "SELECT * FROM tbl_mfo,unit_of_measure where  mfo_id in (select mfo_id from mfo_con_program where program_id = '$id' || program_id = 6) and `unitofmeasure` = `unit_of_measure`.`id` order by sequence,mfo_id";

		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			for($r=1;$r<3;$r++){
				$queryRem = "SELECT remarks_text FROM tbl_remarks where quarter=$r and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = '$id')";
				$resultRem = $mysqli->query( $queryRem);
				$rowFilter = $resultRem->fetch_assoc();
				$row['remarks'][$r] = $rowFilter['remarks_text'];
			}
			if($row['clickable']=='no'||$row['clickable']=='No'||$row['clickable']=='NO'){
				$queryno = "SELECT sub_mfo_id as sub FROM header where header_mfo_id='$row[mfo_id]'";
				$resultno = $mysqli->query( $queryno );
				$c=0;
				while ($rowno = $resultno->fetch_assoc()) {
					$row['no'][$c] = $rowno['sub'];
					$c++;
				}
			$row['ind'] = $x;
			$row['mfo_id'] = $row['mfo_id'];
			$row['area'] = $row['area'];

			$data['data'][] = $row;
			$x++; //increment index object
			}
			else{
				$queryKilo = "SELECT IFNULL(SUM(kilo), 0) as kilo  FROM tbl_registered where mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = '$id')";;	
				$resultKilo = $mysqli->query( $queryKilo);
				$rowFilter = $resultKilo->fetch_assoc();
				$row['kilot'] = $rowFilter['kilo'];

				$queryFin = "SELECT IFNULL(SUM(financial_obligation), 0) as fin FROM tbl_obligation where mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = '$id')";;	
				$resultFin = $mysqli->query( $queryFin);
				$rowFin = $resultFin->fetch_assoc();
				$row['fint'] = $rowFin['fin'];


				if($row['kilot']>0 || $row['fint']>0){
					$queryMonth = "SELECT * FROM month";	
					$resultMonth = $mysqli->query( $queryMonth );
					while ($rowMonth = $resultMonth->fetch_assoc()) {					
						$query = "SELECT sum(kilo) as kilo FROM tbl_registered where month='$rowMonth[month_name]' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = '$id')";
						$result1 = $mysqli->query( $query );
						$row['kilo'][$rowMonth['id']] = $result1->fetch_assoc();

						$query1A = "SELECT sum(kilo) as kiloa FROM tbl_registereda where month='$rowMonth[month_name]' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = '$id')";
						$result1A = $mysqli->query( $query1A );
						$row['kiloa'][$rowMonth['id']] = $result1A->fetch_assoc();

						$queryb = "SELECT  (sum(male)+sum(female)+sum(ind)) as ben1, SUM(groups) as g FROM tbl_bene where month='$rowMonth[month_name]' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = '$id')";
						$resultb = $mysqli->query( $queryb );
						$row['ben'][$rowMonth['id']] = $resultb->fetch_assoc();

						$queryb1 = "SELECT  (sum(male)+sum(female)+sum(ind)) as ben1, SUM(groups) as g FROM tbl_benea where month='$rowMonth[month_name]' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = '$id')";
						$resultb1 = $mysqli->query( $queryb1 );
						$row['bena'][$rowMonth['id']] = $resultb1->fetch_assoc();

						$queryo = "SELECT sum(financial_obligation) as obl FROM tbl_obligation where month='$rowMonth[id]' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = '$id')";
						$resulto = $mysqli->query( $queryo );
						$row['ob'][$rowMonth['id']] = $resulto->fetch_assoc();

						$queryoa = "SELECT sum(financial_obligation) as obl FROM tbl_obligationa where month='$rowMonth[id]' and mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = '$id')";
						$resultoa = $mysqli->query( $queryoa );
						$row['oba'][$rowMonth['id']] = $resultoa->fetch_assoc();


					}

			$row['ind'] = $x;
			$row['mfo_id'] = $row['mfo_id'];
			$row['unit'] = $row['description'];
			$row['area'] = $row['area'];

			$data['data'][] = $row;
			$x++; //increment index object
				}				
			}


		}

		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function getMFOQuarterBanner($mysqli){
	$data = array();
	$id = $_POST['id'];
	$r_tot = 0; 
	try{			
		$queryMonth = "SELECT * FROM month";	
		$resultMonth = $mysqli->query( $queryMonth );
		while ($rowMonth = $resultMonth->fetch_assoc()) {							
			$queryo = "SELECT sum(financial_obligation) as obl FROM tbl_obligation where month='$rowMonth[id]'  and user_id in (select user_id from users where program_id = '$id')";
			$resulto = $mysqli->query( $queryo );
			$row['ob'] = $resulto->fetch_assoc();
	

			$row['month'] = $rowMonth['month_name'];
			$row['month_id'] = $rowMonth['id'];

			$queryoa = "SELECT sum(financial_obligation) as obl FROM tbl_obligationa where month='$rowMonth[id]'  and user_id in (select user_id from users where program_id = '$id')";
			$resultoa = $mysqli->query( $queryoa );
			$row['oba'] = $resultoa->fetch_assoc();
			//running total
			$r_tot += $row['oba']['obl'];
			$row['obaa'] =  $r_tot;
			$query = "SELECT sum(kilo) as kilo FROM tbl_registered where month='$rowMonth[id]'  and user_id in (select user_id from users where program_id = '$id')";
			$result1 = $mysqli->query( $query );
			$row['kilo'] = $result1->fetch_assoc();

			$query1A = "SELECT sum(kilo) as kiloa FROM tbl_registereda where month='$rowMonth[id]'  and user_id in (select user_id from users where program_id = '$id')";
			$result1A = $mysqli->query( $query1A );
			$row['kiloa'] = $result1A->fetch_assoc();


			$data['data'][] = $row;
		}	
		$queryq1 = "SELECT sum(financial_obligation) as q1 FROM tbl_obligation where (month=1 or month=2 or month=3) and user_id in (select user_id from users where program_id = '$id')";
		$resultq1 = $mysqli->query( $queryq1 );		
		$data['data'][] = $resultq1->fetch_assoc();

		$queryq1a = "SELECT sum(financial_obligation) as q1a FROM tbl_obligationa where (month=1 or month=2 or month=3) and user_id in (select user_id from users where program_id = '$id')";
		$resultq1a = $mysqli->query( $queryq1a );
		$data['data'][] = $resultq1a->fetch_assoc();

		$queryq1 = "SELECT sum(financial_obligation) as q1 FROM tbl_obligation where (month=4 or month=5 or month=6) and user_id in (select user_id from users where program_id = '$id')";
		$resultq1 = $mysqli->query( $queryq1 );		
		$data['data'][] = $resultq1->fetch_assoc();

		$queryq1a = "SELECT sum(financial_obligation) as q1a FROM tbl_obligationa where (month=4 or month=5 or month=6) and user_id in (select user_id from users where program_id = '$id')";
		$resultq1a = $mysqli->query( $queryq1a );
		$data['data'][] = $resultq1a->fetch_assoc();

		$queryq1 = "SELECT sum(financial_obligation) as q1 FROM tbl_obligation where (month=7 or month=8 or month=9) and user_id in (select user_id from users where program_id = '$id')";
		$resultq1 = $mysqli->query( $queryq1 );		
		$data['data'][] = $resultq1->fetch_assoc();

		$queryq1a = "SELECT sum(financial_obligation) as q1a FROM tbl_obligationa where (month=7 or month=8 or month=9) and user_id in (select user_id from users where program_id = '$id')";
		$resultq1a = $mysqli->query( $queryq1a );
		$data['data'][] = $resultq1a->fetch_assoc();

		$queryq1 = "SELECT sum(financial_obligation) as q1 FROM tbl_obligation where (month=10 or month=11 or month=12) and user_id in (select user_id from users where program_id = '$id')";
		$resultq1 = $mysqli->query( $queryq1 );		
		$data['data'][] = $resultq1->fetch_assoc();

		$queryq1a = "SELECT sum(financial_obligation) as q1a FROM tbl_obligationa where (month=10 or month=11 or month=12) and user_id in (select user_id from users where program_id = '$id')";
		$resultq1a = $mysqli->query( $queryq1a );
		$data['data'][] = $resultq1a->fetch_assoc();

		$queryq1 = "SELECT sum(kilo) as q1kilo FROM tbl_registered where (month=1 or month=2 or month=3) and user_id in (select user_id from users where program_id = '$id')";
		$resultq1 = $mysqli->query( $queryq1 );		
		$data['data'][] = $resultq1->fetch_assoc();

		$queryq1a = "SELECT sum(kilo) as q1akilo FROM tbl_registereda where (month=1 or month=2 or month=3) and user_id in (select user_id from users where program_id = '$id')";
		$resultq1a = $mysqli->query( $queryq1a );
		$data['data'][] = $resultq1a->fetch_assoc();

		$queryq1 = "SELECT sum(kilo) as q1kilo FROM tbl_registered where (month=4 or month=5 or month=6) and user_id in (select user_id from users where program_id = '$id')";
		$resultq1 = $mysqli->query( $queryq1 );		
		$data['data'][] = $resultq1->fetch_assoc();

		$queryq1a = "SELECT sum(kilo) as q1akilo FROM tbl_registereda where (month=4 or month=5 or month=6) and user_id in (select user_id from users where program_id = '$id')";
		$resultq1a = $mysqli->query( $queryq1a );
		$data['data'][] = $resultq1a->fetch_assoc();

		$queryq1 = "SELECT sum(kilo) as q1kilo FROM tbl_registered where (month=7 or month=8 or month=9) and user_id in (select user_id from users where program_id = '$id')";
		$resultq1 = $mysqli->query( $queryq1 );		
		$data['data'][] = $resultq1->fetch_assoc();

		$queryq1a = "SELECT sum(kilo) as q1akilo FROM tbl_registereda where (month=7 or month=8 or month=9) and user_id in (select user_id from users where program_id = '$id')";
		$resultq1a = $mysqli->query( $queryq1a );
		$data['data'][] = $resultq1a->fetch_assoc();

		$queryq1 = "SELECT sum(kilo) as q1kilo FROM tbl_registered where (month=10 or month=11 or month=12) and user_id in (select user_id from users where program_id = '$id')";
		$resultq1 = $mysqli->query( $queryq1 );		
		$data['data'][] = $resultq1->fetch_assoc();

		$queryq1a = "SELECT sum(kilo) as q1akilo FROM tbl_registereda where (month=10 or month=11 or month=12) and user_id in (select user_id from users where program_id = '$id')";
		$resultq1a = $mysqli->query( $queryq1a );
		$data['data'][] = $resultq1a->fetch_assoc();

		$queryq1 = "SELECT sum(financial_obligation) as obl FROM tbl_obligation where user_id in (select user_id from users where program_id = '$id')";
		$resultq1 = $mysqli->query( $queryq1 );		
		$data['data'][] = $resultq1->fetch_assoc();

			$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function getAllQuarterBanner($mysqli){
	$a = array();
	$data = array();
	$banner = $_POST['id'];
	try{
		$ob_all = 0; $oba_all = 0;
		for($i=0;$i<count($banner);$i++){
			$a = array();
			$temp = array();
			$id = $banner[$i]['id'];
			$name = $banner[$i]['banner_name'];
			$temp['banner_name'] = $name;
			$oba_t = 0; $ob_t = 0; 

			$queryo = "SELECT sum(financial_obligation) as obl FROM tbl_obligation where  user_id in (select user_id from users where program_id = '$id')";
			$resulto = $mysqli->query( $queryo );
			$temp['ob'] = $resulto->fetch_assoc();
			$ob_all =  $ob_all + $temp['ob']['obl'];

			$queryoa = "SELECT sum(financial_obligation) as obl FROM tbl_obligationa where user_id in (select user_id from users where program_id = '$id')";
			$resultoa = $mysqli->query( $queryoa );
			$temp['oba'] = $resultoa->fetch_assoc();
			$oba_all =  $oba_all + $temp['oba']['obl'];

			$query = "SELECT sum(kilo) as kilot FROM tbl_registered where user_id in (select user_id from users where program_id = '$id')";
			$result1 = $mysqli->query( $query );
			$temp['kilo'] = $result1->fetch_assoc();

			$query1A = "SELECT sum(kilo) as kilot FROM tbl_registereda where user_id in (select user_id from users where program_id = '$id')";
			$result1A = $mysqli->query( $query1A );
			$temp['kiloa'] = $result1A->fetch_assoc();

			for($x=1;$x<7;$x++){
				$queryo = "SELECT sum(financial_obligation) as obl FROM tbl_obligation where month='$x' and user_id in (select user_id from users where program_id = '$id')";
				$resulto = $mysqli->query( $queryo );
				$row['ob'] = $resulto->fetch_assoc();
				$ob_t =  $ob_t + $row['ob']['obl'];

				$queryoa = "SELECT sum(financial_obligation) as obl FROM tbl_obligationa where month='$x' and user_id in (select user_id from users where program_id = '$id')";
				$resultoa = $mysqli->query( $queryoa );
				$row['oba'] = $resultoa->fetch_assoc();
				$oba_t =  $oba_t + $row['oba']['obl'];

				$query = "SELECT sum(kilo) as kilot FROM tbl_registered where month='$x' and user_id in (select user_id from users where program_id = '$id')";
				$result1 = $mysqli->query( $query );
				$row['kilo'] = $result1->fetch_assoc();

				$query1A = "SELECT sum(kilo) as kilot FROM tbl_registereda where month='$x' and user_id in (select user_id from users where program_id = '$id')";
				$result1A = $mysqli->query( $query1A );
				$row['kiloa'] = $result1A->fetch_assoc();
				if($row['kilo']['kilot']!=0)
				$row['kilo-per'] = $row['kiloa']['kilot'] / $row['kilo']['kilot'];

				$a[] = $row;
			}
			$temp['ob_t'] = $ob_t;
			$temp['oba_t'] = $oba_t;
			$temp['per_fin'] = $oba_t / $temp['ob']['obl'];
			$temp['total'] = $a;			
			$data['data'][] = $temp;
			$ob_t = 0; 
		}
		$data['ob_all'] = $ob_all;
		$data['oba_all'] = $oba_all;			
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function getPhysical($mysqli){
	$a = array();
	$data = array();
	$unit = $_POST['id'];
	try{
		for($i=2;$i<count($unit);$i++){
			$a = array();
			$temp = array();
			$id = $unit[$i]['id'];
			$description = $unit[$i]['description'];
			$temp['description'] = $description;	

			$query = "SELECT sum(kilo) as k1 FROM `tbl_registered` WHERE `mfo_id` in (select mfo_id FROM tbl_mfo where unitofmeasure='$i')";
			$result = $mysqli->query( $query );
			$temp['k1'] = $result->fetch_assoc();

			if($temp['k1']['k1']!=null){ //filter the unit_measure


			$query = "SELECT sum(kilo) as q1 FROM `tbl_registereda` WHERE `mfo_id` in (select mfo_id FROM tbl_mfo where unitofmeasure='$i') and (month=1 or month=2 or month=3)";
			$result = $mysqli->query( $query );
			$temp['q1'] = $result->fetch_assoc();

			$query = "SELECT sum(kilo) as q2 FROM `tbl_registereda` WHERE `mfo_id` in (select mfo_id FROM tbl_mfo where unitofmeasure='$i') and (month=4 or month=5 or month=6)";
			$result = $mysqli->query( $query );
			$temp['q2'] = $result->fetch_assoc();

			$query = "SELECT sum(kilo) as qt FROM `tbl_registereda` WHERE `mfo_id` in (select mfo_id FROM tbl_mfo where unitofmeasure='$i') and (month=1 or month=2 or month=3 or month=4 or month=5 or month=6)";
			$result = $mysqli->query( $query );
			$temp['qt'] = $result->fetch_assoc();

			$temp['p1'] = $temp['q1']['q1']/$temp['k1']['k1'];
			$temp['p2'] = $temp['q2']['q2']/$temp['k1']['k1'];
			$temp['pt'] = $temp['qt']['qt']/$temp['k1']['k1'];

			for($x=1;$x<6;$x++){
			$query = "select name from program where id = '$x'";
				$result = $mysqli->query( $query );
				$row['prog'] = $result->fetch_assoc();

				$query = "SELECT sum(kilo) as k1 FROM `tbl_registered` WHERE `mfo_id` in (select mfo_id FROM tbl_mfo where unitofmeasure='$i') and user_id in (select user_id from users where program_id = '$x')";
				$result = $mysqli->query( $query );
				$row['k1'] = $result->fetch_assoc();

				$query = "SELECT sum(kilo) as q1 FROM `tbl_registereda` WHERE `mfo_id` in (select mfo_id FROM tbl_mfo where unitofmeasure='$i') and user_id in (select user_id from users where program_id = '$x') and (month=1 or month=2 or month=3)";
				$result = $mysqli->query( $query );
				$row['q1'] = $result->fetch_assoc();

				$query = "SELECT sum(kilo) as q2 FROM `tbl_registereda` WHERE `mfo_id` in (select mfo_id FROM tbl_mfo where unitofmeasure='$i') and user_id in (select user_id from users where program_id = '$x') and (month=4 or month=5 or month=6)";
				$result = $mysqli->query( $query );
				$row['q2'] = $result->fetch_assoc();

				$query = "SELECT sum(kilo) as qt FROM `tbl_registereda` WHERE `mfo_id` in (select mfo_id FROM tbl_mfo where unitofmeasure='$i') and user_id in (select user_id from users where program_id = '$x') and (month=1 or month=2 or month=3 or month=4 or month=5 or month=6)";
				$result = $mysqli->query( $query );
				$row['qt'] = $result->fetch_assoc();

				if($row['k1']['k1']!=null){
					$row['p1'] = $row['q1']['q1']/$row['k1']['k1'];
					$row['p2'] = $row['q2']['q2']/$row['k1']['k1'];
					$row['pt'] = $row['qt']['qt']/$row['k1']['k1'];
				}else{
					$row['p1'] = 0;
					$row['p2'] = 0;
					$row['pt'] = 0;
				}
				
	

				$a[] = $row;
			}

			$temp['total'] = $a;			
			$data['data'][] = $temp;
	
		}
		}		
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function getPhysicalByHeader($mysqli){
	$a = array();
	$data = array();
	$unit = $_POST['id'];
	
	try{	
		$data = array();
		for($prog_id=0;$prog_id<6;$prog_id++){
			$query = "SELECT DISTINCT(header_id) FROM `tbl_registered` where user_id in (select user_id from users where program_id = ".$prog_id.")";
			$result = $mysqli->query( $query );
			$rowtotal=array();
			$ct=0;
			while ($row = $result->fetch_assoc()) {
				$a = array();
				$temp['header_id'] = $row['header_id'];
				$temp['program'] = $prog_id;
				$queryUnit = "SELECT DISTINCT(unit_id),  description FROM `tbl_registered` INNER JOIN `unit_of_measure` on `tbl_registered`.unit_id=`unit_of_measure`.id
				where user_id in (select user_id from users where program_id = ".$prog_id.")";
				$resultUnit = $mysqli->query( $queryUnit );
				while ($rowUnit = $resultUnit->fetch_assoc()){
					for($c=0;$c<2;$c++){
						if($c==0)
							$tblname="tbl_registered";
						else
							$tblname="tbl_registereda";

						$firstsem=0;
						$secondsem=0;
						for($ctr=0;$ctr<=12;$ctr++){
							$q="";
							if($ctr==0){
								$q = "SELECT sum(kilo) as k FROM `".$tblname."` where unit_id='$rowUnit[unit_id]' and FORMAT(header_id,2)=FORMAT('$temp[header_id]',2) and user_id in (select user_id from users where program_id = ".$prog_id.")";
							}
							else{
								$q = "SELECT sum(kilo) as k FROM `".$tblname."` where unit_id='$rowUnit[unit_id]' and FORMAT(header_id,2)=FORMAT('$temp[header_id]',2) and month='".$ctr."' and user_id in (select user_id from users where program_id = ".$prog_id.")";
							}
			
							$r= $mysqli->query($q);
							$row[$ctr] = $r->fetch_assoc()['k'];
							if($ctr>0&&$ctr<=6)
								$firstsem +=floatval($row[$ctr]);
							else if($ctr!=0)
								$secondsem +=floatval($row[$ctr]);
							$row["1stsem"]=$firstsem;
							$row["2ndsem"]=$secondsem;
							if($ctr==12){
								if($row["1stsem"]==0)
									$row["1stsem"]=null;
								if($row["2ndsem"]==0)
									$row["2ndsem"]=null;
							}
						}
						$row['header_id'] = $temp['header_id'];
						$row['description'] = $rowUnit['description'];
						$a[$c][] = $row;
					}

					
				}
				for($ct=0;$ct<count($a[0]);$ct++){
					$rowtotal[$ct]['description']=$a[0][$ct]['description'];
					$rowtotal[$ct][13][0]=0;
					$rowtotal[$ct][13][1]=0;
					for($c=0;$c<=12;$c++){
						if(!isset($rowtotal[$ct][$c][0])){
							$rowtotal[$ct][$c][0] = floatval($a[0][$ct][$c]);
						}
						else{
							$rowtotal[$ct][$c][0] += floatval($a[0][$ct][$c]);
						}
						if(!isset($rowtotal[$ct][$c][1])){
							$rowtotal[$ct][$c][1] = floatval($a[1][$ct][$c]);
						}
						else{
							$rowtotal[$ct][$c][1] += floatval($a[1][$ct][$c]);
						}
						$rowtotal[$ct][13][0] += floatval($a[0][$ct][$c]);
						$rowtotal[$ct][13][1] += floatval($a[1][$ct][$c]);
					}
				}
				for($ct=0;$ct<count($a[0]);$ct++){
					for($c=0;$c<=12;$c++){
						if(floatval($rowtotal[$ct][$c][0])==0)
							$rowtotal[$ct][$c][0]=null;
						if(floatval($rowtotal[$ct][$c][1])==0)
							$rowtotal[$ct][$c][1]=null;
					}
				}
				$temp['total'] = $a[0];
				$temp['totala'] = $a[1];
				$data['data'][] = $temp;
				$ct++;
			}
			$data['rowtotal'][] = $rowtotal;
			//$data['rowtotala'] = $rowtotal[0];
		}

			$data['success'] = true;
			echo json_encode($data);exit;
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function getPhysicalMFO($mysqli){ //getByMFO
	$prog_id="";
	if(isset($_POST['prog'])&&$_POST['prog']!=0)
		$prog_id=$_POST['prog'];
	else
		$prog_id=$_SESSION['program_id'];
	if((int)$prog_id<17){
		try{	
			$query = "SELECT DISTINCT(header_id) FROM `tbl_registered` where user_id in (select user_id from users where program_id = ".$prog_id.")";
			$result = $mysqli->query( $query );
			$data = array();
			$rowtotal=array();
			$ct=0;
			while ($row = $result->fetch_assoc()) {
				$a = array();
				$temp['header_id'] = $row['header_id'];
				$queryUnit = "SELECT DISTINCT(unit_id),  description FROM `tbl_registered` INNER JOIN `unit_of_measure` on `tbl_registered`.unit_id=`unit_of_measure`.id where user_id in (select user_id from users where program_id = ".$prog_id.")";
				$resultUnit = $mysqli->query( $queryUnit );
				while ($rowUnit = $resultUnit->fetch_assoc()){
					$qcost =" SELECT sum(financial_obligation) as cost FROM `tbl_obligation` where mfo_id in (SELECT mfo_id FROM tbl_mfo where unitofmeasure = $rowUnit[unit_id]) and user_id in (SELECT user_id FROM users where program_id = ".$prog_id.")";
					$resultqcost = $mysqli->query( $qcost );
					$rowcost = $resultqcost->fetch_assoc();

					$mfocost =" SELECT sum(financial_obligation) as mfocost FROM `tbl_obligation` where mfo_id in (SELECT mfo_id FROM tbl_mfo where unitofmeasure = $rowUnit[unit_id]) and FORMAT(header_id,2)=FORMAT('$temp[header_id]',2) and user_id in (SELECT user_id FROM users where program_id = ".$prog_id.")";
					$resultmfocost = $mysqli->query( $mfocost );
					$rowmfocost = $resultmfocost->fetch_assoc();
					for($c=0;$c<2;$c++){
						if($c==0)
							$tblname="tbl_registered";
						else
							$tblname="tbl_registereda";

						$firstsem=0;
						$secondsem=0;
						for($ctr=0;$ctr<=12;$ctr++){
							$q="";
							if($ctr==0){
								$q = "SELECT sum(kilo) as k FROM `".$tblname."` where unit_id='$rowUnit[unit_id]' and FORMAT(header_id,2)=FORMAT('$temp[header_id]',2) and user_id in (select user_id from users where program_id = ".$prog_id.")";
							}
							else{
								$q = "SELECT sum(kilo) as k FROM `".$tblname."` where unit_id='$rowUnit[unit_id]' and FORMAT(header_id,2)=FORMAT('$temp[header_id]',2) and month='".$ctr."' and user_id in (select user_id from users where program_id = ".$prog_id.")";
							}
			
							$r= $mysqli->query($q);
							$row[$ctr] = $r->fetch_assoc()['k'];
							if($ctr>0&&$ctr<=6)
								$firstsem +=floatval($row[$ctr]);
							else if($ctr!=0)
								$secondsem +=floatval($row[$ctr]);
							$row["1stsem"]=$firstsem;
							$row["2ndsem"]=$secondsem;
							if($ctr==12){
								if($row["1stsem"]==0)
									$row["1stsem"]=null;
								if($row["2ndsem"]==0)
									$row["2ndsem"]=null;
							}
						}
						$row['mfocost'] = $rowmfocost['mfocost'];
						$row['cost'] = $rowcost['cost'];
						$row['header_id'] = $temp['header_id'];
						$row['description'] = $rowUnit['description'];
						$a[$c][] = $row;
					}

					
				}
				for($ct=0;$ct<count($a[0]);$ct++){
					$rowtotal[$ct]['description']=$a[0][$ct]['description'];
					$rowtotal[$ct]['cost']=$a[0][$ct]['cost'];
					$rowtotal[$ct][13][0]=0;
					$rowtotal[$ct][13][1]=0;
					for($c=0;$c<=12;$c++){
						if(!isset($rowtotal[$ct][$c][0])){
							$rowtotal[$ct][$c][0] = floatval($a[0][$ct][$c]);
						}
						else{
							$rowtotal[$ct][$c][0] += floatval($a[0][$ct][$c]);
						}
						if(!isset($rowtotal[$ct][$c][1])){
							$rowtotal[$ct][$c][1] = floatval($a[1][$ct][$c]);
						}
						else{
							$rowtotal[$ct][$c][1] += floatval($a[1][$ct][$c]);
						}
						$rowtotal[$ct][13][0] += floatval($a[0][$ct][$c]);
						$rowtotal[$ct][13][1] += floatval($a[1][$ct][$c]);
					}
				}
				for($ct=0;$ct<count($a[0]);$ct++){
					for($c=0;$c<=12;$c++){
						if(floatval($rowtotal[$ct][$c][0])==0)
							$rowtotal[$ct][$c][0]=null;
						if(floatval($rowtotal[$ct][$c][1])==0)
							$rowtotal[$ct][$c][1]=null;
					}
				}
				$temp['total'] = $a[0];
				$temp['totala'] = $a[1];
				$data['data'][] = $temp;
				$ct++;
			}
			$data['rowtotal'] = $rowtotal;
			//$data['rowtotala'] = $rowtotal[0];

			$data['ifelse'] = "if";
			$data['success'] = true;
			echo json_encode($data);exit;
		
		}catch (Exception $e){
			$data = array();
			$data['success'] = false;
			$data['message'] = $e->getMessage();
			echo json_encode($data);
			exit;
		}
	}
	else{
		try{	
			$trc=0;
			$data = array();
			$rowtotal=array();
			$ct=0;
			while ($trc<1) {
				$trc++;
				$a = array();
				//$temp['header_id'] = $row['header_id'];
				$queryUnit = "SELECT DISTINCT(unit_id),  description FROM `tbl_registered` INNER JOIN `unit_of_measure` on `tbl_registered`.unit_id=`unit_of_measure`.id
				where user_id in (select user_id from users where program_id = ".$prog_id.")";
				$resultUnit = $mysqli->query( $queryUnit );
				while ($rowUnit = $resultUnit->fetch_assoc()){
					$qcost =" SELECT sum(financial_obligation) as cost FROM `tbl_obligation` where mfo_id in (SELECT mfo_id FROM tbl_mfo where unitofmeasure = $rowUnit[unit_id]) and user_id in (SELECT user_id FROM users where program_id = ".$prog_id.")";
					$resultqcost = $mysqli->query( $qcost );
					$rowcost = $resultqcost->fetch_assoc();

					$mfocost =" SELECT sum(financial_obligation) as mfocost FROM `tbl_obligation` where mfo_id in (SELECT mfo_id FROM tbl_mfo where unitofmeasure = $rowUnit[unit_id]) and user_id in (SELECT user_id FROM users where program_id = ".$prog_id.")";
					$resultmfocost = $mysqli->query( $mfocost );
					$rowmfocost = $resultmfocost->fetch_assoc();

					for($c=0;$c<2;$c++){
						if($c==0)
							$tblname="tbl_registered";
						else
							$tblname="tbl_registereda";

						$firstsem=0;
						$secondsem=0;
						for($ctr=0;$ctr<=12;$ctr++){
							$q="";
							if($ctr==0){
								$q = "SELECT sum(kilo) as k FROM `".$tblname."` where unit_id='$rowUnit[unit_id]' and user_id in (select user_id from users where program_id = ".$prog_id.")";
							}
							else{
								$q = "SELECT sum(kilo) as k FROM `".$tblname."` where unit_id='$rowUnit[unit_id]' and month='".$ctr."' and user_id in (select user_id from users where program_id = ".$prog_id.")";
							}
			
							$r= $mysqli->query($q);
							$row[$ctr] = $r->fetch_assoc()['k'];
							if($ctr>0&&$ctr<=6)
								$firstsem +=floatval($row[$ctr]);
							else if($ctr!=0)
								$secondsem +=floatval($row[$ctr]);
							$row["1stsem"]=$firstsem;
							$row["2ndsem"]=$secondsem;
							if($ctr==12){
								if($row["1stsem"]==0)
									$row["1stsem"]=null;
								if($row["2ndsem"]==0)
									$row["2ndsem"]=null;
							}
						}
						$row['mfocost'] = $rowmfocost['mfocost'];
						$row['cost'] = $rowcost['cost'];
						$row['header_id'] = 0;
						$row['description'] = $rowUnit['description'];
						$a[$c][] = $row;
					}

					
				}
				for($ct=0;$ct<count($a[0]);$ct++){
					$rowtotal[$ct]['description']=$a[0][$ct]['description'];
					$rowtotal[$ct]['cost']=$a[0][$ct]['cost'];
					$rowtotal[$ct][13][0]=0;
					$rowtotal[$ct][13][1]=0;
					for($c=0;$c<=12;$c++){
						if(!isset($rowtotal[$ct][$c][0])){
							$rowtotal[$ct][$c][0] = floatval($a[0][$ct][$c]);
						}
						else{
							$rowtotal[$ct][$c][0] += floatval($a[0][$ct][$c]);
						}
						if(!isset($rowtotal[$ct][$c][1])){
							$rowtotal[$ct][$c][1] = floatval($a[1][$ct][$c]);
						}
						else{
							$rowtotal[$ct][$c][1] += floatval($a[1][$ct][$c]);
						}
						$rowtotal[$ct][13][0] += floatval($a[0][$ct][$c]);
						$rowtotal[$ct][13][1] += floatval($a[1][$ct][$c]);
					}
				}
				for($ct=0;$ct<count($a[0]);$ct++){
					for($c=0;$c<=12;$c++){
						if(floatval($rowtotal[$ct][$c][0])==0)
							$rowtotal[$ct][$c][0]=null;
						if(floatval($rowtotal[$ct][$c][1])==0)
							$rowtotal[$ct][$c][1]=null;
					}
				}
				$temp['total'] = $a[0];
				$temp['totala'] = $a[1];
				$data['data'][] = $temp;
				$ct++;
			}
			$data['rowtotal'] = $rowtotal;
			//$data['rowtotala'] = $rowtotal[0];
			$data['success'] = true;
			$data['ifelse'] = "else";
			echo json_encode($data);exit;
		
		}catch (Exception $e){
			$data = array();
			$data['success'] = false;
			$data['message'] = $e->getMessage();
			echo json_encode($data);
			exit;
		}
	}
}

function getPhysicalBanner($mysqli){ //getTheHeader
	$data = array();
	$unit = $_POST['id'];
	try{
		for($i=2;$i<count($unit);$i++){
			$a = array();
			$temp = array();
			$id = $unit[$i]['id'];
			$description = $unit[$i]['description'];
			$id = $unit[$i]['id'];
		

			$query = "SELECT sum(kilo) as k1 FROM `tbl_registered` WHERE `mfo_id` in (select mfo_id FROM mfo where unitofmeasure='$i') and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
			$result = $mysqli->query( $query );
			$temp['k1'] = $result->fetch_assoc();

			if($temp['k1']['k1']!=null){ //filter the unit_measure
				$temp['description'] = $description;	
				$temp['id'] = $id;
				$data['data'][] = $temp;	
			}
		}		
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}


function getkiloDetails($mysqli){
	try{
		$mfo_id = $mysqli->real_escape_string(isset( $_POST['mfo_id'] ) ? $_POST['mfo_id'] : '');
		$month = $mysqli->real_escape_string(isset( $_POST['month'] ) ? $_POST['month'] : '');
		$a = $mysqli->real_escape_string(isset( $_POST['a'] ) ? $_POST['a'] : '');

		if ($a!=''){
			$query = "SELECT * FROM tbl_registereda  inner join month  on month.id =tbl_registereda.month   inner join tbl_mfo on tbl_mfo.mfo_id =tbl_registereda.mfo_id
			where month='$month' and tbl_registereda.mfo_id='$mfo_id' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
			$result = $mysqli->query( $query );
		}else{
			$query = "SELECT * FROM tbl_registered  inner join month  on month.id =tbl_registered.month  inner join unit_of_measure on unit_of_measure.id =tbl_registered.unit_id inner join tbl_mfo on tbl_mfo.mfo_id =tbl_registered.mfo_id
			where month='$month' and tbl_registered.mfo_id='$mfo_id' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
			$result = $mysqli->query( $query );
			//$querySum = "SELECT sum(kilo) as sumKilo FROM tbl_registered where month='$month' and tbl_regidtered.mfo_id='$mfo_id' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
	
		}
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$data['data'][] = $row;
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}


function getBeneDetails($mysqli){
	try{			
		$data = array();
		$mfo_id = $mysqli->real_escape_string(isset( $_POST['mfo_id'] ) ? $_POST['mfo_id'] : '');
		$month = $mysqli->real_escape_string(isset( $_POST['month'] ) ? $_POST['month'] : '');
		//$a = $mysqli->real_escape_string(isset( $_POST['a'] ) ? $_POST['a'] : '');

		//if(isset($a)&&$a!=''){
		//	$query = "SELECT * FROM tbl_benea where month='$month' and mfo_id='$mfo_id' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
		//}
		//else{
		$query = "SELECT tbl_bene.*, month.month_name  FROM tbl_bene inner join month on tbl_bene.month = month.id where month='$month' and mfo_id='$mfo_id' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
		//}
		$result = $mysqli->query( $query );

		while ($row = $result->fetch_assoc()) {
			$row['mfo_id'] = $row['mfo_id'];
			//$row['sum'] = $rowSum;
			$data['data'][] = $row;
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
	

}


function getByDistrict($mysqli){
	try{	
		$data = array();
		$provs = $mysqli->real_escape_string(isset( $_POST['provs'] ) ? $_POST['provs'] : '');
		$dist = $mysqli->real_escape_string(isset( $_POST['dist'] ) ? $_POST['dist'] : '');
		if($dist==0){
			$query = "SELECT * FROM `tbl_municipal` where province_id = '$provs' ORDER BY `municipal_name` ASC";
		}else{
			$query = "SELECT * FROM `tbl_municipal` where province_id = '$provs' and District = $dist ORDER BY `municipal_name` ASC";		
		}
		$result = $mysqli->query( $query );
		while ($row = $result->fetch_assoc()) {
			$data['mun'][] = $row;
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}	
}

function getByDistrictMFO($mysqli){
	try{	
		$data = array();
		$muns = $_POST['muns'];
		$total=array();
		$x=0;
		$provs = $mysqli->real_escape_string(isset( $_POST['provs'] ) ? $_POST['provs'] : '');
		$dist = $mysqli->real_escape_string(isset( $_POST['dist'] ) ? $_POST['dist'] : '');

		if($_SESSION['program_id']=='6'){
			$query = "SELECT * FROM tbl_mfo,unit_of_measure where `unitofmeasure` = `unit_of_measure`.`id` order by sequence,mfo_id";
		}
		else if((int)$_SESSION['program_id']>=10){
			$query = "SELECT * FROM tbl_mfo,unit_of_measure where  mfo_id in (select mfo_id from mfo_con_program where program_id = ".$_SESSION['program_id'].") and `unitofmeasure` = `unit_of_measure`.`id` order by sequence,mfo_id";
		}
		else
			$query = "SELECT * FROM tbl_mfo,unit_of_measure where  mfo_id in (select mfo_id from mfo_con_program where program_id = ".$_SESSION['program_id']." || program_id = 6) and `unitofmeasure` = `unit_of_measure`.`id` order by sequence,mfo_id";

		$result = $mysqli->query( $query );
		while ($row = $result->fetch_assoc()) {
			if($row['clickable']=='no'||$row['clickable']=='No'||$row['clickable']=='NO'){
				$temp['ind'] = $x;
				$temp['mfo_id'] = $row['mfo_id'];
				$temp['mfo_name'] = $row['mfo_name'];
				$temp['clickable'] = $row['clickable'];
				$temp['input'] = $row['input'];
				$temp['output'] = $row['output'];

				$data['data'][] = $temp;
				$x++; //increment index object
			}
			else{
				$queryKilo = "SELECT IFNULL(SUM(kilo), 0) as kilo,  IFNULL(SUM(financial), 0) as fin FROM tbl_registered where mfo_id= '$row[mfo_id]' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";;	
				$resultKilo = $mysqli->query( $queryKilo);
				$rowFilter = $resultKilo->fetch_assoc();
				$row['kilot'] = $rowFilter['kilo'];
				$row['fint'] = $rowFilter['fin'];
				$tk=0.0;$tf=0.0;$tk2=0.0;$tf2=0.0;$str='';$str2='';


				if($row['kilot']>0 || $row['fint']>0){
					$queryRemarks = "SELECT * FROM tbl_remarksbydistrict where mfo_id= '$row[mfo_id]' 
					and province='$provs' and district='$dist' and `user_id` in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
					$resultRemarks = $mysqli->query( $queryRemarks );
					$bdremarks = $resultRemarks->fetch_assoc();
					$row['remarks'] = $bdremarks['remarks_text'];

					for($ii=0;$ii<count($muns);$ii++){
						$muns_id = $muns[$ii]['municipal_id'];
						$muns_name = $muns[$ii]['municipal_name'];
						$q = "SELECT SUM(`kilo`) as kilo,SUM(`financial`) as fin FROM `tbl_registered` where municipal = '$muns_id' and `mfo_id`='$row[mfo_id]' and `user_id` in (SELECT user_id from users where program_id = ".$_SESSION['program_id'].")";
						$resultq = $mysqli->query( $q );
						while ($rowq = $resultq->fetch_assoc()) {
							if($rowq['kilo']!=0)
								$str .=" ".$muns[$ii]['municipal_name']."(". $rowq['kilo']."),";
							$tk = $tk+floatval($rowq['kilo']);
							$tf = $tf+floatval($rowq['fin']);
						}
						$q2 = "SELECT SUM(`kilo`) as kilo FROM `tbl_registereda` where municipal = '$muns_id' and `mfo_id`='$row[mfo_id]' and `user_id` in (SELECT user_id from users where program_id = ".$_SESSION['program_id'].")";
						$result2 = $mysqli->query( $q2 );
						while ($row2 = $result2->fetch_assoc()) {
							if($row2['kilo']!=0)
								$str2 .=" ".$muns[$ii]['municipal_name']."(". $row2['kilo']."),";
							$tk2 = $tk2+floatval($row2['kilo']);
							//$tf2 = $tf2+floatval($row2['fin']);
						}			
					}
					if($tk==0)$tk= "";if($tf==0)$tf= "";if($tk2==0)$tk2= "";//if($tf2==0)$tf2= "";
					$row['ind'] = $x;
					$row['unit'] = $row['description'];
					$row['str'][] = $str;
					$row['tk'][] = $tk;
					$row['tf'][] = $tf;
					$row['str2'][] = $str2;
					$row['tk2'][] = $tk2;
					$row['tf2'][] = $tf2;

					$data['data'][] = $row;
					$x++; //increment index object
				}				
			}
		} //end while

	$data['success'] = true;
	echo json_encode($data);exit;	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}	
}

function add_kilo($mysqli){
	try{
		$data = array();
		$mfo_id = $mysqli->real_escape_string(isset( $_POST['doc']['mfo_id'] ) ? $_POST['doc']['mfo_id'] : '');		
		$month = $mysqli->real_escape_string(isset( $_POST['doc']['month'] ) ? $_POST['doc']['month'] : '');
		$a = $mysqli->real_escape_string(isset( $_POST['doc']['a'] ) ? $_POST['doc']['a'] : '');
		$provs = $mysqli->real_escape_string(isset( $_POST['doc']['provs'] ) ? $_POST['doc']['provs'] : '');
		$muns = $mysqli->real_escape_string(isset( $_POST['doc']['muns'] ) ? $_POST['doc']['muns'] : '');
		$kilo = $mysqli->real_escape_string(isset( $_POST['doc']['kilo'] ) ? $_POST['doc']['kilo'] : '');
		$kiloA = $mysqli->real_escape_string(isset( $_POST['doc']['kiloA'] ) ? $_POST['doc']['kiloA'] : '');
		$fin = $mysqli->real_escape_string(isset( $_POST['doc']['fin'] ) ? $_POST['doc']['fin'] : '');
		$index = $mysqli->real_escape_string(isset( $_POST['doc']['index'] ) ? $_POST['doc']['index'] : '');
		$unit = $mysqli->real_escape_string(isset( $_POST['doc']['unit'] ) ? $_POST['doc']['unit'] : '');

		$query = "SELECT mfo from tbl_bymfo where mfo_id='$mfo_id'";
		$result = $mysqli->query($query);
		$row = $result->fetch_assoc();
		$header_id = $row['mfo'];
		if($provs=='111'){
			$muns='111';
		}
		if($header_id==null){
			$header_id="null";
		}else{
			$header_id="'".$header_id."'";
		}

		if(isset($a) && ($a!=null)){
			$query = "INSERT INTO tbl_registereda(year, month, province, municipal, kilo, mfo_id, header_id, user_id, unit_id) 
			VALUES ('2015', '$month', '$provs', '$muns', '$kilo', '$mfo_id',$header_id, ".$_SESSION['user_id'].", '$unit')";
		}else{
			if($month==13){ //allmonth is true
				for($m=1;$m<=12;$m++){ //looping the month
					$query = "INSERT INTO tbl_registered(year, month, province, municipal, kilo, mfo_id, user_id, financial, header_id, unit_id) VALUES ('2015', '$m', '$provs', '$muns', '$kilo', '$mfo_id', ".$_SESSION['user_id']." ,'$fin',$header_id, '$unit')";							
					if( $mysqli->query( $query ) ){$data['success'] = true;}
				}
			}
			else{
			$query = "INSERT INTO tbl_registered(year, month, province, municipal, kilo, mfo_id, user_id, financial, header_id, unit_id) VALUES ('2015', '$month', '$provs', '$muns', '$kilo', '$mfo_id', ".$_SESSION['user_id']." ,'$fin',$header_id, '$unit')";					
			}
		}

	if( $mysqli->query( $query ) ){
		$data['success'] = true;
		$data['index'] = $index;
		if($kilo=='')
			$kilo="0";
		$data['kiloadded'] = $kilo;
		$data['finadded'] = $fin;
		$data['month'] = $month;
		if($kiloA=="true") {
			$data['kiloa'] = true;

		}			
		}else{
			//throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
			throw new Exception( $query );
		}
		$mysqli->close();
		echo json_encode($data);
		exit;
	
	}catch (Exception $e){
		$data = array();
		$data['q'] = "INSERT INTO tbl_registered(year, month, province, municipal, kilo, mfo_id, user_id, financial, header_id, unit_id) VALUES ('2015', '$month', '$provs', '$muns', '$kilo', '$mfo_id', ".$_SESSION['user_id']." ,'$fin',$header_id, '$unit')";	
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
	
}

function edit_kilo($mysqli){
	try{
		$data = array();
		$reg_id = $mysqli->real_escape_string(isset( $_POST['item']['reg_id'] ) ? $_POST['item']['reg_id'] : '');
		$mfo_id = $mysqli->real_escape_string(isset( $_POST['item']['mfo_id'] ) ? $_POST['item']['mfo_id'] : '');
		$month = $mysqli->real_escape_string(isset( $_POST['item']['month'] ) ? $_POST['item']['month'] : '');		
		$provs = $mysqli->real_escape_string(isset( $_POST['item']['province'] ) ? $_POST['item']['province'] : '');
		$muns = $mysqli->real_escape_string(isset( $_POST['item']['municipal'] ) ? $_POST['item']['municipal'] : '');
		$kilo = $mysqli->real_escape_string(isset( $_POST['item']['kilo'] ) ? $_POST['item']['kilo'] : '');
		$fin = $mysqli->real_escape_string(isset( $_POST['item']['financial'] ) ? $_POST['item']['financial'] : '');
		$a = $mysqli->real_escape_string(isset( $_POST['item']['a'] ) ? $_POST['item']['a'] : '');


		if(empty($a)){	$query = "UPDATE tbl_registered SET  province='$provs', municipal='$muns',
			kilo=$kilo, financial='$fin' WHERE reg_id=$reg_id"; }
		else{ 	$query = "UPDATE tbl_registereda SET  province='$provs', municipal='$muns',
			kilo=$kilo WHERE reg_id=$reg_id";}

		
		if( $mysqli->query( $query ) ){
			//update the value of the DOM
			if(empty($a)){
				$update = "SELECT sum(kilo) as kt, sum(financial) as ft from tbl_registered 
			where month='$month' and mfo_id= '$mfo_id' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
			$result = $mysqli->query( $update );
			$row = $result->fetch_assoc();	
			$data['fin']=$fin;			
			$data['ft']=$row['ft'];
			}else{
					$update = "SELECT sum(kilo) as kt  from tbl_registereda 
			where month='$month' and mfo_id= '$mfo_id' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
			$result = $mysqli->query( $update );
			$row = $result->fetch_assoc();	
			}
			$data['kilo']=$kilo;
			$data['kt']=$row['kt'];;
			$data['month']=$month;
			$data['success'] = true;			
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		$mysqli->close();
		echo json_encode($data);
		exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
	
}

function edit_group($mysqli){
	try{
		$data = array();
		$id = $mysqli->real_escape_string(isset( $_POST['item']['id'] ) ? $_POST['item']['id'] : '');
		$brgy = $mysqli->real_escape_string(isset( $_POST['item']['barangay'] ) ? $_POST['item']['barangay'] : '');
		$muns = $mysqli->real_escape_string(isset( $_POST['item']['municipal'] ) ? $_POST['item']['municipal'] : '');		
		$provs = $mysqli->real_escape_string(isset( $_POST['item']['province'] ) ? $_POST['item']['province'] : '');
		$name = $mysqli->real_escape_string(isset( $_POST['item']['name'] ) ? $_POST['item']['name'] : '');
		
		$contact = $mysqli->real_escape_string(isset( $_POST['item']['contact'] ) ? $_POST['item']['contact'] : '');
		$email = $mysqli->real_escape_string(isset( $_POST['item']['email'] ) ? $_POST['item']['email'] : '');

		//if($name='' || $provs='' || $muns='' || $brgy='') throw new Exception( "Invalid Request." );
		$query = "UPDATE tbl_group SET  name='$name', barangay='$brgy', province='$provs', municipal='$muns',contact=$contact, email='$email' WHERE id=$id";		
		if( $mysqli->query( $query ) ){
			$data['success'] = true;			
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		$mysqli->close();
		echo json_encode($data);
		exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
	
}

function edit_individual($mysqli){
	try{
		$data = array();
		$id = $mysqli->real_escape_string(isset( $_POST['item']['id'] ) ? $_POST['item']['id'] : '');
		$gid = $mysqli->real_escape_string(isset( $_POST['item']['group_id'] ) ? $_POST['item']['group_id'] : '');
		$sn = $mysqli->real_escape_string(isset( $_POST['item']['surName'] ) ? $_POST['item']['surName'] : '');
		$fn = $mysqli->real_escape_string(isset( $_POST['item']['firstName'] ) ? $_POST['item']['firstName'] : '');
		$mn = $mysqli->real_escape_string(isset( $_POST['item']['middleName'] ) ? $_POST['item']['middleName'] : '');
		$brgy = $mysqli->real_escape_string(isset( $_POST['item']['barangay'] ) ? $_POST['item']['barangay'] : '');
		$muns = $mysqli->real_escape_string(isset( $_POST['item']['municipal'] ) ? $_POST['item']['municipal'] : '');		
		$provs = $mysqli->real_escape_string(isset( $_POST['item']['province'] ) ? $_POST['item']['province'] : '');
		
		$sex = $mysqli->real_escape_string(isset( $_POST['item']['sex'] ) ? $_POST['item']['sex'] : '');
		$contact = $mysqli->real_escape_string(isset( $_POST['item']['contact'] ) ? $_POST['item']['contact'] : '');
		$email = $mysqli->real_escape_string(isset( $_POST['item']['email'] ) ? $_POST['item']['email'] : '');

		if($sn == '' || $fn == '' || $muns == ''){
			throw new Exception( "Required fields missing, Please enter and submit" );
		}
		$query = "UPDATE tbl_individual SET  group_id='$gid', surName='$sn', firstName='$fn', middleName='$mn',barangay='$brgy', province='$provs', 
		municipal='$muns',sex='$sex',contact='$contact', email='$email' WHERE id=$id";		
		if( $mysqli->query( $query ) ){
			$data['success'] = true;			
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		$mysqli->close();
		echo json_encode($data);
		exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
	
}


function edit_bene($mysqli){
	try{
		$data = array();
		$bene_id = $mysqli->real_escape_string(isset( $_POST['item']['bene_id'] ) ? $_POST['item']['bene_id'] : '');
		$male = $mysqli->real_escape_string(isset( $_POST['item']['male'] ) ? $_POST['item']['male'] : '');
		$female = $mysqli->real_escape_string(isset( $_POST['item']['female'] ) ? $_POST['item']['female'] : '');
		$ind = $mysqli->real_escape_string(isset( $_POST['item']['ind'] ) ? $_POST['item']['ind'] : '');
		$groups = $mysqli->real_escape_string(isset( $_POST['item']['groups'] ) ? $_POST['item']['groups'] : '');
		$month = $mysqli->real_escape_string(isset( $_POST['item']['month'] ) ? $_POST['item']['month'] : '');
		$mfo_id = $mysqli->real_escape_string(isset( $_POST['item']['mfo_id'] ) ? $_POST['item']['mfo_id'] : '');
		//$a = $mysqli->real_escape_string(isset( $_POST['item']['a'] ) ? $_POST['item']['a'] : '');

		//if(empty($a)){
			$query = "UPDATE tbl_bene SET male = '$male', female = '$female', ind = '$ind',groups='$groups' WHERE bene_id='$bene_id'";			
		//	$data['a'] = 'bene';
		//}else{
			//$query = "UPDATE tbl_benea SET male = '$male',female = '$female', ind = '$ind',groups='$groups' WHERE bene_id='$bene_id'";
			//$data['a'] = 'benea';
		//}
		if( $mysqli->query( $query ) ){
			$update = "SELECT SUM(male) + SUM(female) + SUM(ind) as ind_total, sum(groups) as group_total from tbl_bene 
			where month='$month' and mfo_id= '$mfo_id' and user_id in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
			$result = $mysqli->query( $update );
			$row = $result->fetch_assoc();			
			$data['ind_total']=$row['ind_total'];
			$data['group_total']=$row['group_total'];
			$data['success'] = true;
		
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		$mysqli->close();
		echo json_encode($data);
		exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
	
}


function add_bene($mysqli){
	try{
		$data = array();
		$a = $mysqli->real_escape_string(isset( $_POST['doc']['a'] ) ? $_POST['doc']['a'] : '');
		$mfo_id = $mysqli->real_escape_string(isset( $_POST['doc']['mfo_id'] ) ? $_POST['doc']['mfo_id'] : '');
		$month = $mysqli->real_escape_string(isset( $_POST['doc']['month'] ) ? $_POST['doc']['month'] : '');
		$ind = $mysqli->real_escape_string(isset( $_POST['doc']['ind'] ) ? $_POST['doc']['ind'] : '');
		$group = $mysqli->real_escape_string(isset( $_POST['doc']['group'] ) ? $_POST['doc']['group'] : '');
		$male = $mysqli->real_escape_string(isset( $_POST['doc']['male'] ) ? $_POST['doc']['male'] : '');
		$female = $mysqli->real_escape_string(isset( $_POST['doc']['female'] ) ? $_POST['doc']['female'] : '');
		$index = $mysqli->real_escape_string(isset( $_POST['doc']['index'] ) ? $_POST['doc']['index'] : '');

		if($mfo_id == '' || $month == ''  ){
			throw new Exception( "Required fields missing, Please enter and submit" );
		}
		if(isset($a)&&($a=='1')){
			$query = "INSERT INTO tbl_benea(mfo_id, year, month, male, female, ind, groups,user_id) VALUES ('$mfo_id', '2016', '$month', '$male', '$female', '$ind', '$group', ".$_SESSION['user_id'].")";
		}
		else{
			$query = "INSERT INTO tbl_bene(mfo_id, year, month, male, female, ind, groups,user_id) VALUES ('$mfo_id', '2016', '$month', '$male', '$female', '$ind', '$group', ".$_SESSION['user_id'].")";
		}
		if( $mysqli->query( $query ) ){
			$data['a']=$a;
			$data['index']=$index;
			$data['month']=$month;
			$data['ben'] = (int)$male+(int)$female+(int)$ind;
			$data['g'] = (int)$group;
			$data['success'] = true;
			$data['qqqq'] = $query;				
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		$mysqli->close();
		echo json_encode($data);
		exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
	
}

function add_group($mysqli){
	try{
		$data = array();
		$brgy = $mysqli->real_escape_string(isset( $_POST['doc']['brgy'] ) ? $_POST['doc']['brgy'] : '');
		$contact = $mysqli->real_escape_string(isset( $_POST['doc']['contact'] ) ? $_POST['doc']['contact'] : '');
		$email = $mysqli->real_escape_string(isset( $_POST['doc']['email'] ) ? $_POST['doc']['email'] : '');
		$muns = $mysqli->real_escape_string(isset( $_POST['doc']['muns'] ) ? $_POST['doc']['muns'] : '');
		$name = $mysqli->real_escape_string(isset( $_POST['doc']['name'] ) ? $_POST['doc']['name'] : '');
		$provs = $mysqli->real_escape_string(isset( $_POST['doc']['provs'] ) ? $_POST['doc']['provs'] : '');
	
		$query = "INSERT INTO tbl_group(name, province, municipal, barangay, contact, email, created_by) 
		VALUES ('$name', '$provs', '$muns', '$brgy', '$contact', '$email', ".$_SESSION['user_id'].")";

		if( $mysqli->query( $query ) ){
			$data['success'] = true;				
		}else{
			$data['success'] = false;	
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		$mysqli->close();
		echo json_encode($data);
		exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
	
}

function add_individual($mysqli){
	try{
		$data = array();
		$brgy = $mysqli->real_escape_string(isset( $_POST['doc']['brgy'] ) ? $_POST['doc']['brgy'] : '');
		$contact = $mysqli->real_escape_string(isset( $_POST['doc']['contact'] ) ? $_POST['doc']['contact'] : '');
		$email = $mysqli->real_escape_string(isset( $_POST['doc']['email'] ) ? $_POST['doc']['email'] : '');
		$muns = $mysqli->real_escape_string(isset( $_POST['doc']['muns'] ) ? $_POST['doc']['muns'] : '');
		$fn = $mysqli->real_escape_string(isset( $_POST['doc']['firstname'] ) ? $_POST['doc']['firstname'] : '');
		$mn = $mysqli->real_escape_string(isset( $_POST['doc']['middlename'] ) ? $_POST['doc']['middlename'] : '');
		$sn = $mysqli->real_escape_string(isset( $_POST['doc']['surname'] ) ? $_POST['doc']['surname'] : '');
		$provs = $mysqli->real_escape_string(isset( $_POST['doc']['provs'] ) ? $_POST['doc']['provs'] : '');
		$sex = $mysqli->real_escape_string(isset( $_POST['doc']['sex'] ) ? $_POST['doc']['sex'] : '');
		$month = $mysqli->real_escape_string(isset( $_POST['doc']['month'] ) ? $_POST['doc']['month'] : '');
		$group = $mysqli->real_escape_string(isset( $_POST['doc']['group'] ) ? $_POST['doc']['group'] : '');
		$mfo_id = $mysqli->real_escape_string(isset( $_POST['doc']['mfo_id'] ) ? $_POST['doc']['mfo_id'] : '');
		$bdate = $mysqli->real_escape_string(isset( $_POST['doc']['bdate'] ) ? $_POST['doc']['bdate'] : '');
		$cb = $mysqli->real_escape_string(isset( $_POST['doc']['cb'] ) ? $_POST['doc']['cb'] : '');

		if($cb){
				$query = "INSERT INTO tbl_groupservice(group_id, mfo_id, user_id, month) 
				VALUES ('$group', '$mfo_id', ".$_SESSION['user_id'].", '$month')";
		}else{
				$query = "INSERT INTO tbl_individual(surName, firstName, middleName, birthday, sex, contact, email, province, municipal, barangay, month, group_id, created_by, mfo_id) 
				VALUES ('$sn', '$fn', '$mn', '$bdate', '$sex', '$contact', '$email', '$provs', '$muns', '$brgy', '$month', '$group', ".$_SESSION['user_id'].", '$mfo_id')";
		}

		if( $mysqli->query( $query ) ){
			$data['success'] = true;				
		}else{
			$data['success'] = false;	
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		$mysqli->close();
		echo json_encode($data);
		exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
	
}

function add_bed1($mysqli){
	try{
		$data = array();
		$edit = $mysqli->real_escape_string(isset( $_POST['doc']['edit'] ) ? $_POST['doc']['edit'] : '');
		$a = $mysqli->real_escape_string(isset( $_POST['a'] ) ? $_POST['a'] : '');
		$mfo_id = $mysqli->real_escape_string(isset( $_POST['doc']['mfo_id'] ) ? $_POST['doc']['mfo_id'] : '');
		$month = $mysqli->real_escape_string(isset( $_POST['doc']['month'] ) ? $_POST['doc']['month'] : '');
		$month2 = $mysqli->real_escape_string(isset( $_POST['doc']['month2'] ) ? $_POST['doc']['month2'] : '');
		$fin = $mysqli->real_escape_string(isset( $_POST['doc']['fin'] ) ? $_POST['doc']['fin'] : '');
		$acc = $mysqli->real_escape_string(isset( $_POST['doc']['acc'] ) ? $_POST['doc']['acc'] : '');
		$accmo = $mysqli->real_escape_string(isset( $_POST['doc']['accmo'] ) ? $_POST['doc']['accmo'] : '');

		if($mfo_id == ''  || $fin == ''  ){
			throw new Exception( "Required fields missing, Please enter and submit." );
		}
		if($month == ''){
			if($acc=='')
				throw new Exception( "Required fields missing, Please enter and submit." );
		}
		if(isset($acc)&&$acc!=''){
			if ($edit=='true'){
				$query = "UPDATE tbl_obligationa set financial_obligation='$fin' where month = '$accmo' and mfo_id = '$mfo_id' and user_id in(select user_id from users where program_id = ".$_SESSION['program_id'].")";
			}else{
				$query = "INSERT INTO tbl_obligationa(mfo_id, financial_obligation, user_id, month) VALUES ('$mfo_id', '$fin', ".$_SESSION['user_id'].", '$accmo')";
			}
		}
		else{
		 if ($edit=='true'){
				$query = "UPDATE tbl_obligation set financial_obligation='$fin',month='$month' where month = '$month2' and mfo_id = '$mfo_id' and user_id in(select user_id from users where program_id = ".$_SESSION['program_id'].")";
			}
			else{
				$query = "INSERT INTO tbl_obligation(mfo_id, financial_obligation, user_id, month) VALUES ('$mfo_id', '$fin', ".$_SESSION['user_id'].", '$month')";
			}
		}
		if( $mysqli->query( $query ) ){
			$data['a']=$a;
			$data['success'] = true;		
			$data['message'] = 'Beneficiary added successfully.';			
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		$mysqli->close();
		echo json_encode($data);
		exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
	
}

function add_ob($mysqli){
	$query2="";
	try{
		$data = array();
		$mfo_id = $mysqli->real_escape_string(isset( $_POST['x']['mfo_id'] ) ? $_POST['x']['mfo_id'] : '');
		$month = $mysqli->real_escape_string(isset( $_POST['mon'] ) ? $_POST['mon'] : '');
		$input = $mysqli->real_escape_string(isset( $_POST['input'] ) ? $_POST['input'] : '');

		$query = "SELECT mfo from tbl_bymfo where mfo_id='$mfo_id'";
		$result = $mysqli->query($query);
		$row = $result->fetch_assoc();
		$header_id = $row['mfo'];

		if($header_id==null){
			$header_id="null";
		}else{
			$header_id="'".$header_id."'";
		}
		
		$query = "SELECT * FROM tbl_obligation where mfo_id='$mfo_id' and month = '$month' and user_id in(select user_id from users where program_id = ".$_SESSION['program_id'].")";
		$result = $mysqli->query($query);
		if($result->num_rows>0){
			if($input==""){
				$query2 = "DELETE from tbl_obligation where mfo_id='$mfo_id' and month = '$month' and user_id in(select user_id from users where program_id = ".$_SESSION['program_id'].")";
			}else{
				$query2 = "UPDATE tbl_obligation set financial_obligation='$input' where month = '$month' and mfo_id = '$mfo_id' and user_id in(select user_id from users where program_id = ".$_SESSION['program_id'].")";
			}
		}else
		$query2 = "INSERT INTO tbl_obligation(mfo_id, financial_obligation, user_id, month, header_id) VALUES ('$mfo_id', '$input', ".$_SESSION['user_id'].", '$month', $header_id)";

		if( $mysqli->query( $query2 ) ){
			$data['success'] = true;	
			$data['q'] = $query2;	
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		$mysqli->close();
		echo json_encode($data);
		exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['q'] = $query2;
		echo json_encode($data);
		exit;
	}
	
}

function add_oba($mysqli){
	try{
		$data = array();
		$mfo_id = $mysqli->real_escape_string(isset( $_POST['x']['mfo_id'] ) ? $_POST['x']['mfo_id'] : '');
		$month = $mysqli->real_escape_string(isset( $_POST['mon'] ) ? $_POST['mon'] : '');
		$input = $mysqli->real_escape_string(isset( $_POST['input'] ) ? $_POST['input'] : '');
		
		$query = "SELECT * FROM tbl_obligationa where mfo_id='$mfo_id' and month = '$month' and user_id in(select user_id from users where program_id = ".$_SESSION['program_id'].")";
		$result = $mysqli->query($query);
		if($result->num_rows>0)
			if($input==""){
				$query2 = "DELETE from tbl_obligationa where mfo_id='$mfo_id' and month = '$month' and user_id in(select user_id from users where program_id = ".$_SESSION['program_id'].")";
			}else
				$query2 = "UPDATE tbl_obligationa set financial_obligation='$input' where month = '$month' and mfo_id = '$mfo_id' and user_id in(select user_id from users where program_id = ".$_SESSION['program_id'].")";
		else
		$query2 = "INSERT INTO tbl_obligationa(mfo_id, financial_obligation, user_id, month) VALUES ('$mfo_id', '$input', ".$_SESSION['user_id'].", '$month')";

		if( $mysqli->query( $query2 ) ){
			$data['success'] = true;				
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		$mysqli->close();
		echo json_encode($data);
		exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		echo json_encode($data);
		exit;
	}
	
}

function delete_kilo($mysqli, $id = ''){
	try{
		$a = $_POST['a'];
		if(empty($id)) throw new Exception( "Invalid Request." );
		if(empty($a)){$query = "DELETE FROM `tbl_registered` WHERE `reg_id` = '$id'";}
		else{$query = "DELETE FROM `tbl_registereda` WHERE `reg_id` = '$id'";}
		if($mysqli->query( $query )){
			$data['success'] = true;
			$data['a'] = $a;
			$data['message'] = 'Record deleted successfully.';
			echo json_encode($data);
			exit;
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function delete_group($mysqli, $id = ''){
	try{
	$query = "DELETE FROM `tbl_group` WHERE `id` = '$id'";
		if($mysqli->query( $query )){
			$data['success'] = true;
			echo json_encode($data);
			exit;
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}			
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function delete_individual($mysqli, $id = ''){
	try{
	$query = "DELETE FROM `tbl_individual` WHERE `id` = '$id'";
		if($mysqli->query( $query )){
			$data['success'] = true;
			echo json_encode($data);
			exit;
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}			
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}


function delete_bene($mysqli, $id = ''){
	try{
		$a = $_POST['a'];
		if(empty($id)) throw new Exception( "Invalid Request." );
		if(isset($a)&&$a!=''){$query = "DELETE FROM `tbl_benea` WHERE `bene_id` = '$id'";}
		else{$query = "DELETE FROM `tbl_bene` WHERE `bene_id` = '$id'";}
		if($mysqli->query( $query )){
			$data['success'] = true;
			echo json_encode($data);
			exit;
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}


function delete_bed1($mysqli, $items = ''){
	try{
		if(empty($items)) throw new Exception( "Invalid Request." );
		if($items['acc']!=''&&isset($items['acc'])){
			$query = "DELETE FROM `tbl_obligationa` WHERE `mfo_id` = ".$items['mfo_id']." and `financial_obligation`=".$items['fin']." and `month` = ".$items['accmo']." and `user_id` in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
		}else{
			$query = "DELETE FROM `tbl_obligation` WHERE `mfo_id` = ".$items['mfo_id']." and `financial_obligation`=".$items['fin']." and `month` = ".$items['month']." and `user_id` in (select user_id from users where program_id = ".$_SESSION['program_id'].")";
		}
		//if(isset($a)&&$a!=''){$query = "DELETE FROM `tbl_benea` WHERE `bene_id` = '$id'";}
		//else{$query = "DELETE FROM `tbl_bene` WHERE `bene_id` = '$id'";}
		if($mysqli->query( $query )){
			$data['success'] = true;
			$data['message'] = 'Record deleted successfully.';
			echo json_encode($data);
			exit;
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function add_remarks($mysqli){
	try{
		$data = array();
		$mfo_id = $mysqli->real_escape_string(isset( $_POST['x']['mfo_id'] ) ? $_POST['x']['mfo_id'] : '');
		$q = $mysqli->real_escape_string(isset( $_POST['q'] ) ? $_POST['q'] : '');
		$input = $mysqli->real_escape_string(isset( $_POST['input'] ) ? $_POST['input'] : '');
		
		$query = "SELECT * FROM tbl_remarks where mfo_id='$mfo_id' and quarter = '$q'";
		$result = $mysqli->query($query);
		if($result->num_rows>0)
		$query2 = "UPDATE tbl_remarks set remarks_text='$input' where quarter = '$q' and mfo_id = '$mfo_id' and user_id in(select user_id from users where program_id = ".$_SESSION['program_id'].")";
		else
		$query2 = "INSERT INTO tbl_remarks(mfo_id, quarter, remarks_text, date, user_id) 
		VALUES ('$mfo_id', '$q', '$input', now(), ".$_SESSION['user_id'].")";

		if( $mysqli->query( $query2 ) ){
			$data['success'] = true;				
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		$mysqli->close();
		echo json_encode($data);
		exit;
		
		
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function add_remarksDistrict($mysqli){
	try{
		$data = array();
		$mfo_id = $mysqli->real_escape_string(isset( $_POST['x']['mfo_id'] ) ? $_POST['x']['mfo_id'] : '');
		$input = $mysqli->real_escape_string(isset( $_POST['input'] ) ? $_POST['input'] : '');
		$provs = $mysqli->real_escape_string(isset( $_POST['provs'] ) ? $_POST['provs'] : '');
		$dist = $mysqli->real_escape_string(isset( $_POST['dist'] ) ? $_POST['dist'] : '');


		$query = "SELECT * FROM tbl_remarksbydistrict where mfo_id='$mfo_id' and province = '$provs' and district= '$dist'";
		$result = $mysqli->query($query);
		$row = $result->fetch_assoc();
		$id = $row['remarks_id'];
		if($result->num_rows>0)
		$query2 = "UPDATE tbl_remarksbydistrict set remarks_text='$input' where remarks_id='$id'";
		else
		$query2 = "INSERT INTO tbl_remarksbydistrict(mfo_id, remarks_text, date, user_id, province, district) 
		VALUES ('$mfo_id', '$input', now(), ".$_SESSION['user_id'].", '$provs', '$dist')";

		if( $mysqli->query( $query2 ) ){
			$data['success'] = true;				
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		$mysqli->close();
		echo json_encode($data);
		exit;
		
		
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function invalidRequest()
{
	$data = array();
	$data['success'] = false;
	$data['message'] = "Invalid request.";
	echo json_encode($data);
	exit;
}

?>