<?php
require_once __DIR__ . '/../includes/Database.php';

$database = new Database();
$conn = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome_cliente = htmlspecialchars($_POST['nome_cliente']);
    $data = $_POST['data'];
    $orario = $_POST['orario'];
    $numero_persone = (int) $_POST['numero_persone'];

    try {
        $query = "INSERT INTO prenotazioni (nome_cliente, data, orario, numero_persone) 
                  VALUES (:nome_cliente, :data, :orario, :numero_persone)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':nome_cliente', $nome_cliente);
        $stmt->bindParam(':data', $data);
        $stmt->bindParam(':orario', $orario);
        $stmt->bindParam(':numero_persone', $numero_persone);

        $stmt->execute();
        echo "Prenotazione aggiunta con successo!";
    } catch (PDOException $e) {
        error_log($e->getMessage());
        echo "Errore durante l'aggiunta della prenotazione.";
    }
}
?>
