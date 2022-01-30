module.exports = {
  root: true,
  extends: ["airbnb", "airbnb/hooks", "airbnb-typescript", "prettier"],
  plugins: ["prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"]
  },
  env: {
    browser: true,
    es2021: true
  }
}
