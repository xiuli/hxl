/*插件*/
/*常用函数*/
var common = {
  tab: function(oBtn, oList, oClass, oEvent) { /*选项卡*/
    oClass = oClass ? oClass : 'active';
    oEvent = oEvent ? oEvent : 'click';
    $(oBtn).on(oEvent, function() {
      $(this).addClass(oClass).siblings().removeClass(oClass);
      $(oList).children().eq($(this).index()).addClass(oClass).siblings().removeClass(oClass);
    });
  },
  rnd: function(m, n) { /*生成随机数*/
    n = n ? n : 0;
    return parseInt(Math.random() * (m - n)) + n;
  },
  toDouble: function(n) { /*补零函数*/
    return n < 10 ? '0' + n : '' + n;
  },
  get_ctime: function(ctime) { /*时间戳 转 年月日*/
    ctime = parseInt(ctime / 1000);
    c_time = "";
    var hour = parseInt(ctime / 3600);
    var min = parseInt((ctime - 3600 * hour) / 60);
    var sec = parseInt((ctime - 3600 * hour) - min * 60);
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }
    c_time = hour + ":" + min + ":" + sec;
    return c_time;
  },
  loadImg: function(Img) { /*图片延迟加载*/
    $(window).on('scroll resize load', function() {
      var oScrollTop = $(window).scrollTop();
      var oClientH = $(window).height();
      $(Img).each(function(index, element) {
        var oTop = $(element).offset().top;
        if ($(element).attr('src')) {
          $(element).removeAttr('_src');
        } else {
          var oSrc = $(element).attr('_src');
          if (oScrollTop + oClientH > oTop) {
            $(element).attr('src', oSrc);
          }
        }
      });
    });
  },
  closeUl: function(oBox, oUl) {
    $(document).bind("click", function(e) {
      var target = $(e.target);
      if (target.closest(oBox).length == 0) {
        $(oUl).removeClass('active');
      }
      e.stopPropagation();
    });
  },

  gotop: function(className) {
    $(window).on('scroll', function() {
      var $scrolltop = $(window).scrollTop();

      if ($scrolltop > 200) {
        $(className).show();
      } else {
        $(className).hide();
      }
    });
    $(className).on('click', function() {
      $('body,html').animate({
        scrollTop: 0
      }, 500);
    });
  },

  /*限制输入是大于0的数字*/
  isNumber: function(btn) {
    $(btn).on({
      keyup: function() {
        var value = $(this).val();
        $(this).val((value = value.replace(/\D/g, '')) == '' || (value = value.replace(/\D/g, '')) == 0 ? '1' : value);
      },
      paste: function() {
        var value = $(this).val();
        $(this).val((value = value.replace(/\D/g, '')) == '' || (value = value.replace(/\D/g, '')) == 0 ? '1' : value);
      }
    });
  },
  /*用户注册：限制输入数字,字母,下划线,中文,6~16位字符*/
  testUsername: function(val) {
    var regex = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){6,16}$");
    var intLength = 0;
    for (var i = 0; i < val.length; i++) {
      if ((val.charCodeAt(i) < 0) || (val.charCodeAt(i) > 255))
        intLength = intLength + 2;
      else
        intLength = intLength + 1;
    }
    if (!regex.test(val)) {
      return false;
    } else {
      if (intLength > 16) {
        return false;
      } else {
        return true;
      }
    }
  },
  isRealNum: function(val) {
    if (val === "" || val == null) {
      return false;
    }
    if (!isNaN(val)) {
      return true;
    } else {
      return false;
    }
  },
  selectAll: function(allChoice, oneChoice) {
    $(allChoice).on('change', function() {
      if ($(this).is(':checked')) {
        $(oneChoice).each(function(index, elem) {
          $(oneChoice)[index].checked = true;
        });
      } else {
        $(oneChoice).each(function(index, elem) {
          $(oneChoice)[index].checked = false;
        });
      }
    });
    $(oneChoice).on('change', function() {
      var bFlag = true;
      $(oneChoice).each(function(index, elem) {
        if (!$(elem).is(':checked')) {
          $(allChoice)[0].checked = false;
          bFlag = false;
        }
      });
      if (bFlag) {
        $(allChoice)[0].checked = true;
      }
    });
  },
  absoluteCenter: function(obj) {
    var screenWidth = $(window).width(),
      screenHeigth = $(window).height();
    var scollTop = $(document).scrollTop();
    var objLeft = (screenWidth - obj.width()) / 2;
    var objTop = (screenHeigth - obj.height()) / 2 + scollTop;
    obj.css({
      left: objLeft + "px",
      top: objTop + "px"
    });
    obj.fadeIn(500);
    isOpen = 1;
    $(window).on('resize scroll', function() {
      if (isOpen == 1) {
        screenWidth = $(window).width();
        screenHeigth = $(window).height();
        var scollTop = $(document).scrollTop();
        objLeft = (screenWidth - obj.width()) / 2;
        var objTop = (screenHeigth - obj.height()) / 2 + scollTop;
        obj.css({
          left: objLeft + "px",
          top: objTop + "px"
        });
        obj.fadeIn(500);
      }
    });
  },
  drag: function(className) {
    $(className).on('mousedown', function(e) {
      var positionDiv = $(this).offset();
      var distenceX = e.pageX - positionDiv.left;
      var distenceY = e.pageY - positionDiv.top;
      $(document).mousemove(function(e) {
        var x = e.pageX - distenceX;
        var y = e.pageY - distenceY;
        if (x < 0) {
          x = 0;
        } else if (x > $(document).width() - $(className).outerWidth(true)) {
          x = $(document).width() - $(className).outerWidth(true);
        }
        if (y < 0) {
          y = 0;
        } else if (y > $(document).height() - $(className).outerHeight(true)) {
          y = $(document).height() - $(className).outerHeight(true);
        }
        $(className).css({
          'left': x + 'px',
          'top': y + 'px'
        });
      });
      $(document).mouseup(function() {
        $(document).off('mousemove');
      });
      return false;
    });
  },
  getUrlParam:function(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
};
/*无缝滚动*/
var oScroll = {
  /*自动滚动一屏*/
  'all': function(oUl, time1, time2) {
    time1 = time1 ? time1 : 3000;
    time2 = time2 ? time2 : 800;

    var m = $(oUl + ' li').length;
    var oLiWidth = $(oUl + ' li').outerWidth(true);
    var n = Math.round($(oUl).parent().width() / oLiWidth);
    $(oUl).width(oLiWidth * $(oUl + ' li').length);
    if (m > n) {
      $(oUl).append($(oUl + ' li').clone());

      function oScrollAll() {
        $(oUl).animate({
          marginLeft: -n * oLiWidth
        }, time2, function() {
          $(oUl).append($(oUl + ' li:lt(' + n + ')'));
          $(oUl).css({
            marginLeft: 0
          });
        });
      }
      var timer = setInterval(oScrollAll, time1);
      $(oUl).on('mouseenter', function() {
        clearInterval(timer);
      });
      $(oUl).on('mouseleave', function() {
        timer = setInterval(oScrollAll, time1);
      });
    }
  },
  /*自动滚动一个li*/
  'one': function(oUl, time1, time2) {
    time1 = time1 ? time1 : 3000;
    time2 = time2 ? time2 : 800;

    var m = $(oUl + ' li').length;
    var oLiWidth = $(oUl + ' li').outerWidth(true);
    var n = Math.round($(oUl).parent().width() / oLiWidth);
    $(oUl).width(oLiWidth * $(oUl + ' li').length);
    if (m > n) {
      $(oUl).append($(oUl + ' li').clone());

      function oScrollOne() {
        $(oUl).animate({
          marginLeft: -oLiWidth
        }, time2, function() {
          $(oUl).append($(oUl + ' li:lt(1)'));
          $(oUl).css({
            marginLeft: 0
          });
        });
      }
      var timer = setInterval(oScrollOne, time1);
      $(oUl).on('mouseenter', function() {
        clearInterval(timer);
      });
      $(oUl).on('mouseleave', function() {
        timer = setInterval(oScrollOne, time1);
      });
    }
  },
  /*自动滚动一个px*/
  'move': function(oUl, time) {
    time = time ? time : 30;

    var oUlWidth = 0;
    for (var i = 0; i < $(oUl + ' li').length; i++) {
      oUlWidth += $(oUl + ' li').eq(i).outerWidth(true);
    }
    $(oUl).width(oUlWidth * 2 / 100 + 'rem');

    if (oUlWidth > $(oUl).parent().width()) {
      var n = 0;
      $(oUl).append($(oUl + ' li').clone());

      function oMove() {
        n++;
        $(oUl).css('left', -n / 100 + 'rem');
        if (n >= $(oUl).width() / 2) {
          n = 0;
        }
      }
      var timer = setInterval(oMove, time);
    }
  },
  /*点击滚动一个li*/
  'moveOne': function(className, oList) {
    var n = 0;
    var l = $(oList + ' li').length;
    var oLiWidth = $(oList + ' li').outerWidth(true);
    var m = Math.round($(oList).width() / oLiWidth);
    $(oList + ' ul').width(l * oLiWidth);
    if (l > m) {
      $(className + ' .right').on('click', function() {
        $(this).siblings('.left').addClass('active');
        n++;
        var oLiLength = l - m;
        if (n >= oLiLength) {
          $(this).removeClass('active');
          $(oList + ' ul').animate({
            'left': -oLiLength * oLiWidth + 'px'
          }, 500);
          n = oLiLength;
        } else {
          $(oList + ' ul').animate({
            'left': -n * oLiWidth + 'px'
          }, 500);
        }
      });
      $(className + ' .left').on('click', function() {
        $(this).siblings('.right').addClass('active');
        n--;
        if (n <= 0) {
          $(this).removeClass('active');
          $(oList + ' ul').animate({
            'left': 0
          }, 500);
          n = 0;
        } else {
          $(oList + ' ul').animate({
            'left': -n * oLiWidth + 'px'
          }, 500);
        }
      });
    }
  },
  /*点击滚动一屏*/
  'moveAll': function(className, oList) {
    var n = 0;
    var l = $(oList + ' li').length;
    var oLiWidth = $(oList + ' li').outerWidth(true);
    var m = Math.round($(oList).width() / oLiWidth);
    var moveWidth = oLiWidth * m;
    $(oList + ' ul').width(l * oLiWidth);
    var s = Math.ceil(l / m) - 1;
    var d = l - m;
    if (l > m) {
      $(className + ' .right').on('click', function() {
        $(this).siblings('.left').addClass('active');
        n++;
        if (n >= s) {
          $(this).removeClass('active');
          $(oList + ' ul').animate({
            'left': -d * oLiWidth + 'px'
          }, 500);
          n = s;
        } else {
          $(oList + ' ul').animate({
            'left': -moveWidth * n + 'px'
          }, 500);
        }
      });
      $(className + ' .left').on('click', function() {
        $(this).siblings('.right').addClass('active');
        n--;
        if (n <= 0) {
          $(this).removeClass('active');
          $(oList + ' ul').animate({
            'left': 0
          }, 500);
          n = 0;
        } else {
          $(oList + ' ul').animate({
            'left': -moveWidth * n + 'px'
          }, 500);
        }
      });
    }
  },
  /*自动向上滚动*/
  'top': function(oUl, time1, time2) {
    time1 = time1 ? time1 : 500;
    time2 = time2 ? time2 : 3000;

    var num = 0;
    var n = $(oUl + ' li').length;
    var oHeight = $(oUl + ' li').height();
    var m = Math.round($(oUl).parent().height() / oHeight);
    if (n > m) {
      var tag = $(oUl + ' li').clone();
      $(oUl).append(tag);

      function palyAuto() {
        num++;
        if (num > n) {
          num = 1;
          $(oUl).css('top', 0);
        }
        $(oUl).animate({
          top: -num * oHeight / 100 + 'rem'
        }, time1);
      }
      setInterval(palyAuto, time2);
    }
  },
  topAll: function(oUl, time1, time2) {
    time1 = time1 ? time1 : 500;
    time2 = time2 ? time2 : 3000;
    var m = $(oUl + ' li').length;
    var oLiHeight = $(oUl + ' li').height();
    var n = Math.round($(oUl).parent().height() / oLiHeight);
    if (m > n) {
      $(oUl).append($(oUl + ' li').clone());

      function oScrollAll() {
        $(oUl).animate({
          marginTop: -n * oLiHeight
        }, time1, function() {
          $(oUl).append($(oUl + ' li:lt(' + n + ')'));
          $(oUl).css({
            marginTop: 0
          });
        });
      }
      setInterval(oScrollAll, time2);
    }
  },
  /*点击向上滚动一个*/
  clickTopOne: function(scrollBox, oLeft, oRight, btnBox) {
    var oLiLength = $(scrollBox + ' li').length;
    var oScrollHeight = $(scrollBox).height();
    var oLiHeight = $(scrollBox + ' li').height();
    var num = parseInt(oScrollHeight / oLiHeight);
    if (btnBox) {
      if (oLiLength > num) {
        $(btnBox).addClass('active');
      }
    }
    var n = 0;
    var m = oLiLength - num;
    $(oRight).on('click', function() {
      if ($(this).hasClass('active')) {
        $(oLeft).addClass('active');
        n++;
        $(scrollBox + ' ul').animate({
          'top': -n * 0.88 + 'rem'
        }, 500);
        if (n >= m) {
          $(this).removeClass('active');
        }
      }
    });
    $(oLeft).on('click', function() {
      if ($(this).hasClass('active')) {
        $(oRight).addClass('active');
        n--;
        $(scrollBox + ' ul').animate({
          'top': -n * 0.88 + 'rem'
        }, 500);
        if (n <= 0) {
          $(this).removeClass('active');
        }
      }
    });
  }
};
/*表单验证*/
var formTest = {
  /*验证为空*/
  blurEmpty: function(id, htmlEmpty) {
    htmlEmpty = htmlEmpty ? htmlEmpty : '输入不能为空';
    if (!$.trim($(id).val())) {
      return htmlEmpty;
    } else {
      return false;
    }
  },
  /*验证邮箱*/
  blurEmail: function(emailId, htmlEmpty, htmlError) {
    htmlEmpty = htmlEmpty ? htmlEmpty : '邮箱输入不能为空';
    htmlError = htmlError ? htmlError : '邮箱格式不正确';
    if (!$.trim($(emailId).val())) {
      return htmlEmpty;
    } else {
      var reg = /^[0-9a-zA-Z]\w{1,17}@([0-9a-zA-Z]+\.)+[a-z]{2,8}$/;
      if (!reg.test($(emailId).val())) {
        return htmlError;
      }
    }
  },
  /*验证手机号*/
  blurMobile: function(mobileId, htmlEmpty, htmlError) {
    htmlEmpty = htmlEmpty ? htmlEmpty : '手机号输入不能为空';
    htmlError = htmlError ? htmlError : '手机号格式不正确';
    if (!$.trim($(mobileId).val())) {
      return htmlEmpty;
    } else {
      var reg = /^1[34578]\d{9}$/;
      if (!reg.test($(mobileId).val())) {
        return htmlError;
      }
    }
  }
};
/*类型转换*/
var typeChange = {
  /*json转url*/
  jsonToUrl: function(json) {
    var arr = [];
    for (var name in json) {
      arr.push(name + '=' + json[name]);
    }
    return arr.join('&');
  },
  /*url转json*/
  urlToJson: function(str) {
    if (str.indexOf('?') != -1) {
      str = str.substring(str.indexOf('?') + 1);
    }
    var json = {};
    var arr = str.split('&');
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=');
      json[arr2[0]] = arr2[1];
    }
    return json;
  },
  /*json转json格式的url*/
  jsonToStr: function(json) {
    var str = '{';
    for (var item in json) {
      str += '"' + item + '":"' + json[item] + '",';
    }
    str = str.substr(0, str.length - 1);
    str += '}';
    return str;
  },
  strToJson: function(str) {
    var json = (new Function("return " + str))();
    return json;
  }
};
/*数组相关*/
var commonArr = {
  /*打乱数组排序*/
  randomsort: function() {
    return Math.random() > .5 ? -1 : 1;
  },
  /*数组去重*/
  arrRepeat: function(arr) {
    var res = [];
    var json = {};
    for (var i = 0; i < arr.length; i++) {
      if (!json[arr[i]]) {
        res.push(arr[i]);
        json[arr[i]] = 1;
      }
    }
    return res;
  },
  /*寻找一个数组中最小项的下标*/
  findMinIndex: function(arr, start) {
    start = start ? start : 0;
    var iMin = arr[start];
    var iMinIndex = start;
    for (var i = start + 1; i < arr.length; i++) {
      if (arr[i] < iMin) {
        iMin = arr[i];
        iMinIndex = i;
      }
    }
    return iMinIndex;
  },
  /*判断一个值在数组中是否存在*/
  findInArr: function(n, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (n == arr[i]) return true;
    }
    return false;
  },
  /*对象去重，对应的值相加*/
  arrObject: function(arr, arrName, arrNum) {
    function findInArr(n, fArr) {
      for (var i = 0; i < fArr.length; i++) {
        if (n == fArr[i][arrName]) return true;
      }
      return false;
    }
    var oArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (!findInArr(arr[i][arrName], oArr)) {
        oArr.push(arr[i]);
      } else {
        if (arrNum) {
          for (var j = 0; j < oArr.length; j++) {
            if (arr[i][arrName] == oArr[j][arrName]) {
              oArr[j][arrNum] += arr[i][arrNum];
            }
          }
        }
      }
    }
    return oArr;
  }
};
/*检测手机类型*/
var testMobile = {
  'isPc': function() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  },
  'isIPhone': function() {
    var u = navigator.userAgent,
      app = navigator.appVersion;
    if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
      if (window.location.href.indexOf("?mobile") < 0) {
        try {
          if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
            return true;
          } else {
            return false;
          }
        } catch (e) {}
      }
    } else if (u.indexOf('iPad') > -1) {
      return true;
    } else {
      return false;
    }
  },
  'isWeiXin': function() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }
};

var cookieFn = {
  setCookie: function(cname, cvalue, exdays) {
    if (!cname) {
      alert('cookie名不能为空哦');
      return;
    }
    if (!cvalue) {
      alert('cookie值不能为空哦');
      return;
    }
    exdays = exdays ? exdays : 30;
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
  },
  getCookie: function(cname) {
    if (!cname) {
      alert('cookie名不能为空哦');
      return;
    }
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  },
  delCookie: function(cname) {
    if (!cname) {
      alert('cookie名不能为空哦');
      return;
    }
    cookieFn.setCookie(cname, "null", -1);
  },
  checkCookie: function(cname, cvalue, exdays) {
    if (!cname) {
      alert('cookie名不能为空哦');
      return;
    }
    exdays = exdays ? exdays : 30;

    var cookiename = cookieFn.getCookie(cname);
    if (!cookiename) {
      if (!cvalue) {
        alert('当前cookie不存在，你可以设定值哦');
      } else {
        cookieFn.setCookie(cname, cvalue, exdays);
      }
    }
  }
};