<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods", "POST,OPTIONS,GET");
    $post_create_time = $_GET['post_create_time'];//$login_user_id    
    $page_size = $_GET['page_size'];
	$SERVER_NAME = "http://api.baobaoshowshow.com/";
    $conn = mysql_connect("115.29.48.94","liuwt","liuwt");
	if (!$conn)
	{
		die('Could not connect: ' . mysql_error());
	}
    if(empty($page_size)) {
        $page_size=100;
    }
	mysql_select_db('quanquan_baby_show',$conn);
	mysql_query( 'set names utf8');
    $where_condition="state='0' and root_img_id is null ";
    if($post_create_time) {
        $post_create_time = date('Y-m-d H:i:s',$post_create_time/1000);
        $where_condition.=" and create_time<'$post_create_time' ";
    }

	$gettopSql="select id,user_id,img_description,img_title,img,create_time,link_nick_name,link_state from baby_listing where ".$where_condition." order by create_time desc limit $page_size ";
    $gettopcommand = mysql_query($gettopSql,$conn);
    if($gettopcommand) {
        while($row = mysql_fetch_assoc($gettopcommand)) {
            $ImgParams[] = $row;
        }
    }
    
    $MyRes = array ();
    if (is_array ( $ImgParams ) && count ( $ImgParams )) {
        
        $tmpRes = array ();
        foreach ( $ImgParams as $key => $imgInfo ) {
            $imgId = intval ( $imgInfo ['id'] );
            $description=strval($imgInfo['img_description']);
            $imgTmp=strval($imgInfo['img']);
            if($imgTmp){
                $tmpImgs=explode(';', $imgTmp);
            }                
            if (is_array($tmpImgs) && count($tmpImgs)) {
                $tmpRes=array();
                foreach ($tmpImgs as $key =>$tmpImg){
                    $SERVER_NAME = "http://api.baobaoshowshow.com/";
                    $img=$SERVER_NAME.$tmpImg;
                    $tmpRes[]=array('img'=>$img) ;
                }
            }
            $userId=strval($imgInfo['user_id']);
            $link_state=$imgInfo['link_state'];
            if( ($link_state==1) && ($userId<'0') ) {
                $link_nick_name=$imgInfo['link_nick_name'];
                if($link_nick_name) {
                    $user_name=$link_nick_name;
                }
            } else {
                $get_user_sql = "select nick_name from baby_user where id=$userId ";
                $get_usercommand = mysql_query($get_user_sql,$conn);
                if($get_usercommand) {
                    while($row = mysql_fetch_assoc($get_usercommand)) {
                        $user_name=$row['nick_name'];
                    }
                }
            }
            if(empty($user_name)) {
                $user_name="";
            }

            $create_time=strtotime($imgInfo['create_time'])*1000;
            $imgRes['img_id'] =$imgId;
            $imgRes['post_create_time']=$create_time;
            $imgRes['user_name']=$user_name;
            $imgTitle=strval($imgInfo['img_title']);
            if($imgTitle=='' || empty($imgTitle)){
                $imgTitle = strval($description);
            }
            $imgRes['img_title']=$imgTitle;
            if($imgTmp){
                $imgRes['img']=$tmpRes;
            }else{
                $imgRes['img'] = array();
            }
            $imgRes['description']=$description?$description:"";

            if (is_array ( $imgRes ) && count ( $imgRes )) {
                $MyRes []=$imgRes;
            }
        }
            
        
    }
    $result = array(
        'success' => true,
        'reCode' => 200,
        'reMsg' => '获取列表',
        'data'=>$MyRes
    );
    echo json_encode($result);

?>