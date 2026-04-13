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
    // console.log("Tentando ver")
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

export function createCompleteGrid(rows, cols){
    const directions = ["UP", "DOWN", "LEFT", "RIGHT"];

    // 1. escolha um quadrado aleatório entre rows x cols de opções
    // 2. sorteia 1 das quatros direções
    // 3. verifica se essa direção está bloqueada
        // se estiver bloqueada, sorteia uma das outras 3 direções e volte para o passo 3
        // se não, coloque essa mesma e volte para o passo 1

  // cria grid vazio
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      direction: null,
      active: false
    }))
  );

  const moves = {
    UP:    [-1, 0],
    DOWN:  [1, 0],
    LEFT:  [0, -1],
    RIGHT: [0, 1]
  };


  // preenche o grid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].active = true

      // embaralha direções
      const shuffled = [...directions].sort(() => Math.random() - 0.5);

      let chosen = null;

      for (let dir of shuffled) {
        // console.log("tentando:", dir)
        grid[i][j].direction = dir;
        if (!getLineBlocking(i, j, rows, cols, grid)) {
          chosen = dir;
          break;
        }
      }

      // fallback (não deveria acontecer muito)
      if (!chosen) {
        console.log("Algo inesperado aconteceu em createCompleteGrid.")
        chosen = "RIGHT";
      }

      grid[i][j].direction = chosen;
    }
  }

  return grid;
}