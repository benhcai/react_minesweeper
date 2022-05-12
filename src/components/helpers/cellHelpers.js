import { findNeighbourCells } from "./gameHelpers";

export const expandSelection = (board, cell, clickedCells, doubleClick, autoSearch) => {
  const originalSurrounding = findNeighbourCells(board, cell);

  const recursiveExpandSelection = (
    board,
    cell,
    clickedCells,
    doubleClick = false,
    autoSearch = false
  ) => {
    if (cell.isClicked && !doubleClick) return board;
    if (cell.isClicked && doubleClick && autoSearch) return board;

    board[cell.id.x][cell.id.y].isClicked = true;
    if (cell.surroundingMines !== 0 && !doubleClick) return board;

    const surroundingCells = findNeighbourCells(board, cell);

    for (const cell of surroundingCells) {
      const surroundingCellOnBoard = board[cell.id.x][cell.id.y];

      let cellInOriginal = false;
      for (const ogCell of originalSurrounding) {
        if (cell.id.x === ogCell.id.x && cell.id.y === ogCell.id.y) {
          cellInOriginal = true;
        }
      }

      const isSurroundingBombsZero = cell.surrounding === 0 ? true : false;
      if (doubleClick === true) {
        if (cellInOriginal && cell.isFlag) continue;
        if (!cellInOriginal && cell.isFlag && !isSurroundingBombsZero) continue;
      }

      if (doubleClick === false && autoSearch === true) {
        if (board[cell.id.x][cell.id.y].isFlag) board[cell.id.x][cell.id.y].isFlag = false;
      }

      if (!cell.isClicked) clickedCells.current++;

      if (surroundingCellOnBoard.surroundingMines === 0) {
        board[cell.id.x][cell.id.y].isFlag = false;
        recursiveExpandSelection(board, surroundingCellOnBoard, clickedCells, doubleClick, true);
      } else {
        surroundingCellOnBoard.isClicked = true;
      }
    }
    return board;
  };

  return recursiveExpandSelection(board, cell, clickedCells, doubleClick, autoSearch);
};
