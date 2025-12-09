// --- GLOBAL VARIABLES ---
let mic;
let designers = [
  "Archie Boston",
  "Gail Anderson",
  "E. Simms Campbell",
  "Aaron Douglas",
  "Emory Douglas",
  "Leroy Winbush",
  "Eugene Winslow",
  "Leroy Winbush",
  "Derrick Adams"
];

let currentName = "";
let particles = [];

// --- SETUP ---
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(10);

  // Microphone setup
  mic = new p5.AudioIn();
  mic.start();

  textAlign(CENTER, CENTER);
  textFont("Helvetica");
}

// --- DRAW LOOP ---
function draw() {
  background(10, 10); // slight trail effect

  // Get mic volume
  let vol = mic.getLevel();
  let threshold = 0.08;

  // Update particles
  for (let p of particles) {
    p.update();
    p.show();
  }

  // Trigger new designer name on volume spike
  if (vol > threshold) {
    if (frameCount % 10 === 0) {
      currentName = random(designers);
      triggerBurst();
    }
  }

  // Idle message if nothing has been spoken
  if (vol < threshold / 2 && currentName === "") {
    fill(160);
    textSize(20);
    text("Speak a name to make it visible.", width / 2, height / 2);
  }

  // Display active designer name
  if (currentName !== "") {
    fill(255);
    textSize(48);
    text(currentName, width / 2, height * 0.85);
  }
}

// --- PARTICLE BURST FUNCTION ---
function triggerBurst() {
  particles = [];
  for (let i = 0; i < 150; i++) {
    particles.push(new Particle(width / 2, height / 2));
  }
}

// --- PARTICLE CLASS ---
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 8));
    this.lifespan = 255;
    this.size = random(3, 10);
    this.color = color(
      random(150, 255),
      random(80, 160),
      random(200, 255)
    );
  }

  update() {
    this.pos.add(this.vel);
    this.vel.mult(0.95);
    this.lifespan -= 3;
  }

  show() {
    noStroke();
    fill(
      red(this.color),
      green(this.color),
      blue(this.color),
      this.lifespan
    );
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}

// --- REQUIRED ON MOBILE / BROWSER ---
function touchStarted() {
  getAudioContext().resume();
}
