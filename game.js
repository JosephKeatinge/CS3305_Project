//Game Logic
(function() {
var canvas;
var context;
var width;
var height;
var moveRight = false;
var moveUp = false;
var moveDown = false;
var moveLeft=false;
var socket = io();
var otherPlayers={}
var proxy;
var player={
   x:0,
   y:0
};


document.addEventListener('DOMContentLoaded', init, false);

function init(){
  proxy=new Proxy(socket);

  canvas = document.querySelector('canvas');
  context = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;
  interval_id= window.setInterval(draw, 1000/30);
  window.addEventListener('keydown',activate,false);
  window.addEventListener('keyup',deactivate,false);
  //Send initial position to Server
  proxy.sendData(player);
}

function draw(){
//keep local position of other players and update
    context.clearRect(0,0,width,height);
    drawPlayer();
    drawOtherPlayers();
    //Receive Other players positions copy to client
    socket.on('heartbeat', function(data) {
            otherPlayers=data;
    });
    //Send my position to the server every second
    proxy.sendPos(player);

    if (moveLeft){
      player.x-=3
    }
     if (moveRight) {
           player.x += 3;
       }
       if (moveUp) {
           player.y -= 3;
       }
       if (moveDown) {
           player.y += 3;
       }
}
function activate(event){
  var keyCode=event.keyCode;

  if (keyCode===65){
moveLeft=true;
  }
  if (keyCode===87){
moveUp=true;
  }else if (keyCode===68){
moveRight=true;
  }else if (keyCode===83){
moveDown=true;
}
}

function deactivate(event){
  var keyCode=event.keyCode;

  if (keyCode===65){
moveLeft=false;
  }
  if (keyCode===87){
moveUp=false;
  }else if (keyCode===68){
moveRight=false;
  }else if (keyCode===83){
moveDown=false;

  }

}


function drawPlayer(){
  context.fillStyle = 'green';
  context.fillRect(player.x,player.y,20,20);

}
function drawOtherPlayers(){
  for(var id in otherPlayers){
    if (id != socket.id){
      var player=otherPlayers[id];
      context.fillStyle = 'red';
      context.fillRect(player.x,player.y,20,20);
    }
  }
}


function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}
})();
