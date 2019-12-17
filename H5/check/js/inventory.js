var postTime="";
var coouthtml="";
var postcreatTime="";
var ajaxData="";
var searchId="";
var nameId="";
var last_post_time="";
var userId="";
var cardId="";
var isSearch_type=1;
var ajax_data={};
var td='';
var txt='';
var input='';
var newtxt='';
var business_Id="";
var ptd="";
var ptxt='';
var pinput='';
var pnewtxt='';
var pIndex="";
var pBusidx="";
var ftd="";
var ftxt='';
var finput='';
var fnewtxt='';
var fIndex="";
var fBusidx="";
var numId="";
var checkIndex = '';
	$(".middle").on("click",".address",function(){

		alert($(this).html());
	})

	// 进入玩具列表查看库存
	$(".lists").on("dblclick",".toyName",function(){
		var businessId=$(this).attr("indexName");
		var stockId=$(this).attr("index");
		console.log(stockId)
		window.location.href='inventory_cont.html?business_id='+businessId+'&stock_status='+stockId;
	})
	//总库存
	$(".lists").on("click",".all",function(){
		business_Id=$(this).attr("indexName");
		console.log(business_Id)
		td = $(this);
		txt = td.text();
		input = $("<form onsubmit='return sumbit_sure()'><input type='text' class='test' value='" + txt + "'/><input type='submit' value='确定'/><input type='button' value='取消' class='cancel'/></form>");
		
		td.html(input);
		
		$(".test").click(function() { return false; }); 
		$(".test").blur(function() {
			newtxt = $(this).val();
			
 		})
		$(".cancel").click(function() { td.html(txt); }); 
	})
	function sumbit_sure(){  
		var gnl=confirm("确定要提交?");
		console.log(newtxt)
		if (gnl==true){  
			//判断文本有没有修改
			if(newtxt==''){
				alert("填写总库存")
			}else{
				if(txt<newtxt){
					$.ajax({
						url:'https://api.baobaoshowshow.com/index.php?r=WebBaoShow/upToysnum&business_id='+business_Id+'&number_all='+newtxt,
						type:'GET',
						datatypeza:'json',
						success:function(data){
							td.html(newtxt); 
							var aa=$("#renting"+data).html();
							var cc=$("#surplus"+data).html();
							$("#surplus"+data).html(newtxt-aa);
						}
					})
				}else{
					return false;
				}
				
			}
			
			
			
		}else{  
			return false;  
		}  
	}

	//零件组成
	
 		$(".lists").on("click",".tu",function(){
 			pBusidx=$(this).attr("pindexName");
 			window.location.href='inventory_img.html?business_id='+pBusidx;
 		})
 		$(".lists").on("click",".tu1",function(){
 			pBusidx=$(this).attr("pindexName");
 			window.location.href='inventory_img.html?business_id='+pBusidx;
 		})
 		
 		
	// function sumbit_psure(){  
	// 	var pgnl=confirm("确定要提交?");
		
	// 	if (pgnl==true){  
	// 		//判断文本有没有修改
			
	// 		$.ajax({
	// 			url:'http://api.baobaoshowshow.com/index.php?r=WebBaoShow/upToysInfo&business_id='+pBusidx+'&toys_type='+pIndex+'&toys_new='+pnewtxt,
	// 			type:'GET',
	// 			datatype:'json',
	// 			success:function(data){
	// 				console.log(data);
	// 				ptd.html(pnewtxt);
	// 			}
	// 		})
			
			
			
			
	// 	}else{  
	// 		return false;  
	// 	}  
	// } 


	//功能说明
	$(".lists").on("click",".func",function(){
		fBusidx=$(this).attr("findexName");
		fIndex=$(this).attr("findex");
		console.log(business_Id)
		ftd = $(this);
		ftxt = ftd.text();
		finput = $("<form onsubmit='return sumbit_fsure()'><textarea  cols='20 rows='5' class='ftest'>"+ftxt+"</textarea><input type='submit' value='确定'/><input type='button' value='取消' class='fcancel'/></form>");
		
		ftd.html(finput);
		$(".ftest").click(function() { return false; }); 
		$(".ftest").blur(function() {
			fnewtxt = $(this).val();
			
 		})
 		$(".fcancel").click(function() { ftd.html(ftxt); }); 
	})
	function sumbit_fsure(){  
		var fgnl=confirm("确定要提交?");
		
		if (fgnl==true){  
			//判断文本有没有修改
			
			$.ajax({
				url:'https://api.baobaoshowshow.com/index.php?r=WebBaoShow/upToysInfo&business_id='+fBusidx+'&toys_type='+fIndex+'&toys_new='+fnewtxt,
				type:'GET',
				datatype:'json',
				success:function(data){

					ftd.html(fnewtxt);
				}
			})
			
			
			
			
		}else{  
			return false;  
		}  
	} 

	
	//剩余库存
	$(".lists").on("click",".surplus",function(){
		var businessId=$(this).attr("indexName");
		var stockId=$(this).attr("index");
		window.location.href='inventory_cont.html?business_id='+businessId+'&stock_status='+stockId;
	})
	
	//租赁中
	$(".lists").on("click",".renting",function(){
		var stockId=$(this).attr("index");
		var businessId=$(this).attr("indexName");
		window.location.href='inventory_cont.html?business_id='+businessId+'&stock_status='+stockId;
	})


	window.onscroll=function(){
	    var sl=-Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);
	    document.getElementById('head').style.left=sl+'px';
	    $("#head").css({'position':'fixed','top':'0'});
	    $(".main").css({'margin-top':'0.8rem'});
	   	// is_search_type()
	};


	is_search_type();
    function is_search_type(){
		last_post_time = $(".lists").find("tr:last").data("posttime");
		console.log(last_post_time);
		searchId=$(".idtxt").val();
		nameId=$(".nametxt").val();
		numId=$(".numtxt").val();
		checkIndex=$("#test").find("option:selected").attr("index");

    	switch(isSearch_type){
            	case 1 : 
            		ajax_data = {
						searchId:searchId,
						nameId:nameId,
						numId:numId,
						postTime:last_post_time,
						checkIndex:checkIndex,
            		}
            		break;
            }
            request(ajax_data);
    }

	$(".btn").on("click",function(){
		$(".lists").html("");
		$(".count").hide();
		isSearch_type=1;
		is_search_type();
	})
	
	function request(opt){
		ajaxData={
			post_create_time: opt.postTime,
			search_id: opt.searchId,
			toys_number:opt.numId,
			business_title: opt.nameId,
			search_state: opt.checkIndex
		}
		console.log(1);
		$('.upload').addClass('loading');
		$.ajax({
			url:'https://api.baobaoshowshow.com/index.php?r=WebBaoShow/getToysStockList',
			type:'GET',
			data:ajaxData,
			datatype:'json',
			success:function(data){
				$('.upload').removeClass('loading');
				var data=JSON.parse(data);
				var orderdata=data.data;
				console.log(orderdata);
				var orderhtml="";
				var coouthtml="";
				console.log(numId)
				if(numId!=""){
					
					window.location.href='https://www.meimei.yihaoss.top/H5/check/inventory_cont.html?bussiness_id=&toys_number='+numId+'&stock_status=0';
				}else{
					if(orderdata.length!=0){
						for(var i in orderdata){
							if(orderdata[i].size_img_thumb){

								orderhtml+='<tr data-postTime='+orderdata[i].post_create_time+'><td class="membercont" style="position:relative"><a style="position:absolute;right:0;bottom:0"><img style="display:inline-block;width:0.15rem;height:0.15rem" src="'+orderdata[i].size_img_thumb+'"></a><img src="'+orderdata[i].business_pic+'"></td><td class="toyName" index=0 indexName='+orderdata[i].business_id+'>'+orderdata[i].business_title+'</td><td><a class="all" id="all'+orderdata[i]. business_id+'" indexName='+orderdata[i].business_id+'>'+orderdata[i].total_number+'</a></td><td class="surplus" index=1 id="surplus'+orderdata[i].business_id+'" indexName='+orderdata[i].business_id+'>'+orderdata[i].user_number+'</td><td class="renting" index=2 id="renting'+orderdata[i].business_id+'" indexName='+orderdata[i].business_id+'>'+orderdata[i].play_number+'</td><td>'+orderdata[i].cantusenum+'</td><td><input type="button" class="tu1" value="上传玩具零件" pindexName='+orderdata[i].business_id+'></td><td><a class="func" findexName='+orderdata[i].business_id+' findex=5>'+orderdata[i].business_func+'</a></td></tr>';
							}else{

								orderhtml+='<tr data-postTime='+orderdata[i].post_create_time+'><td class="membercont"><img src="'+orderdata[i].business_pic+'"></td><td class="toyName" index=0 indexName='+orderdata[i].business_id+'>'+orderdata[i].business_title+'</td><td><a class="all" id="all'+orderdata[i]. business_id+'" indexName='+orderdata[i].business_id+'>'+orderdata[i].total_number+'</a></td><td class="surplus" index=1 id="surplus'+orderdata[i].business_id+'" indexName='+orderdata[i].business_id+'>'+orderdata[i].user_number+'</td><td class="renting" index=2 id="renting'+orderdata[i].business_id+'" indexName='+orderdata[i].business_id+'>'+orderdata[i].play_number+'</td><td>'+orderdata[i].cantusenum+'</td><td><input type="button" class="tu1" value="上传玩具零件" pindexName='+orderdata[i].business_id+'></td><td><a class="func" findexName='+orderdata[i].business_id+' findex=5>'+orderdata[i].business_func+'</a></td></tr>';
							}
							
						}
						$(".count").html(coouthtml);
						$(".lists").append(orderhtml);
					}
				}
			}
		})
	}

	function debounce(func, wait, immediate) {
	    var timeout;
	    return function() {
	        var context = this, args = arguments;
	        var later = function() {
	            timeout = null;
	            if (!immediate) func.apply(context, args);
	        };
	        var callNow = immediate && !timeout;
	        clearTimeout(timeout);
	        timeout = setTimeout(later, wait);
	        if (callNow) func.apply(context, args);
	    };
	};
	 
	var myEfficientFn = debounce(function() {
	    if($(window).scrollTop()+$(window).height()-129 >= $('.main').height()){
	        is_search_type();
	    }
	    
	}, 250);
	 
	// 绑定监听
	window.addEventListener('scroll', myEfficientFn);