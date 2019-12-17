<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>帖子列表</title>
<style>
.div_a{cursor: pointer;}
th{font-size:15px;}
.div_box{margin-top:10px;width:1000px;min-height:300px;max-height: 400px;border-bottom:1px dashed #111;}
</style>

</head>
<body>
	<?php
		$get_list=$_REQUEST['list'];
		if($get_list=="SpEbBsjVae6PDNF4MGD7") {
			$group_id=612;
		} elseif($get_list=="ktW0JODFSjiTwwpvqjZq") {
			$group_id=606;
		} else {
			$group_id=0;
		}
		$conn = mysql_connect("115.29.48.94","liuwt","liuwt");
		if (!$conn)
		{
			die('Could not connect: ' . mysql_error());
		}
		mysql_select_db('quanquan_baby_show',$conn);
		mysql_query( 'set names utf8');
		$SERVER_NAME = "http://api.baobaoshowshow.com/";
		if($group_id>0){
	        echo "<div><a class='div_a' href='http://www.meimei.yihaoss.top/groupInfo/publiclisting.php?list=$get_list' target='_blank'>添加帖子</a></div>";
		} else {
			echo "<div>添加帖子</div>";
		}
	?>
<table border="0">
	<tr>
		<td width = '20%'>图片</td>
		<td width = '20%'>标题</td>
		<td width = '20%'>描述</td>
		<td width = '10%'>操作</td>
	</tr>
	<?php
		$SERVER_NAME = "http://api.baobaoshowshow.com/";
		if($group_id>0){
	        $orderCommentSql = "SELECT id,user_id,substring_index(img,';',1) as img,img_title,img_description,group_id,root_img_id 
	        				FROM baby_listing
	                        WHERE group_id={$group_id} and state='0' and root_img_id is null 
	                        order by create_time desc limit 100 ";
	        $orderCommentRes = mysql_query($orderCommentSql,$conn);
	        while($row = mysql_fetch_assoc($orderCommentRes)) {
	        	$root_img_id=intval($row['root_img_id']);
	        	if($root_img_id<=0) {
	        		$img_id=$row['id'];
	        	}	        	
	        	$tmp_img=$row['img'];
	        	if($tmp_img) {
	        		$img=$SERVER_NAME.$tmp_img;
	        	} else {
	        		$img="";
	        	}
	        	$img_title=$row['img_title']; 
	        	$img_description=$row['img_description'];
	        	$show_group_id=$row['group_id'];
	        	$show_user_id=$row['user_id'];
	        	echo "<tr>
						<td width = '20%'><img src='$img' style='width:100px;height:100px;' ></td>
						<td width = '20%'>{$img_title}</td>
						<td width = '20%'>{$img_description}</td>
						<td width = '10%'><a href='http://www.meimei.yihaoss.top/groupInfo/publiclisting.php?list=$get_list&detail=$img_id' class='div_a' target='_blank'>跟帖</a></td>
					</tr>";
	        }
		}
	?>
</table>
<br/>
</body>
</html>
