import "./board.style.css";
import React, { useState, useRef, useEffect, useMemo } from "react";
import Cell from "../cell/cell.component";
import Button from "../button/button.component";
import Input from "../input/input.component";
import useCountRenders from "../../customHooks/useCountRender";
import { defaultOptions, createGame } from "../helpers/gameHelpers";
import { isValidGameInputs, getBoardData } from "../helpers/boardHelpers";

const Board = ({ resetTime, setTimerRunning, devMode }) => {
  const [gameInputs, setGameInputs] = useState({
    rows: "6",
    columns: "6",
    mines: "4",
  });

  const createGameWithInputs = (options) => {
    if (!isValidGameInputs(gameInputs)) return;
    return createGame({
      rows: gameInputs.rows,
      columns: gameInputs.columns,
      mines: gameInputs.mines,
      defaultOptions,
      ...options,
    });
  };

  const [board, setBoard] = useState(createGameWithInputs());
  const [hiddenCells, setHiddenCells] = useState(true);
  const [gameWin, setGameWin] = useState(false);
  const clickedCells = useRef(0);
  const flagCount = useRef(0);
  const { renders } = useCountRenders(0);

  useEffect(() => {
    const { size } = getBoardData(board);
    if (clickedCells.current === size - parseInt(gameInputs.mines)) {
      setGameWin(true);
    }
  }, [board, gameInputs.mines]);

  useEffect(() => {
    setTimerRunning(true);
    if (hiddenCells === false) setTimerRunning(false);
    if (gameWin === true) setTimerRunning(false);
  }, [gameWin, hiddenCells, setTimerRunning]);

  const handleNewGame = (options) => {
    clickedCells.current = 0;
    flagCount.current = 0;
    resetTime(0);
    setGameWin(false);
    setHiddenCells(true);
    if (options) {
      setGameInputs({
        rows: options.rows,
        columns: options.columns,
        mines: options.mines,
      });
    }
    if (!isValidGameInputs(gameInputs)) return;
    const newGame = createGameWithInputs(options);
    setBoard(newGame);
  };

  const mineEmoji = useMemo(() => "💩", []);
  const flagEmoji = useMemo(() => "🙅‍♂️", []);
  const happyEmoji = useMemo(() => "😁", []);

  const handleNewGameFirstClickMine = () => {
    let newBoard = createGameWithInputs();
    const copyFlags = () =>
      newBoard.forEach((row) => {
        row.forEach((cell) => {
          newBoard[cell.id.x][cell.id.y].isFlag = board[cell.id.x][cell.id.y].isFlag;
        });
      });
    copyFlags();
    return newBoard;
  };

  const handleTitleRender = () => {
    let titleText = "Minesweeper";
    let fontStyle = {};
    if (hiddenCells === false) {
      fontStyle = { color: "#f73131" };
      titleText = "You hit a mine, try again!";
    }
    if (gameWin) {
      fontStyle = { color: "#1DFC85" };
      titleText = "You Win!";
    }
    return (
      <div style={{ margin: "auto", fontSize: "20px", ...fontStyle }}>
        {titleText}
        <div style={{ margin: "auto", fontSize: "12px", paddingTop: "4px" }}>by Benjamin Cai</div>
      </div>
    );
  };

  const handleGridRender = () => {
    const gridStyle = {
      width: "fit-content",
      backgroundColor: "black",
      margin: "auto",
      marginBottom: "8px",
    };
    return (
      <div className="grid" style={gridStyle}>
        {board.map((row, rowIndex) => {
          return (
            <div className="row" key={rowIndex}>
              {row.map((cell, cellIndex) => {
                return (
                  <Cell
                    key={`${rowIndex}${cellIndex}`}
                    cell={cell}
                    clickedCells={clickedCells}
                    board={board}
                    setBoard={setBoard}
                    hiddenCells={hiddenCells}
                    setHiddenCells={setHiddenCells}
                    devMode={devMode}
                    handleNewGameFirstClickMine={handleNewGameFirstClickMine}
                    flagCount={flagCount}
                    mineEmoji={mineEmoji}
                    flagEmoji={flagEmoji}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const renderInputForm = () => {
    return (
      <form
        className="board-form"
        style={{
          display: "grid",
          gridTemplate: "0.2fr 1fr / 1fr 1fr 1fr",
          gridAutoFlow: "column",
          gap: "4px",
        }}
      >
        <label htmlFor="rows">Rows</label>
        <Input
          type="number"
          min={2}
          id="rows"
          placeholder={"rows"}
          value={gameInputs.rows}
          onChange={(e) =>
            setGameInputs((gameInputs) => ({
              ...gameInputs,
              rows: e.target.value,
            }))
          }
        />
        <label htmlFor="columns">Columns</label>
        <Input
          type="number"
          min={2}
          id="columns"
          placeholder={"columns"}
          value={gameInputs.columns}
          onChange={(e) =>
            setGameInputs((gameInputs) => ({
              ...gameInputs,
              columns: e.target.value,
            }))
          }
        />
        <label htmlFor="mines">Mines</label>
        <Input
          type="number"
          min={2}
          id="mines"
          placeholder={"mines"}
          value={gameInputs.mines}
          onChange={(e) =>
            setGameInputs((gameInputs) => ({
              ...gameInputs,
              mines: e.target.value,
            }))
          }
        />
      </form>
    );
  };

  const boardGap = "8px";

  return (
    <div className="board" style={{ display: "flex", flexDirection: "column", gap: boardGap }}>
      <div>{devMode ? `Board renders: ${renders.current}` : ""}</div>
      <div>
        Opened Cells {happyEmoji} : {clickedCells.current}
      </div>
      <div>
        Number of Mines {mineEmoji} : {flagCount.current}
      </div>
      {handleTitleRender()}
      {handleGridRender()}
      <div
        className="difficultySelector"
        style={{ display: "flex", flexDirection: "row", gap: "12px" }}
      >
        <Button onClick={() => handleNewGame({ rows: 6, columns: 6, mines: 4 })}>Easy</Button>
        <Button onClick={() => handleNewGame({ rows: 10, columns: 10, mines: 15 })}>
          Intermediate
        </Button>
        <Button onClick={() => handleNewGame({ rows: 16, columns: 16, mines: 25 })}>
          Advanced
        </Button>
      </div>
      {renderInputForm()}
      <Button onClick={handleNewGame}>{hiddenCells ? "New Game" : "Reset"}</Button>
    </div>
  );
};

export default React.memo(Board, (prev, next) => {
  if (prev.devMode !== next.devMode) return false;
  return true;
});
