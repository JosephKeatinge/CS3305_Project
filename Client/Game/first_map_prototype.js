//Assumes a canvas of size 500X500
//If using a different canvas size adjust the TILE_COLS and TILE_ROWS variables and the number
//of values in the tileGrid array accordingly
//TILE_W and TILE_H are the width and height of the background images used for tiles (20X20 in my demo)
//TILE_COLS is the canvas width divided by TILE_W and TILE_ROWS is the canvas height divided by TILE_H

var floorPic = document.createElement("img");
var wallPic = document.createElement("img");
var proxy;
var socket=io();
const TILE_W = 20;
const TILE_H = 20;
const TILE_COLS = 25;
const TILE_ROWS = 25;
//The array is one dimensioned but it is layed out like this in code so that we can visualize it as
//a two dimensional array.
var tileGrid = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				1, 2, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
				1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
				1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1,
				1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
				1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1,
				1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
				1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

// 0 Corresponds to a floor tile, 1 for a wall, 2 is the starting position for the player
const TILE_FLOOR = 0;
const TILE_WALL = 1;
const PLAYERSTART = 2;

function mapInit() {
	//setupInput();
	loadImages();
	playerImageLoad();
	playerReset();
	window.addEventListener("keydown", activate, false);
	window.addEventListener("keyup", deactivate, false);
	canvas.addEventListener('mousemove', mouseMove, true);
	canvas.addEventListener("click", function() {
		createBullet(mouseX, mouseY, player.x, player.y);
		//socket.emit('shoot',theBullets);
		//initial position  of player sent to server
	});
	proxy.sendData(player);
}

function updateAll() {
	movePlayer();
	drawAll();
	bulletsMove();
	//Receive other players data every  frame
	socket.on('heartbeat', function(data) {
					otherPlayers=data;
	});
	//if the player moves send its position
	if(moveRight||moveLeft||moveUp||moveDown){  proxy.sendPos(player);}
}

function drawAll() {
	drawMap();
	drawPlayer();
	drawOtherPlayers()
	bulletsDraw(theBullets);
}

function loadImages() {
	floorPic.src = "/static/floor.png";
	wallPic.src = "/static/wall.png";
}


//Gets X,Y coordinates of mouse
function mouseMove(e) {
  if(e.offsetX) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    }
  else if (e.layerX) {
    mouseX = e.layerX;
    mouseY = e.layerY;
    }
}

function isWallAtColRow(col, row) {
	//Takes x and y array values and checks if there is a wall at that point.
	//Returns true if wall is present and false otherwise
	if(col >= 0 && col < TILE_COLS && row >= 0 && row < TILE_ROWS) {
		 var mapIndexUnderCoord = rowColToArrayIndex(col, row);
		 return (tileGrid[mapIndexUnderCoord] == TILE_WALL);
	} else {
		return false;
	}
}

function rowColToArrayIndex(col, row) {
	//Converts array x and y coords to actual array index
	return col + TILE_COLS * row;
}

function drawMap() {
	for(var eachRow=0;eachRow<TILE_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<TILE_COLS;eachCol++) {

			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

			if(tileGrid[arrayIndex] == TILE_FLOOR) {
				canvasContext.drawImage(floorPic, TILE_W*eachCol,TILE_H*eachRow);
			} else if(tileGrid[arrayIndex] == TILE_WALL) {
				canvasContext.drawImage(wallPic, TILE_W*eachCol,TILE_H*eachRow);
			}
		}
	}
}
