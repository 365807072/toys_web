$(function(){
    var itemIndex = 0;
    var tab1LoadEnd = false;
    var tab2LoadEnd = false;
    var tab3LoadEnd = false;
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
	var cont1_postTime="";
	var boxhtml=""
    var Data="";
	var playData="";
	var cont2_postTime="";
	var businessId="";
	var cont2_boxhtml="";
	var orderData="";
	var moneyhtml="";
	var orderStatus="";
	var cont3_boxhtml="";
	var isReset="";
	var cont3_postTime=""; 
	var login_user_id="";

    // tab
    $('.lists').eq(1).hide();
    $('.lists').eq(2).hide();

    function GetQueryString(name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if(r!=null)return  unescape(r[2]); return null;
	}
	if(GetQueryString("login_user_id")!=null && GetQueryString("login_user_id").length>-1){
    	login_user_id=GetQueryString("login_user_id");
    }
    if(GetQueryString("itemIndex")!=null && GetQueryString("itemIndex").length>-1){
    	itemIndex=GetQueryString("itemIndex");
    }else{
    	
    	itemIndex=0;
    }
    if(itemIndex=='0'){
    	$('.lists').eq(itemIndex).show().siblings('.lists').hide();
    	$.ajax({
                    type: 'GET',
                    url: 'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysBannerList',
                    dataType: 'json',
                    success: function(data){
		                var bannerData = data.data;
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
		             
                        $('.cont1_banner').html(bannerhtml);
                        // 每次数据加载完，必须重置
                        dropload.resetload();
                         var swiper = new Swiper('.swiper-container1', {
		                    paginationClickable: true,
		                    spaceBetween: 30,
		                    centeredSlides: true,
		                    autoplay: 2000,
		                    autoplayDisableOnInteraction: false
		                });
                    },
                    error: function(xhr, type){
                        alert('Ajax error!');
                        // 即使加载出错，也得重置
                        me.resetload();
                    }
        });
        boxhtml='<div class="swiper-container swiper-container2"><div class="swiper-wrapper"><div class="swiper-slide"><img src="img/2.png"></div><div class="swiper-slide"><img src="img/3.png"></div><div class="swiper-slide"><img src="img/4.png"></div><div class="swiper-slide"><img src="img/5.png"></div></div></div>';
		$(".cont1_box").html(boxhtml);
        		
		var swiper = new Swiper('.swiper-container2', {
            slidesPerView: 2.8,
            paginationClickable: true,
            spaceBetween: 15
        });

		$.ajax({
            url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysPageList&login_user_id='+login_user_id,
            type:'GET',
            datatype:'json',
            success:function(data){
            	
                var Data = JSON.parse(data);
                var toyData = Data.data;
                console.log(toyData)
                cont1_postTime=toyData[toyData.length-1].post_create_time;
                console.log(cont1_postTime);
                for(var i in toyData){
                    moreType=toyData[i].type;
                    // categoryId=toyData[i].category_id;
                    contenthtml+='<div class="cont1_content">';
                    contenthtml+='<div class="cont1_top"><span><a><img src="img/6.png"></a><a>'+toyData[i].cate_title+'</a></span><span class="more" index="'+toyData[i].category_id+'">'+toyData[i].more_title+'</span></div>';
                    toysInfo=toyData[i].toys_info;
                    contenthtml+='<div class="cont1_middle">';
                    for(var i in toysInfo){
                        toyType=toysInfo[i].type;
                        contenthtml+='<div class="cont1_left" index="'+toysInfo[i].business_id+'"><dl><dt><img src="'+toysInfo[i].img_thumb+'"></dt><dd><p>'+toysInfo[i].business_title+'</p><p><span>'+toysInfo[i].sell_price+'</span><span>'+toysInfo[i].market_price+'</span></p></dd></dl></div>';
                    }
                    contenthtml+='</div>';
                    contenthtml+='</div>';
                }

                $(".cont1_wrapper").html(contenthtml);
               
                
                // $(".cont1_content").on("click",".more",function(){
                    
                //      categoryId=$(this).attr("index");
                //      console.log(categoryId)
                //     if(moreType==51){
                //         alert("玩具列表")
                //         window.call.callMethodToToysList(categoryId);//玩具列表
                //     }
                // })
                $(".cont1_left").on("click",function(){
                    toyID=$(this).attr("index");
                    if(toyType==52){
                        //alert("玩具详情");
                        //window.call.callMethodToToysDetail(toyID);//玩具详情
      //                   var imghtml="";
						// imghtml=$(".cont1_wrapper").html();
						// var contUrl = location.href;
						// var Top= document.body.scrollTop;
						// window.sessionStorage.setItem("content1", imghtml);
						// window.sessionStorage.setItem("content1_url", contUrl);
						// window.sessionStorage.setItem("content1_top", Top);
                        window.location.href="http://www.meimei.yihaoss.top/H5/toy/toy_play.html?business_id="+toyID+"&login_user_id="+login_user_id+"&itemIndex=0";
                    }
                })
            }
        });

  //       window.onload=function(){
		// 	var newUrl=location.href;
			
		// 	var urlval=window.sessionStorage.getItem("content1_url");
		// 	if(newUrl==urlval){
		// 		var content1_html=window.sessionStorage.getItem("content1");
		// 		var offsetTop=window.sessionStorage.getItem("content1_top");
				
		// 		$(".cont1_wrapper").append(content1_html);
		// 		$(document).scrollTop(offsetTop);
		// 	}
		// }
		
    }else if(itemIndex=='1'){
    	
    	$('.lists').eq(itemIndex).show().siblings('.lists').hide();

    	$.ajax({
            url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysCategoryList&login_user_id='+login_user_id+'&is_order=0',
            type:'GET',
            datatype:'josn',
            success:function(data){
                Data=JSON.parse(data);
                playData=Data.data;
                cont2_postTime=playData[playData.length-1].post_create_time;
                cont2_boxhtml="";
                for(var i in playData){
                    cont2_boxhtml+='<div class="cont2_box" id='+playData[i].business_id+'>';
                    cont2_boxhtml+='<dl><dt><img src="'+playData[i].img_thumb+'"></dt><dd><p>'+playData[i].business_title+'</p><p><span><img src="'+playData[i].avatar+'"></span><span>'+playData[i].user_name+'</span></p><p>'+playData[i].support_name+'</p><p><span><img src="img/19.png"></span><span>'+playData[i].sell_price+'</span></p></dd></dl>';
                    cont2_boxhtml+='</div>';
                }
          
                $('.cont2_content').html(cont2_boxhtml);
                // 每次数据加载完，必须重置
              
                $(".cont2_box").on("click",function(){
                    // var imghtml="";
                    // imghtml=$(".cont2_content").html();
                    // var contUrl = location.href;
                    // var Top= document.body.scrollTop;
                    // window.sessionStorage.setItem("content2", imghtml);
                    // window.sessionStorage.setItem("content2_url", contUrl);
                    // window.sessionStorage.setItem("content2_top", Top);
                    var businessId=$(this).attr("id");
                    window.location.href="http://www.meimei.yihaoss.top/H5/toy/toy_play.html?business_id="+businessId+"&login_user_id="+login_user_id+"&itemIndex=1";
                })
                
            }
        });
        $('.foot .pic1').addClass('active').siblings('a').removeClass('active');
  //       window.onload=function(){
		// 	var newUrl=location.href;
			
		// 	var urlval=window.sessionStorage.getItem("content2_url");
		// 	if(newUrl==urlval){
		// 		var content2_html=window.sessionStorage.getItem("content2");
		// 		var offsetTop=window.sessionStorage.getItem("content2_top");
				
		// 		$(".cont2_content").append(content2_html);
		// 		$(document).scrollTop(offsetTop);
		// 	}
		// }
        
    }
    $('.foot .item').on('click',function(){

        var $this = $(this);
        itemIndex = $this.index();
        event.preventDefault();
		$(this).addClass('active').siblings('a').removeClass('active');
        $('.lists').eq(itemIndex).show().siblings('.lists').hide();
        // 如果选中菜单一
        if(itemIndex == '0'){
            // 如果数据没有加载完
            if(!tab1LoadEnd){
                // 解锁
                dropload.unlock();
                dropload.noData(false);
            }else{
                // 锁定
                dropload.lock('down');
                dropload.noData();
            }
        // 如果选中菜单二
        }else if(itemIndex == '1'){
            if(!tab2LoadEnd){
                // 解锁
                dropload.unlock();
                dropload.noData(false);
            }else{
                // 锁定
                dropload.lock('down');
                dropload.noData();
            }
        }else if(itemIndex == '2'){
            if(!tab3LoadEnd){
                // 解锁
                dropload.unlock();
                dropload.noData(false);
            }else{
                // 锁定
                dropload.lock('down');
                dropload.noData();
            }
        }
        // 重置
        dropload.resetload();
    });
    
    // dropload
    var dropload = $('.content').dropload({
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
            // 加载菜单一的数据
            if(itemIndex == '0'){
                $.ajax({
                    type: 'GET',
                    url: 'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysBannerList',
                    dataType: 'json',
                    success: function(data){
		                var bannerData = data.data;
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
		             
                        $('.cont1_banner').html(bannerhtml);
                        // 每次数据加载完，必须重置
                        dropload.resetload();
                         var swiper = new Swiper('.swiper-container1', {
		                    paginationClickable: true,
		                    spaceBetween: 30,
		                    centeredSlides: true,
		                    autoplay: 2000,
		                    autoplayDisableOnInteraction: false
		                });
                    },
                    error: function(xhr, type){
                        alert('Ajax error!');
                        // 即使加载出错，也得重置
                        me.resetload();
                    }
                });
                boxhtml='<div class="swiper-container swiper-container2"><div class="swiper-wrapper"><div class="swiper-slide"><img src="img/2.png"></div><div class="swiper-slide"><img src="img/3.png"></div><div class="swiper-slide"><img src="img/4.png"></div><div class="swiper-slide"><img src="img/5.png"></div></div></div>';
        		$(".cont1_box").html(boxhtml);
        		dropload.resetload();
        		var swiper = new Swiper('.swiper-container2', {
		            slidesPerView: 2.8,
		            paginationClickable: true,
		            spaceBetween: 15
		        });
        		$.ajax({
		            url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysPageList&login_user_id='+login_user_id,
		            type:'GET',
		            datatype:'json',
		            success:function(data){
		                var Data = JSON.parse(data);
		                var toyData = Data.data;
		                contenthtml="";
		                for(var i in toyData){
		                    moreType=toyData[i].type;
		                    // categoryId=toyData[i].category_id;
		                    contenthtml+='<div class="cont1_content">';
		                    contenthtml+='<div class="cont1_top"><span><a><img src="img/6.png"></a><a>'+toyData[i].cate_title+'</a></span><span class="more" index="'+toyData[i].category_id+'">'+toyData[i].more_title+'</span></div>';
		                    toysInfo=toyData[i].toys_info;
		                    contenthtml+='<div class="cont1_middle">';
		                    for(var i in toysInfo){
		                        toyType=toysInfo[i].type;
		                        contenthtml+='<div class="cont1_left" index="'+toysInfo[i].business_id+'"><dl><dt><img src="'+toysInfo[i].img_thumb+'"></dt><dd><p>'+toysInfo[i].business_title+'</p><p><span>'+toysInfo[i].sell_price+'</span><span>'+toysInfo[i].market_price+'</span></p></dd></dl></div>';
		                    }
		                    contenthtml+='</div>';
		                    contenthtml+='</div>';
		                }

		                $(".cont1_wrapper").html(contenthtml);
		               	dropload.resetload();
		                 
		                $(".cont1_content").on("click",".more",function(){
		                    
		                     categoryId=$(this).attr("index");
		                     console.log(categoryId)
		                    if(moreType==51){
		                        alert("玩具列表")
		                        window.call.callMethodToToysList(categoryId);//玩具列表
		                     
		                    }
		                })
		                $(".cont1_left").on("click",function(){
		                    toyID=$(this).attr("index");
		                    if(toyType==52){
		                        //alert("玩具详情");
		                       // window.call.callMethodToToysDetail(toyID);//玩具详情
		                         window.location.href="http://www.meimei.yihaoss.top/H5/toy/toy_play.html?business_id="+toyID+"&login_user_id="+login_user_id;
		                    }
		                })
		            },
		            error: function(xhr, type){
		                me.resetload();
		            }
		        })
            // 加载菜单二的数据
            }else if(itemIndex == '1'){
                $.ajax({
                    url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysCategoryList&login_user_id='+login_user_id+'&is_order=0',
	                type:'GET',
	                datatype:'josn',
	                success:function(data){
	                    Data=JSON.parse(data);
	                    playData=Data.data;
	                    cont2_boxhtml="";
	                    for(var i in playData){
	                        cont2_boxhtml='<div class="cont2_box" id='+playData[i].business_id+'>';
	                        cont2_boxhtml+='<dl><dt><img src="'+playData[i].img_thumb+'"></dt><dd><p>'+playData[i].business_title+'</p><p><span><img src="'+playData[i].avatar+'"></span><span>'+playData[i].user_name+'</span></p><p>'+playData[i].support_name+'</p><p><span><img src="img/19.png"></span><span>'+playData[i].sell_price+'</span></p></dd></dl>';
	                        cont2_boxhtml+='</div>';
	                    }
                  		
                        $('.cont2_content').html(cont2_boxhtml);
                        dropload.resetload();
                        $(".cont2_box").on("click",function(){
							var businessId=$(this).attr("id");
							window.location.href="http://www.meimei.yihaoss.top/H5/toy/toy_play.html?business_id="+businessId+"&login_user_id="+login_user_id;
						})
                        // 每次数据加载完，必须重置
                        
	                },
	                error: function(xhr, type){
	                    alert('Ajax error!');
	                    // 即使加载出错，也得重置
	                    me.resetload();
	                }
            	});
            }else if(itemIndex == '2'){
            	$.ajax({
            		url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysOrderList&login_user_id='+login_user_id,
	                type:'GET',
	                datatype:'json',
	                success:function(data){
	                    var Data=JSON.parse(data);
	                    orderData=Data.data;
	                    cont3_boxhtml="";
	                    for(var i in orderData){
	                        orderStatus=orderData[i].order_status;
	                        isReset=orderData[i].is_reset;
	                        if(orderStatus==1){
	                            $(".cont3_money").show();
	                            var moneyData=orderData[0];
	                            moneyhtml='<p><span>'+moneyData.business_title+'</span><span>'+moneyData.sell_price+'</span></p>';
	                            $(".cont3_money").html(moneyhtml);
	                            
	                        }else{
	                            cont3_boxhtml='<div class="cont3_content">';
	                            cont3_boxhtml+='<dl><dt><img src="'+orderData[i].img_thumb+'"></dt><dd><p><span>'+orderData[i].business_title+'</span><span>'+orderData[i].sell_price+'</span></p><p>'+orderData[i].status_name+'</p><p class="pp"><a class="remove">删除订单</a><a class="again">再租一次</a></p></dd></dl>';
	                            cont3_boxhtml+='</div>';
	                            if(isReset==0){
	                                $(".cont3_content dl dd .pp").hide();
	                            }
	                        }
	                    }
	                    $('.cont3_box').html(cont3_boxhtml);
	                    // 每次数据加载完，必须重置
	                    dropload.resetload();
	                },error: function(xhr, type){
	                    alert('Ajax error!');
	                    // 即使加载出错，也得重置
	                    me.resetload();
	                }
            	})
            	
            }
        },
        loadDownFn : function(me){
            // 加载菜单一的数据
            if(itemIndex == '0'){
                $.ajax({
                    type: 'GET',
                    url: 'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysBannerList',
                    dataType: 'json',
                    success: function(data){
		                var bannerData = data.data;
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
		             
                        $('.cont1_banner').html(bannerhtml);
                        // 每次数据加载完，必须重置
                        me.resetload();
                         var swiper = new Swiper('.swiper-container1', {
		                    paginationClickable: true,
		                    spaceBetween: 30,
		                    centeredSlides: true,
		                    autoplay: 2000,
		                    autoplayDisableOnInteraction: false
		                });
                    },
                    error: function(xhr, type){
                        alert('Ajax error!');
                        // 即使加载出错，也得重置
                        me.resetload();
                    }
                });
                boxhtml='<div class="swiper-container swiper-container2"><div class="swiper-wrapper"><div class="swiper-slide"><img src="img/2.png"></div><div class="swiper-slide"><img src="img/3.png"></div><div class="swiper-slide"><img src="img/4.png"></div><div class="swiper-slide"><img src="img/5.png"></div></div></div>';
        		$(".cont1_box").html(boxhtml);

        		var swiper = new Swiper('.swiper-container2', {
		            slidesPerView: 2.8,
		            paginationClickable: true,
		            spaceBetween: 15
		        });
        		$.ajax({
		            url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysPageList&login_user_id='+login_user_id+'&post_create_time='+cont1_postTime,
		            type:'GET',
		            datatype:'json',
		            success:function(data){
		                var Data = JSON.parse(data);
		                var toyData = Data.data;
		                cont1_postTime=toyData[toyData.length-1].post_create_time;
		                for(var i in toyData){
		                    moreType=toyData[i].type;
		                    // categoryId=toyData[i].category_id;
		                    contenthtml+='<div class="cont1_content">';
		                    contenthtml+='<div class="cont1_top"><span><a><img src="img/6.png"></a><a>'+toyData[i].cate_title+'</a></span><span class="more" index="'+toyData[i].category_id+'">'+toyData[i].more_title+'</span></div>';
		                    toysInfo=toyData[i].toys_info;
		                    contenthtml+='<div class="cont1_middle">';
		                    for(var i in toysInfo){
		                        toyType=toysInfo[i].type;
		                        contenthtml+='<div class="cont1_left" index="'+toysInfo[i].business_id+'"><dl><dt><img src="'+toysInfo[i].img_thumb+'"></dt><dd><p>'+toysInfo[i].business_title+'</p><p><span>'+toysInfo[i].sell_price+'</span><span>'+toysInfo[i].market_price+'</span></p></dd></dl></div>';
		                    }
		                    contenthtml+='</div>';
		                    contenthtml+='</div>';
		                }

		                $(".cont1_wrapper").append(contenthtml);
		               	me.resetload();
		                
		                $(".cont1_content").on("click",".more",function(){
		                    
		                     categoryId=$(this).attr("index");
		                     console.log(categoryId)
		                    if(moreType==51){
		                        alert("玩具列表")
		                        window.call.callMethodToToysList(categoryId);//玩具列表
		                    }
		                })
		                $(".cont1_left").on("click",function(){
		                    toyID=$(this).attr("index");
		                    if(toyType==52){
		                        //alert("玩具详情");
		                        //window.call.callMethodToToysDetail(toyID);//玩具详情
		                        var imghtml="";
								imghtml=$(".cont1_wrapper").html();
								var contUrl = location.href;
								var Top= document.body.scrollTop;
								window.sessionStorage.setItem("content1", imghtml);
								window.sessionStorage.setItem("content1_url", contUrl);
								window.sessionStorage.setItem("content1_top", Top);
		                        window.location.href="http://www.meimei.yihaoss.top/H5/toy/toy_play.html?business_id="+toyID+"&login_user_id="+login_user_id+"&itemIndex=0";
		                    }
		                })
		            },
		            error: function(xhr, type){
		                me.resetload();
		            }
		        })

            // 加载菜单二的数据
            }else if(itemIndex == '1'){
                $.ajax({
                    url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysCategoryList&login_user_id='+login_user_id+'&is_order=0&post_create_time='+cont2_postTime,
	                type:'GET',
	                datatype:'josn',
	                success:function(data){
	                    Data=JSON.parse(data);
	                    playData=Data.data;
	                    cont2_postTime=playData[playData.length-1].post_create_time;
	                    cont2_boxhtml="";
	                    for(var i in playData){
	                        cont2_boxhtml+='<div class="cont2_box" id='+playData[i].business_id+'>';
	                        cont2_boxhtml+='<dl><dt><img src="'+playData[i].img_thumb+'"></dt><dd><p>'+playData[i].business_title+'</p><p><span><img src="'+playData[i].avatar+'"></span><span>'+playData[i].user_name+'</span></p><p>'+playData[i].support_name+'</p><p><span><img src="img/19.png"></span><span>'+playData[i].sell_price+'</span></p></dd></dl>';
	                        cont2_boxhtml+='</div>';
	                    }
                  
                        $('.cont2_content').append(cont2_boxhtml);
                        // 每次数据加载完，必须重置
                         me.resetload();
                        $(".cont2_box").on("click",function(){
							var imghtml="";
							imghtml=$(".cont2_content").html();
							var contUrl = location.href;
							var Top= document.body.scrollTop;
							window.sessionStorage.setItem("content2", imghtml);
							window.sessionStorage.setItem("content2_url", contUrl);
							window.sessionStorage.setItem("content2_top", Top);
							var businessId=$(this).attr("id");
							window.location.href="http://www.meimei.yihaoss.top/H5/toy/toy_play.html?business_id="+businessId+"&login_user_id="+login_user_id+"&itemIndex=1";
						})
                        
	                },
	                error: function(xhr, type){
	                    alert('Ajax error!');
	                    // 即使加载出错，也得重置
	                    me.resetload();
	                }
            	});
            }else if(itemIndex == '2'){
            	$.ajax({
            		url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysOrderList&login_user_id='+login_user_id+'&post_create_time='+cont3_postTime,
	                type:'GET',
	                datatype:'json',
	                success:function(data){
	                    var Data=JSON.parse(data);
	                    orderData=Data.data;
	                    cont3_postTime=orderData[orderData.length-1].post_create_time;

	                    for(var i in orderData){
	                        orderStatus=orderData[i].order_status;
	                        isReset=orderData[i].is_reset;
	                        if(orderStatus==1){
	                            $(".cont3_money").show();
	                            var moneyData=orderData[0];
	                            moneyhtml='<p><span>'+moneyData.business_title+'</span><span>'+moneyData.sell_price+'</span></p>';
	                            $(".cont3_money").html(moneyhtml);
	                            
	                        }else{
	                            cont3_boxhtml+='<div class="cont3_content">';
	                            cont3_boxhtml+='<dl><dt><img src="'+orderData[i].img_thumb+'"></dt><dd><p><span>'+orderData[i].business_title+'</span><span>'+orderData[i].sell_price+'</span></p><p>'+orderData[i].status_name+'</p><p class="pp"><a class="remove">删除订单</a><a class="again">再租一次</a></p></dd></dl>';
	                            cont3_boxhtml+='</div>';
	                            if(isReset==0){
	                                $(".cont3_content dl dd .pp").hide();
	                            }
	                        }
	                    }
	                    $('.lists').eq(2).append(cont3_boxhtml);
	                    // 每次数据加载完，必须重置
	                    me.resetload();
	                },error: function(xhr, type){
	                    alert('Ajax error!');
	                    // 即使加载出错，也得重置
	                    me.resetload();
	                }
            	})
            	
            }
        }
    });

	
	
});