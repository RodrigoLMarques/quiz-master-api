import type {Config} from 'jest';

const config: Config = {

  clearMocks: true,

  coverageProvider: "v8",
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/@types/*.ts',
    '!src/**/config/*.ts',
    '!src/infra/**/*.ts',
    '!src/core/infra/*.ts',
    '!src/**/mappers/*.ts',
    '!src/**/errors/*.ts',
  ],
  preset: 'ts-jest',

  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: false,
            decorators: true,
          },
          target: 'es2017',
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
        module: {
          type: 'es6',
          noInterop: false,
        },
      },
    ],
  },
};

export default config;
