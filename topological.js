function buildInDegree(grid, rows, cols) {
  const inDegree = Array.from({ length: rows }, () =>
    Array(cols).fill(0)
  );

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = grid[i][j];
      
      const direction = cell.direction

        if (direction === "RIGHT") {
        for (let k = j + 1; k < cols; k++) {
            if (grid[i][k]?.active) {
             inDegree[i][j]++;
            }
        }
        }

        if (direction === "LEFT") {
        for (let k = j - 1; k >= 0; k--) {
            if (grid[i][k]?.active) {
            inDegree[i][j]++;
            }
        }
        }

        if (direction === "DOWN") {
        for (let k = i + 1; k < rows; k++) {
            if (grid[k][j]?.active) {
            inDegree[i][j]++;
            }
        }
        }

        if (direction === "UP") {
        for (let k = i - 1; k >= 0; k--) {
            if (grid[k][j]?.active) {
            inDegree[i][j]++;
            }
        }
        }
    }
  }

  return inDegree;
}

function getNextCell(i, j, direction) {
    if (direction === "RIGHT") return [i, j + 1];
    if (direction === "LEFT") return [i, j - 1];
    if (direction === "DOWN") return [i + 1, j];
    if (direction === "UP") return [i - 1, j];
    return null;
} 


export function topologicalSolve(grid, rows, cols) {
  const inDegree = buildInDegree(grid, rows, cols);

  const queue = [];

  // pega todos com grau 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (inDegree[i][j] === 0 && grid[i][j].active) {
        queue.push([i, j]);
      }
    }
  }

  const order = [];

  while (queue.length > 0) {
    const [i, j] = queue.shift();
    order.push([i, j]);

    for (let k = 0; k < cols; k++) {
      if (k === j || !grid[i][k].active) continue;
      const otherCell = grid[i][k];
      
      // Se a célula K está à esquerda e olha para a DIREITA, e eu (J) estava no caminho
      if (k < j && otherCell.direction === "RIGHT") {
        inDegree[i][k]--;
        if (inDegree[i][k] === 0) queue.push([i, k]);
      }
      // Se a célula K está à direita e olha para a ESQUERDA, e eu (J) estava no caminho
      if (k > j && otherCell.direction === "LEFT") {
        inDegree[i][k]--;
        if (inDegree[i][k] === 0) queue.push([i, k]);
      }
    }

    // Checar vertical (quem olha para baixo ou para cima)
    for (let k = 0; k < rows; k++) {
      if (k === i || !grid[k][j].active) continue;
      const otherCell = grid[k][j];

      // Se a célula K está acima e olha para BAIXO, e eu (I) estava no caminho
      if (k < i && otherCell.direction === "DOWN") {
        inDegree[k][j]--;
        if (inDegree[k][j] === 0) queue.push([k, j]);
      }
      // Se a célula K está abaixo e olha para CIMA, e eu (I) estava no caminho
      if (k > i && otherCell.direction === "UP") {
        inDegree[k][j]--;
        if (inDegree[k][j] === 0) queue.push([k, j]);
      }
    }
  }

  console.log("Ordem de resolução:", order);
  return order;
}

//const totalActive = grid.flat().filter(c => c.active).length;
//comando usdo para verificar ciclo
//if (order.length !== totalActive) {
//  console.log("Tem ciclo! Não é resolvível.");
//}