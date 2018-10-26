$(function () {
    /*img load*/
    function loadImg(Img) {
        var oScrollTop = $(window).scrollTop();
        var oClientH = $(window).height();
        Img.each(function (index, element) {
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
    }
    $(window).on('scroll resize load', function () {
        loadImg($('.class_list_box img'));
    });


    // 展开，收起
    $('h3.title').on('click', function () {
        $('.class_nav').slideToggle(400);
        $(this).children('em').toggleClass('active');
    });
    $('.oArea_title').on('click', function () {
        $('.oArea').slideToggle(400);
    });

    //倒计时函数
    function countDown(nowTime, startTime, dayElement, hourElement, minElement, secElement) {
        var timeLeft = parseInt(startTime - nowTime);
        var xh = setInterval(function () {
            if (timeLeft > 0) {
                timeLeft -= 1;
                var day = Math.floor((timeLeft / 3600) / 24); //计算天
                var hour = Math.floor((timeLeft / 3600) % 24 + day * 24); //计算小时
                var minute = Math.floor((timeLeft / 60) % 60); //计算分
                var second = Math.floor(timeLeft % 60); //计算秒

                $(hourElement).html(hour < 10 ? '0' + hour : hour);
                $(minElement).html(minute < 10 ? '0' + minute : minute);
                $(secElement).html(second < 10 ? '0' + second : second);
            } else {
                $(hourElement).html('00');
                $(minElement).html('00');
                $(secElement).html('00');
                clearInterval(xh);
            }
        }, 1000);
    }


    // 从这里开始

    function urlToJson(str) {
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
    }
    var href = window.location.href;
    var url_json = urlToJson(href);
    var provinceId = url_json.Province;
    var NetClassCategoryId = url_json.NetClassCategoryId;
    var examType = classPhase = classType = subjectId = zbtime = page = '';

    var php_url = {
        temp_url: 'http://dev.hteacher.net/zbkt/zbkt_test.php', // 教师招聘、教师资证、特岗、事业单位D类
        wxk_url: 'http://dev.hteacher.net/zbkt/wxk_test.php' // 模块微小课
    };




    // 考试学段
    var json_examType = {
        zpbs: [{
                id: 0,
                name: '全部'
            },
            {
                id: 1,
                name: '幼儿'
            },
            {
                id: 3,
                name: '中小学'
            }
        ],
        zpms: [{
                id: 0,
                name: '全部'
            },
            {
                id: 1,
                name: '幼儿'
            },
            {
                id: 2,
                name: '小学'
            },
            {
                id: 10,
                name: '初中'
            },
            {
                id: 11,
                name: '高中'
            }
        ],
        zgbs: [{
                id: 0,
                name: '全部'
            },
            {
                id: 4,
                name: '幼儿'
            },
            {
                id: 5,
                name: '小学'
            },
            {
                id: 12,
                name: '初中'
            },
            {
                id: 13,
                name: '高中'
            }
        ],
        zgms: [{
                id: 0,
                name: '全部'
            },
            {
                id: 4,
                name: '幼儿'
            },
            {
                id: 5,
                name: '小学'
            },
            {
                id: 12,
                name: '初中'
            },
            {
                id: 13,
                name: '高中'
            }
        ]
    };

    // 创建考试学段
    var create_examType = function (examTypeList) {
        for (var i = 0; i < examTypeList.length; i++) {
            var oCon = '';
            if (i == 0) {
                oCon = $('<a class="current" data-id="' + examTypeList[i].id + '">' + examTypeList[i].name + '</a>');
            } else {
                oCon = $('<a data-id="' + examTypeList[i].id + '">' + examTypeList[i].name + '</a>');
            }
            $('.classPhase').append(oCon);
        }
    };

    // 创建课程列表
    var create_class_list = function (res) {
        $('.class_list').html('');
        var oLi = classstatus = scaleimg = iconimg = status = statushtml = price = statushtmlall = statusbg = '';
        for (var i = 0; i < res.clist.length; i++) {
            if (res.clist[i].status == 0) {
                status = "over";
                statushtml = "观看录播";
                statusbg = 'background: url(./images/bgss3.png) no-repeat;';
            } else if (res.clist[i].status == 1) {
                status = "next";
                statushtml = "课程未开始";
                statusbg = 'background: url(./images/bgss.png) no-repeat;';
            } else if (res.clist[i].status == 2) {
                status = "on";
                statushtml = "课程进行中";
                statusbg = 'background: url(./images/bgss2.png) no-repeat;';
            }
            statushtmlall = '<span class="' + status + '">' + statushtml + '</span>';
            // 小图标
            if (res.clist[i].classstatus != 0) { // 活动
                if (res.clist[i].classstatus == 1) { // 打折
                    iconimg = 'http://upload.hteacher.net/webupload/img/dazhe_zbkt.png';
                } else if (res.clist[i].classstatus == 2) { // 特价
                    iconimg = 'http://upload.hteacher.net/webupload/img/tejia_zbkt.png';
                } else if (res.clist[i].classstatus == 3) { // 秒杀
                    iconimg = 'http://upload.hteacher.net/webupload/img/miaosha_zbkt.png';
                    statushtmlall = '<div class="djs_time" style="' + statusbg + '">\
                        <span class="tiptext">' + statushtml + '</span><br>\
                        <time><span class="hour hour_' + res.clist[i].rid + '">01</span>时</time>\
                        <time><span class="minute minute_' + res.clist[i].rid + '">10</span>分</time>\
                        <time><span class="second second_' + res.clist[i].rid + '">04</span>分</time>\
                    </div>';
                    countDown(res.clist[i].currenttime, res.clist[i].distime2s, '.day_' + res.clist[i].rid + '', '.hour_' + res.clist[i].rid + '', '.minute_' + res.clist[i].rid + '', '.second_' + res.clist[i].rid + '')
                }
                price = '￥' + res.clist[i].Price;

            } else {
                if (res.clist[i].Elite == 1) { // 推荐
                    iconimg = 'http://upload.hteacher.net/webupload/img/tuijian_zbkt.png';
                } else {
                    iconimg = '';
                }
                price = '';
            }
            // 课程图片
            if (res.clist[i].scaleimg) {
                scaleimg = res.clist[i].scaleimg;
            } else {
                scaleimg = 'http://upload.hteacher.net/webupload/mobile/images/default/kcpic.png';
            }

            oLi = $('<li></li>');
            oLi.html('\
                <a href="./nry.php?id=' + res.clist[i].rid + '&classPhase=' + res.others.classPhase + '&subjectId=' + res.others.subjectId + '" target="_blank" class="link" width="278" height="276">\
                    <div class="tit">\
                        <img width="278" height="174" _src="' + scaleimg + '">\
                    </div>\
                    <div class="mid">\
                        <p><em>讲师：</em>' + res.clist[i].teacherdesc + '</p>\
                        <p class="clearfix"><b><em>时间：</em>' + res.clist[i].zhibotime1 + '-' + res.clist[i].zhiboendtime1 + '</b><span>' + res.clist[i].TimeLength + '小时</span></p>\
                    </div>\
                    <div class="bot clearfix">\
                        <em>￥' + res.clist[i].ActualPrice + '</em>\
                        <span class="c"><del>' + price + '</del><br></span>\
                        <img class="tag" src="' + iconimg + '">\
                        <div class="sj">' + statushtmlall + '</div>\
                    </div>\
                </a>\
            ');
            $('.class_list').append(oLi);
            loadImg($('.class_list_box img'));
        }
    };

    // ajax请求数据
    var zbktAjax = function (url, NetClassCategoryId, examType, classPhase, classType, subjectId, zbtime, page, provinceId) {
        provinceId = provinceId ? provinceId : url_json.Province;
        NetClassCategoryId = NetClassCategoryId ? NetClassCategoryId : url_json.NetClassCategoryId;
        examType = examType ? examType : 0;
        classPhase = classPhase ? classPhase : 0;
        classType = classType ? classType : 0;
        subjectId = subjectId ? subjectId : 0;
        zbtime = zbtime ? zbtime : 0;
        page = page ? page : 1;
        $.get(url, {
            Province: provinceId, // 省份
            NetClassCategoryId: NetClassCategoryId, //考试类型
            examtype: examType, // 课程分类
            classPhase: classPhase, // 考试学段
            ClassType: classType, // 课程班型
            subjectId: subjectId, //考试科目
            zbtime: zbtime, // 综合排序
            page: page // 分页
        }, function (res) {
            console.log(res);
            $('.class_list').html('');
            if (res.ctypelist) { // 存在班型，创建学段和班型
                if (res.ctypelist.length > 0) {
                    $('.subjectId').html('');
                    // 创建学段
                    $('.classPhase').html('');
                    $('.classPhase').addClass('active');
                    var oTitleXd = $('<em>考试学段</em>');
                    $('.classPhase').append(oTitleXd);
                    if (NetClassCategoryId == 0 || examType == 0) {
                        $('.classPhase').removeClass('active');
                        $('.classType').removeClass('active');
                    } else if (NetClassCategoryId == 12 && examType == 1) {
                        create_examType(json_examType.zpbs);
                    } else if (NetClassCategoryId == 12 && examType == 2) {
                        create_examType(json_examType.zpms);
                    } else if (NetClassCategoryId == 19 && examType == 1) {
                        create_examType(json_examType.zgbs);
                    } else if (NetClassCategoryId == 19 && examType == 2) {
                        create_examType(json_examType.zgms);
                    }

                    // 创建班型
                    $('.classType').html('');
                    $('.classType').addClass('active');
                    var oTitleBj = $('<em>课程班型</em>');
                    $('.classType').append(oTitleBj);

                    var oCon = '';
                    oCon = $('<a class="current" data-id="0">全部</a>');
                    $('.classType').append(oCon);

                    for (var i = 0; i < res.ctypelist.length; i++) {
                        oCon = $('<a data-id="' + res.ctypelist[i].cid + '">' + res.ctypelist[i].name + '</a>');
                        $('.classType').append(oCon);
                    }
                }
            }
            // 考试科目
            if (res.subjectslist) { // 存在科目，创建科目
                if (res.subjectslist.length > 0) {
                    $('.subjectId').html('');
                    //创建科目
                    $('.subjectId').addClass('active');
                    var oTitleKm = $('<em>考试科目</em>');
                    $('.subjectId').append(oTitleKm);

                    var subjectId_box = $('<div class="subjectId_box"></div>');
                    $('.subjectId').append(subjectId_box);

                    var oCon = '';
                    oCon = $('<a class="current" data-id="0">全部</a>');
                    $('.subjectId .subjectId_box').append(oCon);

                    for (var i = 0; i < res.subjectslist.length; i++) {
                        oCon = $('<a data-id="' + res.subjectslist[i].subjectid + '">' + res.subjectslist[i].subjectanme + '</a>');
                        $('.subjectId .subjectId_box').append(oCon);
                    }
                }
            }

            if (res.clist) { // 存在课程，创建课程列表
                if (res.clist.length > 0) {
                    create_class_list(res);
                    $('.page-box').show();
                    layui.use(['laypage'], function () {
                        let laypage = layui.laypage;
                        laypage.render({
                            elem: 'class-page',
                            count: res.others.classlistcount,
                            limit: 20,
                            jump: function (obj, first) {
                                if (!first) {

                                    $.get(url, {
                                        Province: provinceId,
                                        NetClassCategoryId: NetClassCategoryId,
                                        examtype: examType,
                                        classPhase: classPhase,
                                        ClassType: classType,
                                        subjectId: subjectId,
                                        zbtime: zbtime,
                                        page: obj.curr,
                                    }, (result) => {
                                        create_class_list(result);
                                    }, 'json');
                                }
                            }
                        });
                    });
                    $('#templeteImg').hide();
                } else {
                    layui.use(['laypage'], function () {
                        let laypage = layui.laypage;
                        laypage.render({
                            elem: 'class-page',
                            count: 0,
                            limit: 20
                        });
                    });
                    $('.page-box').hide();
                    $('#templeteImg').show();
                }
            }

        }, 'json');
    };


    // 默认加载
    switch (NetClassCategoryId) {
        case '12':
            zbktAjax(php_url.temp_url);
            $('.NetClassCategoryId a').eq(1).addClass('current');
            break;
        case '19':
            zbktAjax(php_url.temp_url);
            $('.NetClassCategoryId a').eq(2).addClass('current');
            break;
        case '21':
            if ($('#tgjs').html() == '特岗教师') {
                $('.NetClassCategoryId a#tgjs').addClass('current');
                $('.examType,.totle').removeClass('active');
                zbktAjax(php_url.temp_url);
            } else {
                $('.NetClassCategoryId a').eq(1).addClass('current');
                NetClassCategoryId = 12;
                zbktAjax(php_url.temp_url, NetClassCategoryId);
            }
            break;
        case '29':
            if ($('#sydw').html() == '事业单位D类') {
                $('.NetClassCategoryId a#sydw').addClass('current');
                $('.examType,.totle').removeClass('active');
                zbktAjax(php_url.temp_url);
            } else {
                $('.NetClassCategoryId a').eq(1).addClass('current');
                NetClassCategoryId = 12;
                zbktAjax(php_url.temp_url, NetClassCategoryId);
            }
            break;
        default:
            if (href.indexOf('index_fxminclass') != -1) {
                zbktAjax(php_url.wxk_url);
            }
    }

    // 考试类型
    $(document).on('click', '.NetClassCategoryId a', function () {
        $(this).addClass('current').siblings().removeClass('current');
        $('.classPhase').removeClass('active').html('');
        $('.classType').removeClass('active').html('');
        $('.subjectId').removeClass('active').html('');

        NetClassCategoryId = $(this).attr('data-id');
        subjectId = classType = classPhase = 0;

        if (href.indexOf('index.php') != -1) {
            switch (NetClassCategoryId) {
                case '21':
                    $('.examType,.totle').removeClass('active');
                    break;
                case '29':
                    $('.examType,.totle').removeClass('active');
                    break;
                default:
                    $('.examType,.totle').addClass('active');
            }
            zbktAjax(php_url.temp_url, NetClassCategoryId, examType, classPhase, classType, subjectId, zbtime);
        } else {
            zbktAjax(php_url.wxk_url, NetClassCategoryId, examType, classPhase, classType, subjectId, zbtime);
        }
    });

    // 课程分类
    $(document).on('click', '.examType a', function () {
        $(this).addClass('current').siblings().removeClass('current');
        $('.classPhase').removeClass('active').html('');
        $('.classType').removeClass('active').html('');
        $('.subjectId').removeClass('active').html('');
        examType = $(this).attr('data-id');
        subjectId = classType = classPhase = 0;

        if (href.indexOf('index.php') != -1) {
            zbktAjax(php_url.temp_url, NetClassCategoryId, examType, classPhase, classType, subjectId, zbtime);
        } else {
            zbktAjax(php_url.wxk_url, NetClassCategoryId, examType, classPhase, classType, subjectId, zbtime);
        }
    });

    // 考试学段
    $(document).on('click', '.classPhase a', function () {
        $(this).addClass('current').siblings().removeClass('current');
        classPhase = $(this).attr('data-id');
        subjectId = 0;
        zbktAjax(php_url.temp_url, NetClassCategoryId, examType, classPhase, classType, subjectId, zbtime);
        if ($(this).index() == 1) {
            $('.subjectId').removeClass('active');
        } else {
            $('.subjectId').addClass('active');
        }
    });

    // 课程班型
    $(document).on('click', '.classType a', function () {
        $(this).addClass('current').siblings().removeClass('current');
        classType = $(this).attr('data-id');
        zbktAjax(php_url.temp_url, NetClassCategoryId, examType, classPhase, classType, subjectId, zbtime);
    });

    // 考试科目
    $(document).on('click', '.subjectId a', function () {
        $(this).addClass('current').siblings().removeClass('current');
        subjectId = $(this).attr('data-id');

        if (href.indexOf('index.php') != -1) {
            zbktAjax(php_url.temp_url, NetClassCategoryId, examType, classPhase, classType, subjectId, zbtime);
        } else {
            zbktAjax(php_url.wxk_url, NetClassCategoryId, examType, classPhase, classType, subjectId, zbtime);
        }
    });

    //综合排序
    $('.totle li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        zbtime = $(this).attr('data-id');

        if (href.indexOf('index.php') != -1) {
            zbktAjax(php_url.temp_url, NetClassCategoryId, examType, classPhase, classType, subjectId, zbtime);
        } else {
            zbktAjax(php_url.wxk_url, NetClassCategoryId, examType, classPhase, classType, subjectId, zbtime);
        }
    });

    // 切换省份
    $('.oArea a').on('click', function (e) {
        var NetClassCategoryId = $('.NetClassCategoryId a.current').attr('data-id');
        window.location.href = $(this).attr('data-href') + '&NetClassCategoryId=' + NetClassCategoryId;
    });
});