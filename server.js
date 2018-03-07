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
function Lobby(init_id, lobbyhost, init_max_players, init_pwordon, init_pword, init_map, init_score) {
    /*
     *@constructor for the Lobby API
     *@params init_id the name of the lobby
     *@params lobbyhost the user who created the lobby
     *@params init_max_players max players in the lobby
     *@params init_pwordOn true if lobby is password protected, false otherwise
     *@params init_pword the password for the lobby
     *@params init_map the map chosen by the host to play on
     *@params init_score the score required to win and end the game
    */
    this.players = [];
    this.playernames = [];
    this.host = lobbyhost;
    this.id = init_id;
    this.max_players= init_max_players;
    this.pwordOn= init_pwordon;
    this.password= init_pword;
    this.gameOn = false;
    this.map=init_map;
    this.score=init_score;
}

Lobby.prototype={
    /* Function for requesting basic lobby information
     * @return JSON object with Lobbynum, the lobby ID; Players, the amount of players in the lobby; maxPlayers, the max amount of players allowed
    */
    requestInfo : function () {
        return { id: this.id, host: this.host,playernames:this.playernames,map:this.map,passwordOn: this.pwordOn, password: this.password, max_players: this.max_players, score : this.score };

    },

    /*Function for a player joining a server
     *@params player: the player to join
    */
    playerJoin : function (player) {
        if (this.players.length >= this.max_players) {
            socket.emit('fullLobby', 'Lobby is full.');

        } else {
            
            //Add player to the list of users in lobby
            this.players.push(player.id);
            this.playernames.push(player.username);
        }
    },
    /*The function for a player leaving the server
     *@params data: contains data.user, the user to leave
    */
    playerLeave:function (data) {
        //Find the index of the player
        var index = this.players.indexOf(data.user);
        //remove them from the players list
        this.players.splice(index, 1);
        this.playernames.splice(index, 1);
    },


    
}
//Server Class
function GameServer(lobby) {
    /*
     *@constructor for the GameServer API
     *@params players, the list of players in the  game 
     *@params game_id,The id of the lobby the server is running
     *@params scores,The scores of the players
    */
    this.players = {};
    this.game_id = lobby;
    this.scores={};
}

GameServer.prototype = {
  /*The function for a player joining the gameServer
     *@params player,Is the player that has joined as a object
     *@params id,Is the Socket id of the player
  */
  addPlayer: function (player,playerName, pid) {

      this.players[pid] = {
          x: player.x,
          y: player.y,
          health:player.health,
          w:player.w,
          h:player.h,
          score:player.score,
          id:playerName,
          direction:player.direction,
      }
  },

   /*Update the location and health of each Player
     *@params newpos,Player object which new position
     *@params pid,Is the Socket id of the player
  */
  updatePlayers: function (newpos, pid) {
      for (var id in this.players) {
          if (id == pid) {
              var player = this.players[id];
              player.x = newpos.x;
              player.y = newpos.y;
              player.health=newpos.health;
              player.direction = newpos.direction;
          }
          this.sendPlayerData();
      }

  },

  /*Send the player dictionary to every player
  */
  sendPlayerData: function () {
      io.to(this.game_id).emit('heartbeat', this.players);
  },

  /*Send the bullets to the client
     *@params bullet,A bullet which has been shot
     *@params socket,The socket of the person who shot
  */
  playerBullets: function (bullet,socket) {
    io.to(this.game_id).emit('bullets',bullet);
  },

  /*Delete player when they leave the game
     *@params socket,socket of person who disconnected
  */
  playerDisconnect: function (socket) {
      delete this.players[socket.id];

  },

  /*Update the Score of the player
     *@params enemy_id,Id of player who has scored
     *@params pid,Is the Socket id of the player
  */
  updatesScores:function(enemy_id,socket){
      this.players[enemy_id].score+=1;
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
//Main Server Loop
io.on('connection', function (socket) {
    
  //A player has connected and sent there initial x,y postion
  socket.on('newplayer', function(data) {
    //Server stores this in a dictionary with the socket id as the key and player object
    servers[data.gameid].addPlayer(data.user,data.userName,socket.id);
  });
  socket.on('position', function (newpos) {
    //Every few seconds the player sends their position as a object
    //The server finds this player and updates there position
     servers[newpos.gameid].updatePlayers(newpos.user,socket.id);
  });
  //A player has shot send their bullet to everyone
  socket.on('shoot', function (bullet) {
      servers[bullet.gameid].playerBullets(bullet.user,socket);
  });
  //Update the Score of the player of has scored
  socket.on('updateScores',function(enemy_id){
      servers[enemy_id.gameid].updatesScores(enemy_id.user,socket);
  });
  //Disconnect player when game is over
  socket.on('disconnect0',function(data){
      servers[data.gameid].playerDisconnect(socket);
  });







  //Lobby information requested by the client
  //Returns an array of JSON objects @see Lobby.requestInfo()
  socket.on('requestLobbies', function () {
      requestLobbies();
  });

  //Starts the main game
  socket.on('start_game', function (lobbyid) {
      //Sends an emit to the lobby room
      io.to(lobbyid).emit('begingame', lobbyid);
      //creates a new game server and adds it to the servers dictionary
      var game_server = new GameServer(lobbyid);
      servers[lobbyid] = game_server;
      delete lobbies[lobbyid];
      requestLobbies();
  });
    //To answer a client emit requesting to create a lobby
  socket.on('create_lobby', function (lobbyinfo) {
      //Create a new lobby object
      newlobby = new Lobby(lobbyinfo.lobby_id, lobbyinfo.host, lobbyinfo.max_players, lobbyinfo.pwordOn, lobbyinfo.password, lobbyinfo.map, lobbyinfo.score);
      //Add new lobby into the lobbies dictionary, referenced by its id and add the lobby host into the lobby
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
