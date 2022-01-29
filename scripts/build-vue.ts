import * as Vite from "vite";
import * as path from "path";
const viteConfig = require(path.join(__dirname, '..', 'config', 'vite.js'));

function build() {
    Vite.build({
        ...viteConfig,
        base: './',
        mode: 'production'
    });
}

build();
