// CCLab Mini Project - 9.R Particles Template

let NUM_OF_PARTICLES = 18;
let NUM_OF_RIPPLE = 4; // Decide the initial number of particles.

let particles = [];
let ripple = [];

let rippleAppear = false;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvasWrapper");
  
  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
  surface = new Surface();
  // for(let i = 0; i < NUM_OF_RIPPLE; i++){
  //   ripple[i] = new Ripple(mouseX,mouseY,random(100))
  // }
}

function draw() {
  background(128, 217, 255);

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }
  // if(mouseIsPressed){
    // rippleAppear = true
    
  
  // if(rippleAppear == true){
    // for(let i = 0; i < 4; i++){
    //   ripple[i] = new Ripple(mouseX,mouseY,10);
    // }
    for (let i = 0; i < ripple.length; i++) {
      let r = ripple[i];
      r.update();
      r.display();
    }
    if(ripple.length>4){
      ripple.splice(0,1);
    }
    // rippleAppear = false;
    // for (let i = 0; i < ripple.length; i++) {
    //   ripple[i].update();
    //   ripple[i].display();
      
    // }
  // }
  // for (let i = 0; i < ripple.length; i++) {
  //   ripple[i].update();
  //   ripple[i].display();
  // }
  // surface.display();
}

function mousePressed(){
  for(let i = 0; i < 4; i++){
    ripple[i] = new Ripple(mouseX,mouseY,random(80));
  }
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.checkIfScared();
   
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = 30;
    this.speedX = 2;
    this.speedY = 2;
    this.speedVarX = random(5000);
    this.speedVarY = random(5000);
    // this.directionX = random(0,2*PI);
    // this.directionY = random(0,2*PI);
    this.fishPosX = [];
    this.fishPosY = [];
    this.fishAngle;
    this.fishDist;
    this.c = "orange";
    this.normalSpeed = 0.0025;
    this.actualSpeed = this.normalSpeed;

  }
  // methods (functions): particle's behaviors
  update(){
    // (add)
    this.x = map(noise(this.speedVarX),0,1,-100,width+100);//this.speedX;
    this.y = map(noise(this.speedVarY),0,1,-100,height+100);//this.speedY;
    // this.speedX += map(noise(this.speedVarX),0,1,-1,1);
    // this.speedY += map(noise(this.speedVarY),0,1,-1,1);
    this.actualSpeed = lerp(this.actualSpeed, this.normalSpeed, 0.02)
    if(abs(this.actualSpeed-this.normalSpeed) < 0.001 ){
      this.c = "orange"
    }
    this.speedVarX += this.actualSpeed;
    this.speedVarY += this.actualSpeed;

    this.fishPosX.push(this.x);
    this.fishPosY.push(this.y);

    if(this.fishPosX.length>=4){
      this.fishPosX.splice(0,1);
      this.fishPosY.splice(0,1);
    }

    if(this.fishPosX.length>=3){
      this.fishDiffX = this.fishPosX[2]-this.fishPosX[1];
      this.fishDiffY = this.fishPosY[2]-this.fishPosY[1];
      this.fishAngle = atan2(this.fishDiffY,this.fishDiffX)
    }

    
  }
  display(){
    // particle's appearance
    push();
    translate(this.x, this.y+20);
    if(this.fishPosX.length>=3){
      rotate(this.fishAngle);
      }
    noStroke();
    fill(66, 114, 135, 180);
    ellipse(0,0,40,15);
    triangle(-15,0,-35,-5,-35,5)
    pop();
    push();
    translate(this.x, this.y);
    if(this.fishPosX.length>=3){
    rotate(this.fishAngle);
    }
    noStroke();
    fill(this.c)
    // circle(0, 0, this.dia);

    ellipse(0,0,40,15);
    triangle(-15,0,-35,-5,-35,5)
    pop();
  }
  checkIfScared(){
    this.fishDist = dist(mouseX,mouseY,this.x,this.y);
    if(this.fishDist<=80){
      this.c = "blue";
      this.actualSpeed = this.normalSpeed*5;
    }
  }
}

class Ripple {
  // constructor function
  constructor(startX, startY,s) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.rippleSize = s;
    this.rippleGrow = 2;
    this.rippleMax = 200;
  }
  update(){
    this.rippleSize+=this.rippleGrow;
    if(this.rippleSize>=this.rippleMax){
      this.rippleGrow = 0;
    }
    
    if(this.rippleSize>=200){
      ripple.splice(0,1);
    }
  }

  display(){
    // console.log("111")
    push();
    stroke(255);
    strokeWeight(1);
    noFill();
    translate(this.x,this.y);
    circle(0,0,this.rippleSize)
    pop()
  }
}

class Surface {
  constructor(){
    this.noiseLevel = 255;
    this.noiseScale = 0.009;
  }
  update(){

  }
  display(){
    for (let y = 0; y < height; y += 1) {
      // Iterate from left to right.
      for (let x = 0; x < width; x += 1) {
        // Scale the input coordinates.
        this.nx = this.noiseScale * x;
        this.ny = this.noiseScale * y;
        this.nt = this.noiseScale * frameCount;
  
        // Compute the noise value.
        this.c = this.noiseLevel * noise(this.nx, this.ny, this.nt);
  
        // Draw the point.
        stroke(0,0,this.c);
        point(x, y);
      }
    }
  }
}
