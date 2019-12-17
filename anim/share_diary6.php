
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv = "X-UA-Compatible" content = "IE=edge,chrome=1" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-touch-fullscreen" content="yes" />
    <meta name="viewport" content="width=640, user-scalable=no">
    <meta name="MobileOptimized" content="640" />
    <meta content="telephone=no" name="format-detection" />
    <meta content="email=no" name="format-detection" />
    <!--修改页面名称-->
    <title>宝宝秀秀</title>
    <link rel="stylesheet" href="./css/index.css" type="text/css" />

    <script type="text/javascript">
        // 尽早执行
        fixViewport();
        function fixViewport()
        {
            var metas = document.getElementsByTagName('meta');
            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
                for (var i=0; i<metas.length; i++) {
                    if (metas[i].name == "viewport") { metas[i].content = "width=640, user-scalable=no"; }
                }
            }
            if (navigator.userAgent.match(/android/i)) {
                for (var i=0; i<metas.length; i++) {
                    if (metas[i].name == "viewport") { metas[i].content = "width=640, target-densityDpi=290, user-scalable=no"; }  //for galaxy s4 & google nexus
                }
            }
        }
    </script>
    <script type="text/javascript" src="./js/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="./js/soundmanager2-nodebug-jsmin.js"></script>
    <script>
        var worldMusic;
        $(function(){
            setTimeout(function(){

                soundManager.setup({
                    // where to find the SWF files, if needed
                    url: "./img/soundmanager2.swf",
                    // if you'd rather have 100% HTML5 mode (where supported)
                    preferFlash: false,
                    autoLoad: true,
                    onready: function() {
                        // SM2 has loaded, API ready to use e.g., createSound() etc.
                        worldMusic = soundManager.createSound({
                            id: 'world',
                            //url: '../js/yoga-pro/yoga.mp3',
                            url: "./img/events.mp3",
                            autoLoad: true,
                            autoPlay:true,
                            stream: false,
                            loops: 9999
                        }).load().play();
                        if(navigator.userAgent.match(/iPhone/i)) {
                            worldMusic.play();
                            window.musicInited = true;
                        }
                        $('body').on('touchstart.music', function(){
                            if((worldMusic.playState == 0 || worldMusic.position == 0) && !window.musicInited) {
                                worldMusic.play();
                            }
                            window.musicInited = true;
                            $(this).off('touchstart.music');
                        });
                    }
                });
                $('#loading').hide();
//                events.init();
            }, 1000);
        });
    </script>
</head>
<body>

<?php 
		$user_id = intval($_GET['user_id']);
		$baby_id = intval($_GET['baby_id']);
		$conn = mysql_connect("115.29.48.94","liuwt","liuwt");
		if (!$conn){
			die('Could not connect: ' . mysql_error());
		}
		mysql_select_db('quanquan_baby_show',$conn);
		mysql_query( 'set names utf8');

		$current_time = date('Y-m-d H:i:s');
		$getBirthdaySql = "SELECT birth_date,avatar,user_name FROM baby_babys where id={$baby_id} and user_id={$user_id} and state='0'  ";
		///echo $getBirthdaySql;exit;
		$queryRes = mysql_query($getBirthdaySql,$conn);
		$SERVER_NAME ="http://api.baobaoshowshow.com/";
		while($row = mysql_fetch_array($queryRes)) {
				$birthday = $row['birth_date'];
				$user_name = strval($row['user_name']);
				$avatar = $row['avatar'];
				
		}
		//echo $avatar;exit;
		if(empty($avatar)){
			$avatar1 = $SERVER_NAME."static/album/defaultAvatar_thumb_120.png";
		}else{
			if(substr($avatar,0,6)!='static'){
				$avatar1 = $avatar;
			}elseif(strpos($avatar,'defaultAvatar.png')>0){
				$avatar1 = $SERVER_NAME."static/album/defaultAvatar_thumb_120.png";
			}else{
				$avatar1 = $SERVER_NAME.substr($avatar, 0,-4)."_thumb_120.jpg";
			}
					
		}
		$chengeTime =date('Y-m-d H:i:s'); 
		$baby_birth = explode('-', $birthday);
		$year = $baby_birth[0];
		$month = $baby_birth[1];
		$day = $baby_birth[2];
		$chengeTime = explode('-', $chengeTime);
		$year1 = 	$chengeTime[0]; 
		$month1 = 	$chengeTime[1];
		$day1 = 	$chengeTime[2];
		if($chengeTime >= $baby_birth){
			$dyear = $year1 - $year;
			if ($month1 < $month || ($month1 == $month && $day1 < $day)) $dyear--;
				$dmonth = $month1 - $month;
			if ($day1 < $day) $dmonth--;
			if($dmonth<0)
			{ 
				$dmonth = $dmonth + 12 ;
			}
			$dday = $day1 - $day;
			if($dday<0){
				$dday = $dday + 30 ;
			}
			$origintime = strval($dyear.",".$dmonth.",".$dday);
			$original_time = explode(",",$origintime);
			$year = $original_time[0];
			$month = $original_time[1];
			$day = 	$original_time[2];
			$album_name = $year.",".$month.",".$day;
		}else{
			
			$dyear = $year - $year1;
			if ($month < $month1 || ($month == $month1 && $day < $day1)) $dyear--;
				$dmonth = $month - $month1;
			if ($day < $day1) $dmonth--;
			if($dmonth<0)
			{ 
				$dmonth = $dmonth + 12 ;
			}
			$dday = $day - $day1;
			if($dday<0){
				$dday = $dday + 30 ;
			}
			$origintime = $dyear.",".$dmonth.",".$dday;
			$original_time = explode(",",$origintime);
			$year = $original_time[0];
			$month = $original_time[1];
			$day = 	$original_time[2];
			$album_name = "-".$year.","."-".$month.","."-".$day;
		}
		
		
		$tmep_album = explode(',',$album_name);
		$biary_year = $tmep_album[0];
		$biary_month = $tmep_album[1];
		$biary_day = $tmep_album[2];
		if($biary_year<0 && $biary_month < 0 && $biary_day <0){
			$dyears = $biary_year;
			$dmonth = $biary_month;
			$dday = $biary_day;
			$diary_albums = "出生前".abs($dyears)."年".abs($dmonth)."个月".abs($dday)."天";
		}elseif($biary_year<0 && $biary_month == 0 && $biary_day <0){
			$dyears = $biary_year;
			$dmonth = 0;
			$dday = $biary_day;
			$diary_albums = "出生前".abs($dyears)."年零".$dday."天";
		}elseif($biary_year<0 && $biary_month < 0 && $biary_day == 0){
			$dyears = $biary_year;
			$dmonth = $biary_month;
			$dday = 0;
			$diary_albums = "出生前".abs($dyears)."年".abs($dmonth)."个月";
		}elseif($biary_year==0 && $biary_month < 0 && $biary_day == 0){
			$dyears = 0;
			$dmonth = $biary_month;
			$dday = 0;
			$diary_albums = "出生前".abs($dmonth)."个月";
		}elseif($biary_year==0 && $biary_month == 0 && $biary_day < 0){
			$dyears = 0;
			$dmonth = 0;
			$dday = $biary_day;
			$diary_albums = "出生前".abs($dday)."天";
		}elseif($biary_year==0 && $biary_month <0 && $biary_day < 0){
			$dyears = 0;
			$dmonth = $biary_month;
			$dday = $biary_day;
			$diary_albums = "出生前".abs($dmonth)."个月".abs($dday)."天";
		}elseif($biary_year>0 && $biary_month > 0 && $biary_day > 0){
			$dyears = $biary_year;
			$dmonth = $biary_month;
			$dday = $biary_day;
			$diary_albums = $dyears."岁".$dmonth."个月".$dday."天";
		}elseif($biary_year>0 && $biary_month > 0 && $biary_day == 0){
			$dyears = $biary_year;
			$dmonth = $biary_month;
			$dday = 0;
			$diary_albums = $dyears."岁".$dmonth."个月";
		}elseif($biary_year>0 && $biary_month == 0 && $biary_day > 0){
			$dyears = $biary_year;
			$dmonth = 0;
			$dday = $biary_day;
			$diary_albums = $dyears."岁".$dday."天";
		}elseif($biary_year>0 && $biary_month > 0 && $biary_day == 0){
			$dyears = $biary_year;
			$dmonth = $biary_month;
			$dday = 0;
			$diary_albums = $dyears."岁".$dmonth."个月";
		}elseif($biary_year>0 && $biary_month == 0 && $biary_day == 0){
			$dyears = $biary_year;
			$dmonth = 0;
			$dday = 0;
			$diary_albums = $dyears."岁";
		}elseif($biary_year==0 && $biary_month > 0 && $biary_day == 0){
			$dyears = 0;
			$dmonth = $biary_month;
			$dday = 0;
			$diary_albums = $dmonth."个月";
		}elseif($biary_year==0 && $biary_month == 0 && $biary_day > 0){
			$dyears = 0;
			$dmonth = 0;
			$dday = $biary_day ;
			$diary_albums = $dday."天";
		}elseif($biary_year==0 && $biary_month > 0 && $biary_day > 0){
			$dyears = 0;
			$dmonth = $biary_month;
			$dday = $biary_day ;
			$diary_albums = $dmonth."个月".$dday."天";
		}elseif($biary_year==0 && $biary_month == 0 && $biary_day == 0){
			$diary_albums="今天出生";
		}
		//获取相册
			$descSql = "select id,album_name,tag_name,album_description from baby_diary_album where user_id={$user_id} and baby_id={$baby_id} and state='0' and diary_cate='0' order by dyear asc,dmonth asc,dday asc";
			//echo $descSql;exit;
			$descRes = mysql_query($descSql,$conn);
			while($row = mysql_fetch_array($descRes)) {
				$id = intval($row['id']);
				$album_name = $row['album_name'];
				$album_description =  $row["album_description"];
				$tag_name = $row['tag_name'];
				$imgSql = "select img  from baby_diary_img where album_id={$id} and state='0' limit 1 ";
				$imgRes = mysql_query($imgSql,$conn);
				while($row = mysql_fetch_array($imgRes)) {
					$img_thumb = $row["img"];
					if(!empty($img_thumb)){
					
						$webRoot = "/data/www/api/";
						$thumbImgUrlDir =  $webRoot.substr($img_thumb, 0,-4);
						if(file_exists($thumbImgUrlDir."_thumb_190.jpg") && filesize($thumbImgUrlDir."_thumb_190.jpg")!=0){
								$imgSrc = $SERVER_NAME.substr($img_thumb, 0,-4)."_thumb_190.jpg";
						}elseif(file_exists($thumbImgUrlDir."_thumb_200.jpg") && filesize($thumbImgUrlDir."_thumb_200.jpg")!=0){
								$imgSrc = $SERVER_NAME.substr($img_thumb, 0,-4)."_thumb_200.jpg";
						}else{
								$imgSrc = $SERVER_NAME.$img_thumb;
						}
						
					}
				}
				$temps[] = array(
					'id'=>$id,
					'album_name'=>$album_name,
					'album_description'=>$album_description,
					'tag_name'=>$tag_name,
					'imgSrc'=>$imgSrc
				);
			}	
		//print_r($temps);exit;
?>
<div id="doc">
    <div class="wrap-header">
        <section class="header">
            <img class="cloud" src="img/cloud-1.png" alt="云"/>
            <!--用户图片，注意图片输出大小-->
            <div class="atr"><img width="175" height="175"  src="<?php echo $avatar1;?>"/></div>
            <h1>
                <div class="nick"><?php echo $user_name;?></div>
                <div class="old"><?php echo $diary_albums;?></div>

            </h1>
            <img class="abs bro" src="img/bro.png" alt="彩虹"/>
        </section>
    </div>
    <div class="wrap">

        <div class="birthday">
            <span class="day"><?php echo $baby_birth[2]?></span>
            <div class="left">
                <span class="month"><?php echo $baby_birth[1]?></span>
                <span class="year"><?php echo $baby_birth[0]?></span>
            </div>

            <div class="im">出生啦</div>
        </div>
		
		
		
        <div class="content-wrap">
          
		 <?php 
			if(is_array($temps) && count($temps) >0){
				foreach($temps as $key=>$value){
					$tag_name = $value['tag_name'];
					//if(empty($tag_name)) $tag_name=" 。";
					if($key % 2 ==0){
						echo"
							<section class='list list-o'>
							<img class='cloud' src='img/cloud-1.png' />
							<img class='fire-ballon abs' src='img/r1.png' />
							<div class='flag-wrap'>
								<div class='flag'>
								{$value['album_name']}
									<span class='arrow'></span>
								</div>
								<div class='dot'></div>
							</div>
							<div class='info abs'>
                   
							<div class='cell content'>{$value['album_description']}</div>
							<div class='cell'>
								<a href='../share_diary.php?user_id={$user_id}&baby_id={$baby_id}&album_id={$value['id']}'>
							<div class='img-wrap' style='background: url({$value['imgSrc']});'>
							<em class='bg'></em>
							</div>
								</a>
							</div>
							<div class='cell'>
							<span class='dot2'><em class='dot'></em></span>
							</div>
							<div class='cell keyframe-wrap'>
							<div class='keyframe'>{$tag_name}</div>
							</div>
						</div>
						</section>
					";
				}else{
					echo " <section class='list list-e'><div class='flag-wrap'>
						<div class='flag'>
							{$value['album_name']}
						<span class='arrow'></span>
						</div>
						<div class='dot'></div>
						</div>
						<div class='info abs'>
						<div class='cell keyframe-wrap'>
							<div class='keyframe'>{$tag_name}</div>
						</div>
						<div class='cell'>
							<span class='dot2'><em class='dot'></em></span>
						</div>

						<div class='cell'>
						<a href='../share_diary.php?user_id={$user_id}&baby_id={$baby_id}&album_id={$value['id']}'>
							<div class='img-wrap' style='background: url({$value['imgSrc']}) '>
								<em class='bg'></em>
							</div>
						</a>
						</div>
						<div class='cell content content-al'>{$value['album_description']}</div>
					</div>

					<img class='cloud' src='img/cloud-1.png' />
					</section> ";
				}
			}
		}
 ?>
		</div>
	</div>
</div>
<script>
    window.shareData = {
        'link': "http://lenovoevents.ovpp.cn/events",
        'title': "联想大事记",
        'img_url': "http://lenovoevents.ovpp.cn/images/events/30.png",
        'desc': "30年来的记忆"
    };
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
       
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "img_url": window.shareData.img_url,
                "img_width": "640",
                "img_height": "640",
                "link": window.shareData.link,
                "desc": window.shareData.timeline || window.shareData.desc,
                "title": window.shareData.title
            }, function (res) {
             
            })
        });
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": window.shareData.img_url,
                "img_width": "640",
                "img_height": "640",
                "link": window.shareData.link,
                "desc": '',
                "title": window.shareData.timeline || window.shareData.desc
            }, function (res) {
            });
        });
    }, false);

    var list = $('.list');
    var viewportHeight = document.body.offsetHeight;
    var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;

    function trans(){
        scrollTop = document.body.scrollTop + document.documentElement.scrollTop;

        list.each(function (i) {
            var self = $(this);
            var top = self.offset().top;
            var height = self.height();
            var index = i % 2 == 0 ? '' : '2';

            if(scrollTop + viewportHeight >= top + height / 2){
                self.addClass('trans');
            }else{
                self.removeClass('trans');
            }
        });
    }
    setTimeout(function () {
        trans();
    }, 2000);
    $(window).on('scroll', function () {
        trans();
    });
</script>
</body>
</html>