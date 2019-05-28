
<!-- <?php

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Untitled Document</title>
</head>

<body> -->
<?php 
require "header.php";
  require "menu.php";

  ?>
  <section id="main-content">
          <section class="wrapper">
            <div class="row mt">
                        <!--CUSTOM CHART START -->
                        <div class="border-head">
                            <h3><i class="fa fa-dashboard"></i>Student Request</h3>
                        </div>
                        <div class="custom-bar-chart">
<!-- <form id="form1" name="form1"> -->

<form method="POST" enctype="multipart/form-data">
 <table>
 
    <tr>
      <td>
        <table border="1">
    <tr> 
      <th> License Type</th>
      <th> Documents</th>
      <th> Description </th>
      <th> Date </th>
      <th> Location </th>
      <th> Approval </th>
    </tr>
        <?php
        
      include "db1.php";
        $order = "SELECT * FROM license_application where PoliceStatus=0 ";
        $result = $conn->query($order);
     

        while ($row= $result->fetch_assoc())
    {
          include "db1.php";
          echo ("<tr><td>$row[LicenseType]</td>");
          echo ("<td>$row[Documents]</td>");
          echo ("<td>$row[Description]</td>");
          echo ("<td>$row[LicenseDate]</td>");
          echo ("<td>$row[Location]</td>");
      echo ("<td><a href=\"LicenseDetailsinsert.php?did=$row[Licenseid] \"><img src='accept.png' height=30 width=30></a></td></tr>");
    }
        ?>
        </table>
      </td>
      </tr>
      </table>
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
  <!--</body>
  </html> -->


