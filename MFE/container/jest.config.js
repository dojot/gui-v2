const config = {
  testEnvironment: 'jsdom',
  testURL: 'https://www.dojot.com/',
  collectCoverage: true,
  coverageDirectory: 'test/unit/coverage',
  verbose: true,
  testTimeout: 10000,
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/setup/',
    '<rootDir>/node_modules/',
    'test/unit/coverage',
  ],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup/jestTestSetup.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css)$': 'identity-obj-proxy',
    '^APIs(.*)$': '<rootDir>/src/adapters/api$1',
    '^Assets(.*)$': '<rootDir>/src/assets$1',
    '^Components(.*)$': '<rootDir>/src/components$1',
    '^Services(.*)$': '<rootDir>/src/adapters/services$1',
    '^Themes(.*)$': '<rootDir>/src/themes$1',
    '^sharedComponents/Utils(.*)$': '<rootDir>/../common/src/utils$1',
  },
  automock: false,
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(js|jsx|json)$',
  moduleFileExtensions: ['js', 'json', 'jsx'],
};

module.exports = config;
