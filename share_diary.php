<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/> <meta http-equiv="Content-Type" content="text/html; charset=utf-8">


        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" media="(device-height: 568px)">


    <link rel="stylesheet" type="text/css" href="css/photo1.css" >

    <link rel="stylesheet" type="text/css" href="css/pc_style1.css">
    </head>
    <body>

	 <?php
		$user_id = intval($_GET['user_id']);
		$album_id = intval($_GET['album_id']);
		//$user_id="65723";
		//$album_id="51456";
		$conn = mysql_connect("115.29.48.94","liuwt","liuwt");
		if (!$conn)
		{
			die('Could not connect: ' . mysql_error());
		}
		mysql_select_db('quanquan_baby_show',$conn);
		mysql_query( 'set names utf8');
		if($user_id){
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

			//查询用户等级
			$getUserLevelSql = "SELECT level_img FROM baby_user_level WHERE user_id={$user_id}";
			$levelRes = mysql_query($getUserLevelSql,$conn);
				while($row = mysql_fetch_array($levelRes)) {
					$user_level = "http://api.baobaoshowshow.com/".strval($row['level_img']);
			}

		}

		if($album_id){
			$albumSql = "select album_description from baby_diary_album where id={$album_id} and state='0' ";
			$albumRes = mysql_query($albumSql,$conn);
			while($row = mysql_fetch_array($albumRes)) {
				$album_des = $row['album_description'];
			}

			$descSql = "select id,img_title,img_description,original_time,img from baby_diary_img where album_id={$album_id} and state='0' limit 1 ";
			$descRes = mysql_query($descSql,$conn);
			while($row = mysql_fetch_array($descRes)) {
				$title = $row['img_title'];
				$desc =  $row["img_description"];
				if($row['original_time']=='0000-00-00 00:00:00'){
					$create_time1="时间未知";

				}else{
					$create_time1 = date('Y-m-d',strtotime($row['original_time']));
				}
				$img_thumb = $row["img"];
				$diaryimgId = $row['id'];
			}
			if(!empty($img_thumb)){
				$webRoot = "/data/www/api/";
				$imgUrlDir = $webRoot . $img_thumb;
				$imginfo = getimagesize ( $imgUrlDir );
				$imgParams = explode ( ' ', $imginfo [3] );
				$imgWidth = str_replace ( "width=", '', $imgParams [0] );
				$imgWidth = intval ( str_replace ( '"', '', $imgWidth ) );
				$imgHeight = str_replace ( "height=", '', $imgParams [1] );
				$imgHeight = intval ( str_replace ( '"', '', $imgHeight ) );

				$thumbImgUrlDir =  $webRoot.substr($img_thumb, 0,-4);
				if($imgWidth < $imgHeight){
					if(file_exists($thumbImgUrlDir."_thumb_490.jpg") && filesize($thumbImgUrlDir."_thumb_490.jpg")!=0){
						$imgSrc = $SERVER_NAME.substr($img_thumb, 0,-4)."_thumb_490.jpg";
					}elseif(file_exists($thumbImgUrlDir."_thumb_613_thumb_490.jpg") && filesize($thumbImgUrlDir."_thumb_613_thumb_490.jpg")!=0){
						$imgSrc = $SERVER_NAME.substr($img_thumb, 0,-4)."_thumb_613_thumb_490.jpg";
					}else{
						$imgSrc = $SERVER_NAME.$img_thumb;
					}
				}else{

					if(file_exists($thumbImgUrlDir."_thumb_640.jpg") && filesize($thumbImgUrlDir."_thumb_640.jpg")!=0){
						$imgSrc = $SERVER_NAME.substr($img_thumb, 0,-4)."_thumb_640.jpg";
					}elseif(file_exists($thumbImgUrlDir."_thumb_800_thumb_640.jpg") && filesize($thumbImgUrlDir."_thumb_800_thumb_640.jpg")!=0){
						$imgSrc = $SERVER_NAME.substr($img_thumb, 0,-4)."_thumb_800_thumb_640.jpg";
					}elseif(file_exists($thumbImgUrlDir."_thumb_800_thumb_640.2.jpg")){
						$imgSrc = $SERVER_NAME.substr($img_thumb, 0,-4)."_thumb_800_thumb_640.2.jpg";
					}else{
						$imgSrc = $SERVER_NAME.$img_thumb;
					}
				}
				$listImg[] = $imgSrc;
			}else{
				$listImg="";
			}



		}else{
			$listImg="";
		}
	?>
	<?php
		echo "
		  <div class='main'>
		  	<div style='font-size:17px;font-weight:bold;color:#212121;padding-left:10px;'>
			{$album_des}
			</div>
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
				  <p style='font-size:16px;padding-left:10px;'>{$desc}</p>
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
		$flowPostSql = "select id from baby_diary_img where album_id={$album_id} and state='0' and id!={$diaryimgId} ";
		$flowRes = mysql_query($flowPostSql,$conn);
		while($row = mysql_fetch_assoc($flowRes)){
			$imgId[]= $row['id'];
		};
		if(is_array($imgId) && count($imgId) ){
			foreach($imgId as $key=>$value){
				$id = $value;

				$userIdSql = "select user_id,img_description,img from baby_diary_img where id={$id} and state='0' ";
				$usersRes = mysql_query($userIdSql,$conn);
				$userId = mysql_fetch_array($usersRes);
				$uid = $userId['user_id'];
				$description = $userId['img_description'];
				$img = $userId['img'];

				echo "<p style='font-size:16px;margin-left:10px;'>{$description}</p><br>";
				if(!empty($img)){
					$webRoot = "/data/www/api/";
					$imgUrlDir = $webRoot . $img;
					$imginfo = getimagesize ( $imgUrlDir );
					$imgParams = explode ( ' ', $imginfo [3] );
					$imgWidth = str_replace ( "width=", '', $imgParams [0] );
					$imgWidth = intval ( str_replace ( '"', '', $imgWidth ) );
					$imgHeight = str_replace ( "height=", '', $imgParams [1] );
					$imgHeight = intval ( str_replace ( '"', '', $imgHeight ) );

					$thumbImgUrlDir =  $webRoot.substr($img, 0,-4);
					if($imgWidth < $imgHeight){
						if(file_exists($thumbImgUrlDir."_thumb_490.jpg") && filesize($thumbImgUrlDir."_thumb_490.jpg")!=0){
							$imgSrc1 = $SERVER_NAME.substr($img, 0,-4)."_thumb_490.jpg";
						}elseif(file_exists($thumbImgUrlDir."_thumb_613_thumb_490.jpg") && filesize($thumbImgUrlDir."_thumb_613_thumb_490.jpg")!=0){
							$imgSrc1 = $SERVER_NAME.substr($img, 0,-4)."_thumb_613_thumb_490.jpg";
						}else{
							$imgSrc1 = $SERVER_NAME.$img;
						}
					}else{

						if(file_exists($thumbImgUrlDir."_thumb_640.2.jpg") && filesize($thumbImgUrlDir."_thumb_640.2.jpg")!=0){
							$imgSrc1 = $SERVER_NAME.substr($img, 0,-4)."_thumb_640.2.jpg";
							if($imgWidth==640){
							$imgSrc1 = $SERVER_NAME.substr($img, 0,-4)."_thumb_640.2.jpg";

							}
						}elseif(file_exists($thumbImgUrlDir."_thumb_800_thumb_640.jpg") && filesize($thumbImgUrlDir."_thumb_800_thumb_640.jpg")!=0){
							$imgSrc1 = $SERVER_NAME.substr($img, 0,-4)."_thumb_800_thumb_640.jpg";
						}elseif(file_exists($thumbImgUrlDir."_thumb_800_thumb_640.2.jpg")){
							$imgSrc1 = $SERVER_NAME.substr($img, 0,-4)."_thumb_800_thumb_640.2.jpg";
						}else{
							$imgSrc1 = $SERVER_NAME.$img;
						}
					}
					echo "<div class='wrap_img' style='text-align:center;'>
						<img  src='{$imgSrc1}' id='cur_img' alt='' width='75%' >
					</div><br />";
				}
			}

		}
		mysql_close($conn);
	?>


	<?php
		$agent = strtolower($_SERVER['HTTP_USER_AGENT']);
		$type = 'other';
		if(strpos($agent, 'iphone') || strpos($agent, 'ipad')){
			$type = "https://itunes.apple.com/cn/app/bao-bao-xiu-xiu/id789847552?mt=8";
		}elseif(strpos($agent, 'android')){
			$type = "http://www.meimei.yihaoss.top/download/BabyShow_v8.9.5.apk";
		}else{
			$type="http://www.meimei.yihaoss.top";
		}
    ?>




	<span style='padding-left:10px; font-size:16px;font-weight:bold;'>更多精彩尽在舜鑫国际旅游（北京）有限公司租赁，最美的亲子社区！</span>

	</div>
      <!--  <footer>
            <img id="stat" src="" width="1" height="1" style="display:none"/>

       </footer>
       <div class="mask" style="display:none"></div>
<div class="tipContainer" style="display:none">
    <img src="img/download_tip_1.png" alt="在浏览器中打开" width="74" height="112"/>
    <p class="android_download_tip" style="display:none">戳右上角，选择“<em>在浏览器中打开</em>”即可完成下载，等你哦！</p>
    <p class="ios_download_tip" style="display:none">戳右上角，选择“<em>在Safari中打开</em>”，即可下载或打开</p>
</div> -->

       <script src="js/zepto.js"></script>

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
						//if(ua.indexOf("android") > -1){
							//window.location.href = "http://www.meimei.yihaoss.top/download/babyshow_final_v3.6.9.apk";
						//}


                },

                sendStat: function(params) {
                    var
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
						//if (ua.indexOf("micromessenger") > -1 || ua.indexOf("android") > -1) {
                        if (ua.indexOf("micromessenger") > -1) {
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
