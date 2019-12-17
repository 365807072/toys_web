<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>玩具订单列表</title>
<style>
.div_a{cursor: pointer;}
th{font-size:15px;}
.div_box{margin-top:10px;width:1000px;min-height:300px;max-height: 400px;border-bottom:1px dashed #111;}
</style>

</head>
<body>
	<?php
		//$get_list=$_REQUEST['list'];
		$conn = mysql_connect("115.29.48.94","liuwt","liuwt");
		if (!$conn)
		{
			die('Could not connect: ' . mysql_error());
		}
		mysql_select_db('quanquan_baby_show',$conn);
		mysql_query( 'set names utf8');
		$SERVER_NAME = "http://api.baobaoshowshow.com/";
	?>
<table border="0">
	<tr>
		<td width = '5%'>订单ID</td>
		<td width = '5%'>订单号</td>
		<td width = '5%'>订单状态</td>
		<td width = '5%'>用户ID</td>
		<td width = '10%'>图片</td>
		<td width = '10%'>标题</td>
		<td width = '5%'>价格</td>
		<td width = '5%'>用户名</td>
		<td width = '5%'>用户手机号</td>
		<td width = '10%'>用户地址</td>
		<td width = '5%'>操作</td>
	</tr>
	<?php
		$SERVER_NAME = "http://api.baobaoshowshow.com/";
		//if($group_id>0){
	        $orderCommentSql = "SELECT o.id,o.user_id,substring_index(b.business_pics,';',1) as img,b.business_title,o.sell_price,o.user_name,o.mobile,o.order_num,o.address,o.status 
	        				FROM baby_toys_order as o left join baby_toys_business as b on b.id=o.business_id 
	                        WHERE o.state='0' 
	                        order by o.id desc limit 100 ";
	        $orderCommentRes = mysql_query($orderCommentSql,$conn);
	        while($row = mysql_fetch_assoc($orderCommentRes)) {
	        	$order_id=intval($row['id']);	        	
	        	$tmp_img=$row['img'];
	        	if($tmp_img) {
	        		$img=$SERVER_NAME.$tmp_img;
	        	} else {
	        		$img="";
	        	}
	        	$user_id=$row['user_id']; 
	        	$business_title=$row['business_title'];
	        	$sell_price=$row['sell_price'];
	        	$user_name=$row['user_name'];
	        	$mobile=$row['mobile'];
	        	$order_num=$row['order_num'];
	        	$address=$row['address'];
	        	$status=$row['status'];
	        	if($status==9) {
	        		$status_name="已退款";
	        	} elseif($status==8) {
	        		$status_name="退款中";
	        	} elseif($status==7) {
	        		$status_name="已完成";
	        	} elseif($status==6) {
	        		$status_name="玩乐中";
	        	} elseif($status==5) {
	        		$status_name="送货中";
	        	} elseif($status==4) {
	        		$status_name="待消毒";
	        	} elseif($status==3) {
	        		$status_name="待清洗";
	        	} elseif($status==2) {
	        		$status_name="待取货";
	        	} else {
	        		$status_name="待支付";
	        	}
				echo "<tr>
						<td width = '5%'>{$order_id}</td>
						<td width = '5%'>{$order_num}</td>
						<td width = '5%'>{$status_name}</td>
						<td width = '5%'>{$user_id}</td>
						<td width = '10%'><img src='$img' style='width:100px;height:100px;' ></td>
						<td width = '10%'>{$business_title}</td>
						<td width = '5%'>{$sell_price}</td>
						<td width = '5%'>{$user_name}</td>
						<td width = '5%'>{$mobile}</td>
						<td width = '10%'>{$addres}</td>
						<td width = '5%'><a href='http://www.meimei.yihaoss.top/toysorderInfo/orderDetailList.php?order_id=$order_id' class='div_a' target='_blank'>订单帖子列表</a></td>
					</tr>";
	        }
		//}
	?>
</table>
<br/>
</body>
</html>
