module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  setupFiles: ['zone.js/dist/zone-testing.js'],
  detectOpenHandles: true,
};
