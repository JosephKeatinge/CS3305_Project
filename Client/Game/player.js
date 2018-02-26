//Player Stuff
var player = {
    x: 250,
    y: 350,
    w: 60,
    h: 60,
    size: 32,
    speed:5,
    health:100,
    score:0
};

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
    //Translating the player x and y canvas coordinates to x and y coordinates in the map array
    var playerXCoord = Math.round(player.x / (BRICK_W));
    var playerYCoord = Math.round(player.y / (BRICK_H));

    //Logic is the same regardless of direction: if the next tile in the direction the player
    //is headed in is a wall, nothing will happen. Otherwise, move the amount dictated by the
    //movementAmount variable.

    if (moveRight) {

        if (isWallAtColRow(playerXCoord + 1, playerYCoord + 1) && player.y > BRICK_W * playerYCoord && player.x > BRICK_W * playerXCoord) {
            
            if (moveDown) {
                player.x+=5
            }
            if (moveUp) {
                player.x -= 5;
            }
            else {
                player.y -= 5

            }

        }
        else if (isWallAtColRow(playerXCoord + 1, playerYCoord - 1) && player.y < BRICK_W * playerYCoord && player.x > BRICK_W * playerXCoord) {
            
            if (moveDown) {
                player.x += 5
            }
            if (moveUp) {
                player.x -= 5;
            }
            else {
                player.y += 5
            }



        }
        else if (!isWallAtColRow(playerXCoord + 1, playerYCoord)) {


            player.x += player.speed



        }
        else if (BRICK_W * playerXCoord > player.x) {

            
            player.x += player.speed;
        }
    }
    if (moveLeft) {
        if (isWallAtColRow(playerXCoord - 1, playerYCoord + 1) && player.y > BRICK_W * playerYCoord && player.x < BRICK_W * playerXCoord) {
            
            if (moveDown) {
                player.x -= 5
            }
            else if (moveUp) {
                player.x += 5;
            }
            else {
                player.y -= 5
            }

        }
        else if (isWallAtColRow(playerXCoord - 1, playerYCoord - 1) && player.y < BRICK_W * playerYCoord - 1 && player.x < BRICK_W * playerXCoord) {
       
            if (moveDown) {
                player.x -= 5
            }
            else if (moveUp) {
                player.x += 5;
            }
            else {
                player.y += 5
            }
        }
        else if (!isWallAtColRow(playerXCoord - 1, playerYCoord)) {


            player.x -= player.speed


        }
        else if (BRICK_W * playerXCoord < player.x) {
            player.x -= player.speed;
        }
    }
    if (moveUp) {
        if (isWallAtColRow(playerXCoord + 1, playerYCoord - 1) && player.x > BRICK_W * playerXCoord && player.y < BRICK_W * playerYCoord) {
            
            if (moveLeft) {
                player.y -= 5
            }
            else if (moveRight) {
                player.y -= 5
            }
            else {
                player.x -= 5
            }

        }
        else if (isWallAtColRow(playerXCoord - 1, playerYCoord - 1) && player.x < BRICK_W * playerXCoord - 1 && player.y < BRICK_W * playerYCoord) {
            
            if (moveLeft) {
                player.y -= 5
            }
            else if (moveRight) {
                player.y -= 5
            }
            else {
                player.x += 5
            }
        }
        else if (!isWallAtColRow(playerXCoord, playerYCoord - 1)) {


            player.y -= player.speed


        }
        else if (BRICK_W * playerYCoord < player.y) {
            player.y -= player.speed;
        }
    }
    if (moveDown) {
        if (isWallAtColRow(playerXCoord + 1, playerYCoord + 1) && player.x > BRICK_W * playerXCoord && player.y > BRICK_W * playerYCoord) {
            
            if (moveLeft) {
                player.y += 5
            }
            if (moveRight) {
                player.y -= 5
            }
            else {
                            player.x -= 5

            }




        }
        else if (isWallAtColRow(playerXCoord - 1, playerYCoord + 1) && player.x < BRICK_W * playerXCoord && player.y > BRICK_W * playerYCoord) {
            

            if (moveLeft) {
                player.y-=5
            }
            if (moveRight) {
                player.y+=5
            }
            else {
                player.x += 5

            }


        }
        else if (!isWallAtColRow(playerXCoord, playerYCoord + 1)) {


            player.y += player.speed;

        }
        else if (BRICK_W * playerYCoord > player.y) {
            player.y += player.speed;
        }
    }
}

