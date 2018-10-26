<?php

$conn = mysqli_connect('127.0.0.1' . ":" . '3306', 'root', 'hxl2018$') or die('连接失败');
mysqli_select_db($conn, 'subway');
mysqli_query($conn, "set names utf8");

$name = $_POST['name'];
$phone = $_POST['phone'];

$conn->autocommit(false);

$sql = "update user set del = 1 where name = '{$name}' and phone = '{$phone}'";
$result = $conn->query($sql);

$sql2 = "insert into insert_user ( name, phone ) values ('{$name}', '{$phone}')";
$result2 = $conn->query($sql2);


if ($result && $result2) {
    $conn->commit();
    echo 0;
} else {
    $conn->rollback();
    echo -1;
}

$conn->autocommit(true);
$conn->close();

exit();