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
	$gettopSql="select id,user_id,root_img_id,img_description,img_title,img,post_url,create_time,group_id,is_group,link_nick_name,link_avatar,link_state from baby_listing where state='0' and id={$root_img_id} ";
    $gettopcommand = mysql_query($gettopSql,$conn);
    if($gettopcommand) {
        while($row = mysql_fetch_assoc($gettopcommand)) {
            $getTopUser=$row['user_id'];
            $topParams[] = $row;
        }
        $time = date('Y-m-d H:i:s');
        $mark_sql = "insert into baby_listing_mark (user_id,img_id,create_time,source) values ($login_user_id,$root_img_id,'$time','1') "; 
        mysql_query($mark_sql,$conn);
    }
    
    $img_where_condition="state = '0' and root_img_id={$root_img_id}";
    if($getTopUser!=0){
    	$img_where_condition.=" and user_id=$getTopUser";
    }
    $get_img_sql = "select id,user_id,root_img_id,img_description,img_title,img,post_url,create_time,group_id,is_group,link_nick_name,link_avatar,link_state from baby_listing where ".$img_where_condition." order by create_time asc";
    $getimgcommand = mysql_query($get_img_sql,$conn);
    if($getimgcommand) {
        $ImgParams1=array();
        while($row = mysql_fetch_assoc($getimgcommand)) {
            $ImgParams1[] = $row;
        }
        $ImgParams = array_merge($topParams,$ImgParams1);
    } elseif($topParams) {
        $ImgParams = $topParams;
    }
    $MyRes = array ();
    if (is_array ( $ImgParams ) && count ( $ImgParams )) {
        //获取主题id --获取主题赞数 开始
        $temp_mainimgId=array();
        foreach ($ImgParams as $key => $value) {
            $temp_mainimgId[$key]=$value['id'];
        }
        if($temp_mainimgId) {
            $temp_mainIds=implode(",", $temp_mainimgId);
            $mainadmireSql="SELECT sum(admire_count) AS admire_count FROM baby_listing WHERE id in ($temp_mainIds) and state ='0' ";
            $mainadmirecommand = mysql_query($mainadmireSql,$conn);
            if($mainadmirecommand) {                
                while($row = mysql_fetch_assoc($mainadmirecommand)) {
                    $main_admire_count=$row['admire_count'];
                }
                if(empty($main_admire_count)) {
                    $main_admire_count=0;
                }
            } else {
                $main_admire_count=0;
            }
            
            //检查登录用户是否赞过 开始
            $get_admireCondition_sql = "select id from baby_listing_admire where user_id =$login_user_id and img_id in ({$temp_mainIds}) and is_cancel='0' limit 1";
            $getadmirecommand = mysql_query($get_admireCondition_sql,$conn);
            if($getadmirecommand) {
                $is_admire = 1;
            } else {
                $is_admire = 0;
            }
            //检查登录用户是否赞过 结束

        } else {
            $main_admire_count=0;
            $is_admire = 0;
        }
        //获取主题id --获取主题赞数 结束
        $tmpRes = array ();
        foreach ( $ImgParams as $key => $imgInfo ) {
            $imgId = intval ( $imgInfo ['id'] );
            $description=strval($imgInfo['img_description']);
            $imgTmp=strval($imgInfo['img']);
            if($imgTmp!=""){
                $tmpImgs=explode(';', $imgTmp);
            }else{
                $tmpImgs='';
            }
            $img_down='';                
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
                        'img_down'=>$img,
                        'img'=>$img,
                        'img_width'=>$imgWidth,
                        'img_height'=>$imgHeight,
                        'img_thumb'=>$img,
                        'img_thumb_width'=>$imgWidth,
                        'img_thumb_height'=>$imgHeight
                    );
                }
            }

            $root_img_id = intval($imgInfo['root_img_id']);
            if($root_img_id==NULL){
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
                    $level_img="";
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
                    $get_user_levelsql = "select level_img from baby_user_level where user_id=$userId and state='0' order by id desc limit 1 ";
                    $get_user_levelcommand = mysql_query($get_user_levelsql,$conn);
                    if($get_user_levelcommand) {
                        while($row = mysql_fetch_assoc($get_user_levelcommand)) {
                            $tmp_level_img=strval($row['level_img']);
                        }                            
                    }
                    if($tmp_level_img){
                        $level_img=$SERVER_NAME .$tmp_level_img;
                    } else {
                        $level_img="";
                    }
                    if($login_user_id==$userId) {
                        $is_idol="2";
                    } else {
                        $getfocusSql="select id from {{user_idol}} where state='1' and idol_id='$login_user_id' and user_id='$userId' ";
                        $getfocuscommand = mysql_query($getfocusSql,$conn);
                        if($getfocuscommand) {
                            while($row = mysql_fetch_assoc($getfocuscommand)) {
                                $getfocusUserId=strval($row['id']);
                            }                            
                        }
                        if($getfocusUserId>0) {
                            $is_idol="1";
                        } else {
                            $is_idol="0";
                        }
                    }
                }
                $business_id=$imgInfo['business_id']?$imgInfo['business_id']:"0";
                $post_url=strval($imgInfo['post_url']);
                if(empty($post_url)) {
                    $post_url="";
                    if($business_id>0) {
                        $is_link="2";
                    } else {
                        $is_link="0";
                    }
                } else {
                    $is_link="1";
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
                    $post_cate_id=$imgInfo['post_cate_id'];
                    if($post_cate_id>0) {
                        //1育儿知识 2时尚情感 3辣妈厨房 4 成长与活动
                        if($post_cate_id==1) {
                            $group_tag_name="育儿知识";
                        } elseif ($post_cate_id==2) {
                            $group_tag_name="时尚情感";
                        } elseif ($post_cate_id==3) {
                            $group_tag_name="辣妈厨房";
                        } elseif ($post_cate_id==4) {
                            $group_tag_name="成长与活动";
                        } else {
                            $group_tag_name="其它";
                        }                            
                        $group_tag_id=$post_cate_id;
                        $is_group_tag="2";
                    } else {
                        $group_tag_name="";
                        $group_tag_id="0";
                        $is_group_tag="0";
                    }
                }
                $getSaveSql = "SELECT id FROM {{listing_save}} WHERE post_id='$imgId' and state ='0' and login_user_id='$login_user_id' ";
                $getSavecommand = mysql_query($getSaveSql,$conn);
                if($getSavecommand) {
                    while($row = mysql_fetch_assoc($getSavecommand)) {
                        $getSaveID=$row['id'];
                    }
                }
                if($getSaveID>0) {
                    $is_save="1";
                } else {
                    $is_save="0";
                }

                $create_time=date("Y-m-d",strtotime($imgInfo['create_time']));
                $imgRes['img']['img_id'] =$imgId;
                $imgRes['img']['user_id']=$userId;
                $imgRes['img']['user_name']=$user_name;
                $imgRes['img']['avatar']=$avatar;
                $imgRes['img']['level_img']=$level_img;
                $imgRes['img']['post_url'] =$post_url;
                $imgRes['img']['create_time'] =$create_time;
                $imgRes['img']['group_tag_id']=$group_tag_id;
                $imgRes['img']['group_tag_name']=$group_tag_name;
                $imgRes['img']['is_group_tag']=$is_group_tag;
                $imgRes['img']['business_id']=$business_id;
                $imgRes['img']['is_link']=$is_link;
                $imgRes['img']['is_save']=$is_save;
                $imgRes['img']['is_idol']=$is_idol;
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
                $imgRes['img']['img_title']=$showimgTitle;

                $imgRes['img']['is_admire'] = $is_admire;
                $imgRes['img'] ['main_admire_count'] = $main_admire_count;
            } else {
                $imgRes['img']=array();
            }
            $imgs = strval($imgInfo['img']);
            if($imgs!=""){
                $imgRes['img']['img']=$tmpRes;
            }else{
                $imgRes['img']['img'] = array();
            }
            $imgRes['img']['description']=$description?$description:"";

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