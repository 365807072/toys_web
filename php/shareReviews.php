<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods", "POST,OPTIONS,GET");
	//$root_img_id = $_GET['img_id'];
    $tmp_img_id = $_GET['img_id'];
    $patterns = "/\d+/";
    preg_match($patterns,$tmp_img_id,$arr);
    $tmp_img_id_int=intval($arr[0]);
    /*if($tmp_img_id_int==101768) {
        $root_img_id=102032;
    } else {*/
    $root_img_id=$tmp_img_id_int;
    //}
    
    $login_user_id = $_GET['user_id'];//$login_user_id
	$SERVER_NAME = "http://api.baobaoshowshow.com/";
	if (empty($login_user_id)) {
        $result = array(
            'success' => false,
            'reCode' => 3001,
            'reMsg' => '请登录'
        );
        echo json_encode($result);die;
    }
    if (empty($root_img_id)) {
        $result = array(
            'success' => false,
            'reCode' => 1004,
            'reMsg' => '请输入图片ID'
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
	$getUserSql="select user_id,create_time,id from baby_listing where state='0'  and id={$root_img_id} ";
    $getUsercommand = mysql_query($getUserSql,$conn);
    $is_show=0;
    if($getUsercommand) {
        while($row = mysql_fetch_assoc($getUsercommand)) {
            $temp_user_id=$row['user_id'];
            $temp_create_time=$row['create_time'];
            $tmp_root_id=$row['id'];
        }
        $noMCreateTime=date("Y-m-d 11:00",strtotime($temp_create_time));
        $noMCreateTime1=date('Y-m-d H:i',strtotime($noMCreateTime."+1 day"));
        $tmpTime=strtotime($noMCreateTime1)-strtotime(date('Y-m-d H:i'));
        
        $arr_listing_id=array("101768","101964","102032");//"101687""101696"
        if(in_array($tmp_root_id,$arr_listing_id)) {
            if($tmpTime>0){
                $is_show=1;
            }
        }
    }
    $where_condition="is_del='0' ";
    $get_mainimgId_sql = "select id from baby_listing where state = '0' and ((root_img_id={$root_img_id} and user_id=$temp_user_id) or (id={$root_img_id})) ";
    $getmainimgIdcommand = mysql_query($get_mainimgId_sql,$conn);
    if($getmainimgIdcommand) {
        while($row = mysql_fetch_assoc($getmainimgIdcommand)) {
            $temp_imgId[] = $row['id'];
        }
        $temp_TmpReviewIds=implode(",", $temp_imgId);
        $where_condition.=" and img_id in ($temp_TmpReviewIds) ";
        $MyRes = array ();
    
        $get_img_sql = "select id,img_id,user_id,demand,create_time as post_create_time,img from baby_listing_review where ".$where_condition."
            order by post_create_time desc limit 10";
        $getimgcommand = mysql_query($get_img_sql,$conn);
        if($getimgcommand) {
            while($row = mysql_fetch_assoc($getimgcommand)) {
                $ImgParams[] = $row;
            }
        }
        if (is_array ( $ImgParams ) && count ( $ImgParams )) {
            $tmpRes = array ();
            foreach ( $ImgParams as $key => $imgInfo ) {
                $id=$imgInfo ['id'];
                $img_id=intval($imgInfo['img_id']);
                $imgTmp=strval($imgInfo['img']);
                if($imgTmp!=""){
                    $tmpImgs=explode(';', $imgTmp);
                }else{
                    $tmpImgs='';
                }                
                if (is_array($tmpImgs) && count($tmpImgs)) {
                    $tmpRes=array();
                    foreach ($tmpImgs as $key =>$tmpImg){
                        $SERVER_NAME = "http://api.baobaoshowshow.com/";
                        $webRoot = "/data/www/api/";
                        $imgUrlDir = $webRoot . $tmpImg;
                        $imginfo = getimagesize ( $imgUrlDir );
                        $imgParams = explode ( ' ', $imginfo [3] );
                        $imgWidth = str_replace ( "width=", '', $imgParams [0] );
                        $imgWidth = intval ( str_replace ( '"', '', $imgWidth ) );
                        $imgHeight = str_replace ( "height=", '', $imgParams [1] );
                        $imgHeight = intval ( str_replace ( '"', '', $imgHeight ) );
                        $img=$SERVER_NAME.$tmpImg;
                        $tmpRes[]=array(
                            'img_thumb'=>$img
                        );
                    }
                }
                $userId=strval($imgInfo['user_id']);
                $link_state=$imgInfo['link_state'];
                if( ($link_state==1) && ($userId<'0') ) {
                    $link_nick_name=$imgInfo['link_nick_name'];
                    $link_avatar=$imgInfo['link_avatar'];
                    if(empty($link_nick_name)) {
                        $user_name="";
                    } else {
                        $user_name=$link_nick_name;
                    }
                    if(empty($link_avatar)) {
                        $avatar="";
                    } else {
                        $avatar=$server_name.$link_avatar;
                    }                       
                } else {
                    $get_user_sql = "select nick_name,avatar from baby_user where id=$userId ";
                    $get_usercommand = mysql_query($get_user_sql,$conn);
                    if($get_usercommand) {
                        while($row = mysql_fetch_assoc($get_usercommand)) {
                            $user_name=$row['nick_name'];
                            $tmp_avatar=$row['avatar'];
                        }
                    } else {
                        $user_name="";
                    }
                    
                    if (empty($tmp_avatar)) {
                        $avatar = $SERVER_NAME . "static/album/defaultAvatar_thumb_120.png";
                    } else {
                        if (substr($tmp_avatar, 0, 6) != 'static') {
                            $avatar =$tmp_avatar;
                        } elseif (strpos($tmp_avatar, 'defaultAvatar.png') > 0) {
                            $avatar = $SERVER_NAME . "static/album/defaultAvatar_thumb_120.png";
                        } else {
                            $avatar = $SERVER_NAME . substr($tmp_avatar, 0, - 4) . "_thumb_120.jpg";
                        }
                    }
                }
                $get_admireCondition_sql = "select id from baby_listing_admire where user_id =$login_user_id and img_id ={$img_id} and is_cancel='0' ";
                $get_admireCondition = mysql_query($get_admireCondition_sql,$conn);
                if($get_admireCondition) {
                    $is_admire = 1;
                } else {
                    $is_admire = 0;
                }
                //赞数
                $admireSql = "SELECT count(*) AS admire_count FROM baby_listing_review_admire WHERE img_id={$id} and is_cancel ='0' ";
                $admirecommand = mysql_query($admireSql,$conn);
                if($admirecommand) {
                    while($row = mysql_fetch_assoc($admirecommand)) {
                        $admire_count=intval($row['admire_count']);
                    }
                } else {
                    $admire_count=0;
                }
                //评论数
                $reviewSql = "SELECT count(*) AS review_count FROM baby_listing_review_review WHERE img_id={$id} and is_del ='0' ";
                $reviewcommand = mysql_query($reviewSql,$conn);
                if($reviewcommand) {
                    while($row = mysql_fetch_assoc($reviewcommand)) {
                        $review_count=intval($row['review_count']);
                    }
                } else {
                    $review_count=0;
                }

                $post_time=date("Y-m-d",strtotime($imgInfo['post_create_time']));
                $create_time = strtotime($imgInfo ['post_create_time'] )*1000;

                if($is_show==0) {
                    $demand = $imgInfo ['demand'];
                    
                } else {
                    $demand ="**********";
                }

                $imgRes['review_id'] =$id;
                $imgRes['img_id'] =$img_id;
                $imgRes['demand'] =$demand;
                $imgRes['user_id']=$userId;
                $imgRes['user_name']=$user_name;
                $imgRes['avatar']=$avatar;
                $imgRes['post_time'] =$post_time;
                $imgRes['post_create_time'] =$create_time;
                $imgRes['review_count']=$review_count;
                $imgRes['admire_count']=$admire_count;
                $imgRes['is_admire'] = $is_admire;
                if($imgTmp!=""){
                    $imgRes['img']=$tmpRes;
                }else{
                    $imgRes['img'] = array();
                }
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
    } else {
        $MyRes = array ();
        $result = array(
            'success' => true,
            'reCode' => 200,
            'reMsg' => '获取列表',
            'data'=>$MyRes
        );
        echo json_encode($result);
        die;
    }
    

?>