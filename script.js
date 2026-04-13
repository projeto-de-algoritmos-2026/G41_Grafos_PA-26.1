console.log("Script.js iniciado.")

import { drawGrid, drawArrows,drawSelection } from './draw.js'
import { createRandomGrid } from './utilities.js';

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

function handleClick(event) {
  const rect = canvas.getBoundingClientRect();

  const px = event.clientX - rect.left;
  const py = event.clientY - rect.top;

  const j = Math.floor(px / cellSize);
  const i = Math.floor(py / cellSize);

  selectedCell = { i, j };
}


function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa canvas

    drawGrid(rows, cols, cellSize, ctx);
    drawSelection(selectedCell, cellSize, ctx);
    drawArrows(ctx, grid, cellSize);

    requestAnimationFrame(loop);
}

loop()

