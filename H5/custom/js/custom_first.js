var last_post_time = '';
var searchId = '';
var nameId = '';
var timeStart = '';
var toysNum = '';
var timeEnd = '';
var checkIndex = '';
var selectIndex = '';
var ajax_data = {};
var isSearch_type = 1;
var loadType = false;
var textId = '';
var removeID = '';


is_search_type();
function is_search_type(){
	last_post_time = $(".box").find("tr:last").data("posttime");
    searchId = $(".idtxt").val();
    nameId = $(".nametxt").val();
    timeStart = $(".timestart").val();
    timeEnd = $(".timeend").val();
    checkIndex = $("#text").find("option:selected").attr("index");
    selectIndex = $("#level").find("option:selected").attr("index");
    

    switch(isSearch_type){
            case 1 : 
                ajax_data = {
                    searchId:searchId,
                    nameId:nameId,
                    postTime:last_post_time
                }
                break;
        }
        getProsUserList(ajax_data);
}

$("#search_form").on('click','.btn',function(){
	isSearch_type=1;
    is_search_type();
})

function getProsUserList(opt){
	if(!loadType){ // 不使用
        loadType = true;
		ajaxData={
			user_id:opt.searchId,//用户名/用户id
			user_info:opt.nameId,
			post_create_time:opt.postTime,//分页
		}
		$('.upload').addClass('loading');
		$.ajax({
			url:'https://api.baobaoshowshow.com/index.php?r=WebBaoShow/getCustomerProsUserList',
			type:'GET',
			data:ajaxData,
			datatype:'JSON',
			cache:false,
			async :false,
			success:function(data){
				$('.upload').removeClass('loading');
				var data = JSON.parse(data);
				var cusListData = '';
				var boxHtml = '';
				cusListData = data.data;

				console.log(cusListData);
				for(var i in cusListData){
					boxHtml += '<tr class="cuslist" lindex='+cusListData[i].user_id+'><td align="center" width="10%">'+cusListData[i].user_info+'</td><td align="center" width="10%">'+cusListData[i].show_create_time+'</td><td align="center" width="10%">'+cusListData[i].problem_count+'</td><td align="center" width="10%">'+cusListData[i].no_status_count+'</td></tr>';
				}
				$(".box").html(boxHtml)
	 		},
            complete:function(){
                loadType = false;
            }
		})
	}
}



browserRedirect();
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
        $(".box").on("click",".cuslist",function(event){
			event.stopPropagation();
			textId=$(this).attr("lindex");
			console.log(textId);
			window.location.href='custom.html?user_info='+textId
		})
    } else {
        var touchtime = new Date().getTime();
        $(".box").on("click",".cuslist",function(event){
            
            if( new Date().getTime() - touchtime < 500 ){
                console.log("dblclick");

                event.stopPropagation();
				textId=$(this).attr("lindex");
				console.log(textId);
				window.location.href='custom.html?user_info='+textId
            }else{
                touchtime = new Date().getTime();
                console.log("click")
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


