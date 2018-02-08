//Game Logic

//updateGame function
//drawGame function
//startGame function
//endState function -Remove Event Listeners
//instantiate player objects
//Server stuff is commented out for now
socket.on('begingame', function (gameid) {
    var game_id = gameid;
    var canvas = document.getElementById('canvas');
    startGame();
    function startGame() {
        bullets = new Bullet(3, 3, 10);
        player = new Player(250, 350, 32, 32, 32, "/static/hero.png");
        proxy = new Proxy(socket, game_id);


        //A map function
        loadImages();
        playerReset(player);
        //end
        player.imageLoad();

        window.addEventListener("keydown", player.activate, false);
        window.addEventListener("keyup", player.deactivate, false);
        canvas.addEventListener('mousemove', mouseMove, true);
        canvas.addEventListener("click", function () {
            bullets.create(mouseX, mouseY, player.x, player.y);
            //bullets.list.forEach( function(bullet, j) {
            //socket.emit('shoot',bullet);
            //});
        });
    }


    function updateGame() {
        player.move();
        drawGame();
        bullets.move();
        /*
        socket.on('heartbeat', function(data) {
                otherPlayers=data;
        });
        socket.on('bullets',function(bullets){
                 allBullets=bullets;
        });*/
        //Send player position if they have moved
        if (player.hasMoved()) { proxy.sendPos(player); }
    }

    function drawGame() {
        drawMap();
        player.draw();
        bullets.draw();
        //drawOtherPlayer();
        //drawOtherBulelts();
    }

});

