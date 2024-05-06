let faces = [];
let numFaces = 4;
function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  for (let i = 0; i < numFaces; i++) {
    faces.push(new Face(random(width),
      random(height)));
  }
}
function draw() {
  background(180);
  for (let i = 0; i < faces.length; i++) {
    faces[i].update();
    faces[i].display();
  }


  // if(millis()>3000){
  //   for (let i = 0; i < faces.length; i++) {
  //     faces[i].turnAngry()
  //   }
  // }

  for(let i = faces.length - 1; i >=0; i--){
    if(faces[i].alive == false){
      faces.splice(i,1)
    }
  }
}
class Face {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.dia = 50;
    this.offsetX = 0;
    this.normalColor = color(220, 250, 90);//yellow
    this.angryColor = color(255,20,20);//red
    this.c = this.normalColor
    this.oscillationOffset = random(2*PI)
    this.speedFactor = random(0.1,0.3)

    this.frameAtBirth = frameCount;
    this.age = 0;
    this.ageToTurnAngry = int(random(300,600));
    this.alive = true
  } update() {
    this.offsetX = map(sin((frameCount+this.oscillationOffset) * this.speedFactor), -1, 1, -20, 20);
    this.age = frameCount - this.frameAtBirth
    //turn angry at age:
    // if(this.age >this.ageToTurnAngry){
    //   this.turnAngry();
    // }
  }
  display() {
    push();
    translate(this.x + this.offsetX, this.y);
    noStroke();

    fill(this.c);
    circle(0, 0, this.dia);
    fill(0);
    circle(-10, -10, 5)
    circle(10, -10, 5)
    ellipse(0, 10, 8, 9)
    // text(this.frameAtBirth,10,10);
    // text(this.age,10,20);
    pop();
  }
  turnAngry(){
    this.c=this.angryColor;
  }
  checkIfMouseIsOverMe(){
    let acturalX = this.x + this.offsetX;
    let distance = dist(acturalX,this.y,mouseX,mouseY)
    if(distance<this.dia/2){
      this.turnAngry();
      this.alive = false;
    }
  }
}

function mousePressed(){
  // for (let i = 0; i < faces.length; i++) {
  //   faces[i].turnAngry()
  // }
  for (let i = 0; i < faces.length; i++) {
      //each face should check if it was clicked
      faces[i].checkIfMouseIsOverMe()
    }


}

function keyPressed(){
  faces.push(new Face(random(width),random(height)));
}