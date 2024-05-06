
//class
let tooth1;
let mouth;
let toothToMountain;
let floor

let NUM_OF_GRASSES = 30; //mainInteraction
let grasses = []
let NUM_OF_SHEEP = 20;
let sheep = [];
let runningDog;
let car;
let road;


//IMG
let mouthIMG;
let toothIMG;
let floorIMG;
let singleToothIMG;
let toothMountainIMG;
let grassIMG;
let sheepIMG;
let dogRunningIMG;
let carIMG;
let roadIMG;


//sound
let barkingSound;
let pantingSound;
let wakeUpSound;
//trigger for each scene
let fallingTrigger = true;
let toothToTheBottom = false;
let pickingTrigger = false;
let mouseOnTooth = false;
let toothExpand = false;
let chasingtrigger = false;
let wakeUpInCar = false;
let wakingStartTime = 0
let isBarking = false;
let isBarkingTime = 0;
//change
let enterGrass;
let currentTime;
let chasingStartTime = 0;
let sheepOff = [];

function preload() {
  mouthIMG = loadImage("IMG/mouth.png");
  toothIMG = loadImage("IMG/tooth.png");
  singleToothIMG = loadImage("IMG/singleTooth.png");
  toothMountainIMG = loadImage("IMG/toothMountain.png");
  floorIMG = loadImage("IMG/floor.png")
  grassIMG = loadImage("IMG/grass.png");
  sheepIMG = loadImage("IMG/sheep.png");
  dogRunningIMG = loadImage("IMG/dogRunning.png");
  carIMG = loadImage("IMG/car.png");
  roadIMG = loadImage("IMG/road.png");
  barkingSound = loadSound("sound/woof.mp3")
  pantingSound = loadSound("sound/panting.mp3")
  wakeUpSound = loadSound("sound/wakeUp.MP3")
  // loadSound
}
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");





  tooth1 = new Tooth1(width / 2 + 300, height / 2 - 250);
  mouth = new Mouth(width / 2 + 250, height / 2 + 200);
  floor = new Floor(width / 2, height)
  toothToMountain = new ToothToMountain(width / 2, height / 2, 0.3, 0);
  for (let i = 0; i < NUM_OF_GRASSES; i++) {
    grasses[i] = new Grass(random(width), random(height));
  }
  // for (let i = 0; i < NUM_OF_SHEEP; i++) {
  //   let x = random(200,width-200);
  //   let y = random(200,height-200);
  //   sheep[i] = new Sheep(x, y);
  // }

  runningDog = new RunningDog(width / 2, height - 120)

  while (sheep.length < NUM_OF_SHEEP) {
    let x = random(100, width - 100);
    let y = random(100, height - 250);
    if (sheep.length == 0) {
      sheep.push(new Sheep(x, y));
      continue; // skip rest of loop
    }

    let overlapswithatleastoneothersheep = false;

    for (let i = 0; i < sheep.length; i++) {
      if (sheep[i].overlapsWithMe(x, y) == true) {
        overlapswithatleastoneothersheep = true;
      }


      if (i == sheep.length - 1) {
        if (overlapswithatleastoneothersheep == false) {
          sheep.push(new Sheep(x, y));
        }
      }

    }
    car = new Car(width / 2, height / 2 - 190);
    road = new Road(width / 2, height / 2 - 190)



  }




  let heightOfscrollDiv = document.getElementById("scrollDiv").scrollHeight
  toothSize = 0.3;
  enterGrass = 0;
  // let availableScrollSpace = 0;
  availableScrollSpace = heightOfscrollDiv - windowHeight;

}

// function mouseMoved() {
//   if (pantingSound.isPlaying() == false) {
//     //pantingSound.play();
//     pantingSound.play();
//     pantingSound.setVolume(1);
//   }
// }

function draw() {

  document.getElementById("scrollDiv2").style.display = "none";
  background(250, 240, 202);
  currentTime = millis();
  // console.log(toothToTheBottom, pickingTrigger, mouseOnTooth)
  // console.log(sheepOff.length)
  if (fallingTrigger == true) {

    mouth.update();
    mouth.display();

    floor.update();
    floor.display();

    tooth1.update();
    tooth1.checkDist();
    // console.log(mouseOnTooth)
    tooth1.display();



  }

  if (pickingTrigger == true) {//pickingTrigger == true
    document.getElementById("scrollDiv").style.display = "none";//block
    pantingSound.stop()
    toothToMountain.update();
    toothToMountain.display();
    // console.log("pick it up")
  }

  if (chasingtrigger == true) {
    if (chasingStartTime == 0) {
      chasingStartTime = currentTime
    }
    // console.log(currentTime - chasingStartTime)
    push();
    noStroke();
    fill('#416224');
    circle(width / 2, height / 2, enterGrass);
    pop();
    if (enterGrass >= width + 500) {
      enterGrass += 0;
      pickingTrigger = false;
      for (let i = 0; i < grasses.length; i++) {
        let g = grasses[i];
        g.update();
        g.display();
      }
      for (let i = 0; i < sheep.length; i++) {
        sheep[i].update(sheep);
        sheep[i].display();
        sheep[i].onCanvas();
        sheep[i].overlapsWithDog(runningDog.x, runningDog.y - 50);
        // runningDog.overlapsWithSheep(sheep[i].x, sheep[i].y)
        // if(sheep[i].overlapsWithMe(mouseX, mouseY) == true){
        //   sheep[i].touched = true;
        // }
      }
      runningDog.update();
      runningDog.display();

    } else {
      enterGrass += 50;
    }

    if (sheepOff.length >= 10) {
      // console.log(wakingStartTime, millis() - wakingStartTime)
      if (wakingStartTime == 0) {
        wakingStartTime = millis()
      }
      if (wakeUpSound.isPlaying() == false) {
        wakeUpSound.play()
      }

      if (millis() - wakingStartTime >= 10000) {
        chasingtrigger = false
        wakeUpInCar = true;
      }
    }
  }

  if (wakeUpInCar == true) {
    background("#715530");
    document.getElementById("scrollDiv2").style.display = "block";
    road.update();
    road.display();
    car.update();
    car.display();
    car.roadFitWindow(road.s);
    wakeUpSound.stop()

  }
  // scrollDistance = window.scrollY;
  // scrollPercentage = scrollDistance/availableScrollSpace;
}

function mousePressed() {
  if (toothToTheBottom && mouseOnTooth) {
    pickingTrigger = true;
    fallingTrigger = false;
  }

  if (toothExpand == true) {
    toothToMountain.mousePressed();
  }

  if (chasingtrigger == true) {
    console.log(isBarking)
    // for (let i = 0; i < sheep.length; i++) {
    //   sheep[i].dogBarking(runningDog.x, runningDog.y)
    //   // runningDog.barking(sheep[i].ifCollide);
    // }
    runningDog.barking();
    if (isBarking == false) {
      // for (let i = 0; i < sheep.length; i++) {
      //   sheep[i].dogBarking(runningDog.x, runningDog.y)
      //   // runningDog.barking(sheep[i].ifCollide);
      // }
      // runningDog.barking();
      isBarking = true;
    }
    if (isBarking && isBarkingTime == 0) {
      isBarkingTime = millis()
    }
    if (millis() - isBarkingTime >= 2000) {
      isBarking = false
      isBarkingTime = 0;
    }
  }
}
class ToothToMountain {
  constructor(startX, startY, size, transparency) {
    this.x = startX;
    this.y = startY;
    this.s = size;
    this.t = transparency
    this.range = 0;
  }
  update() {
    if (this.s > 10) {
      // pickingTrigger = false;
      chasingtrigger = true;
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    // fill("green")
    // circle(0,0,40)
    imageMode(CENTER)
    scale(this.s)
    image(singleToothIMG, 0, 0)
    push();
    tint(255, this.t);
    image(toothMountainIMG, 0, 0)
    pop();
    if (dist(width / 2, height / 2, mouseX, mouseY) < 50 + this.range) {
      toothExpand = true
    } else {
      toothExpand = false;
    }
    pop();
  }
  mousePressed() {

    if (this.s < 0.8) {
      this.s += 0.5;
    } else {
      this.s += 1
    }

    this.range += 10;
    if (this.s >= 1.9) {
      this.t += 60
    }
  }

}
class Tooth1 {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.toothStartPos = startY;
    this.angle = 0;
  }
  update() {
    this.scrollDistance = window.scrollY;
    this.scrollPercentage = this.scrollDistance / availableScrollSpace;
    this.y = map(this.scrollPercentage, 0, 1, this.toothStartPos, height - 120)
    //trigger
    if (this.y == height - 120) {
      toothToTheBottom = true;
    }
    this.angle = map(this.scrollPercentage, 0, 1, 0, 3600);
  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.angle))
    imageMode(CENTER)
    scale(0.8);
    image(toothIMG, 0, 0)

    pop();
  }

  checkDist() {
    // push();
    // translate(this.x, his.y)
    this.mouseDist = dist(this.x, this.y, mouseX, mouseY);
    if (this.mouseDist <= 50) {
      mouseOnTooth = true;
    } else {
      mouseOnTooth = false;
    }
    // pop();
  }

}
class Floor {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
  }
  update() {
    this.scrollDistance = window.scrollY;
    this.scrollPercentage = this.scrollDistance / availableScrollSpace;
    this.y = map(this.scrollPercentage, 0, 1, height, height - 400)

  }
  display() {
    push();
    translate(this.x, this.y)
    imageMode(CENTER);
    scale(0.8)
    image(floorIMG, 0, 0)
    pop();
  }
}
class Mouth {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
  }
  update() {
    this.scrollDistance = window.scrollY;
    this.scrollPercentage = this.scrollDistance / windowHeight
    this.y = map(this.scrollPercentage, 0, 1, 300, 0)
  }
  display() {
    if (pantingSound.isPlaying() == false) {
      pantingSound.play();
      pantingSound.setVolume(map(this.scrollPercentage, 0, 1, 1, 0));
    }
    console.log(pantingSound.isPlaying());
    push();
    translate(this.x, this.y);
    // rotate(radians(-45));
    // rect(0,0,600,200);
    imageMode(CENTER);
    image(mouthIMG, 0, 0);
    // text(this.scrollDistance, 0, 0)

    pop();
  }

}

class Grass {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.speed = 2;
  }
  update() {
    this.y += this.speed
    if (this.y > height) {
      this.y = -10;
      this.x = random(width);
    }
  }
  display() {
    push();
    translate(this.x, this.y)
    imageMode(CENTER);
    scale(0.03);
    image(grassIMG, 0, 0)
    pop();

  }
}

class Sheep {
  constructor(startX, startY) {
    //怎么让羊不重叠？
    this.x = startX
    this.y = startY;
    this.speedX = 0;
    this.speedY = 0;
    this.noiseX = random(1000);
    this.noiseY = random(1000);

    this.scaleFactor = 0.08;
    this.touched = false;
    this.ifCollide = false;
    this.xOnCanvas = true;
    this.yOnCanvas = true;
    this.leftCanvas = false;
    this.wouldbeX = startX + this.speedX;
    this.wouldbeY = startY + this.speedY;
    this.normalSpeed = 0.01
    this.speedUp = this.normalSpeed;
    this.maxSpeedX = 0.3;
    this.minSpeedX = -0.3
    this.maxSpeedY = 3.8;
    this.minSpeedY = -0.5
    this.speedUpRange = 200;
  }
  update(other) {
    // console.log(this.leftCanvas, this.yOnCanvas)
    this.speedX = map(noise(this.noiseX), 0, 1, this.minSpeedX, this.maxSpeedX);
    this.speedY = map(noise(this.noiseY), 0, 1, this.minSpeedY, this.maxSpeedY)
    this.wouldbeX = this.x + this.speedX;
    this.wouldbeY = this.y + this.speedY;

    // for all other sheep would the would be lcoation overlap? 
    // if no, then make the step
    this.checkCollision(other);

    if (!this.ifCollide && this.xOnCanvas == true) {
      this.x += this.speedX;
      this.y += this.speedY;
    } else {
      // this.maxSpeedY = 1
    }

    this.speedUp = lerp(this.speedUp, this.normalSpeed, 0.02)
    this.noiseX += 0.005;
    this.noiseY += this.speedUp;

    if (!this.leftCanvas && !this.yOnCanvas) {
      sheepOff.push("OFF");
      this.leftCanvas = true;
    }

    // this.maxSpeedY = lerp(this.maxSpeedY, 2.8, 0.1);
    this.minSpeedY = lerp(this.minSpeedY, -0.5, 0.07);

  }
  display() {
    push();
    translate(this.x, this.y)
    imageMode(CENTER);
    scale(this.scaleFactor);
    image(sheepIMG, 0, 0);
    stroke(255)

    pop();



  }
  overlapsWithMe(other_x, other_y) {
    let distance = dist(other_x, other_y, this.x, this.y);
    if (distance < 100) {
      // console.log(distance)
      return true
    } else {
      return false
    }
  }
  checkCollision(others) {

    for (let i = 0; i < others.length; i++) {
      let other = others[i];

      // console.log(other, i, others.length)
      if (this != other) {
        // text(`${i}`, other.wouldbeX, other.wouldbeY)
        let distance = dist(other.x, other.y, this.wouldbeX, this.wouldbeY);
        if (distance < 100) {
          // console.log(distance)
          this.ifCollide = true
          return;
        } else {
          this.ifCollide = false

        }
      }
    }
  }
  onCanvas() {
    let distanceX = dist(width / 2, this.wouldbeY, this.wouldbeX, this.wouldbeY)
    if (distanceX > width / 2 + 50) {
      this.xOnCanvas = false;
    }
    let distanceY = dist(this.wouldbeX, height / 2, this.wouldbeX, this.wouldbeY)
    if (distanceY > height / 2) {
      // console.log("yOFF")
      this.yOnCanvas = false

    }
  }
  overlapsWithDog(dogX, dogY) {
    let distanceWithDog = dist(dogX, dogY, this.x, this.y)
    if (distanceWithDog <= 100) {
      // circle(this.x, this.y, 50)
      this.speedUp = this.normalSpeed * 5;
      this.minSpeedY = -1;
      this.maxSpeedY = -0.5;
      this.minSpeedX = -0.6;
      this.maxSpeedX = 0.6;
    } else if (distanceWithDog >= this.speedUpRange) {
      this.maxSpeedY = 0.8;
      this.minSpeedY = -0.5
    }
  }
  dogBarking(barkX, barkY) {
    // console.log(this.ifCollide, this.speedUpRange)

    let barkingDistance = dist(barkX, barkY, this.x, barkY);
    if (barkingDistance < 120) {
      // if (this.ifCollide == true || barkingDistance <= 100) {
      this.speedUpRange = height//2 * width - barkY;
      //   runningDog.barking();
      // } else {
      //   this.speedUpRange = 200
      // }
      // rect(this.x, this.y, 100)
      // this.maxSpeedY = 3.8;
      this.minSpeedY = -10.5;
    } else if (barkingDistance >= this.speedUpRange) {
      this.maxSpeedY = 0.8;
      this.minSpeedY = -0.5
    }

  }
}

class RunningDog {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // this.wouldbeX;
    // this.wouldbeY;
    this.scaleFactor = 0.14
    // this.overlap = false;
  }
  update() {
    // console.log(this.overlap)
    let dogSpeed = map(mouseY, 0, height, 0.0000001, 0.1)
    let yRange = map(mouseY, 0, height, height - 250, height - 100)

    let wouldbeX = lerp(this.x, mouseX, 0.05);
    let wouldbeY = lerp(this.y, yRange, 0.08);//0.08

    let overlap = false;
    for (let i = 0; i < sheep.length; i++) {
      let distanceWithSheep = dist(sheep[i].x, sheep[i].y, wouldbeX, wouldbeY)
      if (distanceWithSheep < 100) {
        overlap = true;
        break;
      }
    }
    if (!overlap) {
      this.x = wouldbeX;
      this.y = wouldbeY
    }
    // this.x = this.wouldbeX;
    // this.y = this.wouldbeY

  }
  display() {
    push();
    translate(this.x, this.y)
    scale(this.scaleFactor)
    imageMode(CENTER);
    image(dogRunningIMG, 0, 0)
    // noFill();

    pop();


    push();
    translate(this.x, this.y)
    // stroke("red")
    // circle(0, 0, 100);

    // strokeWeight(5)
    // line(- 120, -height, - 120, height)
    // line(+ 120, -height, + 120, height)
    pop();
  }
  overlapsWithSheep(sheepX, sheepY) {
    // let distanceWithSheep = dist(sheepX, sheepY, this.wouldbeX, this.wouldbeY)
    // // console.log(distanceWithSheep)
    // if (distanceWithSheep < 100) {
    //   this.overlap = true;

    // }
  }

  barking() {
    // let woof = makeSound
    // console.log(woof)
    // if (woof) {
    barkingSound.play()
    barkingSound.setVolume(0.5)
    push();
    // console.log(this.x, this.y);
    translate(this.x, this.y)
    stroke("yellow")
    strokeWeight(5);
    // line(this.x, this.y - 580, this.x, this.y - 910)
    // circle(this.x, this.y, 3000)

    pop();
    // }

    for (let i = 0; i < sheep.length; i++) {
      sheep[i].dogBarking(this.x, this.y)
      // runningDog.barking(sheep[i].ifCollide);
    }


  }
}

class Car {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.noiseVal = 0;
    this.scaleFactor = 0.9
    this.t = 0
  }
  update() {
    this.y = map(noise(this.noiseVal), 0, 1, height / 2 - 10, height / 2 + 10);
    this.noiseVal += 0.08
    if (wakeUpInCar == true) {
      this.t += 1;
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    scale(this.scaleFactor)
    tint(255, this.t)
    image(carIMG, 0, 20)
    pop();
  }
  roadFitWindow(windowSize) {
    if (windowSize < 0.5 && this.scaleFactor > 0) {
      // this.scaleFactor -= 0.002
    }
  }
}

class Road {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.s = 1.6
    this.t = 0;

  }
  update() {
    if (this.s > 0.8) {
      this.s -= 0.001
    }
    if (wakeUpInCar == true) {
      this.t += 0.2
    }

  }
  display() {
    push();
    translate(this.x, this.y)
    imageMode(CENTER);
    scale(this.s)
    tint(255, this.t)
    image(roadIMG, 0, 20)
    // fill("red")
    // circle(0, 0, 10)
    pop();

  }
}

