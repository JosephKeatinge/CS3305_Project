/*The window.onload function and most global variables
  The gamestates are as follows:
    >main_menu
    >lobby_list_menu
    >create_lobby_menu
    >game
    >lobby
    >pause_menu*/

var gameState = "main_menu";
var mainMenuEventListeners = false;
var canvas, canvasContext;
const TILE_W = 20;
const TILE_H = 20;
const TILE_COLS = 25;
const TILE_ROWS = 25;
var socket=io();

window.onload() = function() {
  proxy=new Proxy(socket);
  canvas = document.getElementById("canvas");
  canvasContext = canvas.getContext('2d');
  mapInit();
  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);
  }

function updateAll() {
  switch(gameState) {
    case "main_menu":
      if (!mainMenuEventListeners) {
        startmainmenu();
        mainMenuEventListeners = true;
      }
      updategamemenu();
      break;
    case "lobby_list_menu":
      break;
    case "create_lobby_menu":
      break;
    case "game":
      updateGame();
    case "lobby":
      break;
    case "pause_menu":
      break;
  }
}
