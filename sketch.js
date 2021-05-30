var bg,bgImage;
var rocket,rocketImage;
var enemy1,enemy2,enemy3;
var fighterplane;
var bullet, bulletImg;
var enemygroup;
var score = 0;
var bulletGroup;
var explosion;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var restart, restartImg, gameover, gameoverImg;
var explosionSound, gunshotSound, edges;

function preload(){
  bgImage = loadImage("background2.jpg")
  rocketImage = loadImage("playerplane (1).png")
  enemy1 = loadImage("fighterplane.png")
  enemy2 = loadImage("fighterplane2.png")
  enemy3 = loadImage("fighterplane3.png")
  bulletImg = loadImage("bullet.png");
  explosion = loadImage("explosion (1).png")
  restartImg = loadImage("Restart.png")
  gameoverImg = loadImage("Gameover (1).png")
  explosionSound = loadSound("explosion.mp3")
  gunshotSound = loadSound("gunshot.mp3")
}

function setup() {
  createCanvas(600, 600);
  bg = createSprite(25,300,400,400);
  bg.addImage("bg",bgImage);
  bg.scale=1;
 
   rocket = createSprite(300,520,50,50);
  rocket.addImage(rocketImage);
  rocket.scale = 0.6;
  enemygroup = new Group();
  bulletGroup = new Group();
  gameover = createSprite(300,250,80,50)
  gameover.addImage("gameover",gameoverImg)
  gameover.scale = 0.2;
  restart = createSprite(300,330,80,50)
  restart.addImage("restart",restartImg)
  restart.scale = 0.3;
  edges=createEdgeSprites();
}

function draw() {
  background("purple");
  if(gameState === PLAY){
   gameover.visible = false;
    restart.visible = false;
     bg.velocityY=2;
  if(keyDown("left_arrow")){
    rocket.x=rocket.x -6;
    }
  if(keyDown("right_arrow")){
    rocket.x=rocket.x +6;
  }
  
 
    if(bg.y>525){
    bg.y=300;
  }
  if(keyDown("space")){
    createBullets();
  }
  if(bulletGroup.isTouching(enemygroup)){
    enemygroup.destroyEach();
    bulletGroup.destroyEach();
    score = score +1;
    gunshotSound.play();
    
  }
  spawnEnemy();
   
    
    if(enemygroup.isTouching(rocket)){
      gameState = END;
      explosionSound.play();
      
}}
    if(gameState===END){
      gameover.visible = true;
      restart.visible = true;
      bg.velocityY = 0;
      fighterplane.velocityY=0;
      rocket.addImage(explosion);
      enemygroup.destroyEach();
      if(mousePressedOver(restart)){
    reset();
  }
    }
  
  
  
  drawSprites();
  textSize(25)
  fill("pink");
  text("Score : "+score,480,50)
  
}
function reset(){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  rocket.addImage (rocketImage);
  score = 0;
}

function createBullets(){
  bullet=createSprite(100,100,20,60)
  bullet.addImage(bulletImg);
  bullet.y = 450;
  bullet.x = rocket.x;
  bullet.velocityY = -4;
  bullet.scale = 0.1;
  bulletGroup.add(bullet);
}

function spawnEnemy(){
  if(frameCount%150===0){
  fighterplane = createSprite(300,-50);
  fighterplane.velocityY = 4 +(score);
    fighterplane.x = Math.round(random(50,550))
    var rand = Math.round(random(1,3))
    switch(rand){
      case 1 :fighterplane.addImage(enemy1)
        break;
        case 2  : fighterplane.addImage(enemy2)
        break;
        case 3 : fighterplane.addImage(enemy3)
        break;
    }
    fighterplane.scale = 0.6;
    enemygroup.add(fighterplane);
    //fighterplane.debug = true;
    fighterplane.setCollider("rectangle",0,0,70,100)
  }
  
}
