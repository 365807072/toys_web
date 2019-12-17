/**
 * lenovo 大事记
 * @author liw
 */
;(function(g){

  if(g.events) return;
  var events = g.events = {
    // 场景列表
    _scenes: []
  };

  // 初始化
  events.init = function(){

    this._wh = $(window).height();
    this._timelineTop = $('.time-line').position().top;

    // 云彩移动
    $('.cloud img').addClass('active');
    $('#scrollContainer').height(this._wh);
    // 初始化控制器
    this.controller = new ScrollMagic({
      container: "#scrollContainer",
      globalSceneOptions: {
        triggerHook: "0.55"
      }
    });
    // 初始化iscroll
    this.myScroll = new IScroll('#scrollContainer', {
      scrollX: false,
      scrollY: true,
      scrollbars: true,
      //bounce: false,
      // default * 5
      deceleration: 0.003,
      //useTransform: false,
      useTransition: false,
      probeType: 3,
      click: false,
      tap: true
    });
    // 绑定controller
    this.myScroll.on("scroll", function () {
      events.controller.update();
      // 时间线
      var h = -events.myScroll.y + 0.8*events._wh - events._timelineTop;
      var oldH = $('.time-line').height();
      // up
      if(this.directionY == 1) {
        if(h > oldH) {
          $('.time-line').height(h);
        }
      } else {
        if(h > events._timelineMinH) {
          $('.time-line').height(h);
        }
      }

    });
    this.controller.scrollPos(function () {
      return -events.myScroll.y;
    });
    // 刷新
    setTimeout(function () {
        events.myScroll.refresh();
    }, 0);

    // 添加scene
    events.initScene();
  };

  // 执行场景初始化
  events.initScene = function(){
    for(var i = 0; i < this._scenes.length; i++) {
      var fn = this._scenes[i]['fn'];
      // 将event传入
      scene = fn.call(this, this._scenes[i]['name']);
      scene.addTo(this.controller);
    }
  };

  // 添加场景
  events.addScene = function(name, fn) {
    if('function' == typeof name) {
      fn = name;
      name = '';
    }
    if('function' != typeof fn) {
      return false;
    }
    this._scenes.push({ fn: fn, name: name });
    return true;
  };

  // 1984的动画时间线
  events.getTimeline1984 = function(timeline){
    if(!timeline) {
      var timeline = new TimelineMax({ delay:1.4 });
    }
    timeline.from('.airship', 0.6, { opacity:0, x:-200 });
    timeline.from('.sec-1984 .star', 0.4, { scale:0 });
    timeline.from('.sec-1984 .home', 0.4, { scaleY:0, transformOrigin:"50% 100%" });
    timeline.from('.sec-1984 .ws', 0.4, { opacity:0, rotation:"70deg", transformOrigin:"40% 100%", ease:Bounce.easeOut})
    return timeline;
  };

  // 1990动画时间线
  events.getTimeline1990 = function(timeline){
    if(!timeline) {
      var timeline = new TimelineMax({ delay:2.8 });
    }
    timeline.from('.sec-1990 .star', 0.4, { scale:0 });
    timeline.from('.sec-1990 .desktop', 0.4, { x: 300, ease:Back.easeOut });
    timeline.from('.sec-1990 .ws', 0.2, { scale:0, opacity: 0, transformOrigin:"right bottom"});
    return timeline;
  };


})(window);






// sec-30
events.addScene(function(){
  var scene = new ScrollScene({
    duration: 0,
    triggerElement: '.sec-30 .num-30'
  });

  // 时间线
  var tmpH = -this.myScroll.y + 1*this._wh - this._timelineTop;
  this._timelineMinH = tmpH;

  // 三十年动画
  TweenMax.to(".time-line", 1, { height: tmpH, delay:1 });
  TweenMax.from(".sec-30 .num-30", 0.6, { scale: 0, opacity:0, ease:Bounce.easeOut, delay:0.4});
  TweenMax.from(".sec-30 .sun", 0.6, { y: -200, /*ease:Bounce.easeOut*/ });
  TweenMax.from(".sec-30 .bird", 0.4, { scale:0, delay:0.7 });
  TweenMax.to(".sec-30 .bird", 0.6, { delay:1.5, rotation:"+=20deg", yoyo:true, repeat: -1, transformOrigin: "right bottom" });

  // 如果1984在视窗内，则展示动画
  var rect1984 = $('.sec-1984 .ws')[0].getBoundingClientRect();
  // 10像素误差
  if(rect1984.bottom <= this._wh + 10) {
    this.getTimeline1984();
    this._scene1984Played = true;
  }

  // 如果1990在视窗内，展示动画
  var rect1990 = $('.sec-1990 .desktop')[0].getBoundingClientRect();
  if(rect1990.bottom <= this._wh +10) {
    this.getTimeline1990();
    this._scene1990Played = true;
  }

  return scene;
});







// sec-1984
events.addScene(function(){
  var scene = new ScrollScene({
    duration: 1000,
    triggerElement: '.sec-1984 .ws',
    //offset: -350
  });

  if(!this._scene1984Played) {
    scene.setTween(this.getTimeline1984(new TimelineMax()));
  }

  return scene;
});



// sec-1990
events.addScene(function(){
  var scene = new ScrollScene({
    duration: 0,
    triggerElement: '.sec-1990 .desktop',
    //offset: -350
  });

  if(!this._scene1990Played) {
    scene.setTween(this.getTimeline1990(new TimelineMax()));
  }

  return scene;
});


// sec-1995
events.addScene(function(){
  var scene = new ScrollScene({
    duration: 0,
    triggerElement: '.sec-1995 .server',
    //triggerHook: 'onLeave',
    //offset: 350
  });

  var timeline = new TimelineMax();
  timeline.from('.sec-1995 .star', 0.4, { scale:0 });
  timeline.from('.sec-1995 .server', 0.4, { opacity:0, rotation:"180deg" });
  timeline.from('.sec-1995 .ws', 0.4, { scale: 0, ease:Back.easeOut, transformOrigin: "left bottom" });


  scene.setTween(timeline);

  return scene;

});


// sec-1996
events.addScene(function(){
  var scene = new ScrollScene({
    duration: 300,
    triggerElement: '.sec-1996 .map',
    //triggerHook: 'onLeave',
    //offset: 350
  });

  var timeline = new TimelineMax();
  timeline.from('.sec-1996 .star', 0.4, { scale:0 });
  timeline.from('.sec-1996 .map', 0.4, {opacity: 0});
  timeline.from('.sec-1996 .computer', 0.4, { scaleY: 0, transformOrigin: "50% 100%" });
  timeline.from('.sec-1996 .no1', 0.4, { scale:0, y:-50, transformOrigin: "50% 0%", ease:Back.easeOut });
  timeline.from('.sec-1996 .ws', 0.4, { scale: 0, ease:Back.easeOut, transformOrigin: "0% 40%" });

  scene.setTween(timeline);

  return scene;
});

// sec-1998
events.addScene(function(){
  var scene = new ScrollScene({
    duration: 300,
    triggerElement: '.sec-1998 .sign',
    //triggerHook: 'onLeave',
    //offset: 350
  });

  var timeline = new TimelineMax();
  timeline.from('.sec-1998 .star', 0.4, { scale:0 });
  timeline.from('.sec-1998 .sign', 0.4, { scaleY: 0, transformOrigin: "50% 100%" });
  timeline.from('.sec-1998 .ws', 0.4, { scale: 0, transformOrigin: "50% 100%" });

  scene.setTween(timeline);

  return scene;
});


// sec-1999
events.addScene(function(){
  var scene = new ScrollScene({
    duration: 400,
    triggerElement: '.sec-1999 .star',
    //triggerHook: 'onLeave',
    //offset: 350
  });

  var timeline = new TimelineMax();
  timeline.from('.sec-1999 .star', 0.4, { scale:0 });
  timeline.from('.sec-1999 .grass, .sec-1999 .tree1, .sec-1999 .tree2', 0.4, {opacity:0});
  timeline.from('.sec-1999 .bud1', 0.2, {scale:0, transformOrigin:"50% 100%"});
  timeline.from('.sec-1999 .bud2', 0.2, {scale:0, transformOrigin:"50% 100%"});
  timeline.from('.sec-1999 .bud3', 0.2, {scale:0, transformOrigin:"50% 100%"});
  timeline.from('.sec-1999 .bud4', 0.2, {scale:0, transformOrigin:"50% 100%"});
  timeline.from('.sec-1999 .ws, .sec-1999 .tv', 0.6, { opacity:0, x: 500, skewX:'60deg', ease:Back.easeOut});

  scene.setTween(timeline);

  return scene;
});


// sec-2003
events.addScene(function(){
  var scene = new ScrollScene({
    duration: 200,
    triggerElement: '.sec-2003 .ws',
    //triggerHook: 'onLeave',
    //offset: 350
  });

  var timeline = new TimelineMax();
  timeline.from('.sec-2003 .star', 0.2, { scale:0 });
  timeline.from('.sec-2003 .ws', 0.4, {opacity:0, scaleY:0});
  timeline.from('.sec-2003 .book', 0.6, { scaleX:0, transformOrigin:"50% 50%"});
  timeline.from('.sec-2003 .plane, .sec-2003 .ele', 0.2, {scale:0, transformOrigin:"50% 100%"});

  scene.setTween(timeline);

  return scene;
});

// sec-2005
events.addScene(function(){
  var scene = new ScrollScene({
    duration: 0,
    triggerElement: '.sec-2005 .rain',
    //triggerHook: 'onLeave',
    //offset: 350
  });

  var timeline = new TimelineMax();
  timeline.from('.sec-2005 .star', 0.2, { scale:0 });
  timeline.from('.sec-2005 .kettle', 0.4, {opacity:0, rotation:"-30deg"});
  timeline.from('.sec-2005 .rain', 0.4, {opacity:0});
  timeline.from('.sec-2005 .logo4', 0.6, { opacity:0, scale:2, transformOrigin:"50% 0%", ease:Bounce.easeOut});
  timeline.from('.sec-2005 .ws', 0.4, { opacity:0});

  scene.setTween(timeline);

  return scene;
});

// sec-2007
events.addScene(function(){
  var scene = new ScrollScene({
    duration: 0,
    triggerElement: '.sec-2007 .torch',
    //triggerHook: 'onLeave',
    //offset: 350
  });

  var timeline = new TimelineMax();
  timeline.from('.sec-2007 .star', 0.2, { scale:0 });
  timeline.from('.sec-2007 .torch', 0.6, {transformOrigin:"50% 100%", scaleY:0, x:-300, ease:Bounce.easeOut} );
  timeline.from('.sec-2007 .awards', 0.4, {opacity:0, scale:0});
  timeline.from('.sec-2007 .ws', 0.6, { opacity:0, x:-200});

  scene.setTween(timeline);

  return scene;
});


// sec-2009
events.addScene(function(){
  var scene = new ScrollScene({
    duration: 200,
    triggerElement: '.sec-2009 .earth',
    //triggerHook: 'onLeave',
    //offset: 350
  });

  var timeline = new TimelineMax();
  timeline.from('.sec-2009 .star', 0.2, { scale:0 });
  timeline.from('.sec-2009 .earth', 0.2, {opacity:0, scale:0.9});
  timeline.from('.sec-2009 .ws', 0.4, { opacity:0, x:-200, scale:0, ease:Bounce.easeOut});


  scene.setTween(timeline);

  return scene;
});


// sec-2012
events.addScene(function(){
  var scene = new ScrollScene({
    duration: 200,
    triggerElement: '.sec-2012 .watch',
    //triggerHook: 'onLeave',
    //offset: 350
  });

  var timeline = new TimelineMax();
  timeline.from('.sec-2012 .star', 0.2, { scale:0 });
  timeline.from('.sec-2012 .watch', 0.2, {opacity:0, scale:0.5});
  timeline.from('.sec-2012 .ws', 0.4, { opacity:0, x:-200, scale:0, ease:Back.easeOut});

  scene.on('enter', function(){
    if(events._watchStarted) return;
    TweenMax.to('.sec-2012 .watch .hour', 1, {rotation:"80deg", transformOrigin:"10% 50%"});
    TweenMax.to('.sec-2012 .watch .minute', 1, {rotation:"30deg", transformOrigin:"10% 50%"});
    TweenMax.to('.sec-2012 .watch .second', 30, {rotation:"360deg", transformOrigin:"10% 50%", repeat:-1, ease:Linear.easeNone});
    events._watchStarted = true;
  });

  scene.setTween(timeline);

  return scene;
});

// sec-2013
events.addScene(function(){
  var scene = new ScrollScene({
    duration: 200,
    triggerElement: '.sec-2013 .star',
    //triggerHook: 'onLeave',
    //offset: 350
  });

  var timeline = new TimelineMax();
  timeline.from('.sec-2013 .star', 0.2, { scale:0 });
  //timeline.from('.sec-2013 .one', 0.2, {opacity:0, scale:0.5});
  timeline.from('.sec-2013 .ws', 0.4, { opacity:0, x:-200, scale:0, ease:Back.easeOut});

  scene.setClassToggle('.sec-2013 .one', "animated flipInX");

  scene.setTween(timeline);

  return scene;
});

// sec-2014
events.addScene(function(){
  var scene = new ScrollScene({
    duration: 200,
    triggerElement: '.sec-2014 .star',
    //triggerHook: 'onLeave',
    //offset: 350
  });

  var timeline = new TimelineMax();
  timeline.from('.sec-2014 .star', 0.2, { scale:0 });
  timeline.from('.sec-2014 .logo3', 0.4, { opacity:0,scale:0});
  timeline.from('.sec-2014 .ws', 0.4, {scaleY:0});
  timeline.from('.sec-2014 .popup', 0.4, {scale:0});
  scene.setClassToggle('.sec-2014 .popup', "animated bounce");

  scene.setTween(timeline);

  return scene;
});

// sec-2014-2
events.addScene(function(){
  var scene = new ScrollScene({
    duration: 200,
    triggerElement: '.sec-2014-2 .star',
    //triggerHook: 'onLeave',
    //offset: 350
  });

  var timeline = new TimelineMax();
  timeline.from('.sec-2014-2 .star', 0.2, { scale:0 });
  timeline.from('.sec-2014-2 .flowerpot .pot', 0.2, { opacity:0});
  timeline.from('.sec-2014-2 .flowerpot .flower', 0.4, {height:0});
  timeline.from('.sec-2014-2 .ws', 0.4, {scale:0, rotation:"-30deg"});

  scene.setTween(timeline);

  return scene;
});

// sec-cake
events.addScene(function(){
  var scene = new ScrollScene({
    duration: 0,
    triggerElement: '.sec-cake .ele-stars',
    //triggerHook: 'onLeave',
    offset: 80,
    reverse:false
  });

  var timeline = new TimelineMax();
  timeline.from('.sec-cake .ws', 0.6, { y:-200, opacity:0, ease:Back.easeOut });
  timeline.from('.sec-cake .ele-stars', 0.6, {opacity:0 });
  timeline.from('.sec-cake .cake', 0.4, {opacity:0});
  scene.setTween(timeline);

  $('.sec-cake .msg').css('opacity', 0);
  $('.sec-cake .colour').css('opacity', 0);
  TweenMax.set('.sec-cake .fire-center, .sec-cake .fire-right, .sec-cake .fire-left', {opacity:0, scale:0});
  $('.sec-cake').on('tap', function(){
    if(events._fired) return;
    $('.sec-cake .msg').fadeOut();
    TweenMax.to('.sec-cake .fire-center, .sec-cake .fire-right, .sec-cake .fire-left', 0.6, {opacity:1,scale:1, transformOrigin:"50% 100%"});
    TweenMax.fromTo('.sec-cake .fire-center, .sec-cake .fire-right, .sec-cake .fire-left', 1.2, {opacity:0.8,scale:1, transformOrigin:"50% 100%"}, {opacity:1,scale:1.2, transformOrigin:"50% 100%", repeat:-1, yoyo:true});
    TweenMax.fromTo('.sec-cake .colour', 1, {opacity:0, scale:0, delay:1}, {opacity:1, scale:1, delay:1});
    events._fired = true;
  });

  $('.sec-cake .btn-get').on('touchend', function(){
    var href = $(this).attr('href');
    window.location.href = href;
  });

  scene.on('enter', function(){
    if(events._cakeBindedEvent) return;
    TweenMax.to('.sec-cake .msg', 0.4, {opacity:1});
    events._cakeBindedEvent = true;
  });

  return scene;
});










