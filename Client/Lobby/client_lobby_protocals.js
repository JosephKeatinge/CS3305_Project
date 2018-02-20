var in_lobby = false
var lobbies_info;
/*unction to join the selected lobby
 *
 *@param lobby_id the unique id of the desired lobby 
 *@param socket the current open socket to the server
 */
function join_lobby(lobby_id, socket){
    console.log(clientUsername);
    socket.emit("join_lobby", { "lobby": lobby_id, "username":clientUsername })
}

/*function to go back to the list of lobbies
 *
 *@param lobby_id the unique id of the lobby you are in
 *@param socket the current open socket to the server
 */
function leave_lobby(lobby_id,socket){
  socket.emit("leave_lobby",{"lobby": lobby_id, "username": clientUsername })
}

/*function to create a new lobby
 *
 *@param socket the current open socket to the server
 */
function create_lobby(socket,new_lobby_info,username){
	socket.emit("create_lobby",new_lobby_info,username);
}

/*function to start the game in the current lobby
 *
 *@param socket the current open socket to the server
 */
function start_game(socket,lobbyId){
  socket.emit("startGame",lobbyId)
}

/*function to get the list of current lobbies on the server
 *
 *@param socket the current open socket to the server
 */
function request_lobbies(socket){
  socket.emit("requestLobbys");
}

/*processes the info recieved from the player about a specific lobby
 *
 *@param lobby_info a lobby json object that holds all the required info
 */
/*socket.on("requestInfo",function(data)){
  //pass
}*/

/*notification for all players that the game is beginning
 */
socket.on("begingame", function(){
    gameState = "game"
    endLobbyWaitRoom();
    console.log("begingame")
})

/*procceses the info recieved for all open lobbies on the server
 */
socket.on("lobbies_info",function (data) {
  lobbies_info = data
})

socket.on("playerJoined",function (data) {
  currentLobby = data;
})

socket.on("lobbyCreated", function (data) {

    lobbyWaitRoomNumberOfPlayers = 1;
    currentLobby = data;
  
})

socket.on("updateScores",function(data){
    console.log(data);
    scoreBoard = []
    scoreBoard.push(data[0])
    for(var i = 1; i<data.length; i++){
      for(var j = 0; j < scoreBoard.length; j++){
      	if(data[i].score < scoreboard[j].score){
      		scoreBoard.splice(j,0,data[i]);
      		break
      	}
      }
      if(j == scoreBoard.length){
      	  scoreBoard.push(data[i])
      }
    }
})
