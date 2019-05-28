<html>
<head>
<title>Profile</title>
</head>
<body>
<?php
session_start();
$email=$_SESSION['detective'];
include "db1.php";
$order="SELECT * FROM detective_login_signup WHERE Email_id='$email'";
 $result =$conn->query($order);
// $result = $mysqli->query($order);
$row=$result->fetch_assoc();

?>
<table>
<tr><td>Name</td><td>:</td><td><?php echo($row["DetectiveName"]) ?></td></tr>
<tr><td>Name Of Organisation</td><td>:</td><td><?php echo($row["NameOfTheOrganisation"]) ?></td></tr>
<tr><td>Detective ID</td><td>:</td><td><?php echo($row["Detective_id"]) ?></td></tr>
<tr><td>Phone Number</td><td>:</td><td><?php echo($row["Phone_Number"]) ?></td></tr>
<tr><td>Email Id</td><td>:</td><td><?php echo($row["Email_id"]) ?></td></tr>
</table>
<?php

?>
</body>
</html>