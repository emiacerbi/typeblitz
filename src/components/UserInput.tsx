import { FC, useEffect, useRef, useState } from 'react';
import { AVERAGE_WORD_LENGTH, COUNT, TIME_IN_MINUTES } from '@/constants';
import { useCountdown } from '@/hooks/useCountdown';
import { getErrors } from '@/utils/getErrors';
import { User } from '@prisma/client';
import { statisticService } from '@/services/statistics';

type Props = {
  arrayOfWords: string[];
  user: User | null;
};

const UserInput: FC<Props> = ({ arrayOfWords, user }) => {
  const [userInput, setUserInput] = useState('');
  const { count, startCounting, isCounting } = useCountdown(COUNT);
  const isCountingRef = useRef(isCounting);
  isCountingRef.current = isCounting;

  const currentLetterRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStart = () => {
    setUserInput('');
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

  const handleSaveStats = async () => {
    console.log('Alo?');
    const response = await statisticService.create({
      userId: 'clg2v5b9o0002w2s4j839jpux',
      wpm: netWpm,
    });

    console.log(response);
  };

  const letterCount = userInput.trim().length;
  const errors = getErrors(userInput, arrayOfWords);
  const correctKeys = letterCount - errors;

  const netWpm = (
    letterCount /
    AVERAGE_WORD_LENGTH /
    TIME_IN_MINUTES
  ).toFixed();

  const accuracy = ((correctKeys / letterCount) * 100).toFixed();

  return (
    <div className="load flex w-full max-w-screen-xl flex-col">
      <div className="flex items-end gap-4">
        <div className="text-center text-4xl text-primary">{count}</div>

        {count === 0 && (
          <>
            <p className="ml-auto">
              WPM:
              <span className="text-green-400"> {netWpm}</span>
            </p>
            <p>
              Accuracy:
              <span className="text-orange-400"> {accuracy}%</span>
            </p>
            <button
              onClick={() => void handleSaveStats()}
              className="bg-neutral-800"
            >
              Save result
            </button>
          </>
        )}
      </div>

      <div className={`max-h-32 max-w-prose overflow-hidden text-2xl`}>
        {arrayOfWords.map((letter, idx) => {
          let letterStyle = 'tracking-wider';

          if (letter === userInput[idx]) {
            letterStyle += ' text-primary';
          }

          if (
            letter !== userInput[idx] &&
            idx < userInput.length &&
            letter !== ' '
          ) {
            letterStyle += ' underline text-red-400';
          }

          if (idx === userInput.length) {
            currentLetterRef.current?.scrollIntoView();

            if (letter !== ' ') {
              return (
                <span
                  className={`${letterStyle} ${
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    isCountingRef.current && `animation underline-offset-2`
                  } `}
                  key={idx}
                  ref={currentLetterRef}
                >
                  {letter}
                </span>
              );
            }
          }

          return (
            <span className={`${letterStyle}`} key={idx}>
              {letter}
            </span>
          );
        })}
      </div>

      {!isCounting ? (
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2">
          Press enter to start
        </div>
      ) : (
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2">
          Press enter to restart
        </div>
      )}
    </div>
  );
};

export default UserInput;
