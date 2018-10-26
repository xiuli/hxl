function generate() {
    this.error = [];
    this.string = "";
    this._isMail = function(e) {
        var t = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        return t.test(e)
    };
    this._isTeleNum = function(e) {
        var t = /^(13[0-9]{9})|(15[89][0-9]{8})$/;
        return t.test(e)
    };
    this._isUrl = function(e) {
        var t = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + "(([0-9]{1,3}.){3}[0-9]{1,3}" + "|" + "([0-9a-z_!~*'()-]+.)*" + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." + "[a-z]{2,6})" + "(:[0-9]{1,4})?" + "((/?)|" + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        var n = new RegExp(t);
        return n.test(e)
    };
    this.getString = function() {
        return this.string
    };
    this.getError = function() {
        return this.error
    }
}



function Mode_url() {
    generate.apply(this);
    var e = $.trim($("#url_url").val());
    if (!e || e == "http://") this.error.push("网址不能为空!");
    this.string = e
}


var canvas = document.getElementById('canvas');
if (canvas && canvas.getContext) {
    if ($.browser.msie && $.browser.version == '9.0') {
        alert('开启此功能，请选用谷歌、火狐、Opera、Safari打开')
    }
    var canvasObj = new createQRImage('canvas');

    function emptyFn() {}
    function getStr(type) {
        var o = new window["Mode_" + type];
        return {
            str: o.getString(),
            error: o.getError()
        }
    }
    var timerCache = null;
    function execCanvas(callback) {
        clearTimeout(timerCache);
        timerCache = setTimeout(callback || emptyFn, 500)
    }
    function checkMode(type, callback) {
        callback = callback || emptyFn;
        var o = getStr(type);
        var str = o.str;
        var errors = [];
        errors = o.error;
        if (type == 'text' && str == '支持文本、网址和电子邮箱') {
            errors.push('文本不能为空');
            str = ''
        } else if (type == 'url' && str == 'http://') {
            errors.push('文本不能为空');
            str = ''
        }
        $('#apiText').attr('title', str);
        execCanvas(function() {
            canvasObj.changeText(str || 'http://m.liantu.com/', callback)
        })
    }
    function getround() {
        if ($('#diy_dot')[0]) {
            var level = parseInt($('#diy_dot').css('left')) + 5;
            var value = (Math.abs(135 - level) / 135) * 0.5;
            var isWater = level <= 135 ? true: false;
            canvasObj.setRound(isWater, value)
        }
    }


    $('#htmlVal').keyup(function() {
        var oUrl='http://mobile.hteacher.net/index.php?val=';
        $('#url_url').val(oUrl+$(this).val());
        checkMode('url', getround);
        //$('#url_url').trigger('keyup');
        console.log($('#url_url').val());
    });
}