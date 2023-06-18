module.exports = {
	env: {
		node: true,
		commonjs: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'eslint-config-prettier', 'prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
	},
};
