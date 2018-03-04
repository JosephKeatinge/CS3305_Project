

function potionImageLoad() {
    potionPic.src = "/Client/Assets/potion.png";
}

function shieldImageLoad() {
    shieldPic.src = "/Client/Assets/shield.png";
}

function bootsImageLoad() {
    bootsPic.src = "/Client/Assets/boots.png";
}


var shield = {
    h: 0,
    w: 0,
    x: 0,
    y: 0,
    
	  
	};
	
var boots = {
    h: 0,
    w: 0,
    x: 0,
    y: 0,
    
	  
	};



var potion = {
    h: 0,
    w: 0,
    x: 0,
    y: 0,
    
	  
	};

	
function getpotion() {
	potion.x = 0;
	potion.y = 0;
	potion.w = 0;
	potion.h = 0;
	if(player.health < 175){
	player.health +=25;}
	else {player.health =200 ;
	}
	
}

function getboots() {
	boots.x = 0;
	boots.y = 0;
	boots.w = 0;
	boots.h = 0;
	
	player.speed = 10;
	setTimeout(bootsTimeout,20000);
	
}
function getshield() {
	shield.x = 0;
	shield.y = 0;
	shield.w = 0;
	shield.h = 0;
	
	player.hasShield = true;
	
	setTimeout(shieldTimeout,20000);
	
}

function shieldTimeout() {
	player.hasShield = false;
}

function bootsTimeout() {
	player.speed = 5;
}


setInterval("createBoots()", (Math.random()* (30000) + 10000));
setInterval("createPotion()", (Math.random()* (30000) + 10000));
setInterval("createShield()", (Math.random()* (30000) + 10000));

function createPotion() {
	var x = Math.random()* (width) + 1;
	var y = Math.random()* (height) + 1;
	if(!isWallAtColRow(x, y)){
		potion.x = x;
		potion.y = y;
		potion.h = 40;
		potion.w = 40;
	}
}

function createShield() {
	var x = Math.random()* (width) + 1;
	var y = Math.random()* (height) + 1;
	if(!isWallAtColRow(x, y)){
		shield.x = x;
		shield.y = y;
		shield.h = 40;
		shield.w = 40;
	}
}

function createBoots() {
	var x = Math.random()* (width) + 1;
	var y = Math.random()* (height) + 1;
	if(!isWallAtColRow(x, y)){
		boots.x = x;
		boots.y = y;
		boots.h = 40;
		boots.w = 40;
	}
}



function collidesPotion(){
if (player.x < potion.x + potion.w &&
	player.x + player.w > potion.x &&
	player.y < potion.y + potion.h &&
	player.y + player.h > potion.y) {
	getpotion();
	}
}

function collidesShield(){
if (player.x < shield.x + shield.w &&
	player.x + player.w > shield.x &&
	player.y < shield.y + shield.h &&
	player.y + player.h > shield.y) {
	getshield();
	}
}

function collidesBoots(){
if (player.x < boots.x + boots.w &&
	player.x + player.w > boots.x &&
	player.y < boots.y + boots.h &&
	player.y + player.h > boots.y) {
	getboots();
	}
}


function drawShield(){
	
    canvasContext.drawImage(shieldPic, shield.x, shield.y, shield.w, shield.h);	
}
function drawBoots(){
	
    canvasContext.drawImage(bootsPic, boots.x, boots.y, boots.w, boots.h);	
}


function drawPotion(){
	
    canvasContext.drawImage(potionPic, potion.x, potion.y, potion.w, potion.h);	
}
    

 