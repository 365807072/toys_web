

function isWeiXin(){
   var ua = window.navigator.userAgent.toLowerCase();
   if(ua.match(/MicroMessenger/i) == 'micromessenger'){
       return true;
   }else{
       return false;
   }
}
 $(function () {
  $("#btn_immediately_download").click(function(){
      var u = navigator.userAgent, app = navigator.appVersion;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('linux') > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
          window.location.href = 'http://www.meimei.yihaoss.top/download/GoodLife_luntan_v6.8.apk';
      }
      if (isIOS) {
          window.location.href = 'itms://itunes.apple.com/cn/app/bao-bao-xiu-xiu/id789847552?mt=8';
      }
  })
    
});











