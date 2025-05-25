#include <Servo.h>
#include <LiquidCrystal.h>


LiquidCrystal lcd(12, 11, 7, 6, 10, 8);
Servo myServo;

// Pin
const int switchPin = 2;
const int greenLed = 4;
const int redLed = 5;
const int trigPin = 3;
const int echoPin = 13;

// Timer e stato
const unsigned long aperturaDurata = 5000;
unsigned long tempoApertura = 0;
unsigned long ultimoControlloDistanza = 0;
unsigned long ultimoPress = 0;

const unsigned long intervalloDistanza = 100; // ms
const unsigned long debounceDelay = 200;      // ms

bool portaAperta = false;
int conteggioIngressi = 0;

// Per evitare scritture inutili su LCD
int ultimoTempoRimanente = -1;
bool statoPortaPrec = false;
int ultimoConteggio = -1;

void setup() {
  myServo.attach(9);
  pinMode(redLed, OUTPUT);
  pinMode(greenLed, OUTPUT);
  pinMode(switchPin, INPUT);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  Serial.begin(9600);
  lcd.begin(16, 2);
  lcd.clear();

  chiudiPorta();
}

void loop() {
  unsigned long adesso = millis();
  gestisciPulsante(adesso);
  gestisciProssimita(adesso);
  gestisciStatoPorta(adesso);
  aggiornaDisplay(adesso);
}

void gestisciPulsante(unsigned long adesso) {
  if (digitalRead(switchPin) == HIGH && (adesso - ultimoPress > debounceDelay)) {
    if (!portaAperta) {
      conteggioIngressi++;
      apriPorta();
      tempoApertura = adesso;
    }
    ultimoPress = adesso;
  }
}

void gestisciProssimita(unsigned long adesso) {
  if (adesso - ultimoControlloDistanza >= intervalloDistanza) {
    int distanza = misuraDistanza();
    if (!portaAperta && distanza > 0 && distanza <= 20) {
      conteggioIngressi++;
      apriPorta();
      tempoApertura = adesso;
    }
    ultimoControlloDistanza = adesso;
  }
}

void gestisciStatoPorta(unsigned long adesso) {
  if (portaAperta && (adesso - tempoApertura >= aperturaDurata)) {
    chiudiPorta();
  }
}

void aggiornaDisplay(unsigned long adesso) {
  int tempoRimanente = 0;
  if (portaAperta) {
    tempoRimanente = max(0, (int)((aperturaDurata - (adesso - tempoApertura)) / 1000));
  }

  // Solo se i dati cambiano
  if (portaAperta != statoPortaPrec || tempoRimanente != ultimoTempoRimanente || conteggioIngressi != ultimoConteggio) {
    lcd.setCursor(0, 0);
    lcd.print(portaAperta ? "PORTA APERTA     " : "PORTA CHIUSA     ");
    lcd.setCursor(0, 1);
    lcd.print("Ing: ");
    lcd.print(conteggioIngressi);
    lcd.print("  T: ");
    if (portaAperta) {
      lcd.print(tempoRimanente);
      lcd.print("s ");
    } else {
      lcd.print("    "); // cancella residui
    }

    statoPortaPrec = portaAperta;
    ultimoTempoRimanente = tempoRimanente;
    ultimoConteggio = conteggioIngressi;
  }
}

void apriPorta() {
  portaAperta = true;
  myServo.write(0);
  digitalWrite(greenLed, HIGH);
  digitalWrite(redLed, LOW);
  Serial.print("Porta aperta - ingresso n° ");
  Serial.println(conteggioIngressi);
}

void chiudiPorta() {
  portaAperta = false;
  myServo.write(90);
  digitalWrite(greenLed, LOW);
  digitalWrite(redLed, HIGH);
  Serial.println("Porta chiusa");
}

int misuraDistanza() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long durata = pulseIn(echoPin, HIGH, 30000); // timeout 30ms
  if (durata == 0) return -1;

  int distanza = durata * 0.034 / 2;
  Serial.print("Distanza: ");
  Serial.print(distanza);
  Serial.println(" cm");
  return distanza;
}