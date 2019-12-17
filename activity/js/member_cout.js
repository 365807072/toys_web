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

	// request();

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
					// var bottomHtml='<button class="btn">立即购买</button>';
					// $(".bottom").html(bottomHtml);
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
	//支付
//XmlHttpRequest对象
	function createXmlHttpRequest(){
		if(window.ActiveXObject){ //如果是IE浏览器
			return new ActiveXObject("Microsoft.XMLHTTP");
		}else if(window.XMLHttpRequest){ //非IE浏览器
			return new XMLHttpRequest();
		}
	}
	console.log(code);

	if(!code){
		// alert(login_user_id+'----1');
		// alert(business_id+'---2');
		href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5bd2876a775d0525&redirect_uri=http%3a%2f%2fwww.meimei.yihaoss.top%2factivity%2fmember_cout.html&response_type=code&scope=snsapi_userinfo&state="+login_user_id+"="+business_id;
		var btnHtml='<a class="btn" href='+href+'>立即购买</a>';
		$(".bottom").html(btnHtml);
	}else{
		// alert("进入");
		// alert(code+'code');
		href = "javascript:;";
		var btnHtml='<a class="btn" href='+href+'>立即购买</a>';
		$(".bottom").html(btnHtml);
		login_user_id = GetRequest().state.split('%3D')[0];
		business_id = GetRequest().state.split('%3D')[1];
		$.get('http://www.meimei.yihaoss.top/business/php.php?code='+code+'&state=111',function(data){

			var result = JSON.parse(data);
			openid = result.openid;
			code = result.data.code;

			$.ajax({
				url:"http://api.baobaoshowshow.com/index.php?r=BabyShowV1/wxLogin",
				type:"POST",
				data : {
					'uid' : result.openid,
					'nick_name' : result.nickname,
					'source' : 1,
					'unionid' : result.unionid,
					'imgurl' : result.headimgurl,
				},
				success:function(data){
					var res = JSON.parse(data);
					//alert(res);
					var storage = window.localStorage;
					if(res.success == true){
						var login_user_name = storage.setItem("login_user_name",res.data.nick_name);
						login_userId = storage.setItem("login_user_id",res.data.user_id);
						var picUrl = storage.setItem("picUrl",res.data.avatar);
						storage.setItem("login_type",2)//type=0或undefined 未登录 type=2 已登录
						login_userId = storage.getItem("login_user_id");
					}

					$(".btn").click(function(){
						// alert("222222222222");
						// if(storage.getItem("login_type")==2){
						// var data_index=$(this).attr("data-index");
						var data_index=1;
						// if(order_role=0){
						// 	$(this).disabled=true;
						// }
						// else{
						$.ajax({
							url:"http://api.baobaoshowshow.com/index.php?r=BabyShowV1/loginV1&login_user_id="+login_userId,
							type:"POST",
							data:"json",
							data:{client_type:Judgment_equipment,user_type:Judgment_weixin},
							success:function(){
							}
						})
						// alert(login_userId);
						// alert(business_id);
						// alert(data_index);
						// alert(code);
						// alert(openid);
						//数据渲染
						$.ajax({
							url:"http://api.baobaoshowshow.com/index.php?r=BabyShow/PublicOrder&login_user_id="+login_userId+"&business_id="+business_id+"&package="+data_index+"&order_rol=0&code="+code+"&open_id="+openid+"&source=1",
							type:"GET",
							datatype:"json",
							success:function(data){
								// alert(data+'=======');
								var data = JSON.parse(data);
								// alert(data+'------');
								var arr=data.data;
								// alert(arr+'arr');
								order_id = arr.order_id;
								// alert(order_id+'arr');
								business_title = arr.business_title;
								// alert(business_title+'arr');
								price = arr.price;
								// alert(price+'arr');
								// alert(openid+'openid');
								$.get('http://www.meimei.yihaoss.top/business/weixin/jsapi/jsapi.php?business_title='+business_title+'&order_id='+order_id+'&price='+price+'&code='+code+'&open_id='+openid,function(data){
									// $(this).disabled=true;
									// alert(data);
									var result = JSON.parse(data);
									// alert(result+'=======');
									jsapi_pay = result.data.jsApiParameters;
									// alert(jsapi_pay);
									callpay(jsapi_pay);
								})

							}
						})
					})
				}

			})

		});


	}


	function callpay(jsapi_pay){
		// alert("jaajajajaja");
		if (typeof WeixinJSBridge == "undefined"){
			if( document.addEventListener ){
				document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
			}else if (document.attachEvent){
				document.attachEvent('WeixinJSBridgeReady', jsApiCall);
				document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
			}
		}else{
			jsApiCall(jsapi_pay);
		}
	}
	function jsApiCall(jsapi_pay){
		// alert("hahahahahaha");
		//alert(jsapi_pay);
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest',
			jsapi_pay,
			function(res){
				WeixinJSBridge.log(res.err_msg);
				//alert(res.err_code+res.err_desc+res.err_msg);
				if(res.err_msg == "get_brand_wcpay_request:ok"){
					// alert("lalalalalal");
					// window.location.href="http://www.meimei.yihaoss.top/business/order.html?login_user_id="+login_userId;
					//
				}
			}
		);

	}


})