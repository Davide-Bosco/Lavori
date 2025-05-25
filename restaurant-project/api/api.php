<?php
header("Content-Type: application/json");
require_once __DIR__ . '/../includes/Database.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // READ: Recupera tutti i piatti
        $stmt = $conn->prepare("SELECT * FROM menu ORDER BY descrizione, nome_piatto");
        $stmt->execute();
        $piatti = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($piatti);
        break;

    case 'POST':
        // CREATE: Aggiungi un nuovo piatto
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['nome_piatto'], $data['descrizione'], $data['prezzo'])) {
            $stmt = $conn->prepare("INSERT INTO menu (nome_piatto, descrizione, prezzo) VALUES (:nome_piatto, :descrizione, :prezzo)");
            $stmt->execute([
                'nome_piatto' => $data['nome_piatto'],
                'descrizione' => $data['descrizione'],
                'prezzo' => $data['prezzo']
            ]);
            echo json_encode(["message" => "Piatto aggiunto con successo"]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Dati mancanti (nome_piatto, descrizione, prezzo)"]);
        }
        break;

    case 'DELETE':
        // DELETE: Cancella un piatto
        if (isset($_GET['id'])) {
            $stmt = $conn->prepare("DELETE FROM menu WHERE id = :id");
            $stmt->execute(['id' => $_GET['id']]);
            echo json_encode(["message" => "Piatto cancellato con successo"]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "ID mancante"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Metodo non supportato"]);
        break;
}
?>
