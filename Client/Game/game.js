//Images to Load
var playerPic=document.createElement("img");
var potionPic=document.createElement("img");
var shieldPic=document.createElement("img");
var bootsPic=document.createElement("img");
//otherPlayers list
var otherPlayers;
//Score target
//Sounds
/*
  *This function is called at the start of the game
  *Load images and adds event listeners
*/
function startGame(){
  //Initiate proxy between client and server
  proxy=new Proxy(socket,currentLobby.id);
  //Load All Images
  loadImages();
  playerReset(player);
  playerImageLoad();
  shieldImageLoad();
  bootsImageLoad();
  potionImageLoad();
  //Event Listeners
  window.addEventListener("keydown", activate, false);
  window.addEventListener("keyup", deactivate, false);
  canvas.addEventListener('mousemove', mouseMove, true);
  canvas.addEventListener("click", shoot,false);

  //Send the players init position
  proxy.sendData(player,'newplayer');

  //Add bullets received from server to list
  socket.on('bullets',function(bullets){
            sound.play();
            allBullets.push(bullets);
  });


}

/*
  *This function updates the Game and calls movement functions
*/
function updateGame(){
    //Check if a player has reached the score target if so end the game
    if(otherPlayers.length!=0){
      for(var id in otherPlayers){
        if(otherPlayers[id].score===currentLobby.score){
                endTheGame();
                gameState="endGame"
        }
      }
    }
    //Check if the player has been hit
    hitbyBullet(allBullets,player);
    //Receive  positions of other players
    socket.on('heartbeat', function(data) {
            otherPlayers=data;
    });
    //sends server information if they been hit or have moved
    if(moveRight||moveLeft||moveUp||moveDown||hit){
      proxy.sendData(player,'position');
      hit=false;
     }
    movePlayer();
    collidesPotion();
    collidesShield();
    collidesBoots();
    cameraFollow();
    drawGame();
}

/*
   *This function draws everything onto the canvas every interval
*/
function drawGame(){
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    canvasContext.save(); // needed to undo this .translate() used for scroll
    // this next line is like subtracting camPanX and camPanY from every
    // canvasContext draw operation up until we call canvasContext.restore
    // this way we can just draw them at their "actual" position coordinates
    canvasContext.translate(-camPanX,-camPanY);
    drawOnlyBricksOnScreen();
    //Draw the floor
    drawFloor();
    //Draw OtherPlayers and myself)
    drawOtherPlayers();
    drawPlayer(player);
    //Draw All the Bullets
    bulletsDraw(allBullets,'black');
    //Draw the powerups
	  drawPotion();
	  drawShield();
	  drawBoots();
    //Check powerup collision
    canvasContext.restore();
    //Draw the Scoreboard
    drawGUI();
}

/*
   *This function is called when a person reaches  the target
   *score,it removes all eventListeners and changes the state
*/
function endTheGame(){
    proxy.sendData(player,'disconnect0');
    window.removeEventListener("keydown", activate);
    window.removeEventListener("keyup", deactivate);
    canvas.removeEventListener('mousemove', mouseMove);
    canvas.removeEventListener("click", shoot,false);
    soundtrack.pause();
    soundtrack.currentTime = 0;
    gameStarted = false;
}
