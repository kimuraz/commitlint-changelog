import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: ['./node_modules', './dist'],
        coverage: {
            enabled: true,
            exclude: ['*.mjs'],
        },
    },
})