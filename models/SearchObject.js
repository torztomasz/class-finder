const { isStartingWith } = require("../utils/stringUtils");

class SearchObject {
  constructor(upperCaseLetter = "", lowerCaseLetters = []) {
    this.upperCaseLetter = upperCaseLetter;
    this.lowerCaseLetters = lowerCaseLetters;
  }

  isMeetingSearchCriteria = (searchObject) =>
    this.upperCaseLetter === searchObject.upperCaseLetter &&
    isStartingWith(this.lowerCaseLetters, searchObject.lowerCaseLetters);
}

module.exports = SearchObject;
