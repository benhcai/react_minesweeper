import "./app.style.css";
import { useState } from "react";
import Board from "../components/board/board.component";
import useTimer from "../customHooks/useTimer";
import Button from "../components/button/button.component";

const App = () => {
  const [devMode, setDevMode] = useState(false);
  const { gameTime, setTimerRunning, resetTime } = useTimer(true);

  return (
    <div className="App">
      <Button
        style={{ width: "100%", maxWidth: "200px" }}
        onClick={() => setDevMode((prev) => !prev)}
      >
        Dev Mode: {devMode ? "ON" : "OFF"}
      </Button>
      <div>Game Time: {gameTime}</div>
      <Board resetTime={resetTime} setTimerRunning={setTimerRunning} devMode={devMode} />
    </div>
  );
};

export default App;
