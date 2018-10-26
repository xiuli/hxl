$(function(){
	$('.phone-top .navicon').click(function(){
		$(this).toggleClass('trangle');
		$('.phone-top .sublist').slideToggle();
	})
})
$(function(){
	$('.slide .close').click(function(){
		$('.slide').animate({'right':'-190px'},400)
		$('.open').animate({'right':'0px'},400)
	})
	$('.open').click(function(){
		$('.slide').animate({'right':'0px'},400)
		$('.open').animate({'right':'-28px'},400)
	})
	$(".s-top").click(function(){
	  $("html,body").animate({scrollTop:0});
	});
	 
})
