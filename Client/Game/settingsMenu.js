var settingsMenuPointer=0;
console.log("a");
function startSettingsMenu(){
    window.addEventListener("keydown",settingsMenuControls);
    words=["Volume : ","Change UserName","Main Menu"];
    settingsMenuPointer=0;
    canvasContext.font="30px Silkscreen";
} 
function updateSettingsMenu(){
    settingsMenuDraw();
    console.log(settingsMenuPointer);
}
function setVolume(){

    for(i=0; i<sounds.length; i++){
        sounds[i].volume=volume;
    }
}
function settingsMenuDraw(){
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
    switch(e.keyCode){
        case 87:
            settingsMenuPointer-=1;
            break;
        case 83:
            settingsMenuPointer+=1;
            break;
        case 13:
            if(words[settingsMenuPointer]=="Change UserName"){
		        endSettingsMenu();
                gameState="username_menu";
            }else if(words[settingsMenuPointer]=="Main Menu"){
		        endSettingsMenu();
                gameState="main_menu";
            }
            break;
        case 68:
            if(words[settingsMenuPointer]=="Volume : "){
                volume+=1;
            }
            break
        case 65:
            if(words[settingsMenuPointer]=="Volume : "){
                volume-=1;
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
    window.removeEventListener("keydown",settingsMenuControls);
    settingsMenu=false;
    setVolume();
}
