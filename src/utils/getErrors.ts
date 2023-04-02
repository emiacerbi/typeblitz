export const getErrors = (userInput: string, arrayOfWords: string[]) => {
  return userInput.split('').reduce((acc, el, idx) => {
    if (el !== arrayOfWords[idx]) {
      acc++;
    }

    return acc;
  }, 0);
};
