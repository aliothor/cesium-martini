// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'CesiumMartini',
            fileName:"index"
        },
        rollupOptions: {
            external: ['cesium'],
            output: {
                globals: {
                    cesium: 'Cesium',
                },
            },
        },
    },
    worker: {
        format: 'es'
    }
})
