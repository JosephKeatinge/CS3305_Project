var volume;
var settingsMenuPointer;
function startSettingsMenu(){
    windows.addEventListener("keydown",settingsMenuControls);
    words=["Volume","Change UserName","Main Menu"];
    settingsMenuPointer=0;
    canvasContext.font="30px Silkscreen";
    volume=0;
} 
function updateSettingsMenu(){
    settingsMenuDraw();
}
function settingsMenuDraw(){
    canvasContext.fillStyle="#000000";              
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.fillStyle="#888888";
    canvasContext.fillText(Settings,canvas.width/2,300);
    for(i=0; i<words.length;i++){
        if(i=="VolumCS3305_Projecte"){
        canvasContext.fillText(words[i]+volume,canvas.width/2,300+60*i);
        }else{
            canvasContext.fillText(words[i]+volume,canvas.width/2,300+60*i);
        }
        canvasContext.fillStyle="#ffffff";
        canvasContext.fillText(words[settingsMenuPointer],canvas.width/2,300+60*settingsMenuPointer);
    }
}
function settingsMenuControls(){
    switch(e.keyCode){
        case 87:
            settingsMenuPointer-=1;
            break;
        case 83:
            settingsMenuPointer+=1;
            break;
        case 13:
            if(words[settingsMenuPointer]=="Change UserName"){
                gameState="UserNameMenu";
                endSettingsMenu(); 
            }else if(words[settingsMenuPointer]=="Main Menu"){
                gameState="main_menu";
                endSettingsMenu();
            }
            break;
        case 68:
            if(words[settingsMenuPointer]=="Volume"){
                volume+=1;
            }
            break
        case 65:
            if(words[settingsMenuPointer]=="Volume"){
                volume-=1;
            }
            break;
        }
        if(settingsMenuPointer<0){
            settingsMenuPointer=0;
        }else if(settingsMenuPointer>=words.length){
            settingsMenuPointer=words.length-1;
        }
}
function endSettingsMenu(){
    window.removeEventListener("keydown",settingsMenuControls);
    settingsMenu="false";
}
