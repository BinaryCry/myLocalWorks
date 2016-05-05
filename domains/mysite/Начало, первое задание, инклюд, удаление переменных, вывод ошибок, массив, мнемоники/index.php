<!doctype html>
<html id="html" class="no-js">
	<head>
		<meta charset="utf-8">
		<title></title>
		<link type="text/css" rel="stylesheet" href="style.css">
		<style type="text/css">
		
		</style>
		<script type="text/javascript">
			//alert("Kawaiiiiiiiiiiii!");
			
			window.onload = function() {
					
			/*	var a = 1;
				alert(!a);
				alert(!!a); */
			}
		</script>
	</head>
	<body>
	
	&#x1f63; <!-- вставка символа из таблицы юникода. x означает, что код в 16 системе -->
	&#8035; <!-- вставка символа из таблицы юникода. код в 10 системе -->
		<h1>
			<?php echo "Worked!"; ?>
		</h1>
		<h1>
			<?php print ("Worked!"); ?>
		</h1>
		<?php
			echo "<h1>Worked!</h1>";
			echo "<h1>","Worked!","</h1>"; // то же самое, что вызвать трижды echo
			$do = "Worked!";
			echo "<h1>",$do,"</h1>";
			
			
			// phpinfo();
			#коммент
			/* комvент */
			$a = 0;
			for ($i=0; $i<10; $i++) {
				echo $a++."<br>";
			}
			include "code.php";
			
			$str = 'TextString';
			
			echo '<br>'.$str;
			
			$arr = [1,2,3,4,5];
			echo '<br>'.$arr[0];
			
			$L = "L"; echo $L;
			unset($L); echo $L; // удаление переменной
			$L = "L"; echo $L;
			
			error_reporting(0); // уведомление об ошибках runtime. 0 - никакого вывода в браузер
			error_reporting(E_ALL); // уведомление об ошибках runtime. Выводить все ошибки, предупреждения и уведомления
			
			// -----------------------------
			$name = "Саша";
			$age = "23";
			echo "<p>Меня зовут ",$name,", мне ",$age," года";
			
		?>
			
	</body>
</html>