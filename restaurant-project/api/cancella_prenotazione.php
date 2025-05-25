<?php
require_once __DIR__ . '/../includes/Database.php';

$database = new Database();
$conn = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    $id = (int) $_POST['id'];

    try {
        $query = "DELETE FROM prenotazioni WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        echo "success";
    } catch (PDOException $e) {
        error_log($e->getMessage());
        echo "Errore durante l'eliminazione della prenotazione.";
    }
} else {
    echo "ID prenotazione non valido.";
}
?>
