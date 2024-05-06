let horseFrames = []; // array that will hold 9 images

let horse1;

let microphone;
function preload(){
  for(let i = 0; i < 9; i++){
    let imgPath = "muybridge/muybridge_" + i + ".jpg";
    console.log(imgPath);
    let currentIMG = loadImage(imgPath);
    horseFrames.push(currentIMG)
  }
  console.log(horseFrames)
}

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
 

  horse1 = new Horse(0, height/2, 0.2, horseFrames);

  microphone= new p5.AudioIn();
  microphone.start();
}
function draw() {
  background(220);
  horse1.update();
  horse1.display();
  let micLevel = microphone.getLevel();
  text(micLevel, 80, 30);
  if(micLevel > 0.2 && horse1.running == false){
    horse1.start();
  }
}

class Horse{
  constructor(startX, startY, s, frames){
    this.x = startX;
    this.y = startY;
    this.scaleFactor = s;
    this.speed = random(1, 5);
    this.frames = frames; // [img1, img2, img3, img4, ....]
    this.currentFrame = 0;
    this.running = false;
  }
  update(){
    // if we haven't rached the finish line
    if(this.x < width && this.running == true){
      this.x+=this.speed;

      // makes the frames move
      this.currentFrame++;
      if(this.currentFrame > 8){
        this.currentFrame = 0;
      }
    }

    
    
    
  }
  display(){
    push();
    translate(this.x, this.y);
    scale(this.scaleFactor);

    
    let currentIMG = this.frames[this.currentFrame]
    image(currentIMG, -currentIMG.width/2, -currentIMG.height/2)
    rect(-20, -10, 40, 20);
    pop();
  }
  start(){
    
      this.running = true
    

  }
}

// function mousePressed(){
//   horse1.start();
// }
