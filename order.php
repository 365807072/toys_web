<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/> <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
   
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" media="(device-height: 568px)">
            </head>
		

		<body>
     
	<?php 
	$conn = mysql_connect("115.29.48.94","liuwt","liuwt");
	$now_time=date("Y-m-d 00:00:00",time());
		if (!$conn)
		{
			die('Could not connect: ' . mysql_error());
		}
		mysql_select_db('quanquan_baby_show',$conn);
		mysql_query( 'set names utf8');
		$xdsql = "SELECT count(*) as count FROM `baby_order` where state='0' and create_time>'".$now_time."' and status in ('1','3')  and business_id in (280,398,403,414,415,417,419,420,421,501,504,552,554) ";
		$xdqueryRes = mysql_query($xdsql,$conn);
		while($row = mysql_fetch_array($xdqueryRes)) {
			echo "新都：".$row['count']."<br/>";
		}
		$hlgsql = "SELECT count(*) as count FROM `baby_order` where state='0' and create_time>'".$now_time."' and status in ('1','3')  and business_id in (34,55,58,68,76,82,88,91,353,357,372,373,374,383,385,386,387,390,391,392,393,394,395,396,399,401,404,405,406,409,410,411,422,439,440,461,467,490,498,499,500,503,505,506,508,509,510,512,513,514,528,529,536,540,543,548,550,553,555,556,557,558) ";
		$hlgqueryRes = mysql_query($hlgsql,$conn);
		while($row = mysql_fetch_array($hlgqueryRes)) {
			echo "回龙观：".$row['count']."<br/>";
		}
		$shsql = "SELECT count(*) as count FROM `baby_order` where state='0' and create_time>'".$now_time."' and status in ('1','3')  and business_id in (226,227,229,230,232,236,237,258,325,332,344,347,351,412,493,546) ";
		$shqueryRes = mysql_query($shsql,$conn);
		while($row = mysql_fetch_array($shqueryRes)) {
			echo "沙河：".$row['count']."<br/>";
		}
		$fzsql = "SELECT count(*) as count FROM `baby_order` where state='0' and create_time>'".$now_time."' and status in ('1','3')  and business_id in (194,219,240,272,442,443,445,446,447,452,465,466,468,469,478,495,502,515,516,537) ";
		$fzqueryRes = mysql_query($fzsql,$conn);
		while($row = mysql_fetch_array($fzqueryRes)) {
			echo "方庄：".$row['count']."<br/>";
		}
		$bjsql = "SELECT count(*) as count FROM `baby_order` where state='0' and create_time>'".$now_time."' and status in ('1','3')  and business_id in (190,195,197,206,209,222,225,298,335,355,361,365,366,367,368,369,370,470,507,545) ";
		$bjqueryRes = mysql_query($bjsql,$conn);
		while($row = mysql_fetch_array($bjqueryRes)) {
			echo "北七家：".$row['count']."<br/>";
		}
		$mqdsql = "SELECT count(*) as count FROM `baby_order` where state='0' and create_time>'".$now_time."' and status in ('1','3')  and business_id in (55) ";
		$mqdqueryRes = mysql_query($mqdsql,$conn);
		while($row = mysql_fetch_array($mqdqueryRes)) {
			echo " 豌豆苗儿童手工坊-万意百货店：".$row['count']."<br/>";
		}
		$xdmqdsql = "SELECT count(*) as count FROM `baby_order` where state='0' and create_time>'".$now_time."' and status in ('1','3')  and business_id in (504) ";
		$xdmqdqueryRes = mysql_query($xdmqdsql,$conn);
		while($row = mysql_fetch_array($xdmqdqueryRes)) {
			echo " 豌豆苗儿童手工坊-新都店：".$row['count']."<br/>";
		}
		$countsql = "SELECT count(*) as count FROM `baby_order` where state='0' and create_time>'".$now_time."' and status in ('1','3') ";
		$countqueryRes = mysql_query($countsql,$conn);
		while($row = mysql_fetch_array($countqueryRes)) {
			echo "总单：".$row['count']."<br/>";
		}	
	mysql_close($conn);
	?>
   
    </body>
</html>
