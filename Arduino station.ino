#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>

// Definizioni pin
#define RFID_SS 10
#define RFID_RST 8
#define SERVO_PIN 9
#define LED_VERDE 7
#define LED_ROSSO 6
#define BUZZER A6

// Dati autorizzati (SOSTITUIRE CON UID REALE DALLA TUA TESSERA!)
byte UID_AUTORIZZATO[4] = {****}; 
String PIN_CORRETTO = "1234";

// Stati del sistema
enum Stato {
  IDLE,
  VERIFICA_RFID,
  RICHIESTA_PIN,
  VERIFICA_PIN,
  ACCESSO_CONSENTITO,
  ACCESSO_NEGATO
};

Stato statoCorrente = IDLE;
String pinInserito = "";
unsigned long tempoAperturaPorta = 0;

// Oggetti
MFRC522 rfid(RFID_SS, RFID_RST);
Servo servoPorta;

// Tastierino
int righe[4] = {A0, A1, A2, A3};
int colonne[4] = {5, 4, 3, 2};
char tasti[4][4] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};

void setup() {
  Serial.begin(9600);
  
  // Inizializzazioni
  SPI.begin();
  rfid.PCD_Init();
  servoPorta.attach(SERVO_PIN);
  
  pinMode(LED_VERDE, OUTPUT);
  pinMode(LED_ROSSO, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  
  // Setup tastierino
  for (int i = 0; i < 4; i++) {
    pinMode(righe[i], OUTPUT);
    digitalWrite(righe[i], HIGH);
    pinMode(colonne[i], INPUT_PULLUP);
  }
  
  // Messaggio di benvenuto su Serial
  printHeader();
  Serial.println("✅ SISTEMA SMART DOOR AVVIATO!");
  Serial.println("📋 PIN corretto: " + PIN_CORRETTO);
  Serial.println("🔑 UID atteso: ");
  printUID(UID_AUTORIZZATO);
  Serial.println("=====================================");
  
  // Stato iniziale
  cambiaStato(IDLE);
}

void loop() {
  // Macchina a stati
  switch (statoCorrente) {
    case IDLE:          gestisciIDLE();        break;
    case VERIFICA_RFID: gestisciVerificaRFID(); break;
    case RICHIESTA_PIN: gestisciRichiestaPIN(); break;
    case VERIFICA_PIN:  gestisciVerificaPIN();  break;
    case ACCESSO_CONSENTITO: gestisciAccessoConsentito(); break;
    case ACCESSO_NEGATO:     gestisciAccessoNegato();     break;
  }
}

// ========== FUNZIONI GESTIONE STATI ==========

void gestisciIDLE() {
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    cambiaStato(VERIFICA_RFID);
  }
}

void gestisciVerificaRFID() {
  bool autorizzato = true;
  
  Serial.println("🔍 CONFRONTO RFID...");
  for (byte i = 0; i < 4; i++) {
    if (rfid.uid.uidByte[i] != UID_AUTORIZZATO[i]) {
      autorizzato = false;
      break;
    }
  }
  
  printUIDLettura();
  
  rfid.PICC_HaltA();
  
  if (autorizzato) {
    Serial.println("✅ RFID AUTORIZZATA!");
    cambiaStato(RICHIESTA_PIN);
  } else {
    Serial.println("❌ RFID NON AUTORIZZATA!");
    cambiaStato(ACCESSO_NEGATO);
  }
}

void gestisciRichiestaPIN() {
  char tasto = leggiTastierino();
  
  if (tasto != 0) {
    tone(BUZZER, 2000, 50);
    
    if (tasto == '#') {
      Serial.println("🔐 CONFERMA PIN INSERITO");
      cambiaStato(VERIFICA_PIN);
    } else if (tasto == '*') {
      if (pinInserito.length() > 0) {
        pinInserito.remove(pinInserito.length() - 1);
        printPINStato();
      }
    } else if (tasto >= '0' && tasto <= '9') {
      if (pinInserito.length() < 4) {
        pinInserito += tasto;
        printPINStato();
      } else {
        Serial.println("⚠️ PIN MASSIMO 4 CIFRE!");
      }
    }
  }
}

void gestisciVerificaPIN() {
  Serial.println("🔍 VERIFICA PIN...");
  delay(500);
  
  if (pinInserito == PIN_CORRETTO) {
    Serial.println("✅ PIN CORRETTO!");
    cambiaStato(ACCESSO_CONSENTITO);
  } else {
    Serial.println("❌ PIN ERRATO!");
    cambiaStato(ACCESSO_NEGATO);
  }
  
  pinInserito = "";
}

void gestisciAccessoConsentito() {
  if (millis() - tempoAperturaPorta >= 5000) {
    chiudiPorta();
    cambiaStato(IDLE);
  }
}

void gestisciAccessoNegato() {
  static unsigned long tempoNegato = 0;
  
  if (millis() - tempoNegato >= 3000) {
    tempoNegato = millis();
    cambiaStato(IDLE);
  }
}

// ========== FUNZIONI CAMBIO STATO ==========

void cambiaStato(Stato nuovoStato) {
  statoCorrente = nuovoStato;
  
  switch (nuovoStato) {
    case IDLE:
      printSchermo("Smart Door Ready", "Avvicina carta RFID");
      digitalWrite(LED_ROSSO, HIGH);
      digitalWrite(LED_VERDE, LOW);
      chiudiPorta();
      Serial.println("\n[🟢 IDLE] Sistema pronto");
      break;
      
    case VERIFICA_RFID:
      printSchermo("Verifica RFID...", "");
      Serial.println("[🔄 VERIFICA_RFID]");
      break;
      
    case RICHIESTA_PIN:
      printSchermo("Inserisci PIN:", "Usa # per confermare");
      pinInserito = "";
      Serial.println("[📱 RICHIESTA_PIN] Inserisci PIN (max 4 cifre)");
      break;
      
    case VERIFICA_PIN:
      printSchermo("Verifica PIN...", "");
      Serial.println("[🔄 VERIFICA_PIN]");
      break;
      
    case ACCESSO_CONSENTITO:
      printSchermo("ACCESSO OK!", "Porta aperta 5s");
      apriPorta();
      tempoAperturaPorta = millis();
      
      // Melodia successo
      tone(BUZZER, 1000, 200); delay(250);
      tone(BUZZER, 1500, 200);
      
      Serial.println("\n[✅ ACCESSO_CONSENTITO] Benvenuto!");
      break;
      
    case ACCESSO_NEGATO:
      printSchermo("ACCESSO NEGATO!", "Riprova tra 3s");
      
      // Allarme
      for (int i = 0; i < 3; i++) {
        digitalWrite(LED_ROSSO, HIGH);
        tone(BUZZER, 500, 200); delay(250);
        digitalWrite(LED_ROSSO, LOW); delay(250);
      }
      digitalWrite(LED_ROSSO, HIGH);
      
      Serial.println("\n[❌ ACCESSO_NEGATO] Tentativo fallito");
      break;
  }
}

// ========== FUNZIONI SUPPORTO ==========

char leggiTastierino() {
  for (int r = 0; r < 4; r++) {
    digitalWrite(righe[r], LOW);
    for (int c = 0; c < 4; c++) {
      if (digitalRead(colonne[c]) == LOW) {
        delay(50);
        while(digitalRead(colonne[c]) == LOW);
        digitalWrite(righe[r], HIGH);
        return tasti[r][c];
      }
    }
    digitalWrite(righe[r], HIGH);
  }
  return 0;
}

void printPINStato() {
  Serial.print("🔢 PIN: ");
  for (int i = 0; i < pinInserito.length(); i++) {
    Serial.print("*");
  }
  Serial.println(" (" + String(pinInserito.length()) + "/4)");
}

void printUIDLettura() {
  Serial.print("📱 UID letto: ");
  for (byte i = 0; i < rfid.uid.size; i++) {
    Serial.print("0x");
    if (rfid.uid.uidByte[i] < 0x10) Serial.print("0");
    Serial.print(rfid.uid.uidByte[i], HEX);
    Serial.print(" ");
  }
  Serial.println();
}

void printUID(byte* uid) {
  Serial.print("🔑 UID atteso: ");
  for (byte i = 0; i < 4; i++) {
    Serial.print("0x");
    if (uid[i] < 0x10) Serial.print("0");
    Serial.print(uid[i], HEX);
    Serial.print(" ");
  }
  Serial.println();
}

void printSchermo(String riga1, String riga2) {
  Serial.println("┌──────────────────────────────┐");
  Serial.println("│ " + riga1.substring(0,16) + "│");
  Serial.println("│ " + riga2.substring(0,16) + "│");
  Serial.println("└──────────────────────────────┘");
}

void printHeader() {
  Serial.println("=====================================");
  Serial.println("    🚪 SMART DOOR ACCESS SYSTEM     ");
  Serial.println("=====================================");
}

void apriPorta() {
  servoPorta.write(90);
  digitalWrite(LED_VERDE, HIGH);
  digitalWrite(LED_ROSSO, LOW);
  Serial.println("🔓 PORTA APERTA (5 secondi)");
}

void chiudiPorta() {
  servoPorta.write(0);
  digitalWrite(LED_VERDE, LOW);
  digitalWrite(LED_ROSSO, HIGH);
  Serial.println("🔒 PORTA CHIUSA");
}
