<?php
	header("Content-type: text/html; charset=utf-8");
	date_default_timezone_set("PRC");

	//strtotime() 将任何字符串形式的日期转化为时间戳
	$str='2015-05-20 15:21:23';
	echo strtotime($str).'<br>';
	$time=time();
	echo $time.'<br>';
	$t=time();
	echo $t.'<br>';
	echo "把时间戳转换成日期： " . date("Y-m-d H:i:s", $t);
	echo '<br>';

	//floatval — 获取变量的浮点值
	$var = '122.34343The';
	$float_value = floatval ($var);  
	echo $float_value.'<br>';

	// strip_tags 去掉html标签
	$str="hello <span>span</span>";
	echo strip_tags($str).'<br>';

	//htmlspecialchars  原样输出
	$str="hello <span>span</span>";
	echo htmlspecialchars($str).'<br>';

	//strstr  返回字符串剩余的部分
	echo strstr("Hello world hxl!","world").'<br>';  // world hxl!
	echo strstr("Hello world hxl!","world","true").'<br>';  // hello

	//str_replace 替换
	$arr = array("blue","red","red","green","yellow");
	print_r(str_replace("red","pink",$arr,$i));  //默认是全部
	echo "替换数：$i".'<br>';
	echo str_replace('or','','hello world').'<br>';

	$str="hxl<script>alert(1);</script>";
	$preg = "/<script[\s\S]*?<\/script>/i";
	$newstr = preg_replace($preg,"",$str); 
	echo $newstr.'<br>';

	// is_numric  是否是数字
	$str="0";
	$strTest=is_numeric($str);
	var_dump($strTest);

	// is_bool();//判断是否为布尔型
	// is_float(); //判断是否为浮点型
	// is_int(); //判断是否为整型
	// is_numeric(); //判断是否为数值型
	// is_string(); //判断是否为字符串
	// is_array(); //判断是否为数组
	// is_object(); //判断是否为对象

	$reg = "/^1[34578]\d{9}$/"; 
	$mobile = '18729211546  ';
	if(!preg_match("/^1[34578]\d{9}$/",$mobile)){
		echo '手机号格式不正确!';
	}else{
		echo '手机号格式正确!';
	}
?>