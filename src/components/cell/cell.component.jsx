import "./cell.style.css";
import React, { useMemo, useEffect } from "react";
import Copier from "../helpers/Copier";
import useCountRenders from "../../customHooks/useCountRender";
import { countSurroundingAttribute } from "../helpers/gameHelpers";
import { expandSelection } from "../helpers/cellHelpers";

const Cell = (props) => {
  const {
    cell,
    board,
    setBoard,
    hiddenCells,
    setHiddenCells,
    clickedCells,
    devMode,
    handleNewGameFirstClickMine,
    flagCount,
  } = props;

  /*
      Make first click reset isolated test, remake new game
      or, render bombs on first click:
      should be good now, but it's not the dry-est
    */
  const mineEmoji = useMemo(() => "💩", []);
  const flagEmoji = useMemo(() => "🙅‍♂️", []);
  const { renders } = useCountRenders(0);

  useEffect(() => {
    if (cell.isMine && cell.isClicked) {
      setHiddenCells(false);
    }
  }, [cell.isClicked, cell.isMine, setHiddenCells]);

  const handleClickMine = (cell) => {
    if (clickedCells.current === 0 && board[cell.id.x][cell.id.y].isMine) {
      /* 
          Have to pass in current board with flag positions to allow re-render and keep flags
          This means clicking flag before first left click will re-render the whole board
          Alternatively, we could disable right click until left click occurs
        */

      const newBoard = handleNewGameFirstClickMine();
      setBoard(newBoard);
      handleClick(newBoard[cell.id.x][cell.id.y]);
    } else {
      return setHiddenCells(false);
    }
  };

  const handleClick = (cell) => {
    if (cell.isFlag || cell.isClicked) return;
    if (cell.isMine) {
      return handleClickMine(cell);
    }
    if (!cell.isClicked) {
      clickedCells.current++;
    }
    setBoard((board) => {
      let newBoard = Copier.deep(board);
      newBoard = expandSelection(newBoard, cell, clickedCells);
      return newBoard;
    });
  };

  const handleContextMenu = (e, cell) => {
    e.preventDefault();
    if (cell.isClicked) return;
    if (!cell.isFlag) {
      flagCount.current++;
    } else {
      flagCount.current--;
    }
    setBoard((board) => {
      let newBoard = Copier.deep(board);
      newBoard[cell.id.x][cell.id.y].isFlag = !newBoard[cell.id.x][cell.id.y].isFlag;
      return newBoard;
    });
  };

  const handleDoubleClick = (cell) => {
    /*
        Pass in whole board to keep track of flag positions
        so they can be passed into the newBoard
      */
    const flags = countSurroundingAttribute(board, cell, false, "isFlag");
    if (flags !== cell.surroundingMines) return;
    if (cell.isFlag) return;
    setBoard((board) => {
      let newBoard = Copier.deep(board);
      newBoard = expandSelection(newBoard, cell, clickedCells, true, false);
      return newBoard;
    });
  };

  const handleStyle = (cell) => {
    if (cell.isClicked || !hiddenCells) {
      const isEven = (cell.id.x + cell.id.y) % 2 === 0;
      const evenColor = "rgb(94, 28, 42)";
      const oddColor = "rgb(133, 7, 58)";
      let color = isEven ? evenColor : oddColor;
      if (cell.isMine) color = "rgb(78,77,80)";
      const cellBoxShadow = "0 0 0 0";
      return {
        backgroundColor: color,
        boxShadow: cellBoxShadow,
      };
    }
    return {};
  };

  const renderCellFace = (cell) => {
    const isGameOver = hiddenCells === false && !devMode;
    if (isGameOver) {
      let content = cell.surroundingMines;
      if (cell.isMine) content = mineEmoji;
      if (cell.isFlag) content = flagEmoji;
      return (
        <div>
          <div>{content}</div>
        </div>
      );
    }

    // View for normal players
    if (!devMode) {
      if (cell.isFlag && !cell.isClicked)
        return (
          <div
            className={"animate"}
            style={{
              opacity: 1,
              fontSize: "15px",
              paddingRight: "6px",
              paddingBottom: "3px",
            }}
          >
            {cell.isFlag ? flagEmoji : ""}
          </div>
        );
      if (cell.isClicked === false && !cell.isFlag)
        return <div className={"animate"} style={{ opacity: 0, fontSize: "0px" }}></div>;
      if (cell.isMine) return mineEmoji;
      return <div>{cell.surroundingMines ? cell.surroundingMines : ""}</div>;
    }

    // If dev mode is ON
    if (devMode) {
      const devFontSize = "10px";
      return (
        <div style={{ fontSize: devFontSize, whiteSpace: "pre-line" }}>
          {`${cell.isMine ? mineEmoji : ""} ${cell.isFlag ? flagEmoji : ""}
          B: ${cell.surroundingMines ? cell.surroundingMines : ""}
          r: ${renders.current}
          `}
        </div>
      );
    }
  };

  return (
    <div
      className={"cell"}
      style={handleStyle(cell)}
      onClick={() => handleClick(cell)}
      onContextMenu={(e) => handleContextMenu(e, cell)}
      onDoubleClick={() => handleDoubleClick(cell)}
    >
      {renderCellFace(cell)}
    </div>
  );
};

export default React.memo(Cell, (prevProps, nextProps) => {
  if (
    prevProps.cell.isClicked !== nextProps.cell.isClicked ||
    prevProps.hiddenCells !== nextProps.hiddenCells ||
    prevProps.cell.isMine !== nextProps.cell.isMine ||
    prevProps.cell.surroundingMines !== nextProps.cell.surroundingMines ||
    prevProps.cell.isFlag !== nextProps.cell.isFlag ||
    prevProps.devMode !== nextProps.devMode ||
    (prevProps.clickedCells.current === 0 &&
      prevProps.handleNewGameFirstClickMine !== nextProps.handleNewGameFirstClickMine) ||
    prevProps.board !== nextProps.board
  ) {
    return false;
  }
  return true;
});
