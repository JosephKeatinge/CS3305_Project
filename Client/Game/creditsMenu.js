var credits
function startCredits(){
    window.addEventListener("keydown",creditsMenuControls);
    credits=["Product Owner : Joseph Keatinge","Scrum Master : Sam Drugan"]
    devs=["Darragh McMahon","Evan Young", "Niall Buckley","Sile Neylon","Adam Egan","Michael Matthews"]
    canvasContext.font = "30px Silkscreen"
} 
function updateCreditsMenu(){
    creditsDraw();
}
function creditsDraw(){
    canvasContext.fillStyle="#000000"
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText("Credits",canvas.width/2,100);
    for(i=0;i<credits.length;i++){
    canvasContext.fillText(credits[i],canvas.width/2,100+60*i);
    }
    canvasContext.fillText("Developers",canvas.width/2,220+60*i);
    for(i=2;i<words.length;i++){
    canvasContext.fillText(devs[i],canvas.width/2,280+60*i);
    }
}
function creditsMenuCotrols(e){
    if(e.keyCode==27){
        endCredits()
        gameState="main_menu"
    }
}
function endCredits(){
     window.removeEventListener("keydown",creditsMenuControls);
     creditsMenu=false;
}
