
//Player Constructor
function Player(x,y,w,h,size,img){
       this.x=x;
       this.y=y;
       this.w=w;
       this.h=h;
       this.size=size;
       this.health=100;
       this.moveRight=false;
       this.moveLeft=false;
       this.moveUp=false;
       this.moveDown=false;
       this.speed=5;
       this.img=img;
       this.playerLoaded=false;
       this.playerPic=document.createElement("img");
}

Player.prototype={
       movePlayer: function(){
         //Translating the player x and y canvas coordinates to x and y coordinates in the map array
         var playerXCoord = Math.round(player.x / (TILE_W));
         var playerYCoord = Math.round(player.y / (TILE_H));
         //Logic is the same regardless of direction: if the next tile in the direction the player
         //is headed in is a wall, nothing will happen. Otherwise, move the amount dictated by the
         //movementAmount variable.
         if (this.moveRight) {
             if (!isWallAtColRow(playerXCoord+1, playerYCoord)) {
               this.x += this.speed;
             }
         }
         if (this.moveLeft) {
             if (!isWallAtColRow(playerXCoord-1, playerYCoord)) {
                 this.x -= this.speed;
             }
         }
         if (this.moveUp) {
             if (!isWallAtColRow(playerXCoord, playerYCoord-1)) {
                 this.y -= this.speed;
             }
         }
         if (this.moveDown) {
             if (!isWallAtColRow(playerXCoord, playerYCoord+1)) {
                 this.y += this.speed;
             }
         }
     },

     //If the image has loaded draw the player
     drawPlayer:function(canvasContext){
       if(this.playerLoaded){
           canvasContext.drawImage(this.playerPic, this.x, this.y);
       }

     },

     //Check if the player image has loaded
     playerImgLoad:function(){

          this.playerPic.onload=function(){
            this.playerLoaded=true;
          }
          this.playerPic.src=this.img;
     },
     activate:function(event){
       //Called when a key is pressead, sets the relevant moving variable to true.
       var ekeyCode = event.keyCode;
       if (ekeyCode === 68) {
          this.moveRight = true;
       } else if (ekeyCode === 65) {
         this.moveLeft = true;
       } else if (ekeyCode === 87) {
           this.moveUp = true;
       } else if (ekeyCode === 83) {
         this.moveDown = true;
       }
     },
     deactivate:function(event){
       var ekeyCode = event.keyCode;
       if (ekeyCode === 68) {
          this.moveRight = false;
       } else if (ekeyCode === 65) {
          this.moveLeft = false;
       } else if (ekeyCode === 87) {
          this.moveUp = false;
       } else if (ekeyCode === 83) {
          this.moveDown = false;
       }

     }
}
