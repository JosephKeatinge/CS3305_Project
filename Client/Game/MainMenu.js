/**
 * Creates a menu in which a user can enter the game,change settings,learn how to play or see the Credits
 *  
*/
var words;
var MainMenuPointer;
var mainMenuKeydown;
function startmainmenu(){

mainMenuKeydown=window.addEventListener("keydown",mainmenucontrols);
words = ["Create Lobby","Join Lobby","Settings","How to play","Credits"];
MainMenuPointer=0;
}
function updategamemenu(){
    /* 
    Creates an interval in which clear and draw are called
    */
    mainmenudraw();

}
function mainmenudraw(){
    /* 
    Draws the text to the screen
    */
    canvasContext.textAlign = "center";
    canvasContext.fillStyle="#888888";
    for(i=0;i<words.length;i++){
    canvasContext.fillText(words[i],canvas.width/2,300+60*i);
    }
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText(words[MainMenuPointer],canvas.width/2,300+60*MainMenuPointer);
}
function mainmenucontrols(e){
    /*
    Sets the controls for the user and keeps track of MainMenuPointers 
    */
    switch(e.keyCode){
    case 87:
        MainMenuPointer=MainMenuPointer-1;
        break;
    case 83:
        MainMenuPointer=MainMenuPointer+1;
        break;
    case 13:
      if(MainMenuPointer==0){
            console.log("Create Lobby");
            gameState="create_lobby_menu";
        }else if(MainMenuPointer==1){
            console.log("Join Lobby");
            gameState="lobby_list_menu";
        }else if(MainMenuPointer==2){
            console.log("Settings");
            gameState="create_lobby_menu";
        }else if(MainMenuPointer==3){
            console.log("How to play");
        }else{
            console.log("Credits");
            }
        endMainMenu();
        }
        if(MainMenuPointer<0){
            MainMenuPointer=0;
        }else if(MainMenuPointer>=words.length){
            MainMenuPointer=words.length-1;
        }
    }
function endMainMenu(){
    mainMenuKeydown.removeEventListener("keydown",mainmenucontrols);
    mainMenuEventListeners = false;
}