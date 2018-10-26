<?php
include "share.php";
?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="applicable-device" content="mobile" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
	<title>分享页面</title>
  <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon">
  <script src="/lib/jweixin-1.0.0.js"></script>
  <style>
    p{
      text-align:center;
      font-size:24px;
    }
  </style>
</head>
<body>

<p>可将当前页面分享至：微信好友，微信朋友圈，QQ好友，微博等</p>


<script type="text/javascript">
  var timestamp ='<?echo $timestamp ?>';
  var wxnonceStr  ='<?echo $wxnonceStr ?>';
  var wxShar ='<?echo $wxSha1 ?>';

  wx.config({
    debug: false, 
    appId: "wx2f01e99885346a02", 
    timestamp: timestamp, 
    nonceStr: wxnonceStr, 
    signature: wxShar,
    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo']
  });

  var title = '测试分享标题';
  var imgurl = 'http://www.hxiuli.com/images/favicon.ico';
  var link = 'http://www.hxiuli.com';
  var desc = '测试分享描述';
  wx.ready(function(){
    wx.checkJsApi({
      jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo'
      ]
    });
    /*朋友圈*/
    wx.onMenuShareTimeline({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgurl
    });
    /*微信朋友*/
    wx.onMenuShareAppMessage({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgurl
    });
    /*QQ*/
    wx.onMenuShareQQ({
      title: title,
      link: link,
      desc: desc,
      imgUrl: imgurl
    });
    /*微博*/
    wx.onMenuShareWeibo({
      title: title,
      link: link,
      desc: desc,
      imgUrl: imgurl,
    });
  });
</script>

</body>
</html>
