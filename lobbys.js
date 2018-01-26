
var lobbies = {};
//The Lobby API
function Lobby(init_id, init_max_players) {
    /*
     *@constructor for the Lobby API
     *@params players, the list of players in the lobby
     *@params id the lobby id
     *@params max_players max players in the lobby
     *@params pwordOn, if password is set. Initially set to false
     *@params password, the password for the lobby. Initially null.

    */
    var lobby = {
        players =[],
        id = init_id,
        max_players = init_max_players,
        pwordOn = false,
        password = ''
        

    };
    
    this.requestInfo = function () {
        return ("Lobby " + lobby.id + " " + lobby.players.length + " " + lobby.max_players);
        
    }
    
    /*Funcion for a player joining a server
     *@params player: Contains player.lobby, the lobby the player wishes to join, and player.user, the player's username'
    */
    this.playerJoin = function  (player) {
        if (players.length >= max_players) {
            socket.emit('fullLobby', 'Lobby is full.');

        } else {
            socket.join(player.lobby.id);
            //Add player to the list of users in lobby
            players.push(player.user);
        }

    }
    /*The function for a player leaving the server
     *@params player: contains player.user, the user to leave and player.lobby, the lobby of which the player leaves
    */
    this.playerLeave = function (player) {
        //Find the index of the player
        var index = lobby.players.indexOf(player.user);
        //remove them from the players list
        lobby.players.splice(index, 1);
        socket.leave(player.lobby);

    }
    
    this.setPassword = function (pword) {
        lobby.password = pword;
        lobby.pwordOn = true;
    }
  
    return Lobby
}

socket.on('playerJoin', function (data) {
    lobbies[data.lobby].playerJoin(data);

});

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

socet.on('setPassword', function (data) {
    lobbies[data.lobby].setPassowrd(data);
});

socket.on('checkPassword', function (data) {

    if (lobbies[data.lobby].lobby.password == data.password) {
        lobbies[data.lobby].playerJoin(data.user)
    } else {
        socket.emit('wrongPassword', "Incorrect password");
    }
});

socket.on('kickPlayer', function (data) {
    lobbies[data.lobby].playerLeave(data.player);

});