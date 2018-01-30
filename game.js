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
//  socket.emit('new player',player);
  proxy.sendData(player);
  //drawOtherPlayers();
}

function draw(){
//keep local position of other players and update
    context.clearRect(0,0,width,height);
    drawPlayer();
    drawOtherPlayers();
    socket.on('heartbeat', function(data) {
            otherPlayers=data;
    });
    proxy.sendPos(player);
    //socket.emit('position', player);

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



})();























/*

var canvas = document.getElementById('canvas');
var player={x:100,
            y:200};
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
context.clearRect(0, 0, 800, 600);
context.fillStyle = 'green';
context.fillRect(player.x,player.y,75,80);

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}


document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      console.log(movement);
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {

    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});
if (movement.left) {
     console.log("helloooos")
     player.x -= 5;
     console.log(player.x);
   }
   if (movement.up) {
     player.y -= 5;
   }
   if (movement.right) {
     player.x += 5;
   }
   if (movement.down) {
     player.y += 5;
   }


//Server Communication
var socket = io();
socket.on('message', function(data) {
  console.log(data+"Adam");
});
socket.emit('new player',player);
setInterval(function() {
  //console.log(player);
  socket.emit('position', player);
}, 1000 / 60);
*/
