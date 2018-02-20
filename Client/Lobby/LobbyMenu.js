/**
 * Creates a menu of available lobbies which can be selected
 * When a user selects a lobby they will be brought to that game of selection 
 * The lobby menu displays the host,number of players and if there is a password
 *  
*/
var pageNum;
var pagesPerPage;
var lobbyMenuKeyDown;
var lobbies;
var lobbyMenuPointer;
var enteringLobbyPassword;
var passwordAttempt = "";

socket.on('lobbyList', function (data) {
   lobbies = data;
});

function startLobbyMenu() {
    lobbies = []
    window.addEventListener("keydown",lobbyMenuControls);
    pageNum=0;
    pagesPerPage=15;
    lobbyMenuPointer = 0;
    enteringLobbyPassword = false;
    socket.emit('requestLobbies');
}

function updateLobbyMenu() {
    /* 
    Creates an interval to call clear and draw
    */
    lobbyMenuDraw();    
}

function lobbyMenuParseArray(i) {
    /* 
    Generates the text for the draw function
    */

    var str = ""
    if (lobbies.length > 0) {
        if (lobbies[i].pwordOn != false) {
            str = lobbies[i].id + " - " + lobbies[i].max_players + " - " + "Yes";
        } else {
            str = lobbies[i].id + " - " + lobbies[i].max_players + " - " + "No";
        }
    }
    return str;
}

function lobbyMenuDraw() {
     /* 
    Draws the text to the screen
    */
    canvasContext.fillStyle="#000000";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText(("Select Lobby"),canvas.width/2,20);
    canvasContext.fillText(("      Host - Max Players - Password"),canvas.width/2,40);
    canvasContext.fillStyle = "#888888";
    
    for(i=0;i<Math.min(lobbies.length-(pagesPerPage*pageNum),pagesPerPage);i++) {
        canvasContext.fillText(lobbyMenuParseArray(i+pagesPerPage*pageNum),canvas.width/2,60+40*i);
    }
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText(lobbyMenuParseArray(lobbyMenuPointer),canvas.width/2,60+40*(lobbyMenuPointer-(pagesPerPage*pageNum)));
}

function lobbyMenuControls(e) {
    /*
    Sets the controls for the user and keeps track of lobbyMenuPointers 
    */
    if(enteringLobbyPassword){
        //User trying to enter lobby password
        switch(e.keyCode){
            case 13:
                enteringLobbyPassword=false;
                console.log("Entered: " + passwordAttempt);
                break;
            case 8:
                passwordAttempt = passwordAttempt.slice(0,passwordAttempt.length-1);
                break;
            default:
                var letter = String.fromCharCode(e.keyCode)
                passwordAttempt += letter;
                break;
        }
    }
    switch(e.keyCode){
        case 87:
            if(lobbyMenuPointer > 0 + (pagesPerPage*pageNum)){
                lobbyMenuPointer-=1;
            }else if(pageNum>0){
                lobbyMenuPointer-=1;
                pageNum-=1;
            }                      
            break;
        case 83:
            if(lobbyMenuPointer < lobbies.length-1){
                lobbyMenuPointer+=1;
            }if(lobbyMenuPointer>(pagesPerPage-1)+(pagesPerPage*pageNum)){
                pageNum+=1;
            }       
            break;
        case 13: //Enter key pressed
            selectedLobby = lobbies[lobbyMenuPointer];
            //If the selected lobby has a password
            if (selectedLobby.passwordOn) {
                //Check if the current password if any is correct
                if (passwordAttempt == selectedLobby.password) {
                    //If so connect
                    socket.emit('join_lobby', { "lobby": selectedLobby.id });
                    currentLobby = selectedLobby;
                    gameState = "lobby";  
                    endLobbyMenu();
                //If the current attempt is not correct or no attempt has been made, allow the user to enter the password
            } else {
                passwordAttempt = "";
                enteringLobbyPassword = true;}
            } else {
                socket.emit('join_lobby', { "lobby": selectedLobby.id });
                currentLobby = selectedLobby;
                gameState = "lobby";  
                endLobbyMenu();
            }
            break;
            //test case 
        /*(case 71:
            console.log('here');
            socket.emit('create_lobby', { "host": socket.id, "max_players": 4, 'pwordOn': false, 'password': '' });
            break;*/
        }
}

function endLobbyMenu() {
    window.removeEventListener("keydown", lobbyMenuControls);
    lobbyMenu = false;
}
