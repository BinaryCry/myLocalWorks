<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<style type="text/css">
		.read-more-link, .entry-meta, .archive-title, .pagination {
			display: none !important;
		}
		
		div.post-articles.row {
			display: block;
			width: 198px;
			overflow: hidden;
			margin-bottom: 10px;
		}
		div.four.columns {
			display: block;
			float: left;
			margin-right: 8px;
			width: 55px;
		}
		img.attachment-post-thumbnail.wp-post-image {
			width: 55px;
			border: 1px solid #ccc;
		}
		
		.entry-title {
			font: bold 12px 'Myriad Pro', sans-serif;
			margin: 0;
			line-height: 12px;
			margin-right: 20px;
		}
		a {
			text-decoration: none;
		}
		a img {
			
		}
		.entry-summary {
			font: 12px 'Myriad Pro', sans-serif;
			line-height: 12px;
		}
		.entry-summary p {
			margin-right: 20px;
		}
		p {
			margin: 4px 0 0;
		}
		#newsBox {
				width: 198px;
				height: 440px;
				overflow-y: scroll;
				overflow-x: hidden;
		}
	</style>
	<script src="http://us.bdpu.org/wp-includes/js/jquery/jquery.js?ver=1.8.3" type="text/javascript"></script>
	<script type="text/javascript">
		window.onload = function() {
			var allImages = jQuery("img.attachment-post-thumbnail.wp-post-image");
			
			for (var i=0; i<allImages.length; i++) {
				var imgLink = allImages.eq(i).attr("src");
				parent = allImages.eq(i).parent();
				allImages.eq(i).detach();
				
				parent.append('<div style="width: 55px; height: 61px; overflow: hidden;"><img src="'+imgLink+'" style="height: 100%; margin-left: -35%;"></div>');
				
				/*parent.append('<img style="display: block; width: 102px; height: 102px; background-image: url('+imgLink+'); background-position: top center;">');*/
			}
			
			jQuery("div.home-articles.horizontal-divider.row:last").css("margin-bottom","0");
		}
	</script>
</head>
<body>
<div id="newsBox">

<?php
	#откуда будем парсить информацию:
	#$content=file_get_contents('http://us.bdpu.org/');
	$content=file_get_contents('http://us.bdpu.org/2016');

	#начало забираемого контента:
	#$pos=strpos($content,'<h3 class="divider-title">');
	$pos=strpos($content,'<header class="archive-header">');

	#Отрезаем все, что идет до нужной нам позиции:
	$content=substr($content,$pos);

	#Таким же образом находим позицию конечной строки:
	$pos=strpos($content, '<div id="secondary" class="widget-area three columns" role="complementary">');

	#Отрезаем ненужное:
	$content=substr($content,0,$pos);

	#Если встречается код, который нам ненужен, вырезаем его:
	$content=str_replace('Код, который нужно вырезать.','', $content);

	#Выводим спарсенный текст:
	echo $content;
?>
</div>
</body>
</html>