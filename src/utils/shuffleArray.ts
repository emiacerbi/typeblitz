export const shuffledArray = (array: string[]) => {
  return array.sort(() => 0.5 - Math.random());
};
