const { getSearchArray } = require("../utils/arrayUtils");
const { getClassName } = require("../utils/stringUtils");

class Line {
  constructor(value) {
    this.packageName = value.trim();
    this.className = getClassName(this.packageName);
    this.searchArray = getSearchArray(this.className);
  }

  isSearchResult = (searchPattern) => {
    if (this.searchArray.length < searchPattern.length) return false;
    if (searchPattern.isEndingWithSpace) {
      return this.#isEndingWith(searchPattern.searchArray);
    }
    return this.#isContaining(searchPattern.searchArray);
  };

  #isContaining = (searchPatternArray) => {
    if (this.#searchSubarray(searchPatternArray) == -1) return false;
    return true;
  };

  #isEndingWith = (searchPatternArray) => {
    let i = this.searchArray.length - 1;
    for (let j = searchPatternArray.length - 1; j >= 0; j--) {
      if (!this.searchArray[i].isMeetingSearchCriteria(searchPatternArray[j]))
        return false;
      i -= 1;
    }
    return true;
  };

  #searchSubarray(searchPatternArray) {
    //KMP Algorithm
    if (searchPatternArray.length == 0) return 0;

    let lsp = [0];
    for (let i = 1; i < searchPatternArray.length; i++) {
      let j = lsp[i - 1];
      while (
        j > 0 &&
        searchPatternArray[i].isMeetingSearchCriteria(searchPatternArray[j])
      )
        j = lsp[j - 1];
      if (searchPatternArray[i].isMeetingSearchCriteria(searchPatternArray[j]))
        j++;
      lsp.push(j);
    }

    let j = 0;
    for (let i = 0; i < this.searchArray.length; i++) {
      while (
        j > 0 &&
        !this.searchArray[i].isMeetingSearchCriteria(searchPatternArray[j])
      )
        j = lsp[j - 1];
      if (this.searchArray[i].isMeetingSearchCriteria(searchPatternArray[j])) {
        j++;
        if (j == searchPatternArray.length) return i - (j - 1);
      }
    }
    return -1;
  }
}

module.exports = Line;
