//Player Stuff
var player = {
    x: 250,
    y: 350,
    w: 60,
    h: 60,
    size: 32,
    speed:5,
    health:200,
    score:0,
    hasShield: false,
    direction: 0,
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
    if(currentLobby.map=="Sand"){
      playerPic.src = "/Client/Assets/dragon_player.png";
    }else if(currentLobby.map=="Stone"){
      playerPic.src = "/Client/Assets/slime.png";
    }else if(currentLobby.map=="Factory"){
    playerPic.src = "/Client/Assets/robot.png";
    }
}

function activate(event) {
    //Called when a key is pressed, sets the relevant moving variable to true.
    if(dead){ dead = false;}
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
    if (dead){
        canvasContext.globalAlpha = 0.4;
    }
    player_image_index = Math.round(player.direction/2);
    if(player_image_index == 180){
        player_image_index = 0
    }
    canvasContext.drawImage(playerPic,0 + 60* player_image_index,0,60,60,player.x,player.y,60,60);
}

//Draws other players in the game
function drawOtherPlayers(){
  for(var id in otherPlayers){
    if (id != socket.id){
      var otherPlayer=otherPlayers[id]; 
        player_image_index = Math.round(otherPlayer.direction/2);
        if(player_image_index == 180){
            player_image_index = 0
        }
        console.log(otherPlayer.direction)
        canvasContext.drawImage(playerPic,0 + 60* player_image_index,0,60,60,otherPlayer.x,otherPlayer.y,60,60);
     }
  }
}
/*
*Function for preventing players from colliding with eachother
*@params direction - the direction the player is going in
*@returns true if they are about to collide with another player, false otherwise
*/
function isOtherPlayer(direction) {
    
    for (var id in otherPlayers) {
        if (id != socket.id) {
           //The other player
            var player2 = otherPlayers[id];
            
            if (direction == 'right') {
                //If they are within 60 pixels of eachother, and the player tries to move right, will return true to stop them
                if ((player2.x-player.x<60 &&player.x<player2.x) && (player.y - player2.y < 60 && player.y - player2.y > -60)) {
                    return true
                }
            }
            
            else if (direction == 'left') {
                //If they are within 60 pixels of eachother, and the player tries to move left, will return true to stop them
                if ((player.x - player2.x < 60 && player2.x < player.x) && (player.y - player2.y < 60 && player.y - player2.y > -60)) {
                    return true
                }
            }
            
            else if (direction == 'up') {
                //If they are within 60 pixels of eachother, and the player tries to move up, will return true to stop them
                if ((player.y- player2.y < 60 && player2.y < player.y) && (player.x - player2.x < 60 && player.x - player2.x > -60)) {
                    return true
                }
                
            }
            else if (direction == 'down') {
                //If they are within 60 pixels of eachother, and the player tries to move down, will return true to stop them
                if ((player2.y - player.y < 60 && player.y < player2.y) && (player.x - player2.x < 60 && player.x - player2.x > -60)) {
                    
                    return true
                }
            }
            //If there is no other player in the direction the player is heading in, return false
            return false;
        }
    }
}


function movePlayer() {
    //Move player only if there is no wall
    //Translating the player x and y canvas coordinates to x and y coordinates in the map array
    var playerXCoord = Math.round(player.x / (BRICK_W));
    var playerYCoord = Math.round(player.y / (BRICK_H));
      
    player.direction = Math.atan2(mouseY + camPanY - (player.y+20),mouseX + camPanX - (player.x+50))*180/Math.PI;
    player.direction = (270 + player.direction) % 360
    //Logic is the same regardless of direction: if the next tile in the direction the player
    //is headed in is a wall, nothing will happen. Otherwise, move the amount dictated by the
    //movementAmount variable.

    if (moveRight) {
        if (isOtherPlayer('right')){
       
        }
         //If a player collides with a wall brick, they are centred back to a position where they will not collide with the wall but can still
        //freely move
         else if (isWallAtColRow(playerXCoord + 1, playerYCoord + 1) && player.y > BRICK_W * playerYCoord && player.x > BRICK_W * playerXCoord) {
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
        if (isOtherPlayer( 'left')) {
            
        }
        else if (isWallAtColRow(playerXCoord - 1, playerYCoord + 1) && player.y > BRICK_W * playerYCoord && player.x < BRICK_W * playerXCoord) {

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
        if (isOtherPlayer('up')) {
           
        }
        //For if a player is about to clip into a wall moving upwards
        else if (isWallAtColRow(playerXCoord + 1, playerYCoord - 1) && player.x > BRICK_W * playerXCoord && player.y < BRICK_W * playerYCoord) {
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
        if (isOtherPlayer('down')) {
            
        }
       else if (isWallAtColRow(playerXCoord + 1, playerYCoord + 1) && player.x > BRICK_W * playerXCoord && player.y > BRICK_W * playerYCoord) {

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
