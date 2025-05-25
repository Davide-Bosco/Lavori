<?php
require_once __DIR__ . '/../includes/database.php';
require_once __DIR__ . '/../classes/header.php';

$utente_id = $_GET['id'] ?? null;

if (!$utente_id || !is_numeric($utente_id)) {
    echo "ID utente non valido!";
    exit;
}

$stmt = $conn->prepare("SELECT * FROM utenti WHERE id = ?");
$stmt->bind_param("i", $utente_id);
$stmt->execute();
$result = $stmt->get_result();
$utente = $result->fetch_assoc();

if (!$utente) {
    echo "Utente non trovato!";
    exit;
}
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Dashboard Utente</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
        <a class="navbar-brand d-flex align-items-center">
            <img src="http://localhost/websicuro_safe/assets/images/index/logo.jpg" alt="Logo" width="40" height="40" class="me-2">
            <span>MEDCare Access</span>
         </a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link" href="index.php">Home</a></li>
                <li class="nav-item"><a class="nav-link active">Dashboard</a></li>
                <li class="nav-item"><a class="nav-link" href="contatti.php">Contatti</a></li>
            </ul>
        </div>
    </div>
</nav>

<!-- Contenuto principale -->
<div class="container mt-4">
    <div class="text-center mb-6">
        <h2>Benvenuto <?php echo htmlspecialchars($utente['username']); ?></h2>
    </div>

    <div class="row justify-content-center align-items-start">
        <!-- Colonna immagine -->
        <div class="text-center col-md-4">
            <img src="http://localhost/websicuro_safe/assets/images/dashboard/vcard.jpeg" alt="vcard" width="200" height="150" class="img-fluid rounded mb-4">
        </div>

        <!-- Colonna form -->
        <div class="col-md-8">
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h4 class="mb-0">I tuoi dati</h4>
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Email:</strong> <?php echo htmlspecialchars($utente['email']); ?></li>
                        <li class="list-group-item"><strong>Telefono:</strong> <?php echo htmlspecialchars($utente['telefono']); ?></li>
                        <li class="list-group-item"><strong>Indirizzo:</strong> <?php echo htmlspecialchars($utente['indirizzo']); ?></li>
                        <li class="list-group-item"><strong>Patologie:</strong> <?php echo htmlspecialchars($utente['patologie']); ?></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>


            <div class="text-center mt-4">
                <a href="appuntamenti.php?utente_id=<?php echo $utente['id']; ?>" class="btn btn-outline-primary">
                    Visualizza Appuntamenti
                </a>
            </div>
        </div>
    </div>
</div>

<?php include_once __DIR__ . '/../classes/footer.php'; ?>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
