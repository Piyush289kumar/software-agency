export default {
  transform: {
    "^.+\\.js$": "babel-jest", // Transpile JS files using babel
  },
  testEnvironment: "node", // Ensures Jest uses the Node environment for testing
  moduleFileExtensions: ["js", "json", "node"], // Support for .js and .json extensions
};
