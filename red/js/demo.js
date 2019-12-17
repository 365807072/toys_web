
window.onload = function (){

	var user_id = GetRequest().user_id;
	var order_id = GetRequest().order_id;
	
	//Ajax
	var Ajax = function(){
	    function request(url,opt){
	        function fn(){}
	        var async   = opt.async !== false,
	            method  = opt.method    || 'GET',
	            encode  = opt.encode    || 'UTF-8',
	            data    = opt.data      || null,
	            success = opt.success   || fn,
	            failure = opt.failure   || fn;
	            method  = method.toUpperCase();
	        if(data && typeof data == 'object'){//对象转换成字符串键值对
	            data = _serialize(data);
	        }
	        if(method == 'GET' && data){
	            url += (url.indexOf('?') == -1 ? '?' : '&') + data;
	            data = null;
	        }
	        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	        xhr.onreadystatechange = function(){
	            _onStateChange(xhr,success,failure);
	        };
	        xhr.open(method,url,async);
	        if(method == 'POST'){
	            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=' + encode);
	        }
	        xhr.send(data);
	        return xhr;
	    }
	    function _serialize(obj){
	        var a = [];
	        for(var k in obj){
	            var val = obj[k];
	            if(val.constructor == Array){
	                for(var i=0,len=val.length;i<len;i++){
	                    a.push(k + '=' + encodeURIComponent(val[i]));
	                }
	            }else{
	                a.push(k + '=' + encodeURIComponent(val));
	            }
	        }
	        return a.join('&');
	    }
	    function _onStateChange(xhr,success,failure){
	        if(xhr.readyState == 4){
	            var s = xhr.status;
	            if(s>= 200 && s < 300){
	                success(xhr.response);
	            }else{
	                failure(xhr.response);
	            }
	        }else{}
	    }
	    return {request:request};
	}();

	if(getCookie("phone") != null){
		var cook = getCookie("phone");
		submitFn(cook);
	}
	function $(o){
        return document.querySelector(o);
    }

	
	function setCookie(name,value){
        var Days = 30;
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+exdate);
        document.cookie = name + "="+ escape (value) + ";expires="+exdate.toGMTString();
    }

    $("#deleCookie").onclick = function (){
    	delCookie("phone");
    	window.location.reload();
    };
    //读取cookies
    function getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return unescape(arr[2]);
        } else {
            return null;
        }
    }

    //删除cookies
    function delCookie(name){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getCookie(name);
        if(cval!=null)
            document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }

    //获取url
	function GetRequest() { 
		var url = location.search; //获取url中"?"符后的字串 
		var theRequest = new Object(); 
		if (url.indexOf("?") != -1) { 
			var str = url.substr(1); 
			strs = str.split("&"); 
			for(var i = 0; i < strs.length; i ++) { 
				theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]); 
			} 
		} 
		return theRequest; 
	}

	//判断手机号
    function is_phone(s) {
        var reg = reg = /^\d{11}$/;
        if(reg.test(s)){   
            return  true;  
        } else {
            return false;
        }
    }		
	$("#submit").onclick=function(){
		var num = $("#phoneNum").value;
		setCookie("phone",num);
		submitFn(num);
	};
	$("#phoneNum").onkeyup = function (){
		if(!is_phone(this.value)){
			$("#submit").className = "";
		} else {
			$("#submit").className = "active";
		}
	}
	function redPacke(msg){
		$("body").className = "active";
		$("#phone").innerHTML = msg.mobile;
		var packet_price=msg.packet_price;
		if(packet_price==0) {
			$(".number").innerHTML = "<i id='num' style='line-height:50px;font-size:16px;'>您来晚了，下次尽快哦</i>";
		} else {
			$(".number").innerHTML = "<em class='rmb'>￥</em><i id='num'>"+packet_price+"</i>";
		}		
		userFn();
	}
	function userFn(){
		Ajax.request("http://www.meimei.yihaoss.top/grabPacketList.php",{
			data : {"send_user_id":user_id,"order_id":order_id},
			method : "GET",
			success : function(data){
				var dataJson = JSON.parse(data);
				if (dataJson.reCode==200) {
					userList(dataJson.data);
				}else {
					alert("提交失败！："+dataJson.reCode);
				}
			},
			failure : function(mag){
				console.log("网络错误！："+mag);
			}
		})
	};

	function submitFn(num){
		if(is_phone(num)){
			Ajax.request("http://www.meimei.yihaoss.top/packetMobile.php",{
				data : {"send_user_id":user_id,"mobile":num,"order_id":order_id},
				method : "GET",
				success : function(data){
					var dataJson = JSON.parse(data);
					if (dataJson.reCode==200) {
						//redPacke(num);
						redPacke(dataJson.data);
					}else {
						alert("提交失败！："+dataJson.reCode);
					}
				},
				failure : function(mag){
					console.log("网络错误！："+mag);
				}
			})
		} else {
			alert("手机号有误！")
		}
	};

	function userList(data){
		var html = "";
		for (var i = 0; i < data.length; i++) {
			html += '<li><dl>'
			+"<dt><img src='"+data[i].avatar+"' ></dt>"
			+'<dd><h3>'+data[i].nick_name+"<p id='user_p'><span>"+data[i].packet_price+"元</span>"+data[i].post_create_time+"</p></h3>"
			+'<p>'+data[i].packet_description+'</p></dd>'
			+'</dl></li>'
		}
		$("#users").innerHTML = html;
	}
}


	// $(function () {
 //        var u = navigator.userAgent, app = navigator.appVersion;
 //        var isAndroid = u.indexOf('Android') > -1; //g
 //        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
 //        if (isAndroid) {
            
	// 		if (isInstallApp(MainActivity.this, "com.xxx")) {  
 //                    window.location.href = 'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/GetBusinessListV3&login_user_id=65723';
 //                } else {  
 //                    window.location.href = 'http://www.meimei.yihaoss.top/download/GoodLife_luntan_v6.8.apk';  
 //                }  
 //        }

 //        if (isIOS) {
            
 //            function testApp(url) {  
 //    			var timeout, t = 1000, hasApp = true;  
	// 		    setTimeout(function () {  
	// 		        if (hasApp) {  
	// 		            window.location.href = 'http://api.baobaoshowshow.com/index.php?r=BabyShowV1/GetBusinessListV3&login_user_id=65723'; 
	// 		        } else {  
	// 		            window.location.href = 'http://www.meimei.yihaoss.top/download.php' 
	// 		        }  
	// 		        document.body.removeChild(ifr);  
	// 		    }, 2000)  
  
	// 	    var t1 = Date.now();  
	// 	    var ifr = document.createElement("iframe");  
	// 	    ifr.setAttribute('src', url);  
	// 	    ifr.setAttribute('style', 'display:none');  
	// 	    document.body.appendChild(ifr);  
	// 	    timeout = setTimeout(function () {  
	// 	         var t2 = Date.now();  
	// 	         if (!t1 || t2 - t1 < t + 100) {  
	// 	             hasApp = false;  
	// 	         }  
	// 	    }, t);  
	// 		}  
 //    	}   
 //    }
