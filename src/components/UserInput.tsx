import { ChangeEvent, useEffect, useRef, useState } from 'react';

const TIME_IN_SECONDS = 1000;
const TIMER = 10 * TIME_IN_SECONDS;
const TIME_IN_MINUTES = TIMER / 1000 / 60;
const AVERAGE_WORD_LENGTH = 5;

const UserInput: React.FC = () => {
  const [text, setText] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  // const [errors, setErrors] = useState(0);

  const [greenLetters, setGreenLetters] = useState<number[]>([]);
  const [redLetters, setRedLetters] = useState<number[]>([]);

  const paragraph = 'This is a simple';

  const splittedParagraph = paragraph.split('');
  const splittedText = text.split('');

  const splittedParagraphInWords = paragraph.split(' ');
  const splittedTextInWords = paragraph.split(' ');

  const currentTextLetter = text.split('').slice(-1).join('');
  const textLetterIndex = splittedText.length - 1;

  const textRef = useRef(text);
  textRef.current = text;

  const errors = redLetters.length;

  useEffect(() => {
    if (splittedParagraph[textLetterIndex] === currentTextLetter) {
      setGreenLetters([...greenLetters, textLetterIndex]);
    } else {
      setGreenLetters(
        greenLetters.filter((letter) => letter !== textLetterIndex)
      );
    }

    if (text && splittedParagraph[textLetterIndex] !== currentTextLetter) {
      setRedLetters([...redLetters, textLetterIndex]);
    } else {
      setRedLetters(redLetters.filter((letter) => letter !== textLetterIndex));
    }
  }, [text]);

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

  const letterCount = text.trim().split(' ').join('').length;

  const netWpm = (
    letterCount /
    AVERAGE_WORD_LENGTH /
    TIME_IN_MINUTES
  ).toFixed();

  // console.log(splittedParagraphInWords);
  // console.log(splittedTextInWords);

  return (
    <div className="max-w-lg">
      <div>
        {splittedParagraph.map((letter, idx) => {
          let letterStyle = greenLetters.includes(idx)
            ? 'text-green-400'
            : redLetters.includes(idx)
            ? 'text-red-500 bg-red-100'
            : 'text-neutral-100';

          return (
            <span className={letterStyle} key={idx}>
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
