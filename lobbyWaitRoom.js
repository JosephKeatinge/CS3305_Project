var lobbyWaitRoomDown;
var lobby;
function startlobbyWaitRoom(){
  canvasContext.font = "20px Silkscreen";
  canvasContext.textAlign = "center";
  lobbyWaitRoomDown=window.addEventListener("keydown",lobbyWaitRoomControls);
  lobby=currentLobby;
}
function updateLobbyWaitRoom(){
    /* 
    Creates an interval to call clear and draw
    */
    lobbyWaitDraw();
    
}
function WaitRoomnumberOfPlayers(){
  var str="";
  str="Number of players : ",LobbyWaitRoomNumberOfPlayers," / ",lobby.max_players;
  return str;
  
}
function lobbyWaitRoomDraw(){
    canvasContext.fillStyle="#000000";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText(WaitRoomnumberOfPlayers(),canvas.width/2,40);
    canvasContext.fillStyle="#888888";
    canvasContext.fillText(("Press Enter To Start Game"),canvas.width/2,80);
}
function lobbyWaitRoomControls(e){
  if(e==13{
      socket.emit("start_game",lobby.id);
      endLobbyWaitRoom();
    }
  
}
function endLobbyWaitRoom(){
    lobbyWaitRoomDown.removeEventListener("keydown",lobbyWaitRoomControls);
    gameState="game";
}


