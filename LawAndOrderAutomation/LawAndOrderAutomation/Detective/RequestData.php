<?php 
require "header.php";
	require "menu.php";
if(isset($_REQUEST['signup']))
{
session_start();
$id=$_SESSION['detective'];
$name = $_REQUEST['name'];
$date = $_REQUEST['mydate'];
$desc = $_REQUEST['desc'];
$image2 = $_FILES['photo']['name'];
$move2 = "upload/".$image2;
move_uploaded_file($_FILES['photo']['tmp_name'], $move2);
require "db1.php";
$order = "INSERT INTO  criminal_request(`RequestDate`,`CriminalName`,`UploadedPhoto`,`DescriptionOfRequest`,`DetectiveId`) VALUES('$date','$name','$move2','$desc','$id')";
//if($conn->query($order))
//{
 echo("Data Requested!!.....Wait for approval");
 header("Location:home.php");
//}
}

?>

<!--main content start-->
      <section id="main-content">
          <section class="wrapper">
            <div class="row mt">
                        <!--CUSTOM CHART START -->
                        <div class="border-head">
                            <h3><i class="fa fa-dashboard"></i>Student Request</h3>
                        </div>
                        <div class="custom-bar-chart">

<form method="POST" enctype="multipart/form-data">
<div>
Name Of Criminal
<br/>
<div class="col-md-4">
<input type="text" class=" form-control" size=25 name="name" />
</div><br><br>
</div>
</br>
<div>
Date
<br/>
<div class="col-md-4">
<input type="date" class=" form-control" name="mydate" />
</div><br><br>
</div>
</br>
<div>
Description Of Request
<br/>
<div class="col-md-4">
<textarea rows="5" class=" form-control" name="desc" ></textarea>
</div><br><br><br><br>
</div>
</br>
Upload Photo
<br/>
<div class="col-md-4">
<input type="file" class=" form-control" name="photo" />
</div><br><br>
</div>
<div>
<div class="col-md-4">
<input type="submit" class="btn btn-success" value="REGISTER"  name="signup"/>
</div>
</div>

</form>


 </div>
                        <!--custom chart end-->
  					</div><!-- /row -->	
					</section>
      </section>
      <br>
      <!--main content end-->
	<?php require 'footer.php';
?>