//These are bullet variables used
//By the bullet object
var deltaX = 0;
var deltaY = 0;
var rotation = 0;
var xtarget = 0;
var ytarget = 0;
var allBullets=[];
var mouseX;
var mouseY;
var otherPlayers;
//Sound for when a player is hit
var hitSound = document.createElement("audio");
hitSound.src="/Client/Assets/hitSound.wav";
var respawnCo = {
    x : 100,
    y : 100
}
/*
  *This function is called when a player shoots
  *Creates a bullet and sends to the server
*/
function shoot(){
    var b=createBullet(mouseX+camPanX, mouseY+camPanY, player.x+50, player.y+20,socket.id);
    //Send this bullet to the server
    proxy.sendData(b,'shoot');
}

/*This function is for creating a bullet
 *@params targetX,This is the X value of the mouse
 *@params targetY,This is the Y value of the mouse
 *@params shooterX,X value of the player shooting
 *@params shooterY,Y value of the player shooting
 *@params clientID,This is the socket id of the person shooting
*/
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

/*This function draws the bullets
 *@params list,list of the bullets to be drawn
 *@params color,Color of the bullet
*/
function bulletsDraw(list,color) {

  for(var i=0; i<list.length;i+=1){
      canvasContext.fillStyle = color;
      canvasContext.fillRect(list[i].x, list[i].y, list[i].w, list[i].h);
      bulletsMove(list);


  }
}

/*Check collision between two objects
*@params a,object that is hit
*@params b.object that hits a
*/
function collidesB(a, b) {
    //Checks if item a is colliding with item b
    return  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

/*This function makes the bullets move
*And Checks for collisions
 *@params listBull,list of bullets to move
*/
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

/*Gets x and y of mouse click
*@params e,Event variable
*/
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


/*Checks if the player is hit or has hit somone 
  *@params bulletslist,list of bullets
  *@params player,player that has been hit
*/
function hitbyBullet(bulletlist,player){
   bulletlist.forEach(function (bullet,j){
        for(var id in otherPlayers){
        //Bullet has hit me
            var enemyBullet=bullet;
            if (socket.id != enemyBullet.id) {
                if(collidesB(enemyBullet,player)&&(player.hasShield==false)){
                    player.health -= 50;
                    bulletlist.splice(j,1);
                    hit=true
                    //tell server i got hit 
                    hitSound.play();
                    if(player.health<=0){
                        var enemyid=enemyBullet.id
                        hasScored=true;
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

