<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods", "POST,OPTIONS,GET");
    $root_img_id = $_GET['img_id'];
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
	mysql_select_db('quanquan_baby_show',$conn);
	mysql_query( 'set names utf8');
	$gettopSql="select label from baby_listing where id='$root_img_id' ";
    $ImgParams="";
    $gettopcommand = mysql_query($gettopSql,$conn);
    if($gettopcommand) {
        while($row = mysql_fetch_assoc($gettopcommand)) {
            $ImgParams = $row['label'];
        }
    }
    if($ImgParams) {
        $tmpRes=explode(",", $ImgParams);
        foreach ($tmpRes as $key => $value) {
           $tempRes[]=array('label_id'=>$value) ;
        }
    }
    if($tempRes){
        $imgRes['label_info']=$tempRes;
    }else{
        $imgRes['label_info'] = array();
    }
    $imgRes['img_id']=$root_img_id;
    if($imgRes) {
        $MyRes=$imgRes;
    } else {
        $MyRes=array();
    }
    $result = array(
        'success' => true,
        'reCode' => 200,
        'reMsg' => '获取列表',
        'data'=>$MyRes
    );
    echo json_encode($result);

?>