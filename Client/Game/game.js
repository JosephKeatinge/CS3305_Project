//updateGame function
//drawGame function
//startGame function
//endState function -Remove Event Listeners
//instantiate player objects
var playerPic=document.createElement("img");
var otherPlayers;

function startGame(){
  bullets=new Bullet(3,3,10);
  player=new Player(250,350,32,32,32,"/Client/Assets/hero.png");
  proxy=new Proxy(socket,currentLobby.id);



  loadImages();
  playerReset(player);

  player.imgLoad(playerPic);

  var keyDown =window.addEventListener("keydown", player.activate, false);
  var keyUp=window.addEventListener("keyup", player.deactivate, false);
  var mouseMove=canvas.addEventListener('mousemove', mouseMove, true);
  var click=canvas.addEventListener("click", function() {
      var b=bullets.create(mouseX, mouseY, player.x, player.y);
      //Send this bullet to the server
      proxy.sendData(b,'shoot');
      bullets.list.push(b);
  });
  //Send the players init position
  proxy.sendData(player,'newplayer');
}


function updateGame(){
    player.move();
    drawGame();
    //Move my bullets
    bullets.move(bullet.list);
    //move Enemie bullets
    bullets.move(allBullets);

    socket.on('heartbeat', function(data) {
            otherPlayers=data;
    });
    socket.on('bullets',function(bullets){
             allBullets=bullets;
    });
   //Send player position if they have moved
    if(player.hasMoved()){proxy.sendData(player,'position');}
}

function drawGame(){
    drawMap();
    player.draw();
    drawOtherPlayers();
    //its own bullets
    bullets.draw(bullets.list);
    //enemy bullets
    bullets.draw(allBullets);
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
