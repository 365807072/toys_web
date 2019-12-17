//第一个页面
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
var boxhtml="";


$('#top').dropload({
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
                $(".cont1_banner").html(bannerhtml);
                me.resetload();
            }
        })

        boxhtml='<div class="swiper-container swiper-container2"><div class="swiper-wrapper"><div class="swiper-slide"><img src="img/2.png"></div><div class="swiper-slide"><img src="img/3.png"></div><div class="swiper-slide"><img src="img/4.png"></div><div class="swiper-slide"><img src="img/5.png"></div></div></div>';
        $(".cont1_box").html(boxhtml);
       
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
                me.resetload();
                var swiper = new Swiper('.swiper-container1', {
                    paginationClickable: true,
                    spaceBetween: 30,
                    centeredSlides: true,
                    autoplay: 2000,
                    autoplayDisableOnInteraction: false
                });
                $(".cont1_content").on("click",".more",function(){
                    
                     categoryId=$(this).attr("index");
                     
                    if(moreType==51){
                        
                        window.call.callMethodToToysList(categoryId);//玩具列表
                    }
                })
                $(".cont1_left").on("click",function(){
                    toyID=$(this).attr("index");
                    
                    if(toyType==52){
                        
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
                $(".cont1_banner").html(bannerhtml);
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
        $(".cont1_box").html(boxhtml);
         me.resetload();
        var swiper = new Swiper('.swiper-container2', {
            slidesPerView: 3,
            paginationClickable: true,
            spaceBetween: 15
        });

        $.ajax({
            url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysPageList&login_user_id=293969&post_create_time='+cont1_postTime,
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


//第二个页面
var Data="";
var playData="";
var cont2_postTime="";
var businessId="";
var cont2_boxhtml="";


$('#top').dropload({
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
                    Data=JSON.parse(data);
                    playData=Data.data;
                    for(var i in playData){
                        cont2_boxhtml+='<div class="cont2_box" id='+playData[i].business_id+'>';
                        cont2_boxhtml+='<dl><dt><img src="'+playData[i].img_thumb+'"></dt><dd><p>'+playData[i].business_title+'</p><p><span><img src="'+playData[i].avatar+'"></span><span>'+playData[i].user_name+'</span></p><p>'+playData[i].support_name+'</p><p><span><img src="img/19.png"></span><span>'+playData[i].sell_price+'</span></p></dd></dl>';
                        cont2_boxhtml+='</div>';
                    }
                    $(".cont2_content").html(cont2_boxhtml);
                    me.resetload();
                },
                error: function(xhr, type){
                    me.resetload();
                }
            })
        },
        loadDownFn : function(me){
            $.ajax({
                url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/getToysCategoryList&login_user_id=293969&is_order=0&post_create_time='+cont2_postTime,
                type:'GET',
                datatype:'josn',
                success:function(data){
                    Data=JSON.parse(data);
                    playData=Data.data;
                    
                    cont2_postTime=playData[playData.length-1].post_create_time;
                    for(var i in playData){
                        cont2_boxhtml+='<div class="cont2_box" id='+playData[i].business_id+'>';
                        cont2_boxhtml+='<dl><dt><img src="'+playData[i].img_thumb+'"></dt><dd><p>'+playData[i].business_title+'</p><p><span><img src="'+playData[i].avatar+'"></span><span>'+playData[i].user_name+'</span></p><p>'+playData[i].support_name+'</p><p><span><img src="img/19.png"></span><span>'+playData[i].sell_price+'</span></p></dd></dl>';
                        cont2_boxhtml+='</div>';
                    }
                    $(".cont2_content").append(cont2_boxhtml);
                    me.resetload();
                },
                error: function(xhr, type){
                    me.resetload();
                }
            })
        },
        threshold : 50
    });
 


    var oLi = document.getElementById("tabs").getElementsByTagName("li");
    var oUl = document.getElementById("top").getElementsByTagName("section");
    
    for(var i = 0; i < oLi.length; i++){
        oLi[i].index = i;
        oLi[i].onmouseover = function (){
           
            for(var n = 0; n < oLi.length; n++) oLi[0].className="pic";
            this.className = "pic active";
            for(var n = 0; n < oLi.length; n++) oLi[1].className="pic1";
            this.className = "pic1 active";
            for(var n = 0; n < oUl.length; n++) oUl[n].style.display = "none";
            oUl[this.index].style.display = "block"
        }   
    }




































