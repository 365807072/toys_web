var url = location.href;
url = url.substring(url.indexOf("?")+1).split("&");
var order_Id = "";
var login_userId = "";
var payStates="";
var business_Id="";
var data_Index="";
var code="";
code=window.localStorage.getItem("code");
var openid="";
order_Id = url[0].substring(url[0].indexOf("=")+1);
login_userId =url[1].substring(url[1].indexOf("=")+1);
openid=url[2].substring(url[2].indexOf("=")+1);
$.ajax({
	url:"http://api.baobaoshowshow.com/index.php?r=BabyShowV1/OrderDetailV1&order_id="+order_Id,
	dataType:"json",
	type:"GET",
	success:function(data){
		var v_data = data.data;
		var orderhtml="";
		var orderHtml="";
		var order_HTML="";
		payStates=v_data.status;
		business_Id=v_data.business_id;
		data_Index=v_data.package;
			var typeName="";

			if(payStates==1){
				typeName="未消费";
				order_HTML+="<a id='s_btn'>申请退款</a>";
				$(".form").on("click","#s_btn",function(){
					
					$.ajax({
						url:"http://api.baobaoshowshow.com/index.php?r=BabyShow/RefundOrder&login_user_id="+login_userId+"&order_id="+order_Id,
						dataType:"json",
						type:"GET",
						success:function(data){
							alert(data.reMsg);
							window.location.reload();
							
						},
						error:function(data){
							alert(data.reMsg);
						}
						
					})
					
				})
			}else if(payStates==2){
				typeName="未支付";
				order_HTML+="<a id='s_btn'>立即支付</a>";
				$(".form").on("click","#s_btn",function(){
					window.location.href="http://www.meimei.yihaoss.top/Test/pay.html?login_user_id="+login_userId+"&business_id="+business_Id+"&package="+data_Index+"&order_rol=0&code="+code+"&open_id="+openid;
				})
			}
			else if(payStates==3){
				typeName="已完成";
			}
			else if(payStates==4){
				typeName="退款中";
			}
			else if(payStates==5){
				typeName="已退款";
			}
			else if(payStates==6){
				typeName="上门付款";
			}
			orderhtml+="<p><span><img src='img/dd_6.png'></span><span>"+v_data.business_title+"</span><span>"+v_data.business_time+"</span></p><p><span><img src='img/dd_7.png'></span><span>"+v_data.address+"</span></p><p><span><img src='img/dd_8.png'></span><span>"+v_data.business_package+"</span></p>";
			orderHtml+="<ul><li><span>订单号</span><span>"+v_data.order_num+"</span></li><li><span>验证码</span><span>"+v_data.verification+"</span></li><li><span>下单时间</span><span>"+v_data.order_time+"</span></li><li><span>支付方式</span><span>"+v_data.payment+"</span></li><li><span>套餐</span><span>"+v_data.package+"</span></li><li><span>红包</span><span>"+v_data.packet_price+"</span></li><li><span>价格</span><span>"+v_data.price+"</span></li><li><span>数量</span><span>"+v_data.package+"</span></li><li><span>消费状态</span><span>"+typeName+"</span></li></ul>";
			
	
		
		$(".box6").html(orderhtml);
		$(".box7").html(orderHtml);
		$(".form").html(order_HTML);
	}
	
});

$(".l_btn").on("click",function(){
window.location.href="http://www.meimei.yihaoss.top/Test/order.html?login_user_id="+login_userId+"&open_id="+openid;
});

/*console.log(business_Id);
$("#s_btn").on("click",function(){
	window.location.href="http://www.meimei.yihaoss.top/Test/pay.html?login_user_id="+login_userId+"&business_id="+business_Id+"&package="+data_Index+"&order_rol=0&open_id="+openid;
})*/







