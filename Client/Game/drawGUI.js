var scoreBoard = []
/*
function drawGUI(){
  canvasContext.fillStyle = "#000000";
  canvasContext.fillRect(canvas.width - 200,0,200,canvas.height);
  canvasContext.fillStyle = "#ffffff"
  for(var i = 0;i < scoreBoard.length; i++){
  canvasContext.fillText(scoreBoard[i].playerName + " : " + scoreBoard[i].playerScore,canvas.width - 100,200 + i*50);
  }
}
*/

function drawGUI(){
  canvasContext.fillStyle = "#000000";
  canvasContext.fillRect(canvas.width - 200,0,200,canvas.height);
  canvasContext.fillStyle = "#ffffff"
  i=0
  for(var id in otherPlayers){
      canvasContext.fillText(otherPlayers[id].id+ " : " + otherPlayers[id].score ,canvas.width - 100,200 + i*50);
      i++
  }
  canvasContext.fillStyle = "#ff0000"
  canvasContext.fillRect(canvas.width - 180,40,160,20)
  canvasContext.fillStyle = "#00ff00"
  console.log(player.health)
  canvasContext.fillRect(canvas.width - 180,40,(160 - (((200-player.health)/200)*160)),20)
}
