$(function(){
	var listData="";
	var dataOrder="";
	var dataTitle="";
	var dataStatus="";
	var dataNum="";
	var dataName="";
	var mainHtml="";
	var middleHtml="";
	var bottomHtml="";
	var _file="";
	var urlData="";
	var imgUrl="";
	var fileList="";
	var url = location.href;
	url = url.substring(url.indexOf("?")+1).split("&");
	var dataOrder = url[0].substring(url[0].indexOf("=")+1);

	$.ajax({
		url:'http://api.baobaoshowshow.com/index.php?r=WebBaoShow/getToysOrderListing&order_id='+dataOrder,
		type:'GET',
		datatype:'json',
		success:function(data){
		    listData=JSON.parse(data);
		    dataTitle=listData.data.business_title;
		    dataStatus=listData.data.status;
		    dataNum=listData.data.order_num;
		    dataName=listData.data.status_name;
			mainHtml="<p><span>订单单号:</span><span>"+dataNum+"</span></p><p><span>订单名称:</span><span>"+dataTitle+"</span></p><p><span>"+dataName+"</span><span><img src='img/2.png'></span></p><p><label for='file' id='showDiv'><img src='img/3.png'></label><input type='file' id='file' name='img1'></p>";
			$(".main").html(mainHtml);
			middleHtml="<p>备注:<input type='text'></p>";
			$(".middle").html(middleHtml);
			bottomHtml="<p><a id='btn'>确定</a></p>";
			$(".bottom").html(bottomHtml);
			
			 _file = document.querySelector('#file');
				
			 _file.onchange=function(){
				fileList = document.getElementById("file").files[0];
				console.log(fileList);
				var reader = new FileReader();
				reader.onload = function (){
					urlData = this.result;
					$("#showDiv img").hide();
					document.getElementById("showDiv").innerHTML += "<img src = '" + urlData + "'/>";
				}
				reader.readAsDataURL(fileList);
			}
		}
	})

//http://api.baobaoshowshow.com/index.php?r=WebBaoShow/PubOrderDetail
	$(".bottom").on("click","#btn",function(){

		$.ajax({
			url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV10/PubOrderDetail',
			type:'POST',
			datatype:'json',
			data:{
				'order_id':dataOrder,
				'status':dataStatus,
				'img1':fileList
			},
			success:function(data){
				var data=JSON.parse(data);
				console.log(data);
			}
		})
	})
})

	



// $(function(){
// 	var listData="";
// 	var dataOrder="";
// 	var dataTitle="";
// 	var dataStatus="";
// 	var dataNum="";
// 	var dataName="";
// 	var mainHtml="";
// 	var middleHtml="";
// 	var bottomHtml="";
// 	var _file="";
// 	var urlData="";
// 	var imgUrl="";
// 	var url = location.href;
// 	url = url.substring(url.indexOf("?")+1).split("&");
// 	var dataOrder = url[0].substring(url[0].indexOf("=")+1);

// 	$.ajax({
// 		url:'http://api.baobaoshowshow.com/index.php?r=WebBaoShow/getToysOrderListing&order_id='+dataOrder,
// 		type:'GET',
// 		datatype:'json',
// 		success:function(data){
// 		    listData=JSON.parse(data);
// 		    dataTitle=listData.data.business_title;
// 		    dataStatus=listData.data.status;
// 		    dataNum=listData.data.order_num;
// 		    dataName=listData.data.status_name;

// 			mainHtml="<p><span>订单单号:</span><span>"+dataNum+"</span></p><p><span>订单名称:</span><span>"+dataTitle+"</span></p><p><span>"+dataName+"</span><span><img src='img/2.png'></span></p>";
// 			$(".main").html(mainHtml);
// 			middleHtml="<p>备注:<input type='text'></p>";
// 			$(".middle").html(middleHtml);
// 			bottomHtml="<p><a id='btn'>确定</a></p>";
// 			$(".bottom").html(bottomHtml);
			
// 		}
// 	})


// 	var uploader = WebUploader.create({
// 			swf: './js/Uploader.swf',
// 			server: 'http://api.baobaoshowshow.com/index.php?r=BabyShowV10/PubOrderDetail',
// 			pick: '#picker',
// 			auto : true
// 		});
// 		uploader.on( 'fileQueued', function( file ) {
// 		    $('#thelist').append('<div id="' + file.id + '" class="item">' +
// 		        '<h4 class="info">' + file.name + '</h4>' +
// 		        '<p class="state">等待上传...</p>' +
// 		    '</div>');
		    
// 		});
		
// 		uploader.on( 'uploadProgress', function( file, percentage ) {
// 		    var $li = $( '#'+file.id ),
// 		        $percent = $li.find('.progress .progress-bar');
		
// 		    if ( !$percent.length ) {
// 		        $percent = $('<div class="progress progress-striped active">' +
// 		          '<div class="progress-bar" role="progressbar" style="width: 0%">' +
// 		          '</div>' +
// 		        '</div>').appendTo( $li ).find('.progress-bar');
// 		    }
		
// 		    $li.find('p.state').text('上传中');
		
// 		    $percent.css( 'width', percentage * 100 + '%' );
// 		});
		
// 		uploader.on( 'uploadSuccess', function( file ) {
// 		    $( '#'+file.id ).find('p.state').text('已上传');
// 		});
		
// 		uploader.on( 'uploadError', function( file ) {
// 		    $( '#'+file.id ).find('p.state').text('上传出错');
// 		});
		

// 	$(".bottom").on("click","#btn",function(){
// 		urlData=$(".item").val();
// 		console.log(urlData);
// 		$.ajax({
// 			url:'http://api.baobaoshowshow.com/index.php?r=BabyShowV10/PubOrderDetail',
// 			type:'POST',
// 			datatype:'json',
// 			data:{
// 				'order_id':dataOrder,
// 				'status':dataStatus,
// 				'img1':urlData,
// 			},
// 			success:function(data){
// 				var data=JSON.parse(data);
// 				console.log(data);
// 			}
// 		})
// 	})
// })

	

















