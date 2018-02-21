//Player Stuff
var player = {
    x: 250,
    y: 350,
    w: 60,
    h: 60,
    size: 32,
    speed:5,
    health:100};

const KEY_A = 65;
const KEY_W = 87;
const KEY_D= 68;
const KEY_S = 83;

var hit=false;
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
  playerPic.src = "/Client/Assets/player.png";
}

function activate(event) {
    //Called when a key is pressed, sets the relevant moving variable to true.
    var ekeyCode = event.keyCode;
    if (ekeyCode === KEY_D) {
        moveRight = true;
    } else if (ekeyCode === KEY_A) {
      moveLeft = true;
    } else if (ekeyCode === KEY_W) {
        moveUp = true;
    } else if (ekeyCode === KEY_S) {
      moveDown = true;
    }
}

function deactivate(event) {
    //Called on the event of a keyup, sets the relevant moving variable to false.
    var ekeyCode = event.keyCode;
    if (ekeyCode === KEY_D) {
        moveRight = false;
    } else if (ekeyCode === KEY_A) {
      moveLeft = false;
    } else if (ekeyCode === KEY_W) {
        moveUp = false;
    } else if (ekeyCode === KEY_S) {
      moveDown = false;
    }
}


function drawPlayer(){
    //Draws player on the canvas if the image is loaded
        canvasContext.drawImage(playerPic, player.x, player.y);
    
}

//Draws other players in the game
function drawOtherPlayers(){
  for(var id in otherPlayers){
    if (id != socket.id){
      var player=otherPlayers[id];
        canvasContext.drawImage(playerPic, player.x, player.y);}
  }
}



function movePlayer() {
    //Move player only if there is no wall 
    var nextX = player.x;
    var nextY = player.y;

    if(moveLeft) {
      nextX += -player.speed;
    }
    if(moveRight) {
      nextX += player.speed;
    }
    if(moveUp) {
      nextY += -player.speed;
    }
    if(moveDown) {
      nextY += player.speed;
    }

    if(isBrickAtPixelCoord(nextX,nextY) == false) {
      player.x = nextX;
      player.y = nextY;
    }
  }

/*
function movePlayer() {

    //Translating the player x and y canvas coordinates to x and y coordinates in the map array
    var playerXCoord = Math.round(player.x / (TILE_W));
    var playerYCoord = Math.round(player.y / (TILE_H));
    //Logic is the same regardless of direction: if the next tile in the direction the player
    //is headed in is a wall, nothing will happen. Otherwise, move the amount dictated by the
    //movementAmount variable.
    if (moveRight) {
        if (!isWallAtColRow(playerXCoord + 1, playerYCoord)) {
          player.x+= movementAmount
        }
        else if (TILE_W * playerXCoord > player.x){
            player.x += movementAmount;
        }
    }
    if (moveLeft) {
        if (!isWallAtColRow(playerXCoord - 1, playerYCoord)) {
            player.x -=movementAmount;
        }
        else if (TILE_W*playerXCoord<player.x) {
            
            player.x -=movementAmount
        }
  }
  if (moveUp) {
      if (!isWallAtColRow(playerXCoord, playerYCoord - 1)) {
            player.y -= movementAmount;
      }
        else if(TILE_W*playerYCoord<player.y) {
            player.y -= movementAmount;
        }
    }
    if (moveDown) {
        if (!isWallAtColRow(playerXCoord, playerYCoord + 1)) {
            player.y += movementAmount;
        }
        else if (TILE_W * playerYCoord > player.y) {
            player.y += movementAmount;
        }
    }
}*/
