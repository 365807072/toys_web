var postTime="";
var coouthtml="";
var postcreatTime="";
var ajaxData="";
var postTime1="";
var postTime2="";
var postTime3="";
var postTime4="";
var searchId="";
var numId="";
var nameId="";
var timeStart="";
var timeEnd="";
var checkIndex="";
var last_post_time="";
var userId="";
var cardId="";
var isSearch_type=1;
var ajax_data={};
var combinedOrder_id="";
var playId="";
var toysNum="";
var phoneID= '';
var inviteid = '';
var loadType = false; // 加载更多方法是否在使用
$(".orderId").on("click",function(){
    
    if($(".listsadd").css("display")=="none"){
        $(".listsadd").show();
    }else{
        $(".listsadd").hide();
    }
});

function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    // document.writeln("您的浏览设备为：");
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        // document.writeln("phone");
        $(".listsbox").on("click",".username",function(){
                var userName=$(this).attr("userindex");
                window.location.href='playlist.html?login_user_id='+userName;
        })
        $(".listsbox").on("click",".toyId",function(){
            var business=$(this).attr("idindex");
            var user=$(this).attr("uindex");
            window.location.href='play_cont.html?business_id='+business+'&login_user_id='+user;
        })
        $(".listsbox").on("click",".orderId",function(){
            var order_img = $(this).attr("orderindex")
            window.location.href="order_img.html?order_id="+order_img;
        })
        $(".listsbox").on("click",".nianka",function(){
            var user=$(this).attr("eindex");
            window.location.href='http://checkpic.baobaoshowshow.com/Others/cardeditinfo/user_id/'+user;
            
        })
    } else {
        var touchtime = new Date().getTime();
        $(".listsbox").on("click",".username",function(){
            
            if( new Date().getTime() - touchtime < 500 ){
                console.log("dblclick");

                var userName=$(this).attr("userindex");
                window.location.href='playlist.html?login_user_id='+userName;
            }else{
                touchtime = new Date().getTime();
                console.log("click")
            }
            
        })

        $(".listsbox").on("click",".orderId",function(){
            if( new Date().getTime() - touchtime < 500 ){
                console.log("dblclick");

                var order_img = $(this).attr("orderindex")
                window.location.href="order_img.html?order_id="+order_img;
            }else{
                touchtime = new Date().getTime();
                console.log("click")
            }
            
        })

        $(".listsbox").on("click",".toyId",function(){
             if( new Date().getTime() - touchtime < 500 ){
                console.log("dblclick");
                var userr=$(this).attr("eindex");
                window.location.href='play_cont.html?business_id='+business+'&login_user_id='+user;
            }else{
                touchtime = new Date().getTime();
                console.log("click")
            }
            
        })

        $(".listsbox").on("click",".nianka",function(){
             if( new Date().getTime() - touchtime < 500 ){
                console.log("dblclick");
                var user=$(this).attr("eindex");
                window.location.href='http://checkpic.baobaoshowshow.com/Others/cardeditinfo/user_id/'+user;
            }else{
                touchtime = new Date().getTime();
                console.log("click")
            }
            
        })
    }
}

browserRedirect();
// var touchtime = new Date().getTime();
// $(".listsbox").on("click",".username",function(){
    
//     if( new Date().getTime() - touchtime < 500 ){
//         console.log("dblclick");

//         var userName=$(this).attr("userindex");
//         window.location.href='playlist.html?login_user_id='+userName;
//     }else{
//         touchtime = new Date().getTime();
//         console.log("click")m
//     }
    
// })




window.onscroll=function(){
    var sl=-Math.max(document.body.scrollLeft,document.documentElement.scrollLeft); 7
    document.getElementById('head').style.left=sl+'px';
    $("#head").css({'position':'fixed','top':'0','height':'143px'});
    $(".main").css({'margin-top':'143px'});
};

is_search_type();

function is_search_type(){
    last_post_time = $(".listsbox").find("tr:last").data("posttime");
    searchId=$(".idtxt").val();
    numId=$(".numtxt").val();
    playId=$(".playtxt").val();
    nameId=$(".nametxt").val();
    timeStart=$(".timestart").val();
    toysNum=$(".toynumtxt").val();
    toystitle=$(".toystitletxt").val();
    timeEnd=$(".timeend").val();
    checkIndex=$("#test").find("option:selected").attr("index");
    console.log(timeStart);
    combinedOrder_id=$(".numbertxt").val();
    phoneID = $(".phonetxt").val();
    inviteid = $(".invitetxt").val();

    switch(isSearch_type){
            case 1 : 
                ajax_data = {
                    searchId:searchId,
                    numId:numId,
                    nameId:nameId,
                    timeStart:timeStart,
                    timeEnd:timeEnd,
                    checkIndex:checkIndex,
                    combinedOrder_id:combinedOrder_id,
                    playId:playId,
                    toysNum:toysNum,
                    toystitle:toystitle,
                    phoneID:phoneID,
                    inviteid:inviteid,
                    postTime:last_post_time
                }
                break;
        }
        request(ajax_data);
}

$(".btn").on("click",function(){
    $(".listsbox").html("");
    // $(".count").hide();
    
    isSearch_type=1;
    is_search_type();
})

function request(opt){
    
    if(!loadType){ // 不使用
        loadType = true;
        ajaxData={
            post_create_time: opt.postTime,
            search_id: opt.searchId,
            order_num: opt.numId,
            start_time: opt.timeStart,
            end_time: opt.timeEnd,
            search_status: opt.checkIndex,
            nick_name: opt.nameId,
            combined_order_id:opt.combinedOrder_id,
            search_business_id:opt.playId,
            toys_number:opt.toysNum,
            search_business_title:opt.toystitle,
            search_mobile:opt.phoneID,
            invite_user_id:opt.inviteid
        }
        $('.upload').show();

        $.ajax({
            url:'https://api.baobaoshowshow.com/index.php?r=WebBaoShow/getToysOrderManageListV1',
            type:'get',
            data:ajaxData,
            datatype:'json',
            success:function(data){
                $('.upload').hide();
                var daTa=JSON.parse(data);
                var checkData=daTa.data;
                var listshtml="";
                var coouthtml="";
                var tophtml="";

                if(checkData.length != 0){
                    
                    // coouthtml+='<span>总共<a>'+checkData[0].total_count+'</a>条</span>'
                    for(var i in checkData){
                        if(checkData[i].business_star!=""&&checkData[i].toys_star!=""){
                            listshtml+='<tr class="uilist" data-postTime='+checkData[i].post_create_time+'><td class="orderId" width="10%" align="center" orderindex="'+checkData[i].order_id+'">'+checkData[i].order_info+'</td><td width="5%" align="center" class="nianka" eindex='+checkData[i].user_id+'>'+checkData[i].card_type+'</td><td width="10%" align="center" class="username" userindex='+checkData[i].user_id+'>'+checkData[i].user_info+'</td><td width="5%" align="center">'+checkData[i].status_name+'</td><td width="5%" align="center">'+checkData[i].total_price+'</td><td style="position:relative;" width="10%" align="center"  class="toyId" idindex='+checkData[i].business_id+' uindex='+checkData[i].user_id+'><a style="position:absolute;left:0;bottom:0"><img style="display:inline-block;width:0.15rem;height:0.15rem" src="'+checkData[i].toys_star+'"></a><a style="position:absolute;right:0;bottom:0"><img style="display:inline-block;width:0.15rem;height:0.15rem" src="'+checkData[i].business_star+'"></a>'+checkData[i].business_info+'</td><td width="10%" align="center">'+checkData[i].combined_time+'</td><td width="10%" align="center">'+checkData[i].order_user_info+'</td><td width="5%" align="center"><a style="display:block" href="http://checkpic.baobaoshowshow.com/Toys/pubtoysprize">添加礼品</a><a style="display:block" href="http://checkpic.baobaoshowshow.com/Others/edittoysorderstatus?order_id='+checkData[i].order_id+'&status='+checkData[i].status+'&user_id='+checkData[i].user_id+'&business_id='+checkData[i].business_id+'">更改订单状态</a><a style="display:block" href="http://checkpic.baobaoshowshow.com/Toys/toyspayment/order_id/'+checkData[i].order_id+'">生成赔付订单</a><a style="display:block" href="http://checkpic.baobaoshowshow.com/Others/toysremarkup?order_id='+checkData[i].order_id+'">编辑</a>'+checkData[i].remark+'</td></tr>';
                        }
                        else if(checkData[i].business_star!=""){
                            listshtml+='<tr class="uilist" data-postTime='+checkData[i].post_create_time+'><td class="orderId" width="10%" align="center" orderindex="'+checkData[i].order_id+'">'+checkData[i].order_info+'</td><td width="5%" align="center" class="nianka" eindex='+checkData[i].user_id+'>'+checkData[i].card_type+'</td><td width="10%" align="center" class="username" userindex='+checkData[i].user_id+'>'+checkData[i].user_info+'</td><td width="5%" align="center">'+checkData[i].status_name+'</td><td width="5%" align="center">'+checkData[i].total_price+'</td><td style="position:relative;" width="10%" align="center"  class="toyId" idindex='+checkData[i].business_id+' uindex='+checkData[i].user_id+'><a style="position:absolute;right:0;bottom:0"><img style="display:inline-block;width:0.15rem;height:0.15rem" src="'+checkData[i].business_star+'"></a>'+checkData[i].business_info+'</td><td width="10%" align="center">'+checkData[i].combined_time+'</td><td width="10%" align="center">'+checkData[i].order_user_info+'</td><td width="5%" align="center"><a style="display:block" href="http://checkpic.baobaoshowshow.com/Toys/pubtoysprize">添加礼品</a><a style="display:block" href="http://checkpic.baobaoshowshow.com/Others/edittoysorderstatus?order_id='+checkData[i].order_id+'&status='+checkData[i].status+'&user_id='+checkData[i].user_id+'&business_id='+checkData[i].business_id+'">更改订单状态</a><a style="display:block" href="http://checkpic.baobaoshowshow.com/Toys/toyspayment/order_id/'+checkData[i].order_id+'">生成赔付订单</a><a style="display:block" href="http://checkpic.baobaoshowshow.com/Others/toysremarkup?order_id='+checkData[i].order_id+'">编辑</a>'+checkData[i].remark+'</td></tr>';
                        }
                        else if(checkData[i].toys_star!=""){
                            listshtml+='<tr class="uilist" data-postTime='+checkData[i].post_create_time+'><td class="orderId" width="10%" align="center" orderindex="'+checkData[i].order_id+'">'+checkData[i].order_info+'</td><td width="5%" align="center" class="nianka" eindex='+checkData[i].user_id+'>'+checkData[i].card_type+'</td><td width="10%" align="center" class="username" userindex='+checkData[i].user_id+'>'+checkData[i].user_info+'</td><td width="5%" align="center">'+checkData[i].status_name+'</td><td width="5%" align="center">'+checkData[i].total_price+'</td><td style="position:relative;" width="10%" align="center"  class="toyId" idindex='+checkData[i].business_id+' uindex='+checkData[i].user_id+'><a style="position:absolute;left:0;bottom:0"><img style="display:inline-block;width:0.15rem;height:0.15rem" src="'+checkData[i].toys_star+'"></a>'+checkData[i].business_info+'</td><td width="10%" align="center">'+checkData[i].combined_time+'</td><td width="10%" align="center">'+checkData[i].order_user_info+'</td><td width="5%" align="center"><a style="display:block" href="http://checkpic.baobaoshowshow.com/Toys/pubtoysprize">添加礼品</a><a style="display:block" href="http://checkpic.baobaoshowshow.com/Others/edittoysorderstatus?order_id='+checkData[i].order_id+'&status='+checkData[i].status+'&user_id='+checkData[i].user_id+'&business_id='+checkData[i].business_id+'">更改订单状态</a><a style="display:block" href="http://checkpic.baobaoshowshow.com/Toys/toyspayment/order_id/'+checkData[i].order_id+'">生成赔付订单</a><a style="display:block" href="http://checkpic.baobaoshowshow.com/Others/toysremarkup?order_id='+checkData[i].order_id+'">编辑</a>'+checkData[i].remark+'</td></tr>';
                        }
                        else{
                            listshtml+='<tr class="uilist" data-postTime='+checkData[i].post_create_time+'><td class="orderId" width="10%" align="center" orderindex="'+checkData[i].order_id+'">'+checkData[i].order_info+'</td><td width="5%" align="center" class="nianka" eindex='+checkData[i].user_id+'>'+checkData[i].card_type+'</td><td width="10%" align="center" class="username" userindex='+checkData[i].user_id+'>'+checkData[i].user_info+'</td><td width="5%" align="center">'+checkData[i].status_name+'</td><td width="5%" align="center">'+checkData[i].total_price+'</td><td style="position:relative;" width="10%" align="center"  class="toyId" idindex='+checkData[i].business_id+' uindex='+checkData[i].user_id+'>'+checkData[i].business_info+'</td><td width="10%" align="center">'+checkData[i].combined_time+'</td><td width="10%" align="center">'+checkData[i].order_user_info+'</td><td width="5%" align="center"><a style="display:block" href="http://checkpic.baobaoshowshow.com/Toys/pubtoysprize">添加礼品</a><a style="display:block" href="http://checkpic.baobaoshowshow.com/Others/edittoysorderstatus?order_id='+checkData[i].order_id+'&status='+checkData[i].status+'&user_id='+checkData[i].user_id+'&business_id='+checkData[i].business_id+'">更改订单状态</a><a style="display:block" href="http://checkpic.baobaoshowshow.com/Toys/toyspayment/order_id/'+checkData[i].order_id+'">生成赔付订单</a><a style="display:block" href="http://checkpic.baobaoshowshow.com/Others/toysremarkup?order_id='+checkData[i].order_id+'">编辑</a>'+checkData[i].remark+'</td></tr>';
                        }
                    }
                    // $(".count").html(coouthtml);
                    $(".listsbox").append(listshtml);

                    
                }
            },
            complete:function(){
                loadType = false;
            }
        })


}
}

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
 
var myEfficientFn = debounce(function() {
    if($(window).scrollTop()+$(window).height()-129 >= $('.main').height()){
        is_search_type();
    }
    
}, 250);
 
// 绑定监听
window.addEventListener('scroll', myEfficientFn);