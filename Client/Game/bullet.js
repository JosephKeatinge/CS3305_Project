//BUllet Stuff
var deltaX = 0;
var deltaY = 0;
var rotation = 0;
var xtarget = 0;
var ytarget = 0;
var allBullets=[];
var mouseX;
var mouseY;
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
    w: 3,
    h: 3,
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
          if(socket.id!=bullet.id){
             if(collidesB(bullet,player)){
                 player.health-=10;
                 //tell server i got hit 
                 hit=true
                 bulletlist.splice(j,1);
             }
          }   
      });
   
   
}*/

function collidesB(a, b) {
    //Niall's function. Not currently used but might be useful in future.
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

function bulletHitsPlayer(bulletlist, otherPlayers){
    bulletlist.forEach( function (bullet, var b){
        for(var id in otherPlayers){
            if(socket.id == bullet.id){
                if(collidesB(bullet, otherPlayers[id])){
                   bulletlist.splice(b, 1);
                   if(otherPlayers[id].health == 0 ){
                       otherPlayers[socket.id].score += 1;
                       //Otherplayer disappears
                   }
                }
            }
            else{
              if(collidesB(bullet,otherPlayers[socket.id])){
                 player.health-=10;
                 //tell server i got hit 
                 hit=true
                 bulletlist.splice(b,1);
             }
            }
            
        }
    });
}
