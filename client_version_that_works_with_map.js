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

var playerPic = document.createElement("img");
var playerLoaded = false;

function playerImageLoad() {
    //Sets the playerLoaded variable to true once the player sprite image is loaded.
    playerPic.onload = function() {
		playerLoaded = true;
	}
	playerPic.src = "ghost_player.png";
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
    if(playerLoaded){
        canvasContext.drawImage(playerPic, player.x, player.y);
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

function collidesB(a, b) {
    //Niall's function. Not currently used but might be useful in future.
    return	a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function playerReset() {
    //Converts the player's starting position in the map array to x and y coordinates on the canvas.
    //Also changes the array value at that point from player object to floor.
	for(var eachRow=0; eachRow<TILE_ROWS; eachRow++) {
		for(var eachCol=0; eachCol<TILE_COLS; eachCol++) {
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
			if(tileGrid[arrayIndex] == PLAYERSTART) {
				tileGrid[arrayIndex] = TILE_FLOOR;
				player.x = eachCol * TILE_W + TILE_W/2;
				player.y = eachRow * TILE_H + TILE_H/2;
			}
		}
	}
}