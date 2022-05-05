import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { mockVal: 0 };
const mockSlice = createSlice({
  name: "mock",
  initialState: initialState,
  reducers: {
    log: (state) => {
      console.log(state);
    },
    addCount: (state, action) => {
      state.mockVal += action.payload;
    },
  },
});

console.log(mockSlice);

export const { log, addCount } = mockSlice.actions;
export default mockSlice.reducer;
