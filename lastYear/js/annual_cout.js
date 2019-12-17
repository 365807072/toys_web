var url = location.href;
var userId = '';
var count = 60;
var countdown;
var smsCode ='';
if(url.indexOf("?") > 0){
  if(GetQueryString("login_user_id")!=null && GetQueryString("login_user_id").length>-1){
    
    userId = GetQueryString("login_user_id");
  }
  if(GetQueryString("share")!=null && GetQueryString("share").length>-1){
    
    share = GetQueryString("share");

  }
}
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

cNfun();

$(".btns").on("click",".zlBtn",function(){
    $(".overbox").show();
    $(".alertBox").show();

})

$(".alertBox").on("click",".draw_determine",function(){
    phoneNum=$("#iphNum").val();
    $.ajax({
      url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV7/ToysActivityHelpPower&login_user_id='+userId+'&mobile='+phoneNum+'&yzm=0',
      type:'GET',
      cache:false,
      async :false,
      datatype:'json',
      success:function(data){
          var data=JSON.parse(data);
          console.log(data);
          alert(data.reMsg);

          if(data.success==false&&data.yzm==1){
              $(".alertBox").hide();
              $(".alertBox2").show();
              $(".overbox").show();
              $(".numInput").val($("#iphNum").val());
          }
          else{
              cNfun();
              close_alertBox();
          }
      } 
    })
})

$(".alertBox2").on("click",".draw_determine1",function(){
      phoneNum=$("#iphNum").val();
      smsCode=$("#codeText").val();
      $.ajax({
          url:'http://api.baobaoshowshow.com/index.php?r=WebBaoShow111/ToysActivityHelpPower&login_user_id='+userId+'&mobile='+phoneNum+'&yzm='+smsCode,
          type:'GET',
          cache:false,
          async :false,
          success:function(res){
            var data = JSON.parse(res);
            alert(data.reMsg);
            if(data.success==true){
                close_alertBox();
                $(".alertBox2").hide();
                cNfun();
            }else{
                $(".alertBox2").show();
                $(".overbox").show();
                $(".numInput").val($("#iphNum").val());
            }
            
          }
      })
    
})

// 获取验证码
$("#getCode").click(function(){
    if(!isNaN($("#iphNum").val()) && $("#iphNum").val().length == 11){
      getSMSCode($("#iphNum").val());
    }else{
      alert("请输入正确的手机号"); 
    }
});

// 获取验证码
function getSMSCode(myselfPhone){
    $.ajax({
      url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV7/SendYzm&mobile='+myselfPhone,
      type:'GET',
      datatype:'json',
      success:function(data){
        var res=JSON.parse(data);
        console.log(res);
        if(res.success==true){
          //alert("您已为好友加速成功！机会难得，快去给自己宝宝抢卡吧！");  
          
          // 启动倒计时
              countdown = setInterval(CountDown, 1000);
          
        }else{
            alert(res.reMsg);
           
        }
      }
    })
}

// 启动计时器
function CountDown() {
    $("#getCode").attr("disabled", true);
    $("#getCode").val("（" + count + " 秒）");
    if(count == 0) {
        $("#getCode").val("重新获取").removeAttr("disabled");
        clearInterval(countdown);
        count=60;
    }
    count--;
}
   
$(".xuanfu").on("click",function(){

  $(".erwem").show();
})

$(".erwem").on("click",".erclose",function(){

  $(".erwem").hide();
})


//关闭提示框
$(".alertBox_close").on("click", function () {

    close_alertBox();
});

$(".btns").on("click",".zlactiveBtn",function(){

	alert("打开舜鑫国际旅游（北京）有限公司租赁app，点击玩具世界右上角");
})

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
}else{
  
    window.alert = function(name){
        var iframe = document.createElement("IFRAME");
        iframe.style.display="none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);
    }
}


function cNfun(){
  $.ajax({
    url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV7/GetUserInfoFive&login_user_id='+userId,
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
        
        if(fifData.order_num==0){
          $(".Wppp").hide();
        }else{
          WpppHtml +='排名：暂列第'+fifData.order_num;
          $(".Wppp").html(WpppHtml);
        }
        

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

