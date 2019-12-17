var url = location.href;
var userId="";
var lineId = '';
var houseId = '';
var redactOrder = ''; 
var selectIndex = '';
var checkIndex = '';
var loginUser = '';
var val_Status = '';
var val_Level = '';
var rootId = '';
var val_type = '';


if(url.indexOf("?") > 0){
	if(GetQueryString("id")!=null && GetQueryString("id").length>-1){
		
		userId = GetQueryString("id");
	}
	if(GetQueryString("root_img_id")!=null && GetQueryString("root_img_id").length>-1){
		
		rootId = GetQueryString("root_img_id");
	}
}
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

request();
function request(){
	$.ajax({
		url:'https://api.baobaoshowshow.com/index.php?r=WebBaoShow/getReceiver',
		type:'POST',
		datatype:'JSON',
		cache:false,
		async :false,
		success:function(data){
			var data=JSON.parse(data);
			console.log(data);
			var peopleData="";
			var lineHtml="";
			var lineData="";
			var houseData="";
			var houseHtml="";
			var peopleData=data.data;
			lineData=peopleData.line;
			houseData=peopleData.house;
			
			for(var i in lineData){
				if(lineId==lineData[i].id){
					
					lineHtml+='<option value='+lineData[i].line_public_name+' cindex='+lineData[i].id+' selected >'+lineData[i].line_public_name+'</option>';
					
				}else{
					
					lineHtml+='<option value='+lineData[i].line_public_name+' cindex='+lineData[i].id+'>'+lineData[i].line_public_name+'</option>';
				}
				
			}
			$(".line").html(lineHtml);

			for(var i in houseData){
				if(houseId==houseData[i].id){
					houseHtml+='<option sindex='+houseData[i].id+' value='+houseData[i].warehouse_public_name+' selected >'+houseData[i].warehouse_public_name+'</option>';
				}else{
					
					houseHtml+='<option sindex='+houseData[i].id+' value='+houseData[i].warehouse_public_name+'>'+houseData[i].warehouse_public_name+' </option>';
				}
				
			}
			$(".house").html(houseHtml)
			
		}
	})
}

if(userId){
	getListMessage();

}else{
	var box5Html = '';
	box5Html += '<button id="btn">发布</button>';
	$(".box5").html(box5Html);
	$(".box5").on("click","#btn",function(){
		if(confirm('确定发布信息么?')){
			getIssue();
		}else{
			return false;
		}
	})
}

function getListMessage(){
	$.ajax({
		url:'https://api.baobaoshowshow.com/index.php?r=WebBaoShow/getCustomerProsInfo&id='+userId,
		datatype:'JSON',
		success:function(data){
			var data = JSON.parse(data);
			var listData = '';
			var box3Html = '';
			var box4Html = '';
			var box5Html = '';
			listData = data.data;
			console.log(listData);
			lineId = listData.line_name_id;
			houseId = listData.house_name_id;
			request();
	
			box3Html += '<span>处理记录</span><textarea class="result">'+listData.handle_record+'</textarea>';
			$(".box3").html(box3Html);

			if(listData.status == 1){
				box4Html += '<span>问题状态：</span><label>未解决</label><input type="radio" name="status" value="2"><label>已解决</label><input type="radio" name="status" value="1" checked="">';
			}else if(listData.status == 2){
				box4Html += '<span>问题状态：</span><label>未解决</label><input type="radio" name="status" value="2" checked=""><label>已解决</label><input type="radio" name="status" value="1">';
			}else{
				box4Html += '<span>问题状态：</span><label>未解决</label><input type="radio" name="status" value="2"><label>已解决</label><input type="radio" name="status" value="1">';
			}

			if(listData.problem_level == 1){
				box4Html += '<br><span>问题级别：</span><label>一般</label><input type="radio" name="problem_level" value="2"><label>紧急</label><input type="radio" name="problem_level" value="1" checked="">';
			}else if(listData.problem_level == 2){
				box4Html += '<br><span>问题级别：</span><label>一般</label><input type="radio" name="problem_level" value="2" checked=""><label>紧急</label><input type="radio" name="problem_level" value="1">';
			}else{
				box4Html += '<br><span>问题级别：</span><label>一般</label><input type="radio" name="problem_level" value="2"><label>紧急</label><input type="radio" name="problem_level" value="1">';
			}

			if(listData.problem_type == 1){
				box4Html += '<br><span>问题类型：</span><label>玩具坏</label><input type="radio" name="problem_type" value="1" checked=""><label>玩具脏</label><input type="radio" name="problem_type" value="2"><label>玩具送到少零件</label><input type="radio" name="problem_type" value="3"><label>用户赔付</label><input type="radio" name="problem_type" value="4"><label>其他</label><input type="radio" name="problem_type" value="5">';
			}else if(listData.problem_type ==2){
				box4Html += '<br><span>问题类型：</span><label>玩具坏</label><input type="radio" name="problem_type" value="1"><label>玩具脏</label><input type="radio" name="problem_type" value="2" checked=""><label>玩具送到少零件</label><input type="radio" name="problem_type" value="3"><label>用户赔付</label><input type="radio" name="problem_type" value="4"><label>其他</label><input type="radio" name="problem_type" value="5">';
			}else if(listData.problem_type ==3){
				box4Html += '<br><span>问题类型：</span><label>玩具坏</label><input type="radio" name="problem_type" value="1"><label>玩具脏</label><input type="radio" name="problem_type" value="2"><label>玩具送到少零件</label><input type="radio" name="problem_type" value="3" checked=""><label>用户赔付</label><input type="radio" name="problem_type" value="4"><label>其他</label><input type="radio" name="problem_type" value="5">';
			}else if(listData.problem_type ==4){
				box4Html += '<br><span>问题类型：</span><label>玩具坏</label><input type="radio" name="problem_type" value="1"><label>玩具脏</label><input type="radio" name="problem_type" value="2"><label>玩具送到少零件</label><input type="radio" name="problem_type" value="3"><label>用户赔付</label><input type="radio" name="problem_type" value="4" checked=""><label>其他</label><input type="radio" name="problem_type" value="5">';
			}else if(listData.problem_type ==5){
				box4Html += '<br><span>问题类型：</span><label>玩具坏</label><input type="radio" name="problem_type" value="1"><label>玩具脏</label><input type="radio" name="problem_type" value="2"><label>玩具送到少零件</label><input type="radio" name="problem_type" value="3"><label>用户赔付</label><input type="radio" name="problem_type" value="4"><label>其他</label><input type="radio" name="problem_type" value="5" checked="">';
			}else{
				box4Html += '<br><span>问题类型：</span><label>玩具坏</label><input type="radio" name="problem_type" value="1"><label>玩具脏</label><input type="radio" name="problem_type" value="2"><label>玩具送到少零件</label><input type="radio" name="problem_type" value="3"><label>用户赔付</label><input type="radio" name="problem_type" value="4"><label>其他</label><input type="radio" name="problem_type" value="5">';
			}
			$(".box4").html(box4Html);

			box5Html += '<button id="btn" anindex='+listData.root_img_id+'>发布</button>';
			$(".box5").html(box5Html);

			$(".box5").on("click","#btn",function(){
				rootId=$(this).attr("anindex");
				console.log(rootId)
				if(confirm('确定发布信息么?')){
					getIssue();
					
				}else{
					return false;
				}
			})
		}
	})
}



function getIssue(){
	checkIndex = $(".line").find("option:selected").attr("cindex");
	selectIndex = $(".house").find("option:selected").attr("sindex");
	quesText = $(".question").val();
	resText = $(".result").val();
	val_Status = $('.box4 input[name="status"]:checked').val();
	val_Level = $('.box4 input[name="problem_level"]:checked').val();
	val_type = $('.box4 input[name="problem_type"]:checked').val();
	loginUser = $(".user").val();
	redactOrder = $(".order").val();

	$.ajax({
		url:'https://api.baobaoshowshow.com/index.php?r=WebBaoShow/pubCustomerPros',
		type:'POST',
		data:{
			user_id:loginUser,
			id:userId,
			order_id:redactOrder,
	    	root_img_id:rootId,
	    	status:val_Status,
	    	problem_level:val_Level,
	    	problem:quesText,
	    	handle_record:resText,
	    	line_name_id:checkIndex,
	    	house_name_id:selectIndex,
	    	problem_type:val_type
		},
		datatype:'JSON',
		success:function(data){
			var data=JSON.parse(data);
			alert(data.reMsg);
			history.go(-1);
		}
	})
}

//弹窗除网址
window.alert = function(name){
    var iframe = document.createElement("IFRAME");
	iframe.style.display="none";
	iframe.setAttribute("src", 'data:text/plain,');
	document.documentElement.appendChild(iframe);
	window.frames[0].window.alert(name);
	iframe.parentNode.removeChild(iframe);
}
window.confirm = function (message) {
	var iframe = document.createElement("IFRAME");
  	iframe.style.display = "none";
  	iframe.setAttribute("src", 'data:text/plain,');
  	document.documentElement.appendChild(iframe);
  	var alertFrame = window.frames[0];
  	var result = alertFrame.window.confirm(message);
  	iframe.parentNode.removeChild(iframe);
  	return result;
}