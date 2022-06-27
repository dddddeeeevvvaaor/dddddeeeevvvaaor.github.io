var balls = [];
var canvas = document.getElementById('myCanvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
var context = canvas.getContext('2d');

var colors = [
    '#03ff68',
    '#3503ff',
    '#ff9a03',
    '#ff1c03'
];

function printMousePos(event) {
    var x = event.clientX; // Get the horizontal coordinate
    var y = event.clientY;
    for (let i = 0; i < 30; i++) {
        var centerX = x;
        var centerY = y;
        var radius = 70;
        var dx = Math.floor(Math.random() * (50 + 50 + 1) - 50);
        var dy = Math.floor(Math.random() * (50 + 50 + 1) - 50);
        var color = colors[Math.floor(Math.random() * colors.length)];
        balls.push(new Ball(x, y, dx, dy, radius, color));
    }
}

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.update = function() {
        //x/y/velocity calculations here
        this.x += this.dx;
        this.y += this.dy;
        this.dy *= 0.9;
        this.dx *= 0.9;
        this.radius *= 0.9;
        this.draw();
    };

    this.draw = function() {

        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        context.strokeStyle = 'none';
        context.stroke();
        context.closePath();
    };
}

function loop(timestamp) {
    var progress = timestamp - lastRender
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
    }

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)
document.addEventListener("click", printMousePos);