var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {         //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
      var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
      var Judgment_equipment=""
      var Judgment_weixin=""
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
              Judgment_weixin=2;
      }
      if (browser.versions.ios) {
              Judgment_equipment=1;
      } 
      if(browser.versions.android){
              Judgment_equipment=0;
      }
}

  var url = location.href;
  url = url.substring(url.indexOf("?")+1).split("&");
  //var code = url.substring(url.indexOf("=")+1);
  var login_userId = url[0].substring(url[0].indexOf("=")+1);
  var business_id = url[1].substring(url[1].indexOf("=")+1);
  var data_index = url[2].substring(url[2].indexOf("=")+1);
  var openid = url[5].substring(url[5].indexOf("=")+1);
  var business_title="";
  var order_id="";
  var price = "";
  var urlType=0;
  var jsapi_pay="";
  var isClick=false;
  var code = GetRequest().code;
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
   // alert(openid);

  $.ajax({
      url:"http://api.baobaoshowshow.com/index.php?r=BabyShowV1/loginV1&login_user_id="+login_userId,
      type:"POST",
      data:"json",
      data:{client_type:Judgment_equipment,user_type:Judgment_weixin},
      success:function(){
      }
  })



//数据渲染
  $.ajax({
      url:"http://api.baobaoshowshow.com/index.php?r=BabyShow/PublicOrder&login_user_id="+login_userId+"&business_id="+  business_id+"&package="+data_index+"&order_rol=0&code="+code+"&open_id="+openid+"&source=1",
      type:"GET",
      datatype:"json",
      success:function(data){
          var data = JSON.parse(data);
          var ahtml="";
          var bhtml="";
          var chtml="";
          var arr=data.data;
          order_id = arr.order_id;
          business_title = arr.business_title;
          price = arr.price;
          if(String(arr.need_price).indexOf(".")>0){
            
            if( parseFloat(arr.need_price)==0.00){
                $(".nored").hide();
            }
          }else{
            
              if( parseInt(arr.need_price)==0){
                $(".nored").hide();
              }
          }

          ahtml="<p><span><img src='img/dd_1.png'></span><span>订单名称:"+arr.business_title+"</span></p><p><span><img src='img/dd_2.png'></span><span>订单价格:￥"+arr.need_price+"</span></p>";
          $(".top").html(ahtml);

          chtml="<p><span>还需支付</span><span>￥"+arr.price+"</span></p><p><span><img src='img/dd_5.png'></span><span>微信支付</span><span><img src='img/dd_3.png'></span></p>";
          $(".pay").html(chtml);
          //判断是否有红包 并且搭建页面
          if(arr.packet_id==0){
              bhtml="<p><span>秀秀红包</span><span class='nored'>暂无红包可用</span></p>";
               $(".recket").html(bhtml);
          }else{
              bhtml="<p><span>秀秀红包</span><span class='red nored'>点击可使用红包<img src='img/dd_4.png'></span></p>";
              $(".recket").html(bhtml);
              $(".recket").on("click",".red",function(){
                  isClick=true;
                  
                  $(".recket .red").html("已自动选择最优红包<a>"+arr.packet_price+"</a>元");
                  $(".recket p .red img").html="<img src='img/dd_3.png'>";
                  if((String(arr.packet_price)).indexOf(".")>0||(String(arr.need_price)).indexOf(".")>0){
                      //alert("是小数")
                      if(parseFloat(arr.packet_price)>parseFloat(arr.need_price)){
                          price="0.00";

                          urlType=1;
                      }else if(parseFloat(arr.need_price)>parseFloat(arr.packet_price)){

                          price=String((parseFloat(arr.need_price) - parseFloat(arr.packet_price)));
                          urlType=2;
                          
                      }else if(parseFloat(arr.need_price)==parseFloat(arr.packet_price)){
                          price="0.00";
                          urlType=1;
                      }
                  }else{
                           
                      if(parseInt(arr.packet_price)>parseInt(arr.need_price)){
                          price="0.00";
                          urlType=1;
                      }else if(parseInt(arr.need_price)>parseInt(arr.packet_price)){
                          price=String((parseInt(arr.need_price) - parseInt(arr.packet_price)));
                          urlType=2;
                      }else if(parseInt(arr.need_price)==parseInt(arr.packet_price)){
                          price="0.00";
                          urlType=1;
                      }
                  };

                  if(String(price).indexOf(".")>0){
                    if((String(price.split(".")[1])).length>=2){
                        price=String(price.split(".")[0])+"."+(String(price.split(".")[1])).substring(0,1);
                    }  
                  }; 
                  chtml="<p><span>还需支付</span><span>￥"+price+"</span></p><p><span><img src='img/dd_5.png'></span><span>微信支付</span><span><img src='img/dd_3.png'></span></p>";
                  $(".pay").html(chtml);
              })   
          }

          var phtml="<a id='btn'>确认支付</a>";
          $(".form").html(phtml);


           //点击确认支付
          $("#btn").on("click",function(){
              $("#loading").show();
              $(".box").hide();
              if(arr.packet_id==0){
                isClick=false;
                  if(price==0){ 
                      $.ajax({
                          url:'http://api.baobaoshowshow.com/index.php?r=BabyShow/PayOrder&login_user_id='+login_userId+'&order_id='+order_id+'&payment=5&source=1',
                          type:'GET',
                          success:function(data){
                              window.location.href="http://www.meimei.yihaoss.top/business/order.html?login_user_id="+login_userId;
                          },
                          complete:function(data){
                              $("#loading").hide();
                              $(".box").show();
                          }
                      })
                  }else{
                      $.ajax({
                          url:'http://www.meimei.yihaoss.top/business/weixin/jsapi/jsapi.php?business_title='+business_title+'&order_id='+order_id+'&price='+price+'&code='+code+'&open_id='+openid,
                          type:'GET',
                          success:function(data){
                              var result = JSON.parse(data);
                              jsapi_pay = result.data.jsApiParameters;
                              callpay(jsapi_pay);
                          },
                          complete:function(data){
                            $("#loading").hide();
                            $(".box").show();
                          }
                      })
                  } 
              }else{
                  if(isClick==true){
                      if(price==0){
                          if(urlType==1){
                                $.ajax({
                                  url:'http://api.baobaoshowshow.com/index.php?r=BabyShow/PayOrder&login_user_id='+login_userId+'&order_id='+order_id+'&payment=6&source=1',
                                  type:'GET',
                                  success:function(){
                                    window.location.href="http://www.meimei.yihaoss.top/business/order.html?login_user_id="+login_userId;
                                  },
                                  complete:function(data){
                                    $("#loading").hide();
                                    $(".box").show();
                                  }
                                })
                          }else{
                              $.ajax({
                                  url:'http://api.baobaoshowshow.com/index.php?r=BabyShow/PayOrder&login_user_id='+login_userId+'&order_id='+order_id+'&payment=5&source=1',
                                  type:'GET',
                                  success:function(){
                                      window.location.href="http://www.meimei.yihaoss.top/business/order.html?login_user_id="+login_userId;
                                  },
                                  complete:function(data){
                                    $("#loading").hide();
                                  }
                              })
                          }
                      }else{
                        
                          $.ajax({
                              url:'http://www.meimei.yihaoss.top/business/weixin/jsapi/jsapi.php?business_title='+business_title+'&order_id='+order_id+'&price='+price+'&code='+code+'&open_id='+openid,
                              type:'GET',
                              success:function(data){
                                  var result = JSON.parse(data);
                                  jsapi_pay = result.data.jsApiParameters;
                                  callpay(jsapi_pay);
                              },
                              complete:function(data){
                                $("#loading").hide();
                                $(".box").show();
                              }
                          })
                      }  
                  }else{
                      if(price==0){
                          $.ajax({
                            url:'http://api.baobaoshowshow.com/index.php?r=BabyShow/PayOrder&login_user_id='+login_userId+'&order_id='+order_id+'&payment=5&source=1',
                            type:'GET',
                            success:function(data){
                                window.location.href="http://www.meimei.yihaoss.top/business/order.html?login_user_id="+login_userId;
                            },
                            complete:function(data){
                                $("#loading").hide();
                                $(".box").show();
                            }
                          })
                      }else{

                          $.ajax({
                              url:'http://www.meimei.yihaoss.top/business/weixin/jsapi/jsapi.php?business_title='+business_title+'&order_id='+order_id+'&price='+price+'&code='+code+'&open_id='+openid,
                              type:'GET',
                              success:function(data){
                                  var result = JSON.parse(data);
                                  jsapi_pay = result.data.jsApiParameters;
                                  callpay(jsapi_pay);
                              },
                              complete:function(data){
                                $("#loading").hide();
                                $(".box").show();
                              }
                          })
                      }
                  }
              }
          })
      }
  })

function jsApiCall(jsapi_pay){
    //alert(jsapi_pay);
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      jsapi_pay,
      function(res){
        WeixinJSBridge.log(res.err_msg);
        //alert(res.err_code+res.err_desc+res.err_msg);
        if(res.err_msg == "get_brand_wcpay_request:ok"){
          window.location.href="http://www.meimei.yihaoss.top/business/order.html?login_user_id="+login_userId+"&open_id="+openid;
        }
      }
    );
}

function callpay(jsapi_pay){
  
    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', jsApiCall); 
            document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
        }
    }else{
        jsApiCall(jsapi_pay);
    }
}

//返回按钮 返回到订单
$(".l_btn").on("click",function(){
  
      window.location.href='http://www.meimei.yihaoss.top/business/business_details.html?login_user_id='+login_userId+'&business_id='+business_id;
})















































