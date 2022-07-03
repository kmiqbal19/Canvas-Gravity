import utils from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "blue";
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    if (this.y + this.radius + this.dy >= canvas.height) {
      this.dy = -this.dy * 0.99;
    } else {
      this.dy += 1;
    }
    if (
      this.x + this.radius + this.dx >= canvas.width ||
      this.x - this.radius <= 0
    ) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

// Implementation
let ball;
let objects = [];
function init() {
  objects = [];
  for (let i = 0; i < 30; i++) {
    let radius = 30;
    let x = utils.randomIntFromRange(radius, canvas.width - radius);
    let y = utils.randomIntFromRange(radius, canvas.height - radius);
    let dx = utils.randomIntFromRange(-2, 2);
    let dy = utils.randomIntFromRange(-2, 2);
    objects.push(new Ball(x, y, dx, dy, radius, "red"));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  objects.forEach((ball) => {
    ball.update();
  });
  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  // objects.forEach(object => {
  //  object.update()
  // })
}

init();
animate();
