// module.exports = {
//   globals: {
//     window: {},
//   },
//   preset: 'jest-expo',
//   setupFiles: ['jest-localstorage-mock'],
//   silent: false,
//   testEnvironment: 'node',
//   testPathIgnorePatterns: ['/node_modules/'],
//   watchPathIgnorePatterns: ['/store/'],
// };

module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!**/__stories__/**', '!**/__tests__/**'],
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '@testing-library/jest-native/extend-expect'],
  testMatch: ['<rootDir>/src/**/__tests__/(*.)+test.[jt]s?(x)'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@lookiero/.*|react-clone-referenced-element|@react-native-community|@react-native-picker|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
  ],
  verbose: false,
};
