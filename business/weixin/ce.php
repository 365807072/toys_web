<?php 
ini_set('date.timezone','Asia/Shanghai');
//error_reporting(E_ERROR);
require_once "./lib/WxPay.Api.php";
require_once "./WxPay.ApiPay.php";

//打印输出数组信息
function printf_info($data)
{
    foreach($data as $key=>$value){
        echo "<font color='#00ff55;'>$key</font> : $value <br/>";
    }
}
$tools = new JsApiPay();
$business_id=$_REQUEST["business_id"];
$code = $_REQUEST['code'];
$state = $_REQUEST['state'];
if($code) {
	print_r($_REQUEST);
	//换成自己的接口信息
    $appid = 'wx5bd2876a775d0525';
    $appsecret = 'fbe910d6725deaf122948d697d40f1d4';
    $token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$appid.'&secret='.$appsecret.'&code='.$code.'&grant_type=authorization_code';
    $token = json_decode(file_get_contents($token_url));
    $access_token_url = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid='.$appid.'&grant_type=refresh_token&refresh_token='.$token->refresh_token;
    //转成对象
    $access_token = json_decode(file_get_contents($access_token_url));
    $user_info_url = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$access_token->access_token.'&openid='.$access_token->openid.'&lang=zh_CN';
    //转成对象
    $user_info = json_decode(file_get_contents($user_info_url),true);
    print_r($user_info);
    $openId=$user_info['openid'];
    print_r($openId);die;
    setcookie("openId", $openId, time()+60*60);
} elseif(empty($_COOKIE["openId"])) {
	$tools->GetOpenid($business_id);
}
$cookie_openid=$_COOKIE["openId"];

$conn = mysql_connect("115.29.48.94","liuwt","liuwt");
if (!$conn)
{
	die('Could not connect: ' . mysql_error());
}
mysql_select_db('quanquan_baby_show',$conn);
mysql_query( 'set names utf8');
$checkbussql ="select business_title,seller_id,business_location from baby_business_new where id='".$business_id."'";
$checkbusRes = mysql_query($checkbussql,$conn);
while($row = mysql_fetch_array($checkbusRes)) {
	$business_title =  $row["business_title"];
	$business_location =  $row["business_location"];
	$seller_id =  intval($row["seller_id"]);
}
if(empty($seller_id)) {
	$seller_id=0;
}
if(empty($business_location)) {
	$business_location="";
}

if(isset($_REQUEST["money"]) && $_REQUEST["money"] != ""){
	//①、获取用户openid
	$tools = new JsApiPay();
	//$openId ="ouLbysxoFrsmY0b4qGexDjuVwwXQ";
	$price=$_REQUEST["money"];
	//$openId = $tools->GetOpenid();
	$money = $price*100;
	$now_time=date ( 'Y-m-d H:i:s' );
	$order_num=date("ymd").mt_rand(1000,9999);
	$insertsql ="insert into baby_order17 (seller_id,order_num,state,create_time,post_create_time,order_time,payment,number,price,status,business_id,need_price,address) 
	values('{$seller_id}','{$order_num}','0','{$now_time}','{$now_time}','{$now_time}','9','1','{$price}','2','{$business_id}','{$price}','{$business_location}') ";
    mysql_query($insertsql,$conn);
    $order_id=mysql_insert_id();


	//②、统一下单
    $input = new WxPayUnifiedOrder();
	$input->SetBody($business_title);
	$input->SetAttach($business_title);
	$input->SetOut_trade_no($order_id);//WxPayConfig::MCHID.date("YmdHis")
	$input->SetTotal_fee($money);
	$input->SetTime_start(date("YmdHis"));
	$input->SetTime_expire(date("YmdHis", time() + 600));
	$input->SetGoods_tag($business_title);
	$input->SetNotify_url("http://www.meimei.yihaoss.top/business/weixin/cenotify.php");//http://paysdk.weixin.qq.com/example/notify.php
	$input->SetTrade_type("JSAPI");
	$input->SetOpenid($cookie_openid);
	$order = WxPayApi::unifiedOrder($input);
// 	echo '<font color="#f00"><b>统一下单支付单信息</b></font><br/>';
 	printf_info($order);
	$jsApiParameters = $tools->GetJsApiParameters($order);
	print_r($jsApiParameters);die;
	//获取共享收货地址js函数参数
	//$editAddress = $tools->GetEditAddressParameters();
}
//③、在支持成功回调通知中处理成功之后的事宜，见 notify.php
/**
 * 注意：
 * 1、当你的回调地址不可访问的时候，回调通知会失败，可以通过查询订单来确认支付是否成功
 * 2、jsapi支付时需要填入用户openid，WxPay.JsApiPay.php中有获取openid流程 （文档可以参考微信公众平台“网页授权接口”，
 * 参考http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html）
 */
?>

<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>微信支付</title>
    <style type="text/css">
		*{
			margin: 0;
			padding: 0;
		}
		body,html{
			width: 100%;
			height: 100%;
		}
    </style>
    <script type="text/javascript" src="setfontsize.js"></script>
    <script type="text/javascript">
	//调用微信JS api 支付
	function jsApiCall()
	{
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest',
			<?php echo $jsApiParameters; ?>,
			function(res){
				WeixinJSBridge.log(res.err_msg);
				//alert(res.err_code+res.err_desc+res.err_msg);
				/*if(res.err_msg == "get_brand_wcpay_request:ok" ) {
					window.location="http://www.meimei.yihaoss.top/business/weixin/pay.html";
				}*/
			}
		);
	}

	function callpay()
	{
		if (typeof WeixinJSBridge == "undefined"){
		    if( document.addEventListener ){
		        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
		    }else if (document.attachEvent){
		        document.attachEvent('WeixinJSBridgeReady', jsApiCall); 
		        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
		    }
		}else{
		    jsApiCall();
		}
	}
	</script>
	<script type="text/javascript">
	//获取共享地址
	/*function editAddress()
	{
		WeixinJSBridge.invoke(
			'editAddress',
			<?php echo $editAddress; ?>,
			function(res){
				var value1 = res.proviceFirstStageName;
				var value2 = res.addressCitySecondStageName;
				var value3 = res.addressCountiesThirdStageName;
				var value4 = res.addressDetailInfo;

				var tel = res.telNumber;
				
				alert(value1 + value2 + value3 + value4 + ":" + tel);
			}
		);
	}*/
	
	window.onload = function(){
		 var src;
		 src = '<?php echo $price;?>';

		if(src) {
			document.getElementById("money").value = '<?php echo $price;?>';
			if (typeof WeixinJSBridge == "undefined"){
			    if( document.addEventListener ){
			        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
			    }else if (document.attachEvent){
			        document.attachEvent('WeixinJSBridgeReady', jsApiCall); 
			        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
			    }
			}else{
			    jsApiCall();
			}
		}
	};
	
	</script>
</head>
<body style="background:#f5f5f5;">
    
	<form action="#" method="post">
	
        <div style="color:#333;background:#fff;line-height:0.98rem;padding-left:0.2rem;font-size:0.3rem;"><?php echo $business_title;?></div>
       
        <input type="text" style="width:100%;height0.98rem;margin-top:0.2rem;background:#fff;border:none;border-bottom:0.5px solid #e4e4e4;line-height:0.98rem;padding-left:0.2rem;" name="money" id="money" placeholder="输入需要支付的金额111" />
		<div align="center">
			<input type="submit" value="确认支付" style="width:90%; height:0.9rem; background:url(./bg_red.png); background-repeat:repeat;background-size:100% 100%; border:0; cursor: pointer;color:white;font-size:16px;margin:0 auto;margin-top:0.2rem;" type="button" />
		</div>
	</form>
</body>
</html>