<?php require_once __DIR__ . '/../classes/header.php';?>
<script>
 
  if (window.top !== window.self) {
    window.top.location = window.self.location;
  }
</script>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Contatti</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="http://localhost/websicuro_safe/assets/css/style.css">
    <style>
        .container {
            position: relative;
        }
    </style>
</head>
<body class="bg-light">

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
        <a class="navbar-brand d-flex align-items-center" >
            <img src="http://localhost/websicuro_safe/assets/images/index/logo.jpg" alt="Logo" width="40" height="40" class="me-2">
            <span>MEDCare Access</span>
        </a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link" href="index.php">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="login.php">Login</a></li>
                <li class="nav-item"><a class="nav-link active">Contatti</a></li>
            </ul>
        </div>
    </div>
</nav>

<!-- Immagine introduttiva -->
<section class="intro text-center mt-5">
    <img src="http://localhost/websicuro_safe/assets/images/contatti/contatti.jpg" alt="contatti" width="1400" height="400" class="img-fluid rounded mb-4">
</section>

 <div class="container mt-5 text-center">
    <h2>Contattaci</h2>
    <p>Puoi cliccare il pulsante qui sotto per richiedere assistenza.</p>

 <a 
  id="assistLink" 
  class="btn btn-danger" 
  href="http://localhost/websicuro_safe/fake/assistenza.php" 
  target="_top"                 
  style="width: 350px; height: 120px; font-size: 20px; font-weight: bold; display: inline-flex; align-items: center; justify-content: center;"
>
  Richiesta Assistenza
</a>
  </div>

<!-- Bootstrap Bundle JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<?php include_once __DIR__ . '/../classes/footer.php'; ?>
</body>
</html>
