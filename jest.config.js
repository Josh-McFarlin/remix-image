module.exports = {
  //testEnvironment: "jsdom",
  testEnvironment: "node",
  roots: ["<rootDir>/packages"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  moduleFileExtensions: ["js", "ts", "tsx"],
  testPathIgnorePatterns: ["node_modules/"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testMatch: ["**/*.test.(ts|tsx)"],
  moduleNameMapper: {
    // Mocks out all these file formats when tests are run
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "identity-obj-proxy",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
