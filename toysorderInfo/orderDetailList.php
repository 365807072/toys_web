<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>玩具订单帖子列表</title>
<style>
.div_a{cursor: pointer;}
th{font-size:15px;}
.div_box{margin-top:10px;width:1000px;min-height:300px;max-height: 400px;border-bottom:1px dashed #111;}
</style>

</head>
<body>
	<?php
		$order_id=$_REQUEST['order_id'];
		$conn = mysql_connect("115.29.48.94","liuwt","liuwt");
		if (!$conn)
		{
			die('Could not connect: ' . mysql_error());
		}
		mysql_select_db('quanquan_baby_show',$conn);
		mysql_query( 'set names utf8');
		$SERVER_NAME = "http://api.baobaoshowshow.com/";
	?>
	<a href='http://www.meimei.yihaoss.top/toysorderInfo/publicOrderDetail.php?order_id=<?php echo $order_id; ?>' class='div_a' target='_blank'>添加订单帖子</a>
<table border="0">
	<tr>
		<td width = '20%'>图片</td>
		<td width = '30%'>描述</td>
		<td width = '5%'>订单消费状态</td>
		<!-- <td width = '5%'>操作</td> -->
	</tr>
	<?php
		$SERVER_NAME = "http://api.baobaoshowshow.com/";
		if($order_id>0){
	        $orderCommentSql = "SELECT * FROM baby_toys_listing  
	                        WHERE state='0' and order_id=$order_id order by id desc ";
	        $orderCommentRes = mysql_query($orderCommentSql,$conn);
	        while($row = mysql_fetch_assoc($orderCommentRes)) {
	        	$order_id=intval($row['order_id']);	        	
	        	$tmp_img=$row['img'];
	        	if($tmp_img) {
	        		$imgArray = explode(';',$tmp_img);
	        		$listImg=$SERVER_NAME.$imgArray[0];
	        	} else {
	        		$listImg="";
	        	}
	        	
	        	$status=$row['status'];
	        	$status_name=$row['status_name'];
	        	$img_description=$row['img_description'];
	        	
				echo "<tr><td width = '20%'>
									<img  src='{$listImg}' style='width:100px;height:100px;' >
								</td>
						<td width = '30%'>{$img_description}</td>
						<td width = '5%'>{$status_name}</td>
						
					</tr>";
					/*<td width = '5%'><a href='http://www.meimei.yihaoss.top/toysorderInfo/orderDetailList.php?order_id=$order_id' class='div_a' target='_blank'>订单帖子</a></td>*/
	        }
		}
	?>
</table>
<br/>
</body>
</html>
