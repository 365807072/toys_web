
var payStates="";
var url = location.href;
var order_Id="";
var login_userId="";
login_userId = url.substring(url.indexOf("=")+1);
var isfenye = false;//判断是否分页
var ahtml = "";//列表内容
var lastpost_create_time="";
var openid="";
openid=url[1].substring(url[1].indexOf("=")+1);

// 请求数据函数
function requeryst(opt,callback){
	$.ajax({
		url : opt.url,
		type : opt.type,
		data : opt.data,
		success : function(data){
			var result = JSON.parse(data);
			console.log(data);
			if(result.success){
				callback(result.data);
			}
		}
	})
}
//console.log(requeryst);

//读取接口的函数
var readList = function(ops){
	$.ajax({
		url : ops.url,
		type : ops.type,
		data : ops.data,
		success : function(data){
			ops.callback && ops.callback(data);
		}
	})
}

readList({
	url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/UserOrderListV1',
	type:'GET',
	data:{login_user_id:login_userId},
	callback:function(data){
		
		//读取商家列表
		readBussinessList(function(){
			htmlContent();
		});
	}
});

var readBussinessList = function(cb){//style追加方式

	var ajaxData = "";
	//判断是否分页
	//console.log(isfenye);
	if(isfenye == true){
		ajaxData = {login_user_id:login_userId,post_create_time:lastpost_create_time};
		
		//aooendContent();
	}else{
		ajaxData = {login_user_id:login_userId};
		//htmlContent();
	}
	readList({
		url:"http://api.baobaoshowshow.com/index.php?r=BabyShowV1/UserOrderListV1",
		type:'GET',
		data:ajaxData,
		callback:function(data){
			
				isfenye = true;
				arr = JSON.parse(data).data;
				
				if(arr.length==0){
					$(".picUrl").show();
				}else{
					$(".picUrl").hide();
				}
				ahtml = "";
				lastpost_create_time = arr[arr.length-1].post_create_time;
				for(var i in arr){
					payStates=arr[i].status;
					var typeName="";
					if(payStates==1){
						typeName="未消费";
					}else if(payStates==2){
						typeName="未支付";
					}
					else if(payStates==3){
						typeName="已完成";
					}
					else if(payStates==4){
						typeName="退款中";
					}
					else if(payStates==5){
						typeName="已退款";
					}
					else if(payStates==6){
						typeName="上门付款";
					}
					ahtml+="<li class='box3' id="+arr[i].order_id+">";
					ahtml+="<p class='title'><span><img src='img/dd_6.png'></span><span>"+arr[i].business_title+"</span></p><div class='box4'><div class='left'><p>订单号:<span>"+arr[i].order_num+"</span></p><p>验证码:<span>"+arr[i].verification+"</span></p></div><div class='right'><p class='pstate'>"+typeName+"</p><p><span>"+arr[i].package_name+"</span><span>"+arr[i].price+"</span></p></div></div>";
					ahtml+="</li>";
				}
				
				//cb && cb();
				if(isfenye == true){
					//ajaxData = {login_user_id:login_user_id,post_create_time:lastpost_create_time};
					aooendContent();
				}else{
					//ajaxData = {login_user_id:login_user_id};
					htmlContent();
				}
		}
	});
	
}

//html方法
function htmlContent(){

	$(".box2").html(ahtml);
}
//append 方法
function aooendContent(){

	$(".box2").append(ahtml);
}

var pullUpAction = function(){
	
	readBussinessList(function(){
		aooendContent();
	});

}

//iscroll滚动
var iscroll = null;
var iscrollTimer=null;
var iscrolling = function(){

	iscroll = new iScroll("wrapper",{
		onScrollEnd: function (e) { 
            //如果滑动到底部，则加载更多数据（距离最底部10px高度）.
            alert(this.maxScrollY);
            if ( this.y <= this.maxScrollY) { 
            	if(!!$(".box").hasClass("upLoad")){
            		$(".box").removeClass("upLoad");
					pullUpAction(); 
            	}else{
            		$(".box").addClass("upLoad");
            	}         
                 
            } 
            iscroll.refresh(); 
        }  
	});
}
window.onload = function(){
	console.log("end");
	clearTimeout(iscrollTimer);
	iscrollTimer = setTimeout(function(){
		iscrolling();
	},10);
}

$("footer ul").on("tap",".study",function(){

	window.location.href="http://www.meimei.yihaoss.top/business/business_list.html?login_user_id="+login_userId;
});	
$("footer ul").on("tap",".order",function(){

	window.location.href="http://www.meimei.yihaoss.top/business/order.html?login_user_id="+login_userId+"&open_id="+openid;
});
$(".box2").on("tap",".box3",function(){
	order_Id=$(this).attr("id");
	window.location.href="http://www.meimei.yihaoss.top/Test/order_cont.html?order_id="+order_Id+"&login_user_id="+login_userId+"&open_id="+openid;
})




 




































