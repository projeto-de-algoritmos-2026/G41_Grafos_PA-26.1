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