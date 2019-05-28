<?php 

if (isset($_REQUEST['login']))
{
$email = $_REQUEST['email'];
$password = $_REQUEST['pwd'];
include "db1.php";
$order="SELECT * FROM police_login_signup WHERE Email='$email' and Password='$password'";
 	
	      			
$result = mysqli_query($conn,$order) or die(mysql_error());
	$numResults = mysqli_num_rows($result);

	     
if($numResults>0)
{
session_start();
$_SESSION['police'] = $email;
?>

<script type="text/JavaScript"> window.location.href="Police/Home.php"; </script>
<?php

}

else
{
	?>

	<div style="color:white; font-size:20px;  background-color : red; padding-top : 10px; padding-bottom : 10px;"> Invalid Police!! Try again  </div>
	<?php
}

}

?>

<html>
<head>
<title> Login </title>
<link href="css/style.css" rel='stylesheet' type='text/css' />
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
</head>

<body>
<h1 style="text-shadow:2px 1px 2px black;">Law & Order Automation</h1>
<div class="avtar">
	<img src="images/avtar.png" height="120px" width="90%" />
</div>
	<div class="login-form">
		<p style="text-shadow:2px 1px 2px black;">Police Organisation</p>
			<form method="POST">
				<div class="form-text">
				<input type="text" name="email" class="text" placeholder="Email">
				<input type="password" name="pwd" placeholder="PASSWORD">
				
				<input type="submit" value="Go"  name="login" >
				</div>
			</form><br><br>
			<a class="btn btn-success" href="Policesignup.php">Polic Registration</a>
	</div>
<!--/User-Login-->
<!--start-copyright-->
<div class="copy-right">
<p>Design By: <a href="#">Your Name</a></p>
</div>

</body>
</html>
<!-- <form method="POST">
<div>
Detective ID
<br/>
<input type="text" size=25 name="detectiveid" />
</div>
<div>
Password 
<br/>
<input type="password" name="pwd" />
</div>

<div>
<input type="submit" value="LOGIN"  name="login"/>
<br/>
<input type="submit" value="RESET" name="Reset"/>
</div>

</form> -->
	