// jest.config.js
export default {
  // Add configuration options here
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {},
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
