// 地图
var mapsign = null;
var num = 0;
var isPosition = false;
var business = {};//商家列表的接口
var issearch=false;
var isSearch=false;
var istab = false;
var num=0;
var time="";
var city_id="";
var isClear=false;
var openid="";
/*之前写的*/

// 请求数据函数
function requeryst(opt,callback){
	$.ajax({
		url : opt.url,
		type : opt.type,
		data : opt.data,
		success : function(data){
			var result = JSON.parse(data);
			if(result.success){
				callback(result.data);
			}
		}
	})
}

function pages(screen_Data,cb){
	
	var screenhtml="";
	$(".l_content").html(screenhtml);
	iscroll.refresh();
	for(var i in screen_Data){
		var scrData=screen_Data[i].img;
		screenhtml+="<li class='center' id="+scrData.business_id+">";
		screenhtml+="<dl><dt><img src="+scrData.business_pic+"></dt><dd><p><span>"+
					scrData.business_title+"</span><span>"+
					scrData.distance+"</span></p><p>"+
					scrData.subtitle+"</p><p><a>￥<b>"+
					scrData.business_babyshow_price1+"</b></a><strike>￥<b>"+
					scrData.business_market_price1+"</b></strike><a><b>"+
					scrData.order_count+"</b>人购买</a></p></dd></dl>";
		screenhtml+="</li>";
	}
		$(".l_content").html(screenhtml);
		iscroll.refresh();
		
}
/*之前写的*/
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
//判断用户是否登陆
var storage = window.localStorage;
var login_user_id = "";//用户id
var lastpost_create_time = "";//后台的分页值

var loginType=storage.getItem("login_type");//是否登陆
openid=storage.getItem("open_id");
//读取商家列表的函数

var isfenye = false;//判断是否分页
var screenhtml = "";//列表内容
var readBussinessList = function(cb){//style追加方式
	
	var ajaxData = "";
	//判断是否分页
	
	if(isfenye){
		
		if(issearch){
			if(isSearch){
				ajaxData = {login_user_id:login_user_id,source:1,business_category:num,city_id : city_id};
			}else{
				ajaxData = {login_user_id:login_user_id,post_create_time:time,source:1,business_category:num,city_id : city_id};
			}
			
		}else{
			if(isSearch){
				ajaxData = {login_user_id:login_user_id,post_create_time:time,source:1,business_category:num};
			}else{
				ajaxData = {login_user_id:login_user_id,post_create_time:time,source:1,business_category:num};
			}
			
		}
		//aooendContent();
	}else{
		
		if(issearch){
			
			ajaxData = {login_user_id:login_user_id,source:1,business_category:num,city_id:city_id};
		}else{
			
			ajaxData = {login_user_id:login_user_id,source:1,business_category:num};
		}
	}
	readList({
		url:"http://api.baobaoshowshow.com/index.php?r=BabyShowV1/GetBusinessListV3",
		type:'GET',
		data:ajaxData,
		callback:function(data){
			if(issearch==false){
				screenhtml = "";
				if(istab){
					htmlContent();
				}
				data = JSON.parse(data).data;
				if(data.length!=0){	
					var slast = data[data.length-1].img;
					time = slast.post_create_time;
					for(var i in data){

						var scrData=data[i].img;
						screenhtml+="<li class='center' id="+scrData.business_id+">";
						screenhtml+="<dl><dt><img src="+scrData.business_pic+"></dt><dd><p><span>"+
									scrData.business_title+"</span><span>"+
									scrData.distance+"</span></p><p>"+
									scrData.subtitle+"</p><p><a>￥<b>"+
									scrData.business_babyshow_price1+"</b></a><strike>￥<b>"+
									scrData.business_market_price1+"</b></strike><a><b>"+
									scrData.order_count+"</b>人购买</a></p></dd></dl>";
						screenhtml+="</li>";
					}
					//cb && cb();
					if(istab){

						htmlContent();
						istab = false;
					}else{
						if(isfenye == true){
							aooendContent();
						}else{
							htmlContent();
						}
					}
				}
				
			}else{
				if(isClear){
					screenhtml = "";
					htmlContent();
					isClear=false;
				}
					
			
				
				data = JSON.parse(data).data;
				
				if(data.length!=0){
					
					var slast = data[data.length-1].img;
					time = slast.post_create_time;
					console.log(time);
					for(var i in data){
						var scrData=data[i].img;
						screenhtml+="<li class='center' id="+scrData.business_id+">";
						screenhtml+="<dl><dt><img src="+scrData.business_pic+"></dt><dd><p><span>"+
									scrData.business_title+"</span><span>"+
									scrData.distance+"</span></p><p>"+
									scrData.subtitle+"</p><p><a>￥<b>"+
									scrData.business_babyshow_price1+"</b></a><strike>￥<b>"+
									scrData.business_market_price1+"</b></strike><a><b>"+
									scrData.order_count+"</b>人购买</a></p></dd></dl>";
						screenhtml+="</li>";
					}
					//cb && cb();
					
					if(isfenye == true){
						
						aooendContent();
					}else{
						
						htmlContent();
					}
				}
			
			}
			
		}
	});
	
}
//html方法
function htmlContent(){

	$(".l_content").html(screenhtml);
}
//append 方法
function aooendContent(){

	$(".l_content").append(screenhtml);
}
//第一次进入页面调用
readList({
	url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/VisitorRegist',
	type:'POST',
	data:{source:1},
	callback:function(data){
		var data = JSON.parse(data);
		if(loginType==2){//已经登陆时
			login_user_id = storage.getItem("login_user_id");

		}else{//游客进入时
			login_user_id = data.data.user_id;
		}
		
		//读取商家列表
		readBussinessList(function(){
			htmlContent();
		});
	}
});

//iscroll 加载更多调用
var pullUpAction = function(){
		isfenye=true;
	readBussinessList();

}

//iscroll滚动
var iscroll = null;
var iscrollTimer=null;
var iscrolling = function(){
	
		iscroll = new iScroll("wrapper",{
			onScrollEnd: function (e) { 
	            //如果滑动到底部，则加载更多数据（距离最底部10px高度）.
	            //console.log(this.maxScrollY);
	            if(String($("#val_s").val())==""){
	            	
		            if ( this.y <= this.maxScrollY) { 
		            	if(!!$(".wrap").hasClass("upLoad")){
		            		$(".wrap").removeClass("upLoad");
							pullUpAction(); 
		            	}else{
		            		$(".wrap").addClass("upLoad");
		            	}         
		                 
		            } 
	            	iscroll.refresh(); 
	           } 
	        }  
		});
	
}
window.onload = function(){
	clearTimeout(iscrollTimer);
	iscrollTimer = setTimeout(function(){
		iscrolling();
	},10);
}

var isHiden = true; /*控制切换菜单*/ 

$('#head #sx').click(function(){ //点击筛选

	    if(isHiden){
	        $('.screen').animate({top:'1rem'});//菜单块向下移动 
	        $(".overmask").show();
	        $(this).html("收起");
	        isHiden = false;
	    }else{  
	        $('.screen').animate({top:'-7.3rem'}); //菜单块向上移动  
	        $(".overmask").hide();
	        $(this).html("筛选");
	        issearch=false;
	        isHiden=true;
	    }  
	     
	    $.ajax({
			url:"http://api.baobaoshowshow.com/index.php?r=BabyShow/BusinessCityList&login_user_id="+login_user_id,
			datatype:"json",
			type:"GET",
			success:function(d){
				var UlId = $(this).attr("data-index");
				var d = JSON.parse(d);
				var arr3=d.data;
				var ehtml="";
				var busuList = {
					url : 'http://api.baobaoshowshow.com/index.php?r=BabyShow/BusinessCityList',
					type : 'GET',
					data : {
						'login_user_id' : login_user_id,
						'UlId' : UlId
					}
				}
				ehtml="<ul>";
				for(var i in arr3){
					ehtml+="<li data-index='"+arr3[i].id+"'>"+arr3[i].city_name+"</li>";	
				}
				ehtml+="<ul>";
				$(".s_left").html(ehtml);

					var fdata;
				$(".s_left ul li").on("click", function() {//点击左侧列表
					//alert("11");
					var $this = $(this);
					if(!fdata) {
						requeryst(busuList,function(fdata){
							dataList(fdata, $this);
						})
					} else {
						dataList(fdata,$this);
					}									
					$(this).addClass('bgc').siblings('li').removeClass('bgc');
				})


				function dataList(data,$this){//获取右侧列表
					var fhtml="";
					fhtml="<ol>";
					if($this.attr('data-index') != 0){
						for(var i in data){
							if($this.attr('data-index') == data[i].id){
								for(var j in data[i].children){
									fhtml+="<li data-index='"+data[i].children[j].id+"'>"+data[i].children[j].city_name+"</li>";
								}
							}
						}
					}else{
						for(var i in data){
							for(var j in data[i].children){
								fhtml+="<li data-index='"+data[i].children[j].id+"'>"+data[i].children[j].city_name+"</li>";
							}
						}
					}
					fhtml+="</ol>";	
					$(".s_right").html(fhtml);

					$(".s_right ol li").on("click",function(){
						
						issearch=true; 
						isfenye=false;
						isClear=true;
						$("#val_s").attr("value","");
						city_id = $(this).attr('data-index');
						screenhtml="";
						htmlContent();
						readBussinessList();
						$(".overmask").hide();
						$('.screen').animate({top:'-8rem'});
						$('#head #sx').html("筛选"); //菜单块向上移动
						iscroll.refresh();
					
						
					})
					 
				}

			}
		})

	});
	
//搜索模块
$("#search").on("click",function(){ 
	
		$(".l_content").html("");
		$('.screen').animate({top:'-7.3rem'}); //菜单块向上移动  
	    $(".overmask").hide();
	    $('#head #sx').html("筛选");
		var business_title=$("#val_s").val();
		var searchs = {
			url : 'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/SearchBusinessListV1',
			type : 'GET',
			data : {
				'login_user_id' : login_user_id,
				'business_title' : business_title,
				'mapsign' : mapsign,
				'source' : 1
			}
		}

		requeryst(searchs,function(search_Data){
			pages(search_Data, 1);
			
			
		});
	});

//tab切换
$('.nav ul li').on("tap",function(event){
	
	issearch=false;
	istab = true;
	$("#val_s").attr("value","");
	event.preventDefault();
	$(this).addClass('active').siblings('li').removeClass('active');
	num = $(this).index();
	time = 0;
	isfenye = false;
	readBussinessList();

});

//商家详情
$(".l_content").on("click",".center",function(){
	var business_id=$(this).attr("id");
	window.location.href="http://www.meimei.yihaoss.top/business/business_details.html?login_user_id="+login_user_id+"&business_id="+business_id;
});
$("footer ul").on("tap",".study",function(){

	window.location.href="http://www.meimei.yihaoss.top/business/business_list.html?login_user_id="+login_user_id;
});	
$("footer ul").on("tap",".order",function(){

	window.location.href="http://www.meimei.yihaoss.top/business/order.html?login_user_id="+login_user_id+"&open_id="+openid;
});