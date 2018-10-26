const ajaxPromise=  param => {
  return new Promise((resovle, reject) => {
    $.ajax({
      type : param.type || "get",
      url : param.url,
      data : param.data || "",
	  dataType : param.dataType || "json",
      success : (res) => {
        resovle(res);
      },
      error : (err) => {
        reject(err);
      }
    })
  })
}


let get_pc_banner = (type, place, className) => {
    ajaxPromise({
      url:"./php/query_banner.php",
	  type:"post",
	  data :{
		  type: type,
		  place: place
	  }
    }).then(res => {
		var {length : pc_length, data: pc_data} = res;
        layui.use(['laypage'], function () {
			var laypage = layui.laypage;

			laypage.render({
				elem: 'm-page',
				count: 70
			});
			laypage.render({
				elem: 'pc-page',
				count: 70
			});
			laypage.render({
				elem: 'dfz-page',
				count: 70
			});
			laypage.render({
				elem: 'zbkt-page',
				count: 70
			});
			laypage.render({
				elem: 'hf-page',
				count: 70
			});
			laypage.render({
				elem: 'zp-page',
				count: 70
			});
			laypage.render({
				elem: 'zgz-page',
				count: 70
			});
		});
    }).catch(err => {
        console.log("err");  
    })
}


let getdata_pc_index = (type, place, className_pc, className_rmkc, className_headerHf, className_hf) => {
    ajaxPromise({
      url:"./php/query_banner.php",
	  type:"post",
	  data :{
		  type: type,
		  place: place
	  }
    }).then(res => {
		if(res.state == 1){
			var {pc_index_banner, pc_index_headerhf, pc_index_hf, pc_index_rmkc} = res;
			// 轮播图
			layui.use(['laypage'], function () {
				var laypage = layui.laypage;
				laypage.render({
					elem: 'pc-page',
					count: pc_index_banner.length,
					jump: function(obj, first){
						if(!first){
							$.post('./php/query_banner.php',{
								type: 1,
								place: 1,
								page:obj.curr
							},(res) => {
								$(className_pc+' tbody').html('');
								res.data.forEach((val) => {
									var oTr=`<tr>
										<td><a href="${val.href}">${val.title}</a></td>
										<td>${val.start_time}</td>
										<td>${val.end_time}</td>
										<td><input type="text" data-id="${val.id}" value="${val.num}" class="num"></td>
										<td>
											<a href="./add.html?page=pc&type=change&place=banner&id=${val.id}" class="layui-btn layui-btn-normal layui-btn-radius change">修改</a>
											<a href="javascript:void(0)" class="layui-btn layui-btn-danger layui-btn-radius del" data-id="${val.id}">删除</a>
										</td>
									</tr>`;
									$(className_pc+' tbody').append(oTr);
								});
							},'json');
						}
					} 
				});
			});

			$(className_pc+' tbody').html('');
			pc_index_banner.data.forEach((val) => {
				var oTr=`<tr>
					<td><a href="${val.href}">${val.title}</a></td>
					<td>${val.start_time}</td>
					<td>${val.end_time}</td>
					<td><input type="text" data-id="${val.id}" value="${val.num}" class="num"></td>
					<td>
						<a href="./add.html?page=pc&type=change&place=banner&id=${val.id}" class="layui-btn layui-btn-normal layui-btn-radius change">修改</a>
						<a href="javascript:void(0)" class="layui-btn layui-btn-danger layui-btn-radius del" data-id="${val.id}">删除</a>
					</td>
				</tr>`;
				$(className_pc+' tbody').append(oTr);
			});
			// 热门课程
			$(className_rmkc+' tbody').html('');
			pc_index_rmkc.data.forEach((val) => {
				var oTr=`<tr>
							<td><a href="${val.href}">${val.title}</a></td>
							<td>${val.num}</td>
							<td>
								<a href="./add.html?page=pc&type=change&place=rmck&id=${val.id}" class="layui-btn layui-btn-normal layui-btn-radius change">修改</a>
							</td>
						</tr>`;
				$(className_rmkc+' tbody').append(oTr);
			});
			// 顶部横幅
			layui.use(['laypage'], function () {
				var laypage = layui.laypage;
				laypage.render({
					elem: 'hf-page',
					count: pc_index_headerhf.length
				});
			});
			$(className_headerHf+' tbody').html('');
			pc_index_headerhf.data.forEach((val) => {
				var oTr=`<tr>
						<td><a href="${val.href}">${val.title}</a></td>
						<td>${val.start_time}</td>
						<td>${val.end_time}</td>
						<td>
							<a href="./add.html?page=pc&type=change&place=hf1&id=${val.id}" class="layui-btn layui-btn-normal layui-btn-radius change">修改</a>
							<a href="javascript:void(0)" class="layui-btn layui-btn-danger layui-btn-radius del" data-id="${val.id}">删除</a>
						</td>
					</tr>`;
				$(className_headerHf+' tbody').append(oTr);
			});
			// 普通横幅
			$(className_hf+' tbody').html('');
			pc_index_hf.data.forEach((val) => {
				var oTr=`<tr>
							<td><a href="${val.href}">${val.title}</a></td>
							<td>
								<a href="./add.html?page=pc&type=change&place=hf&id=${val.id}" class="layui-btn layui-btn-normal layui-btn-radius change">修改</a>
							</td>
						</tr>`;
				$(className_hf+' tbody').append(oTr);
			});
		}else{
			alert(res.message);
		}
    }).catch(err => {
        console.log("err");  
    })
}
getdata_pc_index(1, 'pc_index_all', '.pc-table', '.rmkc-table', '.headerHf-table', '.pc_temp_hf');



layui.use(['layer', 'form', 'laydate', 'upload'], function () {
	var layer = layui.layer,
		form = layui.form,
		laydate = layui.laydate,
		upload = layui.upload;

	//监听提交
	form.on('submit(add-form)', function (data) {
		layer.msg(JSON.stringify(data.field));
		return false;
	});

	//日期
	laydate.render({
		elem: '#startdate',
		type: 'datetime'
	});
	laydate.render({
		elem: '#enddate',
		type: 'datetime'
	});

	//普通图片上传
	var uploadInst = upload.render({
		elem: '#btn-img-g',
		url: './php/upload/upenclosure.php',
		field: 'upfile',
		before: function (obj) {
			//预读本地文件示例，不支持ie8
			obj.preview(function (index, file, result) {
				$('#url-img-g').attr('src', result); //图片链接（base64）
			});
		},
		done: function (res) {
			//如果上传失败
			if (res.code > 0) {
				return layer.msg('上传失败');
			}
			//上传成功
		},
		error: function () {
			//演示失败状态，并实现重传
			var demoText = $('#text-img-g');
			demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
			demoText.find('.demo-reload').on('click', function () {
				uploadInst.upload();
			});
		}
	});
	var uploadInst = upload.render({
		elem: '#btn-img-s',
		url: './upload/',
		before: function (obj) {
			//预读本地文件示例，不支持ie8
			obj.preview(function (index, file, result) {
				$('#url-img-s').attr('src', result); //图片链接（base64）
			});
		},
		done: function (res) {
			//如果上传失败
			if (res.code > 0) {
				return layer.msg('上传失败');
			}
			//上传成功
		},
		error: function () {
			//演示失败状态，并实现重传
			var demoText = $('#text-img-s');
			demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
			demoText.find('.demo-reload').on('click', function () {
				uploadInst.upload();
			});
		}
	});
});

// 限制序号最小为0的整数
$(document).on('keyup',".num",function () {
	var value = $(this).val();
	$(this).val((value = value.replace(/\D/g, '')) == '' || (value = value.replace(/\D/g, '')) == 0 ? '0' : value);
});
$(document).on('paste',".num",function () {
	var val = $(this).val();
	$(this).val((val = val.replace(/\D/g, '')) == '' || (val = val.replace(/\D/g, '')) == 0 ? '0' : val);
});


// 左侧导航
$('.left-box li').on('click', function () {
	$(this).addClass('active').siblings().removeClass('active');
	$('.right-box .tab-show').eq($(this).index()).addClass('active').siblings().removeClass('active');
	window.scroll(0, 0);
});

// 默认操作加载页面
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
var urlJson = urlToJson(href);
var oPage = urlJson.page; // 那个页面
var oType = urlJson.type; // 什么操作
var oPlace = urlJson.place; // 什么位置
var oId = urlJson.id;   // 哪一个
var oCurrent = urlJson.current; // 是否显示推荐

if (oType == 'change') {
	// 修改页面   修改通用不显示推荐，修改省份显示推荐
	switch (oPage) {
		case 'mobile':
			if (oCurrent == 1) {
				$('.provinceBox,.titleBox,.urlBox,.imgBox,.timeBox,.submiBox').addClass('active');
			} else {
				$('.provinceBox,.titleBox,.urlBox,.imgBox,.timeBox,.recommendBox,.submiBox').addClass('active');
			}
			break;
		case 'dfz':
			if (oPlace == 'banner') {
				if (oCurrent == 1) {
					$('.provinceBox,.typeBox,.titleBox,.urlBox,.imgBox,.timeBox,.submiBox').addClass('active');
				} else {
					$('.provinceBox,.typeBox,.titleBox,.urlBox,.imgBox,.timeBox,.recommendBox,.submiBox').addClass('active');
				}
			} else {
				$('.titleBox,.urlBox,.imgBox,.submiBox').addClass('active');
			}
			break;
		case 'zbkt':
			if (oCurrent == 1) {
				$('.provinceBox,.titleBox,.urlBox,.imgBox,.imgsBox,.timeBox,.submiBox').addClass('active');
			} else {
				$('.provinceBox,.titleBox,.urlBox,.imgBox,.imgsBox,.timeBox,.recommendBox,.submiBox').addClass('active');
			}
			break;
	}
} else {
	// 新增页面默认不显示推荐
	switch (oPage) {
		case 'mobile':
			if (oCurrent == 1) {
				$('.provinceBox,.titleBox,.urlBox,.imgBox,.timeBox,.submiBox').addClass('active');
			} else {
				$('.provinceBox,.titleBox,.urlBox,.imgBox,.timeBox,.submiBox').addClass('active');
			}
			break;
		case 'dfz':
			if (oPlace == 'banner') {
				if (oCurrent == 1) {
					$('.provinceBox,.typeBox,.titleBox,.urlBox,.imgBox,.timeBox,.submiBox').addClass('active');
				} else {
					$('.provinceBox,.typeBox,.titleBox,.urlBox,.imgBox,.timeBox,.submiBox').addClass('active');
				}
			} else {
				$('.titleBox,.urlBox,.imgBox,.submiBox').addClass('active');
			}
			break;
		case 'zbkt':
			if (oCurrent == 1) {
				$('.provinceBox,.titleBox,.urlBox,.imgBox,.imgsBox,.timeBox,.submiBox').addClass('active');
			} else {
				$('.provinceBox,.titleBox,.urlBox,.imgBox,.imgsBox,.timeBox,.submiBox').addClass('active');
			}
			break;
	}
}

switch (oPage) {
	case 'pc':
		if (oPlace == 'banner') {
			$('.titleBox,.urlBox,.imgBox,.timeBox,.submiBox').addClass('active');
		} else if (oPlace == 'rmck') {
			$('.titleBox,.urlBox,.imgBox,.submiBox').addClass('active');
		} else if (oPlace == 'hf1') {
			$('.titleBox,.urlBox,.imgBox,.timeBox,.submiBox').addClass('active');
		} else {
			$('.titleBox,.urlBox,.imgBox,.submiBox').addClass('active');
		}
		break;
	case 'class':
		$('.titleBox,.urlBox,.imgBox,.submiBox').addClass('active');
		break;
	case 'zp':
		if (oPlace == 'banner') {
			$('.titleBox,.urlBox,.imgBox,.timeBox,.submiBox').addClass('active');
		} else {
			$('.titleBox,.urlBox,.imgBox,.submiBox').addClass('active');
		}
		break;
	case 'zgz':
		if (oPlace == 'banner') {
			$('.titleBox,.urlBox,.imgBox,.timeBox,.submiBox').addClass('active');
		} else {
			$('.titleBox,.urlBox,.imgBox,.submiBox').addClass('active');
		}
		break;
}

// 新增页面选择省份 -- 是否显示推荐
$('.provinceBox').on('click', '.layui-form-radio', function () {
	if ($(this).prev().val() == 0) {
		$('.recommendBox').removeClass('active');
	} else {
		$('.recommendBox').addClass('active');
	}
});

// 返回
$('.back-index').on('click', function () {
	window.location.href = './index.html';
});

// 删除
$(document).on('click', '.del',function () {
	if (confirm('确定删除吗')) {
		$.post('./php/del_banner.php',{
			state: 'del',
			id:$(this).attr('data-id')
		},(res) => {
			if(res.state == 1){
				alert(res.message);
				$(this).parent().parent().remove();
			}else{
				alert(res.message);
			}
		},'json');
		
	}
});

// 修改序号
$(document).on('change', '.num',function () {
	$.post('./php/modify_banner.php',{
		type:1,
		place:1,
		state: 'modify',
		modify_type: 'modify_num',
		id:$(this).attr('data-id'),
		num:$(this).val()
	},(res) => {
		if(res.state == 1){
			alert(res.message);
		}else{
			alert(res.message);
		}
	},'json');
});


