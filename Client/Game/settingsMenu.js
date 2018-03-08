//Menu for changing settings such as volume or change username

var settingsMenuPointer;
function startSettingsMenu(){
    //turns on controls and sets the text and pointer variables
    window.addEventListener("keydown",settingsMenuControls);
    words=["Volume : ","Change UserName","Main Menu"];
    settingsMenuPointer=0;
    canvasContext.font="30px Silkscreen";
}
function updateSettingsMenu(){
    //puts draw on the global  interval
    settingsMenuDraw();
}
function setVolume(){
    //goes through the array of sounds and changes their volume attribute
    for(i=0; i<sounds.length; i++){
        sounds[i].volume=volume/10;
    }
}
function settingsMenuDraw(){
    //draws the text to teh screen. White for the text the pointer is currently over
    canvasContext.fillStyle="#000000";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.fillStyle="#888888";
    canvasContext.fillText("Settings",canvas.width/2,100);
    for(i=0; i<words.length;i++){
	canvasContext.fillStyle="#888888";
        if(words[i]=="Volume : "){
            canvasContext.fillText(words[i]+volume,canvas.width/2,300+60*i+1);
        }else{
	        canvasContext.fillStyle="#888888";
            canvasContext.fillText(words[i],canvas.width/2,300+60*i+1);
        }
        canvasContext.fillStyle="#ffffff";
	    if(words[settingsMenuPointer]=="Volume : "){
            canvasContext.fillText(words[settingsMenuPointer]+volume,canvas.width/2,300+60*settingsMenuPointer+1);
	    }else{
	        canvasContext.fillText(words[settingsMenuPointer],canvas.width/2,300+60*settingsMenuPointer+1);
	    }
    }
}
function settingsMenuControls(e){
    //controls for the menu
    switch(e.keyCode){
        case 87://w moves the pointer up
            settingsMenuPointer-=1;
            menuSound.play()
            menuSound.currentTime=0;
            break;
        case 83://s moves the pointer down
            settingsMenuPointer+=1;
            menuSound.play()
            menuSound.currentTime=0;
            break;
        case 13:
            //enter
            if(words[settingsMenuPointer]=="Change UserName"){
                //if pointer on change user name then user sent to the username menu
		        endSettingsMenu();
                gameState="username_menu";
            }else if(words[settingsMenuPointer]=="Main Menu"){
                //if pointer on main menu then user sent to main menu
		        endSettingsMenu();
                gameState="main_menu";
            }
            break;
        case 68:
            //d moves volume up if pointer over volume
            if(words[settingsMenuPointer]=="Volume : "){
              if(volume<10){
                menuSound.play()
                menuSound.currentTime=0;
                volume+=1;
                setVolume();
              }
            }
            break
        case 65:
            //moves volume down if pointer over volume
            if(words[settingsMenuPointer]=="Volume : "){
                if(volume>0){
                menuSound.play()
                menuSound.currentTime=0;
                volume-=1;
                setVolume();
              }
            }
            break;
        }
        if(settingsMenuPointer<0){
            settingsMenuPointer=0;
        }else if(settingsMenuPointer>=words.length){
            settingsMenuPointer=words.length-1;
        }else if(volume>10){
	           volume=10
	      }else if(volume<0){
	             volume=0;
	      }
}
function endSettingsMenu(){
    //ends current state and turns off controls
    window.removeEventListener("keydown",settingsMenuControls);
    settingsMenu=false;
}
