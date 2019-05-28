<?php
include "db1.php";
require "header.php";

if (isset($_REQUEST['upload']))
{

$ltype= $_REQUEST['ltype'];
$image1 = $_FILES['img']['name'];

$move1 = "upload/" . $image1;

$image2 = $_FILES['img1']['name'];
$move2 = "uploadimg/" . $image2;
move_uploaded_file($_FILES['img']['tmp_name'], $move1);
move_uploaded_file($_FILES['img1']['tmp_name'], $move2);



$sql = "insert into laws_table (LawType, Source, image) values ('$ltype', '$move1', '$move2')";
$result = mysqli_query($conn, $sql);
echo "<script> alert ('Law uploaded successfully'); </script>";

}


?>
<!--sidebar start-->
      <aside>
          <div id="sidebar"  class="nav-collapse ">
              <!-- sidebar menu start-->
              <ul class="sidebar-menu" id="nav-accordion">
              
                  <p class="centered"><a href="profile.html"><img src="assets/img/ui-sam.png" class="img-circle" width="60"></a></p>
                  <h5 class="centered">Admin</h5>
                    
                  <li class="">
                      <a  href="home.php">
                          <i class="fa fa-dashboard"></i>
                          <span>Dashboard</span>
                      </a>
                  </li>
                  <li class="sub-menu">
                      <a class="active" href="uploadlawpdf.php">
                          <i class="fa fa-upload"></i>
                          <span>Upload Law PDF</span>
                      </a>
                  </li>               
                  <li class="sub-menu">
                      <a href="managecitizen.php">
                          <i class="fa fa-user"></i>
                          <span>Citizen</span>
                      </a>
                  </li>               
                  <li class="sub-menu">
                      <a href="ManageDetective.php">
                          <i class="fa fa-user"></i>
                          <span>Detective</span>
                      </a>
                  </li>               
                  <li class="sub-menu">
                      <a href="managelicense.php">
                          <i class="fa fa-user"></i>
                          <span>License</span>
                      </a>
                  </li>  
                  
                  <li class="sub-menu">
                      <a href="../logout.php">
                          <i class="fa fa-lock"></i>
                          <span>Logout</span>
                      </a>
                  </li>   
              </ul>
              <!-- sidebar menu end-->
          </div>
      </aside>
      <!--sidebar end-->
 <!--main content start-->
      <section id="main-content">
          <section class="wrapper">
            <div class="row mt">
              <!--CUSTOM CHART START -->
              <div class="border-head">
                  <h2><i class="fa fa-edit fa-lg"></i> Upload Law PDF</h2>
              </div><hr>
              <div class="custom-bar-chart">
                <form class="form-horizontal" method="post" enctype="multipart/form-data">
                  <fieldset>
                    <div class="form-group">
                      <div class="col-md-12">
                        <label class="col-md-3 control-label"> Select Type:
                        <span class="text-danger">*</span></label>
                        <div class="col-md-4"> 
                        	<select name="ltype" class="form-control" required>
							<option value="criminal">criminal</option>
							<option value="women safety"> women safety </option>
							</select> 
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-md-12">
                          <label class="col-md-3 control-label"> Select PDF:</label>
                          <div class="col-md-4">  
                            <input type="file" name="img" class="form-control"><br>
                          
						  
						  </div>
                      </div>
                    </div>
					
					 <div class="form-group">
                      <div class="col-md-12">
                          <label class="col-md-3 control-label"> Select Image:</label>
                          <div class="col-md-4">  
                            <input type="file" name="img1" class="form-control"><br>
                          
						  
						  </div>
                      </div>
                    </div>
					
					
					
                    <div class="form-group">
                        <div class="col-md-4">
                        </div>
                        <div class="col-md-4">
                          <input type="submit" value="UPLOAD" name="upload" class="btn btn-warning btn-md">
                          <input type="reset" value="RESET" name="reset" class="btn btn-danger btn-md">
                        </div>
                      </div>
                    </fieldset>
                  </form>
              </div>
              <!--custom chart end-->
  					</div><!-- /row -->	
					</section>
      </section>
      <br>
      <!--main content end-->
<?php
     	require "footer.php";
     ?>