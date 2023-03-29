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
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ipsum inventore harum quisquam, eligendi placeat labore provident officia assumenda eum rem. Quod nihil consequuntur delectus cupiditate ratione autem ad officia!';

  const textRef = useRef(text);
  textRef.current = text;

  const handleStart = () => {
    setStarted(true);

    setTimeout(handleResult, TIMER);
  };

  const handleResult = () => {
    setFinished(true);
    setText(textRef.current);

    const typedWords = textRef.current.trim().split(' ');
    const originalWords = paragraph.trim().split(' ');
    let errorCount = 0;

    typedWords.forEach((word, i) => {
      if (word !== originalWords[i]) {
        errorCount++;
      }
    });

    setErrors(errorCount);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const letterCount = text.trim().split(' ').join('').length;
  const netWpm = (
    letterCount /
    AVERAGE_WORD_LENGTH /
    TIME_IN_MINUTES
  ).toFixed();

  return (
    <div className="max-w-lg">
      <div className="flex flex-col">
        <p className="text-orange-500 text-center">{paragraph}</p>

        {!started && (
          <button
            className="bg-blue-500 p-2 rounded-md mt-10 mx-auto"
            onClick={handleStart}
          >
            Click here to start!
          </button>
        )}
      </div>

      {started && !finished && (
        <div className="mt-10 flex">
          <textarea
            className="rounded-md border-4 outline-none p-2 bg-neutral-200 border-orange-500 w-full text-neutral-900"
            value={text}
            onChange={handleChange}
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
