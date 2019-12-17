$(function(){
	var Data="";
	var playData="";
	var postTime="";
	var businessId="";
	// var url = location.href;
	// url = url.substring(url.indexOf("?")+1).split("&");
	// var login_user_id = url[0].substring(url[0].indexOf("=")+1);
	// $.ajax({
	// 	url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysList&login_user_id='+login_user_id+'&is_order=0',
	// 	type:'GET',
	// 	datatype:'JSON',
	// 	success:function(data){
	// 		Data=JSON.parse(data);
	// 		playData=Data.data;
	// 		for(var i in playData){
	// 			boxhtml+='<div class="box" id='+playData[i].business_id+'>';
	// 			boxhtml+='<dl><dt><img src="'+playData[i].img_thumb+'"></dt><dd><p>'+playData[i].business_title+'</p><p><span><img src="'+playData[i].avatar+'"></span><span>'+playData[i].user_name+'</span></p><p>'+playData[i].support_name+'</p><p><span><img src="img/4.png"></span><span>'+playData[i].sell_price+'</span></p></dd></dl>';
	// 			boxhtml+='</div>';
	// 		}
	// 		$(".content").html(boxhtml);
	// 	}
	// })
	
	$('.main').dropload({
	    scrollArea : window,
	    domUp : {
	        domClass   : 'dropload-up',
	        domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
	        domUpdate  : '<div class="dropload-update">↑释放更新</div>',
	        domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中</div>'
	    },
	    domDown : {
	        domClass   : 'dropload-down',
	        domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
	        domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中</div>',
	        domNoData  : '<div class="dropload-noData">暂无数据</div>'
	    },
	    loadUpFn : function(me){
	    	$.ajax({
				url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysCategoryList&login_user_id=293969&is_order=0',
				type:'GET',
				datatype:'json',
				success:function(data){
					
					var boxhtml="";
					Data=JSON.parse(data);
					playData=Data.data;
					for(var i in playData){
						boxhtml+='<div class="box" id='+playData[i].business_id+'>';
						boxhtml+='<dl><dt><img src="'+playData[i].img_thumb+'"></dt><dd><p>'+playData[i].business_title+'</p><p><span><img src="'+playData[i].avatar+'"></span><span>'+playData[i].user_name+'</span></p><p>'+playData[i].support_name+'</p><p><span><img src="img/19.png"></span><span>'+playData[i].sell_price+'</span></p></dd></dl>';
						boxhtml+='</div>';
					}
					$(".content").html(boxhtml);
					me.resetload();
				},
	            error: function(xhr, type){
	                me.resetload();
	            }
			})
	    },
	    loadDownFn : function(me){
	    	$.ajax({
				url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysCategoryList&login_user_id=293969&is_order=0&post_create_time='+postTime,
				type:'GET',
				datatype:'josn',
				success:function(data){
					Data=JSON.parse(data);
					playData=Data.data;
					var boxhtml="";
					postTime=playData[playData.length-1].post_create_time;
					for(var i in playData){
						boxhtml+='<div class="box" id='+playData[i].business_id+'>';
						boxhtml+='<dl><dt><img src="'+playData[i].img_thumb+'"></dt><dd><p>'+playData[i].business_title+'</p><p><span><img src="'+playData[i].avatar+'"></span><span>'+playData[i].user_name+'</span></p><p>'+playData[i].support_name+'</p><p><span><img src="img/19.png"></span><span>'+playData[i].sell_price+'</span></p></dd></dl>';
						boxhtml+='</div>';
					}
					$(".content").append(boxhtml);
					me.resetload();
				},
	            error: function(xhr, type){
	                me.resetload();
	            }
			})
	    },
	    threshold : 50
	});

	// //跳入玩具详情
	// $(".content").on("click",".box",function(){
	// 	var businessId=$(this).attr("id");
	// 	window.location.href="http://www.meimei.yihaoss.top/fenxiang/play.html?business_id="+businessId+"&login_user_id="+login_user_id+"&title=邀请";
	// })

	// //右上角的邀请页面
	// $(".right").on("click",function(){
	// 	window.location.href="http://www.meimei.yihaoss.top/sms/invite.html?uid="+login_user_id+"&title=邀请";
	// })

	$('.foot').on("tap",".pic",function(event){
		event.preventDefault();
		$(this).addClass('active').siblings('li').removeClass('active');
		window.location.href='http://www.meimei.yihaoss.top/H5/toy/toy.html';
	})
	// $('.foot ul').on("tap","li",".pic1",function(event){
	// 	event.preventDefault();
	// 	$(this).addClass('active').siblings('li').removeClass('active');
	// 	window.location.href='http://www.meimei.yihaoss.top/H5/toy/toy_all.html';
	// })
	$('.foot').on("tap",".pic2",function(event){
		event.preventDefault();
		$(this).addClass('active').siblings('li').removeClass('active');
		window.location.href='http://www.meimei.yihaoss.top/H5/toy/toy_order.html';
	})
})