const mdLinks = require('../src/mdlinks');
const { extractLinks, linkValidation, linkStatistics } = require('../src/index.js');
// const mockedFetch = jest.fn()

describe('mdLinks', () => {
  it('shoud be an object', () => {
    expect(typeof mdLinks).toBe('object');
  });
});

describe('extractLinks', () => {
  it('shoud be a function', () => {
    expect(typeof extractLinks).toBe('function');
  });
});

describe('linkValidation', () => {
  it('shoud be a function', () => {
    expect(typeof linkValidation).toBe('function');
  });
});

describe('linkStatistics', () => {
  it('shoud be a function', () => {
    expect(typeof linkStatistics).toBe('function');
  });
});
