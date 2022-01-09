#include "DHT.h"
#include <OneWire.h>
#include <DallasTemperature.h>

#define pin 2
OneWire oneWire(pin);
DallasTemperature sensors(&oneWire);

void setup() {
  Serial.begin(9600); 
  sensors.begin();
}

void loop() {

  float moistureHumidity = 0.0;
  for (int i = 0; i <= 100; i++) 
  { 
   moistureHumidity = moistureHumidity + analogRead(A2); 
   delay(1); 
  } 
  moistureHumidity = moistureHumidity/100.0; 
  
  float brightness = analogRead(A1);

  sensors.requestTemperatures();
  float temperature = sensors.getTempCByIndex(0);

  Serial.println("brightness;"+(String)brightness+";");
  Serial.println("temperature;"+(String)temperature+";");
  Serial.println("moistureHumidity;"+(String)moistureHumidity+";");
  
}
