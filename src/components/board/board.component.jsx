import { useState } from "react";
import "./board.style.css";

const createBoard = (rows = 9, columns = 9) => {
  let board = [];
  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < columns; j++) {
      const defaultProp = {
        isMine: false,
        isFlag: false,
        isClicked: false,
        position: {
          x: i,
          y: j,
        },
      };
      board[i].push(defaultProp);
    }
  }
  return board;
};

const renderBoard = (board, updateBoardTile) => {
  return board.map((row, index) => {
    return (
      <div className="row" key={index}>
        {row.map((tile, index) => {
          return (
            <div
              className="tile"
              key={index}
              onClick={() => updateBoardTile(tile.position.x, tile.position.y)}
            >
              {tile.isClicked ? "O" : "X"}
            </div>
          );
        })}
      </div>
    );
  });
};

const Board = () => {
  const initialBoard = createBoard();
  const [board, setBoard] = useState(initialBoard);

  const updateBoardTile = (row, column) => {
    setBoard((board) => {
      let newBoard = [...board];
      newBoard[row][column].isClicked = !newBoard[row][column].isClicked;
      return newBoard;
    });
  };

  console.log("the board", board);
  return (
    <div>
      <div className="Board">{renderBoard(board, updateBoardTile)}</div>
    </div>
  );
};

export default Board;
