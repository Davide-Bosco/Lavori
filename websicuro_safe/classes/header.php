<?php ob_start();?>
<?php
// Protezione contro clickjacking
header("X-Frame-Options: DENY");

// Ancora più sicuro: CSP per frame
header("Content-Security-Policy: frame-ancestors 'none';");
?>