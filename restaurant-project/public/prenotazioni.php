<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php?redirect=' . urlencode($_SERVER['REQUEST_URI']));
    exit;
}
?>
            <?php
            require_once __DIR__ . '/../includes/Database.php';
            require_once __DIR__ . '/../includes/header.php';

            $database = new Database();
            $conn = $database->getConnection();

            // Gestione del form per inserire la prenotazione
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $nome_cliente = htmlspecialchars($_POST['nome_cliente']);
                $data = $_POST['data'];
                $orario = $_POST['orario'];
                $numero_persone = (int) $_POST['numero_persone'];

                try {
                    $query = "INSERT INTO prenotazioni (nome_cliente, data, orario, numero_persone) 
                              VALUES (:nome_cliente, :data, :orario, :numero_persone)";
                    $stmt = $conn->prepare($query);
                    $stmt->bindParam(':nome_cliente', $nome_cliente);
                    $stmt->bindParam(':data', $data);
                    $stmt->bindParam(':orario', $orario);
                    $stmt->bindParam(':numero_persone', $numero_persone);
                    $stmt->execute();
            
                    $success_message = "Prenotazione aggiunta con successo!";
                } catch (PDOException $e) {
                    error_log($e->getMessage());
                    $error_message = "Errore nell'aggiunta della prenotazione.";
                }
            }
            ?>
            
            
<div class="prenotazione-header">
    <img src="http://localhost/restaurant-project/assets/images/prenotazioni/prenotazioni-icon.jpg" alt="Prenotazioni" class="header-img">
    
</div>

<hr class="my-5">
<h1 class="text-center mb-4">Prenota un Tavolo</h1>

            <?php if (!empty($success_message)): ?>
                <div class="alert alert-success"><?php echo $success_message; ?></div>
            <?php elseif (!empty($error_message)): ?>
                <div class="alert alert-danger"><?php echo $error_message; ?></div>
            <?php endif; ?>

           
            <div id="success-message" class="alert alert-success" style="display:none;"></div>
            
    
           
             <!-- Form per la prenotazione -->
            <form id="prenotazione-form" method="POST">
                <div class="form-group">
                    <label for="nome_cliente">Nome Cliente</label>
                    <input type="text" name="nome_cliente" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="data">Data</label>
                    <input type="date" name="data" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="orario">Orario</label>
                    <input type="time" name="orario" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="numero_persone">Numero di Persone</label>
                    <input type="number" name="numero_persone" class="form-control" min="1" required>
                </div>
                <button type="submit" class="btn btn-primary">Aggiungi Prenotazione</button>
            </form>

            <hr class="my-5">

            <h2 class="text-center mb-4">Elenco Prenotazioni</h2>
            <div id="tabella-prenotazioni"></div>
            <?php
            $query = "SELECT * FROM prenotazioni ORDER BY data, orario";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $prenotazioni = $stmt->fetchAll(PDO::FETCH_ASSOC);
            ?>

                
            <?php if (count($prenotazioni) > 0): ?>
                <div id="tabella-prenotazioni">
                    

                    <script>
            $(document).ready(function() {
                // Gestione dell'invio del form tramite AJAX
                $('#prenotazione-form').on('submit', function(e) {
                    e.preventDefault(); 

                    $.ajax({
                        url: 'http://localhost/restaurant-project/api/aggiungi_prenotazione.php',
                        method: 'POST',
                        data: $(this).serialize(), 
                        success: function(response) {
                            $('#success-message').html(response).fadeIn().delay(3000).fadeOut();
                            $('#prenotazione-form')[0].reset(); 
                            caricaPrenotazioni(); 
                        },
                        error: function() {
                            alert('Errore durante l\'aggiunta della prenotazione.');
                        }
                    });
                });

                // Funzione per caricare le prenotazioni tramite AJAX
                function caricaPrenotazioni() {
                    $.ajax({
                        url: 'visualizza_prenotazioni.php',
                        method: 'GET',
                        success: function(data) {
                            $('#tabella-prenotazioni').html(data);
                            console.log(data);
                        }
                    });
                }

                caricaPrenotazioni();

            // Funzione per la cancellazione dinamica con conferma
            $(document).on('click', '.btn-cancella', function(e) {
                    e.preventDefault(); 

                    const id = $(this).data('id'); 
                    const riga = $(this).closest('tr');

                   
                    if (confirm('Sei sicuro di voler eliminare la prenotazione?')) {
                        $.ajax({
                            url: 'http://localhost/restaurant-project/api/cancella_prenotazione.php', 
                            method: 'POST',
                            data: { id: id }, 
                            success: function(response) {
                                console.log(response); 
                                console.log(id);

                                if (response.trim() === "success") {
                                    
                                    riga.fadeOut(500, function() {
                                        $(this).remove();
                                    });
                                } else {
                                    alert('Errore: ' + response);
                                }
                            },
                            error: function() {
                                alert('Si è verificato un errore durante la cancellazione.');
                            }
                        });
                    }
                });
            });
            </script>
            <?php else: ?>
                <p class="text-center">Nessuna prenotazione al momento.</p>
            <?php endif; ?>

            <?php require_once __DIR__ . '/../includes/footer.php'; ?>