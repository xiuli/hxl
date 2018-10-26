<?php
    include '../../api/connect.php';
	include '../../api/global.func.php';
    include './banner_func.php';

    mysqli_select_db($con,'banner');

	//$state = 'modify';

    empty_type($type);
    empty_state($state);
	empty_place($place);


	if(!($type == 1 || $type == 2 || $type == 3 || $type == 4 || $type == 5 || $type == 6 || $type == 7)){
		$error = '{"state":"0","message":"type参数不对哦"}';
		echo $error;
		exit;
	}
	if($state != 'modify'){
		$error = '{"state":"0","message":"state参数不对哦"}';
		echo $error;
		exit;
	}


    if($type == 1){ // pc首页
		switch($place){
			case 1: // 轮播图
				empty_modify_type($modify_type);
                empty_id($id);

				if($modify_type == 'temp_num'){
					empty_title($title);
					empty_href($href);
					empty_img_url($img_url);
					empty_start_time($start_time);
					empty_end_time($end_time);

					$sql = "update banner set title='$title',href='$href',img_url='$img_url',start_time='$start_time',end_time='$end_time' where id='$id'";
				}else{
					empty_num($num);
					
					$sql = "update banner set num='$num' where id='$id'";
				}
				
				//echo 'pc首页-轮播图';
				break;
			case 2: // 热门课程
                empty_title($title);
				empty_href($href);
				empty_img_url($img_url);
				empty_id($id);

				$sql = "update banner set title='$title',href='$href',img_url='$img_url' where id='$id'";

				//echo 'pc首页-热门课程';
				break;
			case 3: // 顶部横幅
                empty_title($title);
				empty_href($href);
				empty_img_url($img_url);
				empty_start_time($start_time);
				empty_end_time($end_time);
                empty_id($id);

				$sql = "update banner set title='$title',href='$href',img_url='$img_url',start_time='$start_time',end_time='$end_time' where id='$id'";

				//echo 'pc首页-顶部横幅';
				break;
			case 4: // 普通横幅
                empty_title($title);
				empty_href($href);
				empty_img_url($img_url);
                empty_id($id);

				$sql = "update banner set title='$title',href='$href',img_url='$img_url' where id='$id'";

				//echo 'pc首页-普通横幅';
				break;
			default:
				echo '{"state":"0","message":"place参数有误"}';
				exit;
		}
    }else if($type == 2){ // m站banner
        if($place == 1){
			empty_modify_type($modify_type);
            empty_id($id);

			if($modify_type == 'temp_num'){
				empty_title($title);
				empty_href($href);
				empty_img_url($img_url);
				empty_start_time($start_time);
				empty_end_time($end_time);
				empty_province_id($province_id);
				empty_recommend($recommend);

				$sql = "update banner set title='$title',href='$href',img_url='$img_url',start_time='$start_time',end_time='$end_time',recommend='$recommend',province_id='$province_id' where id='$id'";
			}else{
				empty_num($num);

				$sql = "update banner set num='$num' where id='$id'";
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
				empty_modify_type($modify_type);
                empty_id($id);

				if($modify_type == 'temp_num'){
					empty_title($title);
					empty_href($href);
					empty_img_url($img_url);
					empty_start_time($start_time);
					empty_end_time($end_time);
					empty_province_id($province_id);
					empty_recommend($recommend);
					empty_exam_type($exam_type);

					$sql = "update banner set title='$title',href='$href',img_url='$img_url',start_time='$start_time',end_time='$end_time',recommend='$recommend',province_id='$province_id',exam_type='$exam_type' where id='$id'";
				}else{
					empty_num($num);

					$sql = "update banner set num='$num' where id='$id'";
				}

				echo 'pc地方站-轮播图';
				break;
			case 2: // 横幅
                empty_title($title);
				empty_href($href);
				empty_img_url($img_url);
				empty_id($id);

				$sql = "update banner set title='$title',href='$href',img_url='$img_url' where id='$id'";

				echo 'pc地方站-横幅';
				break;
			default:
				echo 'place参数有误';
		}
	}else if($type == 4){ // pc直播课堂
        if($place == 1){
			empty_modify_type($modify_type);
            empty_id($id);

			if($modify_type == 'temp_num'){
				empty_title($title);
				empty_href($href);
				empty_img_url($img_url);
				empty_start_time($start_time);
				empty_end_time($end_time);
				empty_province_id($province_id);
				empty_recommend($recommend);

				$sql = "update banner set title='$title',href='$href',img_url='$img_url',start_time='$start_time',end_time='$end_time',recommend='$recommend',province_id='$province_id' where id='$id'";
			}else{
				empty_num($num);

				$sql = "update banner set num='$num' where id='$id'";
			}

            echo 'pc直播课堂';
        }else{
            $error = '{"state":"0","message":"place参数有误"}';
			echo $error;
			exit;
        }
	}else if($type == 5){ // pc端class页面
		switch($place){
			case 1: // 视频课程
                empty_title($title);
				empty_href($href);
				empty_img_url($img_url);
                empty_id($id);

				$sql = "update banner set title='$title',href='$href',img_url='$img_url' where id='$id'";

				echo 'pc端class页面-视频课程';
				break;
			case 2: // 直播课程
                empty_title($title);
				empty_href($href);
				empty_img_url($img_url);
                empty_id($id);

				$sql = "update banner set title='$title',href='$href',img_url='$img_url' where id='$id'";

				echo 'pc端class页面-直播课程';
				break;
			case 3: // 教师资格
                empty_title($title);
				empty_href($href);
				empty_img_url($img_url);
                empty_id($id);

				$sql = "update banner set title='$title',href='$href',img_url='$img_url' where id='$id'";

				echo 'pc端class页面-教师资格';
				break;
			case 4: // 教师招聘
                empty_title($title);
				empty_href($href);
				empty_img_url($img_url);
                empty_id($id);

				$sql = "update banner set title='$title',href='$href',img_url='$img_url' where id='$id'";

				echo 'pc端class页面-教师招聘';
				break;
			case 5: // 特岗教师
                empty_title($title);
				empty_href($href);
				empty_img_url($img_url);
                empty_id($id);

				$sql = "update banner set title='$title',href='$href',img_url='$img_url' where id='$id'";

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
				empty_modify_type($modify_type);
                empty_id($id);

				if($modify_type == 'temp_num'){
					empty_title($title);
					empty_href($href);
					empty_img_url($img_url);
					empty_start_time($start_time);
					empty_end_time($end_time);

					$sql = "update banner set title='$title',href='$href',img_url='$img_url',start_time='$start_time',end_time='$end_time' where id='$id'";
				}else{
					empty_num($num);
					$sql = "update banner set num='$num' where id='$id'";
				}

				echo 'pc招聘页面-轮播图';
				break;
			case 2: // 横幅
                empty_title($title);
				empty_href($href);
				empty_img_url($img_url);
                empty_id($id);

				$sql = "update banner set title='$title',href='$href',img_url='$img_url' where id='$id'";

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
				empty_modify_type($modify_type);
                empty_id($id);

				if($modify_type == 'temp_num'){
					empty_title($title);
					empty_href($href);
					empty_img_url($img_url);
					empty_start_time($start_time);
					empty_end_time($end_time);

					$sql = "update banner set title='$title',href='$href',img_url='$img_url',start_time='$start_time',end_time='$end_time' where id='$id'";
				}else{
					empty_num($num);

					$sql = "update banner set num='$num' where id='$id'";
				}

				echo 'pc资格页面-轮播图';
				break;
			case 2: // 横幅
                empty_title($title);
				empty_href($href);
				empty_img_url($img_url);		
                empty_id($id);

				$sql = "update banner set title='$title',href='$href',img_url='$img_url' where id='$id'";

				echo 'pc资格页面-横幅';
				break;
			default:
				$error = '{"state":"0","message":"place参数有误"}';
                echo $error;
                exit;
		}
	}

	$res = mysqli_query( $con, $sql);
	if($res){
		echo '{"state":"1","message":"修改成功"}';
	}else{
		echo '{"state":"0","message":"修改失败"}';
	}
	mysqli_close($con);
?>