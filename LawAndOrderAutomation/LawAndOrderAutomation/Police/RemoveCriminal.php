<?php
	$did=$_REQUEST['did'];
	include "db1.php";
	$order="Update criminal_request set RequestStatus=-1 where 	RequestId='$did'";
	 $result = $conn->query($order);
	header('location:CriminalRequestApproval.php');
?>