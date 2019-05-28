<?php
$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("lawdb", $con);

	
	
	$p1 = $_POST["ComplaintDate"];
	$p2 = $_POST["Location"];
	
	$p3 = $_POST["Description"];
	$p4 = $_POST["Image"];
	
$sql ="SELECT * FROM missing_object_details order by missing_id";
$res = mysql_query($sql);

$id = 1;
while($row = mysql_fetch_array($res)){
$id = $row['missing_id'];
}
$id= $id + 1;

$path = "$id.png";
$actualpath = "missing_img/" . $path;

	
$select=mysql_query("INSERT INTO missing_object_details (`LcDate`,`LcLocation`,`LcDesc`,`LcProof`) VALUES ('$p1','$p2', '$p3','$actualpath')");
$rs=mysql_query($select);

if(mysql_query($sql)){

file_put_contents("./user_image/missing_img/".$path,base64_decode($p4));
echo "Successfully Uploaded";
}
else
{
echo "error";
}	
?>

