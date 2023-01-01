import { Config, createConfig } from '@umijs/max/test';

const base = createConfig({
  target: 'browser',
  jsTransformer: 'esbuild',
  // config opts for esbuild , it will pass to esbuild directly
  jsTransformerOpts: { jsx: 'automatic' },
});

const config: Config.InitialOptions = {
  ...base,
  setupFilesAfterEnv: ['<rootDir>/tests/jest-setup.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,js,tsx,jsx}',
    '!src/.umi/**',
    '!src/.umi-test/**',
    '!src/.umi-production/**',
  ],
  moduleNameMapper: {
    '@arvinxu/npm-template/(.*)$': '<rootDir>/src/$1',
    '@arvinxu/npm-template': '<rootDir>/src',
  },
  // if you require some es-module npm package, please uncomment below line and insert your package name
  // transformIgnorePatterns: ['node_modules/(?!.*(lodash-es|your-es-pkg-name)/)']
};

export default config;
