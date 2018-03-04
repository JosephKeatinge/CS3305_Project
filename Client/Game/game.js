//updateGame function
//drawGame function
//startGame function
//endState function -Remove Event Listeners
//instantiate player objects
var playerPic=document.createElement("img");
var otherPlayers;
var target=2
//var sound = document.createElement("audio");
//sound.src="/Client/Assets/shoot.wav"
function startGame(){
  proxy=new Proxy(socket,currentLobby.id);
  loadImages();
  playerReset(player);
  playerImageLoad();
  
  window.addEventListener("keydown", activate, false);
  window.addEventListener("keyup", deactivate, false);
  canvas.addEventListener('mousemove', mouseMove, true);
  canvas.addEventListener("click", shoot,false);
  //Send the players init position
  proxy.sendData(player,'newplayer');

  //Add bullets received from server to list 
  socket.on('bullets',function(bullets){
            allBullets.push(bullets);   
    });


}


function updateGame(){
  if(otherPlayers.length!=0){
    for(var id in otherPlayers){
      if(otherPlayers[id].score===target){
              endTheGame();
              otherPlayers={};
              gameState="endGame"
      }
    }
}

    //Check if i have been hit 
    hitbyBullet(allBullets,player);
    socket.on('heartbeat', function(data) {
            otherPlayers=data;
    });
    //sends server information if they been hit or have moved
    if(moveRight||moveLeft||moveUp||moveDown||hit){  
      proxy.sendData(player,'position');
      hit=false;
     }

    console.log(otherPlayers);
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
    //Draw All the Bullets
    bulletsDraw(allBullets,'black');
    canvasContext.restore();

    drawGUI();

  
  
}

//remove EventListeners change game state
function endTheGame(){
    proxy.sendData(player,'disconnect0');
    window.removeEventListener("keydown", activate);
    window.removeEventListener("keyup", deactivate);
    canvas.removeEventListener('mousemove', mouseMove);
    canvas.removeEventListener("click", shoot,false);
    gameStarted = false;
}
