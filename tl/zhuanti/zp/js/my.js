$(function () {
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

    function urlToJson(NetUrl) {
        let strIndex = NetUrl.indexOf("?");
        let str = NetUrl.substring(strIndex + 1);
        let arr1 = str.split("&");
        let json = {};
        /* $(arr1).each(function (index, elem) {
                let arr2 = elem[0].split('=');
                json[arr2[0]]=arr2[1];
            }); */
        for (let i = 0; i < arr1.length; i++) {
            var arr2 = arr1[i].split("=");
            json[arr2[0]] = arr2[1];
        }
        return json;
    }
    let url = window.location.href;
    let jsonData = urlToJson(url);
    let url_Province = jsonData.Province;
    let url_NetClassCategoryId = jsonData.NetClassCategoryId;

    let php_url = "http://dev.hteacher.net/zbkt/zbkt_test.php";
    let examtype = classPhase = ClassType = subjectId = zbtime = page = "";
    let Province = url_Province;
    let NetClassCategoryId = url_NetClassCategoryId;
    //创建数据
    let create_classPhase_data = {
        zpbs: [{
                id: 0,
                name: "全部"
            },
            {
                id: 1,
                name: "幼儿"
            },
            {
                id: 3,
                name: "中学"
            }
        ],
        zpms: [{
                id: 0,
                name: "全部"
            },
            {
                id: 1,
                name: "幼儿"
            },
            {
                id: 2,
                name: "小学"
            },
            {
                id: 10,
                name: "初中"
            },
            {
                id: 11,
                name: "高中"
            }
        ],
        zgzbs: [{
                id: 0,
                name: "全部"
            },
            {
                id: 4,
                name: "幼儿"
            },
            {
                id: 5,
                name: "小学"
            },
            {
                id: 12,
                name: "初中"
            },
            {
                id: 13,
                name: "高中"
            }
        ],
        zgzms: [{
                id: 0,
                name: "全部"
            },
            {
                id: 4,
                name: "幼儿"
            },
            {
                id: 5,
                name: "小学"
            },
            {
                id: 12,
                name: "初中"
            },
            {
                id: 13,
                name: "高中"
            }
        ]
    };
    //创建考试学段
    let create_classPhase = function (classPhase) {
        let oLi = $(".classPhase");
        for (let i = 0; i < classPhase.length; i++) {
            let con = "";
            if (i == 0) {
                con = $(
                    '<a class="current" data-id="' +
                    classPhase[i].id +
                    '">' +
                    classPhase[i].name +
                    "</a>"
                );
            } else {
                con = $(
                    '<a data-id="' + classPhase[i].id + '">' + classPhase[i].name + "</a>"
                );
            }
            oLi.append(con);
        }
    };

    // 创建课程列表
    var create_class_list = function (res) {
        $(".class_list").html("");
        var oLi = (classstatus = scaleimg = iconimg = status = statushtml = price = statushtmlall = statusbg =
            "");
        for (var i = 0; i < res.clist.length; i++) {
            if (res.clist[i].status == 0) {
                status = "over";
                statushtml = "观看录播";
                statusbg = "background: url(./images/bgss3.png) no-repeat;";
            } else if (res.clist[i].status == 1) {
                status = "next";
                statushtml = "课程未开始";
                statusbg = "background: url(./images/bgss.png) no-repeat;";
            } else if (res.clist[i].status == 2) {
                status = "on";
                statushtml = "课程进行中";
                statusbg = "background: url(./images/bgss2.png) no-repeat;";
            }
            statushtmlall = '<span class="' + status + '">' + statushtml + "</span>";
            // 小图标
            if (res.clist[i].classstatus != 0) {
                // 活动
                if (res.clist[i].classstatus == 1) {
                    // 打折
                    iconimg = "http://upload.hteacher.net/webupload/img/dazhe_zbkt.png";
                } else if (res.clist[i].classstatus == 2) {
                    // 特价
                    iconimg = "http://upload.hteacher.net/webupload/img/tejia_zbkt.png";
                } else if (res.clist[i].classstatus == 3) {
                    // 秒杀
                    iconimg = "http://upload.hteacher.net/webupload/img/miaosha_zbkt.png";
                    statushtmlall =
                        '<div class="djs_time" style="' +
                        statusbg +
                        '">\
                        <span class="tiptext">' +
                        statushtml +
                        '</span><br>\
                        <time><span class="hour hour_' +
                        res.clist[i].rid +
                        '">01</span>时</time>\
                        <time><span class="minute minute_' +
                        res.clist[i].rid +
                        '">10</span>分</time>\
                        <time><span class="second second_' +
                        res.clist[i].rid +
                        '">04</span>分</time>\
                    </div>';
                    countDown(
                        res.clist[i].currenttime,
                        res.clist[i].distime2s,
                        ".day_" + res.clist[i].rid + "",
                        ".hour_" + res.clist[i].rid + "",
                        ".minute_" + res.clist[i].rid + "",
                        ".second_" + res.clist[i].rid + ""
                    );
                }
                price = "￥" + res.clist[i].Price;
            } else {
                if (res.clist[i].Elite == 1) {
                    // 推荐
                    iconimg = "http://upload.hteacher.net/webupload/img/tuijian_zbkt.png";
                } else {
                    iconimg = "";
                }
                price = "";
            }
            // 课程图片
            if (res.clist[i].scaleimg) {
                scaleimg = res.clist[i].scaleimg;
            } else {
                scaleimg =
                    "http://upload.hteacher.net/webupload/mobile/images/default/kcpic.png";
            }

            oLi = $("<li></li>");
            oLi.html(
                '\
                <a href="./nry.php?id=' +
                res.clist[i].rid +
                "&classPhase=" +
                res.others.classPhase +
                "&subjectId=" +
                res.others.subjectId +
                '" target="_blank" class="link" width="278" height="276">\
                    <div class="tit">\
                        <img width="278" height="174" _src="' +
                scaleimg +
                '">\
                    </div>\
                    <div class="mid">\
                        <p><em>讲师：</em>' +
                res.clist[i].teacherdesc +
                '</p>\
                        <p class="clearfix"><b><em>时间：</em>' +
                res.clist[i].zhibotime1 +
                "-" +
                res.clist[i].zhiboendtime1 +
                "</b><span>" +
                res.clist[i].TimeLength +
                '小时</span></p>\
                    </div>\
                    <div class="bot clearfix">\
                        <em>￥' +
                res.clist[i].ActualPrice +
                '</em>\
                        <span class="c"><del>' +
                price +
                '</del><br></span>\
                        <img class="tag" src="' +
                iconimg +
                '">\
                        <div class="sj">' +
                statushtmlall +
                "</div>\
                    </div>\
                </a>\
            "
            );
            $(".class_list").append(oLi);
            loadImg($(".class_list_box img"));
        }
    };

    //ajax
    let ajaxJson = function (Province, NetClassCategoryId, examtype, classPhase, ClassType, subjectId, zbtime, page) {
        Province = Province ? Province : url_Province;
        NetClassCategoryId = NetClassCategoryId ? NetClassCategoryId : url_NetClassCategoryId;
        examtype = examtype ? examtype : 0;
        classPhase = classPhase ? classPhase : 0;
        ClassType = ClassType ? ClassType : 0;
        subjectId = subjectId ? subjectId : 0;
        zbtime = zbtime ? zbtime : 0;
        page = page ? page : 1;

        $.get(
            php_url, {
                Province: Province,
                NetClassCategoryId: NetClassCategoryId,
                examtype: examtype,
                classPhase: classPhase,
                ClassType: ClassType,
                subjectId: subjectId,
                zbtime: zbtime,
                page: page
            },
            res => {
                $(".class_list").html('');
                //课程班型存在 创建考试学段和课程班型
                if (res.ctypelist) {
                    if (res.ctypelist.length > 0) {
                        $('.subjectId').html('');
                        $(".classPhase").html("");
                        $(".classPhase").addClass("active");
                        let oEm = $("<em>考试学段</em>");
                        $(".classPhase").append(oEm);
                        if (NetClassCategoryId == 0 || examtype == 0) {
                            $(".classPhase").removeClass("active");
                            $(".classType").removeClass("active");
                        } else if (NetClassCategoryId == 12 && examtype == 1) {
                            create_classPhase(create_classPhase_data.zpbs);
                        } else if (NetClassCategoryId == 12 && examtype == 2) {
                            create_classPhase(create_classPhase_data.zpms);
                        } else if (NetClassCategoryId == 19 && examtype == 1) {
                            create_classPhase(create_classPhase_data.zgzbs);
                        } else if (NetClassCategoryId == 19 && examtype == 2) {
                            create_classPhase(create_classPhase_data.zgzms);
                        }

                        //创建课程班型
                        $(".classType").html("");
                        $(".classType").addClass("active");
                        let o_em = $("<em>课程班型</em>");
                        $(".classType").append(o_em);

                        let o_a = $('<a class="current">全部</a>');
                        $(".classType").append(o_a);

                        $(res.ctypelist).each(function (index, elem) {
                            let con = $(
                                '<a data-id="' + elem.cid + '">' + elem.name + '</a>'
                            );
                            $(".classType").append(con);
                        });
                    }

                }
                //创建考试科目
                if (res.subjectslist) {
                    if (res.subjectslist.length > 0) {
                        $(".subjectId").html("");
                        $(".subjectId").addClass("active");
                        let o_em = $("<em>考试科目</em>");
                        $(".subjectId").append(o_em);
                        let o_a = $('<a class="current">全部</a>');
                        $(".subjectId").append(o_a);

                        $(res.subjectslist).each(function (index, elem) {
                            let con = $(
                                '<a data-id="' +
                                elem.subjectid +
                                '">' +
                                elem.subjectanme +
                                "</a>"
                            );
                            $(".subjectId").append(con);
                        });
                    }

                }

                if (res.clist) {
                    // 存在课程，创建课程列表
                    if (res.clist.length > 0) {
                        create_class_list(res);
                        $(".page-box").show();
                        layui.use(["laypage"], function () {
                            let laypage = layui.laypage;
                            laypage.render({
                                elem: "class-page",
                                count: res.others.classlistcount,
                                limit: 20,
                                jump: function (obj, first) {
                                    if (!first) {
                                        $.get(
                                            url, {
                                                Province: provinceId,
                                                NetClassCategoryId: NetClassCategoryId,
                                                examtype: examType,
                                                classPhase: classPhase,
                                                ClassType: classType,
                                                subjectId: subjectId,
                                                zbtime: zbtime,
                                                page: obj.curr
                                            },
                                            result => {
                                                create_class_list(result);
                                            },
                                            "json"
                                        );
                                    }
                                }
                            });
                        });
                        $("#templeteImg").hide();
                    } else {
                        layui.use(["laypage"], function () {
                            let laypage = layui.laypage;
                            laypage.render({
                                elem: "class-page",
                                count: 0,
                                limit: 20
                            });
                        });
                        $(".page-box").hide();
                        $("#templeteImg").show();
                    }
                }
            },
            "json"
        );
    };

    //默认加载
    switch (NetClassCategoryId) {
        case '12':
            ajaxJson(Province, 12, examtype, classPhase, ClassType, subjectId, zbtime, page);
            $('.NetClassCategoryId a').eq(1).addClass('current');
            break;

        case '19':
            ajaxJson(Province, 19, examtype, classPhase, ClassType, subjectId, zbtime, page);
            $('.NetClassCategoryId a').eq(2).addClass('current');
            break;
        case '21':
            if ($("#tgjs").html()) {
                ajaxJson(Province, 21, examtype, classPhase, ClassType, subjectId, zbtime, page);
                $('.NetClassCategoryId a').eq(3).addClass('current');
                $('.examType,.totle').removeClass('active');
            } else {
                ajaxJson(Province, NetClassCategoryId, examtype, classPhase, ClassType, subjectId, zbtime, page);
                $('.NetClassCategoryId a').eq(1).addClass('current');
            }
            break;
        case '29':
            if ($("#sydw").html()) {
                ajaxJson(Province, 29, examtype, classPhase, ClassType, subjectId, zbtime, page);
                $('.NetClassCategoryId a').eq(4).addClass('current');
                $('.examType,.totle').removeClass('active');
            } else {
                ajaxJson(Province, NetClassCategoryId, examtype, classPhase, ClassType, subjectId, zbtime, page);
                $('.NetClassCategoryId a').eq(1).addClass('current');
            }
            break;
    }

    //点击考试类型
    $('.NetClassCategoryId').on('click', 'a', function () {
        $('.classPhase').removeClass('active').html('');
        $('.classType').removeClass('active').html('');
        $('.subjectId').removeClass('active').html('');
        $(this).addClass('current').siblings().removeClass('current');
        NetClassCategoryId = $(this).attr('data-id');
        $('.examType,.totle').addClass('active');
        if (NetClassCategoryId == 21 || NetClassCategoryId == 29) {
            $('.examType,.totle').removeClass('active');
        }
        classPhase = ClassType = subjectId = 0;
        ajaxJson(Province, NetClassCategoryId, examtype, classPhase, ClassType, subjectId, zbtime, page);

    });

    //点击课程分类
    $('.examType').on('click', 'a', function () {
        $('.classPhase').removeClass('active').html('');
        $('.classType').removeClass('active').html('');
        $('.subjectId').removeClass('active').html('');
        examtype = $(this).attr('data-id');
        classPhase = ClassType = subjectId = 0;
        $(this).addClass('current').siblings().removeClass('current');
        ajaxJson(Province, NetClassCategoryId, examtype, classPhase, ClassType, subjectId, zbtime, page);
    });
    //点击考试学段
    $('.classPhase').on('click', 'a', function () {
        $('.subjectId').removeClass('active').html('');
        $(this).addClass('current').siblings().removeClass('current');
        classPhase = $(this).attr('data-id');
        subjectId = 0;
        ajaxJson(Province, NetClassCategoryId, examtype, classPhase, ClassType, subjectId, zbtime, page);
    });
    //点击课程班型
    $('.classType').on('click', 'a', function () {
        $(this).addClass('current').siblings().removeClass('current');
        ClassType = $(this).attr('data-id');
        ajaxJson(Province, NetClassCategoryId, examtype, classPhase, ClassType, subjectId, zbtime, page);

    });
    //点击考试科目
    $('.subjectId').on('click', 'a', function () {
        $(this).addClass('current').siblings().removeClass('current');
        subjectId = $(this).attr('data-id');
        ajaxJson(Province, NetClassCategoryId, examtype, classPhase, ClassType, subjectId, zbtime, page);
    });
    //点击综合排序
    $('.totle').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
        zbtime = $(this).attr('data-id');
        ajaxJson(Province, NetClassCategoryId, examtype, classPhase, ClassType, subjectId, zbtime, page);
    });
    //切换省份,点击下拉
    //切换省份
    $('.oArea_title').on('click', function () {
        $('.oArea').slideToggle(400);
    });
    $('.oArea a').on('click',function(){
        let  NetClassCategoryId = $('.NetClassCategoryId a.current').attr('data-id');
        window.location.href = $(this).attr('data-href') + '&NetClassCategoryId=' + NetClassCategoryId;
    });




});