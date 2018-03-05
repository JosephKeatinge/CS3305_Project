/*The window.onload function and most global variables
  The gamestates are as follows:
    >username_menu
    >main_menu
    >lobby_list_menu
    >create_lobby_menu
    >game
    >lobby
    >pause_menu
    >settingsMenu
    */

//Booleans to represent if the current gameState has been initialised yet
var usernameMenu = false;
var mainMenuEventListeners = false;
var settingsMenu=false;
var gameStarted = false;
var lobbyWaitRoom = false;
var createLobbyMenu = false;
var lobbyMenu = false;
var creditsMenu=false
var howToPlay=false;
var endGame=false;
var inLobby=false;


//Canvas and map settings
var canvas, canvasContext;
var height, width;
const BRICK_W = 60;
const BRICK_H = 60;
const BRICK_GAP = 1;
var BRICK_COLS;
var BRICK_ROWS;

//Game and lobby settings
var gameState = "username_menu";
var clientUsername = "";
var maxPlayers = 4;
var currentLobby;
var volume;
var sound = document.createElement("audio");
sound.src="/Client/Assets/shot.wav";
var soundtrack = document.createElement("audio");
soundtrack.src="/Client/Assets/Soundtrack.wav";
soundtrack.loop = true;
var hitSound = document.createElement("audio");
hitSound.src="/Client/Assets/hitSound.wav";
var menuSound = document.createElement("audio");
menuSound.src="/Client/Assets/menu.wav";
menuSound.volume=5/10;
var sounds=[menuSound,sound,soundtrack,hitSound]
var socket=io.connect();
var logo = new Image();
logo.src="Client/Assets/victus.png";

window.onload = function() {
  //Ran when game is first loaded up
  //Sets canvas variables and interval for updateAll function
  canvas = document.getElementById("canvas");
  canvasContext = canvas.getContext('2d');
  height = canvas.width;
  width = canvas.height;
  var framesPerSecond = 30;
  window.setInterval(updateAll, 1000/framesPerSecond);
  }

function updateAll() {
// Called every interval. Depending on the gameState it will run a separate file
  switch(gameState) {
    //For each gameState its starting function will be called once if it hasn't been already
    //and its update function will be called every interval until the gameState is changed
    case "username_menu":
      if (!usernameMenu) {
        startUserNameMenu();
        usernameMenu = true;
        inLobby=false;
      }
      updateUserNameMenu();
      break;
    case "howToPlay":
      if(!howToPlay){
        startHowToPlay()
        howToPlay=true;
        inLobby=false;
      }
      updateHowToPlay();
      break;
    case "main_menu":
      if (!mainMenuEventListeners) {
        startmainmenu();
        mainMenuEventListeners = true;
        inLobby=false;
      }
      updategamemenu();
      break;
    case "creditsMenu":
      if(!creditsMenu){
        startCredits();
        creditsMenu=true
        inLobby=false;
      }
      updateCreditsMenu()
      break;
    case "lobby_list_menu":
      if (!lobbyMenu) {
        startLobbyMenu();
        lobbyMenu = true;
        inLobby=false;
      }
      updateLobbyMenu();
      break;
    case "settingsMenu":
      if(!settingsMenu){
        startSettingsMenu();
        settingsMenu=true;
        inLobby=false;
      }
      updateSettingsMenu();
      break;
    case "create_lobby_menu":
      if (!createLobbyMenu) {
        startCreateLobbyMenu();
        createLobbyMenu = true;
        inLobby=false;
      }
      createLobbyUpdate();
      break;
    case "game":
      if (!gameStarted) {
        startGame();
        gameStarted = true;
      }
      updateGame();
      break;
    case "lobby":
      if (!lobbyWaitRoom) {
        startLobbyWaitRoom();
        lobbyWaitRoom = true;
        inLobby=true;
      }
      updateLobbyWaitRoom();
      break;
    case "endGame":
      if(!endGame){
          startEndGame();
          endGame=true;
      }
      updateEndGame();
      break;
  }
  if(inLobby){
  if(currentLobby.map=="Sand"){
    BRICK_COLS = 20;
    BRICK_ROWS = 15;
  }else if(currentLobby.map=="Factory"){
    BRICK_COLS = 22;
    BRICK_ROWS = 19;
  }else if(currentLobby.map=="Stone"){
    BRICK_COLS = 21;
    BRICK_ROWS = 15;
  }
}

//console.log(gameState);
}
