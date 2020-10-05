var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var survivalTime=0;
var ground;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  createCanvas(600,600);
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.x=ground.width/2;
  console.log(ground.x);
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
}

function draw() {
  
  background("turquoise");
  if(gameState===PLAY){
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
    ground.velocityX=-5;
    monkey.setCollider("circle",20,20,300);
    
    if(keyDown("space")&&(monkey.y>310)){
      monkey.velocityY=-14;
  }
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score++;
    }
  
    if(ground.x>0){
      ground.x=400;
  }
    obstacles();
    food();
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate());
    text("Survival Time: "+survivalTime,100,50);
}
  if(gameState===END){
    monkey.destroy();
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
  }
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,500,50);
  
  drawSprites();
}
function obstacles(){
  if(frameCount % 300===0){
    obstacle = createSprite(630,320,50,50);
    obstacle.velocityX=-5;
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale=0.15;
    obstacle.lifetime=630;
    obstacle.setCollider("circle",-20,0,230);
    obstacleGroup.add(obstacle);
  }
}

function food(){
  if(frameCount % 160 === 0){
    banana = createSprite(630,random(120,200));
    banana.velocityX=-5;
    banana.addImage("banana", bananaImage);
    banana.scale=0.15;
    banana.lifetime=630;
    FoodGroup.add(banana);
  }
}