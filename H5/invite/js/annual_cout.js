var url = location.href;
var userId = '';
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
    close_alertBox();
    phoneNum=$(".numInput").val();
    $.ajax({
      url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV7/ToysActivityHelpPower&login_user_id='+userId+'&mobile='+phoneNum,
      type:'GET',
      cache:false,
      async :false,
      success:function(res){
        var data = JSON.parse(res);
        alert(data.reMsg);
        close_alertBox();
        cNfun();
      }
    })
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
window.alert = function(name){
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    iframe.setAttribute("src", '');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
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
   			if(fifData.help_num==100){
   				alert("助力值已满100%！");
   			}
   			$("#WprogressNumber").css("width",aa);

   			var WpppHtml ="";
   			WpppHtml +='助力值是'+fifData.help_num;
   			$(".Wppp").html(WpppHtml);

   			var WspanHtml = '';
   			WspanHtml += '您已超过<b>'+fifData.order_num_height+'%</b>的用户';
   			$(".Wspan").html(WspanHtml);

   			var peoNumHtml = '';
   			peoNumHtml +='已有'+fifData.user_info_son_count+'人为Ta加人气';
   			$(".peoNum").html(peoNumHtml);

   			var infoNum = '';
   			infoNum = fifData.user_info_son;
   			var peodivHtml = '';
   			for(var i in infoNum){
   				peodivHtml += '<p><span><img src="'+infoNum[i].avatar_s+'"></span><span>'+infoNum[i].nick_name_s+'</span><span>+'+infoNum[i].prize_num+'</span></p>';
   			}
   			$(".peodiv").html(peodivHtml);

		}
	})
}