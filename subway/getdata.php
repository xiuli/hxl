<?php
    header("Content-type: text/html; charset=utf-8");  
    $startAddress=@$_POST['startAddress'];
    $endAddress=@$_POST['endAddress'];
    $address=@$_POST['address'];
    $lineAddress=@$_POST['lineAddress'];
    
    $conn=mysqli_connect('127.0.0.1'.":".'3306','root','hxl2018$') or die('连接失败');
   	mysqli_select_db($conn,'subway');
    mysqli_query($conn,"set names utf8");  
    

    if(!empty($address)){
        $arr=array();
        $sql="select * from station where address = '$address' ";
        $result = $conn->query($sql);
        while($row=mysqli_fetch_row($result)){
            $arr=$row;
	    }
        if(empty($arr)){
            echo '{"state":"0","message":"不存在当前站点哦"}';
            exit;
        }else{
            $json=json_encode($arr);
            echo $json;
        }
        exit();
    }

    if(!empty($lineAddress)){
        $arr=array();
        switch($lineAddress){
            case '一号线':
                $line=1;
                break;
            case '五号线':
                $line=5;
                break;
            default:
                $line=0;
        }
        if($line == 0){
           echo '{"state":"0","message":"不存在当前路线哦"}';
           exit();
        }else{
            $sql="select * from station where line like  '%$line%'";
            $result = $conn->query($sql);
            while($row=mysqli_fetch_array($result)){
                $arr[]=$row;
            }
            $json=json_encode($arr);
                echo($json);
            
            
            
                //echo $json;
        }
        exit();
    }

    if(!empty($startAddress)){
        $arrstart=array();
        $sql="select * from station where address = '$startAddress' ";
        $result = $conn->query($sql);
        while($row=mysqli_fetch_array($result)){
            $row[]="start";
            $arrstart[]=$row;
            $line1 = $row['line'];
	    }
        if(empty($arrstart)){
            echo '{"state":"0","message":"起点站不存在哦"}';
            exit;
        }

        $arrend=array();
        $sql="select * from station where address = '$endAddress' ";
        $result = $conn->query($sql); 
        while($row=mysqli_fetch_array($result)){
	    	$row[]="end";
            $arrend[]=$row;
            $line5=$row['line'];
	    }
        
        if(empty($arrend)){
            echo '{"state":"0","message":"终点站不存在哦"}';
            exit;
        }
        
        $arr=array_merge($arrstart,$arrend);
        if($line1 == $line5){
            $json=json_encode($arr);
            echo $json;
        }else{
            $sql="select * from station where line ='1,5' ";
            $result = $conn->query($sql); 
            while($row=mysqli_fetch_array($result)){
                $station=$row['address'];
            }
            $arr[]=array($station);
            $json=json_encode($arr);
            echo $json;
        }
        exit();
    }
    echo '参数异常';
    
?>