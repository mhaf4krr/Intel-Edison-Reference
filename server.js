var express = require('express');
var app = express();

var http = require('http');
var server = http.createServer(app);
app.use('/assets',express.static('./assets'));

var io = require('socket.io')(server);

var edison = require('./controllers/edison');


app.use('/assets',express.static('./assets'));


/* WebSocket Server for Servo */

io.on('connection', function(socket){
  socket.on('setServo', function(data){ //on incoming websocket message...
      console.log('Received from server');
      edison.setServo(data) //update servo
  });

  socket.on('ledToggle',function(data){
    edison.ledToggle();
  })
});       




app.get('/',(req,res)=>{
    res.status(200).sendFile(__dirname+"/views/index.html");
})

server.listen(8090,'192.168.0.102');
