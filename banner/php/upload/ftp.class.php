<?php
// --------------------------------------------------------------------------
// File name   : Ftp.class.php
// Description : FTP上传类
// Requirement : PHP5 (http://www.php.net)
// Copyright(C), gamezero.cn, 2008, All Rights Reserved.
// Author: Jipeng (jipeng001@hotmail.com) 
// --------------------------------------------------------------------------
//R FTP 处理;
class ftp {
//var $ftpUrl = 'upload.htexam.net';
var $weburl="www.hxiuli.com";
var $ftpUrl='47.98.36.172';
//var $ftpUser = 'uploaduser';
var $ftpUser='root';
//var $ftpPass = 'aa########123456^^^zzzzaaac';
var $ftpPass='hxl180520.';
var $ftpDir = '/';
var $ftpR = ''; //R ftp资源;
var $status = '';
//R 1:成功;2:无法连接ftp;3:用户错误;
function ftp($ftpUrl="", $ftpUser="", $ftpPass="", $ftpDir="") {
if($ftpUrl){
$this->ftpUrl=$ftpUrl;
}
if($ftpUser){
$this->ftpUser=$ftpUser;
}
if($ftpPass){
$this->ftpPass=$ftpPass;
}
if($ftpUrl){
$this->ftpDir=$ftpDir;
}
  // if ($this->ftpR = ftp_connect($this->ftpUrl, 1351)) {
 if ($this->ftpR = ftp_connect($this->ftpUrl, 1561)) {

    if (ftp_login($this->ftpR, $this->ftpUser, $this->ftpPass)) {
     if (!empty($this->ftpDir)) {
      ftp_chdir($this->ftpR, $this->ftpDir);
     }
     ftp_pasv($this->ftpR, true);//R 启用被动模式;
     $status = 1;
    } else {
     $status = 3;
    }
   } else {
    $status = 2;
   }
}


//判断目录是否存在
public function isFTPdir($path){
	
$dir = explode('/', $path);
$path = '';
$ret = true;
foreach($dir as $_dir){
$path .= '/' . $_dir;
/*if(!@ftp_chdir($this->_conn_id,$path)){
ftp_chdir($this->_conn_id, '/');
if(!ftp_mkdir($this->_conn_id, $path)){*/

if(!@ftp_chdir($this->ftpR,$path)){
ftp_chdir($this->ftpR, '/');
if(!ftp_mkdir($this->ftpR, $path)){
$ret = false;
echo 'mkdir false ' . $path;
break;
}
}
}
return $ret;
}


//R 切换目录;

function cd($dir) {
   return ftp_chdir($this->ftpR, $dir);
}
//R 返回当前路劲;
function pwd() {
   return ftp_pwd($this->ftpR);
}
//R 创建目录
function mkdir($directory) {
   return ftp_mkdir($this->ftpR,$directory);
}
//R 删除目录
function rmdir($directory) {
   return ftp_rmdir($this->ftpR,$directory);
}
//R 上传文件;
function put($localFile, $remoteFile = '') {
   if ($remoteFile == '') {
    $remoteFile = end(explode('/', $localFile));
   }
   $res = ftp_nb_put($this->ftpR, $remoteFile, $localFile, FTP_BINARY);
   while ($res == FTP_MOREDATA) {
    $res = ftp_nb_continue($this->ftpR);
   }
   if ($res == FTP_FINISHED) {
    return true;
   } elseif ($res == FTP_FAILED) {
    return false;
   }
}
//R 下载文件;
function get($remoteFile, $localFile='') {
   if ($localFile == '') {
    $localFile = end(explode('/', $remoteFile));
   }
   if (ftp_get($this->ftpR, $localFile, $remoteFile, FTP_BINARY)) {
    $flag = true;
   } else {
    $flag = false;
   }
   return $flag;
}
//R 文件大小;
function size($file) {
   return ftp_size($this->ftpR, $file);
}
//R 文件是否存在;
function isFile($file) {
   if ($this->size($file) >= 0) {
    return true;
   } else {
    return false;
   }
}
//R 文件时间
function fileTime($file) {
   return ftp_mdtm($this->ftpR, $file);
}
//R 删除文件;
function unlink($file) {
   return ftp_delete($this->ftpR, $file);
}
function nlist($dir = '/service/resource/') {
   return ftp_nlist($this->ftpR, $dir);
}

function geturl()
{
	return $this->weburl;
}
//R 关闭连接;
function bye() {
   return ftp_close($this->ftpR);
}
}
?>