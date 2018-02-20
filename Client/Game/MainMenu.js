/*
 * Creates a menu in which a user can enter the game,change settings,learn how to play or see the Credits
 *  
*/
var words;
var MainMenuPointer;
function startmainmenu(){
window.addEventListener("keydown",mainmenucontrols);
words = ["Create Lobby","Join Lobby","Settings","How to play","Credits"];
MainMenuPointer=0;
canvasContext.font = "30px Silkscreen";
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
    canvasContext.fillStyle="#000000"
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.drawImage(logo,40,10);
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
	        endMainMenu()
            gameState="create_lobby_menu";
        }else if(MainMenuPointer==1){
	        endMainMenu()
            gameState="lobby_list_menu";
        }else if(MainMenuPointer==2){
	        endMainMenu()
	        gameState="settingsMenu";
        }else if(MainMenuPointer==3){
            console.log("How to play");
        }else{
            console.log("Credits");
            }
        endMainMenu();
        break;
        }
        if(MainMenuPointer<0){
            MainMenuPointer=0;
        }else if(MainMenuPointer>=words.length-1){
            MainMenuPointer=words.length-1;
        }

    }
function endMainMenu(){
    window.removeEventListener("keydown",mainmenucontrols);
    mainMenuEventListeners = false;
}
