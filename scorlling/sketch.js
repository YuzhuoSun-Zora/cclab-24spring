let heightOfscrollDiv = document.getElementById("scrollDiv").scrollHeight
console.log(heightOfscrollDiv);
let availableScrollSpace = 0;


function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");
  availableScrollSpace = heightOfscrollDiv - windowHeight;

}

function draw() {
  background(220);
  //

  

  text("dog tooth", width/2, height/2);
  let scrollDistance = window.scrollY;
  text(scrollDistance, width/2, height/2 + 20);

  
  let scrollPercentage = scrollDistance/availableScrollSpace;
  text(scrollPercentage, width/2, height/2 + 40);

  let dogY = map(scrollPercentage, 0, 1, height/2, 0);
  circle(width/2+100, dogY, 20);
  circle(width/2+100+5, height/2+5, 10);

}

