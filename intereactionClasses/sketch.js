let swarm1


function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");

  swarm1 = new swarm(width / 2, height / 2);
}

function draw() {
  //
  background("orange");
  swarm1.update();
  swarm1.display();

  noFill();
  stroke(255);
  circle(width / 2, height / 2, width)
}

class swarm {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.dia = 100;
    this.speedX = 0;
    this.speedY = 0;
    this.noiseXoffset = random(1000);
    this.noiseYoffset = random(1000);

    this.birds = [];
    for (let i = 0; i < 5; i++) {
      let ranAngle = random(2 * PI);
      let birdX = cos(ranAngle) * random(0, this.dia / 2)//random(this.dia);
      let birdY = sin(ranAngle) * random(0, this.dia / 2)//random(this.dia);
      this.birds.push(new bird(birdX, birdY))
    }
  }
  update() {
    let noiseValX = noise((frameCount + this.noiseXoffset) * 0.01);
    this.speedX = map(noiseValX, 0, 1, -5, 5);

    text(noiseValX, 100, 100)

    let noiseValY = noise((frameCount + this.noiseYoffset) * 0.01);
    this.speedY = map(noiseValY, 0, 1, -5, 5);

    let wouldBeX = this.x + this.speedX;
    let wouldBeY = this.y + this.speedY;

    let distanceFromCenter = dist(width / 2, height / 2, wouldBeX, wouldBeY);
    if (distanceFromCenter < width / 2) {
      this.x += this.speedX;
      this.y += this.speedY;
    }

  }
  display() {
    push();
    translate(this.x, this.y)
    noFill();
    stroke(0);
    circle(0, 0, this.dia)

    for (let i = 0; i < this.birds.length; i++) {
      this.birds[i].update();
      this.birds[i].display();
    }

    pop();
  }


}

class bird {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.speedX = 0;
    this.speedY = 0;
    this.noiseXoffset = random(1000);
    this.noiseYoffset = random(1000);
  }
  update() {
    let noiseValX = noise((frameCount + this.noiseXoffset) * 0.01);
    this.speedX = map(noiseValX, 0, 1, -2, 2);

    // text(noiseValX, 100,100)

    let noiseValY = noise((frameCount + this.noiseYoffset) * 0.01);
    this.speedY = map(noiseValY, 0, 1, -2, 2);

    let wouldBeX = this.x + this.speedX;
    let wouldBeY = this.y + this.speedY;

    let distanceFromCenter = dist(width / 2, height / 2, wouldBeX, wouldBeY);
    this.x += this.speedX;
    this.y += this.speedY;
    //   this.y += this.speedY;
    // if(distanceFromCenter<width/2){
    //   this.x += this.speedX;
    //   this.y += this.speedY;
    // }
  }
  display() {

    push();
    translate(this.x, this.y);
    noStroke();
    fill(0);
    circle(0, 0, 10);

    pop();


  }
}