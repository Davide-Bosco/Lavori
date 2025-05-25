<?php
require_once __DIR__ . '/../includes/Database.php';

$database = new Database();
$conn = $database->getConnection();

try {
    $query = "SELECT * FROM prenotazioni ORDER BY data, orario";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $prenotazioni = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    error_log($e->getMessage());
    echo "Errore durante il recupero delle prenotazioni.";
    exit;
}
?>

<table class="table table-striped">
    <thead>
        <tr>
            <th>Nome Cliente</th>
            <th>Data</th>
            <th>Orario</th>
            <th>Numero Persone</th>
            <th>Azioni</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($prenotazioni as $prenotazione): ?>
            <tr>
                <td><?= htmlspecialchars($prenotazione['nome_cliente']); ?></td>
                <td><?= $prenotazione['data']; ?></td>
                <td><?= $prenotazione['orario']; ?></td>
                <td><?= $prenotazione['numero_persone']; ?></td>
                <td>
                    <button class="btn btn-danger btn-sm btn-cancella" data-id="<?= $prenotazione['id']; ?>">Cancella</button>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
