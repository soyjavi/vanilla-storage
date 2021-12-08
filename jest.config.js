// const DEFAULTS = require('./jest.config.defaults');

// console.log(DEFAULTS);
// module.exports = {
//   projects: [
//     { ...DEFAULTS, preset: 'jest-expo/ios' },
//     { ...DEFAULTS, preset: 'jest-expo/android' },
//     { ...DEFAULTS, preset: 'jest-expo/web' },
//   ],
// };

module.exports = {
  globals: {
    window: {},
  },
  // testMatch: ['<rootDir>/src/AsyncStorage.test.js'],

  setupFiles: ['jest-localstorage-mock'],
  silent: false,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  watchPathIgnorePatterns: ['/store/'],
};
