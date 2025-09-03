module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
        },
      },
    ],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|expo|@expo|@testing-library/react-native)/)",
  ],
  testMatch: ["**/__tests__/**/*.(ts|tsx|js)", "**/*.(test|spec).(ts|tsx|js)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(ttf|otf|woff|woff2)$": "identity-obj-proxy",
  },
  collectCoverageFrom: [
    "hooks/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "constants/**/*.{ts,tsx}",
    "!**/*.d.ts",
  ],
};
