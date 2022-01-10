process.env.NODE_ENV = 'development'

import Vite from 'vite'
import ChildProcess from 'child_process'
import path from 'path'
import Chalk from 'chalk'
import Chokidar from 'chokidar'
import Electron from 'electron'
import { exit } from 'process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let electronProcess = null
let rendererPort = 0

async function startRenderer() {
    const config = await import('../config/vite.js')

    const server = await Vite.createServer({
        ...config.default,
        mode: 'development'
    })

    return server.listen()
}

function startElectron() {
    if (electronProcess) { // single instance lock
        return;
    }

    const args = [
        // path.join(__dirname, '..', 'src', 'main', 'main.js'),
        path.join(__dirname, '..', 'main.cjs'),
        rendererPort
    ]

    electronProcess = ChildProcess.spawn(Electron, args)

    electronProcess.stdout.on('data', data => {
        console.log(Chalk.blueBright(`[Electron] `) + Chalk.white(data.toString()))
    })

    electronProcess.stderr.on('data', data => {
        console.log(Chalk.redBright(`[Electron] `) + Chalk.white(data.toString()))
    })
}

function restartElectron() {
    if (electronProcess) {
        electronProcess.kill()
        electronProcess = null
    }

    startElectron();
}

async function start() {
    console.log(`${Chalk.blueBright('======================================')}`)
    console.log(`${Chalk.blueBright('Starting Electron + Vite Dev Server...')}`)
    console.log(`${Chalk.blueBright('======================================')}`)

    const devServer = await startRenderer()
    rendererPort = devServer.config.server.port

    startElectron()

    Chokidar.watch(path.join(__dirname, '..', 'src', 'main')).on('change', () => {
        restartElectron()
    })
}

start()
