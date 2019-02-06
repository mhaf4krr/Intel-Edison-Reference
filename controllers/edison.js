var mraa = require('mraa');
var led1 = new mraa.Gpio(4);
/* selects it for output*/
led1.dir(mraa.DIR_OUT);
/*switch it off initially*/
led1.write(0);


/* Starting Analog Values */
var analogPin0 = new mraa.Aio(0);

/* Servo Control */
var pwmPin = new mraa.Pwm(6);
pwmPin.period_ms(20);
pwmPin.pulsewidth_ms(10);
pwmPin.pulsewidth_us(1500); 
pwmPin.enable(true);  


var ledStatus = false;

function getAnanlogValue(){
    return analogPin0.read();
}


function setServo(val){
    pwmPin.pulsewidth_us(val);
    pwmPin.enable(true);
}

var toggle = () =>{

    if(ledStatus){
        console.log("Switching Off");
        ledStatus = false;
        led1.write(0);
        pwmPin.pulsewidth_us(1500);
        pwmPin.enable(true);  
    }

    else {
        console.log("Switching On");
        ledStatus = true;
        led1.write(1);
        pwmPin.pulsewidth_us(2500);
        pwmPin.enable(true);  
    }

}

function getState(){
    return ledStatus;
}

module.exports = {
    ledToggle : toggle,
    ledState : getState,
    getAnalogValue : getAnanlogValue,
    setServo : setServo
};
