// pages/phone/phone.js
var interval = null; //倒计时函数
var userId = '';
var marks="";
var jumpA="";
var yam='';
var flag='';
var actBusid="";
var url=window.location.href;
var meng="";
if(url.indexOf("?") > 0){
    if(GetQueryString("login_user_id")!=null && GetQueryString("login_user_id").length>-1){
        userId = GetQueryString("login_user_id")
    }
    if(GetQueryString("business_id")!=null && GetQueryString("business_id").length>-1){
        businessId = GetQueryString("business_id");
    }
    if(GetQueryString("marks_id")!=null && GetQueryString("marks_id").length>-1){
        marks = GetQueryString("marks_id");
    }
    if(GetQueryString("flag")!=null && GetQueryString("flag").length>-1){
        flag = GetQueryString("flag");
    }
    if(GetQueryString("actBusid")!=null && GetQueryString("actBusid").length>-1){
        actBusid = GetQueryString("actBusid");
    }
    if(GetQueryString("meng")!=null && GetQueryString("meng").length>-1){
        meng = GetQueryString("meng");
    }
}
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

$(".yan").click(function () {
    getVerificationCode();
})
function getVerificationCode() {
    if ($(".yan").html() == "获取验证码" || $(".yan").html() =="重新发送"){
        var currentTime = 60;
        $(".yan").html(currentTime + '秒');
        getCode(currentTime);
    }
}
function getCode (currentTime) {
    var re = /^1\d{10}$/;
   var userPhone = $(".numtxt").val();
   if (userPhone) {
       if(!re.test(userPhone)){
           layer.open({
               content: '手机号格式不正确',
               btn: '确定'
           });
       }else{
           // var currentTime = 60;
           interval = setInterval(function () {
               currentTime--;
               $(".yan").html(currentTime + '秒');
               if (currentTime <= 0) {
                   clearInterval(interval)
                   $(".yan").html('重新发送');
               }
           }, 1000)

           $.ajax({
               url: 'https://api.baobaoshowshow.com/index.php?r=BabyShowV7/SendYzm&mobile=' + userPhone,
               type: 'GET',
               datatype: 'JSON',
               success: function (resyam) {
                   console.log(resyam);
                   var resyam=JSON.parse(resyam);
                   yam = resyam.yzm;
               }
           })
       }

   } else {
       layer.open({
           content: '请输入手机号',
           btn: '确定'
       });
   }
}
$(".sumbtn").on("click",function(){
    if($(".numtxt").val()==""){
        layer.open({
            content: '请输入手机号',
            btn: '确定'
        });
    }else if($(".phonetxt").val()==""){
        layer.open({
            content: '请输入验证码',
            btn: '确定'
        });
    }else{
        var Phoneyzm = yam;
        var userPass = $(".phonetxt").val();
        if (Phoneyzm == userPass) {
            var userPhone = $(".numtxt").val();
            goStep(userPhone, userPass);
        } else {
            layer.open({
                content: '请重新获取验证码',
                btn: '确定'
            });
        }
    }

})
function judge(actUserId,marks,jump) {
    if (marks!=""&&marks!=undefined&&marks!=null){
        $.ajax({
            url: 'https://api.baobaoshowshow.com/index.php?r=BabyShowV7/getUserGroupsOk&marks_id=' + marks + '&login_user_id=' + actUserId,
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                if (res.reCode == 200) {
                    jump(actUserId,marks,actBusid);
                } else {
                    layer.open({
                        content: res.reMsg,
                        btn: '确定'
                    });
                }

            },
            fail: function (res) {},
            complete: function (res) { },
        })
    }
}
var jump1=function(actUserId,marks,actBusid) {
    if(flag=="true"){
        window.location.href="activity.html?login_user_id="+actUserId+'&meng=1&marks_id='+actUserId+'-'+actBusid;
    }else{
        window.location.href='password.html?actUserId=' + actUserId+'&marks_id='+marks;
    }
}
var jump2=function(actUserId,marks,actBusid) {
    if(flag=="true"){
        window.location.href="activity.html?login_user_id="+actUserId+'&meng=1&marks_id='+actUserId+'-'+actBusid;
    }else{
        window.location.href='member_cout.html?actUserId=' + actUserId + '&business_id=3281&ssource=1&jumpFan=9&marks_id='+marks;

    }
}
function goStep(userPhone, userPass) {
    // var jumpFan = wx.getStorageSync('jump');
    $.ajax({
        url: 'https://api.baobaoshowshow.com/index.php?r=BabyShowV7/HfiveLogin&yzm=' + userPass + '&mobile=' + userPhone,
        type: 'GET',
        datatype: 'JSON',
        success: function (res) {
            var res = JSON.parse(res);
            console.log(res);
            if (res.success == true) {
                if(res.data.status==1){
                    localStorage.setItem("actUserId", res.data.login_user_id);
                    var actUserId = localStorage.getItem("actUserId");
                    console.log(flag);
                    judge(actUserId,marks,jump1);
                    // if(flag=="true"){
                    //     window.location.href="activity.html?login_user_id="+res.data.login_user_id+'&meng=1&marks_id='+actUserId+'-'+actBusid;
                    // }else{
                    //     window.location.href='password.html?actUserId=' + res.data.login_user_id+'&marks_id='+marks;
                    // }
                   
                }

            }else{
                if(res.data.status==0){
                    localStorage.setItem("actUserId", res.data.login_user_id);
                    var actUserId = localStorage.getItem("actUserId");
                    console.log(flag);
                    judge(actUserId,marks,jump2);
                    // if(flag=="true"){
                    //     window.location.href="activity.html?login_user_id="+res.data.login_user_id+'&meng=1&marks_id='+actUserId+'-'+actBusid;
                    // }else{
                    //     window.location.href='member_cout.html?actUserId=' + res.data.login_user_id + '&business_id=3281&ssource=1&jumpFan=9&marks_id='+marks;
                    //
                    // }
                    // window.location.href='member_cout.html?login_user_id=' + res.data.login_user_id + '&business_id=3281&ssource=1&jumpFan=9&marks_id='+ res.data.login_user_id+'-3281';
                }
            }

        },
        fail: function (res) { },
        complete: function (res) { },
    })
}

/**
 * Created by zyc on 2018/7/16.
 */
