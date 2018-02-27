var INTERVAL = 50;

function Proxy(socket, game_id){
    this.players={};//list of players other than local player
    this.socket = socket;
    this.game_id = game_id
    this.player={x:0,y:0};

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

    sendData : function(data,e){
        var gameid = this.game_id;
        
        this.socket.emit(e, { 'user': data, 'gameid': gameid });
    },
    

    receiveData:function(players){

        this.players=players;
        return this.players;
    }
}
