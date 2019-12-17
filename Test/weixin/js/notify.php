<?php
ini_set('date.timezone','Asia/Shanghai');
error_reporting(E_ERROR);

require_once "../lib/WxPay.Api.php";
require_once '../lib/WxPay.Notify.php';
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
		$out_trade_no=(int)$result['out_trade_no'];
		/*$order_name="baby_order17";
		
		$post_create_time=date("Y-m-d H:i:s");
		$transaction_id=$result['transaction_id'];
        $verification= mt_rand(100000000,999999999);
        $total_fee=(int)$result['total_fee']/100;
		if($out_trade_no) {
			$order_num=date("ymd").mt_rand(1000,9999);
			$inserttradeorderSql = "insert into ".$order_name." (order_time,create_time,post_create_time,state,trade_number,trade_no,verification,verification1,pay_price,order_num)

			values ('{$post_create_time}','{$post_create_time}','{$post_create_time}','0','{$out_trade_no}','{$transaction_id}','{$verification}','{$verification}','".$total_fee."','{$order_num}')";
			$queryRes = mysql_query($inserttradeorderSql,$conn);
			return true;
		} else {
			return false;
		}*/
		$temp_order_id=$result['out_trade_no'];
		$array_order_id=explode("a",$temp_order_id);
		$out_trade_no=(int)$array_order_id[0];
		$order_name="baby_order17";
		
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
                $order_role=$row['order_role'];
          		$babys_idol_id=$row['babys_idol_id']; 
          		$packet_id=$row['packet_id'];
          		$price=$row['price'];
          		$pay_price=$price-$total_fee; 

          		$business_id=$row['business_id'];
          		$user_id=$row['user_id']; 

          		$seller_id=$row['seller_id']; 
          		$address=$row['address'];
          		$need_price=$row['need_price'];
          		$package=$row['package'];             
            }

            if($order_role==1) {
                $checkidolsql ="select is_each_others from baby_babys_idol where id='".$babys_idol_id."'";
                $checkidolqueryRes = mysql_query($checkidolsql,$conn);
                while($row = mysql_fetch_array($checkidolqueryRes)) {
                    $is_each_others =  $row["is_each_others"];                   
                }

                if($is_each_others!=0) {
                    $status='3';                 
                } else {
                	$status= '1';
                }
                $temp_business_id=$babys_idol_id;
            } else {
            	$status= '1';
            	$temp_business_id=$business_id;
            }
            if( ($pay_price>0) && ($packet_id>0) ) {
            	$payment='8';
            } else {
            	$payment='2';
            }

            //添加红包 开始
            //if($order_type==1) {
	            $now_time=date("Y-m-d H:i:s");
				$now_time_later=date("Y-m-d", time()+30*24*3600);
				$otherImgSql = 'insert into baby_packet (user_id,packet_price,packet_type,packet_msg,create_time,post_create_time,packet_description,order_id,business_id,order_role,expiry) values ';
			    for($i=0;$i<9;$i++) {
			        $packet_price=rand(3,5);
			        $otherImgSql .= "({$user_id},{$packet_price},'0','秀秀内商家使用','{$now_time}','{$now_time}','红包的金额和你的颜值一样高哦','{$out_trade_no}','{$temp_business_id}','{$order_role}','{$now_time_later}'),";
			    }
			    $hign_packet_price=rand(6,8);
			    $otherImgSql .= "({$user_id},{$hign_packet_price},'0','秀秀内商家使用','{$now_time}','{$now_time}','红包的金额和你的颜值一样高哦','{$out_trade_no}','{$temp_business_id}','{$order_role}','{$now_time_later}'),";
			    $otherImgSql = substr ( $otherImgSql, 0, strlen ( $otherImgSql ) - 1 );
			    $otherImgSql = $otherImgSql . ';';
			//}
		    //添加红包 结束

		    //订单修改 开始
		    if((empty($check_verification) && (($check_status=='2') || ($check_status=='1') )  ) ) {
            	$sql ="update ".$order_name." set 
			  		post_create_time='".$post_create_time."',wx_source='2',state='0',trade_number='".$temp_order_id."',trade_no='".$transaction_id."',
        			verification='".$verification."',verification1='".$verification."',payment='".$payment."',status='".$status."',pay_price='".$total_fee."'
					where id='".$out_trade_no."'";
				$queryRes = mysql_query($sql,$conn);
				/*if($otherImgSql  ) {//&& ($order_type==1)
					mysql_query($otherImgSql,$conn);
				}*/
            } else {
            	//查订单是否有过此微信订单号
			    $againtradesql ="select trade_number from ".$order_name." where id='".$out_trade_no."'";
			    $againtradequeryRes = mysql_query($againtradesql,$conn);
			    while($row = mysql_fetch_array($againtradequeryRes)) {
			  		$trade_number=$row['trade_number'];             
			    }
				if( !empty($trade_number) && ($trade_number!=$temp_order_id) ) {
					$checktradesql ="select id from ".$order_name." where trade_number='".$temp_order_id."' and payment='2' ";
			        $checktradequeryRes = mysql_query($checktradesql,$conn);
			        while($traderow = mysql_fetch_array($checktradequeryRes)) {
			            $trade_order_id =(int)$traderow["id"];              
			        }
			        if($trade_order_id<=0) {//微信没有此商户交易号
						$order_num=date("ymd").mt_rand(1000,9999);
						$inserttradeorderSql = "insert into ".$order_name." (user_id,seller_id,order_time,create_time,post_create_time,state,trade_number,trade_no,verification,verification1,payment,status,pay_price,order_num,address,number,need_price,business_id,package,price,wx_source)

						values ({$user_id},{$seller_id},'{$post_create_time}','{$post_create_time}','{$post_create_time}','0','{$temp_order_id}','{$transaction_id}','{$verification}','{$verification}','".$payment."','".$status."','".$total_fee."','{$order_num}','{$address}','1','{$need_price}','{$business_id}','{$package}','{$price}','2')";
						$queryRes = mysql_query($inserttradeorderSql,$conn);
						/*if($otherImgSql  ) {//&& ($order_type==1)
							mysql_query($otherImgSql,$conn);
						}*/
					}
				}
            }			    
            //订单修改 结束

            if($order_role==1) {
            	//30天计算
	            $str_next_month=time()+30*24*3600;
	            $next_month=date('Y-m-d',$str_next_month);
                $pay_time=date("Y-m-d");
                $idol_post_create_time=date("Y-m-d H:i:s");


                $idol_update_data="post_create_time='$idol_post_create_time',pay_time='$pay_time' ";

                if($is_each_others!=0) {
                    $idol_update_data.=",over_time='$next_month',is_each_others='2' ";                 
                }
                $idolsql ="update baby_babys_idol set ". $idol_update_data." where id='".$babys_idol_id."'";
                $idolRes = mysql_query($idolsql,$conn);

            }
            if( ($pay_price>0) && ($packet_id>0) ) {
          		$packet_post_create_time=date("Y-m-d H:i:s");
          		$packet_update_data="is_grab_use='2',post_create_time='packet_post_create_time'";
            	$packetsql ="update baby_packet set ". $packet_update_data." where id='".$packet_id."'";
                $packetRes = mysql_query($packetsql,$conn);
			}
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
