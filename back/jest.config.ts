export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/**/index.ts',
    '!<rootDir>/**/*error.ts',
    '!<rootDir>/**/*helper.ts',
    '!<rootDir>/**/*protocols.ts',
    '!<rootDir>/**/*models.ts',
    '!<rootDir>/**/*model.ts',
    '!<rootDir>/**/migrations/*.*',
    '!<rootDir>/**/*entity.ts',
    '!<rootDir>/**/*repository.ts',
    '!<rootDir>/**/*service.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
