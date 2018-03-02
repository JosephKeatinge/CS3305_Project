//BUllet Stuff
var deltaX = 0;
var deltaY = 0;
var rotation = 0;
var xtarget = 0;
var ytarget = 0;
var allBullets=[];
var mouseX;
var mouseY;
var otherPlayers;
var respawnCo = {
    x : 100,
    y : 100
}
function shoot(){
    var b=createBullet(mouseX+camPanX, mouseY+camPanY, player.x+50, player.y+20,socket.id);
    //Send this bullet to the server
   // sound.play();
    proxy.sendData(b,'shoot');
}
function createBullet(targetX, targetY, shooterX, shooterY,clientID) {

    deltaX = targetX - shooterX;
    deltaY = targetY - shooterY;
    rotation = Math.atan2(deltaY, deltaX);
    xtarget = Math.cos(rotation);
    ytarget = Math.sin(rotation);
    bullet={
    x: shooterX,
    y: shooterY,
    speed:10,
    xtarget: xtarget,
    ytarget: ytarget,
    w: 5,
    h: 5,
    angle: rotation,
    id:clientID
    }
    return bullet;

}
//draws the bullet
function bulletsDraw(list,color) {

  for(var i=0; i<list.length;i+=1){
      canvasContext.fillStyle = color;
      canvasContext.fillRect(list[i].x, list[i].y, list[i].w, list[i].h);
      bulletsMove(list);


  }
}

function collidesB(a, b) {
    //Checks if item a is colliding with item b
    return  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
//Makes the bullets move
function bulletsMove(listBull) {
    listBull.forEach( function(bullet, j) {
    bullet.x += bullet.xtarget * bullet.speed;
    bullet.y += bullet.ytarget * bullet.speed;
    var bulletXCoord = Math.round(bullet.x / (BRICK_W));
    var bulletYCoord = Math.round(bullet.y / (BRICK_H));

    if (isWallAtColRow(bulletXCoord, bulletYCoord)) {
          //Tell Server that bullet has hit a wall
          //proxy.sendData(bullet,'outside');
          listBull.splice(j,1);
        }
        
    });
}
//Gets X,Y coordinates of mouse
function mouseMove(e) {
  if(e.offsetX) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    }
  else if (e.layerX) {
    mouseX = e.layerX;
    mouseY = e.layerY;
    }
}






 function hitbyBullet(bulletlist,player){
       bulletlist.forEach(function (bullet,j){
            for(var id in otherPlayers){
            //Bullet has hit me
                var enemyBullet=bullet;
                if (socket.id != enemyBullet.id) {
                    if(collidesB(enemyBullet,player)){
                        player.health -= 50;
                        bulletlist.splice(j,1);
                        hit=true
                        //tell server i got hit 
                        console.log(enemyBullet.id+" Hit me ");
                        if(player.health<=0){
                            console.log("IM DEAD ");
                            var enemyid=enemyBullet.id
                            hasScored=true;
                            //socket.emit("newScore",{"playerid":enemyBullet.id,"lobby":currentLobby.id});
                            proxy.sendData(enemyid,"updateScores");
                            respawn(player);
                 }
             }
          }
          else{
            if(id!=socket.id){
              //I hit someone delete their bullet
               if(collidesB(bullet,otherPlayers[id])){
                        bulletlist.splice(j,1);
             }
          }
          }   
        }
      });
}


function respawn(deadPlayer){
    deadPlayer.x = respawnCo.x;
    deadPlayer.y = respawnCo.y;
    deadPlayer.health = 200;
}
