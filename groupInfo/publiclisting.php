<?php
	$get_list=$_REQUEST['list'];
	if($get_list=="SpEbBsjVae6PDNF4MGD7") {
		$group_id=612;
	} elseif($get_list=="ktW0JODFSjiTwwpvqjZq") {
		$group_id=606;
	} else {
		$group_id=0;
	}
	$root_img_id=intval($_REQUEST["detail"]);
	$conn = mysql_connect("115.29.48.94","liuwt","liuwt");
	if (!$conn)
	{
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db('quanquan_baby_show',$conn);
	mysql_query( 'set names utf8');
	if($root_img_id>0) {
		$orderCommentSql = "SELECT user_id FROM baby_listing WHERE id={$root_img_id}";
        $orderCommentRes = mysql_query($orderCommentSql,$conn);
        while($row = mysql_fetch_assoc($orderCommentRes)) {
        	$user_id=intval($row['user_id']);
        }
	} elseif($group_id>0) {
		$groupCommentSql = "SELECT user_id FROM baby_post_group WHERE id={$group_id}";
        $groupCommentRes = mysql_query($groupCommentSql,$conn);
        while($row = mysql_fetch_assoc($groupCommentRes)) {
        	$user_id=intval($row['user_id']);
        }
	} else {
		$user_id=0;
	}
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
	<form enctype="multipart/form-data" method ='POST'  action="http://api.baobaoshowshow.com/index.php?r=WebBaoShow/PublicListing">
	<!-- 话题用户 --><input type="hidden" name="login_user_id" value="<?php echo $user_id;?>" >
	<!-- 群ID --><input type="hidden" name="group_id" value="<?php echo $group_id;?>"  >
	<!-- 跟帖ID --><input type="hidden" name="root_img_id" value="<?php echo $root_img_id;?>"  >	
	<?php
    	if($root_img_id<=0) {
    		echo "
    		是否最新展示：<input type='radio' name='is_show' value='0' checked  >是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			        <input type='radio' name='is_show' value='1' >否
			        <br>
			是否视频：<input type='radio' name='is_video' value='0' checked  >否&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			        <input type='radio' name='is_video' value='1' >是
			        <br>
			视频URL：<input type='file' name='video' value=''><br>
    		标题：<textarea name='img_title' value='' cols='100' rows='2'></textarea><br>";
    	}
    ?>	
    <div class="div_box">
	 	话题一描述:<textarea name="img_desc" value="" cols="100" rows="5"></textarea><br>
		话题一图片1：<input type="file" name="img1" value=""><br>
		话题一图片2：<input type="file" name="img2" value=""><br>
		话题一图片3：<input type="file" name="img3" value=""><br>
		话题一图片4：<input type="file" name="img4" value=""><br>
	</div>
	<div class="div_box">
	 	话题二描述:<textarea name="img_desc2" value="" cols="100" rows="5"></textarea><br>
		话题二图片1：<input type="file" name="img5" value=""><br>
		话题二图片2：<input type="file" name="img6" value=""><br>
		话题二图片3：<input type="file" name="img7" value=""><br>
		话题二图片4：<input type="file" name="img8" value=""><br>
	</div>
	<div class="div_box">
	 	话题三描述:<textarea name="img_desc3" value="" cols="100" rows="5"></textarea><br>
		话题三图片1：<input type="file" name="img9" value=""><br>
		话题三图片2：<input type="file" name="img10" value=""><br>
		话题三图片3：<input type="file" name="img11" value=""><br>
		话题三图片4：<input type="file" name="img12" value=""><br>
	</div>
	<div class="div_box">
	 	话题四描述:<textarea name="img_desc4" value="" cols="100" rows="5"></textarea><br>
		话题四图片1：<input type="file" name="img13" value=""><br>
		话题四图片2：<input type="file" name="img14" value=""><br>
		话题四图片3：<input type="file" name="img15" value=""><br>
		话题四图片4：<input type="file" name="img16" value=""><br>
	</div>
	<div class="div_box">
	 	话题五描述:<textarea name="img_desc5" value="" cols="100" rows="5"></textarea><br>
		话题五图片1：<input type="file" name="img17" value=""><br>
		话题五图片2：<input type="file" name="img18" value=""><br>
		话题五图片3：<input type="file" name="img19" value=""><br>
		话题五图片4：<input type="file" name="img20" value=""><br>
	</div>
	<div class="div_box">
	 	话题六描述:<textarea name="img_desc6" value="" cols="100" rows="5"></textarea><br>
		话题六图片1：<input type="file" name="img21" value=""><br>
		话题六图片2：<input type="file" name="img22" value=""><br>
		话题六图片3：<input type="file" name="img23" value=""><br>
		话题六图片4：<input type="file" name="img24" value=""><br>
	</div>
	<div class="div_box">
	 	话题七描述:<textarea name="img_desc7" value="" cols="100" rows="5"></textarea><br>
		话题七图片1：<input type="file" name="img25" value=""><br>
		话题七图片2：<input type="file" name="img26" value=""><br>
		话题七图片3：<input type="file" name="img27" value=""><br>
		话题七图片4：<input type="file" name="img28" value=""><br>
	</div>
	<div class="div_box">
	 	话题八描述:<textarea name="img_desc8" value="" cols="100" rows="5"></textarea><br>
		话题八图片1：<input type="file" name="img29" value=""><br>
		话题八图片2：<input type="file" name="img30" value=""><br>
		话题八图片3：<input type="file" name="img31" value=""><br>
		话题八图片4：<input type="file" name="img32" value=""><br>
	</div>
	<div class="div_box">
	 	话题九描述:<textarea name="img_desc9" value="" cols="100" rows="5"></textarea><br>
		话题九图片1：<input type="file" name="img33" value=""><br>
		话题九图片2：<input type="file" name="img34" value=""><br>
		话题九图片3：<input type="file" name="img35" value=""><br>
		话题九图片4：<input type="file" name="img36" value=""><br>
	</div>
	<div class="div_box">
	 	话题十描述:<textarea name="img_desc10" value="" cols="100" rows="5"></textarea><br>
		话题十图片1：<input type="file" name="img37" value=""><br>
		话题十图片2：<input type="file" name="img38" value=""><br>
		话题十图片3：<input type="file" name="img39" value=""><br>
		话题十图片4：<input type="file" name="img40" value=""><br>
	</div>
   	&nbsp;&nbsp;&nbsp;&nbsp;<input type='submit' value='发布'>
	&nbsp;&nbsp;&nbsp;&nbsp;<input type='reset' value='重置'>
   </form>

</table>
<br/>
</body>
</html>
