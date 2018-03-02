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
  console.log(otherPlayers);
  i=0
  for(var id in otherPlayers){
  	  console.log("hi");
      canvasContext.fillText(otherPlayers[id].x+ " : " + otherPlayers[id].score ,canvas.width - 100,200 + i*50);
      i++
  }

}