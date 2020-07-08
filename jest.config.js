module.exports = {
  globals: {
    window: {},
  },
  setupFiles: ['jest-localstorage-mock'],
  silent: false,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  watchPathIgnorePatterns: ['/store/'],
};
