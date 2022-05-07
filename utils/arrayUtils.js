const SearchObject = require("../models/SearchObject");
const { getUpperCaseLetters, isUpperCaseLetter } = require("./stringUtils");

const splitStringByUpperCase = (value) => {
  const isLowerLettersOnly = !Boolean(getUpperCaseLetters(value));
  const valueToSplit = isLowerLettersOnly ? value.toUpperCase() : value;
  const space = " ";
  let result = "";
  for (const i in valueToSplit) {
    const char = valueToSplit.charAt(i);
    const newChar = isUpperCaseLetter(char) ? space + char : char;
    result += newChar;
  }
  return result.trim().split(space);
};

const getSearchArray = (value) => {
  const searchArray = [];
  const splittedValue = splitStringByUpperCase(value);

  for (const i in splittedValue) {
    const word = splittedValue[i];
    let upperCaseLetter = "";
    let lowerCaseLetters = [];
    for (const j in word) {
      const char = word[j];
      if (isUpperCaseLetter(char)) {
        upperCaseLetter = char;
      } else {
        lowerCaseLetters.push(char);
      }
    }
    const searchObject = new SearchObject(upperCaseLetter, lowerCaseLetters);
    searchArray.push(searchObject);
  }
  return searchArray;
};

module.exports = { getSearchArray };
