var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//getting the html file
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/lobby.html');
});
//list of usernames 
users = [];
//lobbies dictionary (currently unused)
lobbies = {};
io.on('connection', function (socket) {
    /*
     *Set Username function
     *@params: data: The entered username
     
    */
    socket.on('setUsername', function (data) {
        console.log(data);
        //if Username exists, try another
        if (users.indexOf(data) > -1) {
            socket.emit('userExists', data + ' username is taken! Try some other username.');
        } else {
            //add to list of taken usernames
            users.push(data);
            socket.emit('userSet', { username: data });
        }
    });
    /* Create Lobby function
     * @params: data the username of the lobby host
    */
    socket.on('createLobby', function (data) {
        //create random lobby ID between one and 10,000
        var lobbyID = Math.floor(Math.random() * 10000);


        //Lobbies dictionary currently under construction
        lobbies[lobbyID] = data;

        //Join room of the lobby
        socket.join(lobbyID);

        io.in(lobbyID).emit('connectToRoom', lobbyID);



    });

    //Basic test function for joining lobbies
    socket.on('joinLobby', function (data) {
        
        socket.join(data.lobby);
        
        socket.emit('connectToRoom', data.lobby);

    });

    socket.on('newMessage', function (data) {

        //Send message to everyone in room

        io.in(data.lobbyFrom).emit('receiveMessage', data);
    });
    /*
     * Function for leaving lobby
       @params: data of lobby ID
    */
    socket.on('lobbyLeave', function (data){
        socket.leave(data.lobbyToLeave);
        
        
    
    });
});

http.listen(3000, function () {
    console.log('listening on localhost:3000');
});
