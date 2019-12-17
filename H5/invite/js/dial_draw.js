(function (w) {
    //获取服务器时间，客户端同步
    var beginTime = new Date();
    var flag = false;
    $.ajax({
        url: 'http://gdt.lexue.com/activity/sysTime?r=Math.random()',
        type: 'GET',
        data: {
            cp: 'spike'
        },
        dataType: 'jsonp',
        jsonpCallback: 'spike',
        async: false,
        success: function (data) {
            console.log(data);
            var time = data.time,
                time_lag = new Date() - beginTime,
                lag = new Date() - time;
            $("#activity_title").attr("data-timelag", lag - time_lag);
        },
        error: function (data) {
            console.log(data);
        }
    });
    window.addEventListener("load", function () {
        //分享给客户端传值
        var imgSrc = "http://esfile.lexue.com/share/images/share_img20170114.png";
        var obj = {
            isShow: true, //是否能分享
            imageUrl: imgSrc, //分享的图片
            title: "我中奖啦！", //分享的标题
            description: "奖池中的奖品价值高达￥10000+你也来【乐学高考】抽奖吧！" //分享的描述
        }

        function getShareData() {
            /* window.location.href = "share://lexue?shareData=" + JSON.stringify(obj);*/
        }
        w.getShareData = getShareData;
        lexue.creatRequest("share://lexue?shareData=" + JSON.stringify(obj));
        lexue.creatRequest("data://userprofile");
        var timelag = $("#activity_title").attr("data-timelag");
        //活动开始时间
        var startTime = new Date("2017/6/11 00:00:00"), //活动结束时间
            endTime = new Date("2017/6/26 23:59:59"),
            timer;
        timer = setInterval(function () {
            var nowTime = new Date() - timelag;
            //console.log(timelag);
            //活动开始
            // console.log(nowTime);
            if (startTime - nowTime < 0 && endTime - nowTime > 0) {
                $(".draw_btn").addClass("disa");
            } else {
                //活动未开始/活动已结束
                $(".draw_btn").removeClass("disa");
                if (endTime - nowTime < 0) clearInterval(timer);
            }
        }, 1000);
        //抽奖规则
        $(".activity_rules").on("click", function () {
                $(".overbox").show();
                $(".activity_rules_alert").show();
                $(".activity_rules_close").on("click", function () {
                    $(".overbox").hide();
                    $(".activity_rules_alert").hide();
                })
            })
            //点击开奖按钮
        $(".draw_btn").on("click", function () {
            var uid = lexue.getUserProfileSession("display_uid");
            //活动是否开始
            /*    if ($(".draw_btn").hasClass("disa")) {
             //未登录
             if (!uid) {
                 alertBox("alertBox", "登录才可以操作哦！", "", "去登录", "lexuegaokao://login", "logining", "images/girl.png");
             } else {*/
            //已登录
            if ($(this).hasClass("btn")) {
                alertBox("alertBox", "每次抽奖会花费1乐钻，确定要抽奖吗？", "大奖超划算哦！", "确定", "index.html", "draw", "images/girl.png");
            }
            /*  }
            } else {
                //未到时间/活动结束
                $(".overdue").show();
                $(".overbox").show();
                $(".overdue_close").on("click", function () {
                    $(".overdue").hide();
                    $(".overbox").hide();
                })
            }*/
        });
        //点击抽奖确认按钮
        $(".draw_determine").on("click", function () {
            $(".draw_determine").hide();
            $(".alertBtn_determine").show();
            $(".alertBtn_cancel").hide();
            $(".alertBox_close").hide();
            $(".alertBox_content h1").removeClass("style").addClass("color");
            $(".alertBox_content p").removeClass("color").addClass("style");
            close_alertBox();
            var sid = lexue.getUserProfileSession("session_id");
            $(".draw_btn").removeClass("btn");
            //draw_results(sid);
            var prize = 1
            switch (prize) {
            case 1:
                rotateFunc(1, 300, "特等奖");
                break;
            case 2:
                rotateFunc(2, 0, "锦鲤奖");
                break;
            case 3:
                rotateFunc(3, 240, "惊喜奖");
                break;
            case 4:
                rotateFunc(4, 60, "BUFF奖");
                break;
            case 5:
                rotateFunc(5, 120, "人品奖无限");
                break;
            case 6:
                rotateFunc(6, 180, "参与奖");
                break;
            }
        });
    });
    //开奖结果
    /*     function draw_results(sid) {
              $.ajax({
                       url: "http://gdt.lexue.com/activity/postTZZLottery",
                       data: {
                           sid: sid,
                           cp: "draw"
                       },
                       dataType: "jsonp",
                       jsonp: "cp",
                       type: "GET",
                       success: function (data) {
                               console.log(data);
                               if (data.status == -2) {
                                   alertBox("alertBox", "乐钻不足!!", "请到【我的】-【账户余额】充值", "去充值", "lexuegaokao://pay", "error", "images/error_girl.png");
                                   $(".draw_btn").addClass("btn");
                               } else if (data.status == 0) {
             // var prize = data.prize;
             var prize = 1
             switch (prize) {
             case 1:
                 rotateFunc(1, 300, "特等奖");
                 break;
             case 2:
                 rotateFunc(2, 0, "锦鲤奖");
                 break;
             case 3:
                 rotateFunc(3, 240, "惊喜奖");
                 break;
             case 4:
                 rotateFunc(4, 60, "BUFF奖");
                 break;
             case 5:
                 rotateFunc(5, 120, "人品奖无限");
                 break;
             case 6:
                 rotateFunc(6, 180, "参与奖");
                 break;
                       }
                   } else if (data.status == -1) {
                       alertBox("alertBox", "请重新登录", "", "去登录", "lexuegaokao://login", "logining", "images/girl.png");
                       $(".draw_btn").addClass("btn");
                   }
                      }
                  })
             }*/
    //转盘旋转角度
    var rotateFunc = function (awards, angle, text) {
        isture = true;
        $(".other_one").hide();
        $(".rotary_table").stopRotate();
        $(".rotary_table").rotate({
            angle: 0,
            duration: 4000,
            animateTo: 1440 - angle - 30,
            callback: function () {
                isture = false; // 标志为 执行完毕
                flag = true;
                //显示再凑一次弹框
                if (flag) {
                    $(".other_one").show();
                }
                if (awards == 1) {
                    drawBox('drawBox', "恭喜获得直播券10张！</br> 请到【我的优惠券】中查看！", "", "");
                } else if (awards == 2) {
                    drawBox('drawBox', "恭喜获得年卡代金券1张！</br> 请到【我的优惠券】中查看！", "", "");
                } else if (awards == 3) {
                    drawBox('drawBox', "恭喜获得直播券1张！</br> 请到【我的优惠券】中查看！", "", "");
                } else if (awards == 4) {
                    drawBox('drawBox', "恭喜获得BUFF奖！", " 截图存到手机相册，可为考试加BUFF！", "BUFF");
                } else if (awards == 5) {
                    drawBox('drawBox', "恭喜获得人品奖！", " 截图存到手机相册人品暴增！", "certificate");
                } else if (awards == 6) {
                    drawBox('drawBox', "恭喜获得参与奖！</br> 快去查看乐学币余额！</br> 多出1000币哦！", "", "coin");
                }
            }
        });
    };
    //调起提示框
    function alertBox(className, htmlh1, htmlp, btnText, url, islogin, imgurl) {
        $(".button").remove();
        $(".overbox").show();
        $(".alertBox").show();
        $(".arrow").hide();
        $(".alertBox_content h1").html(htmlh1);
        $(".alertBox_content p").html(htmlp);
        $(".alertBtn_determine").html(btnText);
        $(".alertBox img").attr("src", imgurl);
        $(".alertBox_close,.alertBtn_cancel").on("click", function () {
            close_alertBox();
            $(".alertBox_content h1").removeClass("style").addClass("color");
            $(".alertBox_content p").removeClass("color").addClass("style");
            $(".alertBox_close").hide();
            $(".alertBtn").show();
            $(".alertBtn_determine").show();
            $(".draw_determine").hide();
        })
        $(".alertBtn_cancel").on("click", function () {
            close_alertBox();
        })
        if (islogin == "logining") {
            $(".alertBtn_determine").on("click", function () {
                window.location.href = url;
                $(this).hide();
                $(".button").remove();
                $(".alertBox_content h1").html("可以尽情抽奖啦！");
                var button = "<button class='button'>确认</button>";
                $(".alertBtn_list").append(button);
                $(".alertBtn_list").on("click", '.button', function () {
                    $(".alertBtn_determine").show();
                    lexue.creatRequest("data://userprofile");
                    close_alertBox();
                    $(".button").remove();
                })
            })
        } else
        if (islogin == "error") {
            //余额不足弹框
            $(".alertBox_close").show();
            $(".alertBtn_determine").on("click", function () {
                window.location.href = url;
                $(".alertBox_close").hide();
                close_alertBox();
            })
        } else if (islogin == "draw") {
            //确定抽奖弹框？
            $(".alertBox_content h1").removeClass("color").addClass("style");
            $(".alertBox_content p").removeClass("style").addClass("color");
            $(".alertBox_close").show();
            $(".alertBtn_cancel").show();
            $(".alertBtn_determine").hide();
            $(".draw_determine").show();
        }
    }
    //调起中奖结果提示框
    function drawBox(className, htmlh1, htmlp, islogin) {
        $(".draw_btn").addClass("btn");
        $(".overbox").show();
        $(".drawBox").show();
        $(".arrow").show();
        $(".drawBox_close").show();
        $(".drawBox_content h1").html(htmlh1);
        $(".drawBox_content p").html(htmlp);
        $(".drawBox_btn").on("click", function () {
            close_drawBox();
            $(".teacher_signature").hide();
            $(".people").removeClass("people_top");
            $(".drawBox_btn").removeClass("drawBox_btn_top");
            $(".certificate").hide();
            $(".people").removeClass("certificate_top");
            $(".coin").hide();
        })
        $(".drawBox_close").on("click", function () {
            close_drawBox();
            $(".teacher_signature").hide();
            $(".people").removeClass("people_top");
            $(".drawBox_btn").removeClass("drawBox_btn_top");
            $(".certificate").hide();
            $(".people").removeClass("certificate_top");
            $(".coin").hide();
        })
        if (islogin == "BUFF") {
            //BUFF奖
            $(".teacher_signature").show();
            $(".people").addClass("people_top");
            $(".drawBox_btn").addClass("drawBox_btn_top");
        } else if (islogin == "certificate") {
            //人品奖
            $(".certificate").show();
            $(".people").addClass("certificate_top");
            $(".drawBox_btn").addClass("drawBox_btn_top");
        } else if (islogin == "coin") {
            //参与奖
            $(".coin").show();
        }
    }
    //调起关闭提示框
    function close_alertBox() {
        $(".overbox").hide();
        $(".alertBox").hide();
    }
    //调起关闭中奖结果提示框
    function close_drawBox() {
        $(".overbox").hide();
        $(".drawBox").hide();
        $(".drawBox_close").hide();
        $(".arrow").hide();
    }
})(window);