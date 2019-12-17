$(function(){

	var img_id="";
	var user_id="";
	var url=location.href;
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
if(url.indexOf("?") > 0){
    if(GetQueryString("user_id")!=null && GetQueryString("user_id").length>-1){
   
      user_id=(GetQueryString("user_id"));
     console.log(user_id)
    }
    if(GetQueryString("img_id")!=null && GetQueryString("img_id").length>-1){
     img_id=(GetQueryString("img_id"));
     

    }
}


    //点击进入下载
    $("#btn_immediately_download").on("click",function(){

        $(".mask").show();
        $(".tipContainer").show();  
		//判断是否是微信
        function isWeiXin(){
	       var ua = window.navigator.userAgent.toLowerCase();
	       if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	           return true;
	       }else{
	           return false;
	       }
    	}

	    $(function () {
		    var u = navigator.userAgent, app = navigator.appVersion;
		    var isAndroid = u.indexOf('Android') > -1; //安卓终端
		    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		    if (isAndroid) {
		        $(".android_download_tip").show();
		        $(".ios_download_tip").hide();
		        window.location.href = 'http://www.meimei.yihaoss.top/download/GoodLife_luntan_v6.8.apk';
		    }
		    if (isIOS) {
		        $(".android_download_tip").hide();
		        $(".ios_download_tip").show();
		        window.location.href = 'itms://itunes.apple.com/cn/app/bao-bao-xiu-xiu/id789847552?mt=8';
		    }   
		});
    })
    
    

//渲染视频（H5video）
	$.ajax({
		url:'http://www.meimei.yihaoss.top/php/shareListingVideo.php?user_id='+user_id+'&img_id='+img_id,
		type:"get",
		success:function(v){
			//console.log(1);
			var bhtml="";
			var result = JSON.parse(v);
			//console.log(2);
			var dataStr = result.data;
			//console.log(dataStr);
			/*bhtml="<div class='video' style='background:"+dataStr.img_thumb+"'>";*/
			bhtml="<div  style='background: url("+dataStr.img_thumb+");background-size: 100% 100%;width:100%;height:210px; opacity:.3;position: absolute;top: 0;z-index:333'></div>";
			
			bhtml += '<video controls="controls" width="100%" height="210px" poster="'+dataStr.img_thumb+'" src="'+dataStr.video_url+'" webkit-playsinline="true"></video>';
				
			$(".video").html(bhtml);
			
		}
	});

	//渲视频数据
	$.ajax({
		url:'http://www.meimei.yihaoss.top/php/shareListingVideo.php?user_id='+user_id+'&img_id='+img_id,
	    type:"get",
	    success:function(data){
			//console.log(1);
			var ahtml="";
			var re = JSON.parse(data);
			//console.log(2);
			//console.log(re);
			var eStr=re.data;
			//console.log(eStr);
			var aStr = eStr.img_description+"";//换行的内容  
			// console.log(aStr);
			
			aStr=aStr.replace(/\r\n\r\n/g,"<br><br>"); 

	        ahtml+="<div class='content'><p>"+eStr.img_title+"</p><p>"+aStr+"</p><p><span><b>"+eStr.post_count+"</b>次播放</span></p></div><div class='center'><span><img src='"+eStr.avatar+"'></span><span><h1>"+eStr.user_name+"</h1><a>"+eStr.create_time+"</a></span></div>";
				
			$(".boxs").html(ahtml);
			
		}
	})
		

	//渲染评论数据
	$.ajax({
		url:'http://www.meimei.yihaoss.top/php/shareReviews.php?img_id='+img_id+'&user_id='+user_id,
		type:"get",
		dataType:"json",
		success:function(data){
			var ohtml="";
			var whtml="";
                whtml="<p>评论</p>";
                $(".pl").html(whtml);
			for(var i in data.data){
				ohtml="<div class='wenzi'></div>";
				arr=data.data;
				for(var i in arr){
					//console.log(arr[i].avatar)
					ohtml+="<div class='center bottom'><span><img src='"+arr[i].avatar+"'></span><span><h1>"+arr[i].user_name+"</h1><a>"+arr[i].post_time+"</a></span></div><div class='lx'><p>"+arr[i].demand+"</p></div>"
				}
			}
			$(".wrapper").html(ohtml);
			$(".nice_icon").show();
		}
	})



})





