// blink_sig — pulse the onboard SIG LED when D9 is pressed
#include <tinyCore.h>

const uint8_t LED = SIG;
const uint8_t BTN = D9;

void setup() {
  pinMode(LED, OUTPUT);
  pinMode(BTN, INPUT_PULLUP);
  Serial.begin(115200);
}

void loop() {
  if (digitalRead(BTN) == LOW) {
    digitalWrite(LED, HIGH);
    Serial.println("pulse");
  } else {
    digitalWrite(LED, LOW);
  }
  delay(20);
}
