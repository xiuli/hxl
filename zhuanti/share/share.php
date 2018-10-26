<?php

//设置时区
date_default_timezone_set('Asia/Shanghai');

function wx_get_token() {
	$current = time();
	$arr=file_get_contents( "token.txt");
	$arrtoken=json_decode($arr,true);
	$token = $arrtoken['token'];
	if (($current-$arrtoken['time']>3600)||(empty($token))) {
	$res = file_get_contents('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.'wx2f01e99885346a02'.'&secret='.'b39db4749d9d95113cabaa2d4115279e');
	$res = json_decode($res, true);
	$token = $res['access_token'];
	$arr=array(
		"time"=> time(),
		"token"=>$token,
	);
	$fp=fopen("token.txt","wb");//教师资格证通用
	fwrite($fp,json_encode($arr));
	fclose($fp);
	}
	return $token;
}
function wx_get_jsapi_ticket(){
	$current = time();
    $ticket = "";
    do{
    	$arrtic=file_get_contents( "ticket.txt");
		$arrticket=json_decode($arrtic,true);
		$ticket = $arrticket['ticket'];
    	//$ticket=file_get_contents( "ticket.txt");
        //$ticket = S('wx_ticket');
        if (($current-$arrticket['time']<3600)) {
            break;
        }
        $arrto=file_get_contents( "token.txt");
		$arrtoken=json_decode($arrto,true);
		$token = $arrtoken['token'];
        //$token = S('access_token');
        if (($current-$arrtoken['time']>3600)||(empty($token))){
            wx_get_token();
        }
        $arrto=file_get_contents( "token.txt");
		$arrtoken=json_decode($arrto,true);
		$token = $arrtoken['token'];

        if (($current-$arrticket['time']>3600)||(empty($ticket))) {
        $url2 = sprintf("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi",
            $token);
        $res = file_get_contents($url2);
        $res = json_decode($res, true);
        $ticket = $res['ticket'];

        // 注意：这里需要将获取到的ticket缓存起来（或写到数据库中）
        // ticket和token一样，不能频繁的访问接口来获取，在每次获取后，我们把它保存起来。
        //S('wx_ticket',$ticket,3600);
        $arrt=array(
		"time"=> time(),
		"ticket"=>$ticket,
		);
        $fp=fopen("ticket.txt","wb");//教师资格证通用
		fwrite($fp,json_encode($arrt));
		fclose($fp);
		}
    }while(0);

    return $ticket;
}

$timestamp = time();
$wxnonceStr = "ceshi1234567";
$wxticket = wx_get_jsapi_ticket();
$wxOri = sprintf("jsapi_ticket=%s&noncestr=%s&timestamp=%s&url=%s",
    $wxticket, $wxnonceStr, $timestamp,
    'http://www.hxiuli.com'
    );
$wxSha1 = sha1($wxOri);
?>
