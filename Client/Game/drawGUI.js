function drawGUI(){
  //Draw Scoreboard
  canvasContext.fillStyle = "#000000";
  canvasContext.fillRect(canvas.width - 200,0,200,canvas.height);
  canvasContext.fillStyle = "#ffffff"
  i=0
  for(var id in otherPlayers){
      canvasContext.fillText(otherPlayers[id].id+ " : " + otherPlayers[id].score ,canvas.width - 100,200 + i*50);
      i++
  }

  if(gameStarted){
  //Draw Health Bar
  canvasContext.fillStyle = "#ff0000"
  canvasContext.fillRect(canvas.width - 180,40,160,20)
  canvasContext.fillStyle = "#00ff00"
  canvasContext.fillRect(canvas.width - 180,40,(160 - (((200-player.health)/200)*160)),20)
 }
}
