let kickSound;
let x = 10;
let xSpeed = 2;

function preload(){
  kickSound = loadSound("sounds/kick.mp3");
}

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");

}

function draw() {
  background(220);
  circle(x,50,50);
  x += xSpeed;
  // if(x>width||x<0){
  //   xSpeed = -xSpeed;
  //   kickSound.play();
  // }
}

function mousePressed(){
  kickSound.play();
}