import { getBoardData } from "./boardHelpers";
import Copier from "./Copier";

export const defaultOptions = {
  id: { x: 0, y: 0 },
  isMine: false,
  isClicked: false,
  isFlag: false,
};

export const createBoard = (rows, columns, defaultOptions) => {
  const board = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      row.push({ ...defaultOptions, id: { x: i, y: j } });
    }
    board.push(row);
  }
  return board;
};

const selectRandomInRange = (min, max) => {
  const randomNum = Math.floor(Math.random() * (max + 1 - min)) + min;
  return randomNum;
};

export const selectRandom2DCell = (board) => {
  const { rows, columns } = getBoardData(board);
  const randomRow = selectRandomInRange(0, rows);
  const randomColumn = selectRandomInRange(0, columns);
  return board[randomRow][randomColumn];
};

export const makeBoardWithMines = (board, totalMines) => {
  let newBoard = Copier.deep(board);
  let currentMines = 0;
  while (currentMines < totalMines) {
    const randomCell = selectRandom2DCell(newBoard);
    if (randomCell.isMine !== true) {
      randomCell.isMine = true;
      currentMines++;
    }
  }
  return newBoard;
};

export const findNeighbourCells = (board, cell) => {
  const relativeTop = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];
  const relativeMiddle = [
    [0, -1],
    [0, 1],
  ];
  const relativeBot = [
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  const relativePositions = [...relativeTop, ...relativeMiddle, ...relativeBot];
  const surroundingCells = [];
  const { rows, columns } = getBoardData(board);
  for (const relative of relativePositions) {
    const [relativeX, relativeY] = relative;
    const adjustedX = cell.id.x + relativeX;
    const adjustedY = cell.id.y + relativeY;
    if (adjustedX >= 0 && adjustedX <= rows && adjustedY >= 0 && adjustedY <= columns) {
      const relativeCell = board[adjustedX][adjustedY];
      surroundingCells.push(relativeCell);
    }
  }
  return surroundingCells;
};

export const countSurroundingAttribute = (board, cell, includeCell, attribute) => {
  const surroundingCells = findNeighbourCells(board, cell);
  let attributeCount = 0;
  for (const cell of surroundingCells) {
    if (cell[`${attribute}`] === true) attributeCount++;
  }
  if (includeCell) {
    if (cell[`${attribute}`] === true) attributeCount++;
  }
  return attributeCount;
};

const makeBoardWithSurroundingMineCount = (board) => {
  const newBoard = Copier.deep(board);
  for (const row of newBoard) {
    for (const cell of row) {
      const surroundingMines = countSurroundingAttribute(board, cell, false, "isMine");
      newBoard[cell.id.x][cell.id.y].surroundingMines = surroundingMines;
    }
  }
  return newBoard;
};

export const createGame = ({ rows, columns, mines, defaultOptions }) => {
  const initialBoard = createBoard(rows, columns, defaultOptions);
  const boardWithMines = makeBoardWithMines(initialBoard, mines);
  const boardWithMinesAndSurrounding = makeBoardWithSurroundingMineCount(boardWithMines);
  return boardWithMinesAndSurrounding;
};
