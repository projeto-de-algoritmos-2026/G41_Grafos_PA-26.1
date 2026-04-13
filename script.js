console.log("Script.js iniciado.")

import { drawGrid, drawArrows, drawSelection, drawMovingSquares } from './draw.js'
import { createRandomGrid, getLineBlocking } from './utilities.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.addEventListener("click", handleClick);

canvas.width = 400;
canvas.height = 400;
const rows = 5
const cols = 5
const cellSize = 80
const grid = createRandomGrid(rows, cols)
let selectedCell;
let movingSquares = []

function handleClick(event) {
  const rect = canvas.getBoundingClientRect();

  const px = event.clientX - rect.left;
  const py = event.clientY - rect.top;

  const j = Math.floor(px / cellSize);
  const i = Math.floor(py / cellSize);

  selectedCell = { i, j };

  const dir = grid[i][j].direction;

  const speed = 3;

  let dx = 0, dy = 0;

  if (dir === "RIGHT") dx = speed;
  if (dir === "LEFT") dx = -speed;
  if (dir === "DOWN") dy = speed;
  if (dir === "UP") dy = -speed;

   if(getLineBlocking(i,j,rows,cols,grid)){
    // TriggerShake()
  } else if(grid[i][j].active){
    movingSquares.push({
      x: j * cellSize,
      y: i * cellSize,
      dx,
      dy
    });
    grid[i][j].active = false
  }
}


function loop(){
    update();
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa canvas

    drawGrid(rows, cols, cellSize, ctx, grid);
    drawSelection(selectedCell, cellSize, ctx);
    drawArrows(ctx, grid, cellSize);
    drawMovingSquares(cellSize, movingSquares, ctx);

    requestAnimationFrame(loop);
}

loop()

function update() {
  for (let square of movingSquares) {
    square.x += square.dx;
    square.y += square.dy;
  }

  movingSquares = movingSquares.filter(s =>
    s.x + cellSize > 0 &&
    s.x < canvas.width &&
    s.y + cellSize > 0 &&
    s.y < canvas.height
  );
}
