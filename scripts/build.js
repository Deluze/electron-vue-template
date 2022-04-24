const Path = require('path');
const Chalk = require('chalk');
const FileSystem = require('fs');
const compileTs = require('./private/tsc');

function buildRenderer() {
    const Vite = require('vite');
    const viteConfig = require(Path.join(__dirname, '..', 'config', 'vite.js'));

    return Vite.build({
        ...viteConfig,
        base: './',
        mode: 'production'
    });
}

function buildMain() {
    const mainPath = Path.join(__dirname, '..', 'src', 'main');
    return compileTs(mainPath);
}

FileSystem.rmSync(Path.join(__dirname, '..', 'build'), {
    recursive: true,
    force: true,
})

console.log(Chalk.blueBright('Transpiling renderer & main...'));

Promise.allSettled([
    buildRenderer(),
    buildMain(),
]).then(() => {
    console.log(Chalk.greenBright('Renderer & main successfully transpiled! (ready to be built with electron-builder)'));
});
