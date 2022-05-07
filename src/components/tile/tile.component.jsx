import "./tile.style.css";
import { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleGameState, endResetGame } from "../../app/appSlice";
import React from "react";

const Tile = React.memo(({ tile, board, setBoard }) => {
  const { x: tileX, y: tileY } = tile.position;
  // console.log(props.position);
  const dispatch = useDispatch();
  const resetGame = useSelector((state) => state.game.resetGame);

  const renders = useRef(0);
  useEffect(() => {
    renders.current++;
    console.log("RENDERING", renders.current);
  });

  // useEffect(() => {
  //   if (resetGame === true) {
  //     setOptions(tile);
  //   }
  // }, [resetGame, dispatch, tile]);

  useEffect(() => {
    if (tile.isClicked === true && tile.isMine === true) {
      console.log("Game Over");
      dispatch(toggleGameState());
    }
  }, [tile.isClicked, tile.isMine]);

  // if (tileX === 0 && tileY === 0) {
  //   tile.surroundingMines = 1;
  // }
  // if (tileX === 1 && tileY === 1) {
  //   tile.isMine = true;
  //   tile.surroundingMines = 1;
  // }

  const renderTile = (board) => {
    if (board[tileX][tileY].isFlag) {
      return "||**";
    } else if (board[tileX][tileY].isClicked) {
      return "X";
    } else {
      return " ";
    }
  };

  const handleTileClick = () => {
    // if (options.isMine) dispatch(toggleGameState());
    setBoard((board) => {
      let newBoard = [...board];
      newBoard[tileX][tileY].isClicked = !newBoard[tileX][tileY].isClicked;
      return newBoard;
    });

    // Open right square if surroundingMines is 0
    setBoard((board) => {
      if (board[tileX][tileY].surroundingMines !== 0) return board;
      if (board[tileX][tileY + 1].surroundingMines === 0) {
        let newBoard = [...board];
        newBoard[tileX][tileY + 1].isClicked = !newBoard[tileX][tileY + 1].isClicked;
        return newBoard;
      } else {
        return board;
      }
    });
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setBoard((board) => {
      let newBoard = [...board];
      newBoard[tileX][tileY].isFlag = !newBoard[tileX][tileY].isFlag;
      return newBoard;
    });
  };

  return (
    <div
      className="tile"
      onClick={() => handleTileClick()}
      onContextMenu={(e) => handleContextMenu(e)}
    >
      {renderTile(board, tile)}
      {/* {renders.current} */}
    </div>
  );
});

export default Tile;
