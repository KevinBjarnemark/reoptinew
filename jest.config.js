export default {
    testEnvironment: "jest-environment-jsdom",
    testMatch: ["**/tests/**/*.test.js"],
    moduleFileExtensions: ["js", "jsx"],
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
  };