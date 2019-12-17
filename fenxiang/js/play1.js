$(function(){
	// var url = location.href;
	// url = url.substring(url.indexOf("?")+1).split("&");
	// var bussinessId = url[0].substring(url[0].indexOf("=")+1);
	// var userId = url[1].substring(url[1].indexOf("=")+1);
	// var invite = url[2].substring(url[2].indexOf("=")+1);
	function GetQueryString(name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if(r!=null)return  unescape(r[2]); return null;
	}
	if(GetQueryString("login_user_id")!=null && GetQueryString("login_user_id").length>-1){
    	userId=GetQueryString("login_user_id");
    }
    if(GetQueryString("business_id")!=null && GetQueryString("business_id").length>-1){
    	bussinessId=GetQueryString("business_id");
    }
	var headhtml="";
	var boxhtml="";
	var contenthtml="";
	var remarkshtml="";
	var decirtionhtml="";
	var texthtml="";
	var foothtml="";
	$.ajax({
		url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/toysDetail&business_id='+bussinessId+'&login_user_id='+userId,
		type:'GET',
		datatype:'json',
		success:function(data){
			var daTa=JSON.parse(data);
			var detailData=daTa.data.detail;
			var descriptionData=daTa.data.description;
			var priceData=daTa.data.price;
			
		

			//头部内容
			headhtml='<div class="head_top"><img src="'+detailData.img_thumb+'"></div><div class="head_bottom"><p class="head_p1">'+detailData.main_business_title+'</p><p class="head_p2"><span><img src="'+detailData.userIconUrl+'"></span><span>'+detailData.user_name+'</span></p></div>';
			$('.head').html(headhtml);

			//产品支持内容
			var aStr = detailData.support_des+"";//换行的内容
            aStr=aStr.replace(/\r\n/g,"<br>"); 
			boxhtml='<p><span><img src="img/4.png"></span><span>'+detailData.support_name+'</span></p><p>'+aStr+'</p>';
			$('.box').html(boxhtml);

			//联系方式
			texthtml='<p><span>联系方式</span><span><a>'+detailData.business_contact+'</a><a href="tel:'+detailData.business_contact+'"><img src="img/phone.png"></a></span></p>';
			contenthtml='<p><span>Q Q号码</span><span>'+detailData.qq+'</span></p><p><span>'+detailData.age_range+'</span><span>'+detailData.age+'</span></p><p><span>发布时间</span><span>'+detailData.create_time+'</span></p><p><span>最高赔损</span><span>'+detailData.sunpei+'</span></p><p><span>半径保障</span><span>'+detailData.baozhang+'</span></p>';
			$(".text").html(texthtml);
			$(".content").html(contenthtml);

			//产品备注
			remarkshtml='<p>'+detailData.sunpeihint+'</p><p><span>其他备注</span><span>'+detailData.addtext+'</span></p>';
			$(".remarks").html(remarkshtml);


			//产品描述
			decirtionhtml='<div class="pic">'+daTa.data.toys_description+'</div>';
			for(var i in descriptionData){
				var eStr = descriptionData[i].business_des+"";//换行的内容  
				console.log(eStr);
				 eStr=eStr.replace(/\r\n/g,"<br>"); 
				decirtionhtml+='<div class="conment_text">'+eStr+'</div>';
				var arr=descriptionData[i].img;
				for(var i in arr){
					console.log(arr[i].img);
					decirtionhtml+='<div class="conment"><img src="'+arr[i].img+'"></div>';
				}
			}
			$(".decirtion").html(decirtionhtml);

			//底部数据
			foothtml+='<span class="foot_left"><a>'+priceData.sell_price+'</a><a>'+priceData.market_price+'</a></span><span class="foot_right"><a href="http://www.meimei.yihaoss.top/download.php?from=singlemessage&isappinstalled=0">立即下载</a></span>';
			$(".foot").html(foothtml);
		}
	})

	$(".header").on("click",".left",function(){
		window.location.href="http://www.meimei.yihaoss.top/sms/invite.html";

	})
	// $(".header").on("click",".invert",function(){
	// 	window.location.href="http://mp.weixin.qq.com/s/wmEfhXalj3yC9lLdJkVNnw";

	// })
}) 