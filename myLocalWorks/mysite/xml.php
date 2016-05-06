<!DOCTYPE html>
<html>
	<head>
		<meta charset="windows-1251">
  </head>

<body>
<?php
    if (@fopen('http://ladyshop.ua/yml/yandexmarket.xml', "r")) {
        $pharmacyid = 1758;
        $count = 0;
        $xmlstr = file_get_contents('http://ladyshop.ua/yml/yandexmarket.xml');
        $yml_catalog = new SimpleXMLElement($xmlstr);
        
        $db = mysql_connect("meddovidka.ua","u_alexstep","kQPJ9LPX") or die ("Не могу соединиться с MySQL");
        mysql_select_db('meddovid7',$db);
        
        $query = "INSERT LOW_PRIORITY INTO usr_medicine (name,amount,pharmacyid) VALUES";
       
        foreach($yml_catalog->shop->offers->offer as $elem) {
            $arr[]="('".check(iconv("UTF-8","windows-1251",$elem->name))."','".check(iconv("UTF-8","windows-1251",$elem->price))."','".$pharmacyid."')";
            $count++;
        }
        
        mysql_query("DELETE LOW_PRIORITY FROM usr_medicine WHERE usr_medicine.pharmacyid = $pharmacyid");
        mysql_query( $query .= implode(",",$arr) );
        mysql_close();
        echo "Считано $count строк";
    } else {
        echo "Файл не найден";
        }

    function check($val) {
        $val = trim($val);
        $val = stripslashes($val);
        $val = mysql_real_escape_string($val);
        $val = htmlspecialchars($val, ENT_NOQUOTES);
        return $val;
        
        //unset($yml_catalog);
        
         /*
        foreach($yml_catalog->shop->offers->offer as $elem) {
            $query .= "('".iconv('UTF-8','windows-1251',check($elem->name))."','".iconv('UTF-8','windows-1251',check($elem->price))."',$pharmacyid), ";
        }; */
        // mysql_query(substr($query, 0, -2));
        
        
        /*
        
         foreach($yml_catalog->shop->offers->offer as $elem) {
            $val[]="(".$elem->name,$elem->price,$pharmacyid.")";
            }
            
            $query.=check(implode(','$val));
        
         */
    }
?>
</body>
</html>