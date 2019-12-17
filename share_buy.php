<!DOCTYPE html>
<html>
    <head>

        <meta charset="utf-8"/> <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" media="(device-height: 568px)">

    <link rel="stylesheet" type="text/css" href="css/photo.css" >

   <style>html,body{height:100%;}</style>
            </head>

			 <script>
        window.nice = {
           // DOWNLOAD_URL: ,
            TUNEUP_URL: "https://itunes.apple.com/cn/app/bao-bao-xiu-xiu/id789847552?mt=8",

        };
        </script>

		<body>

	 <?php


		$post_url = $_GET['post_url'];

		$params = $_GET;
		if(is_array($params) && count($params) ){
			foreach($params as $key=>$v){
				if($key!='post_url'){
					$post_url.= "&".$key."=".$v;
				}else{
					$post_url=$post_url;
				}
			}

		}

		/*处理京东链接*/
		if(strpos($post_url,'jd.com')!=""){

			$url = str_replace("item.jd.com/","item.m.jd.com/ware/view.action?wareId=",$post_url);
			$post_url1 = str_replace(".html","",$url);
		}elseif(strpos($post_url,'suning.com')!=""){

			$post_url1 = str_replace("product.suning.com/","m.suning.com/product/",$post_url);
		}elseif(strpos($post_url,'www.womai.com/Product')!=""){
			$url = str_replace("www.womai.com/Product-0-","m.womai.com/0p",$post_url);
			$post_url1 = str_replace(".htm",".shtml",$url);

		}elseif(strpos($post_url,'www.womai.com/shan/product-0-')!=""){
			$url = str_replace("www.womai.com/shan/product-0-","m.womai.com/0p",$post_url);
			$post_url1 = str_replace(".htm",".shtml",$url);
		}else{
			$post_url1 =$post_url;
		}
		if(strpos($post_url1,'&from=')!=""){
			$post_url1=substr($post_url,0,strpos($post_url1,'&from='));
		}

	 ?>

	 <script>
 function setAutoHeight(iframeElement,  iframeWindow) {
		iframeElement.style.height = iframeWindow.document.body.scrollHeight;
		iframeElement.style.width  =  iframeWindow.document.body.scrollWidth  ;
	}
	//setAutoHeight( document.getElementById("iframeid"), window.frames[0]  );
	</script>
	 <iframe name="I1" src="<?php echo $post_url1; ?>" style="!important" width = "100%" height="100%" ></iframe>





	 	<?php
	$agent = strtolower($_SERVER['HTTP_USER_AGENT']);
	 $type = 'other';
	 if(strpos($agent, 'iphone') || strpos($agent, 'ipad')){
		$type = "https://itunes.apple.com/cn/app/bao-bao-xiu-xiu/id789847552?mt=8";
	 }
	 if(strpos($agent, 'android')){
		$type = "http://www.meimei.yihaoss.top/download/BabyShow_v8.9.5.apk";
	 }
	// return $type;

   ?>




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
