var usernameMenuPointer;
var text;
var enterName;
var logo = document.createElement("img");

function startUserNameMenu(){
    //starts the user menu and sets variables
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
    //generates the string for teh draw function based on if there is a client username yet
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
        //if enterName is true then the user can enter their username
        switch(e.keyCode){
	        case 13:
                menuSound.play()
                menuSound.currentTime=0;
		        if(clientUsername.length>0){
		            enterName=false;
	                endUserNameMenu();
		        }
		    break;
            case 8:
                //backspace for removing last character
                clientUsername=clientUsername.slice(0,clientUsername.length-1);
                break;
            default:
                //enter characters between A-Z or 1-9
                if(clientUsername<=15){
                    //must be less than 15
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
            }
        }else{
            switch(e.keyCode){
                case 87://w moves pointer up if its greater than 0
                    menuSound.play()
                    menuSound.currentTime=0;
                    if(usernameMenuPointer>0){
                        usernameMenuPointer-=1;
                    }else{
                        usernameMenuPointer=0;
                    }   
                    break;
                case 83://s moves the pointer down if less than length of text array
                    menuSound.play()
                    menuSound.currentTime=0;
                    if(usernameMenuPointer<text.length-1){
                        usernameMenuPointer+=1;
                    }else{
                        usernameMenuPointer=text.length-1;
                    }
                    break;
                case 13:
                    //enter allows user to enter the main menu if username is greater than 0 
                    menuSound.play()
                    menuSound.currentTime=0;
                    if(clientUsername.length>0){
                        enterName=true;
		                endUserNameMenu();
                    }
                    break;
               }
        }   
}
function endUserNameMenu(){
    //ends the username state and turns off the controls 
    window.removeEventListener("keydown",userNameMenuControls);
    usernameMenu = false;
    gameState = "main_menu";

}
