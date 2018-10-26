$(function () {
    let phpUrl = {
        zx: 'http://m.hteacher.net/zhuanti/2018bjzp/php/bjkszx_do_test.php',
        class: 'http://m.hteacher.net/zhuanti/2018bjzp/php/bjclass_do_test.php'
    };
    let bFlageScroll = true;
    let n = 0;
    let netUrl = window.location.href;
    let page = 0;
    let ajaxJson = {
        zx: function (id, page) {
            $.ajaxSettings.async = false; //ͬ��
            $.post(phpUrl.zx, {
                tid: id,
                page: page,
            }, (res) => {
                if (res.message == 1) {
                    $(res.data).each(function (index, elem) {
                        console.log($(elem));
                        let oLi = $('<li></li>');
                        oLi.html(
                            `<a href="/article/article.php?id=${$(elem)[0].aid}">                
                            <h3><em>��${$(elem)[0].typename}��</em>${$(elem)[0].titlelen}</h3>                
                            <p class="des"><em class="red">������
                            </em>${$(elem)[0].description}</p>
                             <time>${$(elem)[0].senddate}</time>                
                             </a>`
                        );
                        $('.newslist').append(oLi);
                    });
                } else {
                    $('.loadingEnd').addClass('active');
                    bFlageScroll = false;
                }
            }, 'json');
            $.ajaxSettings.async = true;
        },
        class: function (id, page) {
            $.ajaxSettings.async = false;
            $.post(phpUrl.class, {
                cid: id,
                    page: page
            }, (res) => {
                if (res.message == 1) {
                    $(res.data).each(function (index, elem) {
                        let oLi = $('<li></li>');
                        oLi.html(
                            `<h3 class="title">${$(elem)[0].title}</h3>
                            <a class = "clearfix" href = "/zbkt/zb_detail.php?id=${$(elem)[0].rid}" > 
                            <div class = "pic_box"> <img alt = ""
                            _src = "${$(elem)[0].scaleimg}" > </div>
                            <div class="iteminfo">                
                            <p><span>�ڿ���ʦ��${$(elem)[0].teacherdesc}</span> </p>               
                            <p>����ʱ�䣺${$(elem)[0].zhibotime}-${$(elem)[0].zhiboendtime}</p> <p class = "price"> <i> �鿴�γ� </i>                
                            <del>��${$(elem)[0].actualprice}</del> <strong> ��${$(elem)[0].price} </strong></p> </div>                </a> `
                        );
                        $('.itemlist').append(oLi);
                    });
                } else {
                    $('.loadingEnd').addClass('active');
                    bFlageScroll = false;
                }
            }, 'json');
            $.ajaxSettings.async = true;
        },
        zxImg: function (id, page, img) {
            $.ajaxSettings.async = false;
            $.post(phpUrl.zx, {
                tid: id,
                page: page
            }, (res) => {
                if (res.message == 1) {
                    $(res.data).each(function (index, elem) {
                        let oLi = $('<li></li>');
                        oLi.html(
                            `<a class="clearfix" href="/article/article.php?id=${$(elem)[0].aid}">                
                            <div class="pic_box"> <img  _src="./images/${img}" alt=""> </div>                
                            <div class="iteminfo">                
                            <h3><em>��${$(elem)[0].typename}��</em>${$(elem)[0].titlelen}</h3>                
                            <p class="des"><em>��${$(elem)[0].typename}��</em>${$(elem)[0].description}</p>               
                            </div> </a>`
                        );
                        $('.itemlist').append(oLi);
                    });
                    loadImg($('.con_box li img'));
                } else {
                    $('.loadingEnd').addClass('active');
                    bFlageScroll = false;
                }
            }, 'json');
            $.ajaxSettings.async = true;
        }
    };

    //ͼƬ�ӳټ��أ�Ŀ�ģ������ҳ��ͼƬ̫�໺��Ļ������ͼƬ�ӳټ��ص�Ŀ�ľ���Ϊ��ʹ��ҳ�ļ��صĿ�һЩ��������һ�����ڼ�������һ����
    function loadImg(img) {
        let oSrollTop = $(window).scrollTop();
        let oSeeTop = $(window).height();
        $(img).each(function (index, elem) {
            let oTop = $(elem).offset().top;
            if ($(elem).attr('src')) {
                $(elem).removeAttr('_src');
            } else {
                let oSrc = $(elem).attr('_src');
                if (oSrollTop + oSeeTop >= oTop) {
                    $(elem).attr('src', oSrc);
                }
            }
        });



    }

    //Ĭ�ϼ���
    if (netUrl.indexOf('zp.html') != -1) {
        ajaxJson.zx(1, page);
        n = 0;

    } else if (netUrl.indexOf('zgz.html') != -1) {
        ajaxJson.zx(4, page);
        n = 5;

    }

    //�л�����
    $('.menu_btn li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.newslist,.itemlist,.jkclist').html('');
        bFlageScroll = true;
        page = 0;
        n = $(this).index();         /* �˴�����д�� let n=$(this).index ,��Ϊ����Ѿ����壬n�����0��ʼ*/

        switch (n) {
            case 0:
                ajaxJson.zx(1, page);
                break;
            case 1:
                ajaxJson.class(1, page);
                break;
            case 2:
                ajaxJson.zxImg(2, page, 'zlgx_pic01.jpg');
                break;
            case 3:
                ajaxJson.zxImg(3, page, 'stjj_pic01.jpg');
                break;

        }
        loadImg($('.con_box li img'));
    });

    $('.menu_btn02 li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        bFlageScroll = true;
        $('.newslist,.itemlist,.tjkclist').html('');
        page = 0;
        n = $(this).index() + 5;
        switch (n) {
            case 5:
                ajaxJson.zx(4, page);
                break;
            case 6:
                ajaxJson.class(2, page);
                break;
            case 7:
                ajaxJson.zxImg(5, page, 'zlgx_pic01.jpg');
                break;
        }
        loadImg($('.con_box li img'));

    });

    //�������أ�
    $(window).on('scroll', function () {
        loadImg($('.con_box li img'));
        let oScrollH = $(window).scrollTop();
        let oSeeH = $(window).height();
        let oTop = $(document).height();
        if (oScrollH + oSeeH >= oTop - 200) {
            if (bFlageScroll) {
                page++;
                switch (n) {
                    case 0:
                        ajaxJson.zx(1, page);
                        break;
                    case 1:
                        ajaxJson.class(1, page);
                        break;
                    case 2:
                        ajaxJson.zxImg(2, page, 'zlgx_pic01.jpg');
                        break;
                    case 3:
                        ajaxJson.zxImg(3, page, 'stjj_pic01.jpg');
                        break;


                    case 5:
                        ajaxJson.zx(4, page);
                        break;
                    case 6:
                        ajaxJson.class(2, page);
                        break;
                    case 7:
                        ajaxJson.zxImg(5, page, 'zlgx_pic01.jpg');
                        break;

                }
            }


        }


    });









})