var canvas;
var context;
var images = {};
var totalResources = 9;
var numResourcesLoaded = 0;
var fps = 30;
var charX = 245;
var charY = 185;
var breathInc = 0.1;
var breathDir = 1;
var breathAmt = 0;
var breathMax = 2;
var breathInterval = setInterval(updateBreath, 1000 / fps);
var numFramesDrawn = 0;
var curFPS = 0;
var jumping = false;

function updateFPS() {

	curFPS = numFramesDrawn;
	numFramesDrawn = 0;
}
function prepareCanvas(canvasDiv, canvasWidth, canvasHeight)
{

	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width, canvas.height); // clears the canvas
	
	loadImage("leftArm");
	loadImage("legs");
	loadImage("torso");
	loadImage("rightArm");
	loadImage("head");
	loadImage("hair");		
	loadImage("leftArm-jump");
	loadImage("legs-jump");
	loadImage("rightArm-jump");

}

function loadImage(name) {

  images[name] = new Image();
  images[name].onload = function() { 
	  resourceLoaded();
  }
  images[name].src = "images/" + name + ".png";
}

function resourceLoaded() {

  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources) {
  
	setInterval(redraw, 1000 / fps);
  }
}

function redraw() {

  var x = charX;
  var y = charY;
  var jumpHeight = 45;
  
  context.clearRect(0,0,canvas.width, canvas.height); // clears the canvas

  // Draw shadow
  if (jumping) {
	drawEllipse(x + 40, y + 29, 100 - breathAmt, 4);
  } else {
	drawEllipse(x + 40, y + 29, 160 - breathAmt, 6);
  }
  
  if (jumping) {
	y -= jumpHeight;
  }

  if (jumping) {
	context.drawImage(images["leftArm-jump"], x + 40, y - 42 - breathAmt);
  } else {
	context.drawImage(images["leftArm"], x + 40, y - 42 - breathAmt);
  }
  
  if (jumping) {
	context.drawImage(images["legs-jump"], x, y- 6);
  } else {
	context.drawImage(images["legs"], x, y);
  }
	
  context.drawImage(images["torso"], x, y - 50);
  context.drawImage(images["head"], x - 10, y - 125 - breathAmt);
  context.drawImage(images["hair"], x - 37, y - 138 - breathAmt);
  
  if (jumping) {
	context.drawImage(images["rightArm-jump"], x - 35, y - 42 - breathAmt);
  } else {
	context.drawImage(images["rightArm"], x - 15, y - 42 - breathAmt);
  }
	
  drawEllipse(x + 47, y - 68 - breathAmt, 8, 8); // Left Eye
  drawEllipse(x + 58, y - 68 - breathAmt, 8, 8); // Right Eye
}

function drawEllipse(centerX, centerY, width, height) {

  context.beginPath();

  context.moveTo(centerX, centerY - height/2);

  context.bezierCurveTo(
	centerX + width/2, centerY - height/2,
	centerX + width/2, centerY + height/2,
	centerX, centerY + height/2);

  context.bezierCurveTo(
	centerX - width/2, centerY + height/2,
	centerX - width/2, centerY - height/2,
	centerX, centerY - height/2);

  context.fillStyle = "black";
  context.fill();
  context.closePath();
}

function updateBreath() { 
				
  if (breathDir === 1) {  // breath in
	breathAmt -= breathInc;
	if (breathAmt < -breathMax) {
	  breathDir = -1;
	}
  } else {  // breath out
	breathAmt += breathInc;
	if(breathAmt > breathMax) {
	  breathDir = 1;
	}
  }
}

function jump() {
	
  if (!jumping) {
	jumping = true;
	setTimeout(land, 500);
  }

}
function land() {
	
  jumping = false;

}

var yourScore = 10;
console.log("your score: " + parseFloat(yourScore));

var naturesScore = 10;
console.log("nature's score: " + parseFloat(naturesScore));

document.getElementById("playerAdvance").onclick = function() {
    jump();
    yourScore -= Math.floor(Math.random() * 3) + 1 ;
    naturesScore -= 4;
    console.log("your score: " + parseFloat(yourScore));
    console.log("nature's score: " + parseFloat(naturesScore));
    if (yourScore < 0){
        alert("You loose");
    }else if(naturesScore < 0){
        alert("You Win")
    }

}

document.getElementById("playerDefend").onclick = function() {
    yourScore += 2;
    naturesScore += Math.floor(Math.random() * 3) + 1;
    console.log("your score: " + parseFloat(yourScore));
    console.log("nature's score: " + parseFloat(naturesScore));
    if (yourScore < 0){
        alert("You loose");
    }else if(naturesScore < 0){
        alert("You Win")
    }
}


