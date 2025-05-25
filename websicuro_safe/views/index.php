<?php require_once __DIR__ . '/../classes/header.php';?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Portale Sanitario</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="http://localhost/websicuro_safe/assets/css/style.css">
</head>
<body class="bg-light">

<!-- NAVBAR -->
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
        <a class="navbar-brand d-flex align-items-center">
            <img src="http://localhost/websicuro_safe/assets/images/index/logo.jpg" alt="Logo" width="40" height="40" class="me-2">
            <span>MEDCare Access</span>
         </a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link active">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="login.php">Login</a></li>
                <li class="nav-item"><a class="nav-link" href="contatti.php">Contatti</a></li>
            </ul>
        </div>
    </div>
</nav>
<!-- CONTENUTO PRINCIPALE -->
<div class="container text-center mt-5">
    <div class="p-5 bg-white rounded shadow">
        <h1 class="mb-4">Benvenuto nel Portale MEDCare Access</h1>
        <p class="lead">Accedi per gestire i tuoi dati sanitari o contattaci per informazioni.</p>
        <div class="mt-4">
            <a href="login.php" class="btn btn-outline-primary">Login</a>
            <a href="contatti.php" class="btn btn-outline-primary">Contatti</a>
        </div>
    </div>
</div>
<section class="intro text-center mt-5">
    <img src="http://localhost/websicuro_safe/assets/images/index/home.jpg" alt="Portale Sanitario" width="1200" height="600" class="img-fluid rounded mb-4">
</section>



<!-- Bootstrap JS (opzionale per il toggle della navbar) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
<?php include_once __DIR__ . '/../classes/footer.php'; ?>

