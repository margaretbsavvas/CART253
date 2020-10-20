"use strict";

/**************************************************
Project 1
By Margaret Beaumont-Savvas
**************************************************/

//position and size of our avatar
let avatarX;
let avatarY;
let avatarSize= 50;

//speed and velocity of our avatar
let avatarSpeed= 10;
let avatarVX= 0;
let avatarVY= 0;

// position and size of the enemy ghost
let enemyX;
let enemyY;
let enemySize= 85;

// Speed and velocity of enemy ghosts
let enemySpeed = 5;
let enemyVX= 5;

//How many dodges the player has made
let dodges = 0;

// Adding speed and size to the enemy ghost whenever it is dodged.
let enemyAcceleration= 1;
let enemyEnlarge = 10;

//creating the main avatar (you), the enemy ghost, pink dust points and background
let avatarghost;
let enemyghost;
let spookybackground;

let on = false;

//adding preloads for avater, enemyghost and spookybackground
function preload () {
  avatarghost = loadImage("assets/images/avatarghost.png");
  enemyghost = loadImage("assets/images/enemyghost.png");
  spookybackground = loadImage("assets/images/spookybackground.jpg")
}

//creating canvas and positioning the avatar, enemy ghost and pink dust
function setup() {
  createCanvas (800,800);

  //placing avatar in center
  avatarX = width/2;
  avatarY = width/2;

 //placing enemy ghost at a random coordinate
 enemyX = 0;
 enemyY= random (0, height);

 //no stroke for a cleaner look
 noStroke();

 //adding text in top right corner to keep track of score
 textFont('calibri');
 textAlign(RIGHT,BOTTOM);
 textSize(32);
}


// Drawing the movement of avatar, enemy, and pinkdust points.
function draw() {
  //default avatar velocity to 0
  avatarVX = 0;
  avatarVY = 0;

  //binding keys to move avatar and setting avatar's velocity
  //left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
    console.log (avatarSpeed);
  }

  //up and down
  if (keyIsDown(UP_ARROW)){
    avatarVY= -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)){
    avatarVY = avatarSpeed;
  }

  //moving avatar based on the velocity
  avatarX= avatarX + avatarVX;
  avatarY= avatarY+ avatarVY;

  // enemy moves at enemy Speed and positions enemy based on velocity
  enemyVX = enemySpeed;
  enemyX = enemyX + enemyVX;

  //if avatar ghost and enemy ghost hit each other, player loses
   if (dist(enemyX,enemyY, avatarX, avatarY)
       < enemySize/2 + avatarSize/2) {
        //player loses
        console.log ("GAME OVER!");
        //reset enemy position
        enemyX = 0;
        enemyY = random (0,height);
        //avatar resest
        avatarX = width/2;
        avatarY = height/2;
        //reset counter
        dodges= 0;
        //reset enemy size and Speed
        enemySpeed=5;
        enemySize= 50;
       }

  //avatar off screen is also a "GAME OVER!"
   if (avatarX < 0 || avatarX > width || avatarY < 0 ||
      avatarY > height) {
        //off screen is losing the same way
        console.log("GAME OVER!");
        enemyX= 0;
        enemyY= random (0,height);
        avatarX= width/2;
        avatarY= height/2;
        dodges = 0;
      }
    // whenever enemy moves all the way across the screen,
    //update the counter and reposition a new enemy
    if (enemyX > width) {
       dodges = dodges + 1;
       console.log (dodges + "DODGES!")
       enemyX = 0;
       enemyY = random(0,height);
       //with each dodge, the enemy's speed and size increases
       enemySpeed += enemyAcceleration;
       enemySize += enemyEnlarge;
      }

  //Display background, avatar and enemy image
   image(spookybackground, 0, 0, width, height);
   image(avatarghost, avatarX, avatarY, avatarSize, avatarSize);
   image(enemyghost, enemyX, enemyY, enemySize, enemySize);

 //number of successful dodges displayed. Score is in pink
   console.log(dodges);
   fill(255,102,153);
   text(dodges, width/2-20, height/40, width/2, height/15);


}
