import { createSlice } from "@reduxjs/toolkit";

const initialState = { gameState: true, resetGame: false };
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleGameState: (state) => {
      return { ...state, gameState: !state.gameState };
    },
    setGameReady: (state) => {
      return { ...state, gameState: true };
    },
    startResetGame: (state) => {
      return { ...state, resetGame: true };
    },
    endResetGame: (state) => {
      return { ...state, resetGame: false };
    },
  },
});

export const { toggleGameState, setGameReady, startResetGame, endResetGame } = appSlice.actions;
export default appSlice.reducer;
