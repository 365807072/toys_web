$(function(){
	var listData="";
	var dataOrder="";
	var dataTitle="";
	var dataStatus="";
	var dataNum="";
	var dataName="";
	var mainHtml="";
	var middleHtml="";
	var bottomHtml="";
	var _file="";
	var urlData="";
	var imgUrl="";
	var fileList="";
	var userName="";
	var call="";
	var Address="";
	var textval="";
	var businessId="";
	var selectText="";
	var url = location.href;
	url = url.substring(url.indexOf("?")+1).split("&");
	var dataOrder = url[0].substring(url[0].indexOf("=")+1);


	$.ajax({
		url:'http://api.baobaoshowshow.com/index.php?r=WebBaoShow/getToysOrderListing&order_id='+dataOrder,
		type:'GET',
		datatype:'json',
		success:function(data){
		    listData=JSON.parse(data);
		    dataTitle=listData.data.business_title;
		    dataStatus=listData.data.status;

		    dataNum=listData.data.order_num;
		    dataName=listData.data.status_name;
		    userName=listData.data.user_name;
		    call=listData.data.mobile;
		    Address=listData.data.address;
		    businessId=listData.data.business_id;
			mainHtml="<div class='order1'><span>订单单号:</span><span>"+dataNum+"</span></div><div class='order2'  ordindex="+listData.data.status+"><span class='ordername' busindex="+listData.data.business_id+">订单名称:</span><span class='ordername' busindex="+listData.data.business_id+">"+dataTitle+"</span></div><div class='order3'><span>"+dataName+"</span><span><img src='img/2.png'></span></div><div class='order4'><span>用户名:</span><span>"+userName+"</span></div><div class='order5'><span>联系方式:"+call+"</span><a href='tel:"+call+"'><img src='img/call.png'></a></div><div class='order6'><span>用户住址:</span><span>"+Address+"</span></div>";
			$(".main").html(mainHtml);
			middleHtml="<p>备注:<input type='text' id='txt'></p>";
			$(".middle").html(middleHtml);
			bottomHtml="<p><a id='btn'>确定</a></p>";
			$(".bottom").html(bottomHtml);
			
			//  _file = document.querySelector('#file');
				
			//  _file.onchange=function(){
			// 	fileList = document.getElementById("file").files[0];
			// 	var reader = new FileReader();
			// 	reader.onload = function (){
			// 		urlData = this.result;
			// 		$("#showDiv img").hide();
			// 		document.getElementById("showDiv").innerHTML += "<img src = '" + urlData + "'/>";
					
			// 	}
			// 	reader.readAsDataURL(fileList);
			// }
		},
				complete:function(){
					$("#loading").hide();
				}
	})

	$(".main").on("click",".ordername",function(){
		var businessId=$(this).attr("busindex");
		window.location.href='http://www.meimei.yihaoss.top/fenxiang/play.html?business_id='+businessId+'&login_user_id=290812';
	})
	
	$(".numtoy").on("click",function(){

		businessId=$(".ordername").attr("busindex");
		dataStatus=$(".order2").attr("ordindex");
		
		if(dataStatus==2){
			
			$.ajax({
				url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV7/SelectNumber&business_id='+businessId,
				type:'get',
				datatype:'json',
				success:function(data){
					
					var data=JSON.parse(data);
					
					var toydata=data.data;
					var opionhtml='';
				
					opionhtml+='<select id="test">';
					opionhtml+='<span class="numtoy">请选择玩具编号</span>'
					for(var i in toydata){

						opionhtml+='<option index='+toydata[i].toys_number_address+'>'+toydata[i].toys_number_address+'</option>'
					}
					
					opionhtml+='</select>';
					$(".options").html(opionhtml)

				},
				complete:function(){
					$("#loading").hide();
				}
			})
		}else{

			$.ajax({
				url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV7/getToysOrderListings&order_id='+dataOrder,
				type:'get',
				datatype:'json',
				success:function(data){
					
					var data=JSON.parse(data);
					
					var toydata=data.data;
					var opionhtml='';
					opionhtml='<span class="numtoy">'+toydata.toys_number_address+'</span>'
					$(".options").html(opionhtml)

				},
				complete:function(){
					$("#loading").hide();
				}
			})
		}
		
	})

//http://api.baobaoshowshow.com/index.php?r=WebBaoShow/PubOrderDetail
	$(".bottom").on("click","#btn",function(){
		if(dataStatus==2){
			selectText=$("#test").val();
			console.log(selectText);
		}else{
			selectText=$(".numtoy").html();
			console.log(selectText);
		}
		businessId=$(".ordername").attr("busindex");
		textval=$("#txt").val();

		if(selectText==undefined){
			alert("上传编号")
		}else{
			if(confirm('确定上传？')){

			    $.ajax({
					url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV7/PubOrderDetail',
					data:{
						'order_id':dataOrder,
						'remark':textval,
						'status':dataStatus,
						'business_id':businessId,
						'login_userid':245013,
						'toys_number':selectText,
					},
					type:'post',
					datatype:'json',
					success:function(data){
						console.log(data);
						var DATA=JSON.parse(data);
						console.log(DATA);
	                        alert(DATA.reMsg)
	                        location.reload();
					},
					complete:function(){
						$("#loading").hide();
					}
				})
			}else{
			      return false;
			}
			
		}
		
	 })
	// window.location.href='http://www.meimei.yihaoss.top/list/list_first.html';
	
	window.alert = function(name){
	 var iframe = document.createElement("IFRAME");
	iframe.style.display="none";
	iframe.setAttribute("src", 'data:text/plain,');
	document.documentElement.appendChild(iframe);
	window.frames[0].window.alert(name);
	iframe.parentNode.removeChild(iframe);
	}
})

	





	

















