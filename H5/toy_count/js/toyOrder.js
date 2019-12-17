$(function(){
	var url = location.href;
	var userId="";

	
	var toyData="";
	var headHtml="";
	var addressHtml="";
	var toyHtml="";
	var cardHtml="";
	var cardData="";
	var battData="";
	var battHtml="";
	var copData="";
	var copHtml="";
	var data=[];
	var comId="";
	var cardId="";
	var selId="";
	var orderId="";
	var brand="";
	var isbattery="";
	var chosId="";
	var ordId="";
	var bradnId="";
	var isId="";
	var businessId="";
	var comborder="";
	var sour="";
	var newtoyHtml="";
	if(url.indexOf("?") > 0){
		if(GetQueryString("login_user_id")!=null && GetQueryString("login_user_id").length>-1){
			
			userId = GetQueryString("login_user_id");
		}

		if(GetQueryString("business_id")!=null && GetQueryString("business_id").length>-1){
			
			businessId = GetQueryString("business_id");
		}
		if(GetQueryString("combined_order_id")!=null && GetQueryString("combined_order_id").length>-1){
			
			comborder = GetQueryString("combined_order_id");
		}
		if(GetQueryString("order_id")!=null && GetQueryString("order_id").length>-1){
			
			orderId = GetQueryString("order_id");
		}
		if(GetQueryString("source")!=null && GetQueryString("source").length>-1){
			
			sour = GetQueryString("source");
		}
	}
	function GetQueryString(name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if(r!=null)return  unescape(r[2]); return null;
	}

	$.ajax({
		url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV77/publictoysOrderV2&login_user_id='+userId+'&business_id='+businessId+'&combined_order_id='+comborder+'&order_id='+orderId+'&source='+sour,
		type:'GET',
		datatype:'json',
		success:function(data){
			var data=JSON.parse(data);
			toyData=data.data;
			console.log(data.data2)
			wajuData=toyData.toys_info;
			cardData=toyData.card_info;
			battData=toyData.battery_info;
			copData=toyData.combined_order_price;
			comId=toyData.combined_order_id;
			headHtml+='<p>'+toyData.prompt_title+'</p>';
			$(".head_cout").html(headHtml);

			if(toyData.address){
				addressHtml+='<span><img src="img/33.png"></span><span><a>'+toyData.user_name+' '+toyData.mobile+'</a><a>'+toyData.address+'</a></span><span><img src="img/34.png"></span>';
			}else{
				$(".addresss").hide();
				$(".address").show()
			}
			$(".addresss").html(addressHtml);

		
			if(toyData.rent_info.is_rent==1){
				$(".noMeber").hide();
			}else{
				$(".noMeber").show();
			}
		
			
			console.log(wajuData);
			toyHtml+='<div class="left">';
			toyHtml+='<div class="swiper-container swiper-container2"><div class="swiper-wrapper">';
			for(var j in wajuData){
				if(wajuData[j].size_img_thumb){
					toyHtml+='<div class="swiper-slide"><a><img src="'+wajuData[j].size_img_thumb+'"></a><img src="'+wajuData[j].img_thumb+'"></div>';
				}else{
					toyHtml+='<div class="swiper-slide"><img src="'+wajuData[j].img_thumb+'"></div>';
				}
				
			}
			toyHtml+='</div></div>';
			toyHtml+='</div>';
			toyHtml+='</div>';
			toyHtml+='<div class="right"><span>'+toyData.toys_title+'</span><span><img src="img/34.png"></span></div>';
			$('.toy').html(toyHtml);

			var swiper = new Swiper('.swiper-container2', {
		        slidesPerView: 3.3,
		        paginationClickable: true,
		        spaceBetween: 0 
		    });


			if(cardData==""){
				$(".noMeber").show();
				$(".yearCard").hide();
			}else{
				$(".noMeber").hide();
				$(".yearCard").show();
				for(var i in cardData){
					
					var state = cardData[i].selected_state==1?"checked":"disabled";

					cardHtml+='<label><input type="checkbox" '+state+' comindex='+comId+' cardindex='+cardData[i].card_id+' selectindex='+cardData[i].selected_state+' chosindex='+cardData[i].is_choose+'><div>'+cardData[i].card_title_new+'</div></label>';
				
				}
				$(".yearCard").html(cardHtml);
				$ched = $('.card input');
				$('.card').on('change','input',function(){
					// if($ched.eq(1).prop('checked')){
					// 	$('.card input').eq(2).prop('checked',false);
					// }
					// $('.card input').eq(2).prop('disabled',$ched.eq(1).prop('checked'));
					
					comId=$(this).attr("comindex");
					cardId=$(this).attr("cardindex");
					selId=$(this).attr("selectindex");
					chosId=$(this).attr("chosindex");
					if(chosId==1){
						if(selId==1){
							selId=0;
							
						}else {
							selId=1;

						}
						$.ajax({
							url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV77/editCardOrder',
							type:'GET',
							datatype:'json',
							data:{
								login_user_id:userId,
								combined_order_id:comId,
								card_id:cardId,
								selected_state:selId,
							},
							success:function(data){
								cardHtml = '';
								var data=JSON.parse(data);
								var res=data.data;
								console.log(res);
								var rescard=res.card_info;
								
								if(res.rent_info.is_rent==1){
									$(".noMeber").show();
								}else{
									$(".noMeber").hide();
								}
								
								for(var i in rescard){
										var state = rescard[i].selected_state==1?"checked":"";
										cardHtml+='<label><input type="checkbox" '+state+' comindex='+comId+' cardindex='+rescard[i].card_id+' selectindex='+rescard[i].selected_state+' chosindex='+rescard[i].is_choose+'><div>'+rescard[i].card_title_new+'</div></label>';
										
								}
								$(".yearCard").html(cardHtml);

								copHtml=""
								var monData=res.combined_order_price;
								copHtml+='<ul><li><span>'+monData.sell_price_title+'</span><span>'+monData.sell_price+'</span></li><li><span>'+monData.battery_price_title+'</span><span>'+monData.battery_price+'</span></li><li><span>'+monData.service_price_tile+'</span><span>'+monData.service_price+'</span></li><li><span>'+monData.need_price_title+'</span><span>'+monData.need_price+'</span></li><li><span>'+monData.total_price_price+'</span><span>'+monData.total_price+'</span></li></ul>';	
								$(".money").html(copHtml);

							}
						})
					}



				})
			}

			
			if(battData!=""){
				console.log(battData)
				$(".battery").show();
				for(var i in battData){
					battHtml+='<label class="rad_label batterybtn" name='+battData[i].order_id+' ordindex='+battData[i].order_id+' brandindex='+battData[i].battery_brand+' isindex='+battData[i].is_battery+'><input type="checkbox" name='+battData[i].order_id+' /><div>'+battData[i].battery_title+'</div></label>';
				}
				$(".battery").html(battHtml);

				$(".battery").on('change','input',function(){
					ordId=$(this).parent('label').attr("ordindex");
					brandId=$(this).parent('label').attr("brandindex");
					isId=$(this).parent('label').attr("isindex");
					var s = $(this).prop('checked');
					if(s){
						$(this).parent().siblings('[ordindex='+ordId+']').find('input').prop('checked',false);
						isId=1
					}else{
						isId=0;
					}
					console.log(userId);
					$.ajax({
						url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV77/editOrderBattery',
						data:{
							login_user_id:userId,
							order_id:ordId,
							battery_brand:brandId,
							is_battery:isId
						},
						type:'GET',
						success:function(data){
							copHtml=""
							var data=JSON.parse(data);
							console.log(data);
							var monData=data.data.combined_order_price;
							copHtml+='<ul><li><span>'+monData.sell_price_title+'</span><span>'+monData.sell_price+'</span></li><li><span>'+monData.battery_price_title+'</span><span>'+monData.battery_price+'</span></li><li><span>'+monData.service_price_tile+'</span><span>'+monData.service_price+'</span></li><li><span>'+monData.need_price_title+'</span><span>'+monData.need_price+'</span></li><li><span>'+monData.total_price_price+'</span><span>'+monData.total_price+'</span></li></ul>';	
							$(".money").html(copHtml);
						}
					})
				})
			}else{

			}


			copHtml+='<ul><li><span>'+copData.sell_price_title+'</span><span>'+copData.sell_price+'</span></li><li><span>'+copData.battery_price_title+'</span><span>'+copData.battery_price+'</span></li><li><span>'+copData.service_price_tile+'</span><span>'+copData.service_price+'</span></li><li><span>'+copData.need_price_title+'</span><span>'+copData.need_price+'</span></li><li><span>'+copData.total_price_price+'</span><span>'+copData.total_price+'</span></li></ul>';
			
			$(".money").html(copHtml);			


			for(var i in wajuData){
				if(wajuData[i].size_img_thumb){
					newtoyHtml+='<ul><li><dl><dt><img src="'+wajuData[i].img_thumb+'"></dt><a class="xing"><img src="'+wajuData[i].size_img_thumb+'"></a><dd><span>'+wajuData[i].business_title+'</span><span><a>￥</a>'+wajuData[i].sell_price+'</span></dd></dl><a class="remove">删除</a></li></ul>';
				}else{
					newtoyHtml+='<ul><li><dl><dt><img src="'+wajuData[i].img_thumb+'"></dt><dd><span>'+wajuData[i].business_title+'</span><span><a>￥</a>'+wajuData[i].sell_price+'</span></dd></dl><a class="remove">删除</a></li></ul>';
				}
				
			}
			$(".newToymain").html(newtoyHtml)
			


		}
	})

	$(".addresss").on("click",function(){
		window.location.href='http://www.meimei.yihaoss.top/H5/toy_count/address.html?login_user_id='+userId+'&business_id='+businessId+'&combined_order_id='+comborder+'&order_id='+orderId+'&source='+sour;
	})
			
	$(".toy").on("click",function(){
		$(".mask").show();
		$(".newToy").show();
	})

	$(".newToyhead").on("click",".close",function(){
		$(".mask").hide();
		$(".newToy").hide();
	})

	var min=10;
	var max=60;
	function createData(){
		var num=max-min;
		
		for(var i=min;i<=max;i++){
			data[i]={
				'id':'1000'+i,
				'value':i+'天'
			}
		}
		return data;
	}
	createData(min,max);

	var showBankDom = document.querySelector('#showDate');
    var bankIdDom = document.querySelector('#bankId');
    var date= document.querySelector('#riqidata');
    $("#showDate").on("click",function(){
        var bankId = showBankDom.dataset['id'];
        var bankName = showBankDom.dataset['value'];

        var bankSelect = new IosSelect(1, 
            [data],
            {
                container: '.container',
                title: '日期选择',
                itemHeight: 50,
                itemShowCount: 3,
                oneLevelId: bankId,
                callback: function (selectOneObj) {
                    bankIdDom.value = selectOneObj.id;
                    date.innerHTML = selectOneObj.value;
                    showBankDom.dataset['id'] = selectOneObj.id;
                    showBankDom.dataset['value'] = selectOneObj.value;
                    $.ajax({
						url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV77/editOrderRentDay',
						type:'post',
						data:{
							login_user_id:userId,
							combined_order_id:comId,
							rent_day:selectOneObj.value
						},
						datatype:'json',
						success:function(data){
							copHtml="";
							var data=JSON.parse(data);
							console.log(data);
							var moneyData=data.data;
							
							copHtml+='<ul><li><span>'+moneyData.sell_price_title+'</span><span>'+moneyData.sell_price+'</span></li><li><span>'+moneyData.battery_price_title+'</span><span>'+moneyData.battery_price+'</span></li><li><span>'+moneyData.service_price_tile+'</span><span>'+moneyData.service_price+'</span></li><li><span>'+moneyData.need_price_title+'</span><span>'+moneyData.need_price+'</span></li><li><span>'+moneyData.total_price_price+'</span><span>'+moneyData.total_price+'</span></li></ul>';
			
							$(".money").html(copHtml);		
						}
					})

                }
        });
    });
		
});