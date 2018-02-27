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
    } if (ekeyCode === KEY_A) {
      moveLeft = true;
    } if (ekeyCode === KEY_W) {
        moveUp = true;
    } if (ekeyCode === KEY_S) {
      moveDown = true;
    }
}

function deactivate(event) {
    //Called on the event of a keyup, sets the relevant moving variable to false.
    var ekeyCode = event.keyCode;
    if (ekeyCode === KEY_D) {
        moveRight = false;
    } if (ekeyCode === KEY_A) {
      moveLeft = false;
    } if (ekeyCode === KEY_W) {
        moveUp = false;
    } if (ekeyCode === KEY_S) {
      moveDown = false;
    }
}


function drawPlayer(){
    //Draws player on the canvas if the image is loaded
        canvasContext.drawImage(playerPic, player.x, player.y, 55, 55);
    
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
        
         //If a player collides with a wall brick, they are centred back to a position where they will not collide with the wall but can still
        //freely move
         if (isWallAtColRow(playerXCoord + 1, playerYCoord + 1) && player.y > BRICK_W * playerYCoord && player.x > BRICK_W * playerXCoord) {
            //this is for one tile floor where there is a wall above and below it. It makes it so the player does not clip the wall on these
            if (isWallAtColRow(playerXCoord + 1, playerYCoord - 1)) {
                player.x +=player.speed
                player.y-=player.speed
            }
             
            else {
                player.x = (BRICK_W * playerXCoord) + (player.x - playerXCoord * BRICK_W)
               
            }
            player.y = (BRICK_W * playerYCoord) + (player.y - playerYCoord * BRICK_W)
           

            

         }
        //For when the player collides with a wall brick that is below them. It prevents clipping. See above note.
        else if (isWallAtColRow(playerXCoord + 1, playerYCoord - 1) && player.y < BRICK_W * playerYCoord && player.x > BRICK_W * playerXCoord) {
            
            if (isWallAtColRow(playerXCoord + 1, playerYCoord + 1)) {
                player.x +=player.speed
                player.y+=player.speed
                
            }
            else {
                player.x = (BRICK_W * playerXCoord) + (player.x - playerXCoord * BRICK_W)
               
            }
            player.y = (BRICK_W * playerYCoord) + (player.y - playerYCoord * BRICK_W)
            




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
            
            if (isWallAtColRow(playerXCoord - 1, playerYCoord - 1)){
                player.x -=player.speed
                player.y-=player.speed
            }
            else {
                player.x = (BRICK_W * playerXCoord) + (player.x - playerXCoord * BRICK_W)
            }
            player.y = (BRICK_W * playerYCoord) + (player.y-playerYCoord * BRICK_W )
        }
        else if (isWallAtColRow(playerXCoord - 1, playerYCoord - 1) && player.y < BRICK_W * playerYCoord  && player.x < BRICK_W * playerXCoord) {
           
            if (isWallAtColRow(playerXCoord - 1, playerYCoord + 1)) {
                player.x -=player.speed
                player.y+=player.speed
            }
            else {
                player.x = (BRICK_W * playerXCoord) + (player.x - playerXCoord * BRICK_W)
            }
            
       player.y = ((BRICK_W * (playerYCoord )) + (player.y-((playerYCoord)  * BRICK_W ) ))
        }
        //moves player forward if there is no brick in the way
        else if (!isWallAtColRow(playerXCoord - 1, playerYCoord)) {

            player.x -= player.speed

        }
        else if (BRICK_W * playerXCoord < player.x) {
            player.x -= player.speed;
        }
    }
    if (moveUp) {
        //For if a player is about to clip into a wall moving upwards
        if (isWallAtColRow(playerXCoord + 1, playerYCoord - 1) && player.x > BRICK_W * playerXCoord && player.y < BRICK_W * playerYCoord) {
            //If the player is moving up and left
            if (moveLeft) {
                player.y-=5
                
             //If the player is moving up and right
            }
            else if (moveRight) {
                player.y-=player.speed
                

               
            }
            else {
                player.x -= 5
            }

        }
        else if (isWallAtColRow(playerXCoord - 1, playerYCoord - 1) && player.x < BRICK_W * playerXCoord - 1 && player.y < BRICK_W * playerYCoord) {
            
            if (moveLeft) {
                player.y-=player.speed
                
               
            }
            else if (moveRight) {
                player.y-=player.speed
               
                
            }
            else {
                player.x +=player.speed
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
                player.y+=player.speed
     
                
                
            }
            if (moveRight) {
                player.y+=player.speed
               
                
               
            }
            else {

                player.x -=player.speed

            }




        }
        else if (isWallAtColRow(playerXCoord - 1, playerYCoord + 1) && player.x < BRICK_W * playerXCoord && player.y > BRICK_W * playerYCoord) {
            

            if (moveLeft) {
                player.y+=player.speed
            }
            if (moveRight) {
                
                player.y+=player.speed
            }
            else {
                player.x +=player.speed

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

