$(function(){

	var url = location.href;
	var userId="";
	var categoryId="";
	var shown="";
	var newimgWidth="";
	var newimgHeight="";
	var boxHeight="";
	var boxWidth="";
	var postTime="";
	var ajax_data={};
	var isSearch_type=1;
	var last_post_time="";
	var busin="";
	var statusd="";
	var businesId="";
	var phoneType="";
	var number="";
	var returnType=""
	var isStock="";
	var isfenye = false;//判断是否分页
	var len;
	
	// //判断链接中是否含有字段
	if(url.indexOf("?") > 0){
		// if(GetQueryString("login_user_id")!=null && GetQueryString("login_user_id").length>-1){
			
		// 	userId = GetQueryString("login_user_id");
		// }
		if(GetQueryString("category_id")!=null && GetQueryString("category_id").length>-1){
			
			categoryId = GetQueryString("category_id")
		}
		
	}
	function GetQueryString(name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if(r!=null)return  unescape(r[2]); return null;
	}
	getSystemType();
	

	$('.main').dropload({
	    scrollArea : window,
	    domUp : {
	        domClass   : 'dropload-up',
	        domRefresh : '<div class="dropload-refresh">下拉刷新</div>',
	        domUpdate  : '<div class="dropload-update">释放更新</div>',
	        domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中</div>'
	    },
	    domDown : {
	        domClass   : 'dropload-down',
	        domRefresh : '<div class="dropload-refresh">上拉加载更多</div>',
	        domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中</div>',
	        domNoData  : '<div class="dropload-noData">暂无更多玩具哦</div>'
	    },
	    loadUpFn : function(me){
	    	
	    	setTimeout(function(){
	    	 	isfenye=false;
	    	 	is_search_type();
                me.resetload();//每次数据加载完都要重置（dropload的方法）
            },1000);
	    },
	    loadDownFn : function(me){
	    	
	    	setTimeout(function(){
	    	 	isfenye=true;
	    	 	is_search_type();
	    	 	if(len<=10){
	    	 		me.noData();
	    	 	}
                me.resetload();//每次数据加载完都要重置（dropload的方法）
            },1000);
	    },
	    threshold : 50
	});

	
	
	//弹窗除网址
	// window.alert = function(name){
	//     var iframe = document.createElement("IFRAME");
	// 	iframe.style.display="none";
	// 	iframe.setAttribute("src", 'data:text/plain');
	// 	document.documentElement.appendChild(iframe);
	// 	window.frames[0].window.alert(name);
	// 	iframe.parentNode.removeChild(iframe);
	// }
	
	//阻止浏览器的默认行为 
	function stopDefault( e ) { 
	    //阻止默认浏览器动作(W3C) 
	    if ( e && e.preventDefault ) 
	        e.preventDefault(); 
	    //IE中阻止函数器默认动作的方式 
	    else
	        window.event.returnValue = false; 
	    return false; 
	}

	//二次确认的弹窗除网址
	window.confirm = function (message) {
	   if(phoneType==1){
	       var iframe = document.createElement("IFRAME");
	       iframe.style.display = "none";
	       iframe.setAttribute("src", '');
	       document.documentElement.appendChild(iframe);
	       var alertFrame = window.frames[0];
	       var result = alertFrame.window.confirm(message);
	       iframe.parentNode.removeChild(iframe);
	       return result;
	      
	    }else if(phoneType==2){
	       var iframe = document.createElement("IFRAME");
	       iframe.style.display = "none";
	       iframe.setAttribute("src", 'data:text/plain,');
	       document.documentElement.appendChild(iframe);
	       var alertFrame = window.frames[0];
	       var result = alertFrame.window.confirm(message);
	       iframe.parentNode.removeChild(iframe);
	       return result;
	    }
	};


	//点击列表详情
	$(".content").on("click",".toylist",function(event){
		event.stopPropagation();
		busin=$(this).attr("busindex");
		if(phoneType==1){
			window.call.callMethodToToysDetail(busin);
		}else if(phoneType==2){
			callMethodToToysDetail(busin);
		}else{
			window.call.callMethodToToysDetail(busin);
		}
	})

	function getSystemType() {
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
	
	//无网络点击刷新
	$(".load").on("click",function(){
		
		location.reload();
	})

	//点击搜索框进入搜索链接
	$(".head").on("click",".btn",function(){
		stopDefault();
		if(phoneType==1){
			window.call.callMethodToSearch();
		}else if(phoneType==2){
			callMethodToSearch();
		}else{
			window.call.callMethodToSearch();
		}
	}) 

	//点击进入邀请页面
	$(".head .liwu").on("click",function(){
		stopDefault();
		if(phoneType==1){
			window.call.callMethodToInvite();
		}else if(phoneType==2){
			callMethodToInvite();
		}else{
			window.call.callMethodToInvite();
		}
	})

	//点击返回首页
	$(".head .back").on("click",function(){
		stopDefault();
		if(phoneType==1){
			window.call.callMethodFinish();
		}else if(phoneType==2){
			callMethodFinish();
		}else{
			window.call.callMethodFinish();
		}
	})

	

	//全部列表
	// $(".content").on("tap",".allpic",function(event){
	// 	event.stopPropagation();
	// 	this.click();
	// 	var categoryId=0;
	// 	if(phoneType==1){
	// 		window.call.callMethodToCategory(categoryId);
	// 	}else if(phoneType==2){
	// 		callMethodToCategory(categoryId);
	// 	}else{
	// 		window.call.callMethodToCategory(categoryId);
	// 	}
	// })

	var cc="";
	//购物车/预约按钮/取消预约
	$(".content").on("click",".shop",function(event){
		event.stopPropagation();
		businesId=$(this).attr("bussindex");
		isStock=$(this).attr("kindex");
		cc=$(this);
		if(phoneType==1){
			returnType=window.call.callMethodIsLogin();
			
		}else if(phoneType==2){
			returnType=callMethodIsLogin();
		}else{
			returnType=window.call.callMethodIsLogin();
		}
		if(returnType==0){
			if(phoneType==1){
				window.call.callMethodToLoginPage();
			}else if(phoneType==2){
				callMethodToLoginPage();
			}else{
				window.call.callMethodToLoginPage();
			}
		}else{
			if(isStock==1){
				if(phoneType==1){
					userId=window.call.callMethodGetLoginUserId();
					
				}else if(phoneType==2){
					userId=callMethodGetLoginUserId();
				}else{
					userId=window.call.callMethodGetLoginUserId();
				}
				$.ajax({
						url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV77/publicToysCart',
						type:'GET',
						cache:false,
						async :false,
						data: {
							login_user_id:userId,
							business_id:businesId
						},
						success:function(data){
							var data=JSON.parse(data);
							if(data.success==false){
								if(phoneType==1){
									
									window.call.showToast(data.reMsg+"");
								}else if(phoneType==2){
									showToast(data.reMsg+"");
									
								}else{
									
									window.call.showToast(data.reMsg+"");
								}
							}else{
								number=data.data.cart_number;
							}
							
							if(phoneType==1){
								window.call.callMethodChangeNumber(number+"");
							}else if(phoneType==2){
								callMethodChangeNumber(number+"");
							}else{
								window.call.callMethodChangeNumber(number+"");
							}						 
						},
						error:function(data){
							var data=JSON.parse(data);
							if(phoneType==1){
								
								window.call.showToast(data.reMsg+"");
							}else if(phoneType==2){
								
								showToast(data.reMsg+"");
								
							}else{
								
								window.call.showToast(data.reMsg+"");
							}
						}
				})
			}else if(isStock==2){
				if(phoneType==1){
					userId=window.call.callMethodGetLoginUserId();
					
				}else if(phoneType==2){
					userId=callMethodGetLoginUserId();
				}else{
					userId=window.call.callMethodGetLoginUserId();
				}
				if(confirm('确定预约这个宝贝么?')){

					$.ajax({
						url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV77/ToysUserAppointmentAdd',
						type:'GET',
						cache:false,
						async :false,
						data:{
							login_user_id:userId,
							business_id:businesId
						},
						success:function(data){
							var data=JSON.parse(data);
							shopType=data.is_appoint;
							if(data.success==false){
								if(phoneType==1){
									window.call.showToast(data.reMsg+"");
								}else if(phoneType==2){
									showToast(data.reMsg+"");
								}else{
									window.call.showToast(data.reMsg+"");
								}
								// alert(data.reMsg);
							}else{
								if(shopType==3){
									var aa='<img src="img/69.png">';
									cc.html(aa);
									shopType=2;
									isfenye=false;
									is_search_type();
								}else if(shopType==2){
									var aa='<img src="img/75.png">';
									cc.html(aa);
									isfenye=false;
									is_search_type();
								}
								else if(shopType==1){
									var aa='<img src="img/32.png">';
									cc.html(aa);
								}
							}
							
							
						},
						error:function(data){
							if(phoneType==1){
								
								window.call.showToast(data.reMsg+"");
							}else if(phoneType==2){
								
								showToast(data.reMsg+"");
								
							}else{
								
								window.call.showToast(data.reMsg+"");
							}
						}
					})
				}else{
					return false;
				}	
			}else if(isStock==3){
				if(phoneType==1){
					userId=window.call.callMethodGetLoginUserId();
					
				}else if(phoneType==2){
					userId=callMethodGetLoginUserId();
				}else{
					userId=window.call.callMethodGetLoginUserId();
				}
				if(confirm('确定不预约了么?')){
					$.ajax({
						url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV77/ToysUserAppointmentDel',
						data:{
							login_user_id: userId,
							business_id:businesId
						},
						async :false,
						cache:false,
						type:'GET',
						success:function(data){
							var data=JSON.parse(data);
							shopType=data.is_appoint;
							if(data.success==false){
								if(phoneType==1){
									window.call.showToast(data.reMsg+"");
								}else if(phoneType==2){
									showToast(data.reMsg+"");
								}else{
									window.call.showToast(data.reMsg+"");
								}
								// alert(data.reMsg)
							}else{
								if(shopType==3){
									var aa='<img src="img/69.png">';
									cc.html(aa);
									isfenye=false;
									is_search_type();
								}
								else if(shopType==2){
									var aa='<img src="img/75.png">';
									cc.html(aa);
									shopType=3;
									isfenye=false;
									is_search_type();
								}
								else if(shopType==1){
									var aa='<img src="img/32.png">';
									cc.html(aa);
									
								}
							}
						},
						error:function(data){
							if(phoneType==1){
								
								window.call.showToast(data.reMsg+"");
							}else if(phoneType==2){
								
								showToast(data.reMsg+"");
								
							}else{
								
								window.call.showToast(data.reMsg+"");
							}
						}
					})
				}else{
					return false;
				}	
			}
		}
	})
	
	if(categoryId==0){
		
		$(".main").css("margin-top","1rem")
		return false;
	}else{

		$(".main").css("margin-top","2.34rem")
		headres();
	}

	//头部导航
	function headres(){
		if(phoneType==1){
			userId=window.call.callMethodGetLoginUserId();
			
		}else if(phoneType==2){
			userId=callMethodGetLoginUserId();
		}else{
			userId=window.call.callMethodGetLoginUserId();
		}
		$.ajax({
			url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV77/getToysCategoryList&login_user_id='+userId+'&category_id='+categoryId,
			type:'GET',
			datatype:'json',
			success:function(data){
				var data=JSON.parse(data);
				var hengData=data.data2;
				console.log(data);
				console.log(hengData)
				var boxHtml="";
				boxHtml+='<div class="swiper-container" id="topNav">';
				boxHtml+='<div class="swiper-wrapper">';
				for(var i in hengData){
					boxHtml+='<div class="swiper-slide" cateindex='+hengData[i].category_id+'><dl class="nav"><dt><img src="'+hengData[i].img+'"></dt><dd>'+hengData[i].title+'</dd></dl><span class="line"><img src="img/line.png"></span></div>';
					
				}
				boxHtml+='</div>'
				boxHtml+='</div>'
				$(".box").html(boxHtml);

				$('[cateindex='+categoryId+']').addClass('active')

				var mySwiper = new Swiper('#topNav', {
					slidesPerView: 4.7,
			        paginationClickable: true,
			        spaceBetween: 0,
			        observer:true,//修改swiper自己或子元素时，自动初始化swiper
    				observeParents:true,//修改swiper的父元素时，自动初始化swiper
				});


				$(".swiper-container").on('touchstart', function(e) {
					e.preventDefault()
				})
				swiperWidth = mySwiper.container[0].clientWidth
				maxTranslate = mySwiper.maxTranslate();
				maxWidth = -maxTranslate + swiperWidth / 2

				mySwiper.on('tap', function(swiper, e) {

					e.preventDefault()

					var slide = swiper.slides[swiper.clickedIndex]
					var slideLeft = slide.offsetLeft
					var slideWidth = slide.clientWidth
					var slideCenter = slideLeft + slideWidth / 2
					// 被点击slide的中心点

					mySwiper.setWrapperTransition(300)

					if (slideCenter < swiperWidth / 2) {
						
						mySwiper.setWrapperTranslate(0)

					} else if (slideCenter > maxWidth) {
						
						mySwiper.setWrapperTranslate(maxTranslate)

					} else {

						nowTlanslate = slideCenter - swiperWidth / 2

						mySwiper.setWrapperTranslate(-nowTlanslate)

					}
					
					$("#topNav  .active").removeClass('active')
					$("#topNav .swiper-slide").eq(swiper.clickedIndex).addClass('active')
					categoryId=$(".swiper-slide").eq(swiper.clickedIndex).attr("cateindex");
					$(".content").html("");
					$('html,body').animate({scrollTop: 0});
					isfenye=false;
           			is_search_type();
           		})
			},
			complete:function(){
               
               $("#loading").hide();
               $(".box").show();
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

	//列表数据
	function is_search_type(){
		if(phoneType==1){
			userId=window.call.callMethodGetLoginUserId();
			
		}else if(phoneType==2){
			userId=callMethodGetLoginUserId();
			
		}else{
			userId=window.call.callMethodGetLoginUserId();
		}
	    last_post_time = $(".main").find("dl:last").data("posttime");
	    console.log(last_post_time);
	    
	    switch(isSearch_type){
            case 1 : 
                ajax_data = {
                    userId:userId,
                    categoryId:categoryId,
                    postTime:last_post_time
                }
                break;
        }
        request(ajax_data);

	}
	//列表数据
	function request(opt){
		if(phoneType==1){
			userId=window.call.callMethodGetLoginUserId();
			
		}else if(phoneType==2){
			userId=callMethodGetLoginUserId();
			
		}else{
			userId=window.call.callMethodGetLoginUserId();
		}
		if(isfenye==true){
			ajaxData={
	            post_create_time: opt.postTime,
	           	login_user_id:opt.userId,
	           	category_id:opt.categoryId
	        }
		}else{
			ajaxData={
	           	login_user_id:opt.userId,
	           	category_id:opt.categoryId
	        }
		}
		
		$.ajax({
			url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV77/getToysCategoryList',
			type:'GET',
			data:ajaxData,
			datatype:'json',
			cache:false,
			async :false,
			success:function(data){
				// $('.upload').removeClass('loading');
				var data=JSON.parse(data);
				var listDate=data.data;
				console.log(listDate)
				var mainHtml="";
				len=listDate.length;
				if(listDate.length != 0){
					for(var i in listDate){
						if(listDate[i].size_img_thumb){
							if(listDate[i].is_appoint==1){
								mainHtml+='<dl class="toylist" data-postTime='+listDate[i].post_create_time+' busindex='+listDate[i].business_id+'><dt><img src="'+listDate[i].img_thumb+'"></dt><a class="xing"><img src="'+listDate[i].size_img_thumb+'"></a><dd><p>'+listDate[i].business_title+'</p><p><span>'+listDate[i].age+'</span></p><p><span>￥</span>'+listDate[i].sell_price+'</p><span class="shop" bussindex='+listDate[i].business_id+' kindex='+listDate[i].is_appoint+'><img src="img/32.png"></span></dd></dl>';
							}else if(listDate[i].is_appoint==2){
								mainHtml+='<dl class="toylist" busindex='+listDate[i].business_id+' data-postTime='+listDate[i].post_create_time+'><dt><img src="'+listDate[i].img_thumb+'"></dt><a class="xing"><img src="'+listDate[i].size_img_thumb+'"></a><dd><p>'+listDate[i].business_title+'</p><p><span>'+listDate[i].age+'</span></p><p><span>￥</span>'+listDate[i].sell_price+'</p><span class="shop" bussindex='+listDate[i].business_id+' kindex='+listDate[i].is_appoint+'><img src="img/75.png"></span></dd></dl>';
							}else if(listDate[i].is_appoint==3){
								mainHtml+='<dl class="toylist" busindex='+listDate[i].business_id+' data-postTime='+listDate[i].post_create_time+'><dt><img src="'+listDate[i].img_thumb+'"></dt><a class="xing"><img src="'+listDate[i].size_img_thumb+'"></a><dd><p>'+listDate[i].business_title+'</p><p><span>'+listDate[i].age+'</span></p><p><span>￥</span>'+listDate[i].sell_price+'</p><span class="shop" bussindex='+listDate[i].business_id+' kindex='+listDate[i].is_appoint+'><img src="img/69.png"></span></dd></dl>';
							}
							
						}else{
							
							if(listDate[i].is_appoint==1){
								mainHtml+='<dl class="toylist" busindex='+listDate[i].business_id+' data-postTime='+listDate[i].post_create_time+'><dt><img src="'+listDate[i].img_thumb+'"></dt><dd><p>'+listDate[i].business_title+'</p><p><span>'+listDate[i].age+'</span></p><p><span>￥</span>'+listDate[i].sell_price+'</p><span class="shop" bussindex='+listDate[i].business_id+' kindex='+listDate[i].is_appoint+'><img src="img/32.png"></span></dd></dl>';
							}else if(listDate[i].is_appoint==2){
								mainHtml+='<dl class="toylist" busindex='+listDate[i].business_id+' data-postTime='+listDate[i].post_create_time+'><dt><img src="'+listDate[i].img_thumb+'"></dt><dd><p>'+listDate[i].business_title+'</p><p><span>'+listDate[i].age+'</span></p><p><span>￥</span>'+listDate[i].sell_price+'</p><span class="shop" bussindex='+listDate[i].business_id+' kindex='+listDate[i].is_appoint+'><img src="img/75.png"></span></dd></dl>';
							}else if(listDate[i].is_appoint==3){
								mainHtml+='<dl class="toylist" busindex='+listDate[i].business_id+' data-postTime='+listDate[i].post_create_time+'><dt><img src="'+listDate[i].img_thumb+'"></dt><dd><p>'+listDate[i].business_title+'</p><p><span>'+listDate[i].age+'</span></p><p><span>￥</span>'+listDate[i].sell_price+'</p><span class="shop" bussindex='+listDate[i].business_id+' kindex='+listDate[i].is_appoint+'><img src="img/69.png"></span></dd></dl>';
							}
						}
					}
				}
				
				
				if(isfenye == true){
					$(".content").append(mainHtml);
					
				}else{
					
					$(".content").html(mainHtml);
				}
			
				$(".content dl dt img").each(function(i){
					var img = $(this);
					var imgWidth;
					var imgHeight;
					
					$("<img/>").attr("src", $(img).attr("src")).load(function() {
					
						boxHeight=$(".content dl dt").height();
						boxWidth=$(".content dl dt").width();
						imgWidth = this.width;
						imgHeight = this.height;
						shown=imgWidth/imgHeight;
						
						newimgWidth =(boxHeight/imgHeight)*imgWidth;
						$(img).css("width",newimgWidth).css("height",boxHeight);

						// if(shown>=2){
						// 	newimgHeight =boxWidth/imgWidth*imgHeight;
						// 	$(img).css("width",boxWidth).css("height",newimgHeight);
						// }
						// else if(shown<2){
						// 	newimgWidth = boxHeight/imgHeight*imgWidth;
						// 	$(img).css("width",newimgWidth).css("height",boxHeight);

						// }
					});
				});

			},
			complete:function(){
              
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

	

	

})
