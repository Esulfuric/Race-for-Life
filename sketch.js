var PLAY = 1
var END = 0
var gameState = PLAY
var runner, runnerAnm;
var path, pathImg;
var leftWall, rightWall;
var r1;
var coin, coinImg, coinGroup;
var coins;
var leftArrow, leftArrowImage, rightArrow, rightArrowImage;


function preload(){
 // runnerAnm = loadAnimation("Runner-1.png", "Runner-2.png")
  r1 = loadAnimation("runner1.png", "runner2.png")
  pathImg = loadImage("path.png")
  bombImg = loadImage("bomb.png")
  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")
  coinImg = loadImage("coin.png")
  leftArrowImage = loadImage("left.png")
  rightArrowImage = loadImage("right.png")
}

function setup(){
  createCanvas(400,600);
  path = createSprite(200, 300, 50, 50)
  path.addImage(pathImg)
  

  runner = createSprite(200, 500, 50, 50)
  runner.addAnimation("running", r1)
  runner.scale = 0.07;
  //runner.debug = true
  runner.setCollider("rectangle",0,0,1000,1500)
  
  gameOver = createSprite(200, 300, 10, 10)
  gameOver.addImage(gameOverImg)

  restart = createSprite(200, 400, 10, 10)
  restart.addImage(restartImg)
  restart.scale = 0.3

  leftWall = createSprite(50, 300, 20, 600) 
  leftWall.visible = false
  
  rightWall = createSprite(358, 300, 20, 600)
  rightWall.visible = false 

  leftArrow = createSprite(100, 550)
  leftArrow.addImage(leftArrowImage)
  rightArrow = createSprite(300, 550)
  rightArrow.addImage(rightArrowImage)

  bombGroup = createGroup();
  coinGroup = createGroup();

  console.log("Coins: "+ coins, 500,50);
}

function draw() {
  background(0);

  if(runner.isTouching(bombGroup)){
    bombGroup.destroyEach()
    coinGroup.destroyEach()
    runner.visible = false
    gameState = END
   
  }
  if(runner.isTouching(coinGroup)){
    coinGroup.destroyEach()
    runner.visible = false
    coins = coins + 1 
  }


  if(gameState === PLAY){
  gameOver.visible = false
  restart.visible = false
  runner.collide(leftWall)
  runner.collide(rightWall)
  runner.visible = true
  path.velocityY = 6

  if (path.y > 500){
    path.y = path.width/2
  }
  
  if (keyDown("left")){
    runner.x = runner.x - 5
  }
  if (keyDown("right")){
    runner.x = runner.x + 5
  }
  
  spawnBombs()
  spawnCoins()

  if (mousePressedOver(leftArrow) || leftArrow.touches){
    runner.x = runner.x - 5
  }
  if (mousePressedOver(rightArrow)){
    runner.x = runner.x + 5
  }

  }
  else if(gameState === END){
    path.velocityY = 0
    gameOver.visible = true
    restart.visible = true
  }

  if (mousePressedOver(restart)){
    console.log("restart game")
    reset()
  }



  drawSprites()
}

function spawnBombs(){
  if (frameCount % 120 === 0){
    var bomb = createSprite(random(100,300),0,10,40);
    bomb.scale = 0.1
    bomb.velocityY = 6
    bomb.addImage(bombImg)
   // -(8 + score/100)
   bomb.depth = runner.depth
   runner.depth = runner.depth + 1
   bombGroup.add(bomb)
  }
}
function spawnCoins(){
  if (frameCount % 100 === 0){
    var coin = createSprite(random(100,300),0,10,40);
    coin.scale = 0.3
    coin.velocityY = 8
    coin.addImage(coinImg)
    coin.depth = runner.depth
    coin.depth = runner.depth + 1
    coinGroup.add(coin)
  }
}
function reset(){
  gameState = PLAY
}
