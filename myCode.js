(function() {
  
  var canvas;
  var context;
  var interval_id;
  var width;
  var height;
  var player = {
    x: 250,
    y: 350,
    w: 25,
    h: 25,
    size: 25,
    yChange: 0
  };
  var moveRight = false;
  var moveLeft = false;
  var moveUp = false;
  var moveDown = false;
  
  var deltaX = 0;
  var deltaY = 0;
  var rotation = 0;
  var xtarget = 0;
  var ytarget = 0;
  var theBullets = [];
  var Imageready;

  var counter = 0;
  var rectangle1 = {
      x: 0,
      y: 100,
      w: 400,
      h: 10
  };
  var rectangle2 = {
      x: 100,
      y: 300,
      w: 400,
      h: 10
  };
  var len;
  var index;
  var theRectangles= [];
  var avatarImage = new Image();
  avatarImage.onload = function(){
    Imageready = true;}
  avatarImage.src = "jetpack.png";

  var mouseX;
  var mouseY;

  var turnspot = {
    x : 0,
    y : 0
  };  
  var xChange = getRandomNumber(-10, 10);
  
  
  document.addEventListener('DOMContentLoaded', init, false);
  
  function init() {   
        canvas = document.querySelector('canvas');
        context = canvas.getContext('2d');
        width = canvas.width;
        height = canvas.height;
	
	window.addEventListener("keydown", activate, false);
        canvas.addEventListener('mousemove', mouseMove, true);
        canvas.addEventListener("click", function() {createBullet(mouseX, mouseY, player.x, player.y);});
        interval_id = window.setInterval(draw, 10);
        theRectangles.push(rectangle1);
        theRectangles.push(rectangle2);
    }
        
	
function activate(event) {
      var ekeyCode = event.keyCode;
      if (ekeyCode === 39) {
	   moveUp = false
	   moveLeft = false
	   moveRight = true
	   moveDown = false
      }  else if (ekeyCode === 37) {
	    moveLeft = true
	    moveRight = false
	    moveDown = false
	    moveUp = false
      }
      else if (ekeyCode === 38) {
	    moveLeft = false
	    moveRight = false
	    moveDown = false
	    moveUp = true
      }
      else if (ekeyCode === 40) {
	    moveLeft = false
	    moveRight = false
	    moveDown = true
	    moveUp = false
      }
    
  }
	
function draw(){
    context.clearRect(0, 0, width, height);
    
    //counter++;
	//console.log(counter);
    
    drawplayer();
    
    context.fillStyle = "red";
    context.strokeStyle = "blue";
    //context.rect(rectangle1.x, rectangle1.y, rectangle1.w, rectangle1.h);
    context.rect(rectangle2.x, rectangle2.y, rectangle2.w, rectangle2.h);
    context.lineWidth=4;
    context.stroke();
    context.fill();
    bulletsMove();
    bulletsDraw();
    checkCollision();
    
	
    if (moveRight && !(player.x+player.size > width)) {
        if(collides(player.x + 3, player.y, player, rectangle2)){
            while(!collides(player.x + 1, player.y, player, rectangle2)){
                player.x++;
            }
        }
        else{
	      turnspot.x = player.x;
	      turnspot.y = player.y;
          player.x += 3;
	      moveRight = false;
        }
    }
    //Done
    if (moveLeft && !(player.x < 0)) {
        //theRectangles.forEach( function(i,j){
            if(collides(player.x - 3, player.y, player, rectangle2)){
                while(!collides(player.x-1, player.y , player, rectangle2)){
                    player.x--;
                }
            }
            else{
            turnspot.x = player.x;
            turnspot.y = player.y;
            player.x -= 3;
            //console.log("playerX = " + player.x + ", playerX = " + player.y);
            moveLeft = false;
            }
	}
	//Done
	if (moveUp && !(player.y < 0)) {
        //theRectangles.forEach( function(i,j){
            if(collides(player.x, player.y - 3, player, rectangle2)){
                while(!collides(player.x, player.y -1, player, rectangle2)){
                    player.y--;
                }
            }
            else{
            turnspot.x = player.x;
            turnspot.y = player.y;
            player.y -= 3;
            moveUp = false;
            }
        //});
    }
    //Done
    if (moveDown && !(player.y+player.size > height)) {
        //theRectangles.forEach( function(i,j){
        //for (index =0; index< theRectangles.length; index++){
            if(collides(player.x, player.y + 3, player, rectangle2)){
                while(!collides(player.x, player.y +1, player, rectangle2)){
                    player.y++;
                }
	    }
            else{
            turnspot.x = player.x;
            turnspot.y = player.y;
            player.y += 3;
            moveDown = false;
            }
        //});
        }
}
function drawplayer(){
    if(Imageready){
    context.drawImage(avatarImage, player.x, player.y);}
  }
  
function mouseMove(e) {
  if(e.offsetX) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    }
  else if (e.layerX) {
    mouseX = e.layerX;
    mouseY = e.layerY;
    }
    
//console.log("mouseX = " + mouseX + ", mouseY = " + mouseY);
}

function createBullet(targetX, targetY, shooterX, shooterY) {
    //console.log("mouseX = " + mouseX + ", mouseY = " + mouseY);
    //console.log("playerX = " + player.x + ", playerX = " + player.y);
    deltaX = targetX - shooterX;
    deltaY = targetY - shooterY;
    rotation = Math.atan2(deltaY, deltaX);
    xtarget = Math.cos(rotation);
    ytarget = Math.sin(rotation);

    theBullets.push({
    active:true,
    x: shooterX,
    y: shooterY,
    speed: 1,
    xtarget: xtarget,
    ytarget: ytarget,
    w: 3,
    h: 3,
    color: 'black',
    angle: rotation
});
}

function bulletsMove() {
    theBullets.forEach( function(i, j) {
    i.x += i.xtarget * i.speed;
    i.y += i.ytarget * i.speed;
});
}

function bulletsDraw() {
    theBullets.forEach( function(i, j) {
    context.beginPath();
    context.save();
    context.fillStyle = 'black';
    context.rect(i.x, i.y, i.w, i.h);
    context.fill();
    });
}


function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }
    
function collides(ax, ay, a, b) {
    return ax < b.x + b.w &&
    ax + a.w > b.x &&
    ay < b.y + b.h &&
    ay + a.h > b.y;
}
    
function collidesB(a, b) {
    return	a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y;
}

function checkCollision() {
    theBullets.forEach( function(i, j){
    if ( collidesB(rectangle2, i) ) {
       theBullets.splice(j,1);
    }
    });
}
   
})();     
