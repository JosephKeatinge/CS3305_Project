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
       this.list.push({
           x: shooterX,
           y: shooterY,
           this.speed:10,
           xtarget: this.xtarget,
           ytarget: this.ytarget,
           w: 3,
           h: 3,
           color: 'black',
           angle: this.rotation
       });
     },

     //Draws the bullet and
     //checks if it has gone outside thecanvas
     draw:function(canvasContext,width,height){
       for(var i=0; i<this.list.length;i+=1){
           canvasContext.fillStyle = 'black';
           canvasContext.fillRect(this.list[i].x, this.list[i].y, this.list[i].w, this.list[i].h);
           if(this.list[i].y<0){
               this.list.splice(i,1);

             }
           else if (this.list[i].x<0){
              this.list.splice(i,1);
            }
           else if(this.list[i].y+this.list[i].w+this.list[i].h>=height){
              this.list.splice(i,1);
            }
           else if(this.list[i].x+this.list[i].w+this.list[i].h>=width){
              this.list.splice(i,1);
            }

       }

   },
   //moves the bullets
   move:function(){
     this.list.forEach( function(bullet, j) {
     bullet.x += bullet.xtarget * bullet.speed;
     bullet.y += bullet.ytarget * bullet.speed;
     });
   }




}
