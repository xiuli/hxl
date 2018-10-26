<?php
    function empty_type($type){
		if (!isset($type)){
			$error = '{"state":"0","message":"type不能为空哦"}';
			echo $error;
			exit;
		}
	}
	function empty_state($state){
		if (!isset($state)){
			$error = '{"state":"0","message":"state不能为空哦"}';
			echo $error;
			exit;
		}
	}
	function empty_place($place){
		if (!isset($place)){
			$error = '{"state":"0","message":"place不能为空哦"}';
			echo $error;
			exit;
		}
	}
	function empty_title($title){
		if (!isset($title)){
			$error = '{"state":"0","message":"标题不能为空哦"}';
			echo $error;
			exit;
		}
	}
	function empty_start_time($start_time){
		if (!isset($start_time)){
			$error = '{"state":"0","message":"开始时间不能为空哦"}';
			echo $error;
			exit;
		}
	}
	function empty_end_time($end_time){
		if (!isset($end_time)){
			$error = '{"state":"0","message":"结束时间不能为空哦"}';
			echo $error;
			exit;
		}
	}
	function empty_num($num){
		if (!isset($num)){
			$error = '{"state":"0","message":"num不能为空哦"}';
			echo $error;
			exit;
		}
	}
	function empty_province_id($province_id){
		if (!isset($province_id)){
			$error = '{"state":"0","message":"省id不能为空哦"}';
			echo $error;
			exit;
		}else if($province_id > 0){ // 通用的时候，推荐默认是0
			$recommend = 0;
		}
	}
	function empty_exam_type($exam_type){
		if (!isset($exam_type)){
			$error = '{"state":"0","message":"考试类似不能为空哦"}';
			echo $error;
			exit;
		}else if(!($exam_type == 0 || $exam_type == 1 || $exam_type == 2 || $exam_type == 3 || $exam_type == 4)){
			// 0 1 2 3 4 分别表示：通用，招聘笔试，招聘面试，资格笔试，资格面试
			$error = '{"state":"0","message":"考试类似参数不对哦"}';
			echo $error;
			exit;
		}
	}
	function empty_recommend($recommend){
		if (!isset($recommend)){
			$error = '{"state":"0","message":"recommend不能为空哦"}';
			echo $error;
			exit;
		}else if(!($recommend == 0 || $recommend == 1)){ 
			// 0 1 分别表示：不推荐  推荐
			$error = '{"state":"0","message":"recommend参数不正确哦"}';
			echo $error;
			exit;
		}
	}
	function empty_img_url($img_url){
		if (!isset($img_url)){
			$error = '{"state":"0","message":"图片地址不能为空哦"}';
			echo $error;
			exit;
		}else if(!check_url($img_url)){
			$error = '{"state":"0","message":"图片地址不合法哦"}';
			echo $error;
			exit;
		}
	}
	function empty_href($href){
		if (!isset($href)){
			$error = '{"state":"0","message":"跳转路径不能为空哦"}';
			echo $error;
			exit;
		}else if(!check_url($href)){
			$error = '{"state":"0","message":"跳转路径不合法哦"}';
			echo $error;
			exit;
		}
	}
	function empty_id($id){
		if (!isset($id)){
			$error = '{"state":"0","message":"id不能为空哦"}';
			echo $error;
			exit;
		}
	}
	function empty_modify_type($modify_type){
		if (!isset($modify_type)){
			$error = '{"state":"0","message":"修改类型不能为空哦"}';
			echo $error;
			exit;
		}else if(!($modify_type == 'temp_num' || $modify_type == 'modify_num')){
			// temp_num modify_num 分别表示: 内容修改，输入框修改
			$error = '{"state":"0","message":"修改类似参数不正确哦"}';
			echo $error;
			exit;
		}
	}

	$type = trim(requestPost("type"));
	$state = trim(requestPost("state"));
    $place = trim(requestPost("place"));
    $title = trim(requestPost("title"));
    $start_time = trim(requestPost("start_time"));
    $end_time = trim(requestPost("end_time"));
    $num = trim(requestPost("num"));
    $province_id = trim(requestPost("province_id"));
    $exam_type = trim(requestPost("exam_type"));  // 地方站的四大类
    $recommend = trim(requestPost("recommend"));  // 推荐
    $img_url = trim(requestPost("img_url"));
    $href = trim(requestPost("href"));
    $id = trim(requestPost("id"));
	$modify_type = trim(requestPost("modify_type")); // temp_num modify_num 
	$page = trim(requestPost("page"));

	$time = time();
	$time = date("Y-m-d H:i:s",time());

	// $type = 1;
	// $place = 2;
	$title = 'pc首页-热门课程';
	$href = 'http://www.hxiuli.com';
	$img_url = 'http://www.huatu.com';
	$start_time = '2018-08-06 00:00:00';
	$end_time = '2018-08-06 00:00:00';
	$recommend = 1;
	// $id = 245;
	$province_id = 1;
	$exam_type = 2;
	//$num = 3;
	//$modify_type = 'modify_num';
?>