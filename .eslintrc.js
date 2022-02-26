module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true
	},
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
		"react",
	],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
	],
};
