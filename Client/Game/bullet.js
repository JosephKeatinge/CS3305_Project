//BUllet Stuff
var deltaX = 0;
var deltaY = 0;
var rotation = 0;
var xtarget = 0;
var ytarget = 0;
var theBullets = [];
var allBullets=[];
var mouseX;
var mouseY;
function createBullet(targetX, targetY, shooterX, shooterY) {

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
    color: 'black',
    angle: rotation
    }
    return bullet;

}
//draws the bullet
function bulletsDraw(list) {
  for(var i=0; i<list.length;i+=1){
      canvasContext.fillStyle = 'black';
      canvasContext.fillRect(list[i].x, list[i].y, list[i].w, list[i].h);
  }
}

function collidesB(a, b) {
    //Niall's function. Not currently used but might be useful in future.
    return  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
//Makes the bullets move
function bulletsMove(listBull) {
    listBull.forEach( function(bullet, j) {
    bullet.x += bullet.xtarget * bullet.speed;
    bullet.y += bullet.ytarget * bullet.speed;
    var bulletXCoord = Math.round(bullet.x / (TILE_W));
    var bulletYCoord = Math.round(bullet.y / (TILE_H));

  if (isWallAtColRow(bulletXCoord, bulletYCoord)) {
          //Tell Server that bullet has hit a wall
          proxy.sendData(bullet,'outside');
          var index=listBull.indexOf(bullet);
          listBull.splice(index,1);
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
