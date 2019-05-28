<html>
<head>
<title>Profile</title>
</head>
<body>
<?php
$name=$_REQUEST["lid"];
include "db1.php";
$order="SELECT * FROM criminal_details WHERE CriminalName='$name'";
	$result =$conn->query($order);
 while($row=$result->fetch_assoc())
 {
 ?>
 <table>
<tr><td>Name</td><td>:</td><td><?php echo($row["CriminalName"]) ?></td></tr>
<tr><td>FIR Number</td><td>:</td><td><?php echo($row["FirNumber"]) ?></td></tr>
<tr><td>Age</td><td>:</td><td><?php echo($row["Age"]) ?></td></tr>
<tr><td>Gender</td><td>:</td><td><?php echo($row["Gender"]) ?></td></tr>
<tr><td>Crime</td><td>:</td><td><?php echo($row["Crime"]) ?></td></tr>
<tr><td>Laws Imposed</td><td>:</td><td><?php echo($row["Sections"]) ?></td></tr>
<tr><td>Address</td><td>:</td><td><?php echo($row["Address"]) ?></td></tr>
<tr><td>City</td><td>:</td><td><?php echo($row["City"]) ?></td></tr>
<tr><td>Phone Number</td><td>:</td><td><?php echo($row["PhoneNumber"]) ?></td></tr>
<tr><td>Current Status</td><td>:</td><td><?php echo($row["Status"]) ?></td></tr>
<tr><td>Details</td><td>:</td><td><?php echo($row["RecordDetail"]) ?></td></tr>
<tr><td>Police Coments</td><td>:</td><td><?php echo($row["PoliceComments"]) ?></td></tr>
</table>
<?php
}
?>
</body>
</html>