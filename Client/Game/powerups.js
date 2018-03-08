
//This fuction is called to load potion powerup image
function potionImageLoad() {
    potionPic.src = "/Client/Assets/potion.png";
}
//This fuction is called to load shield powerup image
function shieldImageLoad() {
    shieldPic.src = "/Client/Assets/shield.png";
}
//This fuction is called to load boots powerup image
function bootsImageLoad() {
    bootsPic.src = "/Client/Assets/boots.png";
}

//shield object
var shield = {
    h: 0,
    w: 0,
    x: 0,
    y: 0,
    
	  
	};
//boots objet	
var boots = {
    h: 0,
    w: 0,
    x: 0,
    y: 0,
    
	  
	};


//potion object
var potion = {
    h: 0,
    w: 0,
    x: 0,
    y: 0,
    
	  
	};

//This function is called when the player collides with the potion	
function getpotion() {
	potion.x = 0;
	potion.y = 0;
	potion.w = 0;
	potion.h = 0;
	//increments player health
	if(player.health < 175){
	player.health +=25;}
	else {player.health =200 ;
	}
	
}

//This function is called when the player collides with the boots
function getboots() {
	boots.x = 0;
	boots.y = 0;
	boots.w = 0;
	boots.h = 0;
	//increments speed
	player.speed = 10;
	//calls bootsTimeout after 10 seconds
	setTimeout(bootsTimeout,10000);
	
}

//This function is called when the player collides with the shield
function getshield() {
	shield.x = 0;
	shield.y = 0;
	shield.w = 0;
	shield.h = 0;
	//sets players hasShield attribute to true
	player.hasShield = true;
	//calls shieltimeout after 10 seconds 
	setTimeout(shieldTimeout,10000);
	
}
//sets players hasShield attribute to true
function shieldTimeout() {
	player.hasShield = false;
}
//sets player speed attribute back to 5
function bootsTimeout() {
	player.speed = 5;
}

//calls ceate poweerup functions at random intervals 
setInterval("createBoots()", (Math.random()* (30000) + 10000));
setInterval("createPotion()", (Math.random()* (30000) + 10000));
setInterval("createShield()", (Math.random()* (30000) + 10000));

//This function assigns co-ordinates to potion
function createPotion() {
	var k = Math.floor((Math.random()* (3)) + 0);
	potion.x = spawnPotion[k].x;
	potion.y = spawnPotion[k].y;
	potion.h = 40;
	potion.w = 40;
	
}
	

//This function assigns co-ordinates to shield
function createShield() {
	var j = Math.floor((Math.random()* (4)) + 0); 
	shield.x = spawnShield[j].x;
	shield.y = spawnShield[j].y;
	shield.h = 40;
	shield.w = 40;
	
}
//This function assigns co-ordinates to boots
function createBoots() {
	var i = Math.floor((Math.random()* (3)) + 0);
	
	boots.x = spawnBoots[i].x;
	boots.y = spawnBoots[i].y;
	boots.h = 40;
	boots.w = 40;
}

//an array of possible spawn points for potion
var spawnPotion = [{x:300, y:60}, {x:900, y:780}, {x:480, y:120}, {x:1080, y:1020} ];

//an array of possible spawn points for shield
var spawnShield = [{x:300, y:300}, {x:900, y:120}, {x:480, y:900},
				{x:900, y:600}, {x:1020, y:420} ];

//an array of possible spawn points for boots				
var spawnBoots = [{x:120, y:780}, {x:540, y:420}, {x:1020, y:60}, {x:900, y:540},  ];





//This function performs collision detection for player and potion
function collidesPotion(){
if (player.x < potion.x + potion.w &&
	player.x + player.w > potion.x &&
	player.y < potion.y + potion.h &&
	player.y + player.h > potion.y) {
	getpotion();
	}
}

//This function performs collision detection for player and shield
function collidesShield(){
if (player.x < shield.x + shield.w &&
	player.x + player.w > shield.x &&
	player.y < shield.y + shield.h &&
	player.y + player.h > shield.y) {
	getshield();
	}
}

//This function performs collision detection for player and boots
function collidesBoots(){
if (player.x < boots.x + boots.w &&
	player.x + player.w > boots.x &&
	player.y < boots.y + boots.h &&
	player.y + player.h > boots.y) {
	getboots();
	}
}

//This function draws the shield on the canvas
function drawShield(){
	
    canvasContext.drawImage(shieldPic, shield.x, shield.y, shield.w, shield.h);	
}

//This function draws the boots on the canvas
function drawBoots(){
	
    canvasContext.drawImage(bootsPic, boots.x, boots.y, boots.w, boots.h);	
}

//This function draws the potion on the canvas
function drawPotion(){
	
    canvasContext.drawImage(potionPic, potion.x, potion.y, potion.w, potion.h);	
}
    

 
