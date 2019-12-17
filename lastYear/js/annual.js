var swiperWrapper = document.querySelector(".swiper-wrapper");
var swiperSlide = document.querySelectorAll(".swiper-slide");
var url = location.href;
var userId = '';
var share = '';

if(url.indexOf("?") > 0){
	if(GetQueryString("login_user_id")!=null && GetQueryString("login_user_id").length>-1){
		
		userId = GetQueryString("login_user_id");
	}
	if(GetQueryString("share")!=null && GetQueryString("share").length>-1){
		
		share = GetQueryString("share");

	}
}
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

action();
function action(){
	$(".dong").hide();
    $(".wrap").show();
	var mySwiper = new Swiper('.swiper-container', {
		direction : '',
		initialSlide : 0,
		speed:800,
		followFinger : false,
		touchRatio : 0.1,
		resistanceRatio : 0,
		onSlideChangeStart:function(swiper){
			console.log(swiper.activeIndex);

			if(swiper.activeIndex === 0){
				
				first();
			}
			if(swiper.activeIndex === 1){
				
				second();
			}
			if(swiper.activeIndex === 2){
				
				third();
			}
			if(swiper.activeIndex === 3){
				
				forth();
			}
			if(swiper.activeIndex === 4){
				console.log(swiper.activeIndex)
				fifth();
			}
		},
		onSlideChangeEnd: function(swiper){

			swiperSlide[swiper.previousIndex].style.transform = "translateY(0px) scale(1)";
			swiperSlide[swiper.previousIndex].style.webkitFilter = "brightness(1)"
	    },
		nextButton:'.up',
		noSwiping : true
	})
	$(".share").click(function(){
		mySwiper.slideTo(4); 
	})

	$(".pp9").click(function(){
		mySwiper.slideTo(1); 
	})
		
}
document.addEventListener('DOMContentLoaded', function () {
    function audioAutoPlay() {
        var audio = document.getElementById('audio');
            audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            audio.play();
        }, false);
    }
    audioAutoPlay();
});
document.addEventListener('touchstart', function () {
    function audioAutoPlay() {
        var audio = document.getElementById('audio');
            audio.play();
    }
    audioAutoPlay();
});

//----------------------------------------------------------------------第二屏-------
first ();
function first (){
 	$.ajax({
 		url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV7/GetUserInfoOne&login_user_id='+userId,
 		type:'GET',
 		datatype:'JSON',
 		success:function(res){
 			var data=JSON.parse(res);
 			console.log(data);
 			var firstData = data.data;
 			var dotHtml = '';
 			var nameHtml = '';

 			if(firstData.is_member==1){
 				dotHtml +='<img src="'+firstData.avatar+'">';
	 			$(".dot").html(dotHtml);
	 			nameHtml += firstData.nick_name;
	 			$(".username").html(nameHtml);
 			}else if(firstData.is_member==0){
 				dotHtml +='<img src="'+firstData.avatar+'">';
	 			$(".dot").html(dotHtml);
	 			nameHtml += '还未租,了解情况';
	 			$(".username").html(nameHtml);
 			}else{
 				dotHtml +='<img src="'+firstData.avatar+'">';
	 			$(".dot").html(dotHtml);
	 			nameHtml += '还未租,了解情况';
	 			$(".username").html(nameHtml);
 			}

 			
 		}
 	})
}

//----------------------------------------------------------------------第二屏-------
var html = document.documentElement;
var width = html.getBoundingClientRect().width;
var fs = width/16;
tl = new TimelineMax();
var onoff = true;
var timeBoxSpan = document.querySelectorAll(".toyPic");
function second (){

	if(onoff){
 		tl.set( timeBoxSpan,{className:"toyPic"} )
		tl.staggerFrom(".toyPic",1,{
			y:-6*fs,
			ease:Elastic.easeOut,
			delay:0.5
		})

		tl.staggerTo(".chuo",0.1,{
			x:-7*fs,
			ease:Linear.easeIn,
			delay:0.5
		})

		tl.staggerTo(".service",0.9,{
			x:11*fs,
			ease:Linear.easeIn,
			delay:0.5
		})

		tl.staggerTo(".num",1.1,{
			x:13.3*fs,
			ease:Linear.easeIn,
			delay:0.5
		})

		
		onoff = false;
 	}else{

 		tl.restart();
 	}
	$.ajax({
		url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV7/GetUserInfoTwo&login_user_id='+userId,
		type:'GET',
		datatype:'JSON',
		success:function(res){
			var data=JSON.parse(res);
			console.log(data);
			var secondData = "";
			var toyPicHtml = "";
			var timeNumHtml = '';
			var toyNumHtml = '';
			var moneyHtml = '';
			var longTimeHtml = '';
			var serviceHtml = '';
			secondData = data.data;

			if(secondData.is_member==1){

				longTimeHtml += '<span style="display: block;">我在舜鑫国际旅游（北京）有限公司租赁</span>玩的<a><img src="img/time.png"></a>的玩具';
				$(".longTime").html(longTimeHtml);

				serviceHtml += '<span style="display: block;">我在舜鑫国际旅游（北京）有限公司租赁</span>享受的服务';
				$(".service").html(serviceHtml);

				toyPicHtml +='<img src="'+secondData.business_img+'">';
				$(".toyPic").html(toyPicHtml);
				timeNumHtml += '<span>服务次数</span><span><a>'+secondData.used_num+'</a>次</span>';
				$(".timeNum").html(timeNumHtml);
				toyNumHtml +='<span>玩具数量</span><span><a>'+secondData.business_num+'</a>个</span>';
				$(".toyNum").html(toyNumHtml);
				moneyHtml +='<span>曾经赔付</span><span><a style="letter-spacing:0;">'+secondData.price+'</a></span>';
				$(".money").html(moneyHtml);

			}else if(secondData.is_member==0){
				longTimeHtml += '<span style="display: block;">会员在舜鑫国际旅游（北京）有限公司租赁</span>玩的<a><img src="img/time.png"></a>的玩具';
				$(".longTime").html(longTimeHtml);

				serviceHtml += '<span style="display: block;">会员在舜鑫国际旅游（北京）有限公司租赁</span>享受的服务(平均)';
				$(".service").html(serviceHtml);

				toyPicHtml +='<img src="'+secondData.business_img+'">';
				$(".toyPic").html(toyPicHtml);
				timeNumHtml += '<span>服务次数</span><span><a>14</a>次</span>';
				$(".timeNum").html(timeNumHtml);
				toyNumHtml +='<span>玩具数量</span><span><a>25</a>个</span>';
				$(".toyNum").html(toyNumHtml);
				moneyHtml +='<span>曾经赔付</span><span><a style="letter-spacing:0;">￥0</a></span>';
				$(".money").html(moneyHtml);
			}else{
				longTimeHtml += '<span style="display: block;">会员在舜鑫国际旅游（北京）有限公司租赁</span>玩的<a><img src="img/time.png"></a>的玩具';
				$(".longTime").html(longTimeHtml);

				serviceHtml += '<span style="display: block;">会员在舜鑫国际旅游（北京）有限公司租赁</span>享受的服务(平均)';
				$(".service").html(serviceHtml);

				toyPicHtml +='<img src="'+secondData.business_img+'">';
				$(".toyPic").html(toyPicHtml);
				timeNumHtml += '<span>服务次数</span><span><a>14</a>次</span>';
				$(".timeNum").html(timeNumHtml);
				toyNumHtml +='<span>玩具数量</span><span><a>25</a>个</span>';
				$(".toyNum").html(toyNumHtml);
				moneyHtml +='<span>曾经赔付</span><span><a style="letter-spacing:0;">￥0</a></span>';
				$(".money").html(moneyHtml);
			}

		}
	})
}

//----------------------------------------------------------------------第三屏-------
var work = document.querySelector(".work");
var tl3 = new TimelineMax();
var onoff3 = true;
function third () {

	if(onoff3){
		tl3.staggerTo(".knTop",1.1,{
			y:8*fs,
			ease:Linear.easeIn
		},"+=.2")

		tl3.staggerTo(".price1",1.8,{
			x:-8*fs,
			ease:Linear.easeIn
		},"-=.1")

		tl3.staggerTo(".knTop2",0.9,{
			y:13*fs,
			ease:Linear.easeIn
		},"-=.2")

		tl3.staggerTo(".price2",1.8,{
			x:-8*fs,
			ease:Linear.easeIn
		},"-=.1")

		tl3.staggerTo(".ssq",0.7,{
			y:18*fs,
			ease:Linear.easeIn
		},"-=.1")

		tl3.staggerTo(".price3",1.9,{
			x:-8*fs,
			ease:Linear.easeIn
		},"-=.1")

		tl3.staggerTo(".qq",0.4,{
			x:10*fs,
			ease:Linear.easeIn
		},"-=.1")

		tl3.staggerTo(".sq",0.4,{
			x:10*fs,
			ease:Linear.easeIn
		},"-=.1")

		
		tl3.from( ".work img",0.9,{
			y:13*fs,ease: Elastic.easeOut,
			delay:0.5
		})
		
		onoff3 = false;
	}else{
		tl3.restart();
	}
	
	$.ajax({
		url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV7/GetUserInfoThree&login_user_id='+userId,
		type:'GET',
		datatype:'JSON',
		success:function(res){
			var data = JSON.parse(res);
			console.log(data);
			var thirdData = data.data;
			var price1Html = '';
			var price2Html = '';
			var price3Html = '';
			var knTopHtml = '';
			var knTop2Html = '';
			var ssqHtml = '';
			var sqHtml = '';

			if(thirdData.is_member==1){

				knTopHtml += '<p>我不知道的事：</p><p>我在这段时间租的玩具</p><p>如果购买需要:</p>';
				$(".knTop").html(knTopHtml);

				knTop2Html += '<p>我在这段时间租的玩具</p><p>如果网上租赁:</p>';
				$(".knTop2").html(knTop2Html);

				ssqHtml += '<p>我在舜鑫国际旅游（北京）有限公司租赁</p><p>租玩具至少省了</p>';
				$(".ssq").html(ssqHtml);

				sqHtml +='<p>恭喜您</p><p>获得了省钱达人的称号：</p>';
				$(".sq").html(sqHtml);

				price1Html += '￥'+thirdData.buy_price;
				$(".price1").html(price1Html);
				price2Html += '￥'+thirdData.net_price;
				$(".price2").html(price2Html);
				price3Html += '￥'+thirdData.baby_price;
				$(".price3").html(price3Html);

				var processbar = document.getElementById("processbar");  
				processbar.style.width = parseInt(thirdData.ranking_point) + "%";
	   			var progressvalHtml="";
	   			var aa = parseInt(thirdData.ranking_point)+"%";
	   			progressvalHtml+='悄悄告诉您，超过了<b class="progress-value">'+aa+'</b>的用户';
	   			$(".progress-value").html(progressvalHtml);

	   			if(thirdData.ranking_point<50){
	   				$(".gx").hide();
	   			}
			}else if(thirdData.is_member==0){
				knTopHtml += '<p>我不知道的事：</p><p>会员这段时间租的玩具</p><p>如果购买平均需要:</p>';
				$(".knTop").html(knTopHtml);

				knTop2Html += '<p>会员这段时间租的玩具</p><p>如果网上租赁平均:</p>';
				$(".knTop2").html(knTop2Html);

				ssqHtml += '<p>会员在舜鑫国际旅游（北京）有限公司租赁</p><p>租玩具平均至少省了</p>';
				$(".ssq").html(ssqHtml);

				sqHtml +='<p>恭喜您</p><p>将获得省钱达人的称号：</p>';
				$(".sq").html(sqHtml);

				price1Html += '￥5746';
				$(".price1").html(price1Html);
				price2Html += '￥2431';
				$(".price2").html(price2Html);
				price3Html += '￥1982';
				$(".price3").html(price3Html);

				var processbar = document.getElementById("processbar");  
				processbar.style.width =71+"%";
	   			var progressvalHtml="";
	   			var aa = 71+"%";
	   			progressvalHtml+='悄悄告诉您，超过了<b class="progress-value">'+aa+'</b>的用户';
	   			$(".progress-value").html(progressvalHtml);

				$(".gx").hide();
				
			}else{
				knTopHtml += '<p>我不知道的事：</p><p>会员这段时间租的玩具</p><p>如果购买平均需要:</p>';
				$(".knTop").html(knTopHtml);

				knTop2Html += '<p>会员这段时间租的玩具</p><p>如果网上租赁平均:</p>';
				$(".knTop2").html(knTop2Html);

				ssqHtml += '<p>会员在舜鑫国际旅游（北京）有限公司租赁</p><p>租玩具平均至少省了</p>';
				$(".ssq").html(ssqHtml);

				sqHtml +='<p>恭喜您</p><p>将获得省钱达人的称号：</p>';
				$(".sq").html(sqHtml);

				price1Html += '￥5200';
				$(".price1").html(price1Html);
				price2Html += '￥2888';
				$(".price2").html(price2Html);
				price3Html += '￥1982';
				$(".price3").html(price3Html);

				var processbar = document.getElementById("processbar");  
				processbar.style.width = 71 + "%";
	   			var progressvalHtml="";
	   			var aa = 71+"%";
	   			progressvalHtml+='悄悄告诉您，超过了<b class="progress-value">'+aa+'</b>的用户';
	   			$(".progress-value").html(progressvalHtml);
	   			$(".gx").hide();
			}

		}
	})
}

//----------------------------------------------------------------------第四屏-------

var tl4 = new TimelineMax();
var onoff4 = true;

function forth () {
	if(onoff4){
		
		tl4.staggerTo(".memeber",0.9,{
			x:1.7*fs,
			ease:Linear.easeIn
		},"+=.2")

		tl4.staggerTo(".gl",1.4,{
			y:-8.2*fs,
			ease:Linear.easeIn
		},"+=.2")
		onoff4 = false;
		
	}else{
		tl4.restart();
	}

	$.ajax({
		url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV7/GetUserInfoFour&login_user_id='+userId,
		type:'GET',
		datatype:'JSON',
		success:function(res){
			var data = JSON.parse(res);
			console.log(data);
			var forthData = '';
			forthData = data.data;
			var luHtml = '';
			var memNumHtml = '';
			var glHtml = '';
			
			if(forthData.is_member==1){

				memNumHtml+='您是舜鑫国际旅游（北京）有限公司租赁玩具的<span>'+forthData.number+'</span>个会员';
				$(".memNum").html(memNumHtml);

				luHtml += forthData.title;
				$(".lu").html(luHtml);

				glHtml += '1公里内有<span>'+forthData.howmuch+'</span>人在使用舜鑫国际旅游（北京）有限公司租赁玩具';
				$(".gl").html(glHtml);

			}else if(forthData.is_member==0){
				memNumHtml+='您加入，将会是舜鑫国际旅游（北京）有限公司租赁玩具的第<span>'+forthData.number+'</span>个会员';
				$(".memNum").html(memNumHtml);

				luHtml += forthData.title;
				$(".lu").html(luHtml);

				glHtml += '1公里内有<span>'+forthData.howmuch+'</span>人在使用舜鑫国际旅游（北京）有限公司租赁玩具';
				$(".gl").html(glHtml);
			}else if(forthData.is_member==2){
				memNumHtml+='我是舜鑫国际旅游（北京）有限公司租赁玩具<span>'+forthData.number+'</span>个会员';
				$(".memNum").html(memNumHtml);

				luHtml += forthData.title;
				$(".lu").html(luHtml);

				glHtml += '1公里内有<span>'+forthData.howmuch+'</span>人在使用舜鑫国际旅游（北京）有限公司租赁玩具';
				$(".gl").html(glHtml);
			}
		}
	})
}

var tl5 = new TimelineMax();
var onoff5 = true;
var phoneNum = '';

function fifth () {
	window.location.href="http://www.meimei.yihaoss.top/H5/lastYear/annual_cout.html?login_user_id="+userId;
}

