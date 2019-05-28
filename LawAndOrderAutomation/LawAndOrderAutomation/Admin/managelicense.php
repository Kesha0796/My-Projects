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
                      <a href="uploadlawpdf.php">
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
                      <a class="active" href="managelicense.php">
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
                <h2><i class="fa fa-users fa-lg"></i> License Details</h2>
              </div><hr>
              <div class="custom-bar-chart">
                <div class="table-responsive">
                  <table class="table table-hover" id="dev-table">
                  	<tr >
						<th>License ID</th>
						<th>License Type</th>
						<th>Description</th>
						<th> Loaction </th>
						<th>Date</th>
						<th>Police Status</th>
						<th colspan="2">Status</th>
						
					</tr>
      				<?php
					include "db1.php";
      				$order = "SELECT * FROM license_application where AdminStatus = 0";
	  
      				$result =$conn->query($order);

					while ($row=$result->fetch_assoc())
					{
					echo ("<tr><td>$row[Licenseid]</td>");
					echo ("<td>$row[LicenseType]</td>");
					echo ("<td>$row[Description]</td>");
					echo ("<td>$row[Location]</td>");
					echo ("<td>$row[LicenseDate]</td>");
					echo ("<td>$row[PoliceStatus]</td>");
					echo ("<td><a href=\"approvelicense.php?lid=$row[Licenseid] \"><img src='accept.png' height='20' width='20'></img></a></td>");
					echo ("<td><a href=\"rejectlicense.php?lid=$row[Licenseid] \"><img src='reject.jpg' height='20' width='20'></img></a></td> </tr>");


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