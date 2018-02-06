//The window.onload function and most global variables
/*mainmenu
  lobylistmenu
  createlobbymenu
  game
  lobby
  pausemenu*/

  var canvas, canvasContext;
  var socket=io();

  window.onload() = function() {
    proxy=new Proxy(socket);
    canvas = document.getElementById("canvas");
    canvasContext = canvas.getContext('2d');
    mapInit();
    var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
  }