let leftPosX = [];
let leftPosY = [];
let rightPosX = [];
let rightPosY = [];
let creatureColor = [];
let newGenPosX = [];
let newGenPosY = [];
let x = 0;
let y = 0;
let leftTime = 0;
let rightTime = 0;
let leftTrigger = true;
let rightTrigger = false;
let windowIsOpen = false;
let canvaX;
let canvaY;
//let windowX, windowY;
let waveX = 0;
let waveY = 0;
let rainbow;
let stepSize;
// let windowDistX;
// let windowDistY;
let weather;
let cloudX1 = 200;
let cloudX2 = 350;
let rainDropX;
let rainDropY;
let stepSpeed = 0.05;
let stepDestX;
let stepDestY;
let destSinX = 0;
let destCosY = 0;
let stepColor = 255;
let stepGrow = true;
let multiply = true;
let newGenX;
let newGenY;
let life = 255;
let IsnewGenFollow = false;
let die = false;
let newGenLife = 255;
let stepIsFollow = false;
let ballX=[0,0]
let ballY=[0,0]
let multiplyDone = false;
let lightOn = false

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container")

    //1:sunny
    weather = floor(random(1, 4));
    console.log(weather);
  
    canvaX = 400; //random(0, width - 300);
    canvaY = 200; //random(0, height - 200);
    windowX = 200; //random(0, width - 200);
    windowY = 200; //random(0, height - 300);
    stepSize = 15;
    rainbow = floor(random(0, 255));
    console.log(rainbow);
  }
  
  function draw() {
   if(lightOn==false){
    beginning();
   }
    if(lightOn == true){
    background(255);
      
    drawRoom();
    if (windowIsOpen == false) {
      drawWindow();
    }
    if (windowIsOpen == true) {
      windowOpen();
    }
    //阴天时脚步向地面落
    //点击鼠标向鼠标方向快速前进
    // 风天脚步轨迹不稳
    //太阳天变大并繁殖
    if (weather == 1 && windowIsOpen == true) {
      // if(multiplyDone == false){
      sunnyInteract();
      //   multiplyDone = true;
      // }
    }
    if (weather == 3 && windowIsOpen == true) {
      rainyInteract();
    } else if (weather == 2 && windowIsOpen == true) {
      windyInteract();
    } else {
      stepDestX = mouseX;
      stepDestY = mouseY;
    }
    x = lerp(x, stepDestX, stepSpeed);
    y = lerp(y, stepDestY, stepSpeed);
  
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
      //   leftTrigger = false;
      //   rightTrigger = true;
    }
    // if (rightTrigger == true) {
    //rightStep();
    //   rightTrigger = false;
    //   leftTrigger = true;
    // }
  }
  }
  
  function storeLeftPos() {
    leftPosX.push(x);
    leftPosY.push(y);
    if (leftPosX.length > 6) {
      leftPosX.splice(0, 1);
      leftPosY.splice(0, 1);
    }
  }
  
  function storeRightPos() {
    rightPosX.push(x);
    rightPosY.push(y);
    if (rightPosX.length > 6) {
      rightPosX.splice(0, 1);
      rightPosY.splice(0, 1);
    }
  }
  
  function leftStep() {
    push();
    //console.log(leftPosX.length);
    for (i = 0; i < leftPosX.length; i++) {
      if (weather == 1 && windowIsOpen == true) {
        //push();
        colorMode(HSL);
        fill(rainbow, 100 + i * 10, 100 - i * 5, life);
        rainbow += 0.1;
        if (rainbow >= 255) {
          rainbow = 1;
        }
        //pop();
      } else {
        fill(stepColor - i * 35);
      }
      if(i==0){
        fill(255,0);
      }
      noStroke();
  
      //console.log(stepAngle);
      push();
  
      translate(leftPosX[i], leftPosY[i]);
  
      if (i >= 1) {
        let leftFrontX = leftPosX[i];
        let leftX = leftPosX[i - 1];
        let leftFrontY = leftPosY[i];
        let leftY = leftPosY[i - 1];
        let angleX1 = leftFrontX - leftX;
        let angleY1 = leftFrontY - leftY;
        let stepAngle1 = atan2(angleY1, angleX1);
  
        rotate(stepAngle1);
      }
      // let angle = map(sin(frameCount*0.1), -1, 1, -PI/10, PI/10);
      // rotate(angle);
  
      //circle(leftPosX[i],leftPosY[i],10);
      // if (i == 0) {
      //   fill(255);
      // }
      //fill(stepColor - i * 35);
      circle(0, stepSize, stepSize);
      circle(0, -stepSize, stepSize);
      pop();
    }
    // leftTrigger = false;
    //   rightTrigger = true;
    pop();
    
    // if(mouseIsPressed){
    //   textSize(50);
    //   text('🔔',mouseX,mouseY);
    // }
  }
  
  function rightStep() {
    push();
    for (i = 0; i < rightPosX.length; i++) {
      if (weather == 1 && windowIsOpen == true) {
        //push();
        colorMode(HSL);
        fill(rainbow, 100 + i * 10, 100 - i * 5);
        rainbow += 0.1;
        if (rainbow >= 255) {
          rainbow = 1;
        }
        //pop();
      } else {
        fill(stepColor - i * 35);
      }
      noStroke();
      push();
  
      translate(rightPosX[i], rightPosY[i]);
  
      if (i >= 1) {
        let rightFrontX = rightPosX[i];
        let rightX = rightPosX[i - 1];
        let rightFrontY = rightPosY[i];
        let rightY = rightPosY[i - 1];
        let angleX2 = rightFrontX - rightX;
        let angleY2 = rightFrontY - rightY;
        let stepAngle2 = atan2(angleY2, angleX2);
        rotate(stepAngle2);
      }
      // if (i == 0) {
      //   fill(255);
      // } else {
      // }
      circle(0, -stepSize, stepSize);
  
      pop();
    }
    // rightTrigger = false;
    //   leftTrigger = true;
    pop();
  }
  
  function drawRoom() {
    //console.log("yes")
    //fill(225);
    //rect(0, 0, 800, 500);
    stroke(0);
    strokeWeight(3);
    line(600, 0, 600, 400);
    line(600, 400, 0, 400);
    line(600, 400, 800, 500);
    textSize(50);
    text('🔘', 700,200);
  }
  
  function drawWindow() {
    //窗台
    push();
    fill(92, 71, 44);
    noStroke();
    rect(80, 290, 400, 30);
    pop();
    //玻璃
    push();
    noStroke();
    fill(224);
    rect(100, 80, 360, 210);
    pop();
    //反光
    strokeWeight(10);
    stroke(255);
    line(180, 100, 150, 130);
    line(170, 130, 120, 180);
    line(380, 100, 350, 130);
    line(370, 130, 320, 180);
    //窗框
    push();
    strokeWeight(8);
    stroke(92, 71, 44);
    line(100, 290, 100, 80);
    line(460, 290, 460, 80);
    line(100, 80, 460, 80);
    pop();
    //窗户
    push();
    noStroke();
    fill(92, 71, 44);
    rect(275, 80, 10, 210);
    pop();
  }
  
  function windowOpen() {
    //窗台
    push();
    fill(92, 71, 44);
    noStroke();
    rect(80, 290, 400, 30);
    pop();
    //窗外
    if (weather == 1) {
      sunny();
    }
    if (weather == 2) {
      windy();
    }
    if (weather == 3) {
      rainy();
    }
  
    //窗框
    push();
    strokeWeight(8);
    stroke(92, 71, 44);
    line(100, 290, 100, 80);
    line(460, 290, 460, 80);
    line(100, 80, 460, 80);
    pop();
  
    //打开
    push();
    strokeWeight(8);
    stroke(92, 71, 44);
    line(160, 130, 160, 250);
    line(160, 130, 100, 80);
    line(160, 250, 100, 290);
    line(400, 130, 400, 250);
    line(400, 130, 460, 80);
    line(400, 250, 460, 290);
  }
  
  function mousePressed() {
    if(mouseX>=650&&mouseX<=750&&mouseY>= 150&&mouseY<=250&&lightOn==false){
      lightOn = true
      // console.log(lightOn)
    }
    if(mouseX>=650&&mouseX<=750&&mouseY>= 150&&mouseY<=250&&windowIsOpen==true){
      lightOn = false
      leftTrigger = true;
      rightTrigger = false;
      windowIsOpen = false;
      stepGrow = true;
      multiply = true;
      IsnewGenFollow = false;
      die = false;
      stepIsFollow = false;
      multiplyDone = false;
      stepSize = 15;
      stepSpeed = 0.05;
      weather = floor(random(1, 4));
      // console.log("lightOff")
    }
  
    if (mouseX >= 100 && mouseX <= 460 && mouseY >= 80 && mouseY <= 280) {
      windowIsOpen = true;
    }
  
    //new generation
    if (weather == 1 && windowIsOpen == true && die == true) {
     
      IsnewGenFollow = true;
      if(multiplyDone == false){
      x = newGenPosX[0];
      y = 450;
        multiplyDone = true;
      } 
      text('',mouseX,mouseY);
      // stepGrow = true;
    }
  //   if(windowIsOpen == true){
  //     if(weather ==3){
  //       console.log("aaaaaaaa")
  //       text('🔔',mouseX,mouseY);
  //     }
  //   }
    
  }
  
  function sunny() {
    //sky
    push();
    noStroke();
    fill(149, 240, 252);
    rect(103, 83, 354, 207);
    pop();
    //sun
    push();
    noStroke();
    fill(252, 211, 61);
    arc(280, 83, 80, 40, TWO_PI, PI);
    pop();
    //sunlight
    push();
    noStroke();
    fill(252, 211, 61, 150);
    for (let i = 0; i < 9; i++) {
      push();
      translate(280, 83);
      rotate(radians(45 * i));
      if (i >= 5) {
        fill(0, 0);
      }
      triangle(0, 0, 120, -5, 120, 5);
      pop();
    }
    pop();
  }
  
  function windy() {
    //sky
    push();
    noStroke();
    fill(149, 240, 252);
    rect(103, 83, 354, 207);
    pop();
    //clouds
    push();
    fill(255);
    noStroke();
    // cloud on the left
    push();
    translate(cloudX1, 130);
    ellipse(0, 0, 80, 40);
    ellipse(30, 10, 90, 20);
    ellipse(-40, 10, 80, 30);
    cloudX1 += 0.8;
    if (cloudX1 > 537) {
      cloudX1 = 28;
    }
    pop();
    //cloud on the right
    push();
    translate(cloudX2, 180);
    ellipse(0, 0, 80, 40);
    ellipse(30, 10, 90, 20);
    ellipse(-40, 10, 80, 30);
    cloudX2 += 0.8;
    if (cloudX2 > 537) {
      cloudX2 = 28;
    }
    pop();
  
    pop();
  }
  
  function rainy() {
    //sky
    push();
    noStroke();
    fill(48, 67, 74);
    rect(103, 83, 354, 207);
    pop();
    //rainDrop
    push();
    strokeWeight(1);
    stroke(255);
    for (let i = 0; i <= 10; i++) {
      rainDropX = random(110, 450);
      rainDropY = random(83, 260);
      line(rainDropX, rainDropY, rainDropX, rainDropY + 20);
      // rainDropY++;
      // if(rainDropY>=260){
      //   rainDropY = 83;
      // }
    }
    pop();
  }
  
  function rainyInteract() {
    // console.log(stepIsFollow)
    let stepDist = dist(mouseX,mouseY,x,y);
    //console.log(stepDIst)
    if(stepIsFollow==false){
    stepSpeed = 0.005;
    stepDestX = x;
    stepDestY = 450;
    }
    if(stepIsFollow == true){
      stepDestX = mouseX;
      stepDestY = mouseY;
      stepSpeed = 0.08;
    }
    if (mouseIsPressed&&windowIsOpen == true) {
      stepIsFollow = true
      push();
      // noCursor();
      textSize(50);
      text("🔔",mouseX,mouseY)
      pop();
      
    }
    if(stepDist <= 20){
      stepIsFollow = false
      
    }
  }
  
  function windyInteract() {
    let noiseX = noise(0.1 * frameCount);
    let noiseY = noise(0.1 * frameCount);
    let offsetX = map(noiseX, 0, 1, 0, 80);
    let offsetY = map(noiseY, 0, 1, 0, 80);
  
    stepDestX = map(
      sin(destSinX),
      -1,
      1,
      mouseX - 100 - offsetX,
      mouseX + 100 - offsetX
    );
    stepDestY = map(
      cos(destCosY),
      -1,
      1,
      mouseY - 100 - offsetY,
      mouseY + 100 - offsetY
    );
    destSinX += 0.2;
    destCosY += 0.2;
  }
  
  function sunnyInteract() {
    if (stepGrow == true) {
      stepSize += 0.1;
      if (stepSize >= 80) {
        stepSize = 15;
        stepGrow = false;
        multiply = true;
      }
    }
    
    if (stepGrow == false) {
      creatureColor.push(rainbow);
      if (multiply == true) {
        
        newGenLife = 255;
        // for(let i = 0; i < ballX.length; i++){
        // ballY[i]++;
        // //console.log(ballY[i])
        // if(ballY[i] >= 450){
        //   ballY[i]=450
        //   life--;
        // }
        //   if (life <= 0) {
        //   die = true;
        // }
      //     if(mouseIsPressed && die == true){
      //       for(let i = 0; i < ballX.length; i++){
      //   ballX[i] = lerp(ballX[i],mouseX,0.2);
      //   ballY[i]=lerp(ballY[i],mouseY,0.2);
      //     }
      //   push();
      //       let newGenColor = creatureColor[0];
      //     noStroke();
      // fill(newGenColor, 150, 25, newGenLife);
      //     translate(ballX[i], ballY[i]);
      // circle(stepSize, 0, stepSize);
      // circle(-stepSize, 0, stepSize);
      //       pop();
      //   // drawBall(ballX[i], ballY[i])
      // }
    // }
        newGenPosX.push(x);
        newGenPosY.push(y);
        newGenX = newGenPosX[0];
        newGenY = newGenPosY[0];
      }
  
      let newGenColor = creatureColor[0];
      push();
      noStroke();
      fill(newGenColor, 150, 25, newGenLife);
      push();
      // console.log("yes")
      translate(newGenX, newGenY);
      circle(stepSize, 0, stepSize);
      circle(-stepSize, 0, stepSize);
      newGenY += 5;
      if (newGenY >= 450) {
        newGenY = 450;
        life--;
      }
      if (life <= 0) {
          die = true;
        }
      multiply = false;
      
      //circle(700,400,20);
      pop();
      pop();
    }
      
    if(IsnewGenFollow ==true){
      // newGenFollow();
        life = 255;
      newGenLife = 0;
        leftStep();
      }
      
  }
  
  function newGenFollow(){
    //if(IsnewGenFollow == true){
    
      // console.log(x)
      newGenX = leftPosX[i];
      newGenY = leftPosY[i]
  // }
  }
  
  function beginning(){
    push();
    fill(0);
    stroke(0);
    rect(0,0,800,500);
    textSize(50);
    text('🔘', 700,200);
    pop();
    push();
    noStroke();
    fill(255);
    textSize(30);
    text('Dear scientist, welcome to visit Freyr.',100,100);
    text('Turn the light on to start a new day.→',100,200)
    text('Remember to open the window ',100,250)
    text('and check the weather. ',100,300)
    // text('Freyr should move to follow you.',100,350);
    // text('Click to remind him if he forgets.',100,400)
    text('Do not forget to turn off the light',100,350)
    text('when you leave.',100,400);
    pop();
  }
  