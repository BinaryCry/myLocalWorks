<?php

    //$f = fopen('temp.html', 'w');

    $content=file_get_contents('http://bdpu.org');
    //fputs($f,$content);
    
    //fclose($f);
    //unset($f);
    
    echo $content;

?>