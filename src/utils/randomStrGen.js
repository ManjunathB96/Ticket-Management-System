export const randomeCode = () => {
  let str = '1234';
  let randomString = '';
  for (let i = 0; i < str.length; i++) {
    randomString += str.charAt(Math.floor(Math.random() *str.length));
  }
  const code ="CIC-ID-"+randomString
  return code;
};
