const generateMines = (board, rows, columns, totalMines) => {
  let currentMines = 0;
  while (currentMines < totalMines) {
    // select random tile
    const randomX = Math.random();
    const randomY = Math.random();
    const randomTile = board[randomX][randomY];

    // if random tile isMine is already true, continue
    // if not true, make it true and iteratemines variable
    if (randomTile.isMine === false) {
      currentMines++;
      randomTile.isMine = true;
    }
  }
};

export default generateMines;
