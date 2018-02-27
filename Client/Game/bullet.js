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



/*function hitbyBullet(bulletlist,player){
       bulletlist.forEach(function (bullet,j){
           if (socket.id != bullet.id) {
             if(collidesB(bullet,player)){
                 player.health -= 10;
                 console.log(player.health);
                 //tell server i got hit 
                 hit=true
                 bulletlist.splice(j,1);
             }
          }   
      });
   
   
}*/

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
                            socket.emit("newScore",{"playerid":enemyBullet.id,"lobby":currentLobby.id});
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









/*
function bulletHitsPlayer(bulletlist, otherPlayers){
    bulletlist.forEach(function (bullet,b){
        for(var id in otherPlayers){
            //My bullet hits player
            if(socket.id == bullet.id){
                console.log("im in here");
                if(collidesB(bullet, otherPlayers[id])){
                    console.log("I hit someone");
                        console.log(otherPlayers);
                    //if my bullet hits someone
                    bulletlist.splice(b, 1);
                
                    console.log(otherPlayers[id].health);
                    if(otherPlayers[id].health <= 0 ){
                        console.log("HELLO");
                       //if my bullet is last to hit a player increase my score
                        socket.emit("newScore",player,currentLobby);
                        player.score += 1;
                        console.log(player.score);
                        //need to tell server to increase my score
                   }
                }
            }
            else{
              //I get hit by bullet
              if(collidesB(bullet, player)){
                 console.log("i got hit");
                 player.health-=10;
                 //tell server i got hit 
                 hit=true;
                 bulletlist.splice(b,1);
                 if (player.health <= 0){
                     //if i die (health reaches 0) respawn me
                     console.log("I am dead");
                     respawn(player);
                }
             }
            }
            
        }
    });
}*/

function respawn(deadPlayer){
    deadPlayer.x = respawnCo.x;
    deadPlayer.y = respawnCo.y;
    deadPlayer.health = 100;
}
