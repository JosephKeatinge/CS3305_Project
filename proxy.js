var INTERVAL = 50;

function Proxy(socket){
    this.players={};//list of players other than local player
    this.socket=socket;
    this.player={x:0,y:0};

    /*var g=this;
    setInterval(function(){
        //set an interval for teh mainloop
        g.mainLoop();
    },INTERVAL);*/
}

Proxy.prototype = {
    addPlayer : function(id,x,y,Local){
        //Local is a boolean to see if the player is the clients object
        var t = new Player(id,x,y,Local);
        if(Local){
            this.localPlayer=t;
        }else{
            this.players.push(t);
        }
    },

    mainLoop : function(){
        //loop for sending data
        if(this.localPlayer!=undefined){
            this.sendData();
        }

    },

    sendData : function(player){
        //send data to server
        //var Data={} //data to be sent to server

       /* var playData={
            id :1,
            x : 0,
            y: 0
        };
        //Data.Player = playData;*/
      //  console.log(player);
        this.socket.emit('newplayer',player);
    },
    sendPos:function(player){
          this.socket.emit('position',player);

    }
    ,

    receiveData:function(players){

        this.players=players;
        return this.players;
    },




    receiveData : function(Data){
        //get and process data from server
        var game = this;
        Data.players.forEach(function(ServerPlayer){
            //update local player
            //if(game.localPlayer!==undefined && ServerPLayer.id==game.localPlayer.id){ }
            //update server players
            var found = false;
            game.players.forEach(function(localPlayer){
                if(localPlayer.id===ServerPlayer.id){
                    localPlayer.x=serverPlayer.x;
                    localPlayer.x=serverPlayer.y;
                }
                localPlayer.refresh();
                found=true;
            });
        });

    }
}