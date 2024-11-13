module.exports = {
  setupFiles: ['jest-plugin-context/setup', 'given2/setup', 'jest-canvas-mock'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: ['node_modules/(?!(swiper|ssr-window|dom7)/)'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/imageMock.js',
    'swiper/react': 'swiper/react/swiper-react.js',
    'swiper/css': 'swiper/swiper.min.css',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', 'pages/**/*.{js,jsx,ts,tsx}', '!**/node_modules/**'],
  coverageDirectory: './coverage',
  testPathIgnorePatterns: ['<rootDir>/node_modules/*', '<rootDir>/.next/*'],
};
