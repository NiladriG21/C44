var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;
var car1Img, car2Img,car3Img,car4Img,track;
var xVel,yVel;
var oilSpill,osImg;
var obstaclesGroup;
var slideSound;
var finishedPlayers = 0;
var passedFinish;

function preload(){
  track = loadImage("images/track.jpg");
  car1Img = loadImage("images/car1.png");
  car2Img = loadImage("images/car2.png");
  car3Img = loadImage("images/car3.png");
  car4Img = loadImage("images/car4.png");
  osImg = loadImage("images/f1.png")
  slideSound = loadSound("sound/sliding.mp3")
}
function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
 
  obstaclesGroup = createGroup();
  xVel = 0;
  yVel = 0;
for(var i = 0; i<5; i++){
    var w = random(200,1000);
    var h = random(-4*displayHeight,displayHeight-300)
    oilSpill = createSprite(w,h);
    oilSpill.addImage(osImg);

    obstaclesGroup.add(oilSpill)
}

  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4 && finishedPlayers === 0){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if( finishedPlayers === 4 ){
    game.update(2)
  }

  if(finishedPlayers === 4 && gameState === 2){
    game.end();
  }
}
