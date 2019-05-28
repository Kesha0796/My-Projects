<?php 
	require "header.php";
	
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
                      <a  href="uploadlawpdf.php">
                          <i class="fa fa-upload"></i>
                          <span>Upload Law PDF</span>
                      </a>
                  </li>               
                  <li class="sub-menu">
                      <a class="active" href="managecitizen.php">
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
                <h2><i class="fa fa-users fa-lg"></i> Citizen Details</h2>
              </div><hr>
              <div class="custom-bar-chart">
                <div class="table-responsive">
                  <table class="table table-hover" id="dev-table">
                  	<tr >
						<th>Aadhar Number</th>
						<th>Name</th>
						<th>Phone Number</th>
						<th> Email</th>			
					</tr>
	      			<?php
					include "db1.php";
	      			$order = "SELECT * FROM citizen_login_signup";
	      			$result = $conn->query($order);
	      			while ($row= $result->fetch_assoc())
					{
						$order1="SELECT * FROM aadhar_details where AadharNumber=$row[AadharNumber]";
						$result1 = $conn->query($order1);
						while($row1=$result1->fetch_assoc())
						{
				        echo ("<tr><td>$row1[AadharNumber]</td>");
				        echo ("<td>$row1[FirstName]</td>");
				        echo ("<td>$row[PhoneNumber]</td>");
				        echo ("<td>$row1[Emailid]</td></tr>");
				    }
				       
						//echo ("<td><a href=\"RemoveEmployee.php?empid=$row[empId] \">Remove</a></td></tr>");
					}
				    ?>
		  		</table>
                </div> 
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