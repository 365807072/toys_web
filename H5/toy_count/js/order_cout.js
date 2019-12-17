$(function(){
	var url = location.href;
	var userId="";
	var orderId="";
	var orderData="";
	var headhtml="";
	var tophtml="";
	var messData="";
	var messhtml="";
	var zonghtml="";
	var myScroll="";

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
			url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV77/getToysCardOrderDetail&login_user_id='+userId+'&order_id='+orderId,
			type:'GET',
			datatype:'JSON',
			success:function(data){

				var data=JSON.parse(data);
				orderData=data.data;
				messData=orderData.order_listing;
				console.log(orderData);
				// if(window.screen.width == 320){
					headhtml+='<img src="'+orderData.img_thumb+'"><a class="head_ID">'+orderData.card_id+'</a>';
					$(".head").html(headhtml);

					tophtml+='<ul><li><p><span><img src="'+orderData.tittle_five_img+'"></span><span>'+orderData.tittle_five+'</span><span>'+orderData.tittle_five_val+'</span></p></li><li><p><span><img src="'+orderData.tittle_four_img+'"></span><span>'+orderData.tittle_four+'</span><span>'+orderData.tittle_four_val+'</span></p></li><li><p><span><img src="'+orderData.tittle_one_img+'"></span><span>'+orderData.tittle_one+'</span><span>'+orderData.tittle_one_val+'</span></p></li><li><p><span><img src="'+orderData.tittle_two_img+'"></span><span>'+orderData.tittle_two+'</span><span>'+orderData.tittle_two_val+'</span></p></li><li><p><span><img src="'+orderData.tittle_three_img+'"></span><span>'+orderData.tittle_three+'</span><span>'+orderData.tittle_three_val+'</span></p></li></ul>';
					$(".top").html(tophtml);

					for(var i in messData){
						tophtml+='<div><img src="'+messData[i].img+'"></div>';
					}
					$(".top").html(tophtml);
				// }else{
				// 	alert(2)
				// 	headhtml+='<img src="'+orderData.img_thumb+'"><a class="head_ID">'+orderData.card_id+'</a>';
				// 	$(".head").html(headhtml);

				// 	zonghtml+='<p><span><img src="'+orderData.tittle_five_img+'"></span><span>'+orderData.tittle_five+'</span><span>'+orderData.tittle_five_val+'</span></p><p><span><img src="'+orderData.tittle_four_img+'"></span><span>'+orderData.tittle_four+'</span><span>'+orderData.tittle_four_val+'</span></p>';
				// 	$(".zong").html(zonghtml);

				// 	tophtml+='<ul><li><p><span><img src="'+orderData.tittle_one_img+'"></span><span>'+orderData.tittle_one+'</span><span>'+orderData.tittle_one_val+'</span></p></li><li><p><span><img src="'+orderData.tittle_two_img+'"></span><span>'+orderData.tittle_two+'</span><span>'+orderData.tittle_two_val+'</span></p></li><li><p><span><img src="'+orderData.tittle_three_img+'"></span><span>'+orderData.tittle_three+'</span><span>'+orderData.tittle_three_val+'</span></p></li></ul>';
				// 	$(".top").html(tophtml);

				// 	for(var i in messData){
				// 		tophtml+='<div><img src="'+messData[i].img+'"></div>';
				// 	}
				// 	$(".top").html(tophtml);
				// }
				

			},
			error:function(){
				wraphtml='<p class="cuowu">加载错误，点击重试</p>';
				$(".wrap").html(wraphtml);
			},
			complete:function(){
				$("#loading").hide();				
			}
		})
	}

	$(".wrap").on("click",".cuowu",function(){
		location.reload();
	})

	myScroll= new iScroll("wrapper");
	

})