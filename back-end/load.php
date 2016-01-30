<?php
	
    $jsonTodos = $_POST['todos'];
    $jsonTodosGet = $_GET['todos'];
    $name = 'todos.txt';

    if (strcmp($jsonTodosGet, "get") === 0) {
    	$fh = fopen($name, "rb");
		$buff = fread($fh, filesize($name));
		echo stripcslashes($buff);
		fclose($fh);
    } else {
		$fp = fopen($name, 'w+'); // Создаем файл
		fwrite($fp, stripcslashes($jsonTodos));
		fclose($fp);
    }
    


?>