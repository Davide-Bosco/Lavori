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

// Query per recuperare i piatti dal database
$query = "SELECT * FROM menu ORDER BY nome_piatto";
$stmt = $conn->prepare($query);
$stmt->execute();

$menu_items = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<div class="menu-header">
    <img src="http://localhost/restaurant-project/assets/images/menu/menu-banner.jpg" alt="Menu del Ristorante" class="menu-img">
</div>

<hr class="my-5">
<h1 class="text-center mb-4">Il Nostro Menu</h1>
<!-- isualizzazione piatti del menù -->
<div class="mb-4">
    <h4>Aggiungi un Nuovo Piatto</h4>
    <form id="addPiattoForm">
        <div class="row g-3">
            <div class="col-md-3">
                <input type="text" class="form-control" id="nome_piatto" placeholder="Nome Piatto" required>
            </div>
            <div class="col-md-3">
                <input type="text" class="form-control" id="descrizione" placeholder="Descrizione" required>
            </div>
            <div class="col-md-3">
                <input type="number" step="0.01" class="form-control" id="prezzo" placeholder="Prezzo (€)" required>
            </div>
            <div class="col-md-3">
                <button type="submit" class="btn btn-primary w-100">Aggiungi</button>
            </div>
        </div>
    </form>
</div>

<?php if (count($menu_items) > 0): ?>
    <ul class="list-group">
        <?php foreach ($menu_items as $item): ?>
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div>
                    <h5><?php echo htmlspecialchars($item['nome_piatto']); ?></h5>
                    <p class="mb-1"><?php echo nl2br(htmlspecialchars($item['descrizione'])); ?></p>
                    <p class="text-primary fw-bold"><?php echo number_format($item['prezzo'], 2); ?> €</p>
                </div>
                <button class="btn btn-danger btn-sm delete-btn" data-id="<?php echo $item['id']; ?>">Elimina</button>
            </li>
        <?php endforeach; ?>
    </ul>
<?php else: ?>
    <p class="text-muted">Nessun piatto disponibile.</p>
<?php endif; ?>


<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    $(document).ready(function () {
        // Funzione per aggiungere un piatto ajax
        $('#addPiattoForm').submit(function (e) {
            e.preventDefault();
            const nome = $('#nome_piatto').val();
            const descrizione = $('#descrizione').val();
            const prezzo = $('#prezzo').val();

            $.ajax({
                url: 'http://localhost/restaurant-project/api/api.php',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ nome_piatto: nome, descrizione: descrizione, prezzo: prezzo }),
                success: function () {
                location.reload();
                },
                error: function () {
                    alert('Errore nell\'aggiunta del piatto.');
                }
            });
        });

        // Funzione per eliminare un piatto ajax
        $(document).on('click', '.delete-btn', function () {
            const id = $(this).data('id');
            if (confirm('Sei sicuro di voler eliminare questo piatto?')) {
                $.ajax({
                    url: 'http://localhost/restaurant-project/api/api.php?id='+ id,
                    method: 'DELETE',
                    success: function () {
                        location.reload();
                    },
                    error: function () {
                        alert('Errore nell\'eliminazione del piatto.');
                    }
                });
            }
        });
    });
</script>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>
