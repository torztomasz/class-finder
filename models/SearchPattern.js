const { getSearchArray } = require("../utils/arrayUtils");

class SearchPattern {
  constructor(value) {
    this.searchArray = getSearchArray(value);
    this.isEndingWithSpace = value.endsWith(" ");
  }
}

module.exports = SearchPattern;
