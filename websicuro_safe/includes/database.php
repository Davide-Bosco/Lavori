<?php
$host = "localhost";
$user = "root";
$password = ""; 
$dbname = "sito_sanitario";

$conn = mysqli_connect($host, $user, $password, $dbname);

if (!$conn) {
    die("Connessione fallita: " . mysqli_connect_error());
}
?>
