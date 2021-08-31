process.env.NODE_ENV = 'production';

async function build () {
    const Chalk = require('chalk');
    const buildVue = require('./build-vue');
    const buildElectron = require('./build-electron');

    console.log(`${Chalk.blueBright('===============================')}`);
    console.log(`${Chalk.blueBright('Build started...')}`);
    console.log(`${Chalk.blueBright('===============================')}`);

    await buildVue();
    await buildElectron();

    console.log(`${Chalk.greenBright('===============================')}`);
    console.log(`${Chalk.greenBright('Build success!')}`)
    console.log(`${Chalk.greenBright('===============================')}`);
}

build();