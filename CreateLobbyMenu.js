/**
 * Creates a menu of settings for creating a new Lobby
 * User can change the number of players and set a password
 *  
*/
var passwordOn;
var password;;
var maxPlayers;
var numOfPlayers;
var enterPassword;
var CreateLobbyKeyDown;
var rightCreateLobbyMenuPointer;
var text;
var CreateLobbyMenuPointer;
function startcreatelobbymenu(){
    CreateLobbyKeyDown=window.addEventListener("keydown",createlobbycontrols);
    CreateLobbyMenuPointer=0;
    maxPlayers=4;
    numOfPlayers=0;
    passwordOn=false;
    password="";
    rightCreateLobbyMenuPointer=0;
    enterPassword=false;
    text=["Create Lobby","Number Of Players :","Password On :","Password :"]
}
function stringGen(i){
    /* 
    Generates the needed lines of text based on i from the draw loop
    */
    var str=""
    if(i==0){
        var str="Create Lobby";
    }
    if(i==1){
        var str="Number Of Players :"+numOfPlayers;
    }else if(i==2){
        var str="Password On:"+passwordOn;
    }
    if(passwordOn==true){
        if(i==3){
        var str="Password : "+password;
            }
        }
    return str;
}
function createlobbyCreateLobbyKeyDown=window.addEventListener("keydown",createlobbycontrols);
}update(){
    /* 
    Creates an interval in which clear and draw are called
    */
    createlobbydraw();
}
function createlobbydraw(){
    canvasContext.fillStyle="#000000";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    /* 
    Draws the text to the screen
    */
    canvasContext.textAlign = "center";
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillStyle="#888888";
    canvasContext.font = "20px Silkscreen";
    for(i=0;i<text.length;i++){
        canvasContext.fillText(stringGen(i),canvas.width/2,40*i+100);
    }
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText(stringGen(CreateLobbyMenuPointer),canvas.width/2,40*CreateLobbyMenuPointer+100);
}
function createlobbyinfo(){
    var newlobbiesinfo={
        "max_players" :numOfPlayers,
        "pwordOn":passwordOn,
        "password":password
    };
    return newlobbiesinfo;
}
function createlobbycontrols(e){
    /*
    Sets the controls for the user and keeps track of CreateLobbyMenuPointers 
    */
    keycode=e.keyCode;
    if(enterPassword){
        switch(e.keyCode){
            case 13:
                enterPassword=false;
                break;
            case 8:
                password=password.slice(0,password.length-1);
                break;
            default:
                letter = String.fromCharCode(e.keyCode)
                password+=letter;
        }
    }else{
    switch(e.keyCode){
        case 87:
            if(CreateLobbyMenuPointer>0){
                CreateLobbyMenuPointer-=1;
            }else{
                CreateLobbyMenuPointer=0;
            }
            break;
        case 83:
            if(passwordOn==true){
                if(CreateLobbyMenuPointer<text.length-1){
                CreateLobbyMenuPointer+=1;
                }else{
                CreateLobbyMenuPointer=text.length-1;
                }
            }else if(passwordOn==false){
                if(CreateLobbyMenuPointer<text.length-2){
                    CreateLobbyMenuPointer+=1;
                    pwordOn = false,
        password = '';
                }else{
                    CreateLobbyMenuPointer=text.length-2;
                }
            }
            break;
        case 68:
            if(CreateLobbyMenuPointer==1){
                rightCreateLobbyMenuPointer+=1;
                if(numOfPlayers<maxPlayers){
                    numOfPlayers+=1;
                }
            }
            if(CreateLobbyMenuPointer==2){
                passwordOn= !passwordOn;
            }
            break;
        case 65:
            if(CreateLobbyMenuPointer==1){
                rightCreateLobbyMenuPointer-=1;
                if(numOfPlayers>0){
                    numOfPlayers-=1;
                }                
            }
            if(CreateLobbyMenuPointer==2){
                passwordOn= !passwordOn;
            }
            break;
        case 13:
            if(CreateLobbyMenuPointer==0){
                create_lobby(socket,createlobbyinfo());
                endCreateLobbyMenu();
            }
            if(CreateLobbyMenuPointer==3){
                enterPassword=true;
            }
            break;
        }
    }
}
function endCreateLobbyMenu(){
    CreateLobbyKeyDown.removeEventListener("keydown",createlobbycontrols);
}