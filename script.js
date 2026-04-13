console.log("Script.js iniciado.")

import { drawGrid, drawArrows, drawSelection, drawMovingSquares } from './draw.js'
import { createRandomGrid, getLineBlocking, createCompleteGrid } from './utilities.js';
import { topologicalSolve } from './topological.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.addEventListener("click", handleClick);

canvas.width = 400;
canvas.height = 400;
const rows = 5
const cols = 5
const cellSize = 80
// const grid = createRandomGrid(rows, cols)
const grid = createCompleteGrid(rows, cols)
let selectedCell;
let movingSquares = []
// para o tempo
let startTime = null;
let elapsedTime = 0;
let gameRunning = false;
// para a quantidade de jogadas
let moves = 0;

function handleClick(event) {
  if (!gameRunning) return;

  const rect = canvas.getBoundingClientRect();

  const px = event.clientX - rect.left;
  const py = event.clientY - rect.top;

  const j = Math.floor(px / cellSize);
  const i = Math.floor(py / cellSize);

  selectedCell = { i, j };
  moves++;

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


function loop(time){
    update(time);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa canvas

    drawGrid(rows, cols, cellSize, ctx, grid);
    drawSelection(selectedCell, cellSize, ctx);
    drawArrows(ctx, grid, cellSize);
    drawMovingSquares(cellSize, movingSquares, ctx);
    drawUI();
    drawEndScreen();
    if(isGameFinished()){
      endGame();
    }

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

function update(time) {
  if (gameRunning) {
    elapsedTime = time - startTime;
  }

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


if (!gameRunning) startGame();

function startGame() {
  startTime = performance.now();
  gameRunning = true;
}

function drawUI() {
  const seconds = (elapsedTime / 1000).toFixed(2);
  ctx.fillText(`Tempo: ${seconds}s`, 10, 20);

  ctx.fillText(`Jogadas: ${moves}`, 10, 40);
}

function isGameFinished() {
  return grid.every(row =>
    row.every(cell => !cell.active)
  );
}

function endGame() {
  gameRunning = false;
}

function calculateScore() {
  const timeScore = Math.max(0, 1000 - elapsedTime*10);
  const moveScore = Math.max(0, 500 - moves * 10);

  return (timeScore + moveScore);
}

function drawEndScreen() {
  if (gameRunning) return;

  ctx.fillStyle = "black";
  ctx.fillText("Fim de jogo!", 150, 150);

  const score = calculateScore();

  ctx.fillText(`Score: ${score}`, 150, 180);
}

// Função auxiliar para criar o atraso
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function solver(arr) {  
  const speed = 3;

  for (const square of arr) {
    const row = square[0];
    const col = square[1];
    
    // Verificamos a direção específica DESTE quadrado no grid
    const dir = grid[row][col].direction;

    let dx = 0;
    let dy = 0;

    if (dir === "RIGHT") dx = speed;
    else if (dir === "LEFT") dx = -speed;
    else if (dir === "DOWN") dy = speed;
    else if (dir === "UP") dy = -speed;

    // Adiciona ao array de animação
    movingSquares.push({
      x: col * cellSize,
      y: row * cellSize,
      dx,
      dy
    });

    // Desativa a célula no grid
    grid[row][col].active = false;
    
    // Incrementa o contador de movimentos para o UI refletir a solução
    moves++; 

    // Espera 0.5 segundo antes de lançar o próximo
    await sleep(500);
  }
}

document.getElementById("solveBtn").addEventListener("click", async () => {
  const ordemResolucao = topologicalSolve(grid, rows, cols);
  await solver(ordemResolucao);
});