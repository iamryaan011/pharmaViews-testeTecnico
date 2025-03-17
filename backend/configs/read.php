<?php 
    include 'config.php';

    $sql = "SELECT * FROM `ação`";
    $result = $connection->query($sql);

    $dados = [];

    while ($row_usuario = $result->fetch_assoc()) {
        $dados[] = $row_usuario;
    }

    echo json_encode($dados);
?>