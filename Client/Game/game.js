//updateGame function
//drawGame function
//startGame function
//endState function -Remove Event Listeners
//instantiate player objects
var playerPic=document.createElement("img");
var otherPlayers;

function startGame(){

  proxy=new Proxy(socket,currentLobby.id);
  loadImages();
  console.log(socket.id);
  playerReset(player);
  playerImageLoad();

  keyDown =window.addEventListener("keydown", activate, false);
  keyUp=window.addEventListener("keyup", deactivate, false);
  mouseMove=canvas.addEventListener('mousemove', mouseMove, true);
  click=canvas.addEventListener("click", function() {
      console.log("Camera: "+camPanX+", "+camPanY);
      console.log("Mouse: "+mouseX+", "+mouseY);
      var b=createBullet(mouseX+camPanX, mouseY+camPanY, player.x+50, player.y+20,socket.id);
      //Send this bullet to the server
      proxy.sendData(b,'shoot');
  });
  //Send the players init position
  proxy.sendData(player,'newplayer');

  //Add bullets received from server to list 
  socket.on('bullets',function(bullets){
            allBullets.push(bullets);   
    });


}


function updateGame(){
    //Check if i have been hit 
    bulletHitsPlayer(allBullets,player);
    socket.on('heartbeat', function(data) {
            otherPlayers=data;
    });
    //sends server information if they been hit or have moved
    if(moveRight||moveLeft||moveUp||moveDown||hit){  
      proxy.sendData(player,'position');
      hit=false;
     }
    movePlayer();
    cameraFollow();
    drawGame();
}

function drawGame(){
    //Drawing black instead of floor
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    canvasContext.save(); // needed to undo this .translate() used for scroll

    // this next line is like subtracting camPanX and camPanY from every
    // canvasContext draw operation up until we call canvasContext.restore
    // this way we can just draw them at their "actual" position coordinates
    canvasContext.translate(-camPanX,-camPanY);
    drawOnlyBricksOnScreen();
    //Draw the floor not working yet;
    drawFloor();
    
    //SHOULD BE CHANGED TO ONLY DRAW IF THEY ARE ON THERE SCREEN JUST LIKE MAP
    drawOtherPlayers();
    drawPlayer(player);
    bulletsDraw(allBullets,'black');
    canvasContext.restore();
    //Draw all the bullets 

    drawGUI();

  
  
}

//remove EventListeners change game state
function endGame(){
    keyDown.removeEventListener();
    keyUp.removeEventListener();
    mouseMove.removeEventListener();
    click.removeEventListener();
    gameState = "main_menu";
    gameStarted = false;
}
