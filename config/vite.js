import { join, dirname } from 'node:path'
import vuePlugin from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
    root: join(__dirname, '..', 'src', 'renderer'),
    publicDir: 'public',
    server: {
        port: 8080,
    },
    open: false,
    build: {
        outDir: join(__dirname, '..', 'build', 'renderer'),
        emptyOutDir: true,
    },
    plugins: [vuePlugin()],
    resolve: {
        alias: {
            '@': join(__dirname, '..', 'src', 'renderer')
        }
    }
})

export default config
