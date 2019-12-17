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
var orderId="";
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
	if(GetQueryString("order_id")!=null && GetQueryString("order_id").length>-1){
		
		orderId = GetQueryString("order_id");
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
		url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV77/getToysOrderDetailCompensation&login_user_id='+userId+'&order_id='+orderId,
		type:'GET',
		datatype:'json',
		success:function(data){
			$(".main").show();
			$("header").show();
			$("#loading").hide();
			var data = JSON.parse(data);
			console.log(data);
			contdata=data.data;
			//头部图片
			headdata=contdata.img_thumb;
			headhtml='<img src="'+headdata+'">';
			$(".head").html(headhtml);


			//比例展示图片
			var _w = parseInt($(window).width());//获取浏览器的宽度
			$(".head img").each(function(i){
				var img = $(this);
				var realWidth;//真实的宽度

				var realHeight;//真实的高度
				$("<img/>").attr("src", $(img).attr("src")).load(function() {
				
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

			var headtopHtml = '';
			headtopHtml += '<p>'+contdata.business_title+'</p>';
			$(".head_top").html(headtopHtml);

			var songHtml = '';
			for(var i in contdata.order_listing){
				var lisr = contdata.order_listing;
				songHtml +='<p>'+lisr[i].business_des+'</p>';
				for(var j in lisr[i].business_pic){
					var pics = lisr[i].business_pic;
					songHtml +='<img src="'+pics[j]+'">';
				}
			}
			$(".song").html(songHtml);
			
			var peiHtml = '';
			for(var a in contdata.orderinfo){
				var info = contdata.orderinfo;
				peiHtml += '<p><span>'+info[a].order_title+'</span><span>'+info[a].order_value+'</span></p>';
			}
			$(".pei").html(peiHtml);
			


		}
	})
}

	
	

