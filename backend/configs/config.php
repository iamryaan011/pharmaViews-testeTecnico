<?php 
    $host = 'localhost';
    $user = 'root';
    $pass = '';
    $dbname = 'gestao-de-verbas';

    $connection = new mysqli($host, $user, $pass, $dbname);

    if($connection->connect_errno) {
        echo 'Erro!';
    } 
?>