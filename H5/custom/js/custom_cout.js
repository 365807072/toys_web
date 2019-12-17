var url = location.href;
var textId = "";
var text_coutId = '';
var removeID = '';
if(url.indexOf("?") > 0){
	if(GetQueryString("id")!=null && GetQueryString("id").length>-1){
		
		textId = GetQueryString("id");
	}
}
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

getcustom_cout()
function getcustom_cout(){
	$.ajax({
		url:'https://api.baobaoshowshow.com/index.php?r=WebBaoShow/getCustomerProsNextList&id='+textId,
		type:'GET',
		datatype:'JSON',
		cache:false,
		async :false,
		success:function(data){
			var data = JSON.parse(data);
			var cusData = '';
			var boxHtml = '';
			cusData = data.data;
			console.log(cusData);
			for(var i in cusData){
				text_coutId = cusData[i].id;
				boxHtml += '<tr><td align="center" width="10%">'+cusData[i].user_id+'</td><td align="center" width="10%">'+cusData[i].create_time+'</td><td align="center" width="10%">'+cusData[i].line_name+'</td><td align="center" width="10%">'+cusData[i].house_name+'</td><td align="center" width="10%">'+cusData[i].problem+'</td><td align="center" width="10%">'+cusData[i].handle_record+'</td><td align="center" width="10%">'+cusData[i].order_id+'</td><td align="center" width="10%"><a href="redact_cout.html?id='+text_coutId+'">编辑</a><a class="remove" reindex='+cusData[i].id+'>删除</a></td></tr>';
			}
			$(".box").html(boxHtml);
		}
	})
}

$(".head").on("click",".aa",function(){
	window.location.href='redact_cout.html?root_img_id='+textId
})

$(".box").on("click",".remove",function(){
	removeID=$(this).attr("reindex");
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