import mockReducer from "./mockReducer";
import appSlice from "../app/appSlice";

const rootReducer = {
  mock: mockReducer,
  game: appSlice,
};

export default rootReducer;
