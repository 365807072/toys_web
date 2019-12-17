<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/> <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
   
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" media="(device-height: 568px)">
            </head>
		

		<body>
     
	   <?php 
	$conn = mysql_connect("115.29.48.94","liuwt","liuwt");
	$now_time=date("Y-m-d 00:00:00",time());
		if (!$conn)
		{
			die('Could not connect: ' . mysql_error());
		}
		mysql_select_db('quanquan_baby_show',$conn);
		mysql_query( 'set names utf8');
		$xdsql = "SELECT *  FROM `baby_collect_info` where type='0' ORDER by id desc limit 100 ";
		$xdqueryRes = mysql_query($xdsql,$conn);
		?>
		<table border="1">
			<tr>
				<th >ID</th>
				<th>用户ID</th>
				<th >版本</th>
				<th >描述</th>
		    </tr>
		
		<?php 
		while($row = mysql_fetch_array($xdqueryRes)) {
			echo "<tr>";
			echo "<th >".$row['id']."</th>";
			echo "<th >".$row['user_id']."</th>";
			echo "<th >".$row['app_model']."</th>";
			echo "<th >".$row['title']."</th>";
			echo "</tr>";
		}
		echo "</table>";
	mysql_close($conn);
	?>
   
    </body>
</html>
