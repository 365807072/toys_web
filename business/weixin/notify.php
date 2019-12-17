<?php
ini_set('date.timezone','Asia/Shanghai');
error_reporting(E_ERROR);

require_once "./lib/WxPay.Api.php";
require_once './lib/WxPay.Notify.php';
//require_once 'log.php';

//初始化日志
/*$logHandler= new CLogFileHandler("../logs/".date('Y-m-d').'.log');
$log = Log::Init($logHandler, 15);*/

class PayNotifyCallBack extends WxPayNotify
{	
	//重写回调处理函数
	public function NotifyProcess($data, &$msg)
	{
		$result=$data;
		if(array_key_exists("return_code", $result)
			&& array_key_exists("result_code", $result)
			&& $result["return_code"] == "SUCCESS"
			&& $result["result_code"] == "SUCCESS" ) {
			$this->orderInfo($result);
			return true;
		} else {
			return false;
		}
	}

	public function orderInfo($data) {
		$result=$data;
		$conn = mysql_connect("115.29.48.94","liuwt","liuwt");
		if (!$conn)
		{
			die('Could not connect: ' . mysql_error());
		}
		mysql_select_db('quanquan_baby_show',$conn);
		mysql_query( 'set names utf8');
		//$out_trade_no=(int)$result['out_trade_no'];
		
		$temp_order_id=$result['out_trade_no'];
		$array_order_id=explode("a",$temp_order_id);
		$out_trade_no=(int)$array_order_id[0];
		$order_name="baby_order";
		
		$post_create_time=date("Y-m-d H:i:s");
		$transaction_id=$result['transaction_id'];
        $verification= mt_rand(100000000,999999999);
        $total_fee=(int)$result['total_fee']/100;
		if($out_trade_no>0) {
			$checksql ="select status,verification,order_role,babys_idol_id,packet_id,price,user_id,business_id,seller_id,address,need_price,package from ".$order_name." where id='".$out_trade_no."'";
            $checkqueryRes = mysql_query($checksql,$conn);
            while($row = mysql_fetch_array($checkqueryRes)) {
                $check_status =  $row["status"]; 
                $check_verification =  $row["verification"];
          		$business_id=$row['business_id'];
          		$seller_id=$row['seller_id'];              
            }

            $status= '3';
            $temp_business_id=$business_id;
            $payment='9';

		    //订单修改 开始
		    if((empty($check_verification) && (($check_status=='2') || ($check_status=='1') )  ) ) {
            	$sql ="update ".$order_name." set 
			  		post_create_time='".$post_create_time."',wx_source='3',state='0',trade_number='".$temp_order_id."',trade_no='".$transaction_id."',
        			verification='".$verification."',verification1='".$verification."',payment='".$payment."',status='".$status."',pay_price='".$total_fee."'
					where id='".$out_trade_no."'";
				$queryRes = mysql_query($sql,$conn);
            } else {
            	//查订单是否有过此微信订单号
			    $againtradesql ="select trade_number from ".$order_name." where id='".$out_trade_no."'";
			    $againtradequeryRes = mysql_query($againtradesql,$conn);
			    while($row = mysql_fetch_array($againtradequeryRes)) {
			  		$trade_number=$row['trade_number'];             
			    }
				if( !empty($trade_number) && ($trade_number!=$temp_order_id) ) {
					$checktradesql ="select id from ".$order_name." where trade_number='".$temp_order_id."' and payment='9' ";
			        $checktradequeryRes = mysql_query($checktradesql,$conn);
			        while($traderow = mysql_fetch_array($checktradequeryRes)) {
			            $trade_order_id =(int)$traderow["id"];              
			        }
			        if($trade_order_id<=0) {//微信没有此商户交易号
						$order_num=date("ymd").mt_rand(1000,9999);
						$inserttradeorderSql = "insert into ".$order_name." (seller_id,order_time,create_time,post_create_time,state,trade_number,trade_no,verification,verification1,payment,status,pay_price,order_num,number,need_price,business_id,price,wx_source)

						values ({$seller_id},'{$post_create_time}','{$post_create_time}','{$post_create_time}','0','{$temp_order_id}','{$transaction_id}','{$verification}','{$verification}','".$payment."','".$status."','".$total_fee."','{$order_num}','1','{$total_fee}','{$business_id}','{$total_fee}','3')";
						$queryRes = mysql_query($inserttradeorderSql,$conn);
					}
				}
            }			    
            //订单修改 结束
			return true;
		} else {
			return false;
		}
	}

}
$notify = new PayNotifyCallBack();
$notify->Handle(false);
$arr_data['out_trade_no']=$_POST['out_trade_no'];
$arr_data['total_fee']=$_POST['total_fee'];
$arr_data['transaction_id']=$_POST['transaction_id'];
$notify->NotifyProcess($arr_data);
