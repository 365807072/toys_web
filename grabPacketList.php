<?php

//处理跨域
header("Access-Control-Allow-Origin:*"); //*号表示所有域名都可以访问
header("Access-Control-Allow-Method:POST,GET");

$send_user_id = $_GET['send_user_id'];
    $order_id = $_GET['order_id'];
	$SERVER_NAME = "http://api.baobaoshowshow.com/";
	if (empty($send_user_id)) {
        $result = array(
            'success' => false,
            'reCode' => 1002,
            'reMsg' => '请输入发红包用户ID'
        );
        echo json_encode($result);die;
    }
    if (empty($order_id)) {
        $result = array(
            'success' => false,
            'reCode' => 1004,
            'reMsg' => '请输入订单ID'
        );
        echo json_encode($result);die;
    }
    $conn = mysql_connect("115.29.48.94","liuwt","liuwt");
	if (!$conn)
	{
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db('quanquan_baby_show',$conn);
	mysql_query( 'set names utf8');
    $getpacketSql="SELECT p.id as packet_id,p.post_create_time,p.packet_description,p.packet_price,u.nick_name,u.avatar 
                    FROM baby_packet as p left join baby_user as u on u.id=p.grab_user_id    
                    where p.is_grab='1' and p.state='0' and p.user_id='$send_user_id' and p.order_id='$order_id' ";
    $getpacketcommand = mysql_query($getpacketSql,$conn);
    while($row = mysql_fetch_assoc($getpacketcommand)) {
        $getpacket[] = $row;
    }
    if(!empty($getpacket)) {
    	foreach ($getpacket as $key => $value) {
            $avatar = strval($value['avatar']);
            if (empty($avatar)) {
                $avatar = $SERVER_NAME . "static/album/defaultAvatar_thumb_120.png";
            } else {
                if (substr($value['avatar'], 0, 6) != 'static') {
                    $avatar = $value['avatar'];
                } elseif (strpos($value['avatar'], 'defaultAvatar.png') > 0) {
                    $avatar = $SERVER_NAME . "static/album/defaultAvatar_thumb_120.png";
                } else {
                    $avatar = $SERVER_NAME . substr($value['avatar'], 0, - 4) . "_thumb_120.jpg";
                }
            }
            $getpacket[$key]['avatar']=$avatar;
            $post_create_time=$value['post_create_time'];
            $getpacket[$key]['post_create_time']=date("Y-m-d",strtotime($post_create_time));

        }
        $result = array(
            'success' => true,
            'reCode' => 200,
            'reMsg' => '抢红包列表',
            'data'=>$getpacket
        );
        echo json_encode($result);
    } else {
    	$getpacket=array();
        $result = array(
            'success' => true,
            'reCode' => 200,
            'reMsg' => '抢红包列表',
            'data'=>$getpacket
        );
        echo json_encode($result);
    }


?>