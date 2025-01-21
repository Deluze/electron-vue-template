import Path from 'node:path';
import FileSystem from 'node:fs';
import { fileURLToPath } from 'node:url';
import Chalk from 'chalk';
import { build } from 'vite';
import compileTs from './private/tsc.js';

const __dirname = Path.dirname(fileURLToPath(import.meta.url));

function buildRenderer() {
    return build({
        configFile: Path.join(__dirname, '..', 'vite.config.js'),
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
