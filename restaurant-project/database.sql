-- Creazione del database
CREATE DATABASE IF NOT EXISTS restaurant;
USE restaurant;

CREATE TABLE utenti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


-- Tabella per il menu del ristorante
CREATE TABLE IF NOT EXISTS menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_piatto VARCHAR(100) NOT NULL,
    descrizione  TEXT NOT NULL,
    prezzo DECIMAL(10,2) NOT NULL,
    descrizione  VARCHAR(50), -- Antipasto, Primo, Secondo, Dolce idea futura
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella per le prenotazioni
CREATE TABLE IF NOT EXISTS prenotazioni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_cliente VARCHAR(100) NOT NULL,
    email_cliente VARCHAR(100) NOT NULL,
    numero_persone INT NOT NULL,
    data_prenotazione DATE NOT NULL,
    ora_prenotazione TIME NOT NULL,
    messaggio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- inserire piatti nel menu
INSERT INTO menu (nome_piatto, descrizione , prezzo)
VALUES ('Nome del piatto', 'descrizione  del piatto', 12.50);

