let leftPosX = [];
let leftPosY = [];
let rightPosX = [];
let rightPosY = [];
let printRx = [];
let printRy = [];
let x = 0;
let y = 0;
let leftTime = 0;
let rightTime = 0;
let leftTrigger = true;
let rightTrigger = false;
let canvaX;
let canvaY;
let windowX, windowY;
let waveX = 0;
let waveY = 0;
let rainbow = 1;
let stepSize;
let windowDistX;
let windowDistY;

function setup() {
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container");
  background(225);
  noStroke();
  canvaX = 400;//random(0, width - 300);
  canvaY = 200;//random(0, height - 200);
  windowX = 200;//random(0, width - 200);
  windowY = 200;//random(0, height - 300);
  stepSize = 15;

}

function draw() {
  //console.log(i % 2);
  //frameRate(2);
  background(220);
   
  push();
  fill(0);
  rect(canvaX, canvaY, 300, 200);
  pop();
  let canvaDist = dist(canvaX + 150, canvaY + 100, mouseX, mouseY);
  windowDistX = dist(windowX,windowY,windowX,mouseY)
  windowDistY = dist(windowX,windowY,mouseX,windowY)
  //circle(x,y,10);
  
  drawWindow();

  x = lerp(x, mouseX, 0.05);
  y = lerp(y, mouseY, 0.05);
  if (millis() - leftTime > 150) {
    storeLeftPos();
    leftTime = millis();
    // leftTrigger = false;
    // rightTrigger = true;
  }
  if (millis() - rightTime > 150) {
    storeRightPos();
    rightTime = millis();
    // rightTrigger = false;
    // leftTrigger = true;
  }
  if (leftTrigger == true) {
    leftStep();
    leftTrigger = false;
    rightTrigger = true;
  }
  if (rightTrigger == true) {
    rightStep();
    rightTrigger = false;
    leftTrigger = true;
  }

  if (canvaDist <= 100) {
    leftTrigger = false;
    rightTrigger = false;
    painting();
  } else {
    leftTrigger = true;
    rightTrigger = true;
  }
  
}

function storeLeftPos() {
  leftPosX.push(x);
  leftPosY.push(y);
  if (leftPosX.length > 5) {
    leftPosX.splice(0, 1);
    leftPosY.splice(0, 1);
  }
}

function storeRightPos() {
  rightPosX.push(x);
  rightPosY.push(y);
  if (rightPosX.length > 5) {
    rightPosX.splice(0, 1);
    rightPosY.splice(0, 1);
  }
}

function leftStep() {
  for (i = 0; i < leftPosX.length; i++) {
    fill(150, 45 * i);
    noStroke();
    // let leftFrontX = leftPosX[i];
    // let leftX = leftPosX[i-1];
    // let leftFrontY = leftPosY[i];
    // let leftY = leftPosY[i-1];
    // let angleX = leftFrontX-leftX;
    // let angleY = leftFrontY-leftY
    // let stepAngle = atan2(angleY, angleX);
    push();

    translate(leftPosX[i], leftPosY[i]);
    // let angle = map(sin(frameCount*0.1), -1, 1, -PI/10, PI/10);
    // rotate(angle);
    //rotate(stepAngle);
    //circle(leftPosX[i],leftPosY[i],10);

    circle(stepSize, 0, stepSize);

    pop();
  }
  // leftTrigger = false;
  //   rightTrigger = true;
}

function rightStep() {
  for (i = 0; i < rightPosX.length; i++) {
    fill(150, 45 * i);
    noStroke();

    push();

    translate(rightPosX[i], rightPosY[i]);
    // let angle = map(sin(frameCount*0.1), -1, 1, -PI/10, PI/10);
    // rotate(angle);
    circle(-stepSize, 0, stepSize);
    pop();
  }
  // rightTrigger = false;
  //   leftTrigger = true;
}

function painting() {
  //console.log("yes");
  push();
  translate(canvaX + 50, canvaY);
  let sinX = sin(waveX);
  let cosY = cos(waveY);

  let noiseX = noise(0.1 * frameCount);
  let noiseY = noise(0.1 * frameCount);
  let offsetX = map(noiseX, 0, 1, 0, 60);
  let offsetY = map(noiseY, 0, 1, 0, 60);

  let Rx = map(sinX, -1, 1, -offsetX, 200 + offsetX);
  let Ry = map(cosY, -1, 1, 60 - offsetY, 140 + offsetY);

  printRx.push(Rx);
  printRy.push(Ry);
  waveX += 0.01;
  waveY += 0.01;
  if (printRx.length > 50) {
    printRx.splice(0, 1);
    printRy.splice(0, 1);
  }

  colorMode(HSL);
  let c = color(rainbow, 100, 50);
  stroke(c);
  noFill();
  for (let i = 0; i < printRx.length; i++) {
    circle(printRx[i], printRy[i], 15);
  }
  rainbow = rainbow + 1;
  if (frameCount % 360 == 1) {
    rainbow = 0;
  }
  pop();
}

function drawWindow(){
  push()
  translate(windowX,windowY)
  push()
  rectMode(CENTER);
  fill(179, 137, 93)
  rect(0,0,200,300)
  fill(116, 219, 237)//天蓝
  rect (0,0,150,250)
  pop()
  stroke(179, 137, 93)
  strokeWeight(7)
  //left
  line(-40,-100,-40,100)
  line(-40,-100,-75,-125)
  line(-40,100,-75,125)
  //right
  line(40,-100,40,100)
  line(40,-100,75,-125)
  line(40,100,75,125)
  
  pop();
  if(windowDistX <=150&&windowDistY <=100){
     stepSize= map(windowDistX,0,150,40,15)
  }else{
    stepSize = 15;
  }
}