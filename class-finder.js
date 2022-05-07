#!/usr/bin/env node
const SearchResults = require("./models/SearchResults");

const filePath = process.argv[2];
const searchedPhrase = process.argv[3];

const searchResults = new SearchResults(filePath, searchedPhrase);
searchResults.log();
