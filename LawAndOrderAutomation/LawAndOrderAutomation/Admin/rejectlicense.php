<?php
$lid=$_REQUEST[lid];
include "db.php";
$order="update license_application set AdminStatus='-1' where Licenseid='$lid'";
	$result=mysql_query($order);
	header('location:managelicense.php');
?>