<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods", "POST,OPTIONS,GET");


    $code = $_GET['code'];
    $state = $_GET['state'];
    //换成自己的接口信息
    $appid = 'wx5bd2876a775d0525';
    $appsecret = 'fbe910d6725deaf122948d697d40f1d4';
    if (empty($code)) {
        $result = array(
            'success' => false,
            'reCode' => 3001,
            'reMsg' => '授权失败'
        );
        echo json_encode($result);
        die;
    } //$this->error('授权失败');
    $token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$appid.'&secret='.$appsecret.'&code='.$code.'&grant_type=authorization_code';
    $token = json_decode(file_get_contents($token_url));
    
    if (isset($token->errcode)) {
        $result = array(
            'success' => false,
            'reCode' => 3002,
            'reMsg' => '错误信息：'.$token->errmsg
        );
        echo json_encode($result);
       die;
    }

    $access_token_url = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid='.$appid.'&grant_type=refresh_token&refresh_token='.$token->refresh_token;
    //转成对象
    $access_token = json_decode(file_get_contents($access_token_url));
    
    if (isset($access_token->errcode)) {
        $result = array(
            'success' => false,
            'reCode' => 3003,
            'reMsg' => '错误信息：'.$access_token->errmsg
        );
        echo json_encode($result);
        die;
    }
    $user_info_url = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$access_token->access_token.'&openid='.$access_token->openid.'&lang=zh_CN';
    //转成对象
    $user_info = json_decode(file_get_contents($user_info_url),true);
    $user_info['data']['code']=$code;
    echo json_encode($user_info);
    if (isset($user_info->errcode)) {
        $result = array(
            'success' => false,
            'reCode' => 3004,
            'reMsg' => '错误信息：'.$user_info->errmsg
        );
        echo json_encode($result);
       die;
    }
    //打印用户信息
    /*$result = array(
            'success' => true,
            'reCode' => 200,
            'reMsg' => '获取列表',
            'data'=>$user_info
        );
    echo json_encode($result);*/
    //$resultInfo=json_encode($result);
?>