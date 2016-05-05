<?php

$arr          = array();
$arr[]        = 'pare';
$arr['fruit'] = 'apple';

$arr2 = array('name' => 'Alex', 'role' => 'programer');

echo count($arr),'<br>';

echo $arr[0],'<br>';

foreach($arr as $key => $val) {
    echo $key.' ... '.$val,'<br>';
}

foreach($arr2 as $key => $val) {
    echo $key.' ... '.$val,'<br>';
}

echo reset($arr),'<br>'; // изначально указатель не установлен. reset устанавливает его на первом элементе
echo current($arr),'<br>';
echo end($arr),'<br>';
echo prev($arr),'<br>';
echo next($arr),'<br>';
echo key($arr),'<br>';

echo '<pre>';
print_r($arr);
echo '</pre>';

echo '<pre>';
var_dump($arr);
echo '</pre>';

echo "This fruit is $arr[fruit]",'<br>';
echo "This fruit is ${arr['fruit']}",'<br>';
echo "This fruit is {$arr[fruit]}",'<br>';




?>