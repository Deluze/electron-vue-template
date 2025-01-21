import Path from 'node:path'
import vuePlugin from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url';

const __dirname = Path.dirname(fileURLToPath(import.meta.url));

/**
 * https://vitejs.dev/config
 */
export default defineConfig({
    root: Path.join(__dirname, 'src', 'renderer'),
    publicDir: 'public',
    server: {
        port: 8080,
    },
    open: false,
    build: {
        outDir: Path.join(__dirname, 'build', 'renderer'),
        emptyOutDir: true,
    },
    plugins: [vuePlugin()],
});
