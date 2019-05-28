<?php 

if (isset($_REQUEST['signup']))
{
$mydate = $_REQUEST['mydate'];
// $name = $_REQUEST['name'];
$place = $_REQUEST['place'];
$time = $_REQUEST['time'];
$did=$_REQUEST['did'];
//$nameog = $_REQUEST['nameog'];

//$image2 = $_FILES['doc']['name'];
//$move2 = "uploadproof/".$image2;
//move_uploaded_file($_FILES['doc']['tmp_name'], $move2);

require "db1.php";
$order2="Update license_application set PoliceStatus=1 where 	Licenseid='$did'";
	 $result = $conn->query($order2);
$order = "SELECT AadharNumber FROM license_application where Licenseid=$did ";
        $result = $conn->query($order);
        $order1="SELECT Emailid FROM aadhar_details where AadharNumber=$result";
        $to = $order1;
$subject = "Appointment Details";
$txt = "Time:"+$time+" Place: "+$place+" Date: "+$mydate;
$headers = "From: kesharshah83@gmail.com" . "\r\n" .
//$order = "INSERT INTO  detective_login_signup(Detective_Proof, Phone_Number, Email_id, Password, NameOfTheOrganisation) VALUES('$move2','$phno','$emailid','$password','$nameog')";
mail($to,$subject,$txt,$headers);
if($conn->query($order))
{

?>

<script type="text/JavaScript"> window.location.href="Detectivelogin.php"; </script>
<?php
}
}
?>






<!DOCTYPE html>
<html>	
<head>
<title>Registation</title>
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
<link href="style.css" rel='stylesheet' type='text/css' />
<!--webfonts-->
<link href='http://fonts.googleapis.com/css?family=Open+Sans:700,300,600,800,400' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Marvel:400,700' rel='stylesheet' type='text/css'>
<!--//webfonts-->
</head>
<body>
	<h1>Investigation Registration Form</h1>
		<div class="registration">
			<h2>Registration Form</h2>				
					<form method="POST" enctype="multipart/form-data">
						<div class="form-info">
						<!-- <input type="text" class="text" placeholder="Detective Name" name="name" > -->
						<input type="text" class="text" placeholder="Enter Place" name="place" >
						
						<input type="date" class="text" placeholder="Enter Date" name="mydate">
						
						
						<input type="time" class="text" placeholder="Enter Time" name="time">
						<input type="submit" value="REGISTER" name="signup">
					</form>
					<!--<a href="Detectivelogin.php" style="color:white;font-size:18px;">Back</a><br><br>
							<div class="clear"> </div>-->
		</div>
</body>
</html>
