<script type="text/javascript">
	$( function() {
		$('body').on('dblclick', '.update', updateData);
		
        $('.status .filialInner').on('dblclick', function() {
            cleaner( $(this) ); // mr. Proper
			$(this).html( selectVipGeneration( $(this) ) );
			var sel = $(this).children('select');
			sel.on('change', function() { submitForm( $(this).parents('form'), sel ) } );
			sel.on('focusout', function(){ submitForm( $(this).parents('form'), sel ) } );
		});
		$('.type .filialInner').on('dblclick', function() {
            cleaner( $(this) ); // mr. Proper
			$(this).html( selectTypeGeneration( $(this) ) );
			var sel = $(this).children('select');
            sel.children('option:first-child').remove(); // ненужный первый option
			sel.on('change', function() { submitForm( $(this).parents('form'), sel ) } );
			sel.on('focusout', function(){ submitForm( $(this).parents('form'), sel ) } );
		});
        
/* filters */
		$('[data-type="static"] .filial.type select').on('change', function() {
			var data = $('[data-type="static"] .filial.type select option:selected').text();
			//console.log(data);
			/*
			$.ajax({
				
				type: 'POST',
				url : url,
				data : data,
				dataType : 'text',
				success  : function( data, status ) {  },
				error    : function (xhr, errorType, exception) { var errorMessage = exception || xhr.statusText; alert(errorMessage); },
				complete : function() {}
				
			});
			*/
		} );
		/*$('[data-type="static"] .filial.i_shedule input').on('keyup', function() {
			var data = $(this).val();
			console.log(data);
		} ); */
		$('[data-type="static"] .filial.status select').on('change', function() {
			var data = $('[data-type="static"] .filial.status select option:selected').val();
			//console.log(data);
		} );
		function submitForm( elemForm, elem ) {
console.log(elemForm.serialize());
			$.ajax({
				type     : 'POST',
				url      : '/ajax'+'/'+elemForm.data('form-type')+'/',
				data     : elemForm.serialize(),
				dataType : 'json',
				success  : function( data, status ) { ifSucces( data, elem.parent() ) },
				error    : function (xhr, errorType, exception) { var errorMessage = exception || xhr.statusText; alert(errorMessage); },
				complete : function() {}
			});
		}
		function updateData() {
            cleaner( $(this) ); // mr. Proper
			$(this).css('padding-left','0');
			var str = $(this).text();
			$(this).html( inputGeneration( $(this) ) );
			var inp = $(this).children('input');
			inp.val( str );
			inp.focus();
			inp.select();
            // inp.on('focusout', function() { submitForm( $(this).parents('form'), inp ) } );
		};
        /* SUBMIT */
		$('#listFilial form, #listClient form').on('submit', function() {
            submitForm( $(this), $(this).children().find('input') );
			return false
		} );
        function cleaner(elem) {
            $('form[data-form-type='+elem.parents('form').data('form-type')+']').find('input, select, textarea').each( function(){
                if( this.nodeName === 'SELECT' ){
                    $(this).parent().text(  $(this).children('select option:selected').text() );
                    $(this).remove();
                } else {
                    $(this).parent().text( $(this).val() ).css('padding-left','0.5em');
                    $(this).remove();
                }
            } );
        }
		function getSecondClass( elem ) {
			return elem.parent().attr('class').split(' ')[1]; // имя второго класса (костыль)
		}
		function inputGeneration( elem ) {
			return '<input type="text" name="'+elem.parent().data("name")+'">'
		}
		// VIP
		function selectVipGeneration(elem) {
			return '<select name="'+elem.parent().data('name')+'"><option value="1">VIP</option><option value="0">-</option></select>'
		}
		// TYPE
		function selectTypeGeneration(elem) {
			return '<select name="'+elem.parent().data('name')+'"> '+$('[data-type="static"] .filial.type select').html()+'</select>'
		}
		function ifSucces( data, elem ) {
			for (var i in data) {
                if( elem.children().is('select') ){ // проверяем, select ли внутри
                    if( elem.parent().is('.status') ){
                      var arr = new Array();
                        elem.children('select').children('option').each( function(){ 
                            arr[ $(this).val() ] = new Array( $(this).text() ); // готовим массив из имеющихся option
                        });
                        $('[data-name="'+data[i][0]+'"]').children('.filialInner').text( arr[ data[i][1] ] ); succesVisualEffect( $('[data-name="'+data[i][0]+'"]').children('.filialInner') );
                    } else{
                        if( elem.parent().is('.type') ){
                            var arr = new Array();
                            elem.children('select').children('option').each( function(){ 
                                arr[ $(this).val() ] = new Array( $(this).text() );
                            });
                            $('[data-name="'+data[i][0]+'"]').children('.filialInner').text( arr[ data[i][1] ] ); succesVisualEffect( $('[data-name="'+data[i][0]+'"]').children('.filialInner') );
                        }
                    }
                } else {
                    $('[data-name="'+data[i][0]+'"]').children('.filialInner').text( data[i][1].replace(/\\"/g,'"') );
    	            elem.css('padding-left','0.5em');
                    succesVisualEffect( $('[data-name="'+data[i][0]+'"]').children('.filialInner') );
                }
			}
		}
		function succesVisualEffect( elem ) {
			var dellay = 450;
			elem.each( function(i) {
				$(this).animate( {'background-color' : 'green', 'color' : 'white'}, dellay   );					
				$(this).animate( {'background-color' : 'white', 'color' : 'black'}, dellay   );					
			} );
		}
		/* title */
		$('.update').on('mouseover', function() {
			$(this).attr('title', $(this).text() );
		})
        /* pick date */
        $('[name="from"], [name="to"]').datepicker( {dateFormat: 'yy-mm-dd'} );
        /* time */
        var oneDay = 86400000; // ms
        // сейчас
        var now = new Date()
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();
        $('.datetimeget').each( function(){
            //console.log($(this).text().replace(/-/g,',').split(' ')[0])
            var dbDate = new Date( $(this).text().replace(/-/g,',').split(' ')[0] ).valueOf(); // преобразовання дата из базы
            if( dbDate <=  today - (oneDay*7) ) {
                $(this).css({'color':'orange'});
            }
            if( dbDate <=  today - (oneDay*14) ) {
                $(this).css({'color':'red'});
            }
            if( dbDate <=  today - (oneDay*28) ) {
                $(this).css({'color':'violet'});
            }
        });
	} );
</script>