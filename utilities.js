export function createRandomGrid(rows, cols){
    let directionOption = ["UP", "DOWN", "LEFT", "RIGHT"]
    let grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
            direction: directionOption[Math.floor(Math.random() * 4)],
            active: true
        }))
    );
    return grid
}

export function getLineBlocking(i, j, rows, cols, grid){
  const cell = grid[i][j];

  // if (cell && cell.active){
    console.log("Tentando ver")
    const direction = cell.direction

    if (direction === "RIGHT") {
      for (let k = j + 1; k < cols; k++) {
        if (grid[i][k]?.active) {
          return true;
        }
      }
    }

    if (direction === "LEFT") {
      for (let k = j - 1; k >= 0; k--) {
        if (grid[i][k]?.active) {
          return true;
        }
      }
    }

    if (direction === "DOWN") {
      for (let k = i + 1; k < rows; k++) {
        if (grid[k][j]?.active) {
          return true;
        }
      }
    }

    if (direction === "UP") {
      for (let k = i - 1; k >= 0; k--) {
        if (grid[k][j]?.active) {
          return true;
        }
      }
    }
  // }
  return false;
}
