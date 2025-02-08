import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            import: importPlugin,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            indent: ['error', 4],
            'object-curly-spacing': ['error', 'always'],
			'no-empty-file': ['error', 'always'],
            'import/order': [
                'error',
                {
                    groups: [
                        'external',
                        'builtin',
                        'internal',
                        'sibling',
                        'parent',
                        'index',
                        'type',
                        'unknown',
                        'object',
                    ],
                    pathGroups: [
                        {
                            pattern: 'react**',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: '@app/**',
                            group: 'internal',
                        },
                        {
                            pattern: '@pages/**',
                            group: 'internal',
                        },
                        {
                            pattern: '@widgets/**',
                            group: 'internal',
                        },
                        {
                            pattern: '@features/**',
                            group: 'internal',
                        },
                        {
                            pattern: '@entities/**',
                            group: 'internal',
                        },
                        {
                            pattern: '@shared/**',
                            group: 'internal',
                        },
                        {
                            pattern: '@mocks/**',
                            group: 'internal',
                        },
                    ],
                    'newlines-between': 'always',
                    pathGroupsExcludedImportTypes: ['react/**'],
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
        },
    }
)
