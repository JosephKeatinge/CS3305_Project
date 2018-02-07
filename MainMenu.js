/**
 * Creates a menu in which a user can enter the game,change settings,learn how to play or see the Credits
 *  
*/
var words = ["Create Lobby","Join Lobby","Settings","How to play","Credits"];
var pointer=0;
function startmainmenu(){
    window.addEventListener("keydown",mainLobbyControls);
}

function updategamemenu(){
    /* 
    Creates an interval in which clear and draw are called
    */
    mainmenudraw();

}

function mainMenuDraw(){
    /* 
    Draws the text to the screen
    */
    canvasContext.textAlign = "center";
    canvasContext.fillStyle="#888888";
    for(i=0;i<words.length;i++){
    canvasContext.fillText(words[i],canvas.width/2,300+60*i);
    }
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText(words[pointer],canvas.width/2,300+60*pointer);
}

function mainLobbyControls(e){
    /*
    Sets the controls for the user and keeps track of pointers 
    */
    switch(e.keyCode){
    case 87:
        pointer=pointer-1;
        break;
    case 83:
        pointer=pointer+1;
        break;
    case 13:
        if(pointer==0){
            console.log("Create Lobby");
        }else if(pointer==1){
            console.log("Join Lobby");
        }else if(pointer==2){
            console.log("Settings");
        }else if(pointer==3){
            console.log("How to play");
        }else{
            console.log("Credits");
            }
        }
        if(pointer<0){
            pointer=0;
        }else if(pointer>=words.length){
            pointer=words.length-1;
        }
}