var canvas = document.getElementById("Canvas");
        var width =1080;
        var height=720;
        var frames=30;
        var timerId=0;
        var timerId = setInterval(update, 1000/frames);
        var ctx = canvas.getContext("2d");
        ctx.font = "30px Silkscreen";
        ctx.textAlign = "center";
        window.addEventListener("keydown",Controls);
        var words = ["Play","Settings","How to play","Credits"];
        var pointer=0;
        function update(){
            clear();
            draw();

        }
        function clear(){
            ctx.fillStyle="#000000";
            ctx.fillRect(0,0,width,height);
        }
        function draw(){
            ctx.fillStyle="#888888";
            for(i=0;i<words.length;i++){
                ctx.fillText(words[i],canvas.width/2,300+60*i);
            }
            ctx.fillStyle="#ffffff";
            ctx.fillText(words[pointer],canvas.width/2,300+60*pointer);
        }
        function Controls(e){
            switch(e.keyCode){
            case 87:
                pointer=pointer-1;
                break;
            case 83:
                pointer=pointer+1;
                break;
            case 13:
                if(pointer==0){
                    console.log("Play");
                }else if(pointer==1){
                    console.log("Settings");
                }else if(pointer==2){
                    console.log("How to play");
                }else{
                    console.log("Credits");
                }
            }
            if(pointer<0){
                pointer=0;
            }else if(pointer>=words.length){
                pointer=words.length-1;
            }
        }