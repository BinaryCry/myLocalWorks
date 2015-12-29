<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Title</title>
		<link type="text/css" rel="stylesheet" href="style.css">
		<style type="text/css">
		
		</style>
		<script type="text/javascript">
			window.onload = function() {}
		</script>
	</head>
	<body>
	<?php
	// Узнать максимальный размер принимаемого файла в байтах
	// ini_get('имя директивы'); получить значение директивы из php.ini
	// ini_set('имя директивы', 'on || значение'); задать значение в runtime. доступно не для всех директив
	// обе возвр. строку
		
		$postMaxSize = ini_get('post_max_size'); 
		$letter = $postMaxSize{ strlen($postMaxSize)-1 };
		$postMaxSize = (integer)$postMaxSize;
		switch($letter) {
			case 'G': $postMaxSize *= 1024; // если размер указан в гигабайтах, отработается умножение трижды, так как нету break
			case 'M': $postMaxSize *= 1024; // если размер указан в мегабайтах, отработается умножение дважды, так как нету break
			case 'K': $postMaxSize *= 1024; // если размер указан в килобайтах, отработается умножение один раз
		}
		echo 'POST max size: ' . $postMaxSize . 'bytes'; // приводим строковый тип в integer, чтобы убрать окончание, размерность
		
		// МАССИВЫ
		
		$user[] = 'John'; // [0]
		$user[] = 'root'; // [1]
		$user[] = 25;
		$user[] = true;
		$user[] = 'base64'; // [4]
		echo '<br>' . count($user); // количество элементов в массиве
		echo '<br>' . $user[0] . '<br>';
		
		echo '<pre>';
		print_r($user); // вывод массива
		var_dump($user); // подробный вывод массива
		echo '</pre>';
		
		// можно задать индексы самостоятельно. в таком случае количество ячеек не изменится. индексы задаются для удобства исспользования
		$agent[11] = 'Name';
		$agent[2] = 'Age';
		$agent[] = 'Profession'; // если индекс не задан, будет присвоен следующий, после максимального, который уже обрабатывался. в данном случае - 12, так как PHP читает массивы сверху вниз и наибольшее число, которое он встретил, было 11
		$agent[52] = 'Education';
		$agent[] = 'Role'; // 53
		
		echo '<pre>';
		print_r($agent);
		echo '</pre>';
		
		$arr = array(); // пустой массив. false (функция!)
		$arr = array(10=>'Mike',2=>25,'manager'); // => указываем, в какую ячейку вносить данные
		echo '<pre>';
		print_r($arr);
		echo '</pre>';
		
		// ассоциативный массив
		unset($arr);
		
		$arr['name'] = 'John';
		$arr['age'] = 25;
		$arr['role'] = 'manager';
		
		// или
		unset($arr);
		$arr = array('name' => 'John', 'age' => 25, 'role' => 'manager');
		
		echo '<pre>';
		print_r($arr);
		echo '</pre>';
		
		// использование данных из массива на реальном примере
		echo "He's $arr[name], $arr[age]. Role: $arr[role]"."<br>"; // не заключаем имя ячейки в скобки, так как это все цельная строка и аргументом в индекс массива уйдет строка
		echo "He's ${arr['name']}, ${arr['age']}. Role: ${arr[role]}"."<br>"; // можно использовать другой тип скобок и экранирование переменных
 		echo "He's {$arr['name']}, {$arr['age']}. Role: {$arr[role]}"."<br>";  // можно брать в фгурные скобки всю переменную
        // $arr[bmw]; // в таком случае, интерпретатор сначала проверит константы, а потом уже переменные (приведет тип). Поэтом улучше указывать ключ к скобках
		
        echo '<br>' , $arr['name'];
		echo '<br>' . count($arr);
       
		// массив может быть многоммерным любой вложенности
		$workers['John'] = array(
			'age' => '23',
			'role' => 'manager',
			'office' => '412'
		);
		$workers['Ann'] = array(
			'age' => '27',
			'role' => 'provisor',
			'office' => '611'
		);
		echo '<pre>';
		print_r($workers);
		echo '</pre>';
		
		error_reporting(E_ERROR | E_WARNING | E_PARSE);
		// error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE | E_ALL);
		
		if ( is_null($workers) ) echo "1"; else echo "0";
		//$workers = array();
		unset($workers);
		if ( is_null($workers) ) echo "1"; else echo "0";
		
		// КОНСТАНТЫ // если контента используется в выводе строки, то лучше ее конкатенировать
		define('Pi', 3.141592, true); // последний параметр указывает на то, что имя константы будет регистронезависимым. параметр необязателен
		echo Pi;        
        // defined('имя константы'); // вернет true, если такая контанта уже есть
        
        /* изменение понятий
        define('true',false,true);
        define('false',true,true);
        */
        
        echo '<hr>';
	?>
    
	<?php
        // Пре-Пост- Инкремент и Декремент работают как с Си
        // ЦИКЛЫ
        
        for($i = 1; $i<=50; $i += 2, $forV = $i) { // через запятую можно добавлять действия в любую из трех частей конструкции
            echo $i."\t";
        }
        echo $forV."<br>";
        
        $str = "Alex Step";
        for ($j = 0, $cnt = strlen($str); $j < $cnt; $j++) { // вычисляем длину строки в первом из трех блоков, чтобы не вызывать функцию strlen каждый раз во втором блоке
            echo $str{$j}."\t";
        }
        
        // такой же цикл, но while
        $j = 0;
        $cnt = strlen($str);
        while($j < $cnt){
             echo $str{$j}."\t";
             $j++;
             
             // break; - закончить цикл, выполнить код дальше (если цикл в цикле, то будет завершен тот уровень, при выполнении которого встреиился break))
                // можно указать конкнетное значение, указывающее, с какого уровня выскочить break 2
             // continue; - пропустить иттерацию. Принцип схож с break
        }
        
        // do while
        $itter = 5;
        do { $itter--; } while( $itter != 0 );
        
        echo '<hr>';
    ?>
    <?php
    // таблица умножения
    
    unset($i); unset($j);
       // $rows = 5;
       // $cols = 9;
       //$color = 'orange';
        multiple_table(5,9,'orange');
        multiple_table(4,4,'pink');
        function multiple_table($rows=5, $cols=5, $color='yellow'){
            echo "<table border=\"1\" cellpadding=\"5\" cellspacing=\"5\" style=\"text-align: right; border-color: #555\">";
            for($i=1; $i<=$rows; $i++){
                echo "<tr>";
                for($j=1; $j<=$cols; $j++){
                    if($i==1 or $j==1) echo "<th style=\"background:".$color."; color: grey\">". $i * $j ."</th>";
                    else echo "<td>". $i * $j ."</td>";
                }
                echo "</tr>";
            }
            echo "</table>";
        }
        
        echo '<hr>';
        
        // FOREACH
        $fruit = 'mango';
        $fruits = array('first' => 'apple', 'second' => 'pare', 'thirt' => 'banana');
        
        foreach($fruits as $name=>$value) {
            echo $name." --> ".$value.'<br>';
        };
        
        echo '<hr>';
        
        // MENU
        $menu = array('Home'=>'index.php', 'Material'=>'materials.php', 'About'=>'about.php', 'Contacts'=>'contacts.php');
        
            echo '<ul>';
                foreach($menu as $key => $value) {
                    echo "<li><a href=\"$value\">$key</a></li>";
                }
            echo '</ul>';
        
        echo '<hr>';
        
        // перемешение по массиву
        // каждый массив имеет в себе некий курсор, указатель на текущий элемент
        
        echo reset($menu).'<br>'; // изначально установить указатель на первом элементе и вывести его значение. Есл этого не сделать, то с ассоциативным массивом данное действие не сработает. Только если массив индексированный (наблюдение))
        echo current($menu).'<br>'; // показать значение, на которое указыват указатель в данный момент
        echo next($menu).'<br>'; // попереместить указатель дальше на 1 и показать значение
        echo prev($menu).'<br>'; // попереместить указатель назад на 1 и показать значение
        echo end($menu).'<br>'; // показать последнее значениеь
        echo key($menu).'<br>'; // вывести имя ключа элемента, на который в данный момент указывает указатель
        
        
        // !!!!!
        echo $a = ''; // пустая строка == false, то есть результатом этого выражения будель false и в случае, где идет проверка while($a = ''), результатом данной проверки будет false и цикл закончится
        // то есть при выраении $a = $b, НА ИСТИННОСТЬ БУДЕТ ПРОВЕРЯТЬСЯ РЕЗУЛЬТАТ, ТО ЕСТЬ $a
        echo '<hr>';
    ?>
	<?php
        // ФУНКЦИИ (имена функций регистронезависимые, передекларация функций не позволяется)
        
        // обратный вызов функции
        function foo(){
            echo 'callback foo'.'<br>';
        }
        function starting($f){
           eval($f.'();');
           $f(); // или так (имя функции в переменной)
        }
        starting(foo);
        
        if(function_exists('foo')) echo 'Такая функция уже существует'.'<br>';
        
        function headerOut($size) {
            echo "<h$size>Hello, World!</h$size>";
        }
        headerOut(3);
        
        // аргумент функции по-умолчанию
        function expFS($first, $second=2){ // значение второй переменной указывается по-умолчанию, это значит, что если вызвать функцию лишь с одним параметром, значение второму будет подставлено автоматически
            echo "Exp = ",$first+$second."<br>"; // вместо конкатенации строк нужно использовать последовательный вызов echo, чтобы сначала показать строку, а после результат выражения
             //echo "Exp = ".$first/$second."<br>"; // в таком случае, строка и значение первой переменной сконкатенируются в строку (так как у конкатенации выше приоритет,
             //нежели у сложения или вычитания), которая будет иметь численный эквивалент 0, а результат выражения получим {0 + или - значение}.
             //НО! Если взять вырежние в скобки, то ошибок в последовательности действий не будет
        }
        expFS(5,5);
        expFS(5); // вторым значением функции будет 2
    
    ?>
	</body>
</html>