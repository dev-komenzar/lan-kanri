import tsParser from '@typescript-eslint/parser';
import svelteEslint from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import tsEslint from 'typescript-eslint';

export default [
	{
		ignores: ['.svelte-kit', 'build', 'dist', 'node_modules'],
	},
	...tsEslint.configs.recommended,
	...svelteEslint.configs['flat/recommended'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2017,
			},
			parser: tsParser,
			sourceType: 'module',
			ecmaVersion: 2020,
		},
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsParser,
			},
			globals: {
				...globals.browser,
			},
		},
	},
	{
		rules: {
			'n/file-extension-in-import': 'off',
		},
	},
];
