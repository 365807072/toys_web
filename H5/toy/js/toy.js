$(function(){
	// var url = location.href;
	// url = url.substring(url.indexOf("?")+1).split("&");
	// var login_user_id = url[0].substring(url[0].indexOf("=")+1);
	// var business_id = url[1].substring(url[1].indexOf("=")+1);
	var bannerhtml="";
	var imgData="";
	var banType="";
	var contenthtml="";
    var toysInfo="";
    var moreType="";
    var toyType="";
    var toyID="";
    var categoryId="";
    var imgId="";
    var postTime="";
    var boxhtml="";


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
		    	url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysBannerList',
		    	datatype:'json',
		    	success:function(data){
		    		var Datadata = JSON.parse(data);
		    		var bannerData = Datadata.data;
		    		bannerhtml='<div class="swiper-container swiper-container1">';
		    		bannerhtml+='<div class="swiper-wrapper">'
		    		for(var i in bannerData){
						imgData=bannerData[i].img;
						bannerhtml+='<div class="swiper-slide" index="'+bannerData[i].type+'" data="'+bannerData[i].img_id+'">';
						for(var i in imgData){
							bannerhtml+='<img src="'+imgData[i].img_thumb+'">';
						}
						bannerhtml+='</div>';
		    		}
		    		bannerhtml+='</div>';
		    		bannerhtml+='</div>';
		    		$(".banner").html(bannerhtml);
		    		me.resetload();
		    	}
		    })

	    	boxhtml='<div class="swiper-container swiper-container2"><div class="swiper-wrapper"><div class="swiper-slide"><img src="img/2.png"></div><div class="swiper-slide"><img src="img/3.png"></div><div class="swiper-slide"><img src="img/4.png"></div><div class="swiper-slide"><img src="img/5.png"></div></div></div>';
	    	$(".box").html(boxhtml);
	    	
	    	var swiper = new Swiper('.swiper-container2', {
		        slidesPerView: 3,
		        paginationClickable: true,
		        spaceBetween: 15
		    });

		    $.ajax({
		    	url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysPageList&login_user_id=293969',
		    	type:'GET',
		    	datatype:'json',
		    	success:function(data){
		    		var Data = JSON.parse(data);
		    		var toyData = Data.data;
		    		
		    		for(var i in toyData){
		    			moreType=toyData[i].type;
		    			// categoryId=toyData[i].category_id;
		    			contenthtml+='<div class="content">';
		    			contenthtml+='<div class="top"><span><a><img src="img/6.png"></a><a>'+toyData[i].cate_title+'</a></span><span class="more" index="'+toyData[i].category_id+'">'+toyData[i].more_title+'</span></div>';
		    			toysInfo=toyData[i].toys_info;
		    			contenthtml+='<div class="middle">';
		    			for(var i in toysInfo){
		    				toyType=toysInfo[i].type;
		    				contenthtml+='<div class="left" index="'+toysInfo[i].business_id+'"><dl><dt><img src="'+toysInfo[i].img_thumb+'"></dt><dd><p>'+toysInfo[i].business_title+'</p><p><span>'+toysInfo[i].sell_price+'</span><span>'+toysInfo[i].market_price+'</span></p></dd></dl></div>';
		    			}
		    			contenthtml+='</div>';
		    			contenthtml+='</div>';
		    		}

		    		$(".wrapper").html(contenthtml);
		    		me.resetload();
		    		var swiper = new Swiper('.swiper-container1', {
				        paginationClickable: true,
				        spaceBetween: 30,
				        centeredSlides: true,
				        autoplay: 2000,
				        autoplayDisableOnInteraction: false
				    });
				    $(".content").on("click",".more",function(){
				    	
				    	 categoryId=$(this).attr("index");
				    	 console.log(categoryId)
				    	if(moreType==51){
				    		alert("玩具列表")
				    		window.call.callMethodToToysList(categoryId);//玩具列表
				    	}
				    })
				    $(".left").on("click",function(){
				    	toyID=$(this).attr("index");
				    	alert("123")
				    	if(toyType==52){
				    		alert("玩具详情");
					    	window.call.callMethodToToysDetail(toyID);//玩具详情
				    	}
				    })
		    	},
	            error: function(xhr, type){
	                me.resetload();
	            }
		    })
	    },
	    loadDownFn : function(me){
	    	$.ajax({
		    	url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysBannerList',
		    	datatype:'json',
		    	success:function(data){
		    		var Datadata = JSON.parse(data);
		    		var bannerData = Datadata.data;
		    		bannerhtml='<div class="swiper-container swiper-container1">';
		    		bannerhtml+='<div class="swiper-wrapper">'
		    		for(var i in bannerData){
						imgData=bannerData[i].img;
						bannerhtml+='<div class="swiper-slide" index="'+bannerData[i].type+'" data="'+bannerData[i].img_id+'">';
						for(var i in imgData){
							bannerhtml+='<img src="'+imgData[i].img_thumb+'">';
						}
						bannerhtml+='</div>';
		    		}
		    		bannerhtml+='</div>';
		    		bannerhtml+='</div>';
		    		$(".banner").html(bannerhtml);
		    		me.resetload();
		    		var swiper = new Swiper('.swiper-container1', {
				        paginationClickable: true,
				        spaceBetween: 30,
				        centeredSlides: true,
				        autoplay: 2000,
				        autoplayDisableOnInteraction: false
				    });
		    	}
		    })

		    boxhtml='<div class="swiper-container swiper-container2"><div class="swiper-wrapper"><div class="swiper-slide"><img src="img/2.png"></div><div class="swiper-slide"><img src="img/3.png"></div><div class="swiper-slide"><img src="img/4.png"></div><div class="swiper-slide"><img src="img/5.png"></div></div></div>';
	    	$(".box").html(boxhtml);
			me.resetload();
	    	var swiper = new Swiper('.swiper-container2', {
		        slidesPerView: 3,
		        paginationClickable: true,
		        spaceBetween: 15
		    });

		    $.ajax({
		    	url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysPageList&login_user_id=293969&post_create_time='+postTime,
		    	type:'GET',
		    	datatype:'json',
		    	success:function(data){
		    		var Data = JSON.parse(data);
		    		var toyData = Data.data;
		    		postTime=toyData[toyData.length-1].post_create_time;
		    		for(var i in toyData){
		    			moreType=toyData[i].type;
		    			// categoryId=toyData[i].category_id;
		    			contenthtml+='<div class="content">';
		    			contenthtml+='<div class="top"><span><a><img src="img/6.png"></a><a>'+toyData[i].cate_title+'</a></span><span class="more" index="'+toyData[i].category_id+'">'+toyData[i].more_title+'</span></div>';
		    			toysInfo=toyData[i].toys_info;
		    			contenthtml+='<div class="middle">';
		    			for(var i in toysInfo){
		    				toyType=toysInfo[i].type;
		    				contenthtml+='<div class="left" index="'+toysInfo[i].business_id+'"><dl><dt><img src="'+toysInfo[i].img_thumb+'"></dt><dd><p>'+toysInfo[i].business_title+'</p><p><span>'+toysInfo[i].sell_price+'</span><span>'+toysInfo[i].market_price+'</span></p></dd></dl></div>';
		    			}
		    			contenthtml+='</div>';
		    			contenthtml+='</div>';
		    		}

		    		$(".wrapper").append(contenthtml);
		    		me.resetload();
		    		
				    $(".content").on("click",".more",function(){
				    	
				    	 categoryId=$(this).attr("index");
				    	 console.log(categoryId)
				    	if(moreType==51){
				    		alert("玩具列表")
				    		window.call.callMethodToToysList(categoryId);//玩具列表
				    	}
				    })
				    $(".left").on("click",function(){
				    	toyID=$(this).attr("index");
				    	alert("123")
				    	if(toyType==52){
				    		alert("玩具详情");
					    	window.call.callMethodToToysDetail(toyID);//玩具详情
				    	}
				    })
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
		return;
	});
	$('.foot').on("tap",".pic1",function(event){
		event.preventDefault();
		$(this).addClass('active').siblings('li').removeClass('active');
		window.location.href='http://www.meimei.yihaoss.top/H5/toy/toy_all.html';
		return;
	});
	$('.foot').on("tap",".pic2",function(event){
		event.preventDefault();
		$(this).addClass('active').siblings('li').removeClass('active');
		window.location.href='http://www.meimei.yihaoss.top/H5/toy/toy_order.html';
		return;
	});

	// $(".banner").on("click",".swiper-slide",function(){
	// 	banType=$(this).attr("index");
	// 	imgId=$(this).attr("data")
 //    	if(banType==3){
	//     	window.call.callMethodToPostDetail(imgId);//话题
	//     }
	//     if(banType==9){
	//     	window.call.callMethodToToysList("1");//玩具列表
	//     }
	//     if(banType==10){
	//     	window.call.callMethodToToysDetail(imgId);//玩具详情
	//     }
 //    })


	 // $.ajax({
    // 	url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysBannerList',
    // 	datatype:'json',
    // 	success:function(data){
    // 		var Datadata = JSON.parse(data);
    // 		var bannerData = Datadata.data;
    		
    // 		bannerhtml+='<div class="swiper-container swiper-container1">';
    // 		bannerhtml+='<div class="swiper-wrapper">'
    // 		for(var i in bannerData){
				// imgData=bannerData[i].img;
				// // banType=bannerData[i].type;
				
				// bannerhtml+='<div class="swiper-slide" index="'+bannerData[i].type+'" data="'+bannerData[i].img_id+'">';
				// for(var i in imgData){
				// 	bannerhtml+='<img src="'+imgData[i].img_thumb+'">';
				// }
				
				// bannerhtml+='</div>';
				
    // 		}
    // 		bannerhtml+='</div>';
    // 		bannerhtml+='</div>';
    // 		$(".banner").html(bannerhtml);

    // 		$(".banner").on("click",".swiper-slide",function(){
    // 			banType=$(this).attr("index");
    // 			imgId=$(this).attr("data")
    // 			console.log(imgId)
		  //   	if(banType==3){
			 //    	alert("话题");
			 //    	window.call.callMethodToPostDetail(imgId);//话题
			 //    }
			 //    if(banType==9){
			 //    	alert("玩具列表");
			 //    	window.call.callMethodToToysList("1");//玩具列表
			 //    }
			 //    if(banType==10){
			 //    	alert("玩具详情");
			 //    	window.call.callMethodToToysDetail(imgId);//玩具详情
			 //    }
		  //   })
    // 	}

    // })

    // $.ajax({
    // 	url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysPageList&login_user_id=293969',
    // 	type:'GET',
    // 	datatype:'json',
    // 	success:function(data){
    // 		var Data = JSON.parse(data);
    // 		var toyData = Data.data;
    // 		for(var i in toyData){
    // 			moreType=toyData[i].type;
    // 			// categoryId=toyData[i].category_id;
    // 			contenthtml+='<div class="content">';
    // 			contenthtml+='<div class="top"><span><a><img src="img/6.png"></a><a>'+toyData[i].cate_title+'</a></span><span class="more" index="'+toyData[i].category_id+'">'+toyData[i].more_title+'</span></div>';
    // 			toysInfo=toyData[i].toys_info;
    // 			contenthtml+='<div class="middle">';
    // 			for(var i in toysInfo){
    // 				toyType=toysInfo[i].type;
    // 				contenthtml+='<div class="left" index="'+toysInfo[i].business_id+'"><dl><dt><img src="'+toysInfo[i].img_thumb+'"></dt><dd><p>'+toysInfo[i].business_title+'</p><p><span>'+toysInfo[i].sell_price+'</span><span>'+toysInfo[i].market_price+'</span></p></dd></dl></div>';
	    			
    // 			}
    // 			contenthtml+='</div>';
    // 			contenthtml+='</div>';
    // 		}

    // 		$(".wrapper").html(contenthtml)
    // 		var swiper = new Swiper('.swiper-container1', {
		  //       paginationClickable: true,
		  //       spaceBetween: 30,
		  //       centeredSlides: true,
		  //       autoplay: 2000,
		  //       autoplayDisableOnInteraction: false
		  //   });
		  //   $(".content").on("click",".more",function(){
		    	
		  //   	 categoryId=$(this).attr("index");
		  //   	 console.log(categoryId)
		  //   	if(moreType==51){
		  //   		alert("玩具列表")
		  //   		window.call.callMethodToToysList(categoryId);//玩具列表
		  //   	}
		  //   })
		  //   $(".left").on("click",function(){
		  //   	toyID=$(this).attr("index");
		  //   	alert("123")
		  //   	if(toyType==52){
		  //   		alert("玩具详情");
			 //    	window.call.callMethodToToysDetail(toyID);//玩具详情
		  //   	}
		  //   })
    // 	}
    // })

    

    
    


    


})













// window.call.callMethodToToysDetail("1");
    	// window.call.callMethodToLoginPage();//登陆页面
    	// alert(window.call.callMethodGetLoginUserId())//获取用户ID
    	// alert(window.call.callMethodIsLogin())//判断是否登陆
    	// window.call.callMethodFinish();//退出浏览器
    	//window.call.showToast("登陆");














