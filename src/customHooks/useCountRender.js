import { useRef, useEffect } from "react";

const useCountRenders = (initialCount) => {
  const renders = useRef(initialCount);
  useEffect(() => {
    renders.current++;
  });
  return { renders };
};

export default useCountRenders;
