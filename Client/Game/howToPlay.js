var text;
function startHowToPlay(){
    //creates array of text and turns on controls
    window.addEventListener("keydown",howToPlayControls);
    text=["W to move up","S to move down","A to move right","D to move left","Left click to fire","Esc to exit the game"]
}
function updateHowToPlay(){
    //puts draw on the global interval
    howToPlayDraw();
}
function howToPlayDraw(){
    //draws the text to the screen
    canvasContext.fillStyle="#000000"
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.drawImage(logo,280,-100);
    canvasContext.textAlign = "center";
    canvasContext.font = "42px Silkscreen";
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText("Controls",canvas.width/2,175)
    canvasContext.font = "30px Silkscreen";
    for(i=0;i<text.length;i++){
    canvasContext.fillText(text[i],canvas.width/2,250+60*i);
    }
    canvasContext.fillStyle="#ffffff";
}
function howToPlayControls(e){
    //if escape is pressed then the current state is ended and the main menu becomes the current state 
    if(e.keyCode==27){
        endHowToPlay()
        gameState="main_menu";
    }
}
function endHowToPlay(){
    //controls are turned off and how to play state is turned off 
    window.removeEventListener("keydown",howToPlayControls);
    howToPlay=false;
}
