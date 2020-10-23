"use strict";

/**************************************************
Project 1
By Margaret Beaumont-Savvas
**************************************************/

//position and size of our avatar
let avatarX;
let avatarY;
let avatarSize= 80;

//speed and velocity of our avatar
let avatarSpeed= 10;
let avatarVX= 0;
let avatarVY= 0;

//pink dust for the point system
//positioning and size
let pinkdustX;
let pinkdustY;
let pinkdustSize = 50;

//speed and velocity of the pink pinkdust
let pinkdustSpeed= 5;
let pinkdustVX= 0;
let pinkdustVY= 0;

// position and size of the enemy ghost
let enemyX;
let enemyY;
let enemySize= 50;

// Speed and velocity of enemy ghosts
let enemySpeed = 100;
let enemyVX= 5;

// Adding speed and size to the enemy ghost whenever it is dodged.
let enemyAcceleration= 1;
let enemyEnlarge = 100;

//score counter for each time avatar catches a pink dust 
let score = 0

//creating the main avatar (you), the enemy ghost, pink dust points and background
let avatarghost;
let enemyghost;
let spookybackground;
let pinkdust;

//adding preloads for avater, enemyghost, spookybackground and pink dust points
function preload () {
  avatarghost = loadImage("assets/images/avatarghost.png");
  enemyghost = loadImage("assets/images/enemyghost.png");
  spookybackground = loadImage("assets/images/spookybackground.jpg");
  pinkdust = loadImage("assets/images/pink-dust.png");
}

//creating canvas and positioning the avatar, enemy ghost and pink dust
function setup() {
  createCanvas (1000,700);

  //placing avatar in center
  avatarX = width/2;
  avatarY = width/2;

 //placing enemy ghost at a random coordinate
 enemyX = 0;
 enemyY= random (0, height);

 //placing pink dust point at a random coordinate
 pinkdustX= 0;
 pinkdustY= random (0,height);

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

  //pink dust moves at pink dust speed and positions based on velocity
  pinkdustVX = pinkdustSpeed;
  pinkdustX = pinkdustX + pinkdustVX

  //if avatar ghost and enemy ghost hit each other, player loses
   if (dist(enemyX,enemyY, avatarX, avatarY)
       < enemySize/2 + avatarSize/2) {
        //player loses
        console.log ("GAME OVER!");
        //reset enemy position
        enemyX = 0;
        enemyY = random (0,height);
        //reset enemy size and Speed
        enemySpeed=5;
        enemySize= 50;
        //avatar resest
        avatarX = width/2;
        avatarY = height/2;
        // pink dust resets
        pinkdustX = 0;
        pinkdustY = random (0,height);
       }

    // if avatar and pink dust overlap, pink dust resets and avatar stays
    // in current position.
       if (dist(pinkdustX,pinkdustY, avatarX, avatarY)
           < pinkdustSize/2 + avatarSize/2) {
            // point achieved!
            console.log("Poof!");
            score= score +1
            //reset pink dust position
            pinkdustX = 0;
            pinkdustY = random (0,height);
            //reset pinkust
            pinkdustSpeed=5;
            pinkdustSize= 50;
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
        score = 0;
      }
    // whenever enemy moves all the way across the screen,
    //update the counter and reposition a new enemy
    if (enemyX > width) {
       enemyX = 0;
       enemyY = random(0,height);
       //with each dodge, the enemy's speed and size increases
       enemySpeed += enemyAcceleration;
       enemySize += enemyEnlarge;
       //reset pink dust
       pinkdustX= 0;
       pinkdustY= random(0,height);
      }

  //Display background, avatar, enemy and points image
   image(spookybackground, 0, 0, width, height);
   image(pinkdust, pinkdustX, pinkdustY, pinkdustSize, pinkdustSize);
   image(avatarghost, avatarX, avatarY, avatarSize, avatarSize);
   image(enemyghost, enemyX, enemyY, enemySize, enemySize);


 //number of successful dodges displayed. Score is in pink
   console.log(score);
   fill(255,102,153);
   text(score, width/2-20, height/40, width/2, height/15);


}
