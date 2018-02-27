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
function startCreateLobbyMenu(){
    window.addEventListener("keydown",createLobbyControls);
    lobbyName = "";
    enteringName = false;
    mapPointer=0;
    passwordOn=false;
    password="";
    enterPassword=false;
    numOfPlayers=2;
    pointer=0;
    text=["Create Lobby", "Lobby Name: ","Map : ", "Number Of Players :","Password On :","Password :"]
    maps=["Sand","Stone"]
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
            str="Password On: " + passwordOn;
            break;
        case 5:
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
    canvasContext.fillText("Press escape to enter the main menu",canvas.width/2,40*5+100)
}
function createLobbyInfo(){
    var newlobbiesinfo = 
    {   lobby_id : lobbyName,
        host : clientUsername,
        max_players : numOfPlayers,
        pwordOn : passwordOn,
        password : password,
	map : currentMap
    };
    return newlobbiesinfo;
}
function createLobbyControls(e){
    /*
    Sets the controls for the user and keeps track of pointers 
    */
    console.log("test")
    if(enterPassword){
        switch(e.keyCode){
            case 13:
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
        switch(e.keyCode){
            case 13:
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
                if(pointer>0){
                    //Move up unless at first item in list
                    pointer-=1;
                }else{
                    //Stay at first item if already there
                    pointer=0;
                }
                break;
            case 83: // S key pressed
                if (passwordOn) {
                    if (pointer<text.length-1) {
                        pointer+=1;
                    } else {
                        pointer=text.length-1;
                    }
                } else {
                    if (pointer<text.length-2) {
                        pointer+=1;
                        password = "";
                    } else {
                        pointer=text.length-2;
                    }
                }
                break;
            case 68: // D key pressed
                switch(pointer) {
		    case 2:
			if(mapPointer<maps.length-1){mapPointer +=1;}
			currentMap=maps[mapPointer]
			break;
                    case 3:
                        if (numOfPlayers < maxPlayers) { numOfPlayers += 1; }
                        break;
                    case 4:
                        passwordOn = !passwordOn;
                        break;
                    default:
                        break;
                }
                break;
            case 65: // A key pressed
                switch(pointer) {
	            case 2:
			if(mapPointer>0){mapPointer -=1;}
			currentMap=maps[mapPointer]
                        break;
                    case 3:
                        if (numOfPlayers > 0) { numOfPlayers -= 1; }
                        break;
                    case 4:
                        passwordOn = !passwordOn;
                        break;
                    default:
                        break;
                }
                break;
            case 13: // Enter key pressed
                text=["Create Lobby", "Lobby Name: ", "Number Of Players :","Password On :","Password :"]    
		if(text[pointer]=="Create Lobby"){
                        if(lobbyName.length>0){
			currentMap=maps[mapPointer]
			newLobby = createLobbyInfo();
                        create_lobby(socket,newLobby,clientUsername,currentMap);
                        gameState="lobby"
			console.log(currentMap)
                        endCreateLobbyMenu();
			}
		}else if(text[pointer]=="Lobby Name: "){
                        enteringName = true;
                        break;
                }else if(text[pointer]=="Password :"){
                        enterPassword = true;
		}
		break;
	    case 27:
                endCreateLobbyMenu();
                gameState="main_menu"
                break;
            }
    }
}

function endCreateLobbyMenu(){
  window.removeEventListener("keydown",createLobbyControls);
  createLobbyMenu = false;
}
