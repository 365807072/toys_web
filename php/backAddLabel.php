<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods", "POST,OPTIONS,GET");
    $resultList = $_POST['label'];   
    $root_img_id = $_POST['img_id'];
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
    $update_condition=" post_create_time='$now_time' ";

    $temp_id=array();
    if(is_array($resultList)) {
        foreach ($resultList as $key => $value) {
            $temp_id[$key]=$value;
        }
        $temp_img_id=implode(",", $temp_id);
        $update_condition.=" ,label='$temp_img_id' ";
    }
	mysql_select_db('quanquan_baby_show',$conn);
	mysql_query( 'set names utf8');

	$gettopSql="update baby_listing set $update_condition where id='$root_img_id' ";
    if(mysql_query($gettopSql,$conn)) {
        $result = array(
            'success' => true,
            'reCode' => 200,
            'reMsg' => '成功'
        );
        echo json_encode($result);die;
    } else {
        $result = array(
            'success' => false,
            'reCode' => 3001,
            'reMsg' => '失败'
        );
        echo json_encode($result);die;
    }
    

?>