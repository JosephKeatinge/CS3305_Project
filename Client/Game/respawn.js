var sandRespawnSpot1 = {
    x : 1080,
    y : 125
}
var sandRespawnSpot2 = {
    x : 120,
    y : 125
}
var sandRespawnSpot3 = {
    x : 60,
    y : 780
}
var sandRespawnSpot4 = {
    x : 1020,
    y : 770
}


var stoneRespawn1 ={ x: 65, y:70 }
var stoneRespawn2 = {x: 585, y:600}
var stoneRespawn3 = {x: 1130, y:845}
var stoneRespawn4 = {x: 1130, y:70}
var stoneRespawn5 = {x: 90, y:765}

var factRespawn1 = {x:860, y:995}
var factRespawn2 = {x:860, y:170}
var factRespawn3 = {x:270, y:170}
var factRespawn4 = {x:80, y:985}
var factRespawn5 = {x:600, y:595}

var respawnSpots = []
var respawnCo = {
    x : 100,
    y : 100
}
var dead=false;

function respawn(deadPlayer){
    dead = true;
    if(currentLobby.map=="Sand"){respawnSpots.push(sandRespawnSpot1, sandRespawnSpot2, sandRespawnSpot3, sandRespawnSpot4);}
    if(currentLobby.map=="Stone"){respawnSpots.push(stoneRespawn1, stoneRespawn2, stoneRespawn3, stoneRespawn4, stoneRespawn5);}
    if(currentLobby.map=="Factory"){respawnSpots.push(stoneRespawn1, stoneRespawn2, stoneRespawn3, stoneRespawn4, stoneRespawn5);}
    var playerSpawn = respawnSpots[Math.floor(Math.random() * respawnSpots.length)];
    deadPlayer.x = playerSpawn.x;
    deadPlayer.y = playerSpawn.y;
    deadPlayer.health = 200;
}
