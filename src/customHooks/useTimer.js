import { useState, useCallback, useEffect } from "react";

const useTimer = (defaultStart) => {
  const [timerRunning, setTimerRunning] = useState(defaultStart);
  const [gameTime, setGameTime] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setGameTime((prev) => prev + 1);
    }, 1000);
    if (timerRunning === false) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [timerRunning]);
  const resetTime = useCallback((time = 0) => {
    setGameTime(time);
  }, []);

  return { gameTime, setTimerRunning, resetTime };
};

export default useTimer;
