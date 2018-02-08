var in_lobby = false
var lobbies_info;
/*unction to join the selected lobby
 *
 *@param lobby_id the unique id of the desired lobby 
 *@param socket the current open socket to the server
 */
function join_lobby(lobby_id, socket){
	socket.emit("join_lobby",lobby_id)
}

/*function to go back to the list of lobbies
 *
 *@param lobby_id the unique id of the lobby you are in
 *@param socket the current open socket to the server
 */
function leave_lobby(lobby_id,socket){
  socket.emit("join_lobby",lobby_id)
}

/*function to create a new lobby
 *
 *@param socket the current open socket to the server
 */
function create_lobby(socket,new_lobby_info){
	socket.emit("create_lobby")
}

/*function to start the game in the current lobby
 *
 *@param socket the current open socket to the server
 */
function start_game(socket){
  socket.emit("startGame")
}

/*function to get the list of current lobbies on the server
 *
 *@param socket the current open socket to the server
 */
function request_lobbies(socket){
  socket.emit("requestLobbys")
}

/*processes the info recieved from the player about a specific lobby
 *
 *@param lobby_info a lobby json object that holds all the required info
 */
socket.on("requestInfo",function(data)){
  //pass
}

/*notification for all players that the game is beginning
 */
socket.on("startGame"){
  //pass
}

/*procceses the info recieved for all open lobbies on the server
 */
socket.on("requestLobbies",function(data)){
  lobbies_info = JSON.parse(data)
}

socket.on("playerJoined",function(data)){
  lobbyWaitRoomNumberOfPlayers = data;
}
