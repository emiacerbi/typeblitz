import { AVERAGE_WORD_LENGTH, TIME_IN_MINUTES } from '@/constants';
import { useCountdown } from '@/hooks/useCountdown';
import { getErrors } from '@/utils/getErrors';
import { FC, useEffect, useRef, useState } from 'react';

type Props = {
  arrayOfWords: string[];
};

const UserInput: FC<Props> = ({ arrayOfWords }) => {
  const [userInput, setUserInput] = useState('');
  const { count, startCounting, isCounting } = useCountdown(10);
  const isCountingRef = useRef(isCounting);
  isCountingRef.current = isCounting;

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStart = () => {
    startCounting();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleStart();
    }

    if (!isCountingRef.current) return;
    const skipKeys = ['Enter', 'Shift', 'Alt', 'Control', 'Escape'];

    if (skipKeys.includes(e.key)) return;

    if (e.key === 'Backspace') {
      setUserInput((prevUserInput) => prevUserInput.slice(0, -1));
      return;
    }

    setUserInput((prevUserInput) => prevUserInput.concat(e.key));
  };

  const letterCount = userInput.trim().length;

  const netWpm = (
    letterCount /
    AVERAGE_WORD_LENGTH /
    TIME_IN_MINUTES
  ).toFixed();

  const errors = getErrors(userInput, arrayOfWords);

  return (
    <div className="flex w-full max-w-[50rem] flex-col gap-8 text-center">
      <div className="text-4xl text-blue-400">{count}</div>
      {!isCounting && <p>Click Enter to start</p>}

      <div className="text-2xl">
        {arrayOfWords.map((letter, idx) => {
          let letterStyle = 'relative tracking-wider ';

          if (letter === userInput[idx]) {
            letterStyle += 'text-blue-400';
          }

          if (
            letter !== userInput[idx] &&
            idx < userInput.length &&
            letter !== ' '
          ) {
            letterStyle += 'underline text-red-400';
          }

          if (idx === userInput.length && letter !== ' ') {
            return (
              <span
                className={`${letterStyle} ${
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  isCountingRef.current && `animation underline-offset-2`
                } `}
                key={idx}
              >
                {letter}
              </span>
            );
          }

          return (
            <span className={`${letterStyle}`} key={idx}>
              {letter}
            </span>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <p>
          Your average typing speed was{' '}
          <span className="text-blue-400">{netWpm}</span> words per minute.
        </p>
        <p>
          You made <span className="text-red-500">{errors}</span> errors.
        </p>
      </div>
    </div>
  );
};

export default UserInput;
