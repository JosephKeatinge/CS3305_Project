var usernameMenuPointer;
var text;
var enterName;

function startUserNameMenu(){
    window.addEventListener("keydown",userNameMenuControls);
    text=["Enter Name:","Enter Game"]
    usernameMenuPointer=0;
    enterName = false;
}
function updateUserNameMenu(){
    /* 
    Creates an interval in which clear and draw are called
    */
    userNameMenuDraw();

}
function userNamestringGen(i){
    var str=""
    if(i==0){
	    if(clientUsername.length>0){
            var str="Enter Name: "+clientUsername;
	    } else{
	        var str ="Enter Name:"
        }
    } else if(i==1){
	    var str="Enter Game";
    }
    return str;
}
function userNameMenuDraw(){
    canvasContext.fillStyle="#000000";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    /* 
    Draws the text to the screen
    */
    canvasContext.textAlign = "center";
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillStyle="#888888";
    canvasContext.font = "20px Silkscreen";
    for(i=0;i<text.length;i++){
        canvasContext.fillText(userNamestringGen(i),canvas.width/2,40*i+100);
    }
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText(userNamestringGen(0+usernameMenuPointer),canvas.width/2,40*usernameMenuPointer+100);
}
function userNameMenuControls(e){
    if (enterName) {
        switch(e.keyCode){
            case 13:
                enterName=false;
                break;
            case 8:
                clientUsername=clientUsername.slice(0,clientUsername.length-1);
                break;
            default:
                letter = String.fromCharCode(e.keyCode)
                clientUsername+=letter;
        }
    }else{
        switch(e.keyCode){
        case 87:
            if(usernameMenuPointer>0){
                usernameMenuPointer-=1;
            }else{
                usernameMenuPointer=0;
            }
            break;
        case 83:
            if(usernameMenuPointer<text.length-1){
                usernameMenuPointer+=1;
            }else{
                usernameMenuPointer=text.length-1;
            }
            break;
        case 13:
            if(usernameMenuPointer==0){
                enterName=true;
            }
            if(usernameMenuPointer==1){
                console.log("Welcome to game")
                endUserNameMenu()
            }
            break;
        }
        if(UserNameMenupointer<0){
            UserNameMenupointer=0;
        }
	if(username.length>0){
	    if(UserNameMenupointer>text.length-1){
              UserNameMenupointer=text.length-1
	    }
	}else if(username.length==0){
	    if(UserNameMenupointer>0){
		UserNameMenupointer=0	
	     }
	}
	console.log(UserNameMenupointer);
    }
}
function endUserNameMenu(){
  window.removeEventListener("keydown",userNameMenuControls);
  usernameMenu = false;
  gameState = "main_menu";
}
