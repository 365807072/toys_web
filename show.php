	<?php 
	$agent = strtolower($_SERVER['HTTP_USER_AGENT']);
	 $type = 'other';
	 if(strpos($agent, 'iphone') || strpos($agent, 'ipad')){
		$type = "https://itunes.apple.com/cn/app/bao-bao-xiu-xiu/id789847552?mt=8";
	 }elseif(strpos($agent, 'android')){
		$type = "http://www.meimei.yihaoss.top/download/BabyShow_v8.9.5.apk";
	 }else{
		$type="http://www.meimei.yihaoss.top";
	 }
	echo $type;
	
   ?>
   
  <script>
  
  window.location.href = "<?php echo $type;?>";
  </script>