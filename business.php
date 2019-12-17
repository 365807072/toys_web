<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=320, user-scalable=no" />
	<title>商家分享</title>
	<link rel="stylesheet" href="./css/business.css">
</head>
	<script type="text/javascript">
		window.nice = {
           // DOWNLOAD_URL: ,
            TUNEUP_URL: "https://itunes.apple.com/cn/app/bao-bao-xiu-xiu/id789847552?mt=8",

        };
		var match,
		    scale,
		    TARGET_WIDTH = 320;

		if (match = navigator.userAgent.match(/Android (\d+\.\d+)/)) {
		    if (parseFloat(match[1]) < 4.4) {
		        if (TARGET_WIDTH == 320) TARGET_WIDTH++;
		        var scale = window.screen.width / TARGET_WIDTH;
		        document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=' + TARGET_WIDTH + ', initial-scale = ' + scale + ', target-densitydpi=device-dpi');
		    }
		} else {
		    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=' + TARGET_WIDTH);
		}
	</script>
<body>
	<?php
		$business_id = intval($_GET['business_id']);
	 	//$business_id =334;
		$conn = mysql_connect("115.29.48.94","liuwt","liuwt");
		if (!$conn)
		{
			die('Could not connect: ' . mysql_error());
		}
		mysql_select_db('quanquan_baby_show',$conn);
		mysql_query( 'set names utf8');
		$SERVER_NAME = "http://api.baobaoshowshow.com/";
		if($business_id){
			/*订单评论信息*/
	        $orderCommentSql = "SELECT u.nick_name,c.post_create_time,c.comment_description,c.grade3
	                        FROM baby_order_comment as c left join baby_user as u on c.user_id=u.id
	                        WHERE c.business_id={$business_id} and c.state='0'
	                        order by c.like_level desc,c.post_create_time desc limit 1";
	        $orderCommentRes = mysql_query($orderCommentSql,$conn);
	        while($row = mysql_fetch_array($orderCommentRes)) {
	        	$post_create_time=$row['post_create_time'];
                $user_name=$row['nick_name'];
                $user_time=date("Y-m-d",strtotime($post_create_time));
                $user_msg=$row['comment_description'];
                $grade3=$SERVER_NAME .$row['grade3'];
	        }
			$descSql = "select * from baby_business where id={$business_id} and state='0' ";
			$descRes = mysql_query($descSql,$conn);
			while($row = mysql_fetch_array($descRes)) {
				$img_thumb = $row["business_pics"];
				if($img_thumb) {
					$imgArray = explode(';',$img_thumb);
					$listImg=$SERVER_NAME.$imgArray[0];
				} else {
					$listImg="";
				}
				$business_title = $row["business_title"];
				$business_des = $row["business_des"];

				$business_contact = $row["business_contact"];
				$business_location = $row["business_location"];
				$grade1 = $SERVER_NAME.$row["grade1"];
				$work_time = $row["work_time"];
				$business_activity_num1 = $row["business_activity_num1"];
				$business_activity_num2 = $row["business_activity_num2"];
				$business_activity_num3 = $row["business_activity_num3"];
				$business_activity_num4 = $row["business_activity_num4"];
				$business_activity_time1 = $row["business_activity_time1"];
				$business_activity_time2 = $row["business_activity_time2"];
				$business_activity_time3 = $row["business_activity_time3"];
				$business_activity_time4 = $row["business_activity_time4"];
				$business_market_price1 = $row["business_market_price1"];
				$business_market_price2 = $row["business_market_price2"];
				$business_market_price3 = $row["business_market_price3"];
				$business_market_price4 = $row["business_market_price4"];
				$business_babyshow_price1 = $row["business_babyshow_price1"];
				$business_babyshow_price2 = $row["business_babyshow_price2"];
				$business_babyshow_price3 = $row["business_babyshow_price3"];
				$business_babyshow_price4 = $row["business_babyshow_price4"];
				$business_package_des1 = $row["business_package_des1"];
				$business_package_des2 = $row["business_package_des2"];
				$business_package_des3 = $row["business_package_des3"];
				$business_package_des4 = $row["business_package_des4"];
			}
		}
	?>
	<?php
		echo "
		<section class='banner'>
			<ul>
				<li><img src='{$listImg}' alt='图片'></li>
			</ul>
		</section>

		<section class='content'>
			<div class='commodity'>{$business_title}</div>
			<div class='address'>{$business_location}</div>
			<div class='gameTime'>{$work_time}</div>
			<div class='phoneNum'>{$business_contact}</div>
		";
		if($business_package_des1){
			echo "
			<div class='setmeal'>套餐一</div>
			<div class='ticket'>
				<div class='price'>秀秀价 <span>￥{$business_babyshow_price1} </span> <u>店面价{$business_market_price1}元</u></div>
				<ul>
					<li>{$business_package_des1}</li>
				</ul>
				<ol>
					<li>{$business_activity_num1}</li>
					<li>{$business_activity_time1}</li>
				</ol>
			</div>
			";
		}
		if($business_package_des2){
			echo "
			<div class='setmeal'>套餐二</div>
			<div class='ticket'>
				<div class='price'>秀秀价 <span>￥{$business_babyshow_price2} </span> <u>店面价{$business_market_price2}元</u></div>
				<ul>
					<li>{$business_package_des2}</li>
				</ul>
				<ol>
					<li>{$business_activity_num2}</li>
					<li>{$business_activity_time2}</li>
				</ol>
			</div>
			";
		}
		if($business_package_des3){
			echo "
			<div class='setmeal'>套餐三</div>
			<div class='ticket'>
				<div class='price'>秀秀价 <span>￥{$business_babyshow_price3} </span> <u>店面价{$business_market_price3}元</u></div>
				<ul>
					<li>{$business_package_des3}</li>
				</ul>
				<ol>
					<li>{$business_activity_num3}</li>
					<li>{$business_activity_time3}</li>
				</ol>
			</div>
			";
		}
		if($business_package_des4){
			echo "
			<div class='setmeal'>套餐四</div>
			<div class='ticket'>
				<div class='price'>秀秀价 <span>￥{$business_babyshow_price4} </span> <u>店面价{$business_market_price4}元</u></div>
				<ul>
					<li>{$business_package_des4}</li>
				</ul>
				<ol>
					<li>{$business_activity_num4}</li>
					<li>{$business_activity_time4}</li>
				</ol>
			</div>
			";
		}
		echo "
			<div class='introduction'>
				<div class='title'>简介：</div>
				<p>{$business_des}</p>
			</div>
			<div class='Aevaluate'>
				综合评价
				<img src='{$grade1}' style='display: inline-block;width: 90px;height: 15px;' >
			</div>
			";
		if(!empty($user_name)){
			echo "
			<div class='evaluate'>秀秀用户评价</div>
			<div class='evaluates'>
				<ul>
					<li>
						<div class='t'>
							<span class='name'>{$user_name}</span>
							<img src='{$grade3}' style='display: inline-block;width: 90px;height: 15px;' >
							<span class='time'>{$user_time}</span>
						</div>
						<p>{$user_msg}</p>
					</li>
				</ul>
			</div>
			";
		}
	$agent = strtolower($_SERVER['HTTP_USER_AGENT']);
	$type = 'other';
	if(strpos($agent, 'iphone') || strpos($agent, 'ipad')){
		$type = "https://itunes.apple.com/cn/app/bao-bao-xiu-xiu/id789847552?mt=8";
	}
	if(strpos($agent, 'android')){
		$type = "http://www.meimei.yihaoss.top/download/BabyShow_v8.9.5.apk";//babyshow_final_v4.7.1.apk
	}
			echo "
			<div class='more'>最全的亲子游乐最优惠的价格尽在舜鑫国际旅游（北京）有限公司租赁！</div>
		</section>




		";
	?>
	<footer class='aside'>
		<dl>
			<dt><img src='img/business_logo.png'></dt>
			<dd>宝宝秀秀<br/>精彩宝宝成长每一瞬间</dd>
		</dl>
		<a href="<?php echo $type; ?>" class="foot_download download_nice_app" id="btn_immediately_download"  data-type="btn_immediately_download">立即下载</a>
	</footer>

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