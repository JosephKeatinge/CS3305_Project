var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var player = {
    height: 40,
    width: 40,
    x: 10,
    y: 10,         
}

function move(event){

	alert(event.keyCode);
	
	if(event.keyCode==68){
	player.x+=5;
	}
	if(event.keyCode==65) {
	player.x-=5;
	}
	if (event.keyCode==87) {
	player.y-=5;
	}
	if (event.keyCode==83){
	player.y+=5;
	}
}

document.onkeydown = move;

function clear() {
ctx.clearRect(0, 0, c.width, c.height);
}

function renderPlayer(){
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function run(){
	clear();
    renderPlayer();
}

setInterval(run, 10);
