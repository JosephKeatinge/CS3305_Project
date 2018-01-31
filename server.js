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
//Server Class
function GameServer(){
    this.players={};
    this.count=0;
}
//Define Methods
GameServer.prototype={
       //Add player to dictionary storing x and y
       addPlayer: function(player,id){
         this.players[id]={
           x:player.x,
           y:player.y
         }
       },
       //Update position of each player 
       updatePlayers:function(newpos,pid){
         for(var id in  this.players){
           if (id==pid){
             var player=this.players[id];
             player.x=newpos.x;
             player.y=newpos.y;
           }
         }

       },
       //Send dictionary to player
       sendPlayerData:function(){
            io.sockets.emit('heartbeat',this.players);
       },
       //Delete player from dictionary when they leave
       playerDisconnect:function(socket){
         delete this.players[socket.id];

       }
}

//Main Server Stuff
var server=new GameServer();

setInterval(function(){
  //Send Disctionary of players positions to Client's
  server.sendPlayerData();
},1000/30);

io.on('connection', function(socket) {
  //A player has connected and sent there initial x,y postion
  socket.on('newplayer', function(player) {
    //Server stores this in a dictionary with the socket id as the key and player object
    //as the value with the x and y value
    server.addPlayer(player,socket.id);
  });
  socket.on('position', function(newpos) {
    //Every few seconds the player sends their position as a object
    //The server finds this player and updates there position
     server.updatePlayers(newpos,socket.id);
  });

socket.on('disconnect',function(){
    server.playerDisconnect(socket);
  });
});
