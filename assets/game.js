const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let animationId;
let score = 0;

class Cactus {
  constructor() {
    this.width = 50;
    this.height = 100;
    this.x = width;
    this.y = height - this.height;
    this.speed = 5;
  }

  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x -= this.speed;
  }

  isCollidingWith(player) {
    return (player.x + player.width >= this.x && player.x <= this.x + this.width) &&
           (player.y + player.height >= this.y && player.y <= this.y + this.height);
  }
}

class Player {
  constructor() {
    this.width = 50;
    this.height = 50;
    this.x = 50;
    this.y = height - this.height;
    this.dy = 0;
    this.jumpForce = 15;
    this.gravity = 1;
  }

  draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.dy += this.gravity;
    this.y += this.dy;

    if (this.y + this.height > height) {
      this.y = height - this.height;
      this.dy = 0;
    }
  }

  jump() {
    if (this.y + this.height === height) {
      this.dy -= this.jumpForce;
    }
  }
}

const player = new Player();
const cacti = [];

function loop() {
  animationId = requestAnimationFrame(loop);

  ctx.clearRect(0, 0, width, height);

  player.draw();
  player.update();

  if (Math.random() > 0.97) {
    cacti.push(new Cactus());
  }

  cacti.forEach(cactus => {
    cactus.draw();
    cactus.update();

    if (cactus.isCollidingWith(player)) {
      cancelAnimationFrame(animationId);
      alert(`Game over! Your score is ${score}.`);
      score = 0;
      cacti.length = 0;
      player.y = height - player.height;
      player.dy = 0;
      loop();
    }

    if (cactus.x + cactus.width < 0) {
      score++;
      cacti.splice(cacti.indexOf(cactus), 1);
    }
  });

  scoreText();
}

function scoreText() {
  ctx.fillStyle = 'black';
  ctx.font = '24px Arial';
  ctx.fillText(`Score: ${score}`, 20, 50);
}

document.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    player.jump();
  }
});

loop();
