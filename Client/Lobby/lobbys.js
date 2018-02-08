
var lobbyno = 0;
var lobbies = {};
//The Lobby API
function Lobby(init_id, lobbyhost, init_max_players) {
    /*
     *@constructor for the Lobby API
     *@params players, the list of players in the lobby
     *@params id, the lobby id
     *@params host, the host of the lobby
     *@params max_players max players in the lobby
     *@params pwordOn, if password is set. Initially set to false
     *@params password, the password for the lobby. Initially null.

    */
    var lobby = {
        players =[],
        id = init_id,
        host = lobbyhost,
        max_players = init_max_players,
        pwordOn = false,
        password = ''
        

    };
    //For requesting the lobby info (id, how many players are in it, and the max allowed players)
    this.requestInfo = function () {
        return ("Lobby " + lobby.id + " " + lobby.players.length + " " + lobby.max_players);
        
    }
    
    /*Funcion for a player joining a server
     *@params player: Contains player.user, the player to join
    */
    this.playerJoin = function (player) {
        if (players.length >= max_players) {
            socket.emit('fullLobby', 'Lobby is full.');

        } else {
            socket.join(lobby.id);
            //Add player to the list of users in lobby
            players.push(player.user);
        }

    }
    /*The function for a player leaving the server
     *@params player: contains player.user, the user to leave
    */
    this.playerLeave = function (player) {
        //Find the index of the player
        var index = lobby.players.indexOf(player.user);
        //remove them from the players list
        lobby.players.splice(index, 1);
        socket.leave(lobby.id);

    }
    /*The function for a player leaving the server
     *@params pword, the password to set the lobby to
    */
    this.setPassword = function (pword) {
        lobby.password = pword;
        lobby.pwordOn = true;
    }
  
    return Lobby
}

socket.on('createLobby', function () {
    lobbyno += 1;
    var newlobby = new Lobby(lobbyno, socket.id, 4);
    lobbies[lobbyno] = newlobby;
});

//The emit should contain the lobbyid to join in the data
socket.on('playerJoin', function (data) {
    lobbies[data.lobby].playerJoin(data);

});

//The emit should contain the lobbyid to join in the data
socket.on('playerLeave', function (data) {
    lobbies[data.lobby].playerLeave(data);
});


socket.on('requestInfo', function () {
    lobbies_JSON = {};
    for (i = 0; i < lobbies.length; i++) {
        lobbies_JSON[lobbies[i]] = lobbies[i].requestInfo();
    }
    var strngLobbies = JSON.stringify(lobbies_JSON);
    socket.emit('lobbyList', strngLobbies);

});

//should contain the password to set
socket.on('setPassword', function (password) {
    lobbies[data.lobby].setPassword(password);
});

//The emit data should contain the lobby number and an inputted password to check against the lobby's one'
socket.on('checkPassword', function (data) {

    if (lobbies[data.lobby].lobby.password == data.password) {
        lobbies[data.lobby].playerJoin(data.user)
    } else {
        socket.emit('wrongPassword', "Incorrect password");
    }
});

//The emit data should contain the player to kick and the lobby number
socket.on('kickPlayer', function (data) {
    if (socket.id == lobbies[data.lobby].lobby.host) {
        lobbies[data.lobby].playerLeave(data.player);
    }
    

});
