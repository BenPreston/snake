const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let primary = "#AF1E2D";
let secondary = "#FFCE00";
let white = '#F3F3F3';

const grid = 32;
let count = 0;
let speed = 20;
let score = 0;

let snake = {
    x: grid * 5,
    y: grid * 5,

    vx: 0,
    vy: grid,

    cells: [],
    maxCells: 4
};

let apple = {
    x: grid * 10,
    y: grid * 10
}

function Update () {
    requestAnimationFrame(Update);

    if(count++ < speed) {
        return;
    }
    count = 0;
 
    ctx.clearRect(0,0, canvas.width, canvas.height);

    ctx.font = "42px Helvetica";
    ctx.fillStyle = white
    ctx.fillText(score, canvas.width / 2 , canvas.height / 2);

    snake.x += snake.vx;
    snake.y += snake.vy;

    if(snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if(snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    snake.cells.unshift({x: snake.x, y: snake.y});

    if(snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // Draw apple
    ctx.fillStyle = secondary
    ctx.fillRect(apple.x, apple.y, grid-1, grid-1)

    // Draw snake
    ctx.fillStyle = primary;
    snake.cells.forEach(function(cell, index) {
        ctx.fillRect(cell.x, cell.y, grid-1, grid-1);

        if(cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            speed *= 0.9;
            score += 1;

            apple.x = getRandomInt(0, 24) * grid;
            apple.y = getRandomInt(0, 14) * grid;
        }

        for(let i = index + 1; i < snake.cells.length; i++) {
            if(cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                window.location.reload();
            }
        }
    });

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


document.addEventListener("keydown", function(evt) {
    if(evt.which === 37 && snake.vx === 0) {
        snake.vx = -grid;
        snake.vy = 0;
    } else if (evt.which === 38 && snake.vy === 0) {
        snake.vy = -grid;
        snake.vx = 0
    } else if (evt.which === 39 && snake.vx === 0) {
        snake.vx = grid;
        snake.vy = 0;
    } else if (evt.which === 40 && snake.vy === 0) {
        snake.vy = grid;
        snake.vx = 0
    }
})

requestAnimationFrame(Update);