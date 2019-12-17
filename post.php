<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/> <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" media="(device-height: 568px)">
        <meta name="apple-itunes-app" content="app-id=641895599">
        <meta name="format-detection" content="telephone=no" searchtype="map">
        <meta name="apple-mobile-web-app-capable" content="yes">

    <link rel="stylesheet" type="text/css" href="css/photo1.css" >

    <link rel="stylesheet" type="text/css" href="css/pc_style1.css">
    </head>
    <body>

	 <?php
	$user_id = intval($_GET['user_id']);
	$img_id = intval($_GET['img_id']);
	if($user_id){

		$conn = mysql_connect("115.29.48.94","liuwt","liuwt");
		if (!$conn)
		{
			die('Could not connect: ' . mysql_error());
		}
		mysql_select_db('quanquan_baby_show',$conn);
		mysql_query( 'set names utf8');
		$sql = "select nick_name,avatar from baby_user where id={$user_id}";
		$queryRes = mysql_query($sql,$conn);
		$SERVER_NAME = "http://api.baobaoshowshow.com/";
		while($row = mysql_fetch_array($queryRes)) {
			$nick_name1 =  $row["nick_name"];

			if($row["avatar"]==""){
				$avatar1 = $SERVER_NAME."static/album/defaultAvatar_thumb_120.png";
			}else{
				if(substr($row['avatar'],0,6)!='static'){
					$avatar1 = $row['avatar'];
				}elseif(strpos($row['avatar'],'defaultAvatar.png')>0){
					$avatar1 = $SERVER_NAME."static/album/defaultAvatar_thumb_120.png";
				}else{
					$avatar1 = $SERVER_NAME.substr($row['avatar'], 0,-4)."_thumb_120.jpg";
				}

			}
		}
		mysql_free_result($queryRes);
	}

	if($img_id){

		//查询话题赞数
		$admireSql = "SELECT count(*) as admincount,id from baby_post_admire where img_id={$img_id} and is_cancel='0' ";
		$queryRes = mysql_query($admireSql,$conn);
		while($row = mysql_fetch_array($queryRes)) {
			$admirecount =  $row["admincount"];
		}
		//查询话题评论数量
		$reviewSql = "select count(*) as reviewcount,id from baby_post_review where img_id={$img_id} and is_del='0' ";
		$reviewRes = mysql_query($reviewSql,$conn);
		while($row = mysql_fetch_array($reviewRes)) {
			$reviewcount =  $row["reviewcount"];
		}
		//列出评论内容
		$reviewDemandSql = "select u.nick_name,p.demand from baby_user as u,baby_post_review as p  where p.user_id=u.id and p.img_id={$img_id} and p.is_del='0' order by p.create_time desc ";
		$reviewDemandRes = mysql_query($reviewDemandSql,$conn);

		while($row = mysql_fetch_assoc($reviewDemandRes)) {
			$post_user = $row['nick_name'];
			$demand =  $row["demand"];

			$datas[] = array(
				'post_user'=>$post_user,
				'demand'=>$demand
			);
		}
		//print_r($datas);exit;





			$descSql = "select img,img_title,img_description,create_time from baby_post_img where id={$img_id} and state='0' ";
			$descRes = mysql_query($descSql,$conn);
			while($row = mysql_fetch_array($descRes)) {
				if(strlen($row["img_description"]) > 120){
					$title = $row['img_title'];
					$desc =  mb_substr($row["img_description"],0,60,'utf-8');
				}else{
					$title = $row['img_title'];
					$desc =  mb_substr($row["img_description"],0,60,'utf-8');
				}
				$create_time1 = date("Y-m-d",strtotime($row['create_time']));
				$img_thumb = $row["img"];

				$imgArray = explode(';',$img_thumb);


			}

		if(!empty($imgArray)){
			if(is_array($imgArray) && count($imgArray)>0){
				foreach($imgArray as $key=>$v){
					if(!empty($v)){
						$webRoot = "/data/www/api/";
						$imgUrlDir = $webRoot . $v;
						$imginfo = getimagesize ( $imgUrlDir );
						$imgParams = explode ( ' ', $imginfo [3] );
						$imgWidth = str_replace ( "width=", '', $imgParams [0] );
						$imgWidth = intval ( str_replace ( '"', '', $imgWidth ) );
						$imgHeight = str_replace ( "height=", '', $imgParams [1] );
						$imgHeight = intval ( str_replace ( '"', '', $imgHeight ) );

						$thumbImgUrlDir =  $webRoot.substr($v, 0,-4);
						if($imgWidth < $imgHeight){
							if(file_exists($thumbImgUrlDir."_thumb_490.jpg") && filesize($thumbImgUrlDir."_thumb_490.jpg")!=0){
								$imgSrc = $SERVER_NAME.substr($v, 0,-4)."_thumb_490.jpg";
							}elseif(file_exists($thumbImgUrlDir."_thumb_613_thumb_490.jpg") && filesize($thumbImgUrlDir."_thumb_613_thumb_490.jpg")!=0){
								$imgSrc = $SERVER_NAME.substr($v, 0,-4)."_thumb_613_thumb_490.jpg";
							}else{
								$imgSrc = $SERVER_NAME.substr($v, 0,-4)."_thumb_490.jpg";
							}
						}else{

							if(file_exists($thumbImgUrlDir."_thumb_640.jpg") && filesize($thumbImgUrlDir."_thumb_640.jpg")!=0){
								$imgSrc = $SERVER_NAME.substr($v, 0,-4)."_thumb_640.jpg";
							}elseif(file_exists($thumbImgUrlDir."_thumb_800_thumb_640.jpg") && filesize($thumbImgUrlDir."_thumb_800_thumb_640.jpg")!=0){
								$imgSrc = $SERVER_NAME.substr($v, 0,-4)."_thumb_800_thumb_640.jpg";
							}elseif(file_exists($thumbImgUrlDir."_thumb_800_thumb_640.2.jpg")){
								$imgSrc = $SERVER_NAME.substr($v, 0,-4)."_thumb_800_thumb_640.2.jpg";
							}else{
								$imgSrc = $SERVER_NAME.substr($v, 0,-4)."_thumb_640.2.jpg";
							}
						}
						$listImg[] = $imgSrc;
					}else{
						$listImg="";
					}
				}
		}

	}else{
			$listImg="";
		}
		?>
		<?php
			echo "
			  <div class='main'>
				<div class='user_info_content'>
						<h2 style='padding-left:6px;'>{$title}</h2>
				</div>

				<div class='user_info'>
				  <img class='avatar' src='{$avatar1}' width='35' height='35' >
				  <div class='user_info_content'>
						<span style='font-size:16px;font-weight:bold;color:#f46253;padding-left:10px;'>{$nick_name1}</span>
						<span style='padding-left:10px;'>{$create_time1}</span>
				  </div>
				  </div>
				<div class='user_info_content'>
					  <p style='font-size:16px;'><?php echo $desc; ?></p>
				</div>

			";



			if(is_array($listImg) && count($listImg) > 0){
				foreach($listImg as $key=>$value){


						echo "<div class='wrap_img' style='text-align:center;'>
							<img  src='{$value}' id='cur_img' alt='' width='75%' >
						</div><br />";


				}
			}

		?>

		<?php
	echo "
	 <p style='font-size:16px; color:#f46253;margin-left:10px;'>赞:<span style='font-size:16px; color:#4D4D4D;'> 有{$admirecount}人赞了他</span></p>
	 <p style='font-size:16px; color:#f46253;margin-left:10px;'>评:<span style='font-size:16px; color:#4D4D4D;'> 有{$reviewcount}人评论了他</span></p>
	 <div class='user_info_content' style='text-align:left;'>";
	 ?>
		<?php
			if(is_array($datas) && count($datas)){
				foreach($datas as $key=>$value){

				echo "<p><span style='font-size:14px; color:#999; margin-left:10px;'>--{$value['post_user']}</span> :&nbsp;&nbsp;&nbsp;&nbsp;{$value['demand']}</p>";

				}
			}
		?>
		<?php
     echo "
    </div>
	 <img src='img/line.png'>

	 ";




		$flowPostSql = "select id from baby_post_img where root_img_id={$img_id} and state='0' limit 7 ";
		$flowRes = mysql_query($flowPostSql,$conn);
		while($row = mysql_fetch_assoc($flowRes)){
			$imgId[]= $row['id'];
		};
		foreach($imgId as $key=>$value){
			$id = $value;

			$userIdSql = "select user_id,create_time,img_description,img from baby_post_img where id={$id} and state='0' ";
			$usersRes = mysql_query($userIdSql,$conn);
			$userId = mysql_fetch_array($usersRes);
			$uid = $userId['user_id'];
			$times = $userId['create_time'];
			$description = $userId['img_description'];
			$createTime = date('Y-m-d',strtotime($times));
			$img = $userId['img'];
			$replyUserSql = "select nick_name,avatar from baby_user where id={$uid} and state='0' ";
			$userRes = mysql_query($replyUserSql,$conn);
			$userDatas = mysql_fetch_array($userRes);
			$nick_name = $userDatas['nick_name'];
			if($userDatas["avatar"]==""){
					$avatar = $SERVER_NAME."static/album/defaultAvatar_thumb_120.png";
			}else{
				if(substr($userDatas['avatar'],0,6)!='static'){
					$avatar = $userDatas['avatar'];
				}elseif(strpos($userDatas['avatar'],'defaultAvatar.png')>0){
					$avatar = $SERVER_NAME."static/album/defaultAvatar_thumb_120.png";
				}else{
					$avatar = $SERVER_NAME.substr($userDatas['avatar'], 0,-4)."_thumb_120.jpg";
				}
			}

			/*评论数量和赞数*/
			$flowPostAdmireSql = "select count(*) as admirecount from baby_post_admire where img_id={$id} and is_cancel='0' ";
			$flowPostAdmireRes = mysql_query($flowPostAdmireSql,$conn);
			$admirecountRes= mysql_fetch_array($flowPostAdmireRes);
			$admirecount = $admirecountRes['admirecount'];

			$flowPostReviewSql = "select count(*) as reviewcount from baby_post_review where img_id={$id} and is_del='0' ";
			$flowPostReviewRes = mysql_query($flowPostReviewSql,$conn);
			$reviewcountRes= mysql_fetch_array($flowPostReviewRes);
			$reviewcount = $reviewcountRes['reviewcount'];

			/*获取评论内容*/
			$reviewDemandSql3 = "select u.nick_name,p.demand from baby_user as u,baby_post_review as p  where p.user_id=u.id and p.img_id={$id} and p.is_del='0' order by p.create_time desc ";
			$reviewDemandRes3 = mysql_query($reviewDemandSql3,$conn);


			echo "<div class='user_info'>
					<img class='avatar' src='{$avatar}' width='35' height='35' >
					<div class='user_info_content'>
            <span style='font-size:16px;font-weight:bold;color:#f46253;padding-left:10px;'>{$nick_name}</span>
            <span style='padding-left:10px;'>{$createTime}</span>
			</div>
					</div>
				<p style='font-size:16px;margin-left:10px;'>{$description}</p><br>";



			if(!empty($img)){
				$imgArray1 = explode(';',$img);
				//print_r($imgArray1);exit;
				if(is_array($imgArray1) && count($imgArray1)>0){
					foreach($imgArray1 as $key=>$v){

						$webRoot = "/data/www/api/";
						$imgUrlDir = $webRoot . $v;
						$imginfo = getimagesize ( $imgUrlDir );
						$imgParams = explode ( ' ', $imginfo [3] );
						$imgWidth = str_replace ( "width=", '', $imgParams [0] );
						$imgWidth = intval ( str_replace ( '"', '', $imgWidth ) );
						$imgHeight = str_replace ( "height=", '', $imgParams [1] );
						$imgHeight = intval ( str_replace ( '"', '', $imgHeight ) );

						$thumbImgUrlDir =  $webRoot.substr($v, 0,-4);
						if($imgWidth < $imgHeight){
							if(file_exists($thumbImgUrlDir."_thumb_490.jpg") && filesize($thumbImgUrlDir."_thumb_490.jpg")!=0){
								$imgSrc1 = $SERVER_NAME.substr($v, 0,-4)."_thumb_490.jpg";
							}elseif(file_exists($thumbImgUrlDir."_thumb_613_thumb_490.jpg") && filesize($thumbImgUrlDir."_thumb_613_thumb_490.jpg")!=0){
								$imgSrc1 = $SERVER_NAME.substr($v, 0,-4)."_thumb_613_thumb_490.jpg";
							}else{
								$imgSrc1 = $SERVER_NAME.substr($v, 0,-4)."_thumb_490.jpg";
							}
						}else{

							if(file_exists($thumbImgUrlDir."_thumb_640.jpg") && filesize($thumbImgUrlDir."_thumb_640.jpg")!=0){
								$imgSrc1 = $SERVER_NAME.substr($v, 0,-4)."_thumb_640.jpg";
							}elseif(file_exists($thumbImgUrlDir."_thumb_800_thumb_640.jpg") && filesize($thumbImgUrlDir."_thumb_800_thumb_640.jpg")!=0){
								$imgSrc1 = $SERVER_NAME.substr($v, 0,-4)."_thumb_800_thumb_640.jpg";
							}elseif(file_exists($thumbImgUrlDir."_thumb_800_thumb_640.2.jpg")){
								$imgSrc1 = $SERVER_NAME.substr($v, 0,-4)."_thumb_800_thumb_640.2.jpg";
							}else{
								$imgSrc1 = $SERVER_NAME.substr($v, 0,-4)."_thumb_640.2.jpg";
							}
						}
						echo "<div class='wrap_img' style='text-align:center;'>
							<img  src='{$imgSrc1}' id='cur_img' alt='' width='75%' >
						</div><br />";

					}

				}


			}else{
				$folowimg = "";
			}





				echo "
				<p style='font-size:16px; color:#f46253;margin-left:10px;'>赞:<span style='font-size:16px; color:#4D4D4D;'> 有{$admirecount}人赞了他</span></p>
				<p style='font-size:16px; color:#f46253;margin-left:10px;'>评:<span style='font-size:16px; color:#4D4D4D;'> 有{$reviewcount}人评论了他</span></p>";


			while($row3 = mysql_fetch_assoc($reviewDemandRes3)) {
				$post_user3 = $row3['nick_name'];
				$demand3 =  $row3["demand"];
				echo " <div class='user_info_content' style='text-align:left;'><p><span style='font-size:14px; color:#999; margin-left:10px;'>--{$post_user3}</span> :&nbsp;&nbsp;&nbsp;&nbsp;{$demand3}</p></div>
				<img src='img/line.png'><br>
				";

			}
				$datas3[]= array(
					'post_user'=>$post_user3,
					'demand'=>$demand3
				);





		}



		}


	mysql_close($conn);
	?>





	<?php
	if(is_array($flowdatas) && count($flowdatas)){
		foreach($flowdatas as $key=>$value){
			echo "<div class='user_info'>
					<img class='avatar' src='{$value['avatar']}' width='35' height='35' >
					<div class='user_info_content'>
            <span style='font-size:16px;font-weight:bold;color:#f46253;padding-left:10px;'>{$value['nick_name']}</span>
            <span style='padding-left:10px;'>{$value['create_time']}</span>
			</div>
					</div>
					<p style='font-size:16px;margin-left:10px;'>{$value['img_description']}</p><br>";


			//if(is_array($value['img']) && count($value['img']) ){
				//foreach($value['img'] as $key=>$m){

				if(!empty($value['img'])){

				echo "<div class='wrap_img' style='text-align:center;'>
						<img  src='{$value['img']}' id='cur_img' alt='' width='75%' >
					</div><br />";
				}




			echo "
				<p style='font-size:16px; color:#f46253;margin-left:10px;'>赞:<span style='font-size:16px; color:#4D4D4D;'> 有{$value['admirecount']}人赞了他</span></p>
				<p style='font-size:16px; color:#f46253;margin-left:10px;'>评:<span style='font-size:16px; color:#4D4D4D;'> 有{$value['reviewcount']}人评论了他</span></p>

			";


		}
	}

	?>

	<span style='padding-left:10px; font-size:16px;font-weight:bold;'>更多的精彩内容，请下载舜鑫国际旅游（北京）有限公司租赁！</span>

	</div>
       <footer>
            <img id="stat" src="" width="1" height="1" style="display:none"/>

       </footer>
       <div class="mask" style="display:none">
</div>
<div class="tipContainer" style="display:none">
    <img src="img/download_tip_1.png" alt="在浏览器中打开" width="74" height="112"/>
    <p class="android_download_tip" style="display:none">戳右上角，选择“<em>在浏览器中打开</em>”即可完成下载，等你哦！</p>
    <p class="ios_download_tip" style="display:none">戳右上角，选择“<em>在Safari中打开</em>”，即可下载或打开nice</p>
</div>

       <script src="js/zepto.js"></script>

    <div class="nice_icon">
    <img class="show_nice_icon" src="img/footer_show_logo.png" width="158" height="45" alt="nice"/>
    <a href="<?php echo $type; ?>" class="foot_download download_nice_app" id="btn_immediately_download" data-type="btn_immediately_download">
        <img  src="img/download_show.png" width="93" height="35" alt="nice">
    </a>
</div>


<script>
       (function(w) {
            var nice = w.nice,
                ua = window.navigator.userAgent.toLowerCase();
				///alert(ua);
            var Handler = function () {
                this.init();
            }

            Handler.prototype = {
                init: function() {

                    this.initMaskControl();

					 if (ua.indexOf("micromessenger") == -1 ) {

						this.initDownload();
					}

                },
                initDownload: function() {
						if(ua.indexOf("android") > -1){
							window.location.href = "http://www.meimei.yihaoss.top/download/BabyShow_v8.9.5.apk";
						}


                },

                sendStat: function(params) {
                    var host = "http://log.oneniceapp.com/web?",
                        _params = {},
                        search = "";

                    _params.type = params.type;
                    _params.click_type = params.click_type || "";

                },

                addDownloadStat: function(btnType){
                    this.sendStat({
                        type: 'click',
                        click_type: btnType
                    });
                },
                showMask: function() {
                    $(".mask").show();
                    $(".tipContainer").show();
                    $(".android_download_tip").show();
                },
                hideMask: function() {
                    $(".mask").hide();
                    $(".tipContainer").hide();
                },

                initMaskControl: function() {
                    var me = this;
                    $(".mask").on("click", function() {
                        me.hideMask();
                        $(window).trigger("mask:hide");
                    });

                    $(".download_nice_app").on("click", function() {
                        if ($(this).data("type") !== ""){
                            me.addDownloadStat($(this).data("type"));
                        }

                        if (ua.indexOf("micromessenger") > -1 || ua.indexOf("android") > -1) {
                            me.showMask();
                            return false;
                        }
                    });
                },
                initTuneupApp: function() {
                    if (ua.indexOf("micromessenger") > -1 && nice.TUNEUP_URL !== "") {
                        $.ajax({
                            url: nice.TUNEUP_URL,
                            dataType: "jsonp"
                        });
                    }
                }
            }
            var handler = new Handler();
        })(this);



    </script>


    </body>
</html>
