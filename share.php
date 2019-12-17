<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/> <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" media="(device-height: 568px)">

    <link rel="stylesheet" type="text/css" href="css/photo.css" >


            </head>

			 <script>
        window.nice = {
           // DOWNLOAD_URL: ,
            TUNEUP_URL: "https://itunes.apple.com/cn/app/bao-bao-xiu-xiu/id789847552?mt=8",

        };
        </script>

		<body>

	   <?php
	$user_id = intval($_GET['user_id']);
	$img_id = intval($_GET['img_id']);
	$is_post = intval($_GET['is_post']);
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
			$nick_name =  $row["nick_name"];

			if($row["avatar"]==""){
				$avatar = $SERVER_NAME."static/album/defaultAvatar_thumb_120.png";
			}else{
				if(substr($row['avatar'],0,6)!='static'){
					$avatar = $row['avatar'];
				}elseif(strpos($row['avatar'],'defaultAvatar.png')>0){
					$avatar = $SERVER_NAME."static/album/defaultAvatar_thumb_120.png";
				}else{
					$avatar = $SERVER_NAME.substr($row['avatar'], 0,-4)."_thumb_120.jpg";
				}

			}
		}
		mysql_free_result($queryRes);

		//获取用户的好友
		$idolSql = "select count(*) as num from baby_user_idol where state='1' and idol_id={$user_id}";
		$idolRes = mysql_query($idolSql,$conn);
		while($row = mysql_fetch_array($idolRes)) {
			$idolNum =  $row["num"];

		}
	}

	if($img_id){
		//查询说明
		if($is_post==1){
			$descSql = "select img,img_description from baby_post_img where id={$img_id}";
		}else{
			$descSql = "select img,img_description from baby_album_img where id={$img_id}";
			//查询赞数和评论数
			$admireSql = "select count(*) as admirecount from baby_admire where img_id={$img_id} and is_cancel='0' ";
			$admireRes = mysql_query($admireSql,$conn);
			while($row = mysql_fetch_array($admireRes)) {
				$admireCount = intval($row["admirecount"]);
			}
			$reviewSql = "select count(*) as reviewcount from baby_review where img_id={$img_id} and is_del='0' ";
			$reviewRes = mysql_query($reviewSql,$conn);
			while($row = mysql_fetch_array($reviewRes)) {
				$reviewCount = intval($row["reviewcount"]);
			}

			$reviewListSql = "select demand,user_id from baby_review where img_id={$img_id} and is_del='0' ";
			$reviewListRes = mysql_query($reviewListSql,$conn);
			while($row = mysql_fetch_array($reviewListRes)) {
				$user_id = intval($row["user_id"]);
				//echo $user_id;exit;
				$userSql = "select nick_name from baby_user where id={$user_id} ";
				$userRes = mysql_query($userSql,$conn);
				while($user = mysql_fetch_array($userRes)) {
					$nickName  = strval($user["nick_name"]);
				}
				//echo $nickName;exit;
				$demand = strval($row["demand"]);
				$data[] = array(
					'nick_name'=>$nickName,
					'demand'=>$demand
				);
			}

		}

		$idolRes = mysql_query($descSql,$conn);
		while($row = mysql_fetch_array($idolRes)) {
			if(strlen($row["img_description"]) > 60){
				$desc =  mb_substr($row["img_description"],0,30,'utf-8')."。。。";
			}else{
				$desc =  mb_substr($row["img_description"],0,30,'utf-8');
			}
			$img_thumb = $row["img"];
		}
	}


	mysql_close($conn);
	?>

	 	<?php
	$agent = strtolower($_SERVER['HTTP_USER_AGENT']);
	 $type = 'other';
	 if(strpos($agent, 'iphone') || strpos($agent, 'ipad')){
		$type = "https://itunes.apple.com/cn/app/bao-bao-xiu-xiu/id789847552?mt=8";
	 }
	 if(strpos($agent, 'android')){
		$type = "http://www.meimei.yihaoss.top/download/BabyShow_v8.9.5.apk";//babyshow_final_v4.7.1.apk
	 }

   ?>

	<div class="main">

    <div class="user_info">
        <img class="avatar" src="<?php echo $avatar; ?>" width="35" height="35" >
        <div class="user_info_content">
            <span><?php echo $nick_name;?></span>
            <span>在舜鑫国际旅游（北京）有限公司租赁里，TA有<?php echo $idolNum; ?>个好友</span>
        </div>
        <a href="<?php echo $type; ?>" class="download_nice_app follow" data-type="btn_follow_download">
            <img src="img/follow_icon.png" alt="follow" width="21" height="21"/>
        </a>
    </div>
    <div class="wrap_img">
		<p style="font-size:16px; color:#4D4D4D; margin-left:10px;"><?php echo $desc; ?></p>
        <?php
        	if(!empty($img_thumb)){
				$imgSrc = explode(';',$img_thumb);
				foreach ( $imgSrc as $key => $imgUrl ) {
					$webRoot = "/data/www/api/";
					$imgUrlDir = $webRoot . $imgUrl;
					$imginfo = getimagesize ( $imgUrlDir );
					$imgParams = explode ( ' ', $imginfo [3] );
					$imgWidth = str_replace ( "width=", '', $imgParams [0] );
					$imgWidth = intval ( str_replace ( '"', '', $imgWidth ) );
					$imgHeight = str_replace ( "height=", '', $imgParams [1] );
					$imgHeight = intval ( str_replace ( '"', '', $imgHeight ) );

					$thumbImgUrlDir =  $webRoot.substr($imgUrl, 0,-4);
					if($imgWidth < $imgHeight){
						if(file_exists($thumbImgUrlDir."_thumb_490.jpg") && filesize($thumbImgUrlDir."_thumb_490.jpg")!=0){
							$imgSrc = $SERVER_NAME.substr($imgUrl, 0,-4)."_thumb_490.jpg";
						}elseif(file_exists($thumbImgUrlDir."_thumb_613_thumb_490.jpg") && filesize($thumbImgUrlDir."_thumb_613_thumb_490.jpg")!=0){
							$imgSrc = $SERVER_NAME.substr($imgUrl, 0,-4)."_thumb_613_thumb_490.jpg";
						}else{
							$imgSrc = $SERVER_NAME.$imgUrl;
						}
					}else{

						if(file_exists($thumbImgUrlDir."_thumb_640.jpg") && filesize($thumbImgUrlDir."_thumb_640.jpg")!=0){
							$imgSrc = $SERVER_NAME.substr($imgUrl, 0,-4)."_thumb_640.jpg";
						}elseif(file_exists($thumbImgUrlDir."_thumb_800_thumb_640.jpg") && filesize($thumbImgUrlDir."_thumb_800_thumb_640.jpg")!=0){
							$imgSrc = $SERVER_NAME.substr($imgUrl, 0,-4)."_thumb_800_thumb_640.jpg";
						}elseif(file_exists($thumbImgUrlDir."_thumb_800_thumb_640.2.jpg")){
							$imgSrc = $SERVER_NAME.substr($imgUrl, 0,-4)."_thumb_800_thumb_640.2.jpg";
						}else{
							$imgSrc = $SERVER_NAME.$imgUrl;
						}
					}
					$listImg[] = $imgSrc;
				}
			}else{
				$listImg = "static/defaultimg/0000000.jpg";
			}

            if(is_array($listImg) && count($listImg) > 0){
				foreach($listImg as $key=>$value){
					echo "<div><img src='{$value}' id='cur_img' alt='' width='100%' ></div><br />";
				}
			}
        ?>


   </div><br />

    <p style="font-size:16px; color:#f46253;margin-left:10px;">赞:<span style="font-size:16px; color:#4D4D4D;"> 有<?php echo $admireCount; ?>人赞了他</span></p>
	<p style="font-size:16px; color:#f46253;margin-left:10px;">评:<span style="font-size:16px; color:#4D4D4D;"> 有<?php echo $reviewCount; ?>人评论了他</span></p>
   <?php
		if(is_array($data) && count($data) ){
			foreach($data as $key=>$value){ ?>
				<span style="font-size:14px; color:#999; margin-left:10px;">--<?php echo $value['nick_name'];?>:&nbsp;&nbsp;<?php echo $value['demand'];?></span><br />
		<?php }
	}?>

</div>
	   <br />
	    <div class="wrap_img">
			<!-- <img src="img/WeChat_1464320644.jpg" id="cur_img" alt="" width="100%" > -->
            <img src="img/n.jpg" id="cur_img" alt="" width="100%" >


	</div>


       <footer>
            <img id="stat" src="" width="1" height="1" style="display:none"/>

       </footer>
       <div class="mask" style="display:none">
</div>
<div class="tipContainer" style="display:none">
    <img src="img/download_tip_1.png" alt="在浏览器中打开" width="74" height="112"/>
    <p class="android_download_tip" style="display:none">戳右上角，选择“<em>在浏览器中打开</em>”即可完成下载，等你哦！</p>

</div>

       <script src="js/zepto.js"></script>


   <div class="nice_icon">

    <img class="show_nice_icon" src="img/footer_show_logo.png" width="158" height="45" />
    <a href="<?php echo $type; ?>" class="foot_download download_nice_app" id="btn_immediately_download"  data-type="btn_immediately_download">
        <img  src="img/download_show.png" width="93" height="35" >
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
						//if(ua.indexOf("android") > -1){
							//window.location.href = "http://www.meimei.yihaoss.top/download/babyshow_final_v_normal.3.6.8.apk";
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

                        if (ua.indexOf("micromessenger") > -1 ) {
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
