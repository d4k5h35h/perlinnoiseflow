var inc = 0.1;
var scl = 20;
var cols, rows;
var zoff = 0;
var particle = [];
var flowfield;
var r;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(120);
  r = random(0,55);
  // noprotect
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);
  for (var i = 0; i < 2500; i++) {
    particle[i] = new Particle();
    background(255);
  }
}

function draw() {
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;
    zoff += 0.003;
  }
  for (var i = 0; i < particle.length; i++) {
    particle[i].follow(flowfield);
    particle[i].edges();
    particle[i].show();
    particle[i].update();
  }
}