<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods", "POST,OPTIONS,GET"); 
    $root_img_id = $_GET['img_id'];
    $now_time=date("Y-m-d H:i:s");
	$SERVER_NAME = "http://api.baobaoshowshow.com/";
    $conn = mysql_connect("115.29.48.94","liuwt","liuwt");
	if (!$conn)
	{
		die('Could not connect: ' . mysql_error());
	}
    if (empty($root_img_id)) {
        $result = array(
            'success' => false,
            'reCode' => 1004,
            'reMsg' => '请输入图片ID'
        );
        echo json_encode($result);die;
    }
    $update_condition=" post_create_time='$now_time',state='1' ";

	mysql_select_db('quanquan_baby_show',$conn);
	mysql_query( 'set names utf8');

	$gettopSql="update baby_listing set $update_condition where id='$root_img_id' ";
    if(mysql_query($gettopSql,$conn)) {
        $result = array(
            'success' => true,
            'reCode' => 200,
            'reMsg' => '成功'
        );
        echo json_encode($result);
    } else {
        $result = array(
            'success' => false,
            'reCode' => 3001,
            'reMsg' => '失败'
        );
        echo json_encode($result);die;
    }
    //更新msg  开始
    $delMsgSql = "update baby_sys_msg_new set state='1',modify_time='$now_time' where img_id={$root_img_id} and point in (21,22,23,24)  ";
    mysql_query($delMsgSql,$conn);

    

?>