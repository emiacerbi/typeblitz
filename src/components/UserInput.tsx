import { ChangeEvent, useRef, useState } from 'react';

const TIME_IN_SECONDS = 1000;
const TIMER = 10 * TIME_IN_SECONDS;
const TIME_IN_MINUTES = TIMER / 1000 / 60;
const AVERAGE_WORD_LENGTH = 5;

const UserInput: React.FC = () => {
  const [text, setText] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [errors, setErrors] = useState(0);

  const paragraph =
    'This is a simple paragraph that is meant to be nice and easy to type which is why there will be commas no periods or any capital letters';
  const textRef = useRef(text);
  textRef.current = text;

  const handleStart = () => {
    setStarted(true);
    setTimeout(handleResult, TIMER);
  };

  const handleResult = () => {
    setFinished(true);
    setText(textRef.current);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setText(value);
  };

  // const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
  //   console.log(text);
  //   // if (event.key === ' ') console.log('space pressed');
  // };

  const currentTextLetter = text.split('').slice(-1).join('');

  const letterCount = text.trim().split(' ').join('').length;

  const netWpm = (
    letterCount /
    AVERAGE_WORD_LENGTH /
    TIME_IN_MINUTES
  ).toFixed();

  console.log('Pipeline test number two');

  return (
    <div className="max-w-lg">
      <div className="">
        {paragraph.split('').map((letter, idx) => {
          let letterClass;

          if (letter === currentTextLetter && idx === text.length - 1) {
            letterClass = 'text-green-500';
          } else if (letter !== currentTextLetter && idx === text.length - 1) {
            letterClass = 'text-red-500';
          } else {
            letterClass = 'text-neutral-200';
          }

          return (
            <span className={letterClass} key={idx}>
              {letter}
            </span>
          );
        })}

        {!started && (
          <div className="flex">
            <button
              className="mx-auto mt-10 rounded-md bg-blue-500 p-2"
              onClick={handleStart}
            >
              Click here to start!
            </button>
          </div>
        )}
      </div>

      {started && !finished && (
        <div className="mt-10 flex">
          <input
            className="w-full rounded-md border-4 border-orange-500 bg-neutral-200 p-2 text-neutral-900 outline-none"
            value={text}
            onChange={handleChange}
            // onKeyDown={handleKeyDown}
            type="text"
          />
        </div>
      )}
      {finished && (
        <div className="mt-10 text-center">
          <p>
            Your average typing speed was{' '}
            <span className="text-green-500">{netWpm}</span> words per minute.
          </p>
          <p>
            You made <span className="text-red-500">{errors}</span> errors.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserInput;
