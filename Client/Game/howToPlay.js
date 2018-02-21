var text;
function startHowToPlay(){
    windows.addEventListener("keydown",howToPlayControls);
    text=["W to move up","S to move down","A to move right","D to move left","Left click to fire","Esc to exit the game"]
}
function updateHowToPlay(){
    howToPlayDraw();
}
function howToPlayDraw(){
    canvasContext.fillStyle="#000000"
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.drawImage(logo,280,10);
    canvasContext.textAlign = "center";
    canvasContext.font = "42px Silkscreen";
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText("Controls",canvas.width/2,300)
    canvasContext.font = "30px Silkscreen";
    for(i=0;i<text.length;i++){
    canvasContext.fillText(words[i],canvas.width/2,300+60*i);
    }
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText(words[MainMenuPointer],canvas.width/2,300+60*MainMenuPointer);
}
function howToPlayControls(e){
    if(e.keyCode==27){
        endHowToPlay()
        gameState="main_menu";
    }
}
function endHowToPlay(){
    howToPlay=false;
}