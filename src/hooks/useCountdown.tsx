import { useEffect, useState } from 'react';

const useCountdown = (time: number) => {
  const [count, setCount] = useState(time);
  const [isCounting, setIsCounting] = useState(false);

  const startCounting = () => {
    setIsCounting(true);
  };

  useEffect(() => {
    if (isCounting) {
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      if (count === 0) {
        clearInterval(interval);
        setIsCounting(false);
      }

      return () => clearInterval(interval);
    }
  }, [count, isCounting]);

  return { count, startCounting, isCounting };
};

export { useCountdown };
