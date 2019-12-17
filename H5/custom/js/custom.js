var last_post_time = '';
var userId = '';
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
var url = location.href;
var userInfo = "";

is_search_type();
function is_search_type(){
	last_post_time = $(".box").find("tr:last").data("posttime");
	console.log(last_post_time);
    timeStart = $(".timestart").val();
    nameId = $(".nametxt").val();
    timeEnd = $(".timeend").val();
    checkIndex = $("#text").find("option:selected").attr("index");
    selectIndex = $("#level").find("option:selected").attr("index");

    switch(isSearch_type){
            case 1 : 
                ajax_data = {
                    nameId:nameId,
                    timeStart:timeStart,
                    timeEnd:timeEnd,
                    checkIndex:checkIndex,
                    selectIndex:selectIndex,
                    postTime:last_post_time
                }
                break;
        }
        getCustomList(ajax_data);
}

$("#search_form").on('click','.btn',function(){
	isSearch_type=1;
    is_search_type();
})

function getCustomList(opt){
	if(!loadType){ // 不使用
        loadType = true;
		ajaxData={
			user_info:opt.nameId,
			search_problem_level:opt.selectIndex,//问题等级
			start_time:opt.timeStart,
			end_time:opt.timeEnd,
			search_status:opt.checkIndex,
			post_create_time:opt.postTime,//分页
		}
		$('.upload').addClass('loading');
		$.ajax({
			url:'https://api.baobaoshowshow.com/index.php?r=WebBaoShow/getCustomerProsTopList',
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
				for(var i in cusListData){
					textId = cusListData[i].id;
					if(cusListData[i].problem_level==1){
						boxHtml += '<tr class="cuslist" data-postTime='+cusListData[i].post_create_time+' lindex='+cusListData[i].id+'><td align="center" width="10%">'+cusListData[i].user_info+'</td><td align="center" width="15%">'+cusListData[i].problem+'</td><td align="center" width="10%" style="color:red">'+cusListData[i].status_name+'/'+cusListData[i].problem_level_name+'</td><td align="center" width="10%">'+cusListData[i].line_name+'/'+cusListData[i].house_name+'</td><td align="center" width="10%">'+cusListData[i].show_create_time+'</td><td align="center" width="5%">'+cusListData[i].problem_count+'/'+cusListData[i].no_status_count+'</td><td align="center" width="10%"><a href="redact.html?id='+textId+'">编辑</a><a class="remove" reindex='+cusListData[i].id+'>删除</a></td></tr>';
					}else{
						boxHtml += '<tr class="cuslist" data-postTime='+cusListData[i].post_create_time+' lindex='+cusListData[i].id+'><td align="center" width="10%">'+cusListData[i].user_info+'</td><td align="center" width="15%">'+cusListData[i].problem+'</td><td align="center" width="10%">'+cusListData[i].status_name+'/'+cusListData[i].problem_level_name+'</td><td align="center" width="10%">'+cusListData[i].line_name+'/'+cusListData[i].house_name+'</td><td align="center" width="10%">'+cusListData[i].show_create_time+'</td><td align="center" width="5%">'+cusListData[i].problem_count+'/'+cusListData[i].no_status_count+'</td><td align="center" width="10%"><a href="redact.html?id='+textId+'">编辑</a><a class="remove" reindex='+cusListData[i].id+'>删除</a></td></tr>';
					}
					
				}
				$(".box").append(boxHtml)
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
			window.location.href='custom_cout.html?id='+textId
		})
    } else {
        var touchtime = new Date().getTime();
        
        $(".box").on("click",".cuslist",function(event){
        	if( new Date().getTime() - touchtime < 500 ){
                console.log("dblclick");
                event.stopPropagation();
				textId=$(this).attr("lindex");
				window.location.href='custom_cout.html?id='+textId;
            }else{
                touchtime = new Date().getTime();
                console.log("click")
            }
			
		})
    }
}




$(".box").on("click",".remove",function(event){
	event.stopPropagation();
	removeID=$(this).attr("reindex");
	console.log(removeID)
	if(confirm('确定删除这条信息么?')){
		$.ajax({
			url:'https://api.baobaoshowshow.com/index.php?r=WebBaoShow/delCustomerProsInfo&id='+removeID,
			type:'GET',
			datatype:'JSON',
			success:function(data){
				var data = JSON.parse(data);
				alert(data.reMsg);
				location.reload();
			}
		})
	}else{
		return false;
	}
	
})

window.confirm = function (message) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    var alertFrame = window.frames[0];
    var result = alertFrame.window.confirm(message);
    iframe.parentNode.removeChild(iframe);
    return result;
};
//弹窗除网址
window.alert = function(name){
    var iframe = document.createElement("IFRAME");
	iframe.style.display="none";
	iframe.setAttribute("src", 'data:text/plain');
	document.documentElement.appendChild(iframe);
	window.frames[0].window.alert(name);
	iframe.parentNode.removeChild(iframe);
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