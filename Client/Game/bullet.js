function Bullet(w,h,speed){
      this.list=[]
      this.w=w;
      this.h=h;
      this.speed=speed;
      this.deltaX=0;
      this.deltaY=0;
      this.rotation=0;
      this.xtarget = 0;
      this.ytarget = 0;

}
Bullet.prototype={
     //creates and add the bullet to a list
     create:function(targetX,targetY,shooterX,shooterY){
       this.deltaX = targetX - shooterX;
       this.deltaY = targetY - shooterY;
       this.rotation = Math.atan2(deltaY, deltaX);
       this.xtarget = Math.cos(this.rotation);
       this.ytarget = Math.sin(this.rotation);
       var bullet={
           x: shooterX,
           y: shooterY,
           speed:10,
           xtarget: this.xtarget,
           ytarget: this.ytarget,
           w: 3,
           h: 3,
           color: 'black',
           angle: this.rotation
       }
       return bullet;
     },

     //Draws the bullet and
     //checks if it has hit a wall
     draw:function(list){
       for(var i=0; i<list.length;i+=1){
           canvasContext.fillStyle = 'black';
           canvasContext.fillRect(list[i].x, list[i].y, list[i].w, list[i].h);
       }

   },
   //moves the bullets
   //Tell server if it has hit a wall
   move:function(list){
     list.forEach( function(bullet, j) {
     bullet.x += bullet.xtarget * bullet.speed;
     bullet.y += bullet.ytarget * bullet.speed;
     //Collisions with wall
     var bulletXCoord = Math.round(bullet.x / (TILE_W));
     var bulletYCoord = Math.round(bullet.y / (TILE_H));

     if (isWallAtColRow(bulletXCoord, bulletYCoord)) {
            socket.emit('outside',bullet);
            var index=list.indexOf(bullet);
            list.splice(index,1);
         }
     });
   }
}
