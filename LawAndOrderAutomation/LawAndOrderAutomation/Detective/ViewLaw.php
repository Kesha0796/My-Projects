<?php 
require "header.php";
	require "menu.php";
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
 <div class="table-responsive">
                  <table class="table table-hover" id="dev-table"><?php 
include "db1.php";
$order="SELECT * FROM laws_table";
 $result =$conn->query($order);
 while($row=$result->fetch_assoc())
 {
	
 	//echo("<tr><td colspan='3'><a href='$row[Source]'><img src=../Admin/'$row[image]' height='20' width='20'></img></a></td>");
	echo("<td><a href='$row[Source]'>$row[LawType]</a></td></tr>");
 }
?>
</table>
</div>
<!-- </br></br></br></br></br></br></br>

 <table border=1>
<tr> 
			<th>Name</th>
			<th>Details</th>
</tr>
<?php 
//include "db1.php";
// $order1="SELECT * FROM criminal_request WHERE RequestStatus=1;
 //$result1 =$conn->query($order1);
 //while ($row1=$result1->fetch_assoc())
 {
//	echo ("<td>$row[CriminalName]</td>");
//	echo ("<td><a href=\"ViewDetails.php?lid=$row1[CriminalName] \">View</a></td></tr>");
}
 	?>
 </table> -->

 </div>
                        <!--custom chart end-->
  					</div><!-- /row -->	
					</section>
      </section>
      <br>
      <!--main content end-->
	<?php require 'footer.php';
?>