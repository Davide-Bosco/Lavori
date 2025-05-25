<?php require_once __DIR__ . '/../classes/header.php';?>
<?php
$utente = $_POST['utente'] ?? 'Mario Rossi';
$id_richiesta = strtoupper(substr(uniqid('REQ'), -8)); // ID fittizio 
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Richiesta Inviata</title>
    <meta http-equiv="refresh" content="5; url=http://localhost/websicuro_safe/views/index.php">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="http://localhost/websicuro_safe/assets/css/style.css">
</head>
<body class="bg-light d-flex align-items-center" style="min-height: 100vh;">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div class="text-center mb-4">
                    <img src="http://localhost/websicuro_safe/assets/images/index/logo.jpg" alt="Logo" width="140" height="140" class="me-2">
                </div>
                <div class="card shadow-lg border-0 rounded-4">
                    <div class="card-body p-4">
                        <h3 class="card-title text-success mb-3">Richiesta Inviata con Successo</h3>
                        <p class="fs-5">Ciao <strong><?php echo htmlspecialchars($utente); ?></strong>, la tua richiesta è stata registrata con il codice:</p>
                        <div class="alert alert-secondary text-center fw-bold"><?php echo $id_richiesta; ?></div>
                        
                        <p>Il nostro team ti contatterà entro 24 ore. Ti ringraziamo per la tua pazienza.</p>
                        
                        <p class="text-muted mt-3 mb-0">Verrai reindirizzato automaticamente alla home tra 5 secondi...</p>
                        <a href="http://localhost/websicuro_safe/views/index.php" class="btn btn-primary mt-2">Torna Subito alla Home</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
