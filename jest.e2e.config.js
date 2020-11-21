module.exports = {
  preset: 'ts-jest',
  verbose: true,
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@e2e-utils': '<rootDir>/e2e/__utils__',
  },
  setupFilesAfterEnv: ['./e2e/setupE2E.ts'],
  testMatch: ['**/e2e/**/?(*.)+(e2e).ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['js', 'ts'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
