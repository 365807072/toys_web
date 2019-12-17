	var openid="";
	var code="";
	var loginUserid = '';
	var activeHtml = '';
	var giftHtml = '';
	var url = location.href;
	var yzmval = '';
	
	url = url.substring(url.indexOf("?")+1).split("&");
	var loginUserid = url[0].substring(url[0].indexOf("=")+1);
	code = GetRequest().code , state = GetRequest().state;
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
	
	if(!code){
		location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5bd2876a775d0525&redirect_uri=http%3a%2f%2fwww.meimei.yihaoss.top%2fH5%2finvite%2faa.html&response_type=code&scope=snsapi_userinfo&state='+loginUserid;
		alert(loginUserid);
		alert(code);
	}else{
		href = "javascript:;";
		console.log(3);
		alert(code);
		$.get('http://www.meimei.yihaoss.top/H5/invite/php.php?code='+code+'&state=111',function(data){
			
			var result = JSON.parse(data);
			openid = result.openid;
			alert(openid);
			code = result.data.code;
			//alert(localStorage.setItem('open_id',openid));
			//localStorage.setItem('code',result.code);
			
			$.ajax({
				url:"http://api.baobaoshowshow.com/index.php?r=BabyShowV1/wxLogin",
				type:"POST",
				data : {
					'uid' : result.openid,
					'nick_name' : result.nickname,
					'source' : 1,
					'unionid' : result.unionid,
					'imgurl' : result.headimgurl,
	  			},
				success:function(data){
					var res = JSON.parse(data);
					alert(res);
					
				}

			})

		});
	}
	
	request();
	//倒计时
	var starttime = new Date("2018/04/15");
	setInterval(function () {
		var nowtime = new Date();
		var time = starttime - nowtime;
		var day = parseInt(time / 1000 / 60 / 60 / 24);
		var hour = parseInt(time / 1000 / 60 / 60 % 24);
		var minute = parseInt(time / 1000 / 60 % 60);
		var seconds = parseInt(time / 1000 % 60);
		$(".first").html(day);
		$(".second").html(hour);
		$(".three").html(minute);
		$(".four").html(seconds);
	}, 1000);

	var count = 60;
    var countdown;
   // 获取验证码
    $("#getCode").click(function(){
        if(!isNaN($("#txt").val()) && $("#txt").val().length == 11){
            getSMSCode($("#txt").val());
        }else{
            alert("请输入正确的手机号"); 
        }
    });

    // 获取验证码
    function getSMSCode(myselfPhone){
        $.ajax({
            url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV7/SendYzm&mobile='+myselfPhone,
            type:'GET',
            datatype:'json',
            success:function(data){
                var res=JSON.parse(data);
                console.log(res);
                if(res.success==true){
                    // 启动倒计时
                   
				        setInterval(function() {
					    	CountDown() }
					    ,1000)
				    
                    
                    
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

    function request(){
    	$.ajax({
    		url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV7/ToysActivityAllUserList',
    		type:'GET',
    		datatype:'json',
    		success:function(res){
    			var res = JSON.parse(res);
    			console.log(res);
    			if(res.num_success<10){
					giftHtml += '<img src="img/117.png">';
    			}
    			else if(res.num_success==10){
    				giftHtml += '<img src="img/118.png">';
    			}
    			else if(res.num_success==20){
    				giftHtml += '<img src="img/119.png">';
    			}
    			else if(res.num_success==30){
    				giftHtml += '<img src="img/120.png">';
    			}
    			else if(res.num_success==40){
    				giftHtml += '<img src="img/121.png">';
    			}
    			else if(res.num_success==50){
    				giftHtml += '<a class="giftaa">'+res.title_day+'</a><img src="img/122.png">';
    			}
    			else if(res.num_success==60){
    				giftHtml += '<img src="img/123.png">';
    			}

    			$(".gift").html(giftHtml);

    			var data = res.data;
    			activeHtml += '<p>'+res.title+'</p>';
    			activeHtml += '<div class="invi">';
    			for(var i in data){
    				activeHtml +='<dl><dt><img src='+data[i].avatar+'></dt><a><img src='+data[i].how_day+'></a><dd>'+data[i].nick_name+'</dd></dl>';
    			}
    			activeHtml += '</div>';

    			$(".active").html(activeHtml);
    		}
    	})
    }

    //点击接受邀请
    $("#teambtn").on("click",function(){
        

        yzmval = $("#numval").val();
        txtVal = $("#txt").val();
        teamZu();
         
    })

    //填入手机号走接口
    function teamZu(){
        $.ajax({
            url:'https://api.baobaoshowshow.com/index.php?r=BabyShowV7/ToysActivityaddUserNeed&login_user_id='+loginUserid+'&mobile='+txtVal+'&yzm='+yzmval,
            type:'GET',
            datatype:'json',
            success:function(data){
                var res=JSON.parse(data)
                console.log(res.success);
                if(res.success==true){
                    alert("已成功接收邀请,去下载舜鑫国际旅游（北京）有限公司租赁购买年卡获得好礼吧");
                    location.reload();
                }else{
                    alert(res.reMsg);
                    return false;
                    
                }
                
            },
            error:function(data){
                var res=JSON.parse(data)
                alert(res.reMsg);
                
            }
        })
    }

    $(".boximg").on("click",function(){

        window.location.href='http://www.meimei.yihaoss.top/download.php';
    })

