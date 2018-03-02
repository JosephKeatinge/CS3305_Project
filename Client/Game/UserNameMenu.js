var usernameMenuPointer;
var text;
var enterName;
var logo = document.createElement("img");

function startUserNameMenu(){
    window.addEventListener("keydown",userNameMenuControls);
    text=["Enter Name:"]
    usernameMenuPointer=0;
    enterName = true;
    logo.src = "/Client/Assets/victus.png";
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
        canvasContext.fillText(userNamestringGen(i),canvas.width/2,40*i+200);
    }
    canvasContext.fillStyle="#ffffff";
    canvasContext.fillText(userNamestringGen(0+usernameMenuPointer),canvas.width/2,40*usernameMenuPointer+200);
    canvasContext.drawImage(logo,280,-70);
    canvasContext.fillText("Press enter to input user name",canvas.width/2,300);
}
function userNameMenuControls(e){
    if (enterName) {
        switch(e.keyCode){
	    case 13:
		if(clientUsername.length>0){
		  enterName=false;
	          endUserNameMenu();
		}
		break;
            case 8:
                clientUsername=clientUsername.slice(0,clientUsername.length-1);
                break;
            default:
		if(e.keyCode>=65 && e.keyCode<=90 ){
                	letter = String.fromCharCode(e.keyCode)
                	clientUsername+=letter.toUpperCase();
		}
		if(e.keyCode>=48 && e.keyCode<=57){
			letter = String.fromCharCode(e.keyCode)
                        clientUsername+=letter.toUpperCase();
		}
 	     break;
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
            if(clientUsername.length>0){
                enterName=true;
		endUserNameMenu();
            }
            break;
        }
        if(usernameMenuPointer<0){
            usernameMenuPointer=0;
        }
	if(clientUsername.length>0){
	    if(usernameMenuPointer>text.length-1){
              usernameMenuPointer=text.length-1
	    }
	}else if(clientUsername.length==0){
	    if(usernameMenuPointer>0){
		usernameMenuPointer=0
	     }
	}
	console.log(usernameMenuPointer);
    }
}
function endUserNameMenu(){
  window.removeEventListener("keydown",userNameMenuControls);
  usernameMenu = false;
  gameState = "main_menu";
}
