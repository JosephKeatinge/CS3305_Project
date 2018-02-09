//updateGame function
//drawGame function
//startGame function
//endState function -Remove Event Listeners
//instantiate player objects
var playerPic=document.createElement("img");
var otherPlayers;

function startGame(){
  //bullets=new Bullet(3,3,10);
  //player=new Player(250,350,32,32,32,"/Client/Assets/hero.png");
  proxy=new Proxy(socket,currentLobby.id);



  loadImages();
  playerReset(player);

  //player.imgLoad(playerPic);
  playerImageLoad();

  keyDown =window.addEventListener("keydown", activate, false);
  keyUp=window.addEventListener("keyup", deactivate, false);
  mouseMove=canvas.addEventListener('mousemove', mouseMove, true);
  click=canvas.addEventListener("click", function() {
      var b=createBullet(mouseX, mouseY, player.x, player.y);
      //Send this bullet to the server
      proxy.sendData(b,'shoot');
      theBullets.push(b);
  });
  //Send the players init position
  proxy.sendData(player,'newplayer');
}


function updateGame(){
    //player.move();
    movePlayer();
    drawGame();
    //Move my bullets
    //bullets.move(bullet.list);
    bulletsMove(theBullets);
    //move Enemie bullets
    //bullets.move(allBullets);
    bulletsMove(allBullets);

    socket.on('heartbeat', function(data) {
            otherPlayers=data;
    });
    socket.on('bullets',function(bullets){
             allBullets=bullets;
    });
   //Send player position if they have moved
    //if(player.hasMoved()){proxy.sendData(player,'position');}
    if(moveRight||moveLeft||moveUp||moveDown){  proxy.sendData(player,'position');}

}

function drawGame(){
    drawMap();
    //player.draw();
    drawPlayer();
    drawOtherPlayers();
    //its own bullets
    //bullets.draw(bullets.list);
    bulletsDraw(theBullets)
    //enemy bullets
    bulletsDraw(allBullets);
    //bullets.draw(allBullets);
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
