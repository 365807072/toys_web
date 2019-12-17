$(function(){
	var xmlhttp;   
	var url = location.href;
	var href = "";
	var order_role="";
	url = url.substring(url.indexOf("?")+1).split("&");

	var login_user_id = url[0].substring(url[0].indexOf("=")+1);

	var business_id = url[1].substring(url[1].indexOf("=")+1);

	var login_userId="";
	var openid="";
	var code="";
	code = GetRequest().code , state = GetRequest().state;
    function GetRequest() { 
        var url = location.search; //获取url中"?"符后的字串 
        var theRequest = new Object(); 
        if (url.indexOf("?") != -1) {
            var str = url.substr(1); 
            strs = str.split("&"); 
            for(var i = 0; i < strs.length; i ++) { 
                theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]); 
            } 
        } 
        return theRequest; 
    } 

    
//XmlHttpRequest对象    
function createXmlHttpRequest(){    
    if(window.ActiveXObject){ //如果是IE浏览器    
        return new ActiveXObject("Microsoft.XMLHTTP");    
    }else if(window.XMLHttpRequest){ //非IE浏览器    
        return new XMLHttpRequest();    
    }    
}    
console.log(code);

    if(!code){
    	href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5bd2876a775d0525&redirect_uri=http%3a%2f%2fwww.meimei.yihaoss.top%2fbusiness%2fbusiness_details.html&response_type=code&scope=snsapi_userinfo&state="+login_user_id+"="+business_id;
    	console.log(1)
    }else{
    	console.log(2)
    	alert(2)
    	href = "javascript:;";
    	login_user_id = GetRequest().state.split('%3D')[0];
    	business_id = GetRequest().state.split('%3D')[1];
    	$.get('http://www.meimei.yihaoss.top/business/php.php?code='+code+'&state=111',function(data){
    		
    		var result = JSON.parse(data);
    		openid = result.openid;
    		//alert(openid);
    		code = result.data.code;
    		//alert(localStorage.setItem('open_id',openid));
    		//localStorage.setItem('code',result.code);
    		
    		$.ajax({
    			url:"http://api.baobaoshowshow.com/index.php?r=BabyShowV1/wxLogin",
    			type:"POST",
    			data : {
    				'uid' : result.openid,
    				'nick_name' : result.nickname,
    				'source' : 1,
    				'unionid' : result.unionid,
    				'imgurl' : result.headimgurl,
      			},
    			success:function(data){
    				var res = JSON.parse(data);
    				//alert(res);
    				var storage = window.localStorage;
    				if(res.success == true){
	    				var login_user_name = storage.setItem("login_user_name",res.data.nick_name);
	    				login_userId = storage.setItem("login_user_id",res.data.user_id);
	    				var picUrl = storage.setItem("picUrl",res.data.avatar);
						storage.setItem("login_type",2)//type=0或undefined 未登录 type=2 已登录
						login_userId = storage.getItem("login_user_id");
    				}

    				$(".onorder").on("click",function(){
						if(storage.getItem("login_type")==2){
							/*href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5bd2876a775d0525&redirect_uri=http%3a%2f%2fwww.meimei.yihaoss.top%2fbusiness%2fbusiness_details.html&response_type=code&scope=snsapi_userinfo&state="+login_user_id+"="+business_id;
						}else{*/
							var data_index=$(this).attr("data-index");
									if(order_role=0){
										$(this).disabled=true;
									}
									else{
										var PayUrl = "http://www.meimei.yihaoss.top/business/pay.html?login_user_id="+login_userId+"&business_id="+business_id+"&package="+data_index+"&order_rol=0&code="+code+"&open_id="+openid;
										//alert(PayUrl);
										window.location.href=PayUrl;
								}
						}
					
				 })
    			}

    		})

    	});


    }

//如果是商家 不可以点击“立即抢购” 用户的话登陆的直接进入支付 没有登陆去登陆然后跳入支付 

    reload("login_user_id="+login_user_id+"&business_id="+business_id);

	function reload(s){
		$.ajax({
			url:"http://api.baobaoshowshow.com/index.php?r=BabyShowV1/BusinessDetailV1&"+s,
			type:"GET",
			success:function(data){
				var a = JSON.parse(data);
				//var data = JSON.parse(a);
				//图片轮播
				//console.log(a);
				var chtml="";
				var result=a.data;
				//console.log(result);
				var re=result.img;
				order_role=result.user_role;
				console.log(order_role);

				var one = "";
				one = "<li class='swiper-slide'><img src='"+re[0].img+"'></li>";
				/*for(var i in re){
					one = "<img src='"+re[i].img+"'>";
					chtml+="<li class='swiper-slide'>";
					chtml+="<img src='"+re[i].img+"'>";
					chtml+="</li>";
				}*/
				$(".swiper-wrapper").html(one);

				//主要内容
				var ahtml="";
				var dhtml="";
				var bhtml="";
				
				ahtml="<div class='title'><h1>"+result.business_title+"</h1></div><div class='address'><p><span>"+result.business_location+"</span><a href='map.html?login_user_id='"+login_userId+"&business_id="+business_id+"><img src='img/xq_4.png'></a></p></div><div class='time'><p><span>"+result.work_time+"</span><a href='tel:"+result.business_contact+"'><img src='img/xq_5.png'></a></p></div>";
				$(".describe").html(ahtml);
				dhtml="<h1>简介</h1><p>"+result.business_description+"</p>";
				$(".introduction").html(dhtml);
					var arr2=result.package;

					//console.log(arr2)
					for(var i in arr2){
						var redbag=arr2[i].package;
					var aStr = arr2[i].business_activity_num+"";//换行的内容  
					aStr=aStr.replace(/\r\n/g,"<br>");
					bhtml += "<div class='b_package'><p><span>"+arr2[i].package_name+"</span><span><a class='onorder' data-index='"+arr2[i].package+"' href='"+href+"'>立即抢购</a></span></p></div><div class='b_package_box'><p><span>秀秀价</span><a>"+arr2[i].business_babyshow_price+"</a><strike>店面价"+arr2[i].business_market_price+"</strike></p><p>"+arr2[i].business_package+"</p><p>"+aStr+"</p><p>"+arr2[i].business_activity_time+"</p></div>";				
				}	
				$(".package").html(bhtml);

				//综合评价
				var img = new Image();
				img.src=result.grade1;
				$("#zongHe").html(img);

				//用户的评价
				var userStartNum = result.grade3;
				if(userStartNum != ""){
					var startNum = userStartNum;//星星的数量
					var start="";
					for(var i=0;i<startNum;i++){
						start += "<div class='box'></div>";//这个地方替换星星的路径<img src='12.jpg' alt="" />
					}
					$("#userPingJia").html(start);
				}
			}	
		})
	}




	
	$(".l_btn").on("click",function(){
		window.location.href="http://www.meimei.yihaoss.top/business/business_list.html";
	})

	


})