// Flappy Bird JavaScript

// Game Variables
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var frames = 0;
var score = 0;
var bestScore = 0;
var pipes = [];
var gameOver = false;

// Game Objects
var bird = {
    x: 50,
    y: 150,
    radius: 20,
    velocity: 0,
    gravity: 0.5,
    jump: 10,
    draw: function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = "#FF6A6A";
        context.fill();
    },
    flap: function () {
        this.velocity = -this.jump;
    },
    update: function () {
        this.velocity += this.gravity;
        this.y += this.velocity;
    },
    reset: function () {
        this.y = 150;
        this.velocity = 0;
    }
};

var pipe = {
    width: 50,
    height: 350,
    gap: 100,
    draw: function () {
        context.fillStyle = "#8BE6AF";
        context.fillRect(this.x, 0, this.width, this.top);
        context.fillRect(this.x, this.bottom, this.width, this.height);
    },
    update: function () {
        this.x -= 2;
    },
    generate: function () {
        this.top = Math.floor(Math.random() * (canvas.height - this.height - this.gap));
        this.bottom = this.top + this.gap + this.height;
        this.x = canvas.width;
    },
    reset: function () {
        this.x = 0 - this.width;
    }
};

// Game Functions
function updateScore() {
    score++;
    if (score > bestScore) {
        bestScore = score;
    }
}

function resetGame() {
    score = 0;
    pipes = [];
    bird.reset();
    pipe.reset();
}

function checkCollision() {
    // Check collision with top and bottom of canvas
    if (bird.y - bird.radius <= 0 || bird.y + bird.radius >= canvas.height) {
        return true;
    }

    // Check collision with pipes
    for (var i = 0; i < pipes.length; i++) {
        if (bird.x + bird.radius >= pipes[i].x &&
            bird.x - bird.radius <= pipes[i].x + pipe.width &&
            (bird.y - bird.radius <= pipes[i].top || bird.y + bird.radius >= pipes[i].bottom)) {
            return true;
        }
    }
}

function drawScore() {
    context.fillStyle = "#FFF";
    context.font = "24px Arial";
    context.fillText("Score: " + score, 10, 25);
    context.fillText("Best Score: " + bestScore, 10, 50);
}

function drawGameOver() {
    context.fillStyle = "#FFF";
    context.font = "48px Arial";
    context.fillText("Game Over", 100, 150);
    context.fillText("Score: " + score, 140, 200);
    context.font = "24px Arial";
    context.fillText("Press space to play again", 120, 250);
}

function loop() {
    frames++;

    if (frames % 100 === 0) {
        pipe.generate();
    }

    for (var i = 0; i < pipes.length; i++) {
        pipes[i].update();
        if (pipes[i].x + pipe.width <= 0) {
           
