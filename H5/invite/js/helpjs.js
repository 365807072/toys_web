	var url = location.href;
	var help_user_id = "";
	var myself_user_id = "";
	var count = 60;
	var countdown;

	function GetQueryString(name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if(r!=null)return  unescape(r[2]); return null;
	}
	
	// 获取分享人id
	if(GetQueryString("login_user_id")!=null && GetQueryString("login_user_id").length>-1){
		help_user_id = GetQueryString("login_user_id");
		getUserActivityInfo(help_user_id);
	}else{
		alert("亲，活动页面貌似遇到了一些问题，请直接添加微信客服：13373920077");	
	}
	
	// 获取验证码
	$("#getCode").click(function(){
		if(!isNaN($("#txt").val()) && $("#txt").val().length == 11){
			getSMSCode($("#txt").val());
		}else{
			alert("请输入正确的手机号");	
		}
	});
	
	
	// 我也要抢卡
	$("#isMe").on("click",function(){
		window.location.href='http://www.meimei.yihaoss.top/download.php';
	})
	
	// 帮他加速
	$("#teambtn").on("click",function(){
		if(!isNaN($("#txt").val()) && $("#txt").val().length == 11 && !isNaN($("#codeText").val()) && $("#codeText").val().length == 6){
			checkSMSCode(help_user_id, $("#txt").val(),$("#codeText").val());
		}else{
			alert("请填写正确的手机号、验证码哦");	
		}
	})
	
	// 获取活动参与情况
	function getUserActivityInfo(help_user_id){
		$.ajax({
		url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV77/HelpMeDisplay&login_user_id='+help_user_id,
		type:'GET',
		datatype:'json',
		success:function(data){
				var res=JSON.parse(data);
				console.log(res);
				var listData=res.data2;
				var footHtml="";
				for(var i in listData){
					footHtml+='<p><span><img src="'+listData[i].avatar+'"></span><span>'+listData[i].nick_name+'</span><span>'+listData[i].help_name+'</span></p>';
				}
				$(".foot").html(footHtml);
				if(res.success==true){
					//var height="<%=res.data1.help_number %>";
           			var div = document.getElementById("progressNumber");
           			var clientWidth=$(".progress").width();
           			var aa=parseInt(clientWidth*(res.data1.help_number/100))+"%";
           			console.log(aa);
           			$("#progressNumber").css("width",aa);
           			var progressvalHtml="";
           			progressvalHtml+='当前进度<span class="progress-num">'+res.data1.help_number+"%"+'</span>';
           			$(".progress-val").html(progressvalHtml);
           			var peoNumHtml="";
           			peoNumHtml+='(已有<span class="peoNumed">'+res.data1.help_number+'</span>人帮你加速)';
           			console.log(res.data1.help_number);
           			$(".peoNum").html(peoNumHtml);
					
					
				}
			}
		})
	}
	
	// 获取验证码
	function getSMSCode(myselfPhone){
		$.ajax({
			url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV77/SendYzm&mobile='+myselfPhone,
			type:'GET',
			datatype:'json',
			success:function(data){
				var res=JSON.parse(data)
				if(res.success==true){
					//alert("您已为好友加速成功！机会难得，快去给自己宝宝抢卡吧！");	
					
					// 启动倒计时
        			countdown = setInterval(CountDown, 1000);
					
				}else{
					alert(res.reMsg);
				}
			}
		})
	}
	
	// 帮助加速
	function checkSMSCode(help_user_id,myselfPhone,smsCode){
		$.ajax({
			url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV77/HelpMe&login_user_id='+help_user_id+"&mobile="+myselfPhone+"&yzm="+smsCode,
			type:'GET',
			datatype:'json',
			success:function(data){
				var res=JSON.parse(data)
				if(res.success==true){
					myself_user_id = res.user_id;
					alert(res.reMsg);

					window.location.href='http://www.meimei.yihaoss.top/H5/help/help_0906.html?login_user_id='+help_user_id;
				}else{
					alert(res.reMsg);
				}
			}
		})
	}
	
	// 启动计时器
	function CountDown() {
     	$("#getCode").attr("disabled", true);
        $("#getCode").val("（" + count + " 秒）");
        if(count == 0) {
        	$("#getCode").val("重新获取").removeAttr("disabled");
        		
            	clearInterval(countdown);
            	count=60;
            }
        count--;
     }
	 
	 // 监听输入框内数据的变化
  	function checkInputChange(){
			
			if(11 != document.getElementById("txt").value.length){
				document.getElementById("getCode").disabled = true;
				document.getElementById("getCode").style.color="#a3d8f6";
				}else{
					document.getElementById("getCode").disabled = false;
					document.getElementById("getCode").style.color="#fff";
				}
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