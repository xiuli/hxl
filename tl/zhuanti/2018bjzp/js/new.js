$(function () {
    //默认加载、切换加载、滚动加载、图片延迟加载
    let page = 0;
    let n = 0;
    let bFlagScroll = true;
    let Img_json = {
        zlgx: "./images/zlgx_pic01.jpg",
        stjj: './images/stjj_pic01.jpg'
    };
    let url_json = {
        zp: 'http://m.hteacher.net/zhuanti/2018bjzp/php/bjkszx_do_test.php',
        zgz: 'http://m.hteacher.net/zhuanti/2018bjzp/php/bjclass_do_test.php'
    }
    //图片延迟加载
    function images(Img) {
        $(Img).each(function (index, elem) {
            let oImgT = $(elem).offset().top;
            let oWindowT = $(window).height();
            let oScrollT = $(window).scrollTop();
            /* if (oWindowT + oScrollT >= oImgT) {
                let src = $(elem).attr('_src');
                $(elem).attr('src', src);
            } else if ($(elem).attr('src')) {
                $(elem).removeAttr('_src');
            } */
            if($(elem).attr('src')){
                $(elem).removeAttr('_src');
            } else if (oWindowT + oScrollT >= oImgT){
                let src=$(elem).attr('_src');
                $(elem).attr('src',src);
            }
        });
    }
    //封装ajax,,
    let ajax_json = {
        zpAjax: function (tid, page) {
            $.ajaxSettings.async = false;
            $.post(url_json.zp, {
                tid: tid,
                page: page
            }, (res) => {
                if (res.message == 1) {
                    $(res.data).each(function (index, elem) {
                        let oLi = $('<li></li>');
                        oLi.html('\
            <a href = "/article/article.php?id=' + $(elem)[0].aid + '">\
            <h3> <em> 【' + $(elem)[0].typename + '】 </em>' + $(elem)[0].titlelen + '</h3>\
            <p class = "des"> <em class = "red"> 导读： </em>' + $(elem)[0].description + '</p>\
            <time> ' + $(elem)[0].senddate + ' </time>\
            </a>\
            ')
                        $('.newslist').append(oLi);
                    });
                } else {
                    $('.loadingEnd').addClass('acive');
                    bFlagScroll = false;
                }
            }, 'json');
            $.ajaxSettings.async = true;
        },
        zpImgAjax: function (tid, page, Img) {
            $.ajaxSettings.async = false;
            $.post(url_json.zp, {
                tid: tid,
                page: page
            }, (res) => {
                if (res.message == 1) {
                    $(res.data).each(function (index, elem) {
                        let oLi = $('<li></li>');
                        oLi.html('\
                    <a class = "clearfix" href = "/article/article.php?id=' + $(elem)[0].aid + '">\
                    <div class = "pic_box"> <img _src = ' + Img + ' alt = ""></div>\
                    <div class = "iteminfo">\
                        <h3> <em> 【' + $(elem)[0].typename + '】 </em>' + $(elem)[0].description + '</h3>\
                        <p class = "des"> <em> 【' + $(elem)[0].typename + '】 </em>' + $(elem)[0].titlelen + '</p>\
                    </div>\
                    <a/>\
                ');
                        $('.itemlist').append(oLi);
                    });
                } else {
                    $('.loadingEnd').addClass('active');
                    bFlagScroll = false;
                }
            }, 'json');
            $.ajaxSettings.async = true;
        },
        zgzAjax: function (cid, page) {
            $.ajaxSettings.async = false;
            $.post(url_json.zgz, {
                cid: cid,
                page: page
            }, (res) => {
                if (res.message == 1) {
                    $(res.data).each(function (index, elem) {
                        let oLi = $('<li></li>');
                        oLi.html('\
                        <h3 class="title">' + $(elem)[0].title + '</h3>\
                        <a class="clearfix" href="/zbkt/zb_detail.php?id=' + $(elem)[0].rid + '">\
                        <div class="pic_box"> <img alt="" _src=' + $(elem)[0].scaleimg + '> </div>\
                        <div class="iteminfo">\
                        <p> <span> 授课老师： ' + $(elem)[0].teacherdesc + ' </span> </p>\
                        <p> 开课时间： ' + $(elem)[0].zhibotime + ' - ' + $(elem)[0].zhiboendtime + ' </p>\
                        <p class="price"> <i> 查看课程 </i>\
                        <del> ￥' + $(elem)[0].actualprice + ' </del> <strong> ￥' + $(elem)[0].price + ' </strong> </p>\
                        </div>\
                        </a>\
                        ');
                        $('.tjkclist').append(oLi);
                    });
                } else {
                    $('.loadingEnd').addClass('active');
                    bFlagScroll = false;
                }
            }, 'json');
            $.ajaxSettings.async = true;
        }
    }

    //默认加载,,一般都是根据网址来判断
    //window.location.reload 页面刷新
    let Url = window.location.href;
    if (Url.includes('zp.html')) {
        ajax_json.zpAjax(1, page);
        console.log(page);
    }

    //切换加载
    $('.menu_btn li').on('click', function () {
        $(".newslist,.tjkclist,.itemlist").html("");
        n = $(this).index();
        bFlagScroll = true;
        $(this).addClass('active').siblings().removeClass('active');
        if (n == 0) {
            ajax_json.zpAjax(1, page);
        } else if (n == 1) {
            ajax_json.zgzAjax(1, page + 1);
        } else if (n == 2) {
            ajax_json.zpImgAjax(2, page, Img_json.zlgx);
        } else if (n == 3) {
            ajax_json.zpImgAjax(3, page, Img_json.stjj);
        }
        images($('.con_box li img'));
    });
    //滚动加载
    $(window).on('scroll', function () {
        let oScrollT = $(window).scrollTop();
        let oWindowT = $(window).height();
        let oDocumentT = $(document).height();
        images($('.con_box li img'));
        if (oWindowT + oScrollT >= oDocumentT - 200) {
            if (bFlagScroll) {
                page++;
                switch (n) {
                    case 0:
                        ajax_json.zpAjax(1, page);
                        break;
                    case 1:
                        ajax_json.zgzAjax(1, 1);
                        break;
                    case 2:
                        ajax_json.zpImgAjax(2, page, Img_json.zlgx);
                        break;
                    case 3:
                        ajax_json.zpImgAjax(3, page, Img_json.stjj);
                        break;
                }
            }
        }

    });






})