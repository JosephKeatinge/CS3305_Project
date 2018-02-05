var canvas = document.getElementById("Canvas");
        var width =1080;
        var height=720;
        var frames=30;
        var timerId=0;
        var pageNum=1;
        var pagesPerPage=10;
        var timerId = setInterval(update, 1000/frames);
        var ctx = canvas.getContext("2d");
        ctx.font = "20px Silkscreen";
        ctx.textAlign = "center";
        window.addEventListener("keydown",Controls);
        var lobbies=[];
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
            if(lobbies.length-(pageNum*pagesPerPage)<=10){
                for(i=pageNum*pagesPerPage;i<lobbies.length-(pageNum*pagesPerPage);i++){
                ctx.fillText(lobbies[i],canvas.width/2,300+20*i-(pagesPerPage*pageNum));
                }
            }
            else{
                for(i=pagesPerPage*pageNum;i<(pagesPerPage*pageNum)+pagesPerPage;i++){
                    ctx.fillText(lobbies[i],canvas.width/2,300+20*i-(pagesPerPage*pageNum));
                }
            }
            ctx.fillStyle="#ffffff";
            ctx.fillText(lobbies[pointer],canvas.width/2,300+60*pointer);
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
                break;
            }
            if(pointer<0){
                pointer=0;
            }else if(pointer>=pagesPerPage*pageNum){
                pageNum=pageNum+1;
            }else if(pointer<=pagesPerPage*pageNum-pagesPerPage){
                pageNum=pageNum-1;
            }
    }