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
  playerReset(player);
  playerImageLoad();

  keyDown =window.addEventListener("keydown", activate, false);
  keyUp=window.addEventListener("keyup", deactivate, false);
  mouseMove=canvas.addEventListener('mousemove', mouseMove, true);
  click=canvas.addEventListener("click", function() {
      var b=createBullet(mouseX, mouseY, player.x, player.y,socket.id);
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
    movePlayer();
    drawGame();

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

}

function drawGame(){
    drawMap();
    drawPlayer();
    drawOtherPlayers();
    //Draq all the bullets 
    bulletsDraw(allBullets,'red');
  
  
  
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
