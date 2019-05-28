<?php
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("lawdb", $con);

	
	
	$p1 = $_POST["LicenseDate"];
	$p2 = $_POST["Location"];
	
	$p3 = $_POST["Description"];
	$p4 = $_POST["Documents"];
	$p5 = $_POST["LicenseType"];
	
$sql ="SELECT * FROM license_application order by Licenseid";
$res = mysql_query($sql);

$id = 1;
while($row = mysql_fetch_array($res)){
$id = $row['Licenseid'];
}
$id= $id + 1;

$path = "$id.png";
$actualpath = "licance_img/" . $path;

	
$select=mysql_query("INSERT INTO license_application (`LicenseDate`,`Location`,`Description`,`LicenseType`,`Documents`) VALUES ('$p1','$p2', '$p3','$p5','$actualpath')");
$rs=mysql_query($select);

if(mysql_query($sql)){

file_put_contents("./user_image/licance_img/".$path,base64_decode($p4));
echo "Successfully Uploaded";
}
else
{
echo "error";
}	
?>

