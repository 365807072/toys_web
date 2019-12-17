<?php 
ini_set('date.timezone','Asia/Shanghai');
//error_reporting(E_ERROR);
require_once "../lib/WxPay.Api.php";
require_once "WxPay.JsApiPay.php";
//require_once 'log.php';

//初始化日志
//$logHandler= new CLogFileHandler("../logs/".date('Y-m-d').'.log');
//$log = Log::Init($logHandler, 15);

//打印输出数组信息
function printf_info($data)
{
    foreach($data as $key=>$value){
        echo "<font color='#00ff55;'>$key</font> : $value <br/>";
    }
}

$business_title=$_GET['business_title'];
$order_id=$_GET['order_id'];
$conn = mysql_connect("115.29.48.94","liuwt","liuwt");
if (!$conn)
{
	die('Could not connect: ' . mysql_error());
}
mysql_select_db('quanquan_baby_show',$conn);
mysql_query( 'set names utf8');
$gettopSql="select user_id from baby_order17 where id=$order_id ";
$gettopcommand = mysql_query($gettopSql,$conn);
if($gettopcommand) {
    while($row = mysql_fetch_assoc($gettopcommand)) {
        $user_id= $row['user_id'];
    }
}

$price=$_GET['price'];
$trade_no=$price*100;
//①、获取用户openid
$tools = new JsApiPay();
//$openId = $tools->GetOpenid();
$openId =$_GET['open_id'];
//$openId ="ouLbysxoFrsmY0b4qGexDjuVwwXQ";
/*var_dump($business_title);
var_dump($price);
var_dump($order_id);
var_dump($trade_no);die;*/
//②、统一下单
$input = new WxPayUnifiedOrder();
/*$input->SetBody("test");
$input->SetAttach("test");
$input->SetOut_trade_no(WxPayConfig::MCHID.date("YmdHis"));
$input->SetTotal_fee($trade_no);
$input->SetTime_start(date("YmdHis"));
$input->SetTime_expire(date("YmdHis", time() + 600));
$input->SetGoods_tag("test");*/
$input->SetBody($business_title);
$input->SetAttach($business_title);
$input->SetOut_trade_no($order_id);//$_GET['order_id']
$input->SetTotal_fee($trade_no);
$input->SetTime_start(date("YmdHis"));
$input->SetTime_expire(date("YmdHis", time() + 600));
$input->SetGoods_tag($business_title);
$input->SetNotify_url("http://www.meimei.yihaoss.top/weixin/jsapi/notify.php");//http://paysdk.weixin.qq.com/example/notify.php
$input->SetTrade_type("JSAPI");
$input->SetOpenid($openId);
//print_r($input);die;
$order = WxPayApi::unifiedOrder($input);
//echo '<font color="#f00"><b>统一下单支付单信息</b></font><br/>';
//var_dump($openId);
/*echo $business_title."<br/>".$order_id."<br/>".$price;
printf_info($order);die;*/
$jsApiParameters = $tools->GetJsApiParameters($order);
$result = array(
        'success' => true,
        'reCode' => 200,
        'reMsg' => '获取列表',
        'data'=>array('jsApiParameters'=>json_decode($jsApiParameters,true))
    );
    echo json_encode($result);
    die;

//获取共享收货地址js函数参数
//$editAddress = $tools->GetEditAddressParameters();
/*print_r("http://www.meimei.yihaoss.top/business/order.html?login_user_id=".$user_id);
die;*/
//③、在支持成功回调通知中处理成功之后的事宜，见 notify.php
/**
 * 注意：
 * 1、当你的回调地址不可访问的时候，回调通知会失败，可以通过查询订单来确认支付是否成功
 * 2、jsapi支付时需要填入用户openid，WxPay.JsApiPay.php中有获取openid流程 （文档可以参考微信公众平台“网页授权接口”，
 * 参考http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html）
 */
//header("Location:http://www.meimei.yihaoss.top/business/order.html?login_user_id=$user_id");
?>

<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/> 
    <title>微信支付样例-支付</title>
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
				if(res.err_msg == "get_brand_wcpay_request:ok"){
					window.location.href="http://www.meimei.yihaoss.top/business/order.html?login_user_id="+<?php echo $user_id; ?>;
				}
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

	
	</script>
</head>
<body>
    <br/>
    <font color="#9ACD32"><b>该笔订单支付金额为<span style="color:#f00;font-size:50px"><?php echo $price; ?>元</span>钱</b></font><br/><br/>
	<div align="center">
		<button style="width:210px; height:50px; border-radius: 15px;background-color:#FE6714; border:0px #FE6714 solid; cursor: pointer;  color:white;  font-size:16px;" type="button" onclick="callpay()" >立即支付</button>
	</div>
</body>
</html>