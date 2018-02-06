/**
 * Creates a menu of available lobbies which can be selected
 * When a user selects a lobby they will be brought to that game of selection 
 * The lobby menu displays the host,number of players and if there is a password
 *  
*/

/*

startlobbymenu() []
updatelobbymenu() []
drawlobbymenu() []
endlobbymenu() []
*/
var pageNum=0;
var pagesPerPage=15;
var canavsCo = canvas.getContext("2d");
canvasContext.font = "20px Silkscreen";
canvasContext.textAlign = "center";
window.addEventListener("keydown",Controls);
var lobbies;
var pointer=0;
function startlobbymenu(){
    lobbies=request_lobbies();
}
function updatelobbymenu(){
    /* 
    Creates an interval to call clear and draw
    */
    lobbymenudraw();
}
function lobbymenuparseArray(i){
    /* 
    Generates the text for the draw function
    */

    var str=""
    if(lobbies[i].password!=false){
        str=lobbies[i].host+" - "+lobbies[i].max_players+" - "+"Yes";
    }else{
        str=lobbies[i].host+" - "+lobbies[i].max_players+" - "+"No";
    }
    return str;
}
function lobbymenudraw(){
     /* 
    Draws the text to the screen
    */
    canvasContext.fillStyle="#000000";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText(("Select Lobby"),canvas.width/2,20);
    canvasContext.fillText(("      Host - Max Players - Password"),canvas.width/2,40);
    canvasContext.fillStyle="#888888";
    for(i=0;i<Math.min(lobbies.length-(pagesPerPage*pageNum),pagesPerPage);i++){
        canvasContext.fillText(parseArray(i+pagesPerPage*pageNum),canvas.width/2,60+40*i);
    }

    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText(parseArray(pointer),canvas.width/2,60+40*(pointer-(pagesPerPage*pageNum)));
}
function lobbymenucontrols(e){
    /*
    Sets the controls for the user and keeps track of pointers 
    */
    switch(e.keyCode){
        case 87:
            if(pointer > 0 + (pagesPerPage*pageNum)){
                pointer-=1;
            }else if(pageNum>0){
                pointer-=1;
                pageNum-=1;
            }                      
            break;
        case 83:
            if(pointer < lobbies.length-1){
                pointer+=1;
            }if(pointer>(pagesPerPage-1)+(pagesPerPage*pageNum)){
                pageNum+=1;
            }       
            break;
        case 13:
            join_lobby(lobies(pointer).id,socket);
            break;
        }
        console.log(pageNum);
}