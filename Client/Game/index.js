/*The window.onload function and most global variables
  The gamestates are as follows:
    >username_menu
    >main_menu
    >lobby_list_menu
    >create_lobby_menu
    >game
    >lobby
    >pause_menu*/

var gameState = "username_menu";
var clientUsername = "";

//Booleans to represent if the current gameState has been initialised yet
var usernameMenu = false;
var mainMenuEventListeners = false;
var gameStarted = false;
var lobbyWaitRoom = false;
var createLobbyMenu = false;
var lobbyMenu = false;

var maxPlayers = 4;
var canvas, canvasContext;
var height, width;
const TILE_W = 20;
const TILE_H = 20;
const TILE_COLS = 25;
const TILE_ROWS = 25;
var currentLobby;
var socket=io.connect();

window.onload = function() {
  canvas = document.getElementById("canvas");
  canvasContext = canvas.getContext('2d');
  height = canvas.width;
  width = canvas.height;
  var framesPerSecond = 30;
  window.setInterval(updateAll, 1000/framesPerSecond);
  }

function updateAll() {
// Called every interval. Depending on the gameState it will run a separate file
 // console.log(gameState)
  switch(gameState) {
    case "username_menu":
      if (!usernameMenu) {
        startUserNameMenu();
        usernameMenu = true;
      }
      updateUserNameMenu();
      break;
    case "main_menu":
      if (!mainMenuEventListeners) {
        startmainmenu();
        mainMenuEventListeners = true;
      }
      updategamemenu();
      break;
    case "lobby_list_menu":
      if (!lobbyMenu) {
        startLobbyMenu();
        lobbyMenu = true;
      }
      updateLobbyMenu();
      break;
    case "create_lobby_menu":
      if (!createLobbyMenu) {
        startCreateLobbyMenu();
        createLobbyMenu = true;
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
      }
      updateLobbyWaitRoom();
      break;
    case "pause_menu":
      break;
  }
//console.log(gameState);
}
