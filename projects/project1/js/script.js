"use strict";

/**************************************************
Project 1
By Margaret Beaumont-Savvas
**************************************************/

//position and size of our avatar
let avatarX;
let avatarY;
let avatarSize= 70;

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
let pinkdustSpeed= -5;
let pinkdustVX= 0;
let pinkdustVY= 0;

// position and size of the enemy ghost
let enemyX;
let enemyY;
let enemySize= 70;

// Speed and velocity of enemy ghosts
let enemySpeed = -5;
let enemyVX= 5;

// Adding speed and size to the enemy ghost whenever it is dodged.
let enemyAcceleration= -2;
let enemyEnlarge = 50;

//score counter for each time avatar catches a pink dust
let score = 0;

//inserting variables for backgrounds, points, avatar and enemy
let avatarghost;
let enemyghost;
let forestbackground;
let pinkdust;


//variables for title screen, game screen,ending screen and game over screen
let titleString = "ESCAPE PURGATORY";
let enterString = "PRESS ENTER TO BEGIN";
let endingString = "YOU ESCAPED!";
let refreshString = "Refresh to start again";
let gameoverString = "GAME OVER!";

//variable for out of game screen
let offscreen;

//variable for title screen
let state = `title`;

//adding preloads for avater, enemyghost,pink dust points, and backgrounds
function preload () {
  avatarghost = loadImage("assets/images/avatarghost.png");
  enemyghost = loadImage("assets/images/enemyghost.png");
  forestbackground = loadImage("assets/images/forestbackground.png");
  pinkdust = loadImage("assets/images/pink-dust.png");
  offscreen = loadImage("assets/images/offscreen.png");
}

//creating canvas and positioning the avatar, enemy ghost and pink dust
function setup() {
  createCanvas (1000, 600);

  //no stroke for a cleaner look
  noStroke();

  //text settings for title
  textSize(30);
  textAlign(CENTER, CENTER);
  textFont('Helvetic');

  //placing avatar in center
  avatarX = width/2;
  avatarY = width/2;

 //placing enemy ghost at a random coordinate
 enemyX = width;
 enemyY= random (0, height);

 //placing pink dust point at a random coordinate
 pinkdustX= width;
 pinkdustY= random (0,height);
}


// Drawing the movement of avatar, enemy, and pinkdust points.
function draw() {
  //title screeen
  if (state === `title`) {
      title();
  }
  //Mini game screen
  else if (state === `gameon`){
      gameon();
  }
  //ending screen
  else if (state === `ending`){
      ending();
 // game over screen
  }
  else if (state === `gameover`){
      gameover();
  }
}

//title screen function
  function title() {
     background(102, 119, 133);
     background (offscreen, 0, 0, width, height);
     fill(255,102,153);
     textSize(50);
     text(titleString, width /2, height /2.5);
     textSize(30);
     text(enterString, width/2, height/2);
  }

//animation for mini game
function gameon() {
  //binding keys to move avatar and setting avatar's velocity on x and y
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }
  else{
    avatarVX = 0; //default avatar x velocity to 0
  }

  //up and down
  if (keyIsDown(UP_ARROW)){
    avatarVY= -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)){
    avatarVY = avatarSpeed;
  }
  else{
    avatarVY = 0; //default avatar y velocity to 0
  }
  //moving avatar based on the velocity
  avatarX= avatarX + avatarVX;
  avatarY= avatarY+ avatarVY;

  //if avatar ghost and enemy ghost hit each other, player loses
   if (dist(enemyX,enemyY, avatarX, avatarY)
       < enemySize/2 + avatarSize/2) {
        //player loses
        console.log ("GAME OVER!");
        //reset enemy position
        enemyX = width;
        enemyY = random (0,height);
        //reset enemy size and Speed
        enemySpeed= -5;
        enemySize= 50;
        //avatar resest
        avatarX = width/2;
        avatarY = height/2;
        // pink dust resets
        pinkdustX = width;
        pinkdustY = random (0,height);
        //score resets
        score = 0;
        //reset to title screeen
        state = `gameover`;
       }
       // enemy moves at enemy Speed and positions enemy based on velocity
       enemyVX = enemySpeed;
       enemyX = enemyX + enemyVX;

    // if avatar and pink dust overlap, pink dust resets and avatar stays
    // in current position.
    if (dist(pinkdustX,pinkdustY, avatarX, avatarY)
           < pinkdustSize/2 + avatarSize/2) {
            // point achieved!
            console.log("POOF!");
            score= score +1;
            //reset pink dust position
            pinkdustX = width;
            pinkdustY = random (0,height);
            //reset pinkust
            pinkdustSpeed= -5;
            pinkdustSize= 50;
           }
           //pink dust moves at pink dust speed and positions based on velocity
           pinkdustVX = pinkdustSpeed;
           pinkdustX = pinkdustX + pinkdustVX;

  //avatar off screen is also a "GAME OVER!"
   if (avatarX < 0 || avatarX > width || avatarY < 0 ||
      avatarY > height) {
        //off screen is losing the same way
        console.log("GAME OVER!");
        enemyX = width;
        enemyY= random (0,height);
        //reset the avatar
        avatarX= width/2;
        avatarY= height/2;
        //reset the pink pinkdust
        pinkdustX = width;
        pinkdustY= random(0,height);
        //reset the score counter
        score = 0;
        // brings you to gameover screen
        state = `gameover`;
      }

    // whenever enemy moves all the way across the screen,
    //speed and size of enemy increases
    if (enemyX < 0) {
       enemyX = width;
       enemyY = random(0,height);
       //with each dodge, the enemy's speed and size increases
       enemySpeed += enemyAcceleration;
       enemySize += enemyEnlarge;
      }
    //pink dust remains the same
    if (pinkdustX < 0) {
        pinkdustX = width;
        pinkdustY = random(0,height);
        }

    //When avatar collects 6 points, you win!
    if (score == 6){
        console.log("YOU WIN");

        //moving pink dust off screen
        pinkdustX = width + 100;
        pinkdustSpeed = 0;
        //moving enemy off screen
        enemyX = width + enemySize;
        enemySpeed = 0;
        //"YOU ESCAPED!" end game title screen
        state = `ending`;
        // resetting score to 0
        score = 0 ;
      }

      //Display background, avatar, enemy and points image
     image(forestbackground, 0, 0, width, height);
     image(pinkdust, pinkdustX, pinkdustY, pinkdustSize, pinkdustSize);
     image(avatarghost, avatarX, avatarY, avatarSize, avatarSize);
     image(enemyghost, enemyX, enemyY, enemySize, enemySize);

     //number of successful pink dust collected. Score is in pink and centered
     //on the top of screen
     console.log("score");
     fill(0);
     text(score, width/2, height/8);
     textFont('Helvetic');
     textAlign(CENTER,TOP);
     textSize(70);
     }

  // function for ending screen. off screen background with text
  //explaining you win and to refresh to begin again.
  function ending() {
    background(141, 181, 214);
    background (offscreen, 0, 0, width, height);
    fill(255,102,153);
    textFont('Helvetic');
    textSize(50);
    text(endingString, width/2, height/2.5);
    textSize(30);
    text(refreshString, width/2, width/2.5);
    textAlign(CENTER,CENTER);
    }

  // function for game over screen. Off screen with text saying
  //game over and to restart by refreshing
  function gameover (){
    background(102, 119, 133);
    background (offscreen, 0, 0, width, height);
    fill(255,102,153);
    textFont('Helvetic');
    textSize(50);
    text(gameoverString, width/2, height/2.5);
    textSize(30);
    text(refreshString, width/2, width/2.5);
    textAlign(CENTER,CENTER);
  }

 // press ENTER to begin game
  function keyPressed(){
    if (state ===`title`) {
      state = `gameon`;
    }
  }
