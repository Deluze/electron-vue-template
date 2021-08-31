function build() {
    const Path = require('path');
    const Vite = require('vite');
    const viteConfig = require(Path.join(__dirname, '..', 'config', 'vite.js'));

    return Vite.build({
        ...viteConfig,
        /**
         * Base set to './' on production for Electron app. Vite sets wrong bundle path otherwise.
         */
        base: './',
        mode: 'production'
    });
}

module.exports = build; 
