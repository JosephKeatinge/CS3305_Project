/*
 * Creates a menu in which a user can enter the game,change settings,learn how to play or see the Credits
 *  
*/
var words;
var MainMenuPointer;
function startmainmenu(){
    //starts the main menu and sets variables
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
    canvasContext.drawImage(logo,280,10);
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
        //if w is presserd pointer moves up and menu sound is played
        MainMenuPointer=MainMenuPointer-1;
        menuSound.play()
        menuSound.currentTime=0;
        break;
    case 83:
        //if s is pressed poinyer moves down one
        MainMenuPointer=MainMenuPointer+1;
        menuSound.play()
        menuSound.currentTime=0;
        break;
    case 13:
    //if enter is pressed selects the state on which the pointer is on
      if(words[MainMenuPointer]=="Create Lobby"){
            //create lobby state
            gameState="create_lobby_menu";
        }else if(words[MainMenuPointer]=="Join Lobby"){
            //lobby list menu
            gameState="lobby_list_menu";
        }else if(words[MainMenuPointer]=="Settings"){
            //settings menu
	        gameState="settingsMenu";
        }else if(words[MainMenuPointer]=="How to play"){
            //how to play menu
            gameState="howToPlay";
        }else if(words[MainMenuPointer]="Credits"){
            //credits menu
		    gameState="creditsMenu"
            }
        endMainMenu();
        break;
        }
    if(MainMenuPointer<0){
        //checks if pointer is outside the range of words
        MainMenuPointer=0;
    }else if(MainMenuPointer>=words.length-1){
        MainMenuPointer=words.length-1;
    }

    }
function endMainMenu(){
    //ends the current state and removes the controls
    window.removeEventListener("keydown",mainmenucontrols);
    mainMenuEventListeners = false;
}
