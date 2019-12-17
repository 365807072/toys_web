<?php
	$order_id=$_REQUEST['order_id'];
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>发布帖子</title>

<link href = '/Tpl/Public/css/css.css' rel = 'stylesheet' type = 'text/css'  />

<style>
th{font-size:15px;}
.div_box{margin-top:10px;width:1000px;min-height:300px;max-height: 400px;border-bottom:1px dashed #111;}
</style>

</head>
<script src="/Tpl/Public/js/jquery-1.10.2.min.js"></script>
<script language = "JavaScript" type = "text/javascript">

</script>
<body  class = "mainBody">
<table cellpadding='5' cellspacing='10' width = "100%">
	<form enctype="multipart/form-data" method ='POST'  action="http://api.baobaoshowshow.com/index.php?r=WebBaoShow/PublicOrderDetail">
	订单消费状态：<select name="status">
		<option value="2">待取货</option>
		<option value="3">待清洗</option>
		<option value="4">待消毒</option>
		<option value="5">送货中</option>
		<option value="6">玩乐中</option>
		<option value="7">已完成</option>
	</select><br>
	描述:<textarea name="img_desc" value="" cols="100" rows="5"></textarea><br>
	图片位置：<select name="status_pic">
		<option value="0">当前位置</option>
		<option value="2">待取货</option>
		<option value="3">待清洗</option>
		<option value="4">待消毒</option>
		<option value="5">送货中</option>
		<option value="6">玩乐中</option>
		<option value="7">已完成</option>
	</select><br>

    <div class="div_box">	 	
		图片1：<input type="file" name="img1" value=""><br>
		图片2：<input type="file" name="img2" value=""><br>
		图片3：<input type="file" name="img3" value=""><br>
		图片4：<input type="file" name="img4" value=""><br>
		图片5：<input type="file" name="img5" value=""><br>
		图片6：<input type="file" name="img6" value=""><br>
		图片7：<input type="file" name="img7" value=""><br>
		图片8：<input type="file" name="img8" value=""><br>
	</div>
	<input type='hidden' name="order_id" value='<?php echo $order_id;  ?>'>
   	&nbsp;&nbsp;&nbsp;&nbsp;<input type='submit' value='发布'>
	&nbsp;&nbsp;&nbsp;&nbsp;<input type='reset' value='重置'>
   </form>

</table>
<br/>
</body>
</html>
