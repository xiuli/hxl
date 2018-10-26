<?php
	$tg_display_list=array(1,4,5,8,9,13,15,17,18,19,23,24,27,30);
	$sydw_display_list=array(7,12,13,18,19,21,24,25,27,29,30,31);

	$provincenav=array(
	array("provinceid"=>1,"provincename"=>"北京"),
  	array("provinceid"=>2,"provincename"=>"上海"),
	array("provinceid"=>3,"provincename"=>"天津"),
	array("provinceid"=>4,"provincename"=>"重庆"),
	array("provinceid"=>5,"provincename"=>"河北"),
	array("provinceid"=>6,"provincename"=>"山西"),
	array("provinceid"=>7,"provincename"=>"内蒙古"),
	array("provinceid"=>8,"provincename"=>"辽宁"),
	array("provinceid"=>9,"provincename"=>"吉林"),
	array("provinceid"=>10,"provincename"=>"黑龙江"),
	array("provinceid"=>11,"provincename"=>"江苏"),
	array("provinceid"=>12,"provincename"=>"浙江"),
	array("provinceid"=>13,"provincename"=>"安徽"),
	array("provinceid"=>14,"provincename"=>"福建"),
	array("provinceid"=>15,"provincename"=>"江西"),
	array("provinceid"=>16,"provincename"=>"山东"),
	array("provinceid"=>17,"provincename"=>"河南"),
	array("provinceid"=>18,"provincename"=>"湖北"),
	array("provinceid"=>19,"provincename"=>"湖南"),
	array("provinceid"=>20,"provincename"=>"广东"),
	array("provinceid"=>21,"provincename"=>"广西"),
	array("provinceid"=>22,"provincename"=>"海南"),
	array("provinceid"=>23,"provincename"=>"四川"),
	array("provinceid"=>24,"provincename"=>"贵州"),
	array("provinceid"=>25,"provincename"=>"云南"),
	array("provinceid"=>26,"provincename"=>"西藏"),
	array("provinceid"=>27,"provincename"=>"陕西"),
	array("provinceid"=>28,"provincename"=>"甘肃"),
	array("provinceid"=>29,"provincename"=>"青海"),
	array("provinceid"=>30,"provincename"=>"宁夏"),
	array("provinceid"=>31,"provincename"=>"新疆"),
	array("provinceid"=>101,"provincename"=>"深圳")
	);

	$Province=$_GET['Province'];
	if(empty($Province)){
        echo 'Province参数不能为空哦';
		exit;
    }
	$NetClassCategoryId=$_GET['NetClassCategoryId'];
	if(empty($NetClassCategoryId)){
		echo 'NetClassCategoryId参数不能为空哦';
		exit;
	}
	$fxname="";
	foreach( $provincenav as $v){
		if(intval($Province)==$v["provinceid"]){
			$fxname=$v["provincename"];
		}
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon">
	<title>直播课堂</title>
	<link rel="stylesheet" href="./css/zbkt.css">
	<link rel="stylesheet" href="./js/layui/css/layui.css">
    <script src="./js/jquery.1.9.0.min.js"></script>
	<script src="./js/layui/layui.js"></script>
    <script src="./js/zbkt.js"></script>
</head>
<body>
	<div id="headers">
		<div class="wrap">
			<a href="/zbkt/index.php" class="logo" target="_blank"><img src="images/logo.png"></a>
			<a href="/zbkt/index.php" class="liveClass"><img src="images/logo2.png"></a>
			<div class="my" target="_blank">
				<p class="oArea_title"><?php echo $fxname;?></p>
				<div class="oArea">
					<?php
						foreach($provincenav as $v){
					?>
						<a <?php if($fxname==$v["provincename"]){?>class="active"<?php }?> data-href="index.php?Province=<?php echo $v["provinceid"];?>">
						<?php echo $v["provincename"]; ?>
						</a>
					<?php
						}
					?>
					
				</div>
			</div>
		</div>
	</div>
	
	<div id="class" class="clearfix">
		<h3 class="title">课程筛选<em></em></h3>
		<div class="class_nav clearfix" >
			<ul class="class_fl active">
				<li class="NetClassCategoryId clearfix active">
					<em>考试类型</em>
					<a href="javascript:void(0)" data-id="0">全部</a>
					<a href="javascript:void(0)" data-id="12">教师招聘</a>
					<a href="javascript:void(0)" data-id="19">教师资格证</a>
					<?php
					if(in_array(intval($Province),$tg_display_list)){
					?>
						<a href="javascript:void(0)" id="tgjs" data-id="21">特岗教师</a>
					<?php
					}
					?>
					<?php
					if(in_array(intval($Province),$sydw_display_list)){
					?>
						<a href="javascript:void(0)" id="sydw" data-id="29">事业单位D类</a>
					<?php
					}
					?>
					<a href="./index_fxminclass_new.php?Province=<?php echo $Province; ?>">模块微小课</a>
				</li>
				<li class="examType clearfix active">
					<em>课程分类</em>
					<a href="javascript:void(0)" class="current" data-id="0">全部</a>
					<a href="javascript:void(0)" data-id="1">笔试</a>
					<a href="javascript:void(0)" data-id="2">面试</a>
				</li>
				<li class="classPhase clearfix">
					<em>考试学段</em>
				</li>
				<li class="classType clearfix">
					<em>课程班型</em>
				</li>
				 <li class="subjectId clearfix">
					<em>考试科目</em>
					<div class="subjectId_box"></div>
            	</li>
			</ul>
		</div>
		<ol class="clearfix totle active">
			<li data-id="0" class="active">综合排序</li>
			<li data-id="1">0元课程</li>
			<li data-id="21">按销量</li>
			<li data-id="22">价格从低到高</li>
			<li data-id="23">价格从高到低</li>
		</ol>
	</div>
	<div class="class_list_box">
		<ul class="class_list clearfix">
		</ul>
		<div id="class-page" class="page-box"></div>
	</div>
	<div id="templeteImg">
		<img src="images/templete.png">
	</div>
</body>
</html>