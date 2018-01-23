// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));
// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});
// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});
 //Add the WebSocket handlers
var players = {};
io.on('connection', function(socket) {
  socket.on('new player', function(data) {

    console.log(data);
    players[socket.id] = {
      x: data.x,
      y: data.y
    };
    console.log(players);
  });
  socket.on('position', function(data) {
     for(var id in players){
       var player=players[id];
       player.x=data.x;
       player.y=data.y;

     }
    //console.log(data);

  });
});

 setInterval(function(){
   io.sockets.emit('message',"Connected");
 },1000/60);
