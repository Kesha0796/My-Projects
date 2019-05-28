<?php 
require "db.php";
if (isset($_REQUEST['login']))
{
$adminid = $_REQUEST['adminid'];
$password = $_REQUEST['pwd'];

if (($adminid == "admin") && ($password == "admin"))
{

$_SESSION['admin'] = $adminid;
?>

<script type="text/JavaScript"> window.location.href="Admin/home.php"; </script>
<?php

}

else
{
	?>

	<div style="color:white; font-size:20px;  background-color : red; padding-top : 10px; padding-bottom : 10px;"> Invalid Admin!! Try again  </div>
	<?php
}

}

?>
<!DOCTYPE html>
<html>	
<head>
<title>Law & Order Automation</title>
<link href="css/style.css" rel='stylesheet' type='text/css' />
</head>
<body>
<!--User-Login-->
<h1 style="text-shadow:2px 1px 2px black;">Law & Order Automation</h1>
<div class="avtar">
	<img src="images/avtar.png" height="120px" width="90%" />
</div>
	<div class="login-form">
		<p style="text-shadow:2px 1px 2px black;">Admin Area</p>
			<form method="POST">
				<div class="form-text">
				<input type="text" name="adminid" class="text" placeholder="USERNAME">
				<input type="password" name="pwd" placeholder="PASSWORD">
				
				<input type="submit" value="Go"  name="login" >
				</div>
			</form>
	</div>
<!--/User-Login-->
<!--start-copyright-->
<div class="copy-right">
<p>Design By: <a href="#">Your Name</a></p>
</div>
<!--//end-copyright-->	
</body>
</html>
