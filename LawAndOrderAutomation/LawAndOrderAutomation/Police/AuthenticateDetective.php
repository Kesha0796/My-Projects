<?php
	$did=$_REQUEST['did'];
	include "db1.php";
	$order="Update detective_login_signup set PoliceStatus=1 where Detective_id='$did'";
	 $result = $conn->query($order);
	header('location:Detectiveorgapproval.php');
?>