function build() {
    const Path = require('path');
    const Vite = require('vite');
    const viteConfig = require(Path.join(__dirname, '..', 'config', 'vite.js'));

    Vite.build({
        ...viteConfig,
        base: './',
        mode: 'production'
    });
}

build();
