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
      myBullets.push(b);
  });
  //Send the players init position
  proxy.sendData(player,'newplayer');

}


function updateGame(){
    movePlayer();
    drawGame();
    //Move my bullets
    bulletsMove(myBullets);
    bulletsMove(allBullets);


    socket.on('heartbeat', function(data) {
            otherPlayers=data;
    });
    socket.on('bullets',function(bullets){
             allBullets=bullets
    });
    myBullets=myBullets.concat(allBullets);
    if(moveRight||moveLeft||moveUp||moveDown){  proxy.sendData(player,'position');}

}

function drawGame(){
    drawMap();
    drawPlayer();
    drawOtherPlayers();
    //its own bullets
    bulletsDraw(myBullets,'black');
    bulletsDraw(allBullets,'red');
    //enemy bullets
    /*
     for(var id in otherPlayers){
         if (id != socket.id){
             var otherPlayer=otherPlayers[id];
             console.log(otherPlayer.bullets.length);
             if (otherPlayer.bullets.length>0){
               theBullets=theBullets.concat(otherPlayer.bullets);
             }

         }
       }*/
  
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
