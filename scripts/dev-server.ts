import * as Vite from "vite";
import * as path from "path";
import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import chalk from 'chalk';
import * as Chokidar from "chokidar";
import ora from "ora";
import humanizer from "humanize-duration";
import find from "find-process";
import kill from "tree-kill";

process.env.NODE_ENV = 'development';
let electronProcess: ChildProcessWithoutNullStreams | null = null;

const nodeModulesPath = path.resolve(__dirname + "/../node_modules/.bin/");
function preferLocalPackages(npmBinPath: string)
{
    if(process.platform === "win32")
        process.env.PATH = process.env.PATH + npmBinPath + ";";
    else
        process.env.PATH = process.env.PATH + ":" + npmBinPath;
}
preferLocalPackages(nodeModulesPath);

function delay(ms: number) { return new Promise((resolve, reject) => setTimeout(resolve, ms)); }


/**
 * Runs a command, returns the stdout on a successful exit code(0)
 * @param command The executable name
 * @param args The args as a string
 * @param cwd Current Working Directory
 * @param echoCommand Echos the command being run
 * @param echoOutput Pipes the command standard streams directly to this process to get the output as it is happening,
 *                    not waiting for the exit code
 * @param prefixOutputs Useful if running multiple commands in parallel
 * @param extraEnv Extra variables to pass as Environment variables
 * @param useSpinner
 * @return {Promise<string>}
 */
function exec(command: string, args:string, { cwd = __dirname, echoCommand = true, echoOutput = true,
    prefixOutputs = "", extraEnv = {}, echoCommandSinner = false,
    echoOutputColor = true, ignoreExit = false})
{
    return new Promise((resolve, reject) =>
                       {
                           let allData = "";
                           let errOutput = "";
                           const startAt = Date.now();
                           const call = spawn(command, [args], {shell: true, windowsVerbatimArguments: true, cwd: cwd, env: {...process.env, ...extraEnv} });

                           let commandText = chalk.cyanBright(command + " " + args);
                           let spinner = ora({ text: commandText +"\r\n", spinner: "dots" });
                           if(echoCommand)
                           {
                               if(echoCommandSinner)
                                   spinner.start();
                               else
                                   console.log(chalk.cyanBright(">> ") + commandText);
                           }

                           call.stdout.on('data', function (data)
                           {
                               allData += data.toString();
                               let echoData = echoOutputColor ? chalk.cyan(prefixOutputs + data.toString()) : prefixOutputs + data.toString();
                               echoOutput && process.stdout.write(echoData);
                           });
                           call.stderr.on('data', function (data)
                           {
                               errOutput = data.toString();
                               let echoData = echoOutputColor ? chalk.red(prefixOutputs + data.toString()) : prefixOutputs + data.toString();
                               echoOutput && process.stdout.write(echoData);
                           });

                           if(ignoreExit)
                           {
                               resolve(null);
                               return;
                           }

                           call.on('exit', function (code)
                           {
                               let time = humanizer(Date.now() - startAt, { round: true });
                               time = " ("+time+")";
                               if (code == 0)
                               {
                                   if(echoCommand && echoCommandSinner)
                                       spinner.succeed(chalk.green(command + " " + args + time));
                                   else if(echoCommand && echoCommandSinner === false)
                                       console.log(chalk.green("✔ " + command + " " + args + time));

                                   resolve(allData);
                               }
                               else
                               {
                                   if(echoCommand && echoCommandSinner)
                                       spinner.fail(chalk.red(command + " " + args + time));
                                   else if(echoCommand && echoCommandSinner === false)
                                       console.log(chalk.red("❌ " + command + " " + args + time));

                                   process.stdout.write("  "+ chalk.red(errOutput));
                                   reject({command, args, stdout: allData, stderr: errOutput});
                               }

                           });
                       });
}

// function execAsync(command: string, args:string, { cwd = __dirname, echoCommand = true, echoOutput = true,
//     prefixOutputs = "", extraEnv = {}, echoCommandSinner = false,
//     echoOutputColor = true})
// {
//    let allData = "";
//    let errOutput = "";
//    const startAt = Date.now();
//    const call = spawn(command, [args], {shell: true, windowsVerbatimArguments: true, cwd: cwd, env: {...process.env, ...extraEnv} });
//
//    let commandText = chalk.cyanBright(command + " " + args);
//    let spinner = ora({ text: commandText +"\r\n", spinner: "dots" });
//    if(echoCommand)
//    {
//        if(echoCommandSinner)
//            spinner.start();
//        else
//            console.log(chalk.cyanBright(">> ") + commandText);
//    }
//
//    call.stdout.on('data', function (data)
//    {
//        allData += data.toString();
//        let echoData = echoOutputColor ? chalk.cyan(prefixOutputs + data.toString()) : prefixOutputs + data.toString();
//        echoOutput && process.stdout.write(echoData);
//    });
//    call.stderr.on('data', function (data)
//    {
//        errOutput = data.toString();
//        let echoData = echoOutputColor ? chalk.red(prefixOutputs + data.toString()) : prefixOutputs + data.toString();
//        echoOutput && process.stdout.write(echoData);
//    });
//
//    return call;
// }

async function startRenderer() {
    const config = require(path.join('..', 'config', 'vite.js'));

    const server = await Vite.createServer({
        ...config,
        mode: 'development',
    });

    return server.listen();
}

async function startOrRestartElectron(rendererPort: number) {

    let args = "main.js "+rendererPort;
    let electronProcesses = await find("name", args); /* Find the REAL PID from the actual process list by arguments  */
    if(electronProcesses.length)
    {
        console.log("Killing old Electron processes");
        for(let process of electronProcesses)
        {
            console.log("KILLING =>", process.pid)
            kill(process.pid);
        }
    }

    let workingDir = path.resolve(__dirname + "/../src/main");
    //TODO: Remember to TS the src/main before using it below.
    await exec("tsc", "", {cwd: workingDir});

    //Returns after process started, not waiting for response.
    await exec("electron", args,{ignoreExit: true, cwd: workingDir})
}

async function start() {
    console.log(`${chalk.blueBright('===============================')}`);
    console.log(`${chalk.blueBright('Starting Electron + Vite Dev Server...')}`);
    console.log(`${chalk.blueBright('===============================')}`);

    const devServer = await startRenderer();
    let rendererPort = devServer.config.server.port!;

    await startOrRestartElectron(rendererPort);
    /* ignore the files generated from the TS, else this created a loop when tsc runs in the dir. */
    Chokidar.watch(path.join(__dirname, '..', 'src', 'main'),
                   {ignored: ["**/*.d.ts", "**/*.js"]}).on('change', async () => {
        await startOrRestartElectron(rendererPort);
    });
}

start();
