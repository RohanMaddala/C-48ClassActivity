var player ;
var alien;
var gameState =1
var LEVEL1=1;
var LEVEL2LOADING=2;
var LEVEL2=3;
var LEVEL3LOADING=4; 
var LEVEL3=5;
var DEAD=6;
var health=100;
var kills=0;
var alien,alienGroup;
var bulletIMG,bulletGroup;
var playerIMGlvl1,playerIMGlvl2,playerIMGlvl3;
var playerShootIMGlvl1,playerShootIMGlvl2,playerShootIMGlvl3;
var playerDeadIMGlvl1,playerDeadIMGlvl2,playerDeadIMGlvl3,playerDeadIMGlvl1_static;
var lvl2loading,lvl2loadingIMG;
var lvl3loading,lvl3loadingIMG;
var alienRunIMG,aliendeadIMG;
var bg,bgDead,bgDeadIMG;
var nextLevel,nextLevelIMG;
var playAgain,playAgainIMG;
var shootsoundlvl1,shootsoundlvl2,shootsoundlvl3;
var deadSound


function preload(){
  //background
  bg = loadImage("background.png");
  bgDeadIMG = loadImage("backgroungdeath.png")

  //Playerlvl1
  playerIMGlvl1 = loadAnimation("Level1/lvl1.png")
  playerShootIMGlvl1 = loadAnimation("Level1/lvl1_1shoot.png","Level1/lvl1_2shoot.png","Level1/lvl1_3shoot.png","Level1/lvl1_4shoot.png")
  playerDeadIMGlvl1 = loadAnimation("Level1/lvl1_dead2.png","Level1/lvl1_dead3.png","Level1/lvl1_dead4.png","Level1/lvl1_dead5.png")
  playerDeadIMGlvl1_static = loadAnimation("Level1/lvl1_dead5.png")

  //Playerlvl2
  playerIMGlvl2 = loadAnimation("Level2/lvl2.png")
  playerShootIMGlvl2 = loadAnimation("Level2/lvl2_shoot1.png","Level2/lvl2_shoot2.png","Level2/lvl2_shoot3.png","Level2/lvl2_shoot4.png")
  playerDeadIMGlvl2 = loadAnimation("Level2/lvl2_dead1.png","Level2/lvl2_dead2.png","Level2/lvl2_dead3.png","Level2/lvl2_dead4.png","Level2/lvl2_dead5.png","Level2/lvl2_dead6.png")

  //Playerlvl2
  playerIMGlvl3 = loadAnimation("Level3/lvl3.png")
  playerShootIMGlvl3 = loadAnimation("Level3/lvl3_shoot1.png","Level3/lvl3_shoot2.png","Level3/lvl3_shoot3.png","Level3/lvl3_shoot4.png","Level3/lvl3_shoot5.png")
  playerDeadIMGlvl3 = loadAnimation("Level3/lvl3_dead2.png","Level3/lvl3_dead3.png","Level3/lvl3_dead4.png","Level3/lvl3_dead5.png")

  //Alien
  alienRunIMG = loadAnimation("Alien/Alien_run1.png","Alien/Alien_run2.png","Alien/Alien_run3.png","Alien/Alien_run4.png")
  aliendeadIMG = loadAnimation("Alien/Alien_dead1.png","Alien/alien_dead2.png","Alien/alien_dead3.png","Alien/alien_dead4.png","Alien/alien_dead5.png","Alien/alien_dead6.png","Alien/alien_dead7.png")

  //bullet 
  bulletIMG = loadImage("bullet.png")

  //LEVEL2LOADING
  lvl2loadingIMG = loadImage("Level2/lvl2.png")

  //LEVEL3LOADING
  lvl3loadingIMG = loadImage("Level3/lvl3.png")

  //Nextlevel
  nextLevelIMG = loadImage("nextLevel.png") 

  //playAgain
  playAgainIMG = loadImage("playAgain.png")

  //sounds
  //lvl1
  shootsoundlvl1=loadSound("Sounds/lvl1gunSound.mp3")
  //lvl2
  shootsoundlvl2=loadSound("Sounds/lvl2&lvl3gunSound.mp3")
  //lvl3
  shootsoundlvl3=loadSound("Sounds/lvl2&lvl3gunSound.mp3")
  //dead
  deadSound=loadSound("Sounds/deathsound.mp3")

}

function setup() {
  createCanvas(displayWidth+384, displayHeight+77);
  //bgDead
  bgDead = createSprite(displayWidth/2+155, displayHeight/2)
  bgDead.addImage("dead",bgDeadIMG)
  bgDead.scale=2.5
  bgDead.visible = false;
  //player
  player = createSprite(200,height-150, 120, 200);
  //lvl1
  player.addAnimation("playerlvl1",playerIMGlvl1)
  player.addAnimation("deadlvl1",playerDeadIMGlvl1)
  player.addAnimation("shootlvl1",playerShootIMGlvl1)
  player.addAnimation("deadlvl1_static",playerDeadIMGlvl1_static)
  //lvl2
  player.addAnimation("playerlvl2",playerIMGlvl2)
  player.addAnimation("deadlvl2",playerDeadIMGlvl2)
  player.addAnimation("shootlvl2",playerShootIMGlvl2)
  //lvl3
  push()
  player.addAnimation("playerlvl3",playerIMGlvl3)
  player.addAnimation("deadlvl3",playerDeadIMGlvl3)
  player.addAnimation("shootlvl3",playerShootIMGlvl3)
  player.scale=0.7
  pop()

  //lvl2loading
  lvl2loading = createSprite(displayWidth/2-50, displayHeight/2)
  lvl2loading.addImage("lvl2loading",lvl2loadingIMG)
  lvl2loading.visible = false;

  //lvl3loading
  lvl3loading = createSprite(displayWidth/2-50, displayHeight/2)
  lvl3loading.addImage("lvl3loading",lvl3loadingIMG)
  lvl3loading.scale=0.7
  lvl3loading.visible = false;

  //playagain
  playAgain = createSprite(width/2,height/2)
  playAgain.addImage("playAgain",playAgainIMG)
  playAgain.scale=0.5
  playAgain.visible=false
  
  //nextlevel
  nextLevel = createSprite(width/2,height/2)
  nextLevel.addImage("nextlevel",nextLevelIMG)
  nextLevel.scale=0.5;
  nextLevel.visible=false

  alienGroup =new Group();
  bulletGroup = new Group();
}

function draw() {
  background(bg);  

  stroke("black")
  strokeWeight(10)
  textSize(50)
  
  if(gameState===LEVEL1){
   fill("white")
   text("KILLS : "+kills,80,50)
   text("HEALTH : "+ health,1500,50)
   text("LEVEL1",width/2-50,50)
   
    spawnAliens();

   if(kills===10){
      gameState=LEVEL2LOADING
   }

   if(alienGroup.isTouching(player)){
      health=health-1
      deadSound.play()
   }

    if(bulletGroup.isTouching(alienGroup)){
      bulletGroup.destroyEach();
      alienGroup.setLifetimeEach(0)
      kills=kills+1
    }

    if(keyWentDown("space")){
      player.changeAnimation("shootlvl1") 
      spawnBullet()
      shootsoundlvl1.play();  
    }

    if(keyWentUp("space")){
      
      player.changeAnimation("playerlvl1")
    }

    if(health<=0){
      gameState=DEAD
      player.changeAnimation("deadlvl1")
      player.changeAnimation("deadlvl1_static")
      bgDead.visible=true
    }
  }
  else if(gameState===LEVEL2LOADING){
    player.visible=false;
    lvl2loading.visible=true;
  
    nextLevel.visible=true
    
    if(mousePressedOver(nextLevel)){
      gameState=LEVEL2
      kills=0;
      health=100;
    }
  }
  else if(gameState===LEVEL2){
    fill("white")
    text("KILLS : "+kills,80,50)
    text("HEALTH : "+ health,1500,50)
    text("LEVEL2",width/2-50,50)
    lvl2loading.visible=false
    nextLevel.visible=false 
    player.visible=true;
    spawnAliens();
    player.changeAnimation("playerlvl2")
    
    if(kills===50){
      gameState=LEVEL3LOADING
    }

    if(alienGroup.isTouching(player)){
      health=health-1
      deadSound.play()
    }

    if(bulletGroup.isTouching(alienGroup)){
      
      bulletGroup.destroyEach();
      alienGroup.setLifetimeEach(0)
      kills=kills+1
    }

    if(keyWentDown("space")){
      player.changeAnimation("shootlvl2") 
      spawnBullet()
      shootsoundlvl2.play();
    }

    if(keyWentUp("space")){
      player.changeAnimation("playerlvl2")
    }

    if(health===0||health<0){
      gameState=DEAD
      player.changeAnimation("deadlvl2")
      bgDead.visible=true
    }

  }
  else if(gameState===LEVEL3LOADING){
    player.visible=false;
    lvl3loading.visible=true;
  
    nextLevel.visible=true
    if(mousePressedOver(nextLevel)){
      gameState=LEVEL3
      kills=0;
      health=100;
    }
  }
  else if(gameState===LEVEL3){
    fill("white")
    text("KILLS : "+kills,80,50)
    text("HEALTH : "+ health,1500,50)
    text("LEVEL3",width/2-50,50)
    lvl3loading.visible=false
    nextLevel.visible=false
    player.visible=true;
    spawnAliens();
    player.changeAnimation("playerlvl3")


    if(alienGroup.isTouching(player)){
      health=health-1
      deadSound.play()
    }

    if(bulletGroup.isTouching(alienGroup)){
      bulletGroup.destroyEach();
      alienGroup.setLifetimeEach(0)
      kills=kills+1
    }

    if(keyWentDown("space")){
      player.changeAnimation("shootlvl3") 
      spawnBullet()
      shootsoundlvl3.play();
    }

    if(keyWentUp("space")){
      player.changeAnimation("playerlvl3")
    }

    if(health===0||health<0){
      gameState=DEAD
      player.changeAnimation("deadlvl3")
      bgDead.visible=true
    }
  }
  else if(gameState===DEAD){
    playAgain.visible=true
    if(mousePressedOver(playAgain)){
      kills=0
      health=100
      gameState=LEVEL1
      bgDead.visible=false;
      playAgain.visible=false;
      player.changeAnimation("playerlvl1")
      alienGroup.setLifetimeEach(0)
    }
  }

  drawSprites();
}


function spawnAliens(){
  if(frameCount%40===0){
    var alien1=createSprite(width+50,height-120,100,100);
    alien1.addAnimation("runAlien",alienRunIMG)
    alien1.addAnimation("deadAlien",aliendeadIMG)
    alien1.scale=2.5;
    alien1.velocityX=-15; 
    alienGroup.add(alien1);
    //alienGroup.setAnimationEach("deadAlien")
  }
} 

function spawnBullet(){
 
 var bullet = createSprite(290,height-210, 50, 50)
 bullet.addImage("shoot",bulletIMG)
 bullet.scale=0.04
 bullet.velocityX=20
 bulletGroup.add(bullet)

}
