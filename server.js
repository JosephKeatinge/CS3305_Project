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


app.set('port', 1194);
app.use('/Client/Game', express.static(__dirname + '/Client/Game'));
app.use('/Client/Lobby', express.static(__dirname + '/Client/Lobby'));
app.use('/Client/Assets', express.static(__dirname + '/Client/Assets'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});
// Starts the server.
server.listen(1194, function() {
  console.log('Starting server on port 1194');
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
    this.playernames = [];
    this.host = lobbyhost;
    this.id = init_id;
    this.max_players= init_max_players;
    this.pwordOn= init_pwordon;
    this.password= init_pword;
    this.gameOn = false;
    this.scores = {};

    /* Function for requesting basic lobby information
     * @return JSON object with Lobbynum, the lobby ID; Players, the amount of players in the lobby; maxPlayers, the max amount of players allowed
    */
    this.requestInfo = function () {
        return { id: this.id, host: this.host,playernames:this.playernames,passwordOn: this.pwordOn, password: this.password, max_players: this.max_players };

    }

    /*Function for a player joining a server
     *@params player: the player to join
    */
    this.playerJoin = function (player) {
        if (this.players.length >= this.max_players) {
            socket.emit('fullLobby', 'Lobby is full.');

        } else {
            
            //Add player to the list of users in lobby
            this.players.push(player.id);
            this.playernames.push(player.username);
            this.scores[player.id] = 0;
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
        this.playernames.splice(index, 1);
        delete this.scores[data.user];
    }

    this.updateScores = function(playerID){
      this.scores[playerID] += 1;
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
                    health:player.health,
                    count: this.count,
                    w:player.w,
                    h:player.h
                }
            },
            //Update position of each player and health
            updatePlayers: function (newpos, pid) {
                for (var id in this.players) {
                    if (id == pid) {
                        var player = this.players[id];
                        player.x = newpos.x;
                        player.y = newpos.y;
                        player.health=newpos.health;
                    }
                    console.log(this.players);
                    this.sendPlayerData();
                }

            },
            //Send dictionary to player
            sendPlayerData: function () {
           
                io.to(this.game_id).emit('heartbeat', this.players);
            },
            //send bullet to each player
            playerBullets: function (bullet,socket) {
              io.to(this.game_id).emit('bullets',bullet);
            },
            //Delete player from dictionary when they leave
            playerDisconnect: function (socket) {
                delete this.players[socket.id];

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

function requestScoreBoard(currentLobby){
  scoreBoard = []
  for(var i = 0; i < currentLobby.players.length; i++){
    playerInfo = {
      playerName:currentLobby.playernames[i],
      playerScore:currentLobby.scores[currentLobby.players[i]]
    }
    scoreBoard.push(playerInfo);
  }
  return scoreBoard
}


io.on('connection', function (socket) {
    
  //A player has connected and sent there initial x,y postion
  socket.on('newplayer', function(data) {
    //Server stores this in a dictionary with the socket id as the key and player object
    //as the value with the x and y value
      //console.log(data.gameid);
      //console.log(data.user);
    servers[data.gameid].addPlayer(data.user,socket.id);
  });
  socket.on('position', function (newpos) {

    //Every few seconds the player sends their position as a object
    //The server finds this player and updates there position
     servers[newpos.gameid].updatePlayers(newpos.user,socket.id);
  });
  //A player has shot send  receive his bullets then send him who else has shot
  socket.on('shoot', function (bullet) {
    //send to everyone this  bullet
      servers[bullet.gameid].playerBullets(bullet.user,socket);

  });
  socket.on('outside',function(bullet){
        servers[bullet.gameid].bulletDelete(bullet.user,socket.id);

  });









    //Lobby information requested by the client
    //Returns an array of JSON objects @see Lobby.requestInfo()
  socket.on('requestLobbies', function () {
      requestLobbies();
  });

  //Starts the main game
    //Currently works with old game.js wrapped in a socket.on('begingame'), with var socket taken out
  socket.on('start_game', function (lobbyid) {
     //console.log("start_game")
      //Sends an emit to the lobby room
      io.to(lobbyid).emit('begingame', lobbyid);
      io.to(lobbyid).emit("updateScores",requestScoreBoard(lobbies[lobbyid]));
      //creates a new game server and adds it to the servers dictionary
      var game_server = new GameServer(lobbyid);
      servers[lobbyid] = game_server;
      delete lobbies[lobbyid];

      /*setInterval(function () {
          
          servers[lobbyid].sendPlayerData();
      }, 60);*/
      requestLobbies();
     
      
  });
    //To answer a client emit requesting to create a lobby
  socket.on('create_lobby', function (lobbyinfo) {
      lobbyno += 1
      newlobby = new Lobby(lobbyinfo.lobby_id, lobbyinfo.host, lobbyinfo.max_players, lobbyinfo.pwordOn, lobbyinfo.password);
      //console.log(newlobby);
      lobbies[newlobby.id] = newlobby;
      lobbies[newlobby.id].playerJoin({"id":socket.id, "username":newlobby.host});
      clients[socket.id] = newlobby.id;
      socket.join(newlobby.id);
      socket.emit('lobbyCreated', lobbies[newlobby.id].requestInfo());
      
      requestLobbies();

  });
 //To answer a client emit requesting to join a lobby
  socket.on('join_lobby', function (data) {
      lobbies[data.lobby].playerJoin({ "id": socket.id, "username": data.username });
      clients[socket.id] = data.lobby;
      socket.join(data.lobby);
      io.to(data.lobby).emit('playerJoined', lobbies[data.lobby].requestInfo());
      requestLobbies();
      console.log(data.username);
  });

    //To answer a client emit requesting to leave a lobby
  socket.on('leave_lobby', function (data) {
     
      lobbies[data.lobby].playerLeave({"id": socket.id, "username": data.username});
      socket.leave(data.lobby);
      io.to(data.lobby).emit('playerJoined', lobbies[data.lobby].requestInfo());
      if (lobbies[data.lobby].players.length == 0) {
          delete lobbies[data.lobby];
      }
      delete clients[socket.id];
      requestLobbies();

  });
 socket.on("newScore",function(data){
    lobbies[data.lobby].updateScore(data.playerid)
    socket.emit("updateScores",requestScoreBoard(lobbies[data.lobby]));
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
