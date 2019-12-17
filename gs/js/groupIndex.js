$(function(){
	headGet();
	var url = location.href;
	url = url.substring(url.indexOf("?")+1).split("&");
	var login_user_id = url[0].substring(url[0].indexOf("=")+1);
	var group_id = url[1].substring(url[1].indexOf("=")+1);
	var time="";
	var imgId="";
	var userId="";
	var picId="";
	var groupList="";
	// var session=window.sessionStorage;
	// var count=0;
	var stateType="";
	var business_Id="";
	var post_Url="";
	var video_Url="";
	// session.getItem("conut");
	// if(session.getItem("conut")){
	// 	for(var i=0;i<session.getItem("conut");i++){
	// 		boxGet();
	// 	}
	// }

	// dropload
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
	    	var groupData="";
			var imgStyle="";
	        $.ajax({
	            type: 'GET',
	            url: 'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/webGroupListingPage&login_user_id='+login_user_id+'&group_id='+group_id,
	            dataType: 'json',
	            success: function(data){
					groupList=data.data;

					var contenthtml="";
					for(var i in groupList){
						imgStyle=groupList[i].img_style;
						groupImg=groupList[i].img;
						userId=groupList[i].user_id;
						// stateType=groupList[i].type;
						// businessId=groupList[i].business_id;
						// postUrl=groupList[i].post_url;
						console.log(groupList[i].video_url);
						if(imgStyle==5){//纯文字显示
								contenthtml+="<div class='content' data_video_url="+groupList[i].video_url+" data_business_id="+groupList[i].business_id+" data_post_url="+groupList[i].post_url+">";
								contenthtml+="<dl><dd class='on'><h1>"+groupList[i].img_title+"</h1><p><span>"+groupList[i].user_name+"</span><span><a>"+groupList[i].post_count+"</a>观看</span></p></dl>";
								contenthtml+="</div>";
							
						}else if(imgStyle==6){//文字和小图
							contenthtml+="<div class='content' data_video_url="+groupList[i].video_url+" data_business_id="+groupList[i].business_id+" data_post_url="+groupList[i].post_url+">";
							contenthtml+="<dl><dd class='art'><h1>"+groupList[i].img_title+"</h1><p><span>"+groupList[i].user_name+"</span><span><a>"+groupList[i].post_count+"</a>观看</span></p></dd>";
							
							for(var i in groupImg){
								contenthtml+="<dt><img src='"+groupImg[i].img_thumb+"'></dt></dl>"
							}
							contenthtml+="</div>";
							
						}else if(imgStyle==7){//文字和小图视频
								contenthtml+="<div class='content' data_video_url="+groupList[i].video_url+" data_business_id="+groupList[i].business_id+" data_post_url="+groupList[i].post_url+">";
								contenthtml+="<dl><dd class='art'><h1>"+groupList[i].img_title+"</h1><p><span>"+groupList[i].user_name+"</span><span><a>"+groupList[i].post_count+"</a>观看</span></p></dd>";
								groupImg=groupList[i].img;
								for(var i in groupImg){
									contenthtml+="<dt style='background:url("+groupImg[i].img_thumb+");background-size: cover;background-repeat:no-repeat;margin-top:0.16rem;'><img src='img/play_btn.png' class='video'></dt></dl>"
								}
								contenthtml+="</div>";
						}else if(imgStyle==8){
							contenthtml+="<div class='content' data_video_url="+groupList[i].video_url+" data_business_id="+groupList[i].business_id+" data_post_url="+groupList[i].post_url+">";
							contenthtml+="<dl class='aa'><dt><img src='"+groupList[i].img[i].img_thumb+"'></dt><dd><h1>"+groupList[i].img_title+"</h1><p>"+groupList[i].img_description+"</p><p><img src='img/text.png'></p></dd></dl>";
							// 为了测试，延迟1秒加载
							contenthtml+="</div>";
		                    
						}else{
							contenthtml+="<div class='content' data_video_url="+groupList[i].video_url+" data_business_id="+groupList[i].business_id+" data_post_url="+groupList[i].post_url+">";
							contenthtml+="<dl><dd class='on'><h1>"+groupList[i].img_title+"</h1><p><span>"+groupList[i].user_name+"</span><span><a>"+groupList[i].post_count+"</a>观看</span></p></dl>";
							contenthtml+="</div>";
						}
					};
					$(".wrapper").html(contenthtml);
	            	me.resetload();
	            },
	            error: function(xhr, type){
	                me.resetload();
	            }
	        
			});
	    },
	    loadDownFn : function(me){
	    	var groupData="";
			var imgStyle="";

	        $.ajax({
	            type: 'GET',
	            url: 'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/webGroupListingPage&login_user_id='+login_user_id+'&group_id='+group_id+'&post_create_time='+time,
	            dataType: 'json',
	            success: function(data){
					groupList=data.data;
					console.log(groupList);
					time=groupList[groupList.length-1].post_create_time;
					
					var contenthtml="";
					for(var i in groupList){
						imgStyle=groupList[i].img_style;
						groupImg=groupList[i].img;
						userId=groupList[i].user_id;
						// stateType=groupList[i].type;
						 console.log(groupList[i].post_url);
						// postUrl=groupList[i].post_url;
						// console.log(stateType);
						console.log(groupList[i].video_url);
						if(imgStyle==5){//纯文字显示
							contenthtml+="<div class='content' data_video_url="+groupList[i].video_url+" data_business_id="+groupList[i].business_id+" data_post_url="+groupList[i].post_url+">";
							contenthtml+="<dl><dd class='on'><h1>"+groupList[i].img_title+"</h1><p><span>"+groupList[i].user_name+"</span><span><a>"+groupList[i].post_count+"</a>观看</span></p></dl>";
							contenthtml+="</div>";
						}else if(imgStyle==6){//文字和小图
							contenthtml+="<div class='content' data_video_url="+groupList[i].video_url+" data_business_id="+groupList[i].business_id+" data_post_url="+groupList[i].post_url+">";
							contenthtml+="<dl><dd class='art'><h1>"+groupList[i].img_title+"</h1><p><span>"+groupList[i].user_name+"</span><span><a>"+groupList[i].post_count+"</a>观看</span></p></dd>";
							for(var i in groupImg){
								contenthtml+="<dt><img src='"+groupImg[i].img_thumb+"'></dt></dl>"
							}
							contenthtml+="</div>";
						}else if(imgStyle==7){//文字和小图视频
							contenthtml+="<div class='content' data_video_url="+groupList[i].video_url+" data_business_id="+groupList[i].business_id+" data_post_url="+groupList[i].post_url+">";
							contenthtml+="<dl><dd class='art'><h1>"+groupList[i].img_title+"</h1><p><span>"+groupList[i].user_name+"</span><span><a>"+groupList[i].post_count+"</a>观看</span></p></dd>";
							groupImg=groupList[i].img;
							for(var i in groupImg){
								contenthtml+="<dt style='background:url("+groupImg[i].img_thumb+");background-size: cover;background-repeat:no-repeat;margin-top:0.16rem;'><img src='img/play_btn.png' class='video'></dt></dl>"
							}
							contenthtml+="</div>";
						}else if(imgStyle==8){
							contenthtml+="<div class='content' data_video_url="+groupList[i].video_url+" data_business_id="+groupList[i].business_id+" data_post_url="+groupList[i].post_url+">";
							contenthtml+="<dl class='aa'><dt><img src='"+groupList[i].img[i].img_thumb+"'></dt><dd><h1>"+groupList[i].img_title+"</h1><p>"+groupList[i].img_description+"</p><p><img src='img/text.png'></p></dd></dl>";
		                    contenthtml+="</div>";
						}else{
							contenthtml+="<div class='content' data_video_url="+groupList[i].video_url+" data_business_id="+groupList[i].business_id+" data_post_url="+groupList[i].post_url+">";
							contenthtml+="<dl><dd class='on'><h1>"+groupList[i].img_title+"</h1><p><span>"+groupList[i].user_name+"</span><span><a>"+groupList[i].post_count+"</a>观看</span></p></dl>";
							contenthtml+="</div>";
						}
					};
					$(".wrapper").append(contenthtml);
	            	me.resetload();
	            	// count++;
	            	// session.count=count;
	            },
	            error: function(xhr, type){
	                me.resetload();
	            }
	        })
	    },
	    threshold : 50
	});
		alert(video_Url);
		alert(business_Id);
		alert(post_Url);
	$(".wrapper").on("click",".content",function(){
		var index = ""+$(this).index()+"";
		index = index.substr(-1)*1;
		// alert(index);
		// alert($(this).attr("data_video_url"));
		video_Url=$(this).attr("data_video_url");
		business_Id=$(this).attr("data_business_id");
		post_Url=$(this).attr("data_post_url");
		alert(video_Url);
		alert(business_Id);
		alert(post_Url);
		if(video_Url == ""){ 

			window.location.href='http://www.meimei.yihaoss.top/fenxiang/postbardetial.html?img_id='+groupList[parseInt(index)].img[0].img_id+'&user_id='+userId;
		}else{
			window.location.href='http://www.meimei.yihaoss.top/fenxiang/video.html?user_id='+userId+'&img_id='+groupList[parseInt(index)].img[0].img_id;
		};
		if(business_Id){
			window.location.href='http://www.meimei.yihaoss.top/business/business_details.html?login_user_id='+userId+'&business_id='+groupList[parseInt(index)].business_id;
		}
		if(post_Url){
			window.location.href=groupList[parseInt(index)].post_url;
		};


		// if(stateType==2){
		// 	alert(stateType);
		// 	window.location.href='http://www.meimei.yihaoss.top/fenxiang/postbardetial.html?img_id='+groupList[parseInt(index)].img[0].img_id+'&user_id='+userId;
		// }else if(stateType==3){
		// 	alert(stateType);
		// 	window.location.href='http://www.meimei.yihaoss.top/fenxiang/video.html?user_id='+userId+'&img_id='+groupList[parseInt(index)].img[0].img_id;}
	});


});	


function headGet(){
	var url = location.href;
	url = url.substring(url.indexOf("?")+1).split("&");
	var login_user_id = url[0].substring(url[0].indexOf("=")+1);
	var group_id = url[1].substring(url[1].indexOf("=")+1);
	var headData="";
	var headerData="";
	var headhtml="";
	var colorIndex="";
	var textColor="";
	$.ajax({
		url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/groupHeadInfo&login_user_id='+login_user_id+'&group_id='+group_id,
		type:'GET',
		datatype:'JSON',
		success:function(data){
			headData=JSON.parse(data);
			headerData=headData.data;
			colorIndex=headerData.color_index;
			if(colorIndex==1){
				textColor="#fd625f";
			}else if(colorIndex==2){
				textColor="#fefa56";
			}else if(colorIndex==3){
				textColor="#f5f5f5";
			}else if(colorIndex==4){
				textColor="#333";
			}else if(colorIndex==5){
				textColor="7a8eff";
			}
			headhtml="<div class='head' style='width:100%;height:3rem;background:url("+headerData.cover+");background-repeat: no-repeat;background-position: 69% 66%;background-size: cover;'><p style='color:"+textColor+"'>"+headerData.group_name+"</p><p style='color:"+textColor+"'>"+headerData.description+"</p><span class='count' style='color:"+textColor+"'><a style='color:"+textColor+"'>"+headerData.idol_count+"</a>人已关注</span></div><div class='headBottom'>"+headerData.recommend_title+"</div>";
			$("header").html(headhtml);
		}
	})
}
// function boxGet(){
// 	var groupData="";
// 	var imgStyle="";
//     $.ajax({
//         type: 'GET',
//         url: 'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/webGroupListingPage&login_user_id='+login_user_id+'&group_id='+group_id,
//         dataType: 'json',
//         success: function(data){
// 			groupList=data.data;
// 			var contenthtml="";
// 			for(var i in groupList){
// 				imgStyle=groupList[i].img_style;
// 				groupImg=groupList[i].img;
// 				userId=groupList[i].user_id;
// 				if(imgStyle==5){//纯文字显示
// 						contenthtml+="<div class='content'>";
// 						contenthtml+="<dl><dd class='on'><h1>"+groupList[i].img_title+"</h1><p><span>"+groupList[i].user_name+"</span><span><a>"+groupList[i].post_count+"</a>观看</span></p></dl>";
// 						contenthtml+="</div>";
					
// 				}else if(imgStyle==6){//文字和小图
// 					contenthtml+="<div class='content'>";
// 					contenthtml+="<dl><dd class='art'><h1>"+groupList[i].img_title+"</h1><p><span>"+groupList[i].user_name+"</span><span><a>"+groupList[i].post_count+"</a>观看</span></p></dd>";
					
// 					for(var i in groupImg){
// 						contenthtml+="<dt><img src='"+groupImg[i].img_thumb+"'></dt></dl>"
// 					}
// 					contenthtml+="</div>";
					
// 				}else if(imgStyle==7){//文字和小图视频
// 						contenthtml+="<div class='content'>";
// 						contenthtml+="<dl><dd class='art'><h1>"+groupList[i].img_title+"</h1><p><span>"+groupList[i].user_name+"</span><span><a>"+groupList[i].post_count+"</a>观看</span></p></dd>";
// 						groupImg=groupList[i].img;
// 						for(var i in groupImg){
// 							contenthtml+="<dt style='background:url("+groupImg[i].img_thumb+");background-size: 100% 100%;background-repeat:no-repeat;margin-top:0.16rem;'><img src='img/play_btn.png' class='video'></dt></dl>"
// 						}
// 						contenthtml+="</div>";
// 				}else if(imgStyle==8){
// 					contenthtml+="<div class='content'>";
// 					contenthtml+="<dl class='aa'><dt><img src='"+groupList[i].img[i].img_thumb+"'></dt><dd><h1>"+groupList[i].img_title+"</h1><p>"+groupList[i].img_description+"</p><p><img src='img/text.png'></p></dd></dl>";
// 					// 为了测试，延迟1秒加载
// 					contenthtml+="</div>";
                    
// 				}else{
// 					contenthtml+="<div class='content'>";
// 					contenthtml+="<dl><dd class='on'><h1>"+groupList[i].img_title+"</h1><p><span>"+groupList[i].user_name+"</span><span><a>"+groupList[i].post_count+"</a>观看</span></p></dl>";
// 					contenthtml+="</div>";
// 				}
// 			};
// 			$(".wrapper").html(contenthtml);
        	
//         },
//         error: function(xhr, type){
//             me.resetload();
//         }
    
// 	});
// }









