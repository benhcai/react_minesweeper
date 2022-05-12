export const getBoardData = (board) => {
  if (!board) return { rows: 0, columns: 0, size: 0 };
  return {
    rows: board.length - 1,
    columns: board[0].length - 1,
    size: board.length * board[0].length,
  };
};

export const isValidGameInputs = (gameInputs) => {
  for (const key in gameInputs) {
    if (!gameInputs[key]) return false;
  }
  if (gameInputs.rows * gameInputs.columns <= gameInputs.mines) return false;
  return true;
};
