<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods", "POST,OPTIONS,GET");
	$SERVER_NAME = "http://api.baobaoshowshow.com/";
    $conn = mysql_connect("115.29.48.94","liuwt","liuwt");
	if (!$conn)
	{
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db('quanquan_baby_show',$conn);
	mysql_query( 'set names utf8');
	$gettopSql="select label1 as label_name,label1_s as label_id from baby_listing_label where state=0 group by label1_s ";
    $gettopcommand = mysql_query($gettopSql,$conn);
    if($gettopcommand) {
        while($row = mysql_fetch_assoc($gettopcommand)) {
            $ImgParams[] = $row;
        }
    }
    
    $MyRes = array ();
    if (is_array ( $ImgParams ) && count ( $ImgParams )) {
        foreach ( $ImgParams as $key => $imgInfo ) {
            $label_id = intval ( $imgInfo ['label_id'] );
            $imgRes['label_id'] =$label_id;
            $imgRes['label_name']=strval($imgInfo['label_name']);
            $tmp_min_label=array();
            if($label_id>0) {
                $get_user_sql = "select label2 as label_name,label2_s as label_id from baby_listing_label where state=0 and label1_s='$label_id' ";
                $get_usercommand = mysql_query($get_user_sql,$conn);
                if($get_usercommand) {
                    while($row = mysql_fetch_assoc($get_usercommand)) {
                        $tmp_min_label[]=$row;
                    }
                }
            }
            
            
            if($tmp_min_label){
                $imgRes['category_label']=$tmp_min_label;
            }else{
                $imgRes['category_label'] = array();
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

?>