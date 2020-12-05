var Play = 1;
var End = 0;
var gameState=Play;
var monkey , monkey_running, collidedImage;
var banana ,bananaImage, obstacle, obstacleImage;
var bg,bgImage,ground;
var FoodGroup, ObstacleGroup;
var score = 0;
var survivalTime = 0;



function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage = loadAnimation("backg.jpg","backg.jpg","backg.jpg","backg.jpg","backg.jpg","backg.jpg","backg.jpg","backg.jpg","backg.jpg","backg.jpg","backg.jpg","backg.jpg","backg.jpg","backg.jpg","backg.jpg","backg.jpg");
 collidedImage = loadAnimation("sprite_8.png");
}



function setup() {
  createCanvas(1000,400);
  
  bg = createSprite(300,50,1000,400);
  bg.addAnimation("backg_moving",bgImage);
  bg.scale = 2.3
  bg.x = bg.width/2;
  
  ground = createSprite(330,390,660,8);
  ground.visible=false;
  
  monkey = createSprite(50,340,60,40);
  monkey.addAnimation("crazy",monkey_running);
  monkey.scale = 0.15;
  
  FoodGroup = new Group();
  
  ObstacleGroup = new Group();
  
}


function draw() {
  
  if(gameState === Play){
    bg.velocityX = -(4+(3*score/5));
    
    if(bg.x < 0){
      bg.x = bg.width/2;
      }
       if(keyDown("space")&&monkey.y>200 ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnBananas();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  
    if(ObstacleGroup.isTouching(monkey)){
      
        gameState = End
    
    }
    if(gameState === End){
      reset();
    }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
  }
  
  monkey.collide(ground);
  
  spawnBananas();
  spawnObstacles();
  drawSprites();
}


function spawnBananas(){
 
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    banana.addImage(bananaImage);
    banana.scale = 0.1;   
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    FoodGroup.add(banana);
     
}
}

function spawnObstacles(){
  if(frameCount%100 === 0){
    obstacle = createSprite(600,350,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2
    obstacle.velocityX = -6;
    obstacle.lifetime = 300;
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth+1;
    ObstacleGroup.add(obstacle);
  }
}
function reset(){
  monkey.changeAnimation("collided", collidedImage)
    bg.velocityX = 0;
        monkey.velocityY = 0;
        ObstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        ObstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
  if (keyDown("r")){
    gameState = Play;
  }
  
}
