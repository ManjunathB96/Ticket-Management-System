export const randomeCode = () => {
  let str = '12345678';
  let randomNumber= '';
  for (let i = 0; i < str.length; i++) {
    randomNumber += str.charAt(Math.floor(Math.random() *str.length));
  }
  return randomNumber;
};
