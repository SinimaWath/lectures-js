export default {
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/unit/**/*.test.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  clearMocks: true
};
