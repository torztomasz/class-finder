const Line = require("./Line");
const SearchPattern = require("./SearchPattern");
const FileSystem = require("fs");

class SearchResults {
  #filePath;
  #searchResults = [];
  #searchPattern;

  constructor(filePath, searchedPhrase) {
    this.#filePath = filePath;
    this.#searchPattern = new SearchPattern(searchedPhrase);
    this.#findSearchResults();
  }

  getSearchResults = () =>
    this.#searchResults.map((searchResult) => searchResult.packageName);

  log = () => {
    if (this.#searchResults.length != 0) {
      console.log("Search results:");
      this.#searchResults.forEach((searchResult) =>
        console.log(searchResult.packageName)
      );
    } else {
      console.log("No result for given search criteria");
    }
  };

  #sortResultsByClassName = () => {
    this.#searchResults.sort((a, b) => {
      if (a.className < b.className) return -1;
      else if (a.className > b.className) return 1;
      return 0;
    });
  };

  #findSearchResults = () => {
    const lines = FileSystem.readFileSync(this.#filePath)
      .toString()
      .split("\n");
    for (const i in lines) {
      this.#onLine(lines[i]);
    }
    this.#sortResultsByClassName();
  };

  #onLine = (value) => {
    if (value) {
      const line = new Line(value);
      if (line.isSearchResult(this.#searchPattern))
        this.#searchResults.push(line);
    }
  };
}

module.exports = SearchResults;
