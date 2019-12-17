var url = location.href;
var userId = '';
var count = 60;
var countdown;
var smsCode ='';
url = url.substring(url.indexOf("?")+1).split("&");

var userId = url[0].substring(url[0].indexOf("=")+1);
// if(url.indexOf("?") > 0){
//   if(GetQueryString("login_user_id")!=null && GetQueryString("login_user_id").length>-1){
    
//     userId = GetQueryString("login_user_id");
//   }
// }
// function GetQueryString(name){
//     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
//     var r = window.location.search.substr(1).match(reg);
//     if(r!=null)return  unescape(r[2]); return null;
// }

var href = "";
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
    isWeiXin();
  

  function isWeiXin(){
     var ua = window.navigator.userAgent.toLowerCase();
     if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          if(!code){
              //返回之后的页面
              href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5bd2876a775d0525&redirect_uri=http%3a%2f%2fwww.meimei.yihaoss.top%2fH5%2flastYear%2fceshi.html&response_type=code&scope=snsapi_userinfo&state="+userId;
              
          }else{
            href = "javascript:;";
            userId = GetRequest().state.split('%3D')[0];
            
            $.get('http://www.meimei.yihaoss.top/H5/lastYear/php.php?code='+code+'&state=111',function(data){
                var result = JSON.parse(data);
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
                      var storage = window.localStorage;
                      if(res.success == true){
                          storage.setItem("login_type",2)//type=0或undefined 未登录 type=2 已登录
                          if(storage.getItem("login_type")==2){
                            $(".alertBox").show();
                            $(".alertBtn").on("click",".draw_determine",function(){
                                close_alertBox();
                            })

                            $(".btns").on("click",".zlBtn",function(){
                                close_alertBox();
                            })
                              
                          }
                         
                      }

                      
                  }

                })

            });
          }
     }else{

        $(".btns").on("click",".zlBtn",function(){
            alert("亲，活动已结束！");
        })
         
     }
  }

   
$(".xuanfu").on("click",function(){

  $(".erwem").show();
})

$(".erwem").on("click",".erclose",function(){

  $(".erwem").hide();
})

$(".btns").on("click",".zlactiveBtn",function(){

  $(".erwem").show();
})
//关闭提示框
$(".alertBox_close").on("click", function () {

    close_alertBox();
});

//关闭提示框
$(".alertBtn").on("click",".alertBtn_cancel",function () {

    close_alertBox();
});

//调起关闭提示框
function close_alertBox() {
    $(".overbox").hide();
    $(".alertBox").hide();
}

//弹窗除网址
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if(isAndroid){
    window.alert = function(name){
      var iframe = document.createElement("IFRAME");
      iframe.style.display="none";
      iframe.setAttribute("src", '');
      document.documentElement.appendChild(iframe);
      window.frames[0].window.alert(name);
      iframe.parentNode.removeChild(iframe);
    }
}
if(isiOS){
    window.alert = function(name){
        var iframe = document.createElement("IFRAME");
        iframe.style.display="none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);
    }
}

cNfun("login_user_id="+userId);

function cNfun(s){
    $.ajax({
      url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV7/GetUserInfoFive&'+s,
      type:'GET',
      datatype:'json',
      async :false,
      cache:false,
      success:function(res){
          var data = JSON.parse(res);
          console.log(data);
          var fifData = '';
          fifData = data.data;
          var headHtml = '';
          headHtml += '<a><img src="'+fifData.avatar_p+'"></a>';
          $(".head").html(headHtml);

          var div = document.getElementById("WprogressNumber");
          var clientWidth=$(".Wprogress").width();
          var aa=fifData.help_num+"%";
          console.log(aa);
          $("#WprogressNumber").css("width",aa);

          var WpppHtml ="";
          console.log(fifData.order_num)
          if(fifData.order_num==0){
            $(".Wppp").hide();
          }else{
            console.log(fifData.order_num);
            $(".Wppp").show();
            WpppHtml +='排名：暂列第'+fifData.order_num;
            $(".Wppp").html(WpppHtml);
          }
          
          var btnHtml ='';
          btnHtml += '<a class="zlBtn" href='+href+'>为他助力</a><p class="zlactiveBtn">我也要参加活动</p>';
          $(".btns").html(btnHtml);
          console.log(href)

          var WspanHtml = '';
          WspanHtml += '助力值是'+fifData.user_point_sum;
          $(".Wspan").html(WspanHtml);

          var peoNumHtml = '';
          peoNumHtml +='已有'+fifData.user_info_son_count+'人为Ta加人气';
          $(".peoNum").html(peoNumHtml);

          var infoNum = '';
          infoNum = fifData.user_info_son;
          var peodivHtml = '';
          for(var i in infoNum){
            peodivHtml +='<p>'
            peodivHtml += '<span><img src="'+infoNum[i].avatar_s+'"></span><span>'+infoNum[i].nick_name_s+'</span><span>+'+infoNum[i].prize_num+'</span>';
             peodivHtml +='</p>'
          }
          $(".peodiv").html(peodivHtml);

          $(".numInput").val('');
      }
    })
}

$(".renqi").on("click",function(){
  window.location.href='https://api.baobaoshowshow.com/H5/lastYear/annual_paiming.html';
})

