(function(window){
window.document.addEventListener("readystatechange", function(){
	var state = window.document.readyState;
	
		switch 	(state){
		 case 'interactive':
		// $('body').append("<div class='status'><strong><span style='color: #B2C629;'>Loaded</span></strong><img src='/assets/tempaltes/images/loader.gif' /></div>");
		$('body').append("<div id='loader_bg'><div id='loader'></div></div>"); 
                break
		 case 'loading':
		// $('body').append("<div class='status'><strong><span style='color: #B2C629;'>Loading</span></strong><img src='/assets/tempaltes/images/loader.gif' /></div>");
		$('body').append("<div id='loader_bg'><div id='loader'></div></div>"); 
                break
		 case 'uninitialized':
		// $('body').append("<div class='status'><strong><span style='color: #B2C629;'>Not loaded yet</span></strong><img src='/assets/tempaltes/images/loader.gif' /></div>");
		$('body').append("<div id='loader_bg'><div id='loader'></div></div>");
                break
		 case 'complete':
		 $('#loader_bg').fadeOut('slow');
		 break
		}

		var time = 0;
		
		setInterval( function(){ ++time;} , 1);
	
 //interactive
 // complete

}); 

/* buffer */
/* var buffer = new makeBuffer(); */
		
/* buffer( 'Замыкания' );
buffer( ' Использовать' );
buffer( ' Нужно!' ); */ 



	
//alert( buffer() );
		
/* function makeBuffer() {
	var stringBuffer = "";
				
	return function( string ) {
		if ( string !== undefined ) {
			stringBuffer += string;
		}
				
		return stringBuffer;
	}
} */
/* end buffer */

$(document).ready(function(){

/* Список сервисов ( выравниывние ) */
function center(){
	if($('.serv_list').length > 0){
	    var colEl 		= $('.serv_list > ul > .blk').length;
		var sWidth 		= $('.serv_list > ul > .blk').width();
		
		var sOffs 		= document.getElementById('serv_c').getBoundingClientRect();
		var sW	 		= $('.serv_list').width();
		
		var rightOfs 	= $('.right-sidebar').offset();
		
		var parentWidth	= $('.c_content').width();

		var allWa = sWidth * colEl;
	    var allWb = sWidth * colEl / 2;
		
		
		 if(sOffs.right < rightOfs.left){
			var marg = (parentWidth - allWa) / 2 ;
			
			$('.serv_list').css({ "margin-left" : marg , "width" :  allWa });
		 }else{
			var marg = (parentWidth - allWb) / 2 ;
			
			$('.serv_list').css({ "margin-left" : marg , "width" : allWb });
		 } 
		
	 	//console.log($('.serv_list').offset()); 
			
	
	}
}

 center();
$( window ).resize(function() {
	center();
});  

/* Список сервисов ( анимация ) */

$( '.serv_list > .list > li > div > a' ).hover( function(){
	var prev = $(this).parent().css('boxShadow');
	console.log(prev);
	$(this).parent().animate({boxShadow: '0 15px 20px 0 #44f'});
} , function(){
	$(this).parent().animate({boxShadow: '0 10px 5px 0 rgba(240, 242, 240, 0.75)'});
	
} );

/* Список сервисов end */


/* $.post('/rq-stat.html', function(data){}); */

/* scroller */

// появление/затухание кнопки #back-top
	$(function (){
		// прячем кнопку #back-top
		$("#back-top").hide();
	
		$(window).scroll(function (){
			if ($(this).scrollTop() > 100){
				$("#back-top").fadeIn();
			} else{
				$("#back-top").fadeOut();
			}
		});

		// при клике на ссылку плавно поднимаемся вверх
		$("#back-top a").click(function (){
			$("body,html").animate({
				scrollTop:0
			}, 800);
			return false;
		});
	});

/* end scrool */

$("a[href='web-tools/']").click(function(e){
return false;
});

 /* Кнопка отправки формы */
	$('#button').click(function(){
		$(this).toggleClass('on');
		$('#h_form').submit();
	});
	
		
	$('#act').bind('change' , function(){
	$('#act_f').submit();
	});
/* -Кнопка отправки формы */

/* Авторизация */
	
	function getControll(){
		$('.dragable').draggable();
		$('.icon-res').click(function(){
		$('.win_content').slideToggle('slow');
	});
		$('.icon-remove').click(function(){
		$(this).parent().parent().parent().remove();
	});
	
		$('#login_frm').bind('submit' , function(e){
		
			$.ajax({
                type    : "POST",
                cache   : false,
                url             : "/users/loginin.html",
                data    : $(this).serializeArray(),
                success: function(data) {
                        var errMessage = $(data).find(".loginMessage").text();
                        if(errMessage == ""){
                                window.location = "/users/profile.html";
                        }else{
                                $(".loginMessage").text(errMessage).css({ 
								 'background' : 'none repeat scroll 0 0 rgba(255, 135, 100, 0.8)',
								 'border' : '1px solid red' ,
								 'font-weight' : 'bold' ,
								 'padding' : '5px' ,
								 'text-align' : 'center'
								});
                        }
                }
        });
		 return false;
		});
	
	}
	
	$(".login_a").bind('click' , function(){
	 $.post('/users/loginin.html', function(data) {
	  		$('.ajax_holder').html(data);
			getControll();
	 });
	  
	});

	
	$(".a_logout").bind('click' , function(){
	 $.get( "/users/loginin.html", { service: "logout" } , function(){
	  window.location='/';
		/* $("body").append("<div class='window dragable' ><div class='window_header'><a class='btn' href='javascript:void(0)'><i class='icon-remove'></i></a><a class='btn' href='javascript:void(0)'><i class='icon-res'></i></a></div><div class='win_content'><h3>Вы вышли из системы</h3></div></div>"); */
	 } );
	});
	
	/* $('.dragable').draggable();
	
	$('.icon-res').click(function(){
		$('.win_content').slideToggle('slow');
	});
	
	$('.icon-remove').click(function(){
		$(this).parent().parent().parent().remove();
	}); */
	
		
	
  // Вешаем обработчик события "клик" на кнопку с классом .more
  $('.ajax_button').click(function() {

    // Ajax post-запрос к странице, выдающей ресурсы (в ней сниппет ajaxResources) 
    var data = $(this).data();

    $.post('/ajax.html', data, function(data) {
      
      // Выдаем ответ
      //$('.ajax_holder').append(data);
      $('.ajax_holder').html(data);
    
    })
    // В случае если у вас вместо кнопки ссылка - a href="#", то расскоментируйте строку ниже
    // return false;
  });
  
  $(".close").bind('click' , function(){
   $(this).parent().css({"border" : "1px solid red"});
  });
	
/* -Окна */

$(window).bind('beforeunload', function(e){

});
	
});

// Используем немедленно выполняемый функцтор для безопасного применения $
(function( $ ) {

  // Создаем плагин
  $.fn.tooltips = function(el) {

    var $tooltip,
      $body = $('body'),
      $el;

    // Убеждаемся, что работаем с цепочкой
    return this.each(function(i, el) {
    
      $el = $(el).attr("data-tooltip", i);

      // Создаем DIV и добавляем его на страницу
      var $tooltip = $('<div class="tooltip" data-tooltip="' + i + '">' + $el.attr('title') + '<div class="arrow"></div></div>').appendTo("body");

      // Позиционируем сначала на месте элемента
      var linkPosition = $el.position();

      $tooltip.css({
        top: linkPosition.top - $tooltip.outerHeight() - 13,
        left: linkPosition.left - ($tooltip.width()/2)
      });

      $el
      // Выкидываем желтый прямоугольник
      .removeAttr("title")

      // Курсор мыши наводится на объект
      .hover(function() {

        $el = $(this);

        $tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']');

        // Переставляем подсказку в случае движения страницы, например, при изменении размера
        var linkPosition = $el.position();

        $tooltip.css({
          top: linkPosition.top - $tooltip.outerHeight() - 13,
          left: linkPosition.left - ($tooltip.width()/2)
        });

        // Добавляем класс для анимации через CSS 
        $tooltip.addClass("active");

        // Курсор мыши покидает объект
      }, function() {

        $el = $(this);

        // Временный класс для скрытия подсказки
        $tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']').addClass("out");

        // Удаляем все классы
        setTimeout(function() {
          $tooltip.removeClass("active").removeClass("out");
          }, 300);

        });

      });

    }

})(jQuery);


})(window);