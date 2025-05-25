<?php
require_once __DIR__ . '/../includes/config.php';
// PDO (PHP Data Objects) Classe per la connessione al database.
class Database {
    private $host = DB_HOST;
    private $db_name = DB_NAME;
    private $username = DB_USER;
    private $password = DB_PASS;
    public $conn;

    public function getConnection() {
        if ($this->conn === null) {
            try {
                $this->conn = new PDO(
                    "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                    $this->username,
                    $this->password
                );
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $exception) {
                error_log("Errore di connessione: " . $exception->getMessage());
                die("Errore di connessione. Contattare l'amministratore.");
            }
        }
        return $this->conn;
    }
}
?>
