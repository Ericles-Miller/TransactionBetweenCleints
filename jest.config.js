const path = require('path');

module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/Tests/UnitTest/**/*.spec.ts'],
  moduleNameMapper: {
    '^@Applications/(.*)$': path.resolve(__dirname, 'src/Applications/$1'),
    '^@Domain/(.*)$': path.resolve(__dirname, 'src/Domain/$1'),
    '^@Infra/(.*)$': path.resolve(__dirname, 'src/Infra/$1'),
    '^@Tests/(.*)$': path.resolve(__dirname, 'src/Tests/$1'),
    '^@Ioc/(.*)$': path.resolve(__dirname, 'src/IoC/$1'),
  },
};
