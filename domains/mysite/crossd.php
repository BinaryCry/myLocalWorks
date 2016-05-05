<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

	<title>Неназванный 1</title>
    <style type="text/css">
        body * {
            box-sizing : border-box;
        }
        .li {
            width: 50%;
            height: 150px;
            background-color: green;
            display: inline-block;
        }
        .li:nth-child(odd) {
            float: left;
        }
        .li:nth-child(even) {
            float: right;
        }
        
        .big {
            height: 200px;
            background-color: yellow;
        }
        #frame {
            width: 35%;
            height: 200px;
            overflow: scroll;
            margin: 0 auto 20px;
            border: 1px solid #333;
            display: block;
        }
    </style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script type="text/javascript">
        
        $(document).ready(function(){
            $('body').on('mouseenter','li',function(){
                $(this).css({
                    'border' : '1px solid #fff'
                })
            })
            $('body').on('mouseleave','li',function(){
                $(this).css({
                    'border' : '0px none'
                })
            })
            
            $('iframe#frame').on('mouseenter','input',function(){
                $(this).css({
                    'border' : '2px solid #red'
                })
            })
                        
            $.ajax({
				
				type: 'POST',
				url : 'alert.js',
                dataType : 'text',
				success  : function( data, status ) { /* newWindow(data) */ },
				error    : function (xhr, errorType, exception) { var errorMessage = exception || xhr.statusText; alert(errorMessage); },
				complete : function() {}
				
			});
            
            // PATH's ??
            
            function newWindow(DATA) {
                var width  = 400
                var height = 400
                var left   = 100
                var top    = 100
                var params = "width="+width+",height="+height+",top="+top+",left="+left+", status=0, location=0, menubar=0, toolbar=0, scrollbars=0";
                wnd = open("", 'BDPU', params);
                
                wnd.document.open();
                wnd.document.write(DATA)  
                wnd.document.location = "http://bdpu.org"                              
                wnd.document.close();
            }
            
            
            /*
            
            $('iframe#frame').contents().find('*').each(function(){$(this).off('click')}); $('iframe#frame').contents().find('a').each(function(){ $(this).on('click',function(){ return false }) }); $('iframe#frame').contents().find('*').each(function(){ $(this).attr('onclick','')}); $('iframe#frame').contents().find('*').each(function(){ $(this).attr('target','')}); $('iframe#frame').contents().find('body').on('click',function(){alert('1')}); $('iframe#frame').contents().find('form').each(function(){$(this).on('submit',function(){return false})});
            
            */
            
            $('#ya').on('click',function(){
                return false
            })
            
        })
        
    </script>
</head>

<body>
    
    <iframe id="frame" src="temp.html"></iframe>
    
    <a id="ya" href="http://ya.ru">ya.ru</a>
    
    <ul style="width:  50%; list-style: none; padding: 0; margin: 0">
        <li class="li"></li>
        <li class="li big"></li>
        <li class="li"></li>
        <li class="li"></li>
        <li class="li big"></li>
        <li class="li"></li>
    </ul>


</body>
</html>