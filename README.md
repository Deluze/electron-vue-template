<div align="center"> 
  
![image](https://user-images.githubusercontent.com/32544586/163651496-2589c0b0-4151-4941-9d90-4275eea5fd83.png)

A simple starter template for a **Vue3** + **Electron** TypeScript based application, including **ViteJS** and **Electron Builder**.
</div>

## About

This template utilizes [ViteJS](https://vitejs.dev) for building and serving your (Vue powered) front-end process, it provides Hot Reloads (HMR) to make development fast and easy ⚡ 

Building the Electron (main) process is done with [Electron Builder](https://www.electron.build/), which makes your application easily distributable and supports cross-platform compilation 😎

## Getting started

Click the green **Use this template** button on top of the repository, and clone your own newly created repository.

**Or..**

Clone this repository: `git clone git@github.com:Deluze/electron-vue-template.git`


### Install dependencies ⏬

```bash
npm install
```

### Start developing ⚒️

```bash
npm run dev
```

## Additional Commands

```bash
npm run dev # starts application with hot reload
npm run build # builds application, distributable files can be found in "dist" folder

# OR

npm run build:win # uses windows as build target
npm run build:mac # uses mac as build target
npm run build:linux # uses linux as build target
```

Optional configuration options can be found in the [Electron Builder CLI docs](https://www.electron.build/cli.html).
## Project Structure

```bash
- root
  - config/
    - vite.js # ViteJS configuration
    - electron-builder.json # Electron Builder configuration
  - scripts/ # all the scripts used to build or serve your application, change as you like.
  - src/
    - main/ # Main thread (Electron application source)
    - renderer/ # Renderer thread (VueJS application source)
```

## Using static files

If you have any files that you want to copy over to the app directory after installation, you will need to add those files in your `src/main/static` directory.

#### Referencing static files from your main process

```ts
/* Assumes src/main/static/myFile.txt exists */

import {app} from 'electron';
import {join} from 'path';
import {readFileSync} from 'fs';

const path = join(app.getAppPath(), 'static', 'myFile.txt');
const buffer = readFileSync(path);
```
