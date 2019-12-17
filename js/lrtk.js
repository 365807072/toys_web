// 焦点图
(function(d,D,v){d.fn.responsiveSlides=function(h){var b=d.extend({auto:!0,speed:1E3,timeout:7E3,pager:!1,nav:!1,random:!1,pause:!1,pauseControls:!1,prevText:"Previous",nextText:"Next",maxwidth:"",controls:"",namespace:"rslides",before:function(){},after:function(){}},h);return this.each(function(){v++;var e=d(this),n,p,i,k,l,m=0,f=e.children(),w=f.size(),q=parseFloat(b.speed),x=parseFloat(b.timeout),r=parseFloat(b.maxwidth),c=b.namespace,g=c+v,y=c+"_nav "+g+"_nav",s=c+"_here",j=g+"_on",z=g+"_s",
o=d("<ul class='"+c+"_tabs "+g+"_tabs' />"),A={"float":"left",position:"relative"},E={"float":"none",position:"absolute"},t=function(a){b.before();f.stop().fadeOut(q,function(){d(this).removeClass(j).css(E)}).eq(a).fadeIn(q,function(){d(this).addClass(j).css(A);b.after();m=a})};b.random&&(f.sort(function(){return Math.round(Math.random())-0.5}),e.empty().append(f));f.each(function(a){this.id=z+a});e.addClass(c+" "+g);h&&h.maxwidth&&e.css("max-width",r);f.hide().eq(0).addClass(j).css(A).show();if(1<
f.size()){if(x<q+100)return;if(b.pager){var u=[];f.each(function(a){a=a+1;u=u+("<li><a href='#' class='"+z+a+"'>"+a+"</a></li>")});o.append(u);l=o.find("a");h.controls?d(b.controls).append(o):e.after(o);n=function(a){l.closest("li").removeClass(s).eq(a).addClass(s)}}b.auto&&(p=function(){k=setInterval(function(){var a=m+1<w?m+1:0;b.pager&&n(a);t(a)},x)},p());i=function(){if(b.auto){clearInterval(k);p()}};b.pause&&e.hover(function(){clearInterval(k)},function(){i()});b.pager&&(l.bind("click",function(a){a.preventDefault();
b.pauseControls||i();a=l.index(this);if(!(m===a||d("."+j+":animated").length)){n(a);t(a)}}).eq(0).closest("li").addClass(s),b.pauseControls&&l.hover(function(){clearInterval(k)},function(){i()}));if(b.nav){c="<a href='#' class='"+y+" prev'>"+b.prevText+"</a><a href='#' class='"+y+" next'>"+b.nextText+"</a>";h.controls?d(b.controls).append(c):e.after(c);var c=d("."+g+"_nav"),B=d("."+g+"_nav.prev");c.bind("click",function(a){a.preventDefault();if(!d("."+j+":animated").length){var c=f.index(d("."+j)),
a=c-1,c=c+1<w?m+1:0;t(d(this)[0]===B[0]?a:c);b.pager&&n(d(this)[0]===B[0]?a:c);b.pauseControls||i()}});b.pauseControls&&c.hover(function(){clearInterval(k)},function(){i()})}}if("undefined"===typeof document.body.style.maxWidth&&h.maxwidth){var C=function(){e.css("width","100%");e.width()>r&&e.css("width",r)};C();d(D).bind("resize",function(){C()})}})}})(jQuery,this,0);
$(function() {
    $(".f426x240").responsiveSlides({
        auto: true,
        pager: true,
        nav: true,
        speed: 700,
        maxwidth: 426
    });
    $(".f160x160").responsiveSlides({
        auto: true,
        pager: true,
        speed: 700,
        maxwidth: 160
    });
});
// ad
function dy(code)
{





index = Math.floor(Math.random() * tips.length);
document.writeln(tips[index]);
document.writeln ('&nbsp; </a>');}
if (code=="lb468x15"){
document.writeln("<script type=\"text\/javascript\"><!--");
document.writeln("google_ad_client = \"ca-pub-4213001413639273\";");
document.writeln("\/* 全站_顶部_468x15 *\/");
document.writeln("google_ad_slot = \"2293322720\";");
document.writeln("google_ad_width = 468;");
document.writeln("google_ad_height = 15;");
document.writeln("\/\/-->");
document.writeln("<\/script>");
document.writeln("<script type=\"text\/javascript\" src=\"http:\/\/pagead2.googlesyndication.com\/pagead\/show_ads.js\"><\/script>");}
if (code=="weibo"){// 微博
document.writeln ('<iframe width="120" height="24" frameborder="0" allowtransparency="true" marginwidth="0" marginheight="0" scrolling="no" border="0" src="http://widget.weibo.com/relationship/followbutton.php?language=zh_cn&width=136&height=24&uid=2556500765&style=2&btn=red&dpc=1"></iframe>');}
if (code=="tj"){// 统计
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F49542e19848a99b43a81376b929e6c72' type='text/javascript'%3E%3C/script%3E"));

document.writeln ('<script language="javascript" type="text/javascript" src="http://js.users.51.la/2007336.js"></script>');
}
if (code=="zan"){// 赞
document.writeln ('<a version="1.0" class="qzOpenerDiv" href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_likeurl" target="_blank">赞</a><script src="http://qzonestyle.gtimg.cn/qzone/app/qzlike/qzopensl.js#jsdate=20111107&style=2&showcount=1&width=100&height=30" charset="utf-8" defer="defer" ></script>');}



	
function $$(id){if(document.getElementById){return document.getElementById(id);}
else if(document.layers){return document.layers[id];}
else{return false;}}
(function(){function initHead(){setTimeout(showSubSearch,0)};function showSubSearch()
{$$("x1").onmouseover=function(){$$("x2").style.display="";$$("x1").className="sa sa_hover"};$$("x1").onmouseout=function(){$$("x2").style.display="none";$$("x1").className="sa"};$$("s1").onclick=function(){selSubSearch(1);$$("q").focus()};$$("s2").onclick=function(){selSubSearch(2);$$("q").focus()};$$("s3").onclick=function(){selSubSearch(3);$$("q").focus()};$$("s4").onclick=function(){selSubSearch(4);$$("q").focus()};$$("s5").onclick=function(){selSubSearch(5);$$("q").focus()};};

function selSubSearch(iType){hbb=[];hbb={1:["矢量","1"],2:["代码","js"],3:["图标","png"],4:["表情","48"],5:["全站","0"]};$$("s0").innerHTML=hbb[iType][0];$$("x2").style.display="none";$$("typeid").value=hbb[iType][1];};initHead();})();

// jquery.cookie.min
jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options.expires=-1;}var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000));}else{date=options.expires;}expires='; expires='+date.toUTCString();}var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}return cookieValue;}};
// fs+bg
var options={path:'/',expires:30};var cookie_fs=$.cookie("fs");var cookie_bg=$.cookie("bg");$(function(){if(cookie_bg){$('#yuedu').css('background',cookie_bg);}
if(cookie_fs){$('#yuedu').css('font-size',cookie_fs+'px');}});function fontsize(num){switch(num){case 1:$("#yuedu").css('font-size','16px');$.cookie("fs","16",options);break;case 2:$("#yuedu").css('font-size','14px');$.cookie("fs","14",options);break;case 3:$("#yuedu").css('font-size','12px');$.cookie("fs","12",options);break;}}
function backcolor(num){if(num==1){$("#yuedu").css('background','#F0F6FC');$.cookie("bg","#F0F6FC",options);}
if(num==2){$("#yuedu").css('background','#FFFFFF');$.cookie("bg","#FFFFFF",options);}
if(num==3){$("#yuedu").css('background','#F6F6F6');$.cookie("bg","#F6F6F6",options);}}
// bg+gif
$(document).ready(function(){$('.content-bg li,.content-gif li').hover(function(){$(".save",this).stop().animate({top:'162px'},{queue:false,duration:162});},function(){$(".save",this).stop().animate({top:'192px'},{queue:false,duration:162});});});
function runSave(){if(saveImg.location!="about:blank")window.saveImg.document.execCommand("SaveAs");}
function saveImgAs(url){if(window.saveImg&&url)window.saveImg.location=url;}
document.writeln('<IFRAME style="DISPLAY: none" onload=runSave() src="about:blank" name=saveImg></IFRAME>');
// tx
function getByid(id) {
	if (document.getElementById) {
		return document.getElementById(id);
	} else if (document.all) {
		return document.all[id];
	} else if (document.layers) {
		return document.layers[id];
	} else {
		return null;
	}
}
function creatID(DivID){
var objs=getByid(DivID).getElementsByTagName('textarea');
var inps=getByid(DivID).getElementsByTagName('input');
var buts=getByid(DivID).getElementsByTagName('button');
var labs=getByid(DivID).getElementsByTagName('label');
	for (i=0; i<objs.length; i++) {
		objs[i].id="runcode"+i;
		inps[i].id=i
		buts[i].id=i
		labs[i].id=i
	}
}
function runCode(obj){
	  var code=getByid("runcode"+obj).value;
	  var newwin=window.open('','','');
	  newwin.opener = null;
	  newwin.document.write(code); 
	  newwin.document.close();
}

function saveCode(obj,title) {
        var winname = window.open('','','');
        winname.document.open('text/html', 'replace');
        winname.document.write(document.getElementById(obj).value);
        winname.document.execCommand('saveas','',title+'.html');
        winname.close();
}

