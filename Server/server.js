// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
var newlobby;
//Dictionary containing socketID of clients and the lobby number they are in
var clients = {};
//dictionary containing game server numbers as keys and game server objects as values
var servers = {};
//Dictionary containing lobby numbers (same as their game server number) as keys and lobby objects as values
var lobbies = {};
var lobbyno = 0;


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

//Lobby Server Class
function Lobby(init_id, lobbyhost, init_max_players, init_pwordon, init_pword) {
    /*
     *@constructor for the Lobby API
     *@params players, the list of players in the lobby
     *@params id, the lobby id
     *@params host, the host of the lobby
     *@params max_players max players in the lobby
     *@params pwordOn, if password is set. Initially set to false
     *@params password, the password for the lobby. Initially null.

    */
    this.players = [];
    this.id = init_id;
    this.host= lobbyhost;
    this.max_players= init_max_players;
    this.pwordOn= init_pwordon;
    this.password= init_pword;
    this.gameOn = false;

    /* Function for requesting basic lobby information
     * @return JSON object with Lobbynum, the lobby ID; Players, the amount of players in the lobby; maxPlayers, the max amount of players allowed
    */
    this.requestInfo = function () {
        return { "id": this.id, "host": this.host, 'password': this.pwordOn, "max_players": this.max_players };

    }

    /*Function for a player joining a server
     *@params player: the player to join
    */
    this.playerJoin = function (player) {
        if (this.players.length >= this.max_players) {
            socket.emit('fullLobby', 'Lobby is full.');

        } else {
            
            //Add player to the list of users in lobby
            this.players.push(player);
        }

    }
    /*The function for a player leaving the server
     *@params data: contains data.user, the user to leave
    */
    this.playerLeave = function (data) {
        //Find the index of the player
        var index = this.players.indexOf(data.user);
        //remove them from the players list
        this.players.splice(index, 1);
    }
    

    
}
//Server Class
function GameServer(lobby) {
    this.players = {};
    this.count = 0;
    this.game_id = lobby;
}
//Define Methods

       //Add player to dictionary storing x and y
   
       GameServer.prototype = {
            //Add player to dictionary storing x and y
            addPlayer: function (player, id) {
                this.count += 1;
                this.players[id] = {
                    x: player.x,
                    y: player.y,
                    bullets:[],
                    count: this.count
                }
            },
            //Update position of each player
            updatePlayers: function (newpos, pid) {
                for (var id in this.players) {
                    if (id == pid) {
                        var player = this.players[id];
                        player.x = newpos.x;
                        player.y = newpos.y;
                    }
                    console.log(this.players);
                }

            },
            //Send dictionary to player
            sendPlayerData: function () {
                io.to(this.game_id).emit('heartbeat', this.players);
            },
            //stores bullet of individual player
            playerBullets: function (bullet,pid) {
              var player=this.players[pid];
              var playerbull=player.bullets;
              playerbull.push(bullet);
              this.sendBullets(playerbull,pid);
                
            },

            //Sends the Lists of bullets to the client
            sendBullets: function (playerbullets,pid) {
                for(var id in this.players){
                  if(id!=pid){
                      //send to only these sockets
                      socket.broadcast.to(this.game_id).emit('bullets', playerbullets);

                  }
                }

            },
            //Delete player from dictionary when they leave
            playerDisconnect: function (socket) {
                delete this.players[socket.id];

            },
             //Delete bullet when it hits a wall
            bulletDelete:function(bullet,pid){
              var player=this.players[pid];
              var index=player.bullets.indexOf(bullet);
              player.bullets.splice(index,1);
            }

           

      }


function requestLobbies() {
    var lobbies_info = [];
    var key;
    //Goes through a for loop of the lobbies object to return all lobby information
    if (Object.keys(lobbies).length > 0) {
        for (i = 0; i < Object.keys(lobbies).length; i++) {
            key = Object.keys(lobbies)[i];
            //adds the information to the lobbies info object
            lobbies_info.push(lobbies[key].requestInfo());
        }
    }
    io.emit('lobbyList', lobbies_info);

}




io.on('connection', function (socket) {
    
  //A player has connected and sent there initial x,y postion
  socket.on('newplayer', function(data) {
    //Server stores this in a dictionary with the socket id as the key and player object
    //as the value with the x and y value
      console.log(data.gameid);
      console.log(data.user);
    servers[data.gameid].addPlayer(data.user,socket.id);
  });
  socket.on('position', function (newpos) {

    //Every few seconds the player sends their position as a object
    //The server finds this player and updates there position
     servers[newpos.gameid].updatePlayers(newpos.user,socket.id);
  });
  //A player has shot send  receive his bullets then send him who else has shot
  socket.on('shoot', function (bulletList) {
      servers[bulletList.gameid].playerBullets(bulletList,socket.id);

  });
  socket.on('outside',function(bullet){
        servers[bullet.gameid].bulletDelete(bullet,socket.id);

  });

    //Lobby information requested by the client
    //Returns an array of JSON objects @see Lobby.requestInfo()
  socket.on('requestLobbies', function () {
      requestLobbies();
  });

  //Starts the main game
    //Currently works with old game.js wrapped in a socket.on('begingame'), with var socket taken out
  socket.on('start_game', function (data) {
      //Sends an emit to the lobby room
      io.to(data.lobby).emit('begingame', data.lobby);
      //creates a new game server and adds it to the servers dictionary
      var game_server = new GameServer(data.lobby);
      servers[data.lobby] = game_server;
      delete lobbies[data.lobby];

      setInterval(function () {
          
          servers[data.lobby].sendPlayerData();
      }, 1000 / 30);
      requestLobbies();
     
      
  });
    //To answer a client emit requesting to create a lobby
  socket.on('create_lobby', function (lobbyinfo) {
      lobbyno += 1
      
      newlobby = new Lobby(lobbyno, lobbyinfo.host, lobbyinfo.max_players, lobbyinfo.pwordOn, lobbyinfo.password);
      lobbies[lobbyno] = newlobby;
     
      lobbies[lobbyno].playerJoin(lobbyinfo.host);
      clients[socket.id] = lobbyno;
      socket.join(lobbyno);
      socket.to(lobbyno).emit('lobbyCreated', lobbies[lobbyno].requestInfo());
      requestLobbies();

  });
 //To answer a client emit requesting to join a lobby
  socket.on('join_lobby', function (data) {
      lobbies[data.lobby].playerJoin(data.user);
      clients[socket.id] = data.lobby;
      socket.join(data.lobby);
      socket.to(data.lobby).emit('playerJoined', lobbies[data.lobby].players.length);
      requestLobbies();
  });

    //To answer a client emit requesting to leave a lobby
  socket.on('leave_lobby', function (data) {
     
      lobbies[data.lobby].playerLeave(data.user);
      socket.leave(data.lobby);
      if (lobbies[data.lobby].players.length == 0) {
          delete lobbies[data.lobby];
          
      }
      delete clients[socket.id];
      requestLobbies();

  });
 
  
  /*
  * Function for when the client disconnects
  * The clients dictionary is checked to see if they are a part of any lobbies or servers. If they are, the appropriate function is called.
  * If the lobby or server is empty after the client disconnects, the lobby or server is removed from its respective dictionary.
 */
  socket.on('disconnect', function () {
      var index = clients[socket.id];
      if (index != undefined) {
          if (lobbies[index]) {
              lobbies[index].playerLeave({ user: socket.id });
              if (lobbies[index].players.length == 0) {
                  delete lobbies[index];
              }
              requestLobbies();
          }
          else if (servers[index]) {
              servers[index].playerDisconnect({ id: socket.id });
              if (servers[index].players.length == 0) {
                  delete servers[index];
              }
          }
          delete clients[socket.id];
      }




  });
});
