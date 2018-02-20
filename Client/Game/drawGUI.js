var scoreBoard = []

function drawGUI(){
  for(var i = 0;i < scoreBoard.length; i++){
	canvasContext.fillText(scoreBoard[i].username + " : " + scoreBoard[i].score,canvas.width - 180,200 + i*50);
  }
}
