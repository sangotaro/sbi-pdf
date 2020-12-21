module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testRegex: "(src/.*\\.test)\\.ts$",
  testPathIgnorePatterns: ["/node_modules/", "\\.d\\.ts$", "dist/.*"],
  collectCoverageFrom: ["src/**/*.ts", "!**/__tests__/**"],
  moduleFileExtensions: ["js", "ts", "json"],
};
