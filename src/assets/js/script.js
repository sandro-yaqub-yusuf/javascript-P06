// Dados iniciais
let canDraw = false;
let currentColor = 'black';
let screen = document.querySelector('#tela');
let context = screen.getContext('2d');
let mouseX = 0;
let mouseY = 0;

// Eventos
document.querySelector('.clear').addEventListener('click', clearScreen);
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClick);
});

screen.addEventListener('mousedown', mouseDown);
screen.addEventListener('mousemove', mouseMove);
screen.addEventListener('mouseup', mouseUp);

// Funções
function clearScreen() {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function colorClick(e) {
    let color = e.target.getAttribute('data-color');

    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');

    e.target.classList.add('active');
}

function draw(x, y) {
    let pointX = (x - screen.offsetLeft);
    let pointY = (y - screen.offsetTop);

    context.beginPath();
    context.lineWidth = 3;
    context.lineJoin = 'round';
    context.moveTo(mouseX, mouseY);
    context.lineTo(pointX, pointY);
    context.closePath();
    context.strokeStyle = currentColor;
    context.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function mouseDown(e) {
    canDraw = true;
    mouseX = (e.pageX - screen.offsetLeft);
    mouseY = (e.pageY - screen.offsetTop);
}

function mouseMove(e) {
    if (canDraw) {
        draw(e.pageX, e.pageY);
    }
}

function mouseUp() {
    canDraw = false;
}
