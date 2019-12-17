$(function(){
    var url = location.href;
    var actUserId="";
    var businessId="";
    var contData="";
    var txtHtml="";
    var headhtml="";
    var tophtml="";
    var messhtml="";
    var phoneType = 0; // 手机类型， android = 1 ; iPhone = 2 ; windowsPhone = 3; outherPhone = 4;
    var myScroll="";
    var href = "";
    // alert(url);
    if(url.indexOf("?") > 0){
        if(GetQueryString("actUserId")!=null && GetQueryString("actUserId").length>-1){

            actUserId = GetQueryString("actUserId")
        }
        if(GetQueryString("business_id")!=null && GetQueryString("business_id").length>-1){

            businessId = GetQueryString("business_id");
            console.log(businessId);
        }
        if(GetQueryString("marks_id")!=null && GetQueryString("marks_id").length>-1){
            marks = GetQueryString("marks_id");
        }
    }
    url = url.substring(url.indexOf("?")+1).split("&");
    // alert(url+'aaaaa');
    var login_userId = url[0].substring(url[0].indexOf("=")+1);
    // alert(login_userId+'cccc');
    var business_id = url[1].substring(url[1].indexOf("=")+1);
    // alert(business_id+'vvvvvvvv');
    var login_user_id = url[0].substring(url[0].indexOf("=")+1);
    // alert(login_user_id+'fffff');
    var business_title="";
    var order_id="";
    var last_price="";
    var price = "";
    var urlType=0;
    var jsapi_pay="";
    var xmlhttp;
    var order_role="";
    var login_userId="";
    var openid="";
    var code="";
    code = GetRequest().code , state = GetRequest().state;
// alert(code+'33333333');


    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }


    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {         //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }

    if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
        var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        var Judgment_equipment="";
        var Judgment_weixin="";
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            Judgment_weixin=2;
        }
        if (browser.versions.ios) {
            Judgment_equipment=1;
        }
        if(browser.versions.android){
            Judgment_equipment=0;
        }
    }

    request();

    function request(){
        $.ajax({
            url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV77/toysCardDetail&login_user_id='+actUserId+'&business_id='+businessId,
            type:'GET',
            datatype:'json',
            async: true,
            success:function(data){
                var data=JSON.parse(data);
                console.log(data);
                contData=data.data;
                if(businessId==1629){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);

                }else if(businessId==2635){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);


                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                    //通知客服端显示底部按钮

                }else if(businessId==1631){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);


                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                    //通知客服端显示底部按钮

                }else if(businessId==2633){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);


                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                    //通知客服端显示底部按钮

                }else if(businessId==2253){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                    //通知客服端显示底部按钮

                }
                else if(businessId==2255){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                    //通知客服端显示底部按钮

                }
                else if(businessId==2902){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                    //通知客服端显示底部按钮

                }
                else if(businessId==2907){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                    //通知客服端显示底部按钮

                }
                else if(businessId==2914){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                    //通知客服端显示底部按钮

                }
                else if(businessId==2916){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                    //通知客服端显示底部按钮

                }
                else if(businessId==2853){
                    //通知客服端显示底部按钮

                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    txtHtml+='<h2>活动说明</h2>';
                    txtHtml+='<p style="color:#333">此活动已经结束</p>';
                    // <p style="color:#333">* 只可通过活动获得，每个用户仅限一张（同一设备id/同一收货地址只算一个）</p><p style="color:#333">* 获得卡后7天内开卡有效，可转让。过期失效</p><p style="color:#333">* 点击‘右上角’分享按钮，分享加速链接给自己的好友</p><p style="color:#333">* 好友通过加速页面，为您加速。加速人数越多，进度越快</p><p style="color:#333">* 加速进度达到100%，订单中自动生成玩具租赁3次卡</p><p style="color:#333">* 获得卡后，立即生效</p>

                    // txtHtml+='<p style="color:#fd6363">* 分享此页面前，请先在客户端内登录或注册</p>'
                    $(".txt").html(txtHtml);
                }else if(businessId==3026){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                }else if(businessId==3028){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                }else if(businessId==3074){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                }else if(businessId==3088){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                }else if(businessId==3140){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                }else if(businessId==3164){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                }else if(businessId==3166){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                }else if(businessId==3168){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                }else if(businessId==3189){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                }else if(businessId==3201){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                }else if(businessId==3223){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                }
                else if(businessId==3231){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                }
                else if(businessId==3233){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                }
                else if(businessId==3242){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                }else if(businessId==3281){
                    headhtml+='<img src="'+contData.detail.img_thumb+'">';
                    $(".head").html(headhtml);
                    $(".top").hide();
                    // tophtml+='<ul><li><dl><dt><img src="img/15.png"></dt><dd>全年免租</dd></dl></li><li><dl><dt><img src="img/16.png"></dt><dd>送货上门</dd></dl></li><li><dl><dt><img src="img/14.png"></dt><dd>上门取货</dd></dl></li></ul>';
                    // $(".top").html(tophtml);

                    messhtml+=''+contData.vip_use+'';
                    $(".mess_head").html(messhtml);

                    var aStr=contData.toys_des+"";
                    aStr=aStr.replace(/\r\n/g,"<br>");
                    txtHtml+='<p>'+aStr+'</p>';
                    $(".txt").html(txtHtml);
                    var bottomHtml='<a class="btn">立即购买</a>';
                    $(".bottom").html(bottomHtml);
                    $(".btn").click(function () {
                        layer.open({
                            content: '可以去小程序或者APP内购买哦',
                            btn: '确定'
                        });
                        // window.location.href="activity.html?login_user_id="+actUserId+'&marks_id='+marks;

                    })
                }
                else{
                    return false;
                }
                $("#loading").hide();
                $(".top").show();
                $(".mess").show();

                // showBottom();
            },
            error:function(){
                $("#loading").hide();
                $(".top").show();
                $(".mess").show();

                wraphtml='<p class="cuowu">加载错误，点击重试</p>';
                $(".wrap").html(wraphtml);

                //通知客服端显示底部按钮
                // showBottom();
            }
        })
    }

    $(".wrap").on("click",".cuowu",function(){
        location.reload();
    });

    // function showBottom(){
    //  	if(phoneType==1){
    // 		window.call.callMethodPageFinish();
    // 	}else if(phoneType==2){
    // 		callMethodPageFinish();
    // 	}else{
    // 		window.call.callMethodPageFinish();
    // 	}
    // }
    // 获取操作系统类型
    window.onload=function getSystemType() {
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
            phoneType = 1;
        } else if (u.indexOf('iPhone') > -1) {//苹果手机
            phoneType = 2;
        } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
            phoneType = 3;
        }else{
            phoneType = 4;
        }
    }



})/**
 * Created by zyc on 2018/7/22.
 */
