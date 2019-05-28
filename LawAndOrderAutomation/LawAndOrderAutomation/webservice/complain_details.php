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
	
$sql ="SELECT * FROM complaint_details order by ComplaintId";
$res = mysql_query($sql);

$id = 1;
while($row = mysql_fetch_array($res)){
$id = $row['ComplaintId'];
}
$id= $id + 1;

$path = "$id.png";
$actualpath = "pass_img/" . $path;

	
$select=mysql_query("INSERT INTO complaint_details (`ComplaintDate`,`Location`,`Description`,`Image`) VALUES ('$p1','$p2', '$p3','$actualpath')");
$rs=mysql_query($select);

if(mysql_query($sql)){

file_put_contents("./user_image/pass_img/".$path,base64_decode($p4));
echo "Successfully Uploaded";
}
else
{
echo "error";
}	
?>

