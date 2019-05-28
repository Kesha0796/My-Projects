<?php
include('db.php');

	
	$p1 = $_POST['AadharNumber'];
	$p2 = $_POST['PhoneNumber'];
	$p3 = $_POST['EmailId'];	
	$p4 = $_POST['password'];
	$p5 = $_POST['full_name'];
	
	
	
 $select="INSERT INTO citizen_login_signup(AadharNumber,PhoneNumber,EmailId,password,full_name) VALUES ('$p1','$p2','$p3','$p4','$p5')";

//$rs=mysql_query($select);

$rs = mysqli_query($conn, $select);
	if($rs)
{
		echo "Remark Inserted...";
	}
else{

echo "Nor Inserted..Please Check...";
}

//mysql_close($con);
?>

