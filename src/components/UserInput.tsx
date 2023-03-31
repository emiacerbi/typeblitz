import { FC, useEffect, useState } from 'react';

const TIME_IN_SECONDS = 1000;
const TIMER = 20 * TIME_IN_SECONDS;
const TIME_IN_MINUTES = TIMER / 1000 / 60;
const AVERAGE_WORD_LENGTH = 5;

const UserInput: FC = () => {
  const [userInput, setUserInput] = useState('');

  // const [started, setStarted] = useState(false);
  // const [finished, setFinished] = useState(false);
  // const [finishedWords, setFinishedWords] = useState<string[]>([]);

  const rawParagraph =
    'dairy wife corpse leftovers moral leader tactic Europe leash brain impress stab architecture plastic effect solo spite bathtub jewel zero';

  const arrayOfWords = rawParagraph.split('');

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    const skipKeys = ['Shift', 'Alt', 'Control'];

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

  return (
    <div className="max-w-[30rem] text-center">
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
                className={`${letterStyle} animation underline-offset-2`}
                key={idx}
              >
                {letter}
                {/* <div className="absolute bottom-0 left-0 h-2 w-10 bg-red-200" /> */}
              </span>
            );
          }

          return (
            <span className={`${letterStyle}`} key={idx}>
              {letter}
            </span>
          );
        })}

        {/* {!started && (
          <div className="flex">
            <button
              className="mx-auto mt-10 rounded-md bg-blue-500 p-2"
              // onClick={handleStart}
            >
              Click here to start!
            </button>
          </div>
        )} */}
      </div>

      <div className="mt-10 text-center">
        <p>
          Your average typing speed was{' '}
          <span className="text-blue-400">{netWpm}</span> words per minute.
        </p>
        {/* <p>
          You made <span className="text-red-500">{errors}</span> errors.
        </p> */}
      </div>
    </div>
  );
};

export default UserInput;
