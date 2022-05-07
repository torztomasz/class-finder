const isUpperCase = (char) => char === char.toUpperCase();
const isLetter = (char) => char.toLowerCase() !== char.toUpperCase();
const isWildCardChar = (char) => char === "*";
const isUpperCaseLetter = (char) => isUpperCase(char) && isLetter(char);

const isStartingWith = (word, pattern) => {
  if (pattern.length > word.length) return false;
  for (const i in pattern) {
    if (word[i] !== pattern[i] && !isWildCardChar(pattern[i])) return false;
  }
  return true;
};

const getUpperCaseLetters = (value) => {
  let upperCaseLetters = "";
  for (const i in value) {
    const char = value.charAt(i);
    if (isLetter(char) && isUpperCase(char)) upperCaseLetters += char;
  }
  return upperCaseLetters;
};

const getClassName = (packageName) => {
  const splitedValue = packageName.split(".");
  return splitedValue[splitedValue.length - 1];
};

module.exports = {
  isUpperCase,
  isLetter,
  isWildCardChar,
  getUpperCaseLetters,
  isStartingWith,
  getClassName,
  isUpperCaseLetter,
};
