function build() {
    const ElectronBuilder = require('electron-builder');
    const Path = require('path');

    const configPath = Path.join(__dirname, '..', 'config', 'electron-builder.js');
    const config = require(configPath);

    return ElectronBuilder.build({
        config: config
    });
}

module.exports = build;