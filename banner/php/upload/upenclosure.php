<?php
  include "./ftp.class.php";
  header("Content-Type: text/html;charset=utf-8");
 // include "getDuration.php";
	// Work-around for setting up a session because Flash Player doesn't send the cookies
	 if(phpversion()>='5.1.0')
   {
      date_default_timezone_set('Asia/Chongqing');
   }
	//上传文件类型列表


function reSizeImg($imgSrc, $resize_width, $resize_height, $isCut=false) {
 //图片的类型
 $type = substr ( strrchr ( $imgSrc, "." ), 1 );
 //初始化图象
 if ($type == "jpg") {
  $im = imagecreatefromjpeg ( $imgSrc );
 }
 if ($type == "gif") {
  $im = imagecreatefromgif ( $imgSrc );
 }
 if ($type == "png") {
  $im = imagecreatefrompng ( $imgSrc );
 }
 //目标图象地址
 $full_length = strlen ( $imgSrc );
 $type_length = strlen ( $type );
 $name_length = $full_length - $type_length;
 $name = substr ( $imgSrc, 0, $name_length - 1 );
 $dstimg = $name  ."." . $type;
 $width = imagesx ( $im );
 $height = imagesy ( $im );
 //生成图象
 //改变后的图象的比例
 $resize_ratio = ($resize_width) / ($resize_height);
 //实际图象的比例
 $ratio = ($width) / ($height);
 if (($isCut) == 1) //裁图
  {
  if ($ratio >= $resize_ratio) //高度优先
  {
   $newimg = imagecreatetruecolor ( $resize_width, $resize_height );
   imagecopyresampled ( $newimg, $im, 0, 0, 0, 0, $resize_width, $resize_height, (($height) * $resize_ratio), $height );
   ImageJpeg ( $newimg, $dstimg );
  }
  if ($ratio < $resize_ratio) //宽度优先
  {
   $newimg = imagecreatetruecolor ( $resize_width, $resize_height );
   imagecopyresampled ( $newimg, $im, 0, 0, 0, 0, $resize_width, $resize_height, $width, (($width) / $resize_ratio) );
   ImageJpeg ( $newimg, $dstimg );
  }
 } else //不裁图
 {
  if ($ratio >= $resize_ratio) {
   $newimg = imagecreatetruecolor ( $resize_width, ($resize_width) / $ratio );
   imagecopyresampled ( $newimg, $im, 0, 0, 0, 0, $resize_width, ($resize_width) / $ratio, $width, $height );
   ImageJpeg ( $newimg, $dstimg );
  }
  if ($ratio < $resize_ratio) {
   $newimg = imagecreatetruecolor ( ($resize_height) * $ratio, $resize_height );
   imagecopyresampled ( $newimg, $im, 0, 0, 0, 0, ($resize_height) * $ratio, $resize_height, $width, $height );
   ImageJpeg ( $newimg, $dstimg );
  }
 }
 ImageDestroy ( $im );
}
 
$uptypes=array(
    'image/jpg',
    'image/jpeg',
    'image/png',
	'image/gif'
);


 function testExt($C_filename)
 {
	$upExtypes=array(
	  'jpg',
	  'jpeg',
	  'gif',
 	  'png'
    );
    //echo $C_filename;exit;
	$lastdot = strrpos($C_filename,"."); //取出.最后出现的位置 
	$extended =strtolower(substr($C_filename, $lastdot+1));
    //echo $extended;
	if(!in_array($extended,$upExtypes))
	{
		return "0";
	}
	else
	{
		return "1";
	}
	
 } 
 
$max_file_size=4000000;     //上传文件大小限制, 单位BYTE
$destination_folder="./upImg/"; //上传文件路径
$watermark=0;      //是否附加水印(1为加水印,其他为不加水印);
$watertype=1;      //水印类型(1为文字,2为图片)
$waterposition=1;     //水印位置(1为左下角,2为右下角,3为左上角,4为右上角,5为居中);
$waterstring="http://www.htexam.net";  //水印字符串
$waterimg="xplore.gif";    //水印图片
$imgpreview=1;      //是否生成预览图(1为生成,其他为不生成);
$imgpreviewsize=1/2;    //缩略图比例

	// The Demos don't save files


	if(testExt($_FILES["upfile"]['name'])==0){
		echo '{"logo":"","error":"上传的文件类型不正确!"}';
		exit();
	}
    if (!is_uploaded_file($_FILES["upfile"]['tmp_name'])){ //是否存在文件
		echo '{"logo":"","error":"图片不存在!"}';
        exit;
    }
    $file = $_FILES["upfile"];
 
    if($max_file_size < $file["size"]){ //检查文件大小
		echo '{"logo":"","error":"文件太大!"}';
        exit;
    }
 
    if(!in_array($file["type"], $uptypes)){  //检查文件类型
		echo '{"logo":"","error":"文件类型不符!"}';
        exit;
    }
 
    if(!file_exists($destination_folder)){
        mkdir($destination_folder);
    }
 
 
	$upfile_name=$file["name"];
 
    $filename=$file["tmp_name"];
	
	
    //防iis解析漏洞
    if(strstr(strtolower($upfile_name),".asp")){
            echo '{"logo":"","error":"你上传的文件有敏感字符!"}';
            unlink($filename);
            exit();
    }

    if(strstr(strtolower($upfile_name),".asa")){
        echo '{"logo":"","error":"你上传的文件有敏感字符!"}';
        unlink($filename);
        exit();
    }

    if(strstr(strtolower($upfile_name),".aspx")){
        echo '{"logo":"","error":"你上传的文件有敏感字符!"}';
        unlink($filename);
        exit();
    }

    if(strstr(strtolower($upfile_name),".php")){
        echo '{"logo":"","error":"你上传的文件有敏感字符!"}';
        unlink($filename);
        exit();
    }

    if(strstr(strtolower($upfile_name),".cer")){
        echo '{"logo":"","error":"你上传的文件有敏感字符!"}';
        unlink($filename);
        exit();
    }

    if(strstr(strtolower($upfile_name),".cdx")){
        echo '{"logo":"","error":"你上传的文件有敏感字符!"}';
        unlink($filename);
        exit();
    }
    //结束防iis解析漏洞
	
	
	
	
    $image_size = getimagesize($filename);
    $pinfo=pathinfo($file["name"]);
    $ftype=$pinfo['extension'];
    $destination = $destination_folder.time().".".$ftype;

    $stored_path = 'http://www.hxiuli.com'.'/upload/'.basename($_FILES['upfile']['name']);
	
	// var_dump($filename);
	// var_dump($destination);exit;

    if (file_exists($destination) && $overwrite != true){
		 echo '{"logo":"","error":"同名文件已经存在了!"}';
        exit;
    }
 
    if(!move_uploaded_file ($filename, $stored_path)){

	   echo '{"logo":"","error":"移动文件出错!"}';
       exit;
    }
	
    //传到远程服务器
	// $newfilename=date("ymdhis"). rand(1,20000) . "." .$ftype;
    // $localfile=$destination;
	// $remotefile='/banner/'.$newfilename;
	// //echo $remotefile;
	// $ftp = new ftp();
    //  $ftpput = $ftp->put($localfile, $remotefile); //FTP上传原图到远程服务器
    //  if(!$ftpput){
    //    // echo "上传远程服务器失败!"; 
	// 	echo '{"logo":"","error":"上传远程服务器失败!"}';		
    //  }
	//  else
	//  {
	// 	 // echo "cccccc";
	//     //删除临时文件
	//    if(file_exists($destination)){
    //      unlink($destination);
    //    }
    //     //结束删除临时文件
	// 	  $destination="http://upload.hteacher.net" . $remotefile;
	//  }
    //  $ftp->bye(); //关闭FTP连接
	//结束转到远程服务器
	
    $pinfo=pathinfo($destination);
    $fname=$pinfo['basename'];

	echo '{"msg":"success","FileUrl":"'.$destination.'","TimeLength":"'.$TimeLength.'"}' ;

	exit(0);

?>