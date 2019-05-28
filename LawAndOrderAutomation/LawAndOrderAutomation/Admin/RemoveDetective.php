<?php
	$did=$_REQUEST[did];
	include "db.php";
	$order="DELETE FROM detective_login_signup where Detective_id='$did'";
	$result=mysql_query($order);
	header('location:ManageDetective.php');
?>