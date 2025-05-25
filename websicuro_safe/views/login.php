<?php
require_once __DIR__ . '/../classes/header.php';
require_once __DIR__ . '/../includes/database.php'; 

$errore_login = '';

if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepared statement contro SQL injection
    $stmt = $conn->prepare("SELECT * FROM utenti WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        $utente = $result->fetch_assoc();
        echo "<script>
                alert('Sarai reindirizzato alla tua dashboard!');
                window.location.href = 'dashboard.php?id=" . $utente['id'] . "';
              </script>";
        exit();
    } else {
        $errore_login = "Credenziali non valide";
    }
}



?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Login - MEDCare Access</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="http://localhost/websicuro_safe/assets/css/style.css">
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
                <li class="nav-item"><a class="nav-link active" href="login.php">Login</a></li>
                <li class="nav-item"><a class="nav-link" href="contatti.php">Contatti</a></li>
            </ul>
        </div>
    </div>
</nav>

<!-- Login Form -->
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow">
                <div class="card-body">
                    <h3 class="card-title text-center mb-4">Accedi al Portale</h3>

                    <?php if ($errore_login): ?>
                        <div class="alert alert-danger text-center"><?php echo $errore_login; ?></div>
                    <?php endif; ?>

                    <form method="POST">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username:</label>
                            <input type="text" class="form-control" name="username" id="username" required>
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Password:</label>
                            <input type="password" class="form-control" name="password" id="password" required>
                        </div>

                        <div class="d-grid">
                            <button type="submit" name="login" class="btn btn-primary"
                                onclick= >Accedi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include_once __DIR__ . '/../classes/footer.php'; ?>
