interface TypingResult {
  speed: number;
  accuracy: number;
}

export function checkTypingSpeed(
  text: string,
  timeInSeconds: number,
  typedText: string
): TypingResult {
  const textLength = text.length;

  let errors = 0;
  for (let i = 0; i < textLength; i++) {
    if (text[i] !== typedText[i]) {
      errors++;
    }
  }

  const accuracy = ((textLength - errors) / textLength) * 100;

  const typingSpeed = Math.round(textLength / 5 / (timeInSeconds / 60));

  return { speed: typingSpeed, accuracy: accuracy };
}
