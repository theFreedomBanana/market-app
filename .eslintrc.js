module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
	],
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
		"react",
	],
	root: true,
	rules: {
		"arrow-body-style": ["error", "as-needed"],
		"arrow-parens": ["error", "always"],
		"comma-dangle": ["error", "always-multiline"],
		"curly": ["error"],
		"eol-last": ["error", "always"],
		"eqeqeq": ["error", "always"],
		"indent": ["error", "tab"],
		"max-len": ["error", { "code": 130, "ignoreComments": true, "ignoreStrings": true, "ignoreTrailingComments": true, "ignoreUrls": true }],
		"no-trailing-spaces": ["error"],
		"object-curly-spacing": ["error", "always"],
		"prefer-const": ["error"],
		"quotes": ["error", "double"],
		"react/display-name": "off",
		"react/jsx-pascal-case": [2, { "allowAllCaps": false }],
		"react/jsx-uses-react": "error",
		"semi": ["error", "always"],
		"sort-imports": ["off"],
		"sort-keys": ["error"],
		"spaced-comment": ["error", "always", { "exceptions": ["-", "+"] }],
	},
};
