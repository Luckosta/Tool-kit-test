import pluginJs from '@eslint/js'
import pluginReactImport from 'eslint-plugin-import'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        plugins: {
            'react-hooks': pluginReactHooks,
            import: pluginReactImport,
        },
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react-hooks/exhaustive-deps': 'warn',
            indent: ['error', 4],
            'object-curly-spacing': ['error', 'always'],
            'no-empty': 'error',
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
    },
]
