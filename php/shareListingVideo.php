<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods", "POST,OPTIONS,GET");
	$root_img_id = $_GET['img_id'];
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
	$gettopSql="select * from baby_listing where state='0' and id={$root_img_id} ";
    $gettopcommand = mysql_query($gettopSql,$conn);
    if($gettopcommand) {
        while($row = mysql_fetch_assoc($gettopcommand)) {
            $imgInfo= $row;
        }
    }
    if (is_array ( $imgInfo ) && count ( $imgInfo )) {   

        $time = date('Y-m-d H:i:s');
        $mark_sql = "insert into baby_listing_mark (user_id,img_id,create_time,source) values ($login_user_id,$root_img_id,'$time','1') "; 
        mysql_query($mark_sql,$conn);

        $imgId = intval ( $imgInfo['id'] );
        $description=strval($imgInfo['img_description']);
        $imgTmp=$imgInfo['img'];
        if($imgTmp!=""){
            $SERVER_NAME = "http://api.baobaoshowshow.com/";
            $webRoot = "/data/www/api/";
            $imgUrlDir = $webRoot . $imgTmp;
            $imginfo = getimagesize ( $imgUrlDir );
            $imgParams = explode ( ' ', $imginfo [3] );
            $imgWidth = str_replace ( "width=", '', $imgParams [0] );
            $imgWidth = intval ( str_replace ( '"', '', $imgWidth ) );
            $imgHeight = str_replace ( "height=", '', $imgParams [1] );
            $imgHeight = intval ( str_replace ( '"', '', $imgHeight ) );
            $img=$SERVER_NAME.$imgTmp;
            $imgRes=array(
                'img_thumb'=>$img,
                'img_thumb_width'=>$imgWidth,
                'img_thumb_height'=>$imgHeight
            );
        }else{
            $imgRes=array(
                'img_thumb'=>"",
                'img_thumb_width'=>0,
                'img_thumb_height'=>0
            );
        }               

        $root_img_id = intval($imgInfo['root_img_id']);
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
            $is_idol="2";
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
            if($login_user_id==$userId) {
                $is_idol="2";
            } else {
                $getfocusSql="select id from baby_user_idol where state='1' and idol_id='$login_user_id' and user_id='$userId' ";
                $getfocuscommand = mysql_query($getfocusSql,$conn);
                if($getfocuscommand) { 
                    $is_idol="1";                          
                } else {
                    $is_idol="0";
                }
            }
        }
        $getSaveSql = "SELECT id FROM baby_listing_save WHERE post_id='$imgId' and state ='0' and login_user_id='$login_user_id' ";
        $getSavecommand = mysql_query($getSaveSql,$conn);
        if($getSavecommand) {
            $is_save="1";
        } else {
            $is_save="0";
        }

        $temp_group_id=intval($imgInfo['group_id']);
        if( ($temp_group_id>0) ) {
            $get_group_name_sql = "select group_name from baby_post_group where id=$temp_group_id ";
            $get_group_namecommand = mysql_query($get_group_name_sql,$conn);
            if($get_group_namecommand) {
                while($row = mysql_fetch_assoc($get_group_namecommand)) {
                    $getGroupName=$row['group_name'];
                }
            }                        
            $group_tag_name=$getGroupName?$getGroupName:"";
            $group_tag_id=$temp_group_id;
            $is_group_tag="1";
        } else {
            $imgLabel=$imgInfo['label'];
            if($imgLabel) {
                $min_label_sql = "select label2,label2_s from baby_listing_label where label2_s in ($imgLabel) order by rand() limit 1 ";
                $min_labelcommand = mysql_query($min_label_sql,$conn);
                if($min_labelcommand) {
                    while($row = mysql_fetch_assoc($min_labelcommand)) {
                        $group_tag_name=$row['label2'];
                        $group_tag_id=$row['label2_s'];
                    }
                } else {
                    $max_label_sql = "select label1,label1_s from baby_listing_label where label1_s in ($imgLabel) order by rand() limit 1 ";
                    $max_labelcommand = mysql_query($max_label_sql,$conn);
                    if($max_labelcommand) {
                        while($row = mysql_fetch_assoc($max_labelcommand)) {
                            $group_tag_name=$row['label1'];
                            $group_tag_id=$row['label1_s'];
                        }
                    }
                }
                $is_group_tag="2";
            } else {
                $group_tag_name="";
                $group_tag_id="0";
                $is_group_tag="0";
            }
        }
        $tmp_video_url=$imgInfo['video_url'];
        if($tmp_video_url) {
            $video_url=$SERVER_NAME.$tmp_video_url;
        } else {
            $video_url="";
        }
        $getpostadmireSql = "SELECT id FROM {{listing_admire}} WHERE admire_user_id ='$userId' and user_id ='$login_user_id' and img_id ='".$root_img_id."' and is_cancel='0' ";
        $getpostadmirecommand = mysql_query($getpostadmireSql,$conn);
        if($getpostadmirecommand) {
            $is_admire = '1';
        } else {
            $is_admire = '0';
        }
        $create_time=date("Y-m-d",strtotime($imgInfo['create_time']));
        $imgRes['img_id'] =$imgId;
        $imgRes['user_id']=$userId;
        $imgRes['user_name']=$user_name;
        $imgRes['avatar']=$avatar;
        $imgRes['create_time'] =$create_time;
        $imgTitle=strval($imgInfo['img_title']);
        if($imgTitle=='' || empty($imgTitle)){
            if($description) {
                $showimgTitle = $description;
            } else {
                $showimgTitle = "";
            }            
        } else {
            $showimgTitle=$imgTitle;
        }
        $admire_count=$imgInfo['admire_count'];

        //除群外计算 观看有关计算 开始
        $create_time = $imgInfo['create_time'];
        $current_time = date("Y-m-d H:i:s");
        $current_time=strtotime($current_time);
        $press_time=strtotime($create_time);
        $diffMin = intval(($current_time - $press_time) / 60);
        $diffHour = intval($diffMin / 60);
        $diffMon = intval($diffHour / 720);
        $diffDay = intval($diffHour / 24 -$diffMon*30);
        $diffDay2 = intval($diffHour / 24);
        $diff_hour = intval(($diffHour - $diffDay2 * 24));
        $diff_min = intval(($diffMin - $diffHour * 60));

        $sqrt_min=log($diffMin*529+6);
        //除群外计算 观看有关计算 结束
        // 获取赞数，评论数，跟帖数 开始
        $getimgcountsql="select sum(total_count) as total_count from baby_listing where state = '0' and (root_img_id={$imgId} or id={$imgId})";
        $getimgcountcommand = mysql_query($getimgcountsql,$conn);
        if($getimgcountcommand) {
            while($row = mysql_fetch_assoc($getimgcountcommand)) {
                $totalCount=intval($row['total_count']);
            }
        } else {
            $totalCount=0;
        }
        $getReplyCountSql = "SELECT count(*) as replycount FROM baby_listing WHERE  root_img_id={$imgId} and state='0' and user_id!='$userId' ";
        $getReplyCountcommand = mysql_query($getReplyCountSql,$conn);
        if($getReplyCountcommand) {
            while($row = mysql_fetch_assoc($getReplyCountcommand)) {
                $replycount=intval($row['replycount']);
            }
        } else {
            $replycount=0;
        }
        $review_count= intval($totalCount + $replycount);
        // 获取赞数，评论数，跟帖数 结束 
        // 播放次数 数量 
        if($sqrt_min<10.4) {
            $post_count=intval(100/3*($review_count)+$diffMon*537+ $diffDay*90+$diff_hour*33+$diff_min*7);
        } else {
            $post_count=intval(100/3*($review_count)+$diffMon*537+ $diffDay*90+$diff_hour*33+420+($sqrt_min-10.4)*7);
        }
        $video_count=$imgInfo['video_count'];
        $tmp_post_count=intval($post_count/3+$video_count);


        $imgRes['img_title']=$showimgTitle;
        $imgRes['post_count'] = $tmp_post_count;
        $imgRes['admire_count'] = $admire_count;
        $imgRes['is_admire'] = $is_admire;
        $imgRes['img_description']=$description?$description:"";
        $imgRes['video_url']=$video_url;
        $imgRes['is_idol']=$is_idol;
        $imgRes['is_save']=$is_save;
        $imgRes['group_tag_name']=$group_tag_name;
        $imgRes['group_tag_id']=$group_tag_id;
        $imgRes['is_group_tag']=$is_group_tag;
        if (is_array ( $imgRes ) && count ( $imgRes )) {
            $MyRes=$imgRes;
        }        
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