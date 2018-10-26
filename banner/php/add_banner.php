<?php
    include '../../api/connect.php';
	include '../../api/global.func.php';
	include './banner_func.php';

    mysqli_select_db($con,'banner');

	$state = 'add';

	empty_type($type);
	empty_state($state);
	empty_place($place);

	if(!($type == 1 || $type == 2 || $type == 3 || $type == 4 || $type == 5 || $type == 6 || $type == 7)){
		$error = '{"state":"0","message":"type参数不对哦"}';
		echo $error;
		exit;
	}
	if($state != 'add'){
		$error = '{"state":"0","message":"state参数不对哦"}';
		echo $error;
		exit;
	}

    if($type == 1){ // pc首页
		switch($place){
			case 1: // 轮播图
				empty_title($title);
				empty_href($href);
				empty_img_url($img_url);
				empty_start_time($start_time);
				empty_end_time($end_time);

				$sql = "select * from banner where title = '$title' and type = '$type' and place = '$place' ";
				$result = $con -> query($sql);
				
				while($row=$result->fetch_assoc()){
					if($row['title'] == $title){
						echo '{"state":"0","message":"该标题已存在"}';
						exit;
					}
				}

				$sql_insert = "insert into banner (type,place,title,href,img_url,start_time,end_time,num) values 
				('$type','$place','$title','$href','$img_url','$start_time','$end_time',0)";
				$res = $con -> query($sql_insert);
				if($res){
					echo '{"state":"0","message":"添加成功"}';
				}else{
					echo '{"state":"0","message":"添加失败"}';
				}
				echo 'pc首页-轮播图';
				break;
			case 2: // 热门课程 -- 不支持新增
				// $sql_insert = "insert into banner (type,place,title,href,img_url,num) values 
				// ('$type','$place','$title','$href','$img_url',0)";
				// $res = $con -> query($sql_insert);
				// if($res){
				// 	echo '{"state":"0","message":"添加成功"}';
				// }else{
				// 	echo '{"state":"0","message":"添加失败"}';
				// }
				echo 'pc首页-热门课程';
				break;
			case 3: // 顶部横幅
				empty_title($title);
				empty_href($href);
				empty_img_url($img_url);
				empty_start_time($start_time);
				empty_end_time($end_time);

				$sql = "select * from banner where title = '$title' and type = '$type' and place = '$place' ";
				$result = $con -> query($sql);
				
				while($row=$result->fetch_assoc()){
					if($row['title'] == $title){
						echo '{"state":"0","message":"该标题已存在"}';
						exit;
					}
				}


				$sql_insert = "insert into banner (type,place,title,href,img_url,start_time,end_time,num) values 
				('$type','$place','$title','$href','$img_url','$start_time','$end_time',0)";
				$res = $con -> query($sql_insert);
				if($res){
					echo '{"state":"0","message":"添加成功"}';
				}else{
					echo '{"state":"0","message":"添加失败"}';
				}
				echo 'pc首页-顶部横幅';
				break;
			case 4: // 普通横幅 -- 不支持新增
				echo 'pc首页-普通横幅';
				break;
			default:
				$error = '{"state":"0","message":"place参数有误"}';
				echo $error;
				exit;
		}
    }else if($type == 2){ // m站banner
		if($place == 1){
			empty_province_id($province_id);
			empty_title($title);
			empty_href($href);
			empty_img_url($img_url);
			empty_start_time($start_time);
			empty_end_time($end_time);
			empty_recommend($recommend);

			$sql = "select * from banner where title = '$title' and type = '$type' and place = '$place' and province_id = '$province_id'";
			$result = $con -> query($sql);
			
			while($row=$result->fetch_assoc()){
				if($row['title'] == $title){
					echo '{"state":"0","message":"该标题已存在"}';
					exit;
				}
			}

			$sql_insert = "insert into banner (type,place,title,href,img_url,start_time,end_time,num,province_id,recommend) values ('$type','$place','$title','$href','$img_url','$start_time','$end_time',0,'$province_id','$recommend')";
			$res = $con -> query($sql_insert);
			if($res){
				echo '{"state":"0","message":"添加成功"}';
			}else{
				echo '{"state":"0","message":"添加失败"}';
			}

            echo 'm站banner';
        }else{
            $error = '{"state":"0","message":"place参数有误"}';
			echo $error;
			exit;
        }
	}else if($type == 3){ // pc地方站
		switch($place){
			case 1: // 轮播图
				empty_province_id($province_id);
				empty_title($title);
				empty_href($href);
				empty_img_url($img_url);
				empty_start_time($start_time);
				empty_end_time($end_time);
				empty_recommend($recommend);
				empty_exam_type($exam_type);

				$sql = "select * from banner where title = '$title' and type = '$type' and place = '$place' and province_id = '$province_id' and exam_type = '$exam_type'";
				$result = $con -> query($sql);
				
				while($row=$result->fetch_assoc()){
					if($row['title'] == $title){
						echo '{"state":"0","message":"该标题已存在"}';
						exit;
					}
				}

				$sql_insert = "insert into banner (type,place,title,href,img_url,start_time,end_time,num,province_id,recommend,exam_type) values ('$type','$place','$title','$href','$img_url','$start_time','$end_time',0,'$province_id','$recommend','$exam_type')";

				$res = $con -> query($sql_insert);

				if($res){
					echo '{"state":"0","message":"添加成功"}';
				}else{
					echo '{"state":"0","message":"添加失败"}';
				}

				echo 'pc地方站-轮播图';
				break;
			case 2: // 横幅 -- 不支持新增
				echo 'pc地方站-横幅';
				break;
			default:
				$error = '{"state":"0","message":"place参数有误"}';
				echo $error;
				exit;
		}
	}else if($type == 4){ // pc直播课堂
		if($place == 1){
			empty_province_id($province_id);
			empty_title($title);
			empty_href($href);
			empty_img_url($img_url);
			empty_start_time($start_time);
			empty_end_time($end_time);
			empty_recommend($recommend);

			$sql = "select * from banner where title = '$title' and type = '$type' and place = '$place' and province_id = '$province_id'";
			$result = $con -> query($sql);
			
			while($row=$result->fetch_assoc()){
				if($row['title'] == $title){
					echo '{"state":"0","message":"该标题已存在"}';
					exit;
				}
			}

			$sql_insert = "insert into banner (type,place,title,href,img_url,start_time,end_time,num,province_id,recommend) values ('$type','$place','$title','$href','$img_url','$start_time','$end_time',0,'$province_id','$recommend')";

			$res = $con -> query($sql_insert);

			if($res){
				echo '{"state":"0","message":"添加成功"}';
			}else{
				echo '{"state":"0","message":"添加失败"}';
			}


            echo 'pc直播课堂';
        }else{
            $error = '{"state":"0","message":"place参数有误"}';
			echo $error;
			exit;
        }
	}else if($type == 5){ // pc端class页面
		switch($place){
			case 1: // 视频课程 -- 不支持新增
				echo 'pc端class页面-视频课程';
				break;
			case 2: // 直播课程 -- 不支持新增
				echo 'pc端class页面-直播课程';
				break;
			case 3: // 教师资格 -- 不支持新增
				echo 'pc端class页面-教师资格';
				break;
			case 4: // 教师招聘 -- 不支持新增
				echo 'pc端class页面-教师招聘';
				break;
			case 5: // 特岗教师 -- 不支持新增
				echo 'pc端class页面-特岗教师';
				break;
			default:
				$error = '{"state":"0","message":"place参数有误"}';
				echo $error;
				exit;
		}
	}else if($type == 6){ // pc招聘页面
		switch($place){
			case 1: // 轮播图
				empty_title($title);
				empty_href($href);
				empty_img_url($img_url);
				empty_start_time($start_time);
				empty_end_time($end_time);

				$sql = "select * from banner where title = '$title' and type = '$type' and place = '$place' ";
				$result = $con -> query($sql);
				
				while($row=$result->fetch_assoc()){
					if($row['title'] == $title){
						echo '{"state":"0","message":"该标题已存在"}';
						exit;
					}
				}

				$sql_insert = "insert into banner (type,place,title,href,img_url,start_time,end_time,num) values 
				('$type','$place','$title','$href','$img_url','$start_time','$end_time',0)";
				$res = $con -> query($sql_insert);
				if($res){
					echo '{"state":"0","message":"添加成功"}';
				}else{
					echo '{"state":"0","message":"添加失败"}';
				}
				
				echo 'pc招聘页面-轮播图';
				break;
			case 2: // 横幅 -- 不支持新增
				echo 'pc招聘页面-横幅';
				break;
			default:
				$error = '{"state":"0","message":"place参数有误"}';
				echo $error;
				exit;
		}
	}else if($type == 7){ // pc资格页面
		switch($place){
			case 1: // 轮播图
				empty_title($title);
				empty_href($href);
				empty_img_url($img_url);
				empty_start_time($start_time);
				empty_end_time($end_time);

				$sql = "select * from banner where title = '$title' and type = '$type' and place = '$place' ";
				$result = $con -> query($sql);
				
				while($row=$result->fetch_assoc()){
					if($row['title'] == $title){
						echo '{"state":"0","message":"该标题已存在"}';
						exit;
					}
				}

				$sql_insert = "insert into banner (type,place,title,href,img_url,start_time,end_time,num) values 
				('$type','$place','$title','$href','$img_url','$start_time','$end_time',0)";
				$res = $con -> query($sql_insert);
				if($res){
					echo '{"state":"0","message":"添加成功"}';
				}else{
					echo '{"state":"0","message":"添加失败"}';
				}

				echo 'pc资格页面-轮播图';
				break;
			case 2: // 横幅 -- 不支持新增
				echo 'pc资格页面-横幅';
				break;
			default:
				$error = '{"state":"0","message":"place参数有误"}';
				echo $error;
				exit;
		}
	}

	mysqli_close($con);
?>