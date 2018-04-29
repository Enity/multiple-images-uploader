module.exports = {
  verbose: true,
  rootDir: '../../',
  transform: {
    "^.+\\.js?$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.ts?$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      skipBabel: true,
      useBabelrc: true
    }
  },
  testRegex: "(/tests/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  testPathIgnorePatterns: ['/node_modules/', 'jest.config.js'],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  moduleNameMapper: {
    '^(?!@babel)@(.*)$': '<rootDir>/src/$1'
  }
};
