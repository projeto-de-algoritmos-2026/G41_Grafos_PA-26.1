console.log("Script.js iniciado.")

import { drawGrid, drawArrows } from './draw.js'
import { createRandomGrid } from './utilities.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;
const rows = 5
const cols = 5
const cellSize = 80
const grid = createRandomGrid(rows, cols)

function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa canvas

    drawGrid(rows, cols, cellSize, ctx);
    drawArrows(ctx, grid, cellSize);

    requestAnimationFrame(loop);
}

loop()

