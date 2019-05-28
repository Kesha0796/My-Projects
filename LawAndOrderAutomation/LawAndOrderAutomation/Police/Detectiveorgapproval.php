

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Untitled Document</title>
</head>

<body>
<form id="form1" name="form1">
 <table>
 
    <tr>
      <td>
        <table border="1">
    <tr> 
      <th> ID</th>
      <th> Name of Organisation</th>
      <th> Email ID</th>
      <th> Contact </th>
      <th> Delete </th>
      <th> Accept </th>
    </tr>
        <?php
      include "db1.php";
        $order = "SELECT * FROM detective_login_signup where PoliceStatus=0 ";
        $result = $conn->query($order);
     

        while ($row= $result->fetch_assoc())
    {
          echo ("<tr><td>$row[Detective_id]</td>");
          echo ("<td>$row[NameOfTheOrganisation]</td>");
          echo ("<td>$row[Email_id]</td>");
          echo ("<td>$row[Phone_Number]</td>");
         
      echo ("<td><a href=\"RemoveDetective.php?did=$row[Detective_id] \"><img src='reject.jpg' height=30 width=30></a></td>");
      echo ("<td><a href=\"AuthenticateDetective.php?did=$row[Detective_id] \"><img src='accept.png' height=30 width=30></a></td></tr>");
    }
        ?>
        </table>
      </td>
      </tr>
      </table>
      
  </body>
  </html>


