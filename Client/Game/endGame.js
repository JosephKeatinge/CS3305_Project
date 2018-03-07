
var text;
/*
 *This funciton starts the endGame Screen and waits
 *For the player to press enter
*/
function startEndGame(){
    window.addEventListener("keydown",startGameControls);
    text=["GameOver","To play some more","Press Enter"]
}

/*
 *This function calls endGameDraw every Interval
*/
function updateEndGame(){
    endGameDraw();
}
/*
 *This draws the menu with the scoreboard and logo
*/
function endGameDraw(){
    canvasContext.fillStyle="#000000"
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.drawImage(logo,280,-100);
    canvasContext.textAlign = "center";
    canvasContext.font = "42px Silkscreen";
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText("This is the END",canvas.width/2,175)
    canvasContext.font = "30px Silkscreen";
    for(i=0;i<text.length;i++){
    canvasContext.fillText(text[i],canvas.width/2,250+60*i);
    }
    drawGUI();
    canvasContext.fillStyle="#ffffff";
}

/*
 *This checks if the person has pressed Enter
 *If so it will change state to the main menu 
*/
function startGameControls(e){
    if(e.keyCode==13){
        endGameControls();
        otherPlayers={};
        gameState="main_menu";
    }
}
/*
 *Removes the event listeners for the endGame Menu
*/
function endGameControls(){
    window.removeEventListener("keydown",startGameControls);
    endGame=false;
}
