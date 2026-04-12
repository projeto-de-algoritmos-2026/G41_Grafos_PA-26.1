console.log("Script.js iniciado.")

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;
const rows = 5
const cols = 5
const cellSize = 80

function drawGrid(rows, cols, cellSize, ctx){
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x = j * cellSize;
      const y = i * cellSize;

      ctx.strokeRect(x, y, cellSize, cellSize);
    }
  }
}

function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa canvas

    drawGrid(rows, cols, cellSize, ctx);

    requestAnimationFrame(loop);
}

loop()

