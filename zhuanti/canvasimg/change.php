<?php
$base_img=$_POST["base_img"];
	//  $base_img是获取到前端传递的src里面的值，也就是我们的数据流文件
$base_img = str_replace('data:image/png;base64,', '', $base_img);
//  设置文件路径和文件前缀名称
$path = "./img/";
$prefix='ht_';
$output_file = $prefix.time().rand(100,999).'.png';
$path = $path.$output_file;
//  创建将数据流文件写入我们创建的文件内容中
/*$ifp = fopen( $path, "wb" );
fwrite( $ifp, base64_decode( $base_img) );
fclose( $ifp );*/
// 第二种方式
file_put_contents($path, base64_decode($base_img));
// 输出文件
echo $output_file;
?>