<?php
    include '../../api/connect.php';
	include '../../api/global.func.php';
    include './banner_func.php';

    mysqli_select_db($con,'banner');

     //$state = 'del';
	$del_bflag=false;

	empty_id($id);


	if($state != 'del'){
		echo '{"state":"0","message":"state参数不对哦"}';
		exit;
	}

	$sql = "select * from banner where id = '$id'";
	$result = $con -> query($sql);
	
	while($row=$result->fetch_assoc()){
		if($row['id'] == $id){
			$del_bflag = true;
		}
	}
	
	if($del_bflag){
		$sql = "DELETE FROM banner WHERE id = '$id'";
		$res = $con -> query($sql);

		if($res){
			echo '{"state":"1","message":"删除成功"}';
		}else{
			echo '{"state":"0","message":"删除失败"}';
		}
	}else{
		echo '{"state":"0","message":"该数据不存在"}';
	}

	mysqli_close($con);
?>