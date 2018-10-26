<?php
    include '../../api/connect.php';
	include '../../api/global.func.php';
    include './banner_func.php';

    mysqli_select_db($con,'banner');

    empty_type($type);
	empty_place($place);

	
	if(!empty($page)){ // 查询分页数据
		$sql = "select count(*) from banner where type = '$type' and place = '$place'";
		$result = $con -> query($sql);
		$tot = mysqli_fetch_row($result);
		mysqli_free_result($result);
		$length=$tot[0];

		$pageshow=10; //一页10条数据
		$pagesize = ($page-1) * $pageshow;  // 从哪开始

		$sql = "select * from banner where type = '$type' and place = '$place' order by add_time desc  limit $pagesize,$pageshow";
		$result = $con -> query($sql);
		while($row = $result -> fetch_assoc()){
			$page_datalist[]=array(
				"id" => $row["id"],
				"num" => $row["num"],
				"title" => $row["title"],
				"href" => $row["href"],
				"img_url" => $row["img_url"],
				"start_time" => $row["start_time"],
				"end_time" => $row["end_time"]
			);
		}
		$pagelist = array(
			"length" => $length,
			"data" => $page_datalist,
			"place" => $place,
			"type" => $type
		);
		echo json_encode($pagelist);
		exit;
	}
	

    if($type == 1){ // pc首页
		if($place == 'pc_index_all'){
			// 轮播图
			$sql = "select count(*) from banner where type = '$type' and place = 1";
			$result = $con -> query($sql);
			$tot = mysqli_fetch_row($result);
			mysqli_free_result($result);
			$length=$tot[0];

			$sql = "select * from banner where type = '$type' and place = 1 order by add_time desc  limit 0,10";
			$result = $con -> query($sql);
			while($row = $result -> fetch_assoc()){
				$pc_banner_datalist[]=array(
					"id" => $row["id"],
					"num" => $row["num"],
					"title" => $row["title"],
					"href" => $row["href"],
					"img_url" => $row["img_url"],
					"start_time" => $row["start_time"],
					"end_time" => $row["end_time"]
				);
			}
			$pc_index_banner = array(
				"length" => $length,
				"data" => $pc_banner_datalist,
				"id" => 1
			);

			// 热门课程
			$sql = "select * from banner where type = '$type' and place = 2";
			$result = $con -> query($sql);
			while($row = $result -> fetch_assoc()){
				$pc_rmkc_datalist[]=array(
					"id" => $row["id"],
					"num" => $row["num"],
					"title" => $row["title"],
					"href" => $row["href"],
					"img_url" => $row["img_url"]
				);
			}
			$pc_index_rmkc = array(
				"data" => $pc_rmkc_datalist,
				"id" => 2
			);

			// 顶部横幅
			$sql = "select count(*) from banner where type = '$type' and place = 3";
			$result = $con -> query($sql);
			$tot = mysqli_fetch_row($result);
			mysqli_free_result($result);
			$length=$tot[0];

			$sql = "select * from banner where type = '$type' and place = 3 order by add_time desc  limit 0,10";

			$result = $con -> query($sql);
			while($row = $result -> fetch_assoc()){
				$pc_headerhf_datalist[]=array(
					"id" => $row["id"],
					"title" => $row["title"],
					"href" => $row["href"],
					"img_url" => $row["img_url"],
					"start_time" => $row["start_time"],
					"end_time" => $row["end_time"]
				);
			}
			$pc_index_headerhf = array(
				"length" => $length,
				"data" => $pc_headerhf_datalist,
				"id" => 3
			);

			// 普通横幅
			$sql = "select * from banner where type = '$type' and place = 4";
			$result = $con -> query($sql);
			while($row = $result -> fetch_assoc()){
				$pc_hf_datalist[]=array(
					"id" => $row["id"],
					"title" => $row["title"],
					"href" => $row["href"],
					"img_url" => $row["img_url"]
				);
			}
			$pc_index_hf = array(
				"data" => $pc_hf_datalist,
				"id" => 4
			);

			// 总数据
			$pc_index=array(
				"pc_index_banner" => $pc_index_banner,
				"pc_index_rmkc" => $pc_index_rmkc,
				"pc_index_headerhf" => $pc_index_headerhf,
				"pc_index_hf" => $pc_index_hf,
				"state" => "1"
			);
			echo json_encode($pc_index);
		}else{
			echo '{"state":"0","message":"place参数不对哦"}';
			exit;
		}
		
    }else if($type == 2){ // m站banner
        if($place == 1){

            echo 'm站banner';
        }else{
            echo '{"state":"0","message":"place参数有误"}';
            exit;
        }
	}else if($type == 3){ // pc地方站
		switch($place){
			case 1: // 轮播图
                
				break;
			case 2: // 横幅  
				
				break;
			default:
				echo '{"state":"0","message":"place参数有误"}';
            	exit;
		}
	}else if($type == 4){ // pc直播课堂
        if($place == 1){
            
            echo 'pc直播课堂';
        }else{
            echo '{"state":"0","message":"place参数有误"}';
            exit;
        }
	}else if($type == 5){ // pc端class页面
		switch($place){
			case 1: // 视频课程  
				echo 'pc端class页面-视频课程';
				break;
			case 2: // 直播课程 
			
				echo 'pc端class页面-直播课程';
				break;
			case 3: // 教师资格 
			
				echo 'pc端class页面-教师资格';
				break;
			case 4: // 教师招聘 
			
				echo 'pc端class页面-教师招聘';
				break;
			case 5: // 特岗教师 
			
				echo 'pc端class页面-特岗教师';
				break;
			default:
                echo '{"state":"0","message":"place参数有误"}';
                exit;
		}
	}else if($type == 6){ // pc招聘页面
		switch($place){
			case 1: // 轮播图
				
				echo 'pc招聘页面-轮播图';
				break;
			case 2: // 横幅 
			
				echo 'pc招聘页面-横幅';
				break;
			default:
                echo '{"state":"0","message":"place参数有误"}';
                exit;
		}
	}else if($type == 7){ // pc资格页面
		switch($place){
			case 1: // 轮播图
				
				echo 'pc资格页面-轮播图';
				break;
			case 2: // 横幅
				echo 'pc资格页面-横幅';
				break;
			default:
                echo '{"state":"0","message":"place参数有误"}';
                exit;
		}
	}

	mysqli_close($con);
?>