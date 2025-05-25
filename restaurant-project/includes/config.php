<?php
// Configurazione del database.
define('DB_HOST', 'localhost');  
define('DB_NAME', 'restaurant'); 
define('DB_USER', 'root');         
define('DB_PASS', '');             
?>

<?php
try {
    $conn = new PDO('mysql:host=localhost;dbname=restaurant', 'root', '');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Errore nella connessione al database: " . $e->getMessage());
}
?>