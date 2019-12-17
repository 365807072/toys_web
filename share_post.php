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
	$img_id = intval($_GET['img_id']);
	$conn = mysql_connect("115.29.48.94","liuwt","liuwt");
	if (!$conn)
	{
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db('quanquan_baby_show',$conn);
	mysql_query( 'set names utf8');
	$SERVER_NAME = "http://api.baobaoshowshow.com/";
	//头像 开始
	if($user_id>0){
		$sql = "select nick_name,avatar from baby_user where id={$user_id}";
		$queryRes = mysql_query($sql,$conn);
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
	} else {
		if($user_id=='-999') {
			$lickuserSql = "select link_nick_name,link_avatar from baby_post_img where id={$img_id} and state='0' ";
			$lickuserRes = mysql_query($lickuserSql,$conn);
			while($row = mysql_fetch_array($lickuserRes)) {
				$link_nick_name=$row['link_nick_name'];
				$link_avatar= $row["link_avatar"];
			}
		}
		if($link_nick_name) {
			$nick_name1=$link_nick_name;
		} else {
			$nick_name1="";
		}
		if($link_avatar) {
			$avatar1 = $SERVER_NAME.$link_avatar;
		} else {
			$avatar1 = $SERVER_NAME."static/album/defaultAvatar_thumb_120.png";
		}
	}
	//头像 结束
	//主贴 开始
	if($img_id){
		$descSql = "select img,img_title,img_description,create_time from baby_post_img where id={$img_id} and state='0' ";
		$descRes = mysql_query($descSql,$conn);
		while($row = mysql_fetch_array($descRes)) {
			$title = $row['img_title'];
			$desc =  nl2br($row["img_description"]);
			$create_time1 = date("Y-m-d",strtotime($row['create_time']));
			$temp_create_time=$row['create_time'];
			$img_thumb = $row["img"];
			$imgArray = explode(';',$img_thumb);
		}
		if(!empty($imgArray)){
			if(is_array($imgArray) && count($imgArray)>0){
				foreach($imgArray as $key=>$v){
					if(!empty($v)){
						$imgSrc=$SERVER_NAME.$v;
						/*$webRoot = "/data/www/api/";
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
						}*/
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
				  <p style='font-size:16px;padding-left:10px;'>{$desc}</p>
			</div>

		";
		if(is_array($listImg) && count($listImg) > 0){
			foreach($listImg as $key=>$value){
					echo "<div class='wrap_img' style='text-align:center;'>
						<img  src='{$value}' id='cur_img' alt='' width='75%' >
					</div>";
			}
		}
		echo "</div>";
	//头像 结束
	?>
	<?php
    //跟帖 开始
        $temp_diffcreate_time=date("Y-m-d H:i:s",strtotime($temp_create_time)+7200);
        $img_where_condition="root_img_id={$img_id} and state='0' and user_id=$user_id ";
        /*if($user_id=='-999') {
            $img_where_condition.=" and user_id=$user_id ";
        } else {
           $img_where_condition.=" and user_id=$user_id and create_time<'$temp_diffcreate_time' ";
        }*/
		$flowPostSql = "select id from baby_post_img where ".$img_where_condition;
		$flowRes = mysql_query($flowPostSql,$conn);
		while($row = mysql_fetch_assoc($flowRes)){
			$imgId[]= $row['id'];
		};
		if(is_array($imgId) && count($imgId) ){
			foreach($imgId as $key=>$value){
				$id = $value;
				$userIdSql = "select user_id,create_time,img_description,img from baby_post_img where id={$id} and state='0' ";
				$usersRes = mysql_query($userIdSql,$conn);
				$userId = mysql_fetch_array($usersRes);
				$description = nl2br($userId['img_description']);
				$img = $userId['img'];
				echo "<div class='main'>
				<p style='font-size:16px;margin-left:10px;'>{$description}</p><br>";
				if(!empty($img)){
					$imgArray1 = explode(';',$img);
					if(is_array($imgArray1) && count($imgArray1)>0){
						foreach($imgArray1 as $key=>$v){
							$imgSrc1=$SERVER_NAME.$v;
							/*$webRoot = "/data/www/api/";
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

								if(file_exists($thumbImgUrlDir."_thumb_640.2.jpg") && filesize($thumbImgUrlDir."_thumb_640.2.jpg")!=0){
									$imgSrc1 = $SERVER_NAME.substr($v, 0,-4)."_thumb_640.2.jpg";
									if($imgWidth==640){
									$imgSrc1 = $SERVER_NAME.substr($v, 0,-4)."_thumb_640.2.jpg";

									}
								}elseif(file_exists($thumbImgUrlDir."_thumb_800_thumb_640.jpg") && filesize($thumbImgUrlDir."_thumb_800_thumb_640.jpg")!=0){
									$imgSrc1 = $SERVER_NAME.substr($v, 0,-4)."_thumb_800_thumb_640.jpg";
								}elseif(file_exists($thumbImgUrlDir."_thumb_800_thumb_640.2.jpg")){
									$imgSrc1 = $SERVER_NAME.substr($v, 0,-4)."_thumb_800_thumb_640.2.jpg";
								}else{
									$imgSrc1 = $SERVER_NAME.substr($v, 0,-4)."_thumb_640.jpg";
								}
							}*/
							echo "<div class='wrap_img' style='text-align:center;'>
								<img  src='{$imgSrc1}' id='cur_img' alt='' width='75%' >
							</div><br />";

						}

					}
				}else{
					$folowimg = "";
				}
				echo "</div>";
			}
		}
		//跟帖 结束

		//其他人跟帖 开始
        $temp_diffcreate_time=date("Y-m-d H:i:s",strtotime($temp_create_time)+7200);
        $img_review_condition="root_img_id={$img_id} and state='0' and user_id!=$user_id ";
        /*if($user_id=='-999') {
            $img_review_condition.=" and user_id!=$user_id ";
        } else {
           $img_review_condition.=" and user_id!=$user_id and create_time>='$temp_diffcreate_time' ";
        }*/
        $reviewPostSql = "select id from baby_post_img where ".$img_review_condition." limit 10";
        $reviewRes = mysql_query($reviewPostSql,$conn);
        while($row = mysql_fetch_assoc($reviewRes)){
            $reviewsimgId[]= $row['id'];
        };
        if(is_array($reviewsimgId) && count($reviewsimgId) ){
            echo "<img src='img/line.png'> ";
            foreach($reviewsimgId as $key=>$value){
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
                echo "<div class='main'>
                <div class='user_info'>
					<img class='avatar' src='{$avatar}' width='35' height='35' >
					<div class='user_info_content'>
            <span style='font-size:16px;font-weight:bold;color:#f46253;padding-left:10px;'>{$nick_name}</span>
            <span style='padding-left:10px;'>{$createTime}</span>
			</div>
					</div>
                <p style='font-size:16px;margin-left:10px;'>{$description}</p><br>";
                if(!empty($img)){
                    $imgArray1 = explode(';',$img);
                    if(is_array($imgArray1) && count($imgArray1)>0){
                        foreach($imgArray1 as $key=>$v){
                        	$imgSrc1=$SERVER_NAME.$v;
                            /*$webRoot = "/data/www/api/";
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
                                if(file_exists($thumbImgUrlDir."_thumb_640.2.jpg") && filesize($thumbImgUrlDir."_thumb_640.2.jpg")!=0){
                                    $imgSrc1 = $SERVER_NAME.substr($v, 0,-4)."_thumb_640.2.jpg";
                                    if($imgWidth==640){
                                    $imgSrc1 = $SERVER_NAME.substr($v, 0,-4)."_thumb_640.2.jpg";

                                    }
                                }elseif(file_exists($thumbImgUrlDir."_thumb_800_thumb_640.jpg") && filesize($thumbImgUrlDir."_thumb_800_thumb_640.jpg")!=0){
                                    $imgSrc1 = $SERVER_NAME.substr($v, 0,-4)."_thumb_800_thumb_640.jpg";
                                }elseif(file_exists($thumbImgUrlDir."_thumb_800_thumb_640.2.jpg")){
                                    $imgSrc1 = $SERVER_NAME.substr($v, 0,-4)."_thumb_800_thumb_640.2.jpg";
                                }else{
                                    $imgSrc1 = $SERVER_NAME.substr($v, 0,-4)."_thumb_640.jpg";
                                }
                            }*/
                            echo "<div class='wrap_img' style='text-align:center;'>
                                <img  src='{$imgSrc1}' id='cur_img' alt='' width='75%' >
                            </div><br />";
                        }
                    }
                }else{
                    $folowimg = "";
                }
                echo "<img src='img/line.png'><br>";
                echo "</div>";
            }
        }
        //其他人跟帖 结束

	}
	mysql_close($conn);
	?>


	<?php
		$agent = strtolower($_SERVER['HTTP_USER_AGENT']);
		$type = 'other';
		if(strpos($agent, 'iphone') || strpos($agent, 'ipad')){
			$type = "https://itunes.apple.com/cn/app/bao-bao-xiu-xiu/id789847552?mt=8";
		}elseif(strpos($agent, 'android')){
			$type = "http://www.meimei.yihaoss.top/download/goodlife_luntan8.1.apk";
		}else{
			$type="http://www.meimei.yihaoss.top";
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
    <p class="ios_download_tip" style="display:none">戳右上角，选择“<em>在Safari中打开</em>”，即可下载或打开</p>
</div>

       <script src="js/zepto.js"></script>

    <div class="nice_icon">
    <img class="show_nice_icon" src="img/footer_show_logo.png" width="158" height="45" />
    <a href="<?php echo $type; ?>" class="foot_download download_nice_app" id="btn_immediately_download" data-type="btn_immediately_download">
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
