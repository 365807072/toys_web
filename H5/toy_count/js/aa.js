var url = location.href;
var contdata="";
var headhtml="";
var headTophtml="";
var headTopdata="";
var headprice="";
var canshuhtml="";
var miaoshudata="";
var miaoshuhtml="";
var tongleihtml="";
var tongleidata="";
var tongbothtml="";
var statues="";
var bottomData="";
var bottomhtml="";
var userId="";
var businessId="";
var wraphtml="";
var shown="";
var kuangdu="";
var newHeight="";
var newWidth="";
var newimgWidth="";
var newimgHeight="";
var boxHeight="";
var boxWidth="";

if(url.indexOf("?") > 0){
	if(GetQueryString("login_user_id")!=null && GetQueryString("login_user_id").length>-1){
		
		userId = GetQueryString("login_user_id")
	}
	if(GetQueryString("business_id")!=null && GetQueryString("business_id").length>-1){
		
		businessId = GetQueryString("business_id");
	}
}
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

request();

function request(){

	$.ajax({
		url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV77/toysDetail&login_user_id='+userId+'&business_id='+businessId,
		type:'GET',
		datatype:'JSON',
		async: true,
		success:function(data){
			$(".main").show();
			$("header").show();
			$("#loading").hide();
			var data=JSON.parse(data);
			console.log(data);
			contdata=data.data;
			statues=contdata.order_status_now;
			//头部图片
			headdata=contdata.detail.img_thumb;
			headhtml='<img src="'+headdata+'">';
			$(".head").html(headhtml);

			var _w = parseInt($(window).width());//获取浏览器的宽度
			$(".head img").each(function(i){
				var img = $(this);
				var realWidth;//真实的宽度

				var realHeight;//真实的高度
				//这里做下说明，$("<img/>")这里是创建一个临时的img标签，类似js创建一个new Image()对象！
				$("<img/>").attr("src", $(img).attr("src")).load(function() {
				/*
				如果要获取图片的真实的宽度和高度有三点必须注意
				1、需要创建一个image对象：如这里的$("<img/>")
				2、指定图片的src路径
				3、一定要在图片加载完成后执行如.load()函数里执行
				*/
					kuangdu=$(".head").height(); //获取盒子的宽度
					realWidth = this.width;
					realHeight = this.height;
					shown=realWidth/realHeight;
					//如果真实的宽度大于浏览器的宽度就按照100%显示
					if(shown>=2){
						newHeight =_w/realWidth*realHeight;
						$(img).css("width","100%").css("height",newHeight);
					}
					else{//如果小于浏览器的宽度按照原尺寸显示
						newWidth = kuangdu/realHeight*realWidth;
						$(img).css("width",newWidth).css("height",kuangdu);
					}
				});
			});

			//头部内容
			headTopdata=contdata.detail;
			headprice=contdata.price;
			if(headTopdata.size_img_thumb==""){
				if(headTopdata.is_high_toys==1){
					headTophtml+='<p>'+headTopdata.main_business_title+'</p><p>租金：<span style="margin-top:0.01rem;font-size:0.25rem">￥</span>'+headprice.sell_price+'<span>会员：<a style="font-size:0.25rem>￥</a>'+headprice.member_price+'</span></p><p>押金：<span>'+headprice.need_price+'</span><span>会员：'+headprice.member_need_price+'</span></p><p>服务：<span>'+headprice.service_price+'</span><span>会员：'+headprice.member_service_price+'</span></p><p>'+headprice.market_price+'</p><p><span>'+headTopdata.age_range+'</span><span>'+headTopdata.age+'</span></p><p><span>最高损赔：</span><span>￥'+headTopdata.sunpei+'</span><span>半径保障：</span><span>￥'+headTopdata.baozhang+'</span></p>';
				}else{
					headTophtml+='<p>'+headTopdata.main_business_title+'</p><p><span style="margin-top:0.01rem">￥</span>'+headprice.sell_price+'</p><p>'+headprice.market_price+'</p><p><span>'+headTopdata.age_range+'</span><span>'+headTopdata.age+'</span></p><p><span>最高损赔：</span><span>￥'+headTopdata.sunpei+'</span><span>半径保障：</span><span>￥'+headTopdata.baozhang+'</span></p>';
				}
			}else{
				if(headTopdata.is_high_toys==1){
					headTophtml+='<p>'+headTopdata.main_business_title+'</p><p>租金：<span style="margin-top:0.01rem;font-size:0.25rem">￥</span>'+headprice.sell_price+'<a><img src="'+headTopdata.size_img_thumb+'"></a><span>会员：<a style="font-size:0.25rem">￥</a>'+headTopdata.member_price+'</span></p><p>押金：<span>'+headTopdata.need_price+'</span><span>会员：'+headTopdata.member_need_price+'</span></p><p>服务：<span>'+headTopdata.service_price+'</span><span>会员：'+headTopdata.member_service_price+'</span></p><p>'+headprice.market_price+'</p><p><span>'+headTopdata.age_range+'</span><span>'+headTopdata.age+'</span></p><p><span>最高损赔：</span><span>￥'+headTopdata.sunpei+'</span><span>半径保障：</span><span>￥'+headTopdata.baozhang+'</span></p>';
				}else{
					headTophtml+='<p>'+headTopdata.main_business_title+'</p><p><span>￥</span>'+headprice.sell_price+'<a><img src="'+headTopdata.size_img_thumb+'"></a></p><p>'+headprice.market_price+'</p><p><span>'+headTopdata.age_range+'</span><span>'+headTopdata.age+'</span></p><p><span>最高损赔：</span><span>￥'+headTopdata.sunpei+'</span><span>半径保障：</span><span>￥'+headTopdata.baozhang+'</span></p>';
				}
			}
			
			$(".head_top").html(headTophtml);

			//玩具参数
			if(headTopdata.toys_parameter==""){
				$(".canshu").hide();
				
			}else{
				canshuhtml+='<p>'+headTopdata.toys_parameter+'</p><ul><li><span>'+headTopdata.business_brand_name+'</span><span>'+headTopdata.business_brand+'</span></li><li><span>'+headTopdata.business_weight_name+'</span><span>'+headTopdata.business_weight+'</span></li><li><span>'+headTopdata.business_size_name+'</span><span>'+headTopdata.business_size+'</span></li><li><span>'+headTopdata.battery_number_name+'</span><span>'+headTopdata.battery_number+'</span></li></ul>';
				$(".canshu").html(canshuhtml);
			}

			//玩具描述
			miaoshudata=contdata.description;
			if(miaoshudata==""){
				$(".miaoshu").hide();
			}else{
				miaoshuhtml+='<p>'+contdata.toys_description+'</p><p>'+contdata.toys_des+'</p>';
				miaoshuhtml+='<ul>';
				for(var i in miaoshudata){
					var miaoshuimgdata=miaoshudata[i].img;
					for(var j in miaoshuimgdata){
						miaoshuhtml+='<li><img src="'+miaoshuimgdata[j].img+'"></li>';
					}
				}
				miaoshuhtml+='</ul>';
				$(".miaoshu").html(miaoshuhtml);
			}
			

			//同类产品(状态判断)
			if(headTopdata.toys_calss==""){
				$(".tonglei").hide();
			}else{
				if(statues==2){
					tongleihtml+='<p class="tong">'+headTopdata.toys_calss+'</p>';
					tongleidata=contdata.toys_class_res;
					tongleihtml+='<ul><li class="nan" cardindex="'+tongleidata[0].business_id_class+'"><dl><dt><img src="'+tongleidata[0].business_pic_class+'"></dt><dd><p>'+tongleidata[0].business_title_class+'</p><p><span><a>￥</a><a>'+tongleidata[0].sell_price_class+'</a></span><span>'+tongleidata[0].market_price_class+'</span></p></dd></dl></li><li class="nan" cardindex="'+tongleidata[1].business_id_class+'"><dl><dt><img src="'+tongleidata[1].business_pic_class+'"></dt><dd><p>'+tongleidata[1].business_title_class+'</p><p><span><a>￥</a><a>'+tongleidata[1].sell_price_class+'</a></span><span>'+tongleidata[1].market_price_class+'</span></p></dd></dl></li></ul>';
					tongbothtml+='<ul><li class="nan" cardindex="'+tongleidata[2].business_id_class+'"><dl><dt><img src="'+tongleidata[2].business_pic_class+'"></dt><dd><p>'+tongleidata[2].business_title_class+'</p><p><span><a>￥</a><a>'+tongleidata[2].sell_price_class+'</a></span><span>'+tongleidata[2].market_price_class+'</span></p></dd></dl></li><li class="nan" cardindex="'+tongleidata[3].business_id_class+'"><dl><dt><img src="'+tongleidata[3].business_pic_class+'"></dt><dd><p>'+tongleidata[3].business_title_class+'</p><p><span><a>￥</a><a>'+tongleidata[3].sell_price_class+'</a></span><span>'+tongleidata[3].market_price_class+'</span></p></dd></dl></li></ul>';

					$(".tong_top").html(tongleihtml);
					$(".tong_bottom").html(tongbothtml);

					$(".tonglei img").each(function(i){
						var img = $(this);
						var imgWidth;//图片的宽度

						var imgHeight;//图片的高度
						//这里做下说明，$("<img/>")这里是创建一个临时的img标签，类似js创建一个new Image()对象！
						$("<img/>").attr("src", $(img).attr("src")).load(function() {
						/*
						如果要获取图片的真实的宽度和高度有三点必须注意
						1、需要创建一个image对象：如这里的$("<img/>")
						2、指定图片的src路径
						3、一定要在图片加载完成后执行如.load()函数里执行
						*/
							boxHeight=$(".tong_top ul li dt").height(); //获取盒子的高度
							console.log(boxHeight);
							boxWidth=$(".tong_top ul li").width(); //获取盒子的宽度
							console.log(boxWidth);
							imgWidth = this.width;
							imgHeight = this.height;
							shown=imgWidth/imgHeight;
							console.log(shown);
							//如果真实的宽度大于浏览器的宽度就按照100%显示
							if(shown>=2){
								newimgHeight =boxWidth/imgWidth*imgHeight;
								$(img).css("width",boxWidth).css("height",newimgHeight);
							}
							else{//如果小于浏览器的宽度按照原尺寸显示
								newimgWidth = boxHeight/imgHeight*imgWidth;
								$(img).css("width",newimgWidth).css("height",boxHeight);
							}
						});
					});

				}else{
					tongleihtml+='<p>您请稍等</p><ul><li><img src="img/3.png"></li></ul>'
					$(".tong_top").html(tongleihtml);
				}
			}
			

			//底部图片
			bottomData=contdata.xiaodu.img;
			for(var i in bottomData){
				bottomhtml+='<img src="'+bottomData[i].img+'">';
			}
			$(".foot_top").html(bottomhtml);
			// showBottom();
		},
		error:function(){
			$("header").show();
			$(".main").show();
			$("#loading").hide();
			wraphtml='<p class="cuowu">加载错误，点击重试</p>';
			$(".wrap").html(wraphtml);
			// showBottom();//通知客服端显示底部按钮
		}

	})
}

// $(".tong_top").on("click",".nan",function(){
// 	businessId=$(this).attr("cardindex");
// 	if(phoneType==1){
// 		window.call.callMethodToToysDetail(businessId);
// 	}else if(phoneType==2){
// 		callMethodToToysDetail(businessId);
// 	}else{
// 		window.call.callMethodToToysDetail(businessId);
// 	}
// })
// $(".tong_bottom").on("click",".nan",function(){
// 	businessId=$(this).attr("cardindex");
// 	if(phoneType==1){
// 		window.call.callMethodToToysDetail(businessId);
// 	}else if(phoneType==2){
// 		callMethodToToysDetail(businessId);
// 	}else{
// 		window.call.callMethodToToysDetail(businessId);
// 	}
// })


// $(".wrap").on("click",".cuowu",function(){

// 	location.reload();
// })
// function showBottom(){
// 	if(phoneType==1){
// 		window.call.callMethodPageFinish();
// 	}else if(phoneType==2){
// 		callMethodPageFinish();
// 	}else{
// 		window.call.callMethodPageFinish();
// 	}
// }
// window.onload=function getSystemType() {
// 	var u = navigator.userAgent;
// 	if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
// 		phoneType = 1;
// 	} else if (u.indexOf('iPhone') > -1) {//苹果手机
// 		phoneType = 2;
// 	} else if (u.indexOf('Windows Phone') > -1) {//winphone手机
// 		phoneType = 3;
// 	}else{
// 		phoneType = 4;
// 	}
// }