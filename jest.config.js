const path = require("path")

module.exports = {
  roots: [
    path.resolve(__dirname, "__tests__")
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "jest-transform-stub",
    "@components(.*)$": "<rootDir>/src/components/$1",
    "@configs(.*)$": "<rootDir>/src/configs/$1",
    "@pages(.*)$": "<rootDir>/src/pages/$1",
    "@tools(.*)$": "<rootDir>/src/tools/$1",
    "@utils(.*)$": "<rootDir>/src/utils/$1",
    "@assets(.*)$": "<rootDir>/src/assets/$1"
  },
  transform: {
    "^.+\\.(js|jsx)?$": "<rootDir>/__mocks__/jsTransformer.js"
  },
  setupFilesAfterEnv: [
    "<rootDir>/__mocks__/setupTests.js"
  ],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!lodash-es)"
  ],
  moduleDirectories: [
    "node_modules"
  ]
}
