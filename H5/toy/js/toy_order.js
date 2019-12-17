$(function(){
	var orderData="";
	var moneyhtml="";
	var orderStatus="";
	var boxhtml="";
	var isReset="";
	var postTime="";

	
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
				url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysOrderList&login_user_id=65937',
				type:'GET',
				datatype:'json',
				success:function(data){
					var Data=JSON.parse(data);
					orderData=Data.data;
					console.log(orderData)
					for(var i in orderData){
						orderStatus=orderData[i].order_status;
						isReset=orderData[i].is_reset;
						console.log(isReset);
						if(orderStatus==1){
							$(".money").show();
							var moneyData=orderData[0];
							moneyhtml='<p><span>'+moneyData.business_title+'</span><span>'+moneyData.sell_price+'</span></p>';
							$(".money").html(moneyhtml);
							
						}else{
							boxhtml+='<div class="content">';
							boxhtml+='<dl><dt><img src="'+orderData[i].img_thumb+'"></dt><dd><p><span>'+orderData[i].business_title+'</span><span>'+orderData[i].sell_price+'</span></p><p>'+orderData[i].status_name+'</p><p class="pp"><a class="remove">删除订单</a><a class="again">再租一次</a></p></dd></dl>';
							boxhtml+='</div>';
							if(isReset==0){
								$(".content dl dd .pp").hide();
							}
						}
					}
					$(".box").html(boxhtml);
					me.resetload();
				},
	            error: function(xhr, type){
	                me.resetload();
	            }
			})
	    },
	    loadDownFn : function(me){
	    	$.ajax({
				url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysOrderList&login_user_id=65937',
				type:'GET',
				datatype:'json',
				success:function(data){
					var Data=JSON.parse(data);
					orderData=Data.data;
					console.log(orderData)
					for(var i in orderData){
						orderStatus=orderData[i].order_status;
						isReset=orderData[i].is_reset;
						console.log(isReset);
						if(orderStatus==1){
							$(".money").show();
							var moneyData=orderData[0];
							moneyhtml='<p><span>'+moneyData.business_title+'</span><span>'+moneyData.sell_price+'</span></p>';
							$(".money").html(moneyhtml);
							
						}else{
							boxhtml+='<div class="content">';
							boxhtml+='<dl><dt><img src="'+orderData[i].img_thumb+'"></dt><dd><p><span>'+orderData[i].business_title+'</span><span>'+orderData[i].sell_price+'</span></p><p>'+orderData[i].status_name+'</p><p class="pp"><a class="remove">删除订单</a><a class="again">再租一次</a></p></dd></dl>';
							boxhtml+='</div>';
							if(isReset==0){
								$(".content dl dd .pp").hide();
							}
						}
					}
					$(".box").append(boxhtml);
					
				},
	            error: function(xhr, type){
	                me.resetload();
	            }
			})
	    },
	    threshold : 50
	});
	
			



$('.foot').on("tap",".pic",function(event){
	event.preventDefault();
	$(this).addClass('active').siblings('li').removeClass('active');
	window.location.href='http://www.meimei.yihaoss.top/H5/toy/toy.html';
})
$('.foot').on("tap",".pic1",function(event){
	event.preventDefault();
	$(this).addClass('active').siblings('li').removeClass('active');
	window.location.href='http://www.meimei.yihaoss.top/H5/toy/toy_all.html';
})
$('.foot ul').on("tap","li",".pic2",function(event){
	event.preventDefault();
	$(this).addClass('active').siblings('li').removeClass('active');
	window.location.href='http://www.meimei.yihaoss.top/H5/toy/toy_order.html';
})

})




























