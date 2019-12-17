/**
 * Created by zyc on 2018/7/19.
 */
var interval = null //倒计时函数
var actUserId = '';
var marks="";
var url=window.location.href;
var parten = /\s+/ ;
var reg=/^[a-zA-Z\d]{6,16}$/;
if(url.indexOf("?") > 0){
    if(GetQueryString("actUserId")!=null && GetQueryString("actUserId").length>-1){
        actUserId = GetQueryString("actUserId")
    }
    if(GetQueryString("business_id")!=null && GetQueryString("business_id").length>-1){
        businessId = GetQueryString("business_id");
    }
    if(GetQueryString("marks_id")!=null && GetQueryString("marks_id").length>-1){
        marks = GetQueryString("marks_id");
    }
}
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
$(".passtxt").blur(function () {
    if(parten.test($(".passtxt").val())){
        layer.open({
            content: '输入密码不能有空格',
            btn: '确定'
        });
        $(".passtxt").val('');
    }else{
        if(!reg.test($(".passtxt").val())){
            layer.open({
                content: '请输入6-16位数字或者密码',
                btn: '确定'
            });
            $(".passtxt").val('');
        }
    }

})
// $(".confirmtxt").blur(function () {
//     if(parten.test($(".confirmtxt").val())){
//         layer.open({
//             content: '输入密码不能有空格',
//             btn: '确定'
//         });
//         $(".confirmtxt").val('')
//     }else{
//         if(!reg.test($(".confirmtxt").val())){
//             layer.open({
//                 content: '请输入6-16位数字或者密码',
//                 btn: '确定'
//             });
//             $(".passtxt").val('');
//         }
//     }
// })
$(".sumbtn").click(function () {
    var prePass=$.trim($(".passtxt").val());
    var aftPass=$.trim($(".confirmtxt").val());
    if(prePass==''){
        layer.open({
            content: '请输入密码',
            btn: '确定'
        });
    }else if(aftPass==''){
        layer.open({
            content: '请输入确认密码',
            btn: '确定'
        });
    } else if(prePass!=''&&aftPass!=''&&prePass==aftPass){
        $.ajax({
            url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV7/UpdatePassword&new_passwd='+prePass+'&new_passwd_again='+aftPass+'&login_user_id='+actUserId,
            type:'GET',
            datatype:'JSON',
            success:function (res) {
                var data=JSON.parse(res);
                if(data.data.status==0){
                    // window.location.href='http://www.meimei.yihaoss.top/activity/member_cout.html?login_user_id=' + data.data.login_user_id + '&business_id=558&ssource=1&jumpFan=9&marks_id='+ data.data.login_user_id+'-558';
                    window.location.href='member_cout.html?actUserId=' + data.data.login_user_id + '&business_id=3281&ssource=1&jumpFan=9&marks_id='+marks;

                }
            }
        })
    }else{
        layer.open({
            content: '密码和确认密码不一致',
            btn: '确定'
        });
    }
})