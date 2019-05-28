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
                      <a class="active"  href="ManageDetective.php">
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
                <h2><i class="fa fa-users fa-lg"></i> Detective Details</h2>
              </div><hr>
              <div class="custom-bar-chart">
                <div class="table-responsive">
                  <table class="table table-hover" id="dev-table">
                  	<tr > 
						<th> ID</th>
						<th> Name of Organisation</th>
						<th> Email ID</th>
						<th> Contact </th>
						<th> Delete </th>
					</tr>
					<?php
					include "db.php";
					$order = "SELECT * FROM detective_login_signup";
					$result = mysql_query($order);

					while ($row=mysql_fetch_array($result))
					{
					echo ("<tr><td>$row[Detective_id]</td>");
					echo ("<td>$row[NameOfTheOrganisation]</td>");
					echo ("<td>$row[Email_id]</td>");
					echo ("<td>$row[Phone_Number]</td>");

					echo ("<td><a href=\"RemoveDetective.php?did=$row[Detective_id] \"><img src='reject.jpg' height=30 width=30></a></td></tr>");
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