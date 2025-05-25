<?php
require_once __DIR__ . '/../includes/database.php';
require_once __DIR__ . '/../classes/header.php';

$utente_id = $_GET['utente_id'] ?? null;

if (!$utente_id) {
    echo "ID utente mancante!";
    exit;
}

$query_utente = "SELECT * FROM utenti WHERE id = $utente_id";
$result_utente = mysqli_query($conn, $query_utente);
$utente = mysqli_fetch_assoc($result_utente);

if (!$utente) {
    echo "Utente non trovato!";
    exit;
}

$query = "SELECT * FROM appuntamenti WHERE utente_id = $utente_id";
$result = mysqli_query($conn, $query);
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Appuntamenti Utente</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">


<!-- Contenuto -->
<div class="container mt-5">
    <div class="text-center mb-4">
        <h2>Appuntamenti di <?php echo htmlspecialchars($utente['username']); ?></h2>
    </div>

    <?php if (mysqli_num_rows($result) > 0): ?>
        <div class="list-group">
            <?php while ($row = mysqli_fetch_assoc($result)): ?>
                <div class="list-group-item">
                    <strong>Data:</strong> <?php echo $row['data']; ?> |
                    <strong>Ora:</strong> <?php echo $row['ora']; ?><br>
                    <strong>Descrizione:</strong> <?php echo htmlspecialchars($row['descrizione']); ?>
                </div>
            <?php endwhile; ?>
        </div>
    <?php else: ?>
        <div class="alert alert-info text-center">Nessun appuntamento trovato.</div>
    <?php endif; ?>

    <div class="text-center mt-4">
        <a href="dashboard.php?id=<?php echo $utente['id']; ?>" class="btn btn-outline-primary">Torna alla Dashboard</a>
    </div>
</div>

<?php include_once __DIR__ . '/../classes/footer.php'; ?>


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

