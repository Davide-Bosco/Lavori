<?php
// pagina home
include_once __DIR__ . '/../includes/header.php';
?>
 <section class="intro text-center">
<h1>Sapori d'Italia</h1>
        </section>
        <p>
            Esplora il gusto autentico con i nostri piatti unici preparati con ingredienti freschi e locali. 
            Che si tratti di una serata speciale o di un pranzo veloce, siamo qui per offrirti un'esperienza culinaria indimenticabile.
        </p>
    
<div class="container">
    <!-- sezione Introduttiva -->
    <section class="intro text-center">
        <img src="http://localhost/restaurant-project/assets/images/home/home-banner.png" alt="Benvenuti al Ristorante" class="img-fluid rounded mb-4">
         </section>

    <!-- sezione Links con icone -->
    <section class="links mt-4 text-center">
    <h2>Esplora il nostro sito</h2>
    <ul class="list-inline">
        <li class="list-inline-item">
            <a href="menu.php" class="btn btn-primary">
                <img src="http://localhost/restaurant-project/assets/images/home/menu-icon.png" alt="Icona Menu" class="icon-img"> Vai al Menù
            </a>
        </li>
        <li class="list-inline-item">
            <a href="prenotazioni.php" class="btn btn-secondary">
                <img src="http://localhost/restaurant-project/assets/images/home/prenotazione-icon.png" alt="icona Prenotazioni" class="icon-img"> Prenota un Tavolo
            </a>
        </li>
    </ul>
</section>

</div>

<?php

include_once __DIR__ . '/../includes/footer.php';
?>
