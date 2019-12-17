$(function(){

	var url = location.href;
	var userId="";
	var businessId="";
	var categoryId="";
	var firstData="";
	var mainHtml="";
	var boxHtml="";
	var boxData="";
	var banerHtml="";
	var banerData="";
	var phoneType="";
	var imgId="";
	var weblink="";
	var imgId="";
	var bannerType="";
	var wrapHtml="";

	//判断链接中是否含有字段
	if(url.indexOf("?") > 0){
		if(GetQueryString("login_user_id")!=null && GetQueryString("login_user_id").length>-1){
			
			userId = GetQueryString("login_user_id")
		}
	}
	function GetQueryString(name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if(r!=null)return  unescape(r[2]); return null;
	}
	

	banner();
	slide();
	request();

	//中间内容部分
	function request(){
		$.ajax({
			url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV77/AppIndexClass',
			type:'GET',
			datatype:'json',
			success:function(data){
				var data=JSON.parse(data);

				firstData=data.data;
				mainHtml="";
				console.log(firstData);
				for(var i in firstData){
					if(firstData[i].show_type==1){
						mainHtml+='<div class="bban" webindex="'+firstData[i].web_link+'" typeindex="'+firstData[i].source+'" imgindex="'+firstData[i].img_id+'">';
							mainHtml+='<img src="'+firstData[i].img_1+'">';
						mainHtml+='</div>'
					}else if(firstData[i].show_type==2){
						mainHtml+='<div class="assortment">';
							mainHtml+='<div class="toy"><h1>'+firstData[i].class_title+'</h1><span class="smore" catindex='+firstData[i].category_id+'><a>'+firstData[i].class_more_title+'</a><a><img src="img/right.png"></a></span></div>';
							mainHtml+='<div class="list"><ul class="asslist"><li class="asslist_cout" listindex='+firstData[i].business_id1+'><dl><dt><img src="'+firstData[i].img_1+'"></dt><a class="xing"><img src="'+firstData[i].star1+'"></a><dd><p>'+firstData[i].business_title1+'</p></dd></dl></li><li class="asslist_cout" listindex='+firstData[i].business_id2+'><dl><dt><img src="'+firstData[i].img_2+'"></dt><a class="xing"><img src="'+firstData[i].star2+'"></a><dd><p>'+firstData[i].business_title2+'</p></dd></dl></li><li class="asslist_cout" listindex='+firstData[i].business_id3+'><dl><dt><img src="'+firstData[i].img_3+'"></dt><a class="xing"><img src="'+firstData[i].star3+'"></a><dd><p>'+firstData[i].business_title3+'</p></dd></dl></li></ul></div>';
						mainHtml+='</div>';
					}else if(firstData[i].show_type==3){
						mainHtml+='<div class="groom">';
							mainHtml+='<div class="grotoy"><h1>'+firstData[i].class_title+'</h1><span class="wmore" catindex='+firstData[i].category_id+'><a>'+firstData[i].class_more_title+'</a><a><img src="img/right.png"></a></span></div>';
							mainHtml+='<div class="rmlist">';
								mainHtml+='<div class="left" idindex='+firstData[i].business_id1+'><dl><dd>'+firstData[i].business_title1+'</dd><dt><img src="'+firstData[i].img_1+'"></dt></dl></div>';
								mainHtml+='<div class="right"><div class="toplist"><ul><li class="rihgtlist" toyindex='+firstData[i].business_id2+'><dl><dd>'+firstData[i].business_title2+'</dd><a class="xingxing"><img src="'+firstData[i].star2+'"></a><dt><img src="'+firstData[i].img_2+'"></dt></dl></li><li class="rihgtlist" toyindex='+firstData[i].business_id3+'><dl><dd>'+firstData[i].business_title3+'</dd><a class="xingxing"><img src="'+firstData[i].star3+'"></a><dt><img src="'+firstData[i].img_3+'"></dt></dl></li></ul></div><div class="bottomlist"><ul><li class="rihgtlist" toyindex='+firstData[i].business_id4+'><dl><dd>'+firstData[i].business_title4+'</dd><a class="xingxing"><img src="'+firstData[i].star4+'"></a><dt><img src="'+firstData[i].img_4+'"></dt></dl></li><li class="rihgtlist" toyindex='+firstData[i].business_id5+'><dl><dd>'+firstData[i].business_title5+'</dd><a class="xingxing"><img src="'+firstData[i].star5+'"></a><dt><img src="'+firstData[i].img_5+'"></dt></dl></li></ul></div></div>';
							mainHtml+='</div>';
						mainHtml+='</div>';
					}
				}
				$(".main").html(mainHtml);

				$(".assortment dl dt img").each(function(i){
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
						boxHeight=$(".main dl dt").height(); //获取盒子的高度
						
						boxWidth=$(".main dl dt").width(); //获取盒子的宽度
						
						imgWidth = this.width;
						imgHeight = this.height;
						shown=imgWidth/imgHeight;
						
						//如果真实的宽度大于浏览器的宽度就按照100%显示
						if(shown>=2){
							newimgHeight =boxWidth/imgWidth*imgHeight;
							
							$(img).css("width",boxWidth).css("height",newimgHeight);
						}
						else if(shown<2){//如果小于浏览器的宽度按照原尺寸显示
							newimgWidth = boxHeight/imgHeight*imgWidth;
							$(img).css("width",newimgWidth).css("height",'auto');

						}
					});
				});

				$(".toplist dl dt img").each(function(i){
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
						boxHeight=$(".toplist dl dt").height(); //获取盒子的高度
						boxWidth=$(".toplist dl dt").width(); //获取盒子的宽度
						imgWidth = this.width;
						imgHeight = this.height;
						shown=imgWidth/imgHeight;
						//如果真实的宽度大于浏览器的宽度就按照100%显示
						if(shown>=2){
							newimgHeight =boxWidth/imgWidth*imgHeight;
							$(img).css("width",boxWidth).css("height",newimgHeight);
						}
						else if(shown<2){//如果小于浏览器的宽度按照原尺寸显示
							newimgWidth = boxHeight/imgHeight*imgWidth;
							$(img).css("width",newimgWidth).css("height",boxHeight);

						}
					});
				});

				//图片的宽高计算
				$(".bottomlist dl dt img").each(function(i){
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
						boxHeight=$(".bottomlist dl dt").height(); //获取盒子的高度
						boxWidth=$(".bottomlist dl dt").width(); //获取盒子的宽度
						imgWidth = this.width;
						imgHeight = this.height;
						shown=imgWidth/imgHeight;
						//如果真实的宽度大于浏览器的宽度就按照100%显示
						if(shown>=2){
							newimgHeight =boxWidth/imgWidth*imgHeight;
							$(img).css("width",boxWidth).css("height",newimgHeight);
						}
						else if(shown<2){//如果小于浏览器的宽度按照原尺寸显示
							newimgWidth = boxHeight/imgHeight*imgWidth;
							$(img).css("width",newimgWidth).css("height",boxHeight);

						}
					});
				});

				$(".left dl dt img").each(function(i){
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
						boxHeight=$(".left dl dt").height(); //获取盒子的高度
						boxWidth=$(".left dl dt").width(); //获取盒子的宽度
						imgWidth = this.width;
						imgHeight = this.height;
						shown=imgWidth/imgHeight;
						//如果真实的宽度大于浏览器的宽度就按照100%显示
						if(shown>=2){
							newimgHeight =boxWidth/imgWidth*imgHeight;
							$(img).css("width",boxWidth).css("height",'auto');
						}
						else if(shown<2){//如果小于浏览器的宽度按照原尺寸显示
							newimgWidth = boxHeight/imgHeight*imgWidth;
							$(img).css("width",newimgWidth).css("height",'auto');

						}
					});
				});

				
			},
			complete:function(){
               
               $("#loading").hide();
               $(".main").show();
            },
	        error:function(data){
	        	var data=JSON.parse(data);
	        	if(data.reCode==404){
					wrapHtml+='<img src="img/error.png" class="load"/>'
            		$(".wrap").html(wrapHtml)
				}
	        }
		})
	}

	//会员卡
	function slide(){
		$.ajax({
			url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV77/AppIndexCard',
			datatype:'json',
			type:'GET',
			success:function(res){
				var res=JSON.parse(res);
				boxData=res.data;
				
				console.log(boxData);
				boxHtml="";
				boxHtml+='<div class="swiper-container swiper-container2">';
				boxHtml+='<div class="swiper-wrapper">';
				for(var i in boxData){
					boxHtml+='<div class="swiper-slide memberlist" busindex='+boxData[i].card_id+'><img src="'+boxData[i].img+'"></div>'
				}
				boxHtml+='</div>';
				boxHtml+='</div>';
				$(".box").html(boxHtml);
				
				var swiper = new Swiper('.swiper-container2', {
			        slidesPerView: 2.7,
			        paginationClickable: true,
			        spaceBetween: 10,
			        observer:true,//修改swiper自己或子元素时，自动初始化swiper
    				observeParents:true,//修改swiper的父元素时，自动初始化swiper
			    });
			},
			complete:function(){
              
                $("#loading").hide();
                $(".box").show();
            },
	        error:function(data){
	        	var data=JSON.parse(data);
	        	alert(data.reMsg);
	        	if(data.reCode==404){
					wrapHtml+='<img src="img/error.png" class="load"/>'
            		$(".wrap").html(wrapHtml)
				}
	        }
		})
	}

	//banner
	function banner(){
		$.ajax({
			url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV77/AppIndexBanner',
			type:'GET',
			datatype:'JSON',
			success:function(data){
				var data=JSON.parse(data);
				console.log(data);
				
				banerHtml="";
				banerData=data.data;
				banerHtml+='<div class="swiper-container swiper-container1">';
				banerHtml+='<div class="swiper-wrapper">';
				for(var i in banerData){
					banerHtml+='<div class="swiper-slide bannerlist" webindex="'+banerData[i].web_link+'" typeindex="'+banerData[i].source+'" imgindex="'+banerData[i].img_id+'"  ><img src="'+banerData[i].img+'""></div>'
				}
				banerHtml+='</div>';
				banerHtml+='</div>';
				$(".banner").html(banerHtml);

				var swiper = new Swiper('.swiper-container1', {
			        paginationClickable: true,
			        spaceBetween: 0,
			        centeredSlides: true,
			        autoplay: 2000,
			        autoplayDisableOnInteraction: false,
			        observer:true,//修改swiper自己或子元素时，自动初始化swiper
    				observeParents:true,//修改swiper的父元素时，自动初始化swiper
			    });
			},
			complete:function(){
	            
	            $("#loading").hide();
	            $(".banner").show();
	            $(".head").show();
	        },
	        error:function(data){
	        	var data=JSON.parse(data);
	        	alert(data.reMsg);
	        	if(data.reCode==404){
					wrapHtml+='<img src="img/error.png" class="load"/>'
            		$(".wrap").html(wrapHtml)
				}
	        }
		})
	}

	$(".load").on("click",function(){
		location.reload();
	})

	$(".head").on("click",".btn",function(){
		if(phoneType==1){
			window.call.callMethodToSearch();
		}else if(phoneType==2){
			callMethodToSearch();
		}else{
			window.call.callMethodToSearch();
		}
	}) 

	$(".head .liwu").on("click",function(){
		if(phoneType==1){
			window.call.callMethodToInvite();
		}else if(phoneType==2){
			callMethodToInvite();
		}else{
			window.call.callMethodToInvite();
		}
	})

	$(".head .back").on("click",function(){
		if(phoneType==1){
			window.call.callMethodFinish();
		}else if(phoneType==2){
			callMethodFinish();
		}else{
			window.call.callMethodFinish();
		}
	})

	//会员卡的点击事件
	$("#pullrefresh").on("tap",".memberlist",function(event){
		this.click();
    	businessId=$(this).attr("busindex");
    	if(phoneType==1){
			window.call.callMethodToToysDetail(businessId);
		}else if(phoneType==2){
			callMethodToToysDetail(businessId);
		}else{
			window.call.callMethodToToysDetail(businessId);
		}
    })

 	//banner的点击事件
    $("#pullrefresh").on("tap",".bannerlist",function(event){
    	this.click();
		imgId=$(this).attr("imgindex");
		console.log(imgId)
		bannerType=$(this).attr("typeindex");
		console.log(bannerType)
		weblink=$(this).attr("webindex");
		console.log(weblink)
		if(bannerType==1){
			if(phoneType==1){
				window.call.callMethodToPostDetail(imgId);
			}else if(phoneType==2){
				callMethodToPostDetail(imgId);
			}else{
				window.call.callMethodToPostDetail(imgId);
			}
		}else if(bannerType==2){
			if(phoneType==1){
				window.call.callMethodToWeb(weblink);
			}else if(phoneType==2){
				callMethodToWeb(weblink);
			}else{
				window.call.callMethodToWeb(weblink);
			}
		}else if(bannerType==3){
			if(phoneType==1){
				window.call.callMethodToCategory(imgId);
			}else if(phoneType==2){
				callMethodToCategory(imgId);
			}else{
				window.call.callMethodToCategory(imgId);
			}
		}else if(bannerType==4){
			if(phoneType==1){
				window.call.callMethodToToysDetail(imgId);
			}else if(phoneType==2){
				callMethodToToysDetail(imgId);
			}else{
				window.call.callMethodToToysDetail(imgId);
			}
		}
	})


    $("#pullrefresh").on("tap",".bban",function(event){
    	this.click();
		imgId=$(this).attr("picindex");
		console.log(imgId)
		bannerType=$(this).attr("typeindex");
		console.log(bannerType)
		weblink=$(this).attr("webindex");
		console.log(weblink)
		if(bannerType==1){
			if(phoneType==1){
				window.call.callMethodToPostDetail(imgId);
			}else if(phoneType==2){
				callMethodToPostDetail(imgId);
			}else{
				window.call.callMethodToPostDetail(imgId);
			}
		}else if(bannerType==2){
			if(phoneType==1){
				window.call.callMethodToWeb(weblink);
			}else if(phoneType==2){
				callMethodToWeb(weblink);
			}else{
				window.call.callMethodToWeb(weblink);
			}
		}else if(bannerType==3){
			if(phoneType==1){
				window.call.callMethodToCategory(imgId);
			}else if(phoneType==2){
				callMethodToCategory(imgId);
			}else{
				window.call.callMethodToCategory(imgId);
			}
		}else if(bannerType==4){
			if(phoneType==1){
				window.call.callMethodToToysDetail(imgId);
			}else if(phoneType==2){
				callMethodToToysDetail(imgId);
			}else{
				window.call.callMethodToToysDetail(imgId);
			}
		}
	})


	//五图中的左边大图的点击事件
	$("#pullrefresh").on("tap",".left",function(event){
		this.click();
		businessId=$(this).attr("idindex");
		// window.location.href="http://www.meimei.yihaoss.top/H5/toy_count/toy_cout.html?login_user_id="+userId+"&business_id="+businessId
		if(phoneType==1){
			window.call.callMethodToToysDetail(businessId);
		}else if(phoneType==2){
			callMethodToToysDetail(businessId);
		}else{
			window.call.callMethodToToysDetail(businessId);
		}
	})

	//点击五图的右边小图
	$("#pullrefresh").on("tap",".rihgtlist",function(event){
		this.click();
		businessId=$(this).attr("toyindex");
		// window.location.href="http://www.meimei.yihaoss.top/H5/toy_count/toy_cout.html?login_user_id="+userId+"&business_id="+businessId
		if(phoneType==1){
			window.call.callMethodToToysDetail(businessId);
		}else if(phoneType==2){
			callMethodToToysDetail(businessId);
		}else{
			window.call.callMethodToToysDetail(businessId);
		}
	})

	//点击三图中的一个
	$("#pullrefresh").on("tap",".asslist_cout",function(event){
		this.click();
		businessId=$(this).attr("listindex");
		// window.location.href="http://www.meimei.yihaoss.top/H5/toy_count/toy_cout.html?login_user_id="+userId+"&business_id="+businessId
		if(phoneType==1){
			window.call.callMethodToToysDetail(businessId);
		}else if(phoneType==2){
			callMethodToToysDetail(businessId);
		}else{
			window.call.callMethodToToysDetail(businessId);
		}
	})

	//点击五图中的更多
	$("#pullrefresh").on("tap",".wmore",function(event){
		this.click();
		categoryId=$(this).attr("catindex");
		// window.location.href="http://www.meimei.yihaoss.top/H5/toy_count/all.html?login_user_id="+userId+"&category_id="+categoryId
		if(phoneType==1){
			window.call.callMethodToCategory(categoryId);
		}else if(phoneType==2){
			callMethodToCategory(categoryId);
		}else{
			window.call.callMethodToCategory(categoryId);
		}
	})

	//点击三图中的更多
	$("#pullrefresh").on("tap",".smore",function(event){
		this.click();
		categoryId=$(this).attr("catindex");
		// window.location.href="http://www.meimei.yihaoss.top/H5/toy_count/all.html?login_user_id="+userId+"&category_id="+categoryId
		if(phoneType==1){
			window.call.callMethodToCategory(categoryId);
		}else if(phoneType==2){
			callMethodToCategory(categoryId);
		}else{
			window.call.callMethodToCategory(categoryId);
		}
	})


	window.onload=function getSystemType() {
		var u = navigator.userAgent;
		if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
			phoneType = 1;
		} else if (u.indexOf('iPhone') > -1) {//苹果手机
			phoneType = 2;
		} else if (u.indexOf('Windows Phone') > -1) {//winphone手机
			phoneType = 3;
		}else{
			phoneType = 4;
		}
	}

	//弹窗除网址
	window.alert = function(name){
	    var iframe = document.createElement("IFRAME");
		iframe.style.display="none";
		iframe.setAttribute("src", 'data:text/plain,');
		document.documentElement.appendChild(iframe);
		window.frames[0].window.alert(name);
		iframe.parentNode.removeChild(iframe);
	}



	mui.init({
		gestureConfig: {

		tap: true, //默认为true

		doubletap: true, //默认为false

		longtap: true, //默认为false

		swipe: true, //默认为true

		drag: true, //默认为true

		hold: false, //默认为false，不监听

		release: false //默认为false，不监听

		},
		pullRefresh: {
			container: '#pullrefresh',
			down: {
				callback: pulldownRefresh
			}
		}
	});
	/**
	 * 下拉刷新具体业务实现
	 */
	function pulldownRefresh() {
		setTimeout(function() {
			
			mainHtml="";
			banerHtml="";
			boxHtml="";
			banner();
			slide();
			request();
			
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		}, 1000);
	}


	if (mui.os.plus) {
		mui.plusReady(function() {
			setTimeout(function() {
				mui('#pullrefresh').pullRefresh().pullupLoading();
			}, 1000);

		});
	} else {
		mui.ready(function() {
			mui('#pullrefresh').pullRefresh().pullupLoading();
		});
	}
		

	
})
