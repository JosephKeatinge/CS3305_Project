var respawnSpot1 = {
    x : 1080,
    y : 125
}
var respawnSpot2 = {
    x : 120,
    y : 125
}
var respawnSpot3 = {
    x : 60,
    y : 780
}
var respawnSpot4 = {
    x : 1020,
    y : 770
}

var respawnSpots = []
var respawnCo = {
    x : 100,
    y : 100
}
var dead=false;

function respawn(deadPlayer){
    dead = true;
    respawnSpots.push(respawnSpot1, respawnSpot2, respawnSpot3, respawnSpot4);
    var playerSpawn = respawnSpots[Math.floor(Math.random() * respawnSpots.length)];
    deadPlayer.x = playerSpawn.x;
    deadPlayer.y = playerSpawn.y;
    deadPlayer.health = 100;
}
