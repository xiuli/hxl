<?php
	header("Content-type: text/html; charset=utf-8");
	$con=mysqli_connect('127.0.0.1'.":".'3306','root','hxl2018$') or die('连接失败');
	date_default_timezone_set("PRC"); 

	$charset="set character_set_connection=utf8,character_set_results=utf8,character_set_client=binary";
	$con->query($charset);
?>