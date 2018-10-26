$(function(){
  let phpUrl = {
    zx:'http://m.hteacher.net/zhuanti/2018bjzp/php/bjkszx_do_test.php',
    class:'http://m.hteacher.net/zhuanti/2018bjzp/php/bjclass_do_test.php'
  };
 
  let bFlagScroll=true;
  let page =0;
  let getAjax={
    zx : function(url,id,page){
      $.ajaxSettings.async = false;  
      $.post(url,{
        tid: id,
        page: page 
      },(res) => {
        if(res.message == 1){
          console.log(res.data);
          // $(res.data).each(function(index,elem){
    
          // });
          
          res.data.forEach((elem,index,arr)=> {
            let oLi = $('<li></li>');
            oLi.html(`
                <a href="http://m.hteacher.net/article/article.php?id=${arr[index].aid}">                
                <h3><em>¡¾${arr[index].typename}¡¿</em>${arr[index].titlelen}</h3>                
                <p class="des">
                  <em class="red">µ¼¶Á£º</em>${arr[index].description}
                </p>                
                <time>${arr[index].senddate}</time>                
              </a>
            `);
    
            // oLi.html('\
            // <a href="http://m.hteacher.net/article/article.php?id='+arr[index].aid+'"\
            //     <h3><em>¡¾'+arr[index].typename+'¡¿</em>'+arr[index].titlelen+'</h3>\
            //     <p class="des">\
            //       <em class="red">µ¼¶Á£º</em>'+arr[index].description+'\
            //     </p>\
            //     <time>'+arr[index].senddate+'</time>\
            //   </a>\
            // ');
    
            $('.newslist').append(oLi);
          });
        }else{
          $('.loadingEnd').addClass('active');
          bFlagScroll=false;
        }
      }, 'json');
      $.ajaxSettings.async = true;  
    }
  };
  

  getAjax.zx(phpUrl.zx,1,0);

  
  $(window).on('scroll',function(){
    
    if($(window).scrollTop()+$(window).height()>=$(document).height()-200){
      if(bFlagScroll){
        page++;
        getAjax.zx(phpUrl.zx,1,page);
      }
    }
  });

});