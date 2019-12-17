<?php

//处理跨域
header("Access-Control-Allow-Origin:*"); //*号表示所有域名都可以访问
header("Access-Control-Allow-Method:POST,GET");

$send_user_id = $_GET['send_user_id'];
	$mobile = $_GET['mobile'];
    $order_id = $_GET['order_id'];
	$now_time=date("Y-m-d H:i:s");
	if (empty($mobile)) {
        $result = array(
            'success' => false,
            'reCode' => 1001,
            'reMsg' => '请输入手机号'
        );
        echo json_encode($result);die;
    }
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
    $checkMobileSql = "select id from baby_user where mobile='$mobile' and state='0' ";
    $checkMobilecommand = mysql_query($checkMobileSql,$conn);
    while($row = mysql_fetch_array($checkMobilecommand)) {
        $checkMobileId =  $row["id"];
    }
    $nick_name="baby".mt_rand(1000, 9999);

    if(!empty($checkMobileId) ) {//有手机号
        $registId =$checkMobileId; 
    } else {//无手机号
        $insertMobileSql = "insert into baby_user(nick_name,mobile,regist_time)
                            VALUES('$nick_name','$mobile','$now_time') ";
        mysql_query($insertMobileSql,$conn);
        //检查手机号是否注册
        $insertcheckMobileSql = "select id from baby_user where mobile='$mobile' and state='0' order by id asc ";
        $insertcheckMobile = mysql_query($insertcheckMobileSql,$conn);
        while($row = mysql_fetch_array($insertcheckMobile)) {
            $registId =  $row["id"];
        }
        //发消息
        $insertSysMsgSql = "insert into baby_sys_msg(user_id,message_user_id,message,img_id,target,type,create_time,is_post)
                            VALUES('$registId','2354','欢迎使用宝宝秀秀','22692','1','12','$now_time','1') ";
        mysql_query($insertSysMsgSql,$conn);

        //查询宝宝秀秀客服账号
        $idolSql = "SELECT id FROM baby_user WHERE user_name='babyshow' ";
        $idolParams = mysql_query($idolSql,$conn);
        while($row = mysql_fetch_array($idolParams)) {
            $idolId =  $row["id"];
        }
        //注册成功后，自动关注宝宝秀秀客服
        $insertUserIdolSql = "insert into baby_user_idol(user_id,idol_id,state,create_time)
                            VALUES('$idolId','$registId','1','$now_time') ";
        mysql_query($insertUserIdolSql,$conn);

        // 生成秀秀相册
        $insertAlbumsSql = "insert into baby_albums(user_id,album_name,album_description,create_time)
                            VALUES('$registId','秀秀相册','秀秀相册','$now_time'),
                            ('$registId','主题相册','主题相册','$now_time'),
                            ('$registId','其他','其他','$now_time')";
        mysql_query($insertAlbumsSql,$conn);

        $insertUserNoticeSql = "insert into baby_user_notice(user_id) VALUES('$registId')";
        mysql_query($insertUserNoticeSql,$conn);
    }
    //检查此手机号是否抢过红包
    $checkpacketSql = "select id,packet_price from baby_packet where grab_user_id='$registId' and user_id='$send_user_id' and order_id='$order_id' and state='0' ";
    $checkpacket = mysql_query($checkpacketSql,$conn);
    while($row = mysql_fetch_array($checkpacket)) {
        $checkpacketId =  $row["id"];
        $checkpacketprice =  $row["packet_price"];
    }
    if(empty($checkpacketId)) {
        $nopacketSql = "select id,packet_price from baby_packet where grab_user_id='0' and user_id='$send_user_id' and order_id='$order_id' and state='0' order by rand() limit 1 ";
        $nocheckpacket = mysql_query($nopacketSql,$conn);
        while($row = mysql_fetch_array($nocheckpacket)) {
            $nocheckpacketId =  $row["id"];
            $nocheckpacketprice =  $row["packet_price"];
        }
        if(empty($nocheckpacketId)) {
            $resultInfo['packet_state']=0;
            $resultInfo['packet_price']=0; 
        } else {            
            $updatepacketsql="update baby_packet set is_grab='1',grab_user_id='$registId',post_create_time='$now_time' where id='$nocheckpacketId' ";
            mysql_query($updatepacketsql,$conn);
            $resultInfo['packet_state']=1;
            $resultInfo['packet_price']=$nocheckpacketprice;
        }
        
    } else {
        $resultInfo['packet_state']=1;
        $resultInfo['packet_price']=$checkpacketprice;
    }
    //释放结果
    mysql_close();
    //关闭连接
    if($resultInfo) {
        $resultInfo['mobile']=$mobile;
        $result = array (
            'success' => true,
            'reCode' => 200,
            'reMsg' => '注册成功',
            'data' => $resultInfo
        );
        echo json_encode($result);
    } else {
        $result = array (
            'success' => false,
            'reCode' => 1003,
            'reMsg' => '注册失败'
        );
        echo json_encode($result);
    }
    

?>
