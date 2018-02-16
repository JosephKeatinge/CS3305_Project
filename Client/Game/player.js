//Player Stuff
var player = {
    x: 250,
    y: 350,
    w: 32,
    h: 32,
    size: 32};
var moveRight = false;
var moveLeft = false;
var moveUp = false;
var moveDown = false;
var movementAmount = 5;
var otherPlayers={};
var playerPic = document.createElement("img");
var playerLoaded = false;


function playerImageLoad() {
    //Sets the playerLoaded variable to true once the player sprite image is loaded.
  playerPic.src = "/Client/Assets/ghost_player.png";
}

function activate(event) {
    //Called when a key is pressed, sets the relevant moving variable to true.
    var ekeyCode = event.keyCode;
    if (ekeyCode === 68) {
        moveRight = true;
    } else if (ekeyCode === 65) {
      moveLeft = true;
    } else if (ekeyCode === 87) {
        moveUp = true;
    } else if (ekeyCode === 83) {
      moveDown = true;
    }
}

function deactivate(event) {
    //Called on the event of a keyup, sets the relevant moving variable to false.
    var ekeyCode = event.keyCode;
    if (ekeyCode === 68) {
        moveRight = false;
    } else if (ekeyCode === 65) {
      moveLeft = false;
    } else if (ekeyCode === 87) {
        moveUp = false;
    } else if (ekeyCode === 83) {
      moveDown = false;
    }
}

function drawPlayer(){
    //Draws player on the canvas if the image is loaded
        canvasContext.drawImage(playerPic, player.x, player.y);
    
}

//Draws other players in the game
function drawOtherPlayers(){
  console.log(otherPlayers);
  for(var id in otherPlayers){
    if (id != socket.id){
      var player=otherPlayers[id];
        canvasContext.drawImage(playerPic, player.x, player.y);}
  }
}


function movePlayer() {

    //Translating the player x and y canvas coordinates to x and y coordinates in the map array
    var playerXCoord = Math.round(player.x / (TILE_W));
    var playerYCoord = Math.round(player.y / (TILE_H));
    //Logic is the same regardless of direction: if the next tile in the direction the player
    //is headed in is a wall, nothing will happen. Otherwise, move the amount dictated by the
    //movementAmount variable.
    if (moveRight) {
        if (!isWallAtColRow(playerXCoord+1, playerYCoord)) {
          player.x += movementAmount;
        }
    }
    if (moveLeft) {
        if (!isWallAtColRow(playerXCoord-1, playerYCoord)) {
            player.x -= movementAmount;
        }
  }
  if (moveUp) {
        if (!isWallAtColRow(playerXCoord, playerYCoord-1)) {
            player.y -= movementAmount;
        }
    }
    if (moveDown) {
        if (!isWallAtColRow(playerXCoord, playerYCoord+1)) {
            player.y += movementAmount;
        }
    }
}
