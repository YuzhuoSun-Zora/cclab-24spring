/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new ZoraDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class ZoraDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:
    //..
    //..
    //..
    this.headOffset = 0;
    this.bodyOffset = 0;
    this.firstCircle;
    this.tongueRotate = -30;
    this.tongueSpeed = 1;
    this.legRotate = 20;
    this.legSpeed = 0.45;
    this.tailRotate = -110;
    this.tailSpeed = 1.5;
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.headOffset +=0.03;
    this.bodyOffset +=0.05;
    this.tongueRotate += this.tongueSpeed;
    if(this.tongueRotate>=0 || this.tongueRotate <= -30){
      this.tongueSpeed = -this.tongueSpeed;
    }
    this.legRotate -= this.legSpeed;
    if(this.legRotate>=20 || this.legRotate <= -10){
      this.legSpeed = -this.legSpeed;
    }
    this.tailRotate += this.tailSpeed;
    if(this.tailRotate<=-110 || this.tailRotate >=-70){
      this.tailSpeed = -this.tailSpeed;
    }
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);
    noStroke();
    fill("yellow");
    
    // ⬇️ draw your dancer from here ⬇️
   for(let i = 0; i<= 200; i++){
    let bodyPos = sin(0.03*i+this.bodyOffset)*15;
    circle(-100+i, bodyPos,45);
   }
   this.firstCircle = 15*sin(this.bodyOffset);
   push();
   this.drawHead(this.firstCircle-60);
   pop();
   push();
   this.drawLegs(-100,this.firstCircle,this.legRotate);
   pop();
   push();
   this.drawLegs(97,this.firstCircle,-this.legRotate-5)
   pop();
   push();

   this.drawTail(this.firstCircle,this.tailRotate)
   pop();
  //  push();
  //  this.drawTongue(15*sin(this.bodyOffset)-20,this.tongueRotate);
  //  pop();
  //  headPos = 20*sin(this.bodyOffset);
  

   




    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes()

    pop();
  }
  drawHead(headPos){
    push();
    translate(-110,headPos);
    push();
    scale(0.6);
    rotate(radians(10));
    fill("yellow");
  strokeWeight(2);
  push();
  // fill("red");
  quad(-40,-20,2,115,100,90,20,0);
  pop();
  push();
   this.drawTongue(this.tongueRotate);
   pop();
  stroke(255,200,0);
  quad(-50,0,50,0,25,60,-25,60);
  push();
  noStroke();
  ellipse(0,60,50,30)
  ellipse(0,0,100,60);
  pop();
  arc(0,60,50,30,0,PI)
  //ears
  noStroke();
  fill(255, 204, 0);
  triangle(-70,0,-30,-25,-50,70);
  triangle(70,0,30,-25,50,70);
  //eyes
  push();
  stroke(0);
  strokeWeight(1.5);
  line(-30,5,-15,5);
  line(30,5,15,5);
  pop();
  //nose
  fill(0);
  ellipse(0,60,20,10);
  pop();
  

  }

  drawTongue(tongueAngle){
    push();
    // translate(-100,tonguePos);
    rotate(radians(tongueAngle));
    noStroke();
    fill("pink");
    rect(-20,60,20,30)
    ellipse(-10,90,20,15);
    pop();
  }
  drawLegs(legsX,legsPos,legAngle){
    translate(legsX,legsPos)
    rotate(radians(legAngle))
    noStroke();
    quad(-20,10,20,10,20,40,10,40);
    quad(20,39,10,39,0,60,8,60);
    rect(-8,55,15,8,5);
  }
  drawTail(tailPos,tailAngle){
    translate(90,tailPos);
    
    rotate(radians(tailAngle));
    noFill();
    stroke("yellow");
    strokeWeight(8);
    arc(30,10,50,30,0,PI);

  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/