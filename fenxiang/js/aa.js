$(function(){

  var contentResult=false;//是否获取主体数据
  var commentResult=false;//是否获取评论数据
  var contentData = null; // 主题信息
  var commentData = null; // 评论信息
  var isInitComment = false;
  var login_userId="";
  var txtval="";
  var tthtml=""
  var openid="";
var user_id="";
var img_id="";
var comdata="";

function GetQueryString(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null)return  unescape(r[2]); return null;
  }
if(GetQueryString("login_user_id")!=null && GetQueryString("login_user_id").length>-1){
    user_id=GetQueryString("login_user_id");
    alert(user_id)
}
if(GetQueryString("business_id")!=null && GetQueryString("business_id").length>-1){
    img_id=GetQueryString("business_id");
    alert(img_id)
}
window.alert = function(name){
 var iframe = document.createElement("IFRAME");
iframe.style.display="none";
iframe.setAttribute("src", 'data:text/plain,');
document.documentElement.appendChild(iframe);
window.frames[0].window.alert(name);
iframe.parentNode.removeChild(iframe);
}
var href="";

   //获取url
    
    var code="";
    var state="";
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


//点击进入下载
    $("#btn_immediately_download").on("click",function(){

        $(".mask").show();
        $(".tipContainer").show();  
    
        //判断是否是微信
        function isWeiXin(){
           var ua = window.navigator.userAgent.toLowerCase();
           if(ua.match(/MicroMessenger/i) == 'micromessenger'){
               return true;
           }else{
               return false;
           }
        }



         $(function () {
              var u = navigator.userAgent, app = navigator.appVersion;
              var isAndroid = u.indexOf('Android') > -1; //安卓终端
              var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
              if (isAndroid) {
                  $(".android_download_tip").show();
                  $(".ios_download_tip").hide();
                  window.location.href = 'http://www.meimei.yihaoss.top/download/GoodLife_luntan_v6.8.apk';
              }
              if (isIOS) {
                  $(".android_download_tip").hide();
                  $(".ios_download_tip").show();
                  window.location.href = 'itms://itunes.apple.com/cn/app/bao-bao-xiu-xiu/id789847552?mt=8';
              }   
        });
    })

 //渲染评论数据
    $.ajax({
            url:'http://www.meimei.yihaoss.top/php/shareReviews.php?img_id='+img_id+'&user_id='+user_id,
            type:"get",
            dataType:"json",
            success:function(data){
            
                commentResult=true; // 表示已经获取评论的标记
                commentData = data;
                comdata=commentData.data;
                if(contentResult==true&&commentResult==true && !isInitComment){
                      isInitComment = true;
                      var titleHtml = "";
                      var contentHtml = "";
                      var commentHtml = "";

            

                  // 初始化评论
                  if(comdata.length==0){
                      $(".wrap").hide();
                      $(".pl").hide();
                  }else{
                        var commentHtml="";
                        var hintHtml="";
                        hintHtml="<p>评论</p>";
              
                        for(var i in commentData.data){
                            commentHtml="<div class='wenzi1'></div>";
                            for(var i in commentData.data){
                                //console.log(arr[i].avatar)
                                commentHtml+="<div class='center bottom'><span><img src='"+commentData.data[i].avatar+"'></span><span><h1>"+commentData.data[i].user_name+"</h1><a>"+commentData.data[i].post_time+"</a></span></div><div class='lx'><p class='aa'>"+commentData.data[i].demand+"</p></div>"
                            }
                        }

                        $(".pl").html(hintHtml);
                        $(".wrap").html(commentHtml); 
                  }
                       
                        $(".nice_icon").show();
              }

              // }
            },
            complete:function(data){
              $("#loading").hide();
              $(".box").show();
              $(".top").show();
            }


        })
;
 //渲染头部数据
    $.ajax({ 
            url:"http://www.meimei.yihaoss.top/php/shareListing.php?img_id='"+img_id+"'&user_id='"+user_id+"'",
            type:"get",
            success:function(data){
              
                contentResult=true; // 表示已经获取主体内容的标记
                contentData = JSON.parse(data);

                 var titleHtml = "";
                 var contentHtml = "";
                 var commentHtml = "";

                  //  初始化头部
                    for(var i in contentData.data){
                        var arr=contentData.data;
                        var arr1=arr[0].img;
                        titleHtml = "<h1>"+arr1.img_title+"</h1><p class='pp'><span><a><img src='"+arr1.avatar+"'></a><a><b>"+arr1.user_name+"</b><b>"+arr1.create_time+"</b></a></span></p>";         
                    }
                   $(".top").html(titleHtml);

                // 初始化主内容
                      for(var i in contentData.data){
                          var arr=contentData.data;
                          var arr1=arr[i].img;
                          var arr2=arr1.img;
                              
                          var eStr=arr.data;

                          var aStr = arr1.description+"";//换行的内容  
                              
                               aStr=aStr.replace(/\r\n/g,"<br>"); 
                              contentHtml += "<div class='wenzi'><p class='pp1'>"+aStr+"</p></div>";
                              for(var i in arr2){
                                  contentHtml+="<div class='pic'><img src='"+arr2[i].img_down+"'></div>";
                              }
                      }   
                    $(".content").html(contentHtml);

              
                if(contentResult==true&&commentResult==true&&!isInitComment){
                      isInitComment = true;
                    // 初始化评论
                    if(comdata.length==0){
                        $(".pl").hide();
                        $(".wrap").hide();
                    }else{
                        var commentHtml="";
                        var hintHtml="";
                        hintHtml="<p>评论</p>";
              
                          for(var i in commentData.data){
                              commentHtml="<div class='wenzi1'></div>";
                              for(var i in commentData.data){
                                var arr3=commentData.data;
                                  //console.log(arr[i].avatar)
                                  commentHtml+="<div class='center bottom'><span><img src='"+arr3[i].avatar+"'></span><span><h1>"+arr3[i].user_name+"</h1><a>"+arr3[i].post_time+"</a></span></div><div class='lx'><p class='aa'>"+arr3[i].demand+"</p></div>"
                              }
                          }

                        $(".pl").html(hintHtml);
                        $(".wrap").html(commentHtml);
                    }
    
                       
                        $(".nice_icon").show();

                }

            }
          })

    //滑动
    $(window).on("scroll",function(e){
          
        clearTimeout(scrollTimer);
        ifInset();
        scrollTimer=setTimeout(function(){
            transition();
        },150);

        //视差滚动部分

        proportion = 50/$(window).height();
        scrolH = $("body").scrollTop()*proportion;
        scrollH = (400 - $(".scroll").height())/4 + scrolH;

        console.log(scrollH);
        if(scrollH >= 70){
            scrollH = 70;
        }
    });
    
    $(function () {
      var u = navigator.userAgent, app = navigator.appVersion;
      var isAndroid = u.indexOf('Android') > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
          $(".txt").focus(function(){
            $(this).css({'position':'fixed','bottom':'0.2rem'});
              $('.send').css({'position':'fixed','bottom':'0.3rem','right':'0.2rem'});
          })
          $(".txt").blur(function(){
              $(this).css({'position':'fixed','bottom':'0.2rem'});
              $('.send').css({'position':'fixed','bottom':'0.3rem','right':'0.2rem'});
          })
      }
      if (isIOS) {
        $(".txt").focus(function(){
            $(this).css('position','static');
            $('.send').css('position','static');
        })
        $(".txt").blur(function(){
            $(this).css({'position':'fixed','bottom':'0.2rem'});
            $('.send').css({'position':'fixed','bottom':'0.3rem','right':'0.2rem'});
        })
      }   
    });
    
   

  

    
        href = "javascript:;";
        
        tthtml=   window.localStorage.getItem("txtval");
        $(".txt").val(tthtml);
        
        $.get('http://www.meimei.yihaoss.top/fenxiang/php.php?code='+code+'&state=111',function(data){
            
          var result = JSON.parse(data);
          openid = result.openid;
          window.localStorage.setItem('open_id',openid);
          window.localStorage.setItem('code',code);
         
          
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
                 if(res.success == true){
               
               window.localStorage.setItem("login_user_id",res.data.user_id);
                $.ajax({
                    url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/PublicListingReview',
                    data:{
                      login_user_id:res.data.user_id,
                      img_id:img_id,
                      demand:tthtml,
                      source:1
                    },
                    type:'POST',
                    success:function(data){
                         window.localStorage.setItem("txtval","");
                        var DATA=JSON.parse(data);
                        alert(DATA.reMsg)
                        location.reload();
                    }
                })
              }

              
            }

          })

        });
    
    
    txtval="";
    $(".main").on("click",".send",function(){
      txtval=$(".txt").val();
      if(!code){
       
         if(txtval!=""){
            window.localStorage.setItem("txtval",txtval);
            
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5bd2876a775d0525&redirect_uri=http%3a%2f%2fwww.meimei.yihaoss.top%2ffenxiang%2faa.html?img_id="+img_id+"&txtval="+txtval+"&response_type=code&scope=snsapi_userinfo&state=111";

         }else{
              alert("请输入评论内容~");  
              $(this).disable();
        }
      
      }else{
       
       
        if(window.localStorage.getItem("login_user_id")!="" && $(".txt").val() != ""){
           $.ajax({
                          url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/PublicListingReview',
                          data:{
                            login_user_id:window.localStorage.getItem("login_user_id"),
                            img_id:img_id,
                            demand:$(".txt").val(),
                            source:1
                          },
                          type:'POST',
                          success:function(data){
                            alert(1);
                              var DATA=JSON.parse(data);
                              alert(DATA.reMsg)
                              location.reload();
                          }
                      })
                

        }else if(window.localStorage.getItem("login_user_id")!="" && $(".txt").val() == ""){
          alert("请输入评论内容~");
          $(this).disable();
         
        }else if(window.localStorage.getItem("login_user_id")==null){
          tthtml=$(".txt").val();
        
        href = "javascript:;";
        img_id = GetRequest().state.split('%3D')[0];
        user_id = GetRequest().state.split('%3D')[1];
      
       $.get('http://www.meimei.yihaoss.top/fenxiang/php.php?code='+code+'&state=111',function(data){
            
          var result = JSON.parse(data);
          openid = result.openid;
          window.localStorage.setItem('open_id',openid);
          window.localStorage.setItem('code',code);
        
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
                  if(res.success == true){
                  
               
                      $.ajax({
                          url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/PublicListingReview',
                          data:{
                            login_user_id:res.data.user_id,
                            img_id:img_id,
                            demand:tthtml,
                            source:1
                          },
                          type:'POST',
                          success:function(data){
                           window.localStorage.setItem("txtval","");
                              var DATA=JSON.parse(data);
                              alert(DATA.reMsg)
                              location.reload();
                          }
                      })
                  }
                  

              
            }

          })

        });
        }
      } 
      
    })
     

})
      





















