module.exports = {
	'root': true,
	'env': {
		'es2021': true,
		'node': true
	},
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		}
	],
	'extends': ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module',
	},
	'plugins': [
		'@typescript-eslint'
	],
	'rules': {
		'quotes': ['error', 'single'],
		'space-before-blocks': ['error', 'always'],
		'no-else-return': ['error'],
		'indent': ['error', 'tab']
	}
}
