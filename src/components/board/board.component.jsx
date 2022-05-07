import { useState } from "react";
import "./board.style.css";
import Tile from "../tile/tile.component";
import { toggleGameState, startResetGame, endResetGame, setGameReady } from "../../app/appSlice";
import { useSelector, useDispatch } from "react-redux";

const createBoard = (rows = 3, columns = 3) => {
  let board = [];
  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < columns; j++) {
      const tileProps = {
        isMine: false,
        isFlag: false,
        isClicked: false,
        surroundingMines: 0,
        position: {
          x: i,
          y: j,
        },
      };
      board[i].push(tileProps);
    }
  }
  return board;
};

const renderBoard = (board, setBoard) => {
  return board.map((row, rowIndex) => {
    return (
      <div className="row" key={rowIndex}>
        {row.map((tile, tileIndex) => {
          return <Tile key={tileIndex} tile={tile} board={board} setBoard={setBoard}></Tile>;
        })}
      </div>
    );
  });
};

const Board = () => {
  const dispatch = useDispatch();
  const initialBoard = createBoard();
  const [board, setBoard] = useState(initialBoard);
  const [boardSize, setBoardSize] = useState({ rows: 3, columns: 3 });

  const gameState = useSelector((state) => state.game.gameState);

  const handleCreateBoard = (rows, columns) => {
    const boardSize = createBoard(rows, columns);
    setBoard(boardSize);
  };

  const handleGenerateBombs = (board, setBoard) => {
    setBoard((board) => {
      let newBoard = [...board];
      newBoard[0][0].surroundingMines = 1;
      newBoard[1][1].isMine = true;
      newBoard[1][1].surroundingMines = 1;
      return newBoard;
    });
  };

  console.log("the board", board);
  return (
    <div>
      {gameState ? "Let's go handsome!" : "Game over, mate"}
      <div className="Board">{renderBoard(board, setBoard)}</div>
      <button
        onClick={() => {
          dispatch(startResetGame());
          dispatch(setGameReady());
          setTimeout(() => {
            dispatch(endResetGame());
          });
        }}
      >
        Reset game
      </button>
      <button onClick={() => handleCreateBoard(boardSize.rows, boardSize.columns)}>
        Create Board
      </button>
      {/* Changing this form causes the board to re-render */}
      <form>
        <input
          type="number"
          value={boardSize.rows}
          onChange={(e) => setBoardSize((boardSize) => ({ ...boardSize, rows: e.target.value }))}
        />
        <input
          type="number"
          value={boardSize.columns}
          onChange={(e) => setBoardSize((boardSize) => ({ ...boardSize, columns: e.target.value }))}
        />
      </form>
      <button onClick={() => handleGenerateBombs(board, setBoard)}>Generate Bombs</button>
    </div>
  );
};

export default Board;
