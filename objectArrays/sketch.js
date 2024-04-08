//          e1    e2    e3
let xArray = [50, 120, 290];
let yArray = [130, 300, 80];
let numEggs = 2;
// let egg1;
// let egg2;

let basket = []
let readInstruction = false;

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  background(220);
  // egg1 = new egg(random(width),random(height));
  // egg2 = new egg(random(width),random(height));
  for(let i = 0; i < numEggs; i++){
    basket.push(new egg(random(width),random(height)));
  // basket [i] = new egg(random(width),random(height));
  // basket [1] = new egg(random(width),random(height));
  }
  
}

function draw() {
  background(120, 90, 230);
  // egg1.display();
  // egg2.display();
  // for(let i = 0; i < xArray.length; i++){
  //   let xPos = xArray[i]
  //   drawShape(xPos, yArray[i]);
  // }
  // if(mouseIsPressed){
  //   basket.push(new egg(mouseX,mouseY));
  //   console.log("yes");
  // }
  for(let i = 0; i< basket.length; i++){
    basket[i].update();
    basket[i].display();
  }

  if(readInstruction == false){
    textAlign(CENTER);
    text("Press to lay eggs",width/2,height/2)
  }
  
  
}
function mousePressed(){
  basket.push(new egg(mouseX,mouseY));
  readInstruction = true;
}


class egg{
  constructor(startX,startY){
    this.x = startX;
    this.y = startY;
    this.s = random(0.3,1);
    this.speedX = random(-1,1);
    this.speedY = random(-1,1);
    this.showYolk = true;
    this.randomDraw = random(100);
  }
  update(){
    this.x+= this.speedX;
    this.y+= this.speedY;
    if(this.x<0 || this.x > width){
      this.speedX = -this.speedX;
      this.showYolk = !this.showYolk;
    }
    if(this.y<0 || this.y > height){
      this.speedY = -this.speedY;
      this.showYolk = !this.showYolk;
    }
  }
  display(){
    push();
    translate(this.x,this.y);
    scale(this.s)
    noStroke();
    fill(255, 200);
    arc(0, 0, 80, 80, 0, PI);
    arc(0, 0, 80, 130, PI, 2*PI);
    if(this.showYolk == true){
      if(this.randomDraw <=5){
        fill("green");
      }else{
      fill(255, 164, 0);
      }
      circle(0, 0, 40);
    }
    
  pop();
  }
}