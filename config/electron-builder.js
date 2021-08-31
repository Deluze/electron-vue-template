const Path = require('path');

/**
 * https://www.electron.build/configuration/configuration
 * @type {import('electron-builder').Configuration}
 */
const config = {
    appId: 'com.electron.app',
    directories: {
        output: Path.join(__dirname, '..', 'dist'),
    },
    nsis: {
        oneClick: false,
        perMachine: false,
        allowToChangeInstallationDirectory: true,
        shortcutName: 'Electron App'
    },
    win: {
        target: 'nsis'
    },
    linux:  {
        target: ['snap'],
    },
    files: [
        '!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}',
        '!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}',
        '!**/node_modules/*.d.ts',
        '!**/node_modules/.bin',
        '!src/renderer',
        '!config',
        '!README.md',
        '!scripts',
        '!build',
        '!dist',
        {
            from: 'build/renderer',
            to: 'renderer',
            filter: ['**/*']
        }
    ],
}

module.exports = config;
