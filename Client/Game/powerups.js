
//Load powerup images
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

//clears potion and increments player health	
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

//clears boots
function getboots() {
	boots.x = 0;
	boots.y = 0;
	boots.w = 0;
	boots.h = 0;
	//increments speed
	player.speed = 8;
	//calls bootsTimeout after 10 seconds
	setTimeout(bootsTimeout,10000);
	
}

//clears shield
function getshield() {
	shield.x = 0;
	shield.y = 0;
	shield.w = 0;
	shield.h = 0;
	
	player.hasShield = true;
	//calls shieltimeout after 10 seconds 
	setTimeout(shieldTimeout,10000);
	
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
	var k = Math.floor((Math.random()* (3)) + 0);
	potion.x = spawnPotion[k].x;
	potion.y = spawnPotion[k].y;
	potion.h = 40;
	potion.w = 40;
	
}
	


function createShield() {
	var j = Math.floor((Math.random()* (4)) + 0); 
	shield.x = spawnShield[j].x;
	shield.y = spawnShield[j].y;
	shield.h = 40;
	shield.w = 40;
	
}

function createBoots() {
	var i = Math.floor((Math.random()* (3)) + 0);
	
	boots.x = spawnBoots[i].x;
	boots.y = spawnBoots[i].y;
	boots.h = 40;
	boots.w = 40;
}

var spawnPotion = [{x:300, y:60}, {x:900, y:780}, {x:480, y:120}, {x:1080, y:1020} ];
				
var spawnShield = [{x:300, y:300}, {x:900, y:120}, {x:480, y:900},
				{x:900, y:600}, {x:1020, y:420} ];
				
var spawnBoots = [{x:120, y:780}, {x:540, y:420}, {x:1020, y:60}, {x:900, y:540},  ];






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
    

 
