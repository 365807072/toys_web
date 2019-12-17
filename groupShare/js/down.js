function downLoad(){
	var u = navigator.userAgent, app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

	function isWeiXin(){
       var ua = window.navigator.userAgent.toLowerCase();
       if(ua.match(/MicroMessenger/i) == 'micromessenger'){
           return true;
       }else{
           return false;
       }
    }

    if(isWeiXin()){
    	window.location="http://www.meimei.yihaoss.top/download.php?from=singlemessage&isappinstalled=0";
    	
    }else{
    	 if(isAndroid){
    	 	alert("Android");
			var state = null;
		    try {
		      state = alert("您已安装该软件");
		    } catch(e) {}
		    if (state) {
		      window.close();
		    } else {
		      window.location = "http://www.meimei.yihaoss.top/download/GoodLife_luntan_v6.8.apk";
		    }
		}else if(isiOS){
			alert("ios");
			var loadDateTime = new Date();
		    window.setTimeout(function() {
			    var timeOutDateTime = new Date();
			    if (timeOutDateTime - loadDateTime < 5000) {
			    	alert("xiazai")
			     	window.location = "itms://itunes.apple.com/cn/app/bao-bao-xiu-xiu/id789847552?mt=8";
			    } else {
			     	window.close();
			    }
		   },25);
		   window.location = "itms://itunes.apple.com/cn/app/bao-bao-xiu-xiu/id789847552?mt=8";
		}
   		
    }
   

  


}
	
