var socket = io.connect('');
var game = new Game(socket);
socket.on('new player',function(players){
    game.newPlayer(player.id,player.x,player.y,player.Local);
});

socket.on('sync',function(ServerData){
    game.receiveData(ServerData);
});

socket.on('disconnect',function(playerId){
    game.removePlayer(playerId);
});

$(document).ready(function(){
    //main menu
    $('#join').click(function(){
        playerId=$('#playerId').val();
        console.log(playerId);
        joinGame(playerId,socket);
    });

});

$(window).on('beforeunload',function(){
    socket.emit('leaveGame',playerId);
    console.log(playerId +"has left")
});

function joinGame(playerId,socket){
    if(playerId != ''){
        socket.emit('join',{id:playerId});
    }
}