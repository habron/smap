var Gpio = require('onoff').Gpio;
const SerialPort = require("serialport");
const https = require('https');
const Readline = require("@serialport/parser-readline");
const port = new SerialPort("/dev/ttyACM0", { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: "\n" }));

const interval = 5000;

const brightnessLimit = 460;
const temperatureLimit = 21;
const moistureHumidityLimit = 300;
let brightness;
let temperature;
let moistureHumidity;

let releLight = new Gpio(17, 'out');
let releHeat = new Gpio(4, 'out');
let releIrrigation = new Gpio(27, 'out');

let stateRele2 = 0;

// rele1.writeSync(0);  Nebo 1

port.on("open", () => {
    console.log("serial port open");
    releLight.writeSync(0);
    releHeat.writeSync(0);
    releIrrigation.writeSync(0);
});

parser.on("data", (data) => {
    //console.log(data);    
    const splitData = data.split(";");
    
    switch(splitData[0]) {
        case "brightness":
            brightness = splitData[1];
            break;
        case "temperature":
            temperature = splitData[1];
            break;
        case "moistureHumidity":
            moistureHumidity = splitData[1];
            break;
    }        
});


setInterval(() => {
   // stateRele2 = stateRele2 === 0 ? 1 : 0;
    //console.log(stateRele2);
    //rele2.writeSync(stateRele2);
    
    console.log(brightness + " " + temperature + " " + moistureHumidity);

    if (brightness < brightnessLimit) {
        releLight.writeSync(1);
    } else {
        releLight.writeSync(0);
    }

    if (temperature < temperatureLimit) {
        releHeat.writeSync(1);
    } else {
        releHeat.writeSync(0);
    }

    if (moistureHumidity > moistureHumidityLimit) {
        releIrrigation.writeSync(1);
    } else {
        releIrrigation.writeSync(0);
    }

}, interval);


