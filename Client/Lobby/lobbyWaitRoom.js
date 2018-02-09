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
  str="Number of players : "+ lobbyWaitRoomNumberOfPlayers +" / " +currentLobby.max_players;
  return str;  
}

function lobbyWaitRoomDraw() {
    canvasContext.fillStyle="#000000";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText(WaitRoomnumberOfPlayers(),canvas.width/2,40);
    canvasContext.fillStyle="#888888";
    canvasContext.fillText(("Press Enter To Start Game"),canvas.width/2,80);
}

function lobbyWaitRoomControls(e) {
  if(e.keyCode==13) {
      socket.emit("start_game",currentLobby.id);
      endLobbyWaitRoom();
    }
}

function endLobbyWaitRoom() {
    window.removeEventListener("keydown",lobbyWaitRoomControls);
    lobbyWaitRoom = false;
}


