
let NUM_OF_GRASS = 4;
let grass = [];



function setup() {
  let canvas = createCanvas(windowWidth, 600);
  canvas.parent("canvasContainer");
  background(86, 135, 49);

  for(let i = 0; i < NUM_OF_GRASS; i++){
    grass[i]=new Grass(random(width),random(height))
  }
}

function draw() {
  //
  background(86, 135, 49);
  for (let i = 0; i < grass.length; i++) {
    let g = grass[i];
    g.update();
    g.display();
  }
}

class Grass{
  constructor(){

  }

  update(){

  }

  display(){

  }

}