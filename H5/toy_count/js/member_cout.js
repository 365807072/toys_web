$(function(){
	var url = location.href;
	var userId="";
	var businessId="";
	var contData="";
	var txtHtml="";
	var headhtml="";
	var tophtml="";
	var messhtml="";
	var phoneType = 0; // 手机类型， android = 1 ; iPhone = 2 ; windowsPhone = 3; outherPhone = 4;
	var myScroll="";

	if(url.indexOf("?") > 0){
		if(GetQueryString("login_user_id")!=null && GetQueryString("login_user_id").length>-1){
			
			userId = GetQueryString("login_user_id")
		}
		if(GetQueryString("business_id")!=null && GetQueryString("business_id").length>-1){
			
			businessId = GetQueryString("business_id");
			console.log(businessId);
		}
	}
	function GetQueryString(name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if(r!=null)return  unescape(r[2]); return null;
	}

	    var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          	$(".mess").css("height","110%");
          	$(".main").css("height","100%")
        }
        if (isIOS) {
          	$(".main").css("height","100%")
          	$(".mess").css("height","100%");
        } 
 

	request();

	myScroll= new iScroll("wrapper");
	
	function request(){
		$.ajax({
			url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV77/toysCardDetail&login_user_id='+userId+'&business_id='+businessId,
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
					showBottom();
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
					showBottom();
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
					showBottom();
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
					showBottom();
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
					showBottom();
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
					showBottom();
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
					showBottom();
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
					showBottom();
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
					showBottom();
				}
				else if(businessId==2853){
					//通知客服端显示底部按钮
					showBottom();
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
				}else{
					return false;
				}
				$("#loading").hide();
				$(".top").show();
				$(".mess").show();

				
			},
			error:function(){
				$("#loading").hide();
				$(".top").show();
				$(".mess").show();

				wraphtml='<p class="cuowu">加载错误，点击重试</p>';
				$(".wrap").html(wraphtml);
				
				//通知客服端显示底部按钮
				showBottom();
			}
		})
	}

	$(".wrap").on("click",".cuowu",function(){
		location.reload();
	});

	function showBottom(){
	 	if(phoneType==1){
			window.call.callMethodPageFinish();
		}else if(phoneType==2){
			callMethodPageFinish();
		}else{
			window.call.callMethodPageFinish();
		}
	}
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
})