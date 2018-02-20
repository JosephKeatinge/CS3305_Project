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
    canvasContext.fillText("Current Players",canvas.width/2,60);
    canvasContext.fillText(currentLobby.host,canvas.width/2,80);
    for(i in currentLobby.playernames){
      canvasContext.fillText(currentLobby.playernames[i],canvas.width/2,50*i+1);
    }
    canvasContext.fillText(("Press Enter To Start Game"),canvas.width/2,50*6);
    console.log(currentLobby);
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



