/**
 * Creates a menu of settings for creating a new Lobby
 * User can change the number of players and set a password
 *
*/
var lobbyName;
var enteringName;
var passwordOn;
var password;
var enterPassword;
var text;
var pointer;
var numOfPlayers;
var mapPointer;
var maps;
var maxScore;
function startCreateLobbyMenu(){
    window.addEventListener("keydown",createLobbyControls);
    lobbyName = "";
    enteringName = false;
    mapPointer=0;
    passwordOn=false;
    password="";
    enterPassword=false;
    numOfPlayers=2;
    maxScore=2;
    pointer=0;
    text=["Create Lobby", "Lobby Name: ","Map : ", "Number Of Players :","Max score :","Password On :","Password :"]
    maps=["Sand","Stone","Factory"]
}
function stringGen(i){
    /*
    Generates the needed lines of text based on i from the draw loop
    */
    var str=""
    switch(i) {
        case 0:
            str="Create Lobby";
            break;
        case 1:
            str = "Lobby Name: " + lobbyName;
            break;
	case 2:
	    str = "Map : " + maps[mapPointer];
	    break;
        case 3:
            str="Number Of Players: "+ numOfPlayers;
            break;
        case 4:
            str="Max Score : "+maxScore
            break;
        case 5:
            str="Password On: " + passwordOn;
            break;
        case 6:
	    if(passwordOn==true){
              str="Password : " + password;
	    }
            break;
    }
    return str;
}

function createLobbyUpdate(){
    /*
    Creates an interval in which clear and draw are called
    */
    createLobbyDraw();
}
function createLobbyDraw(){
    canvasContext.fillStyle="#000000";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    /*
    Draws the text to the screen
    */
    canvasContext.textAlign = "center";
    canvasContext.fillStyle="#ffffff";
    canvasContext.font = "20px Silkscreen";
    canvasContext.fillText("Please enter a name to create a lobby",canvas.width/2,40);
    canvasContext.fillStyle="#888888";
    for(i=0;i<text.length;i++){
        canvasContext.fillText(stringGen(i),canvas.width/2,40*i+100);
    }
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText(stringGen(pointer),canvas.width/2,40*pointer+100);
    canvasContext.fillText("Press escape to enter the main menu",canvas.width/2,40*7+100)
}
function createLobbyInfo(){
    /*
    Sends the data needed to create a lobby
    */
    var newlobbiesinfo =
    {   lobby_id : lobbyName,
        host : clientUsername,
        max_players : numOfPlayers,
        pwordOn : passwordOn,
        password : password,
	map : currentMap,
        score : maxScore
    };
    return newlobbiesinfo;
}
function createLobbyControls(e){
    /*
    Sets the controls for the user and keeps track of pointers
    */
    if(enterPassword){
        /*Checks the keycode for entering a password
        if the keycode was enter the name entering stops
        if the keycode is between A-Z or 1-9 it appends this to the password
        if the keycode was backspace it removes the last character from the password
        */
        switch(e.keyCode){
            case 13:
                menuSound.play()
                menuSound.currentTime=0;
                enterPassword=false;
                break;
            case 8:
                password=password.slice(0,password.length-1);
                break;
            default:
		if(e.keyCode>=65 && e.keyCode<=90 ){
                        letter = String.fromCharCode(e.keyCode)
                        password+=letter.toUpperCase();
                }
                if(e.keyCode>=48 && e.keyCode<=57){
                        letter = String.fromCharCode(e.keyCode)
                        password+=letter.toUpperCase();
                }

                break;
        }
    } else if (enteringName) {
        /*Checks the keycode for entering a lobby name
        if the keycode was enter the name entering stops
        if the keycode is between A-Z or 1-9 it appends this to the lobby name
        if the keycode was backspace it removes the last character from the name
        */
        switch(e.keyCode){
            case 13:
                menuSound.play()
                menuSound.currentTime=0;
                enteringName=false;
                break;
            case 8:

                lobbyName=lobbyName.slice(0,lobbyName.length-1);
                break;
            default:
		if(e.keyCode>=65 && e.keyCode<=90 ){
                        letter = String.fromCharCode(e.keyCode)
                        lobbyName+=letter.toUpperCase();
                }
                if(e.keyCode>=48 && e.keyCode<=57){
                        letter = String.fromCharCode(e.keyCode)
                        lobbyName+=letter.toUpperCase();
                }
      	break;
	}
    } else {
        switch(e.keyCode){
            case 87: // W key pressed
                menuSound.play()
                menuSound.currentTime=0;
                if(pointer>0){
                    //Move up unless at first item in list
                    pointer-=1;
                }else{
                    //Stay at first item if already there
                    pointer=0;
                }
                break;
            case 83: // S key pressed
                menuSound.play()
                menuSound.currentTime=0;
                if (passwordOn) {
                    /*moves down unless the pointer is at the end 
                    */
                    if (pointer<text.length-1) {
                        pointer+=1;
                    } else {
                        pointer=text.length-1;
                    }
                } else {
                    /*if password is set to flase then the user cannot enter a password
                       the enter password is hidden from the user
                    */
                    if (pointer<text.length-2) {
                        pointer+=1;
                        password = "";
                    } else {
                        pointer=text.length-2;
                    }
                }
                break;
            case 68:
                menuSound.play()
                menuSound.currentTime=0; 
                // D key pressed
                switch(pointer) {
		            case 2:
			            if(mapPointer<maps.length-1){mapPointer +=1;}
			            currentMap=maps[mapPointer]
			            break;
                    case 3:
                        if (numOfPlayers < maxPlayers) { numOfPlayers += 1; }
                        break;
                    case 4:
                        if(maxScore<20){
                            maxScore+=1
                        }
			            break;
                    case 5:
                        passwordOn = !passwordOn;
                        break;
                    default:
                        break;
                }
                break;
            case 65: // A key pressed
                menuSound.play()
                menuSound.currentTime=0;
                switch(pointer) {
	                case 2:
                        //if pointer is on map select move the map select pointer to the left
			            if(mapPointer>0){mapPointer -=1;}
			            currentMap=maps[mapPointer]
                        break;
                    case 3:
                        //if pointer is on the number of players the subtract one from the number of players allowed in the game
                        if (numOfPlayers > 0) { numOfPlayers -= 1; }
                        break;
                    case 4:
                        //take one from the max score of the game
                        if(maxScore>2){
                            maxScore-=1;
                        }
			            break;
                    case 5:
                        //change the value of password on
                        passwordOn = !passwordOn;
                        break;
                    default:
                        break;
                }
                break;
            case 13: // Enter key pressed
                menuSound.play()
                menuSound.currentTime=0;
		        if(text[pointer]=="Create Lobby"){
                    //if pointer is on create lobby
                    		if(lobbyName.length>0){
                        //if the lobby name is greater than 0 then create the lobby
			    	    currentMap=maps[mapPointer]
			            newLobby = createLobbyInfo();
                        	    create_lobby(socket,newLobby,clientUsername,currentMap);
                        	    gameState="lobby"
                        	    endCreateLobbyMenu();
			        }
		        }
                        //allows the user to enter the lobby name
             	 menuSound.play()
           	 menuSound.currentTime=0;
		if(text[pointer]=="Create Lobby"){
            	    if(lobbyName.length>0){
			currentMap=maps[mapPointer];
			newLobby = createLobbyInfo();
                	create_lobby(socket,newLobby,clientUsername,currentMap);
               		 gameState="lobby";
               		 endCreateLobbyMenu();
			}
		    }else if(text[pointer]=="Lobby Name: "){
                        	enteringName = true;
                        	break;
                    }else if(text[pointer]=="Password :"){
                        //enter the password 
                        enterPassword = true;
			break;
		    }
		break;
	        case 27:
                //press escape to leave the menu
                menuSound.play()
                menuSound.currentTime=0;
                endCreateLobbyMenu();
                gameState="main_menu"
                break;
            }
        }
}

function endCreateLobbyMenu(){
    //turns off the controls and turns off the create lobby menu state
  window.removeEventListener("keydown",createLobbyControls);
  createLobbyMenu = false;
}
