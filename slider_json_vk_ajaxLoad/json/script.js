<script type="text/javascript">
	$( function() {
		var selectors = '.name .filialInner, .address .filialInner, .i_phone .filialInner, .i_shedule .filialInner, .i_comment .filialInner';
		$('body').on('dblclick', selectors, updateData);
		$('.status .filialInner').on('dblclick', function() {
			$(this).html( selectVipGeneration( $(this) ) );
			var sel = $(this).children('select');
			sel.on('change', function() { submitForm( $(this).parents('form'), sel ) } );
			sel.on('focusout', function(){ submitForm( $(this).parents('form'), sel ) } );
		});
		$('.type .filialInner').on('dblclick', function() {
			$(this).html( selectTypeGeneration( $(this) ) );
			var sel = $(this).children('select');
			sel.on('change', function() { submitForm( $(this).parents('form'), sel ) } );
			sel.on('focusout', function(){ submitForm( $(this).parents('form'), sel ) } );
		});
		
/* filters */
		$('[data-type="static"] .filial.type select').on('change', function() {
			var data = $('[data-type="static"] .filial.type select option:selected').text();
			console.log(data);
			/*
			$.ajax({
				
				type: 'POST',
				url : url,
				data : data,
				dataType : 'text',
				success  : function( data, status ) {  },
				error    : function (xhr, errorType, exception) { var errorMessage = exception || xhr.statusText; alert(errorMessage); },
				complete : function() {},
				username : 'test',
				password : 'qwe'
				
			});
			*/
		} );
		$('[data-type="static"] .filial.i_shedule input').on('keyup', function() {
			var data = $(this).val();
			console.log(data);
		} );
		$('[data-type="static"] .filial.status select').on('change', function() {
			var data = $('[data-type="static"] .filial.status select option:selected').val();
			console.log(data);
		} );
/* end filters */
		
		function submitForm( elemForm, elem ) {
console.log(elemForm.serialize());
			$.ajax({
				type     : 'POST',
				url      : '/ajax'+'/'+elemForm.data('form-type')+'/',
				data     : elemForm.serialize(),
				dataType : 'json',
				success  : function( data, status ) { ifSucces( data, elem.parent() ) },
				error    : function (xhr, errorType, exception) { var errorMessage = exception || xhr.statusText; alert(errorMessage); },
				complete : function() {},
				username : 'test',
				password : 'qwe'
			});
		}
		function updateData() {
			$(this).css('padding-left','0');
			var str = $(this).text();
			$(this).html( inputGeneration( $(this) ) );
			var inp = $(this).children('input');
			inp.val( str );
			inp.focus();
			inp.select();
			inp.on('focusout', function() { submitForm( $(this).parents('form'), inp ) } );
		};
		function getSecondClass( elem ) {
			return elem.parent().attr('class').split(' ')[1]; // имя второго класса (костыль)
		}
		function inputGeneration( elem ) {
			//console.log( elem.parent().data('name') );
			//console.log(elem.text().replace('"',"\""));
			//console.log(str.replace(/"/g,'\\"'));
			return '<input type="text" name="'+elem.parent().data("name")+'">'
		}
		// VIP
		function selectVipGeneration(elem) {
		console.log( elem.parent().data('name') );
			return '<select name="'+elem.parent().data('name')+'"><option value="1">VIP</option><option value="0">-</option></select>'
		}
		// TYPE
		function selectTypeGeneration(elem) {
			elem.css('padding-left','0');
		console.log( elem.parent().data('name') );
			return '<select name="'+elem.parent().data('name')+'"><option value="1">Аптека</option><option value="2">Клиника</option><option value="3">Больница</option><option value="4">Роддом</option><option value="5">Ветклиника</option><option value="6">Поликлиника</option><option value="7">Диспансер</option><option value="8">Стоматология</option><option value="9">Нетрадиционная медицина</option><option value="10">Институт</option><option value="11">Травмпункт</option></select>'
		}
		function ifSucces( data, elem ) {
			console.log(data);
			for (var i in data) {
				//console.log('key: '+data[i][0]+' value: '+data[i][1]);
				//console.log($('[data-name="'+data[i][0]+'"]'));
				elem.children('input').remove();
                
				$('[data-name="'+data[i][0]+'"]').children('.filialInner').text( data[i][1].replace(/\\"/g,'"') );
				elem.css('padding-left','0.5em');
				
				succesVisualEffect( $('[data-name="'+data[i][0]+'"]').children('.filialInner') );
			}
		/*	elem.text( data );
			elem.css('padding-left','0.5em');
			elem.children().remove(); // удаляем <input> или <select>, который находится внутри блока
			succesVisualEffect( elem ); */
		}
		function succesVisualEffect( elem ) {
			var dellay = 350;
			elem.each( function(i) {
				$(this).animate( {'background-color' : 'green', 'color' : 'white'}, dellay   );					
				$(this).animate( {'background-color' : 'white', 'color' : 'black'}, dellay   );					
			} );
			//elem.animate( {'background-color' : 'green', 'color' : 'white'}, 250   );
			//elem.animate( {'background-color' : 'white', 'color' : 'black'}, 250   );
		}
		/* title for all selectors */
		$(selectors).on('mouseover', function() {
			$(this).attr('title', $(this).text() );
		})
		$('form').on('submit', function() {
			return false
		} );
		
		/* not use anymore 
		function ifError ( data ) {
			console.log(data);
		} 
		function replDoubleQuotes( str ) {
			return str.replace(/"/g,"'");
		}
		function backDoubleQuotes( str ) {
			return str.replace(/\\'/g,'"');
		}
		*/
	} );
</script>