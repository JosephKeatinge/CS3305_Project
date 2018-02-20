var lobbyWaitRoomNumberOfPlayers = 0;
function startLobbyWaitRoom() {
  canvasContext.font = "20px Silkscreen";
  canvasContext.textAlign = "center";
  window.addEventListener("keydown",lobbyWaitRoomControls);
}
function updateLobbyWaitRoom() {
    /* 
    Creates an interval to call clear and draw
    */
    lobbyWaitRoomDraw();
}

function WaitRoomnumberOfPlayers() {
  var str="";
  str="Number of players : "+ currentLobby.playernames.length +" / " +currentLobby.max_players;
  return str;
}

function lobbyWaitRoomDraw() {
    canvasContext.fillStyle="#000000";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText(WaitRoomnumberOfPlayers(),canvas.width/2,40);
    canvasContext.fillText("Current Players",canvas.width/2,80);
    for(var i = 0;i < currentLobby.playernames.length; i++){
      canvasContext.fillText(currentLobby.playernames[i],canvas.width/2,100+40*(i+1));
    }
    canvasContext.fillText("Press escape to enter the main menu",canvas.width/2,400);
    canvasContext.fillText(("Press Enter To Start Game"),canvas.width/2,450);
}

function lobbyWaitRoomControls(e) {
  switch(e.keyCode) {
      case 13:
      socket.emit("start_game",currentLobby.id);
      endLobbyWaitRoom();
    case 27:
	leave_lobby(currentLobby.id,socket);
	endLobbyWaitRoom();
	gameState="main_menu";
    }
}

function endLobbyWaitRoom() {
    window.removeEventListener("keydown",lobbyWaitRoomControls);
    lobbyWaitRoom= false;
}



