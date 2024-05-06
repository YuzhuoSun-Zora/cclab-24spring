
let confettis = [];
let numConfetti = 50;

let backgroundHue;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("canvasContainer");

  colorMode(HSB);
  
  for(let i = 0; i < numConfetti; i++){
    confettis.push(new Confetti(width/2, height/2))
  }

  backgroundHue = 0;
 
  
}

function draw() {
  background(backgroundHue, 10, 190);

  // if(mouseIsPressed == true){
  //   confettis.push(new Confetti(mouseX, mouseY));
  // }
  
  

  // console.log(confettis.length)
  for(let i = 0; i < confettis.length; i++){
    confettis[i].update();
    confettis[i].display();
  }

  // while(confettis.length > 3000){
  //   let index = 0;
  //   let numElementsToCut = 1;
  //   confettis.splice(index, numElementsToCut);
  // }


  for(let i = confettis.length-1; i >= 0; i--){
    if(confettis[i].isOnCanvas == false){
      confettis.splice(i, 1);
    }
  }
  
  
}

class Confetti{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.size = random(3, 10);
    
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);  
    
    this.c = color(random(255), 255, 255);

    this.isOnCanvas = true;
  }
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;

    // gravity effect on y speed
    this.speedY += 0.1;

    this.speedX *= 0.99;

    if(this.y > height+100){
      this.isOnCanvas = false;
    }

  }
  display(){    
    push();
    translate(this.x, this.y);

      fill(this.c);
      noStroke();
      circle(0, 0, this.size);
      // text(this.isOnCanvas, 0, 0)
   
    pop();
  }

}

function fireConfetti(){
  for(let i = 0; i < numConfetti; i++){
    confettis.push(new Confetti(width/2, height/2))
  }
}

function mousePressed(){
  // fireConfetti()
  // for(let i = 0; i < numConfetti; i++){
  //   confettis.push(new Confetti(mouseX, mouseY))
  // }

  // console.log(confettis.length)

}


let triggerText = document.getElementById("accusamus");
console.log(triggerText);
//element     method        what to listen to ? what to do then
triggerText.addEventListener("click", fireConfetti);

let myRange = document.getElementById("myRange")
console.log(myRange)
function readRange(){
console.log(myRange.value);
backgroundHue = map(myRange.value,0,100,0,255)
}
myRange.addEventListener("input",readRange);
