<?php
session_start();
require_once __DIR__ . '/../includes/Database.php';

$loginError = '';
$registerError = '';
$registerSuccess = '';



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action']) && $_POST['action'] === 'login') {
        // Login Handling (gestione login)
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';
        $database = new Database();
        $conn = $database->getConnection();
       
        $stmt = $conn->prepare("SELECT * FROM utenti WHERE username = :username");
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            
            
            $redirectUrl = isset($_GET['redirect']) ? $_GET['redirect'] : 'home.php'; 

            header('Location: ' . $redirectUrl); 
            exit;
        } else {
            $loginError = "Credenziali non valide!";
        }
        
        
    } elseif (isset($_POST['action']) && $_POST['action'] === 'register') {
        // Registration Handling (gestione register)
        $username = $_POST['reg_username'] ?? '';
        $password = $_POST['reg_password'] ?? '';
        $confirmPassword = $_POST['reg_confirm_password'] ?? '';

        if ($password !== $confirmPassword) {
            $registerError = "Le password non coincidono!";
        } else {
            $stmt = $conn->prepare("SELECT * FROM utenti WHERE username = :username");
            $stmt->execute(['username' => $username]);
            if ($stmt->rowCount() > 0) {
                $registerError = "Questo username è già in uso!";
            } else {
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $conn->prepare("INSERT INTO utenti (username, password) VALUES (:username, :password)");
                $stmt->execute(['username' => $username, 'password' => $hashedPassword]);
                $registerSuccess = "Registrazione avvenuta con successo! Ora puoi accedere.";
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login e Registrazione</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body class="bg-light">
    <div class="container mt-5">
        <h1 class="text-center mb-4">Accedi</h1>

        <!-- Login Form -->
        <div id="loginForm" class="card p-4">
            <h2 class="text-center">Login</h2>
            <?php if ($loginError): ?>
                <div class="alert alert-danger"><?= htmlspecialchars($loginError) ?></div>
            <?php endif; ?>
            <form method="POST">
                <input type="hidden" name="action" value="login">
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" name="username" id="username" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" name="password" id="password" class="form-control" required>
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
                <a href="logout.php" class="btn btn-outline-secondary btn-sm">
                <i class="bi bi-box-arrow-left"></i> Logout
            </a> 
            <!-- Bootstrap Icons -->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
            </form>
            <div class="text-center mt-3">
                <button id="toggleRegister" class="btn btn-link">Non hai un account? Registrati</button>
            </div>
        </div>

        <!-- Registration Form -->
        <div id="registerForm" class="card p-4 d-none">
            <h2 class="text-center">Registrazione</h2>
            <?php if ($registerError): ?>
                <div class="alert alert-danger"><?= htmlspecialchars($registerError) ?></div>
            <?php endif; ?>
            <?php if ($registerSuccess): ?>
                <div class="alert alert-success"><?= htmlspecialchars($registerSuccess) ?></div>
            <?php endif; ?>
            <form method="POST">
                <input type="hidden" name="action" value="register">
                <div class="mb-3">
                    <label for="reg_username" class="form-label">Username</label>
                    <input type="text" name="reg_username" id="reg_username" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label for="reg_password" class="form-label">Password</label>
                    <input type="password" name="reg_password" id="reg_password" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label for="reg_confirm_password" class="form-label">Conferma Password</label>
                    <input type="password" name="reg_confirm_password" id="reg_confirm_password" class="form-control" required>
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-success">Registrati</button>
                </div>
            </form>
            <div class="text-center mt-3">
                <button id="toggleLogin" class="btn btn-link">Hai già un account? Accedi</button>
            </div>
        </div>
    </div>

    <script> // toggle tra i form  login e registrazione
        $(document).ready(function () {
            $('#toggleRegister').click(function () {
                $('#loginForm').addClass('d-none');
                $('#registerForm').removeClass('d-none');
            });

            $('#toggleLogin').click(function () {
                $('#registerForm').addClass('d-none');
                $('#loginForm').removeClass('d-none');
            });

            <?php if (isset($_POST['action']) && $_POST['action'] === 'register') { ?>
                $('#toggleRegister').trigger('click');
            <?php } ?>
        });
    </script>
</body>
</html>
