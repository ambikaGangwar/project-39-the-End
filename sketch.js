var p1, p2, asteroid1, asteroid2, asteroid3;
var blast, blastImage, space, spaceImage;
var spaceShip, spaceShipImage, laserImage;
var shoot = 0;
var score = 0;
var laser, asteroidGroup, laserGroup;
var explosionSound, laserSound, explasionImage;
var intro = 0;
var play = 1;
var end = 2;
 
var gameState = intro;
var endline, canvas;


function preload() {

  spaceImage     =  loadImage("space.png");
  spaceShipImage =  loadImage("spaceship.png");
  laserImage     =  loadImage("laser.png");
  asteroid1      =  loadImage("as1.png");
  asteroid2      =  loadImage("as2.png");
  asteroid3      =  loadImage("as3.png");
  blastImage     =  loadImage("blast.png");
  explasionImage =  loadImage("blast.png");
  bg             =  loadImage("download.jpg");

}

function setup() {

  canvas = createCanvas(1000, 700);
  space = createSprite(250, 350, 30, 20);
  space.addImage(spaceImage);
  space.velocityY = (5 + score / 10);

  spaceShip = createSprite(250, 600);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.6;
   

  p1 = createSprite(250, 600);
  //p1.debug = true;
  p1.setCollider("rectangle", 70, -27, 5, 265, 156);
  p1.visible = false;
  p2 = createSprite(250, 600);
  p2.setCollider("rectangle", -70, -27, 5, 265, 24);
  //p2.debug = true;
  p2.visible = false;

  asteroidGroup = new Group;
  laserGroup = new Group;

  endline = createSprite(250, 700, 500, 5);
  endline.visible = false;

}

 

function draw() {
  //
  background(0);

  
  if (gameState === intro) {
    background(bg);

    stroke(0,0,51);
    fill(0,0,51);
    textFont("Helvetica")
    textSize(40);
    text("**YOUR PLANET NEEDS YOU! **", canvas.width / 2 - 300, canvas.height / 2 - 300);
    text("ENJOY THE GAME!", canvas.width / 2 - 300, canvas.height / 2 + 100);
 
    stroke(51, 0, 51)
    fill(51, 0, 51);
    textSize(35);
    textFont("Apple Chancery");
    text("YOU ARE IN THE YEAR 2100", canvas.width / 2 - 300, canvas.height / 2 - 250);
    text(" Some asteroids are coming towords Earth.", canvas.width / 2 - 300, canvas.height / 2 - 210);
    text("  YOU ARE A SPACE FIGHTER ", canvas.width / 2 - 300, canvas.height / 2 - 170);
    text("  BE THE BEST FIGHTER YOU CAN BE ", canvas.width / 2 - 300, canvas.height / 2 - 130);

    noStroke();
    fill("white")
    text("  PRESS 'SPACE KEY' TO SHOOT ", canvas.width / 2 - 300, canvas.height / 2 - 90);
    text("  USE RIGHT & LEFT ARROWS TO MOVE ", canvas.width / 2 - 300, canvas.height / 2 - 50);
    text("  PRESS 's' to START GAME ", canvas.width / 2, canvas.height / 2 - 10);

   
    if (keyDown("s")) {
      gameState = play;
     
    }
 

     
  }

  if (gameState === play) {
    // console.log(frameCount);

    if (space.y > 800) {
      space.y = 300;
    }

    shoot = shoot - 1;

    if (keyDown("space") && shoot < 460) {
      laser = createSprite(spaceShip.x, spaceShip.y - 130);
      laser.addImage(laserImage);
      laser.velocityY = -8;
      laser.scale = 0.7;
      laserGroup.add(laser);
       
      //camera.position.x=laser.position.x;
      //camera.position.y=laser.position.y;
      //console.log(laser.x);
      shoot = laser.y;
    }

    if (keyDown("right") && spaceShip.x < 1400) {

      spaceShip.x = spaceShip.x + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;

    }

    if (keyDown("left") && spaceShip.x > 50) {

      spaceShip.x = spaceShip.x - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;

    }

    if (asteroidGroup.isTouching(p2) || asteroidGroup.isTouching(p1)) {

      asteroidGroup.destroyEach();
      var blast = createSprite(spaceShip.x, spaceShip.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
     // explosionSound.play();
      spaceShip.destroy();
      gameState = end;

    }

    if (asteroidGroup.isTouching(laserGroup)) {

      asteroidGroup.destroyEach();
      laserGroup.destroyEach();
      //explosionSound.play();
      score = score + 1;

    }

    asteroids();
    drawSprites();

    stroke("white");
    fill("white");
    textSize(30);
    text("score : " + score, 210, 60)

    if (asteroidGroup.isTouching(endline)) {

      asteroidGroup.destroyEach();
      gameState = end;

    }

  }


  else if (gameState === end) {

    space.velocityY = 0;


    stroke("yellow");
    fill("white");
    textSize(40);
    text("GAME OVER!", canvas.width / 2 - 400, canvas.height / 2);
    text("The asteroids destroyed the planet", canvas.width / 2 - 400, canvas.height / 2 + 100);
    text("Your final score:" + score, canvas.width / 2 - 400, canvas.height / 2 + 200);
    text("TO RESET YOUR GAME PRESS 'r' ", canvas.width / 2 - 400, canvas.height / 2 + 300);

    if (keyDown("r")) {
      setup();
      gameState = play;
      score=0;
    }
  }

 //
}

 
function asteroids() {

  if (frameCount % 110 === 0) {

    var asteroid = createSprite(Math.round(random(50, 1350)), -20);
    asteroid.velocityY = (6 + score / 10);
    asteroid.lifetime = 200;
    asteroid.scale = random(0.4, 0.5);
    //asteroid.debug = true;

    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1: asteroid.addImage(asteroid1);
        asteroid.setCollider("circle", -80, 10, 160);
        break;
      case 2: asteroid.addImage(asteroid2);
        asteroid.setCollider("circle", 50, 0, 150);
        break;
      case 3: asteroid.addImage(asteroid3);
        asteroid.setCollider("circle", 0, 0, 170)
      default: break;
    }

    //console.log(asteroid.x);
    asteroidGroup.add(asteroid);
  }

}
 