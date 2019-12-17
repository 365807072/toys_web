/**
 * Created by zyc on 2018/7/13.
 */
$(function () {
    var userId="";
    var businessId="";
    var marks="";
    var url=location.href;
    var empty=0;
    var  navurl = navigator.userAgent.toLowerCase();
    var actUserId = localStorage.getItem("actUserId");
    var meng="";
    var succ=0;
//使用toLowerCase将字符串全部转为小写 方便我们判断使用
    if (navurl.indexOf(' qq')>-1 && navurl.indexOf('mqqbrowser') <0) {
        //单独判断QQ内置浏览器
        // alert("QQ APP 内置浏览器，做你想做的操作");
    }
    if (navurl.indexOf("micromessenger") > -1) {
        //单独判断微信内置浏览器
        // alert('微信内置浏览器，做你想做的操作');
    }
    if(url.indexOf("?") > 0){
        if(GetQueryString("login_user_id")!=null && GetQueryString("login_user_id").length>-1){
            userId = GetQueryString("login_user_id");
        }
        if(GetQueryString("business_id")!=null && GetQueryString("business_id").length>-1){
            businessId = GetQueryString("business_id");
        }
        if(GetQueryString("marks_id")!=null && GetQueryString("marks_id").length>-1){
                marks = GetQueryString("marks_id");
        }
        if(GetQueryString("meng")!=null && GetQueryString("meng").length>-1){
            meng = GetQueryString("meng");
        }
    }
    if(meng!=undefined&&meng!=""&&meng!=null){
        $(".meng").show();
    }else{
        $(".meng").hide();
    }
    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    $.ajax({
        url: 'https://api.baobaoshowshow.com/index.php?r=BabyShowV7/getOneGroupsListInfo&marks_id='+marks,
        type: 'GET',
        datatype: 'JSON',
        async: true,
        success: function (res) {
            var data=JSON.parse(res);
            var activity = data.data;
            console.log( typeof data);
            var listData = activity.son_arr;
            succ=activity.son_arr.length;
            var empty=5-listData.length;
            var actTitle = activity.activity_title.split("\n\n");
            // var acts = actTitle;
            var toys = activity.more_business;
            var headHtml = '<div class="htLeft"><img src='+ activity.parent_avatar+' /></div><div class="htRight"><div>' + activity.parent_nick_name + '</div><div>' + activity.parent_title + '</div></div>';
            $(".headerTitle").html(headHtml);
            var toysHtml='<div><img src='+activity.parent_business_pic+'></div><div><div class="toysT">'+activity.parent_business_title+'</div><div class="toysP"><div>'+activity.parent_market_price_title+'</div><div class="price">'+activity.parent_market_price+'</div></div><div>'+activity.parent_age_title+activity.parent_age+'</div></div>'
            $(".toys").html(toysHtml);
            var toysBtnHtml='<div>'+activity.other_num_title+'</div><img src='+activity.button_img+' />';
            $(".toysBtn").html(toysBtnHtml);
            var peopleHtml='';
            var emptyHtml='';
            console.log(listData);
            if(listData.length!=0){
                for(var i=0;i<listData.length;i++){
                     peopleHtml +='<div class="users"><img src='+listData[i].avatar+' /><div class="txt">'+listData[i].nick_name+'</div></div>';
                }
            }
            $(".people").html(peopleHtml);
            if(empty!=0){
                for(var i=0;i<empty;i++){
                    emptyHtml +='<div class="users"><img src="img/117.png"></div>';
                }
            }
            $(".people").append(emptyHtml);
            var middleHtml='';
            for(var i=0;i<actTitle.length;i++){
                middleHtml+='<div>'+actTitle[i]+'</div>'
            }
            $(".middleCon").html(middleHtml);
            var toysListHtml="";
            if(toys.length!=0){
                for(var i=0;i<toys.length;i++){
                    if(toys[i].more_button_status==0){
                        toysListHtml+='<div class="tl"><div class="tlImg"><img src='+toys[i].more_business_pic+'></div><div class="tlTitle">'+toys[i].more_business_title+'</div><button class="tlBtn zu" data-busid="'+toys[i].more_business_id+'">'+toys[i].more_button_title+'</button></div>';
                    }else{
                        toysListHtml+='<div class="tl"><div class="tlImg"><img src='+toys[i].more_business_pic+'></div><div class="tlTitle">'+toys[i].more_business_title+'</div><button class="tlBtn kong">'+toys[i].more_button_title+'</button></div>';
                    }
                }
            }
            $(".toysList").html(toysListHtml);
        }
    })
    function judge(actUserId,marks) {
        if (marks!=""&&marks!=undefined&&marks!=null){
            $.ajax({
                url: 'https://api.baobaoshowshow.com/index.php?r=BabyShowV7/getUserGroupsOk&marks_id=' + marks + '&login_user_id=' + actUserId,
                type: 'GET',
                dataType: 'json',
                success: function (res) {
                    if (res.reCode == 200) {
                        window.location.href='phoneNum.html?marks_id='+marks;
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
    $(".toysBtn").on("click",".toysBtn img",function () {
        if(succ==5){
            layer.open({
                content: '已成团，快去发团吧',
                btn: '确定'
            });
        }else{
            if(actUserId!=undefined&&actUserId!=null&&actUserId!=""){
                judge(actUserId,marks);
            }else{
                window.location.href='phoneNum.html?marks_id='+marks;
            }

        }

        // window.location.href='password.html?login_user_id=472060';
    })
    $(".toysList").on("click",".toysList .zu",function () {
        var busid=$(this).attr("data-busid");
        console.log(busid);
        console.log(actUserId);
        if(actUserId!=undefined&&actUserId!=null&&actUserId!=""){
            window.location.href="activity.html?login_user_id="+actUserId+'&meng=1&marks_id='+actUserId+'-'+busid;
        }else{
            window.location.href="phoneNum.html?flag=true&actBusid="+busid;
        }

    })
    $(".toysList").on("click",".toysList .kong",function () {
        layer.open({
            content: '此玩具已抢空',
            btn: '确定'
        });

    })
    $(".meng").click(function () {
        $(this).hide();
    })

})
