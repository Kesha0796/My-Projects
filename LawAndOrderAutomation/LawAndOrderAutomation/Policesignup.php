<?php 
require "db1.php";
if (isset($_REQUEST['signup']))
{

$password = $_REQUEST['pwds'];
$name = $_REQUEST['name'];
$phno = $_REQUEST['phno'];
$emailid = $_REQUEST['emailid'];
$aadharno = $_REQUEST['aadharno'];


$image2 = $_FILES['doc']['name'];
$move2 = "uploadproof/".$image2;
move_uploaded_file($_FILES['doc']['tmp_name'], $move2);

$order = "INSERT INTO police_login_signup(Police_Proof, Phone_Number, AadharNumber, Phone_Number_Alt, Email, Password) 
			VALUES('".$move2."','".$phno."','".$aadharno."','".$name."','".$emailid."','".$password."')"; 
$res =mysqli_query($conn,$order);
if(isset($res))
{

?>

<script type="text/JavaScript"> window.location.href="Policelogin.php"; </script>
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
	<h1>Police Registration Form</h1>
		<div class="registration">
			<h2>Registration Form</h2>				
					<form method="POST" enctype="multipart/form-data">
						<div class="form-info">
						<input type="text" class="text" placeholder="Phone No" name="phno" >
						<input type="text" class="text" placeholder="Alter Phone No" name="name" >
						<input type="text" class="text" placeholder="Email Adress" name="emailid">
						<input type="text" class="text" placeholder="Aadhar no." name="aadharno">
						<input type="password" placeholder="Password" name="pwds">
						<br><label>Upload Proof</label>
						<input type="File" name="doc">
						</div>
						<br>
					    <input type="submit" value="REGISTER" name="signup">
					</form>
					<a href="Policelogin.php" style="color:white;font-size:18px;">Back</a><br><br>
							<div class="clear"> </div>
		</div>
</body>
</html>

