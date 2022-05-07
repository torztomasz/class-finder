const { describe, test, expect } = require("@jest/globals");
const SearchResults = require("../models/SearchResults.js");

const {
  isUpperCase,
  isLetter,
  isWildCardChar,
  getClassName,
  isStartingWith,
  getUpperCaseLetters,
} = require("../utils/stringUtils.js");

describe("String identification", () => {
  test("Is letter", () => {
    expect(isLetter("a")).toBe(true);
    expect(isLetter("A")).toBe(true);
    expect(isLetter(" ")).toBe(false);
    expect(isLetter(".")).toBe(false);
  });

  test("Is upper case", () => {
    expect(isUpperCase("T")).toBe(true);
    expect(isUpperCase("t")).toBe(false);
  });

  test("Is wild card char", () => {
    expect(isWildCardChar("*")).toBe(true);
    expect(isWildCardChar("a")).toBe(false);
    expect(isWildCardChar(".")).toBe(false);
  });

  test("Getting upper case letters from string", () => {
    expect(getUpperCaseLetters("TesTiNgSTRing")).toBe("TTNSTR");
  });

  test("Is starting with", () => {
    expect(isStartingWith("string", "str")).toBe(true);
    expect(isStartingWith("string", "tr")).toBe(false);
    expect(isStartingWith("string", "*tr")).toBe(true);
  });

  test("Getting class name out of package name", () => {
    expect(getClassName("a.b.ClassName")).toBe("ClassName");
    expect(getClassName("codeborne.WishMaker")).toBe("WishMaker");
    expect(getClassName("ClassName")).toBe("ClassName");
  });
});

describe("Searching algorithm", () => {
  test("Searching by capital letters only", () => {
    const input = "FBB";
    const searchResults = new SearchResults("classes.txt", input);

    const output = searchResults.getSearchResults();

    const expectedOutput = ["a.b.FooBarBaz"];
    expect(output).toStrictEqual(expectedOutput);
  });

  test("Searching by capital and small letters", () => {
    const input = "FoBa";
    const searchResults = new SearchResults("classes.txt", input);

    const output = searchResults.getSearchResults();

    const expectedOutput = ["c.d.FooBar", "a.b.FooBarBaz"];
    expect(output).toStrictEqual(expectedOutput);
  });

  test("Searching with wrong capital letters order", () => {
    const input = "BF";
    const searchResults = new SearchResults("classes.txt", input);

    const output = searchResults.getSearchResults();

    const expectedOutput = [];
    expect(output).toStrictEqual(expectedOutput);
  });

  test("Searching with only lower letters", () => {
    const input = "fb";
    const searchResults = new SearchResults("classes.txt", input);

    const output = searchResults.getSearchResults();

    const expectedOutput = ["c.d.FooBar", "a.b.FooBarBaz"];
    expect(output).toStrictEqual(expectedOutput);
  });

  test("Searching with space at the end", () => {
    const input = "FBar ";
    const searchResults = new SearchResults("classes.txt", input);

    const output = searchResults.getSearchResults();

    const expectedOutput = ["c.d.FooBar"];
    expect(output).toStrictEqual(expectedOutput);
  });

  test("Searching with wildcard char", () => {
    const input = "B**";
    const searchResults = new SearchResults("classes.txt", input);

    const output = searchResults.getSearchResults();

    const expectedOutput = ["c.d.FooBar", "a.b.FooBarBaz"];
    expect(output).toStrictEqual(expectedOutput);
  });
});
