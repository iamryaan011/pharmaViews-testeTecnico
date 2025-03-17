<?php 
    include 'config.php';
    
   //add
    if (isset($_POST['add'])) {
        $acao = $_POST['acao'];
        $data = $_POST['data'];
        $investimento = $_POST['investimento'];

        $sql = mysqli_query($connection, "INSERT INTO ação (`ação`, `data-prevista`, `investimento-previsto`) 
        VALUES ('$acao', '$data', '$investimento')");

        header("Location: ../../frontend/src/pages/index.html");
        
        exit();
    }

    //edit
    if (isset($_POST['edit'])) {
        $id = $_POST['id'];
        $acao = $_POST['acao'];
        $data = $_POST['data'];
        $investimento = $_POST['investimento'];

        $sql = mysqli_query($connection, "UPDATE `ação` SET `ação`='$acao', `data-prevista`='$data', `investimento-previsto`='$investimento' WHERE `id`='$id'");

        if ($sql) {
            echo json_encode(["status" => "success", "message" => "Registro editado com sucesso."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Erro ao editar registro."]);
        }
        exit();
    }

    if (isset($_GET['getItem']) && isset($_GET['id'])) {
        $id = $_GET['id'];
        $sql = mysqli_query($connection, "SELECT * FROM `ação` WHERE `id`='$id'");
        $item = mysqli_fetch_assoc($sql);

        if ($item) {
            echo json_encode($item);
        } else {
            echo json_encode(["status" => "error", "message" => "Item não encontrado."]);
        }
        exit();
    }

     //delete
     if (isset($_GET['delete']) && isset($_GET['id'])) {
        $id = $_GET['id'];

        $sql = mysqli_query($connection, "DELETE FROM ação WHERE id={$id}");
    }
?>