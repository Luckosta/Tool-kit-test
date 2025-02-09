import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@shared': path.resolve(__dirname, 'src/shared'),
            '@app': path.resolve(__dirname, 'src/app'),
            '@entities': path.resolve(__dirname, 'src/entities'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@pages': path.resolve(__dirname, 'src/pages'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./tests-setup.ts'],
    },
})
