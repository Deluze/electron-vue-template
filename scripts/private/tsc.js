const ChildProcess = require('child_process');
const Chalk = require('chalk');

function compile(directory) {
  return new Promise((resolve, reject) => {
    const process = ChildProcess.exec('tsc', {
      cwd: directory,
    });

    process.stdout.on('data', data => {
        console.log(Chalk.yellowBright(`[tsc] `) + Chalk.white(data.toString()));
    });

    process.on('exit', exitCode => {
      if (exitCode > 0) {
        reject(exitCode);
      } else {
        resolve();
      }
    });
  });
}

module.exports = compile;
