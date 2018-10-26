<?php

$conn = mysqli_connect('127.0.0.1' . ":" . '3306', 'root', 'hxl2018$') or die('连接失败');
mysqli_select_db($conn, 'subway');
mysqli_query($conn, "set names utf8");

$arr = array();

$sql = "select `name`,`phone` from user where del = 0";
$result = $conn->query($sql);
while ($row = mysqli_fetch_array($result)) {
    $arr[] = $row;
}

$conn->close();
echo json_encode($arr);
exit();