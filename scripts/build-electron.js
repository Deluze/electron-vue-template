function build() {
    const ElectronBuilder = require('electron-builder');
    const path = require('path');
    
    const configPath = path.join(__dirname, '..', 'config', 'electron-builder.js');
    const config = require(configPath);

    return ElectronBuilder.build({
        config: config
    });
}

module.exports = build;